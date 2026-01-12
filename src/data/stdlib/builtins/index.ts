import { builtinsWhyAndWhenMethods } from './whyAndWhen'
import { builtinsTypeCheckingMethods } from './typeChecking'
import { builtinsIdentityMethods } from './identity'
import { builtinsIntrospectionMethods } from './introspection'

export const stdlibBuiltinsMethods = [
  ...builtinsWhyAndWhenMethods,
  ...builtinsTypeCheckingMethods,
  ...builtinsIdentityMethods,
  ...builtinsIntrospectionMethods,
]

// Re-export individual modules for granular imports
export { builtinsWhyAndWhenMethods } from './whyAndWhen'
export { builtinsTypeCheckingMethods } from './typeChecking'
export { builtinsIdentityMethods } from './identity'
export { builtinsIntrospectionMethods } from './introspection'
