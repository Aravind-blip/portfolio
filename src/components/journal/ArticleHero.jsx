import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import ArchitectureDiagram from "../projects/ArchitectureDiagram";
import MetadataBadge from "../case-study/MetadataBadge";

function ArticleHero({ article }) {
  return (
    <header className="doc-hero">
      <Link className="back-link" to="/journal">
        <FiArrowRight className="back-arrow" aria-hidden="true" />
        Back to the Journal
      </Link>
      <h1>{article.title}</h1>
      <p className="hero-lead">{article.summary}</p>
      <div className="doc-metadata-row">
        <MetadataBadge label="Published" value={<time dateTime={article.publishedDate}>{article.publishedDate}</time>} />
        <MetadataBadge label="Reading time" value={article.readingTime} />
        <MetadataBadge label="Level" value={article.difficulty} />
      </div>
      {article.heroDiagram ? (
        <ArchitectureDiagram type={article.heroDiagram.type} nodes={article.heroDiagram.nodes} />
      ) : null}
    </header>
  );
}

export default ArticleHero;
