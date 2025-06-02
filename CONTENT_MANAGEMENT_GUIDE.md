# 📝 Content Management Guide

This guide explains how to customize every part of your portfolio website.

## 🔐 Admin Access

**URL:** `yoursite.com/admin` (bookmark this!)  
**Default Password:** `admin123`

> ⚠️ **Security Note:** The admin panel is hidden from navigation but accessible via direct URL. Change the password in your environment variables.

---

## 🎯 What You Can Edit

### 1. **Projects** (via Admin Dashboard)
- **Access:** `/admin` → Projects tab
- **Features:**
  - ✅ Add/Edit/Delete projects
  - ✅ Upload images (via URL)
  - ✅ Edit project details, tags, results
  - ✅ Real-time preview

### 2. **Personal Information**
- **File:** `data/config.json`
- **What to edit:**
  ```json
  {
    "name": "Your Name",
    "title": "Your Professional Title",
    "description": "Brief bio description",
    "email": "your@email.com",
    "phone": "+1 (555) 123-4567",
    "location": "Your City, Country",
    "website": "https://yoursite.com",
    "social": {
      "linkedin": "https://linkedin.com/in/yourprofile",
      "github": "https://github.com/yourusername",
      "twitter": "https://twitter.com/yourusername",
      "dribbble": "https://dribbble.com/yourusername"
    },
    "resume": "/resume.pdf"
  }
  ```

### 3. **Career Timeline**
- **File:** `data/career.json`
- **Add your work experience:**
  ```json
  [
    {
      "id": "job-1",
      "title": "Senior Developer",
      "company": "Company Name",
      "location": "City, Country",
      "startDate": "2023-01",
      "endDate": null,
      "description": "What you did in this role...",
      "technologies": ["React", "Node.js", "TypeScript"]
    }
  ]
  ```

### 4. **Testimonials**
- **File:** `data/testimonials.json`
- **Add client testimonials:**
  ```json
  [
    {
      "id": "testimonial-1",
      "name": "Client Name",
      "role": "CEO",
      "company": "Company Name",
      "content": "Amazing work! Highly recommended...",
      "avatar": "/images/avatars/client1.jpg",
      "rating": 5
    }
  ]
  ```

### 5. **Services**
- **File:** `data/services.json`
- **Add your services:**
  ```json
  [
    {
      "id": "service-1",
      "title": "Web Development",
      "description": "Custom web applications...",
      "icon": "Code",
      "features": [
        "React & Next.js",
        "TypeScript",
        "Responsive Design"
      ]
    }
  ]
  ```

---

## 📸 Image Management

### **Where to Place Images:**
```
public/
├── images/
│   ├── projects/          # Project images
│   │   ├── project-1.jpg
│   │   └── project-thumb.jpg
│   ├── avatars/           # Testimonial avatars
│   │   └── client1.jpg
│   ├── hero-bg.jpg        # Hero background
│   └── profile.jpg        # Your profile photo
└── resume.pdf             # Your resume
```

### **Image Upload Process:**
1. **Add images to folders** above
2. **Reference in admin panel** or JSON files:
   - Thumbnail: `/images/projects/project-thumb.jpg`
   - Gallery: `/images/projects/project-1.jpg`
   - Avatar: `/images/avatars/client1.jpg`

### **Recommended Image Sizes:**
- **Project thumbnails:** 600x400px
- **Project gallery:** 1200x800px
- **Profile photo:** 400x400px
- **Testimonial avatars:** 100x100px

---

## 🎨 Styling & Colors

### **Main Colors** (in `app/globals.css`):
```css
:root {
  --primary-50: #eff6ff;
  --primary-500: #3b82f6;  /* Main blue */
  --primary-600: #2563eb;
  --accent-500: #8b5cf6;   /* Purple accent */
}
```

### **Typography:**
- **Font:** Inter (Google Fonts)
- **Headings:** Bold, gradient text effects
- **Body:** Regular weight, neutral colors

---

## 🔧 Advanced Customization

### **Adding New Sections:**
1. Create component in `components/`
2. Import in `app/page.tsx`
3. Add to main layout

### **Changing Layout:**
- **File:** `app/page.tsx`
- **Sections order:**
  ```tsx
  <HeroSection />
  <AboutSection />
  <ServicesSection />
  <ProjectsSection />
  <CareerSection />
  <TestimonialsSection />
  <ContactSection />
  ```

### **SEO Settings:**
- **File:** `app/layout.tsx`
- **Update metadata:**
  ```tsx
  export const metadata: Metadata = {
    title: 'Your Name - Portfolio',
    description: 'Your professional description...',
  }
  ```

---

## 🚀 Deployment

### **Before Deploying:**
1. ✅ Update all personal information
2. ✅ Add your projects via admin panel
3. ✅ Upload all images
4. ✅ Test on mobile devices
5. ✅ Change admin password

### **Environment Variables:**
Create `.env.local`:
```env
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

### **Deploy to Vercel:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy!

---

## 📱 Mobile Optimization

The portfolio is fully responsive and optimized for:
- ✅ Mobile phones
- ✅ Tablets
- ✅ Desktop screens
- ✅ Touch interactions

---

## 🆘 Common Issues

### **Images not showing:**
- Check file paths start with `/`
- Ensure images are in `public/` folder
- Verify file names match exactly

### **Admin panel not working:**
- Clear browser cache
- Check password is correct
- Try incognito/private mode

### **Content not updating:**
- Restart development server
- Clear browser cache
- Check JSON syntax is valid

---

## 📞 Need Help?

If you need assistance:
1. Check this guide first
2. Look at existing examples in JSON files
3. Test changes in admin panel
4. Restart development server if needed

**Remember:** Always backup your data files before making major changes!