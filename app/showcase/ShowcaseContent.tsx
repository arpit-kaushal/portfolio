"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BadgeCheck,
  Calendar,
  ExternalLink,
  Trophy,
  Users,
} from "lucide-react";
import type { CSSProperties } from "react";
import { ShowcaseShimmerGrid } from "../../components/Shimmer";
import styles from "./page.module.css";
import {
  showcaseItems,
  type ShowcaseCategory,
  type ShowcaseItem,
} from "../../lib/portfolio-data";

type FilterKey = "all" | ShowcaseCategory;

const filters: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "achievement", label: "Achievement" },
  { key: "extracurricular", label: "Extracurricular" },
  { key: "certification", label: "Certification" },
];

const categoryConfig: Record<
  ShowcaseCategory,
  { label: string; Icon: typeof Trophy; accent: string }
> = {
  achievement: {
    label: "Achievement",
    Icon: Trophy,
    accent: "var(--accentThree)",
  },
  certification: {
    label: "Certification",
    Icon: BadgeCheck,
    accent: "var(--accentTwo)",
  },
  extracurricular: {
    label: "Extracurricular",
    Icon: Users,
    accent: "var(--accent)",
  },
};

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  const { label, Icon } = categoryConfig[item.category];

  return (
    <article
      className={styles.card}
      data-category={item.category}
      style={
        {
          "--card-accent": categoryConfig[item.category].accent,
        } as CSSProperties
      }
    >
      <div className={styles.cardHead}>
        <div className={styles.cardMeta}>
          <span className={styles.iconBadge}>
            <Icon size={16} aria-hidden="true" />
          </span>
          <span className={styles.categoryLabel}>{label}</span>
        </div>
        <span className={styles.date}>
          <Calendar size={13} aria-hidden="true" />
          {item.date}
        </span>
      </div>

      <h2 className={styles.cardTitle}>{item.title}</h2>
      <p className={styles.organization}>
        <Award size={14} aria-hidden="true" />
        {item.organization}
      </p>
      <p className={styles.description}>{item.description}</p>

      {item.link && (
        <a
          className={styles.cardLink}
          href={item.link}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink size={14} aria-hidden="true" />
          {item.category === "certification"
            ? "View Credential"
            : "View Certificate"}
        </a>
      )}
    </article>
  );
}

export function ShowcaseContent() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 850);

    return () => window.clearTimeout(timer);
  }, [activeFilter]);

  const filteredItems = useMemo(() => {
    const items =
      activeFilter === "all"
        ? showcaseItems
        : showcaseItems.filter((item) => item.category === activeFilter);

    return [...items].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  }, [activeFilter]);

  return (
    <>
      <div className={styles.toolbar}>
        <div
          className={styles.filterGroup}
          role="tablist"
          aria-label="Showcase filters"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ""}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {isLoading ? (
        <ShowcaseShimmerGrid count={6} />
      ) : (
        <div className={styles.grid}>
          {filteredItems.map((item) => (
            <ShowcaseCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
