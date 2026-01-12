import { asyncWhyWhenMethods } from './whyWhen'
import { asyncAwaitMethods } from './asyncAwait'
import { asyncContextIteratorsMethods } from './contextIterators'
import { asyncHttpMethods } from './http'
import { asyncBestPracticesMethods } from './bestPractices'

// Combined Async methods - maintains original order
export const concurrencyAsyncMethods = [
  ...asyncWhyWhenMethods,
  ...asyncAwaitMethods,
  ...asyncContextIteratorsMethods,
  ...asyncHttpMethods,
  ...asyncBestPracticesMethods,
]

// Re-export individual modules for granular imports
export { asyncWhyWhenMethods } from './whyWhen'
export { asyncAwaitMethods } from './asyncAwait'
export { asyncContextIteratorsMethods } from './contextIterators'
export { asyncHttpMethods } from './http'
export { asyncBestPracticesMethods } from './bestPractices'
