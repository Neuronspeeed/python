import { whyWhenMethods } from './whyWhen'
import { lruCacheMethods } from './lruCache'
import { lfuCacheMethods } from './lfuCache'
import { ttlCacheMethods } from './ttlCache'
import { cachePatternsMethods } from './cachePatterns'

// Combined design cache methods
export const designCacheMethods = [
  ...whyWhenMethods,
  ...lruCacheMethods,
  ...lfuCacheMethods,
  ...ttlCacheMethods,
  ...cachePatternsMethods,
]

// Re-export individual modules for granular imports
export { whyWhenMethods } from './whyWhen'
export { lruCacheMethods } from './lruCache'
export { lfuCacheMethods } from './lfuCache'
export { ttlCacheMethods } from './ttlCache'
export { cachePatternsMethods } from './cachePatterns'
