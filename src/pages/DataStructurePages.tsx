import { TypePage } from '../components/TypePage'
import { dataStructurePageConfigs, type DataStructurePageConfig } from '../config/dataStructurePageConfigs'
import { arrayMethods } from '../data/arrays'
import { linkedListMethods } from '../data/linkedList'
import { stackQueueMethods } from '../data/stackQueue'
import { binaryTreeMethods } from '../data/binaryTree'
import { heapMethods } from '../data/heap'
import { trieMethods } from '../data/trie'
import { unionFindMethods } from '../data/unionFind'
import { matrixMethods } from '../data/matrix'
import { bitManipulationMethods } from '../data/bitManipulation'
import { DSCategoryTabs } from '../components/DSCategoryTabs'
import { getProblemCount } from '../data/learn'
import type { Method } from '../types'

function createPage(config: DataStructurePageConfig, methods: Method[]) {
  return function Page() {
    const tabs = config.hasTabs && config.basePath && config.problemCategories ? (
      <DSCategoryTabs
        basePath={config.basePath}
        problemCount={getProblemCount(...config.problemCategories)}
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

export const ArraysPage = createPage(dataStructurePageConfigs.arrays, arrayMethods)
export const LinkedListPage = createPage(dataStructurePageConfigs.linkedList, linkedListMethods)
export const StackQueuePage = createPage(dataStructurePageConfigs.stackQueue, stackQueueMethods)
export const BinaryTreePage = createPage(dataStructurePageConfigs.binaryTree, binaryTreeMethods)
export const HeapPage = createPage(dataStructurePageConfigs.heap, heapMethods)
export const TriePage = createPage(dataStructurePageConfigs.trie, trieMethods)
export const UnionFindPage = createPage(dataStructurePageConfigs.unionFind, unionFindMethods)
export const MatrixPage = createPage(dataStructurePageConfigs.matrix, matrixMethods)
export const BitManipulationPage = createPage(dataStructurePageConfigs.bitManipulation, bitManipulationMethods)
