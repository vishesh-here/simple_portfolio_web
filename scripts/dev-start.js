#!/usr/bin/env node

const { spawn } = require('child_process')
const fs = require('fs')

console.log('🚀 Starting Portfolio Development Server...\n')

// Check if .env.local exists
if (!fs.existsSync('.env.local')) {
  console.log('⚠️  Creating .env.local with default admin password...')
  const envContent = `# Admin Panel Configuration
NEXT_PUBLIC_ADMIN_PASSWORD=admin123

# Add other environment variables here
`
  fs.writeFileSync('.env.local', envContent)
  console.log('✅ Created .env.local')
}

console.log('📋 Starting Next.js development server...')
console.log('🔗 Your portfolio will be available at: http://localhost:3000')
console.log('🔐 Admin panel will be available at: http://localhost:3000/admin')
console.log('🔑 Default admin password: admin123\n')

// Start the development server
const dev = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
})

dev.on('close', (code) => {
  console.log(`\n📊 Development server exited with code ${code}`)
})

dev.on('error', (error) => {
  console.error('❌ Error starting development server:', error)
})