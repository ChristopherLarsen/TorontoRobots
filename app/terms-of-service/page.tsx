"use client";

import Image from "next/image";

export default function TermsOfServicePage() {
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
          <a href="/privacy-policy" style={{ fontSize: "0.875rem", color: "#8B4513", textDecoration: "none", letterSpacing: "0.04em" }}>Privacy</a>
          <a href="/" style={{ fontSize: "0.875rem", color: "#8B4513", textDecoration: "none", letterSpacing: "0.04em" }}>Home</a>
        </div>
      </nav>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "20px 24px 80px" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--tf-gate-text)", marginBottom: 8 }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: "0.85rem", color: "var(--tf-gate-text-dim)", marginBottom: 40 }}>
          Last updated: February 16, 2026
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <Section title="Overview">
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of Triggerfishh (&ldquo;the Application,&rdquo; &ldquo;the Software,&rdquo; or &ldquo;the Product&rdquo;), a macOS desktop application developed and distributed by Triggerfishh (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By purchasing, downloading, installing, or otherwise using the Application, you (&ldquo;the User&rdquo; or &ldquo;you&rdquo;) agree to be bound by these Terms in their entirety. If you do not agree to these Terms, you must discontinue use of the Application immediately.
            </p>
          </Section>

          <Section title="License &amp; Use">
            <p>
              Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to install and use the Application on macOS devices that you own or control, solely for your personal or internal business purposes. This license does not grant you any right to sublicense, distribute, modify, reverse-engineer, decompile, or create derivative works based on the Application or any part thereof.
            </p>
            <p style={{ marginTop: 12 }}>
              You acknowledge that the Application requires a valid license key purchased through our authorized payment processor (Lemon Squeezy) and that you must supply your own API key from a supported large language model provider in order to access AI-powered features. We do not provide, warrant, or assume responsibility for third-party API services.
            </p>
          </Section>

          <Section title="User Responsibilities">
            <p>
              You are solely responsible for all activity conducted through your use of the Application and for any commands, prompts, or instructions you provide to or execute through the Application. You agree not to use the Application for any purpose that is unlawful, harmful, or otherwise prohibited by these Terms. You are responsible for maintaining the confidentiality of your license key and any third-party API keys used in connection with the Application.
            </p>
            <p style={{ marginTop: 12 }}>
              You acknowledge that you have sole custody and control over the files, directories, and system resources on your device, and that it is your responsibility to maintain appropriate backups of any data that may be affected by your use of the Application.
            </p>
          </Section>

          {/* === KEY SECTION: AI-Generated Commands Disclaimer === */}
          <section
            style={{
              background: "var(--tf-gate-surface)",
              border: "2px solid var(--tf-gate-orange)",
              borderRadius: 12,
              padding: "24px 28px",
              boxShadow: "0 0 24px rgba(197,112,78,0.10)",
            }}
          >
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--tf-gate-text)", marginBottom: 12 }}>
              AI-Generated Commands &mdash; Assumption of Risk
            </h2>
            <div style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--tf-gate-text-mid)" }}>
              <p>
                <strong style={{ color: "var(--tf-gate-text)" }}>IMPORTANT &mdash; PLEASE READ CAREFULLY.</strong> The Application incorporates large language model (&ldquo;LLM&rdquo;) technology to generate system-level commands that you may choose to execute on your device via a trigger word or other activation mechanism. While Triggerfishh has implemented reasonable and suitable technical safeguards designed to minimize the risk of unintended or destructive outcomes, you expressly acknowledge and agree to the following:
              </p>

              <ul>
                <li>
                  <strong style={{ color: "var(--tf-gate-text)" }}>Inherent Unpredictability.</strong> Large language models generate output probabilistically. Despite our precautions, AI-generated commands may, in rare circumstances, produce unexpected, inaccurate, or unintended results &mdash; including but not limited to commands that delete, rename, move, overwrite, or otherwise modify files, folders, or system resources.
                </li>
                <li>
                  <strong style={{ color: "var(--tf-gate-text)" }}>No Guarantee of Safety.</strong> While we have taken all reasonable and suitable precautions to preclude the possibility of data loss, file corruption, or unintended system modifications resulting from AI-generated commands, no safeguard is absolute. We do not and cannot guarantee that every generated command will be safe, correct, or appropriate for your specific environment.
                </li>
                <li>
                  <strong style={{ color: "var(--tf-gate-text)" }}>User Review and Approval.</strong> You are solely responsible for reviewing, understanding, and approving any command before execution. The Application is designed to present generated commands for your inspection prior to execution. By choosing to execute any AI-generated command, you accept full responsibility for the consequences of that execution.
                </li>
                <li>
                  <strong style={{ color: "var(--tf-gate-text)" }}>Assumption of Risk.</strong> You expressly assume all risk associated with the use of AI-generated commands. You acknowledge that you, and not Triggerfishh, bear ultimate responsibility for what you ask the Application to create, generate, or execute, and for how you use the resulting output. This assumption of risk applies regardless of whether the outcome was foreseeable.
                </li>
                <li>
                  <strong style={{ color: "var(--tf-gate-text)" }}>Waiver and Release.</strong> To the maximum extent permitted by applicable law, you hereby release, discharge, and hold harmless Triggerfishh, its developers, officers, agents, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys&rsquo; fees) arising out of or in connection with any data loss, file deletion, file renaming, directory modification, system alteration, or any other consequence &mdash; whether direct, indirect, incidental, special, consequential, or exemplary &mdash; resulting from the execution of AI-generated commands through the Application.
                </li>
                <li>
                  <strong style={{ color: "var(--tf-gate-text)" }}>Recommendation to Back Up.</strong> We strongly recommend that you maintain current and comprehensive backups of all important data on any device on which you use the Application. Use of the Application without adequate backups is entirely at your own risk.
                </li>
              </ul>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
              section ul { list-style: disc; padding-left: 20px; margin-top: 8px; display: flex; flex-direction: column; gap: 8px; }
            ` }} />
          </section>

          <Section title="Intellectual Property">
            <p>
              The Application, including all code, design, text, graphics, logos, and other content, is the exclusive property of Triggerfishh and is protected by applicable intellectual property laws. Nothing in these Terms transfers any ownership rights to you. All rights not expressly granted herein are reserved.
            </p>
          </Section>

          <Section title="Third-Party Services">
            <p>
              The Application may integrate with or rely upon third-party services, including but not limited to large language model API providers and the Lemon Squeezy payment platform. Your use of such third-party services is governed by their respective terms of service and privacy policies. We are not responsible for the availability, accuracy, or conduct of any third-party service, and we disclaim all liability arising from your use of or reliance on such services.
            </p>
          </Section>

          <Section title="Limitation of Liability">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL TRIGGERFISHH, ITS DEVELOPERS, OFFICERS, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, LOSS OF PROFITS, LOSS OF GOODWILL, BUSINESS INTERRUPTION, OR ANY OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE APPLICATION, REGARDLESS OF THE THEORY OF LIABILITY (CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE) AND EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p style={{ marginTop: 12 }}>
              IN NO EVENT SHALL OUR TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE APPLICATION EXCEED THE AMOUNT YOU PAID TO US FOR THE APPLICATION IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
            </p>
          </Section>

          <Section title="Disclaimer of Warranties">
            <p>
              THE APPLICATION IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE,&rdquo; WITHOUT WARRANTY OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. WE EXPRESSLY DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE APPLICATION WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
          </Section>

          <Section title="Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless Triggerfishh, its developers, officers, agents, and affiliates from and against any and all claims, demands, damages, obligations, losses, liabilities, costs, and expenses (including reasonable attorneys&rsquo; fees) arising out of or in connection with your use of the Application, your violation of these Terms, or your violation of any rights of a third party.
            </p>
          </Section>

          <Section title="Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Triggerfishh operates, without regard to its conflict of law provisions. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.
            </p>
          </Section>

          <Section title="Severability">
            <p>
              If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, or if modification is not possible, severed from these Terms. The remaining provisions shall continue in full force and effect.
            </p>
          </Section>

          <Section title="Changes to Terms">
            <p>
              We reserve the right to modify these Terms at any time. When we make material changes, we will update the &ldquo;Last updated&rdquo; date at the top of this page. Your continued use of the Application following any such modification constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>
              For questions about these Terms, please contact us at{" "}
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
