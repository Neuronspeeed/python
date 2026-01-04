import { unionFindBasicsMethods } from './unionFindBasics'
import { unionFindProblemsMethods } from './unionFindProblems'

// Combined Union Find methods - maintains original order
export const unionFindMethods = [
  ...unionFindBasicsMethods,
  ...unionFindProblemsMethods,
]

// Re-export individual modules for granular imports
export { unionFindBasicsMethods } from './unionFindBasics'
export { unionFindProblemsMethods } from './unionFindProblems'
