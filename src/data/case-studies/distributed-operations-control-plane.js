// Rich, structured documentation content for the Distributed Operations
// Control Plane deep-dive page. Every fact here is restructured from what was
// already verified by direct repository inspection (see src/data/projects.js's
// entry for the same project) — nothing new is introduced, only reorganized
// into the documentation-style schema this page renders.
export const distributedOperationsControlPlaneCaseStudy = {
  slug: "distributed-operations-control-plane",
  title: "Distributed Operations Control Plane",
  subtitle: "A simulated ops control plane for service health, alerting, and workflow approvals",
  status: "Stable",
  category: "Backend & Distributed Systems",

  overview:
    "A Spring Boot backend that generates synthetic service-health telemetry on a schedule, publishes it to Kafka, and reacts to degraded or offline transitions by creating alerts and routing them into a workflow approval process with a full audit trail. A React and TypeScript frontend provides the dashboard, and the whole stack runs via Docker Compose with Prometheus and Grafana wired up for metrics.",

  problem: {
    statement:
      "Operations teams need a way to see service health, get alerted on degradation, and route remediation through an approval workflow with an audit trail — without every team member having direct access to production systems.",
    context:
      "Reviewing this kind of system end to end — event flow, RBAC, observability, audit trail — is a useful way to demonstrate backend and operational thinking, even at simulation scale rather than production scale.",
  },

  solution: {
    summary:
      "An event-driven pipeline where synthetic health events flow through Kafka into a consumer that updates service state, raises alerts on degraded or offline transitions, and routes those alerts into an approval workflow with a complete audit trail — all observable through Prometheus and Grafana.",
    approach: [
      "Publish synthetic service-health events to Kafka on a schedule, rather than requiring real production traffic to exercise the system.",
      "React to state transitions (not just raw events) so alerts fire on meaningful degradation rather than on every message.",
      "Route every alert through an approval workflow with an audit trail, rather than letting any operator act on production directly.",
      "Expose custom application metrics alongside Spring Boot Actuator health checks so business-level and infrastructure-level signals live in the same dashboard.",
    ],
  },

  architecture: {
    type: "pipeline",
    nodes: [
      { label: "Producer", detail: "Scheduled job publishes synthetic health events to Kafka" },
      { label: "Consumer", detail: "Updates service state, creates alerts on degraded/offline transitions" },
      { label: "Workflow", detail: "Alerts route into approval workflows with an audit trail" },
      { label: "Observability", detail: "Micrometer counters scraped by Prometheus, visualized in Grafana" },
    ],
  },

  engineeringDecisions: [
    {
      decision: "Wrap Kafka publishes so a broker failure doesn't roll back an already-committed database write.",
      reason:
        "The system favors a consistent database over a guaranteed event — a lost event can be logged and counted, but a rolled-back write would leave the database itself inconsistent.",
      alternatives:
        "Wrapping the database write and the Kafka publish in a single transaction, so either both succeed or both roll back together.",
      tradeoffs:
        "This accepts that a Kafka publish can fail silently from the caller's perspective (beyond logging and metrics), in exchange for never losing a committed database write to a broker outage.",
      futureImprovement:
        "Adding consumer idempotency and a retry/circuit-breaker layer around Kafka publishing is already identified as a next step (see Roadmap).",
    },
    {
      decision: "Enforce RBAC with method-level authorization checks and distinct 401 vs. 403 handling.",
      reason:
        "\"Not authenticated\" and \"not authorized\" are different failure modes an operator needs to distinguish — a 401 means log in, a 403 means this account will never be allowed to do that.",
      alternatives:
        "Returning a single generic error status for both authentication and authorization failures.",
      tradeoffs:
        "Distinguishing the two failure modes means more explicit handling at the API layer, in exchange for clearer, actionable errors for both operators and API consumers.",
      futureImprovement: "None planned; this is a stable, intentional split.",
    },
    {
      decision: "Expose custom application metrics (alerts created, Kafka messages processed and failed) alongside Spring Boot Actuator health checks.",
      reason:
        "Both business-level signals (is the alerting logic actually doing something) and infrastructure-level signals (is the service itself healthy) need to be visible in the same dashboard.",
      alternatives:
        "Relying on Actuator's built-in health and infrastructure metrics alone, without adding domain-specific counters.",
      tradeoffs:
        "Custom Micrometer counters mean more instrumentation code to maintain, in exchange for dashboards that show what the system is actually doing, not just whether it's up.",
      futureImprovement: "None planned; this is the current, stable observability approach.",
    },
    {
      decision: "Build this as a single well-tested service rather than multiple independently deployed services.",
      reason:
        "The distributed behavior being demonstrated is the Kafka-driven event flow and coordination logic, not multi-service network topology.",
      alternatives:
        "Splitting the producer, consumer, workflow, and observability concerns into separately deployed microservices.",
      tradeoffs:
        "A single service is simpler to run and test end to end, but it means the project demonstrates event-driven coordination patterns rather than true multi-node distributed guarantees — this is a deliberate scope call, documented as such rather than hidden (see Limitations).",
      futureImprovement:
        "Not currently planned — the scope is intentional, not a gap awaiting closure.",
    },
  ],

  technology: [
    { group: "Backend", items: ["Java", "Spring Boot", "Spring Security"] },
    { group: "Data & Messaging", items: ["Apache Kafka", "PostgreSQL"] },
    { group: "Frontend", items: ["React", "TypeScript"] },
    { group: "Infrastructure & Observability", items: ["Docker", "Kubernetes", "Prometheus", "Grafana"] },
  ],

  implementation: [
    {
      title: "Scheduled producer decoupled from the reactive consumer",
      detail:
        "A scheduled job generates and publishes synthetic health events independently of how the consumer processes them, so the two sides of the pipeline can be reasoned about and tested separately.",
    },
    {
      title: "Alerts fire on state transitions, not raw events",
      detail:
        "The consumer tracks service state and creates alerts specifically on degraded or offline transitions, rather than reacting to every incoming health event.",
    },
    {
      title: "Audit trail is written as part of the workflow, not bolted on after",
      detail:
        "Approval routing and its audit trail are part of the same workflow logic, so every alert's remediation path is traceable from creation to resolution.",
    },
  ],

  testing: {
    summary:
      "JUnit 5 tests cover service logic with Mockito, RBAC behavior with MockMvc, and Kafka consumption with an embedded Kafka integration test. CI runs the full backend test suite and frontend build on every push.",
    points: [
      "Unit tests for alert and workflow services, isolated with Mockito.",
      "MockMvc tests asserting role-based access on approval endpoints.",
      "An embedded-Kafka integration test for the health-event consumer.",
      "All of the above run in GitHub Actions on every push, alongside the frontend build.",
    ],
  },

  challenges: [
    {
      title: "Keeping the database consistent when Kafka publishing fails",
      detail:
        "Wrapping Kafka publishes so a broker failure doesn't roll back an already-committed database write required accepting a lost-event risk rather than a lost-write risk — logging and counting the failure instead of rolling back.",
    },
    {
      title: "Distinguishing authentication from authorization failures",
      detail:
        "Method-level authorization checks needed to return distinct 401 and 403 responses so operators and API consumers can tell \"log in\" apart from \"you will never be allowed to do this.\"",
    },
  ],

  limitations: [
    "No retry logic, circuit breakers, distributed tracing, or Kafka consumer idempotency yet — the project's own documentation lists these as known gaps rather than hiding them.",
    "Runs as a single Kafka broker with no partition-tolerance story, so it demonstrates event-driven coordination patterns rather than true multi-node distributed guarantees.",
  ],

  results: {
    summary:
      "The full stack — Spring Boot backend, React/TypeScript frontend, Kafka pipeline, and Prometheus/Grafana observability — runs together via Docker Compose, with CI exercising the backend test suite and frontend build on every push.",
    points: [
      "Backend, frontend, Kafka, and the observability stack all run together via Docker Compose.",
      "CI runs the full backend test suite and frontend build on every push.",
      "A live demo is hosted on Railway (see Repository).",
    ],
  },

  lessons: [
    "Wrapping an at-least-once messaging publish around an already-committed write forces an explicit choice about which side gets to fail silently — making that choice deliberately (favor the database) was more valuable than trying to make both sides equally reliable without idempotency work.",
    "Distinguishing 401 from 403 at the API layer is a small amount of extra handling that pays off directly in how debuggable access issues are, both for operators and for anyone integrating against the API.",
    "Scoping this as a single well-tested service rather than a multi-service topology kept the Kafka-driven coordination logic the actual subject of the project, instead of the project becoming primarily about deployment topology.",
  ],

  roadmap: [
    {
      label: "Kafka consumer idempotency",
      status: "Planned",
      detail: "Identified in the project's own roadmap as a concrete next step, alongside a retry/circuit-breaker layer around publishing.",
    },
    {
      label: "Retry logic and circuit breakers around Kafka publishing",
      status: "Planned",
      detail: "Would close the gap noted in Limitations around broker-failure handling.",
    },
    {
      label: "Distributed tracing",
      status: "Planned",
      detail: "Would give visibility into the alert-to-approval flow across the producer, consumer, and workflow stages.",
    },
  ],

  repository: {
    githubUrl: "https://github.com/Aravind-blip/distributed-operations-control-plane",
    license: "MIT",
    demoUrl: "https://frontend-production-ee3f.up.railway.app",
    demoNote: "Hosted on Railway's free tier; may be slow to wake from idle.",
    status: "Stable",
  },

  relatedProjects: ["rag-agent-audit", "knowledge-hub"],
};
