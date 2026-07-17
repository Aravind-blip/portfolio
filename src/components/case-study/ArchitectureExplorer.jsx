import { useState } from "react";
import { FiArrowRight, FiRotateCcw } from "react-icons/fi";
import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import { ragArchitectureExplorer } from "../../data/architecture-explorer";

const { nodes, connections, optionalEvidence, guidedSequence } = ragArchitectureExplorer;

function StepLink({ link }) {
  if (!link) return null;
  if (link.type === "case-study") {
    // Same page as this explorer (the RAG Agent Audit case study itself) —
    // a plain in-page anchor gets native browser scroll, matching the
    // existing sticky-table-of-contents pattern rather than fighting it.
    const hash = link.route.slice(link.route.indexOf("#"));
    return (
      <a className="architecture-explorer-step-link" href={hash}>
        {link.label}
        <FiArrowRight aria-hidden="true" />
      </a>
    );
  }
  return (
    <Link className="architecture-explorer-step-link" to={link.route}>
      {link.label}
      <FiArrowRight aria-hidden="true" />
    </Link>
  );
}

// The one flagship interactive explorer (Phase 10, Part 8). Reuses the same
// four architecture nodes already documented in this case study's data —
// it adds interaction and a guided walkthrough, not new architectural
// claims. A complete text alternative (the node list, connection list, and
// guided sequence below) is always present in the DOM, so nothing here is
// communicated solely through the interactive diagram.
function ArchitectureExplorer() {
  const [selection, setSelection] = useState({ type: "node", id: nodes[0].id });
  const [stepIndex, setStepIndex] = useState(null);

  const selectedNode = selection?.type === "node" ? nodes.find((node) => node.id === selection.id) : null;
  const selectedConnection =
    selection?.type === "connection" ? connections.find((connection) => `${connection.from}-${connection.to}` === selection.id) : null;

  function selectNode(nodeId) {
    setSelection({ type: "node", id: nodeId });
  }

  function selectConnection(connection) {
    setSelection({ type: "connection", id: `${connection.from}-${connection.to}` });
  }

  function goToStep(index) {
    const step = guidedSequence[index];
    if (!step) return;
    setStepIndex(index);
    setSelection({ type: "node", id: step.nodeId });
  }

  function resetView() {
    setSelection({ type: "node", id: nodes[0].id });
    setStepIndex(null);
  }

  const currentStep = stepIndex !== null ? guidedSequence[stepIndex] : null;

  return (
    <div className="architecture-explorer">
      <ol className="architecture-diagram" aria-label="RAG Agent Audit architecture — select a stage or connection">
        {nodes.map((node, index) => (
          <li className="architecture-step" key={node.id}>
            <button
              type="button"
              className={`architecture-node architecture-node-button${
                selectedNode?.id === node.id ? " architecture-node-active" : ""
              }`}
              aria-pressed={selectedNode?.id === node.id}
              onClick={() => selectNode(node.id)}
            >
              <p className="mini-label">{node.label}</p>
              <p>{node.detail}</p>
            </button>
            {index < nodes.length - 1 ? (
              <button
                type="button"
                className={`architecture-arrow-button${
                  selectedConnection && selectedConnection.from === node.id ? " architecture-arrow-active" : ""
                }`}
                onClick={() => selectConnection(connections[index])}
                aria-label={`Data flow: ${connections[index].label}`}
              >
                <FiArrowRight aria-hidden="true" className="architecture-arrow" />
              </button>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="architecture-explorer-details glass-panel">
        {selectedNode ? (
          <>
            <p className="mini-label">{selectedNode.label} — purpose</p>
            <p>{selectedNode.purpose}</p>
          </>
        ) : null}
        {selectedConnection ? (
          <>
            <p className="mini-label">Data flow — {selectedConnection.label}</p>
            <p>{selectedConnection.description}</p>
          </>
        ) : null}
      </div>

      <div className="architecture-explorer-note">
        <p className="mini-label">Optional / framework-dependent evidence</p>
        {optionalEvidence.map((entry) => (
          <p key={entry.id}>{entry.note}</p>
        ))}
      </div>

      <div className="architecture-explorer-guided">
        <div className="architecture-explorer-guided-header">
          <SectionHeading id="architecture-guided-heading">Guided Walkthrough</SectionHeading>
          <button type="button" className="button button-secondary" onClick={resetView}>
            <FiRotateCcw aria-hidden="true" />
            Reset view
          </button>
        </div>
        <ol className="architecture-explorer-steps">
          {guidedSequence.map((step, index) => (
            <li key={step.id}>
              <button
                type="button"
                className={`architecture-explorer-step${stepIndex === index ? " architecture-explorer-step-active" : ""}`}
                aria-current={stepIndex === index ? "step" : undefined}
                onClick={() => goToStep(index)}
              >
                <span className="architecture-explorer-step-number">{index + 1}</span>
                <span className="architecture-explorer-step-title">
                  {step.title}
                  {step.optional ? <span className="architecture-explorer-optional-tag">Optional</span> : null}
                </span>
              </button>
              {stepIndex === index ? (
                <div className="architecture-explorer-step-detail">
                  <p>{step.description}</p>
                  <StepLink link={step.link} />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
        {currentStep ? (
          <div className="architecture-explorer-controls">
            <button type="button" className="button button-secondary" onClick={() => goToStep(stepIndex - 1)} disabled={stepIndex === 0}>
              Previous step
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => goToStep(stepIndex + 1)}
              disabled={stepIndex === guidedSequence.length - 1}
            >
              Next step
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ArchitectureExplorer;
