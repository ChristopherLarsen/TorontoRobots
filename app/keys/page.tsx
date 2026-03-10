"use client";

import { useRef, useState } from "react";
import Image from "next/image";

/* ── Provider data ──────────────────────────────────────────────── */

const PROVIDERS = [
  { id: "openai", label: "OpenAI" },
  { id: "claude", label: "Claude" },
  { id: "groq", label: "Groq" },
  { id: "gemini", label: "Gemini" },
] as const;

type ProviderId = (typeof PROVIDERS)[number]["id"];

/* ── Brand helper ───────────────────────────────────────────────── */

function Tf() {
  return (
    <>
      Triggerfish<span className="text-[var(--tf-orange)]">h</span>
    </>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */

export default function KeysPage() {
  const [active, setActive] = useState<ProviderId>("openai");

  const sectionRefs: Record<ProviderId, React.RefObject<HTMLElement | null>> = {
    openai: useRef<HTMLElement>(null),
    claude: useRef<HTMLElement>(null),
    groq: useRef<HTMLElement>(null),
    gemini: useRef<HTMLElement>(null),
  };

  function scrollTo(id: ProviderId) {
    setActive(id);
    sectionRefs[id].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="min-h-screen bg-[var(--tf-bg)]">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 pt-12 pb-4">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--tf-border)] px-4 py-2 text-sm font-medium text-[var(--tf-text-secondary)] transition-all hover:-translate-y-0.5 hover:border-[var(--tf-border-accent)] hover:text-[var(--tf-text)]"
        >
          &larr; Back to home
        </a>

        <h1 className="mt-10 font-[family-name:var(--font-instrument-serif)] text-4xl tracking-tight text-[var(--tf-text)] sm:text-5xl">
          How to find the API key for your AI Provider
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--tf-text-secondary)]">
          <Tf /> connects to multiple AI providers. Follow the steps below to
          get your API key from whichever service you&rsquo;d like to use.
        </p>
      </div>

      {/* ── Sticky provider selector ────────────────────────── */}
      <div className="sticky top-0 z-30 border-b border-[var(--tf-border)] bg-[var(--tf-bg)]/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-6 py-3">
          {PROVIDERS.map((p) => (
            <button
              key={p.id}
              onClick={() => scrollTo(p.id)}
              className={`shrink-0 cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all ${
                active === p.id
                  ? "bg-[var(--tf-orange)] text-white shadow-sm"
                  : "bg-[var(--tf-surface)] text-[var(--tf-text-secondary)] hover:bg-[var(--tf-surface-elevated)] hover:text-[var(--tf-text)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Sections ────────────────────────────────────────── */}
      <main className="mx-auto max-w-3xl space-y-10 px-6 pt-10 pb-20">
        {/* ─── OpenAI ─────────────────────────────────────── */}
        <section
          ref={sectionRefs.openai}
          id="openai"
          className="scroll-mt-20 rounded-2xl border border-[var(--tf-border)] bg-[var(--tf-surface)] shadow-sm"
        >
          <div className="p-7">
            <div className="flex items-center gap-4">
              <Image
                src="/images/ChatGPT.jpg"
                alt="OpenAI"
                width={48}
                height={48}
                className="rounded-xl"
                priority
              />
              <h2 className="text-2xl font-semibold text-[var(--tf-text)]">
                OpenAI
              </h2>
            </div>
            <ol className="mt-5 list-inside list-decimal space-y-2 text-[15px] leading-relaxed text-[var(--tf-text-secondary)]">
              <li>
                Go to{" "}
                <a
                  href="https://platform.openai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--tf-orange)] underline decoration-[var(--tf-orange)]/30 underline-offset-2 hover:decoration-[var(--tf-orange)]"
                >
                  platform.openai.com
                </a>
              </li>
              <li>Sign in (or create an account)</li>
              <li>Click your profile (top right)</li>
              <li>
                Select <strong className="text-[var(--tf-text)]">View API keys</strong>
              </li>
              <li>
                Click{" "}
                <strong className="text-[var(--tf-text)]">Create new secret key</strong>
              </li>
              <li>Copy and store it immediately (you won&rsquo;t see it again)</li>
            </ol>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--tf-orange)] transition-colors hover:text-[var(--tf-accent)]"
            >
              Official OpenAI instructions on obtaining an API key
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>

        {/* ─── Anthropic (Claude) ─────────────────────────── */}
        <section
          ref={sectionRefs.claude}
          id="claude"
          className="scroll-mt-20 rounded-2xl border border-[var(--tf-border)] bg-[var(--tf-surface)] shadow-sm"
        >
          <div className="p-7">
            <div className="flex items-center gap-4">
              <Image
                src="/images/Claude.jpg"
                alt="Anthropic Claude"
                width={48}
                height={48}
                className="rounded-xl"
              />
              <h2 className="text-2xl font-semibold text-[var(--tf-text)]">
                Anthropic (Claude)
              </h2>
            </div>
            <ol className="mt-5 list-inside list-decimal space-y-2 text-[15px] leading-relaxed text-[var(--tf-text-secondary)]">
              <li>
                Go to{" "}
                <a
                  href="https://console.anthropic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--tf-orange)] underline decoration-[var(--tf-orange)]/30 underline-offset-2 hover:decoration-[var(--tf-orange)]"
                >
                  console.anthropic.com
                </a>
              </li>
              <li>Sign in</li>
              <li>
                Navigate to{" "}
                <strong className="text-[var(--tf-text)]">API Keys</strong> in
                the sidebar
              </li>
              <li>
                Click{" "}
                <strong className="text-[var(--tf-text)]">Create Key</strong>
              </li>
              <li>Copy and securely store the key</li>
            </ol>
            <a
              href="https://console.anthropic.com/settings/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--tf-orange)] transition-colors hover:text-[var(--tf-accent)]"
            >
              Official Anthropic instructions on obtaining an API key
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>

        {/* ─── Groq ───────────────────────────────────────── */}
        <section
          ref={sectionRefs.groq}
          id="groq"
          className="scroll-mt-20 rounded-2xl border border-[var(--tf-border)] bg-[var(--tf-surface)] shadow-sm"
        >
          <div className="p-7">
            <div className="flex items-center gap-4">
              <Image
                src="/images/Grok.jpg"
                alt="Groq"
                width={48}
                height={48}
                className="rounded-xl"
              />
              <h2 className="text-2xl font-semibold text-[var(--tf-text)]">
                Groq
              </h2>
            </div>
            <ol className="mt-5 list-inside list-decimal space-y-2 text-[15px] leading-relaxed text-[var(--tf-text-secondary)]">
              <li>
                Go to{" "}
                <a
                  href="https://console.groq.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--tf-orange)] underline decoration-[var(--tf-orange)]/30 underline-offset-2 hover:decoration-[var(--tf-orange)]"
                >
                  console.groq.com
                </a>
              </li>
              <li>Sign in</li>
              <li>
                Open{" "}
                <strong className="text-[var(--tf-text)]">API Keys</strong>
              </li>
              <li>
                Click{" "}
                <strong className="text-[var(--tf-text)]">
                  Create API Key
                </strong>
              </li>
              <li>Copy and store it securely</li>
            </ol>
            <a
              href="https://console.groq.com/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--tf-orange)] transition-colors hover:text-[var(--tf-accent)]"
            >
              Official Groq instructions on obtaining an API key
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>

        {/* ─── Google (Gemini) ────────────────────────────── */}
        <section
          ref={sectionRefs.gemini}
          id="gemini"
          className="scroll-mt-20 rounded-2xl border border-[var(--tf-border)] bg-[var(--tf-surface)] shadow-sm"
        >
          <div className="p-7">
            <div className="flex items-center gap-4">
              <Image
                src="/images/Gemini.jpg"
                alt="Google Gemini"
                width={48}
                height={48}
                className="rounded-xl"
              />
              <h2 className="text-2xl font-semibold text-[var(--tf-text)]">
                Google (Gemini via Google AI Studio)
              </h2>
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-[var(--tf-text-secondary)]">
              Two paths depending on usage:
            </p>

            {/* Simple path */}
            <h3 className="mt-6 text-lg font-semibold text-[var(--tf-text)]">
              Simple Setup (AI Studio)
            </h3>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-[15px] leading-relaxed text-[var(--tf-text-secondary)]">
              <li>
                Go to{" "}
                <a
                  href="https://aistudio.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--tf-orange)] underline decoration-[var(--tf-orange)]/30 underline-offset-2 hover:decoration-[var(--tf-orange)]"
                >
                  aistudio.google.com
                </a>
              </li>
              <li>Sign in</li>
              <li>
                Click{" "}
                <strong className="text-[var(--tf-text)]">Get API key</strong>
              </li>
              <li>Create a new key</li>
              <li>Copy and store it</li>
            </ol>

            {/* Production path */}
            <h3 className="mt-8 text-lg font-semibold text-[var(--tf-text)]">
              Production / Scalable Setup (Google Cloud)
            </h3>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-[15px] leading-relaxed text-[var(--tf-text-secondary)]">
              <li>
                Go to{" "}
                <a
                  href="https://console.cloud.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--tf-orange)] underline decoration-[var(--tf-orange)]/30 underline-offset-2 hover:decoration-[var(--tf-orange)]"
                >
                  console.cloud.google.com
                </a>
              </li>
              <li>Create or select a project</li>
              <li>
                Enable the{" "}
                <strong className="text-[var(--tf-text)]">
                  Generative Language API
                </strong>
              </li>
              <li>
                Go to{" "}
                <strong className="text-[var(--tf-text)]">Credentials</strong>
              </li>
              <li>Create an API key</li>
              <li>Restrict it appropriately</li>
            </ol>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--tf-orange)] transition-colors hover:text-[var(--tf-accent)]"
            >
              Official Google instructions on obtaining an API key
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>

        {/* ── Footer link ───────────────────────────────────── */}
        <div className="flex justify-center pt-4 pb-2">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--tf-border)] px-6 py-2.5 text-sm font-medium text-[var(--tf-text-secondary)] transition-all hover:-translate-y-0.5 hover:border-[var(--tf-border-accent)] hover:text-[var(--tf-text)]"
          >
            &larr; Back to home
          </a>
        </div>
      </main>
    </div>
  );
}