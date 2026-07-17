# Aravind Bandipelli — AI and Software Engineering Portfolio

A recruiter-facing engineering portfolio built around evidence, not skill lists. Each featured project is presented as a technical case study with the problem, architecture, implementation decisions, tradeoffs, validation, and links to the underlying repository.

## Live portfolio

**[aravind-blip.github.io/portfolio](https://aravind-blip.github.io/portfolio/)**

## What the portfolio represents

The site positions my work across three connected engineering areas:

- **AI systems:** RAG applications, agent evaluation, retrieval quality, grounding, and safety regression testing
- **Backend and distributed systems:** APIs, event-driven workflows, authentication, observability, and deployment infrastructure
- **Full-stack delivery:** React interfaces, typed project data, reusable components, accessibility, CI/CD, and production-oriented documentation

Rather than presenting technologies as isolated keywords, the portfolio connects each capability to a project that demonstrates it.

## Featured systems

### RAG Agent Audit

A Python CLI and CI testing toolkit for deterministic regression checks across RAG retrieval, citations, tenant isolation, fallback behavior, and agent tool policies.

- Package-style Python project
- YAML-based test suites
- JSONPath response mapping
- JUnit, Markdown, JSON, and GitHub Actions reporting
- Docker support and release automation

Repository: [`Aravind-blip/rag-agent-audit`](https://github.com/Aravind-blip/rag-agent-audit)

### Knowledge Hub

A full-stack multi-tenant RAG application for searching internal policy and operations documents with organization-scoped retrieval and grounded citations.

- Next.js and FastAPI
- PostgreSQL with pgvector
- Supabase Auth and row-level security
- LangGraph orchestration
- Retrieval evaluation, Playwright tests, and k6 load tests

Repository: [`Aravind-blip/knowledge-hub`](https://github.com/Aravind-blip/knowledge-hub)

### Distributed Operations Control Plane

A simulated enterprise operations platform demonstrating distributed Java services, event-driven workflows, observability, role-based access, and deployment infrastructure.

- Java 17 and Spring Boot 3
- React and TypeScript
- PostgreSQL and Kafka
- JWT and method-level RBAC
- Prometheus, Grafana, Docker, Kubernetes, and Jenkins

Repository: [`Aravind-blip/distributed-operations-control-plane`](https://github.com/Aravind-blip/distributed-operations-control-plane)

## Information architecture

```text
Home
├── Featured System
├── Systems Explorer
├── Engineering Principles
├── Open Source
├── Engineering Journey
└── Contact

Project Case Study
├── Overview
├── My Contribution
├── Architecture
├── Engineering Decisions
├── Implementation Highlights
├── Validation
├── Tradeoffs
└── Related Projects
```

## Design principles

- **Evidence before claims:** capabilities link to real repositories and implementation details
- **Project depth over project count:** flagship systems receive complete technical case studies
- **Clear ownership:** contribution sections distinguish personal decisions from general product descriptions
- **Consistent documentation:** projects share a reusable case-study structure
- **Accessible interaction:** semantic components, keyboard-friendly controls, appropriate ARIA relationships, and verified Lighthouse accessibility
- **No inflated social proof:** the site avoids unsupported metrics, artificial star counts, and unverifiable claims

## Technical implementation

| Area | Technology |
|---|---|
| UI | React, JavaScript, semantic HTML, CSS |
| Build | Vite |
| Routing | React Router |
| Content model | Structured project and case-study data modules |
| Components | Reusable layout, navigation, project, documentation, and status components |
| Quality | Accessibility review, Playwright verification, production build checks |
| Deployment | GitHub Actions and GitHub Pages |

## Repository structure

```text
portfolio/
├── src/
│   ├── components/       # Reusable UI and case-study components
│   ├── data/             # Project, experience, and engineering evidence
│   ├── pages/            # Routed pages and project case studies
│   └── styles/           # Theme, tokens, and responsive presentation
├── public/               # Static assets and resume files
├── .github/workflows/    # Build and deployment automation
└── docs/                 # Supporting portfolio and GitHub profile material
```

## Run locally

```bash
git clone https://github.com/Aravind-blip/portfolio.git
cd portfolio
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Deployment

The default branch is built and deployed to GitHub Pages through GitHub Actions. Vite uses the `/portfolio/` base path so routes and static assets resolve correctly under the project site URL.

## Current direction

The portfolio is evolving from a resume-style website into an engineering record: fewer generic claims, deeper project documentation, visible architecture and tradeoffs, maintainable open-source work, and contributions that demonstrate how I build and reason about software systems.
