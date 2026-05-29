/** Canonical site URL — set NEXT_PUBLIC_SITE_URL in production (no trailing slash). */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://arpitkaushal.me"
).replace(/\/$/, "");

export const siteName = "Arpit Kaushal";

export const siteDescription =
  "Portfolio of Arpit Kaushal — web developer and builder of AI-powered apps, automation tools, and full-stack projects. Explore work experience, projects, and get in touch.";

export const siteKeywords = [
  "Arpit Kaushal",
  "portfolio",
  "web developer",
  "full stack developer",
  "Python developer",
  "Next.js",
  "React",
  "projects",
  "software engineer",
];

export const googleSiteVerification = "Lim3qsOSbLcyJyXBcdwYaJSe2A5ZdX2aVG55x2skswE";

export const socialLinks = {
  twitter: "https://x.com/iArpitKaushal",
  linkedin: "https://www.linkedin.com/in/im-arpit-kaushal/",
  github: "https://github.com/arpit-kaushal",
  instagram: "https://www.instagram.com/iarpitkaushal",
  facebook: "https://www.facebook.com/iarpitkaushal",
};

export const contactEmail = "imarpitkaushal@gmail.com";
