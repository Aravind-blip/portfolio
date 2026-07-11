// Engineering principles, each backed by a real, verifiable decision from a
// specific project rather than a self-assessed skill level.
export const engineeringPrinciples = [
  {
    principle: "Reliability",
    statement: "Systems fail predictably, not silently.",
    evidence:
      "rag-agent-audit exists specifically to catch silent RAG and agent regressions before they reach users.",
    projectSlug: "rag-agent-audit",
  },
  {
    principle: "Observability",
    statement: "You can tell what a system is doing without guessing.",
    evidence:
      "The control plane exposes custom Micrometer counters and a Grafana dashboard for alert and Kafka-processing activity.",
    projectSlug: "distributed-operations-control-plane",
  },
  {
    principle: "Testing and Evaluation",
    statement: "Claims about correctness are backed by a real, runnable check.",
    evidence:
      "rag-agent-audit's own test suite exceeds its source size; Knowledge Hub measures retrieval accuracy and hallucination rate against a labeled dataset.",
    projectSlug: "knowledge-hub",
  },
  {
    principle: "Performance",
    statement: "Optimization is targeted, not vague.",
    evidence:
      "Enterprise finance workflow queries were optimized specifically on the highest-traffic endpoints, not rewritten wholesale.",
    projectSlug: "enterprise-finance-platform",
  },
  {
    principle: "Maintainability",
    statement: "Code is written to be changed safely later.",
    evidence:
      "rag-agent-audit's JSONPath response mapping lets new endpoint shapes be supported without new adapter code per framework.",
    projectSlug: "rag-agent-audit",
  },
  {
    principle: "Developer Experience",
    statement: "Tools are built to be usable by someone other than their author.",
    evidence:
      "rag-agent-audit is published to PyPI with a Typer-based CLI, not kept as a personal script.",
    projectSlug: "rag-agent-audit",
  },
  {
    principle: "Architecture and Tradeoffs",
    statement: "Every design choice states the alternative it rejected.",
    evidence:
      "Each project's engineering decisions name what wasn't chosen and why, not just what was built.",
    projectSlug: "distributed-operations-control-plane",
  },
  {
    principle: "Problem-Solving Under Real Constraints",
    statement: "Decisions reflect actual limitations, not textbook-ideal conditions.",
    evidence:
      "Production support on the enterprise finance platform meant fixing live issues under real operational constraints, not greenfield conditions.",
    projectSlug: "enterprise-finance-platform",
  },
];
