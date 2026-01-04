import { intervalBasicsMethods } from './intervalBasics'
import { intervalSchedulingMethods } from './intervalScheduling'
import { intervalOptimizationMethods } from './intervalOptimization'

// Combined Intervals methods - maintains original order
export const intervalMethods = [
  ...intervalBasicsMethods,
  ...intervalSchedulingMethods,
  ...intervalOptimizationMethods,
]

// Re-export individual modules for granular imports
export { intervalBasicsMethods } from './intervalBasics'
export { intervalSchedulingMethods } from './intervalScheduling'
export { intervalOptimizationMethods } from './intervalOptimization'
