// Real, verifiable next steps on existing projects rather than invented
// side-projects. Statuses are honest about what is and isn't finished.
export const labItems = [
  {
    title: "Trace-based audit execution for rag-agent-audit",
    project: "rag-agent-audit",
    status: "Planned",
    note:
      "Langfuse and OpenTelemetry trace import shipped in v0.8.0 as offline JSONL import. The next step, per that release's own notes, is running audit checks directly against imported trace data instead of importing it for statistics alone.",
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
