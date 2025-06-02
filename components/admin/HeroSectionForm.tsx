'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, RefreshCw, User, Image as ImageIcon, Plus, Trash2, ExternalLink } from 'lucide-react'
import { usePortfolioConfig } from '@/lib/hooks'

interface HeroSectionFormProps {
  onDataChange: () => void
  onDataSave: () => void
}

export default function HeroSectionForm({ onDataChange, onDataSave }: HeroSectionFormProps) {
  const config = usePortfolioConfig()
  const [formData, setFormData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize form data when config loads
  useEffect(() => {
    if (config) {
      setFormData({
        hero: {
          tagline: config.hero?.tagline || '',
          fullIntro: config.hero?.fullIntro || '',
          profileImage: config.hero?.profileImage || '',
          ctas: config.hero?.ctas || [
            { text: 'View My Work', href: '#projects', type: 'primary' },
            { text: 'Get In Touch', href: '#contact', type: 'secondary' }
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

  const handleCtaChange = (index: number, field: string, value: string) => {
    const newCtas = [...formData.hero.ctas]
    newCtas[index] = { ...newCtas[index], [field]: value }
    handleInputChange('hero.ctas', newCtas)
  }

  const addCta = () => {
    const newCtas = [...formData.hero.ctas, { text: '', href: '', type: 'primary' }]
    handleInputChange('hero.ctas', newCtas)
  }

  const removeCta = (index: number) => {
    const newCtas = formData.hero.ctas.filter((_: any, i: number) => i !== index)
    handleInputChange('hero.ctas', newCtas)
  }

  const handleSave = async () => {
    if (!formData) return
    
    setIsLoading(true)
    try {
      // Merge with existing config
      const updatedConfig = { ...config, ...formData }
      localStorage.setItem('admin-config', JSON.stringify(updatedConfig))
      onDataSave()
      alert('Hero section saved successfully!')
    } catch (error) {
      alert('Error saving hero section. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetToDefaults = () => {
    if (confirm('Reset hero section to defaults? This will undo all changes.')) {
      import('@/data/config.json').then((defaultConfig) => {
        setFormData({
          hero: defaultConfig.default.hero
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
          <h3 className="text-lg font-semibold text-neutral-900">Hero Section</h3>
          <p className="text-neutral-600">Manage your main introduction and call-to-actions</p>
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

      {/* Main Content */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <User className="w-5 h-5 text-primary-600" />
          <h4 className="text-lg font-medium text-neutral-900">Introduction</h4>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Tagline
            </label>
            <input
              type="text"
              value={formData.hero.tagline}
              onChange={(e) => handleInputChange('hero.tagline', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Full-Stack Developer & UI/UX Designer"
            />
            <p className="text-xs text-neutral-500 mt-1">
              Short description that appears below your name
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Full Introduction
            </label>
            <textarea
              value={formData.hero.fullIntro}
              onChange={(e) => handleInputChange('hero.fullIntro', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Write a compelling introduction about yourself..."
            />
            <p className="text-xs text-neutral-500 mt-1">
              Detailed introduction that appears in the hero section
            </p>
          </div>
        </div>
      </div>

      {/* Profile Image */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <ImageIcon className="w-5 h-5 text-primary-600" />
          <h4 className="text-lg font-medium text-neutral-900">Profile Image</h4>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.hero.profileImage}
              onChange={(e) => handleInputChange('hero.profileImage', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://example.com/your-photo.jpg"
            />
            <p className="text-xs text-neutral-500 mt-1">
              URL to your profile image (recommended: 400x400px)
            </p>
          </div>
          
          {formData.hero.profileImage && (
            <div className="flex items-center gap-4">
              <img
                src={formData.hero.profileImage}
                alt="Profile preview"
                className="w-20 h-20 rounded-full object-cover border border-neutral-300"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-avatar.jpg'
                }}
              />
              <div className="text-sm text-neutral-600">
                <p>Preview of your profile image</p>
                <p className="text-xs text-neutral-500">
                  If image doesn't load, check the URL
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Call-to-Actions */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary-600" />
            <h4 className="text-lg font-medium text-neutral-900">Call-to-Action Buttons</h4>
          </div>
          <button
            onClick={addCta}
            className="flex items-center gap-2 px-3 py-2 text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add CTA
          </button>
        </div>
        
        <div className="space-y-4">
          {formData.hero.ctas.map((cta: any, index: number) => (
            <div key={index} className="border border-neutral-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium text-neutral-900">Button {index + 1}</h5>
                {formData.hero.ctas.length > 1 && (
                  <button
                    onClick={() => removeCta(index)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={cta.text}
                    onChange={(e) => handleCtaChange(index, 'text', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Button text"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Link/Anchor
                  </label>
                  <input
                    type="text"
                    value={cta.href}
                    onChange={(e) => handleCtaChange(index, 'href', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="#section or https://..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Style
                  </label>
                  <select
                    value={cta.type}
                    onChange={(e) => handleCtaChange(index, 'type', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="primary">Primary (Filled)</option>
                    <option value="secondary">Secondary (Outline)</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h4 className="text-lg font-medium text-neutral-900 mb-4">Preview</h4>
        
        <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
          <div className="text-center space-y-4">
            {formData.hero.profileImage && (
              <img
                src={formData.hero.profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-avatar.jpg'
                }}
              />
            )}
            
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Your Name</h2>
              <p className="text-lg text-primary-600 mb-4">{formData.hero.tagline}</p>
              <p className="text-neutral-600 max-w-2xl mx-auto">{formData.hero.fullIntro}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              {formData.hero.ctas.map((cta: any, index: number) => (
                <button
                  key={index}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    cta.type === 'primary'
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'border border-primary-600 text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  {cta.text || 'Button Text'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}