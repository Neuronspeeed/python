import { fundamentalsMethods } from './fundamentals'
import { whyWhenMethods } from './whyWhen'
import { functionDefinitionMethods } from './functionDefinition'
import { parametersMethods } from './parameters'
import { argsKwargsMethods } from './argsKwargs'
import { argumentUnpackingMethods } from './argumentUnpacking'
import { lambdaFunctionsMethods } from './lambdaFunctions'
import { scopesLegbMethods } from './scopesLegb'
import { firstClassPolymorphismMethods } from './firstClassPolymorphism'
import { recursionPatternsMethods } from './recursionPatterns'

// Combined basics methods - maintains original order
export const functionsBasicsMethods = [
  ...fundamentalsMethods,
  ...whyWhenMethods,
  ...functionDefinitionMethods,
  ...parametersMethods,
  ...argsKwargsMethods,
  ...argumentUnpackingMethods,
  ...lambdaFunctionsMethods,
  ...scopesLegbMethods,
  ...firstClassPolymorphismMethods,
  ...recursionPatternsMethods,
]

// Re-export individual modules for granular imports
export { fundamentalsMethods } from './fundamentals'
export { whyWhenMethods } from './whyWhen'
export { functionDefinitionMethods } from './functionDefinition'
export { parametersMethods } from './parameters'
export { argsKwargsMethods } from './argsKwargs'
export { argumentUnpackingMethods } from './argumentUnpacking'
export { lambdaFunctionsMethods } from './lambdaFunctions'
export { scopesLegbMethods } from './scopesLegb'
export { firstClassPolymorphismMethods } from './firstClassPolymorphism'
export { recursionPatternsMethods } from './recursionPatterns'
