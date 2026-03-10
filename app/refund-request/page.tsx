"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";

type FormState = "idle" | "loading" | "success" | "error";

export default function RefundRequestPage() {
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [reason, setReason] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const canSubmit = email.trim() !== "" && orderId.trim() !== "" && state !== "loading";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setState("loading");
    setMessage("");

    try {
      const res = await fetch("/api/refund-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          orderId: orderId.trim(),
          reason: reason.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        setState("success");
        setMessage(data.message);
      } else {
        setState("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
    :root {
      --tf-gate-orange: #C5704E;
      --tf-gate-orange-dim: rgba(197,112,78,0.08);
      --tf-gate-bg: #FAFAFA;
      --tf-gate-surface: #FFFFFF;
      --tf-gate-border: rgba(0,0,0,0.08);
      --tf-gate-text: #1A1A1A;
      --tf-gate-text-dim: rgba(26,26,26,0.4);
      --tf-gate-text-mid: rgba(26,26,26,0.6);
    }

    html, body { margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
      background: var(--tf-gate-bg) !important;
      color: var(--tf-gate-text);
      -webkit-font-smoothing: antialiased;
    }

    .tf-bg-glow {
      position: fixed; inset: 0;
      background: radial-gradient(ellipse 600px 400px at 50% 20%, var(--tf-gate-orange-dim), transparent 70%);
      pointer-events: none; z-index: 0;
    }

    .tf-grid-overlay {
      position: fixed; inset: 0;
      background-image:
        linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none; z-index: 0;
    }

    .refund-input {
      width: 100%;
      padding: 12px 16px;
      font-size: 0.9rem;
      font-family: inherit;
      letter-spacing: 0.02em;
      border: 1px solid var(--tf-gate-border);
      border-radius: 8px;
      background: var(--tf-gate-surface);
      color: var(--tf-gate-text);
      outline: none;
      transition: border-color 0.25s ease, box-shadow 0.25s ease;
      box-sizing: border-box;
    }

    .refund-input::placeholder { color: var(--tf-gate-text-dim); }

    .refund-input:focus {
      border-color: var(--tf-gate-orange);
      box-shadow: 0 0 16px rgba(197,112,78,0.12);
    }

    .refund-textarea {
      resize: vertical;
      min-height: 80px;
    }

    .refund-btn {
      width: 100%;
      padding: 14px 24px;
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: #fff;
      background: var(--tf-gate-orange);
      border: 1px solid var(--tf-gate-orange);
      border-radius: 8px;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.2s ease;
    }

    .refund-btn:hover:not(:disabled) {
      background: #b56343;
      border-color: #b56343;
      box-shadow: 0 4px 20px rgba(197,112,78,0.3);
      transform: translateY(-1px);
    }

    .refund-btn:active:not(:disabled) { transform: translateY(0); }

    .refund-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
          `,
        }}
      />

      <div className="tf-bg-glow" />
      <div className="tf-grid-overlay" />

      {/* Nav */}
      <nav style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/images/triggerfish_logo.png" alt="Triggerfishh" width={32} height={32} style={{ borderRadius: 8 }} />
          <span style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.01em", color: "var(--tf-gate-text)" }}>
            Triggerfish<span style={{ color: "var(--tf-gate-orange)" }}>h</span>
          </span>
        </a>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="/support" style={{ fontSize: "0.875rem", color: "#8B4513", textDecoration: "none", letterSpacing: "0.04em" }}>Support</a>
          <a href="/refund" style={{ fontSize: "0.875rem", color: "#8B4513", textDecoration: "none", letterSpacing: "0.04em" }}>Refund Policy</a>
          <a href="/" style={{ fontSize: "0.875rem", color: "#8B4513", textDecoration: "none", letterSpacing: "0.04em" }}>Home</a>
        </div>
      </nav>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 540, margin: "0 auto", padding: "20px 24px 80px" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--tf-gate-text)", marginBottom: 8 }}>
          Request a Refund
        </h1>
        <p style={{ fontSize: "0.9rem", color: "var(--tf-gate-text-dim)", marginBottom: 32, lineHeight: 1.6 }}>
          We offer a 30-day money-back guarantee. Fill out the form below and your refund will be processed automatically.
        </p>

        {state === "success" ? (
          <div
            style={{
              background: "var(--tf-gate-surface)",
              border: "1px solid var(--tf-gate-border)",
              borderRadius: 12,
              padding: "40px 28px",
              textAlign: "center",
              boxShadow: "0 0 20px rgba(197,112,78,0.04)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>&#10003;</div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--tf-gate-text)", marginBottom: 12 }}>Refund Approved</h2>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--tf-gate-text-mid)", marginBottom: 24 }}>{message}</p>
            <a
              href="/support"
              style={{
                display: "inline-block",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: "var(--tf-gate-orange)",
                textDecoration: "none",
              }}
            >
              &larr; Back to Support
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              background: "var(--tf-gate-surface)",
              border: "1px solid var(--tf-gate-border)",
              borderRadius: 12,
              padding: "28px",
              boxShadow: "0 0 20px rgba(197,112,78,0.04)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--tf-gate-text)", marginBottom: 6, letterSpacing: "0.02em" }}>
                Email Address
              </label>
              <input
                type="email"
                className="refund-input"
                placeholder="The email used for your purchase"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={state === "loading"}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--tf-gate-text)", marginBottom: 6, letterSpacing: "0.02em" }}>
                Order ID
              </label>
              <input
                type="text"
                className="refund-input"
                placeholder="From your order confirmation email"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
                disabled={state === "loading"}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--tf-gate-text)", marginBottom: 6, letterSpacing: "0.02em" }}>
                Reason <span style={{ fontWeight: 400, color: "var(--tf-gate-text-dim)" }}>(optional)</span>
              </label>
              <textarea
                className="refund-input refund-textarea"
                placeholder="Help us improve — what didn't work for you?"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={state === "loading"}
              />
            </div>

            {state === "error" && message && (
              <div style={{ fontSize: "0.85rem", color: "#c0392b", background: "rgba(192,57,43,0.06)", border: "1px solid rgba(192,57,43,0.15)", borderRadius: 8, padding: "12px 16px", lineHeight: 1.5 }}>
                {message}
              </div>
            )}

            <button type="submit" className="refund-btn" disabled={!canSubmit}>
              {state === "loading" ? "Processing your refund..." : "Submit Refund Request"}
            </button>

            <p style={{ fontSize: "0.75rem", color: "var(--tf-gate-text-dim)", textAlign: "center", margin: 0, lineHeight: 1.5 }}>
              By submitting, your refund will be processed automatically if eligible.
              <br />
              Questions? Email{" "}
              <a href="mailto:contact@triggerfishh.com" style={{ color: "var(--tf-gate-orange)", textDecoration: "underline" }}>contact@triggerfishh.com</a>
            </p>
          </form>
        )}
      </div>
    </>
  );
}
