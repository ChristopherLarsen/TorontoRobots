# TriggerfishhWeb SEO

Below is a clean agent task spec updated for:
	•	✅ Next.js App Router
	•	✅ Product name Triggerfishh (two “h”)

⸻

TASK: Triggerfishh Landing Page SEO (Next.js App Router)

Goal

Make /landing fully indexable and unambiguous for:
“Triggerfishh macOS voice assistant menu bar app”

⸻

1) Highest-impact SEO checklist (implement ALL)

A. Indexability / Crawl
	•	Page renders meaningful content via SSR/SSG (no JS-only text).
	•	robots.txt allows crawl of /landing.
	•	sitemap.xml includes /landing.
	•	Canonical set to https://www.triggerfishh.com/landing.
	•	No noindex anywhere.
	•	Page returns HTTP 200.

B. On-page signals
	•	<title> includes Triggerfishh + macOS + voice assistant + menu bar.
	•	Strong meta description.
	•	Exactly one H1 clearly describing the product.
	•	300–800 words crawlable content.
	•	“What is Triggerfishh?” section.
	•	Feature list as text.
	•	Natural keywords included:
	•	macOS voice assistant
	•	menu bar app
	•	wake word
	•	voice commands
	•	AI assistant
	•	FAQ section in HTML.
	•	Visible mention: “Triggerfishh macOS app”.

C. Structured data
	•	SoftwareApplication JSON-LD added.

⸻

2) Exact title + metadata (Next.js App Router)

File: app/landing/page.tsx

export const metadata = {
  title: "Triggerfishh — macOS Menu Bar Voice Assistant with Wake Word",
  description:
    "Triggerfishh is a macOS menu bar voice assistant that listens for a wake word and runs voice commands, workflows, and AI actions—fast, lightweight, and built for power users.",
  alternates: {
    canonical: "https://www.triggerfishh.com/landing"
  },
  openGraph: {
    title:
      "Triggerfishh — macOS Menu Bar Voice Assistant with Wake Word",
    description:
      "Voice assistant for macOS that runs commands and AI actions from your menu bar.",
    url: "https://www.triggerfishh.com/landing",
    siteName: "Triggerfishh",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Triggerfishh — macOS Menu Bar Voice Assistant",
    description:
      "Wake word voice assistant for macOS."
  }
};


⸻

3) Recommended visible headings

H1

Voice Assistant for macOS that Lives in Your Menu Bar

Hero subhead

Say a wake word, speak a command, and Triggerfishh runs it — automation, shortcuts, and AI actions without leaving your workflow.

⸻

4) Copy-paste SEO section (add below hero)

What is Triggerfishh?

Triggerfishh is a macOS menu bar app that listens for a wake word and executes your next voice command. Use it to launch apps, run workflows, control actions, and trigger AI-powered tasks without switching context.

Why use a menu bar voice assistant?

Triggerfishh is designed for fast, low-friction command execution:
	•	Always available in the menu bar
	•	Wake word activation
	•	Custom voice commands
	•	AI task execution
	•	Lightweight macOS integration

What you can do with Triggerfishh
	•	Launch apps using voice commands
	•	Run custom workflows hands-free
	•	Trigger automation tasks
	•	Start AI drafting or summarization
	•	Stay focused while commands run in the background

Who it’s for

Triggerfishh is built for macOS users who want faster workflows — developers, writers, creators, and power users.


⸻

5) Google-bot optimized content block

Triggerfishh is a macOS voice assistant menu bar application that listens for a wake word and runs voice commands. Users can create custom commands to launch apps, trigger workflows, and start AI actions. Triggerfishh is designed for fast voice control on macOS.

⸻

6) FAQ section (HTML content)

Q: What is Triggerfishh?
A: Triggerfishh is a macOS menu bar voice assistant that listens for a wake word and executes commands.

Q: Does Triggerfishh run in the menu bar?
A: Yes, it stays accessible without taking over your screen.

Q: What can I control with voice commands?
A: Apps, workflows, and AI actions.

Q: How is Triggerfishh different from Siri?
A: It focuses on customizable automation and fast command execution.

Q: Who is Triggerfishh for?
A: macOS users who want voice-first workflows.

⸻

7) JSON-LD (Next.js App Router — add inside page)

import Script from "next/script";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Triggerfishh",
  "alternateName": ["Triggerfishh macOS app"],
  "applicationCategory": "ProductivitySoftware",
  "operatingSystem": "macOS",
  "description":
    "Triggerfishh is a macOS menu bar voice assistant that listens for a wake word and runs voice commands, workflows, and AI actions.",
  "publisher": {
    "@type": "Organization",
    "name": "DeadRatGames"
  },
  "brand": {
    "@type": "Brand",
    "name": "Triggerfishh"
  },
  "url": "https://www.triggerfishh.com/landing"
};

export function StructuredData() {
  return (
    <Script
      id="jsonld-triggerfishh"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

Then render:

<StructuredData />

