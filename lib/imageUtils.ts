// Image utility functions for upload, compression, and management

export interface ImageFile {
  id: string
  name: string
  data: string // Base64 data
  size: number
  type: string
  uploadedAt: string
  category?: string
}

// Compress and resize image
export const compressImage = (file: File, maxWidth = 1200, quality = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }

      canvas.width = width
      canvas.height = height

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height)
      const compressedData = canvas.toDataURL(file.type, quality)
      resolve(compressedData)
    }

    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

// Validate image file
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const maxSize = 10 * 1024 * 1024 // 10MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload a valid image file (JPG, PNG, or WebP)' }
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image size must be less than 10MB' }
  }

  return { valid: true }
}

// Generate unique ID
export const generateImageId = (): string => {
  return `img_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

// Get file size in human readable format
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Image storage functions
export const saveImageToStorage = (imageFile: ImageFile): void => {
  const existingImages = getImagesFromStorage()
  const updatedImages = [...existingImages, imageFile]
  localStorage.setItem('admin-images', JSON.stringify(updatedImages))
}

export const getImagesFromStorage = (): ImageFile[] => {
  try {
    const images = localStorage.getItem('admin-images')
    return images ? JSON.parse(images) : []
  } catch (error) {
    console.error('Error loading images from storage:', error)
    return []
  }
}

export const deleteImageFromStorage = (imageId: string): void => {
  const existingImages = getImagesFromStorage()
  const updatedImages = existingImages.filter(img => img.id !== imageId)
  localStorage.setItem('admin-images', JSON.stringify(updatedImages))
}

export const getImageById = (imageId: string): ImageFile | null => {
  const images = getImagesFromStorage()
  return images.find(img => img.id === imageId) || null
}

// Convert File to ImageFile
export const processImageFile = async (
  file: File, 
  category?: string
): Promise<ImageFile> => {
  const compressedData = await compressImage(file)
  
  return {
    id: generateImageId(),
    name: file.name,
    data: compressedData,
    size: file.size,
    type: file.type,
    uploadedAt: new Date().toISOString(),
    category
  }
}