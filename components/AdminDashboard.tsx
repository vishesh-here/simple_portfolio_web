'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X, Eye, Settings, Upload, Image, HelpCircle } from 'lucide-react'
import { useLocalStorage } from '@/lib/hooks'
import projects from '@/data/projects.json'

interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  tags: string[]
  year: string
  client: string
  duration: string
  role: string
  overview: string
  challenge: string
  solution: string
  results: string[]
  images: string[]
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'projects' | 'settings' | 'help'>('projects')
  const [localProjects, setLocalProjects] = useLocalStorage<Project[]>('portfolio-projects', projects)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const emptyProject: Project = {
    id: '',
    title: '',
    description: '',
    thumbnail: '',
    tags: [],
    year: new Date().getFullYear().toString(),
    client: '',
    duration: '',
    role: '',
    overview: '',
    challenge: '',
    solution: '',
    results: [],
    images: [],
  }

  const handleCreateProject = () => {
    setEditingProject({ ...emptyProject, id: `project-${Date.now()}` })
    setIsCreating(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject({ ...project })
    setIsCreating(false)
  }

  const handleSaveProject = () => {
    if (!editingProject) return

    if (isCreating) {
      setLocalProjects([...localProjects, editingProject])
    } else {
      setLocalProjects(localProjects.map((p: Project) => 
        p.id === editingProject.id ? editingProject : p
      ))
    }

    setEditingProject(null)
    setIsCreating(false)
  }

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setLocalProjects(localProjects.filter((p: Project) => p.id !== id))
    }
  }

  const handleCancel = () => {
    setEditingProject(null)
    setIsCreating(false)
  }

  const updateEditingProject = <K extends keyof Project>(field: K, value: Project[K]) => {
    if (!editingProject) return
    setEditingProject({ ...editingProject, [field]: value })
  }

  const addTag = (tag: string) => {
    if (!editingProject || !tag.trim()) return
    const newTags = [...editingProject.tags, tag.trim()]
    updateEditingProject('tags', newTags)
  }

  const removeTag = (index: number) => {
    if (!editingProject) return
    const newTags = editingProject.tags.filter((_: string, i: number) => i !== index)
    updateEditingProject('tags', newTags)
  }

  const addResult = (result: string) => {
    if (!editingProject || !result.trim()) return
    const newResults = [...editingProject.results, result.trim()]
    updateEditingProject('results', newResults)
  }

  const removeResult = (index: number) => {
    if (!editingProject) return
    const newResults = editingProject.results.filter((_: string, i: number) => i !== index)
    updateEditingProject('results', newResults)
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-width section-padding py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === 'projects'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === 'settings'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                Settings
              </button>
              <button
                onClick={() => setActiveTab('help')}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === 'help'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <HelpCircle className="w-4 h-4 inline mr-2" />
                Help
              </button>
            </div>
          </div>

          {activeTab === 'projects' && (
            <div>
              {!editingProject ? (
                <>
                  {/* Projects List */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-neutral-900">
                      Projects ({localProjects.length})
                    </h2>
                    <button
                      onClick={handleCreateProject}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Project
                    </button>
                  </div>

                  <div className="grid gap-6">
                    {localProjects.map((project: Project) => (
                      <div key={project.id} className="card">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                              {project.title}
                            </h3>
                            <p className="text-neutral-600 mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.tags.slice(0, 3).map((tag: string) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 3 && (
                                <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                                  +{project.tags.length - 3}
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-neutral-500">
                              {project.client} • {project.year}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => window.open(`/projects/${project.id}`, '_blank')}
                              className="p-2 text-neutral-400 hover:text-primary-600 transition-colors duration-200"
                              title="View Project"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditProject(project)}
                              className="p-2 text-neutral-400 hover:text-primary-600 transition-colors duration-200"
                              title="Edit Project"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="p-2 text-neutral-400 hover:text-red-600 transition-colors duration-200"
                              title="Delete Project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Project Editor */
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-neutral-900">
                      {isCreating ? 'Create New Project' : 'Edit Project'}
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProject}
                        className="btn-primary flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn-outline flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={editingProject.title}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEditingProject('title', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter project title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={editingProject.description}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateEditingProject('description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Brief project description"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Client
                          </label>
                          <input
                            type="text"
                            value={editingProject.client}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEditingProject('client', e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Client name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Year
                          </label>
                          <input
                            type="text"
                            value={editingProject.year}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEditingProject('year', e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="2023"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={editingProject.duration}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEditingProject('duration', e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="3 months"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Role
                          </label>
                          <input
                            type="text"
                            value={editingProject.role}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEditingProject('role', e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Lead Designer"
                          />
                        </div>
                      </div>

                      {/* Image Upload Section */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Thumbnail Image
                          </label>
                          <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                            <p className="text-sm text-neutral-600 mb-2">
                              Upload thumbnail image or enter URL
                            </p>
                            <input
                              type="text"
                              value={editingProject.thumbnail}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEditingProject('thumbnail', e.target.value)}
                              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="/images/projects/project-thumb.jpg"
                            />
                            <p className="text-xs text-neutral-500 mt-2">
                              Place images in <code>public/images/projects/</code> folder
                            </p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Project Images
                          </label>
                          <div className="space-y-2">
                            {editingProject.images.map((image: string, index: number) => (
                              <div key={index} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={image}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const newImages = [...editingProject.images]
                                    newImages[index] = e.target.value
                                    updateEditingProject('images', newImages)
                                  }}
                                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  placeholder="/images/projects/project-1.jpg"
                                />
                                <button
                                  onClick={() => {
                                    const newImages = editingProject.images.filter((_: string, i: number) => i !== index)
                                    updateEditingProject('images', newImages)
                                  }}
                                  className="p-2 text-red-500 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const newImages = [...editingProject.images, '']
                                updateEditingProject('images', newImages)
                              }}
                              className="w-full px-3 py-2 border-2 border-dashed border-neutral-300 rounded-lg text-neutral-600 hover:border-primary-300 hover:text-primary-600 transition-colors"
                            >
                              <Plus className="w-4 h-4 inline mr-2" />
                              Add Image URL
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Tags
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {editingProject.tags.map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                            >
                              {tag}
                              <button
                                onClick={() => removeTag(index)}
                                className="text-primary-500 hover:text-primary-700"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                        <input
                          type="text"
                          placeholder="Add a tag and press Enter"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                              addTag(e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Detailed Info */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Overview
                        </label>
                        <textarea
                          value={editingProject.overview}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateEditingProject('overview', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Project overview"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Challenge
                        </label>
                        <textarea
                          value={editingProject.challenge}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateEditingProject('challenge', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="What was the main challenge?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Solution
                        </label>
                        <textarea
                          value={editingProject.solution}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateEditingProject('solution', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="How did you solve it?"
                        />
                      </div>

                      {/* Results */}
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Results
                        </label>
                        <div className="space-y-2 mb-2">
                          {editingProject.results.map((result: string, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={result}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  const newResults = [...editingProject.results]
                                  newResults[index] = e.target.value
                                  updateEditingProject('results', newResults)
                                }}
                                className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              />
                              <button
                                onClick={() => removeResult(index)}
                                className="p-2 text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <input
                          type="text"
                          placeholder="Add a result and press Enter"
                          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                              addResult(e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-primary-600" />
                <h2 className="text-xl font-semibold text-neutral-900">Settings</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-800 mb-2">Development Mode</h3>
                  <p className="text-yellow-700 text-sm">
                    This admin panel stores data locally in your browser. In a production environment, 
                    you would integrate with a proper CMS or database.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-neutral-900 mb-3">Data Management</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        const data = JSON.stringify(localProjects, null, 2)
                        const blob = new Blob([data], { type: 'application/json' })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = 'portfolio-projects.json'
                        a.click()
                      }}
                      className="btn-outline"
                    >
                      Export Projects
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('This will reset all projects to default. Continue?')) {
                          setLocalProjects(projects)
                        }
                      }}
                      className="btn-outline text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Reset to Default
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
          {activeTab === 'help' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Content Management Guide</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-3">📝 What You Can Edit Here</h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li>• <strong>Projects:</strong> Add, edit, and delete portfolio projects</li>
                    <li>• <strong>Images:</strong> Add image URLs (place files in public/images/projects/)</li>
                    <li>• <strong>Content:</strong> Project descriptions, tags, results, and details</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-3">🖼️ Image Management</h3>
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <p className="text-sm text-neutral-600 mb-2">
                      <strong>Step 1:</strong> Place your images in these folders:
                    </p>
                    <code className="text-xs bg-white p-2 rounded block mb-2">
                      public/images/projects/your-image.jpg
                    </code>
                    <p className="text-sm text-neutral-600 mb-2">
                      <strong>Step 2:</strong> Reference them in the admin panel:
                    </p>
                    <code className="text-xs bg-white p-2 rounded block">
                      /images/projects/your-image.jpg
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-3">📄 Other Content to Edit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <h4 className="font-medium text-neutral-900 mb-2">Personal Info</h4>
                      <p className="text-sm text-neutral-600 mb-2">Edit: <code>data/config.json</code></p>
                      <ul className="text-xs text-neutral-500">
                        <li>• Name, title, bio</li>
                        <li>• Contact information</li>
                        <li>• Social media links</li>
                      </ul>
                    </div>
                    
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <h4 className="font-medium text-neutral-900 mb-2">Career Timeline</h4>
                      <p className="text-sm text-neutral-600 mb-2">Edit: <code>data/career.json</code></p>
                      <ul className="text-xs text-neutral-500">
                        <li>• Work experience</li>
                        <li>• Job titles & companies</li>
                        <li>• Technologies used</li>
                      </ul>
                    </div>
                    
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <h4 className="font-medium text-neutral-900 mb-2">Testimonials</h4>
                      <p className="text-sm text-neutral-600 mb-2">Edit: <code>data/testimonials.json</code></p>
                      <ul className="text-xs text-neutral-500">
                        <li>• Client reviews</li>
                        <li>• Ratings & feedback</li>
                        <li>• Client photos</li>
                      </ul>
                    </div>
                    
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <h4 className="font-medium text-neutral-900 mb-2">Services</h4>
                      <p className="text-sm text-neutral-600 mb-2">Edit: <code>data/services.json</code></p>
                      <ul className="text-xs text-neutral-500">
                        <li>• Service offerings</li>
                        <li>• Features & benefits</li>
                        <li>• Service descriptions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-3">🔐 Security</h3>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800 mb-2">
                      <strong>Important:</strong> This admin panel is accessible at <code>/admin</code>
                    </p>
                    <p className="text-sm text-yellow-700">
                      Change the default password by creating a <code>.env.local</code> file with:
                      <br />
                      <code className="text-xs">NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password</code>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-3">📱 Need More Help?</h3>
                  <p className="text-neutral-600 text-sm">
                    Check the <code>CONTENT_MANAGEMENT_GUIDE.md</code> file in your project for detailed instructions on customizing every part of your portfolio.
                  </p>
                </div>
              </div>
            </div>
          )}    </div>
  )
}