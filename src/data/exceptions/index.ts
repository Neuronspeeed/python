import { exceptionsBasicsMethods } from './basics'
import { exceptionsAdvancedMethods } from './advanced'

// Combined Exceptions methods - maintains original order
export const exceptionsMethods = [
  ...exceptionsBasicsMethods,
  ...exceptionsAdvancedMethods,
]

// Re-export individual modules for granular imports
export { exceptionsBasicsMethods } from './basics'
export { exceptionsAdvancedMethods } from './advanced'
