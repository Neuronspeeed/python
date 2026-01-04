import { TypePage } from '../components/TypePage'
import { greedyMethods } from '../data/greedy'
import { intervalMethods } from '../data/intervals'
import { stdlibMethods } from '../data/stdlib'
import { designPatternsMethods } from '../data/designPatterns'
import { mathMethods } from '../data/math'
import { generatorMethods } from '../data/generators'
import { segmentTreeMethods } from '../data/segmentTree'
import { DSCategoryTabs } from '../components/DSCategoryTabs'
import { getProblemCount } from '../data/learn'

export function GreedyPage() {
  return (
    <TypePage
      type="Greedy Algorithms" badge="grdy" color="var(--accent-greedy)"
      description="Make locally optimal choices hoping for global optimum. Works when greedy choice property + optimal substructure exist."
      tip={`"Maximum non-overlapping"? Sort by END time, pick greedily
Greedy fails? Try DP instead
Why greedy over DP? O(n log n) vs O(n²)`}
      methods={greedyMethods}
      tabs={<DSCategoryTabs basePath="/greedy" problemCount={getProblemCount('greedy')} />}
    />
  )
}

export function IntervalsPage() {
  return (
    <TypePage
      type="Intervals Pattern" badge="[ ]" color="var(--accent-intervals)"
      description="Interval problems: merge, insert, schedule. Key techniques: sort by start/end, sweep line, event processing."
      tip={`Merge overlapping? Sort by START
Max non-overlapping? Sort by END (greedy)
Meeting rooms II? Min-heap for end times`}
      methods={intervalMethods}
      tabs={<DSCategoryTabs basePath="/intervals" problemCount={getProblemCount('intervals')} />}
    />
  )
}

export function StdlibPage() {
  return (
    <TypePage
      type="Python Standard Library" badge="py" color="var(--accent-stdlib)"
      description="Essential functools, itertools, and collections for interviews. @lru_cache is interview gold for DP memoization."
      tip={`DP memoization? @lru_cache decorator
Top-k elements? Counter(arr).most_common(k)
Group by key? defaultdict(list)`}
      methods={stdlibMethods}
    />
  )
}

export function DesignPatternsPage() {
  return (
    <TypePage
      type="Design Patterns" badge="LRU" color="var(--accent-design)"
      description="LRU/LFU Cache, Min Stack, Rate Limiter, and other frequently asked design problems."
      tip={`LRU Cache? OrderedDict + move_to_end()
Min Stack? Stack of (val, current_min)
Iterator pattern? __iter__ + __next__ + StopIteration`}
      methods={designPatternsMethods}
    />
  )
}

export function MathPage() {
  return (
    <TypePage
      type="Math Algorithms" badge="∑" color="var(--accent-math)"
      description="GCD/LCM, primes, modular arithmetic, combinatorics. Foundation for many interview problems."
      tip={`Prime check? Only loop up to √n
GCD/LCM? math.gcd(a,b), LCM = a*b//gcd
Modular inverse? pow(a, m-2, m) when m is prime`}
      methods={mathMethods}
    />
  )
}

export function GeneratorsPage() {
  return (
    <TypePage
      type="Generators & Iterators" badge="yield" color="var(--accent-generators)"
      description="Memory-efficient iteration with yield. Process huge files with constant memory. Build data pipelines."
      tip={`Process huge file? Generator with yield (O(1) memory)
Infinite sequence? Generator, not list
Advance iterator? next(gen)`}
      methods={generatorMethods}
    />
  )
}

export function SegmentTreePage() {
  return (
    <TypePage
      type="Segment Tree / BIT" badge="tree" color="var(--accent-segment-tree)"
      description="O(log n) range queries + point updates. Segment Tree for sum/min/max, BIT (Fenwick) for simpler prefix sums."
      tip={`Range query + point update? Segment Tree
Only prefix sums? BIT (simpler)
Static range queries? Prefix sum array (O(1) query)`}
      methods={segmentTreeMethods}
    />
  )
}
