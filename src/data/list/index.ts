import { listBasicsMethods } from './listBasics'
import { listAdvancedMethods } from './listAdvanced'

// Combined List methods - maintains original order
export const listMethods = [
  ...listBasicsMethods,
  ...listAdvancedMethods,
]

// Re-export individual modules for granular imports
export { listBasicsMethods } from './listBasics'
export { listAdvancedMethods } from './listAdvanced'
