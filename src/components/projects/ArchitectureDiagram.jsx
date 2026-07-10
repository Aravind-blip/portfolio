import { FiArrowRight } from "react-icons/fi";

function ArchitectureDiagram({ steps }) {
  return (
    <ol className="architecture-diagram" aria-label="System architecture flow">
      {steps.map((step, index) => (
        <li className="architecture-step" key={step.label}>
          <div className="architecture-node">
            <p className="mini-label">{step.label}</p>
            <p>{step.detail}</p>
          </div>
          {index < steps.length - 1 ? (
            <FiArrowRight className="architecture-arrow" aria-hidden="true" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export default ArchitectureDiagram;
