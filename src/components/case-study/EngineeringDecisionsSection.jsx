import EngineeringDecisionCard from "./EngineeringDecisionCard";
import SectionHeading from "./SectionHeading";

function EngineeringDecisionsSection({ id, decisions }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>Engineering decisions</SectionHeading>
      <div className="decision-list">
        {decisions.map((decision) => (
          <EngineeringDecisionCard decision={decision} key={decision.decision} />
        ))}
      </div>
    </section>
  );
}

export default EngineeringDecisionsSection;
