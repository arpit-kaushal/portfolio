import styles from "./page.module.css";
import { BriefcaseBusiness, Building2, Mail, Users } from "lucide-react";
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "../../components/SocialIcons";
import { FloatingEmojis } from "./FloatingEmojis";

const experiences = [
  {
    company: "Kohli Media LLP",
    logo: "/logo/kohli.jpg",
    role: "Web Developer",
    duration: "April 2025 - July 2025",
  },
  {
    company: "TechnoHacks Solutions Pvt. Ltd.",
    logo: "/logo/techno.png",
    role: "Python Developer",
    duration: "May 2024 - Jume 2024",
  },

];

const socials = [
  { label: "Twitter", href: "https://x.com/iArpitKaushal", Icon: XIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/im-arpit-kaushal/", Icon: LinkedInIcon },
  { label: "GitHub", href: "https://github.com/arpit-kaushal", Icon: GitHubIcon },
  { label: "Instagram", href: "https://www.instagram.com/iarpitkaushal?igsh=MmR4eWNqdW1iMjRq", Icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/iarpitkaushal", Icon: FacebookIcon },
];

const email = "imarpitkaushal@gmail.com";

export default function AboutPage() {
  return (
    <section className={styles.page}>
      <FloatingEmojis />
      <section className={styles.descriptionSection}>
        <div className={styles.description}>
          
          <h1 className={styles.title}>
          Who Am I?
          </h1>
          
          <p>
          I am someone who believes that every great idea deserves an exceptional presence. 
          With a strong passion for creativity and innovation, 
          I focus on building experiences that are simple, engaging, and meaningful. 
          I enjoy turning ideas into reality through thoughtful design, smooth experiences, and a user-focused approach that ensures every project stands out.
</p>
          <p>
          My journey has been driven by curiosity, continuous learning, and the desire to create solutions that make a real difference. 
          I believe that success comes from understanding people, paying attention to details, and delivering work that combines creativity with purpose.
            </p>

           <p>Every project is an opportunity to create something memorable — something that not only looks impressive but also provides value and leaves a lasting impression.
            </p> 
        </div>
        <div className={styles.photoCard}>
          <img src="/about-photo.png" alt="Arpit profile" />
        </div>
      </section>

      <div className={styles.bottomGrid}>
        <section className={styles.workSection}>
          <h2 className={styles.sectionHeading}>
            <BriefcaseBusiness size={17} /> Work Experience
          </h2>
          <div className={styles.timeline}>
            {experiences.map((experience) => (
              <article className={styles.workCard} key={experience.company}>
                <div className={styles.workInfo}>
                  <span className={styles.companyLogo}>
                    <img src={experience.logo} alt={`${experience.company} logo`} />
                  </span>
                  <div>
                    <h3>
                      <Building2 size={14} /> {experience.company}
                    </h3>
                    <p>{experience.role}</p>
                  </div>
                </div>
                <span>{experience.duration}</span>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.followSection}>
          <div>
            <h2 className={styles.sectionHeading}>
              <Users size={17} /> Follow Me
            </h2>
            <p>Follow my social media accounts for updates, projects, and new work.</p>
            <a className={styles.emailLink} href={`mailto:${email}`}>
              <Mail size={15} />
              {email}
            </a>
          </div>
          <div className={styles.socialGrid}>
            {socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer">
                <Icon size={16} />
                {label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
