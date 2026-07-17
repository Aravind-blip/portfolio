import SectionHeading from "../case-study/SectionHeading";
import StatusBadge from "../ui/StatusBadge";
import { portfolioIndex } from "../../data/portfolio-index";
import { getRelatedIds } from "../../utils/relationships";

const COLUMNS = [
  { type: "System", label: "Systems" },
  { type: "Repository", label: "Open Source" },
  { type: "Lab Entry", label: "Engineering Lab" },
  { type: "Journal Article", label: "Engineering Journal" },
  { type: "Experience", label: "Engineering Experience" },
];

// A structured, columnar relationship view rather than a node-link graph —
// every item is a real, focusable, labelled button, so keyboard and screen
// reader users never have to interpret an unlabeled network diagram. Mouse,
// keyboard, and touch all use the same buttons; the columns stack on
// mobile via CSS rather than needing a separate compressed layout.
function RelationshipExplorer({ selectedId, onSelect }) {
  const relatedIds = getRelatedIds(selectedId);

  return (
    <section id="relationship-explorer" aria-labelledby="relationship-explorer-heading">
      <SectionHeading id="relationship-explorer-heading">Interactive Relationship Explorer</SectionHeading>
      <p className="hero-lead">
        Select any item to highlight what it implements, evaluates, documents, or extends. RAG Agent Audit is
        selected by default — the portfolio&rsquo;s most thoroughly cross-linked system.
      </p>
      <div className="explore-columns">
        {COLUMNS.map((column) => {
          const items = portfolioIndex.filter((item) => item.type === column.type);
          if (!items.length) return null;
          return (
            <div className="explore-column" key={column.type}>
              <h3 className="explore-column-heading">{column.label}</h3>
              <div className="explore-column-list" role="group" aria-label={column.label}>
                {items.map((item) => {
                  const isSelected = item.id === selectedId;
                  const isRelated = relatedIds.has(item.id);
                  const isDimmed = selectedId && !isSelected && !isRelated;
                  const className = [
                    "explore-node",
                    isSelected ? "explore-node-selected" : "",
                    isRelated ? "explore-node-related" : "",
                    isDimmed ? "explore-node-dimmed" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={className}
                      aria-pressed={isSelected}
                      onClick={() => onSelect(item.id)}
                    >
                      <span className="explore-node-title">{item.title}</span>
                      {item.status ? <StatusBadge status={item.status} /> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RelationshipExplorer;
