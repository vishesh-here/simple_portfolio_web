'use client'

import { staticConfig } from './static-config'
import { useLocalStorage } from './hooks'

export function useStaticPortfolioConfig() {
  const [storedConfig] = useLocalStorage('admin-config', null)
  
  // Return localStorage data if available, otherwise static data
  return storedConfig || staticConfig
}

export function useStaticServices() {
  const config = useStaticPortfolioConfig()
  return config?.services || []
}