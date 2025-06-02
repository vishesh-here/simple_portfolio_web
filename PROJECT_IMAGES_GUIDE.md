# Project Images Guide

## Overview
The portfolio website supports two types of project images:
1. **Thumbnail Image** - Main project image shown on cards and hero sections
2. **Gallery Images** - Additional images displayed in the project detail page

## How to Upload Project Images

### 1. Thumbnail Image
- **Location**: Admin Panel → Projects → Edit Project → "Project Thumbnail"
- **Purpose**: Main image representing the project
- **Display**: 
  - Project cards on homepage
  - Projects grid page
  - Hero section of project detail page
- **Recommended Size**: 1200x800px (3:2 aspect ratio)

### 2. Gallery Images
- **Location**: Admin Panel → Projects → Edit Project → "Project Gallery"
- **Purpose**: Showcase different aspects of the project
- **Display**: Gallery section on project detail page
- **Recommended Size**: 1200x800px or larger

## Where Images Are Displayed

### Homepage Projects Section
```
┌─────────────────────────────────────┐
│ [Thumbnail Image]                   │
│                                     │
│ Project Title                       │
│ Short description...                │
│ [Tech] [Tags]                       │
└─────────────────────────────────────┘
```

### Projects Grid Page
```
┌──────────────┬──────────────┬──────────────┐
│ [Thumbnail]  │ [Thumbnail]  │ [Thumbnail]  │
│ Project 1    │ Project 2    │ Project 3    │
└──────────────┴──────────────┴──────────────┘
```

### Project Detail Page

#### Hero Section
```
┌─────────────────────────────────────────────────────────┐
│ Project Info          │  [Large Thumbnail Image]       │
│ • Title               │                                 │
│ • Description         │                                 │
│ • Meta (Year, Client) │                                 │
└─────────────────────────────────────────────────────────┘
```

#### Gallery Section
```
┌─────────────────────────────────────────────────────────┐
│                Project Gallery                          │
│                                                         │
│ ┌─────────────────┐    ┌─────────────────┐             │
│ │ [Gallery Img 1] │    │ [Gallery Img 2] │             │
│ └─────────────────┘    └─────────────────┘             │
│                                                         │
│ ┌─────────────────┐    ┌─────────────────┐             │
│ │ [Gallery Img 3] │    │ [Gallery Img 4] │             │
│ └─────────────────┘    └─────────────────┘             │
└─────────────────────────────────────────────────────────┘
```

## Image Upload Options

### Method 1: Upload New Images
1. Click "Upload New" tab in image selector
2. Drag & drop or click to select image files
3. Images are automatically optimized and stored
4. Base64 encoded for immediate use

### Method 2: Use Image Library
1. Click "Image Library" tab in image selector
2. Browse previously uploaded images
3. Select from organized categories
4. Reuse images across different projects

## Image Storage & Management

### Storage Location
- **Development**: Base64 encoded in localStorage
- **Production**: Can be configured for cloud storage (AWS S3, Cloudinary, etc.)

### Image Categories
Images are organized by categories:
- `projects` - Project-related images
- `profile` - Profile and about images
- `general` - General purpose images

### File Formats Supported
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- SVG (.svg)

## Best Practices

### Image Optimization
- **Thumbnail**: 1200x800px (3:2 ratio)
- **Gallery**: 1200x800px or larger
- **File Size**: Keep under 500KB for web performance
- **Format**: Use WebP for best compression, fallback to JPEG

### Gallery Image Ideas
1. **Desktop Screenshots** - Full application views
2. **Mobile Screenshots** - Responsive design showcase
3. **Before/After** - Comparison images
4. **Process Images** - Design mockups, wireframes
5. **Feature Highlights** - Specific functionality demos
6. **User Interface** - Different pages/sections
7. **Code Snippets** - Technical implementation highlights

### SEO & Accessibility
- Images automatically get descriptive alt text
- Lazy loading for performance
- Responsive image sizing
- Proper aspect ratios maintained

## Technical Implementation

### Data Structure
```json
{
  "id": "project-1",
  "title": "Project Name",
  "thumbnail": "base64_or_url_string",
  "images": [
    "gallery_image_1_base64_or_url",
    "gallery_image_2_base64_or_url",
    "gallery_image_3_base64_or_url"
  ]
}
```

### Admin Panel Mapping
- Admin uses `image` field for editing
- Frontend uses `thumbnail` field for display
- Gallery uses `images` array (mapped to `gallery` in admin)

### Display Components
- **ProjectsSection.tsx** - Homepage project cards
- **ProjectDetail.tsx** - Detailed project page with gallery
- **Image.tsx** - Next.js optimized image component

## Troubleshooting

### Images Not Showing
1. Check if image URL is valid
2. Verify image format is supported
3. Check browser console for errors
4. Ensure images are properly saved in admin

### Performance Issues
1. Optimize image file sizes
2. Use WebP format when possible
3. Limit gallery to 6-8 images max
4. Consider lazy loading for large galleries

### Upload Errors
1. Check file size (max 5MB recommended)
2. Verify file format is supported
3. Ensure stable internet connection
4. Try refreshing the admin panel

## Future Enhancements

### Planned Features
- [ ] Image compression on upload
- [ ] Cloud storage integration
- [ ] Image editing tools
- [ ] Bulk image upload
- [ ] Image metadata management
- [ ] Advanced gallery layouts (lightbox, carousel)
- [ ] Image CDN integration
- [ ] Automatic image optimization