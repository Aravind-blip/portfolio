import StatusBadge from "../ui/StatusBadge";
import SectionHeading from "./SectionHeading";

function RoadmapTimeline({ id, roadmap }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>Roadmap</SectionHeading>
      <ol className="roadmap-timeline">
        {roadmap.map((item) => (
          <li className="roadmap-item" key={item.label}>
            <div className="roadmap-item-header">
              <h3>{item.label}</h3>
              <StatusBadge status={item.status} />
            </div>
            <p>{item.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default RoadmapTimeline;
