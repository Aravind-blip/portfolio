// Every entry here documents real, verified engineering work — a decision
// already made and shipped, or a gap already disclosed in the project
// itself. Dates are tied to verifiable milestones (a repository's creation
// date, or a specific tagged release) rather than invented. Planned items
// are labeled Planned with empty findings/evidence rather than fabricated
// results — see the Diabetes Prediction entry.
export const labEntries = [
  {
    id: "deterministic-vs-llm-judge",
    slug: "deterministic-vs-llm-judge",
    title: "Deterministic checks versus LLM-as-a-judge",
    summary:
      "Why RAG Agent Audit grades regressions with explicit rules instead of a model call, and where that boundary holds.",
    type: "Design Decision",
    status: "Validated",
    date: "2026-05-28",
    updatedAt: "2026-07-17",
    relatedProjectIds: ["rag-agent-audit"],
    relatedRepositoryUrl: "https://github.com/Aravind-blip/rag-agent-audit",
    caseStudyUrl: "/systems/rag-agent-audit",
    question: "Should a RAG/agent regression tool grade responses with an LLM judge, or with deterministic rules?",
    context:
      "RAG and agent regression testing needs to catch citation drift, tool misuse, and tenant leakage in CI. An LLM-as-judge approach is flexible and can catch subtler semantic issues, but its grading is not perfectly reproducible run to run, and it depends on an external model call succeeding.",
    hypothesis:
      "Deterministic checks — does this citation appear, was this source retrieved, was this tool called — would catch the specific, known failure patterns this tool targets just as reliably as an LLM judge, while staying reproducible and inspectable in a CI log.",
    approach:
      "Every check type in the project (expected_sources, forbidden_sources, forbidden_retrieved_sources, must_contain/must_not_contain, should_fallback, forbidden_tools, tenant_leakage, known_sources, tool_policy) is implemented as an explicit rule against structured response fields — never a model call.",
    findings:
      "The project's own test suite (roughly 6,300 lines of tests against 3,500 lines of source) exercises every check type deterministically and passes identically across Python 3.10-3.12 in CI, run after run. The README states this as an explicit design boundary: it \"does not perform LLM-as-judge evaluation (uses deterministic checks only).\"",
    evidence: [
      "README \"What it does not do\" section, explicitly ruling out LLM-as-judge evaluation.",
      "CI workflow (ci.yml) running the full deterministic check suite across three Python versions on every push.",
    ],
    limitations:
      "Deterministic checks cannot catch failures that do not reduce to a rule — for example, an answer that is technically well-sourced but subtly misleading in tone. That class of failure is out of scope by design, not an oversight.",
    nextSteps:
      "None currently planned. This is treated as a stable architectural boundary rather than a gap to close.",
    technologies: ["Python", "Pydantic", "Typer"],
    tags: ["evaluation", "RAG", "CI", "deterministic testing"],
    featured: true,
    sortOrder: 1,
    visibility: "public",
  },
  {
    id: "retrieval-boundaries-tenant-leakage",
    slug: "retrieval-boundaries-tenant-leakage",
    title: "Testing retrieval boundaries and tenant leakage",
    summary: "Why checking citations alone misses a RAG system that retrieves — but does not cite — a forbidden source.",
    type: "Reliability Study",
    status: "Validated",
    date: "2026-06-07",
    updatedAt: "2026-07-17",
    relatedProjectIds: ["rag-agent-audit"],
    relatedRepositoryUrl: "https://github.com/Aravind-blip/rag-agent-audit",
    caseStudyUrl: "/systems/rag-agent-audit",
    question: "Is validating citations enough to catch a RAG system leaking one tenant's data into another tenant's answer?",
    context:
      "A model can retrieve a forbidden or out-of-tenant source without ever citing it in its final answer. Citation-only testing would miss that retrieval-level leak entirely, even though the sensitive content still reached the model.",
    hypothesis:
      "Retrieved-source validation needs to be a check independent from citation validation, because the two failure modes do not imply each other.",
    approach:
      "forbidden_retrieved_sources and tenant_leakage validate the retrieved_sources field of a response separately from expected_sources/forbidden_sources, which validate citations. known_sources (shipped in v0.5.0) adds exact-match validation of both citations and retrieved sources against a JSONL corpus manifest.",
    findings:
      "Keeping retrieved-source checks independent from citation checks is documented as a deliberate choice in both the project README's check table and the migrated case study: a model can retrieve a forbidden source without ever citing it, so each failure mode needs its own check.",
    evidence: [
      "README check table listing forbidden_retrieved_sources and tenant_leakage as distinct from expected_sources/forbidden_sources.",
      "v0.5.0 release notes (\"Known-Source Validation\"), published 2026-06-07.",
    ],
    limitations:
      "forbidden_retrieved_sources and known_sources only work if the audited application exposes retriever debug output in its response. If an application does not surface what it retrieved, this class of check cannot run against it at all.",
    nextSteps: "No changes currently planned to this check design; it is considered stable.",
    technologies: ["Python", "JSONPath"],
    tags: ["reliability", "RAG", "security testing", "multi-tenancy"],
    featured: false,
    sortOrder: 2,
    visibility: "public",
  },
  {
    id: "jsonpath-response-mapping",
    slug: "jsonpath-response-mapping",
    title: "Designing reusable response mapping with JSONPath",
    summary: "Supporting arbitrary RAG endpoint shapes with one HTTP adapter instead of a per-framework SDK.",
    type: "Architecture Note",
    status: "Validated",
    date: "2026-05-28",
    updatedAt: "2026-07-17",
    relatedProjectIds: ["rag-agent-audit"],
    relatedRepositoryUrl: "https://github.com/Aravind-blip/rag-agent-audit",
    caseStudyUrl: "/systems/rag-agent-audit",
    question: "How do you validate RAG apps built on completely different frameworks without writing a new adapter for each one?",
    context:
      "FastAPI services, Flowise flows, and custom endpoints all return different JSON shapes for conceptually the same data — an answer, its citations, its tool calls.",
    hypothesis:
      "Mapping arbitrary JSON response shapes to one common internal schema via JSONPath expressions would let a single HTTP adapter validate any of them, instead of building a per-framework SDK integration.",
    approach:
      "response_mapping config accepts JSONPath expressions per field (answer, citations, retrieved_sources, tool_calls). The rag-agent-audit inspect command probes a live endpoint and suggests a starting response_mapping automatically rather than requiring it to be hand-written from scratch.",
    findings:
      "The same HTTP adapter validates both a FastAPI service and a Flowise flow today using only different response_mapping configs, not different code paths — confirmed by the README's Flowise and FastAPI quickstart examples using the identical CLI and adapter.",
    evidence: [
      "README \"Response mapping\" and \"Quickstart\" sections.",
      "examples/flowise/ — a working Flowise audit configuration using the same adapter as the FastAPI example.",
    ],
    limitations:
      "JSONPath mapping still requires writing one mapping expression per distinct endpoint shape — it avoids per-framework code, not configuration entirely.",
    nextSteps: "None currently planned; this remains the core extensibility mechanism per the project README.",
    technologies: ["Python", "httpx", "JSONPath"],
    tags: ["architecture", "extensibility", "RAG"],
    featured: false,
    sortOrder: 3,
    visibility: "public",
  },
  {
    id: "event-driven-workflow-recovery",
    slug: "event-driven-workflow-recovery",
    title: "Event-driven workflow state and recovery",
    summary: "Keeping a database write correct when the Kafka publish that is supposed to follow it can fail.",
    type: "Architecture Note",
    status: "In progress",
    date: "2026-07-05",
    updatedAt: "2026-07-17",
    relatedProjectIds: ["distributed-operations-control-plane"],
    relatedRepositoryUrl: "https://github.com/Aravind-blip/distributed-operations-control-plane",
    caseStudyUrl: "/systems/distributed-operations-control-plane",
    question: "How do you keep a database write correct when the message that is supposed to follow it can fail?",
    context:
      "The control plane's pipeline commits service-health state to Postgres, then publishes an event to Kafka so alerting and workflow logic can react. A naive implementation would wrap both in one transaction, or roll back the database write if the publish fails.",
    hypothesis:
      "Treating the Kafka publish as best-effort — log and count a failure rather than rolling back an already-committed database write — keeps the database consistent even through a transient Kafka outage.",
    approach:
      "Kafka publishes are wrapped so a publish failure is caught, logged, and counted via a Micrometer counter (kafka_messages_processed_total and a failure variant), without touching the already-committed database transaction. RBAC's distinct 401 vs. 403 handling and these custom counters are covered by MockMvc tests and an embedded-Kafka integration test.",
    findings:
      "The best-effort publish pattern and its metrics are implemented and covered by the embedded-Kafka integration test in the project's own test suite, run in CI on every push alongside the frontend build.",
    evidence: [
      "Embedded-Kafka integration test proving a published health event updates service state.",
      "Micrometer counters (alerts_created_total, kafka_messages_processed_total) exposed at /actuator/prometheus.",
    ],
    limitations:
      "This design accepts a lost event on Kafka failure — visible only via a counter and logs — rather than guaranteeing delivery. There is no consumer idempotency, retry logic, or circuit breaker yet, so a redelivered or duplicated event is not yet handled safely. This is documented as a known gap in the project itself, not hidden.",
    nextSteps:
      "Consumer idempotency and a retry/circuit-breaker layer around Kafka publishing are the next concrete steps, per the project's own roadmap.",
    technologies: ["Java", "Spring Boot", "Apache Kafka", "Micrometer"],
    tags: ["distributed systems", "reliability", "Kafka", "backend"],
    featured: false,
    sortOrder: 4,
    visibility: "public",
  },
  {
    id: "grounded-retrieval-source-presentation",
    slug: "grounded-retrieval-source-presentation",
    title: "Grounded retrieval and source presentation",
    summary: "Stopping a RAG system from answering confidently when its retrieved evidence is actually weak.",
    type: "Architecture Note",
    status: "Validated",
    date: "2026-04-09",
    updatedAt: "2026-07-17",
    relatedProjectIds: ["knowledge-hub"],
    relatedRepositoryUrl: "https://github.com/Aravind-blip/knowledge-hub",
    caseStudyUrl: "/systems/knowledge-hub",
    question: "How do you stop a RAG system from answering confidently when its retrieved evidence is actually weak?",
    context:
      "A model that always attempts an answer, even from weak or irrelevant retrieved context, produces confident-sounding hallucinations. Knowledge Hub's retrieval blends pgvector similarity with keyword overlap and needs a defined point at which it refuses to answer.",
    hypothesis:
      "An explicit relevance-score threshold gating generation, plus a fixed fallback response, would be more reliable than relying on prompting alone to make the model say it does not know.",
    approach:
      "ANSWER_MIN_SCORE gates generation — if no citation clears the threshold, the backend returns a fixed \"Not enough information found in indexed documents\" response without calling the generation model at all. Generation prompts additionally instruct the model to answer only from provided sources.",
    findings:
      "This is implemented and specifically measured: the project's own evaluation script computes grounded-answer rate, citation coverage, and fallback precision against a labeled dataset, rather than relying on spot-checking individual answers.",
    evidence: [
      "backend/scripts/run_evals.py — evaluation script scoring retrieval accuracy, grounded-answer rate, and fallback precision.",
      "README \"Retrieval and Evidence Tradeoffs\" section documenting the ANSWER_MIN_SCORE threshold.",
    ],
    limitations:
      "The default low-cost configuration (Groq generation plus hash-based fallback embeddings) trades retrieval quality for not requiring an OpenAI API key — real semantic retrieval requires switching to OpenAI embeddings. Fallback precision is only as good as the threshold tuning behind it.",
    nextSteps:
      "Wiring the evaluation harness into CI so a retrieval or prompt change fails the build on regression, instead of running the eval script manually, is the next step.",
    technologies: ["FastAPI", "pgvector", "LangGraph"],
    tags: ["RAG", "evaluation", "grounding"],
    featured: false,
    sortOrder: 5,
    visibility: "public",
  },
  {
    id: "diabetes-prediction-evaluation",
    slug: "diabetes-prediction-evaluation",
    title: "Reproducible evaluation for the Diabetes Prediction prototype",
    summary: "The model has no tracked accuracy number yet — this is the planning record for closing that gap, not a report of results.",
    type: "Evaluation Note",
    status: "Planned",
    date: "2026-07-17",
    updatedAt: "2026-07-17",
    relatedProjectIds: [],
    relatedRepositoryUrl: null,
    caseStudyUrl: "/systems/diabetes-prediction",
    question: "Is the Diabetes Prediction model actually any good, and how would this be measured?",
    context:
      "The project trains a logistic regression classifier and serves it through FastAPI and Streamlit, but no accuracy, precision, recall, or ROC-AUC number is tracked anywhere, and there is no automated test suite for the feature-encoding or serving path.",
    hypothesis: "",
    approach:
      "Planned: a script that loads a held-out test split, runs it through the serialized model, and reports accuracy, precision, recall, and ROC-AUC; a pytest suite covering feature encoding and the prediction endpoint.",
    findings: "",
    evidence: [],
    limitations:
      "No evaluation numbers exist yet, so the model's real accuracy is currently unknown. This entry is the planning record for that gap, not a report of results — no metrics are claimed here.",
    nextSteps: "Add the evaluation script and the automated test suite. Neither has been started yet.",
    technologies: ["Python", "scikit-learn"],
    tags: ["evaluation", "machine learning", "planned"],
    featured: false,
    sortOrder: 6,
    visibility: "public",
  },
];

export const featuredLabEntry = labEntries.find((entry) => entry.featured);
