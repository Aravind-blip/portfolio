import SectionHeading from "./SectionHeading";
import TechnologyGroup from "./TechnologyGroup";

function TechnologySection({ id, technology }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>Technology</SectionHeading>
      <div className="technology-groups">
        {technology.map((group) => (
          <TechnologyGroup group={group.group} items={group.items} key={group.group} />
        ))}
      </div>
    </section>
  );
}

export default TechnologySection;
