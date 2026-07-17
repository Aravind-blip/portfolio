import SectionHeading from "../case-study/SectionHeading";

function KeyTakeaways({ id, takeaways }) {
  if (!takeaways?.length) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="key-takeaways glass-panel">
      <SectionHeading id={`${id}-heading`}>Key Takeaways</SectionHeading>
      <ul className="detail-list">
        {takeaways.map((takeaway) => (
          <li key={takeaway}>{takeaway}</li>
        ))}
      </ul>
    </section>
  );
}

export default KeyTakeaways;
