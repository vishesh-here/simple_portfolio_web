#!/usr/bin/env node

// Test script to verify config.json structure
console.log('🧪 Testing Services Data Structure...\n')

try {
  const config = require('./data/config.json')
  
  console.log('✅ Config loaded successfully')
  console.log('📊 Config structure:')
  console.log('   - Has services:', !!config.services)
  console.log('   - Services type:', typeof config.services)
  console.log('   - Services count:', config.services ? config.services.length : 0)
  
  if (config.services && config.services.length > 0) {
    console.log('\n📋 Services found:')
    config.services.forEach((service, index) => {
      console.log(`   ${index + 1}. ${service.title} (${service.icon})`)
    })
    
    console.log('\n✅ Services data structure is valid!')
    console.log('🎯 The hook should work correctly now.')
  } else {
    console.log('\n❌ No services found in config!')
  }
  
} catch (error) {
  console.error('❌ Error loading config:', error.message)
}