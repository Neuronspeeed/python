import { concurrencyThreadsMethods } from './concurrencyThreads'
import { concurrencyAsyncMethods } from './concurrencyAsync'

// Combined Concurrency methods - maintains original order
export const concurrencyMethods = [
  ...concurrencyThreadsMethods,
  ...concurrencyAsyncMethods,
]

// Re-export individual modules for granular imports
export { concurrencyThreadsMethods } from './concurrencyThreads'
export { concurrencyAsyncMethods } from './concurrencyAsync'
