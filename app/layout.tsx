import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import "./globals.css";
import { JsonLd } from "../components/JsonLd";
import { SiteShell } from "../components/SiteShell";
import { rootMetadata } from "../lib/seo";

type Theme = "dark" | "light";

const siteFont = localFont({
  src: "../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
  variable: "--site-font",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = rootMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("portfolio-theme")?.value;
  const initialTheme: Theme = savedTheme === "light" ? "light" : "dark";

  return (
    <html
      lang="en"
      data-theme={initialTheme}
      style={{ colorScheme: initialTheme }}
      suppressHydrationWarning
    >
      <body className={siteFont.variable} suppressHydrationWarning>
        <SiteShell initialTheme={initialTheme}>{children}</SiteShell>
      </body>
    </html>
  );
}
