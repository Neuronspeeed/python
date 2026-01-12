import { TypePage } from '../components/TypePage'
import { algorithmPageConfigs, type AlgorithmPageConfig } from '../config/algorithmPageConfigs'
import { sortingMethods } from '../data/sorting'
import { binarySearchMethods } from '../data/binarySearch'
import { twoPointersMethods } from '../data/twoPointers'
import { backtrackingMethods } from '../data/backtracking'
import { dpMethods } from '../data/dp'
import { graphMethods } from '../data/graph'
import { DSCategoryTabs } from '../components/DSCategoryTabs'
import { getProblemCount } from '../data/learn'
import type { Method } from '../types'

function createPage(config: AlgorithmPageConfig, methods: Method[]) {
  return function Page() {
    const tabs = config.hasTabs && config.basePath && config.problemCategory ? (
      <DSCategoryTabs
        basePath={config.basePath}
        problemCount={getProblemCount(config.problemCategory)}
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

export const SortingPage = createPage(algorithmPageConfigs.sorting, sortingMethods)
export const BinarySearchPage = createPage(algorithmPageConfigs.binarySearch, binarySearchMethods)
export const TwoPointersPage = createPage(algorithmPageConfigs.twoPointers, twoPointersMethods)
export const BacktrackingPage = createPage(algorithmPageConfigs.backtracking, backtrackingMethods)
export const DynamicProgrammingPage = createPage(algorithmPageConfigs.dynamicProgramming, dpMethods)
export const GraphPage = createPage(algorithmPageConfigs.graph, graphMethods)
