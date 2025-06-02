'use client'

import React, { useEffect, useState } from 'react'
import { usePortfolioConfig } from '@/lib/hooks'

export default function DebugConfig(): JSX.Element {
  const config = usePortfolioConfig()
  const [debugInfo, setDebugInfo] = useState<any>({})
  
  useEffect(() => {
    console.log('🔍 DebugConfig - Config received:', config)
    setDebugInfo({
      configExists: !!config,
      configType: typeof config,
      configKeys: config ? Object.keys(config) : [],
      servicesExists: !!config?.services,
      servicesType: typeof config?.services,
      servicesLength: config?.services?.length || 0,
      rawConfig: config
    })
  }, [config])
  
  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg m-4">
      <h3 className="font-bold mb-2 text-yellow-800">🔍 Config Debug Info</h3>
      <div className="text-sm space-y-1 text-yellow-700">
        <p><strong>Config loaded:</strong> {debugInfo.configExists ? 'Yes' : 'No'}</p>
        <p><strong>Config type:</strong> {debugInfo.configType}</p>
        <p><strong>Config keys:</strong> {debugInfo.configKeys?.join(', ') || 'None'}</p>
        <p><strong>Has services:</strong> {debugInfo.servicesExists ? 'Yes' : 'No'}</p>
        <p><strong>Services type:</strong> {debugInfo.servicesType}</p>
        <p><strong>Services count:</strong> {debugInfo.servicesLength}</p>
        
        {config?.services && (
          <div className="mt-2">
            <p><strong>Services found:</strong></p>
            <ul className="ml-4">
              {config.services.map((service: any, index: number) => (
                <li key={index}>• {service.title} ({service.icon})</li>
              ))}
            </ul>
          </div>
        )}
        
        <details className="mt-2">
          <summary className="cursor-pointer font-medium">Raw Config Data</summary>
          <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto max-h-40">
            {JSON.stringify(debugInfo.rawConfig, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  )
}