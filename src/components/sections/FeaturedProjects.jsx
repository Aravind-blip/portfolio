import SectionHeader from "../ui/SectionHeader";
import ProjectCard from "../projects/ProjectCard";
import { featuredProjects } from "../../data/projects";

function FeaturedProjects() {
  return (
    <section className="section" id="projects">
      <SectionHeader
        eyebrow="Featured Systems"
        title="Projects that show engineering decisions, not just technologies"
        description="Each project below links to a full case study covering architecture, decisions, testing, and honest limitations."
      />
      <div className="projects-grid">
        {featuredProjects.map((project) => (
          <ProjectCard project={project} key={project.slug} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProjects;
