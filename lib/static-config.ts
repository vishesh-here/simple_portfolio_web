// Static import approach for config
import configData from '@/data/config.json'

export const staticConfig = configData

export function getStaticConfig() {
  return staticConfig
}

export function getStaticServices() {
  return staticConfig.services || []
}