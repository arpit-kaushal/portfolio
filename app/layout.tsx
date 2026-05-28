import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteShell } from "../components/SiteShell";

const siteFont = localFont({
  src: "../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
  variable: "--site-font",
  display: "swap",
  weight: "100 900",
});

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
      <body className={siteFont.variable} suppressHydrationWarning>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
