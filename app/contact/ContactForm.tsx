"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import styles from "./page.module.css";

type ContactState = {
  name: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const [contact, setContact] = useState<ContactState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to send message.");
      }

      setStatus(result.message || "Message sent successfully.");
      setContact({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to send message.");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        placeholder="Your name"
        value={contact.name}
        onChange={(event) => setContact({ ...contact, name: event.target.value })}
        required
      />
      <input
        placeholder="Your email"
        type="email"
        value={contact.email}
        onChange={(event) => setContact({ ...contact, email: event.target.value })}
        required
      />
      <textarea
        placeholder="Your message"
        value={contact.message}
        onChange={(event) => setContact({ ...contact, message: event.target.value })}
        required
      />
      <button type="submit">
        Send Email <Send size={17} />
      </button>
      {status && <p className={styles.status}>{status}</p>}
    </form>
  );
}
