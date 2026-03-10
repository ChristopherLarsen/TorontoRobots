"use client";

import React, { useState } from "react";
import Image from "next/image";

/* ── Requirements data ─────────────────────────────────────────── */

interface Requirement {
  label: string;
  detail: string;
  checked: string;
  note?: string;
}

const REQUIREMENTS: Requirement[] = [
  {
    label: "macOS 26 (Tahoe) or later",
    detail:
      "Triggerfishh uses Apple\u2019s latest on-device speech recognition APIs that are only available on macOS 26+. Click \uF8FF > About This Mac and check it says macOS 26 or later.",
    checked: "OK! I have macOS 26!",
  },
  {
    label: "Apple Silicon Mac",
    detail:
      "Any Apple Silicon Mac will do. Intel Macs are not supported.\nNot sure what chip you have? Click \uF8FF > About This Mac and check it says Chip: Apple M1 or later.",
    checked: "Yes, I\u2019ve got an M-Series Chip!",
  },
  {
    label: "BYOK (Bring Your Own API Key)",
    detail:
      "You'll need an API Key from your AI provider (OpenAI, Anthropic, Google, xAI) to create commands. Keys will start with 'sk-' with a long string of letters and numbers.",
    checked: "Yes, I\u2019ve got my own Key!",
  },
];

/* ── Brand helper ──────────────────────────────────────────────── */

function Tf() {
  return (
    <>
      Triggerfish<span className="text-[var(--tf-orange)]">h</span>
    </>
  );
}

/** Replace every "Triggerfishh" in a plain string with the branded JSX. */
function brandify(text: string): React.ReactNode {
  const parts = text.split("Triggerfishh");
  if (parts.length === 1) return text;
  return parts.flatMap((part, i) =>
    i < parts.length - 1 ? [part, <Tf key={i} />] : [part]
  );
}

/* ── Checkout URL (placeholder) ────────────────────────────────── */

const CHECKOUT_URL = "https://triggerfishh.lemonsqueezy.com/checkout";

/* ── Page ──────────────────────────────────────────────────────── */

export default function BuyPage() {
  const [reqChecked, setReqChecked] = useState<boolean[]>([false, false, false]);
  const allChecked = reqChecked.every(Boolean);

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

        {/* Page title */}
        <h1 className="mt-10 font-[family-name:var(--font-instrument-serif)] text-3xl tracking-tight text-[var(--tf-text)] sm:text-4xl">
          Get Triggerfish<span className="text-[var(--tf-orange)]">h</span>!
        </h1>
        <p className="mt-3 text-base text-[var(--tf-text-secondary)]">
          Double check you've got everything the Fish needs ...
        </p>

        {/* ── Before You Buy card ── */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-amber-600/20 bg-[var(--tf-surface)] shadow-sm">
          {/* Header bar */}
          <div className="border-b border-amber-600/20 bg-amber-50 px-8 py-5">
            <h2 className="text-xl font-bold text-[var(--tf-text)]">
              Triggerfishh Requirements
            </h2>
            <p className="mt-1 text-xs font-semibold tracking-[0.1em] text-amber-700/70 uppercase">
              Click all the boxes to continue
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-0 divide-y divide-[var(--tf-border)]">
            {REQUIREMENTS.map((req, i) => (
              <div key={i} className="px-8 py-5">
                <div className="flex items-start gap-4">
                  <button
                    type="button"
                    aria-checked={reqChecked[i]}
                    role="checkbox"
                    onClick={() =>
                      setReqChecked((prev) =>
                        prev.map((v, idx) => (idx === i ? !v : v))
                      )
                    }
                    className={`mt-0.5 flex h-[29px] w-[29px] shrink-0 cursor-pointer items-center justify-center rounded border transition-colors duration-200 ${
                      reqChecked[i]
                        ? "border-green-600 bg-green-600"
                        : "border-[var(--tf-border)] bg-[var(--tf-surface-elevated)] hover:border-green-400"
                    }`}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={reqChecked[i] ? "white" : "var(--tf-text-tertiary)"}
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </button>
                  <div>
                    <p className="font-semibold text-[var(--tf-text)]">
                      {req.label}
                      {reqChecked[i] && (
                        <span className="ml-2 text-sm font-semibold text-green-700">
                          — {req.checked}
                        </span>
                      )}
                    </p>
                    <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-[var(--tf-text-secondary)]">
                      {brandify(req.detail)}
                    </p>
                    {req.note && (
                      <p className="mt-2 text-xs leading-relaxed text-[var(--tf-text-tertiary)]">
                        * {req.note.split("seriously").map((part, j, arr) =>
                          j < arr.length - 1 ? (
                            <span key={j}>{brandify(part)}<em className="font-medium italic">seriously</em></span>
                          ) : (
                            <span key={j}>{brandify(part)}</span>
                          )
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Purchase button ── */}
        <div className="mt-10 text-center">

          <a
            href={allChecked ? CHECKOUT_URL : undefined}
            target={allChecked ? "_blank" : undefined}
            rel={allChecked ? "noopener noreferrer" : undefined}
            aria-disabled={!allChecked}
            className={`inline-flex w-full max-w-md justify-center rounded-xl py-4 text-base font-semibold text-white shadow-xl transition-all ${
              allChecked
                ? "bg-[var(--tf-orange)] shadow-[var(--tf-orange)]/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--tf-orange)]/30 hover:brightness-110 cursor-pointer"
                : "bg-[var(--tf-orange)]/40 shadow-none cursor-not-allowed pointer-events-none select-none"
            }`}
          >
            Purchase <Tf /> &mdash; $9.99
          </a>
          <p className="mt-3 text-xs leading-relaxed text-[var(--tf-text-tertiary)]">
            <Tf /> is a one-time purchase, not a subscription, free updates forever.
          </p>
          <p className="mt-3 text-xs text-[var(--tf-text-tertiary)]">
            Powered by Lemon Squeezy &middot; Secure checkout
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
