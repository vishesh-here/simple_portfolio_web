'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart, Coffee, Mountain, BookOpen, Music } from 'lucide-react'
import { usePortfolioConfig } from '@/lib/hooks'

const iconMap = {
  '🎸': Music,
  '🏔️': Mountain,
  '📚': BookOpen,
  '☕': Coffee,
  '🎨': Heart,
}

export function AboutSection() {
  const config = usePortfolioConfig()
  
  // Return loading state if config is not yet loaded
  if (!config || !config.about) {
    return (
      <section id="about" className="py-20 lg:py-32">
        <div className="container-width section-padding text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading...</p>
        </div>
      </section>
    )
  }
  const { about } = config

  return (
    <section id="about" className="py-20 lg:py-32 bg-neutral-50">
      <div className="container-width section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            About Me
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Beyond design and technology, here's what makes me tick.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-neutral-900">
                My Story
              </h3>
              
              <p className="text-lg text-neutral-600 leading-relaxed">
                {about.story}
              </p>

              <div>
                <h4 className="text-xl font-semibold text-neutral-900 mb-4">
                  Fun Facts About Me
                </h4>
                <div className="space-y-3">
                  {about.funFacts.map((fact: any, index: number) => {
                    const emoji = fact.split(' ')[0]
                    const text = fact.split(' ').slice(1).join(' ')
                    const IconComponent = iconMap[emoji as keyof typeof iconMap] || Heart

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-primary-600" />
                        </div>
                        <span className="text-neutral-700">{text}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Skills/Interests */}
              <div>
                <h4 className="text-xl font-semibold text-neutral-900 mb-4">
                  What I'm passionate about
                </h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Design Systems',
                    'User Research',
                    'Accessibility',
                    'Mentoring',
                    'Indie Music',
                    'Hiking',
                    'Photography',
                    'Coffee Culture'
                  ].map((interest) => (
                    <span
                      key={interest}
                      className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-neutral-700 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Background Elements */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-200 to-accent-200 rounded-2xl opacity-20 blur-xl" />
              
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl p-4 shadow-lg">
                <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden">
                  <Image
                    src={about.image || '/images/placeholder-about.jpg'}
                    alt="About Alex Morgan"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-neutral-200"
              >
                <div className="flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-amber-600" />
                  <span className="text-sm font-medium text-neutral-900">Coffee Lover</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-neutral-200"
              >
                <div className="flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-neutral-900">Adventure Seeker</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-xl lg:text-2xl font-medium text-neutral-700 italic">
              "Great design is not just about making things look beautiful—it's about making them work beautifully for the people who use them."
            </blockquote>
            <cite className="block mt-4 text-neutral-500">— My design philosophy</cite>
          </div>
        </motion.div>
      </div>
    </section>
  )
}