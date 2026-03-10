"use client";

import Image from "next/image";

export default function RefundPolicyPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
    :root {
      --tf-gate-orange: #C5704E;
      --tf-gate-orange-dim: rgba(197,112,78,0.08);
      --tf-gate-bg: #FAFAFA;
      --tf-gate-surface: #FFFFFF;
      --tf-gate-border: rgba(0,0,0,0.08);
      --tf-gate-text: #1A1A1A;
      --tf-gate-text-dim: rgba(26,26,26,0.4);
      --tf-gate-text-mid: rgba(26,26,26,0.6);
    }

    html, body { margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
      background: var(--tf-gate-bg) !important;
      color: var(--tf-gate-text);
      -webkit-font-smoothing: antialiased;
    }

    .tf-bg-glow {
      position: fixed; inset: 0;
      background: radial-gradient(ellipse 600px 400px at 50% 20%, var(--tf-gate-orange-dim), transparent 70%);
      pointer-events: none; z-index: 0;
    }

    .tf-grid-overlay {
      position: fixed; inset: 0;
      background-image:
        linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none; z-index: 0;
    }
          `,
        }}
      />

      <div className="tf-bg-glow" />
      <div className="tf-grid-overlay" />

      {/* Nav */}
      <nav style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/images/triggerfish_logo.png" alt="Triggerfishh" width={32} height={32} style={{ borderRadius: 8 }} />
          <span style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--tf-gate-text)" }}>
            Triggerfish<span style={{ color: "var(--tf-gate-orange)" }}>h</span>
          </span>
        </a>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="/terms-of-service" style={{ fontSize: "0.875rem", color: "#8B4513", textDecoration: "none", letterSpacing: "0.04em" }}>Terms</a>
          <a href="/privacy-policy" style={{ fontSize: "0.875rem", color: "#8B4513", textDecoration: "none", letterSpacing: "0.04em" }}>Privacy</a>
          <a href="/" style={{ fontSize: "0.875rem", color: "#8B4513", textDecoration: "none", letterSpacing: "0.04em" }}>Home</a>
        </div>
      </nav>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "20px 24px 80px" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--tf-gate-text)", marginBottom: 8 }}>
          Refund Policy
        </h1>
        <p style={{ fontSize: "0.85rem", color: "var(--tf-gate-text-dim)", marginBottom: 40 }}>
          Last updated: February 16, 2026
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <Section title="30-Day Money-Back Guarantee">
            <p>If you&apos;re not satisfied with Triggerfishh, we offer a <strong style={{ color: "var(--tf-gate-text)" }}>full refund within 30 days</strong> of your purchase &mdash; no questions asked.</p>
          </Section>

          <Section title="How to Request a Refund">
            <p style={{ marginBottom: 16 }}>The fastest way to get your refund is through our <strong style={{ color: "var(--tf-gate-text)" }}>self-service refund form</strong>. Eligible refunds are processed automatically.</p>
            <a
              href="/refund-request"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: "#fff",
                background: "var(--tf-gate-orange)",
                borderRadius: 8,
                textDecoration: "none",
                transition: "all 0.2s",
                marginBottom: 20,
              }}
            >
              Request a Refund &rarr;
            </a>
            <p style={{ marginBottom: 12 }}>Alternatively, you can email us at{" "}
              <a href="mailto:contact@triggerfishh.com" style={{ color: "var(--tf-gate-orange)", textDecoration: "underline" }}>contact@triggerfishh.com</a> with:
            </p>
            <ul>
              <li>The email address used for your purchase</li>
              <li>Your order receipt or transaction ID</li>
              <li>A brief description of why you&apos;d like a refund (optional, but helps us improve)</li>
            </ul>
          </Section>

          <Section title="Refund Processing">
            <ul>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Timeline:</strong> Refunds are processed immediately upon approval</li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>How you receive it:</strong> Refunded to your original payment method</li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Bank processing time:</strong> 5&ndash;10 business days (depends on your financial institution)</li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Amount:</strong> Full purchase price</li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Note:</strong> Payment processing fees vary by bank and region</li>
            </ul>
          </Section>

          <Section title="License Key &amp; Access">
            <p style={{ marginBottom: 12 }}>Once you receive your license key and download Triggerfishh:</p>
            <ul>
              <li>Your license key is yours to use</li>
              <li>If refunded, the license key remains valid for <strong style={{ color: "var(--tf-gate-text)" }}>30 days after the refund date</strong>, then expires</li>
              <li>After the refund window closes, your license will no longer be active</li>
            </ul>
          </Section>

          <Section title="Outside the 30-Day Window">
            <p>Refund requests made after 30 days may be reviewed on a case-by-case basis. We reserve the right to decline refund requests that fall outside our standard policy.</p>
          </Section>

          <Section title="Support First">
            <p style={{ marginBottom: 12 }}>Before requesting a refund, we&apos;d love to help! If you&apos;re experiencing issues with Triggerfishh:</p>
            <ul>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Email support:</strong>{" "}
                <a href="mailto:contact@triggerfishh.com" style={{ color: "var(--tf-gate-orange)", textDecoration: "underline" }}>contact@triggerfishh.com</a>
              </li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>GitHub Issues:</strong>{" "}
                <a href="https://github.com/ChristopherLarsen/Triggerfishh" target="_blank" rel="noopener noreferrer" style={{ color: "var(--tf-gate-orange)", textDecoration: "underline" }}>github.com/ChristopherLarsen/Triggerfishh</a>
              </li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Discord:</strong> (coming soon)</li>
            </ul>
            <p style={{ marginTop: 12 }}>Many issues can be resolved quickly with our support team.</p>
          </Section>

          <Section title="Our Payment Partner">
            <p>Refunds are processed through <strong style={{ color: "var(--tf-gate-text)" }}>Lemon Squeezy</strong>, our trusted payment provider. Lemon Squeezy may also issue refunds to prevent chargebacks within 60 days of purchase, per their terms of service.</p>
          </Section>

          <Section title="Questions?">
            <p>
              If you have any questions about our refund policy, contact us at{" "}
              <a href="mailto:contact@triggerfishh.com" style={{ color: "var(--tf-gate-orange)", textDecoration: "underline" }}>contact@triggerfishh.com</a>.
            </p>
            <p style={{ marginTop: 12, fontStyle: "italic", fontSize: "0.8rem" }}>This policy complies with Lemon Squeezy&apos;s terms of service and payment processor requirements.</p>
          </Section>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        background: "var(--tf-gate-surface)",
        border: "1px solid var(--tf-gate-border)",
        borderRadius: 12,
        padding: "24px 28px",
        boxShadow: "0 0 20px rgba(197,112,78,0.04)",
      }}
    >
      <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--tf-gate-text)", marginBottom: 12 }}>{title}</h2>
      <div style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--tf-gate-text-mid)" }}>{children}</div>
      <style dangerouslySetInnerHTML={{ __html: `
        section ul { list-style: disc; padding-left: 20px; margin-top: 8px; display: flex; flex-direction: column; gap: 8px; }
      ` }} />
    </section>
  );
}
