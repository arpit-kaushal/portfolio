"use client";

import styles from "./page.module.css";

export function AboutMascot() {
  return (
    <div className={`${styles.mascot} ${styles.bottomLeft}`} aria-hidden="true">
      <div className={styles.speechCloud}>Hello!</div>
      <div className={styles.character}>
        <div className={styles.hair} />
        <div className={styles.face}>
          <span className={styles.eye} />
          <span className={styles.eye} />
          <span className={styles.smile} />
        </div>
        <div className={styles.body}>
          <span className={styles.hand} />
        </div>
      </div>
    </div>
  );
}
