# Diagnostic Steps for Runtime Errors

## Quick Fixes Applied
✅ Fixed all TypeScript compilation errors
✅ Removed syntax errors in hooks.ts
✅ Cleaned up unused imports and variables

## If you're still getting errors, try these steps:

### 1. Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

### 2. Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### 3. Check for Specific Error Types

#### If you get "Module not found" errors:
- Check if all imports use the correct paths
- Verify that `@/` alias is working (should point to project root)

#### If you get "Cannot read property" errors:
- The data might not be loading correctly
- Check browser console for more details

#### If you get build errors:
```bash
npm run build
```
This will show more detailed error information.

### 4. Test Basic Functionality
Run the test script:
```bash
node test-build.js
```

### 5. Common Issues and Solutions

#### Issue: "usePortfolioProjects is not a function"
**Solution**: Clear cache and restart dev server

#### Issue: "Cannot find module '@/data/projects.json'"
**Solution**: Check if data files exist and paths are correct

#### Issue: "Hydration mismatch"
**Solution**: This is usually due to localStorage differences between server and client

### 6. Debug Mode
Add this to your component to debug data loading:
```javascript
console.log('Projects data:', projectsData)
console.log('Projects length:', projectsData.length)
```

## Most Likely Issues

1. **Cache Problem**: Next.js cache needs clearing
2. **Import Path Issue**: TypeScript path resolution
3. **Data Loading**: JSON files not loading correctly
4. **Hydration**: Server/client mismatch with localStorage

## Next Steps
Please share the specific error message you're seeing, including:
- The exact error text
- Which page/component is failing
- Browser console errors (if any)
- Terminal output when running `npm run dev`

This will help me provide a more targeted fix!