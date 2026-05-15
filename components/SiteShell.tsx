"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
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
  const shellRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const style = {
    "--mx": "0px",
    "--my": "0px",
    "--tilt": "0deg",
  } as CSSProperties;

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <main
      ref={shellRef}
      className={`${styles.shell} ${theme === "light" ? styles.light : ""}`}
      style={style}
      onMouseMove={(event) => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;

        if (frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
        }

        frameRef.current = requestAnimationFrame(() => {
          const shell = shellRef.current;
          if (!shell) {
            frameRef.current = null;
            return;
          }

          shell.style.setProperty("--mx", `${x * 26}px`);
          shell.style.setProperty("--my", `${y * 26}px`);
          shell.style.setProperty("--tilt", `${x * 10}deg`);
          frameRef.current = null;
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
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
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
