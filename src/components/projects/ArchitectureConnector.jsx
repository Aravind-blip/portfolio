import { FiArrowDown, FiArrowRight } from "react-icons/fi";

function ArchitectureConnector({ direction = "right" }) {
  const Icon = direction === "down" ? FiArrowDown : FiArrowRight;
  return <Icon className="architecture-arrow" aria-hidden="true" />;
}

export default ArchitectureConnector;
