import styles from "./SocialDock.module.css";
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "./SocialIcons";
import { socialMedia, type SocialPlatform } from "../lib/portfolio-data";

const socialIcons = {
  twitter: XIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
} satisfies Record<SocialPlatform, typeof XIcon>;

export function SocialDock() {
  return (
    <aside className={styles.dock} aria-label="Social media accounts">
      {socialMedia.map(({ platform, label, href }) => {
        const Icon = socialIcons[platform];
        return (
          <a key={platform} href={href} target="_blank" rel="noreferrer" aria-label={label}>
            <Icon />
          </a>
        );
      })}
    </aside>
  );
}
