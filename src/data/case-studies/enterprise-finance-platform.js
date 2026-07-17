// Rich, structured documentation content for the Enterprise Finance Workflow
// Platform deep-dive page. This reflects professional, verified work
// experience rather than an open-source project — internal architecture,
// proprietary business logic, and client-specific details are intentionally
// not disclosed, matching the confidentiality already documented in
// src/data/projects.js's entry for the same work.
export const enterpriseFinancePlatformCaseStudy = {
  slug: "enterprise-finance-platform",
  title: "Enterprise Finance Workflow Platform",
  subtitle: "Professional experience building and supporting an enterprise finance workflow system",
  metaDescription:
    "Professional experience contributing to an enterprise finance workflow-approval system, its supporting REST APIs, and audit-trail consistency.",
  status: "Production support",
  category: "Professional Experience",

  overview:
    "As part of an engineering team, contributed to workflow states, approval chains, and supporting REST APIs for an enterprise finance platform, working across Angular front ends, ASP.NET Core services, SQL Server data access, and Azure Functions automation, with releases managed through Azure DevOps. This is professional, verified work experience rather than an open-source project.",

  problem: {
    statement:
      "Enterprise finance teams need workflow approvals, audit trails, and reliable data access across a large internal user base, with production issues resolved quickly when they occur.",
    context:
      "This is professional, verified work experience rather than an open-source project — it demonstrates sustained delivery and support on a system real finance users depended on daily.",
  },

  solution: {
    summary:
      "Ownership of the workflow-approval logic and its supporting REST APIs within a larger engineering team, including SQL optimization on the platform's highest-traffic endpoints and keeping audit-trail writes transactionally consistent with workflow-state changes.",
    approach: [
      "Own the workflow-approval logic and its supporting REST APIs, working across Angular, ASP.NET Core, SQL Server, and Azure Functions.",
      "Focus SQL optimization effort on the highest-traffic workflow queries rather than broad schema changes.",
      "Keep audit-trail writes inside the same transaction as workflow-state changes, so the two can never drift out of sync.",
      "Provide ongoing production support, including live issue triage, alongside feature delivery.",
    ],
  },

  architecture: {
    type: "pipeline",
    nodes: [
      { label: "Frontend", detail: "Angular workflow UI for finance approvals" },
      { label: "Backend", detail: "ASP.NET Core REST APIs and workflow logic" },
      { label: "Data", detail: "SQL Server with optimized queries for high-traffic endpoints" },
      { label: "Automation", detail: "Azure Functions handling scheduled and event-driven tasks" },
    ],
  },

  engineeringDecisions: [
    {
      decision: "Focus SQL optimization effort on the highest-traffic workflow queries rather than broad schema changes.",
      reason:
        "Targeted indexing and query rewrites gave the most reliability improvement for the least production risk on a system already serving a large internal user base.",
      alternatives: "A broader schema redesign or migration across the platform's data layer.",
      tradeoffs:
        "Targeted optimization leaves the rest of the schema unchanged, in exchange for improving the endpoints that mattered most without introducing the risk of a wider migration on a live production system.",
      futureImprovement:
        "Not applicable — this reflects completed professional experience rather than an actively evolving personal project.",
    },
    {
      decision: "Keep audit-trail writes inside the same transaction as workflow-state changes.",
      reason:
        "Approval history could never drift out of sync with the actual workflow state if the two writes either both committed or both rolled back together.",
      alternatives: "Writing the audit trail asynchronously or in a separate transaction after the workflow-state change committed.",
      tradeoffs:
        "A single combined transaction is simpler to reason about and guarantees consistency, at the cost of coupling the audit write's performance to the workflow-state write's transaction.",
      futureImprovement:
        "Not applicable — this reflects completed professional experience rather than an actively evolving personal project.",
    },
  ],

  technology: [
    { group: "Frontend", items: ["Angular", "TypeScript"] },
    { group: "Backend", items: ["ASP.NET Core", "C#", "REST APIs"] },
    { group: "Data", items: ["SQL Server"] },
    { group: "Automation & Release", items: ["Azure Functions", "Azure DevOps"] },
  ],

  implementation: [
    {
      title: "Workflow-approval logic and its REST APIs were the specific area of ownership",
      detail:
        "Within a larger engineering team building the full platform, this ownership covered workflow states, approval chains, and the REST APIs supporting them.",
    },
    {
      title: "SQL optimization targeted the platform's highest-traffic endpoints",
      detail:
        "Indexing and query rewrites were focused on the queries under the heaviest production load, rather than spread evenly across the schema.",
    },
    {
      title: "Azure Functions handled scheduled and event-driven automation alongside the core workflow APIs",
      detail:
        "Automation tasks ran as Azure Functions separate from the main ASP.NET Core services, releases for both managed through Azure DevOps.",
    },
  ],

  testing: {
    summary:
      "Release and support work followed the team's existing CI/CD and release process in Azure DevOps.",
    points: [
      "Releases followed the team's established CI/CD pipeline in Azure DevOps.",
      "Ongoing production support included live issue triage in addition to feature delivery — a different reliability discipline than pre-release testing alone.",
    ],
  },

  challenges: [
    {
      title: "Improving reliability on a live production system without a broad rewrite",
      detail:
        "SQL optimization had to be scoped to the highest-traffic queries specifically because broad schema changes on a system finance users depended on daily would have carried too much production risk.",
    },
    {
      title: "Keeping audit history reliably in sync with workflow state",
      detail:
        "Combining audit-trail writes and workflow-state changes into a single transaction was the concrete fix for a class of bugs where the two could otherwise drift apart.",
    },
  ],

  limitations: [
    "This is confidential enterprise work — internal architecture, proprietary business logic, and client-specific details are intentionally not disclosed here.",
  ],

  results: {
    summary:
      "Sustained delivery and production support on a system real finance users depended on daily, with targeted SQL optimization work and a transactional fix that kept audit history reliably in sync with workflow state.",
    points: [
      "Delivered workflow-approval features and supporting REST APIs as part of a larger engineering team.",
      "Provided ongoing production support, including live issue triage, in addition to feature delivery.",
    ],
  },

  lessons: [
    "Scoping SQL optimization to the highest-traffic queries, rather than a broad schema change, showed that the biggest reliability wins on a live system often come from the narrowest safe change, not the most thorough one.",
    "Putting audit-trail writes and workflow-state changes in the same transaction is a small implementation detail that closes an entire class of data-integrity bugs that would otherwise only surface as a confusing support ticket later.",
    "Doing production support and feature delivery on the same system builds a different, more grounded sense of reliability than testing alone — issues that pre-release tests don't catch are exactly the ones support work surfaces.",
  ],

  roadmap: [
    {
      label: "Not applicable",
      status: "Complete",
      detail: "This reflects completed professional experience rather than an actively evolving personal project.",
    },
  ],

  repository: {
    githubUrl: null,
    demoUrl: null,
    status: "Production support",
  },

  relatedProjects: ["distributed-operations-control-plane"],
};
