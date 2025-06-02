'use client'

import React from 'react'
import { usePortfolioProjects } from '@/lib/hooks'

export default function ProjectsTest() {
  const projects = usePortfolioProjects()

  return (
    <div className="p-8 bg-white rounded-lg border">
      <h2 className="text-xl font-bold mb-4">Projects Data Test</h2>
      
      <div className="space-y-4">
        <div>
          <strong>Projects loaded:</strong> {projects ? projects.length : 'Loading...'}
        </div>
        
        {projects && projects.length > 0 && (
          <div>
            <strong>First project:</strong>
            <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
              {JSON.stringify(projects[0], null, 2)}
            </pre>
          </div>
        )}
        
        <div>
          <strong>LocalStorage data:</strong>
          <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
            {typeof window !== 'undefined' 
              ? localStorage.getItem('admin-projects') || 'No data in localStorage'
              : 'Server-side rendering'
            }
          </pre>
        </div>
      </div>
    </div>
  )
}