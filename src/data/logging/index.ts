import { loggingBasicsMethods } from './loggingBasics'
import { loggingDebuggingMethods } from './loggingDebugging'

// Combined Logging methods - maintains original order
export const loggingMethods = [
  ...loggingBasicsMethods,
  ...loggingDebuggingMethods,
]

// Re-export individual modules for granular imports
export { loggingBasicsMethods } from './loggingBasics'
export { loggingDebuggingMethods } from './loggingDebugging'
