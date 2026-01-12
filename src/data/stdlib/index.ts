import { stdlibFunctoolsMethods } from './functools'
import { stdlibItertoolsMethods } from './itertools'
import { stdlibCollectionsMethods } from './collections'
import { stdlibBisectMethods } from './stdlibBisect'
import { stdlibBuiltinsMethods } from './builtins'
import { stdlibConcurrencyMethods } from './concurrency'
import { stdlibSystemPatternsMethods } from './systemPatterns'

// Combined stdlib methods - maintains logical order
export const stdlibMethods = [
  ...stdlibFunctoolsMethods,
  ...stdlibItertoolsMethods,
  ...stdlibCollectionsMethods,
  ...stdlibBisectMethods,
  ...stdlibBuiltinsMethods,
  ...stdlibConcurrencyMethods,
  ...stdlibSystemPatternsMethods,
]

// Re-export individual modules for granular imports
export { stdlibFunctoolsMethods } from './functools'
export { stdlibItertoolsMethods } from './itertools'
export { stdlibCollectionsMethods } from './collections'
export { stdlibBisectMethods } from './stdlibBisect'
export { stdlibBuiltinsMethods } from './builtins'
export { stdlibConcurrencyMethods } from './concurrency'
export { stdlibSystemPatternsMethods } from './systemPatterns'
