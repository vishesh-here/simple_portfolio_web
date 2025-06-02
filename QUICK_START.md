# 🚀 Quick Start Guide

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
# Option 1: Standard Next.js dev server
npm run dev

# Option 2: Enhanced dev server with admin setup
npm run dev-admin
```

### 3. Access Your Portfolio
- **Main Site**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Password**: `admin123`

## Admin Panel Features

### ✅ Currently Available
- **Overview Dashboard**: Statistics and quick actions
- **Settings**: Export/import data, reset to defaults
- **Data Management**: Full control over all content

### 🚧 Coming Soon
- **Hero Section Editor**: Edit tagline, intro, profile image
- **About Me Editor**: Update story, fun facts, passions
- **Services Manager**: Add/edit/delete services
- **Projects Manager**: Full project CRUD operations
- **Career Timeline**: Manage work experience
- **Testimonials**: Client feedback management
- **Contact Info**: Update contact details and social links

## Making Changes

### Current Workflow
1. **Edit Content**: Use the admin panel to make changes
2. **Export Data**: Click "Export All Data" in Settings
3. **Update Files**: Replace JSON files in your codebase
4. **Deploy**: Push changes to your hosting platform

### Data Files Location
- `data/config.json` - Site configuration, hero, about, services, contact
- `data/projects.json` - Portfolio projects
- `data/career.json` - Work experience timeline
- `data/testimonials.json` - Client testimonials

## Security Notes

### Development
- Default password: `admin123`
- Stored in `.env.local` file
- Change before deploying to production

### Production
1. **Change Password**: Update `NEXT_PUBLIC_ADMIN_PASSWORD` in your hosting environment
2. **Use HTTPS**: Always use secure connections
3. **Backup Data**: Regularly export your content
4. **Access Control**: Limit admin access to trusted users

## Troubleshooting

### Common Issues
1. **Admin panel not loading**: Check if all dependencies are installed
2. **Changes not saving**: Check browser console for errors
3. **Data lost**: Use export/import to backup/restore
4. **Build errors**: Check TypeScript errors in terminal

### Getting Help
1. **Check Console**: Look for JavaScript errors in browser console
2. **Check Terminal**: Look for build errors in terminal
3. **Export Data**: Always export before making major changes
4. **Reset**: Use "Reset to Defaults" if data gets corrupted

## Next Steps

1. **Customize Content**: Use the admin panel to update all content
2. **Add Images**: Replace placeholder images with your own
3. **Update Styling**: Modify Tailwind classes for custom design
4. **Deploy**: Push to Vercel, Netlify, or your preferred hosting

## File Structure
```
├── app/
│   ├── admin/page.tsx          # Admin panel page
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── ComprehensiveAdminDashboard.tsx  # Main admin component
│   ├── HeroSection.tsx         # Hero section
│   ├── AboutSection.tsx        # About section
│   ├── ProjectsSection.tsx     # Projects section
│   └── ...                     # Other components
├── data/
│   ├── config.json             # Site configuration
│   ├── projects.json           # Projects data
│   ├── career.json             # Career data
│   └── testimonials.json       # Testimonials data
└── scripts/
    ├── dev-start.js            # Enhanced dev server
    └── setup-admin.js          # Admin setup script
```

## Support

For detailed documentation, see:
- `COMPREHENSIVE_ADMIN_GUIDE.md` - Complete admin panel guide
- `CONTENT_MANAGEMENT_GUIDE.md` - Content management instructions
- `README.md` - General project information

Happy coding! 🎉