import { FiDownload } from "react-icons/fi";
import SectionHeader from "../ui/SectionHeader";
import { profile } from "../../data/profile";

const resumeHref = `${import.meta.env.BASE_URL}${profile.resumeFileName}`;

function Resume() {
  return (
    <section className="section" id="resume">
      <SectionHeader
        eyebrow="Resume"
        title="Full resume available as a PDF"
        description="A concise summary lives on this page. The PDF covers engineering, AI evaluation, and professional experience in more detail."
      />
      <div className="resume-panel glass-panel">
        <p>
          Download the current resume for a fuller view of engineering and AI
          evaluation experience.
        </p>
        <div className="resume-actions">
          <a
            className="button button-primary"
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiDownload aria-hidden="true" />
            Download Resume (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}

export default Resume;
