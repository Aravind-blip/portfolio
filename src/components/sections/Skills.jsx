import SectionHeader from "../ui/SectionHeader";
import { skillGroups } from "../../data/skills";

function Skills() {
  return (
    <section className="section" id="skills">
      <SectionHeader
        eyebrow="Skills"
        title="Grouped by engineering capability, not a wall of pills"
        description="Each skill is backed by a project or verified experience above rather than listed on its own."
      />
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <article className="skill-group" key={group.title}>
            <h3>{group.title}</h3>
            <p className="skill-group-description">{group.description}</p>
            <div className="skill-pill-grid">
              {group.skills.map((skill) => (
                <span
                  className="skill-pill"
                  key={skill.name}
                  title={skill.project ? `Used in ${skill.project}` : undefined}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Skills;
