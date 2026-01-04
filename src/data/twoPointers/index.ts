import { twoPointersBasicsMethods } from './twoPointersBasics'
import { slidingWindowMethods } from './slidingWindow'

// Combined Two Pointers & Sliding Window methods - maintains original order
export const twoPointersMethods = [
  ...twoPointersBasicsMethods,
  ...slidingWindowMethods,
]

// Re-export individual modules for granular imports
export { twoPointersBasicsMethods } from './twoPointersBasics'
export { slidingWindowMethods } from './slidingWindow'
