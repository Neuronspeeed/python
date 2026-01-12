import { TypePage } from '../components/TypePage'
import { controlFlowPageConfigs, type ControlFlowPageConfig } from '../config/controlFlowPageConfigs'
import { fundamentalsMethods } from '../data/fundamentals/index'
import { statementsMethods } from '../data/statements'
import { conditionalsMethods } from '../data/conditionals'
import { conditionalPatternsMethods } from '../data/conditionalPatterns'
import { matchMethods } from '../data/match'
import { loopsMethods } from '../data/loopsMethods'
import { comprehensionsMethods } from '../data/comprehensions'
import { functionsMethods } from '../data/functions'
import { oopMethods } from '../data/oop'
import type { Method } from '../types'

function createPage(config: ControlFlowPageConfig, methods: Method[]) {
  return function Page() {
    return (
      <TypePage
        type={config.type}
        badge={config.badge}
        color={config.color}
        description={config.description}
        intro={config.intro}
        tip={config.tip}
        methods={methods}
      />
    )
  }
}

export const FundamentalsPage = createPage(controlFlowPageConfigs.fundamentals, fundamentalsMethods)
export const StatementsPage = createPage(controlFlowPageConfigs.statements, statementsMethods)
export const ConditionalsPage = createPage(controlFlowPageConfigs.conditionals, conditionalsMethods)
export const ConditionalPatternsPage = createPage(controlFlowPageConfigs.conditionalPatterns, conditionalPatternsMethods)
export const MatchPage = createPage(controlFlowPageConfigs.match, matchMethods)
export const LoopsPage = createPage(controlFlowPageConfigs.loops, loopsMethods)
export const ComprehensionsPage = createPage(controlFlowPageConfigs.comprehensions, comprehensionsMethods)
export const FunctionsPage = createPage(controlFlowPageConfigs.functions, functionsMethods)
export const OOPPage = createPage(controlFlowPageConfigs.oop, oopMethods)
