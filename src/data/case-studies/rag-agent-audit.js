// Rich, structured documentation content for the RAG Agent Audit deep-dive
// page. Every fact here is restructured from what was already verified by
// direct repository inspection (see src/data/projects.js's entry for the
// same project) — nothing new is introduced, only reorganized into the
// documentation-style schema this page renders.
export const ragAgentAuditCaseStudy = {
  slug: "rag-agent-audit",
  title: "RAG Agent Audit",
  subtitle: "CI regression testing for RAG applications and AI agents",
  status: "Active",
  category: "AI Systems & Evaluation",

  overview:
    "RAG Agent Audit is a Python command-line tool, published to PyPI, that runs a YAML-defined suite of deterministic checks against a RAG application or AI agent. It validates citations, retrieved sources, tool usage, and fallback behavior — either fully offline against mock fixtures, or against a real HTTP endpoint via configurable JSONPath response mapping. Results are printed to the terminal, written as JUnit XML for CI test reporting, or posted as a GitHub Actions run summary.",

  problem: {
    statement:
      "RAG applications and AI agents regress silently. A citation quietly stops matching its source. A tool call slips past an allowlist. Context from one tenant leaks into another tenant's response. None of this shows up in a normal test suite, because a normal test suite checks code paths, not model behavior.",
    context:
      "Once an LLM-backed feature ships, most teams have no repeatable way to check that retrieval, citations, and tool behavior still hold after a prompt, model, or retriever change. Regressions in these systems tend to surface only when a user notices something wrong — after the change has already reached production.",
  },

  solution: {
    summary:
      "A YAML-configured audit suite that runs the same deterministic checks every time, against either a mock fixture or a live endpoint, and reports failures the same way a unit test suite would — as a pass/fail signal a CI pipeline can act on.",
    approach: [
      "Define expected behavior once, in a YAML suite, rather than writing bespoke assertions per endpoint.",
      "Run the identical suite offline (mock mode) to validate the configuration itself, or against a real endpoint (HTTP mode) to validate the live system.",
      "Map any JSON response shape to a common schema via JSONPath, instead of writing a new adapter per framework.",
    ],
  },

  architecture: {
    type: "pipeline",
    nodes: [
      { label: "Config", detail: "YAML audit suite, Pydantic-validated" },
      { label: "Adapter", detail: "Mock fixtures or HTTP via JSONPath mapping" },
      { label: "Checks", detail: "Citations, tenant leakage, tool policy, fallback, text rules" },
      { label: "Reporters", detail: "Terminal, JSON, Markdown, JUnit, GitHub summary" },
    ],
  },

  engineeringDecisions: [
    {
      decision: "Use deterministic, rule-based checks instead of an LLM-as-judge.",
      reason:
        "Every check is an explicit, auditable rule — does this citation appear, is this source forbidden, was this tool called — so failures are reproducible and explainable.",
      alternatives: "An LLM-as-judge approach, which is more flexible but re-grades non-deterministically.",
      tradeoffs:
        "Deterministic checks can't catch subtler semantic failures an LLM judge might; the tool intentionally trades that flexibility for reproducibility.",
      futureImprovement:
        "Documented as a boundary, not a gap to close — semantic evaluation is explicitly out of scope by design (see Limitations).",
    },
    {
      decision: "Map arbitrary JSON responses to a common schema via JSONPath, instead of building a per-framework SDK.",
      reason:
        "One HTTP adapter can validate a FastAPI service, a Flowise flow, or any custom endpoint by mapping its JSON response shape to the same internal representation.",
      alternatives: "Writing a dedicated adapter or SDK integration per framework (FastAPI, Flowise, LangChain, etc.).",
      tradeoffs:
        "JSONPath mapping requires writing one mapping expression per endpoint shape; a framework-specific SDK would be more plug-and-play for that one framework, at the cost of needing a new adapter for every new framework.",
      futureImprovement: "No change planned — this remains the core extensibility mechanism.",
    },
    {
      decision: "Run the full suite in a fully offline mock mode, independent of HTTP mode.",
      reason: "CI can validate the audit configuration itself without needing network access to a live model endpoint.",
      alternatives: "Requiring a live endpoint for every CI run.",
      tradeoffs:
        "Mock mode validates the suite's own correctness, not the live system's actual behavior — both modes are needed for full confidence.",
      futureImprovement: "None planned; this is a stable, intentional split.",
    },
    {
      decision: "Keep retrieved-source validation as a separate check from citation validation.",
      reason:
        "A model can retrieve a forbidden source without ever citing it in its final answer — each failure mode needs its own independent check.",
      alternatives: "A single combined \"source usage\" check covering both citation and retrieval.",
      tradeoffs:
        "Two separate checks add a small amount of configuration surface, in exchange for catching a failure mode a combined check would miss.",
      futureImprovement: "None planned.",
    },
  ],

  technology: [
    { group: "Language & Runtime", items: ["Python"] },
    { group: "CLI & Validation", items: ["Typer", "Pydantic"] },
    { group: "HTTP & Data", items: ["httpx", "JSONPath"] },
    { group: "Distribution & CI", items: ["Docker", "GitHub Actions", "PyPI"] },
  ],

  implementation: [
    {
      title: "Mock and HTTP adapters share one interface",
      detail:
        "Both adapters normalize to the same internal check-input shape, so every check type runs identically regardless of which adapter produced the data.",
    },
    {
      title: "Reporters are fully decoupled from checks",
      detail:
        "A check only produces a structured result; terminal, JSON, Markdown, JUnit, and GitHub Actions summary output are all separate reporters consuming that same result, so adding a new output format never touches check logic.",
    },
    {
      title: "Suite validation happens before any check runs",
      detail:
        "The YAML suite is Pydantic-validated on load, so a malformed suite fails fast with a clear error rather than partway through a check run.",
    },
  ],

  testing: {
    summary:
      "The project's own test suite is larger than its source — roughly 6,300 lines of tests against 3,500 lines of source — run in CI across Python 3.10, 3.11, and 3.12.",
    points: [
      "Unit tests cover every check type and every reporter independently.",
      "A dedicated CI job boots a mock HTTP server and runs both mock-mode and HTTP-mode audits end to end.",
      "Tests run on every push via GitHub Actions across three Python versions.",
    ],
  },

  challenges: [
    {
      title: "Supporting arbitrary response shapes without per-framework code",
      detail:
        "Early design considered a plugin-per-framework model. JSONPath mapping was adopted specifically to avoid that maintenance burden, at the cost of asking users to write one mapping expression per endpoint.",
    },
    {
      title: "Keeping mock mode meaningfully useful, not just a stub",
      detail:
        "Mock mode needed to validate real suite logic, not just \"does the CLI run.\" This shaped the decision to run the same check code against both mock and HTTP adapters, rather than a simplified test-only path.",
    },
  ],

  limitations: [
    "Deterministic checks only — there is no semantic or LLM-judge evaluation.",
    "Retrieved-source checks require the target application to expose retriever debug output.",
    "This is a regression testing tool, not a complete security, compliance, or AI-safety solution.",
  ],

  results: {
    summary:
      "The tool's test suite exceeds its own source size and runs clean across three Python versions in CI, alongside a live smoke test against a mock HTTP server.",
    points: [
      "Published to PyPI as a real, installable package, not just a local script.",
      "CI is green across Python 3.10–3.12 on every push.",
    ],
  },

  lessons: [
    "Deterministic checks are a deliberate ceiling, not a limitation to eventually remove — the tool is more trustworthy because its checks are auditable, even though that rules out semantic evaluation.",
    "Designing the adapter interface around a common schema, rather than a framework SDK, paid off the first time a new endpoint shape needed support — no new adapter code was needed, only a new JSONPath mapping.",
  ],

  roadmap: [
    {
      label: "Trace import for Langfuse and OpenTelemetry",
      status: "Shipped",
      detail:
        "Released in v0.8.0 as offline JSONL import and trace statistics for both formats. It does not call the Langfuse API or run an OpenTelemetry collector directly, and does not execute audit checks against imported traces yet.",
    },
    {
      label: "Trace-based audit execution",
      status: "Planned",
      detail:
        "The v0.8.0 release notes describe this as the next step the offline trace-import work was built toward — running audit checks directly against imported trace data instead of importing it for statistics alone.",
    },
  ],

  repository: {
    githubUrl: "https://github.com/Aravind-blip/rag-agent-audit",
    license: "Apache 2.0",
    latestRelease: "v0.8.0",
    packageManager: "PyPI",
    demoUrl: null,
    status: "Active",
  },

  relatedProjects: ["knowledge-hub"],
};
