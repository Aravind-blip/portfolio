// Only verified, code-confirmed capabilities are described here. Anything not
// present in the referenced repository is intentionally left out rather than
// implied.
export const projects = [
  {
    slug: "rag-agent-audit",
    name: "RAG Agent Audit",
    tagline: "CI regression testing for RAG applications and AI agents",
    status: "Active",
    order: 1,
    problem:
      "RAG applications and AI agents regress silently: a citation quietly stops matching its source, a tool call slips past an allowlist, or context from one tenant leaks into another tenant's response. None of this shows up in a normal test suite.",
    whyItMatters:
      "Once an LLM-backed feature ships, most teams have no repeatable way to check that retrieval, citations, and tool behavior still hold after a prompt, model, or retriever change. Regressions in these systems tend to surface only when a user notices something wrong.",
    whatIBuilt:
      "A Python CLI, published to PyPI, that runs a YAML-defined suite of deterministic checks against a RAG app or agent. It supports a fully offline mock mode for validating the audit configuration itself, and an HTTP mode that hits a real endpoint via configurable JSONPath response mapping. Results can be printed to the terminal, written as JUnit XML for CI test reporting, or posted as a GitHub Actions run summary.",
    architecture: [
      { label: "Config", detail: "YAML audit suite, Pydantic-validated" },
      { label: "Adapter", detail: "Mock fixtures or HTTP via JSONPath mapping" },
      { label: "Checks", detail: "Citations, tenant leakage, tool policy, fallback, text rules" },
      { label: "Reporters", detail: "Terminal, JSON, Markdown, JUnit, GitHub summary" },
    ],
    decisions: [
      "Deterministic checks only, no LLM judge — every check is an explicit rule (does this citation appear, is this source forbidden, was this tool called) so failures are reproducible and explainable rather than a probabilistic re-grade.",
      "JSONPath response mapping instead of per-framework SDKs, so one HTTP adapter can validate a FastAPI service, a Flowise flow, or any custom endpoint by mapping its JSON response shape to a common schema.",
      "Mock mode runs fully offline, so CI can validate the audit configuration itself without needing network access to a live model endpoint.",
      "Retrieved-source checks are kept separate from citation checks, since a model can retrieve a forbidden source without ever citing it in its answer — each needs its own check.",
    ],
    tech: ["Python", "Typer", "Pydantic", "httpx", "JSONPath", "Docker", "GitHub Actions", "PyPI"],
    reliability:
      "The project's own test suite is larger than its source (roughly 6,300 lines of tests against 3,500 lines of source), run in CI across Python 3.10-3.12 alongside a live smoke test against a mock HTTP server.",
    testing:
      "Pytest suite covering every check type and reporter, run on every push via GitHub Actions across three Python versions, plus a dedicated CI job that boots a mock server and runs both mock- and HTTP-mode audits end to end.",
    limitations:
      "Deterministic checks only — there is no semantic or LLM-judge evaluation. Retrieved-source checks require the target application to expose retriever debug output. This is a regression testing tool, not a complete security, compliance, or AI-safety solution.",
    nextIteration:
      "The repository already has working trace-import support for Langfuse and OpenTelemetry ahead of its published roadmap; the next step is stabilizing that into a documented, versioned feature rather than an internal one.",
    githubUrl: "https://github.com/Aravind-blip/rag-agent-audit",
    demoUrl: null,
    isPrivate: false,
  },
  {
    slug: "distributed-operations-control-plane",
    name: "Distributed Operations Control Plane",
    tagline: "A simulated ops control plane for service health, alerting, and workflow approvals",
    status: "Stable",
    order: 2,
    problem:
      "Operations teams need a way to see service health, get alerted on degradation, and route remediation through an approval workflow with an audit trail — without every team member having direct access to production systems.",
    whyItMatters:
      "Reviewing this kind of system end to end (event flow, RBAC, observability, audit trail) is a useful way to demonstrate backend and operational thinking, even at simulation scale rather than production scale.",
    whatIBuilt:
      "A Spring Boot backend that generates synthetic service-health telemetry on a schedule, publishes it to Kafka, and reacts to degraded or offline transitions by creating alerts and routing them into a workflow approval process with a full audit trail. A React and TypeScript frontend provides the dashboard, and the whole stack runs via Docker Compose with Prometheus and Grafana wired up for metrics.",
    architecture: [
      { label: "Producer", detail: "Scheduled job publishes synthetic health events to Kafka" },
      { label: "Consumer", detail: "Updates service state, creates alerts on degraded/offline transitions" },
      { label: "Workflow", detail: "Alerts route into approval workflows with an audit trail" },
      { label: "Observability", detail: "Micrometer counters scraped by Prometheus, visualized in Grafana" },
    ],
    decisions: [
      "Kafka publishes are wrapped so a broker failure doesn't roll back an already-committed database write — the system favors a consistent database over a guaranteed event, and logs/counts the failure instead.",
      "RBAC is enforced with method-level authorization checks and distinct 401 vs. 403 handling, since \"not authenticated\" and \"not authorized\" are different failure modes an operator needs to distinguish.",
      "Custom application metrics (alerts created, Kafka messages processed and failed) are exposed alongside Spring Boot Actuator health checks, so both business-level and infrastructure-level signals are visible in the same dashboard.",
      "This is intentionally a single well-tested service rather than multiple independently deployed services — the distributed behavior being demonstrated is the Kafka-driven event flow and coordination logic, not multi-service network topology.",
    ],
    tech: ["Java", "Spring Boot", "Spring Security", "Apache Kafka", "PostgreSQL", "React", "TypeScript", "Docker", "Kubernetes", "Prometheus", "Grafana"],
    reliability:
      "JUnit 5 tests cover service logic with Mockito, RBAC behavior with MockMvc, and Kafka consumption with an embedded Kafka integration test. CI runs the full backend test suite and frontend build on every push.",
    testing:
      "Unit tests for alert and workflow services, MockMvc tests asserting role-based access on approval endpoints, and an embedded-Kafka integration test for the health-event consumer, all run in GitHub Actions.",
    limitations:
      "No retry logic, circuit breakers, distributed tracing, or Kafka consumer idempotency yet — the project's own documentation lists these as known gaps rather than hiding them. It runs as a single Kafka broker with no partition-tolerance story, so it demonstrates event-driven coordination patterns rather than true multi-node distributed guarantees.",
    nextIteration:
      "Adding consumer idempotency and a retry/circuit-breaker layer around Kafka publishing, plus distributed tracing, are the most concrete next steps already identified in the project's own roadmap.",
    githubUrl: "https://github.com/Aravind-blip/distributed-operations-control-plane",
    demoUrl: "https://frontend-production-ee3f.up.railway.app",
    demoNote: "Hosted on Railway's free tier; may be slow to wake from idle.",
    isPrivate: false,
  },
  {
    slug: "knowledge-hub",
    name: "Knowledge Hub",
    tagline: "Organization-scoped RAG search over uploaded documents, with citations and an eval harness",
    status: "Active",
    order: 3,
    problem:
      "Teams accumulate PDFs and internal documents that are hard to search and easy to answer incorrectly about, especially once multiple organizations or workspaces share the same system.",
    whyItMatters:
      "A RAG system is only as trustworthy as its retrieval and its willingness to say \"not enough information\" — getting both of those right, and being able to measure them, is the core hard problem in applied RAG.",
    whatIBuilt:
      "A full-stack RAG application where users upload PDF, text, or Markdown documents, and ask questions answered strictly from retrieved snippets with inline citations back to the source file and page. Retrieval combines pgvector cosine similarity with a lexical keyword-overlap re-score, isolated per organization at the database query and row-level-security level. A labeled evaluation dataset and script measure retrieval accuracy, grounded-answer rate, citation coverage, and fallback precision.",
    architecture: [
      { label: "Ingestion", detail: "PDF/text/Markdown parsed and chunked (1000 chars, 150 overlap)" },
      { label: "Retrieval", detail: "pgvector cosine similarity blended with keyword-overlap re-scoring" },
      { label: "Generation", detail: "LangGraph two-step chain: retrieve, then generate with citation prompting" },
      { label: "Evaluation", detail: "Labeled dataset scoring retrieval accuracy, grounding, and fallback precision" },
    ],
    decisions: [
      "Hybrid retrieval (vector similarity plus keyword overlap) instead of vector-only search, because pure embedding similarity misses exact-term matches that keyword overlap catches, and vice versa.",
      "Organization isolation is enforced twice — once in the retrieval SQL query and again via Postgres row-level security — so a bug in one layer doesn't expose another organization's documents.",
      "Generation prompts explicitly instruct the model to answer only from provided sources and return an explicit \"not enough information\" response when evidence is weak, rather than letting it fill gaps from parametric knowledge.",
      "A hash-based fallback embedding mode exists for running the system without an external embeddings API key — it is clearly not semantic search, and is used only as a development/plumbing fallback, not the default retrieval path.",
    ],
    tech: ["FastAPI", "SQLAlchemy", "PostgreSQL", "pgvector", "Next.js", "React", "TypeScript", "LangChain", "LangGraph", "OpenAI", "Groq"],
    reliability:
      "Backend pytest suite covers auth, chat routes, document routes, generation, and the retrieval graph. Frontend has Playwright end-to-end tests for auth and organization isolation, plus a k6 load test script.",
    testing:
      "A dedicated evaluation script runs a labeled question set against the retrieval and generation pipeline, computing top-3/top-5 retrieval accuracy, mean reciprocal rank, grounded-answer rate, citation coverage, fallback precision, and hallucination rate.",
    limitations:
      "No OCR, so scanned or image-only PDFs extract no text. The default low-cost configuration (Groq generation plus hash-based fallback embeddings) trades retrieval quality for not requiring an OpenAI API key — real semantic retrieval requires switching to OpenAI embeddings.",
    nextIteration:
      "Extending the evaluation harness to run automatically in CI on every retrieval or prompt change, so regressions are caught the same way rag-agent-audit catches them in other agent projects.",
    githubUrl: "https://github.com/Aravind-blip/knowledge-hub",
    demoUrl: null,
    isPrivate: false,
  },
  {
    slug: "diabetes-prediction",
    name: "Diabetes Prediction App",
    tagline: "An educational decision-support prototype, not a diagnostic tool",
    status: "Prototype",
    order: 4,
    problem:
      "Understanding how routine health measurements relate to diabetes risk is a well-known applied machine learning exercise, useful for practicing the full loop from features to a usable prediction interface.",
    whyItMatters:
      "This project is explicitly educational: it demonstrates taking a trained model past a notebook and into a working client-server interface, not a clinical result.",
    whatIBuilt:
      "A logistic regression classifier trained on a public-style diabetes risk dataset (age, BMI, HbA1c level, blood glucose level, hypertension, heart disease, gender, and smoking history), served behind a small FastAPI backend and a Streamlit front end where a user enters those values and receives a binary risk indicator.",
    architecture: [
      { label: "Client", detail: "Streamlit form collects health measurement inputs" },
      { label: "API", detail: "FastAPI endpoint loads the serialized model and returns a prediction" },
      { label: "Model", detail: "Logistic regression trained on encoded categorical and numeric features" },
    ],
    decisions: [
      "Kept the model as a single, interpretable logistic regression rather than a black-box ensemble, since a decision-support demo benefits more from transparency than marginal accuracy gains.",
      "Split the client and API into separate services (Streamlit and FastAPI) to practice a realistic serving pattern rather than embedding the model directly in the UI process.",
    ],
    tech: ["Python", "scikit-learn", "FastAPI", "Streamlit"],
    reliability:
      "This is the most prototype-stage project in the portfolio: it has not been re-verified end-to-end recently, and should be read as a learning project, not a production or clinical system.",
    testing:
      "No automated test suite currently — this is an area planned for improvement rather than something already in place.",
    limitations:
      "This is an educational and decision-support exercise, not a medical diagnostic system, and should never be used to make real health decisions. Only a single model was trained; there is no multi-model comparison. The source is private, so implementation details are intentionally not published here.",
    nextIteration:
      "Adding a proper train/evaluation script with tracked metrics (accuracy, precision, recall, ROC-AUC) and a basic automated test suite are the clear next steps before this graduates past prototype status.",
    githubUrl: null,
    demoUrl: null,
    isPrivate: true,
  },
  {
    slug: "enterprise-finance-platform",
    name: "Enterprise Finance Workflow Platform",
    tagline: "Professional experience building and supporting an enterprise finance workflow system",
    status: "Production support",
    order: 5,
    problem:
      "Enterprise finance teams need workflow approvals, audit trails, and reliable data access across a large internal user base, with production issues resolved quickly when they occur.",
    whyItMatters:
      "This is professional, verified work experience rather than an open-source project — it demonstrates sustained delivery and support on a system real finance users depended on daily.",
    whatIBuilt:
      "As part of an engineering team, contributed to workflow states, approval chains, and supporting REST APIs for an enterprise finance platform, working across Angular front ends, ASP.NET Core services, SQL Server data access, and Azure Functions automation, with releases managed through Azure DevOps.",
    architecture: [
      { label: "Frontend", detail: "Angular workflow UI for finance approvals" },
      { label: "Backend", detail: "ASP.NET Core REST APIs and workflow logic" },
      { label: "Data", detail: "SQL Server with optimized queries for high-traffic endpoints" },
      { label: "Automation", detail: "Azure Functions handling scheduled and event-driven tasks" },
    ],
    decisions: [
      "Focused SQL optimization effort on the highest-traffic workflow queries rather than broad schema changes, since targeted indexing and query rewrites gave the most reliability improvement for the least production risk.",
      "Kept audit trail writes as part of the same transaction as workflow state changes, so approval history could never drift out of sync with the actual workflow state.",
    ],
    tech: ["Angular", "TypeScript", "ASP.NET Core", "C#", "SQL Server", "Azure Functions", "Azure DevOps", "REST APIs"],
    reliability:
      "Provided ongoing production support for the platform, including live issue triage, in addition to feature delivery — a different reliability discipline than pre-release testing alone.",
    testing:
      "Release and support work followed the team's existing CI/CD and release process in Azure DevOps.",
    limitations:
      "This is confidential enterprise work — internal architecture, proprietary business logic, and client-specific details are intentionally not disclosed here.",
    nextIteration:
      "Not applicable — this reflects completed professional experience rather than an actively evolving personal project.",
    githubUrl: null,
    demoUrl: null,
    isPrivate: true,
    isProfessionalExperience: true,
  },
];

export const featuredProjects = [...projects].sort((a, b) => a.order - b.order);
