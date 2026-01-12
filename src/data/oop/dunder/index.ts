import { dunderWhyWhenMethods } from './dunderWhyWhen'
import { dunderCoreMethods } from './dunderMethods'

// Combined dunder methods - maintains original order
export const oopDunderMethods = [
  ...dunderWhyWhenMethods,
  ...dunderCoreMethods,
]

// Re-export individual modules for granular imports
export { dunderWhyWhenMethods } from './dunderWhyWhen'
export { dunderCoreMethods } from './dunderMethods'
