// Every technical claim in the Published article below is backed by
// something that actually exists in the rag-agent-audit repository: its
// README, its CI workflows, its release notes, or its CONTRIBUTING/SECURITY
// docs (all independently verified against the live repository during
// Phase 6-8 work). No benchmark numbers, comparative pass rates, or
// experiments are invented — where a claim can't be backed by something
// real, it's phrased as reasoning about the architecture, not a measured
// result. Draft entries below carry metadata only, no content, and stay
// invisible to visitors per the Published-only visibility rule.
export const journalArticles = [
  {
    id: "deterministic-ai-regression-testing",
    slug: "deterministic-ai-regression-testing",
    title: "Why Deterministic Checks Belong in AI Regression Testing",
    summary:
      "RAG and agent systems fail in ways ordinary backend tests never see. Here's why rag-agent-audit grades those failures with explicit, deterministic rules instead of a second model call — and where that boundary genuinely holds.",
    description:
      "A deep-dive into why RAG Agent Audit uses deterministic, rule-based checks instead of LLM-as-a-judge evaluation for CI regression testing — the alternatives considered, the tradeoffs accepted, and where the boundary holds.",
    status: "Published",
    publishedDate: "2026-07-17",
    updatedDate: "2026-07-17",
    readingTime: "15 min read",
    difficulty: "Intermediate",
    topics: ["AI Evaluation", "CI/CD", "Testing", "RAG Systems"],
    tags: [
      "deterministic testing",
      "LLM-as-a-judge",
      "regression testing",
      "CI reliability",
      "schema validation",
      "citation validation",
    ],
    relatedProjects: ["rag-agent-audit"],
    relatedLabEntries: [
      "deterministic-vs-llm-judge",
      "retrieval-boundaries-tenant-leakage",
      "jsonpath-response-mapping",
    ],
    relatedRepositories: ["https://github.com/Aravind-blip/rag-agent-audit"],
    relatedArticles: [],
    heroDiagram: {
      type: "pipeline",
      nodes: [
        { label: "Config", detail: "YAML audit suite, Pydantic-validated" },
        { label: "Adapter", detail: "Mock fixtures or HTTP via JSONPath mapping" },
        { label: "Checks", detail: "Deterministic rules against structured fields" },
        { label: "Reporters", detail: "Terminal, JUnit, GitHub summary" },
      ],
    },
    heroImage: null,
    keyTakeaways: [
      "Deterministic checks trade semantic flexibility for reproducibility — the same input always produces the same verdict, which is what a CI gate actually needs.",
      "Citation validation and retrieved-source validation are not the same check. A model can retrieve a forbidden source without ever citing it, so each failure mode needs its own rule.",
      "JSONPath response mapping lets one HTTP adapter validate any framework's endpoint shape, avoiding a maintenance burden that scales with the number of frameworks supported.",
      "Mock mode validates that your check configuration is correct, not that your live application is healthy — conflating the two is a real, disclosed failure mode.",
      "Deterministic evaluation is a boundary, not a placeholder for a smarter system later. Semantic evaluation, if it's ever added, would be a separate, opt-in layer.",
    ],
    references: [
      {
        label: "rag-agent-audit repository",
        url: "https://github.com/Aravind-blip/rag-agent-audit",
      },
      {
        label: "RAG Agent Audit case study",
        url: "/systems/rag-agent-audit",
      },
      {
        label: "Open Source Hub",
        url: "/open-source",
      },
      {
        label: "v0.5.0 release notes — Known-Source Validation",
        url: "https://github.com/Aravind-blip/rag-agent-audit/releases/tag/v0.5.0",
      },
      {
        label: "v0.8.0 release notes — Offline Trace Import",
        url: "https://github.com/Aravind-blip/rag-agent-audit/releases/tag/v0.8.0",
      },
    ],
    sections: [
      {
        id: "summary",
        label: "Summary",
        content:
          "rag-agent-audit is a CI regression-testing CLI for RAG applications and AI agents. Every check it runs — does this citation appear, was this source retrieved, was this tool called — is an explicit, deterministic rule evaluated against structured response fields. There is no second model call grading the first model's output. This article walks through why that choice was made, what it costs, what alternatives were considered and rejected, and where the boundary between “testable” and “not testable” actually sits for a tool like this.",
      },
      {
        id: "problem",
        label: "Problem",
        content:
          "RAG applications and AI agents regress silently. A citation that used to point at the right paragraph quietly stops matching after a prompt tweak. A tool call that should require approval slips past an allowlist because a new tool was added and the policy wasn't updated. Context from one tenant's documents leaks into another tenant's answer because the retriever's namespace filter had an edge case. None of this shows up in a normal test suite, because a normal test suite checks code paths — did this function return 200, did this endpoint accept this payload — not model behavior. A RAG endpoint can return a perfectly well-formed 200 response that is, substantively, wrong: it cited a source it shouldn't have had access to, or it answered confidently from no evidence at all. The failure is semantic, not structural, and most CI pipelines have no mechanism for catching a semantic regression the same way they catch a broken build.\n\nConsider what actually changes in a typical iteration cycle on a RAG system: the prompt template gets a wording tweak to reduce verbosity, the retriever's chunk size gets tuned from 800 to 1000 characters, or the underlying model gets upgraded from one version to the next. Each of these is a routine, low-risk-looking change from a software engineering perspective — nothing about the deploy pipeline, the database schema, or the API contract changed. And yet any one of them can silently shift which sources get retrieved, which get cited, and whether a tool call that used to require human approval now fires automatically. The team that ships that change has no signal that anything broke until a user, or worse a compliance review, notices the wrong citation weeks later.",
      },
      {
        id: "background",
        label: "Background",
        content:
          "Once an LLM-backed feature ships, most teams have no repeatable way to check that retrieval, citations, and tool behavior still hold after a prompt change, a model upgrade, or a retriever swap. The regression usually surfaces only when a user notices something wrong — after it's already in production. rag-agent-audit's premise is that this class of regression can be caught the same way a unit test suite catches a code regression: define the expected behavior once, run it identically on every push, and fail the build when a change breaks it. The open design question was never whether to test this — it was how to grade the result. A RAG or agent response isn't a boolean; it's a paragraph of text with citations and, sometimes, tool calls attached. Something has to look at that response and decide pass or fail, and that decision has to be automatable, repeatable, and trustworthy enough to gate a merge.\n\nThis also had to work as a standalone tool rather than something baked into any one application. A team maintaining several RAG services — or evaluating a third-party one — shouldn't have to reimplement citation and tenant-leakage checking inside every codebase. Treating the checks as an external, versioned, installable CLI (distributed on PyPI) means the same audit suite can run against a FastAPI service today and a completely different stack tomorrow, and the checking logic itself gets to have its own test suite, its own release history, and its own CI — the same discipline a team would want any dependency it relies on to have.",
      },
      {
        id: "design-goals",
        label: "Design Goals",
        content: [
          "Reproducible: the same recorded response, run through the same suite, produces the same pass/fail result every time — no variance run to run.",
          "Inspectable: a failure has to explain itself. \"Check X failed because citation Y was expected and not found\" is useful in a CI log. \"The judge model scored this a 6/10\" is not.",
          "Offline-capable: CI should be able to validate that the audit suite itself is configured correctly without needing live network access to a model endpoint.",
          "Framework-agnostic: the tool has to validate a FastAPI service, a Flowise flow, or a custom endpoint without shipping a bespoke integration for each one.",
          "CI-native: results have to render as something a CI platform already understands — a JUnit XML report, an exit code, a GitHub Actions step summary — rather than a bespoke dashboard a team has to build tooling around.",
        ],
      },
      {
        id: "alternatives-considered",
        label: "Alternatives Considered",
        content: [
          {
            title: "LLM-as-a-judge grading",
            detail:
              "The obvious alternative: send the response (and maybe the question and retrieved context) to a second LLM call and ask it to grade correctness, groundedness, or safety. This is genuinely more flexible — a judge model can catch a subtly misleading answer that technically cites the right source. It was rejected as the core grading mechanism for three concrete reasons. First, reproducibility: a model call is not guaranteed to return the same judgment for the same input on every run, which makes a CI gate flaky by construction. Second, dependency: it requires a live call to an external model on every CI run, which is exactly the offline-capability goal this project explicitly wanted (see the Background above). Third, explainability: \"the judge disagreed\" is a much weaker CI failure message than \"the response cited forbidden_source.pdf, which is on the tenant's forbidden list.\"",
          },
          {
            title: "A plugin-per-framework adapter model",
            detail:
              "Early design considered shipping a dedicated adapter for each framework this tool might need to validate — a FastAPI adapter, a Flowise adapter, a LangChain adapter, and so on, each hand-coding how to extract an answer, citations, and tool calls from that framework's specific response shape. This was rejected in favor of one generic HTTP adapter plus JSONPath response mapping (covered in Implementation below), specifically to avoid a maintenance burden that scales linearly with the number of frameworks supported.",
          },
          {
            title: "Citation-only validation",
            detail:
              "An earlier, narrower version of the checks validated only what the model cited in its final answer. This missed an entire failure class: a model can retrieve a forbidden or out-of-tenant source and never cite it, while the sensitive content still reached the model's context window. The retrieved_sources field needed its own independent checks (forbidden_retrieved_sources, tenant_leakage) rather than folding that validation into citation checking.",
          },
          {
            title: "Snapshot / golden-output diffing",
            detail:
              "A simpler alternative still: record a known-good response once, and fail the build whenever a new response differs from that snapshot at all — the same pattern used for UI snapshot testing. This was rejected because RAG and agent responses are not meant to be byte-identical run to run; the same question can legitimately produce differently worded (but equally correct) answers as long as the citations, retrieved sources, and tool calls stay within policy. A snapshot diff would flag harmless wording changes as failures constantly, training engineers to approve snapshot updates reflexively — which defeats the purpose of a regression gate. Checking specific structured fields against specific rules, rather than diffing the whole response, is what makes it possible to tolerate reworded answers while still catching a genuine citation or policy regression.",
          },
        ],
      },
      {
        id: "architecture",
        label: "Architecture",
        diagram: {
          type: "pipeline",
          nodes: [
            { label: "Config", detail: "YAML audit suite, Pydantic-validated" },
            { label: "Adapter", detail: "Mock fixtures or HTTP via JSONPath mapping" },
            { label: "Checks", detail: "Citations, tenant leakage, tool policy, fallback, text rules" },
            { label: "Reporters", detail: "Terminal, JSON, Markdown, JUnit, GitHub summary" },
          ],
        },
        content:
          "The pipeline is four stages. A YAML suite defines the test cases and is validated against a Pydantic schema before anything runs, so a malformed suite fails fast with a clear error instead of partway through a check run. An adapter produces a normalized response — either from inline mock fixtures (fully offline) or from a real HTTP endpoint, using JSONPath expressions to map that endpoint's specific JSON shape onto a common internal schema (answer, citations, retrieved_sources, tool_calls). Every check type — expected_sources, forbidden_sources, forbidden_retrieved_sources, must_contain/must_not_contain, should_fallback, forbidden_tools, tenant_leakage, known_sources, tool_policy — runs against that same normalized schema regardless of which adapter produced it, so a check never needs to know whether it's grading a mock fixture or a live FastAPI response. Reporters are fully decoupled from checks: a check only produces a structured pass/fail result with a detail message, and terminal, JSON, Markdown, JUnit XML, and a GitHub Actions step-summary reporter all consume that same result independently. Adding a new output format never touches check logic, and adding a new check never touches reporting logic.\n\nA fifth piece sits upstream of the suite itself: the corpus-manifest workflow. `rag-agent-audit corpus scan ./docs --output corpus-manifest.jsonl` walks a directory of source documents and records what exists, so `known_sources` checks have an authoritative manifest of legitimate sources to validate citations and retrieved sources against, rather than a hand-maintained allowlist that drifts out of sync with the actual document set. `corpus generate-tests` goes a step further and produces a starter audit suite directly from that manifest — including risky-filename detection for source names containing terms like `secret`, `credential`, or `api_key` — which the project documents as starter templates to review and customize, not tests to run unmodified against a live endpoint.",
      },
      {
        id: "implementation",
        label: "Implementation",
        content: [
          "Mock mode requires no network access at all. `rag-agent-audit init basic --output audit.yaml` generates a starter suite with inline fixture responses, and `rag-agent-audit run audit.yaml` grades those fixtures against the configured checks — useful for validating that the suite itself is well-formed, and for CI jobs that shouldn't depend on a live endpoint being reachable.",
          "HTTP mode maps a real endpoint's response shape via `response_mapping` in the suite YAML — for example `answer: $.result.text`, `citations: $.result.sources[*].id`, `tool_calls: $.tool_calls[*].name`. Rather than requiring these paths to be guessed or hand-written from documentation, `rag-agent-audit inspect --endpoint <url>` sends a real probe question to the endpoint, prints the detected response fields, and suggests a starting `response_mapping` — the same discovery step whether the target is a FastAPI service or a Flowise flow.",
          "Retrieved-source and tenant-leakage checks read the `retrieved_sources` field independently of `citations`, so a source that was fetched but never cited is still caught. The `known_sources` check (added in v0.5.0) goes further, validating both fields against a JSONL corpus manifest for exact-match source verification rather than pattern matching.",
          "Every check produces a structured result with a specific failure detail — which citation was expected and missing, which forbidden source was retrieved, which tool was called outside its allowlist — and `--format junit` turns that directly into JUnit XML most CI platforms already know how to render as a familiar red/green test report.",
          "In a GitHub Actions workflow, this looks like any other test step: run the CLI against a suite, upload the JUnit XML as a build artifact, and optionally add `--github-summary` to append a Markdown results table directly to the workflow run's summary page — written even when tests fail, so a reviewer can see what broke without opening a separate log. The tool's own CI runs this exact loop against itself across Python 3.10, 3.11, and 3.12 on every push, plus a dedicated job that boots a mock HTTP server and runs both mock-mode and HTTP-mode audits end to end — the project uses its own regression-testing pattern to test itself.",
        ],
      },
      {
        id: "tradeoffs",
        label: "Tradeoffs",
        content: [
          "Deterministic checks cannot catch a failure that doesn't reduce to a rule. An answer that is technically well-sourced but subtly misleading in tone, or a response that's correct but oddly phrased, will pass every deterministic check while a human (or a judge model) might flag it. This is treated as an intentional scope boundary — see the project's own README, which states plainly that it \"does not perform LLM-as-judge evaluation (uses deterministic checks only)\" — rather than a gap the tool is trying to hide.",
          "Writing a `response_mapping` still requires understanding your endpoint's response shape, even with `inspect` suggesting a starting point. JSONPath mapping avoids a maintenance burden that scales with frameworks, but it doesn't eliminate per-endpoint configuration entirely.",
          "Retrieved-source checks (`forbidden_retrieved_sources`, `tenant_leakage`, `known_sources`) only work if the audited application exposes retriever debug output in its response. An endpoint that only returns a final answer, with no visibility into what it retrieved along the way, can't be checked for this failure class at all — the check needs the application to cooperate by exposing that data.",
        ],
      },
      {
        id: "failures",
        label: "Failures",
        content: [
          {
            title: "Mock mode can create false confidence",
            detail:
              "The project's own documented limitations are explicit about this: mock-mode audits validate that your check configuration and CI pipeline work, not that your actual live application behaves correctly. A team that runs only mock-mode checks in CI and treats a green build as \"the RAG app is healthy\" has misread what that signal means. The tool's own README lists this as a limitation rather than letting users discover it the hard way — mock mode and HTTP mode answer genuinely different questions, and conflating them is a real failure mode this project designed against by keeping both modes clearly separate and documented.",
          },
          {
            title: "Citation-only checking misses upstream leakage",
            detail:
              "As covered under Alternatives Considered, an earlier, narrower design that validated only cited sources would have missed a real class of tenant-isolation failure: retrieval-level leakage that never surfaces in the final citation. This wasn't a hypothetical concern — it's specifically why `forbidden_retrieved_sources` and `tenant_leakage` exist as checks independent from citation validation. A tool that only checked what a model chose to cite would give a false sense of security about what the model actually had access to.",
          },
          {
            title: "A trace-import feature that looks more complete than it is",
            detail:
              "v0.8.0 shipped offline Langfuse and OpenTelemetry trace import — but its own release notes are careful to state what it does not yet do: it doesn't call the Langfuse API, doesn't run an OpenTelemetry collector, and doesn't execute audit checks directly against imported traces yet. It imports and normalizes trace data for statistics, full stop. Shipping the release notes with that scope spelled out, rather than letting the feature name imply more than it does, is itself part of the discipline this project tries to hold itself to.",
          },
        ],
      },
      {
        id: "lessons-learned",
        label: "Lessons Learned",
        content: [
          "Reproducibility is not a nice-to-have for a CI gate — it's the entire point. A check that's right 95% of the time but non-deterministic is worse for CI than a check that's narrower but always right, because a flaky gate trains engineers to re-run the pipeline instead of investigating the failure.",
          "Splitting retrieved-source validation from citation validation was a direct response to realizing they answer different questions. Any check design that assumes \"if it's not in the answer, it didn't matter\" is missing a real failure surface in RAG systems specifically, where the retrieval step itself is a privacy and security boundary.",
          "Designing the adapter interface around a shared internal schema (rather than a framework SDK) paid for itself the first time a new endpoint shape needed support — no new adapter code, only a new JSONPath mapping. That's a reusable lesson beyond this project: build the seam at the data shape, not at the framework.",
          "Documenting what a feature does not do, in the same release notes that announce what it does, is cheap insurance against a feature's name over-promising its actual scope — as with v0.8.0's trace import.",
        ],
      },
      {
        id: "future-improvements",
        label: "Future Improvements",
        content: [
          "Trace-based audit execution — running the existing deterministic checks directly against imported trace data, instead of importing traces for statistics alone — is the concrete next step named in the v0.8.0 release notes themselves.",
          "Semantic evaluation, if it's ever added, is more likely to arrive as a separate, clearly-labeled opt-in layer than as a replacement for the deterministic core — consistent with how this project has drawn that boundary so far.",
        ],
      },
    ],
    featured: true,
    visibility: "public",
  },
  {
    id: "citation-correctness-not-retrieval-safety",
    slug: "citation-correctness-not-retrieval-safety",
    title: "Citation Correctness Is Not Retrieval Safety",
    summary:
      "Why validating what a model cites tells you less than you think about what it actually had access to — and what retrieval-boundary testing has to check instead.",
    description:
      "A closer look at the gap between citation validation and retrieval-boundary validation in RAG systems, and why both are necessary.",
    status: "Draft",
    publishedDate: null,
    updatedDate: "2026-07-17",
    readingTime: null,
    difficulty: "Intermediate",
    topics: ["AI Evaluation", "RAG Systems", "Security"],
    tags: ["retrieval safety", "multi-tenancy", "RAG"],
    relatedProjects: ["rag-agent-audit"],
    relatedLabEntries: ["retrieval-boundaries-tenant-leakage"],
    relatedRepositories: ["https://github.com/Aravind-blip/rag-agent-audit"],
    relatedArticles: [],
    heroDiagram: null,
    heroImage: null,
    keyTakeaways: [],
    references: [],
    sections: [],
    featured: false,
    visibility: "public",
  },
  {
    id: "framework-agnostic-response-mapping",
    slug: "framework-agnostic-response-mapping",
    title: "Framework-Agnostic Response Mapping",
    summary:
      "How mapping arbitrary JSON response shapes onto one internal schema lets a single adapter validate any RAG framework — without a plugin per framework.",
    description:
      "An architecture note on designing a framework-agnostic response mapping layer for validating RAG and agent endpoints.",
    status: "Draft",
    publishedDate: null,
    updatedDate: "2026-07-17",
    readingTime: null,
    difficulty: "Intermediate",
    topics: ["Architecture", "Developer Tools"],
    tags: ["JSONPath", "adapters", "extensibility"],
    relatedProjects: ["rag-agent-audit"],
    relatedLabEntries: ["jsonpath-response-mapping"],
    relatedRepositories: ["https://github.com/Aravind-blip/rag-agent-audit"],
    relatedArticles: [],
    heroDiagram: null,
    heroImage: null,
    keyTakeaways: [],
    references: [],
    sections: [],
    featured: false,
    visibility: "public",
  },
  {
    id: "reliable-ai-systems-inherit-production-engineering",
    slug: "reliable-ai-systems-inherit-production-engineering",
    title: "Reliable AI Systems Inherit Production Engineering Principles",
    summary:
      "AI reliability isn't a new discipline — it's the same CI, observability, and failure-handling discipline backend engineering already has, applied to a nondeterministic component.",
    description:
      "Why building reliable AI-backed systems draws directly on established production engineering practices rather than requiring an entirely new discipline.",
    status: "Draft",
    publishedDate: null,
    updatedDate: "2026-07-17",
    readingTime: null,
    difficulty: "Intermediate",
    topics: ["AI Reliability", "Backend Engineering"],
    tags: ["reliability", "observability", "CI/CD"],
    relatedProjects: ["rag-agent-audit", "distributed-operations-control-plane"],
    relatedLabEntries: [],
    relatedRepositories: [],
    relatedArticles: [],
    heroDiagram: null,
    heroImage: null,
    keyTakeaways: [],
    references: [],
    sections: [],
    featured: false,
    visibility: "public",
  },
  {
    id: "designing-evidence-first-ai-evaluation",
    slug: "designing-evidence-first-ai-evaluation",
    title: "Designing Evidence-First AI Evaluation",
    summary:
      "A framework for grounding AI evaluation decisions in verifiable evidence — repository state, release history, disclosed limitations — rather than assumed capability.",
    description:
      "How to design an AI evaluation approach that treats verifiable evidence, not assumed capability, as the source of truth.",
    status: "Draft",
    publishedDate: null,
    updatedDate: "2026-07-17",
    readingTime: null,
    difficulty: "Intermediate",
    topics: ["AI Evaluation", "Engineering Process"],
    tags: ["evaluation", "evidence-based engineering"],
    relatedProjects: ["rag-agent-audit", "knowledge-hub"],
    relatedLabEntries: [],
    relatedRepositories: [],
    relatedArticles: [],
    heroDiagram: null,
    heroImage: null,
    keyTakeaways: [],
    references: [],
    sections: [],
    featured: false,
    visibility: "public",
  },
];

export const publishedArticles = journalArticles.filter((article) => article.status === "Published");
export const draftArticles = journalArticles.filter((article) => article.status === "Draft");
export const featuredArticle = publishedArticles.find((article) => article.featured) || publishedArticles[0];
