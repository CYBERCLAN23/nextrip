import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ScrollAnimations } from "@/components/scroll/ScrollAnimations";

export const metadata: Metadata = {
  title: "NexTrip | Your Gateway To Global Education",
  description:
    "Discover world-class universities, scholarships, and study-abroad opportunities worldwide with personalized guidance throughout your journey.",
  openGraph: {
    title: "NexTrip | Your Gateway To Global Education",
    description:
      "Discover universities, scholarships and study abroad opportunities worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider defaultMode="system" attribute="class">
          <ScrollAnimations />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

