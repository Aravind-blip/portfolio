import "./App.css";
import {
  FiArrowRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const profileLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aravind-bandipelli",
    icon: FiLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/Aravind-blip",
    icon: FiGithub,
  },
  {
    label: "Email",
    href: "mailto:aravindbandipelli@gmail.com",
    icon: FiMail,
  },
];

const heroFacts = [
  "Based in Cleveland, Ohio",
  "MS in Management, Data Analytics",
  "Ex Infosys",
  "Currently working on AI systems and model evaluation",
];

const projects = [
  {
    title: "LLM Reasoning Evaluation Pipeline",
    summary:
      "Built an evaluation pipeline to benchmark LLM reasoning across coding, math, and financial tasks.",
    details: [
      "Structured evaluation runs around error classification, hallucination detection, and agreement scoring.",
      "Used benchmark-style analysis to surface reliability trends, failure modes, and model blind spots.",
      "Turned raw evaluation outputs into clearer dashboards and annotations for model improvement discussions.",
    ],
    tech: [
      "Python",
      "Evaluation frameworks",
      "Structured annotation",
      "Dashboards",
    ],
    impact:
      "Produced clearer reliability signals and failure insights that can guide model improvement and fine-tuning.",
    link: null,
    linkLabel: "",
  },
  {
    title: "Enterprise Finance Workflow Platform",
    summary:
      "Delivered full-stack finance workflows for Microsoft’s global SPOC platform serving 1,000+ users.",
    details: [
      "Built workflow states, approvals, and supporting APIs across Angular, ASP.NET Core, Azure, and SQL Server.",
      "Improved production performance by optimizing SQL-heavy workflows and supporting cloud automation paths.",
      "Worked across delivery, support, and CI/CD-style release processes for an enterprise internal platform.",
    ],
    tech: [
      "Angular",
      "ASP.NET Core",
      "SQL Server",
      "Azure Functions",
      "TypeScript",
      "RxJS",
    ],
    impact:
      "Improved SQL performance by about 70 percent while supporting large-scale internal finance operations.",
    link: null,
    linkLabel: "",
  },
  {
    title: "Financial Forecasting ML Model",
    summary:
      "Built a finance-focused forecasting workflow for revenue and expense trend prediction.",
    details: [
      "Combined exploratory analysis, data cleaning, and feature engineering to prepare time-aware finance inputs.",
      "Compared forecasting approaches using lag features, rolling windows, and reusable model evaluation steps.",
      "Framed the output as a workflow that can support reporting, analytics, and forecast-driven decision-making.",
    ],
    tech: ["Python", "pandas", "scikit-learn", "Forecasting", "API integration"],
    impact:
      "Created a reusable workflow for finance analytics, reporting, and forecast-driven decision support.",
    link: null,
    linkLabel: "",
  },
  {
    title: "AI-Generated React UI Component Library",
    summary:
      "Improved AI-generated React components into maintainable and reusable production-style UI modules.",
    details: [
      "Refactored noisy generated components into clearer UI building blocks with stronger state and layout structure.",
      "Focused on reusability, readability, and performance cleanup instead of treating generated code as final output.",
      "Added more intentional UX structure so components felt usable in a production-style front-end system.",
    ],
    tech: ["React", "JavaScript", "UI architecture", "Qwen3", "GPT-OSS"],
    impact:
      "Turned noisy AI-generated UI code into cleaner reusable components with better UX structure.",
    link: null,
    linkLabel: "",
  },
];

const experiences = [
  {
    company: "Handshake AI Solutions",
    roles: [
      {
        title: "AI Engineer Expert",
        period: "2025 - Present",
        bullets: [
          "Evaluate LLM performance across reasoning, coding, analytics, and finance tasks.",
          "Diagnose hallucinations, reasoning failures, and execution errors using structured review workflows.",
          "Build benchmark-style evaluations and edge-case prompt tests that surface reliability gaps.",
        ],
      },
      {
        title: "Software Engineer, AI Systems",
        period: "2026 - Present",
        bullets: [
          "Review AI-generated software outputs on real repositories across planning, coding, and verification.",
          "Inspect diffs, repository behavior, and failure points using Docker, Git, tests, and CI-like validation flows.",
          "Create reproducible debugging paths that make model quality easier to judge in practice.",
        ],
      },
    ],
  },
  {
    company: "Infosys Ltd",
    roles: [
      {
        title: "Systems Engineer | Full-Stack Developer",
        period: "2021 - 2023",
        bullets: [
          "Built and supported finance workflow applications on Microsoft’s SPOC platform.",
          "Developed REST APIs, Angular frontends, automation workflows, and SQL-backed data systems.",
          "Improved reliability with testing, observability, cloud automation, and DevOps-oriented delivery practices.",
        ],
      },
    ],
  },
];

const skillGroups = [
  {
    title: "AI and Evaluation",
    skills: [
      "LLM evaluation",
      "Reasoning analysis",
      "Prompt engineering",
      "Model benchmarking",
      "Error analysis",
      "Hallucination detection",
      "Structured annotation",
    ],
  },
  {
    title: "Software Engineering",
    skills: [
      "Angular",
      "React",
      "ASP.NET Core",
      ".NET",
      "TypeScript",
      "JavaScript",
      "Python",
      "C#",
      "REST APIs",
      "Microservices",
    ],
  },
  {
    title: "Data and Analytics",
    skills: [
      "SQL",
      "Power BI",
      "pandas",
      "scikit-learn",
      "Forecasting",
      "EDA",
      "Data cleaning",
      "Reporting",
    ],
  },
  {
    title: "Cloud and DevOps",
    skills: ["Azure", "AWS", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Azure DevOps"],
  },
  {
    title: "Databases",
    skills: ["SQL Server", "PostgreSQL", "MySQL", "MongoDB", "Snowflake", "Redis"],
  },
];

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-description">{description}</p>
    </div>
  );
}

function App() {
  return (
    <div className="site-shell">
      <div className="background-orb orb-one" aria-hidden="true" />
      <div className="background-orb orb-two" aria-hidden="true" />
      <div className="background-grid" aria-hidden="true" />

      <header className="topbar glass-panel">
        <a className="brand-mark" href="#home" aria-label="Aravind Bandipelli home">
          <span className="brand-dot" />
          <span>Aravind Bandipelli</span>
        </a>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy">
            <p className="eyebrow">AI Engineer and Full-Stack Software Engineer</p>
            <h1>
              Building reliable software systems and evaluating AI outputs with an
              engineer’s eye for correctness.
            </h1>
            <p className="hero-lead">
              I build production-ready applications, evaluate LLM-driven products,
              and turn complex workflows into tools teams can trust.
            </p>
            <p className="hero-support">
              Experience across Angular, .NET, Python, SQL, Docker, Kubernetes,
              CI/CD, Azure, and AI evaluation pipelines.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                View Projects
                <FiArrowRight aria-hidden="true" />
              </a>
              <a
                className="button button-secondary"
                href="/Aravind_Bandipelli_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiDownload aria-hidden="true" />
                Download Resume
              </a>
            </div>

            <div className="inline-links" aria-label="Profile links">
              {profileLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          <aside className="hero-card glass-panel" aria-label="Quick profile details">
            <p className="mini-label">Quick snapshot</p>
            <h2>Aravind Bandipelli</h2>
            <p>
              Software engineer with enterprise application experience and hands-on
              LLM evaluation depth across reasoning, debugging, and repository-level
              software tasks.
            </p>
            <ul className="fact-list">
              {heroFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="section" id="projects">
          <SectionHeader
            eyebrow="Selected Work"
            title="Projects that show both software depth and AI systems judgment"
            description="Four focused stories, each framed around what was built, how it worked, and why it mattered."
          />
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card glass-panel" key={project.title}>
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <ul className="detail-list">
                  {project.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <div className="chip-row" aria-label={`${project.title} tech stack`}>
                  {project.tech.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                <p className="impact-line">{project.impact}</p>
                {project.link ? (
                  <a
                    className="project-link"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open link
                    <FiArrowRight aria-hidden="true" />
                  </a>
                ) : (
                  <p className="todo-note">{project.linkLabel}</p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="experience">
          <SectionHeader
            eyebrow="Experience"
            title="A mix of enterprise delivery, debugging depth, and AI evaluation work"
            description="The emphasis here is on high-value responsibilities and signals that matter to engineering hiring teams."
          />
          <div className="experience-stack">
            {experiences.map((experience) => (
              <article className="experience-card" key={experience.company}>
                <div className="experience-heading">
                  <h3>{experience.company}</h3>
                </div>
                <div className="experience-roles">
                  {experience.roles.map((role) => (
                    <section className="role-block" key={`${experience.company}-${role.title}`}>
                      <div className="role-header">
                        <h4>{role.title}</h4>
                        <span>{role.period}</span>
                      </div>
                      <ul className="detail-list">
                        {role.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="skills">
          <SectionHeader
            eyebrow="Skills and Tools"
            title="Grouped to make strengths easier to scan"
            description="The goal is clarity: recruiters can quickly see where AI evaluation, engineering, analytics, and infrastructure overlap."
          />
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="skill-pill-grid">
                  {group.skills.map((skill) => (
                    <span className="skill-pill" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="resume">
          <SectionHeader
            eyebrow="Resume"
            title="Download the full resume for broader context"
            description="A concise summary lives on this page, and the full PDF covers engineering, AI evaluation, and analytics experience in more detail."
          />
          <div className="resume-panel">
            <p>
              Download my latest resume for a fuller view of my engineering, AI
              evaluation, and analytics experience.
            </p>
            <div className="resume-actions">
              <a
                className="button button-primary"
                href="/Aravind_Bandipelli_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiDownload aria-hidden="true" />
                Download Resume
              </a>
              <div className="inline-links">
                {profileLinks.map(({ label, href, icon: Icon }) => (
                  <a key={`resume-${label}`} href={href} target="_blank" rel="noopener noreferrer">
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <SectionHeader
            eyebrow="Contact"
            title="Let’s build something useful."
            description="I’m open to Software Engineer, AI Engineer, and data-focused roles where I can contribute across product development, debugging, evaluation, and analytics."
          />
          <div className="contact-card glass-panel">
            <div className="contact-copy">
              <p>
                If you’re hiring for product-minded engineering work, AI systems
                evaluation, or full-stack development with strong debugging depth,
                I’d be glad to connect.
              </p>
            </div>
            <div className="contact-list" role="list">
              <a href="https://maps.google.com/?q=Cleveland,Ohio" target="_blank" rel="noopener noreferrer">
                <FiMapPin aria-hidden="true" />
                <span>Cleveland, Ohio</span>
              </a>
              <a href="mailto:aravindbandipelli@gmail.com">
                <FiMail aria-hidden="true" />
                <span>aravindbandipelli@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/aravind-bandipelli"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLinkedin aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/Aravind-blip" target="_blank" rel="noopener noreferrer">
                <FiGithub aria-hidden="true" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
