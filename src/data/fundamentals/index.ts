import { coreConceptsMethods } from './coreConcepts'
import { whyWhenMethods } from './whyWhen'
import { objectHierarchyMethods } from './objectHierarchy'
import { mutabilityMethods } from './mutability'
import { typeCategoriesMethods } from './typeCategories'
import { numericLiteralsMethods } from './numericLiterals'
import { operatorsExpressionsMethods } from './operatorsExpressions'
import { numericModulesMethods } from './numericModules'
import { philosophyToolsMethods } from './philosophyTools'

export const fundamentalsMethods = [
  ...coreConceptsMethods,
  ...whyWhenMethods,
  ...objectHierarchyMethods,
  ...mutabilityMethods,
  ...typeCategoriesMethods,
  ...numericLiteralsMethods,
  ...operatorsExpressionsMethods,
  ...numericModulesMethods,
  ...philosophyToolsMethods,
]
