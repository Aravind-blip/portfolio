import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "../../data/profile";

const items = [
  { label: "GitHub", href: profile.links.github, icon: FiGithub },
  { label: "LinkedIn", href: profile.links.linkedin, icon: FiLinkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: FiMail },
];

function SocialLinks({ className = "inline-links" }) {
  return (
    <div className={className} aria-label="Profile links">
      {items.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
