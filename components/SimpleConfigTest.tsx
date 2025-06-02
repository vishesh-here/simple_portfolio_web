'use client'

import React, { useEffect, useState } from 'react'

export default function SimpleConfigTest(): JSX.Element {
  const [testResult, setTestResult] = useState<string>('Testing...')
  
  useEffect(() => {
    console.log('🧪 Starting config test...')
    
    // Test 1: Direct import
    import('@/data/config.json')
      .then((data) => {
        console.log('✅ Direct import successful:', data.default)
        setTestResult(`✅ Config loaded! Services count: ${data.default?.services?.length || 0}`)
      })
      .catch((error) => {
        console.error('❌ Direct import failed:', error)
        setTestResult(`❌ Failed to load config: ${error.message}`)
      })
  }, [])
  
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg m-4">
      <h3 className="font-bold mb-2 text-blue-800">🧪 Simple Config Test</h3>
      <p className="text-blue-700">{testResult}</p>
    </div>
  )
}