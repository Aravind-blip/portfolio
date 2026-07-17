import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import SectionHeading from "../case-study/SectionHeading";

function ReferencesList({ id, references }) {
  if (!references?.length) return null;

  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>References</SectionHeading>
      <ul className="detail-list references-list">
        {references.map((reference) => {
          const isExternal = /^https?:\/\//.test(reference.url);
          return (
            <li key={reference.url}>
              {isExternal ? (
                <a href={reference.url} target="_blank" rel="noopener noreferrer">
                  {reference.label}
                  <FiExternalLink aria-hidden="true" />
                </a>
              ) : (
                <Link to={reference.url}>{reference.label}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ReferencesList;
