import ArchitectureSection from "./ArchitectureSection";
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
import RelatedProjects from "./RelatedProjects";
import RepositoryCard from "./RepositoryCard";
import ResultsSection from "./ResultsSection";
import RoadmapTimeline from "./RoadmapTimeline";
import SolutionSection from "./SolutionSection";
import TechnologySection from "./TechnologySection";
import TestingSection from "./TestingSection";

// The fixed section order every case study follows, never reordered
// per-project. This list also drives the sticky table of contents, so
// adding a section here automatically makes it deep-linkable and
// TOC-navigable without touching any other file.
const SECTIONS = [
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
  return (
    <ProjectLayout sections={SECTIONS}>
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
      <ArchitectureSection id="architecture" architecture={caseStudy.architecture} />
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
    </ProjectLayout>
  );
}

export default ProjectDocPage;
