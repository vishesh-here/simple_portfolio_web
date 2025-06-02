# Project Structure

This document explains the structure and organization of the portfolio website.

## Directory Structure

```
portfolio/
├── app/                          # Next.js App Router directory
│   ├── admin/                    # Admin panel pages
│   │   └── page.tsx             # Admin dashboard
│   ├── projects/                 # Project detail pages
│   │   └── [id]/                # Dynamic project pages
│   │       └── page.tsx         # Individual project page
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Homepage
│
├── components/                   # Reusable React components
│   ├── AboutSection.tsx         # About me section
│   ├── AdminDashboard.tsx       # Admin panel interface
│   ├── CareerSection.tsx        # Career timeline
│   ├── ContactSection.tsx       # Contact form and info
│   ├── Footer.tsx               # Site footer
│   ├── HeroSection.tsx          # Hero/landing section
│   ├── Navigation.tsx           # Main navigation
│   ├── ProjectDetail.tsx        # Project detail view
│   ├── ProjectsSection.tsx      # Projects showcase
│   ├── ServicesSection.tsx      # Services offered
│   └── TestimonialsSection.tsx  # Client testimonials
│
├── data/                        # JSON configuration files
│   ├── career.json              # Career timeline data
│   ├── config.json              # Site configuration
│   ├── projects.json            # Projects data
│   └── testimonials.json        # Testimonials data
│
├── lib/                         # Utility functions and hooks
│   ├── hooks.ts                 # Custom React hooks
│   └── utils.ts                 # Helper functions
│
├── public/                      # Static assets
│   └── images/                  # Image assets
│       ├── projects/            # Project images
│       └── testimonials/        # Testimonial images
│
├── scripts/                     # Build and setup scripts
│   └── setup.js                # Initial setup script
│
└── Configuration files
    ├── .env.example             # Environment variables template
    ├── .gitignore              # Git ignore rules
    ├── next.config.js          # Next.js configuration
    ├── package.json            # Dependencies and scripts
    ├── postcss.config.js       # PostCSS configuration
    ├── tailwind.config.js      # Tailwind CSS configuration
    ├── tsconfig.json           # TypeScript configuration
    └── vercel.json             # Vercel deployment config
```

## Key Components

### Layout Components

- **`app/layout.tsx`**: Root layout with navigation and footer
- **`components/Navigation.tsx`**: Responsive navigation with mobile menu
- **`components/Footer.tsx`**: Site footer with links and contact info

### Section Components

- **`components/HeroSection.tsx`**: Landing section with intro and CTA
- **`components/ServicesSection.tsx`**: Services/skills showcase
- **`components/ProjectsSection.tsx`**: Featured projects grid
- **`components/CareerSection.tsx`**: Professional timeline
- **`components/TestimonialsSection.tsx`**: Client testimonials
- **`components/AboutSection.tsx`**: Personal story and interests
- **`components/ContactSection.tsx`**: Contact form and information

### Specialized Components

- **`components/ProjectDetail.tsx`**: Detailed project view
- **`components/AdminDashboard.tsx`**: Content management interface

## Data Management

### Configuration Files

All content is managed through JSON files in the `data/` directory:

1. **`config.json`**: Site metadata, hero content, services, about info, contact details
2. **`projects.json`**: Project portfolio with detailed information
3. **`career.json`**: Professional timeline and achievements
4. **`testimonials.json`**: Client testimonials and reviews

### Data Flow

1. JSON files are imported as static data
2. Components receive data as props
3. Admin panel can modify data (stored in localStorage for demo)
4. Dynamic routes use data to generate pages

## Styling System

### Tailwind CSS

- **Base styles**: Defined in `app/globals.css`
- **Component styles**: Utility classes in components
- **Custom styles**: Extended in `tailwind.config.js`
- **Responsive design**: Mobile-first approach

### Design Tokens

- **Colors**: Primary, secondary, neutral palettes
- **Typography**: Font families, sizes, weights
- **Spacing**: Consistent spacing scale
- **Animations**: Custom Framer Motion animations

## Routing

### Static Routes

- `/` - Homepage with all sections
- `/admin` - Admin dashboard

### Dynamic Routes

- `/projects/[id]` - Individual project pages

## Features

### Performance

- **Next.js optimizations**: Image optimization, code splitting
- **Static generation**: Pre-rendered pages for better performance
- **Lazy loading**: Components and images load on demand

### Accessibility

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA labels**: Screen reader support
- **Keyboard navigation**: Full keyboard accessibility
- **Color contrast**: WCAG compliant color schemes

### SEO

- **Meta tags**: Dynamic meta tags for each page
- **Structured data**: JSON-LD for better search results
- **Sitemap**: Automatic sitemap generation
- **Open Graph**: Social media sharing optimization

## Customization

### Content Updates

1. Edit JSON files in `data/` directory
2. Use admin panel for project management
3. Replace images in `public/images/`

### Design Changes

1. Update colors in `tailwind.config.js`
2. Modify component styles
3. Adjust animations in components

### Functionality

1. Add new sections by creating components
2. Extend data models in JSON files
3. Add new routes in `app/` directory

## Development Workflow

1. **Setup**: Run `npm run setup` for initial configuration
2. **Development**: Use `npm run dev` for local development
3. **Building**: Run `npm run build` for production build
4. **Deployment**: Deploy to Vercel or other platforms

## Best Practices

### Code Organization

- Components are single-responsibility
- Utilities are pure functions
- Data is separated from presentation
- Types are defined for all data structures

### Performance

- Images are optimized and lazy-loaded
- Components use React.memo where appropriate
- Animations are GPU-accelerated
- Bundle size is minimized

### Maintainability

- Consistent naming conventions
- Comprehensive documentation
- Modular architecture
- Easy content management