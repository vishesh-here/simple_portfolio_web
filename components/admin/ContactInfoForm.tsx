'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, RefreshCw, Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, Plus, Trash2 } from 'lucide-react'
import { usePortfolioConfig } from '@/lib/hooks'

interface ContactInfoFormProps {
  onDataChange: () => void
  onDataSave: () => void
}

interface SocialLink {
  platform: string
  url: string
  icon: string
}

export default function ContactInfoForm({ onDataChange, onDataSave }: ContactInfoFormProps) {
  const config = usePortfolioConfig()
  const [formData, setFormData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Available social platforms
  const socialPlatforms = [
    { name: 'GitHub', icon: 'github', placeholder: 'https://github.com/username' },
    { name: 'LinkedIn', icon: 'linkedin', placeholder: 'https://linkedin.com/in/username' },
    { name: 'Twitter', icon: 'twitter', placeholder: 'https://twitter.com/username' },
    { name: 'Instagram', icon: 'instagram', placeholder: 'https://instagram.com/username' },
    { name: 'Website', icon: 'globe', placeholder: 'https://yourwebsite.com' },
    { name: 'Dribbble', icon: 'dribbble', placeholder: 'https://dribbble.com/username' },
    { name: 'Behance', icon: 'behance', placeholder: 'https://behance.net/username' }
  ]

  // Initialize form data when config loads
  useEffect(() => {
    if (config) {
      setFormData({
        contact: {
          email: config.contact?.email || '',
          phone: config.contact?.phone || '',
          location: config.contact?.location || '',
          availability: config.contact?.availability || 'Available for freelance work',
          social: config.contact?.social || [
            { platform: 'GitHub', url: '', icon: 'github' },
            { platform: 'LinkedIn', url: '', icon: 'linkedin' }
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

  const handleSocialChange = (index: number, field: string, value: string) => {
    const newSocial = [...formData.contact.social]
    newSocial[index] = { ...newSocial[index], [field]: value }
    
    // Update icon when platform changes
    if (field === 'platform') {
      const platform = socialPlatforms.find(p => p.name === value)
      if (platform) {
        newSocial[index].icon = platform.icon
      }
    }
    
    handleInputChange('contact.social', newSocial)
  }

  const addSocialLink = () => {
    const newSocial = [...formData.contact.social, { platform: 'GitHub', url: '', icon: 'github' }]
    handleInputChange('contact.social', newSocial)
  }

  const removeSocialLink = (index: number) => {
    const newSocial = formData.contact.social.filter((_: any, i: number) => i !== index)
    handleInputChange('contact.social', newSocial)
  }

  const handleSave = async () => {
    if (!formData) return
    
    setIsLoading(true)
    try {
      // Merge with existing config
      const updatedConfig = { ...config, ...formData }
      localStorage.setItem('admin-config', JSON.stringify(updatedConfig))
      onDataSave()
      alert('Contact information saved successfully!')
    } catch (error) {
      alert('Error saving contact information. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetToDefaults = () => {
    if (confirm('Reset contact information to defaults? This will undo all changes.')) {
      import('@/data/config.json').then((defaultConfig) => {
        setFormData({
          contact: defaultConfig.default.contact
        })
        onDataChange()
      })
    }
  }

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <Github className="w-5 h-5" />
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />
      case 'twitter':
        return <Twitter className="w-5 h-5" />
      case 'instagram':
        return <Instagram className="w-5 h-5" />
      case 'globe':
        return <Globe className="w-5 h-5" />
      default:
        return <Globe className="w-5 h-5" />
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
          <h3 className="text-lg font-semibold text-neutral-900">Contact Information</h3>
          <p className="text-neutral-600">Manage your contact details and social links</p>
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

      {/* Basic Contact Info */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Mail className="w-5 h-5 text-primary-600" />
          <h4 className="text-lg font-medium text-neutral-900">Basic Information</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.contact.email}
              onChange={(e) => handleInputChange('contact.email', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={formData.contact.phone}
              onChange={(e) => handleInputChange('contact.phone', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.contact.location}
              onChange={(e) => handleInputChange('contact.location', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="San Francisco, CA"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Availability Status
            </label>
            <input
              type="text"
              value={formData.contact.availability}
              onChange={(e) => handleInputChange('contact.availability', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Available for freelance work"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary-600" />
            <h4 className="text-lg font-medium text-neutral-900">Social Links</h4>
          </div>
          <button
            onClick={addSocialLink}
            className="flex items-center gap-2 px-3 py-2 text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Link
          </button>
        </div>
        
        <div className="space-y-4">
          {formData.contact.social.map((social: SocialLink, index: number) => (
            <div key={index} className="border border-neutral-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium text-neutral-900">Social Link {index + 1}</h5>
                {formData.contact.social.length > 1 && (
                  <button
                    onClick={() => removeSocialLink(index)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Platform
                  </label>
                  <select
                    value={social.platform}
                    onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {socialPlatforms.map((platform) => (
                      <option key={platform.name} value={platform.name}>
                        {platform.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={socialPlatforms.find(p => p.name === social.platform)?.placeholder || 'https://...'}
                  />
                </div>
              </div>
              
              {/* Preview */}
              {social.url && (
                <div className="mt-3 p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    {getSocialIcon(social.icon)}
                    <span>{social.platform}:</span>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 truncate"
                    >
                      {social.url}
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h4 className="text-lg font-medium text-neutral-900 mb-4">Preview</h4>
        
        <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Get In Touch</h3>
            <p className="text-neutral-600">Let's work together on your next project</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-neutral-900">Contact Information</h4>
              
              <div className="space-y-3">
                {formData.contact.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary-600" />
                    <span className="text-neutral-600">{formData.contact.email}</span>
                  </div>
                )}
                
                {formData.contact.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary-600" />
                    <span className="text-neutral-600">{formData.contact.phone}</span>
                  </div>
                )}
                
                {formData.contact.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary-600" />
                    <span className="text-neutral-600">{formData.contact.location}</span>
                  </div>
                )}
              </div>
              
              {formData.contact.availability && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-green-800 font-medium">{formData.contact.availability}</p>
                </div>
              )}
            </div>
            
            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-neutral-900">Connect With Me</h4>
              
              <div className="flex flex-wrap gap-3">
                {formData.contact.social
                  .filter((social: SocialLink) => social.url)
                  .map((social: SocialLink, index: number) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      {getSocialIcon(social.icon)}
                      <span className="text-sm text-neutral-700">{social.platform}</span>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}