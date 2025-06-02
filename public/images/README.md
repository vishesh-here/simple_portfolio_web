# Images Directory 📸

This directory contains all images for your portfolio website.

## 📁 Current Structure

```
images/
├── README.md                    # This file
├── profile.jpg                  # Your main profile photo (add this)
├── about-me.jpg                 # About section photo (add this)
├── placeholder-project.jpg      # Fallback image (add this)
├── projects/                    # Project images
│   └── .gitkeep                # (replace with your project images)
├── testimonials/                # Client photos  
│   └── .gitkeep                # (replace with client photos)
├── career/                      # Company logos
│   └── .gitkeep                # (replace with company logos)
└── icons/                       # Custom icons & favicon
    └── .gitkeep                # (replace with your icons)
```

## 🎯 Quick Start

### 1. Add Your Profile Photo
- Add `profile.jpg` (400x400px recommended)
- Update path in `data/config.json` if needed

### 2. Add Project Images
- Create folders like `projects/project-name/`
- Add thumbnails and detail images
- Update paths in `data/projects.json`

### 3. Add Testimonial Photos
- Add client photos to `testimonials/`
- Update paths in `data/testimonials.json`

## 📏 Recommended Sizes

- **Profile photo:** 400x400px
- **Project thumbnails:** 600x400px  
- **Project details:** 1200x800px+
- **Testimonial photos:** 100x100px
- **Company logos:** 200x100px

## 🔗 How to Reference

Always use paths starting with `/images/`:

```json
{
  "thumbnail": "/images/projects/my-project-thumb.jpg",
  "profileImage": "/images/profile.jpg"
}
```

## 📖 Full Guide

See `IMAGE_GUIDE.md` in the root directory for complete documentation.

## ⚡ Quick Tips

- Optimize images before uploading (use TinyPNG)
- Use descriptive filenames (no spaces)
- Keep file sizes small for faster loading
- Test images on mobile devices