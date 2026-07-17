import RelatedProjects from "../components/case-study/RelatedProjects";
import ContributionPrinciples from "../components/open-source/ContributionPrinciples";
import CurrentMaintenance from "../components/open-source/CurrentMaintenance";
import FlagshipRepository from "../components/open-source/FlagshipRepository";
import OpenSourceHero from "../components/open-source/OpenSourceHero";
import OpenSourceRoadmap from "../components/open-source/OpenSourceRoadmap";
import RepositoryCatalog from "../components/open-source/RepositoryCatalog";
import ReleaseDocumentationSignals from "../components/open-source/ReleaseDocumentationSignals";
import GitHubProfileCTA from "../components/ui/GitHubProfileCTA";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { flagshipProject, openSourceProjects } from "../data/open-source-projects";
import { routeMetadata } from "../data/route-metadata";

const caseStudySlugs = openSourceProjects
  .filter((project) => project.caseStudyUrl)
  .map((project) => project.slug);

function OpenSourceHub() {
  usePageMetadata(routeMetadata.openSource);

  return (
    <div className="open-source-hub">
      <OpenSourceHero />
      <FlagshipRepository project={flagshipProject} />
      <RepositoryCatalog projects={openSourceProjects} />
      <CurrentMaintenance projects={openSourceProjects} />
      <ReleaseDocumentationSignals projects={openSourceProjects} />
      <ContributionPrinciples />
      <OpenSourceRoadmap projects={openSourceProjects} />
      <div className="section related-case-studies-wrapper">
        <p className="eyebrow">Explore Related Case Studies</p>
        <RelatedProjects id="related-case-studies" slugs={caseStudySlugs} heading="Read the engineering deep-dives" />
      </div>
      <section className="section open-source-cta" aria-labelledby="github-cta-heading">
        <h2 id="github-cta-heading">Everything here is real, running code.</h2>
        <p className="hero-lead">No inflated stats — just repositories you can clone, run, and read for yourself.</p>
        <GitHubProfileCTA />
      </section>
    </div>
  );
}

export default OpenSourceHub;
