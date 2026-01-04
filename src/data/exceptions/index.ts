import { exceptionsBasicsMethods } from './exceptionsBasics'
import { exceptionsAdvancedMethods } from './exceptionsAdvanced'

// Combined Exceptions methods - maintains original order
export const exceptionsMethods = [
  ...exceptionsBasicsMethods,
  ...exceptionsAdvancedMethods,
]

// Re-export individual modules for granular imports
export { exceptionsBasicsMethods } from './exceptionsBasics'
export { exceptionsAdvancedMethods } from './exceptionsAdvanced'
