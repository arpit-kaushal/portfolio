"use client";

import { useEffect, useState } from "react";
import { Code, ExternalLink } from "lucide-react";
import { ProjectShimmerGrid } from "../../components/Shimmer";
import styles from "./page.module.css";
import {
  projects as projectData,
  type Project,
} from "../../lib/portfolio-data";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setProjects([...projectData]);
      setIsLoading(false);
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Projects That Define Me</h1>

      {isLoading ? (
        <ProjectShimmerGrid count={4} />
      ) : (
        <div className={styles.grid}>
          {projects.map((project) => (
            <article className={styles.card} key={project.title}>
              <div className={styles.imageWrap}>
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className={styles.projectImage}
                />
              </div>
              <div className={styles.cardHeader}>
                <h2>{project.title}</h2>
              </div>
              <div className={styles.reveal}>
                <p>{project.description}</p>
                <div className={styles.links}>
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <Code size={16} /> GitHub
                  </a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      <ExternalLink size={16} /> Live
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
