import { modulesBasicsMethods } from './modulesBasics'
import { modulesAdvancedMethods } from './advanced'

// Combined Modules methods - maintains original order
export const modulesMethods = [
  ...modulesBasicsMethods,
  ...modulesAdvancedMethods,
]

// Re-export individual modules for granular imports
export { modulesBasicsMethods } from './modulesBasics'
export { modulesAdvancedMethods } from './advanced'
