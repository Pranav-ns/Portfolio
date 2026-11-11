import type { Metadata } from "next";
import "./globals.css";
import Nimbus from "@/components/pet/Nimbus";

export const metadata: Metadata = {
  title: "Pranav Namah Satish — Full-Stack & AI Engineer",
  description:
    "BSc Computing Science (AI) student at the University of Alberta. Skilled in React, Node.js, Python, AWS, Docker, and AI/ML. Seeking Software Engineering, Cloud, or AI/ML internships.",
  keywords: [
    "Pranav Namah Satish",
    "Full-Stack Developer",
    "AI Engineer",
    "Cloud Developer",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "University of Alberta",
    "Portfolio",
  ],
  authors: [{ name: "Pranav Namah Satish" }],
  openGraph: {
    title: "Pranav Namah Satish — Full-Stack & AI Engineer",
    description:
      "BSc Computing Science (AI) student at the University of Alberta. Skilled in React, Node.js, Python, AWS, Docker, and AI/ML.",
    type: "website",
    url: "https://www.pranavns.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranav Namah Satish — Full-Stack & AI Engineer",
    description:
      "BSc Computing Science (AI) student at the University of Alberta. Full-Stack, Cloud & AI Developer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Nimbus />
      </body>
    </html>
  );
}
