import { ContactForm } from "./ContactForm";
import { FloatingSocialIcons } from "./FloatingSocialIcons";
import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <section className={styles.page}>
      <FloatingSocialIcons />
      <h1 className={styles.title}>Let’s Connect</h1>
      <div className={styles.contactGrid}>
        <div className={styles.intro}>
          <p className={styles.copy}>
            I believe great ideas begin with meaningful conversations. Whether
            you have a question, a project idea, a collaboration opportunity, or
            simply want to connect, I’d love to hear from you. Every message
            matters, and I’m committed to responding with attention,
            professionalism, and genuine interest. If you’re looking for someone
            who values creativity, quality, and collaboration, this is the
            perfect place to start.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
