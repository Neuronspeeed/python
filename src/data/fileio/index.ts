import { fileioBasicsMethods } from './fileioBasics'

// Combined fileio methods
export const fileioMethods = [
  ...fileioBasicsMethods,
]

// Re-export individual modules for granular imports
export { fileioBasicsMethods } from './fileioBasics'
