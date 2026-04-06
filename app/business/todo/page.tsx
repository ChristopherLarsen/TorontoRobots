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
/*  Unified pill language: same shape, same weight, muted neutral     */
/*  tones that differ only in subtle hue. Metadata, not signage.      */
/* ------------------------------------------------------------------ */

function WhoBadge({ who }: { who: string }) {
  const base =
    "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium tracking-normal border";

  if (who === "AI") {
    return (
      <span className={`${base} bg-slate-50 text-slate-600 border-slate-200`}>
        AI
      </span>
    );
  }
  if (who === "Founders") {
    return (
      <span className={`${base} bg-stone-50 text-stone-600 border-stone-200`}>
        Founders
      </span>
    );
  }
  // AI + Founders
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`${base} bg-slate-50 text-slate-600 border-slate-200`}>
        AI
      </span>
      <span className={`${base} bg-stone-50 text-stone-600 border-stone-200`}>
        Founders
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Task Section                                                       */
/* ------------------------------------------------------------------ */

function TaskSection({
  title,
  subtitle,
  tasks,
}: {
  title: string;
  subtitle: string;
  tasks: { id: number; task: string; who: string }[];
}) {
  return (
    <section className="mb-16">
      {/* Section header — dominates */}
      <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-[var(--color-brand-border)]">
        <div>
          <h2 className="font-serif text-3xl font-semibold text-[var(--color-brand-text)] tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-[var(--color-brand-muted)] mt-1.5">
            {subtitle}
          </p>
        </div>
        <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-brand-muted)] tabular-nums">
          {tasks.length} items
        </span>
      </div>

      {/* Task list — no cards, no heavy borders, just subtle rows */}
      <ul className="divide-y divide-[var(--color-brand-border)]">
        {tasks.map((item) => (
          <li
            key={item.id}
            className="group flex items-start gap-5 py-4 px-1 -mx-1 rounded-md hover:bg-black/[0.02] transition-colors"
          >
            <span className="flex-shrink-0 w-6 text-right text-sm font-medium text-[var(--color-brand-muted)] tabular-nums mt-0.5 group-hover:text-[var(--color-brand-accent)] transition-colors">
              {item.id}
            </span>
            <p className="flex-1 text-[15px] text-[var(--color-brand-text)] leading-relaxed">
              {item.task}
            </p>
            <div className="flex-shrink-0 mt-0.5">
              <WhoBadge who={item.who} />
            </div>
          </li>
        ))}
      </ul>
    </section>
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
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href="/business"
        className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-accent)] transition-colors inline-flex items-center gap-1 mb-10"
      >
        &larr; Back to Our Business
      </Link>

      {/* Page header */}
      <header className="mb-16">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-brand-accent)] mb-3">
          Roadmap
        </p>
        <h1 className="font-serif text-5xl font-semibold tracking-tight text-[var(--color-brand-text)] mb-4">
          To Do
        </h1>
        <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed max-w-xl">
          Twenty items max per section. Logical order. Ship it.
        </p>
      </header>

      <TaskSection
        title="Business Launch"
        subtitle="Legal, deal, customers, revenue — in order of dependency"
        tasks={businessTasks}
      />

      <TaskSection
        title="Software Development"
        subtitle="NVIDIA stack, simulation, AI policies, operator dashboard"
        tasks={softwareTasks}
      />

      {/* Legend */}
      <section className="mt-20 pt-8 border-t border-[var(--color-brand-border)]">
        <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-brand-muted)] mb-5">
          Legend
        </h3>
        <dl className="space-y-3">
          <div className="flex items-center gap-3">
            <dt className="w-28 flex-shrink-0">
              <WhoBadge who="AI" />
            </dt>
            <dd className="text-sm text-[var(--color-brand-muted)]">
              AI agent handles autonomously
            </dd>
          </div>
          <div className="flex items-center gap-3">
            <dt className="w-28 flex-shrink-0">
              <WhoBadge who="Founders" />
            </dt>
            <dd className="text-sm text-[var(--color-brand-muted)]">
              Requires founder action (calls, signatures, meetings)
            </dd>
          </div>
          <div className="flex items-center gap-3">
            <dt className="w-28 flex-shrink-0 flex">
              <WhoBadge who="AI + Founders" />
            </dt>
            <dd className="text-sm text-[var(--color-brand-muted)] pl-12">
              AI drafts, founders review and execute
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
