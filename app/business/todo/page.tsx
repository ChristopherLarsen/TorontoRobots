"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkBusinessAuth } from "../../../components/PasswordModal";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Task = {
  id: number;
  task: string;
  who: string;
  entails: string;
  why: string;
};

/* ------------------------------------------------------------------ */
/*  Business Launch To-Do                                              */
/* ------------------------------------------------------------------ */

const businessTasks: Task[] = [
  {
    id: 1,
    task: "Incorporate TorontoRobots (Ontario corporation or federal CBCA)",
    who: "Founders",
    entails:
      "Choose between an Ontario numbered/named corporation and a federal CBCA entity, file articles of incorporation, appoint directors, issue founding shares, and set up a minute book. A lawyer is cheap insurance here.",
    why: "Nothing legal or financial can move until the corporate entity exists. Banking, GST/HST, import accounts, and the Unitree distribution contract all require a registered Canadian company.",
  },
  {
    id: 2,
    task: "Register for GST/HST (required before first import)",
    who: "Founders",
    entails:
      "Register the new corporation with CRA for a Business Number, GST/HST account, and import/export (RM) program account. This is what CBSA checks against at the border.",
    why: "Without an active RM import account tied to GST/HST, CBSA will not clear a G-1 shipment. This gates every physical unit that enters Canada.",
  },
  {
    id: 3,
    task: "Open business bank account (CAD + USD)",
    who: "Founders",
    entails:
      "Open dual-currency business accounts at a major Canadian bank, enable wire transfers, and set up a USD-denominated account for paying Unitree and other USD suppliers.",
    why: "Unitree invoices in USD and customers will pay in CAD. Holding both currencies avoids conversion losses on every transaction and lets us time FX.",
  },
  {
    id: 4,
    task: "Confirm G-1 wireless modules have ISED IC certification with Unitree",
    who: "Founders",
    entails:
      "Request ISED certification numbers and test reports for every radio module inside the G-1 (Wi-Fi, Bluetooth, any LTE). If modules are only FCC-certified, negotiate a path to Canadian compliance.",
    why: "Selling or even operating an uncertified radio device in Canada is illegal under the Radiocommunication Act. This is a hard gate on commercial sale, not a nice-to-have.",
  },
  {
    id: 5,
    task: "File CBSA Advance Ruling (Form B10) to lock HS 8479.50.00 classification",
    who: "AI + Founders",
    entails:
      "Prepare a technical description of the G-1, file Form B10 with CBSA requesting a binding tariff classification under 8479.50.00 (industrial robots), and wait for the ruling letter.",
    why: "A binding ruling eliminates classification risk at the border, locks in a 0% MFN duty rate, and protects against a customs officer re-classifying shipments into a dutiable category.",
  },
  {
    id: 6,
    task: "Draft Unitree outreach pitch \u2014 who we are, what we bring, what we want",
    who: "AI",
    entails:
      "Write a concise cold-outreach document stating TorontoRobots' thesis on the Canadian market, the SR&ED/CCA incentive stack, the target customer pipeline, and the specific ask (exclusive or non-exclusive Canadian distribution of the G-1).",
    why: "Unitree gets hundreds of reseller requests. A crisp, Canada-specific thesis with real numbers is what gets a reply versus getting ignored.",
  },
  {
    id: 7,
    task: "Build the Unitree pitch deck (market opportunity, incentive stack, pipeline)",
    who: "AI",
    entails:
      "Produce a 10\u201315 slide deck covering Canadian humanoid TAM, named target accounts, the stacked SR&ED + CCA Class 53 + AMIC incentive math, our service model, and projected Y1\u2013Y3 unit volumes.",
    why: "The deck is the artifact Unitree's sales leadership circulates internally. Without it, a reply email goes nowhere; with it, we get into a real commercial conversation.",
  },
  {
    id: 8,
    task: "Send first contact to Unitree Robotics (sales/distribution team)",
    who: "Founders",
    entails:
      "Identify the right human at Unitree (distribution lead, not generic sales inbox), send a personalized email with the deck attached, and follow up on a defined cadence.",
    why: "This is the single action that converts the plan from 'document' to 'live deal'. Every downstream task assumes we have a relationship with Unitree.",
  },
  {
    id: 9,
    task: "Negotiate and sign distribution/reseller agreement",
    who: "Founders",
    entails:
      "Negotiate pricing tiers, minimum order quantities, territory (Canada, ideally exclusive), warranty terms, spare parts access, and training. Run the final draft past Canadian counsel.",
    why: "This contract defines unit economics and competitive moat. Exclusivity in Canada is the difference between being a reseller and being the Canadian humanoid company.",
  },
  {
    id: 10,
    task: "Identify and engage a licensed customs broker (Toronto-based)",
    who: "Founders",
    entails:
      "Interview 2\u20133 Toronto-area licensed customs brokers with experience in industrial machinery, sign a General Agency Agreement, and hand off the B10 ruling and HS classification.",
    why: "A broker handles the paperwork, bonds, and release at the border so founders don't have to. Choosing the wrong one leads to delays, storage fees, and misfiled duties.",
  },
  {
    id: 11,
    task: "Order first G-1 EDU demo unit",
    who: "Founders",
    entails:
      "Place the purchase order with Unitree for one G-1 EDU, wire the deposit, confirm export paperwork, and coordinate shipping and customs clearance with the broker.",
    why: "You cannot sell a humanoid robot from a slide deck. The demo unit is what turns pitch meetings into signed POs.",
  },
  {
    id: 12,
    task: "Build target account list with named contacts at Magna, Martinrea, Loblaw, Amazon, UofT",
    who: "AI + Founders",
    entails:
      "Research decision-makers (automation leads, innovation VPs, R&D directors) at each target, capture direct emails and LinkedIn profiles, and rank by warmth of existing relationships.",
    why: "Named contacts beat job titles. A list of 20 specific humans we can actually email is what drives the first discovery meetings.",
  },
  {
    id: 13,
    task: "Create the customer-facing incentive calculator (SR&ED + CCA + AMIC stack)",
    who: "AI",
    entails:
      "Build a simple interactive calculator (web or spreadsheet) that takes customer inputs (unit count, payroll, province) and outputs net cost after SR&ED credits, CCA Class 53 depreciation, and AMIC incentives.",
    why: "The headline price of a G-1 is scary. Showing a CFO that the real after-incentive cost is 40\u201360% lower is the single most persuasive moment in the sales cycle.",
  },
  {
    id: 14,
    task: "Formalize service packages and pricing (Tier 1/2/3 + annual support)",
    who: "AI + Founders",
    entails:
      "Define three service tiers (e.g. basic integration, managed deployment, fully custom) with clear deliverables, SLAs, and published prices. Define an annual support contract with response times and included hours.",
    why: "Hardware margin alone doesn't support a Canadian robotics business. Recurring service revenue is what makes unit economics work and what turns one-time buyers into long-term accounts.",
  },
  {
    id: 15,
    task: "Build customer pitch deck (ROI model, incentive payback, service tiers)",
    who: "AI",
    entails:
      "Produce a customer-facing deck covering the G-1 capability envelope, our service tiers, concrete ROI scenarios for warehouse/manufacturing/retail, and the incentive-adjusted payback period.",
    why: "Customers need a document to circulate internally to finance and operations. Without it, deals die between the demo meeting and the PO.",
  },
  {
    id: 16,
    task: "Book first 3 discovery meetings with target accounts",
    who: "Founders",
    entails:
      "Use the target list and pitch deck to land three 30\u201345 minute discovery calls with real decision-makers. Run structured discovery to surface use cases, budget, and timeline.",
    why: "Three real customer conversations will reshape the product, pricing, and service offering more than any amount of internal planning. This is our first contact with reality.",
  },
  {
    id: 17,
    task: "Deliver first live G-1 demo to a prospective customer",
    who: "Founders",
    entails:
      "Transport the G-1 to a customer site (or host on-site), run a scripted demo covering walking, manipulation, and teleoperation, and debrief with the customer on fit for their environment.",
    why: "A live humanoid in the room is the conversion moment. Nothing on a slide has the visceral impact of watching a G-1 walk into a boardroom.",
  },
  {
    id: 18,
    task: "Apply for NVIDIA Inception program (co-marketing, credits, deal reg)",
    who: "Founders",
    entails:
      "Submit the Inception application with our company profile, NVIDIA stack usage (Isaac Sim, GR00T, Jetson), and go-to-market plan. Follow up to unlock credits and deal registration.",
    why: "Inception gives us up to $100K in cloud credits, NVIDIA engineering support, and co-marketing lift. For a pre-revenue robotics startup, that stack is effectively free runway.",
  },
  {
    id: 19,
    task: "Close and deploy first unit sale (hardware + Tier 1 service minimum)",
    who: "Founders",
    entails:
      "Get a signed PO, collect deposit, order the customer unit from Unitree, clear customs, deliver to site, complete commissioning, and hand off to operators under the Tier 1 service agreement.",
    why: "First revenue is the only proof point that matters. It unlocks case studies, referenceable customers, and the credibility to raise or grow without friction.",
  },
  {
    id: 20,
    task: "Establish annual support contract template and renewal workflow",
    who: "AI + Founders",
    entails:
      "Draft a standard annual support contract, build a renewal tracker with dates and account owners, and define the upsell motion from Tier 1 to Tier 2/3 at renewal time.",
    why: "Renewals are where robotics businesses live or die. A disciplined renewal process turns year-one sales into compounding ARR instead of one-shot hardware transactions.",
  },
];

/* ------------------------------------------------------------------ */
/*  Software Development To-Do                                         */
/* ------------------------------------------------------------------ */

const softwareTasks: Task[] = [
  {
    id: 1,
    task: "Create NVIDIA accounts \u2014 Developer, Build API, NGC",
    who: "Founders",
    entails:
      "Register for NVIDIA Developer, NGC (container registry), and Build API accounts under the company domain. Enable 2FA and share credentials securely via the team password manager.",
    why: "Every downstream NVIDIA tool \u2014 Isaac Sim, GR00T weights, Jetson firmware \u2014 is gated behind these accounts. No accounts means no stack.",
  },
  {
    id: 2,
    task: "Apply to NVIDIA Inception \u2014 up to $100K cloud credits, engineer access",
    who: "Founders",
    entails:
      "Submit the Inception application with our robotics focus and deal pipeline. Once accepted, claim cloud credits and request a technical account manager.",
    why: "Inception credits cover the GPU compute bill for GR00T fine-tuning and Isaac Lab training runs. Without it we're paying retail RunPod/AWS rates out of pocket.",
  },
  {
    id: 3,
    task: "Activate USDCode and Brev MCP servers in Claude Code",
    who: "AI",
    entails:
      "Install and configure the USDCode (Omniverse scene authoring) and Brev (GPU provisioning) MCP servers inside Claude Code so agent workflows can author sim scenes and spin up GPUs directly.",
    why: "These MCP servers close the loop between 'AI plans a training run' and 'training run actually executes'. Without them, every sim iteration requires manual human glue.",
  },
  {
    id: 4,
    task: "Clone critical repos \u2014 Isaac-GR00T, unitree_sdk2_python, unitree_ros2, IsaacLab, LeRobot",
    who: "AI",
    entails:
      "Clone the five upstream repositories into a local workspace, pin each to a known-good commit, and document the specific versions in a LOCKFILE.md.",
    why: "These repos evolve daily and breaking changes land constantly. Pinning commits now prevents a surprise regression six weeks into training.",
  },
  {
    id: 5,
    task: "Download GR00T N1-2B weights from HuggingFace",
    who: "AI",
    entails:
      "Authenticate to HuggingFace, accept the GR00T license, download the N1-2B checkpoint, verify SHA256, and store on the GX10's local NVMe with a backup on network volume.",
    why: "GR00T is the foundation model everything else fine-tunes from. Having a verified local copy removes a hard dependency on HuggingFace uptime during training runs.",
  },
  {
    id: 6,
    task: "Define ROS 2 interfaces \u2014 message types, topic names, service contracts",
    who: "AI",
    entails:
      "Write a ROS 2 interface spec covering every topic, message type, service, and action the dashboard and policies will use. Publish as a versioned .msg/.srv package.",
    why: "Interfaces defined upfront let the sim team, dashboard team, and real-robot team work in parallel without constantly breaking each other. Skipping this creates weeks of integration pain later.",
  },
  {
    id: 7,
    task: "Build operator dashboard skeleton \u2014 React + FastAPI with auth and layout",
    who: "AI",
    entails:
      "Scaffold a React frontend and FastAPI backend with login, a main layout (fleet view, robot detail, telemetry), and placeholder routes wired to the ROS 2 interface spec.",
    why: "A real skeleton \u2014 even empty \u2014 gives us a canvas to demo to customers and a place to drop real telemetry as it comes online. Much faster than building features into nothing.",
  },
  {
    id: 8,
    task: "Complete NVIDIA DLI training courses",
    who: "Founders",
    entails:
      "Work through the Deep Learning Institute courses on Isaac Sim, Isaac Lab, and GR00T fine-tuning. Earn completion certificates for credibility with Inception and customers.",
    why: "Founders need enough hands-on fluency to talk intelligently with NVIDIA engineers and enterprise customers. DLI is the fastest path from zero to conversational.",
  },
  {
    id: 9,
    task: "Launch Isaac Sim on GX10",
    who: "AI + Founders",
    entails:
      "Install Isaac Sim on the GX10 workstation, verify GPU acceleration, load a default scene, and confirm the Python API works for headless scripting.",
    why: "Isaac Sim is the foundation for every simulation, training, and digital twin task downstream. If it doesn't run on GX10, nothing else in the software plan works.",
  },
  {
    id: 10,
    task: "Import G-1 URDF into simulation",
    who: "AI",
    entails:
      "Convert the Unitree G-1 URDF/MJCF to USD, load it into Isaac Sim, verify joint limits and inertias, and confirm the robot can stand and walk under the default controller.",
    why: "A correct G-1 model in sim is the single most important asset we have. Every policy, test, and demo depends on the simulated robot matching the real one.",
  },
  {
    id: 11,
    task: "Build customer digital twins (warehouse, retail, factory scenes)",
    who: "AI",
    entails:
      "Author three representative USD scenes \u2014 a warehouse aisle, a retail back-of-store, and a light manufacturing line \u2014 with realistic dimensions, lighting, and obstacles.",
    why: "Customers pay attention when they see the G-1 operating in something that looks like their facility. Generic demos lose deals; tailored digital twins win them.",
  },
  {
    id: 12,
    task: "Train navigation policies with Isaac Lab",
    who: "AI",
    entails:
      "Set up an Isaac Lab training environment for G-1 locomotion and navigation, define reward functions, run parallel environments on GPU, and checkpoint the best policy.",
    why: "A robust navigation policy is the baseline capability every customer expects. Without it, every demo turns into a discussion of limitations.",
  },
  {
    id: 13,
    task: "Generate synthetic training data from sim environments",
    who: "AI",
    entails:
      "Use Isaac Sim's replicator to generate labelled synthetic datasets (RGB, depth, segmentation) from the digital twin scenes, with domain randomization on lighting and textures.",
    why: "Real-world labelled robotics data is expensive and slow. Synthetic data lets us train perception models at scale before the first unit ever ships.",
  },
  {
    id: 14,
    task: "Train object detection models (shelf/PPE/defect)",
    who: "AI",
    entails:
      "Fine-tune detection models on the synthetic datasets for three classes of task: shelf inventory, PPE compliance, and defect detection. Evaluate on a held-out real-image test set.",
    why: "These are the three customer use cases with the clearest ROI. Having working perception models ready means we can pitch specific deployments instead of 'general capabilities'.",
  },
  {
    id: 15,
    task: "Run GR00T fine-tuning pipeline end-to-end",
    who: "AI",
    entails:
      "Assemble a fine-tuning run from GR00T N1-2B weights on our teleoperation and synthetic data, execute it on Inception credits, and validate the resulting checkpoint in sim.",
    why: "Getting one full fine-tune to actually complete proves the pipeline works end-to-end. Everything after this is iteration; before this, it's all theory.",
  },
  {
    id: 16,
    task: "Build complete operator dashboard with simulated telemetry",
    who: "AI",
    entails:
      "Flesh out the dashboard skeleton with live charts, video feeds, alerts, and command controls, all driven by simulated ROS 2 telemetry from Isaac Sim.",
    why: "A dashboard running against sim telemetry is indistinguishable from one running on real hardware during a customer pitch. It's the fastest way to have a 'real' product to show.",
  },
  {
    id: 17,
    task: "Flash JetPack, install ROS 2 + Isaac ROS on Jetson",
    who: "AI + Founders",
    entails:
      "Flash the latest JetPack onto the G-1's Jetson compute module, install ROS 2 Humble, Isaac ROS packages, and validate that published topics match the interface spec.",
    why: "This is the moment the software stack meets real silicon on a real robot. Everything before this is simulation; everything after this is deployment.",
  },
  {
    id: 18,
    task: "Teleoperation data collection with Quest 3 \u2014 50\u2013100 demos per task",
    who: "Founders",
    entails:
      "Use the Quest 3 teleop rig to record 50\u2013100 demonstrations per target task (pick-and-place, shelf scan, handoff), logging joint trajectories and camera streams.",
    why: "GR00T fine-tuning needs real human demos, not just synthetic data. This is the hand-crafted dataset that makes the policies feel human instead of robotic.",
  },
  {
    id: 19,
    task: "Sim-to-real validation \u2014 confirm sim-trained policies transfer",
    who: "AI + Founders",
    entails:
      "Deploy a sim-trained navigation or manipulation policy onto the physical G-1, measure performance against sim benchmarks, and document the sim-to-real gap.",
    why: "The entire simulation-first strategy is only valid if policies actually transfer. This test is the single biggest technical risk in the whole plan.",
  },
  {
    id: 20,
    task: "Customer site deployment and operator training",
    who: "Founders",
    entails:
      "Install the G-1 at the first customer site, commission the network and dashboard, train their operators on safe use, and run a supervised first shift.",
    why: "This converts a sale into a reference customer. Smooth first-site deployment is what unlocks the next ten deals; a rough one closes doors for months.",
  },
];

/* ------------------------------------------------------------------ */
/*  Who Badge Component                                                */
/*  Restrained color: same hue family (bg + text + border), small     */
/*  enough to remain metadata, saturated enough to pick out the eye.  */
/* ------------------------------------------------------------------ */

function WhoBadge({ who }: { who: string }) {
  const base =
    "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium tracking-normal border";

  // AI: soft indigo/violet
  const aiClasses = "bg-indigo-50 text-indigo-700 border-indigo-200";
  // Founders: soft amber (harmonizes with teal accent without competing)
  const foundersClasses = "bg-amber-50 text-amber-800 border-amber-200";

  if (who === "AI") {
    return <span className={`${base} ${aiClasses}`}>AI</span>;
  }
  if (who === "Founders") {
    return <span className={`${base} ${foundersClasses}`}>Founders</span>;
  }
  // AI + Founders
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`${base} ${aiClasses}`}>AI</span>
      <span className={`${base} ${foundersClasses}`}>Founders</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Task Row with expandable detail                                    */
/* ------------------------------------------------------------------ */

function TaskRow({ item }: { item: Task }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="group border-b border-[var(--color-brand-border)] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-start gap-4 py-4 px-1 -mx-1 rounded-md hover:bg-black/[0.02] transition-colors text-left"
      >
        {/* Chevron */}
        <span
          className={`flex-shrink-0 mt-1 text-[var(--color-brand-muted)] group-hover:text-[var(--color-brand-accent)] transition-transform duration-200 ${
            open ? "rotate-90" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 2L8 6L4 10"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {/* Number */}
        <span className="flex-shrink-0 w-6 text-right text-sm font-medium text-[var(--color-brand-muted)] tabular-nums mt-0.5 group-hover:text-[var(--color-brand-accent)] transition-colors">
          {item.id}
        </span>

        {/* Task title */}
        <p className="flex-1 text-[15px] text-[var(--color-brand-text)] leading-relaxed">
          {item.task}
        </p>

        {/* Who */}
        <div className="flex-shrink-0 mt-0.5">
          <WhoBadge who={item.who} />
        </div>
      </button>

      {/* Expandable detail panel */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pl-[3.25rem] pr-4 pb-6 pt-1">
            <div className="border-l-2 border-[var(--color-brand-accent)]/40 pl-5 space-y-4">
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-accent)] mb-1.5">
                  What this entails
                </h4>
                <p className="text-sm text-[var(--color-brand-text)] leading-relaxed">
                  {item.entails}
                </p>
              </div>
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-accent)] mb-1.5">
                  Why it matters
                </h4>
                <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                  {item.why}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
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
  tasks: Task[];
}) {
  return (
    <section className="mb-16">
      {/* Section header */}
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

      <ul>
        {tasks.map((item) => (
          <TaskRow key={item.id} item={item} />
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
