"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Data
   ───────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const FEATURES = [
  {
    title: "Works with any Mac app",
    desc: "Triggerfishh generates automation commands for any application — not just a preset list. It uses AI to write the AppleScript, shell commands, or App Intents needed to control whatever you throw at it.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "AI-powered command creation",
    desc: "Describe what you want in plain English. Triggerfishh\u2019s AI writes the automation. Supports OpenAI, Claude, Gemini, and Grok \u2014 bring your own API key.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 014 4v2a4 4 0 01-8 0V6a4 4 0 014-4z" />
        <path d="M9 18h6M12 14v4" />
        <circle cx="12" cy="21" r="1" />
      </svg>
    ),
  },
  {
    title: "Custom Trigger Words",
    desc: 'The default is Fish, and that\'s our favorite, to be honest, but you can add any word you like. Pick one for different contexts, like "Script" for scripts, "Open" to open apps, whatever tickles your fancy. Time to get your \'Hey Jarvis\' on!',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    title: "Smart command matching",
    desc: "Fuzzy matching means you don\u2019t have to say the exact trigger phrase. Triggerfishh figures out what you meant, with configurable confidence levels. We know when you say dessert, you really meant desert \u2014 but we\u2019re bringing cake anyway.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M8 11h6" />
      </svg>
    ),
  },
  {
    title: "Privacy first",
    desc: "All the voice recognition is processed locally. All the commands execute locally.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Sound like a Fish",
    desc: "Audio cues let you know what\u2019s happening without looking at the screen. Customize every sound, or turn them all off.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 010 7.07" />
        <path d="M19.07 4.93a10 10 0 010 14.14" />
      </svg>
    ),
  },
];

const FAQS = [
  {
    q: "What macOS version do I need?",
    a: "macOS 26 (Tahoe) or later. Triggerfishh relies on Apple\u2019s latest speech recognition services that are only available on macOS 26+. Earlier versions are not supported.",
  },
  {
    q: "Does it work on Intel Macs?",
    a: "No. Triggerfishh requires any Apple Silicon Mac. Intel Macs are not supported.",
  },
  {
    q: "Do I need to pay for an AI service separately?",
    a: "Yes. Triggerfishh uses AI to generate automation commands from your descriptions. You\u2019ll need an API key from one of the supported providers (OpenAI, Anthropic/Claude, Google Gemini, or xAI/Grok). The cost of AI API usage depends on your provider and how many commands you create. Most users spend very little \u2014 each command generation is a single API call.",
  },
  {
    q: "Does Triggerfishh use a lot of tokens?",
    a: "Not at all! We only use the AI provider to create your commands, which uses a trivial number of tokens, we\u2019re talking pennies here. After that everything happens locally on your computer and doesn\u2019t use AI at all!",
  },
  {
    q: "What apps can I control?",
    a: "Any Mac app. Triggerfishh generates automation commands using App Intents, AppleScript, and shell commands. If an app can be scripted or launched from the command line, Triggerfishh can control it.",
  },
  {
    q: "Is my voice data sent to the cloud?",
    a: "Speech recognition is handled by Apple\u2019s on-device services. Your voice audio stays on your Mac. When you create a new command, the text description (not audio) is sent to your chosen AI provider to generate the automation script. Yeah, we\u2019re pretty serious about protecting your privacy.",
  },
  {
    q: "What if I can\u2019t get it to work?",
    a: "Check that your system meets the requirements above. If you\u2019re on macOS 26+ with an Apple Silicon Mac and still having issues, email contact@triggerfishh.com for support. Also check out our videos online for helpful tips and tricks.",
  },
  {
    q: "Can I use it without an AI API key?",
    a: "It works without AI with limited functionality, but seriously — you really do need an API provider to get the full Triggerfishh experience. Connect OpenAI, Anthropic, Google, or xAI to create powerful automations for your trigger words.",
  },
];

const REQUIREMENTS = [
  {
    label: "macOS 26 (Tahoe) or later",
    detail:
      "Triggerfishh uses Apple\u2019s latest on-device speech recognition APIs that are only available on macOS 26+. It will not run on earlier versions.",
    checked: "OK! I have macOS 26!",
  },
  {
    label: "Apple Silicon Mac",
    detail:
      "Any Apple Silicon Mac will do. Intel Macs are not supported.",
    checked: "Yes, I\u2019ve got an M-Series Chip!",
  },
  {
    label: "BYOK (Bring Your Own API Key)",
    detail:
      "Connect your AI provider (OpenAI, Anthropic, Google, xAI) to create powerful automations for your trigger words.",
    note: "Works without AI with limited functionality, but seriously you really do need an API provider to get the full Triggerfishh experience.",
    checked: "Yeah I\u2019ve got my own Key!",
  },
];

/* ─────────────────────────────────────────────
   Branding: the extra "h" is always orange
   ───────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────
   Compatibility pill — reused in 3 locations
   ───────────────────────────────────────────── */

function CompatibilityPill({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-amber-600/30 bg-amber-50 px-4 py-2 text-[0.8rem] font-medium text-amber-700 ${className}`}
    >
      <span>
        Requires macOS 26 (Tahoe) or later&nbsp;&middot;&nbsp;Any Apple Silicon Mac
      </span>
    </div>
  );
}


function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Fade Image Swapper — toggles between light/dark
   ───────────────────────────────────────────── */

function FadeImageSwapper() {
  const [showLight, setShowLight] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowLight((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto mb-6 flex w-full max-w-[280px] items-center justify-center overflow-hidden rounded-xl border border-[var(--tf-border)] bg-[var(--tf-surface)] p-8 shadow-sm relative h-[160px]">
      <Image
        src="/fish_light_mode.png"
        alt="Fish in light mode"
        width={120}
        height={120}
        className={`absolute transition-opacity duration-700 ${showLight ? "opacity-100" : "opacity-0"}`}
      />
      <Image
        src="/fish_dark_mode.png"
        alt="Fish in dark mode"
        width={120}
        height={120}
        className={`absolute transition-opacity duration-700 ${!showLight ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

/* ═════════════════════════════════════════════
   PAGE COMPONENT
   ═════════════════════════════════════════════ */

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ════════════════════ NAV ════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 transition-all duration-300 md:px-10 ${
          scrolled
            ? "bg-white/90 py-3 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "bg-transparent py-5"
        }`}
      >
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 no-underline">
          <Image
            src="/images/triggerfish_logo.png"
            alt="Triggerfishh"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="text-lg font-bold tracking-tight text-[var(--tf-text)]">
            Triggerfish<span className="text-[var(--tf-orange)]">h</span>
          </span>
        </a>

        {/* Center links — desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-[var(--tf-text-secondary)] transition-colors hover:text-[var(--tf-text)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-[var(--tf-text)] transition-transform ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[var(--tf-text)] transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[var(--tf-text)] transition-transform ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full right-0 left-0 border-b border-[var(--tf-border)] bg-white/95 px-6 py-6 shadow-lg shadow-black/5 backdrop-blur-xl md:hidden">
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-base font-medium text-[var(--tf-text-secondary)] transition-colors hover:text-[var(--tf-text)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20 text-center">
        {/* Background glow */}
        <div className="pointer-events-none absolute top-[-200px] left-1/2 h-[700px] w-[900px] -translate-x-1/2 animate-glow-pulse rounded-full bg-[radial-gradient(ellipse,var(--tf-glow)_0%,transparent_70%)]" />

        {/* App icon */}
        <div className="relative z-10 mb-8">
          <Image
            src="/images/triggerfish_logo.png"
            alt="Triggerfishh app icon"
            width={128}
            height={128}
            className="animate-fish-float drop-shadow-[0_0_40px_rgba(212,132,100,0.15)]"
            priority
          />
        </div>

        {/* Headline */}
        <h1 className="relative z-10 max-w-3xl font-[family-name:var(--font-instrument-serif)] text-5xl leading-[1.1] tracking-tight text-[var(--tf-text)] sm:text-6xl md:text-7xl">
          Say it.{" "}
          <span className="bg-gradient-to-r from-[var(--tf-dark-accent)] via-[var(--tf-orange)] to-[var(--tf-accent)] bg-clip-text text-transparent">
            Your Mac does it.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="relative z-10 mt-6 max-w-xl text-lg leading-relaxed text-[var(--tf-text-secondary)] sm:text-xl">
          <Tf /> lets you control any Mac app with your voice &mdash;
          launch apps, run scripts, automate workflows, all hands-free.
        </p>

        {/* CTAs */}
        <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/buy"
            className="rounded-xl bg-[var(--tf-orange)] px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-[var(--tf-orange)]/25 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--tf-orange)]/30 hover:brightness-110"
          >
            Buy Now &mdash; $9.99
          </a>
        </div>

        {/* REQUIREMENT LOCATION 1 — Compatibility pill */}
        <div className="relative z-10 mt-8">
          <CompatibilityPill />
        </div>
      </section>

      {/* ════════════════════ A FISH STORY ════════════════════ */}
      <section className="px-6 py-12 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.15em] text-[var(--tf-orange)] uppercase">
              A Fish Story
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-[family-name:var(--font-instrument-serif)] text-3xl tracking-tight text-[var(--tf-text)] sm:text-4xl md:text-5xl">
              <Tf /> in a nutshell
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[var(--tf-text-secondary)]">
              So, what are you tired of typing all the time?
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-12 overflow-hidden rounded-2xl border border-[var(--tf-border)] bg-[var(--tf-surface)] shadow-sm">
              <Image
                src="/images/fish_story.png"
                alt="Triggerfishh in a nutshell — A Fish Story"
                width={960}
                height={540}
                className="w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ DIVIDER ═══════════════ */}
      <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[var(--tf-border)] to-transparent" />

      {/* ════════════════════ DEMO ════════════════════ */}
      <section id="demo" className="relative px-6 py-12 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--tf-border)] bg-[var(--tf-surface)] shadow-sm">
              {/* Video placeholder / thumbnail */}
              <div className="relative aspect-video w-full">
                <Image
                  src="/images/ftux_commands.png"
                  alt="Triggerfishh voice command interface"
                  fill
                  className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-black/10 bg-white/70 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:border-[var(--tf-orange)]/50 group-hover:bg-[var(--tf-orange)]/20">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="var(--tf-text)"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-8 text-center font-[family-name:var(--font-instrument-serif)] text-xl text-[var(--tf-text-secondary)] italic sm:text-2xl">
              &ldquo;That&rsquo;s it. Say the wake word, say what you want. <Tf /> handles the rest.&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════ SELLING POINT — TEACH YOUR MAC ════════════════════ */}
      <section className="relative overflow-hidden px-6 py-14 md:px-10 md:py-18">
        {/* Soft accent glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,var(--tf-glow)_0%,transparent_70%)] opacity-70" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Reveal>
            <Image
              src="/images/yellow_fish_2x.png"
              alt="Triggerfishh fish"
              width={80}
              height={80}
              className="mx-auto mb-8 animate-fish-float drop-shadow-[0_0_20px_rgba(0,0,0,0.1)]"
            />
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-5xl leading-[1.05] tracking-tight text-[var(--tf-text)] sm:text-6xl md:text-7xl lg:text-8xl">
              Teach your Mac
              <br />
              <span className="bg-gradient-to-r from-[var(--tf-dark-accent)] via-[var(--tf-orange)] to-[var(--tf-accent)] bg-clip-text text-transparent">
                some new tricks!
              </span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[var(--tf-text-secondary)] sm:text-xl">
              Describe what you want to automate.
              <br />
              <Tf /> will <span className="font-semibold">just do it</span>.
              <br />
              <br />
              <em>No coding required!</em>
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mx-auto mt-12 space-y-6 max-w-2xl">
              {/* Flow 1 */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                <div className="flex items-center gap-3 rounded-xl border border-[var(--tf-border)] bg-[var(--tf-surface)] px-5 py-3 shadow-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--tf-orange)]/10 text-sm font-bold text-[var(--tf-orange)]">1</span>
                  <span className="text-sm font-medium text-[var(--tf-text-secondary)]">&ldquo;Fish&rdquo;</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--tf-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto hidden shrink-0 sm:block"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--tf-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto shrink-0 rotate-90 sm:hidden"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                <div className="flex items-center gap-3 rounded-xl border border-[var(--tf-border)] bg-[var(--tf-surface)] px-5 py-3 shadow-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--tf-orange)]/10 text-sm font-bold text-[var(--tf-orange)]">2</span>
                  <span className="text-sm font-medium text-[var(--tf-text-secondary)]">&ldquo;Open Safari&rdquo;</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--tf-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto hidden shrink-0 sm:block"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--tf-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto shrink-0 rotate-90 sm:hidden"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                <div className="flex items-center gap-3 rounded-xl border border-[var(--tf-border-accent)] bg-[var(--tf-surface)] px-5 py-3 shadow-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--tf-orange)]/10 text-sm font-bold text-[var(--tf-orange)]">3</span>
                  <span className="text-sm font-medium text-[var(--tf-text)]">Safari opens</span>
                </div>
              </div>

              {/* Flow 2 */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                <div className="flex items-center gap-3 rounded-xl border border-[var(--tf-border)] bg-[var(--tf-surface)] px-5 py-3 shadow-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--tf-orange)]/10 text-sm font-bold text-[var(--tf-orange)]">1</span>
                  <span className="text-sm font-medium text-[var(--tf-text-secondary)]">&ldquo;Fish&rdquo;</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--tf-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto hidden shrink-0 sm:block"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--tf-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto shrink-0 rotate-90 sm:hidden"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                <div className="flex items-center gap-3 rounded-xl border border-[var(--tf-border)] bg-[var(--tf-surface)] px-5 py-3 shadow-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--tf-orange)]/10 text-sm font-bold text-[var(--tf-orange)]">2</span>
                  <span className="text-sm font-medium text-[var(--tf-text-secondary)]">&ldquo;Run npm dev&rdquo;</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--tf-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto hidden shrink-0 sm:block"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--tf-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto shrink-0 rotate-90 sm:hidden"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                <div className="flex items-center gap-3 rounded-xl border border-[var(--tf-border-accent)] bg-[var(--tf-surface)] px-5 py-3 shadow-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--tf-orange)]/10 text-sm font-bold text-[var(--tf-orange)]">3</span>
                  <span className="text-sm font-medium text-[var(--tf-text)]">Open terminal, run npm dev</span>
                </div>
              </div>

              {/* Flow 3 */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                <div className="flex items-center gap-3 rounded-xl border border-[var(--tf-border)] bg-[var(--tf-surface)] px-5 py-3 shadow-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--tf-orange)]/10 text-sm font-bold text-[var(--tf-orange)]">1</span>
                  <span className="text-sm font-medium text-[var(--tf-text-secondary)]">&ldquo;Fish&rdquo;</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--tf-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto hidden shrink-0 sm:block"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--tf-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto shrink-0 rotate-90 sm:hidden"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                <div className="flex items-center gap-3 rounded-xl border border-[var(--tf-border)] bg-[var(--tf-surface)] px-5 py-3 shadow-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--tf-orange)]/10 text-sm font-bold text-[var(--tf-orange)]">2</span>
                  <span className="text-sm font-medium text-[var(--tf-text-secondary)]">&ldquo;Run tests&rdquo;</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--tf-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto hidden shrink-0 sm:block"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--tf-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto shrink-0 rotate-90 sm:hidden"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                <div className="flex items-center gap-3 rounded-xl border border-[var(--tf-border-accent)] bg-[var(--tf-surface)] px-5 py-3 shadow-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--tf-orange)]/10 text-sm font-bold text-[var(--tf-orange)]">3</span>
                  <span className="text-sm font-medium text-[var(--tf-text)]">Runs unit tests</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ DIVIDER ═══════════════ */}
      <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[var(--tf-border)] to-transparent" />

      {/* ════════════════════ FEATURES ════════════════════ */}
      <section id="features" className="px-6 py-12 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-center text-xs font-bold tracking-[0.15em] text-[var(--tf-orange)] uppercase">
              Features
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 text-center font-[family-name:var(--font-instrument-serif)] text-3xl tracking-tight text-[var(--tf-text)] sm:text-4xl md:text-5xl">
              <Tf /> has some pretty cool stuff
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="group rounded-2xl border border-[var(--tf-border)] bg-[var(--tf-surface)] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--tf-border-accent)] hover:shadow-lg hover:shadow-[var(--tf-orange)]/10">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--tf-orange)]/10 text-[var(--tf-orange)] transition-colors group-hover:bg-[var(--tf-orange)]/20">
                    {f.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-[var(--tf-text)]">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--tf-text-secondary)]">
                    {brandify(f.desc)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ DIVIDER ═══════════════ */}
      <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[var(--tf-border)] to-transparent" />

      {/* ════════════════════ HOW IT WORKS ════════════════════ */}
      <section id="how-it-works" className="px-6 py-12 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-center text-xs font-bold tracking-[0.15em] text-[var(--tf-orange)] uppercase">
              How It Works
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 text-center font-[family-name:var(--font-instrument-serif)] text-3xl tracking-tight text-[var(--tf-text)] sm:text-4xl md:text-5xl">
              Three steps to limitless power
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mx-auto mt-8 max-w-2xl text-center text-base text-[var(--tf-text-secondary)]">
              For example, let&rsquo;s set up a Command to turn Dark Mode on...
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <Reveal delay={0}>
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--tf-orange)] text-xl font-bold text-[var(--tf-orange)]">
                  1
                </div>
                <div className="mx-auto mb-6 w-full max-w-[280px] overflow-hidden rounded-xl border border-[var(--tf-border)] bg-[var(--tf-surface)] shadow-sm">
                  <Image
                    src="/images/ftux_commands.png"
                    alt="Command creation UI"
                    width={340}
                    height={220}
                    className="w-full"
                  />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[var(--tf-text)]">
                  Create a command
                </h3>
                <p className="text-sm leading-relaxed text-[var(--tf-text-secondary)]">
                  Describe your <span className="font-semibold text-[var(--tf-text)]">Command</span> using plain old English:
                  <br />
                  &ldquo;Turn on Dark Mode please!&rdquo;
                </p>
              </div>
            </Reveal>

            {/* Step 2 */}
            <Reveal delay={150}>
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--tf-orange)] text-xl font-bold text-[var(--tf-orange)]">
                  2
                </div>
                <div className="mx-auto mb-6 flex w-full max-w-[280px] items-center justify-center overflow-hidden rounded-xl border border-[var(--tf-border)] bg-[var(--tf-surface)] p-6 shadow-sm">
                  <Image
                    src="/images/always_listening.png"
                    alt="Menu bar fish icon listening"
                    width={280}
                    height={40}
                    className="w-full"
                  />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[var(--tf-text)]">
                  Say the trigger word
                </h3>
                <p className="text-sm leading-relaxed text-[var(--tf-text-secondary)]">
                  Say &ldquo;<span className="font-semibold text-[var(--tf-text)]">Fish</span>&rdquo; to <em>wake the <span className="font-semibold text-[var(--tf-text)]">Fish</span> up!</em>
                </p>
              </div>
            </Reveal>

            {/* Step 3 */}
            <Reveal delay={300}>
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--tf-orange)] text-xl font-bold text-[var(--tf-orange)]">
                  3
                </div>
                <FadeImageSwapper />
                <h3 className="mb-2 text-lg font-semibold text-[var(--tf-text)]">
                  Say your command phrase
                </h3>
                <p className="text-sm leading-relaxed text-[var(--tf-text-secondary)]">
                  Say &ldquo;<span className="font-semibold text-[var(--tf-text)]">Dark Mode</span>&rdquo; and it just happens! That&rsquo;s it.
                  Hands-free.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════ PRICING ════════════════════ */}
      {/* REQUIREMENT LOCATION 3 — pill below buy button */}
      <section id="pricing" className="px-6 py-12 md:px-10">
        <div className="mx-auto max-w-lg">
          <Reveal>
            <p className="text-center text-xs font-bold tracking-[0.15em] text-[var(--tf-orange)] uppercase">
              Pricing
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 text-center font-[family-name:var(--font-instrument-serif)] text-3xl tracking-tight text-[var(--tf-text)] sm:text-4xl">
              One price. Own it forever.
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-12 overflow-hidden rounded-2xl border border-[var(--tf-border-accent)] bg-[var(--tf-surface)] shadow-sm">
              {/* Card header */}
              <div className="border-b border-[var(--tf-border)] bg-gradient-to-b from-[var(--tf-orange)]/5 to-transparent px-8 pt-8 pb-6 text-center">
                <Image
                  src="/images/Icon.png"
                  alt="Triggerfishh"
                  width={56}
                  height={56}
                  className="mx-auto mb-4 rounded-xl"
                />
                <p className="text-sm font-semibold tracking-wide text-[var(--tf-text-secondary)] uppercase">
                  <Tf />
                </p>
                <div className="mx-auto mt-3 mb-2 inline-flex items-center gap-2 rounded-full bg-[var(--tf-orange)]/10 px-3 py-1 text-xs font-bold tracking-wide text-[var(--tf-orange)] uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--tf-orange)] animate-pill-pulse" />
                  50% Off &mdash; Launch Price
                </div>
                <div className="mt-2 flex items-baseline justify-center gap-3">
                  <span className="text-xl font-medium text-[var(--tf-text-tertiary)] line-through">
                    $19.99
                  </span>
                  <span className="font-[family-name:var(--font-instrument-serif)] text-6xl font-normal tracking-tight text-[var(--tf-text)]">
                    $9.99
                  </span>
                </div>
                <p className="mt-1 text-sm text-[var(--tf-text-tertiary)]">
                  one-time &middot; launch price
                </p>
              </div>

              {/* Included */}
              <div className="px-8 py-6">
                <p className="mb-4 text-xs font-bold tracking-[0.1em] text-[var(--tf-text-secondary)] uppercase">
                  What&apos;s included
                </p>
                <ul className="space-y-3">
                  {[
                    "Lifetime license for one user",
                    "All future updates",
                    "All built-in voice commands",
                    "AI command generation (bring your own API key)",
                    "Custom wake words",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-[var(--tf-text-secondary)]"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not included — transparency */}
              <div className="border-t border-[var(--tf-border)] px-8 py-5">
                <p className="mb-3 text-xs font-bold tracking-[0.1em] text-[var(--tf-text-tertiary)] uppercase">
                  Not included
                </p>
                <ul className="space-y-2">
                  {[
                    "AI API usage (you use your own AI provider)",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-[var(--tf-text-tertiary)]"
                    >
                      <span className="mt-0.5 shrink-0 text-[var(--tf-text-tertiary)]">
                        &mdash;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="px-8 pt-2 pb-8 text-center">
                <a
                  href="/buy"
                  className="inline-flex w-full justify-center rounded-xl bg-[var(--tf-orange)] py-4 text-base font-semibold text-white shadow-xl shadow-[var(--tf-orange)]/20 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[var(--tf-orange)]/30 hover:brightness-110"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ DIVIDER ═══════════════ */}
      <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[var(--tf-border)] to-transparent" />

      {/* ════════════════════ FAQ ════════════════════ */}
      {/* REQUIREMENT LOCATION 4 — 3 Q&As reinforce requirements */}
      <section id="faq" className="px-6 py-12 md:px-10">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="text-center text-xs font-bold tracking-[0.15em] text-[var(--tf-orange)] uppercase">
              FAQ
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 mb-12 text-center font-[family-name:var(--font-instrument-serif)] text-3xl tracking-tight text-[var(--tf-text)] sm:text-4xl">
              Questions &amp; Answers
            </h2>
          </Reveal>

          <div className="divide-y divide-[var(--tf-border)]">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 40}>
                <div>
                  <button
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    aria-expanded={faqOpen === i}
                  >
                    <span className="text-[0.95rem] font-medium text-[var(--tf-text-secondary)] transition-colors hover:text-[var(--tf-text)]">
                      {faq.q}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--tf-text-tertiary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`shrink-0 transition-transform duration-300 ${faqOpen === i ? "rotate-180" : ""}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      faqOpen === i ? "max-h-96 pb-5" : "max-h-0"
                    }`}
                  >
                    <p className="text-sm leading-relaxed text-[var(--tf-text-tertiary)]">
                      {brandify(faq.a)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ DIVIDER ═══════════════ */}
      <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[var(--tf-border)] to-transparent" />

      {/* ════════════════════ GET STARTED (4 steps) ════════════════════ */}
      <section className="px-6 py-12 text-center md:px-10">
        <div className="mx-auto max-w-md">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.15em] text-[var(--tf-orange)] uppercase">
              Get the App
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-[family-name:var(--font-instrument-serif)] text-3xl tracking-tight text-[var(--tf-text)] sm:text-4xl">
              Ready to go hands-free?
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <ol className="mt-12 grid grid-cols-[40px_1fr] items-center gap-x-6 gap-y-4 text-left">
              {/* Step 1 */}
              <li className="contents">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[var(--tf-dark-accent)] text-sm font-black text-[var(--tf-text)]">
                  1
                </span>
                <a
                  href="/buy"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--tf-orange)] px-5 py-3 text-[0.95rem] font-semibold text-white shadow-md shadow-[var(--tf-orange)]/15 transition-all hover:-translate-y-0.5 hover:brightness-110"
                >
                  Purchase a license
                </a>
              </li>

              {/* Step 2 */}
              <li className="contents">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[var(--tf-dark-accent)] text-sm font-black text-[var(--tf-text)]">
                  2
                </span>
                <a
                  href="/download"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--tf-border)] px-5 py-3 text-[0.95rem] font-semibold text-[var(--tf-text)] transition-all hover:-translate-y-0.5 hover:border-[var(--tf-border-accent)] hover:bg-[var(--tf-surface-elevated)]"
                >
                  Download the .dmg
                </a>
              </li>

              {/* Step 3 */}
              <li className="contents">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[var(--tf-dark-accent)] text-sm font-black text-[var(--tf-text)]">
                  3
                </span>
                <a
                  href="#faq"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--tf-border)] px-5 py-3 text-[0.95rem] font-semibold text-[var(--tf-text)] transition-all hover:-translate-y-0.5 hover:border-[var(--tf-border-accent)] hover:bg-[var(--tf-surface-elevated)]"
                >
                  Add your AI API Key
                </a>
              </li>

              {/* Step 4 */}
              <li className="contents">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[var(--tf-dark-accent)] text-sm font-black text-[var(--tf-text)]">
                  4
                </span>
                <span className="flex w-full items-center justify-center text-base font-semibold text-[var(--tf-text)]">
                  Tell your Fish what to do!
                </span>
              </li>
            </ol>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <span className="flex items-center gap-1.5 text-[0.8rem] text-[var(--tf-text-tertiary)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--tf-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                Private
              </span>
              <span className="flex items-center gap-1.5 text-[0.8rem] text-[var(--tf-text-tertiary)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--tf-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                No subscription
              </span>
              <span className="flex items-center gap-1.5 text-[0.8rem] text-[var(--tf-text-tertiary)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--tf-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                Quick setup
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ DIVIDER ═══════════════ */}
      <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[var(--tf-border)] to-transparent" />

      {/* ════════════════════ FOOTER ════════════════════ */}
      <footer className="px-6 py-12 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 sm:flex-row">
          {/* Left — brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/Icon.png"
              alt="Triggerfishh"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="text-sm text-[var(--tf-text-tertiary)]">
              <Tf /> &middot; &copy; 2026 DeadRatGames Inc.
            </span>
          </div>

          {/* Center — links */}
          <div className="flex gap-6 text-sm">
            <a
              href="/privacy-policy"
              className="text-[var(--tf-text-tertiary)] transition-colors hover:text-[var(--tf-text-secondary)]"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-[var(--tf-text-tertiary)] transition-colors hover:text-[var(--tf-text-secondary)]"
            >
              Terms of Service
            </a>
            <a
              href="mailto:contact@triggerfishh.com"
              className="text-[var(--tf-text-tertiary)] transition-colors hover:text-[var(--tf-text-secondary)]"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
