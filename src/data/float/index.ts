import type { Method } from '../../types'
import { floatFundamentals } from './floatFundamentals'
import { floatWhyWhen } from './floatWhyWhen'
import { floatMethodsSection } from './floatMethods'
import { floatProperties } from './floatProperties'
import { floatArithmetic } from './floatArithmetic'
import { floatBuiltins } from './floatBuiltins'
import { floatMathRounding } from './floatMathRounding'
import { floatMathPower } from './floatMathPower'
import { floatMathSpecial } from './floatMathSpecial'
import { floatMathTrig } from './floatMathTrig'

export const floatMethods: Method[] = [
  ...floatFundamentals,
  ...floatWhyWhen,
  ...floatMethodsSection,
  ...floatProperties,
  ...floatArithmetic,
  ...floatBuiltins,
  ...floatMathRounding,
  ...floatMathPower,
  ...floatMathSpecial,
  ...floatMathTrig,
]
