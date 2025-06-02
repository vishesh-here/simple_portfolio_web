#!/usr/bin/env node

// Direct test of config.json
console.log('🧪 Testing config.json directly...\n')

try {
  const config = require('./data/config.json')
  
  console.log('✅ Config loaded successfully')
  console.log('📊 Config structure:')
  console.log('   - Keys:', Object.keys(config))
  console.log('   - Has services:', !!config.services)
  console.log('   - Services type:', typeof config.services)
  console.log('   - Services count:', config.services ? config.services.length : 0)
  
  if (config.services && config.services.length > 0) {
    console.log('\n📋 Services found:')
    config.services.forEach((service, index) => {
      console.log(`   ${index + 1}. ${service.title} (${service.icon})`)
    })
    
    console.log('\n✅ Config structure is valid!')
  } else {
    console.log('\n❌ No services found in config!')
  }
  
} catch (error) {
  console.error('❌ Error loading config:', error.message)
}

console.log('\n🔍 Testing import path...')
try {
  const path = require('path')
  const fs = require('fs')
  
  const configPath = path.join(__dirname, 'data', 'config.json')
  console.log('   - Config path:', configPath)
  console.log('   - File exists:', fs.existsSync(configPath))
  
  if (fs.existsSync(configPath)) {
    const content = fs.readFileSync(configPath, 'utf8')
    const parsed = JSON.parse(content)
    console.log('   - File readable:', !!parsed)
    console.log('   - Has services:', !!parsed.services)
  }
  
} catch (error) {
  console.error('❌ Path test error:', error.message)
}