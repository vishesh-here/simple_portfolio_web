'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Check, AlertCircle } from 'lucide-react'
import { 
  validateImageFile, 
  processImageFile, 
  saveImageToStorage, 
  formatFileSize,
  ImageFile 
} from '@/lib/imageUtils'

interface ImageUploadProps {
  onImageSelect?: (imageFile: ImageFile) => void
  category?: string
  maxFiles?: number
  className?: string
}

export default function ImageUpload({
  onImageSelect,
  category,
  maxFiles = 1,
  className = ''
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection
  const handleFiles = useCallback(async (files: FileList) => {
    setError(null)
    setSuccess(null)
    
    const fileArray = Array.from(files).slice(0, maxFiles)
    
    for (const file of fileArray) {
      const validation = validateImageFile(file)
      if (!validation.valid) {
        setError(validation.error || 'Invalid file')
        return
      }
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      const processedImages: ImageFile[] = []
      
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i]
        setUploadProgress(((i + 0.5) / fileArray.length) * 100)
        
        const imageFile = await processImageFile(file, category)
        saveImageToStorage(imageFile)
        processedImages.push(imageFile)
        
        setUploadProgress(((i + 1) / fileArray.length) * 100)
      }

      setUploadedImages(prev => [...prev, ...processedImages])
      setSuccess(`Successfully uploaded ${processedImages.length} image(s)`)
      
      // If single file upload, automatically select it
      if (processedImages.length === 1 && onImageSelect) {
        onImageSelect(processedImages[0])
      }
      
    } catch (error) {
      console.error('Upload error:', error)
      setError('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }, [maxFiles, category, onImageSelect])

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFiles(files)
    }
  }, [handleFiles])

  // File input change handler
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFiles(files)
    }
  }, [handleFiles])

  // Open file dialog
  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  // Remove uploaded image
  const removeImage = (imageId: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId))
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
          ${isDragging 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-neutral-300 hover:border-primary-400 hover:bg-neutral-50'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={maxFiles > 1}
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
            <Upload className="w-6 h-6 text-neutral-600" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-neutral-900">
              {isDragging ? 'Drop images here' : 'Upload Images'}
            </p>
            <p className="text-sm text-neutral-600 mt-1">
              Drag and drop or click to select {maxFiles > 1 ? `up to ${maxFiles} files` : 'a file'}
            </p>
            <p className="text-xs text-neutral-500 mt-2">
              Supports JPG, PNG, WebP • Max 10MB per file
            </p>
          </div>
        </div>

        {/* Upload Progress */}
        <AnimatePresence>
          {uploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-lg"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-neutral-200"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - uploadProgress / 100)}`}
                      className="text-primary-500 transition-all duration-300"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-neutral-900">
                  Uploading... {Math.round(uploadProgress)}%
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto p-1 hover:bg-red-100 rounded"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700"
          >
            <Check className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{success}</span>
            <button
              onClick={() => setSuccess(null)}
              className="ml-auto p-1 hover:bg-green-100 rounded"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Uploaded Images Preview */}
      <AnimatePresence>
        {uploadedImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <h4 className="text-sm font-medium text-neutral-900">Recently Uploaded</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {uploadedImages.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group"
                >
                  <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden">
                    <img
                      src={image.data}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeImage(image.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="mt-1">
                    <p className="text-xs text-neutral-600 truncate">{image.name}</p>
                    <p className="text-xs text-neutral-500">{formatFileSize(image.size)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}