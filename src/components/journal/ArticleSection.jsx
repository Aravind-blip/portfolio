import ArchitectureDiagram from "../projects/ArchitectureDiagram";
import ImplementationHighlight from "../case-study/ImplementationHighlight";
import SectionHeading from "../case-study/SectionHeading";

// One flexible section renderer for every article section (Problem,
// Background, Design Goals, Alternatives Considered, Architecture,
// Implementation, Tradeoffs, Failures, Lessons Learned, Future
// Improvements) instead of a component per section — content is either a
// paragraph string, a short list of strings, or a list of {title, detail}
// objects, and each already has a reusable rendering (paragraphs,
// detail-list, or the existing ImplementationHighlight card).
function renderContent(content) {
  if (typeof content === "string") {
    return content.split("\n\n").map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>);
  }
  if (Array.isArray(content) && content.length) {
    if (typeof content[0] === "object") {
      return (
        <div className="highlight-list">
          {content.map((item) => (
            <ImplementationHighlight title={item.title} detail={item.detail} key={item.title} />
          ))}
        </div>
      );
    }
    return (
      <ul className="detail-list">
        {content.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return null;
}

function ArticleSection({ id, heading, content, diagram }) {
  const hasContent = typeof content === "string" ? Boolean(content) : Array.isArray(content) && content.length > 0;
  if (!hasContent && !diagram) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>{heading}</SectionHeading>
      {diagram ? <ArchitectureDiagram type={diagram.type} nodes={diagram.nodes} /> : null}
      {renderContent(content)}
    </section>
  );
}

export default ArticleSection;
