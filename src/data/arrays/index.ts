import { arrayBasicsMethods } from './arrayBasics'
import { arrayOperationsMethods } from './arrayOperations'
import { arrayProblemsMethods } from './arrayProblems'

// Combined Array methods - maintains original order
export const arrayMethods = [
  ...arrayBasicsMethods,
  ...arrayOperationsMethods,
  ...arrayProblemsMethods,
]

// Re-export individual modules for granular imports
export { arrayBasicsMethods } from './arrayBasics'
export { arrayOperationsMethods } from './arrayOperations'
export { arrayProblemsMethods } from './arrayProblems'
