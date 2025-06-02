'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, RefreshCw, Palette, Globe, Eye } from 'lucide-react'
import { usePortfolioConfig } from '@/lib/hooks'

interface SiteSettingsFormProps {
  onDataChange: () => void
  onDataSave: () => void
}

export default function SiteSettingsForm({ onDataChange, onDataSave }: SiteSettingsFormProps) {
  const config = usePortfolioConfig()
  const [formData, setFormData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize form data when config loads
  useEffect(() => {
    if (config) {
      setFormData({
        site: {
          title: config.site?.title || '',
          description: config.site?.description || '',
          url: config.site?.url || '',
          theme: {
            primaryColor: config.site?.theme?.primaryColor || '#3B82F6',
            accentColor: config.site?.theme?.accentColor || '#10B981',
            darkMode: config.site?.theme?.darkMode || false
          }
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

  const handleSave = async () => {
    if (!formData) return
    
    setIsLoading(true)
    try {
      // Merge with existing config
      const updatedConfig = { ...config, ...formData }
      localStorage.setItem('admin-config', JSON.stringify(updatedConfig))
      onDataSave()
      alert('Site settings saved successfully!')
    } catch (error) {
      alert('Error saving settings. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetToDefaults = () => {
    if (confirm('Reset site settings to defaults? This will undo all changes.')) {
      // Import default config
      import('@/data/config.json').then((defaultConfig) => {
        setFormData({
          site: defaultConfig.default.site
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
          <h3 className="text-lg font-semibold text-neutral-900">Site Configuration</h3>
          <p className="text-neutral-600">Manage basic site information and branding</p>
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

      {/* Site Information */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-primary-600" />
          <h4 className="text-lg font-medium text-neutral-900">Site Information</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Site Title
            </label>
            <input
              type="text"
              value={formData.site.title}
              onChange={(e) => handleInputChange('site.title', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Your Portfolio"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Site URL
            </label>
            <input
              type="url"
              value={formData.site.url}
              onChange={(e) => handleInputChange('site.url', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://yourportfolio.com"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Site Description
            </label>
            <textarea
              value={formData.site.description}
              onChange={(e) => handleInputChange('site.description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="A brief description of your portfolio..."
            />
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-primary-600" />
          <h4 className="text-lg font-medium text-neutral-900">Theme Settings</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={formData.site.theme.primaryColor}
                onChange={(e) => handleInputChange('site.theme.primaryColor', e.target.value)}
                className="w-12 h-10 border border-neutral-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={formData.site.theme.primaryColor}
                onChange={(e) => handleInputChange('site.theme.primaryColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="#3B82F6"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Accent Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={formData.site.theme.accentColor}
                onChange={(e) => handleInputChange('site.theme.accentColor', e.target.value)}
                className="w-12 h-10 border border-neutral-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={formData.site.theme.accentColor}
                onChange={(e) => handleInputChange('site.theme.accentColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="#10B981"
              />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.site.theme.darkMode}
                onChange={(e) => handleInputChange('site.theme.darkMode', e.target.checked)}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-neutral-700">
                Enable Dark Mode (Coming Soon)
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-primary-600" />
          <h4 className="text-lg font-medium text-neutral-900">Preview</h4>
        </div>
        
        <div className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
          <div className="space-y-2">
            <h5 className="font-semibold text-neutral-900">{formData.site.title}</h5>
            <p className="text-neutral-600 text-sm">{formData.site.description}</p>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span>URL: {formData.site.url}</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <div 
                className="w-6 h-6 rounded border border-neutral-300"
                style={{ backgroundColor: formData.site.theme.primaryColor }}
                title="Primary Color"
              />
              <div 
                className="w-6 h-6 rounded border border-neutral-300"
                style={{ backgroundColor: formData.site.theme.accentColor }}
                title="Accent Color"
              />
              <span className="text-xs text-neutral-500">Theme Colors</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}