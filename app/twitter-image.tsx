import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Triggerfishh — Voice-Activated Mac Automation. Say it. Your Mac does it.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1A1A1A 0%, #2D1F18 50%, #1A1A1A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(197, 112, 78, 0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: "72px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "24px",
          }}
        >
          <span style={{ color: "#FAFAFA" }}>Triggerfish</span>
          <span style={{ color: "#C5704E" }}>h</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: "32px",
            fontWeight: 400,
            color: "rgba(250, 250, 250, 0.7)",
            letterSpacing: "-0.01em",
          }}
        >
          Say it. Your Mac does it.
        </div>

        {/* Price badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "40px",
            padding: "12px 28px",
            borderRadius: "12px",
            background: "rgba(197, 112, 78, 0.15)",
            border: "1px solid rgba(197, 112, 78, 0.3)",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#C5704E",
            }}
          >
            $9.99 — One-Time Purchase
          </span>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "4px",
            background:
              "linear-gradient(90deg, transparent, #C5704E, transparent)",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
