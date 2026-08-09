import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { portfolioData } from "@/data/portfolio";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? portfolioData.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${portfolioData.name} | ${portfolioData.title}`,
    template: `%s | ${portfolioData.name}`,
  },
  description: portfolioData.intro,
  applicationName: `${portfolioData.name} Portfolio`,
  authors: [{ name: portfolioData.name, url: siteUrl }],
  creator: portfolioData.name,
  keywords: [
    "Aashutosh Sharma",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Portfolio",
    "Indore",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: `${portfolioData.name} | ${portfolioData.title}`,
    description: portfolioData.intro,
    siteName: portfolioData.name,
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: portfolioData.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioData.name} | ${portfolioData.title}`,
    description: portfolioData.intro,
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
