"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkBusinessAuth } from "../../../components/PasswordModal";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const agentCapabilities = [
  { capability: "Write ROS 2 nodes", how: "Python and C++ nodes for perception, planning, and control" },
  { capability: "Build Isaac Sim scenes", how: "Natural language scene construction via Isaac Sim MCP" },
  { capability: "Get USD / Isaac coding help", how: "Instant API guidance via USDCode MCP" },
  { capability: "Manage GPU instances", how: "Launch and stop RunPod and Brev training infrastructure" },
  { capability: "Fine-tune GR00T", how: "Write and execute training scripts on cloud GPU" },
  { capability: "Design system architecture", how: "ROS 2 topic graphs, service interfaces, launch files" },
  { capability: "Build the operator dashboard", how: "React + FastAPI web application \u2014 our proprietary IP" },
  { capability: "Generate synthetic training data", how: "Isaac Sim environments + domain randomization" },
  { capability: "Deploy to Jetson", how: "TensorRT quantization, model packaging, OTA updates" },
];

const agentWorkflow = [
  { step: "1", title: "Use Case Analysis", detail: "Searches knowledge base for the matching use case, identifies capability gaps, flags risks" },
  { step: "2", title: "Architecture Design", detail: "Produces the ROS 2 node graph, topic structure, and integration plan" },
  { step: "3", title: "Simulation", detail: "Builds the customer\u2019s environment in Isaac Sim, validates robot behavior before hardware" },
  { step: "4", title: "Policy Development", detail: "Writes training scripts, manages fine-tuning runs on GPU cloud, evaluates results" },
  { step: "5", title: "Integration", detail: "Wires perception, planning, and action layers together with the operator dashboard" },
  { step: "6", title: "Deployment", detail: "Packages models for Jetson, writes deployment scripts, configures monitoring" },
];

const stackOwn = [
  {
    title: "Operator Dashboard",
    detail: "Web app: React + FastAPI. Task assignment via natural language, real-time telemetry, fleet view, alert management, customer reporting.",
  },
  {
    title: "Task Planning Layer",
    detail: "LLM-powered task decomposition with SayCan-style affordance grounding. Operator types what the robot should do; AI decomposes into action graph.",
  },
  {
    title: "Customer Reporting",
    detail: "Automated shift summaries, exception logs, compliance records. Integration with MES/ERP via OPC-UA, REST API, or MQTT.",
  },
];

const stackIntegrate = [
  { layer: "Perception", tool: "Isaac ROS \u2014 Visual SLAM, NvBlox, Object Detection", source: "NVIDIA" },
  { layer: "Scene Understanding", tool: "Qwen2.5-VL-3B or VILA-2.7B (on-device)", source: "Open-source" },
  { layer: "Navigation", tool: "Nav2 + Isaac ROS costmaps", source: "ROS 2" },
  { layer: "Action Policy", tool: "GR00T N1.6 (fine-tuned per customer task)", source: "NVIDIA" },
  { layer: "Manipulation", tool: "ACT / Diffusion Policy via LeRobot", source: "HuggingFace" },
  { layer: "Simulation", tool: "Isaac Sim + Isaac Lab", source: "NVIDIA" },
  { layer: "Fleet Monitoring", tool: "Foxglove + InOrbit", source: "Open-core / SaaS" },
  { layer: "Hardware Interface", tool: "Unitree SDK2 + unitree_ros2 bridge", source: "Unitree" },
  { layer: "Teleoperation", tool: "xr_teleoperate (Quest 3) + LeRobot data format", source: "Unitree + HF" },
];

const useCaseMap = [
  { useCase: "Safety Compliance Patrol", manipulation: "None", components: "Nav2, Object Detection (PPE/hazard), Alert Dashboard, Compliance Reports", timeline: "2\u20133 months" },
  { useCase: "Shelf Audit / Inventory", manipulation: "None", components: "Nav2, Barcode/QR Detection, Planogram Comparison, Inventory Reports", timeline: "3\u20134 months" },
  { useCase: "Visual Quality Inspection", manipulation: "Simple", components: "Nav2, Custom Detection Model, Defect Classification, Quality Reports", timeline: "4\u20136 months" },
  { useCase: "Warehouse Exception Handling", manipulation: "None", components: "Nav2, Anomaly Detection, Alert Routing", timeline: "3\u20134 months" },
  { useCase: "Parts Kitting", manipulation: "Yes (hard)", components: "GR00T manipulation, Object Detection, BOM Verification", timeline: "6\u20139 months" },
  { useCase: "University Research Platform", manipulation: "Varies", components: "Full SDK access, Isaac Sim, LeRobot, Documentation", timeline: "1\u20132 months" },
];

const phase0Tasks = [
  "Create NVIDIA accounts \u2014 Developer, Build API, NGC",
  "Apply to NVIDIA Inception \u2014 up to $100K cloud credits, engineer access",
  "Activate USDCode and Brev MCP servers in Claude Code",
  "Clone critical repos \u2014 Isaac-GR00T, unitree_sdk2_python, unitree_ros2, IsaacLab, LeRobot",
  "Download GR00T N1-2B weights from HuggingFace",
  "Define ROS 2 interfaces \u2014 message types, topic names, service contracts",
  "Build operator dashboard skeleton \u2014 React + FastAPI with auth and layout",
  "Complete NVIDIA DLI training courses",
];

const phase1Tasks = [
  { task: "Launch Isaac Sim on GX10", produces: "Running simulation with MCP connection to Claude Code", cost: "Local (free)" },
  { task: "Import G-1 URDF", produces: "Virtual G-1 that walks and navigates in physics sim", cost: "Local" },
  { task: "Build customer digital twins", produces: "USD scenes of warehouses, retail floors, factories", cost: "Local" },
  { task: "Train navigation policies (Isaac Lab)", produces: "Pre-trained locomotion for specific environments", cost: "Local" },
  { task: "Generate synthetic training data", produces: "Thousands of annotated images for detection models", cost: "Local" },
  { task: "Train object detection models", produces: "Fine-tuned shelf/PPE/defect detection", cost: "Local (1\u20133 hrs)" },
  { task: "Run GR00T fine-tuning pipeline", produces: "Validated training workflow using sim demonstrations", cost: "Local (2\u20134 hrs)" },
  { task: "Build complete operator dashboard", produces: "Full web app with simulated real-time telemetry", cost: "Eng. time" },
];

const phase2Tasks = [
  "Flash JetPack, install ROS 2 + Isaac ROS on Jetson",
  "Deploy pre-trained navigation policy \u2014 robot walks immediately",
  "Camera calibration and sensor profiling",
  "Teleoperation data collection with Quest 3 \u2014 50\u2013100 demos per task",
  "Fine-tune GR00T on real demonstrations",
  "Sim-to-real validation \u2014 confirm sim-trained policies transfer",
  "Battery and thermal profiling under real workloads",
  "Customer site deployment and operator training",
];

const customerDeliverables = [
  { title: "Configured G-1 EDU robot", detail: "Calibrated and set up for the customer\u2019s specific environment and tasks." },
  { title: "Custom-trained AI policies", detail: "Navigation, perception, and manipulation fine-tuned for their operations." },
  { title: "Operator dashboard", detail: "Web-based interface for task assignment, real-time monitoring, and fleet management." },
  { title: "Automated reports", detail: "Shift summaries, exception logs, and compliance documentation delivered automatically." },
  { title: "Ongoing support", detail: "Model updates, performance monitoring, and issue resolution." },
];

const pricing = [
  { service: "Simulation Preview", range: "$5K\u2013$15K", included: "Digital twin of customer environment, simulated demo, feasibility report" },
  { service: "Custom Policy Development", range: "$30K\u2013$80K", included: "Teleop data collection, GR00T fine-tuning, on-site validation, 3\u20135 iterations" },
  { service: "Full Deployment", range: "$50K\u2013$120K+", included: "Hardware + software + training + dashboard + 90-day support" },
  { service: "Monthly Support", range: "$2K\u2013$5K/mo", included: "Fleet monitoring, model updates, incident response, performance reports" },
];

/* -- Training Hardware ------------------------------------------------ */

const gx10Specs = [
  { spec: "Chip", single: "NVIDIA GB10 Grace Blackwell", pair: "2\u00d7 GB10 linked via ConnectX-7" },
  { spec: "AI Performance", single: "1 petaFLOP (FP4)", pair: "2 petaFLOP (FP4)" },
  { spec: "FP32 Compute", single: "31 TFLOPS", pair: "62 TFLOPS" },
  { spec: "CUDA Cores", single: "6,144 (Blackwell)", pair: "12,288" },
  { spec: "Memory", single: "128 GB unified LPDDR5x", pair: "256 GB unified" },
  { spec: "Memory BW", single: "301 GB/s + 600 GB/s NVLink-C2C", pair: "Doubled" },
  { spec: "CPU", single: "Grace 20-core ARM v9.2", pair: "40 cores total" },
  { spec: "Tensor Cores", single: "5th Gen with FP4 support", pair: "1,000 TOPS each" },
  { spec: "Storage", single: "1 TB NVMe (expandable to 4 TB)", pair: "2\u20138 TB total" },
  { spec: "OS", single: "DGX OS (Ubuntu-based)", pair: "PyTorch, CUDA, Ollama pre-installed" },
  { spec: "Power", single: "240 W", pair: "480 W total \u2014 desktop, no data center" },
];

const gx10VsCloud = [
  { spec: "Memory", gx10: "128 GB unified", h100: "80 GB HBM3", jetson: "16 GB shared" },
  { spec: "FP32 TFLOPS", gx10: "31", h100: "67", jetson: "5.3" },
  { spec: "CUDA Cores", gx10: "6,144", h100: "16,896", jetson: "1,024" },
  { spec: "Memory BW", gx10: "301 GB/s", h100: "3,350 GB/s", jetson: "102 GB/s" },
  { spec: "Cost", gx10: "Owned ($0/hr)", h100: "~$3.29/hr", jetson: "Owned (on-robot)" },
];

const workloadAssignment = [
  { workload: "GR00T N1.6 fine-tuning", where: "GX10 (local)", why: "2.2B model needs ~9 GB at FP32. GX10 has 128 GB \u2014 14\u00d7 headroom. Massive batch sizes, iterate all day, free." },
  { workload: "Object detection fine-tuning", where: "GX10 (local)", why: "YOLO / RT-DETR are tiny. 5K\u201310K image datasets fit entirely in memory. Done in 1\u20132 hours." },
  { workload: "ACT / Diffusion Policy", where: "GX10 (local)", why: "Small models, few hundred demos. Well within capacity." },
  { workload: "Isaac Sim (scene building)", where: "GX10 (local)", why: "Runs natively on Blackwell GPU. Build digital twins locally." },
  { workload: "Synthetic data generation", where: "GX10 (local)", why: "Render thousands of annotated training images from sim scenes." },
  { workload: "Isaac Lab RL (prototyping)", where: "GX10 (local)", why: "Good for dev loops. Slower than H100 for 10K+ parallel envs." },
  { workload: "Isaac Lab RL (production)", where: "RunPod H100 (burst)", why: "H100 memory bandwidth is 10\u00d7 \u2014 needed only for massive parallel RL." },
  { workload: "Local LLM for task planning", where: "GX10 (local)", why: "Ollama pre-installed. Run Llama 3.1 70B+ for development." },
  { workload: "VLM inference testing", where: "GX10 (local)", why: "Test VILA, Qwen-VL before deploying to Jetson." },
  { workload: "Cosmos-Transfer (Year 2)", where: "GX10 (local)", why: "128 GB easily fits Cosmos models for sim-to-real bridge." },
];

const costComparison = [
  { scenario: "Per customer engagement", before: "$400\u2013$2,500", after: "$0\u2013$200" },
  { scenario: "10 customers / year", before: "$4K\u2013$25K", after: "$0\u2013$2K" },
  { scenario: "Payback period", before: "N/A", after: "2\u20136 engagements" },
];

/* -- Fine-Tuning Reality Check --------------------------------------- */

const perCustomerTraining = [
  { task: "Object detection fine-tune", model: "YOLO v8 / RT-DETR", data: "5K\u201310K labeled images", timeOnGx10: "1\u20133 hours", oldCloudCost: "$50\u2013200" },
  { task: "GR00T N1.6 adapter fine-tune", model: "2.2B VLA (LoRA)", data: "50\u2013100 teleop demos", timeOnGx10: "2\u20134 hours", oldCloudCost: "$50\u2013300" },
  { task: "GR00T iteration cycles (3\u20135\u00d7)", model: "Same", data: "+20\u201350 demos per round", timeOnGx10: "2\u20134 hrs \u00d7 3\u20135", oldCloudCost: "$150\u2013$1,500 total" },
  { task: "Navigation policy (if custom env)", model: "Isaac Lab RL", data: "Sim-generated (millions of steps)", timeOnGx10: "4\u201312 hours", oldCloudCost: "$100\u2013500" },
];

const oneTimeTraining = [
  { task: "Validate GR00T pipeline end-to-end", time: "4\u20138 hours" },
  { task: "Train base PPE / safety detection model", time: "2\u20133 hours" },
  { task: "Train base shelf / product detection model", time: "2\u20133 hours" },
  { task: "Base navigation policy for generic warehouse", time: "8\u201312 hours" },
];

const notFineTuning = [
  { component: "Isaac ROS perception", what: "Pre-trained \u2014 deploy as-is" },
  { component: "VLM scene understanding", what: "Pre-trained Qwen / VILA \u2014 deploy as-is" },
  { component: "Nav2 navigation", what: "Configuration, not training" },
  { component: "Operator dashboard", what: "Pure software engineering (React + FastAPI)" },
  { component: "Unitree SDK integration", what: "Pure software engineering" },
  { component: "Cosmos-Transfer (Year 2)", what: "Inference pipeline, not training" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SolutionsPage() {
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

      <h1 className="text-4xl font-black tracking-tight mb-2">
        Software Solutions
      </h1>
      <p className="text-[var(--color-brand-muted)] text-lg mb-10">
        The software stack that bridges the robot to the customer. We program the
        G-1 to do what they need.
      </p>

      {/* ------------------------------------------------------------ */}
      {/*  Agent NVIDIA                                                  */}
      {/* ------------------------------------------------------------ */}

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3 text-[var(--color-brand-accent)]">
          Agent NVIDIA &mdash; Our Software Delivery Engine
        </h2>
        <p className="text-sm text-[var(--color-brand-text)] leading-relaxed mb-4">
          Agent NVIDIA is a specialized AI programming agent that operates inside
          Claude Code. It is the primary tool TorontoRobots uses to design,
          develop, and deploy every software solution. It maintains a structured
          knowledge base of 68+ files covering the full NVIDIA Isaac ecosystem,
          GR00T foundation model, Jetson deployment, Unitree hardware, and every
          commercial use case we target. Knowledge is keyword-indexed,
          confidence-scored, and self-updating &mdash; every engagement makes the
          next one faster.
        </p>

        <h3 className="font-bold text-sm mb-3">Capabilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {agentCapabilities.map((item) => (
            <div
              key={item.capability}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] px-4 py-3 rounded-sm"
            >
              <p className="font-bold text-sm mb-1">{item.capability}</p>
              <p className="text-xs text-[var(--color-brand-muted)] leading-relaxed">
                {item.how}
              </p>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-sm mb-3">
          Delivery Workflow Per Engagement
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {agentWorkflow.map((item) => (
            <div
              key={item.step}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-4 rounded-sm"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-accent)] mb-1">
                Step {item.step}
              </p>
              <p className="font-bold text-sm mb-1">{item.title}</p>
              <p className="text-xs text-[var(--color-brand-muted)] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Software Stack                                                */}
      {/* ------------------------------------------------------------ */}

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          The Software Stack
        </h2>

        <h3 className="font-bold text-sm mb-3">What We Build (Our IP)</h3>
        <div className="space-y-3 mb-6">
          {stackOwn.map((item) => (
            <div
              key={item.title}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-accent)]/30 px-4 py-4 rounded-sm"
            >
              <p className="font-bold text-sm mb-1">{item.title}</p>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-sm mb-3">
          What We Integrate (Open-Source / NVIDIA)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--color-brand-border)]">
            <thead>
              <tr className="bg-[var(--color-brand-surface)]">
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Layer
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Tool
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Source
                </th>
              </tr>
            </thead>
            <tbody>
              {stackIntegrate.map((row) => (
                <tr
                  key={row.layer}
                  className="border-b border-[var(--color-brand-border)] last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">{row.layer}</td>
                  <td className="px-4 py-3">{row.tool}</td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)]">
                    {row.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Architecture Diagram                                          */}
      {/* ------------------------------------------------------------ */}

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Architecture
        </h2>
        <div className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm font-mono text-xs leading-relaxed whitespace-pre overflow-x-auto">
{`[Operator Dashboard]   \u2190 Our IP: React + FastAPI
        |
[Task Planner]          \u2190 Our IP: LLM task decomposition
        |
[Perception]            \u2190 Isaac ROS: SLAM + NvBlox + Detection
        |
[Scene Understanding]   \u2190 On-device VLM: Qwen2.5-VL / VILA
        |
[Action Policy]         \u2190 GR00T N1.6 (fine-tuned) or Nav2
        |
[G-1 Hardware]          \u2190 Unitree SDK2 \u2192 Jetson \u2192 MCUs
        |
[Monitoring]            \u2190 Foxglove + InOrbit + Telemetry`}
        </div>
        <p className="text-xs text-[var(--color-brand-muted)] mt-3">
          Build and own everything the customer sees. Integrate everything under
          the hood.
        </p>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Use Case Mapping                                              */}
      {/* ------------------------------------------------------------ */}

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Use Case to Software Mapping
        </h2>
        <p className="text-sm text-[var(--color-brand-muted)] mb-4">
          Same G-1 EDU hardware. Different software makes it a different product.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--color-brand-border)]">
            <thead>
              <tr className="bg-[var(--color-brand-surface)]">
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Use Case
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Manipulation
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Key Software
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Timeline
                </th>
              </tr>
            </thead>
            <tbody>
              {useCaseMap.map((row) => (
                <tr
                  key={row.useCase}
                  className="border-b border-[var(--color-brand-border)] last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">{row.useCase}</td>
                  <td className="px-4 py-3">{row.manipulation}</td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)]">
                    {row.components}
                  </td>
                  <td className="px-4 py-3">{row.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Deployment Phases                                             */}
      {/* ------------------------------------------------------------ */}

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Deployment Phases
        </h2>

        {/* Phase 0 */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-sm bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)] text-xs font-bold">
              0
            </span>
            <div>
              <h3 className="font-bold text-base">Foundation</h3>
              <p className="text-xs text-[var(--color-brand-muted)]">
                No robot, no GPU &mdash; Mac only
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {phase0Tasks.map((item) => (
              <div
                key={item}
                className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] px-4 py-3 rounded-sm"
              >
                <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 1 */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-sm bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)] text-xs font-bold">
              1
            </span>
            <div>
              <h3 className="font-bold text-base">Simulation &amp; Training</h3>
              <p className="text-xs text-[var(--color-brand-muted)]">
                GX10 local hardware, no robot &mdash; ~60% of total development
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[var(--color-brand-border)]">
              <thead>
                <tr className="bg-[var(--color-brand-surface)]">
                  <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                    Task
                  </th>
                  <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                    Produces
                  </th>
                  <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody>
                {phase1Tasks.map((row) => (
                  <tr
                    key={row.task}
                    className="border-b border-[var(--color-brand-border)] last:border-b-0"
                  >
                    <td className="px-4 py-3 font-medium">{row.task}</td>
                    <td className="px-4 py-3 text-[var(--color-brand-muted)]">
                      {row.produces}
                    </td>
                    <td className="px-4 py-3">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Phase 2 */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-sm bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)] text-xs font-bold">
              2
            </span>
            <div>
              <h3 className="font-bold text-base">Real Robot</h3>
              <p className="text-xs text-[var(--color-brand-muted)]">
                Everything that strictly requires physical hardware
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {phase2Tasks.map((item) => (
              <div
                key={item}
                className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] px-4 py-3 rounded-sm"
              >
                <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Training Hardware — GX10 Pair                                  */}
      {/* ------------------------------------------------------------ */}

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3 text-[var(--color-brand-accent)]">
          Training Hardware &mdash; ASUS Ascent GX10 Pair
        </h2>
        <p className="text-sm text-[var(--color-brand-text)] leading-relaxed mb-4">
          TorontoRobots owns two ASUS Ascent GX10 units &mdash; personal AI
          supercomputers powered by the NVIDIA GB10 Grace Blackwell Superchip.
          Linked together: 2 petaFLOP AI compute, 256 GB unified memory, 12,288
          CUDA cores. This is a local training lab that eliminates cloud GPU
          spend for all fine-tuning, simulation, and model development.
        </p>

        <h3 className="font-bold text-sm mb-3">Specifications</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[var(--color-brand-border)]">
            <thead>
              <tr className="bg-[var(--color-brand-surface)]">
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">Spec</th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">Single Unit</th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">Linked Pair</th>
              </tr>
            </thead>
            <tbody>
              {gx10Specs.map((row) => (
                <tr key={row.spec} className="border-b border-[var(--color-brand-border)] last:border-b-0">
                  <td className="px-4 py-3 font-medium">{row.spec}</td>
                  <td className="px-4 py-3">{row.single}</td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)]">{row.pair}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-sm mb-3">GX10 vs Cloud vs Robot</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[var(--color-brand-border)]">
            <thead>
              <tr className="bg-[var(--color-brand-surface)]">
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">Spec</th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">GX10 (single)</th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">RunPod H100</th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">Jetson Orin NX</th>
              </tr>
            </thead>
            <tbody>
              {gx10VsCloud.map((row) => (
                <tr key={row.spec} className="border-b border-[var(--color-brand-border)] last:border-b-0">
                  <td className="px-4 py-3 font-medium">{row.spec}</td>
                  <td className="px-4 py-3">{row.gx10}</td>
                  <td className="px-4 py-3">{row.h100}</td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)]">{row.jetson}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--color-brand-muted)] leading-relaxed mb-6">
          H100 has ~2&times; raw FP32 compute and 10&times; memory bandwidth. But GX10 has
          1.6&times; the memory (128 GB vs 80 GB) and costs $0/hr. For memory-bound
          workloads the GX10 wins. For massive parallel RL, burst to cloud.
        </p>

        <h3 className="font-bold text-sm mb-3">Workload Assignment</h3>
        <div className="space-y-2 mb-6">
          {workloadAssignment.map((item) => (
            <div key={item.workload} className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] px-4 py-3 rounded-sm">
              <div className="flex items-start gap-3">
                <span className={`inline-block mt-0.5 text-xs font-bold px-2 py-0.5 rounded-sm whitespace-nowrap ${item.where.includes("local") ? "bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)]" : "bg-amber-900/20 text-amber-400"}`}>
                  {item.where}
                </span>
                <div>
                  <p className="font-bold text-sm">{item.workload}</p>
                  <p className="text-xs text-[var(--color-brand-muted)] leading-relaxed">{item.why}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-sm mb-3">Cost Impact</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--color-brand-border)]">
            <thead>
              <tr className="bg-[var(--color-brand-surface)]">
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">Scenario</th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">Before GX10 (all cloud)</th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">With GX10 (local)</th>
              </tr>
            </thead>
            <tbody>
              {costComparison.map((row) => (
                <tr key={row.scenario} className="border-b border-[var(--color-brand-border)] last:border-b-0">
                  <td className="px-4 py-3 font-medium">{row.scenario}</td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)] line-through">{row.before}</td>
                  <td className="px-4 py-3 font-bold">{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[var(--color-brand-surface)] border border-amber-800/30 px-4 py-3 rounded-sm mt-4">
          <p className="font-bold text-sm mb-1">Known Issue: Isaac Sim PhysX on GB10</p>
          <p className="text-xs text-[var(--color-brand-muted)] leading-relaxed">
            PhysX GPU acceleration has a known bug on GB10 ARM64 (Feb 2026 NVIDIA forum).
            CPU-based PhysX works as fallback. Scene building, rendering, and non-physics
            sim are unaffected. Use GX10 for everything except physics-heavy RL until
            NVIDIA patches this in Isaac Sim 6.x.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Fine-Tuning Reality Check                                     */}
      {/* ------------------------------------------------------------ */}

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3 text-[var(--color-brand-accent)]">
          Fine-Tuning &mdash; Reality Check
        </h2>
        <p className="text-sm text-[var(--color-brand-text)] leading-relaxed mb-4">
          Fine-tuning is roughly 20% of the work per customer engagement. The other
          80% is integration, configuration, dashboard development, and testing.
          But that 20% is the hardest part and the part that requires GPU. Here is
          every training task in the entire plan.
        </p>

        <h3 className="font-bold text-sm mb-3">Per Customer Engagement</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[var(--color-brand-border)]">
            <thead>
              <tr className="bg-[var(--color-brand-surface)]">
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">Training Task</th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">Model</th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">Data Required</th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">Time on GX10</th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  <span className="line-through">Old Cloud Cost</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {perCustomerTraining.map((row) => (
                <tr key={row.task} className="border-b border-[var(--color-brand-border)] last:border-b-0">
                  <td className="px-4 py-3 font-medium">{row.task}</td>
                  <td className="px-4 py-3">{row.model}</td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)]">{row.data}</td>
                  <td className="px-4 py-3">{row.timeOnGx10}</td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)] line-through">{row.oldCloudCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--color-brand-muted)] mb-6">
          Total per customer: 15&ndash;40 hours of GPU time on GX10. Previously $400&ndash;$2,500 on RunPod. Now free.
        </p>

        <h3 className="font-bold text-sm mb-3">One-Time Setup (Do Once)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {oneTimeTraining.map((item) => (
            <div key={item.task} className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] px-4 py-3 rounded-sm">
              <p className="font-bold text-sm mb-1">{item.task}</p>
              <p className="text-xs text-[var(--color-brand-muted)]">{item.time} on GX10</p>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-sm mb-3">What Is NOT Fine-Tuning</h3>
        <p className="text-xs text-[var(--color-brand-muted)] mb-3">
          Most of the NVIDIA stack is inference and integration, not training:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {notFineTuning.map((item) => (
            <div key={item.component} className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] px-4 py-3 rounded-sm">
              <p className="font-bold text-sm mb-1">{item.component}</p>
              <p className="text-xs text-[var(--color-brand-muted)]">{item.what}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  What the Customer Gets                                        */}
      {/* ------------------------------------------------------------ */}

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          What the Customer Gets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {customerDeliverables.slice(0, 3).map((item) => (
            <div
              key={item.title}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm"
            >
              <h3 className="font-bold text-sm mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {customerDeliverables.slice(3).map((item) => (
            <div
              key={item.title}
              className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] p-5 rounded-sm"
            >
              <h3 className="font-bold text-sm mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
        <p className="text-sm text-[var(--color-brand-text)] mt-4 leading-relaxed">
          The robot is commodity hardware. The software is the product. The
          intelligence we train into it, the interface we wrap around it, and the
          reports we generate from it &mdash; that is what the customer pays for.
        </p>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Pricing                                                       */}
      {/* ------------------------------------------------------------ */}

      <section>
        <h2 className="text-xl font-bold mb-4 text-[var(--color-brand-accent)]">
          Service Pricing
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--color-brand-border)]">
            <thead>
              <tr className="bg-[var(--color-brand-surface)]">
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Service
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Price Range
                </th>
                <th className="text-left px-4 py-3 font-bold border-b border-[var(--color-brand-border)]">
                  Included
                </th>
              </tr>
            </thead>
            <tbody>
              {pricing.map((row) => (
                <tr
                  key={row.service}
                  className="border-b border-[var(--color-brand-border)] last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">{row.service}</td>
                  <td className="px-4 py-3">{row.range}</td>
                  <td className="px-4 py-3 text-[var(--color-brand-muted)]">
                    {row.included}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--color-brand-muted)] mt-3 leading-relaxed">
          Hardware margin is separate. Software services are where the business
          scales.
        </p>
      </section>
    </div>
  );
}
