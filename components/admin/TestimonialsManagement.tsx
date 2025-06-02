'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, RefreshCw, MessageSquare, Plus, Edit, Trash2, Star, User } from 'lucide-react'
import { usePortfolioTestimonials } from '@/lib/hooks'

interface TestimonialsManagementProps {
  onDataChange: () => void
  onDataSave: () => void
}

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
  featured: boolean
}

export default function TestimonialsManagement({ onDataChange, onDataSave }: TestimonialsManagementProps) {
  const testimonials = usePortfolioTestimonials()
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([])
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize testimonials when data loads
  useEffect(() => {
    if (testimonials) {
      setTestimonialsList(testimonials)
    }
  }, [testimonials])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      localStorage.setItem('admin-testimonials', JSON.stringify(testimonialsList))
      onDataSave()
      alert('Testimonials saved successfully!')
    } catch (error) {
      alert('Error saving testimonials. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetToDefaults = () => {
    if (confirm('Reset testimonials to defaults? This will undo all changes.')) {
      import('@/data/testimonials.json').then((defaultTestimonials) => {
        // Ensure each testimonial has the required properties
        const testimonialsWithRequiredProps = defaultTestimonials.default.map((testimonial: any) => ({
          ...testimonial,
          content: testimonial.quote || testimonial.content || 'Testimonial content...',
          featured: testimonial.featured || false
        }))
        setTestimonialsList(testimonialsWithRequiredProps)
        onDataChange()
      })
    }
  }

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: `testimonial-${Date.now()}`,
      name: 'Client Name',
      role: 'Position',
      company: 'Company Name',
      content: 'Testimonial content...',
      rating: 5,
      avatar: '',
      featured: false
    }
    setEditingTestimonial(newTestimonial)
  }

  const editTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial({ ...testimonial })
  }

  const deleteTestimonial = (testimonialId: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      const updatedTestimonials = testimonialsList.filter(t => t.id !== testimonialId)
      setTestimonialsList(updatedTestimonials)
      onDataChange()
    }
  }

  const saveEditingTestimonial = () => {
    if (!editingTestimonial) return

    const existingIndex = testimonialsList.findIndex(t => t.id === editingTestimonial.id)
    let updatedTestimonials

    if (existingIndex >= 0) {
      // Update existing testimonial
      updatedTestimonials = [...testimonialsList]
      updatedTestimonials[existingIndex] = editingTestimonial
    } else {
      // Add new testimonial
      updatedTestimonials = [...testimonialsList, editingTestimonial]
    }

    setTestimonialsList(updatedTestimonials)
    setEditingTestimonial(null)
    onDataChange()
  }

  const updateEditingTestimonial = (field: string, value: any) => {
    if (!editingTestimonial) return
    setEditingTestimonial({ ...editingTestimonial, [field]: value })
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`${
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            } transition-transform`}
            disabled={!interactive}
          >
            <Star
              className={`w-4 h-4 ${
                star <= rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-neutral-300'
              }`}
            />
          </button>
        ))}
      </div>
    )
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
          <h3 className="text-lg font-semibold text-neutral-900">Testimonials Management</h3>
          <p className="text-neutral-600">Manage client testimonials and reviews</p>
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
            onClick={addTestimonial}
            className="flex items-center gap-2 px-4 py-2 text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Testimonial
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

      {/* Testimonials List */}
      {!editingTestimonial && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonialsList.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border border-neutral-300"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-avatar.jpg'
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-neutral-400" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-neutral-900">{testimonial.name}</h4>
                    <p className="text-sm text-neutral-600">{testimonial.role}</p>
                    <p className="text-xs text-neutral-500">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {testimonial.featured && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                      Featured
                    </span>
                  )}
                  <button
                    onClick={() => editTestimonial(testimonial)}
                    className="text-blue-600 hover:text-blue-700 transition-colors p-1"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteTestimonial(testimonial.id)}
                    className="text-red-600 hover:text-red-700 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-neutral-600 text-sm line-clamp-3">"{testimonial.content}"</p>
            </div>
          ))}
          
          {testimonialsList.length === 0 && (
            <div className="col-span-full text-center py-12">
              <MessageSquare className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600">No testimonials yet. Add your first testimonial!</p>
            </div>
          )}
        </div>
      )}

      {/* Edit Testimonial Form */}
      {editingTestimonial && (
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-medium text-neutral-900">
              {testimonialsList.find(t => t.id === editingTestimonial.id) ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h4>
            <div className="flex gap-3">
              <button
                onClick={() => setEditingTestimonial(null)}
                className="px-4 py-2 text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEditingTestimonial}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Save Testimonial
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Client Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  value={editingTestimonial.name}
                  onChange={(e) => updateEditingTestimonial('name', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., John Smith"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Role/Position
                </label>
                <input
                  type="text"
                  value={editingTestimonial.role}
                  onChange={(e) => updateEditingTestimonial('role', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., CEO, Project Manager"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={editingTestimonial.company}
                  onChange={(e) => updateEditingTestimonial('company', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Tech Company Inc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Avatar URL (Optional)
                </label>
                <input
                  type="url"
                  value={editingTestimonial.avatar || ''}
                  onChange={(e) => updateEditingTestimonial('avatar', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            </div>
            
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Rating
              </label>
              <div className="flex items-center gap-3">
                {renderStars(editingTestimonial.rating, true, (rating) => updateEditingTestimonial('rating', rating))}
                <span className="text-sm text-neutral-600">
                  {editingTestimonial.rating} out of 5 stars
                </span>
              </div>
            </div>
            
            {/* Testimonial Content */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Testimonial Content
              </label>
              <textarea
                value={editingTestimonial.content}
                onChange={(e) => updateEditingTestimonial('content', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Write the testimonial content here..."
              />
              <p className="text-xs text-neutral-500 mt-1">
                Write in the client's voice. Don't include quotes - they'll be added automatically.
              </p>
            </div>
            
            {/* Featured */}
            <div>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={editingTestimonial.featured}
                  onChange={(e) => updateEditingTestimonial('featured', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-neutral-700">
                  Featured Testimonial
                </span>
              </label>
              <p className="text-xs text-neutral-500 mt-1">
                Featured testimonials may be displayed more prominently
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preview */}
      {!editingTestimonial && testimonialsList.length > 0 && (
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h4 className="text-lg font-medium text-neutral-900 mb-4">Preview</h4>
          
          <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">What Clients Say</h3>
              <p className="text-neutral-600">Testimonials from satisfied clients</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonialsList.slice(0, 3).map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
                  <div className="flex items-center gap-3 mb-4">
                    {testimonial.avatar ? (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border border-neutral-300"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-avatar.jpg'
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-neutral-400" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-neutral-900">{testimonial.name}</h4>
                      <p className="text-sm text-neutral-600">{testimonial.role}</p>
                      <p className="text-xs text-neutral-500">{testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <p className="text-neutral-600 text-sm">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
            
            {testimonialsList.length > 3 && (
              <div className="text-center text-neutral-500 text-sm mt-6">
                +{testimonialsList.length - 3} more testimonials
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}