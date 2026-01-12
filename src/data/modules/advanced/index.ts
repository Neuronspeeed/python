import { whyAndWhenMethods } from './whyAndWhen'
import { programStructureMethods } from './programStructure'
import { namespacesMethods } from './namespaces'
import { importVariantsMethods } from './importVariants'
import { reloadingMethods } from './reloading'
import { dynamicImportsMethods } from './dynamicImports'

// Combined advanced modules methods - maintains original order
export const modulesAdvancedMethods = [
  ...whyAndWhenMethods,
  ...programStructureMethods,
  ...namespacesMethods,
  ...importVariantsMethods,
  ...reloadingMethods,
  ...dynamicImportsMethods,
]

// Re-export individual sections for granular imports
export { whyAndWhenMethods } from './whyAndWhen'
export { programStructureMethods } from './programStructure'
export { namespacesMethods } from './namespaces'
export { importVariantsMethods } from './importVariants'
export { reloadingMethods } from './reloading'
export { dynamicImportsMethods } from './dynamicImports'
