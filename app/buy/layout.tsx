import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Triggerfishh — $9.99 One-Time Purchase",
  description:
    "Purchase Triggerfishh for $9.99 — voice-activated Mac automation. Lifetime license, all future updates included. No subscription. Requires macOS 26+ and Apple Silicon.",
  alternates: {
    canonical: "https://www.triggerfishh.com/buy",
  },
  openGraph: {
    title: "Buy Triggerfishh — $9.99 One-Time Purchase",
    description:
      "Voice-activated Mac automation. Lifetime license, all future updates included. No subscription.",
    url: "https://www.triggerfishh.com/buy",
    type: "website",
  },
};

export default function BuyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
