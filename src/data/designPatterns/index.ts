import { designCacheMethods } from './designCache'
import { designStructuresMethods } from './designStructures'
import { designUtilitiesMethods } from './designUtilities'

// Combined Design Patterns methods
export const designPatternsMethods = [
  ...designCacheMethods,
  ...designStructuresMethods,
  ...designUtilitiesMethods,
]

// Re-export individual modules for granular imports
export { designCacheMethods } from './designCache'
export { designStructuresMethods } from './designStructures'
export { designUtilitiesMethods } from './designUtilities'
