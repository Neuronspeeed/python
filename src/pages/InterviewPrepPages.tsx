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

const stdlibIntro = `Python's Standard Library provides battle-tested tools that make interview problems dramatically simpler. The key insight: @lru_cache converts O(2^n) DP to O(n) with one decorator, Counter eliminates manual counting, and deque gives O(1) queue operations. Mastering stdlib is interview gold.

@LRU_CACHE - THE #1 INTERVIEW TOOL: Dynamic programming problems often start with exponential time complexity due to repeated subproblem calculations. Manual memoization requires managing a dictionary, checking for cached results, and handling edge cases. The @lru_cache decorator does all this automatically—convert any recursive function to memoized DP by adding one line. It's implemented in C, thread-safe, provides cache statistics, and handles hashable argument types correctly.

\`\`\`python
# Manual DP - error-prone, verbose
memo = {}
def fib(n):
    if n in memo:
        return memo[n]
    if n < 2:
        return n
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]

# @lru_cache - clean, fast
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

# Interview wins: Fibonacci, climbing stairs, coin change, word break
# All become one-decorator solutions
\`\`\`

COLLECTIONS - SPECIALIZED CONTAINERS: Python's collections module provides Counter, defaultdict, deque, OrderedDict, and ChainMap—each optimized for specific use cases. Counter eliminates manual frequency counting with one line. defaultdict removes KeyError checking when building dictionaries. deque provides O(1) operations at both ends, essential for BFS and queues. OrderedDict maintains insertion order and powers the cleanest LRU cache implementation.

COUNTER PATTERN: Frequency analysis appears constantly in interviews—finding anagrams, top-k frequent elements, character counts, majority elements. Manual dictionary counting requires initialization checks and increment logic. Counter does it all: \`Counter(arr)\` counts frequencies, \`.most_common(k)\` finds top k elements, and Counter supports set-like operations (intersection, union, difference) for comparing frequencies.

\`\`\`python
# Manual counting - verbose
freq = {}
for char in string:
    if char in freq:
        freq[char] += 1
    else:
        freq[char] = 1

# Counter - one line
from collections import Counter
freq = Counter(string)

# Interview patterns
is_anagram = Counter(s1) == Counter(s2)  # Anagram check
top_k = Counter(arr).most_common(k)      # Top k frequent
majority = Counter(arr).most_common(1)[0][0]  # Majority element
\`\`\`

DEQUE - DOUBLE-ENDED QUEUE: Never use list for queue operations! \`list.pop(0)\` shifts all elements (O(n)), while \`deque.popleft()\` is O(1). This difference turns O(n²) BFS into O(n). deque also supports efficient sliding window implementations with O(1) operations at both ends. For any problem involving BFS, queue operations, or sliding windows, deque is mandatory.

ITERTOOLS - COMBINATORICS MADE EASY: Implementing permutations or combinations from scratch requires complex recursive backtracking (15+ lines, easy to bug). itertools provides permutations(), combinations(), product() as one-liners. These are lazy iterators (memory-efficient) implemented in C (fast). Also provides infinite iterators (count, cycle, repeat) and powerful chainers (chain, groupby, accumulate).

WHEN STDLIB BEATS MANUAL: Use stdlib when it matches your needs exactly—the code is cleaner, faster, and less buggy. Implement manually when: you need custom logic, the interviewer explicitly asks for the algorithm, or stdlib doesn't support your specific requirements. Always start with stdlib; switch to manual only when necessary.`

const designPatternsIntro = `Design pattern problems test your ability to build custom data structures optimized for specific constraints. The key insight: combine basic structures (arrays, hash maps, stacks) to achieve required time complexities. LRU cache, min stack, and rate limiters are frequently asked.

LRU CACHE - THE CLASSIC: Least Recently Used cache requires O(1) get and put operations with a capacity limit. When capacity is exceeded, evict the least recently used item. The challenge: how to track usage order efficiently? Two approaches: OrderedDict (Python-specific, ~20 lines) or HashMap + Doubly Linked List (universal, ~80 lines). Both achieve O(1) operations.

\`\`\`python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)  # Mark as recently used
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove oldest

# OrderedDict.move_to_end() moves key to end (most recent)
# popitem(last=False) removes from front (least recent)
\`\`\`

LRU VS LFU - CHOOSING EVICTION POLICY: LRU (Least Recently Used) evicts items not accessed recently. LFU (Least Frequently Used) evicts items accessed least often. LRU optimizes for temporal locality—recent items are likely needed again. LFU optimizes for frequency—popular items stay cached longer. Choose LRU for general caching (web browsers, file systems). Choose LFU when frequency matters more than recency (music streaming, trending content).

MIN STACK PATTERN: Design a stack supporting push, pop, top, and getMin—all in O(1). The naive approach \`min(stack)\` is O(n). The insight: track minimum alongside each element. Store tuples \`(value, current_min)\` where current_min is the minimum of all elements at or below this position. When pushing, compare new value with current min. When popping, the new min is automatically the min of the element now on top.

\`\`\`python
class MinStack:
    def __init__(self):
        self.stack = []  # Store (value, current_min) pairs

    def push(self, val):
        if not self.stack:
            self.stack.append((val, val))
        else:
            current_min = min(val, self.stack[-1][1])
            self.stack.append((val, current_min))

    def pop(self):
        self.stack.pop()

    def top(self):
        return self.stack[-1][0]

    def getMin(self):
        return self.stack[-1][1]  # O(1) min!
\`\`\`

ITERATOR PROTOCOL: Python's iteration protocol uses __iter__() (returns iterator) and __next__() (yields next value, raises StopIteration when done). Design problems often ask for custom iterators—flattening nested lists, peeking iterators, zigzag iterators. The pattern: store state in __init__, return self from __iter__, update and yield in __next__, raise StopIteration when exhausted.

RATE LIMITER - SYSTEM DESIGN: Limit requests to N per time window. Three approaches: Fixed Window (reset counter every window—simple but allows bursts), Sliding Window (track timestamps, drop old ones—accurate but higher space), Token Bucket (refill tokens at rate—smooth rate limiting). Sliding window with deque is most common in interviews: store timestamps, add new timestamp, remove timestamps older than window, check if count exceeds limit.

COMMON DESIGN PATTERNS: Min/Max Stack (track extreme with tuples), Queue using Two Stacks (amortized O(1)), Insert/Delete/GetRandom (HashMap + Array), Browser History (two stacks for back/forward), Circular Queue (array with wraparound), MedianFinder (two heaps). Each combines basic structures to achieve required complexities.`

const generatorsIntro = `Generators enable lazy evaluation—producing values one at a time instead of building entire sequences in memory. The key insight: process infinite sequences, handle huge files, and build data pipelines with constant memory. The yield keyword transforms functions into generators.

MEMORY EFFICIENCY: Lists store all elements in memory simultaneously. Generators yield one element at a time, maintaining state between yields. For large datasets, this difference is dramatic. Reading a 100GB log file: list approach loads entire file into memory (crashes), generator approach processes one line at a time with O(1) memory (works perfectly). For infinite sequences, generators are the only option.

\`\`\`python
# List - loads everything into memory
def range_list(n):
    result = []
    for i in range(n):
        result.append(i)
    return result

huge_list = range_list(1_000_000_000)  # 8GB+ memory!

# Generator - yields one at a time
def range_gen(n):
    for i in range(n):
        yield i  # Pause here, return value

huge_gen = range_gen(1_000_000_000)  # ~128 bytes memory
for num in huge_gen:
    process(num)  # Only one number in memory at a time
\`\`\`

YIELD KEYWORD: When a function contains yield, calling it returns a generator object (doesn't execute the function). Each call to next() executes until the next yield, returns the yielded value, and pauses. State (local variables, execution position) is preserved. On the next next() call, execution resumes right after the yield. This enables writing iterators as simple functions instead of classes with __iter__ and __next__.

GENERATOR EXPRESSIONS: Like list comprehensions but with parentheses instead of brackets. \`(x**2 for x in range(10))\` creates a generator that yields squares lazily. List comprehension \`[x**2 for x in range(10)]\` computes and stores all squares immediately. Use generator expressions when: iterating once, working with large data, building pipelines. Use list comprehensions when: need multiple iterations, need len(), need random access.

\`\`\`python
# List comprehension - immediate evaluation
squares_list = [x**2 for x in range(1_000_000)]  # ~8MB memory
print(squares_list[500000])  # Random access OK

# Generator expression - lazy evaluation
squares_gen = (x**2 for x in range(1_000_000))  # ~128 bytes
# Can iterate once
for sq in squares_gen:
    if sq > 1000: break

# Can't do: squares_gen[500000] - TypeError!
# Can't do: len(squares_gen) - TypeError!
\`\`\`

GENERATOR PIPELINES: Chain generators to process data in stages without intermediate storage. Each generator feeds the next, maintaining constant memory. Pattern: data source → filter → transform → consume. Example: read huge file → filter for errors → parse lines → count by type. The entire pipeline uses O(1) memory regardless of file size.

YIELD FROM: Delegate to another generator. Instead of \`for item in other_gen: yield item\`, write \`yield from other_gen\`. Useful for flattening nested generators, recursive tree traversals, and composing generators. Cleaner and slightly faster than manual looping.

WHEN GENERATORS WIN: Large or infinite sequences, one-pass iteration, streaming data, memory constraints, lazy evaluation needed. Files are generators by default—iterating over \`open(file)\` yields lines without loading entire file. Use generators for data processing pipelines, streaming APIs, and any time you think "I don't need it all at once."

WHEN GENERATORS LOSE: Need len() (generators don't have length), need random access (no indexing), need to iterate multiple times (generators exhaust), small data that fits in memory (lists are simpler). Convert generator to list if needed: \`list(generator)\`, but this defeats the memory benefits.`

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
      intro={stdlibIntro}
      tip={`DP with recursion? @lru_cache decorator - converts O(2^n) to O(n) with one line
Top-k frequent elements? Counter(arr).most_common(k) - beats manual dict counting
BFS or queue operations? collections.deque - NEVER use list.pop(0), it's O(n)! Use deque.popleft() O(1)
Group by key without KeyError? defaultdict(list) - auto-creates empty list for new keys
All permutations/combinations? itertools.permutations(arr), combinations(arr, k) - one-liners vs complex backtracking`}
      methods={stdlibMethods}
    />
  )
}

export function DesignPatternsPage() {
  return (
    <TypePage
      type="Design Patterns" badge="LRU" color="var(--accent-design)"
      description="LRU/LFU Cache, Min Stack, Rate Limiter, and other frequently asked design problems."
      intro={designPatternsIntro}
      tip={`LRU Cache? OrderedDict + move_to_end() for O(1) get/put - cleanest Python approach (~20 lines)
LFU vs LRU? LRU evicts by recency (recent access), LFU evicts by frequency (access count)
Min Stack with O(1) getMin? Store (value, current_min) tuples - min always available
Iterator protocol? __iter__ returns self, __next__ yields values, raise StopIteration when done
Rate limiter (N requests per window)? Sliding window with deque - track timestamps, drop old ones`}
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
      intro={generatorsIntro}
      tip={`Process huge file or infinite sequence? Generator with yield - O(1) memory vs O(n) for list
Generator expression vs list comprehension? (x**2 for x in arr) lazy vs [x**2 for x in arr] eager
Advance generator manually? next(gen) - returns next value, raises StopIteration when exhausted
Flatten or chain generators? yield from other_gen - cleaner than "for item in other_gen: yield item"
Gotcha: can't iterate twice! Generators exhaust after one pass - convert to list if multiple iterations needed`}
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
