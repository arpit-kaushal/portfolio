import Link from "next/link";
import { FileText, MoveDownRight } from "lucide-react";
import styles from "./page.module.css";

const roles = [
  "Frontend Developer",
  "Web Developer",
  "Software Engineer",
  "React Developer",
  "Python Developer",
  "AI Application Developer",
  "Full Stack Engineer",
  "Technology Enthusiast",
];

export default function HomePage() {
  return (
    <section className={styles.page}>
      <div className={styles.heroCopy}>
        <h1 className={styles.title}>
          Hi, I&apos;m <span>Arpit Kaushal</span>
        </h1>
        <div className={styles.role} aria-label="Professional roles">
          <span className={styles.prompt}>&gt;</span>
          <span className={styles.roleWindow}>
            {roles.map((role) => (
              <span className={styles.roleItem} key={role}>
                {role}
              </span>
            ))}
          </span>
        </div>
        <p className={styles.copy}>
          I build clean, responsive digital experiences with thoughtful details,
          smooth interactions, and a practical focus on turning ideas into useful
          products.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primaryAction} href="/projects">
            My Projects
            <MoveDownRight size={19} />
          </Link>
          <a className={styles.secondaryAction} href="/Arpit-Kaushal.pdf" target="_blank">
            <FileText size={18} />
            Resume
          </a>
        </div>
      </div>

      <div className={styles.portraitColumn}>
        <p className={styles.opportunityLabel}>Seeking Opportunities</p>
        <div className={styles.portraitStage} aria-label="Profile picture area">
          <span className={`${styles.orbitRing} ${styles.orbitOne}`} />
          <span className={`${styles.orbitRing} ${styles.orbitTwo}`} />
          <span className={`${styles.orbitRing} ${styles.orbitThree}`} />
          <span className={`${styles.orbitRing} ${styles.orbitFour}`} />
          <div className={styles.portraitCard}>
            <img src="/home.jpeg" alt="Arpit Kaushal portrait" />
          </div>
        </div>
      </div>
    </section>
  );
}
