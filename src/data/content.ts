export type WritingItem = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readMinutes: number;
  body: string;
};

export type WorkStatus = "Completed" | "In Progress";

export type WorkItem = {
  slug: string;
  title: string;
  subtitle: string;
  status: WorkStatus;
  date?: string;
  thumbnailColor: string;
  description: string;
  body: string;
};

export const writingItems: WritingItem[] = [
  {
    slug: "continual-learning-benchmarks",
    title: "Continual learning beyond toy benchmarks",
    subtitle: "Evaluating forgetting under realistic shifts",
    date: "2026-02-16",
    readMinutes: 8,
    body: `A lot of continual learning papers still rely on simplified benchmark setups that are useful for quick iteration but disconnected from deployment. I have been building an internal benchmark suite that intentionally introduces messiness: long-tail classes, annotation drift, sensor updates, and changing task boundaries.

One recurring pattern is that methods with strong replay components still dominate in practical settings, but only when the replay data itself is curated carefully. Naive replay can quietly amplify stale modes in the data distribution.

I am also interested in how evaluation cadence impacts what we conclude. Frequent checkpoint evaluations can paint an optimistic picture that disappears when we test only at operational milestones.`,
  },
  {
    slug: "representation-drift-monitoring",
    title: "Tracking representation drift in deployed models",
    subtitle: "When embeddings change before accuracy does",
    date: "2026-01-08",
    readMinutes: 7,
    body: `In several projects, I have seen latent space geometry shift noticeably before top-line accuracy metrics move. This has made me treat representation drift as an early warning channel rather than a purely diagnostic artifact.

The most useful signal has been neighborhood instability for anchor examples that represent stable concepts. If nearest neighbors begin to rotate rapidly for those anchors, downstream errors often emerge a few cycles later.

Looking ahead, I want to connect drift signatures with automatic mitigation strategies, such as selective replay or confidence-aware retraining triggers.`,
  },
  {
    slug: "adaptive-memory-architectures",
    title: "Adaptive memory for lifelong ML systems",
    subtitle: "Balancing retention, plasticity, and cost",
    date: "2025-11-29",
    readMinutes: 9,
    body: `Memory design is one of the most practical levers in lifelong learning systems. I have been exploring adaptive memory architectures where allocation and eviction policies respond to uncertainty and novelty signals.

A key insight is that rarity alone is not a sufficient retention criterion. Some rare samples are noisy outliers, while some frequent patterns become critical when they sit near decision boundaries.

I think adaptive memory will become a core primitive for continual systems, much like caching is for distributed services.`,
  },
  {
    slug: "continual-evaluation-protocols",
    title: "Continual evaluation protocols that mirror production",
    subtitle: "Why milestone testing beats dense checkpointing",
    date: "2025-10-11",
    readMinutes: 6,
    body: `Many offline evaluation loops overstate robustness because they test too often and too narrowly. In production, teams usually evaluate at milestone boundaries with noisier signals.

I outline practical protocol choices that make benchmark outcomes better correlated with real deployment behavior.`,
  },
  {
    slug: "shift-aware-data-curricula",
    title: "Designing shift-aware data curricula",
    subtitle: "Ordering data streams for robust adaptation",
    date: "2025-08-23",
    readMinutes: 5,
    body: `Curricula in continual settings should not only optimize immediate transfer. They should stage complexity so that long-horizon retention remains healthy.

This note shares a simple strategy for constructing mixed-difficulty streams with explicit recovery windows.`,
  },
  {
    slug: "monitoring-forgetting-signals",
    title: "Monitoring forgetting signals in real time",
    subtitle: "Operational metrics beyond top-line accuracy",
    date: "2025-06-18",
    readMinutes: 7,
    body: `Forgetting often appears first in narrow slices before it hits aggregate dashboards. I describe lightweight slice-health monitors that can run continuously.

The focus is on signals that are actionable for teams shipping frequent model updates.`,
  },
  {
    slug: "replay-buffer-governance",
    title: "Replay buffer governance for compliance-heavy domains",
    subtitle: "Memory policies under retention constraints",
    date: "2025-04-27",
    readMinutes: 8,
    body: `Replay helps retention but can conflict with governance rules in regulated environments. This post covers practical policy layers around sample retention and deletion.

I also discuss how to preserve adaptation quality while honoring stricter data lifecycles.`,
  },
  {
    slug: "diagnosing-adaptation-failures",
    title: "Diagnosing adaptation failures systematically",
    subtitle: "A debugging checklist for non-stationary training",
    date: "2025-03-02",
    readMinutes: 6,
    body: `When adaptation fails, teams often jump straight to algorithm swaps. A structured diagnosis can surface simpler fixes in data, scheduling, or evaluation.

This checklist aims to reduce random iteration and improve postmortem quality.`,
  },
  {
    slug: "robustness-vs-plasticity-tradeoffs",
    title: "Robustness vs. plasticity: practical tradeoffs",
    subtitle: "Choosing update behavior for long-lived models",
    date: "2025-01-15",
    readMinutes: 5,
    body: `Highly plastic systems adapt fast but can destabilize mature capabilities. Highly robust systems preserve behavior but may lag behind distribution change.

I summarize heuristics for tuning that balance under realistic compute and latency budgets.`,
  },
  {
    slug: "evaluation-slices-that-matter",
    title: "Evaluation slices that actually matter",
    subtitle: "Prioritizing slices tied to user impact",
    date: "2024-11-20",
    readMinutes: 6,
    body: `Not all slices deserve equal monitoring investment. This piece argues for ranking slices by operational risk and user impact.

It includes a compact template for maintaining a living slice registry across releases.`,
  },
];

export const workItems: WorkItem[] = [
  {
    slug: "adaptive-retraining-orchestrator",
    title: "Adaptive Retraining Orchestrator",
    subtitle: "Policy-driven retraining triggers",
    status: "In Progress",
    thumbnailColor: "#263047",
    description: "A control plane for scheduling retraining jobs based on drift and confidence thresholds.",
    body: `This project is building a policy layer that decides when retraining should happen and how aggressive each cycle should be.

Current work focuses on safe rollout controls and audit trails for trigger decisions.`,
  },
  {
    slug: "model-health-ops-console",
    title: "Model Health Ops Console",
    subtitle: "Unified runtime health and incident triage",
    status: "In Progress",
    thumbnailColor: "#1f3a33",
    description: "An operations console combining drift, latency, and slice-quality diagnostics.",
    body: `The goal is to reduce time-to-diagnosis when production behavior changes after model updates.

I am currently implementing event correlation views for faster triage.`,
  },
  {
    slug: "continual-eval-dashboard",
    title: "Continual Eval Dashboard",
    subtitle: "Experiment tracking for non-stationary training",
    status: "Completed",
    date: "2026-03-03",
    thumbnailColor: "#1e1e2e",
    description: "A lightweight dashboard for comparing retention, forward transfer, and drift indicators.",
    body: `I built this project to make continual learning experiments easier to reason about over long horizons.

The dashboard ingests run metadata and renders progression panels that highlight retention trends and regime shifts.`,
  },
  {
    slug: "dataset-shift-lab",
    title: "Dataset Shift Lab",
    subtitle: "Synthetic and real-world shift simulation toolkit",
    status: "Completed",
    date: "2025-12-14",
    thumbnailColor: "#1a2416",
    description: "A toolkit for generating controlled distribution shifts and stress-testing adaptation pipelines.",
    body: `Dataset Shift Lab started as scripts and evolved into a reusable toolkit for evaluating model resilience.

Scenario templating and deterministic seeds made side-by-side comparisons much more reliable.`,
  },
  {
    slug: "ml-infra-notes-engine",
    title: "ML Infra Notes Engine",
    subtitle: "Searchable knowledge base for experiment decisions",
    status: "Completed",
    date: "2025-10-02",
    thumbnailColor: "#2a1616",
    description: "An internal tool that captures experiment rationales and links artifacts to decisions.",
    body: `This project addresses a common problem in research teams: important context is scattered.

The notes engine ties hypotheses, configs, and outcomes into searchable decision trails.`,
  },
  {
    slug: "stream-benchmark-factory",
    title: "Stream Benchmark Factory",
    subtitle: "Configurable continual benchmark generation",
    status: "Completed",
    date: "2025-08-18",
    thumbnailColor: "#2f2338",
    description: "A generator for reproducible benchmark streams with staged shift templates.",
    body: `I built this to standardize benchmark setup across teams working on adaptation methods.

It reduced setup overhead and improved reproducibility across experiments.`,
  },
  {
    slug: "slice-alert-router",
    title: "Slice Alert Router",
    subtitle: "Routing model quality alerts to owners",
    status: "Completed",
    date: "2025-06-07",
    thumbnailColor: "#24302b",
    description: "A routing layer that maps quality regressions to owning teams and services.",
    body: `The router turns slice-specific quality drops into actionable alerts with ownership metadata.

This helped shorten incident response loops in multi-team environments.`,
  },
  {
    slug: "memory-budget-simulator",
    title: "Memory Budget Simulator",
    subtitle: "Tradeoff analysis for replay strategies",
    status: "Completed",
    date: "2025-04-11",
    thumbnailColor: "#3a2e1c",
    description: "A simulator for evaluating retention-plasticity tradeoffs under strict memory budgets.",
    body: `This simulator provides side-by-side comparisons for different memory allocation policies.

It made budget decisions easier to explain to non-research stakeholders.`,
  },
  {
    slug: "deployment-readiness-scorecard",
    title: "Deployment Readiness Scorecard",
    subtitle: "Pre-release stability checks",
    status: "Completed",
    date: "2025-02-26",
    thumbnailColor: "#242844",
    description: "A scoring workflow for assessing adaptation updates before production deployment.",
    body: `The scorecard combines technical risk and operational readiness into a single review artifact.

It improved release consistency and made go/no-go decisions more transparent.`,
  },
  {
    slug: "feature-drift-atlas",
    title: "Feature Drift Atlas",
    subtitle: "Explorable drift maps across model features",
    status: "Completed",
    date: "2024-12-19",
    thumbnailColor: "#1f2d40",
    description: "An atlas-style interface for inspecting feature-level drift over time.",
    body: `This tool maps feature movement over releases and links drift spikes to upstream changes.

It is frequently used in postmortems and release planning.`,
  },
];

export const sortedWritingItems = [...writingItems].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export const sortedWorkItems = [...workItems].sort((a, b) => {
  if (a.status === "In Progress" && b.status !== "In Progress") return -1;
  if (a.status !== "In Progress" && b.status === "In Progress") return 1;
  if (!a.date && !b.date) return 0;
  if (!a.date) return -1;
  if (!b.date) return 1;
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});
