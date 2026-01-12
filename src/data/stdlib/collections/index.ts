import { collectionsWhyAndWhenMethods } from './whyAndWhen'
import { collectionsCounterMethods } from './counter'
import { collectionsDefaultdictMethods } from './defaultdict'
import { collectionsOrderedDictMethods } from './orderedDict'
import { collectionsDequeMethods } from './deque'
import { collectionsChainMapMethods } from './chainMap'
import { collectionsNamedtupleMethods } from './namedtuple'

// Combined collections methods - maintains logical order
export const stdlibCollectionsMethods = [
  ...collectionsWhyAndWhenMethods,
  ...collectionsCounterMethods,
  ...collectionsDefaultdictMethods,
  ...collectionsOrderedDictMethods,
  ...collectionsDequeMethods,
  ...collectionsChainMapMethods,
  ...collectionsNamedtupleMethods,
]

// Re-export individual modules for granular imports
export { collectionsWhyAndWhenMethods } from './whyAndWhen'
export { collectionsCounterMethods } from './counter'
export { collectionsDefaultdictMethods } from './defaultdict'
export { collectionsOrderedDictMethods } from './orderedDict'
export { collectionsDequeMethods } from './deque'
export { collectionsChainMapMethods } from './chainMap'
export { collectionsNamedtupleMethods } from './namedtuple'
