import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { UniversitiesSection } from '@/components/sections/UniversitiesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CtaSection } from '@/components/sections/CtaSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ServicesSection />
      <HowItWorksSection />
      <UniversitiesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}
