import { combinatoricsMethods } from './combinatorics'
import { powersMethods } from './powers'
import { numberTheoryMethods } from './numberTheory'

// Combined math problems - Combinatorics, Powers, Number Theory
export const mathProblemsMethods = [
  ...combinatoricsMethods,
  ...powersMethods,
  ...numberTheoryMethods,
]

// Re-export individual modules for granular imports
export { combinatoricsMethods } from './combinatorics'
export { powersMethods } from './powers'
export { numberTheoryMethods } from './numberTheory'
