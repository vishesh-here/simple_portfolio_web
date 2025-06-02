'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Image as ImageIcon, 
  Trash2, 
  Download, 
  Copy, 
  Check, 
  Search,
  Filter,
  Grid,
  List
} from 'lucide-react'
import { 
  getImagesFromStorage, 
  deleteImageFromStorage, 
  formatFileSize,
  ImageFile 
} from '@/lib/imageUtils'

interface ImageLibraryProps {
  onImageSelect?: (imageFile: ImageFile) => void
  selectedImageId?: string
  category?: string
  className?: string
}

export default function ImageLibrary({
  onImageSelect,
  selectedImageId,
  category,
  className = ''
}: ImageLibraryProps) {
  const [images, setImages] = useState<ImageFile[]>([])
  const [filteredImages, setFilteredImages] = useState<ImageFile[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Load images on component mount
  useEffect(() => {
    loadImages()
  }, [])

  // Filter images based on search and category
  useEffect(() => {
    let filtered = images

    // Filter by category
    if (category) {
      filtered = filtered.filter(img => img.category === category)
    } else if (selectedCategory !== 'all') {
      filtered = filtered.filter(img => img.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(img => 
        img.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredImages(filtered)
  }, [images, searchTerm, selectedCategory, category])

  const loadImages = () => {
    const storedImages = getImagesFromStorage()
    setImages(storedImages)
  }

  const handleDeleteImage = (imageId: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      deleteImageFromStorage(imageId)
      loadImages()
    }
  }

  const handleCopyImageData = async (imageData: string) => {
    try {
      await navigator.clipboard.writeText(imageData)
      setCopiedId(imageData)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error('Failed to copy image data:', error)
    }
  }

  const downloadImage = (image: ImageFile) => {
    const link = document.createElement('a')
    link.href = image.data
    link.download = image.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getCategories = () => {
    const categories = Array.from(new Set(images.map(img => img.category).filter(Boolean)))
    return ['all', ...categories]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (images.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <ImageIcon className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-neutral-900 mb-2">No images uploaded</h3>
        <p className="text-neutral-600">Upload some images to see them here.</p>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">Image Library</h3>
          <p className="text-sm text-neutral-600">{images.length} images uploaded</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-primary-100 text-primary-700' 
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-primary-100 text-primary-700' 
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        {!category && (
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
            >
              {getCategories().map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat || 'Uncategorized'}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Images Grid/List */}
      <AnimatePresence mode="wait">
        {filteredImages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <p className="text-neutral-600">No images match your search criteria.</p>
          </motion.div>
        ) : viewMode === 'grid' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className={`group relative bg-white rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  selectedImageId === image.id
                    ? 'border-primary-500 ring-2 ring-primary-200'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
                onClick={() => onImageSelect?.(image)}
              >
                <div className="aspect-square bg-neutral-100 rounded-t-lg overflow-hidden">
                  <img
                    src={image.data}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-3">
                  <p className="text-sm font-medium text-neutral-900 truncate">{image.name}</p>
                  <p className="text-xs text-neutral-500">{formatFileSize(image.size)}</p>
                </div>

                {/* Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopyImageData(image.data)
                      }}
                      className="p-1.5 bg-white/90 hover:bg-white rounded-lg shadow-sm transition-colors"
                      title="Copy image data"
                    >
                      {copiedId === image.data ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-neutral-600" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        downloadImage(image)
                      }}
                      className="p-1.5 bg-white/90 hover:bg-white rounded-lg shadow-sm transition-colors"
                      title="Download image"
                    >
                      <Download className="w-3 h-3 text-neutral-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteImage(image.id)
                      }}
                      className="p-1.5 bg-white/90 hover:bg-white rounded-lg shadow-sm transition-colors"
                      title="Delete image"
                    >
                      <Trash2 className="w-3 h-3 text-red-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-4 p-4 bg-white rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  selectedImageId === image.id
                    ? 'border-primary-500 ring-2 ring-primary-200'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
                onClick={() => onImageSelect?.(image)}
              >
                <div className="w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={image.data}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-neutral-900 truncate">{image.name}</p>
                  <p className="text-sm text-neutral-600">{formatFileSize(image.size)}</p>
                  <p className="text-xs text-neutral-500">Uploaded {formatDate(image.uploadedAt)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCopyImageData(image.data)
                    }}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                    title="Copy image data"
                  >
                    {copiedId === image.data ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      downloadImage(image)
                    }}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                    title="Download image"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteImage(image.id)
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}