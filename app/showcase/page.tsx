import styles from "./page.module.css";
import { AwardVisual } from "./AwardVisual";
import { ShowcaseContent } from "./ShowcaseContent";

export default function ShowcasePage() {
  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1 className={styles.title}>
            Beyond the <span>Code</span>
          </h1>
          <p className={styles.subtitle}>
            A collection of moments that mark my journey of learning, growth,
            and exploration. From achievements and certifications to experiences
            beyond academics, each milestone reflects a step forward.
          </p>
        </div>
        <AwardVisual />
      </header>

      <ShowcaseContent />
    </section>
  );
}
