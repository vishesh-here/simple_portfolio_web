# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, React, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Built with Next.js for optimal performance
- **Easy to Customize**: All content is managed through JSON configuration files
- **Admin Panel**: Built-in admin interface for managing projects
- **SEO Optimized**: Proper meta tags and structured data
- **Accessibility**: WCAG compliant with proper ARIA labels

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Icons**: Lucide React
- **Markdown**: React Markdown with GitHub Flavored Markdown

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Personal Information

Edit `data/config.json` to update your personal information:

```json
{
  "site": {
    "title": "Your Name - Portfolio",
    "description": "Your professional description"
  },
  "hero": {
    "name": "Your Name",
    "tagline": "Your Professional Title",
    "intro": "Brief introduction about yourself"
  },
  "services": [...],
  "about": {...},
  "contact": {...}
}
```

### Projects

Add your projects to `data/projects.json`:

```json
[
  {
    "id": "project-1",
    "title": "Project Title",
    "description": "Brief description",
    "thumbnail": "/images/projects/project-1-thumb.jpg",
    "tags": ["React", "Next.js", "Tailwind"],
    "year": "2023",
    "client": "Client Name",
    "duration": "3 months",
    "role": "Full Stack Developer",
    "overview": "Detailed project overview...",
    "challenge": "What challenges did you face...",
    "solution": "How did you solve them...",
    "results": ["Result 1", "Result 2"],
    "images": ["/images/projects/project-1-1.jpg"]
  }
]
```

### Career Timeline

Update your career history in `data/career.json`:

```json
[
  {
    "id": "job-1",
    "title": "Job Title",
    "company": "Company Name",
    "startDate": "2023-01",
    "endDate": "present",
    "description": "Job description...",
    "achievements": ["Achievement 1", "Achievement 2"],
    "skills": ["Skill 1", "Skill 2"]
  }
]
```

### Testimonials

Add client testimonials in `data/testimonials.json`:

```json
[
  {
    "id": "testimonial-1",
    "name": "Client Name",
    "role": "Client Role",
    "company": "Company Name",
    "image": "/images/testimonials/client-1.jpg",
    "quote": "Testimonial text...",
    "rating": 5
  }
]
```

## Admin Panel

Access the admin panel at `/admin` to manage your projects through a user-friendly interface.

**Note**: In development mode, data is stored in localStorage. For production, integrate with a proper CMS or database.

## Customization

### Colors

Update the color scheme in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        // ... your color palette
      }
    }
  }
}
```

### Fonts

Add custom fonts in `app/layout.tsx` and update `tailwind.config.js`.

### Animations

Customize animations in the component files using Framer Motion.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

Build the project:
```bash
npm run build
```

The built files will be in the `.next` folder.

## File Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel
│   ├── projects/          # Project detail pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
├── data/                  # JSON configuration files
├── lib/                   # Utility functions and hooks
├── public/               # Static assets
└── ...config files
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help customizing the portfolio, please open an issue or contact me.