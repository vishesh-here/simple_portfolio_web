#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🧪 Testing current build status...\n');

try {
  console.log('🔨 Running build...');
  const output = execSync('npm run build', { encoding: 'utf8', stdio: 'pipe' });
  console.log(output);
  console.log('\n✅ Build successful!');
} catch (error) {
  console.log('❌ Build failed with output:');
  console.log(error.stdout);
  console.log('\n❌ Error details:');
  console.log(error.stderr);
  process.exit(1);
}