import { FiGithub, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import SectionHeader from "../ui/SectionHeader";
import { profile } from "../../data/profile";

function Contact() {
  return (
    <section className="section" id="contact">
      <SectionHeader eyebrow="Contact" title="Let's build something useful." />
      <div className="contact-card glass-panel">
        <div className="contact-copy">
          <p>{profile.contactMessage}</p>
        </div>
        <div className="contact-list">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(profile.location)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiMapPin aria-hidden="true" />
            <span>{profile.location}</span>
          </a>
          <a href={`mailto:${profile.email}`}>
            <FiMail aria-hidden="true" />
            <span>{profile.email}</span>
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            <FiLinkedin aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
            <FiGithub aria-hidden="true" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
