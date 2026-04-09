"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkBusinessAuth } from "../../../components/PasswordModal";

const bom: { item: string; qty: number; unit: number; total: number; note?: string }[] = [
  { item: "Unitree Go2 EDU (used, planning)", qty: 1, unit: 11000, total: 11000, note: "Onboard Jetson Orin Nano is strategic; new retail ~$14.5K, used target $9K–$11K" },
  { item: "Unitree D1 6-DOF Arm", qty: 1, unit: 4655, total: 4655, note: "500g payload, 670mm reach" },
  { item: "Orbbec Gemini 335 depth camera", qty: 1, unit: 264, total: 264 },
  { item: "Fin Ray compliant gripper (custom print + fingers)", qty: 1, unit: 400, total: 400 },
  { item: "Spare Go2 battery", qty: 1, unit: 400, total: 400 },
  { item: "Mount plate, cabling, power distribution", qty: 1, unit: 500, total: 500 },
  { item: "E-stop + safety harness", qty: 1, unit: 150, total: 150 },
  { item: "Shelf mock-up rig (wood, brackets, 355ml cans)", qty: 1, unit: 100, total: 100 },
  { item: "Demo webcam (pre-recorded backup capture)", qty: 1, unit: 100, total: 100 },
];
const bomTotal = bom.reduce((s, r) => s + r.total, 0);

const timeline = [
  { week: "1", focus: "Hardware receiving, Go2 + D1 bring-up, e-stop + safety checkout" },
  { week: "2", focus: "D1 URDF acquisition (Unitree contact / CAD convert / Z1 proxy), mount + power integration" },
  { week: "3", focus: "Teleop rig online, first end-to-end can pick on the bench" },
  { week: "4", focus: "Shelf rig built, teleop demo collection begins (~100 episodes)" },
  { week: "5", focus: "Isaac Lab training on GX10 pair — BC + Diffusion Policy baselines" },
  { week: "6", focus: "Sim2real transfer, policy iteration, failure-mode logging" },
  { week: "7", focus: "Dress rehearsal runs on real hardware, pre-record backup video" },
  { week: "8", focus: "Demo lock, travel case, contingency drills, ready for meeting" },
];

const risks = [
  { risk: "D1 URDF unavailable publicly", mitigation: "Contact Unitree, fall back to CAD convert (2–5 person-days), use Z1 as proxy during early integration" },
  { risk: "Used Go2 EDU supply tight", mitigation: "Budget accommodates new Go2 EDU at $14.5K; downstream items trim to fit if needed" },
  { risk: "Live demo failure on the day", mitigation: "Pre-recorded backup video mandatory. Scripted fallback. Teleop-assisted autonomy acceptable." },
  { risk: "Grasp reliability on 355ml cans", mitigation: "Compliant Fin Ray gripper + pre-known SKU + pre-known shelf geometry. Lower shelf only." },
  { risk: "Battery drain during long session", mitigation: "Spare battery + hot-swap. Demo window kept under 15 minutes per run." },
];

export default function MvpDogDemoPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!checkBusinessAuth()) {
      router.push("/");
      return;
    }
    setAuthed(true);
  }, [router]);

  if (!authed) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link
        href="/business"
        className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-accent)] transition-colors mb-6 inline-block"
      >
        &larr; Back to Our Business
      </Link>

      <h1 className="text-3xl font-black tracking-tight mb-2">MVP Dog Demo — Supermarket Can Restocking</h1>
      <p className="text-lg text-[var(--color-brand-muted)] italic mb-6">
        Proof-of-concept hardware demo to unlock a research agreement for 10 Unitree G-1 units with Loblaws or Costco.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--color-brand-accent)] mb-2">Mission</h2>
        <p>
          Stand up a working Unitree Go2 EDU + D1 arm + compliant gripper hardware demo that restocks 355ml soda cans on a
          supermarket lower shelf. The dog restocker is the PoC artifact — not the shipped product. The shipped product is a
          research agreement for 10 Unitree G-1 humanoids with a Canadian grocery chain.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--color-brand-accent)] mb-2">Scope Constraints</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Lower shelf only (no reaching, no ladders, no overhead).</li>
          <li>355ml soda cans only. Single pre-known SKU.</li>
          <li>Pre-known shelf geometry. Pre-measured fixture.</li>
          <li>Teleop-assisted autonomy is acceptable. Fully autonomous is not required.</li>
          <li>Pre-recorded backup video mandatory for live failure recovery.</li>
          <li>In-person hardware demo is the headline. Sim is support infrastructure only.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--color-brand-accent)] mb-2">First-Target Chains</h2>
        <p className="mb-2">
          <strong>Loblaws</strong> — dominant Canadian supermarket chain. Largest national footprint, highest restocking labor spend.
        </p>
        <p>
          <strong>Costco</strong> — warehouse format. Pallet-to-shelf restocking pain is acute and well-understood. Scale to justify
          a 10-unit G-1 research agreement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--color-brand-accent)] mb-2">Bill of Materials</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--color-brand-border)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-brand-surface)]">
              <tr>
                <th className="text-left px-3 py-2">Item</th>
                <th className="text-right px-3 py-2">Qty</th>
                <th className="text-right px-3 py-2">Unit (USD)</th>
                <th className="text-right px-3 py-2">Total (USD)</th>
              </tr>
            </thead>
            <tbody>
              {bom.map((r) => (
                <tr key={r.item} className="border-t border-[var(--color-brand-border)] align-top">
                  <td className="px-3 py-2">
                    <div>{r.item}</div>
                    {r.note && <div className="text-xs text-[var(--color-brand-muted)] mt-1">{r.note}</div>}
                  </td>
                  <td className="text-right px-3 py-2">{r.qty}</td>
                  <td className="text-right px-3 py-2">${r.unit.toLocaleString()}</td>
                  <td className="text-right px-3 py-2">${r.total.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="border-t border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] font-bold">
                <td className="px-3 py-2" colSpan={3}>Total</td>
                <td className="text-right px-3 py-2">${bomTotal.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[var(--color-brand-muted)] mt-2">
          Budget cap: $17,500 USD. Current BOM: ${bomTotal.toLocaleString()}. Upside if used Go2 EDU lands at $9K.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--color-brand-accent)] mb-2">Software Stack</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Training compute:</strong> TR-owned ASUS GX10 / DGX Spark pair (GB10 Grace Blackwell, ~128GB unified memory).</li>
          <li><strong>Isaac Lab 4.x</strong> — aarch64 build from source on DGX Spark (~10–15 min). RSL-RL for locomotion priors.</li>
          <li><strong>Behavior Cloning + Diffusion Policy</strong> trained on ~100 real teleop episodes on the actual hardware.</li>
          <li><strong>Horizon Robotics SLIM</strong> (arXiv 2509.03859) as published quadruped+arm pick-and-place blueprint.</li>
          <li><strong>Onboard inference:</strong> Go2 EDU Jetson Orin Nano. No tethered laptop if avoidable.</li>
          <li><strong>Sim role:</strong> policy training, sim2real, backup video capture. Not the buyer-facing artifact.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--color-brand-accent)] mb-2">8-Week Timeline</h2>
        <div className="space-y-2">
          {timeline.map((t) => (
            <div key={t.week} className="flex gap-4 border-l-2 border-[var(--color-brand-accent)] pl-3">
              <div className="font-bold w-16 shrink-0">Week {t.week}</div>
              <div>{t.focus}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-[var(--color-brand-muted)] mt-2">
          Target demo-ready: ~2026-06-04. Meeting booked only when demo is proven, not before.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--color-brand-accent)] mb-2">Risks & Mitigations</h2>
        <div className="space-y-3">
          {risks.map((r) => (
            <div key={r.risk} className="rounded-lg border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] p-3">
              <div className="font-semibold">{r.risk}</div>
              <div className="text-sm text-[var(--color-brand-muted)] mt-1">{r.mitigation}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--color-brand-accent)] mb-2">What This PoC Unlocks</h2>
        <p>
          A working hardware demo in the room with a Loblaws or Costco decision-maker is dramatically more persuasive than any
          simulation or rendered video. The ask on the back of a successful demo: a research agreement for 10 Unitree G-1 humanoids
          targeting shelf audit and safety patrol workloads in Year 1, with restocking as the forward roadmap.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-[var(--color-brand-accent)] mb-2">Feasibility Summary</h2>
        <div className="rounded-lg border-2 border-[var(--color-brand-accent)] bg-[var(--color-brand-surface)] p-5">
          <div className="text-2xl font-black text-[var(--color-brand-accent)] mb-2">Yes, feasible.</div>
          <p className="text-[var(--color-brand-text)]">
            BOM fits within the $17,500 cap. 8-week timeline is tight but achievable with the defined scope constraints (lower
            shelf, single SKU, pre-known geometry, teleop-assisted, backup video). Training compute is already owned. The only
            material unknown is the D1 URDF, and three independent mitigation paths exist.
          </p>
        </div>
      </section>

      <section className="mb-8 text-sm text-[var(--color-brand-muted)] border-t border-[var(--color-brand-border)] pt-4">
        <p>
          <strong>Footnote — why not a G-1 for the demo itself?</strong> A Unitree G-1 with dexterous hands lands at roughly
          $56,000–$69,000 USD, or 3.2×–3.9× the Go2 BOM above — $38K–$51K over the current cap. More importantly, shipping a
          manipulation-heavy G-1 workload in Year 1 runs into battery and motor-drain constraints that a quadruped platform
          avoids. The Go2 restocker establishes the PoC; the G-1 research agreement funds the platform where humanoid form
          factor actually pays off (shelf audit, safety patrol).
        </p>
      </section>
    </div>
  );
}
