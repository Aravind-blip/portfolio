// Rich, structured documentation content for the Knowledge Hub deep-dive
// page. Every fact here is restructured from what was already verified by
// direct repository inspection (see src/data/projects.js's entry for the
// same project) — nothing new is introduced, only reorganized into the
// documentation-style schema this page renders.
export const knowledgeHubCaseStudy = {
  slug: "knowledge-hub",
  title: "Knowledge Hub",
  subtitle: "Organization-scoped RAG search over uploaded documents, with citations and an eval harness",
  status: "Active",
  category: "AI Systems & Evaluation",

  overview:
    "A full-stack RAG application where users upload PDF, text, or Markdown documents, and ask questions answered strictly from retrieved snippets with inline citations back to the source file and page. Retrieval combines pgvector cosine similarity with a lexical keyword-overlap re-score, isolated per organization at the database query and row-level-security level. A labeled evaluation dataset and script measure retrieval accuracy, grounded-answer rate, citation coverage, and fallback precision.",

  problem: {
    statement:
      "Teams accumulate PDFs and internal documents that are hard to search and easy to answer incorrectly about, especially once multiple organizations or workspaces share the same system.",
    context:
      "A RAG system is only as trustworthy as its retrieval and its willingness to say \"not enough information\" — getting both of those right, and being able to measure them, is the core hard problem in applied RAG.",
  },

  solution: {
    summary:
      "A hybrid-retrieval RAG pipeline that blends vector similarity with keyword overlap, isolates organizations at two independent layers, and answers strictly from retrieved snippets with inline citations — backed by a labeled evaluation harness that measures whether it's actually working.",
    approach: [
      "Chunk uploaded documents (1000 characters, 150 overlap) so retrieval can operate on focused passages rather than whole files.",
      "Blend pgvector cosine similarity with a keyword-overlap re-score, so exact-term matches and semantic matches both surface relevant chunks.",
      "Generate answers only from retrieved snippets, with inline citations back to source file and page, and an explicit \"not enough information\" fallback.",
      "Measure the pipeline against a labeled evaluation dataset rather than relying on spot-checking answers.",
    ],
  },

  architecture: {
    type: "rag-flow",
    nodes: [
      { label: "Ingestion", detail: "PDF/text/Markdown parsed and chunked (1000 chars, 150 overlap)" },
      { label: "Retrieval", detail: "pgvector cosine similarity blended with keyword-overlap re-scoring" },
      { label: "Generation", detail: "LangGraph two-step chain: retrieve, then generate with citation prompting" },
      { label: "Evaluation", detail: "Labeled dataset scoring retrieval accuracy, grounding, and fallback precision" },
    ],
  },

  engineeringDecisions: [
    {
      decision: "Use hybrid retrieval (vector similarity plus keyword overlap) instead of vector-only search.",
      reason:
        "Pure embedding similarity misses exact-term matches that keyword overlap catches, and vice versa — combining both catches more of the relevant chunks either would miss alone.",
      alternatives: "Vector-only retrieval using pgvector cosine similarity alone.",
      tradeoffs:
        "Blending two scoring signals adds re-scoring logic and a tuning surface (how much weight each signal gets), in exchange for retrieval that isn't blind to exact-term queries a pure embedding search would miss.",
      futureImprovement:
        "Extending the evaluation harness to run automatically in CI on every retrieval or prompt change, so regressions in retrieval quality are caught the same way rag-agent-audit catches them in other agent projects (see Roadmap).",
    },
    {
      decision: "Enforce organization isolation at two independent layers: the retrieval SQL query and Postgres row-level security.",
      reason:
        "A bug in one layer shouldn't expose another organization's documents — isolation needed a second, independent enforcement point, not just careful query-writing.",
      alternatives: "Relying on the retrieval query's WHERE clause alone to scope results to the correct organization.",
      tradeoffs:
        "Enforcing isolation twice means row-level security policies to maintain alongside the query logic, in exchange for isolation that survives a mistake in either layer alone.",
      futureImprovement: "None planned; this is a stable, intentional defense-in-depth choice.",
    },
    {
      decision: "Instruct the generation model to answer only from provided sources and explicitly say \"not enough information\" when evidence is weak.",
      reason:
        "Letting the model fill gaps from its own parametric knowledge would break the citation guarantee the whole system is built around.",
      alternatives: "Allowing the model to supplement retrieved context with its own general knowledge when retrieval comes up short.",
      tradeoffs:
        "This trades away answers the model could technically produce from general knowledge, in exchange for every answer being traceable to a cited source or explicitly flagged as unsupported.",
      futureImprovement:
        "The evaluation harness already measures grounded-answer rate and fallback precision to verify this holds in practice, rather than trusting the prompt alone.",
    },
    {
      decision: "Provide a hash-based fallback embedding mode for running without an external embeddings API key.",
      reason:
        "Development and plumbing work shouldn't require a paid API key just to exercise the system end to end.",
      alternatives: "Requiring an OpenAI (or other) embeddings API key to run the project at all, even for local development.",
      tradeoffs:
        "The hash-based fallback is clearly not semantic search and trades real retrieval quality for zero-dependency local development — it is documented as a development fallback, not the default retrieval path (see Limitations).",
      futureImprovement: "None planned; this remains a development-only fallback by design.",
    },
  ],

  technology: [
    { group: "Backend", items: ["FastAPI", "SQLAlchemy"] },
    { group: "Data & Retrieval", items: ["PostgreSQL", "pgvector"] },
    { group: "Frontend", items: ["Next.js", "React", "TypeScript"] },
    { group: "AI & Orchestration", items: ["LangChain", "LangGraph", "OpenAI", "Groq"] },
  ],

  implementation: [
    {
      title: "Two-step LangGraph chain separates retrieval from generation",
      detail:
        "Retrieval and generation are distinct steps in the graph, so each can be evaluated, tuned, or swapped independently rather than living inside one monolithic prompt-and-fetch call.",
    },
    {
      title: "Citation prompting is enforced at generation time, not post-processed",
      detail:
        "The generation step is prompted to cite inline back to source file and page as part of producing the answer, rather than trying to attach citations after the fact.",
    },
    {
      title: "Organization scoping is enforced at the query layer before row-level security ever applies",
      detail:
        "The retrieval SQL query itself is scoped to the requesting organization, with Postgres row-level security as a second, independent backstop.",
    },
  ],

  testing: {
    summary:
      "Backend pytest suite covers auth, chat routes, document routes, generation, and the retrieval graph. Frontend has Playwright end-to-end tests for auth and organization isolation, plus a k6 load test script.",
    points: [
      "Pytest coverage for auth, chat routes, document routes, generation, and the retrieval graph.",
      "Playwright end-to-end tests specifically covering auth and organization isolation.",
      "A k6 load test script for the frontend.",
      "A dedicated evaluation script runs a labeled question set through the full retrieval and generation pipeline.",
    ],
  },

  challenges: [
    {
      title: "Measuring whether retrieval and grounding actually work, not just whether the app runs",
      detail:
        "A labeled evaluation dataset and script were built to compute top-3/top-5 retrieval accuracy, mean reciprocal rank, grounded-answer rate, citation coverage, fallback precision, and hallucination rate — turning \"does it feel right\" into something measurable.",
    },
    {
      title: "Isolating organizations without trusting a single layer",
      detail:
        "Getting organization isolation right required enforcing it at both the retrieval query and Postgres row-level security, since a single-layer mistake anywhere would otherwise leak documents across organizations.",
    },
  ],

  limitations: [
    "No OCR, so scanned or image-only PDFs extract no text.",
    "The default low-cost configuration (Groq generation plus hash-based fallback embeddings) trades retrieval quality for not requiring an OpenAI API key — real semantic retrieval requires switching to OpenAI embeddings.",
  ],

  results: {
    summary:
      "The evaluation harness gives this project a measurable read on retrieval and grounding quality, rather than relying on spot-checking answers, and organization isolation is covered by dedicated end-to-end tests.",
    points: [
      "A labeled evaluation dataset scores retrieval accuracy, grounding, citation coverage, and fallback precision.",
      "Playwright end-to-end tests specifically verify organization isolation, not just auth.",
      "A k6 load test script exists for exercising the frontend under load.",
    ],
  },

  lessons: [
    "Building the evaluation harness alongside the retrieval pipeline — rather than after — made it possible to catch a simpler retrieval approach falling short in testing before it shipped, instead of discovering the gap later.",
    "Enforcing organization isolation at two independent layers (query scoping and row-level security) is more code to maintain, but it means a single mistake in one layer is a defense-in-depth gap, not a data leak.",
    "A hash-based fallback embedding mode is only safe to keep around if it's clearly documented as a development fallback and not the default — an undocumented \"works without an API key\" path is an easy source of silently degraded retrieval quality.",
  ],

  roadmap: [
    {
      label: "Run the evaluation harness automatically in CI",
      status: "Planned",
      detail:
        "So retrieval or prompt changes are checked for regressions the same way rag-agent-audit checks other agent projects, rather than relying on manually re-running the evaluation script.",
    },
  ],

  repository: {
    githubUrl: "https://github.com/Aravind-blip/knowledge-hub",
    demoUrl: null,
    status: "Active",
  },

  relatedProjects: ["rag-agent-audit", "distributed-operations-control-plane"],
};
