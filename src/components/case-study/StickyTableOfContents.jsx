import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useActiveSection } from "../../hooks/useActiveSection";

function StickyTableOfContents({ sections }) {
  const [open, setOpen] = useState(false);
  const ids = sections.map((section) => section.id);
  const activeId = useActiveSection(ids);

  return (
    <nav className="doc-toc" aria-label="Case study sections">
      <button
        type="button"
        className="doc-toc-toggle"
        aria-expanded={open}
        aria-controls="doc-toc-list"
        onClick={() => setOpen((value) => !value)}
      >
        On this page
        {open ? <FiChevronUp aria-hidden="true" /> : <FiChevronDown aria-hidden="true" />}
      </button>
      <ul id="doc-toc-list" className={`doc-toc-list${open ? " doc-toc-open" : ""}`}>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={activeId === section.id ? "doc-toc-active" : undefined}
              aria-current={activeId === section.id ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default StickyTableOfContents;
