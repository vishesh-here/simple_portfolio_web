# Codebase Understanding Guide

## Project Overview
This is a modern portfolio website built with Next.js 14, React, TypeScript, Tailwind CSS, and Framer Motion. It features a clean, responsive design with an admin panel for content management.

## Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Markdown**: React Markdown with GitHub Flavored Markdown

### Project Structure

```
├── app/                          # Next.js App Router pages
│   ├── admin/                    # Admin panel page
│   ├── projects/                 # Projects pages
│   │   ├── [id]/                 # Dynamic project detail pages
│   │   └── page.tsx              # Projects listing page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── admin/                    # Admin-specific components
│   ├── *Section.tsx              # Main page sections
│   └── *.tsx                     # Other components
├── data/                         # Static JSON data files
│   ├── career.json               # Career timeline data
│   ├── config.json               # Site configuration
│   ├── projects.json             # Projects data
│   └── testimonials.json         # Testimonials data
├── lib/                          # Utility libraries
│   ├── hooks.ts                  # Custom React hooks
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # Utility functions
└── scripts/                      # Build and deployment scripts
```

## Data Management

### Data Sources
The application uses a dual data source approach:
1. **Static JSON files** in `/data/` directory (fallback)
2. **localStorage** for admin-managed content (primary when available)

### Key Data Types

#### Project
```typescript
interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  tags: string[]
  year: string
  client: string
  duration: string
  role: string
  overview: string
  challenge: string
  solution: string
  results: string[]
  images: string[]
  content: ProjectContent[]
}
```

#### CareerItem
```typescript
interface CareerItem {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string | null
  description: string
  technologies: string[]
}
```

#### Testimonial
```typescript
interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}
```

#### Config
```typescript
interface Config {
  name: string
  title: string
  description: string
  email: string
  phone: string
  location: string
  website: string
  social: {
    linkedin: string
    github: string
    twitter: string
    dribbble: string
  }
  resume: string
}
```

## Custom Hooks

### Data Hooks
- `usePortfolioConfig()` - Loads site configuration
- `usePortfolioProjects()` - Loads projects data
- `usePortfolioCareer()` - Loads career timeline
- `usePortfolioTestimonials()` - Loads testimonials

### Utility Hooks
- `useScrollPosition()` - Tracks scroll position
- `useIntersectionObserver()` - Observes element visibility
- `useLocalStorage()` - Manages localStorage with type safety
- `useMediaQuery()` - Responsive design helper

## Key Features

### Admin Panel
- Located at `/admin`
- Allows editing of all content types
- Stores data in localStorage
- Falls back to static JSON files

### Projects System
- Dynamic routing with `/projects/[id]`
- Filtering by tags and search
- Rich content support (text, images, tables)
- Responsive grid layout

### Responsive Design
- Mobile-first approach
- Tailwind CSS utility classes
- Custom breakpoints and spacing

### Animations
- Framer Motion for smooth transitions
- Scroll-triggered animations
- Hover effects and micro-interactions

## Common Patterns

### Component Structure
```typescript
'use client' // For client-side components

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
// Other imports...

const ComponentName = () => {
  // State and hooks
  
  // Animation variants
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
  
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      {/* Component content */}
    </motion.div>
  )
}

export default ComponentName
```

### Data Loading Pattern
```typescript
const data = usePortfolioData() // Custom hook
const [filteredData, setFilteredData] = useState([])

useEffect(() => {
  setFilteredData(data)
}, [data])
```

## Styling Conventions

### CSS Classes
- `container-width` - Max width container
- `section-padding` - Standard section padding
- `card` - Standard card styling
- `btn-primary` - Primary button styling

### Color Scheme
- Primary: Blue tones (primary-*)
- Neutral: Gray tones (neutral-*)
- Success/Error: Standard semantic colors

## Build and Deployment

### Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint checking
- `npm run setup-admin` - Admin setup script

### Environment
- Node.js 18+
- Next.js 14
- TypeScript 5

## Known Issues and Considerations

1. **Type Safety**: Some components need better TypeScript typing
2. **Data Persistence**: Admin changes only persist in localStorage
3. **Image Optimization**: Images should be optimized for web
4. **SEO**: Meta tags and structured data could be enhanced
5. **Accessibility**: ARIA labels and keyboard navigation need review

## Development Guidelines

1. **TypeScript**: Always use proper typing
2. **Components**: Keep components small and focused
3. **Hooks**: Extract reusable logic into custom hooks
4. **Styling**: Use Tailwind utilities, avoid custom CSS
5. **Animation**: Use Framer Motion for consistent animations
6. **Data**: Always handle loading and error states

## Testing Strategy

1. **Type Checking**: TypeScript compilation
2. **Linting**: ESLint for code quality
3. **Manual Testing**: Cross-browser and device testing
4. **Performance**: Lighthouse audits

This codebase follows modern React and Next.js best practices with a focus on maintainability, performance, and user experience.