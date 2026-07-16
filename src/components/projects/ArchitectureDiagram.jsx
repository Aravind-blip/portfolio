import ArchitectureConnector from "./ArchitectureConnector";
import ArchitectureNode from "./ArchitectureNode";

// Names like "workflow" or "rag-flow" describe what the diagram represents,
// not a distinct geometry — they resolve to whichever of the two real
// layouts (linear chain, or root-with-children) actually fits that shape.
const TYPE_TO_LAYOUT = {
  pipeline: "pipeline",
  workflow: "pipeline",
  "agent-flow": "pipeline",
  "evaluation-flow": "pipeline",
  "rag-flow": "pipeline",
  "client-server": "client-server",
  tree: "tree",
  microservices: "tree",
};

function ArchitectureDiagram({ steps, nodes, type = "pipeline" }) {
  const items = nodes || steps || [];
  const layout = TYPE_TO_LAYOUT[type] || "pipeline";

  if (layout === "client-server") {
    return (
      <div className="architecture-diagram architecture-diagram-cs" aria-label="System architecture flow">
        {items.map((node, index) => (
          <div className="architecture-cs-pair" key={node.label}>
            <ArchitectureNode label={node.label} detail={node.detail} />
            {index < items.length - 1 ? <ArchitectureConnector direction="right" /> : null}
          </div>
        ))}
      </div>
    );
  }

  if (layout === "tree") {
    const [root, ...children] = items;
    return (
      <div className="architecture-diagram architecture-diagram-tree" aria-label="System architecture flow">
        {root ? (
          <div className="architecture-tree-root">
            <ArchitectureNode label={root.label} detail={root.detail} />
          </div>
        ) : null}
        {children.length ? (
          <div className="architecture-tree-children">
            {children.map((node) => (
              <div className="architecture-tree-child" key={node.label}>
                <ArchitectureConnector direction="down" />
                <ArchitectureNode label={node.label} detail={node.detail} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <ol className="architecture-diagram" aria-label="System architecture flow">
      {items.map((node, index) => (
        <li className="architecture-step" key={node.label}>
          <ArchitectureNode label={node.label} detail={node.detail} />
          {index < items.length - 1 ? <ArchitectureConnector direction="right" /> : null}
        </li>
      ))}
    </ol>
  );
}

export default ArchitectureDiagram;
