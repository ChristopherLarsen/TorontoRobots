"use client";

import Image from "next/image";

export default function ProductsPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
    :root {
      --tf-gate-orange: #C5704E;
      --tf-gate-orange-dim: rgba(197,112,78,0.08);
      --tf-gate-orange-glow: rgba(197,112,78,0.25);
      --tf-gate-bg: #FAFAFA;
      --tf-gate-surface: #FFFFFF;
      --tf-gate-border: rgba(0,0,0,0.08);
      --tf-gate-text: #1A1A1A;
      --tf-gate-text-dim: rgba(26,26,26,0.4);
      --tf-gate-text-mid: rgba(26,26,26,0.6);
    }

    html, body { margin: 0; padding: 0; height: 100%; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
      background: var(--tf-gate-bg) !important;
      color: var(--tf-gate-text);
      -webkit-font-smoothing: antialiased;
    }

    .tf-bg-glow {
      position: fixed; inset: 0;
      background: radial-gradient(ellipse 600px 400px at 50% 40%, var(--tf-gate-orange-dim), transparent 70%);
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
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 104px)", padding: "0 24px 40px" }}>
        {/* Fish logo */}
        <Image
          src="/images/triggerfish_logo.png"
          alt="Triggerfishh — voice-activated Mac automation"
          width={80}
          height={80}
          style={{ borderRadius: 16, marginBottom: 32, filter: "drop-shadow(0 0 24px rgba(197,112,78,0.25))" }}
          priority
        />

        {/* Hint lines */}
        <div style={{ marginBottom: 40, display: "flex", flexDirection: "column", gap: 6, textAlign: "center" }}>
          <p style={{ fontSize: "0.85rem", letterSpacing: "0.04em", color: "var(--tf-gate-text-dim)", margin: 0 }}>Your voice. Your Mac. Your rules.</p>
          <p style={{ fontSize: "0.85rem", letterSpacing: "0.04em", color: "var(--tf-gate-text-dim)", margin: 0 }}>Automation without the typing.</p>
          <p style={{ fontSize: "0.85rem", letterSpacing: "0.04em", color: "var(--tf-gate-text-dim)", margin: 0 }}>Something fishy this way comes.</p>
        </div>

        {/* Coming Soon card */}
        <div
          style={{
            width: "100%",
            maxWidth: 540,
            background: "var(--tf-gate-surface)",
            border: "1px solid var(--tf-gate-border)",
            borderRadius: 12,
            padding: "64px 48px",
            textAlign: "center",
            boxShadow: "0 0 30px rgba(197,112,78,0.06)",
          }}
        >
          <span style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--tf-gate-text-dim)" }}>
            Coming Soon
          </span>
        </div>
      </div>
    </>
  );
}
