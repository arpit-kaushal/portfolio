"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import styles from "./SiteShell.module.css";
import { SocialDock } from "./SocialDock";

type Theme = "dark" | "light";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const style = {
    "--mx": `${cursor.x * 26}px`,
    "--my": `${cursor.y * 26}px`,
    "--tilt": `${cursor.x * 10}deg`,
  } as CSSProperties;

  return (
    <main
      className={`${styles.shell} ${theme === "light" ? styles.light : ""}`}
      style={style}
      onMouseMove={(event) => {
        setCursor({
          x: event.clientX / window.innerWidth - 0.5,
          y: event.clientY / window.innerHeight - 0.5,
        });
      }}
    >
      <LineBackground />

      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Go to home">
          <img src="/logo.png" alt="Portfolio logo" />
        </Link>

        <button
          className={styles.themeButton}
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle color theme"
        >
          <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
        </button>
      </header>

      <nav className={styles.nav} aria-label="Portfolio pages">
        {links.map((link) => (
          <Link href={link.href} key={link.href} className={styles.navLink}>
            <span className={styles.navDot} />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <SocialDock />
      <div className={styles.content}>{children}</div>
    </main>
  );
}

function LineBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      <div className={`${styles.lineCluster} ${styles.clusterOne}`}>
        <span className={styles.segment} />
        <span className={styles.segment} />
        <span className={styles.segment} />
        <span className={styles.segment} />
      </div>
      <div className={`${styles.lineCluster} ${styles.clusterTwo}`}>
        <span className={styles.segment} />
        <span className={styles.segment} />
        <span className={styles.segment} />
        <span className={styles.segment} />
      </div>
      <div className={`${styles.lineCluster} ${styles.clusterThree}`}>
        <span className={styles.segment} />
        <span className={styles.segment} />
        <span className={styles.segment} />
      </div>
      <div className={styles.orbOne} />
      <div className={styles.orbTwo} />
    </div>
  );
}
