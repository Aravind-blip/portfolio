import RelatedProjects from "../components/case-study/RelatedProjects";
import RelatedLabEntries from "../components/case-study/RelatedLabEntries";
import Engineering from "../components/sections/Engineering";
import DraftArticleRegistry from "../components/journal/DraftArticleRegistry";
import FeaturedArticle from "../components/journal/FeaturedArticle";
import JournalHero from "../components/journal/JournalHero";
import JournalTopics from "../components/journal/JournalTopics";
import LatestArticles from "../components/journal/LatestArticles";
import GitHubProfileCTA from "../components/ui/GitHubProfileCTA";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { routeMetadata } from "../data/route-metadata";
import { draftArticles, featuredArticle, publishedArticles } from "../data/journal-articles";

const relatedProjectSlugs = [...new Set(publishedArticles.flatMap((article) => article.relatedProjects))];
const relatedLabSlugs = [...new Set(publishedArticles.flatMap((article) => article.relatedLabEntries))];

function JournalIndex() {
  usePageMetadata(routeMetadata.journal);

  return (
    <div className="open-source-hub">
      <JournalHero />
      <FeaturedArticle article={featuredArticle} />
      <LatestArticles articles={publishedArticles} />
      <JournalTopics articles={publishedArticles} />
      <Engineering />
      <DraftArticleRegistry drafts={draftArticles} />
      <div className="section related-case-studies-wrapper">
        <p className="eyebrow">Related Lab</p>
        <RelatedLabEntries id="journal-related-lab" slugs={relatedLabSlugs} heading="See the investigations behind this writing" />
      </div>
      <div className="section related-case-studies-wrapper">
        <p className="eyebrow">Related Systems</p>
        <RelatedProjects id="journal-related-systems" slugs={relatedProjectSlugs} heading="See the systems this writing documents" />
      </div>
      <section className="section open-source-cta" aria-labelledby="journal-cta-heading">
        <h2 id="journal-cta-heading">Every claim traces back to real, running code.</h2>
        <p className="hero-lead">No inflated scale, no invented experiments — just documented engineering.</p>
        <GitHubProfileCTA />
      </section>
    </div>
  );
}

export default JournalIndex;
