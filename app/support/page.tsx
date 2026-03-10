"use client";

import Image from "next/image";

export default function SupportPage() {
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
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--tf-gate-text)", marginBottom: 40 }}>
          Support
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {/* Tips */}
          <section
            style={{
              background: "var(--tf-gate-surface)",
              border: "1px solid var(--tf-gate-border)",
              borderRadius: 12,
              padding: "24px 28px",
              boxShadow: "0 0 20px rgba(197,112,78,0.04)",
            }}
          >
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--tf-gate-text)", marginBottom: 12 }}>Tips &amp; Suggestions</h2>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--tf-gate-text-mid)", marginBottom: 16 }}>
              New to Triggerfishh? Check out our collection of practical tips on trigger words, voice commands, chaining actions, and getting the most out of the app.
            </p>
            <a
              href="/tips"
              style={{
                display: "inline-block",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: "var(--tf-gate-orange)",
                textDecoration: "none",
                borderBottom: "1px solid transparent",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--tf-gate-orange)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
            >
              Browse all tips &rarr;
            </a>
          </section>

          {/* Refunds */}
          <section
            style={{
              background: "var(--tf-gate-surface)",
              border: "1px solid var(--tf-gate-border)",
              borderRadius: 12,
              padding: "24px 28px",
              boxShadow: "0 0 20px rgba(197,112,78,0.04)",
            }}
          >
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--tf-gate-text)", marginBottom: 12 }}>Refunds</h2>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--tf-gate-text-mid)", marginBottom: 16 }}>
              We offer a <strong style={{ color: "var(--tf-gate-text)" }}>30-day money-back guarantee</strong> on all Triggerfishh purchases &mdash; no questions asked. If the app doesn&apos;t meet your expectations, we&apos;ll give you a full refund.
            </p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
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
                }}
              >
                Request a Refund
              </a>
              <a
                href="/refund"
                style={{
                  display: "inline-block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: "var(--tf-gate-orange)",
                  textDecoration: "none",
                  borderBottom: "1px solid transparent",
                  transition: "border-color 0.2s",
                  lineHeight: "36px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--tf-gate-orange)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
              >
                View full refund policy &rarr;
              </a>
            </div>
          </section>

          {/* Contact Us */}
          <section
            style={{
              background: "var(--tf-gate-surface)",
              border: "1px solid var(--tf-gate-border)",
              borderRadius: 12,
              padding: "24px 28px",
              boxShadow: "0 0 20px rgba(197,112,78,0.04)",
            }}
          >
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--tf-gate-text)", marginBottom: 12 }}>Contact Us</h2>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--tf-gate-text-mid)", marginBottom: 16 }}>
              Have a question, found a bug, or just want to say hello? We&apos;d love to hear from you. Our team typically responds within 2&ndash;3 business days.
            </p>
            <a
              href="mailto:contact@triggerfishh.com"
              style={{
                display: "inline-block",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: "var(--tf-gate-orange)",
                textDecoration: "none",
                borderBottom: "1px solid transparent",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--tf-gate-orange)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
            >
              contact@triggerfishh.com
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
