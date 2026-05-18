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
    "--bg": "#070b18",
    "--panel": "rgba(13, 20, 38, 0.76)",
    "--panelStrong": "rgba(24, 34, 58, 0.9)",
    "--text": "#f8fbff",
    "--muted": "#aeb9cc",
    "--line": "rgba(255, 255, 255, 0.13)",
    "--lineStrong": "rgba(148, 163, 184, 0.38)",
    "--accent": "#9b87f5",
    "--accentTwo": "#38bdf8",
    "--accentThree": "#d6b36a",
    background:
      "radial-gradient(circle at 16% 16%, rgba(155, 135, 245, 0.16), transparent 32%), radial-gradient(circle at 84% 22%, rgba(56, 189, 248, 0.13), transparent 34%), radial-gradient(circle at 54% 90%, rgba(214, 179, 106, 0.1), transparent 38%), linear-gradient(135deg, #070b18 0%, #101827 52%, #07111d 100%)",
  },
  light: {
    "--bg": "#d9e9ff",
    "--panel": "rgba(226, 235, 246, 0.86)",
    "--panelStrong": "rgba(203, 216, 232, 0.96)",
    "--text": "#0f1f35",
    "--muted": "#47566a",
    "--line": "rgba(15, 31, 53, 0.14)",
    "--lineStrong": "rgba(24, 63, 105, 0.28)",
    "--accent": "#3347a8",
    "--accentTwo": "#087f8c",
    "--accentThree": "#a46a22",
    background:
      "radial-gradient(circle at 12% 16%, rgba(99, 102, 241, 0.34), transparent 30%), radial-gradient(circle at 82% 16%, rgba(20, 184, 166, 0.3), transparent 32%), radial-gradient(circle at 22% 82%, rgba(236, 72, 153, 0.22), transparent 34%), radial-gradient(circle at 72% 78%, rgba(245, 158, 11, 0.24), transparent 35%), linear-gradient(135deg, #d9e9ff 0%, #d7f4ef 38%, #eee0ff 68%, #ffe8c7 100%)",
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
    document.body.style.background = theme === "light" ? "#d9e9ff" : "#060713";
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
