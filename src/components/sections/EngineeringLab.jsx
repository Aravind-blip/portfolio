import SectionHeader from "../ui/SectionHeader";
import StatusBadge from "../ui/StatusBadge";
import { labItems } from "../../data/lab";

function EngineeringLab() {
  return (
    <section className="section" id="lab">
      <SectionHeader
        eyebrow="Engineering Lab"
        title="Currently building"
        description="Real, in-progress work on the projects above — not finished work presented as done."
      />
      <div className="lab-grid">
        {labItems.map((item) => (
          <article className="lab-card" key={item.title}>
            <div className="lab-card-header">
              <h3>{item.title}</h3>
              <StatusBadge status={item.status} />
            </div>
            <p>{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default EngineeringLab;
