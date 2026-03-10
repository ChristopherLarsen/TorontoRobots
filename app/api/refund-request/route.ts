import { NextRequest, NextResponse } from "next/server";
import { eq, and, gte, sql } from "drizzle-orm";
import { db } from "../../../lib/db";
import { refundRequests } from "../../../db/schema";

const LEMON_SQUEEZY_API = "https://api.lemonsqueezy.com/v1";
const REFUND_WINDOW_DAYS = 30;
const RATE_LIMIT_PER_IP_PER_HOUR = 5;

/* ─────────────────────────────────────────────
   In-memory rate limiter (per-IP, per-hour)
   ───────────────────────────────────────────── */

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }

  if (entry.count >= RATE_LIMIT_PER_IP_PER_HOUR) {
    return false;
  }

  entry.count++;
  return true;
}

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

interface LemonSqueezyOrder {
  id: string;
  attributes: {
    status: string;
    refunded: boolean;
    user_email: string;
    created_at: string;
    total: number;
    currency: string;
    first_order_item: {
      order_id: number;
    };
  };
}

async function fetchOrder(
  orderId: string
): Promise<{ ok: true; order: LemonSqueezyOrder } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${LEMON_SQUEEZY_API}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        Accept: "application/vnd.api+json",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (res.status === 404) return { ok: false, error: "Order not found" };
    if (!res.ok) return { ok: false, error: `Lemon Squeezy API error (${res.status})` };

    const json = await res.json();
    return { ok: true, order: json.data };
  } catch (err) {
    console.error("fetchOrder error:", err instanceof Error ? err.message : err);
    return { ok: false, error: "Failed to reach payment provider" };
  }
}

async function issueRefund(
  orderId: string
): Promise<{ ok: true; refundId: string } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${LEMON_SQUEEZY_API}/orders/${orderId}/refund`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Refund API error (${res.status}):`, body);
      return { ok: false, error: "Payment provider failed to process refund" };
    }

    const json = await res.json();
    return { ok: true, refundId: String(json.data?.id ?? orderId) };
  } catch (err) {
    console.error("issueRefund error:", err instanceof Error ? err.message : err);
    return { ok: false, error: "Failed to reach payment provider" };
  }
}

/* ─────────────────────────────────────────────
   POST /api/refund-request
   ───────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  // Rate limit
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { status: "error", message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: { email?: string; orderId?: string; reason?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: "error", message: "Invalid request body" },
      { status: 400 }
    );
  }

  const email = body.email?.trim().toLowerCase();
  const orderId = body.orderId?.trim();
  const reason = body.reason?.trim() || null;

  // Input validation
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { status: "error", message: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  if (!orderId) {
    return NextResponse.json(
      { status: "error", message: "Please provide your order ID." },
      { status: 400 }
    );
  }

  // Check for duplicate refund request on this order
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const [existingRequest] = await db
    .select()
    .from(refundRequests)
    .where(
      and(
        eq(refundRequests.orderId, orderId),
        eq(refundRequests.status, "approved")
      )
    )
    .limit(1);

  if (existingRequest) {
    return NextResponse.json(
      { status: "error", message: "This order has already been refunded." },
      { status: 409 }
    );
  }

  // Check for recent pending request (prevent spam)
  const [recentPending] = await db
    .select()
    .from(refundRequests)
    .where(
      and(
        eq(refundRequests.orderId, orderId),
        gte(refundRequests.createdAt, oneHourAgo)
      )
    )
    .limit(1);

  if (recentPending) {
    return NextResponse.json(
      { status: "error", message: "A refund request for this order was recently submitted. Please wait before trying again." },
      { status: 429 }
    );
  }

  // Insert pending request for audit trail
  const [refundReq] = await db
    .insert(refundRequests)
    .values({
      email,
      orderId,
      reason,
      status: "pending",
      requestIp: ip,
    })
    .returning({ id: refundRequests.id });

  // Fetch order from Lemon Squeezy
  const orderResult = await fetchOrder(orderId);

  if (!orderResult.ok) {
    const { error: fetchError } = orderResult as { ok: false; error: string };
    await db
      .update(refundRequests)
      .set({ status: "rejected", errorMessage: fetchError, processedAt: new Date() })
      .where(eq(refundRequests.id, refundReq.id));

    const statusCode = fetchError === "Order not found" ? 404 : 502;
    return NextResponse.json(
      { status: "error", message: fetchError === "Order not found" ? "We couldn't find an order with that ID. Please double-check and try again." : "Unable to verify your order right now. Please try again later." },
      { status: statusCode }
    );
  }

  const { order } = orderResult as { ok: true; order: LemonSqueezyOrder };

  // Email match (case-insensitive)
  if (order.attributes.user_email.toLowerCase() !== email) {
    await db
      .update(refundRequests)
      .set({ status: "rejected", errorMessage: "Email mismatch", processedAt: new Date() })
      .where(eq(refundRequests.id, refundReq.id));

    return NextResponse.json(
      { status: "error", message: "The email address doesn't match the one used for this order." },
      { status: 400 }
    );
  }

  // Already refunded check
  if (order.attributes.refunded) {
    await db
      .update(refundRequests)
      .set({ status: "rejected", errorMessage: "Already refunded", processedAt: new Date() })
      .where(eq(refundRequests.id, refundReq.id));

    return NextResponse.json(
      { status: "error", message: "This order has already been refunded." },
      { status: 409 }
    );
  }

  // 30-day window check
  const purchaseDate = new Date(order.attributes.created_at);
  const daysSincePurchase = (Date.now() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24);

  if (daysSincePurchase > REFUND_WINDOW_DAYS) {
    await db
      .update(refundRequests)
      .set({ status: "rejected", errorMessage: `Outside ${REFUND_WINDOW_DAYS}-day window (${Math.floor(daysSincePurchase)} days)`, processedAt: new Date() })
      .where(eq(refundRequests.id, refundReq.id));

    return NextResponse.json(
      { status: "error", message: `Your purchase is outside the ${REFUND_WINDOW_DAYS}-day refund window. Please contact support at contact@triggerfishh.com for assistance.` },
      { status: 400 }
    );
  }

  // Issue the refund
  const refundResult = await issueRefund(orderId);

  if (!refundResult.ok) {
    const { error: refundError } = refundResult as { ok: false; error: string };
    await db
      .update(refundRequests)
      .set({ status: "failed", errorMessage: refundError, processedAt: new Date() })
      .where(eq(refundRequests.id, refundReq.id));

    return NextResponse.json(
      { status: "error", message: "We were unable to process your refund automatically. Please contact support at contact@triggerfishh.com." },
      { status: 502 }
    );
  }

  // Mark as approved
  const { refundId } = refundResult as { ok: true; refundId: string };
  await db
    .update(refundRequests)
    .set({
      status: "approved",
      lemonSqueezyRefundId: refundId,
      processedAt: new Date(),
    })
    .where(eq(refundRequests.id, refundReq.id));

  console.log(`Refund approved: order=${orderId} email=${email} refundId=${refundId}`);

  return NextResponse.json({
    status: "success",
    message: "Your refund has been approved! You'll see it back on your original payment method within 5–10 business days.",
    refundId,
  });
}
