'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image as ImageIcon, Upload, X } from 'lucide-react'
import ImageUpload from './ImageUpload'
import ImageLibrary from './ImageLibrary'
import { ImageFile, getImageById } from '@/lib/imageUtils'

interface ImageSelectorProps {
  value?: string // Image ID or base64 data
  onChange: (imageData: string) => void
  label?: string
  category?: string
  placeholder?: string
  className?: string
  showPreview?: boolean
}

export default function ImageSelector({
  value,
  onChange,
  label,
  category,
  placeholder = "No image selected",
  className = ''
}: ImageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'upload' | 'library'>('library')

  // Get current image data
  const getCurrentImage = (): string | null => {
    if (!value) return null
    
    // If value is already base64 data, return it
    if (value.startsWith('data:image/')) {
      return value
    }
    
    // If value is an image ID, get from storage
    const imageFile = getImageById(value)
    return imageFile?.data || null
  }

  const currentImageData = getCurrentImage()

  const handleImageSelect = (imageFile: ImageFile) => {
    onChange(imageFile.data)
    setIsOpen(false)
  }

  const handleRemoveImage = () => {
    onChange('')
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label}
        </label>
      )}

      {/* Current Image Display */}
      <div className="space-y-3">
        {currentImageData ? (
          <div className="relative group">
            <div className="w-full h-48 bg-neutral-100 rounded-lg overflow-hidden border-2 border-neutral-200">
              <img
                src={currentImageData}
                alt="Selected image"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => setIsOpen(true)}
            className="w-full h-48 border-2 border-dashed border-neutral-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-neutral-50 transition-all duration-200"
          >
            <ImageIcon className="w-8 h-8 text-neutral-400 mb-2" />
            <p className="text-sm text-neutral-600">{placeholder}</p>
            <p className="text-xs text-neutral-500 mt-1">Click to select an image</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            {currentImageData ? 'Change Image' : 'Select Image'}
          </button>
          {currentImageData && (
            <button
              onClick={handleRemoveImage}
              className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Image Selection Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <h2 className="text-xl font-semibold text-neutral-900">Select Image</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-neutral-200">
                <button
                  onClick={() => setActiveTab('library')}
                  className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'library'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <ImageIcon className="w-4 h-4 inline mr-2" />
                  Image Library
                </button>
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'upload'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Upload className="w-4 h-4 inline mr-2" />
                  Upload New
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeTab === 'library' ? (
                    <motion.div
                      key="library"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <ImageLibrary
                        onImageSelect={handleImageSelect}
                        selectedImageId={value}
                        category={category}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <ImageUpload
                        onImageSelect={handleImageSelect}
                        category={category}
                        maxFiles={1}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}