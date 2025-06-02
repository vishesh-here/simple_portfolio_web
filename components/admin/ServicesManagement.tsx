'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, RefreshCw, Briefcase, Plus, Edit, Trash2, Target } from 'lucide-react'
import { usePortfolioConfig } from '@/lib/hooks'

interface ServicesManagementProps {
  onDataChange: () => void
  onDataSave: () => void
}

interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export default function ServicesManagement({ onDataChange, onDataSave }: ServicesManagementProps) {
  const config = usePortfolioConfig()
  const [services, setServices] = useState<Service[]>([])
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Available icons for services
  const availableIcons = [
    'code', 'palette', 'smartphone', 'monitor', 'globe', 'database',
    'cloud', 'shield', 'zap', 'target', 'layers', 'tool'
  ]

  // Initialize services when config loads
  useEffect(() => {
    if (config?.services) {
      setServices(config.services)
    }
  }, [config])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const updatedConfig = { ...config, services }
      localStorage.setItem('admin-config', JSON.stringify(updatedConfig))
      onDataSave()
      alert('Services saved successfully!')
    } catch (error) {
      alert('Error saving services. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetToDefaults = () => {
    if (confirm('Reset services to defaults? This will undo all changes.')) {
      import('@/data/config.json').then((defaultConfig) => {
        // Ensure each service has the features property
        const servicesWithFeatures = defaultConfig.default.services.map((service: any) => ({
          ...service,
          features: service.features || ['Feature 1', 'Feature 2', 'Feature 3']
        }))
        setServices(servicesWithFeatures)
        onDataChange()
      })
    }
  }

  const addService = () => {
    const newService: Service = {
      id: `service-${Date.now()}`,
      title: 'New Service',
      description: 'Service description',
      icon: 'target',
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    }
    setEditingService(newService)
  }

  const editService = (service: Service) => {
    setEditingService({ ...service })
  }

  const deleteService = (serviceId: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const updatedServices = services.filter(s => s.id !== serviceId)
      setServices(updatedServices)
      onDataChange()
    }
  }

  const saveEditingService = () => {
    if (!editingService) return

    const existingIndex = services.findIndex(s => s.id === editingService.id)
    let updatedServices

    if (existingIndex >= 0) {
      // Update existing service
      updatedServices = [...services]
      updatedServices[existingIndex] = editingService
    } else {
      // Add new service
      updatedServices = [...services, editingService]
    }

    setServices(updatedServices)
    setEditingService(null)
    onDataChange()
  }

  const updateEditingService = (field: string, value: any) => {
    if (!editingService) return
    setEditingService({ ...editingService, [field]: value })
  }

  const updateFeature = (index: number, value: string) => {
    if (!editingService) return
    const newFeatures = [...editingService.features]
    newFeatures[index] = value
    setEditingService({ ...editingService, features: newFeatures })
  }

  const addFeature = () => {
    if (!editingService) return
    const newFeatures = [...editingService.features, 'New feature']
    setEditingService({ ...editingService, features: newFeatures })
  }

  const removeFeature = (index: number) => {
    if (!editingService) return
    const newFeatures = editingService.features.filter((_, i) => i !== index)
    setEditingService({ ...editingService, features: newFeatures })
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
          <h3 className="text-lg font-semibold text-neutral-900">Services Management</h3>
          <p className="text-neutral-600">Manage the services you offer</p>
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
            onClick={addService}
            className="flex items-center gap-2 px-4 py-2 text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Service
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

      {/* Services List */}
      {!editingService && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">{service.title}</h4>
                    <p className="text-sm text-neutral-500">Icon: {service.icon}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editService(service)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteService(service.id)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-neutral-600 text-sm mb-4">{service.description}</p>
              
              <div className="space-y-1">
                <p className="text-xs font-medium text-neutral-700">Features:</p>
                {service.features.slice(0, 3).map((feature, index) => (
                  <p key={index} className="text-xs text-neutral-500">• {feature}</p>
                ))}
                {service.features.length > 3 && (
                  <p className="text-xs text-neutral-400">+{service.features.length - 3} more</p>
                )}
              </div>
            </div>
          ))}
          
          {services.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Briefcase className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600">No services yet. Add your first service!</p>
            </div>
          )}
        </div>
      )}

      {/* Edit Service Form */}
      {editingService && (
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-medium text-neutral-900">
              {services.find(s => s.id === editingService.id) ? 'Edit Service' : 'Add New Service'}
            </h4>
            <div className="flex gap-3">
              <button
                onClick={() => setEditingService(null)}
                className="px-4 py-2 text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEditingService}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Save Service
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Service Title
                </label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => updateEditingService('title', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Web Development"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Icon
                </label>
                <select
                  value={editingService.icon}
                  onChange={(e) => updateEditingService('icon', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {availableIcons.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Description
              </label>
              <textarea
                value={editingService.description}
                onChange={(e) => updateEditingService('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Describe what this service includes..."
              />
            </div>
            
            {/* Features */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-neutral-700">
                  Features
                </label>
                <button
                  onClick={addFeature}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add Feature
                </button>
              </div>
              
              <div className="space-y-3">
                {editingService.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Feature description"
                    />
                    {editingService.features.length > 1 && (
                      <button
                        onClick={() => removeFeature(index)}
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
      {!editingService && services.length > 0 && (
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h4 className="text-lg font-medium text-neutral-900 mb-4">Preview</h4>
          
          <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Services</h3>
              <p className="text-neutral-600">What I can help you with</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">{service.title}</h4>
                  <p className="text-neutral-600 text-sm mb-4">{service.description}</p>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="text-sm text-neutral-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}