import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Selected projects by Arpit Kaushal — AI social media tools, WhatsApp automation, task management, smart home systems, and more.",
  path: "/projects",
});

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
