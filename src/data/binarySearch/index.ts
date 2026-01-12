import { binarySearchBasicsMethods } from './binarySearchBasics'
import { binarySearchProblemsMethods } from './problems'

// Combined Binary Search methods - maintains original order
export const binarySearchMethods = [
  ...binarySearchBasicsMethods,
  ...binarySearchProblemsMethods,
]

// Re-export individual modules for granular imports
export { binarySearchBasicsMethods } from './binarySearchBasics'
export { binarySearchProblemsMethods } from './problems'
