import TechChip from "../ui/TechChip";

// TechChip is reused directly as the "TechnologyItem" — a technology tag is
// the same visual object whether it appears on a project card or here.
function TechnologyGroup({ group, items }) {
  return (
    <div className="technology-group">
      <p className="mini-label">{group}</p>
      <div className="chip-row">
        {items.map((item) => (
          <TechChip key={item}>{item}</TechChip>
        ))}
      </div>
    </div>
  );
}

export default TechnologyGroup;
