"use client";

import Image from "next/image";

export default function PrivacyPolicyPage() {
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
          <a href="/" style={{ fontSize: "0.875rem", color: "#8B4513", textDecoration: "none", letterSpacing: "0.04em" }}>Home</a>
        </div>
      </nav>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "20px 24px 80px" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--tf-gate-text)", marginBottom: 8 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: "0.85rem", color: "var(--tf-gate-text-dim)", marginBottom: 40 }}>
          Last updated: February 13, 2026
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <Section title="Introduction">
            <p>
              DeadRatGames Inc. (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the Triggerfishh application and the triggerfishh.com website (collectively, the &ldquo;Service&rdquo;). This Privacy Policy explains what information we collect, how we use it, and your choices regarding your data.
            </p>
          </Section>

          <Section title="Our Privacy-First Approach">
            <p style={{ marginBottom: 12 }}>Triggerfishh is designed with privacy at its core. Here is what that means in practice:</p>
            <ul>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Voice processing stays on your Mac.</strong> All speech recognition is handled entirely by Apple&apos;s on-device speech services. Your voice audio is never transmitted to our servers or any third party.</li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>No telemetry or analytics.</strong> The Triggerfishh app does not collect crash reports, usage statistics, or any form of telemetry.</li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>No account required.</strong> You do not need to create an account to use Triggerfishh.</li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>You control your AI provider.</strong> Triggerfishh uses a bring-your-own-API-key model. You choose which AI provider to connect (OpenAI, Anthropic, Google Gemini, or xAI), and you manage that relationship directly.</li>
            </ul>
          </Section>

          <Section title="Information We Collect">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--tf-gate-text)", marginBottom: 6 }}>Purchase and License Information</h3>
            <p style={{ marginBottom: 16 }}>When you purchase Triggerfishh, our payment processor Lemon Squeezy collects the information necessary to complete your transaction, including your name, email address, and payment details. We receive and store your email address and license key to manage your license. We do not directly process or store your payment card information.</p>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--tf-gate-text)", marginBottom: 6 }}>AI Command Text</h3>
            <p style={{ marginBottom: 16 }}>When you create a voice command, Triggerfishh converts your speech to text locally on your Mac. That text description is then sent to your chosen AI provider to generate the automation script. This text is sent directly from your Mac to your AI provider using your own API key. We do not receive, store, or have access to these command descriptions.</p>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--tf-gate-text)", marginBottom: 6 }}>Support Communications</h3>
            <p>If you contact us for support, we may collect your name, email address, and the content of your messages to assist you.</p>
          </Section>

          <Section title="How We Use Your Information">
            <p style={{ marginBottom: 12 }}>We use the limited information we collect for the following purposes:</p>
            <ul>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>License management:</strong> To verify your purchase and deliver your license key.</li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Customer support:</strong> To respond to your inquiries and resolve issues.</li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Product updates:</strong> To notify you of important updates to Triggerfishh, if you have opted in to receive such communications.</li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Legal compliance:</strong> To comply with applicable laws, regulations, or legal processes.</li>
            </ul>
          </Section>

          <Section title="Third-Party Services">
            <p style={{ marginBottom: 12 }}>Triggerfishh integrates with or relies on the following third-party services. Each has its own privacy policy governing how it handles your data:</p>
            <ul>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Lemon Squeezy</strong> &mdash; Processes payments and manages licensing.</li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Your chosen AI provider</strong> (OpenAI, Anthropic, Google, or xAI) &mdash; Receives text command descriptions to generate automation scripts. Your data is subject to that provider&apos;s privacy policy and the terms of your API key agreement.</li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Apple</strong> &mdash; Provides on-device speech recognition services built into macOS. Voice data is processed locally and is governed by Apple&apos;s privacy policy.</li>
            </ul>
            <p style={{ marginTop: 12 }}>We encourage you to review the privacy policies of these third-party services.</p>
          </Section>

          <Section title="Data Storage and Security">
            <p style={{ marginBottom: 12 }}>The limited personal information we store (email addresses and license keys) is maintained in a secure database with industry-standard protections. We use encryption in transit (TLS/SSL) for all communications between your browser and our servers.</p>
            <p>While we take reasonable measures to protect your information, no method of electronic storage or transmission is 100% secure. We cannot guarantee absolute security.</p>
          </Section>

          <Section title="Data Retention">
            <p>We retain your purchase and license information for as long as your license is active and as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements. Support communications are retained for a reasonable period to provide ongoing assistance and improve our service.</p>
          </Section>

          <Section title="Cookies and Tracking">
            <p>The Triggerfishh website does not use cookies, tracking pixels, or third-party analytics services. We do not track your browsing behavior on our site or across other websites.</p>
          </Section>

          <Section title="Children&apos;s Privacy">
            <p>Triggerfishh is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us and we will promptly delete it.</p>
          </Section>

          <Section title="Your Rights">
            <p style={{ marginBottom: 12 }}>Depending on your jurisdiction, you may have the following rights regarding your personal information:</p>
            <ul>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Correction:</strong> Request that we correct inaccurate or incomplete information.</li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Deletion:</strong> Request that we delete your personal information, subject to certain legal exceptions.</li>
              <li><strong style={{ color: "var(--tf-gate-text)" }}>Data portability:</strong> Request a machine-readable copy of your data.</li>
            </ul>
            <p style={{ marginTop: 12 }}>To exercise any of these rights, please contact us at the email address below. We will respond to your request within 30 days.</p>
          </Section>

          <Section title="Notice to California Residents">
            <p style={{ marginBottom: 12 }}>Under the California Consumer Privacy Act (CCPA), California residents have additional rights regarding their personal information:</p>
            <ul>
              <li>The right to know what personal information we collect and how it is used.</li>
              <li>The right to request deletion of your personal information.</li>
              <li>The right to opt out of the sale of personal information. We do not sell your personal information.</li>
              <li>The right to non-discrimination for exercising your privacy rights.</li>
            </ul>
          </Section>

          <Section title="Notice to Canadian Residents">
            <p>We comply with the Personal Information Protection and Electronic Documents Act (PIPEDA). Your personal information is stored and processed in accordance with Canadian privacy law. You have the right to access, correct, and request deletion of your personal information by contacting us at the email address below.</p>
          </Section>

          <Section title="Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. If we make material changes, we will notify you by posting the updated policy on this page with a revised &ldquo;Last updated&rdquo; date. Your continued use of the Service after any changes constitutes your acceptance of the updated policy.</p>
          </Section>

          <Section title="Contact Us">
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at{" "}
              <a href="mailto:contact@triggerfishh.com" style={{ color: "var(--tf-gate-orange)", textDecoration: "underline" }}>contact@triggerfishh.com</a>.
            </p>
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
