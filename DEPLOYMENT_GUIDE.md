# Deployment Guide

This guide covers multiple deployment options for your Next.js portfolio website.

## Quick Start

Run the deployment preparation script:

```bash
npm run deploy
```

This will install dependencies, build the project, and prepare it for deployment.

## Deployment Options

### 1. Vercel (Recommended) ⭐

**Why Vercel?**
- Made by Next.js creators
- Automatic deployments from Git
- Built-in performance optimizations
- Free tier available
- Custom domains supported

**Steps:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign up with GitHub
4. Click "New Project"
5. Import your repository
6. Click "Deploy"

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 2. Netlify

**Why Netlify?**
- Easy drag-and-drop deployment
- Form handling
- Edge functions
- Free tier with custom domains

**Option A - Git Integration:**
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `out`

**Option B - Manual Deploy:**
1. Run `npm run deploy`
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag the `out` folder to the deploy area

### 3. GitHub Pages (Free)

**Why GitHub Pages?**
- Completely free
- Integrated with GitHub
- Custom domains supported
- Automatic deployments

**Steps:**
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select "GitHub Actions" as source
4. The workflow will automatically deploy your site

**Manual Setup:**
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push code - the workflow will handle deployment

### 4. Other Static Hosting Providers

**Cloudflare Pages:**
1. Connect GitHub repository
2. Build command: `npm run build`
3. Output directory: `out`

**Firebase Hosting:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

**Surge.sh:**
```bash
npm install -g surge
npm run build
cd out
surge
```

## Environment Variables

If you need environment variables for production:

1. **Vercel:** Add in project settings
2. **Netlify:** Add in site settings → Environment variables
3. **GitHub Pages:** Add as repository secrets

Example variables:
```
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Custom Domain Setup

### Vercel:
1. Go to project settings
2. Add your domain
3. Configure DNS records as shown

### Netlify:
1. Go to site settings → Domain management
2. Add custom domain
3. Update DNS records

### GitHub Pages:
1. Add `CNAME` file to `public` folder with your domain
2. Configure DNS with your provider

## Build Configuration

The app is configured for static export by default. To switch between deployment types:

**For Static Hosting (GitHub Pages, Netlify):**
```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true }
}
```

**For Server-Side Rendering (Vercel):**
```javascript
// next.config.js
const nextConfig = {
  trailingSlash: true,
  images: { unoptimized: false }
}
```

## Troubleshooting

**Build Errors:**
- Check Node.js version (18+ required)
- Clear cache: `rm -rf .next node_modules && npm install`
- Check for TypeScript errors: `npm run lint`

**Image Issues:**
- Ensure images are in `public` folder
- Use relative paths: `/images/photo.jpg`
- For static export, keep `unoptimized: true`

**404 Errors:**
- Enable `trailingSlash: true` in next.config.js
- Check routing configuration
- Verify all pages are properly exported

## Performance Tips

1. **Optimize Images:** Use WebP format when possible
2. **Minimize Bundle:** Remove unused dependencies
3. **Enable Compression:** Most hosts enable this automatically
4. **Use CDN:** Vercel and Netlify provide global CDN

## Security

1. **Environment Variables:** Never commit secrets to Git
2. **Admin Password:** Use strong password for admin panel
3. **HTTPS:** All recommended hosts provide free SSL

## Monitoring

- **Vercel:** Built-in analytics and performance monitoring
- **Netlify:** Analytics available in paid plans
- **Google Analytics:** Add tracking code to layout.tsx

## Support

If you encounter issues:
1. Check the build logs
2. Verify all dependencies are installed
3. Test locally with `npm run build && npm start`
4. Check the hosting provider's documentation

Happy deploying! 🚀