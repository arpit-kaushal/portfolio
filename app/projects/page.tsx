import {
  Code,
  ExternalLink,
} from "lucide-react";
import { FloatingProjectIcons } from "./FloatingProjectIcons";
import styles from "./page.module.css";

const projects = [
  {
    title: "Social Media Studio",
    image: "/project_asset/Social Media Studio.png",
    github: "https://github.com/arpit-kaushal/Social-Media-Studio",
    live: "https://social-media-studio-arpit.vercel.app/",
    description:
      "AI-powered platform that transforms simple ideas into customizable, export-ready social media carousels with smart design automation.",
  },
  {
    title: "WhatsApp Automation Bot",
    image: "/project_asset/WhatsApp Automation Bot.png",
    github: "https://github.com/arpit-kaushal/WhatsApp-automation-bot",
    
    description:
      "WhatsApp automation bot with a local dashboard, smart message responses, live status tracking, and persistent sessions.",
  },
  {
    title: "Task Management System",
    image: "/project_asset/Task Management System.png",
    github: "https://github.com/arpit-kaushal/Task-Management-System",
    live: "https://task-mgmt-systm.vercel.app/",
    description:
      "Secure task management system with JWT authentication, responsive dashboard, task filtering, pagination, and full CRUD operations.",
  },
  {
    title: "Smart Home Automation",
    image: "/project_asset/Smart Home Automation.jpg",
    github: "https://github.com/arpit-kaushal/Smart-Home-Automation",
  
    description:
      "Integrated hardware and software based smart home automation system designed for seamless remote, voice, and manual appliance control.",
  },
  {
    title: "FIFO Design with Self-Checking Testbench",
    image: "/project_asset/FIFO Design with Self-Checking Testbench.jpeg",
    github: "https://github.com/arpit-kaushal/FIFO-Design-Self-Checking-Testbench",
  
    description:
      "Parameterized FIFO memory design with self-checking verification system for reliable data buffering and digital hardware communication applications.",
  },
  {
    title: "Power Consumption Monitoring & Prediction System",
    image: "/project_asset/Power Consumption Monitoring & Prediction System.png",
    github: "https://github.com/arpit-kaushal/Power-Consumption-Monitoring-Prediction-System",
  
    description:
      "Integrated IoT hardware and software system for real-time power monitoring, cloud logging, and intelligent energy consumption forecasting.",
  },
  {
    title: "Web Scraper",
    image: "/project_asset/Web Scraper.png",
    github: "https://github.com/arpit-kaushal/Web-Scraper-Scrapify-",

    description:
      "Web scraping and intelligent content analysis platform with AI-powered summarization, contextual chatbot interaction, and dynamic model selection.",
  },
  {
    title: "Crop Disease Predictor",
    image: "/project_asset/Crop Disease Predictor.png",
    github: "https://github.com/arpit-kaushal/Crop-Disease-Predictor",
   
    description:
      "Machine learning based crop disease detection system that analyzes uploaded plant images to identify and predict crop infections accurately.",
  },
  {
    title: "Vehicle Detection and Counting using OpenCV",
    image: "/project_asset/Vehicle Detection and Counting using OpenCV.jpg",
    github: "https://github.com/arpit-kaushal/Vehicle-Detection-and-Counting-using-OpenCV",
 
    description:
      "Computer vision based vehicle detection and counting system for real-time traffic monitoring and automated vehicle flow analysis.",
  },
  {
    title: "Eye Controlled Mouse Using Mediapipe and OpenCV",
    image: "/project_asset/Eye Controlled Mouse Using Mediapipe and OpenCV.jpeg",
    github: "https://github.com/arpit-kaushal/Eye-Controlled-Mouse-Using-Mediapipe-and-OpenCV",
   
    description:
      "Hands-free eye-controlled mouse system that enables real-time cursor movement and click operations using facial landmark tracking.",
  }

];

export default function ProjectsPage() {
  return (
    <section className={styles.page}>
      <FloatingProjectIcons />

      <h1 className={styles.title}>A Collection of Dedication and Innovation</h1>

      <div className={styles.grid}>
        {projects.map((project) => (
          <article className={styles.card} key={project.title}>
            <div className={styles.imageWrap}>
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className={styles.projectImage}
              />
            </div>
            <div className={styles.cardHeader}>
              <h2>{project.title}</h2>
            </div>
            <div className={styles.reveal}>
              <p>{project.description}</p>
              <div className={styles.links}>
                <a href={project.github} target="_blank" rel="noreferrer">
                  <Code size={16} /> GitHub
                </a>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer">
                    <ExternalLink size={16} /> Live
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
