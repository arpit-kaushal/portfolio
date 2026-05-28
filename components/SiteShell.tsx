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
type ShellStyle = CSSProperties & Record<`--${string}`, string>;

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const themeStyles = {
  dark: {
    "--bg": "#070812",
    "--panel": "rgba(10, 18, 34, 0.78)",
    "--panelStrong": "rgba(18, 32, 54, 0.93)",
    "--text": "#fff8ec",
    "--muted": "#aab8cc",
    "--line": "rgba(255, 248, 236, 0.14)",
    "--lineStrong": "rgba(125, 249, 225, 0.38)",
    "--accent": "#ff4fd8",
    "--accentTwo": "#36f5c7",
    "--accentThree": "#ffd166",
    background:
      "radial-gradient(circle at 12% 14%, rgba(255, 79, 216, 0.2), transparent 31%), radial-gradient(circle at 86% 18%, rgba(54, 245, 199, 0.16), transparent 34%), radial-gradient(circle at 50% 92%, rgba(255, 209, 102, 0.13), transparent 38%), linear-gradient(135deg, #070812 0%, #111b2f 44%, #071b22 72%, #13091c 100%)",
  },
  light: {
    "--bg": "#fff7ed",
    "--panel": "rgba(255, 255, 255, 0.74)",
    "--panelStrong": "rgba(255, 249, 238, 0.94)",
    "--text": "#182033",
    "--muted": "#5b6476",
    "--line": "rgba(24, 32, 51, 0.13)",
    "--lineStrong": "rgba(20, 184, 166, 0.34)",
    "--accent": "#6d28d9",
    "--accentTwo": "#0f9f8e",
    "--accentThree": "#f97316",
    background:
      "radial-gradient(circle at 10% 12%, rgba(109, 40, 217, 0.22), transparent 30%), radial-gradient(circle at 84% 14%, rgba(15, 159, 142, 0.28), transparent 32%), radial-gradient(circle at 18% 84%, rgba(249, 115, 22, 0.22), transparent 33%), radial-gradient(circle at 76% 78%, rgba(244, 63, 94, 0.18), transparent 35%), linear-gradient(135deg, #fff7ed 0%, #e7fff8 36%, #f4ecff 68%, #fff1d6 100%)",
  },
} as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const shellRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const style: ShellStyle = {
    "--mx": "0px",
    "--my": "0px",
    "--tilt": "0deg",
    ...themeStyles[theme],
  };

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.body.style.background = theme === "light" ? "#fff7ed" : "#070812";
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <main
      ref={shellRef}
      className={styles.shell}
      data-theme={theme}
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
          onClick={toggleTheme}
          onPointerDown={(event) => event.stopPropagation()}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <nav className={styles.nav} aria-label="Portfolio pages">
        {links.map((link) => (
          <Link href={link.href} key={link.href} className={styles.navLink}>
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
