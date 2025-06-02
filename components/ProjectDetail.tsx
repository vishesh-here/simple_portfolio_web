'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Calendar, User, Clock, ExternalLink } from 'lucide-react'
import { usePortfolioProjects } from '@/lib/hooks'

interface ProjectDetailProps {
  projectId: string
}

export function ProjectDetail({ projectId }: ProjectDetailProps) {
  const projects = usePortfolioProjects()
  const project = projects.find((p: any) => p.id === projectId)

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Project Not Found</h1>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="container-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-200 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Project Info */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(project.tags || []).map((tag: any) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                  {project.title}
                </h1>

                <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                  {project.description}
                </p>

                {/* Project Meta */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-neutral-400" />
                    <div>
                      <div className="text-sm text-neutral-500">Year</div>
                      <div className="font-medium text-neutral-900">{project.year || new Date().getFullYear()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-neutral-400" />
                    <div>
                      <div className="text-sm text-neutral-500">Client</div>
                      <div className="font-medium text-neutral-900">{project.client || 'Personal Project'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-neutral-400" />
                    <div>
                      <div className="text-sm text-neutral-500">Duration</div>
                      <div className="font-medium text-neutral-900">{project.duration || 'Ongoing'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-5 h-5 text-neutral-400" />
                    <div>
                      <div className="text-sm text-neutral-500">Role</div>
                      <div className="font-medium text-neutral-900">{project.role || 'Full Stack Developer'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={project.thumbnail || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+'}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16">
        <div className="container-width section-padding">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Overview</h2>
              <p className="text-neutral-600 leading-relaxed">
                {project.overview || project.longDescription || project.description || 'Project overview coming soon...'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Challenge</h2>


              <p className="text-neutral-600 leading-relaxed">
                {project.challenge || 'This project presented unique challenges that required innovative solutions and careful planning.'}
              </p>            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Solution</h2>


              <p className="text-neutral-600 leading-relaxed">
                {project.solution || 'The solution involved modern technologies and best practices to deliver a robust and scalable application.'}
              </p>            </motion.div>
          </div>        </div>
      </section>

      {/* Project Images */}
      {(project.images || []).length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="container-width section-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Project Gallery</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Explore different aspects and features of this project through these detailed images.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(project.images || []).map((image: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative h-64 lg:h-72 rounded-xl overflow-hidden shadow-lg bg-white"
                >
                  <Image
                    src={image}
                    alt={`${project.title} - Gallery Image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  
                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                    {index + 1} / {project.images.length}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Gallery Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-8"
            >
              <p className="text-sm text-neutral-500">
                {project.images.length} image{project.images.length !== 1 ? 's' : ''} • Click to view larger
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Detailed Content */}
      <section className="py-16">
        <div className="container-width section-padding">
          <div className="max-w-4xl mx-auto">
            {(project.content || []).map((block: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-12"
              >
                {block.type === 'text' && (
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {block.content || ''}
                    </ReactMarkdown>
                  </div>
                )}

                {block.type === 'image' && (
                  <div className="text-center">
                    <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg mb-4">
                      <Image
                        src={block.src || ''}
                        alt={block.caption || ''}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {block.caption && (
                      <p className="text-neutral-600 italic">{block.caption}</p>
                    )}
                  </div>
                )}

                {block.type === 'table' && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-neutral-300 rounded-lg">
                      <thead>
                        <tr className="bg-neutral-50">
                          {block.headers?.map((header: any, headerIndex: number) => (
                            <th
                              key={headerIndex}
                              className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-900"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows?.map((row: any, rowIndex: number) => (
                          <tr key={rowIndex} className="hover:bg-neutral-50">
                            {(row || []).map((cell: any, cellIndex: number) => (
                              <td
                                key={cellIndex}
                                className="border border-neutral-300 px-4 py-3 text-neutral-600"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      {(project.results && project.results.length > 0) ? (
        <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
          <div className="container-width section-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Results & Impact</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                The measurable outcomes and positive impact of this project.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.results.map((result: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card text-center"
                >
                  <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-2">
                    {typeof result === 'string' ? result.split(' ')[0] : '✓'}
                  </div>
                  <div className="text-neutral-600">
                    {typeof result === 'string' ? result.split(' ').slice(1).join(' ') : result}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Call to Action */}
      <section className="py-16 bg-neutral-900">
        <div className="container-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Interested in working together?
            </h2>
            <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and see how I can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact" className="btn-primary">
                Start a Project
              </Link>
              <Link href="/#projects" className="btn-outline">
                View More Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}