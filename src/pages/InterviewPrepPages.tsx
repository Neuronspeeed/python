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

const greedyIntro = `Greedy algorithms make locally optimal choices at each step hoping to find a global optimum. The key insight: if you can prove that a local optimum leads to a global optimum, greedy is simple and fast—but proving correctness is often harder than with DP.

WHEN GREEDY WORKS: A greedy algorithm works when the problem has two properties: (1) Greedy choice property - a locally optimal choice leads to a globally optimal solution, (2) Optimal substructure - an optimal solution contains optimal solutions to subproblems. Classic greedy problems: activity selection, Huffman coding, minimum spanning trees (Kruskal's, Prim's), Dijkstra's shortest path, fractional knapsack.

WHEN GREEDY FAILS: Greedy doesn't always work! Classic failures: 0/1 knapsack (taking highest value/weight ratio locally doesn't give global optimum), coin change with arbitrary denominations (greedy picks largest coin, but may need more coins total), longest path in general graphs. If greedy seems to fail, try dynamic programming.

PROOF TECHNIQUES: Exchange argument - assume optimal solution differs from greedy, show you can exchange elements to match greedy without making it worse. Stays-ahead argument - show greedy maintains a better partial solution than any other algorithm. Cut-and-paste - show any optimal solution can be modified to match greedy's choices. Without proof, greedy is just a heuristic.

INTERVAL SCHEDULING PATTERN: The classic greedy problem. Given intervals with start/end times, select maximum number that don't overlap. Greedy strategy: sort by END time, pick earliest ending interval, skip all overlapping intervals, repeat. Why it works: picking earliest end leaves the most room for future intervals. Proof: exchange argument—any optimal solution can be modified to include earliest-ending interval first.

\`\`\`python
def max_intervals(intervals):
    # Sort by end time
    intervals.sort(key=lambda x: x[1])
    count, end = 0, float('-inf')
    for start, e in intervals:
        if start >= end:  # No overlap
            count += 1
            end = e
    return count
\`\`\`

GREEDY VS DYNAMIC PROGRAMMING: Greedy is simpler and faster when it works—often O(n log n) due to sorting vs O(n²) for DP. Use greedy when you can prove correctness. Use DP when: greedy gives wrong answer, you need to count ways (not just find optimum), problem has overlapping subproblems with no greedy structure. Try greedy first if it seems natural, verify with examples, fallback to DP if greedy fails.`

export function GreedyPage() {
  return (
    <TypePage
      type="Greedy Algorithms" badge="grdy" color="var(--accent-greedy)"
      description="Make locally optimal choices hoping for global optimum. Works when greedy choice property + optimal substructure exist."
      intro={greedyIntro}
      tip={`When greedy works? Greedy choice property + optimal substructure (harder to prove than DP!)
"Maximum non-overlapping intervals"? Sort by END time, pick earliest end greedily
Greedy fails? 0/1 Knapsack, Coin Change (arbitrary denominations) → use DP
Why greedy over DP? O(n log n) sorting vs O(n²) DP table - when it works, it's fast!`}
      methods={greedyMethods}
      tabs={<DSCategoryTabs basePath="/greedy" problemCount={getProblemCount('greedy')} />}
    />
  )
}

const intervalsIntro = `Interval problems involve ranges with start and end points. These problems appear frequently in scheduling, time management, and range queries. The key insight: sorting by start or end time (choosing correctly!) often transforms a hard problem into a simple linear scan.

SORT BY START VS END: This is the critical decision. Sort by START time when: checking for overlaps (merge intervals), finding gaps, processing events in chronological order. Sort by END time when: maximizing non-overlapping intervals (greedy scheduling), earliest deadline first. The sorting choice determines the algorithm—wrong choice makes the problem unsolvable.

OVERLAP DETECTION PATTERN: To check if intervals overlap, sort by START time, then scan consecutive pairs. If intervals[i].end > intervals[i+1].start, they overlap. To merge overlapping intervals: sort by start, iterate through, if current overlaps with last merged, extend last merged's end time, otherwise add current as new merged interval.

\`\`\`python
def merge_intervals(intervals):
    if not intervals: return []
    intervals.sort(key=lambda x: x[0])  # Sort by START
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:  # Overlap
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
\`\`\`

SWEEP LINE TECHNIQUE: Process events (start/end of intervals) in chronological order, maintaining active count. Useful for: minimum rooms needed, maximum concurrent intervals, range coverage. Pattern: create events list, sort by time, process events updating counter (start = +1, end = -1), track maximum counter value.

\`\`\`python
def min_meeting_rooms(intervals):
    events = []
    for start, end in intervals:
        events.append((start, 1))   # Meeting starts
        events.append((end, -1))    # Meeting ends
    events.sort()
    rooms, max_rooms = 0, 0
    for time, delta in events:
        rooms += delta
        max_rooms = max(max_rooms, rooms)
    return max_rooms
\`\`\`

PRIORITY QUEUE PATTERN: Alternative to sweep line for interval problems. Useful when you need to track which specific intervals are active. Pattern: sort intervals by start, use min-heap of end times, when processing new interval, remove all ended intervals from heap, heap size = active count.

COMMON INTERVAL PATTERNS: Merge overlapping → sort by start, merge consecutive. Insert interval → binary search for position, merge overlaps. Non-overlapping intervals → sort by end, greedy pick earliest ending. Minimum rooms → sweep line or heap. Interval intersection → two pointers on sorted intervals. Remove covered intervals → sort by start ascending, end descending.`

export function IntervalsPage() {
  return (
    <TypePage
      type="Intervals Pattern" badge="[ ]" color="var(--accent-intervals)"
      description="Interval problems: merge, insert, schedule. Key techniques: sort by start/end, sweep line, event processing."
      intro={intervalsIntro}
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

const mathIntro = `Mathematical algorithms form the foundation for many coding problems. These aren't abstract formulas—they're practical tools that appear in interviews and real systems. The key insight: knowing when to use each technique (GCD vs LCM, sieve vs trial division, modular arithmetic) matters more than memorizing proofs.

GCD AND LCM: GCD (Greatest Common Divisor) finds the largest number that divides both inputs. Use for: simplifying fractions, checking if numbers are coprime, finding cycles/patterns. LCM (Least Common Multiple) finds the smallest number divisible by both inputs. Use for: synchronization problems, finding when repeating events align, common denominators. Python's \`math.gcd()\` is highly optimized—use it instead of implementing your own. LCM formula: \`a * b // gcd(a, b)\` (divide first to avoid overflow in other languages).

PRIME NUMBERS - TRIAL DIVISION VS SIEVE: To check if ONE number n is prime: trial division checks divisors up to √n, O(√n) time. Fast enough for n up to 10¹² in interviews. To find ALL primes up to N: Sieve of Eratosthenes marks multiples as composite, O(n log log n) time. For N=1,000,000: sieve takes ~0.1 seconds, checking each with trial division takes ~10 seconds. Use trial division for single checks, sieve for generating many primes or prime-related preprocessing.

\`\`\`python
# Trial division - check if n is prime
def is_prime(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0: return False
    return True

# Sieve - find all primes up to n
def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False
    return [i for i in range(n+1) if is_prime[i]]
\`\`\`

MODULAR ARITHMETIC: When problems ask "return answer modulo 10⁹+7", they're preventing integer overflow and making answers comparable. Rules: (a+b) % m = ((a%m) + (b%m)) % m, same for multiplication. Division doesn't work directly—use modular inverse. Python's \`pow(base, exp, mod)\` efficiently computes (base^exp) % mod using binary exponentiation. Apply mod to intermediate results to keep numbers small.

MODULAR INVERSE: To divide by b under modulo m, multiply by b's modular inverse. When m is prime (like 10⁹+7), use Fermat's Little Theorem: \`pow(b, m-2, m)\` gives b's inverse. Example: (a/b) % m = (a * pow(b, m-2, m)) % m. Essential for combinatorics problems (nCr % mod requires dividing factorials).

COMBINATORICS: Counting permutations, combinations, arrangements. Permutations: n! ways to arrange n items. Combinations: C(n,k) = n!/(k!(n-k)!) ways to choose k from n. When computing under modulo, can't divide directly—use modular inverse. Precompute factorials, then use inverse for division.

WHEN MATH APPEARS IN INTERVIEWS: "Count ways to..." often involves combinatorics. "Find pattern/cycle" may need GCD/LCM. "Large numbers" signal modular arithmetic. "Factors/divisors" indicate prime factorization. Don't panic—these problems test application of formulas, not mathematical proofs.`

export function MathPage() {
  return (
    <TypePage
      type="Math Algorithms" badge="∑" color="var(--accent-math)"
      description="GCD/LCM, primes, modular arithmetic, combinatorics. Foundation for many interview problems."
      intro={mathIntro}
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

const segmentTreeIntro = `Segment Trees and Binary Indexed Trees (BIT/Fenwick Trees) efficiently handle range queries and updates. The key insight: precompute answers for segments of the array so range queries don't require scanning all elements. Both achieve O(log n) query and update time.

WHEN TO USE: Need range queries (sum, min, max, GCD) with updates? Segment Tree or BIT. Static array (no updates)? Use prefix sum array (O(n) build, O(1) query). Dynamic updates but rare? Sometimes just recalculating is simpler than building a tree structure. Use Segment Tree/BIT when: array size > 10⁴, many queries (> 100), or updates are frequent.

SEGMENT TREE VS BIT: Segment Tree supports any associative operation (sum, min, max, GCD) and range updates with lazy propagation. Implementation: ~100 lines, more complex. BIT only supports prefix sums (and by extension, range sums) but is much simpler to implement (~20 lines). If you only need range sum with point updates, use BIT. For min/max/GCD or range updates, use Segment Tree.

\`\`\`python
# BIT (Binary Indexed Tree) - simpler for range sums
class BIT:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)

    def update(self, i, delta):  # Add delta to arr[i]
        i += 1  # 1-indexed
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)  # Add last set bit

    def query(self, i):  # Sum of arr[0..i]
        i += 1  # 1-indexed
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)  # Remove last set bit
        return s

    def range_sum(self, left, right):
        return self.query(right) - (self.query(left-1) if left > 0 else 0)
\`\`\`

SEGMENT TREE STRUCTURE: A binary tree where each node represents a segment of the array. Leaf nodes represent single elements, internal nodes represent the merge of their children. Root represents entire array. To query [L, R]: traverse tree, collect segments completely inside [L, R], merge results. To update index i: update path from root to leaf i, recalculate ancestors.

LAZY PROPAGATION: Advanced technique for range updates on Segment Tree. Instead of updating all elements in a range immediately, mark nodes as "lazy" and propagate changes only when needed for queries. Converts O(n) range update to O(log n). Essential for competitive programming but rarely needed in interviews.

WHEN SEGMENT TREE IS OVERKILL: Small arrays (n < 1000): O(n) scan is fine. Few queries: building tree takes O(n), not worth it for 1-2 queries. Static data: use prefix sums. Simple range queries without updates: cumulative arrays suffice. The interview question "given array, answer Q range sum queries" → prefix sums, not Segment Tree (unless updates are mentioned).`

export function SegmentTreePage() {
  return (
    <TypePage
      type="Segment Tree / BIT" badge="tree" color="var(--accent-segment-tree)"
      description="O(log n) range queries + point updates. Segment Tree for sum/min/max, BIT (Fenwick) for simpler prefix sums."
      intro={segmentTreeIntro}
      tip={`Range query (sum/min/max) + updates? Segment Tree O(log n)
Only range sum + point update? BIT (Fenwick) - simpler, same performance
Static array (no updates)? Prefix sum array O(n) build, O(1) query
Overkill warning? For n<10⁵ and rare updates, just recalculate!`}
      methods={segmentTreeMethods}
    />
  )
}
