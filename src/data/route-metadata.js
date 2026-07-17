// Structured metadata for routes that aren't derived from a project or
// lab-entry data record. Case-study and lab-entry titles/descriptions are
// derived directly from their own data files instead of being duplicated
// here — see SystemDetail.jsx and the Lab pages.
export const routeMetadata = {
  openSource: {
    canonicalPath: "open-source",
    title: "Open Source | Aravind Bandipelli",
    description:
      "Open-source projects by Aravind Bandipelli across AI evaluation, RAG systems, backend engineering, and developer tooling.",
  },
  lab: {
    canonicalPath: "lab",
    title: "Engineering Lab | Aravind Bandipelli",
    description:
      "Technical investigations, architecture notes, experiments, and engineering lessons from the systems Aravind Bandipelli builds.",
  },
  journal: {
    canonicalPath: "journal",
    title: "Engineering Journal | Aravind Bandipelli",
    description:
      "Long-form engineering writing on architecture decisions, reliability, and production lessons from the systems Aravind Bandipelli builds.",
  },
  explore: {
    canonicalPath: "explore",
    title: "Engineering Map | Aravind Bandipelli",
    description:
      "Explore the relationships between Aravind Bandipelli's AI systems, open-source projects, engineering investigations, and technical writing.",
  },
  notFound: {
    title: "Page Not Found | Aravind Bandipelli",
    description: "The page you're looking for does not exist.",
    noIndex: true,
  },
};
