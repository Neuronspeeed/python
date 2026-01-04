import { stackMethods } from './stackMethods'
import { queueMethods } from './queueMethods'

// Combined Stack & Queue methods - maintains original order
export const stackQueueMethods = [
  ...stackMethods,
  ...queueMethods,
]

// Re-export individual modules for granular imports
export { stackMethods } from './stackMethods'
export { queueMethods } from './queueMethods'
