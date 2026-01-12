import { whyWhenMethods } from './whyWhenMethods'
import { commentsMethods } from './commentsMethods'
import { dirFunctionMethods } from './dirFunctionMethods'
import { docstringsMethods } from './docstringsMethods'
import { helpPydocMethods } from './helpPydocMethods'
import { externalToolsMethods } from './externalToolsMethods'

export const documentationMethods = [
  ...whyWhenMethods,
  ...commentsMethods,
  ...dirFunctionMethods,
  ...docstringsMethods,
  ...helpPydocMethods,
  ...externalToolsMethods,
]

export {
  whyWhenMethods,
  commentsMethods,
  dirFunctionMethods,
  docstringsMethods,
  helpPydocMethods,
  externalToolsMethods,
}
