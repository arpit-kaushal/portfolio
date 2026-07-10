import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Showcase",
  description:
    "Achievements, certifications, and extracurricular highlights from Arpit Kaushal — scholarships, internships, and professional milestones.",
  path: "/showcase",
});

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
