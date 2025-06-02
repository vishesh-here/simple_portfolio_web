'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, RefreshCw, User, Image as ImageIcon, Plus, Trash2, Heart } from 'lucide-react'
import { usePortfolioConfig } from '@/lib/hooks'
import ImageSelector from './ImageSelector'

interface AboutSectionFormProps {
  onDataChange: () => void
  onDataSave: () => void
}

export default function AboutSectionForm({ onDataChange, onDataSave }: AboutSectionFormProps) {
  const config = usePortfolioConfig()
  const [formData, setFormData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize form data when config loads
  useEffect(() => {
    if (config) {
      setFormData({
        about: {
          story: config.about?.story || '',
          image: config.about?.image || '',
          funFacts: config.about?.funFacts || [
            '🎸 Music lover and guitarist',
            '🏔️ Mountain hiking enthusiast',
            '📚 Continuous learner',
            '☕ Coffee addict'
          ]
        }
      })
    }
  }, [config])

  const handleInputChange = (path: string, value: any) => {
    if (!formData) return
    
    const keys = path.split('.')
    const newData = { ...formData }
    let current = newData
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }
    current[keys[keys.length - 1]] = value
    
    setFormData(newData)
    onDataChange()
  }

  const handleFunFactChange = (index: number, value: string) => {
    const newFacts = [...formData.about.funFacts]
    newFacts[index] = value
    handleInputChange('about.funFacts', newFacts)
  }

  const addFunFact = () => {
    const newFacts = [...formData.about.funFacts, '🎯 New fun fact']
    handleInputChange('about.funFacts', newFacts)
  }

  const removeFunFact = (index: number) => {
    const newFacts = formData.about.funFacts.filter((_: any, i: number) => i !== index)
    handleInputChange('about.funFacts', newFacts)
  }

  const handleSave = async () => {
    if (!formData) return
    
    setIsLoading(true)
    try {
      // Merge with existing config
      const updatedConfig = { ...config, ...formData }
      localStorage.setItem('admin-config', JSON.stringify(updatedConfig))
      onDataSave()
      alert('About section saved successfully!')
    } catch (error) {
      alert('Error saving about section. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetToDefaults = () => {
    if (confirm('Reset about section to defaults? This will undo all changes.')) {
      import('@/data/config.json').then((defaultConfig) => {
        setFormData({
          about: defaultConfig.default.about
        })
        onDataChange()
      })
    }
  }

  if (!formData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
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
          <h3 className="text-lg font-semibold text-neutral-900">About Me Section</h3>
          <p className="text-neutral-600">Share your story and personality</p>
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
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Story */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <User className="w-5 h-5 text-primary-600" />
          <h4 className="text-lg font-medium text-neutral-900">Your Story</h4>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            About Me Text
          </label>
          <textarea
            value={formData.about.story}
            onChange={(e) => handleInputChange('about.story', e.target.value)}
            rows={8}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Tell your story... Who are you? What drives you? What's your background and passion?"
          />
          <p className="text-xs text-neutral-500 mt-1">
            This will be the main text in your About section. Make it personal and engaging.
          </p>
        </div>
      </div>

      {/* Profile Image */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <ImageIcon className="w-5 h-5 text-primary-600" />
          <h4 className="text-lg font-medium text-neutral-900">About Image</h4>
        </div>
        
        <ImageSelector
          value={formData.about.image}
          onChange={(imageData) => handleInputChange('about.image', imageData)}
          label="About Section Image"
          category="about"
          placeholder="Upload an image that represents you"
        />
      </div>

      {/* Fun Facts */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary-600" />
            <h4 className="text-lg font-medium text-neutral-900">Fun Facts</h4>
          </div>
          <button
            onClick={addFunFact}
            className="flex items-center gap-2 px-3 py-2 text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Fact
          </button>
        </div>
        
        <div className="space-y-3">
          {formData.about.funFacts.map((fact: string, index: number) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={fact}
                onChange={(e) => handleFunFactChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="🎯 Add an emoji and fun fact about yourself"
              />
              {formData.about.funFacts.length > 1 && (
                <button
                  onClick={() => removeFunFact(index)}
                  className="text-red-600 hover:text-red-700 transition-colors p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Tip:</strong> Start each fun fact with an emoji to make them more visually appealing! 
            Examples: 🎸 🏔️ 📚 ☕ 🎨 🚀 🌍 🎯
          </p>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h4 className="text-lg font-medium text-neutral-900 mb-4">Preview</h4>
        
        <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Story */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">About Me</h3>
                <div className="text-neutral-600 whitespace-pre-line">
                  {formData.about.story || 'Your story will appear here...'}
                </div>
              </div>
              
              {/* Fun Facts */}
              {formData.about.funFacts.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-3">Fun Facts</h4>
                  <div className="space-y-2">
                    {formData.about.funFacts.map((fact: string, index: number) => {
                      const emoji = fact.split(' ')[0]
                      const text = fact.split(' ').slice(1).join(' ')
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <span className="text-lg">{emoji}</span>
                          <span className="text-neutral-600">{text}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
            
            {/* Image */}
            <div className="flex justify-center">
              {formData.about.image ? (
                <img
                  src={formData.about.image}
                  alt="About"
                  className="w-full max-w-md rounded-lg shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.jpg'
                  }}
                />
              ) : (
                <div className="w-full max-w-md h-64 bg-neutral-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-neutral-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                    <p>Your image will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}