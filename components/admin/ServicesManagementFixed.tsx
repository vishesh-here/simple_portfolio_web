'use client'

import React, { useState, useEffect } from 'react'
import { Save, RefreshCw, Briefcase, Plus, Edit, Trash2, Target } from 'lucide-react'
import { useStaticPortfolioConfig } from '@/lib/static-hooks'

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

export default function ServicesManagementFixed({ onDataChange, onDataSave }: ServicesManagementProps) {
  const config = useStaticPortfolioConfig()
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
    console.log('🔧 ServicesManagementFixed - Config loaded:', config)
    
    if (config && config.services && Array.isArray(config.services)) {
      setServices(config.services)
      console.log('✅ Services loaded:', config.services)
    } else {
      console.log('⚠️ No services found, initializing empty array')
      setServices([])
    }
  }, [config])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const baseConfig = config || {}
      const updatedConfig = { ...baseConfig, services }
      
      localStorage.setItem('admin-config', JSON.stringify(updatedConfig))
      onDataSave()
      console.log('✅ Services saved successfully:', services)
      alert('Services saved successfully!')
    } catch (error) {
      console.error('❌ Error saving services:', error)
      alert('Error saving services. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetToDefaults = () => {
    if (confirm('Reset services to defaults? This will undo all changes.')) {
      if (config && config.services) {
        const servicesWithFeatures = config.services.map((service: any) => ({
          ...service,
          features: service.features || ['Feature 1', 'Feature 2', 'Feature 3']
        }))
        setServices(servicesWithFeatures)
        onDataChange()
      }
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
    console.log('🔧 Editing service:', service)
    // Ensure features is always an array
    const serviceToEdit = {
      ...service,
      features: Array.isArray(service.features) ? service.features : []
    }
    setEditingService(serviceToEdit)
  }

  const deleteService = (serviceId: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const updatedServices = services.filter(s => s.id !== serviceId)
      setServices(updatedServices)
      onDataChange()
    }
  }

  const saveEditingService = () => {
    if (!editingService) {
      console.error('❌ No editing service to save')
      return
    }

    try {
      console.log('🔧 Saving service:', editingService)
      
      // Ensure features is an array
      const serviceToSave = {
        ...editingService,
        features: Array.isArray(editingService.features) ? editingService.features : []
      }

      const existingIndex = services.findIndex(s => s.id === serviceToSave.id)
      let updatedServices

      if (existingIndex >= 0) {
        updatedServices = [...services]
        updatedServices[existingIndex] = serviceToSave
        console.log('✅ Updated existing service at index:', existingIndex)
      } else {
        updatedServices = [...services, serviceToSave]
        console.log('✅ Added new service')
      }

      setServices(updatedServices)
      setEditingService(null)
      onDataChange()
      console.log('✅ Service saved successfully')
    } catch (error) {
      console.error('❌ Error saving service:', error)
      alert('Error saving service. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">Services Management (Fixed)</h3>
          <p className="text-neutral-600">Manage the services you offer</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset to Defaults
          </button>
          
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </button>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-neutral-900">Current Services ({services.length})</h4>
          <button
            onClick={addService}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </div>

        {services.map((service) => (
          <div key={service.id} className="bg-white border border-neutral-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-neutral-900">{service.title}</h5>
                    <p className="text-sm text-neutral-600">{service.description}</p>
                  </div>
                </div>
                
                {service.features && service.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {service.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => editService(service)}
                  className="p-2 text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  className="p-2 text-neutral-600 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="text-center py-12 bg-white border border-neutral-200 rounded-lg">
            <Briefcase className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600">No services yet. Add your first service!</p>
          </div>
        )}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h4 className="text-lg font-semibold text-neutral-900 mb-4">
              {services.find(s => s.id === editingService.id) ? 'Edit Service' : 'Add New Service'}
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Service Title
                </label>
                <input
                  type="text"
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Web Development"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Describe your service..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Icon
                </label>
                <select
                  value={editingService.icon || 'target'}
                  onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {availableIcons.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Features (one per line)
                </label>
                <textarea
                  value={Array.isArray(editingService.features) ? editingService.features.join('\n') : ''}
                  onChange={(e) => setEditingService({ 
                    ...editingService, 
                    features: e.target.value.split('\n').filter(f => f.trim()) 
                  })}
                  rows={4}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={saveEditingService}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Service
              </button>
              <button
                onClick={() => setEditingService(null)}
                className="px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}