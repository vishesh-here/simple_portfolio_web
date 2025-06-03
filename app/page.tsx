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
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Portfolio Loading...</h1>
      </div>
      {/* Temporarily comment out all sections to test
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <CareerSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      */}
    </>
  )
}