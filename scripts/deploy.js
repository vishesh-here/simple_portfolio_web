#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting deployment process...\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found. Please run this script from the project root.');
  process.exit(1);
}

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Build the project
  console.log('\n🔨 Building the project...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('\n✅ Build completed successfully!');
  console.log('\n📁 Static files are ready in the "out" directory');
  
  // Check if out directory exists
  if (fs.existsSync('out')) {
    console.log('\n🎉 Your app is ready for deployment!');
    console.log('\nDeployment options:');
    console.log('1. Vercel: Push to GitHub and import at vercel.com');
    console.log('2. Netlify: Drag the "out" folder to netlify.com/drop');
    console.log('3. GitHub Pages: Push to GitHub and enable Pages in settings');
    console.log('4. Any static hosting: Upload the "out" folder contents');
  } else {
    console.error('❌ Error: Build output directory not found');
    process.exit(1);
  }

} catch (error) {
  console.error('❌ Error during deployment preparation:', error.message);
  process.exit(1);
}