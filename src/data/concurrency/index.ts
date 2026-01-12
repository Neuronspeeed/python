import { concurrencyThreadsMethods } from './threads'
import { concurrencyAsyncMethods } from './async'

// Combined Concurrency methods - maintains original order
export const concurrencyMethods = [
  ...concurrencyThreadsMethods,
  ...concurrencyAsyncMethods,
]

// Re-export individual modules for granular imports
export { concurrencyThreadsMethods } from './threads'
export { concurrencyAsyncMethods } from './async'
