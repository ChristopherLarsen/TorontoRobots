import { NextRequest, NextResponse } from "next/server";
import { eq, and, sql } from "drizzle-orm";
import { db } from "../../../../lib/db";
import {
  licenses,
  activations,
  validationLogs,
} from "../../../../db/schema";

const LEMON_SQUEEZY_API = "https://api.lemonsqueezy.com/v1";
const ACTIVATION_LIMIT = 3;

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */

async function validateWithLemonSqueezy(licenseKey: string) {
  try {
    const response = await fetch(`${LEMON_SQUEEZY_API}/licenses/validate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ license_key: licenseKey }),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return { valid: false, expiresAt: null };
    }

    const data = await response.json();
    return { valid: data.valid === true, expiresAt: data.expires_at ?? null };
  } catch (error) {
    console.error(
      "Lemon Squeezy validation error:",
      error instanceof Error ? error.message : error
    );
    return { valid: false, expiresAt: null };
  }
}

async function logValidation(
  licenseId: string | null,
  machineId: string,
  success: boolean,
  resultCode: string,
  errorMessage: string | null = null
) {
  try {
    await db.insert(validationLogs).values({
      licenseId,
      machineId,
      validationType: "validate",
      success,
      resultCode,
      errorMessage,
    });
  } catch (error) {
    console.error(
      "Failed to log validation:",
      error instanceof Error ? error.message : error
    );
  }
}

/* ─────────────────────────────────────────────
   POST /api/licenses/validate
   ───────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { licenseKey, machineId, machineName } = body;

    // 1. Validate required fields
    if (!licenseKey || !machineId) {
      return NextResponse.json(
        { error: "Missing licenseKey or machineId" },
        { status: 400 }
      );
    }

    // 2. Look up license in DB
    const [license] = await db
      .select()
      .from(licenses)
      .where(eq(licenses.lemonSqueezyLicenseKey, licenseKey))
      .limit(1);

    if (!license) {
      console.warn(`License not found: ${licenseKey}`);
      await logValidation(null, machineId, false, "NOT_FOUND");
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    // 3. Check license status
    if (license.status !== "active") {
      console.warn(
        `License inactive: ${licenseKey} (${license.status})`
      );
      await logValidation(
        license.id,
        machineId,
        false,
        (license.status ?? "UNKNOWN").toUpperCase()
      );
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    // 4. Validate with Lemon Squeezy
    const lsValidation = await validateWithLemonSqueezy(licenseKey);

    if (!lsValidation.valid) {
      console.warn(`Lemon Squeezy validation failed: ${licenseKey}`);
      await logValidation(license.id, machineId, false, "INVALID");
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    // 5. Check/record activation
    // Check if already activated on this machine
    const [existingActivation] = await db
      .select()
      .from(activations)
      .where(
        and(
          eq(activations.licenseId, license.id),
          eq(activations.machineId, machineId),
          eq(activations.status, "active")
        )
      )
      .limit(1);

    if (existingActivation) {
      // Update last validated timestamp
      await db
        .update(activations)
        .set({ lastValidatedAt: new Date() })
        .where(eq(activations.id, existingActivation.id));

      await logValidation(license.id, machineId, true, "SUCCESS");
      console.log(`License revalidated: ${licenseKey} on ${machineId}`);

      return NextResponse.json({
        valid: true,
        licenseKey,
        expiresAt: lsValidation.expiresAt,
        isNewActivation: false,
      });
    }

    // Check activation limit
    const [countResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(activations)
      .where(
        and(
          eq(activations.licenseId, license.id),
          eq(activations.status, "active")
        )
      );

    if ((countResult?.count ?? 0) >= ACTIVATION_LIMIT) {
      console.warn(`Activation limit reached: ${licenseKey}`);
      await logValidation(
        license.id,
        machineId,
        false,
        "ACTIVATION_LIMIT",
        `Activation limit (${ACTIVATION_LIMIT}) reached`
      );
      return NextResponse.json(
        {
          valid: false,
          error: `Activation limit (${ACTIVATION_LIMIT}) reached`,
        },
        { status: 409 }
      );
    }

    // Record new activation
    await db.insert(activations).values({
      licenseId: license.id,
      machineId,
      machineName: machineName ?? null,
      status: "active",
    });

    // Increment activation count
    await db
      .update(licenses)
      .set({
        currentActivations: sql`${licenses.currentActivations} + 1`,
      })
      .where(eq(licenses.id, license.id));

    // 6. Log success
    await logValidation(license.id, machineId, true, "SUCCESS");
    console.log(`License activated: ${licenseKey} on ${machineId}`);

    // 7. Return result
    return NextResponse.json({
      valid: true,
      licenseKey,
      expiresAt: lsValidation.expiresAt,
      isNewActivation: true,
    });
  } catch (error) {
    console.error(
      "License validation error:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
