import ArticleCard from "./ArticleCard";

// One published article today, more as drafts move out of Draft status —
// no filters or search for a catalog this small, same reasoning applied
// to the Open Source Hub and Lab catalogs.
function LatestArticles({ articles }) {
  return (
    <section className="section" id="journal-articles" aria-labelledby="latest-articles-heading">
      <div className="section-header">
        <p className="eyebrow">Latest Articles</p>
        <h2 id="latest-articles-heading">Published writing</h2>
      </div>
      <div className="lab-grid">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
    </section>
  );
}

export default LatestArticles;
