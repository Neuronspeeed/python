import { mathBasicsMethods } from './basics'
import { mathProblemsMethods } from './problems'

// Combined Math methods - basics first, then problems
export const mathMethods = [
  ...mathBasicsMethods,
  ...mathProblemsMethods,
]

// Re-export individual modules for granular imports
export { mathBasicsMethods } from './basics'
export { mathProblemsMethods } from './problems'
