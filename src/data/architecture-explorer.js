// Data for the one flagship interactive architecture explorer (RAG Agent
// Audit). Every node, connection, and guided-sequence claim traces to the
// same verified source already used by src/data/case-studies/rag-agent-audit.js
// and src/data/lab-entries.js — nothing here introduces a new fact. Where
// the underlying feature is optional or not fully wired up (trace import),
// that limitation is stated explicitly rather than implied away.
export const ragArchitectureExplorer = {
  projectSlug: "rag-agent-audit",
  nodes: [
    {
      id: "config",
      label: "Config",
      detail: "YAML audit suite, Pydantic-validated",
      purpose:
        "Defines expected behavior once — citations, tenant boundaries, tool policy, fallback rules — as a YAML suite instead of bespoke assertions per endpoint. The suite is Pydantic-validated on load, so a malformed suite fails fast before any check runs.",
    },
    {
      id: "adapter",
      label: "Adapter",
      detail: "Mock fixtures or HTTP via JSONPath mapping",
      purpose:
        "Normalizes either a fully offline mock fixture or a live HTTP response into one common internal shape. HTTP mode uses JSONPath response mapping, so a FastAPI service, a Flowise flow, or any custom endpoint can be validated by mapping its JSON shape to the same schema — no per-framework adapter code.",
    },
    {
      id: "checks",
      label: "Checks",
      detail: "Citations, tenant leakage, tool policy, fallback, text rules",
      purpose:
        "Runs every check type as an explicit, deterministic rule against the normalized response — does this citation appear, was this source forbidden, was this tool called — rather than a model re-grading the answer. Retrieved-source checks are kept independent from citation checks, since a model can retrieve a forbidden source without ever citing it.",
    },
    {
      id: "reporters",
      label: "Reporters",
      detail: "Terminal, JSON, Markdown, JUnit, GitHub summary",
      purpose:
        "Consumes the structured pass/fail result each check produces. Terminal, JSON, Markdown, JUnit XML, and GitHub Actions summary output are fully decoupled reporters, so a CI pipeline can act on the same result a developer reads locally.",
    },
  ],
  connections: [
    {
      from: "config",
      to: "adapter",
      label: "Validated suite drives the adapter",
      description: "The Pydantic-validated suite tells the adapter which endpoint, fixture, or response mapping to use for this run.",
    },
    {
      from: "adapter",
      to: "checks",
      label: "Normalized response",
      description:
        "Both adapters — mock and HTTP — normalize to the same internal check-input shape, so every check type runs identically regardless of which adapter produced the data.",
    },
    {
      from: "checks",
      to: "reporters",
      label: "Structured pass/fail result",
      description:
        "A check only ever produces a structured result object; it never talks to a reporter directly, which is why adding a new output format never touches check logic.",
    },
  ],
  // Optional / framework-dependent evidence — shown so a visitor never
  // assumes every adapter exposes every evidence type by default.
  optionalEvidence: [
    {
      id: "retrieval-debug-output",
      label: "Retrieval and trace data",
      note: "Retrieved-source and tenant-leakage checks only run if the audited application exposes retriever debug output in its response. Offline trace import (Langfuse and OpenTelemetry JSONL) shipped in v0.8.0, but it produces trace statistics only — it does not yet execute audit checks against imported traces. That is the next planned step, not a shipped capability.",
    },
  ],
  guidedSequence: [
    {
      id: "load-test-definition",
      title: "Load test definition",
      nodeId: "config",
      description: "The YAML suite is parsed and Pydantic-validated before any check runs, so a malformed suite fails fast with a clear error.",
      link: { type: "case-study", route: "/systems/rag-agent-audit#solution", label: "Read the Solution section" },
    },
    {
      id: "send-request",
      title: "Send request to target endpoint",
      nodeId: "adapter",
      description: "In HTTP mode, the adapter sends the configured request to a real endpoint. In mock mode, it reads a fixture instead — both without needing network access for CI validation of the suite itself.",
      link: { type: "lab", route: "/lab/jsonpath-response-mapping", label: "Read the Lab entry" },
    },
    {
      id: "map-response-fields",
      title: "Map heterogeneous response fields",
      nodeId: "adapter",
      description: "response_mapping JSONPath expressions translate that endpoint's specific JSON shape (answer, citations, retrieved_sources, tool_calls) into the common internal schema every check expects.",
      link: { type: "lab", route: "/lab/jsonpath-response-mapping", label: "Read the Lab entry" },
    },
    {
      id: "inspect-evidence",
      title: "Inspect answer, citations, retrieval, or trace data",
      nodeId: "checks",
      description: "The normalized response exposes the answer, its citations, and — only if the target application surfaces it — retrieved-source and trace data. This step is optional/framework-dependent; see the note below.",
      link: { type: "lab", route: "/lab/retrieval-boundaries-tenant-leakage", label: "Read the Lab entry" },
      optional: true,
    },
    {
      id: "execute-checks",
      title: "Execute deterministic checks",
      nodeId: "checks",
      description: "Every check type — expected/forbidden sources, tenant leakage, tool policy, fallback, text rules — runs as an explicit rule, never an LLM judge call.",
      link: { type: "journal", route: "/journal/deterministic-ai-regression-testing", label: "Read the Journal article" },
    },
    {
      id: "classify-failures",
      title: "Classify failures",
      nodeId: "checks",
      description: "Each check produces a structured pass/fail result naming exactly which rule failed, rather than a single opaque suite-level failure.",
      link: { type: "case-study", route: "/systems/rag-agent-audit#testing", label: "Read the Testing section" },
    },
    {
      id: "produce-ci-results",
      title: "Produce CI-readable results",
      nodeId: "reporters",
      description: "Terminal output for local runs, JUnit XML for CI test reporting, and a GitHub Actions run summary all consume the same structured result.",
      link: { type: "case-study", route: "/systems/rag-agent-audit#implementation", label: "Read the Implementation section" },
    },
  ],
};
