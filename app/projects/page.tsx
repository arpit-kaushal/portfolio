import { Code, ExternalLink } from "lucide-react";
import styles from "./page.module.css";

const projects = [
  {
    title: "Smart Portfolio",
    tag: "Next.js",
    github: "https://github.com/",
    live: "https://example.com/",
    description:
      "A responsive portfolio with separate pages, theme switching, line-pattern motion, and clean project storytelling.",
  },
  {
    title: "TaskFlow Dashboard",
    tag: "Node.js API",
    github: "https://github.com/",
    live: "https://example.com/",
    description:
      "A productivity dashboard concept with card layouts, analytics sections, and a polished full-stack workflow.",
  },
  {
    title: "Creative Landing Page",
    tag: "3D Motion",
    github: "https://github.com/",
    live: "https://example.com/",
    description:
      "A modern landing page using glass surfaces, floating depth, line art, and smooth interaction effects.",
  },
];

export default function ProjectsPage() {
  return (
    <section className={styles.page}>
      <p className={styles.eyebrow}>Projects</p>
      <h1 className={styles.title}>Featured work presented in modern cards.</h1>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <article className={styles.card} key={project.title}>
            <div className={styles.imageWrap}>
              <div className={styles.art}>
                <span>{`0${index + 1}`}</span>
              </div>
            </div>
            <div className={styles.cardHeader}>
              <span className={styles.tag}>{project.tag}</span>
              <h2>{project.title}</h2>
            </div>
            <div className={styles.reveal}>
              <p>{project.description}</p>
              <div className={styles.links}>
                <a href={project.github} target="_blank" rel="noreferrer">
                  <Code size={16} /> GitHub
                </a>
                <a href={project.live} target="_blank" rel="noreferrer">
                  <ExternalLink size={16} /> Live
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
