import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function EngineeringDecisionCard({ decision }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="decision-card">
      <p className="decision-statement">{decision.decision}</p>
      <p className="decision-reason">{decision.reason}</p>

      <button
        type="button"
        className="decision-toggle"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? "Hide alternatives and tradeoffs" : "Show alternatives and tradeoffs"}
        {expanded ? <FiChevronUp aria-hidden="true" /> : <FiChevronDown aria-hidden="true" />}
      </button>

      {expanded ? (
        <dl className="decision-details">
          <dt>Alternatives considered</dt>
          <dd>{decision.alternatives}</dd>
          <dt>Tradeoffs</dt>
          <dd>{decision.tradeoffs}</dd>
          <dt>Future improvement</dt>
          <dd>{decision.futureImprovement}</dd>
        </dl>
      ) : null}
    </article>
  );
}

export default EngineeringDecisionCard;
