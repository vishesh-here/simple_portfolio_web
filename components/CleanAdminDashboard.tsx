'use client'

import React, { useState } from 'react'
import { Settings, User, Briefcase, FolderOpen, Calendar, MessageSquare, Mail } from 'lucide-react'

// Import admin form components
import SiteSettingsForm from './admin/SiteSettingsForm'
import HeroSectionForm from './admin/HeroSectionForm'
import AboutSectionForm from './admin/AboutSectionForm'
import ServicesManagementFixed from './admin/ServicesManagementFixed'
import ProjectsManagement from './admin/ProjectsManagement'
import CareerTimelineForm from './admin/CareerTimelineForm'
import TestimonialsManagement from './admin/TestimonialsManagement'
import ContactInfoForm from './admin/ContactInfoForm'

interface AdminDashboardProps {
  onLogout?: () => void
}

const adminSections = [
  { id: 'site', label: 'Site Settings', icon: Settings, component: SiteSettingsForm },
  { id: 'hero', label: 'Hero Section', icon: User, component: HeroSectionForm },
  { id: 'about', label: 'About Me', icon: User, component: AboutSectionForm },
  { id: 'services', label: 'Services', icon: Briefcase, component: ServicesManagementFixed },
  { id: 'projects', label: 'Projects', icon: FolderOpen, component: ProjectsManagement },
  { id: 'career', label: 'Career', icon: Calendar, component: CareerTimelineForm },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, component: TestimonialsManagement },
  { id: 'contact', label: 'Contact', icon: Mail, component: ContactInfoForm },
]

export default function SimpleAdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState('site')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Get the active component
  const ActiveComponent = adminSections.find(section => section.id === activeSection)?.component

  const handleDataChange = () => {
    setHasUnsavedChanges(true)
  }

  const handleDataSave = () => {
    setHasUnsavedChanges(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-neutral-900">Portfolio Admin</h1>
            {hasUnsavedChanges && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                Unsaved Changes
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {onLogout && (
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 h-screen bg-white border-r border-neutral-200">
          <nav className="p-4 space-y-2">
            {adminSections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary-100 text-primary-900 border border-primary-200'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {section.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">


            {ActiveComponent && React.createElement(ActiveComponent, {
              onDataChange: handleDataChange,
              onDataSave: handleDataSave
            })}
          </div>
        </main>
      </div>
    </div>
  )
}