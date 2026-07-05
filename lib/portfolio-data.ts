export type SocialPlatform =
  | "twitter"
  | "linkedin"
  | "github"
  | "instagram"
  | "facebook";

export type SkillIconKey =
  | "code"
  | "fileCode"
  | "zap"
  | "layout"
  | "pencil"
  | "refresh"
  | "database"
  | "network"
  | "sparkles"
  | "git"
  | "terminal"
  | "flask"
  | "monitor"
  | "cable";

export type Project = {
  title: string;
  image: string;
  github: string;
  live?: string;
  description: string;
};

export const resume = {
  label: "Resume",
  href: "/Arpit-Kaushal.pdf",
} as const;

export const socialMedia: ReadonlyArray<{
  platform: SocialPlatform;
  label: string;
  href: string;
}> = [
  { platform: "twitter", label: "X / Twitter", href: "https://x.com/iArpitKaushal" },
  { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/im-arpit-kaushal/" },
  { platform: "github", label: "GitHub", href: "https://github.com/arpit-kaushal" },
  { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/iarpitkaushal" },
  { platform: "facebook", label: "Facebook", href: "https://www.facebook.com/iarpitkaushal" },
];

export const roles = [
  "Frontend Developer",
  "Web Developer",
  "Software Engineer",
  "React Developer",
  "Python Developer",
  "AI Application Developer",
  "Full Stack Engineer",
  "Technology Enthusiast",
] as const;

export const skills: ReadonlyArray<{
  name: string;
  icon: SkillIconKey;
  color: string;
}> = [
  { name: "Python", icon: "code", color: "#3776ab" },
  { name: "C++", icon: "fileCode", color: "#00599c" },
  { name: "JavaScript", icon: "zap", color: "#f7df1e" },
  { name: "HTML", icon: "layout", color: "#e34f26" },
  { name: "CSS", icon: "pencil", color: "#1572b6" },
  { name: "React", icon: "refresh", color: "#61dafb" },
  { name: "MySQL", icon: "database", color: "#00758f" },
  { name: "Machine Learning", icon: "network", color: "#22c55e" },
  { name: "Generative AI", icon: "sparkles", color: "#a78bfa" },
  { name: "GitHub", icon: "git", color: "#f8fafc" },
  { name: "VS Code", icon: "terminal", color: "#007acc" },
  { name: "Unit Testing", icon: "flask", color: "#2ead33" },
  { name: "Debugging", icon: "monitor", color: "#fb7185" },
  { name: "Agile Methodology", icon: "git", color: "#f97316" },
  { name: "SDLC", icon: "cable", color: "#38bdf8" },
];

export const experiences = [
  {
    company: "Kohli Media LLP",
    role: "Web Developer",
    duration: "April 2025 - July 2025",
    description:
      "Developed responsive web applications, improved usability and performance, addressed implementation challenges, and supported the delivery of scalable, production-ready solutions.",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Web Design", "UI Optimization", "Cross-Browser Testing"],
  },
  {
    company: "TechnoHacks Solutions Pvt. Ltd.",
    role: "Python Developer",
    duration: "May 2024 - June 2024",
    description:
      "Worked on Python-based application development, improved workflow efficiency, and enhanced software quality through testing, troubleshooting, and continuous refinement.",
    skills: ["Python", "Code Optimization", "Unit Testing", "Debugging", "SDLC"],
  },
] as const;

export const projects: ReadonlyArray<Project> = [
  {
    title: "Social Media Studio",
    image: "/project_asset/Social Media Studio.png",
    github: "https://github.com/arpit-kaushal/Social-Media-Studio",
    live: "https://social-media-studio-arpit.vercel.app/",
    description: "AI-powered platform that transforms simple ideas into customizable, export-ready social media carousels with smart design automation.",
  },
  {
    title: "WhatsApp Automation Bot",
    image: "/project_asset/WhatsApp Automation Bot.png",
    github: "https://github.com/arpit-kaushal/WhatsApp-automation-bot",
    description: "WhatsApp automation bot with a local dashboard, smart message responses, live status tracking, and persistent sessions.",
  },
  {
    title: "Task Management System",
    image: "/project_asset/Task Management System.png",
    github: "https://github.com/arpit-kaushal/Task-Management-System",
    live: "https://task-mgmt-systm.vercel.app/",
    description: "Secure task management system with JWT authentication, responsive dashboard, task filtering, pagination, and full CRUD operations.",
  },
  {
    title: "Smart Home Automation",
    image: "/project_asset/Smart Home Automation.jpg",
    github: "https://github.com/arpit-kaushal/Smart-Home-Automation",
    description: "Integrated hardware and software based smart home automation system designed for seamless remote, voice, and manual appliance control.",
  },
  {
    title: "FIFO Design with Self-Checking Testbench",
    image: "/project_asset/FIFO Design with Self-Checking Testbench.jpeg",
    github: "https://github.com/arpit-kaushal/FIFO-Design-Self-Checking-Testbench",
    description: "Parameterized FIFO memory design with self-checking verification system for reliable data buffering and digital hardware communication applications.",
  },
  {
    title: "Power Consumption Monitoring & Prediction System",
    image: "/project_asset/Power Consumption Monitoring & Prediction System.png",
    github: "https://github.com/arpit-kaushal/Power-Consumption-Monitoring-Prediction-System",
    description: "Integrated IoT hardware and software system for real-time power monitoring, cloud logging, and intelligent energy consumption forecasting.",
  },
  {
    title: "Web Scraper",
    image: "/project_asset/Web Scraper.png",
    github: "https://github.com/arpit-kaushal/Web-Scraper-Scrapify-",
    description: "Web scraping and intelligent content analysis platform with AI-powered summarization, contextual chatbot interaction, and dynamic model selection.",
  },
  {
    title: "Crop Disease Predictor",
    image: "/project_asset/Crop Disease Predictor.png",
    github: "https://github.com/arpit-kaushal/Crop-Disease-Predictor",
    description: "Machine learning based crop disease detection system that analyzes uploaded plant images to identify and predict crop infections accurately.",
  },
  {
    title: "Vehicle Detection and Counting using OpenCV",
    image: "/project_asset/Vehicle Detection and Counting using OpenCV.jpg",
    github: "https://github.com/arpit-kaushal/Vehicle-Detection-and-Counting-using-OpenCV",
    description: "Computer vision based vehicle detection and counting system for real-time traffic monitoring and automated vehicle flow analysis.",
  },
  {
    title: "Eye Controlled Mouse Using Mediapipe and OpenCV",
    image: "/project_asset/Eye Controlled Mouse Using Mediapipe and OpenCV.jpeg",
    github: "https://github.com/arpit-kaushal/Eye-Controlled-Mouse-Using-Mediapipe-and-OpenCV",
    description: "Hands-free eye-controlled mouse system that enables real-time cursor movement and click operations using facial landmark tracking.",
  },
];
