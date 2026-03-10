import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Triggerfishh, the voice-activated Mac automation app by DeadRatGames Inc.",
  alternates: {
    canonical: "https://www.triggerfishh.com/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service — Triggerfishh",
    description:
      "Terms of Service for Triggerfishh, the voice-activated Mac automation app.",
    url: "https://www.triggerfishh.com/terms-of-service",
    type: "website",
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
