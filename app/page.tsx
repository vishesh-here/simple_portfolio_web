import { HeroSection } from '@/components/HeroSection'
import { ServicesSection } from '@/components/ServicesSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { CareerSection } from '@/components/CareerSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { AboutSection } from '@/components/AboutSection'
import { ContactSection } from '@/components/ContactSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <CareerSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
    </>
  )
}