import { whyWhenMethods } from './whyWhen'
import { gcdLcmMethods } from './gcdLcm'
import { primesMethods } from './primes'
import { modularMethods } from './modular'

// Combined Math Basics methods
export const mathBasicsMethods = [
  ...whyWhenMethods,
  ...gcdLcmMethods,
  ...primesMethods,
  ...modularMethods,
]

// Re-export individual modules for granular imports
export { whyWhenMethods } from './whyWhen'
export { gcdLcmMethods } from './gcdLcm'
export { primesMethods } from './primes'
export { modularMethods } from './modular'
