"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Moon, Sparkles, Sun } from "lucide-react";
import styles from "./SiteShell.module.css";
import { SocialDock } from "./SocialDock";
import { siteName } from "../lib/site";
import { resume, socialMedia } from "../lib/portfolio-data";

type Theme = "dark" | "light";
type ShellStyle = CSSProperties & Record<`--${string}`, string>;

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const footerMarquee = [
  "Designing the Future",
  "Debugging Reality",
  "Creating Cool Stuff",
  "Built with Passion",
  "Beyond the Screen",
];

const themeStyles = {
  dark: {
    "--bg": "#020204",
    "--panel": "rgba(12, 12, 16, 0.78)",
    "--panelStrong": "rgba(22, 22, 28, 0.94)",
    "--text": "#fff8ec",
    "--muted": "#aab8cc",
    "--line": "rgba(255, 248, 236, 0.14)",
    "--lineStrong": "rgba(125, 249, 225, 0.38)",
    "--wheelLine": "rgba(255, 255, 255, 0.72)",
    "--wheelGlow": "rgba(255, 255, 255, 0.18)",
    "--accent": "#ff4fd8",
    "--accentTwo": "#36f5c7",
    "--accentThree": "#ffd166",
    background:
      "radial-gradient(circle at 18% 18%, rgba(22, 163, 74, 0.11), transparent 28%), radial-gradient(circle at 78% 24%, rgba(34, 197, 94, 0.08), transparent 32%), radial-gradient(circle at 50% 88%, rgba(21, 128, 61, 0.1), transparent 36%), linear-gradient(135deg, #000000 0%, #010301 34%, #041006 64%, #000000 100%)",
  },
  light: {
    "--bg": "#ffffff",
    "--panel": "rgba(255, 255, 255, 0.78)",
    "--panelStrong": "rgba(255, 255, 255, 0.96)",
    "--text": "#182033",
    "--muted": "#5b6476",
    "--line": "rgba(24, 32, 51, 0.13)",
    "--lineStrong": "rgba(20, 184, 166, 0.34)",
    "--wheelLine": "rgba(0, 0, 0, 0.68)",
    "--wheelGlow": "rgba(0, 0, 0, 0.14)",
    "--accent": "#6d28d9",
    "--accentTwo": "#0f9f8e",
    "--accentThree": "#f97316",
    background:
      "radial-gradient(circle at 16% 16%, rgba(250, 204, 21, 0.12), transparent 18%), radial-gradient(circle at 82% 18%, rgba(234, 179, 8, 0.08), transparent 21%), radial-gradient(circle at 48% 86%, rgba(253, 224, 71, 0.12), transparent 24%), linear-gradient(135deg, #ffffff 0%, #fffefb 42%, #fffbe8 62%, #ffffff 100%)",
  },
} as const;

function persistTheme(theme: Theme) {
  window.localStorage.setItem("portfolio-theme", theme);
  document.cookie = `portfolio-theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
}

function applyThemeToDocument(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.body.style.background = theme === "light" ? "#ffffff" : "#020204";
}

export function SiteShell({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const shellRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const isHome = currentPath === "/";

  const style: ShellStyle = {
    "--mx": "0px",
    "--my": "0px",
    "--tilt": "0deg",
    ...themeStyles[theme],
  };

  useEffect(() => {
    function isExtensionRemoveChildError(message: unknown) {
      return (
        typeof message === "string" &&
        message.includes("Cannot read properties of null") &&
        message.includes("removeChild")
      );
    }

    function handleWindowError(event: ErrorEvent) {
      if (isExtensionRemoveChildError(event.message)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }

    function handleUnhandledRejection(event: PromiseRejectionEvent) {
      const reason = event.reason;
      const message =
        reason instanceof Error ? reason.message : String(reason ?? "");

      if (isExtensionRemoveChildError(message)) {
        event.preventDefault();
      }
    }

    window.addEventListener("error", handleWindowError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleWindowError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
    };
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    applyThemeToDocument(theme);
    persistTheme(theme);
  }, [theme]);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  useEffect(() => {
    function syncCurrentPath() {
      setCurrentPath(window.location.pathname);
    }

    window.addEventListener("popstate", syncCurrentPath);
    window.addEventListener("pageshow", syncCurrentPath);

    return () => {
      window.removeEventListener("popstate", syncCurrentPath);
      window.removeEventListener("pageshow", syncCurrentPath);
    };
  }, []);

  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyThemeToDocument(nextTheme);
      return nextTheme;
    });
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
          <img src="/logo.png" alt="Arpit" />
        </Link>
      </header>

      <nav
        className={`${styles.nav} ${isHome ? styles.navHome : styles.navInterior}`}
        aria-label="Portfolio pages"
      >
        <div className={styles.navPages}>
          {links.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <Link
                href={link.href}
                key={link.href}
                className={`${styles.navLink} ${isActive ? styles.activeNavLink : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
        <div className={styles.navTools}>
          <a
            className={styles.resumeLink}
            href={resume.href}
            target="_blank"
            aria-label="View resume"
          >
            <FileText size={15} />
          </a>
          <button
            className={`${styles.themeButton} ${styles.themeButtonInNav}`}
            type="button"
            onClick={toggleTheme}
            onPointerDown={(event) => event.stopPropagation()}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </nav>

      <SocialDock />
      <div className={styles.content}>{children}</div>
      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div
        className={styles.footerMarquee}
        aria-label="Professional highlights"
      >
        <div className={styles.footerMarqueeTrack}>
          <div className={styles.footerMarqueeScroller}>
            {[0, 1].map((copy) => (
              <div
                className={styles.footerMarqueeGroup}
                key={copy}
                aria-hidden={copy === 1 ? "true" : undefined}
              >
                {footerMarquee.map((item) => (
                  <span key={`${copy}-${item}`}>
                    <Sparkles size={13} aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footerMain}>
        <h2>My Space</h2>
        <div className={styles.footerContactRow}>
          <div className={styles.footerSocials} aria-label="Social links">
            {socialMedia.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footerWordmark} aria-hidden="true">
        ARPIT
      </div>

      <div className={styles.footerBottom}>
        <p>
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </p>
      </div>
    </footer>
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
