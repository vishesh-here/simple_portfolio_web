'use client'

import React from 'react'
import ImageLibrary from './ImageLibrary'

interface ImageLibraryWrapperProps {
  onDataChange: () => void
  onDataSave: () => void
}

export default function ImageLibraryWrapper({ onDataChange, onDataSave }: ImageLibraryWrapperProps) {
  // These props are required by the admin dashboard interface but not used by ImageLibrary
  // They're here to maintain compatibility with the admin dashboard component system
  
  // Suppress unused variable warnings
  void onDataChange;
  void onDataSave;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">Image Management</h3>
          <p className="text-neutral-600">Upload and manage images for your portfolio</p>
        </div>
      </div>
      
      <ImageLibrary />
    </div>
  )
}