import SectionHeading from "../case-study/SectionHeading";

// One flexible section renderer for Question/Context/Hypothesis/Approach/
// Findings/Limitations/Next Steps/Evidence, instead of a separate
// component per section — they're all either a paragraph or a short list
// under a heading. Returns null for empty content so an in-progress or
// planned entry can omit a section (e.g. Findings) without a blank
// heading or broken layout.
function LabSection({ id, heading, content }) {
  const isEmpty = !content || (Array.isArray(content) && content.length === 0);
  if (isEmpty) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>{heading}</SectionHeading>
      {Array.isArray(content) ? (
        <ul className="detail-list">
          {content.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{content}</p>
      )}
    </section>
  );
}

export default LabSection;
