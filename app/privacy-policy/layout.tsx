import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Triggerfishh privacy policy. Voice processing stays on your Mac. No telemetry, no tracking, no account required. Learn how we protect your data.",
  alternates: {
    canonical: "https://www.triggerfishh.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy — Triggerfishh",
    description:
      "Triggerfishh privacy policy. Voice processing stays on your Mac. No telemetry, no tracking, no account required.",
    url: "https://www.triggerfishh.com/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
