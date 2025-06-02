'use client'

import React from 'react'
import { useStaticPortfolioConfig, useStaticServices } from '@/lib/static-hooks'

export default function StaticConfigTest(): JSX.Element {
  const config = useStaticPortfolioConfig()
  const services = useStaticServices()
  
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg m-4">
      <h3 className="font-bold mb-2 text-green-800">🔧 Static Config Test</h3>
      <div className="text-sm space-y-1 text-green-700">
        <p><strong>Config loaded:</strong> {config ? 'Yes' : 'No'}</p>
        <p><strong>Config type:</strong> {typeof config}</p>
        <p><strong>Services count:</strong> {services.length}</p>
        
        {services.length > 0 && (
          <div className="mt-2">
            <p><strong>Services found:</strong></p>
            <ul className="ml-4">
              {services.map((service: any, index: number) => (
                <li key={index}>• {service.title} ({service.icon})</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}