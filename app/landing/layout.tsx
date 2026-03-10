import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Triggerfishh — macOS Menu Bar Voice Assistant with Wake Word",
  description:
    "Triggerfishh is a macOS menu bar voice assistant that listens for a wake word and runs voice commands, workflows, and AI actions — fast, lightweight, and built for power users. One-time purchase, no subscription.",
  keywords: [
    "voice control Mac",
    "Mac voice automation",
    "voice commands macOS",
    "hands-free Mac control",
    "AI Mac automation",
    "AppleScript voice control",
    "macOS voice assistant",
    "voice assistant",
    "menu bar app",
    "menu bar voice assistant",
    "wake word",
    "control Mac with voice",
    "Mac productivity app",
    "voice activated automation",
    "Apple Silicon voice control",
    "macOS Tahoe apps",
  ],
  alternates: {
    canonical: "https://www.triggerfishh.com/landing",
  },
  openGraph: {
    title: "Triggerfishh — macOS Menu Bar Voice Assistant with Wake Word",
    description:
      "macOS menu bar voice assistant that listens for a wake word and runs voice commands, workflows, and AI actions. One-time purchase, no subscription.",
    url: "https://www.triggerfishh.com/landing",
    siteName: "Triggerfishh",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triggerfishh — macOS Menu Bar Voice Assistant",
    description:
      "Wake word voice assistant for macOS. Lives in your menu bar.",
  },
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Triggerfishh",
  alternateName: ["Triggerfishh macOS app"],
  operatingSystem: "macOS 26 (Tahoe) or later",
  applicationCategory: "ProductivitySoftware",
  description:
    "Triggerfishh is a macOS menu bar voice assistant that listens for a wake word and runs voice commands, workflows, and AI actions. Control any Mac app with your voice — launch apps, run scripts, automate workflows, all hands-free.",
  offers: {
    "@type": "Offer",
    price: "9.99",
    priceCurrency: "USD",
    availability: "https://schema.org/PreOrder",
  },
  url: "https://www.triggerfishh.com/landing",
  image: "https://www.triggerfishh.com/images/Icon.png",
  author: {
    "@type": "Organization",
    name: "DeadRatGames Inc.",
  },
  publisher: {
    "@type": "Organization",
    name: "DeadRatGames",
  },
  brand: {
    "@type": "Brand",
    name: "Triggerfishh",
  },
  featureList: [
    "Menu bar access — always available without taking over your screen",
    "Wake word activation",
    "Works with any Mac app",
    "AI-powered command creation from plain English",
    "Custom trigger words",
    "Smart fuzzy command matching",
    "Privacy-first — all voice processing stays local",
    "Customizable audio cues",
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.triggerfishh.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Triggerfishh — Voice-Activated Mac Automation",
      item: "https://www.triggerfishh.com/landing",
    },
  ],
};

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Triggerfishh?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Triggerfishh is a macOS menu bar voice assistant that listens for a wake word and executes your next voice command. Use it to launch apps, run workflows, control actions, and trigger AI-powered tasks without switching context.",
      },
    },
    {
      "@type": "Question",
      name: "Does Triggerfishh run in the menu bar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Triggerfishh lives in your macOS menu bar, staying accessible at all times without taking over your screen.",
      },
    },
    {
      "@type": "Question",
      name: "What macOS version do I need for Triggerfishh?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "macOS 26 (Tahoe) or later. Triggerfishh relies on Apple's latest speech recognition services that are only available on macOS 26+. Earlier versions are not supported.",
      },
    },
    {
      "@type": "Question",
      name: "Does Triggerfishh work on Intel Macs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Triggerfishh requires any Apple Silicon Mac. Intel Macs are not supported.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to pay for an AI service separately?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Triggerfishh uses AI to generate automation commands from your descriptions. You'll need an API key from one of the supported providers (OpenAI, Anthropic/Claude, Google Gemini, or xAI/Grok). The cost of AI API usage depends on your provider and how many commands you create. Most users spend very little — each command generation is a single API call.",
      },
    },
    {
      "@type": "Question",
      name: "Does Triggerfishh use a lot of tokens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not at all! We only use the AI provider to create your commands, which uses a trivial number of tokens — we're talking pennies here. After that everything happens locally on your computer and doesn't use AI at all.",
      },
    },
    {
      "@type": "Question",
      name: "What apps can I control with Triggerfishh?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Any Mac app. Triggerfishh generates automation commands using App Intents, AppleScript, and shell commands. If an app can be scripted or launched from the command line, Triggerfishh can control it.",
      },
    },
    {
      "@type": "Question",
      name: "Is my voice data sent to the cloud?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Speech recognition is handled by Apple's on-device services. Your voice audio stays on your Mac. When you create a new command, the text description (not audio) is sent to your chosen AI provider to generate the automation script.",
      },
    },
    {
      "@type": "Question",
      name: "What if I can't get Triggerfishh to work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Check that your system meets the requirements: macOS 26+ with an Apple Silicon Mac. If you're still having issues, email contact@triggerfishh.com for support. Also check out our videos online for helpful tips and tricks.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use Triggerfishh without an AI API key?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It works without AI with limited functionality, but you really do need an API provider to get the full Triggerfishh experience. Connect OpenAI, Anthropic, Google, or xAI to create powerful automations for your trigger words.",
      },
    },
  ],
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      {children}
    </>
  );
}
