"use client";

import Image from "next/image";

/* ── Brand helper ──────────────────────────────────────────────── */

function Tf() {
  return (
    <>
      Triggerfish<span className="text-[var(--tf-orange)]">h</span>
    </>
  );
}

/* ── Download URL ──────────────────────────────────────────────── */

const DMG_URL =
  "https://github.com/ChristopherLarsen/DMG/releases/download/1.1.0/Triggerfishh-1.1.dmg";

/* ── Installation steps ────────────────────────────────────────── */

const STEPS = [
  {
    number: "1",
    title: "Download the installer",
    desc: "Click the download button above. Your browser will save the .dmg file — you\u2019ll usually find it in your Downloads folder.",
  },
  {
    number: "2",
    title: "Open the .dmg",
    desc: "Double-click the downloaded .dmg file to mount it. A Finder window will pop up showing the app.",
  },
  {
    number: "3",
    title: "Drag to Applications",
    desc: "Drag the Triggerfishh icon into your Applications folder. That\u2019s it — the app is installed!",
  },
  {
    number: "4",
    title: "Launch Triggerfishh",
    desc: "Open your Applications folder and double-click Triggerfishh to get started. macOS may ask you to confirm since the app was downloaded from the internet — just click Open.",
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-[var(--tf-bg)]">
      {/* ── Nav bar ── */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-10">
        <a href="/landing" className="flex items-center gap-2.5 no-underline">
          <Image
            src="/images/triggerfish_logo.png"
            alt="Triggerfishh"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-base font-bold tracking-tight text-[var(--tf-text)]">
            Triggerfish<span className="text-[var(--tf-orange)]">h</span>
          </span>
        </a>
        <div className="flex items-center gap-5 text-sm">
          <a
            href="/terms-of-service"
            className="text-[var(--tf-text-secondary)] transition-colors hover:text-[var(--tf-text)]"
          >
            Terms
          </a>
          <a
            href="/privacy-policy"
            className="text-[var(--tf-text-secondary)] transition-colors hover:text-[var(--tf-text)]"
          >
            Privacy
          </a>
        </div>
      </nav>

      <div className="px-6 pb-12 md:px-10">
        <div className="mx-auto max-w-3xl">
          {/* ── Thank-you heading ── */}
          <h1 className="mt-10 font-[family-name:var(--font-instrument-serif)] text-3xl tracking-tight text-[var(--tf-text)] sm:text-4xl">
            Cool, let's download <Tf />!
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[var(--tf-text-secondary)]">
            We truly appreciate your support. Now let&rsquo;s get the app onto
            your Mac &mdash; it only takes a moment.
          </p>

          {/* ── Download CTA ── */}
          <div className="mt-10 text-center">
            <a
              href={DMG_URL}
              className="inline-flex w-full max-w-md cursor-pointer items-center justify-center gap-3 rounded-xl bg-[var(--tf-orange)] py-4 text-base font-semibold text-white shadow-xl shadow-[var(--tf-orange)]/20 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--tf-orange)]/30 hover:brightness-110"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download <Tf /> (.dmg)
            </a>
            <p className="mt-3 text-xs text-[var(--tf-text-tertiary)]">
              Latest .dmg &middot; macOS 26+ &middot; Apple Silicon
            </p>
          </div>

          {/* ── Installation steps card ── */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-amber-600/20 bg-[var(--tf-surface)] shadow-sm">
            <div className="border-b border-amber-600/20 bg-amber-50 px-8 py-5">
              <h2 className="text-xl font-bold text-[var(--tf-text)]">
                Installation Guide
              </h2>
              <p className="mt-1 text-xs font-semibold tracking-[0.1em] text-amber-700/70 uppercase">
                Four quick steps and you&rsquo;re all set
              </p>
            </div>

            <div className="divide-y divide-[var(--tf-border)]">
              {STEPS.map((step) => (
                <div key={step.number} className="flex items-start gap-5 px-8 py-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--tf-orange)]/10 text-sm font-bold text-[var(--tf-orange)]">
                    {step.number}
                  </span>
                  <div>
                    <p className="font-semibold text-[var(--tf-text)]">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--tf-text-secondary)]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Need help? ── */}
          <div className="mt-10 text-center">
            <p className="text-sm text-[var(--tf-text-secondary)]">
              Having trouble? We&rsquo;re happy to help &mdash;{" "}
              <a
                href="/support"
                className="font-medium text-[var(--tf-orange)] underline underline-offset-2 transition-colors hover:text-[var(--tf-orange)]/80"
              >
                visit our support page
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
