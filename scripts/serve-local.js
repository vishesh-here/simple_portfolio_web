#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting local production server...\n');

// Check if out directory exists
if (!fs.existsSync('out')) {
  console.log('📦 Building the project first...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

console.log('🌐 Starting server...');
console.log('📁 Serving files from: ./out');
console.log('🔗 Local URL: http://localhost:8000');
console.log('⏹️  Press Ctrl+C to stop the server\n');

try {
  // Try to use npx serve
  execSync('npx serve out -p 8000', { stdio: 'inherit' });
} catch (error) {
  console.log('\n⚠️  serve package not available, trying Python...');
  try {
    execSync('cd out && python -m http.server 8000', { stdio: 'inherit', shell: true });
  } catch (pythonError) {
    console.log('\n⚠️  Python not available, trying PHP...');
    try {
      execSync('cd out && php -S localhost:8000', { stdio: 'inherit', shell: true });
    } catch (phpError) {
      console.error('\n❌ No suitable server found. Please install one of:');
      console.error('- Node.js serve: npm install -g serve');
      console.error('- Python 3: python -m http.server');
      console.error('- PHP: php -S localhost:8000');
      process.exit(1);
    }
  }
}