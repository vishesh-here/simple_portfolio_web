# Image Storage & Management Guide 📸

## 📁 Directory Structure

All images are stored in the `public/images/` directory:

```
public/
└── images/
    ├── profile.jpg                    # Your main profile photo
    ├── about-me.jpg                   # About section image
    ├── placeholder-project.jpg        # Fallback for missing project images
    ├── projects/                      # Project-related images
    │   ├── project-1-thumb.jpg       # Project thumbnails
    │   ├── project-1-detail-1.jpg    # Project detail images
    │   ├── project-1-detail-2.jpg
    │   ├── project-2-thumb.jpg
    │   └── ...
    ├── testimonials/                  # Client/testimonial photos
    │   ├── client-1.jpg
    │   ├── client-2.jpg
    │   └── ...
    ├── career/                        # Company logos (optional)
    │   ├── company-1-logo.png
    │   └── ...
    └── icons/                         # Custom icons (optional)
        ├── favicon.ico
        └── ...
```

## 🔗 How to Reference Images

### In JSON Files:
Always use paths starting with `/images/`:

```json
{
  "profileImage": "/images/profile.jpg",
  "thumbnail": "/images/projects/my-project-thumb.jpg",
  "images": [
    "/images/projects/my-project-1.jpg",
    "/images/projects/my-project-2.jpg"
  ]
}
```

### In React Components:
```jsx
import Image from 'next/image'

<Image 
  src="/images/profile.jpg" 
  alt="Profile photo"
  width={400}
  height={400}
/>
```

## 📋 Image Requirements by Section

### 1. Profile Images
**Location:** `public/images/`
- **`profile.jpg`** - Main hero section photo (400x400px recommended)
- **`about-me.jpg`** - About section photo (600x800px recommended)

### 2. Project Images
**Location:** `public/images/projects/`
- **Thumbnails:** 600x400px (3:2 aspect ratio)
- **Detail images:** 1200x800px or larger
- **Format:** JPG or WebP for photos, PNG for screenshots

**Naming Convention:**
```
project-name-thumb.jpg          # Thumbnail for project cards
project-name-1.jpg              # First detail image
project-name-2.jpg              # Second detail image
project-name-mockup.jpg         # Mockup/hero image
```

### 3. Testimonial Images
**Location:** `public/images/testimonials/`
- **Size:** 100x100px (square)
- **Format:** JPG or PNG
- **Naming:** `client-name.jpg` or `firstname-lastname.jpg`

### 4. Company Logos (Optional)
**Location:** `public/images/career/`
- **Size:** 200x100px (2:1 aspect ratio)
- **Format:** PNG with transparent background
- **Naming:** `company-name-logo.png`

## 🎨 Image Optimization Guidelines

### File Sizes:
- **Thumbnails:** < 100KB
- **Detail images:** < 500KB
- **Profile photos:** < 200KB
- **Testimonial photos:** < 50KB

### Formats:
- **Photos:** JPG (smaller file size)
- **Screenshots:** PNG (better quality)
- **Modern browsers:** WebP (best compression)
- **Logos:** SVG (scalable) or PNG (transparent)

### Dimensions:
- **Project thumbnails:** 600x400px (3:2 ratio)
- **Project details:** 1200x800px minimum
- **Profile photo:** 400x400px (square)
- **About photo:** 600x800px (portrait)
- **Testimonials:** 100x100px (square)

## 🛠️ Adding New Images

### Step 1: Prepare Your Images
1. Resize to recommended dimensions
2. Optimize file size (use tools like TinyPNG)
3. Use descriptive filenames (no spaces, use hyphens)

### Step 2: Upload to Correct Folder
```bash
# Example structure
public/images/projects/ecommerce-redesign-thumb.jpg
public/images/projects/ecommerce-redesign-1.jpg
public/images/projects/ecommerce-redesign-2.jpg
```

### Step 3: Update JSON Files
```json
// In data/projects.json
{
  "id": "ecommerce-redesign",
  "title": "E-commerce Redesign",
  "thumbnail": "/images/projects/ecommerce-redesign-thumb.jpg",
  "images": [
    "/images/projects/ecommerce-redesign-1.jpg",
    "/images/projects/ecommerce-redesign-2.jpg"
  ]
}
```

### Step 4: Test Locally
```bash
npm run dev
# Check that images load correctly
```

## 🔧 Image Tools & Resources

### Optimization Tools:
- **TinyPNG** - Compress images online
- **Squoosh** - Google's image optimizer
- **ImageOptim** - Mac app for optimization
- **GIMP/Photoshop** - Professional editing

### Stock Photo Resources:
- **Unsplash** - Free high-quality photos
- **Pexels** - Free stock photos
- **Pixabay** - Free images and vectors
- **Freepik** - Free vectors and photos (attribution required)

### Mockup Tools:
- **Figma** - Design and mockup tool
- **Canva** - Easy design tool
- **Mockup World** - Free device mockups
- **Placeit** - Mockup generator

## 🚨 Common Issues & Solutions

### Images Not Loading:
1. **Check file path** - Must start with `/images/`
2. **Verify file exists** - Check spelling and location
3. **Check file extension** - .jpg, .png, .webp
4. **Clear browser cache** - Hard refresh (Ctrl+F5)

### Images Too Large:
1. **Compress images** - Use TinyPNG or similar
2. **Resize dimensions** - Don't use 4K images for thumbnails
3. **Use WebP format** - Better compression than JPG

### Images Look Blurry:
1. **Use higher resolution** - 2x the display size
2. **Check compression settings** - Don't over-compress
3. **Use PNG for screenshots** - Better quality than JPG

## 📱 Responsive Images

The portfolio automatically handles responsive images using Next.js Image component:

```jsx
<Image
  src="/images/projects/my-project.jpg"
  alt="Project description"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

## 🔄 Image Workflow

### For New Projects:
1. **Create project folder** (optional, for organization)
2. **Add thumbnail** - Shows in project grid
3. **Add detail images** - Shows in project page
4. **Update projects.json** - Reference new images
5. **Test locally** - Verify everything works

### For Profile Updates:
1. **Replace existing image** - Keep same filename
2. **Or add new image** - Update config.json path
3. **Optimize file size** - Keep under 200KB
4. **Test on mobile** - Ensure it looks good on small screens

## 📊 Image Analytics

To track image performance:
1. **Use browser DevTools** - Check load times
2. **Run Lighthouse audit** - Performance score
3. **Monitor Core Web Vitals** - LCP (Largest Contentful Paint)
4. **Check mobile performance** - Images often cause slow loading

## 🎯 Best Practices

### ✅ Do:
- Use descriptive alt text for accessibility
- Optimize images before uploading
- Use consistent naming conventions
- Test on different devices and screen sizes
- Keep backup copies of original images

### ❌ Don't:
- Upload massive unoptimized images
- Use spaces in filenames
- Forget to update JSON references
- Use copyrighted images without permission
- Skip alt text for accessibility

## 🚀 Advanced: CDN Integration

For better performance, consider using a CDN:

### Option 1: Cloudinary
```javascript
// In next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
}
```

### Option 2: Vercel Image Optimization
Automatically enabled when deploying to Vercel.

### Option 3: Custom CDN
Upload images to AWS S3, Google Cloud, or similar.

## 📝 Image Checklist

Before deploying:
- [ ] All images optimized for web
- [ ] File sizes under recommended limits
- [ ] All paths correctly referenced in JSON
- [ ] Alt text added for accessibility
- [ ] Images look good on mobile
- [ ] No broken image links
- [ ] Backup copies saved locally