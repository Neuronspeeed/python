import { whyAndWhenMethods } from './whyAndWhen'
import { iteratorMethods } from './iterator'
import { rateLimiterMethods } from './rateLimiter'
import { browserMethods } from './browser'
import { randomMethods } from './random'

// Combined Design Utilities methods
export const designUtilitiesMethods = [
  ...whyAndWhenMethods,
  ...iteratorMethods,
  ...rateLimiterMethods,
  ...browserMethods,
  ...randomMethods,
]

// Re-export individual modules for granular imports
export { whyAndWhenMethods } from './whyAndWhen'
export { iteratorMethods } from './iterator'
export { rateLimiterMethods } from './rateLimiter'
export { browserMethods } from './browser'
export { randomMethods } from './random'
