import { useScrollToHash } from "../../hooks/useScrollToHash";
import StickyTableOfContents from "./StickyTableOfContents";

function ProjectLayout({ sections, children }) {
  useScrollToHash();

  return (
    <div className="doc-layout">
      <StickyTableOfContents sections={sections} />
      <div className="doc-content">{children}</div>
    </div>
  );
}

export default ProjectLayout;
