import { matrixBasicsMethods } from './matrixBasics'
import { matrixOperationsMethods } from './matrixOperations'

// Combined Matrix methods - maintains original order
export const matrixMethods = [
  ...matrixBasicsMethods,
  ...matrixOperationsMethods,
]

// Re-export individual modules for granular imports
export { matrixBasicsMethods } from './matrixBasics'
export { matrixOperationsMethods } from './matrixOperations'
