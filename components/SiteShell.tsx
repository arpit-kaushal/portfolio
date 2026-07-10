"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Moon, Sparkles, Sun } from "lucide-react";
import styles from "./SiteShell.module.css";
import { ContentProtection } from "./ContentProtection";
import { SocialDock } from "./SocialDock";
import { siteName } from "../lib/site";
import { resume, socialMedia } from "../lib/portfolio-data";

type Theme = "dark" | "light";
type ShellStyle = CSSProperties & Record<`--${string}`, string>;

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/showcase", label: "Showcase" },
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
    "--bg": "#e7f1ec",
    "--panel": "rgba(255, 255, 255, 0.72)",
    "--panelStrong": "rgba(248, 252, 250, 0.92)",
    "--text": "#10231c",
    "--muted": "#4a6358",
    "--line": "rgba(16, 35, 28, 0.12)",
    "--lineStrong": "rgba(13, 148, 136, 0.38)",
    "--wheelLine": "rgba(16, 35, 28, 0.62)",
    "--wheelGlow": "rgba(225, 29, 72, 0.14)",
    "--accent": "#e11d48",
    "--accentTwo": "#0d9488",
    "--accentThree": "#ea580c",
    background:
      "radial-gradient(circle at 12% 14%, rgba(45, 212, 191, 0.22), transparent 28%), radial-gradient(circle at 88% 12%, rgba(251, 113, 133, 0.16), transparent 26%), radial-gradient(circle at 70% 88%, rgba(251, 191, 36, 0.18), transparent 30%), radial-gradient(circle at 18% 86%, rgba(52, 211, 153, 0.16), transparent 28%), linear-gradient(165deg, #dcebe4 0%, #e8f3ee 38%, #f2f7f4 68%, #e6efe9 100%)",
  },
} as const;

function persistTheme(theme: Theme) {
  window.localStorage.setItem("portfolio-theme", theme);
  document.cookie = `portfolio-theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
}

function applyThemeToDocument(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.body.style.background = themeStyles[theme].background;
  document.body.style.backgroundAttachment = "fixed";
}

export function SiteShell({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const isHome = currentPath === "/";

  const { background: _background, ...themeVars } = themeStyles[theme];
  const style: ShellStyle = themeVars;

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
    applyThemeToDocument(theme);
    persistTheme(theme);
  }, [theme]);

  useEffect(() => {
    setCurrentPath(pathname);
    setMobileNavOpen(false);
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
    <main className={styles.shell} data-theme={theme} style={style}>
      <ContentProtection />
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Go to home">
          <img src="/logo.png" alt="Arpit" />
        </Link>
        <div className={styles.headerTools}>
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
      </header>

      <nav
        className={`${styles.nav} ${isHome ? styles.navHome : styles.navInterior} ${mobileNavOpen ? styles.navOpen : ""}`}
        aria-label="Portfolio pages"
      >
        <button
          className={styles.navToggle}
          type="button"
          aria-expanded={mobileNavOpen}
          aria-controls="portfolio-nav-menu"
          aria-label={
            mobileNavOpen ? "Close navigation menu" : "Open navigation menu"
          }
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <div className={styles.navMenu} id="portfolio-nav-menu">
          <div className={styles.navPages}>
            {links.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <Link
                  href={link.href}
                  key={link.href}
                  className={`${styles.navLink} ${isActive ? styles.activeNavLink : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMobileNavOpen(false)}
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
