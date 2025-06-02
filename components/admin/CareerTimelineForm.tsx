'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, RefreshCw, Briefcase, Plus, Edit, Trash2, Calendar, Building } from 'lucide-react'
import { usePortfolioCareer } from '@/lib/hooks'

interface CareerTimelineFormProps {
  onDataChange: () => void
  onDataSave: () => void
}

interface CareerItem {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string
  achievements: string[]
  technologies: string[]
  type: 'work' | 'education' | 'project'
}

export default function CareerTimelineForm({ onDataChange, onDataSave }: CareerTimelineFormProps) {
  const career = usePortfolioCareer()
  const [careerItems, setCareerItems] = useState<CareerItem[]>([])
  const [editingItem, setEditingItem] = useState<CareerItem | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize career items when data loads
  useEffect(() => {
    if (career && career.length > 0) {
      // Transform JSON structure to admin structure
      const transformedCareer = career.map((item: any) => ({
        id: item.id,
        title: item.title,
        company: item.company,
        location: item.location,
        period: item.period || `${item.startDate} - ${item.endDate || 'Present'}`,
        description: item.description,
        achievements: item.achievements || [],
        technologies: item.skills || item.technologies || [],
        type: item.type || 'work'
      }))
      setCareerItems(transformedCareer)
    }
  }, [career])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      localStorage.setItem('admin-career', JSON.stringify(careerItems))
      onDataSave()
      alert('Career timeline saved successfully!')
    } catch (error) {
      alert('Error saving career timeline. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetToDefaults = () => {
    if (confirm('Reset career timeline to defaults? This will undo all changes.')) {
      import('@/data/career.json').then((defaultCareer) => {
        // Transform JSON structure to admin structure
        const careerItemsWithRequiredProps = defaultCareer.default.map((item: any) => ({
          id: item.id,
          title: item.title,
          company: item.company,
          location: item.location,
          period: item.period || `${item.startDate} - ${item.endDate || 'Present'}`,          description: item.description,
          achievements: item.achievements || [],          technologies: item.skills || item.technologies || [],
          type: item.type || 'work'
        }))
        setCareerItems(careerItemsWithRequiredProps)
        onDataChange()      }).catch((error) => {
        console.error('Error loading default career data:', error)
        alert('Error loading default career data. Please try again.')      })
    }
  }

  const addCareerItem = () => {
    const newItem: CareerItem = {
      id: `career-${Date.now()}`,
      title: 'New Position',
      company: 'Company Name',
      location: 'Location',
      period: '2024 - Present',
      description: 'Job description...',
      achievements: ['Achievement 1', 'Achievement 2'],
      technologies: ['Technology 1', 'Technology 2'],
      type: 'work'
    }
    setEditingItem(newItem)
  }

  const editCareerItem = (item: CareerItem) => {
    setEditingItem({ ...item })
  }

  const deleteCareerItem = (itemId: string) => {
    if (confirm('Are you sure you want to delete this career item?')) {
      const updatedItems = careerItems.filter(item => item.id !== itemId)
      setCareerItems(updatedItems)
      onDataChange()
    }
  }

  const saveEditingItem = () => {
    if (!editingItem) return

    const existingIndex = careerItems.findIndex(item => item.id === editingItem.id)
    let updatedItems

    if (existingIndex >= 0) {
      // Update existing item
      updatedItems = [...careerItems]
      updatedItems[existingIndex] = editingItem
    } else {
      // Add new item
      updatedItems = [...careerItems, editingItem]
    }

    // Sort by period (most recent first)
    updatedItems.sort((a, b) => {
      const aYear = parseInt(a.period.split(' - ')[0])
      const bYear = parseInt(b.period.split(' - ')[0])
      return bYear - aYear
    })

    setCareerItems(updatedItems)
    setEditingItem(null)
    onDataChange()
  }

  const updateEditingItem = (field: string, value: any) => {
    if (!editingItem) return
    setEditingItem({ ...editingItem, [field]: value })
  }

  const updateAchievement = (index: number, value: string) => {
    if (!editingItem) return
    const newAchievements = [...editingItem.achievements]
    newAchievements[index] = value
    setEditingItem({ ...editingItem, achievements: newAchievements })
  }

  const addAchievement = () => {
    if (!editingItem) return
    const newAchievements = [...editingItem.achievements, 'New achievement']
    setEditingItem({ ...editingItem, achievements: newAchievements })
  }

  const removeAchievement = (index: number) => {
    if (!editingItem) return
    const newAchievements = editingItem.achievements.filter((_, i) => i !== index)
    setEditingItem({ ...editingItem, achievements: newAchievements })
  }

  const updateTechnology = (index: number, value: string) => {
    if (!editingItem) return
    const newTechnologies = [...editingItem.technologies]
    newTechnologies[index] = value
    setEditingItem({ ...editingItem, technologies: newTechnologies })
  }

  const addTechnology = () => {
    if (!editingItem) return
    const newTechnologies = [...editingItem.technologies, 'New technology']
    setEditingItem({ ...editingItem, technologies: newTechnologies })
  }

  const removeTechnology = (index: number) => {
    if (!editingItem) return
    const newTechnologies = editingItem.technologies.filter((_, i) => i !== index)
    setEditingItem({ ...editingItem, technologies: newTechnologies })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Briefcase className="w-4 h-4" />
      case 'education':
        return <Building className="w-4 h-4" />
      case 'project':
        return <Calendar className="w-4 h-4" />
      default:
        return <Briefcase className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'bg-blue-100 text-blue-800'
      case 'education':
        return 'bg-green-100 text-green-800'
      case 'project':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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
          <h3 className="text-lg font-semibold text-neutral-900">Career Timeline</h3>
          <p className="text-neutral-600">Manage your work experience and education</p>
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
            onClick={addCareerItem}
            className="flex items-center gap-2 px-4 py-2 text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
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

      {/* Career Items List */}
      {!editingItem && (
        <div className="space-y-4">
          {careerItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">{item.title}</h4>
                    <p className="text-neutral-600">{item.company} • {item.location}</p>
                    <p className="text-sm text-neutral-500">{item.period}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editCareerItem(item)}
                    className="text-blue-600 hover:text-blue-700 transition-colors p-1"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteCareerItem(item.id)}
                    className="text-red-600 hover:text-red-700 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-neutral-600 text-sm mb-4">{item.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-neutral-700 mb-2">Key Achievements:</p>
                  <ul className="space-y-1">
                    {item.achievements.slice(0, 3).map((achievement, index) => (
                      <li key={index} className="text-xs text-neutral-600">• {achievement}</li>
                    ))}
                    {item.achievements.length > 3 && (
                      <li className="text-xs text-neutral-400">+{item.achievements.length - 3} more</li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <p className="text-xs font-medium text-neutral-700 mb-2">Technologies:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {item.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-neutral-100 text-neutral-500 text-xs rounded">
                        +{item.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {careerItems.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600">No career items yet. Add your first experience!</p>
            </div>
          )}
        </div>
      )}

      {/* Edit Career Item Form */}
      {editingItem && (
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-medium text-neutral-900">
              {careerItems.find(item => item.id === editingItem.id) ? 'Edit Career Item' : 'Add New Career Item'}
            </h4>
            <div className="flex gap-3">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEditingItem}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Save Item
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Position/Title
                </label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => updateEditingItem('title', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Type
                </label>
                <select
                  value={editingItem.type}
                  onChange={(e) => updateEditingItem('type', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="work">Work Experience</option>
                  <option value="education">Education</option>
                  <option value="project">Project/Freelance</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  value={editingItem.company}
                  onChange={(e) => updateEditingItem('company', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Tech Company Inc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={editingItem.location}
                  onChange={(e) => updateEditingItem('location', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Time Period
              </label>
              <input
                type="text"
                value={editingItem.period}
                onChange={(e) => updateEditingItem('period', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 2022 - Present or Jan 2020 - Dec 2021"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Description
              </label>
              <textarea
                value={editingItem.description}
                onChange={(e) => updateEditingItem('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Brief description of your role and responsibilities..."
              />
            </div>
            
            {/* Achievements */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-neutral-700">
                  Key Achievements
                </label>
                <button
                  onClick={addAchievement}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add Achievement
                </button>
              </div>
              
              <div className="space-y-3">
                {editingItem.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => updateAchievement(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Achievement description"
                    />
                    {editingItem.achievements.length > 1 && (
                      <button
                        onClick={() => removeAchievement(index)}
                        className="text-red-600 hover:text-red-700 transition-colors p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Technologies */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-neutral-700">
                  Technologies Used
                </label>
                <button
                  onClick={addTechnology}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add Technology
                </button>
              </div>
              
              <div className="space-y-3">
                {editingItem.technologies.map((technology, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={technology}
                      onChange={(e) => updateTechnology(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Technology name"
                    />
                    {editingItem.technologies.length > 1 && (
                      <button
                        onClick={() => removeTechnology(index)}
                        className="text-red-600 hover:text-red-700 transition-colors p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview */}
      {!editingItem && careerItems.length > 0 && (
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h4 className="text-lg font-medium text-neutral-900 mb-4">Preview</h4>
          
          <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Career Timeline</h3>
              <p className="text-neutral-600">My professional journey</p>
            </div>
            
            <div className="space-y-6">
              {careerItems.slice(0, 3).map((item, index) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                      {getTypeIcon(item.type)}
                    </div>
                    {index < careerItems.length - 1 && (
                      <div className="w-px h-16 bg-neutral-200 mt-4" />
                    )}
                  </div>
                  
                  <div className="flex-1 pb-8">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
                      <h4 className="font-semibold text-neutral-900">{item.title}</h4>
                      <p className="text-neutral-600 text-sm">{item.company} • {item.location}</p>
                      <p className="text-xs text-neutral-500 mb-2">{item.period}</p>
                      <p className="text-neutral-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {careerItems.length > 3 && (
                <div className="text-center text-neutral-500 text-sm">
                  +{careerItems.length - 3} more items
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}