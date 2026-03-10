import Image from "next/image";

export const metadata = {
  title: "Social — Triggerfishh",
  description: "Triggerfishh social — coming soon.",
};

export default function SocialPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-[-120px] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,var(--tf-glow)_0%,transparent_70%)] opacity-60" />

      <div className="relative z-10 flex flex-col items-center">
        <Image
          src="/images/yellow_fish_2x.png"
          alt="Triggerfishh fish"
          width={140}
          height={140}
          className="mb-8 drop-shadow-[0_0_32px_rgba(212,132,100,0.25)]"
          style={{ animation: "fish-float 6s ease-in-out infinite" }}
          priority
        />

        <h1 className="font-[family-name:var(--font-instrument-serif)] text-4xl tracking-tight text-[var(--tf-text)] sm:text-5xl">
          Coming Soon
        </h1>

        <p className="mt-4 max-w-sm text-base leading-relaxed text-[var(--tf-text-secondary)]">
          Something fun is swimming this way. Stay tuned.
        </p>

        <a
          href="/"
          className="mt-10 inline-flex rounded-lg border border-[var(--tf-border)] px-6 py-2.5 text-sm font-medium text-[var(--tf-text-secondary)] transition-all hover:-translate-y-0.5 hover:border-[var(--tf-border-accent)] hover:text-[var(--tf-text)]"
        >
          &larr; Back to home
        </a>
      </div>
    </div>
  );
}
