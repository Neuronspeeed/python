import type { Method } from '../../types'

import { assignmentFundamentals } from './assignmentFundamentals'
import { whyAndWhen } from './whyAndWhen'
import { sequenceAssignment } from './sequenceAssignment'
import { multipleAndAugmented } from './multipleAndAugmented'
import { walrusOperator } from './walrusOperator'
import { variableNaming } from './variableNaming'
import { expressionStatements } from './expressionStatements'
import { printOperations } from './printOperations'

export const statementsMethods: Method[] = [
  ...assignmentFundamentals,
  ...whyAndWhen,
  ...sequenceAssignment,
  ...multipleAndAugmented,
  ...walrusOperator,
  ...variableNaming,
  ...expressionStatements,
  ...printOperations,
]

export {
  assignmentFundamentals,
  whyAndWhen,
  sequenceAssignment,
  multipleAndAugmented,
  walrusOperator,
  variableNaming,
  expressionStatements,
  printOperations,
}
