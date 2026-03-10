"use client";

import Image from "next/image";

const TIPS = [
  {
    title: "Pick a short, unique trigger word",
    body: "The default trigger word is \"Fish\", but you can set any word you like. Choose something short that you don't say often in conversation — this prevents accidental activations. Words like \"Script\", \"Launch\", or \"Auto\" work great.",
  },
  {
    title: "Describe what you want in plain English",
    body: "You don't need to know AppleScript or shell commands. Just say what you want to happen: \"Fish, open Safari and go to my email.\" The AI figures out the rest.",
  },
  {
    title: "Be specific with app names",
    body: "When creating commands, use the exact app name as it appears in your Applications folder. \"Microsoft Word\" rather than just \"Word\", \"Google Chrome\" rather than \"Chrome\". This helps the AI generate more reliable scripts.",
  },
  {
    title: "Chain multiple actions together",
    body: "Triggerfishh can handle multi-step commands. Try: \"Fish, open Notes, create a new note, and type today's meeting agenda.\" The AI will chain these actions into a single automation.",
  },
  {
    title: "Use different trigger words for different contexts",
    body: "Set up multiple trigger words for different workflows. For example, use \"Script\" for developer tasks, \"Open\" for launching apps, and \"Fish\" for everything else. It keeps things organized.",
  },
  {
    title: "Speak clearly and at a natural pace",
    body: "Triggerfishh uses Apple's on-device speech recognition. You don't need to speak slowly or robotically — just speak naturally and clearly. The recognition works best with a brief pause after the trigger word.",
  },
  {
    title: "Test commands before relying on them",
    body: "When you create a new voice command, test it a few times to make sure the AI-generated script does exactly what you want. You can always refine the description to get better results.",
  },
  {
    title: "Keep your API key costs in check",
    body: "Each command creation sends a text prompt to your AI provider. Day-to-day use is inexpensive, but if you're experimenting heavily, keep an eye on your API dashboard. Running existing commands doesn't use any API calls.",
  },
  {
    title: "Use it for repetitive workflows",
    body: "Triggerfishh shines for tasks you do every day — opening your work apps in the morning, arranging windows, toggling settings, or running common terminal commands. Set them up once and save time forever.",
  },
  {
    title: "Your voice never leaves your Mac",
    body: "All speech recognition happens on-device via Apple's built-in services. Only the text description of your command is sent to your AI provider to generate the automation. Your voice audio stays private.",
  },
];

export default function TipsPage() {
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
          <a href="/support" style={{ fontSize: "0.875rem", color: "#8B4513", textDecoration: "none", letterSpacing: "0.04em" }}>Support</a>
          <a href="/" style={{ fontSize: "0.875rem", color: "#8B4513", textDecoration: "none", letterSpacing: "0.04em" }}>Home</a>
        </div>
      </nav>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "20px 24px 80px" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--tf-gate-text)", marginBottom: 8 }}>
          Tips &amp; Suggestions
        </h1>
        <p style={{ fontSize: "0.9rem", color: "var(--tf-gate-text-dim)", marginBottom: 40, lineHeight: 1.6 }}>
          Get the most out of Triggerfishh with these practical suggestions.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {TIPS.map((tip, i) => (
            <section
              key={i}
              style={{
                background: "var(--tf-gate-surface)",
                border: "1px solid var(--tf-gate-border)",
                borderRadius: 12,
                padding: "24px 28px",
                boxShadow: "0 0 20px rgba(197,112,78,0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--tf-gate-orange)", letterSpacing: "0.06em", flexShrink: 0 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--tf-gate-text)", margin: 0 }}>{tip.title}</h2>
              </div>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--tf-gate-text-mid)", margin: 0, paddingLeft: 32 }}>{tip.body}</p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
