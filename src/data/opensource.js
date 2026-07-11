// Only genuinely public repositories appear here. No stars/forks/issue counts
// are shown — a small, honest number would look worse than none, and a live
// count this static page can't actually keep current would be misleading.
export const openSourceRepos = [
  {
    slug: "rag-agent-audit",
    name: "RAG Agent Audit",
    identity:
      "A CI regression-testing CLI for RAG applications and AI agents, published to PyPI.",
    facts: [
      "Published to PyPI, Apache 2.0 licensed",
      "Test suite exceeds its own source size",
      "CI runs the full suite across Python 3.10-3.12 on every push",
    ],
    nextNote:
      "Trace-import support for Langfuse and OpenTelemetry already works in the codebase; the next step is stabilizing it into a documented, versioned feature.",
    githubUrl: "https://github.com/Aravind-blip/rag-agent-audit",
  },
  {
    slug: "distributed-operations-control-plane",
    name: "Distributed Operations Control Plane",
    identity:
      "A simulated ops control plane for service health, alerting, and workflow approvals.",
    facts: [
      "Full Docker Compose stack: Postgres, Kafka, backend, frontend, Prometheus, Grafana",
      "CI runs the backend test suite and frontend build on every push",
      "Kubernetes and OpenShift manifests included",
    ],
    nextNote:
      "Consumer idempotency, retry handling, and distributed tracing are documented gaps in the project itself, not yet implemented.",
    githubUrl: "https://github.com/Aravind-blip/distributed-operations-control-plane",
  },
  {
    slug: "knowledge-hub",
    name: "Knowledge Hub",
    identity:
      "Organization-scoped RAG search over uploaded documents, with citations and an evaluation harness.",
    facts: [
      "Hybrid retrieval: pgvector similarity blended with keyword re-scoring",
      "Labeled evaluation dataset scoring retrieval accuracy and hallucination rate",
      "Backend pytest suite plus Playwright end-to-end tests for auth and organization isolation",
    ],
    nextNote:
      "Wiring the evaluation harness into CI so a retrieval or prompt change fails the build on regression.",
    githubUrl: "https://github.com/Aravind-blip/knowledge-hub",
  },
];
