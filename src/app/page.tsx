import { HeroSection } from '@/components/sections/HeroSection'
import { NetworkSection } from '@/components/sections/NetworkSection'
import { NexTripJourney } from '@/components/sections/NexTripJourney'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { UniversitiesSection } from '@/components/sections/UniversitiesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CtaSection } from '@/components/sections/CtaSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <NetworkSection />
      <NexTripJourney />
      <ServicesSection />
      <HowItWorksSection />
      <UniversitiesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
