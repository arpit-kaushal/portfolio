import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Arpit Kaushal",
  description: "Portfolio website of Arpit Kaushal.",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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
