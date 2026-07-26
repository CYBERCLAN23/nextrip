import { Hero } from "@/components/hero/Hero";
import { TrustSection } from "@/components/trust/TrustSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { StickyScrollCardsSection } from "@/components/journey/StickyScrollCardsSection";
import { UniversitiesSection } from "@/components/universities/UniversitiesSection";
import { DestinationSection } from "@/components/destinations/DestinationSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { ResourcesSection } from "@/components/resources/ResourcesSection";
import { FAQSection } from "@/components/faq/FAQSection";
import { CTASection } from "@/components/cta/CTASection";
import { ScrollAnimations } from "@/components/scroll/ScrollAnimations";

export default function HomePage() {
  return (
    <main style={{ position: "relative", width: "100%" }}>
      {/* Global scroll-driven entrance animations */}
      <ScrollAnimations />

      {/* Sections that need horizontal overflow clipping */}
      <div style={{ overflowX: "clip" }}>
        {/* Hero — has its own animation logic */}
        <Hero />

        {/* Trust / Services */}
        <TrustSection />

        <ServicesSection />
      </div>

      {/* ── Sticky Scroll Cards — MUST be outside overflow:clip wrapper ── */}
      {/* position:sticky only works when NO ancestor has overflow:hidden/clip */}
      <StickyScrollCardsSection />

      <div style={{ overflowX: "clip" }}>
        <div data-scroll-section>
          <UniversitiesSection />
        </div>

        {/* Destinations — has its own horizontal scrub pin */}
        <DestinationSection />

        <div data-scroll-section>
          <TestimonialsSection />
        </div>

        <div data-scroll-section>
          <ResourcesSection />
        </div>

        <div data-scroll-section>
          <FAQSection />
        </div>

        <div data-scroll-section>
          <CTASection />
        </div>
      </div>
    </main>
  );
}

