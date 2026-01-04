import { stdlibFunctoolsMethods } from './stdlibFunctools'
import { stdlibItertoolsMethods } from './stdlibItertools'
import { stdlibCollectionsMethods } from './stdlibCollections'

// Combined stdlib methods - maintains logical order
export const stdlibMethods = [
  ...stdlibFunctoolsMethods,
  ...stdlibItertoolsMethods,
  ...stdlibCollectionsMethods,
]

// Re-export individual modules for granular imports
export { stdlibFunctoolsMethods } from './stdlibFunctools'
export { stdlibItertoolsMethods } from './stdlibItertools'
export { stdlibCollectionsMethods } from './stdlibCollections'
