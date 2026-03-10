import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import SiteFooter from "../components/SiteFooter";

const GA_ID = "G-RZFK2Z4YBL";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Triggerfishh — Voice-Activated Mac Automation",
    template: "%s | Triggerfishh",
  },
  description:
    "Control any Mac app with your voice. Launch apps, run scripts, automate workflows — all hands-free. AI-powered, privacy-first. One-time purchase, no subscription.",
  keywords: [
    "voice control Mac",
    "Mac voice automation",
    "voice commands macOS",
    "hands-free Mac",
    "AI Mac automation",
    "control Mac with voice",
    "voice activated Mac app",
    "AppleScript voice control",
    "macOS voice assistant",
    "Mac productivity tool",
    "Triggerfishh",
  ],
  authors: [{ name: "DeadRatGames Inc." }],
  creator: "DeadRatGames Inc.",
  publisher: "DeadRatGames Inc.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://www.triggerfishh.com"),
  alternates: {
    canonical: "https://www.triggerfishh.com",
  },
  openGraph: {
    title: "Triggerfishh — Voice-Activated Mac Automation",
    description:
      "Control any Mac app with your voice. Launch apps, run scripts, automate workflows — all hands-free. AI-powered, privacy-first.",
    url: "https://www.triggerfishh.com",
    siteName: "Triggerfishh",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triggerfishh — Voice-Activated Mac Automation",
    description:
      "Control any Mac app with your voice. Launch apps, run scripts, automate workflows — all hands-free. AI-powered, privacy-first.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Triggerfishh",
  url: "https://www.triggerfishh.com",
  logo: "https://www.triggerfishh.com/images/Icon.png",
  description:
    "Triggerfishh is a voice-activated Mac automation app that lets you control any Mac app with your voice.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@triggerfishh.com",
    contactType: "customer support",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
