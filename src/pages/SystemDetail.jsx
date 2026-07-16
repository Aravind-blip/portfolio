import { Navigate, useParams } from "react-router-dom";
import ProjectCaseStudy from "../components/projects/ProjectCaseStudy";
import ProjectDocPage from "../components/case-study/ProjectDocPage";
import { caseStudies } from "../data/case-studies";
import { projects } from "../data/projects";

function SystemDetail() {
  const { slug } = useParams();
  const caseStudy = caseStudies[slug];

  if (caseStudy) {
    return (
      <section className="section case-study-section">
        <ProjectDocPage caseStudy={caseStudy} />
      </section>
    );
  }

  // Not yet migrated to the documentation framework — render the legacy
  // case study component until its turn in the migration order.
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="section case-study-section">
      <ProjectCaseStudy project={project} />
    </section>
  );
}

export default SystemDetail;
