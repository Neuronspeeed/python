import { functionsBasicsMethods } from './functionsBasics'
import { functionsAdvancedMethods } from './functionsAdvanced'

// Combined Functions methods - maintains original order
export const functionsMethods = [
  ...functionsBasicsMethods,
  ...functionsAdvancedMethods,
]

// Re-export individual modules for granular imports
export { functionsBasicsMethods } from './functionsBasics'
export { functionsAdvancedMethods } from './functionsAdvanced'
