import { designCacheMethods } from './cache'
import { designStructuresMethods } from './designStructures'
import { designUtilitiesMethods } from './utilities'

// Combined Design Patterns methods
export const designPatternsMethods = [
  ...designCacheMethods,
  ...designStructuresMethods,
  ...designUtilitiesMethods,
]

// Re-export individual modules for granular imports
export { designCacheMethods } from './cache'
export { designStructuresMethods } from './designStructures'
export { designUtilitiesMethods } from './utilities'
