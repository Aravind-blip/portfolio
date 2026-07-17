import { Link } from "react-router-dom";
import RelatedProjects from "../components/case-study/RelatedProjects";
import CurrentQuestions from "../components/lab/CurrentQuestions";
import EngineeringLabHero from "../components/lab/EngineeringLabHero";
import FeaturedLabEntry from "../components/lab/FeaturedLabEntry";
import LabEntryCatalog from "../components/lab/LabEntryCatalog";
import StatusLegend from "../components/lab/StatusLegend";
import GitHubProfileCTA from "../components/ui/GitHubProfileCTA";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { routeMetadata } from "../data/route-metadata";
import { featuredLabEntry, labEntries } from "../data/lab-entries";

const relatedSlugs = [...new Set(labEntries.flatMap((entry) => entry.relatedProjectIds))];

function LabIndex() {
  usePageMetadata(routeMetadata.lab);

  return (
    <div className="open-source-hub">
      <EngineeringLabHero />
      <FeaturedLabEntry entry={featuredLabEntry} />
      <LabEntryCatalog entries={labEntries} />
      <CurrentQuestions entries={labEntries} />
      <StatusLegend />
      <div className="section related-case-studies-wrapper">
        <p className="eyebrow">Related Systems</p>
        <RelatedProjects id="lab-related-systems" slugs={relatedSlugs} heading="See the systems these notes come from" />
      </div>
      <section className="section open-source-cta" aria-labelledby="lab-cta-heading">
        <h2 id="lab-cta-heading">More context lives in the Open Source Hub.</h2>
        <p className="hero-lead">Repository maturity, releases, and CI signals for the projects behind these notes.</p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/open-source">
            Explore the Open Source Hub
          </Link>
          <GitHubProfileCTA />
        </div>
      </section>
    </div>
  );
}

export default LabIndex;
