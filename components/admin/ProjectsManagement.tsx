'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, RefreshCw, FolderOpen, Plus, Edit, Trash2, Eye, ExternalLink, Github, Image as ImageIcon } from 'lucide-react'
import { usePortfolioProjects } from '@/lib/hooks'

interface ProjectsManagementProps {
  onDataChange: () => void
  onDataSave: () => void
}

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: string
  featured: boolean
  status: 'completed' | 'in-progress' | 'planned'
  links: {
    live?: string
    github?: string
    demo?: string
  }
  gallery?: string[]
}

export default function ProjectsManagement({ onDataChange, onDataSave }: ProjectsManagementProps) {
  const projects = usePortfolioProjects()
  const [projectsList, setProjectsList] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Available categories and technologies
  const categories = ['Web Development', 'Mobile App', 'UI/UX Design', 'Data Science', 'DevOps', 'Other']
  const commonTechnologies = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java',
    'HTML', 'CSS', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase',
    'AWS', 'Docker', 'Kubernetes', 'Git', 'Figma', 'Adobe XD'
  ]

  // Initialize projects when data loads
  useEffect(() => {
    if (projects) {
      setProjectsList(projects)
    }
  }, [projects])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      localStorage.setItem('admin-projects', JSON.stringify(projectsList))
      onDataSave()
      alert('Projects saved successfully!')
    } catch (error) {
      alert('Error saving projects. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetToDefaults = () => {
    if (confirm('Reset projects to defaults? This will undo all changes.')) {
      import('@/data/projects.json').then((defaultProjects) => {
        // Ensure each project has the required properties
        const projectsWithRequiredProps = defaultProjects.default.map((project: any) => ({
          ...project,
          longDescription: project.overview || project.longDescription || project.description,
          image: project.thumbnail || project.image || '',
          technologies: project.tags || project.technologies || [],
          category: project.category || 'Web Development',
          featured: project.featured || false,
          status: project.status || 'completed',
          links: {
            live: project.links?.live || project.liveUrl,
            github: project.links?.github || project.githubUrl,
            demo: project.links?.demo || project.demoUrl
          },
          gallery: project.images || project.gallery || []
        }))
        setProjectsList(projectsWithRequiredProps)
        onDataChange()
      })
    }
  }

  const addProject = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: 'New Project',
      description: 'Project description',
      longDescription: 'Detailed project description...',
      image: '',
      technologies: ['React', 'TypeScript'],
      category: 'Web Development',
      featured: false,
      status: 'completed',
      links: {},
      gallery: []
    }
    setEditingProject(newProject)
  }

  const editProject = (project: Project) => {
    setEditingProject({ ...project })
  }

  const deleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projectsList.filter(p => p.id !== projectId)
      setProjectsList(updatedProjects)
      onDataChange()
    }
  }

  const saveEditingProject = () => {
    if (!editingProject) return

    const existingIndex = projectsList.findIndex(p => p.id === editingProject.id)
    let updatedProjects

    if (existingIndex >= 0) {
      // Update existing project
      updatedProjects = [...projectsList]
      updatedProjects[existingIndex] = editingProject
    } else {
      // Add new project
      updatedProjects = [...projectsList, editingProject]
    }

    setProjectsList(updatedProjects)
    setEditingProject(null)
    onDataChange()
  }

  const updateEditingProject = (field: string, value: any) => {
    if (!editingProject) return
    setEditingProject({ ...editingProject, [field]: value })
  }

  const updateTechnologies = (technologies: string[]) => {
    if (!editingProject) return
    setEditingProject({ ...editingProject, technologies })
  }

  const addTechnology = (tech: string) => {
    if (!editingProject || editingProject.technologies.includes(tech)) return
    updateTechnologies([...editingProject.technologies, tech])
  }

  const removeTechnology = (tech: string) => {
    if (!editingProject) return
    updateTechnologies(editingProject.technologies.filter(t => t !== tech))
  }

  const updateLinks = (linkType: string, url: string) => {
    if (!editingProject) return
    const newLinks = { ...editingProject.links }
    if (url.trim()) {
      newLinks[linkType as keyof typeof newLinks] = url
    } else {
      delete newLinks[linkType as keyof typeof newLinks]
    }
    setEditingProject({ ...editingProject, links: newLinks })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">Projects Management</h3>
          <p className="text-neutral-600">Manage your portfolio projects</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-2 px-4 py-2 text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-4 py-2 text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Projects List */}
      {!editingProject && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsList.map((project) => (
            <div key={project.id} className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
              {/* Project Image */}
              <div className="aspect-video bg-neutral-100 relative">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-project.jpg'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-neutral-400" />
                  </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                      Featured
                    </span>
                  </div>
                )}
              </div>
              
              {/* Project Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-neutral-900 truncate">{project.title}</h4>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => editProject(project)}
                      className="text-blue-600 hover:text-blue-700 transition-colors p-1"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="text-red-600 hover:text-red-700 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                  <span>{project.category}</span>
                  <span>{project.technologies.length} techs</span>
                </div>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-500 text-xs rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Links */}
                <div className="flex gap-2">
                  {project.links.live && (
                    <ExternalLink className="w-4 h-4 text-green-600" />
                  )}
                  {project.links.github && (
                    <Github className="w-4 h-4 text-neutral-600" />
                  )}
                  {project.links.demo && (
                    <Eye className="w-4 h-4 text-blue-600" />
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {projectsList.length === 0 && (
            <div className="col-span-full text-center py-12">
              <FolderOpen className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600">No projects yet. Add your first project!</p>
            </div>
          )}
        </div>
      )}

      {/* Edit Project Form */}
      {editingProject && (
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-medium text-neutral-900">
              {projectsList.find(p => p.id === editingProject.id) ? 'Edit Project' : 'Add New Project'}
            </h4>
            <div className="flex gap-3">
              <button
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEditingProject}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Save Project
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => updateEditingProject('title', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., E-commerce Platform"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Category
                </label>
                <select
                  value={editingProject.category}
                  onChange={(e) => updateEditingProject('category', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Short Description
              </label>
              <textarea
                value={editingProject.description}
                onChange={(e) => updateEditingProject('description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Brief description for project cards..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Detailed Description
              </label>
              <textarea
                value={editingProject.longDescription}
                onChange={(e) => updateEditingProject('longDescription', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Detailed description for project page..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Main Image URL
              </label>
              <input
                type="url"
                value={editingProject.image}
                onChange={(e) => updateEditingProject('image', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://example.com/project-image.jpg"
              />
            </div>
            
            {/* Status and Featured */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Status
                </label>
                <select
                  value={editingProject.status}
                  onChange={(e) => updateEditingProject('status', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={editingProject.featured}
                    onChange={(e) => updateEditingProject('featured', e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-neutral-700">
                    Featured Project
                  </span>
                </label>
              </div>
            </div>
            
            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Technologies
              </label>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {editingProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                    >
                      {tech}
                      <button
                        onClick={() => removeTechnology(tech)}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {commonTechnologies
                    .filter(tech => !editingProject.technologies.includes(tech))
                    .map((tech) => (
                      <button
                        key={tech}
                        onClick={() => addTechnology(tech)}
                        className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full hover:bg-neutral-200 transition-colors"
                      >
                        + {tech}
                      </button>
                    ))}
                </div>
              </div>
            </div>
            
            {/* Links */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Project Links
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">Live Demo</label>
                  <input
                    type="url"
                    value={editingProject.links.live || ''}
                    onChange={(e) => updateLinks('live', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://project-demo.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">GitHub</label>
                  <input
                    type="url"
                    value={editingProject.links.github || ''}
                    onChange={(e) => updateLinks('github', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://github.com/user/repo"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">Demo Video</label>
                  <input
                    type="url"
                    value={editingProject.links.demo || ''}
                    onChange={(e) => updateLinks('demo', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}