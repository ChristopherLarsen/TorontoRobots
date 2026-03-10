"use client";

export default function SiteFooter() {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 24px",
        fontSize: "0.7rem",
        letterSpacing: "0.03em",
        color: "rgba(26,26,26,0.35)",
        background: "linear-gradient(transparent, rgba(250,250,250,0.85) 40%)",
        pointerEvents: "none",
      }}
    >
      <span style={{ pointerEvents: "auto" }}>
        &copy; 2026 DeadRatGames Inc.
      </span>
      <a
        href="https://x.com/TriggerfishApp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow @TriggerfishApp on X"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          color: "rgba(26,26,26,0.35)",
          textDecoration: "none",
          pointerEvents: "auto",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(26,26,26,0.7)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(26,26,26,0.35)")}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span>@TriggerfishApp</span>
      </a>
    </footer>
  );
}
