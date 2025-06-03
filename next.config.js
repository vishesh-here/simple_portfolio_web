/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Vercel deployment (default Next.js behavior)
  trailingSlash: true,
  images: {
    unoptimized: false, // Enable image optimization on Vercel
  },
  
  // Uncomment below for static hosting like GitHub Pages
  // output: 'export',
  // images: {
  //   unoptimized: true,
  // },
  // basePath: '/your-repo-name',
  // assetPrefix: '/your-repo-name/',
}

module.exports = nextConfig