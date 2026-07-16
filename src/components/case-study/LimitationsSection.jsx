import SectionHeading from "./SectionHeading";

function LimitationsSection({ id, limitations }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>Limitations</SectionHeading>
      <ul className="detail-list">
        {limitations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default LimitationsSection;
