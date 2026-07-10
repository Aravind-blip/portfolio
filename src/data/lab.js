// Real, verifiable next steps on existing projects rather than invented
// side-projects. Statuses are honest about what is and isn't finished.
export const labItems = [
  {
    title: "Trace import for rag-agent-audit",
    project: "rag-agent-audit",
    status: "Experimental",
    note:
      "Langfuse and OpenTelemetry trace import already work in the codebase, ahead of the published roadmap. Next step is stabilizing them into a documented, versioned feature.",
  },
  {
    title: "CI-gated evaluation for Knowledge Hub",
    project: "knowledge-hub",
    status: "Planned",
    note:
      "The retrieval and generation evaluation harness runs manually today. Wiring it into CI so a retrieval or prompt change fails the build on regression is the next step.",
  },
  {
    title: "Consumer idempotency for the control plane",
    project: "distributed-operations-control-plane",
    status: "Planned",
    note:
      "Kafka consumer idempotency, retry handling, and distributed tracing are documented gaps in the project itself, not yet implemented.",
  },
  {
    title: "Evaluation script for the diabetes prediction prototype",
    project: "diabetes-prediction",
    status: "Planned",
    note:
      "Adding a tracked train/evaluation script (accuracy, precision, recall, ROC-AUC) and a basic test suite before this moves past prototype status.",
  },
];
