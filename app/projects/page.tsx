'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { usePortfolioProjects } from '@/lib/hooks'
import { Project } from '@/lib/types'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function ProjectsPage() {
  const projectsData = usePortfolioProjects()
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [selectedTag, setSelectedTag] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState<string>('')

  // Show loading state if projects data is not yet loaded
  if (!projectsData || !Array.isArray(projectsData)) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-20">
        <div className="container-width section-padding py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading projects...</p>
        </div>
      </div>
    )
  }

  // Update filtered projects when projectsData changes
  useEffect(() => {
    setFilteredProjects(projectsData)
  }, [projectsData])

  // Get all unique tags
  const allTags = ['All', ...Array.from(new Set(projectsData.flatMap((project: Project) => project.tags)))]

  // Filter projects based on selected tag and search term
  useEffect(() => {
    let filtered = projectsData

    if (selectedTag !== 'All') {
      filtered = filtered.filter((project: Project) => project.tags.includes(selectedTag))
    }

    if (searchTerm) {
      filtered = filtered.filter((project: Project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProjects(filtered)
  }, [projectsData, selectedTag, searchTerm])

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-width section-padding py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            All Projects
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Explore my complete portfolio of design and development work, 
            showcasing solutions across various industries and technologies.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-neutral-500" />
              {allTags.map((tag: string) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    selectedTag === tag
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-neutral-600">
            Showing {filteredProjects.length} of {projectsData.length} projects
            {selectedTag !== 'All' && ` in "${selectedTag}"`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group"
            >
              <Link href={`/projects/${project.id}`}>
                <div className="card hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="relative overflow-hidden rounded-lg mb-6">
                    <Image
                      src={project.thumbnail || '/images/placeholder-project.jpg'}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags && project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags && project.tags.length > 3 && (
                        <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-sm rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">
                      {project.title}
                    </h3>
                    
                    <p className="text-neutral-600 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div className="text-sm text-neutral-500">
                        {project.client} • {project.year}
                      </div>
                      <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-200">
                        View Project
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <p className="text-neutral-600 text-lg">
              No projects found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSelectedTag('All')
                setSearchTerm('')
              }}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}