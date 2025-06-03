#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🧪 Testing build after fixes...\n');

try {
  console.log('🔨 Running build...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('\n✅ Build successful! Your app is ready for deployment.');
} catch (error) {
  console.error('\n❌ Build failed. Error details above.');
  process.exit(1);
}