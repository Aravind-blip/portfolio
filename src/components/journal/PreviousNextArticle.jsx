import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { publishedArticles } from "../../data/journal-articles";

// Only ever shows entries that exist — with a single Published article
// today, this renders nothing rather than a broken or circular link.
// Order follows publishedArticles as more articles move out of Draft.
function PreviousNextArticle({ currentSlug }) {
  const index = publishedArticles.findIndex((article) => article.slug === currentSlug);
  const previous = index > 0 ? publishedArticles[index - 1] : null;
  const next = index >= 0 && index < publishedArticles.length - 1 ? publishedArticles[index + 1] : null;

  if (!previous && !next) return null;

  return (
    <nav className="article-pagination" aria-label="More articles">
      {previous ? (
        <Link className="project-link" to={`/journal/${previous.slug}`}>
          <FiArrowLeft aria-hidden="true" />
          {previous.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link className="project-link" to={`/journal/${next.slug}`}>
          {next.title}
          <FiArrowRight aria-hidden="true" />
        </Link>
      ) : null}
    </nav>
  );
}

export default PreviousNextArticle;
