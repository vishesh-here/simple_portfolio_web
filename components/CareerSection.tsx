'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Briefcase } from 'lucide-react'
import { formatDate, calculateDuration } from '@/lib/utils'
import { usePortfolioCareer } from '@/lib/hooks'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export function CareerSection() {
  const career = usePortfolioCareer()

  // Show loading state if career data is not loaded yet
  if (!career || !Array.isArray(career) || career.length === 0) {
    return (
      <section id="career" className="py-20 lg:py-32 bg-white">
        <div className="container-width section-padding">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section id="career" className="py-20 lg:py-32 bg-white">
      <div className="container-width section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Career Journey
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            My professional journey from frontend developer to senior product designer, working with startups and enterprises.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200 hidden lg:block" />

            {career && Array.isArray(career) && career.map((role: any) => (
              <motion.div
                key={role.id}
                variants={itemVariants}
                className="relative mb-12 lg:mb-16 last:mb-0"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg hidden lg:block" />

                <div className="lg:ml-20">
                  <div className="card hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900">
                            {role.title}
                          </h3>
                          {role.current && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-neutral-600 mb-3">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            <span className="font-medium">{role.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{role.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-neutral-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {role.startDate ? formatDate(role.startDate) : 'N/A'} - {role.endDate ? formatDate(role.endDate) : 'Present'}
                        </span>
                        <span className="text-neutral-400">•</span>
                        <span>{role.startDate ? calculateDuration(role.startDate, role.endDate) : 'N/A'}</span>
                      </div>
                    </div>

                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {role.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="font-medium text-neutral-900 mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {role.achievements.map((achievement: any, achievementIndex: number) => (
                          <li key={achievementIndex} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-neutral-600">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-3">Skills & Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill: any) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full border border-primary-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Download Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Want to know more about my experience?
            </h3>
            <p className="text-neutral-600 mb-6">
              Download my full resume for detailed information about my background and accomplishments.
            </p>
            <a
              href="/resume.pdf"
              download
              className="btn-primary"
            >
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}