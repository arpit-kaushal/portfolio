import styles from "./Shimmer.module.css";

function Bone({ className }: { className: string }) {
  return <div className={`${styles.bone} ${className}`} aria-hidden="true" />;
}

export function ProjectShimmerGrid({ count = 4 }: { count?: number }) {
  return (
    <div className={styles.projectGrid} role="status" aria-label="Loading projects">
      {Array.from({ length: count }, (_, index) => (
        <article className={styles.projectCard} key={index}>
          <Bone className={styles.projectThumb} />
          <div className={styles.projectMeta}>
            <Bone className={styles.projectTitle} />
            <Bone className={styles.projectLine} />
            <Bone className={styles.projectLineShort} />
            <div className={styles.projectActions}>
              <Bone className={styles.projectChip} />
              <Bone className={styles.projectChip} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ShowcaseShimmerGrid({ count = 6 }: { count?: number }) {
  return (
    <div
      className={styles.showcaseGrid}
      role="status"
      aria-label="Loading showcase items"
    >
      {Array.from({ length: count }, (_, index) => (
        <article className={styles.showcaseCard} key={index}>
          <div className={styles.showcaseHead}>
            <div className={styles.showcaseMeta}>
              <Bone className={styles.showcaseBadge} />
              <Bone className={styles.showcaseLabel} />
            </div>
            <Bone className={styles.showcaseDate} />
          </div>
          <Bone className={styles.showcaseTitle} />
          <Bone className={styles.showcaseOrg} />
          <Bone className={styles.showcaseLine} />
          <Bone className={styles.showcaseLine} />
          <Bone className={styles.showcaseLineShort} />
          <Bone className={styles.showcaseButton} />
        </article>
      ))}
    </div>
  );
}
