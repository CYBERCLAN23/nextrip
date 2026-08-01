import type { Metadata } from 'next'
import './globals.css'
import { LenisProvider } from '@/providers/LenisProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { CroquisToggle } from '@/components/ui/CroquisToggle'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'NexTrip Global Limited | The Route to China',
  description:
    'NexTrip Global Limited — an international education registry. Find your route to a QS-ranked Chinese university, with scholarships, admissions, and a clear departure.',
  keywords: ['study abroad', 'international education', 'scholarships', 'China universities', 'admissions'],
  openGraph: {
    title: 'NexTrip Global Limited',
    description: 'Study in China with NexTrip — a clear, documented route to admission and scholarship.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Instrument+Serif:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* THESIS: international study is a departure document being drawn up, not a sales pitch — a stone-paper registry in deep indigo ink, with one porcelain-blue accent reserved for "China open". It refuses the warm-cream-with-terracotta and near-black-with-neon landing-page defaults. OWN-WORLD: warm stone paper (rr-paper), deep indigo ink (rr-ink) as the working line, one porcelain-blue accent (rr-blue) for open routes and action, hairline registry rules, mono registry labels and ledger coordinates, perforation dashes, an indigo dye-dip gradient on the route map plate. STORY: the visitor reads China as OPEN, sees their route drawn on the indigo route map, and files their departure. FIRST VIEWPORT: an asymmetric registry spread — departure record card on the left with route table and STATUS OPEN, the self-drawing indigo route map plate on the right, both CTAs in reach. FORM: indigo-registry document world, seed 65b5878c. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md */}
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          <main style={{ minHeight: '100vh', overflowX: 'hidden' }}>
            {children}
          </main>
          <Footer />
          <CroquisToggle />
        </LenisProvider>
      </body>
    </html>
  )
}
