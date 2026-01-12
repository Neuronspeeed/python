import { whyWhenMethods } from './whyWhen'
import { lazyPropagationMethods } from './lazyPropagation'
import { fenwickTreeMethods } from './fenwickTree'
import { problemsMethods } from './problems'

// Combined advanced methods in logical order
export const segmentTreeAdvancedMethods = [
  ...whyWhenMethods,
  ...lazyPropagationMethods,
  ...fenwickTreeMethods,
  ...problemsMethods,
]

// Re-export individual modules for granular imports
export { whyWhenMethods } from './whyWhen'
export { lazyPropagationMethods } from './lazyPropagation'
export { fenwickTreeMethods } from './fenwickTree'
export { problemsMethods } from './problems'
