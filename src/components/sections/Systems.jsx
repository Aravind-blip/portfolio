import { useMemo, useState } from "react";
import SectionHeader from "../ui/SectionHeader";
import ProjectCard from "../projects/ProjectCard";
import { featuredProjects } from "../../data/projects";

function toggle(set, value) {
  const next = new Set(set);
  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }
  return next;
}

function Systems() {
  const [, ...rest] = featuredProjects;
  const [statusFilter, setStatusFilter] = useState(new Set());
  const [techFilter, setTechFilter] = useState(new Set());

  const statuses = useMemo(() => [...new Set(rest.map((project) => project.status))], [rest]);
  const primaryTechs = useMemo(() => [...new Set(rest.map((project) => project.tech[0]))], [rest]);

  const filtered = rest.filter((project) => {
    const matchesStatus = statusFilter.size === 0 || statusFilter.has(project.status);
    const matchesTech = techFilter.size === 0 || techFilter.has(project.tech[0]);
    return matchesStatus && matchesTech;
  });

  return (
    <section className="section" id="systems">
      <SectionHeader
        eyebrow="Systems"
        title="The rest of the systems — proof this repeats, not a lucky exception"
        description="Filter by status or primary technology. Every entry links to a full case study following the same structure as the featured system above."
      />

      <div className="systems-filters" role="group" aria-label="Filter systems">
        <div className="filter-group">
          <span className="mini-label">Status</span>
          <div className="filter-chip-row">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                className={`filter-chip${statusFilter.has(status) ? " filter-chip-active" : ""}`}
                aria-pressed={statusFilter.has(status)}
                onClick={() => setStatusFilter((prev) => toggle(prev, status))}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <span className="mini-label">Technology</span>
          <div className="filter-chip-row">
            {primaryTechs.map((tech) => (
              <button
                key={tech}
                type="button"
                className={`filter-chip${techFilter.has(tech) ? " filter-chip-active" : ""}`}
                aria-pressed={techFilter.has(tech)}
                onClick={() => setTechFilter((prev) => toggle(prev, tech))}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="systems-empty">No systems match the selected filters.</p>
      ) : (
        <div className="projects-grid projects-grid-compact">
          {filtered.map((project) => (
            <ProjectCard project={project} variant="compact" key={project.slug} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Systems;
