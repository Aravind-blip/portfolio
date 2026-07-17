import { Navigate, useParams } from "react-router-dom";
import Divider from "../components/case-study/Divider";
import ProjectLayout from "../components/case-study/ProjectLayout";
import RelatedLabEntries from "../components/case-study/RelatedLabEntries";
import RelatedProjects from "../components/case-study/RelatedProjects";
import ExploreMapLink from "../components/ui/ExploreMapLink";
import ArticleHero from "../components/journal/ArticleHero";
import ArticleSection from "../components/journal/ArticleSection";
import KeyTakeaways from "../components/journal/KeyTakeaways";
import PreviousNextArticle from "../components/journal/PreviousNextArticle";
import ReferencesList from "../components/journal/ReferencesList";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { buildSiteUrl } from "../utils/siteUrl";
import { publishedArticles } from "../data/journal-articles";

function ArticlePage() {
  const { slug } = useParams();
  const article = publishedArticles.find((item) => item.slug === slug);

  usePageMetadata(
    article
      ? {
          title: `${article.title} | Engineering Journal | Aravind Bandipelli`,
          description: article.description,
          canonicalPath: `journal/${article.slug}`,
          type: "article",
          structuredData: {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: article.title,
            description: article.description,
            datePublished: article.publishedDate,
            dateModified: article.updatedDate,
            url: buildSiteUrl(`journal/${article.slug}`),
            author: {
              "@type": "Person",
              name: "Aravind Bandipelli",
              url: buildSiteUrl(""),
            },
          },
        }
      : { title: "Not Found", noIndex: true }
  );

  if (!article) {
    return <Navigate to="/journal" replace />;
  }

  const hasTakeaways = Boolean(article.keyTakeaways?.length);
  const hasReferences = Boolean(article.references?.length);

  const tocSections = [
    ...article.sections.map(({ id, label }) => ({ id, label })),
    ...(hasTakeaways ? [{ id: "key-takeaways", label: "Key Takeaways" }] : []),
    ...(hasReferences ? [{ id: "references", label: "References" }] : []),
  ];

  return (
    <ProjectLayout sections={tocSections}>
      <ArticleHero article={article} />
      <Divider />
      {article.sections.map((section) => (
        <ArticleSection
          id={section.id}
          heading={section.label}
          content={section.content}
          diagram={section.diagram}
          key={section.id}
        />
      ))}
      <KeyTakeaways id="key-takeaways" takeaways={article.keyTakeaways} />
      <ReferencesList id="references" references={article.references} />
      <Divider />
      <RelatedLabEntries id="related-lab" slugs={article.relatedLabEntries} />
      <RelatedProjects id="related-systems" slugs={article.relatedProjects} heading="Related Systems" />
      <ExploreMapLink itemId={`journal-${article.slug}`} />
      <PreviousNextArticle currentSlug={article.slug} />
    </ProjectLayout>
  );
}

export default ArticlePage;
