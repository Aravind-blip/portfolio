// The single searchable index for the command palette and static search.
// Every entry is DERIVED from an existing data source (projects,
// case-studies, open-source-projects, lab-entries, journal-articles,
// experience, engineering principles) rather than duplicated by hand, so
// adding a new system, article, or Lab entry to its real data file makes it
// searchable automatically. Only the fixed "Navigation Action" shortcuts
// below are hand-authored, since they are not content — they are the
// site's actual fixed routes.
import { projects } from "./projects";
import { openSourceProjects } from "./open-source-projects";
import { labEntries } from "./lab-entries";
import { publishedArticles } from "./journal-articles";
import { experienceLenses } from "./experience";
import { engineeringPrinciples } from "./engineering";

function toSearchText(...parts) {
  return parts
    .flat()
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

// Systems — one entry per project, pointing at its case-study page. This is
// deliberately the ONLY record for that destination: a separate "Case
// Study" type is not created, since /systems/:slug already is the case
// study page (see Phase 10 audit, "avoid duplicated search records").
const systemItems = projects.map((project) => {
  const relatedLabEntries = labEntries.filter((entry) =>
    entry.relatedProjectIds.includes(project.slug)
  );
  const relatedArticles = publishedArticles.filter((article) =>
    article.relatedProjects.includes(project.slug)
  );
  const repo = openSourceProjects.find((item) => item.slug === project.slug);

  return {
    id: `system-${project.slug}`,
    type: "System",
    title: project.name,
    shortTitle: project.name,
    description: project.tagline,
    route: `/systems/${project.slug}`,
    sectionId: null,
    keywords: [],
    technologies: project.tech,
    topics: [],
    status: project.status,
    relatedProjectIds: [project.slug],
    relatedRepositoryIds: repo ? [repo.id] : [],
    relatedLabEntryIds: relatedLabEntries.map((entry) => entry.slug),
    relatedJournalArticleIds: relatedArticles.map((article) => article.slug),
    searchText: toSearchText(
      project.name,
      project.tagline,
      project.problem,
      project.whatIBuilt,
      project.tech
    ),
    priority: project.order,
    visibility: "public",
  };
});

// Repositories — a distinct destination (the GitHub repo itself) from the
// System entry above, so both can exist without duplicating the same link.
const repositoryItems = openSourceProjects.map((repo) => ({
  id: `repo-${repo.id}`,
  type: "Repository",
  title: repo.name,
  shortTitle: repo.name,
  description: repo.shortDescription,
  route: repo.repositoryUrl,
  external: true,
  sectionId: null,
  keywords: [repo.category, repo.primaryLanguage],
  technologies: repo.technologies,
  topics: [repo.category],
  status: repo.maturity,
  relatedProjectIds: repo.caseStudyUrl ? [repo.slug] : [],
  relatedRepositoryIds: [],
  relatedLabEntryIds: [],
  relatedJournalArticleIds: [],
  searchText: toSearchText(
    repo.name,
    repo.shortDescription,
    repo.category,
    repo.primaryLanguage,
    repo.technologies,
    repo.highlights
  ),
  priority: repo.sortOrder,
  visibility: repo.visibility === "Public" ? "public" : "private",
}));

// Engineering Lab entries — only entries the Lab already treats as public.
// A Planned entry (e.g. diabetes-prediction-evaluation) is included but
// keeps its real "Planned" status so it renders labelled as such, never as
// a finished investigation.
const labItems = labEntries
  .filter((entry) => entry.visibility === "public")
  .map((entry) => ({
    id: `lab-${entry.slug}`,
    type: "Lab Entry",
    title: entry.title,
    shortTitle: entry.title,
    description: entry.summary,
    route: `/lab/${entry.slug}`,
    sectionId: null,
    keywords: entry.tags,
    technologies: entry.technologies,
    topics: entry.tags,
    status: entry.status,
    relatedProjectIds: entry.relatedProjectIds,
    relatedRepositoryIds: [],
    relatedLabEntryIds: [],
    relatedJournalArticleIds: publishedArticles
      .filter((article) => article.relatedLabEntries.includes(entry.slug))
      .map((article) => article.slug),
    searchText: toSearchText(
      entry.title,
      entry.summary,
      entry.question,
      entry.type,
      entry.tags,
      entry.technologies
    ),
    priority: entry.sortOrder,
    visibility: entry.visibility,
  }));

// Journal — published articles only. Draft articles are never imported
// here (publishedArticles is already filtered at the data-model level),
// so a draft can never leak into search results.
const journalItems = publishedArticles.map((article) => ({
  id: `journal-${article.slug}`,
  type: "Journal Article",
  title: article.title,
  shortTitle: article.title,
  description: article.description,
  route: `/journal/${article.slug}`,
  sectionId: null,
  keywords: article.topics,
  technologies: [],
  topics: article.topics,
  status: article.status,
  relatedProjectIds: article.relatedProjects,
  relatedRepositoryIds: [],
  relatedLabEntryIds: article.relatedLabEntries,
  relatedJournalArticleIds: [],
  searchText: toSearchText(article.title, article.summary, article.description, article.topics),
  priority: 1,
  visibility: article.visibility,
}));

// Experience — one entry per professional lens, linking to the homepage
// Engineering Journey section (there is no dedicated experience route).
const experienceItems = experienceLenses.map((lens, index) => ({
  id: `experience-${index}`,
  type: "Experience",
  title: lens.lens,
  shortTitle: lens.lens,
  description: `${lens.title} at ${lens.company} (${lens.period})`,
  route: "/",
  sectionId: "journey",
  keywords: [lens.company, lens.title],
  technologies: [],
  topics: [],
  status: null,
  relatedProjectIds: [],
  relatedRepositoryIds: [],
  relatedLabEntryIds: [],
  relatedJournalArticleIds: [],
  searchText: toSearchText(lens.lens, lens.company, lens.title, lens.period, lens.bullets),
  priority: index + 1,
  visibility: "public",
}));

// Capabilities — engineering principles, each already tied to a real,
// verifiable project decision (never a generic self-rated skill list).
const capabilityItems = engineeringPrinciples.map((item, index) => ({
  id: `capability-${index}`,
  type: "Capability",
  title: item.principle,
  shortTitle: item.principle,
  description: item.statement,
  route: "/",
  sectionId: "engineering",
  keywords: [],
  technologies: [],
  topics: [item.principle],
  status: null,
  relatedProjectIds: [item.projectSlug],
  relatedRepositoryIds: [],
  relatedLabEntryIds: [],
  relatedJournalArticleIds: [],
  searchText: toSearchText(item.principle, item.statement, item.evidence),
  priority: index + 1,
  visibility: "public",
}));

// Navigation Actions — the portfolio's fixed routes/anchors. Hand-authored
// because these are commands, not content derived from a data source.
const navigationItems = [
  { id: "nav-home", title: "Go to Home", description: "Return to the homepage.", route: "/", sectionId: null },
  { id: "nav-systems", title: "View Systems", description: "Browse all engineering systems and case studies.", route: "/", sectionId: "systems" },
  { id: "nav-open-source", title: "Open Open Source", description: "Browse public repositories and their maintenance status.", route: "/open-source", sectionId: null },
  { id: "nav-lab", title: "Explore Engineering Lab", description: "Read technical investigations and architecture notes.", route: "/lab", sectionId: null },
  { id: "nav-journal", title: "Read Engineering Journal", description: "Long-form writing on architecture and reliability.", route: "/journal", sectionId: null },
  { id: "nav-explore", title: "Explore Engineering Map", description: "See how systems, repositories, Lab entries, and articles connect.", route: "/explore", sectionId: null },
  { id: "nav-resume", title: "View Resume", description: "Open the resume section.", route: "/", sectionId: "resume" },
  { id: "nav-contact", title: "Contact Aravind", description: "Open the contact section.", route: "/", sectionId: "contact" },
].map((item, index) => ({
  ...item,
  type: "Navigation Action",
  shortTitle: item.title,
  keywords: [],
  technologies: [],
  topics: [],
  status: null,
  relatedProjectIds: [],
  relatedRepositoryIds: [],
  relatedLabEntryIds: [],
  relatedJournalArticleIds: [],
  searchText: toSearchText(item.title, item.description),
  priority: index + 1,
  visibility: "public",
}));

export const portfolioIndex = [
  ...navigationItems,
  ...systemItems,
  ...repositoryItems,
  ...labItems,
  ...journalItems,
  ...experienceItems,
  ...capabilityItems,
].filter((item) => item.visibility === "public");
