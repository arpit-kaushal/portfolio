import styles from "./SocialDock.module.css";
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "./SocialIcons";

const socials = [
  { label: "Twitter", href: "https://x.com/iArpitKaushal", Icon: XIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/im-arpit-kaushal/", Icon: LinkedInIcon },
  { label: "GitHub", href: "https://github.com/arpit-kaushal", Icon: GitHubIcon },
  { label: "Instagram", href: "https://www.instagram.com/iarpitkaushal?igsh=MmR4eWNqdW1iMjRq", Icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/iarpitkaushal", Icon: FacebookIcon },
];

export function SocialDock() {
  return (
    <aside className={styles.dock} aria-label="Social media accounts">
      {socials.map(({ label, href, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
          <Icon />
        </a>
      ))}
    </aside>
  );
}
