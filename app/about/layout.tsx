import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Learn about Arpit Kaushal — background, work experience at Kohli Media LLP and TechnoHacks, and ways to connect on social media.",
  path: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
