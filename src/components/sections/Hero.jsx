import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import Button from "../ui/Button";
import SocialLinks from "../ui/SocialLinks";
import { profile } from "../../data/profile";

const resumeHref = `${import.meta.env.BASE_URL}${profile.resumeFileName}`;

function Hero() {
  return (
    <section className="hero section" id="home">
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="eyebrow">{profile.role}</p>
        <h1>{profile.headline}</h1>
        <p className="hero-lead">{profile.supporting}</p>
        <p className="hero-support">{profile.tagline}</p>

        <div className="hero-actions">
          <Button href="#projects" variant="primary">
            Explore Projects
            <FiArrowRight aria-hidden="true" />
          </Button>
          <Button href={resumeHref} variant="secondary">
            <FiDownload aria-hidden="true" />
            View Resume
          </Button>
          <Button href={profile.links.github} variant="secondary">
            GitHub
          </Button>
        </div>

        <SocialLinks />
      </motion.div>

      <motion.aside
        className="hero-card glass-panel"
        aria-label="Engineering snapshot"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <p className="mini-label">Engineering snapshot</p>
        <ul className="fact-list">
          {profile.snapshot.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </motion.aside>
    </section>
  );
}

export default Hero;
