import SectionHeader from "../ui/SectionHeader";
import { experienceLenses } from "../../data/experience";

function Experience() {
  return (
    <section className="section" id="experience">
      <SectionHeader
        eyebrow="Experience"
        title="The same work, viewed through four engineering lenses"
        description="Verified employer, title, and dates. Each lens highlights a different facet of the same roles rather than repeating the same bullets."
      />
      <div className="experience-stack">
        {experienceLenses.map((entry) => (
          <article className="experience-card" key={`${entry.lens}-${entry.company}`}>
            <div className="experience-heading">
              <p className="mini-label">{entry.lens}</p>
              <h3>{entry.company}</h3>
            </div>
            <section className="role-block">
              <div className="role-header">
                <h4>{entry.title}</h4>
                <span>{entry.period}</span>
              </div>
              <ul className="detail-list">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </section>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Experience;
