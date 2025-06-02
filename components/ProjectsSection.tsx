'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { usePortfolioProjects } from '@/lib/hooks'
import { Project } from '@/lib/types'

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

export function ProjectsSection() {  const projectsData = usePortfolioProjects()
    // Show only first 3 projects on homepage
  const featuredProjects = projectsData.slice(0, 3)

  return (
    <section id="projects" className="py-20 lg:py-32 bg-neutral-50">
      <div className="container-width section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            A selection of recent work that showcases my approach to solving complex design challenges.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8 mb-12"
        >
          {featuredProjects.map((project: any) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link href={`/projects/${project.id}`}>
                <div className="card h-full overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Project Image */}
                  <div className="relative h-48 mb-6 -m-6 mb-6">
                    <Image
                      src={project.thumbnail || '/images/placeholder-project.jpg'}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary-600 font-medium">
                        {project.year}
                      </span>
                      <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary-600 transition-colors duration-200" />
                    </div>

                    <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">
                      {project.title}
                    </h3>

                    <p className="text-neutral-600 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-neutral-100 text-neutral-600 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-sm rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Read More */}
                    <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-200 pt-2">
                      View Case Study
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/projects" className="btn-outline group">
            View All Projects
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}