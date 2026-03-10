import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { db } from "../../../../lib/db";
import { licenses, webhookEvents } from "../../../../db/schema";

/* ─────────────────────────────────────────────
   Signature verification
   ───────────────────────────────────────────── */

function verifySignature(signature: string, rawBody: string): boolean {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

/* ─────────────────────────────────────────────
   Event handlers
   ───────────────────────────────────────────── */

async function handleOrderCreated(data: Record<string, unknown>) {
  const attributes = data.attributes as Record<string, unknown> | undefined;
  const relationships = data.relationships as Record<
    string,
    unknown
  > | undefined;

  const licenseKey = attributes?.license_key as string | undefined;
  const orderId = data.id as number;
  const customerId = (
    relationships?.customer as { data?: { id?: number } } | undefined
  )?.data?.id;
  const customerEmail = attributes?.customer_email as string | undefined;
  const customerName = attributes?.customer_name as string | undefined;

  if (!licenseKey) {
    console.warn("Order webhook missing license_key");
    return;
  }

  // Check if license already exists
  const [existing] = await db
    .select({ id: licenses.id })
    .from(licenses)
    .where(eq(licenses.lemonSqueezyLicenseKey, licenseKey))
    .limit(1);

  if (existing) {
    console.log(`License already exists: ${licenseKey}`);
    return;
  }

  await db.insert(licenses).values({
    lemonSqueezyLicenseKey: licenseKey,
    lemonSqueezyOrderId: orderId,
    lemonSqueezyCustomerId: customerId ?? 0,
    customerEmail: customerEmail ?? "",
    customerName: customerName ?? null,
    status: "active",
    activationLimit: 3,
    activated: true,
  });

  console.log(`License created: ${licenseKey}`);
}

async function handleOrderRefunded(data: Record<string, unknown>) {
  const orderId = data.id as number;

  await db
    .update(licenses)
    .set({ status: "revoked", revokedAt: new Date() })
    .where(eq(licenses.lemonSqueezyOrderId, orderId));

  console.log(`Revoked licenses for order ${orderId}`);
}

/* ─────────────────────────────────────────────
   Webhook event logging
   ───────────────────────────────────────────── */

async function logWebhookEvent(
  eventType: string,
  payload: unknown,
  processed: boolean,
  errorMessage: string | null = null
) {
  try {
    const meta = (payload as Record<string, unknown>)?.meta as
      | Record<string, unknown>
      | undefined;

    await db.insert(webhookEvents).values({
      eventType,
      lemonSqueezyEventId: (meta?.event_id as string) ?? null,
      payload,
      processed,
      errorMessage,
    });
  } catch (error) {
    console.error(
      "Failed to log webhook event:",
      error instanceof Error ? error.message : error
    );
  }
}

/* ─────────────────────────────────────────────
   POST /api/webhooks/lemon-squeezy
   ───────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  try {
    // Read raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get("x-signature") ?? "";

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const meta = body.meta as Record<string, unknown> | undefined;
    const eventType = (meta?.event_name as string) ?? "unknown";

    // Verify webhook signature
    if (!verifySignature(signature, rawBody)) {
      console.warn("Invalid webhook signature");
      await logWebhookEvent(eventType, body, false, "Invalid signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    console.log(`Webhook received: ${eventType}`);

    // Process event
    try {
      const data = body.data as Record<string, unknown>;

      switch (eventType) {
        case "order.created":
          await handleOrderCreated(data);
          break;
        case "order.refunded":
          await handleOrderRefunded(data);
          break;
        default:
          console.log(`Unhandled webhook event: ${eventType}`);
      }

      await logWebhookEvent(eventType, body, true);

      return NextResponse.json({ success: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Webhook processing error: ${message}`);
      await logWebhookEvent(eventType, body, false, message);
      return NextResponse.json(
        { error: "Processing failed" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(
      "Webhook error:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
