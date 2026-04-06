"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkBusinessAuth } from "../../../components/PasswordModal";

/* ------------------------------------------------------------------ */
/*  Business Launch To-Do                                              */
/* ------------------------------------------------------------------ */

const businessTasks = [
  { id: 1, task: "Incorporate TorontoRobots (Ontario corporation or federal CBCA)", who: "Founders" },
  { id: 2, task: "Register for GST/HST (required before first import)", who: "Founders" },
  { id: 3, task: "Open business bank account (CAD + USD)", who: "Founders" },
  { id: 4, task: "Confirm G-1 wireless modules have ISED IC certification with Unitree", who: "Founders" },
  { id: 5, task: "File CBSA Advance Ruling (Form B10) to lock HS 8479.50.00 classification", who: "AI + Founders" },
  { id: 6, task: "Draft Unitree outreach pitch \u2014 who we are, what we bring, what we want", who: "AI" },
  { id: 7, task: "Build the Unitree pitch deck (market opportunity, incentive stack, pipeline)", who: "AI" },
  { id: 8, task: "Send first contact to Unitree Robotics (sales/distribution team)", who: "Founders" },
  { id: 9, task: "Negotiate and sign distribution/reseller agreement", who: "Founders" },
  { id: 10, task: "Identify and engage a licensed customs broker (Toronto-based)", who: "Founders" },
  { id: 11, task: "Order first G-1 EDU demo unit", who: "Founders" },
  { id: 12, task: "Build target account list with named contacts at Magna, Martinrea, Loblaw, Amazon, UofT", who: "AI + Founders" },
  { id: 13, task: "Create the customer-facing incentive calculator (SR&ED + CCA + AMIC stack)", who: "AI" },
  { id: 14, task: "Formalize service packages and pricing (Tier 1/2/3 + annual support)", who: "AI + Founders" },
  { id: 15, task: "Build customer pitch deck (ROI model, incentive payback, service tiers)", who: "AI" },
  { id: 16, task: "Book first 3 discovery meetings with target accounts", who: "Founders" },
  { id: 17, task: "Deliver first live G-1 demo to a prospective customer", who: "Founders" },
  { id: 18, task: "Apply for NVIDIA Inception program (co-marketing, credits, deal reg)", who: "Founders" },
  { id: 19, task: "Close and deploy first unit sale (hardware + Tier 1 service minimum)", who: "Founders" },
  { id: 20, task: "Establish annual support contract template and renewal workflow", who: "AI + Founders" },
];

/* ------------------------------------------------------------------ */
/*  Software Development To-Do                                         */
/* ------------------------------------------------------------------ */

const softwareTasks = [
  { id: 1, task: "Create NVIDIA accounts \u2014 Developer, Build API, NGC", who: "Founders" },
  { id: 2, task: "Apply to NVIDIA Inception \u2014 up to $100K cloud credits, engineer access", who: "Founders" },
  { id: 3, task: "Activate USDCode and Brev MCP servers in Claude Code", who: "AI" },
  { id: 4, task: "Clone critical repos \u2014 Isaac-GR00T, unitree_sdk2_python, unitree_ros2, IsaacLab, LeRobot", who: "AI" },
  { id: 5, task: "Download GR00T N1-2B weights from HuggingFace", who: "AI" },
  { id: 6, task: "Define ROS 2 interfaces \u2014 message types, topic names, service contracts", who: "AI" },
  { id: 7, task: "Build operator dashboard skeleton \u2014 React + FastAPI with auth and layout", who: "AI" },
  { id: 8, task: "Complete NVIDIA DLI training courses", who: "Founders" },
  { id: 9, task: "Launch Isaac Sim on GX10", who: "AI + Founders" },
  { id: 10, task: "Import G-1 URDF into simulation", who: "AI" },
  { id: 11, task: "Build customer digital twins (warehouse, retail, factory scenes)", who: "AI" },
  { id: 12, task: "Train navigation policies with Isaac Lab", who: "AI" },
  { id: 13, task: "Generate synthetic training data from sim environments", who: "AI" },
  { id: 14, task: "Train object detection models (shelf/PPE/defect)", who: "AI" },
  { id: 15, task: "Run GR00T fine-tuning pipeline end-to-end", who: "AI" },
  { id: 16, task: "Build complete operator dashboard with simulated telemetry", who: "AI" },
  { id: 17, task: "Flash JetPack, install ROS 2 + Isaac ROS on Jetson", who: "AI + Founders" },
  { id: 18, task: "Teleoperation data collection with Quest 3 \u2014 50\u2013100 demos per task", who: "Founders" },
  { id: 19, task: "Sim-to-real validation \u2014 confirm sim-trained policies transfer", who: "AI + Founders" },
  { id: 20, task: "Customer site deployment and operator training", who: "Founders" },
];

/* ------------------------------------------------------------------ */
/*  Who Badge Component                                                */
/* ------------------------------------------------------------------ */

function WhoBadge({ who }: { who: string }) {
  const base = "inline-flex items-center px-2 py-0.5 rounded text-xs font-bold tracking-wide";
  if (who === "AI") {
    return <span className={`${base} bg-violet-900/40 text-violet-300`}>AI</span>;
  }
  if (who === "Founders") {
    return <span className={`${base} bg-amber-900/40 text-amber-300`}>Founders</span>;
  }
  // AI + Founders
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`${base} bg-violet-900/40 text-violet-300`}>AI</span>
      <span className="text-xs text-[var(--color-brand-muted)]">+</span>
      <span className={`${base} bg-amber-900/40 text-amber-300`}>Founders</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TodoPage() {
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
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        href="/business"
        className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-accent)] transition-colors inline-flex items-center gap-1 mb-6"
      >
        &larr; Back to Our Business
      </Link>

      <h1 className="text-4xl font-black tracking-tight mb-2">To Do</h1>
      <p className="text-[var(--color-brand-muted)] text-lg mb-10">
        20 items max per section. Logical order. Ship it.
      </p>

      {/* ============================================================= */}
      {/*  Business Launch — Forest Green Border                         */}
      {/* ============================================================= */}
      <section className="mb-14">
        <div className="border-2 border-green-700 rounded-sm overflow-hidden">
          {/* Section Header */}
          <div className="bg-green-900/20 px-6 py-4 border-b border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-green-400">
                  Business Launch
                </h2>
                <p className="text-xs text-green-400/60 mt-1">
                  Legal, deal, customers, revenue &mdash; in order of dependency
                </p>
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-sm bg-green-900/40 text-green-400 text-sm font-bold">
                {businessTasks.length}
              </span>
            </div>
          </div>

          {/* Task List */}
          <div className="divide-y divide-green-700/30">
            {businessTasks.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 px-6 py-3 hover:bg-green-900/10 transition-colors"
              >
                <span className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-sm bg-green-900/30 text-green-400 text-xs font-bold mt-0.5">
                  {item.id}
                </span>
                <p className="flex-1 text-sm text-[var(--color-brand-text)] leading-relaxed">
                  {item.task}
                </p>
                <div className="flex-shrink-0 mt-0.5">
                  <WhoBadge who={item.who} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  Software Development — Default Accent                         */}
      {/* ============================================================= */}
      <section className="mb-14">
        <div className="border border-[var(--color-brand-accent)]/30 rounded-sm overflow-hidden">
          {/* Section Header */}
          <div className="bg-[var(--color-brand-accent)]/5 px-6 py-4 border-b border-[var(--color-brand-accent)]/30">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[var(--color-brand-accent)]">
                  Software Development
                </h2>
                <p className="text-xs text-[var(--color-brand-muted)] mt-1">
                  NVIDIA stack, simulation, AI policies, operator dashboard
                </p>
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-sm bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)] text-sm font-bold">
                {softwareTasks.length}
              </span>
            </div>
          </div>

          {/* Task List */}
          <div className="divide-y divide-[var(--color-brand-border)]">
            {softwareTasks.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 px-6 py-3 hover:bg-[var(--color-brand-accent)]/5 transition-colors"
              >
                <span className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-sm bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)] text-xs font-bold mt-0.5">
                  {item.id}
                </span>
                <p className="flex-1 text-sm text-[var(--color-brand-text)] leading-relaxed">
                  {item.task}
                </p>
                <div className="flex-shrink-0 mt-0.5">
                  <WhoBadge who={item.who} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legend */}
      <section className="mb-10">
        <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] rounded-sm px-6 py-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-muted)] mb-3">
            Legend
          </h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <WhoBadge who="AI" />
              <span className="text-xs text-[var(--color-brand-muted)]">
                AI agent handles autonomously
              </span>
            </div>
            <div className="flex items-center gap-2">
              <WhoBadge who="Founders" />
              <span className="text-xs text-[var(--color-brand-muted)]">
                Requires founder action (calls, signatures, meetings)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <WhoBadge who="AI + Founders" />
              <span className="text-xs text-[var(--color-brand-muted)]">
                AI drafts, founders review and execute
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
