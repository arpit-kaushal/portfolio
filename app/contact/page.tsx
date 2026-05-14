import { ContactForm } from "./ContactForm";
import { FloatingSocialIcons } from "./FloatingSocialIcons";
import styles from "./page.module.css";
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "../../components/SocialIcons";

const followLinks = [
  { label: "Follow on Twitter", href: "https://x.com/iArpitKaushal", Icon: XIcon },
  { label: "Follow on LinkedIn", href: "https://www.linkedin.com/in/im-arpit-kaushal/", Icon: LinkedInIcon },
  { label: "Follow on GitHub", href: "https://github.com/arpit-kaushal", Icon: GitHubIcon },
  { label: "Follow on Instagram", href: "https://www.instagram.com/iarpitkaushal?igsh=MmR4eWNqdW1iMjRq", Icon: InstagramIcon },
  { label: "Follow on Facebook", href: "https://www.facebook.com/iarpitkaushal", Icon: FacebookIcon },
];

export default function ContactPage() {
  return (
    <section className={styles.page}>
      <FloatingSocialIcons />
      <div className={styles.intro}>

        <h1 className={styles.title}>Let’s Connect</h1>
        <p className={styles.copy}>
        I believe great ideas begin with meaningful conversations. 
        Whether you have a question, a project idea, a collaboration opportunity, or simply want to connect, 
        I’d love to hear from you.Every message matters, and I’m committed to responding with attention, professionalism, and genuine interest.
        If you’re looking for someone who values creativity, quality, and collaboration, this is the perfect place to start.
        </p>
      </div>

      <div className={styles.contactGrid}>
        <div className={styles.followLinks}>
          {followLinks.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer">
              <Icon size={17} />
              {label}
            </a>
          ))}
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
