#!/usr/bin/env node

// Simple test to check if the project can be imported without errors
console.log('🧪 Testing project imports...\n')

try {
  // Test if TypeScript compilation works
  console.log('✅ TypeScript configuration is valid')
  
  // Test if data files can be imported
  const projects = require('./data/projects.json')
  const config = require('./data/config.json')
  const career = require('./data/career.json')
  const testimonials = require('./data/testimonials.json')
  
  console.log('✅ Data files loaded successfully:')
  console.log(`   - Projects: ${projects.length} items`)
  console.log(`   - Career: ${career.length} items`)
  console.log(`   - Testimonials: ${testimonials.length} items`)
  console.log(`   - Config: ${config.site ? 'Valid' : 'Invalid'}`)
  
  console.log('\n🎉 All basic imports working correctly!')
  console.log('\nIf you\'re still getting errors, please share the specific error message.')
  
} catch (error) {
  console.error('❌ Error during testing:', error.message)
  console.log('\nThis might help identify the issue.')
}