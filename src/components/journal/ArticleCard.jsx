import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import MetadataBadge from "../case-study/MetadataBadge";

function ArticleCard({ article }) {
  return (
    <article className="lab-card glass-panel">
      <div className="lab-card-header">
        <h3>{article.title}</h3>
        <MetadataBadge label="Reading time" value={article.readingTime} />
      </div>
      <p>{article.summary}</p>
      <p className="mini-label">
        Published <time dateTime={article.publishedDate}>{article.publishedDate}</time>
      </p>
      <Link className="project-link" to={`/journal/${article.slug}`}>
        Read article
        <FiArrowRight aria-hidden="true" />
      </Link>
    </article>
  );
}

export default ArticleCard;
