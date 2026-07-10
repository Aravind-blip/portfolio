import { Navigate, useParams } from "react-router-dom";
import ProjectCaseStudy from "../components/projects/ProjectCaseStudy";
import { projects } from "../data/projects";

function ProjectDetail() {
  const { slug } = useParams();
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

export default ProjectDetail;
