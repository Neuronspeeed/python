import { TypePage } from '../components/TypePage'
import { interviewPrepPageConfigs, type InterviewPrepPageConfig } from '../config/interviewPrepPageConfigs'
import { greedyMethods } from '../data/greedy'
import { intervalMethods } from '../data/intervals'
import { stdlibMethods } from '../data/stdlib'
import { designPatternsMethods } from '../data/designPatterns'
import { mathMethods } from '../data/math'
import { generatorMethods } from '../data/generators'
import { segmentTreeMethods } from '../data/segmentTree'
import { DSCategoryTabs } from '../components/DSCategoryTabs'
import { getProblemCount } from '../data/learn'
import type { Method } from '../types'

function createPage(config: InterviewPrepPageConfig, methods: Method[], problemCategory?: string) {
  return function Page() {
    const tabs = config.hasTabs && config.basePath && problemCategory ? (
      <DSCategoryTabs
        basePath={config.basePath}
        problemCount={getProblemCount(problemCategory)}
      />
    ) : undefined

    return (
      <TypePage
        type={config.type}
        badge={config.badge}
        color={config.color}
        description={config.description}
        intro={config.intro}
        methods={methods}
        tabs={tabs}
      />
    )
  }
}

export const GreedyPage = createPage(interviewPrepPageConfigs.greedy, greedyMethods, 'greedy')
export const IntervalsPage = createPage(interviewPrepPageConfigs.intervals, intervalMethods, 'intervals')
export const StdlibPage = createPage(interviewPrepPageConfigs.stdlib, stdlibMethods)
export const DesignPatternsPage = createPage(interviewPrepPageConfigs.designPatterns, designPatternsMethods)
export const MathPage = createPage(interviewPrepPageConfigs.math, mathMethods)
export const GeneratorsPage = createPage(interviewPrepPageConfigs.generators, generatorMethods)
export const SegmentTreePage = createPage(interviewPrepPageConfigs.segmentTree, segmentTreeMethods)
