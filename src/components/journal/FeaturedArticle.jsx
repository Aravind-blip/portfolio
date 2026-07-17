import { FiArrowRight } from "react-icons/fi";
import Button from "../ui/Button";
import MetadataBadge from "../case-study/MetadataBadge";
import TechChip from "../ui/TechChip";

function FeaturedArticle({ article }) {
  return (
    <section className="section" id="journal-featured" aria-labelledby="featured-article-heading">
      <div className="section-header">
        <p className="eyebrow">Featured Article</p>
        <h2 id="featured-article-heading">{article.title}</h2>
      </div>
      <article className="flagship-repository glass-panel">
        <div className="flagship-repository-main">
          <p className="hero-lead">{article.summary}</p>
          <div className="flagship-repository-badges">
            <MetadataBadge label="Reading time" value={article.readingTime} />
            <MetadataBadge
              label="Published"
              value={<time dateTime={article.publishedDate}>{article.publishedDate}</time>}
            />
          </div>
          <div className="chip-row">
            {article.topics.map((topic) => (
              <TechChip key={topic}>{topic}</TechChip>
            ))}
          </div>
          <div className="hero-actions">
            <Button to={`/journal/${article.slug}`} variant="primary">
              Read the article
              <FiArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default FeaturedArticle;
