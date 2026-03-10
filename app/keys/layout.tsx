import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Keys — Triggerfishh",
  description:
    "How to find your API key for OpenAI, Claude, Groq, and Gemini.",
};

export default function KeysLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
