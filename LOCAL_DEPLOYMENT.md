# Local Deployment Guide 🏠

This guide will help you run and test your portfolio website locally.

## Prerequisites

Make sure you have Node.js 18+ installed:
```bash
node --version
npm --version
```

## Quick Start Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Mode (Hot Reload)
```bash
npm run dev
```
- Opens at: `http://localhost:3000`
- Auto-reloads when you make changes
- Best for development and testing

### 3. Production Build + Local Server
```bash
npm run serve
```
- Builds the project for production
- Serves static files locally
- Opens at: `http://localhost:8000`
- Simulates real deployment environment

### 4. Manual Build (Advanced)
```bash
# Build only
npm run build

# Serve manually with different tools
npx serve out              # Using serve package
cd out && python -m http.server 8000  # Using Python
cd out && php -S localhost:8000       # Using PHP
```

## What Each Command Does

### `npm run dev`
- Starts Next.js development server
- Enables hot module replacement
- Shows detailed error messages
- Perfect for development

### `npm run build`
- Creates optimized production build
- Generates static files in `out/` directory
- Minifies CSS and JavaScript
- Optimizes images and assets

### `npm run serve`
- Runs build + serves locally
- Tests production environment
- Verifies everything works before deployment

## Testing Checklist

When running locally, test these features:

### ✅ Navigation
- [ ] All menu items work
- [ ] Mobile menu toggles correctly
- [ ] Smooth scrolling to sections
- [ ] Logo links to home

### ✅ Content Sections
- [ ] Hero section displays correctly
- [ ] About section loads
- [ ] Services section shows all services
- [ ] Projects section displays featured projects
- [ ] Career timeline renders
- [ ] Testimonials carousel works
- [ ] Contact form is functional

### ✅ Project Pages
- [ ] Individual project pages load
- [ ] Project images display
- [ ] Navigation between projects works
- [ ] Back to projects link works

### ✅ Admin Panel
- [ ] Admin login works (`/admin`)
- [ ] Can create/edit projects
- [ ] Data persists in localStorage
- [ ] Export/import functionality works

### ✅ Responsive Design
- [ ] Mobile view (< 768px)
- [ ] Tablet view (768px - 1024px)
- [ ] Desktop view (> 1024px)
- [ ] All breakpoints look good

## Common Issues & Solutions

### Port Already in Use
```bash
# If port 3000 is busy
npm run dev -- -p 3001

# If port 8000 is busy (for serve)
npx serve out -p 8001
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Images Not Loading
- Check images are in `public/images/`
- Verify paths in JSON files start with `/`
- Example: `/images/projects/project1.jpg`

### TypeScript Errors
```bash
# Check for errors
npm run lint

# Fix common issues
npm run build
```

## File Structure After Build

```
out/
├── index.html              # Homepage
├── projects/
│   ├── index.html          # Projects listing
│   └── [project-id]/
│       └── index.html      # Individual project pages
├── admin/
│   └── index.html          # Admin panel
├── _next/                  # Next.js assets
├── images/                 # Your images
└── ...                     # Other static files
```

## Environment Variables

Create `.env.local` for local development:
```bash
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Performance Testing

### Lighthouse Audit
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit on `http://localhost:8000`
4. Check Performance, Accessibility, SEO scores

### Network Throttling
1. Open DevTools → Network tab
2. Set throttling to "Slow 3G"
3. Test page load times

## Debugging Tips

### Console Errors
- Open browser DevTools (F12)
- Check Console tab for JavaScript errors
- Fix any red error messages

### Network Issues
- Check Network tab in DevTools
- Look for failed requests (red status)
- Verify all assets load correctly

### React DevTools
Install React DevTools browser extension for component debugging.

## Next Steps

Once everything works locally:

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Choose deployment platform**:
   - Vercel (recommended)
   - Netlify
   - GitHub Pages

3. **Follow deployment guide**: See `DEPLOYMENT_GUIDE.md`

## Troubleshooting

### Can't access localhost
- Check if server is running
- Try different port: `npm run dev -- -p 3001`
- Check firewall settings

### Slow performance
- Run production build: `npm run serve`
- Check image sizes (should be < 1MB)
- Optimize images to WebP format

### Admin panel not working
- Check localStorage in browser DevTools
- Clear browser cache
- Verify admin password in environment variables

## Support

If you encounter issues:
1. Check the error message carefully
2. Search the error online
3. Check Next.js documentation
4. Clear cache and try again

Happy coding! 🚀