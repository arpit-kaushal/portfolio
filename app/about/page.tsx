import styles from "./page.module.css";
import type { CSSProperties } from "react";
import {
  BriefcaseBusiness,
  Building2,
  Cable,
  Code2,
  Database,
  FileCode,
  FlaskConical,
  GitBranch,
  LayoutTemplate,
  MonitorCog,
  Network,
  PencilRuler,
  RefreshCcw,
  Sparkles,
  TerminalSquare,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { FloatingEmojis } from "./FloatingEmojis";

const experiences = [
  {
    company: "Kohli Media LLP",
    role: "Web Developer",
    duration: "April 2025 - July 2025",
    description:
      "Developed responsive web applications, improved usability and performance, addressed implementation challenges, and supported the delivery of scalable, production-ready solutions.",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Web Design", "UI Optimization", "Cross-Browser Testing"],
  },
  {
    company: "TechnoHacks Solutions Pvt. Ltd.",
    role: "Python Developer",
    duration: "May 2024 - June 2024",
    description:
      "Worked on Python-based application development, improved workflow efficiency, and enhanced software quality through testing, troubleshooting, and continuous refinement.",
    skills: ["Python", "Code Optimization", "Unit Testing", "Debugging", "SDLC"],
  },
];

type Skill = {
  name: string;
  Icon: LucideIcon;
  color: string;
};

type SkillStyle = CSSProperties & {
  "--skill-color": string;
};

const skills: Skill[] = [
  { name: "Python", Icon: Code2, color: "#3776ab" },
  { name: "C++", Icon: FileCode, color: "#00599c" },
  { name: "JavaScript", Icon: Zap, color: "#f7df1e" },
  { name: "HTML", Icon: LayoutTemplate, color: "#e34f26" },
  { name: "CSS", Icon: PencilRuler, color: "#1572b6" },
  { name: "React", Icon: RefreshCcw, color: "#61dafb" },
  { name: "MySQL", Icon: Database, color: "#00758f" },
  { name: "Machine Learning", Icon: Network, color: "#22c55e" },
  { name: "Generative AI", Icon: Sparkles, color: "#a78bfa" },
  { name: "GitHub", Icon: GitBranch, color: "#f8fafc" },
  { name: "VS Code", Icon: TerminalSquare, color: "#007acc" },
  { name: "Unit Testing", Icon: FlaskConical, color: "#2ead33" },
  { name: "Debugging", Icon: MonitorCog, color: "#fb7185" },
  { name: "Agile Methodology", Icon: GitBranch, color: "#f97316" },
  { name: "SDLC", Icon: Cable, color: "#38bdf8" },
];

export default function AboutPage() {
  return (
    <section className={styles.page}>
      <FloatingEmojis />

      <section className={styles.descriptionSection}>
        <div className={styles.description}>
          <h1 className={styles.title}>Who Am I?</h1>
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
          {skills.map((skill) => (
            <span
              className={styles.skillPill}
              key={skill.name}
              style={{ "--skill-color": skill.color } as SkillStyle}
            >
              <span className={styles.skillMark}>
                <skill.Icon size={20} strokeWidth={2.2} />
              </span>
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.experienceSection}>
        <p className={styles.pillHeading}>Work</p>
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
                    <BriefcaseBusiness size={18} />
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
