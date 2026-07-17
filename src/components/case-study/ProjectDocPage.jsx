import { lazy, Suspense } from "react";
import ArchitectureSection from "./ArchitectureSection";
import SectionHeading from "./SectionHeading";
import ChallengesSection from "./ChallengesSection";
import Divider from "./Divider";
import EngineeringDecisionsSection from "./EngineeringDecisionsSection";
import ImplementationSection from "./ImplementationSection";
import LessonsLearned from "./LessonsLearned";
import LimitationsSection from "./LimitationsSection";
import ProblemSection from "./ProblemSection";
import ProjectHero from "./ProjectHero";
import ProjectLayout from "./ProjectLayout";
import ProjectOverview from "./ProjectOverview";
import RelatedEngineeringNotes from "./RelatedEngineeringNotes";
import RelatedProjects from "./RelatedProjects";
import RepositoryCard from "./RepositoryCard";
import ResultsSection from "./ResultsSection";
import RoadmapTimeline from "./RoadmapTimeline";
import SolutionSection from "./SolutionSection";
import TechnologySection from "./TechnologySection";
import TestingSection from "./TestingSection";
import ExploreMapLink from "../ui/ExploreMapLink";
import { labEntries } from "../../data/lab-entries";

// The one flagship interactive explorer (Phase 10) only ever renders for
// RAG Agent Audit, so it's code-split out of the shared ProjectDocPage
// bundle every other case study also uses.
const ArchitectureExplorer = lazy(() => import("./ArchitectureExplorer"));

// The fixed section order every case study follows, never reordered
// per-project. This list also drives the sticky table of contents, so
// adding a section here automatically makes it deep-linkable and
// TOC-navigable without touching any other file.
const BASE_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "architecture", label: "Architecture" },
  { id: "engineering-decisions", label: "Engineering Decisions" },
  { id: "technology", label: "Technology" },
  { id: "implementation", label: "Implementation Highlights" },
  { id: "testing", label: "Testing" },
  { id: "challenges", label: "Challenges" },
  { id: "limitations", label: "Limitations" },
  { id: "results", label: "Results" },
  { id: "lessons", label: "Lessons Learned" },
  { id: "roadmap", label: "Roadmap" },
  { id: "repository", label: "Repository" },
  { id: "related", label: "Related Projects" },
];

// Renders any case study whose data follows the Phase 6B schema. Adding a
// sixth project means adding a new src/data/case-studies/<slug>.js file and
// one entry in case-studies/index.js — no new layout or component code.
function ProjectDocPage({ caseStudy }) {
  const hasRelatedNotes = labEntries.some((entry) => entry.caseStudyUrl === `/systems/${caseStudy.slug}`);
  const sections = hasRelatedNotes
    ? [...BASE_SECTIONS, { id: "related-notes", label: "Related Engineering Notes" }]
    : BASE_SECTIONS;

  return (
    <ProjectLayout sections={sections}>
      <ProjectHero
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        status={caseStudy.status}
        category={caseStudy.category}
        repository={caseStudy.repository}
      />
      <Divider />
      <ProjectOverview id="overview" overview={caseStudy.overview} />
      <ProblemSection id="problem" problem={caseStudy.problem} />
      <SolutionSection id="solution" solution={caseStudy.solution} />
      {caseStudy.slug === "rag-agent-audit" ? (
        <section id="architecture" aria-labelledby="architecture-heading">
          <SectionHeading id="architecture-heading">Architecture</SectionHeading>
          <Suspense fallback={null}>
            <ArchitectureExplorer />
          </Suspense>
        </section>
      ) : (
        <ArchitectureSection id="architecture" architecture={caseStudy.architecture} />
      )}
      <EngineeringDecisionsSection id="engineering-decisions" decisions={caseStudy.engineeringDecisions} />
      <TechnologySection id="technology" technology={caseStudy.technology} />
      <ImplementationSection id="implementation" implementation={caseStudy.implementation} />
      <TestingSection id="testing" testing={caseStudy.testing} />
      <ChallengesSection id="challenges" challenges={caseStudy.challenges} />
      <LimitationsSection id="limitations" limitations={caseStudy.limitations} />
      <ResultsSection id="results" results={caseStudy.results} />
      <LessonsLearned id="lessons" lessons={caseStudy.lessons} />
      <RoadmapTimeline id="roadmap" roadmap={caseStudy.roadmap} />
      <Divider />
      <RepositoryCard id="repository" repository={caseStudy.repository} />
      <RelatedProjects id="related" slugs={caseStudy.relatedProjects} />
      <RelatedEngineeringNotes id="related-notes" projectSlug={caseStudy.slug} />
      <ExploreMapLink itemId={`system-${caseStudy.slug}`} />
    </ProjectLayout>
  );
}

export default ProjectDocPage;
