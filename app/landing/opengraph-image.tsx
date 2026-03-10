import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Triggerfishh — Voice-Activated Mac Automation. Control any Mac app with your voice. $9.99 one-time purchase.";

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
          background:
            "linear-gradient(135deg, #1A1A1A 0%, #2D1F18 50%, #1A1A1A 100%)",
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
            width: "700px",
            height: "500px",
            background:
              "radial-gradient(ellipse, rgba(197, 112, 78, 0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: "64px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "16px",
          }}
        >
          <span style={{ color: "#FAFAFA" }}>Triggerfish</span>
          <span style={{ color: "#C5704E" }}>h</span>
        </div>

        {/* Main tagline */}
        <div
          style={{
            display: "flex",
            fontSize: "36px",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            marginBottom: "8px",
          }}
        >
          <span style={{ color: "rgba(250, 250, 250, 0.9)" }}>
            Say it.{" "}
          </span>
          <span style={{ color: "#C5704E", marginLeft: "10px" }}>
            Your Mac does it.
          </span>
        </div>

        {/* Description */}
        <div
          style={{
            display: "flex",
            fontSize: "20px",
            color: "rgba(250, 250, 250, 0.5)",
            maxWidth: "700px",
            textAlign: "center",
            marginTop: "12px",
            lineHeight: 1.4,
          }}
        >
          Voice-activated automation for any Mac app. AI-powered. Privacy-first.
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: "40px",
            fontSize: "16px",
            color: "rgba(250, 250, 250, 0.4)",
            fontWeight: 500,
          }}
        >
          <span>Works with Any App</span>
          <span style={{ color: "rgba(197, 112, 78, 0.5)" }}>·</span>
          <span>Plain English Commands</span>
          <span style={{ color: "rgba(197, 112, 78, 0.5)" }}>·</span>
          <span>Local Processing</span>
          <span style={{ color: "rgba(197, 112, 78, 0.5)" }}>·</span>
          <span>$9.99 One-Time</span>
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
