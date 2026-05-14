import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Arpit Portfolio",
  description: "Modern portfolio built with Next.js, React, TypeScript, and Node.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
