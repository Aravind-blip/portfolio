import ImplementationHighlight from "./ImplementationHighlight";
import SectionHeading from "./SectionHeading";

function ImplementationSection({ id, implementation }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>Implementation highlights</SectionHeading>
      <div className="highlight-list">
        {implementation.map((item) => (
          <ImplementationHighlight title={item.title} detail={item.detail} key={item.title} />
        ))}
      </div>
    </section>
  );
}

export default ImplementationSection;
