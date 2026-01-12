import { fileioBasicsMethods } from './basics'

// Combined fileio methods
export const fileioMethods = [
  ...fileioBasicsMethods,
]

// Re-export individual modules for granular imports
export { fileioBasicsMethods } from './basics'
