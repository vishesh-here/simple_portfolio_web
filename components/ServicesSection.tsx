'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Target, Palette, Code, Users, ArrowRight } from 'lucide-react'
import { usePortfolioConfig } from '@/lib/hooks'

const iconMap = {
  target: Target,
  palette: Palette,
  code: Code,
  users: Users,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export function ServicesSection() {  const config = usePortfolioConfig()
  
  // Return loading state if config is not yet loaded
  if (!config) {
    return (
      <section id="services" className="py-20 lg:py-32 bg-white">
        <div className="container-width section-padding text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading...</p>
        </div>
      </section>
    )
  }
  const { services } = config

  return (
    <section id="services" className="py-20 lg:py-32 bg-white">
      <div className="container-width section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            What I Do
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            I help businesses create exceptional digital experiences through strategic design and user-centered thinking.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service: any) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Target

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="card h-full text-center hover:shadow-xl transition-all duration-300">
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center group-hover:from-primary-200 group-hover:to-accent-200 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-primary-600" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-neutral-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-200">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4">
              Ready to work together?
            </h3>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and see how I can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary">
                Start a Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a href="mailto:hello@alexmorgan.dev" className="btn-outline">
                Send a Message
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}