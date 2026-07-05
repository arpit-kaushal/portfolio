import styles from "./page.module.css";
import type { CSSProperties } from "react";
import { Building2 } from "lucide-react";
import { FloatingEmojis } from "./FloatingEmojis";
import { experiences, skills } from "../../lib/portfolio-data";

type SkillStyle = CSSProperties & {
  "--skill-color": string;
};

const skillLogos: Record<string, { src?: string; mark?: string }> = {
  Python: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  "C++": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  },
  JavaScript: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  HTML: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  CSS: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  React: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  MySQL: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  },
  "Machine Learning": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
  },
  "Generative AI": { mark: "AI" },
  GitHub: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  },
  "VS Code": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  },
  "Unit Testing": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytest/pytest-original.svg",
  },
  Debugging: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg",
  },
  "Agile Methodology": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg",
  },
  SDLC: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
};

const companyLogos: Record<string, string> = {
  "Kohli Media LLP": "/logo/kohli.jpg",
  "TechnoHacks Solutions Pvt. Ltd.": "/logo/techno.jpg",
};

export default function AboutPage() {
  return (
    <section className={styles.page}>
      <FloatingEmojis />

      <section className={styles.descriptionSection}>
        <div className={styles.description}>
          <h1 className={styles.title}>Who <span>Am I</span>?</h1>
          <p>
            I am someone who believes that every great idea deserves an
            exceptional presence. With a strong passion for creativity and
            innovation, I focus on building experiences that are simple,
            engaging, and meaningful.
          </p>
          <p>
            My journey has been driven by curiosity, continuous learning, and
            the desire to create solutions that make a real difference. I enjoy
            turning ideas into reality through thoughtful design, smooth
            experiences, and a user-focused approach.
          </p>
          <p>
            Every project is an opportunity to create something memorable -
            something that not only looks impressive but also provides value and
            leaves a lasting impression.
          </p>
        </div>
        <div className={styles.photoCard}>
          <img src="/about-photo.png" alt="Arpit profile" />
        </div>
      </section>

      <section className={styles.skillsSection}>
        <p className={styles.pillHeading}>My Skills</p>
        <h2 className={styles.skillsTitle}>
          The Magic <span>Behind</span>
        </h2>
        <p className={styles.skillsCopy}>
          
        </p>
        <div className={styles.skillCloud}>
          {skills.map((skill) => {
            const logo = skillLogos[skill.name];
            return (
              <span
                className={styles.skillPill}
                key={skill.name}
                style={{ "--skill-color": skill.color } as SkillStyle}
              >
                <span
                  className={`${styles.skillMark} ${logo?.mark ? styles.skillTextMark : ""}`}
                >
                  {logo?.src ? (
                    <img src={logo.src} alt="" aria-hidden="true" />
                  ) : (
                    logo?.mark ?? skill.name.slice(0, 2)
                  )}
                </span>
                {skill.name}
              </span>
            );
          })}
        </div>
      </section>

      <section className={styles.experienceSection}>
        <p className={styles.pillHeading}>My Work</p>
        <h2 className={styles.experienceTitle}>
          Experience
        </h2>
        <p className={styles.experienceCopy}>
          Where I&apos;ve worked and what I&apos;ve built.
        </p>
        <div className={styles.timeline}>
          {experiences.map((experience) => (
            <article className={styles.workCard} key={experience.company}>
              <div className={styles.workHeader}>
                <div>
                  <h3>
                    <span className={styles.companyLogo}>
                      <img
                        src={companyLogos[experience.company]}
                        alt=""
                        aria-hidden="true"
                      />
                    </span>
                    {experience.company}
                  </h3>
                  <p className={styles.workRole}>
                    <Building2 size={15} />
                    {experience.role}
                  </p>
                </div>
                <span className={styles.workDuration}>{experience.duration}</span>
              </div>
              <p className={styles.workDescription}>{experience.description}</p>
              <div className={styles.workTags}>
                {experience.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
