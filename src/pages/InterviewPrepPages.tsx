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
      tip={`When greedy works? Greedy choice property + optimal substructure (harder to prove than DP!)
"Maximum non-overlapping intervals"? Sort by END time, pick earliest end greedily
Greedy fails? 0/1 Knapsack, Coin Change (arbitrary denominations) → use DP
Why greedy over DP? O(n log n) sorting vs O(n²) DP table - when it works, it's fast!`}
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
      tip={`Check overlap? Sort by START, compare consecutive
Max non-overlapping? Sort by END (greedy - earliest end leaves most room)
Min rooms needed? Sweep line (events: start +1, end -1) or min-heap of end times
Gotcha? Sort by END for greedy max, not by start!`}
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
      tip={`Check ONE prime? Trial division O(√n) up to 10¹² - Find ALL primes up to N? Sieve O(n log log n)
GCD/LCM? math.gcd(a,b) is FAST O(log n), LCM = a*b // gcd(a,b)
"Return answer mod 10⁹+7"? Apply mod to intermediate results, use pow(base, exp, MOD)
Modular inverse? pow(a, m-2, m) when m is prime (Fermat's little theorem)`}
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
      tip={`Range query (sum/min/max) + updates? Segment Tree O(log n)
Only range sum + point update? BIT (Fenwick) - simpler, same performance
Static array (no updates)? Prefix sum array O(n) build, O(1) query
Overkill warning? For n<10⁵ and rare updates, just recalculate!`}
      methods={segmentTreeMethods}
    />
  )
}
