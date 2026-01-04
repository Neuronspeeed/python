import { bitBasicsMethods } from './bitBasics'
import { bitProblemsMethods } from './bitProblems'

// Combined Bit Manipulation methods - maintains original order
export const bitManipulationMethods = [
  ...bitBasicsMethods,
  ...bitProblemsMethods,
]

// Re-export individual modules for granular imports
export { bitBasicsMethods } from './bitBasics'
export { bitProblemsMethods } from './bitProblems'
