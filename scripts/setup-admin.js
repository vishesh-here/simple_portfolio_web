#!/usr/bin/env node

const fs = require('fs')

console.log('🚀 Setting up Portfolio Admin Panel...\n')

// Check if required files exist
const requiredFiles = [
  'data/config.json',
  'data/projects.json',
  'data/career.json',
  'data/testimonials.json',
  'components/ComprehensiveAdminDashboard.tsx',
  'app/admin/page.tsx'
]

console.log('📋 Checking required files...')
let allFilesExist = true

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} - MISSING`)
    allFilesExist = false
  }
})

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing. Please ensure all files are in place.')
  process.exit(1)
}

// Check if .env.local exists and has admin password
console.log('\n🔐 Checking admin configuration...')
const envLocalPath = '.env.local'
let envContent = ''

if (fs.existsSync(envLocalPath)) {
  envContent = fs.readFileSync(envLocalPath, 'utf8')
  if (envContent.includes('NEXT_PUBLIC_ADMIN_PASSWORD')) {
    console.log('✅ Admin password configured in .env.local')
  } else {
    console.log('⚠️  Admin password not found in .env.local')
    console.log('   Adding default admin password...')
    envContent += '\n# Admin Panel Configuration\nNEXT_PUBLIC_ADMIN_PASSWORD=admin123\n'
    fs.writeFileSync(envLocalPath, envContent)
    console.log('✅ Default admin password added to .env.local')
  }
} else {
  console.log('⚠️  .env.local not found, creating with admin password...')
  const defaultEnv = `# Admin Panel Configuration
NEXT_PUBLIC_ADMIN_PASSWORD=admin123

# Add other environment variables here
`
  fs.writeFileSync(envLocalPath, defaultEnv)
  console.log('✅ Created .env.local with default admin password')
}

// Create admin access instructions
const adminInstructions = `# Admin Panel Access

## Quick Start
1. Start your development server: \`npm run dev\`
2. Visit: http://localhost:3000/admin
3. Password: admin123 (change this in production!)

## Production Setup
1. Change the admin password in .env.local
2. Deploy your site
3. Access admin at: https://yoursite.com/admin

## Features
- ✅ Complete content management
- ✅ Image upload simulation
- ✅ Data export/import
- ✅ Real-time preview
- ✅ Responsive design

## Security Notes
- Change the default password before deploying
- Use HTTPS in production
- Regularly backup your data using the export feature

For detailed instructions, see COMPREHENSIVE_ADMIN_GUIDE.md
`

fs.writeFileSync('ADMIN_ACCESS.md', adminInstructions)

console.log('\n🎉 Admin Panel Setup Complete!')
console.log('\n📖 Next Steps:')
console.log('1. Start development server: npm run dev')
console.log('2. Visit: http://localhost:3000/admin')
console.log('3. Login with password: admin123')
console.log('4. Read COMPREHENSIVE_ADMIN_GUIDE.md for full documentation')
console.log('5. Read ADMIN_ACCESS.md for quick access info')

console.log('\n🔒 Security Reminder:')
console.log('- Change the admin password in .env.local before deploying to production')
console.log('- The default password is: admin123')

console.log('\n✨ Happy content managing!')