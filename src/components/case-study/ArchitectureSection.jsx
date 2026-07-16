import ArchitectureDiagram from "../projects/ArchitectureDiagram";
import SectionHeading from "./SectionHeading";

function ArchitectureSection({ id, architecture }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>Architecture</SectionHeading>
      <ArchitectureDiagram type={architecture.type} nodes={architecture.nodes} />
    </section>
  );
}

export default ArchitectureSection;
