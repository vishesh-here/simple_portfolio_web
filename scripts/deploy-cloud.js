#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Cloud Deployment Helper\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Please run this script from the project root directory');
  process.exit(1);
}

// Check if git is initialized and has remote
try {
  const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
  console.log(`📦 Repository: ${remoteUrl}`);
} catch (error) {
  console.error('❌ No git remote found. Please push your code to GitHub first.');
  process.exit(1);
}

console.log('\n🎯 Available Deployment Options:\n');

console.log('1. 🟢 Vercel (Recommended)');
console.log('   - Best for Next.js applications');
console.log('   - Automatic deployments');
console.log('   - Built-in CDN and SSL');
console.log('   - Deploy: https://vercel.com/new\n');

console.log('2. 🔵 Netlify');
console.log('   - Great for static sites');
console.log('   - Easy custom domains');
console.log('   - Deploy: https://app.netlify.com/start\n');

console.log('3. ⚫ GitHub Pages');
console.log('   - Free hosting');
console.log('   - Already configured with GitHub Actions');
console.log('   - Enable in: Repository Settings → Pages\n');

console.log('4. 🟣 Railway');
console.log('   - Full-stack applications');
console.log('   - Database support');
console.log('   - Deploy: https://railway.app\n');

console.log('📋 Pre-deployment checklist:');
console.log('✅ Code pushed to GitHub');
console.log('✅ Build configuration ready');
console.log('⚠️  Set environment variables:');
console.log('   - NEXT_PUBLIC_ADMIN_PASSWORD');
console.log('   - NEXT_PUBLIC_SITE_URL');

console.log('\n🔧 Testing build locally...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful! Ready for deployment.');
} catch (error) {
  console.error('❌ Build failed. Please fix errors before deploying.');
  process.exit(1);
}

console.log('\n🎉 Your app is ready for cloud deployment!');
console.log('Choose your preferred platform from the options above.');