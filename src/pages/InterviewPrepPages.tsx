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

const stdlibIntro = `Python's Standard Library is interview gold—battle-tested tools that transform hard problems into one-liners. The key insight: @lru_cache converts O(2ⁿ) DP to O(n) with one decorator, Counter eliminates manual frequency counting, deque gives O(1) queue operations, and bisect provides binary search. Mastering stdlib means solving problems faster, cleaner, and with fewer bugs.

WHY STDLIB DOMINATES INTERVIEWS: Stdlib tools are optimized in C, battle-tested across millions of projects, and designed by experts. Using Counter instead of manual dict counting shows you know Python idioms. Using @lru_cache instead of manual memoization shows you can recognize patterns. Using deque instead of list.pop(0) shows you understand time complexity. Interviewers notice when you reach for the right tool.

**The stdlib advantage:**
- Cleaner code: One line vs 15+ lines of implementation
- Faster execution: C-optimized vs Python loops
- Fewer bugs: Battle-tested vs your ad-hoc solution
- Interview signal: "I know Python idioms and tools"

FUNCTOOLS: @LRU_CACHE - THE #1 INTERVIEW TOOL

Dynamic programming problems start with exponential time complexity due to repeated subproblem calculations. Manual memoization requires managing a dictionary, checking for cached results, and handling edge cases. The @lru_cache decorator does all this automatically—convert any recursive function to memoized DP by adding one line. It's implemented in C, thread-safe, provides cache statistics (.cache_info()), and handles hashable argument types correctly.

\`\`\`python
# ❌ Manual DP - error-prone, verbose
memo = {}
def fib(n):
    if n in memo:
        return memo[n]
    if n < 2:
        return n
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]

# ✅ @lru_cache - clean, fast, correct
from functools import lru_cache

@lru_cache(maxsize=None)  # maxsize=None for unlimited cache
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

# Interview wins:
# - Fibonacci: O(2^n) → O(n)
# - Climbing stairs: O(2^n) → O(n)
# - Coin change: O(2^n) → O(n*m)
# - Word break: O(2^n) → O(n*m)
# All become one-decorator solutions!

# Cache stats for optimization
print(fib.cache_info())  # CacheInfo(hits=8, misses=11, maxsize=None, currsize=11)
\`\`\`

**Other functools tools:**

\`\`\`python
from functools import reduce, partial, cache

# reduce: Fold/accumulate pattern
sum_all = reduce(lambda x, y: x + y, [1, 2, 3, 4])  # 10
product = reduce(lambda x, y: x * y, [1, 2, 3, 4])  # 24

# partial: Preset function arguments
from operator import mul
double = partial(mul, 2)
print(double(5))  # 10

# @cache: Python 3.9+ simpler @lru_cache(maxsize=None)
@cache
def expensive_function(n):
    return n ** 2
\`\`\`

COLLECTIONS: COUNTER - FREQUENCY ANALYSIS GOLD

Frequency analysis appears constantly in interviews—finding anagrams, top-k frequent elements, character counts, majority elements. Manual dictionary counting requires initialization checks and increment logic. Counter does it all: \`Counter(arr)\` counts frequencies, \`.most_common(k)\` finds top k elements, and Counter supports set-like operations (intersection, union, difference) for comparing frequencies.

\`\`\`python
from collections import Counter

# ❌ Manual counting - verbose, error-prone
freq = {}
for char in string:
    if char in freq:
        freq[char] += 1
    else:
        freq[char] = 1

# ✅ Counter - one line
freq = Counter(string)

# Interview patterns
is_anagram = Counter(s1) == Counter(s2)  # Anagram check O(n)
top_k = Counter(arr).most_common(k)      # Top k frequent elements
majority = Counter(arr).most_common(1)[0][0]  # Majority element
char_freq = Counter("hello")  # Counter({'l': 2, 'h': 1, 'e': 1, 'o': 1})

# Set-like operations
c1 = Counter(['a', 'b', 'c', 'a'])
c2 = Counter(['a', 'b', 'd'])
c1 & c2  # Intersection: Counter({'a': 1, 'b': 1})
c1 | c2  # Union: Counter({'a': 2, 'c': 1, 'b': 1, 'd': 1})
c1 - c2  # Difference: Counter({'a': 1, 'c': 1})

# Elements: flatten back to list
Counter(['a', 'a', 'b']).elements()  # ['a', 'a', 'b']
\`\`\`

COLLECTIONS: DEQUE - DOUBLE-ENDED QUEUE (MANDATORY FOR BFS)

**CRITICAL**: Never use list for queue operations! \`list.pop(0)\` shifts all elements (O(n)), while \`deque.popleft()\` is O(1). This difference turns O(n²) BFS into O(n). deque also supports efficient sliding window implementations with O(1) operations at both ends.

\`\`\`python
from collections import deque

# ❌ WRONG - list for queue: O(n) pop(0)
queue = [1, 2, 3]
queue.pop(0)  # O(n) - shifts all elements!

# ✅ CORRECT - deque: O(1) popleft
queue = deque([1, 2, 3])
queue.popleft()  # O(1)

# BFS template with deque
def bfs(graph, start):
    visited = set([start])
    queue = deque([start])

    while queue:
        node = queue.popleft()  # O(1)!
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)  # O(1)

# Sliding window with deque
def max_sliding_window(nums, k):
    dq = deque()  # Stores indices
    result = []

    for i, num in enumerate(nums):
        # Remove out-of-window elements
        while dq and dq[0] < i - k + 1:
            dq.popleft()  # O(1)

        # Remove smaller elements
        while dq and nums[dq[-1]] < num:
            dq.pop()  # O(1)

        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])

    return result
\`\`\`

COLLECTIONS: DEFAULTDICT - NO MORE KEYERROR

\`\`\`python
from collections import defaultdict

# ❌ Manual initialization
graph = {}
for u, v in edges:
    if u not in graph:
        graph[u] = []
    graph[u].append(v)

# ✅ defaultdict - auto-creates
graph = defaultdict(list)
for u, v in edges:
    graph[u].append(v)  # No KeyError!

# Common use cases
freq = defaultdict(int)  # Auto-creates 0 for new keys
for char in string:
    freq[char] += 1  # No if-check needed!

groups = defaultdict(list)  # Auto-creates [] for new keys
for key, value in items:
    groups[key].append(value)
\`\`\`

COLLECTIONS: NAMEDTUPLE - READABLE RECORDS

\`\`\`python
from collections import namedtuple

# Instead of tuple unpacking
point = (3, 4)
x, y = point

# Use namedtuple for clarity
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)  # Readable attribute access
\`\`\`

ITERTOOLS: COMBINATORICS MADE EASY

Implementing permutations or combinations from scratch requires complex recursive backtracking (15+ lines, easy to bug). itertools provides permutations(), combinations(), product() as one-liners. These are lazy iterators (memory-efficient) implemented in C (fast).

\`\`\`python
from itertools import permutations, combinations, product, combinations_with_replacement

# Permutations (order matters)
list(permutations([1, 2, 3]))  # [(1,2,3), (1,3,2), (2,1,3), ...]
list(permutations([1, 2, 3], 2))  # [(1,2), (1,3), (2,1), (2,3), ...]

# Combinations (order doesn't matter)
list(combinations([1, 2, 3], 2))  # [(1,2), (1,3), (2,3)]

# Combinations with replacement
list(combinations_with_replacement([1, 2], 2))  # [(1,1), (1,2), (2,2)]

# Cartesian product
list(product([1, 2], ['a', 'b']))  # [(1,'a'), (1,'b'), (2,'a'), (2,'b')]
\`\`\`

ITERTOOLS: INFINITE ITERATORS

\`\`\`python
from itertools import count, cycle, repeat, islice

# count: infinite counter
for i in count(10, 2):  # Start at 10, step by 2
    if i > 20: break
    print(i)  # 10, 12, 14, 16, 18, 20

# cycle: infinite repeating
for i, item in zip(range(5), cycle(['a', 'b'])):
    print(item)  # a, b, a, b, a

# repeat: repeat value
list(islice(repeat(10), 3))  # [10, 10, 10]
\`\`\`

ITERTOOLS: SLICING AND GROUPING

\`\`\`python
from itertools import islice, groupby, chain, accumulate

# islice: slice iterator without loading all
first_10 = list(islice(infinite_generator(), 10))

# groupby: group consecutive elements
data = [1, 1, 2, 2, 2, 3, 1]
for key, group in groupby(data):
    print(key, list(group))
# 1 [1, 1]
# 2 [2, 2, 2]
# 3 [3]
# 1 [1]

# chain: concatenate iterables
list(chain([1, 2], [3, 4]))  # [1, 2, 3, 4]

# accumulate: running totals
list(accumulate([1, 2, 3, 4]))  # [1, 3, 6, 10]
\`\`\`

HEAPQ: MIN-HEAP OPERATIONS (INTERVIEW ESSENTIAL)

Python doesn't have a built-in heap class, but heapq provides heap operations on lists. Always a min-heap (smallest element first). For max-heap, negate values.

\`\`\`python
import heapq

# Create heap
heap = [3, 1, 4, 1, 5]
heapq.heapify(heap)  # O(n) - convert list to heap

# Push/pop
heapq.heappush(heap, 2)  # O(log n)
smallest = heapq.heappop(heap)  # O(log n)

# Top k elements
nums = [3, 1, 4, 1, 5, 9, 2, 6]
k_largest = heapq.nlargest(3, nums)  # [9, 6, 5]
k_smallest = heapq.nsmallest(3, nums)  # [1, 1, 2]

# Max-heap trick: negate values
max_heap = [-x for x in nums]
heapq.heapify(max_heap)
largest = -heapq.heappop(max_heap)  # Get largest

# Merge sorted sequences
heapq.merge([1, 3, 5], [2, 4, 6])  # Lazy iterator: 1, 2, 3, 4, 5, 6
\`\`\`

BISECT: BINARY SEARCH IN SORTED LISTS

\`\`\`python
import bisect

sorted_arr = [1, 3, 4, 4, 6, 8]

# Find insertion index (left)
bisect.bisect_left(sorted_arr, 4)  # 2 (first 4)

# Find insertion index (right)
bisect.bisect_right(sorted_arr, 4)  # 4 (after last 4)

# Insert and maintain sorted order
bisect.insort_left(sorted_arr, 5)  # [1, 3, 4, 4, 5, 6, 8]

# Interview pattern: sorted ranges
def count_range(arr, left, right):
    return bisect.bisect_right(arr, right) - bisect.bisect_left(arr, left)
\`\`\`

MATH MODULE ESSENTIALS

\`\`\`python
import math

# GCD and LCM
math.gcd(12, 18)  # 6
math.lcm(12, 18)  # 36 (Python 3.9+)

# Combinatorics (Python 3.8+)
math.comb(5, 2)  # C(5,2) = 10
math.perm(5, 2)  # P(5,2) = 20

# Factorial
math.factorial(5)  # 120

# Other
math.sqrt(16)  # 4.0
math.ceil(4.2)  # 5
math.floor(4.8)  # 4
math.isqrt(16)  # 4 (integer sqrt, Python 3.8+)
\`\`\`

WHEN STDLIB BEATS MANUAL

Use stdlib when it matches your needs exactly—the code is cleaner, faster, and less buggy:
- DP with recursion → @lru_cache
- Frequency counting → Counter
- Queue/BFS → deque
- Graph adjacency → defaultdict(list)
- Permutations/combinations → itertools
- Heap operations → heapq
- Binary search → bisect

**Implement manually when:**
- Interviewer explicitly asks for the algorithm
- You need custom logic stdlib doesn't support
- You need to explain the algorithm step-by-step
- Problem is about implementing the data structure itself

Always start with stdlib; switch to manual only when necessary.

COMMON STDLIB GOTCHAS

\`\`\`python
# 1. heapq is min-heap only
# For max-heap, negate values
max_heap = [-x for x in nums]

# 2. Counter most_common() returns list of tuples
top_k = Counter(arr).most_common(k)  # [(elem, count), ...]
elements = [elem for elem, count in top_k]  # Extract elements

# 3. @lru_cache requires hashable arguments
# Lists don't work!
@lru_cache
def func(arr):  # ERROR: list is unhashable
    pass

# Solution: convert to tuple
@lru_cache
def func(arr_tuple):
    arr = list(arr_tuple)
    ...

# 4. groupby requires sorted data
# Won't group non-consecutive duplicates!
data = [1, 2, 1]
list(groupby(data))  # [(1, [1]), (2, [2]), (1, [1])] - three groups!

# 5. defaultdict factory is called without arguments
# Can't pass arguments!
defaultdict(list)  # ✅ OK
defaultdict(lambda: [])  # ✅ OK
defaultdict(list(10))  # ❌ WRONG - calls list(10) immediately
\`\`\`

BEST PRACTICES FOR INTERVIEWS

1. **Show you know stdlib**: Reach for Counter, deque, @lru_cache—signals Python expertise
2. **Explain the tool**: "I'll use Counter because it's O(n) frequency counting with clean syntax"
3. **Know the complexity**: @lru_cache is O(n), Counter.most_common is O(n log k)
4. **Fallback to manual**: If interviewer says "implement it yourself," switch gracefully
5. **Import at top**: \`from collections import Counter\` before function, not inside
6. **Use in context**: Stdlib shines in real interviews, less useful in algorithmic deep dives`

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

const generatorsIntro = `Generators enable lazy evaluation—producing values one at a time instead of building entire sequences in memory. The key insight: process infinite sequences, handle huge files, and build data pipelines with constant memory. The yield keyword transforms functions into generators, unlocking memory-efficient iteration patterns impossible with lists.

WHY GENERATORS MATTER IN INTERVIEWS: Generators solve the memory problem elegantly. When interviewers ask "how would you handle a 100GB file?" or "process an infinite stream?", generators are the answer. They're Python's secret weapon for scalable data processing—constant O(1) memory regardless of input size. Master generators and you can handle any data scale problem.

**The generator advantage:**
- Lists: O(n) memory, load everything upfront
- Generators: O(1) memory, produce values on-demand
- Use case: 1 billion integers = 8GB list vs 128 bytes generator
- Interview gold: "I'll use a generator to keep memory constant"

MEMORY EFFICIENCY: THE FUNDAMENTAL DIFFERENCE

Lists store all elements in memory simultaneously. Generators yield one element at a time, maintaining state between yields. For large datasets, this difference is dramatic.

\`\`\`python
# List approach - loads everything
def range_list(n):
    result = []
    for i in range(n):
        result.append(i)
    return result

huge_list = range_list(1_000_000_000)  # 8GB+ memory!
# Entire list built before you can use it

# Generator approach - yields one at a time
def range_gen(n):
    for i in range(n):
        yield i  # Pause here, return value

huge_gen = range_gen(1_000_000_000)  # ~128 bytes memory
for num in huge_gen:
    process(num)  # Only one number in memory at a time
\`\`\`

**Real-world example: Reading huge log files**
\`\`\`python
# ❌ BAD - loads entire 100GB file into memory
def read_log_list(filename):
    with open(filename) as f:
        return f.readlines()  # Memory: 100GB!

lines = read_log_list('huge.log')  # CRASH!
for line in lines:
    process(line)

# ✅ GOOD - processes one line at a time
def read_log_generator(filename):
    with open(filename) as f:
        for line in f:  # Files are generators!
            yield line.strip()

for line in read_log_generator('huge.log'):
    process(line)  # Memory: O(1) per line
\`\`\`

YIELD KEYWORD: HOW GENERATORS WORK

When a function contains \`yield\`, calling it returns a generator object (doesn't execute the function). Each call to \`next()\` executes until the next \`yield\`, returns the yielded value, and pauses. State (local variables, execution position) is preserved between yields.

\`\`\`python
def countdown(n):
    print(f"Starting from {n}")
    while n > 0:
        yield n  # Pause and return n
        n -= 1
    print("Done!")

gen = countdown(3)  # Returns generator, prints nothing yet
print(type(gen))    # <class 'generator'>

print(next(gen))    # "Starting from 3", returns 3
print(next(gen))    # Returns 2 (resumes after yield)
print(next(gen))    # Returns 1
print(next(gen))    # "Done!", raises StopIteration

# Generators work with for loops
for num in countdown(3):
    print(num)  # 3, 2, 1 (for handles StopIteration)
\`\`\`

**Generator state preservation:**
\`\`\`python
def fibonacci():
    a, b = 0, 1
    while True:  # Infinite generator!
        yield a
        a, b = b, a + b

fib = fibonacci()
print(next(fib))  # 0
print(next(fib))  # 1
print(next(fib))  # 1
print(next(fib))  # 2
print(next(fib))  # 3
# State (a, b) preserved between calls!
\`\`\`

GENERATOR EXPRESSIONS: LAZY COMPREHENSIONS

Like list comprehensions but with parentheses instead of brackets. Lazy evaluation—values computed on-demand.

\`\`\`python
# List comprehension - immediate evaluation
squares_list = [x**2 for x in range(1_000_000)]  # ~8MB memory
print(len(squares_list))    # 1000000
print(squares_list[500000]) # Random access OK
for sq in squares_list:     # Can iterate multiple times
    pass

# Generator expression - lazy evaluation
squares_gen = (x**2 for x in range(1_000_000))  # ~128 bytes
# print(len(squares_gen))   # TypeError: no len()!
# print(squares_gen[500000])# TypeError: no indexing!

for sq in squares_gen:      # Iterate once
    if sq > 1000:
        break

# Generator exhausted - can't iterate again!
for sq in squares_gen:      # Nothing printed
    print(sq)
\`\`\`

**When to use which:**
- Generator \`()\`: One-time iteration, large data, memory-constrained
- List \`[]\`: Multiple iterations, need \`len()\`, need indexing

**Converting generator to list:**
\`\`\`python
gen = (x**2 for x in range(10))
lst = list(gen)  # Materialize all values
# Now have: len(), indexing, multiple iterations
# But: defeats memory benefits!
\`\`\`

GENERATOR PIPELINES: COMPOSABLE DATA PROCESSING

Chain generators to process data in stages without intermediate storage. Each generator feeds the next, maintaining constant memory.

\`\`\`python
# Process huge log file in pipeline
def read_lines(filename):
    """Generator: read file line by line"""
    with open(filename) as f:
        for line in f:
            yield line.strip()

def filter_errors(lines):
    """Generator: filter for error lines"""
    for line in lines:
        if 'ERROR' in line:
            yield line

def parse_timestamps(lines):
    """Generator: extract timestamps"""
    for line in lines:
        # Assume format: [timestamp] ERROR message
        timestamp = line.split(']')[0][1:]
        yield timestamp

def count_by_hour(timestamps):
    """Terminal: consume and aggregate"""
    from collections import Counter
    hours = (ts.split(':')[0] for ts in timestamps)
    return Counter(hours)

# Pipeline: compose generators
lines = read_lines('huge.log')
errors = filter_errors(lines)
timestamps = parse_timestamps(errors)
hourly_counts = count_by_hour(timestamps)

# Entire pipeline uses O(1) memory!
# Processes 100GB file with constant memory
\`\`\`

**Pipeline pattern:**
1. **Source**: Generator that produces data
2. **Transform**: Generator that modifies data
3. **Filter**: Generator that selects data
4. **Sink**: Terminal operation that consumes

YIELD FROM: DELEGATING TO SUBGENERATORS

\`yield from\` delegates to another generator. Instead of manual looping, delegate directly.

\`\`\`python
# ❌ Manual looping
def flatten_manual(nested):
    for sublist in nested:
        for item in sublist:
            yield item

# ✅ yield from - cleaner and faster
def flatten(nested):
    for sublist in nested:
        yield from sublist

nested = [[1, 2], [3, 4], [5]]
list(flatten(nested))  # [1, 2, 3, 4, 5]
\`\`\`

**Recursive tree traversal:**
\`\`\`python
class Node:
    def __init__(self, value, children=None):
        self.value = value
        self.children = children or []

def traverse(node):
    yield node.value
    for child in node.children:
        yield from traverse(child)  # Recursive delegation

tree = Node(1, [Node(2, [Node(4), Node(5)]), Node(3)])
list(traverse(tree))  # [1, 2, 4, 5, 3]
\`\`\`

**Why \`yield from\` vs manual loop:**
- Cleaner syntax
- Faster (avoids Python function call overhead)
- Properly handles exceptions and return values

ADVANCED: SEND AND TWO-WAY COMMUNICATION

Generators can receive values via \`.send()\`, enabling coroutines and two-way communication.

\`\`\`python
def running_average():
    total = 0
    count = 0
    average = None
    while True:
        value = yield average  # Receive value via send()
        total += value
        count += 1
        average = total / count

avg = running_average()
next(avg)  # Prime the generator
print(avg.send(10))  # 10.0
print(avg.send(20))  # 15.0
print(avg.send(30))  # 20.0
\`\`\`

**Use cases for send():**
- Streaming aggregations
- Coroutine-based pipelines
- Event-driven systems

WHEN GENERATORS WIN VS LOSE

**Use generators when:**
- Large or infinite sequences
- One-pass iteration sufficient
- Streaming data
- Memory constraints
- Building data pipelines
- Processing files line-by-line

**Example problems:**
- "Process a 100GB log file"
- "Generate infinite Fibonacci sequence"
- "Find first 1 million primes without storing all"
- "Stream processing: read → filter → transform → aggregate"

**Avoid generators when:**
- Need \`len()\` (generators don't have length)
- Need random access (no indexing: \`gen[i]\`)
- Need to iterate multiple times (generators exhaust)
- Small data that fits in memory (lists are simpler)
- Need to check if value exists (requires full iteration)

**Converting when needed:**
\`\`\`python
gen = (x for x in range(10))

# Need len?
lst = list(gen)
print(len(lst))

# Need to iterate twice?
import itertools
gen1, gen2 = itertools.tee(gen, 2)
# Now can iterate gen1 and gen2 independently
\`\`\`

COMMON PATTERNS AND IDIOMS

**Pattern 1: Infinite sequences**
\`\`\`python
def count(start=0):
    while True:
        yield start
        start += 1

# Use with itertools.islice
from itertools import islice
first_10 = list(islice(count(), 10))  # [0, 1, ..., 9]
\`\`\`

**Pattern 2: File processing with context**
\`\`\`python
def process_file(filename):
    with open(filename) as f:
        for line in f:  # File itself is a generator
            if line.strip():  # Skip empty lines
                yield line.strip().upper()

for line in process_file('data.txt'):
    print(line)
# File automatically closed when generator exhausted
\`\`\`

**Pattern 3: Batching**
\`\`\`python
def batch(iterable, n):
    """Yield batches of n items"""
    from itertools import islice
    iterator = iter(iterable)
    while True:
        batch = list(islice(iterator, n))
        if not batch:
            break
        yield batch

for batch in batch(range(10), 3):
    print(batch)  # [0,1,2], [3,4,5], [6,7,8], [9]
\`\`\`

**Pattern 4: Generator state machine**
\`\`\`python
def stateful_processor():
    state = 'START'
    while True:
        value = yield state
        if value == 'reset':
            state = 'START'
        elif value == 'next':
            state = 'PROCESSING' if state == 'START' else 'DONE'
\`\`\`

COMMON GOTCHAS

**1. Generator exhaustion:**
\`\`\`python
gen = (x for x in range(3))
list(gen)  # [0, 1, 2]
list(gen)  # [] - generator exhausted!

# Solution: recreate or use itertools.tee
\`\`\`

**2. Early binding in generator expressions:**
\`\`\`python
# ❌ WRONG - captures final value
funcs = [(lambda: i) for i in range(3)]
[f() for f in funcs]  # [2, 2, 2] - all return 2!

# ✅ CORRECT with generator
funcs = list((lambda i=i: i) for i in range(3))
[f() for f in funcs]  # [0, 1, 2]
\`\`\`

**3. Forgetting to consume:**
\`\`\`python
# ❌ Generator created but never consumed
(print(x) for x in range(10))  # Nothing printed!

# ✅ Consume the generator
list(print(x) for x in range(10))  # Prints 0-9
\`\`\`

**4. Can't check containment efficiently:**
\`\`\`python
gen = (x for x in range(1000000))
# ❌ BAD - iterates entire generator
if 500 in gen:  # O(n), exhausts generator
    pass

# ✅ GOOD - use set or list if need membership testing
\`\`\`

BEST PRACTICES FOR INTERVIEWS

1. **Recognize generator opportunities:**
   - "Process large file" → generator
   - "Infinite sequence" → generator
   - "Memory constraint" → generator
   - "Stream processing" → generator pipeline

2. **Communicate memory benefits:**
   - "This generator uses O(1) memory instead of O(n)"
   - "We can handle any file size with constant memory"
   - "Generator pipeline avoids intermediate storage"

3. **Know the tradeoffs:**
   - One-time iteration
   - No len(), no indexing
   - Must consume to execute

4. **Combine with itertools:**
   - \`islice()\` for limiting
   - \`chain()\` for concatenating
   - \`tee()\` for duplicating
   - \`groupby()\` for grouping

5. **Use generator expressions:**
   - Prefer \`sum(x**2 for x in data)\` over \`sum([x**2 for x in data])\`
   - Memory efficient, just as readable

INTERVIEW EXAMPLES

**Example 1: First N primes without storing all**
\`\`\`python
def is_prime(n):
    if n < 2: return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0: return False
    return True

def primes():
    n = 2
    while True:
        if is_prime(n):
            yield n
        n += 1

# Get first 1000 primes without storing all primes
from itertools import islice
first_1000 = list(islice(primes(), 1000))
\`\`\`

**Example 2: Process logs with filtering**
\`\`\`python
def error_logs(filename):
    with open(filename) as f:
        for line in f:
            if 'ERROR' in line:
                yield line.strip()

errors = list(error_logs('app.log'))
\`\`\`

Generators are Python's answer to scalable iteration. They turn memory nightmares into elegant constant-space solutions. When you see "large data" or "infinite sequence" in an interview, think generators.`

const greedyIntro = `Greedy algorithms make locally optimal choices at each step, hoping to find a global optimum. The key insight: if you can prove that local optimality leads to global optimality, greedy is dramatically simpler and faster than dynamic programming—but the challenge is proving correctness. When greedy works, it's elegant. When it fails, it fails catastrophically.

WHY GREEDY IS POWERFUL (AND DANGEROUS): Greedy algorithms are seductive: they're intuitive, easy to code, and often O(n log n) instead of O(n²) or exponential. But they're also dangerous—most problems where greedy seems obvious actually require DP or backtracking. The real skill is knowing when greedy works and being able to prove it. In interviews, if you claim a greedy solution, you MUST explain why it's correct.

**The greedy paradox:**
- When it works: O(n log n) with 10 lines of code
- When it fails: Wrong answer with no warning
- The hard part: Proving which category your problem is in

THE TWO REQUIREMENTS FOR GREEDY:

**1. Greedy Choice Property**
Making the locally optimal choice at each step leads to a globally optimal solution. You can make a choice that looks best right now without considering future consequences.

Example (Activity Selection): Choosing the activity that ends earliest is always safe—it leaves maximum room for future activities. Proof: If optimal solution chose different activity, swapping it with earliest-ending doesn't make solution worse.

Counter-example (0/1 Knapsack): Choosing item with highest value/weight ratio locally doesn't guarantee global optimum. You might need to skip high-ratio items to fit others.

**2. Optimal Substructure**
An optimal solution contains optimal solutions to subproblems. After making a greedy choice, the remaining problem is smaller and has the same structure.

Example (Activity Selection): After choosing earliest-ending activity, the remaining problem is "select maximum activities from remaining time" - same structure, smaller input.

**Both properties required:** Optimal substructure alone isn't enough (DP has it too). Greedy choice property is what makes greedy work.

PROOF TECHNIQUES: HOW TO VERIFY GREEDY CORRECTNESS

**Technique 1: Exchange Argument** (Most Common)

Assume an optimal solution exists that differs from greedy. Show you can "exchange" elements to match greedy's choice without making it worse. If you can always do this, greedy must be optimal.

\`\`\`
Proof pattern:
1. Assume optimal solution O differs from greedy solution G at some point
2. Take first difference: O chose x, G chose y
3. Show: exchanging x for y in O produces O' that is:
   - Still valid (satisfies constraints)
   - Still optimal (same or better objective value)
4. Repeat exchange until O becomes G
5. Therefore: G is optimal
\`\`\`

**Example: Activity Selection**
- Greedy: Always pick activity ending earliest
- Proof: If optimal picks activity ending at time t2, and greedy picks one ending at t1 < t2, swap them. Still have same number of activities, but more time left for future choices. Therefore greedy is at least as good.

**Technique 2: Stays-Ahead Argument**

Show that after each step, greedy maintains a solution at least as good as any other algorithm.

\`\`\`
Proof pattern:
1. Define what "better partial solution" means
2. Prove: after each greedy choice, greedy's partial solution ≥ any other algorithm's
3. Therefore: at the end, greedy has the best solution
\`\`\`

**Example: Fractional Knapsack**
- Greedy: Take items in order of value/weight ratio
- Proof: At any point, greedy has packed highest total value for given weight. Any other choice would have lower value for same weight.

**Technique 3: Cut-and-Paste Argument**

Show that any optimal solution can be modified to match greedy's structure without losing optimality.

**Without proof, greedy is just a heuristic** — it might work on test cases but fail on edge cases. In interviews, always explain WHY your greedy approach works.

CLASSIC GREEDY PATTERNS:

**Pattern 1: Activity/Interval Selection**

Given intervals with start/end times, select maximum number without overlap.

\`\`\`python
def max_non_overlapping_intervals(intervals):
    """
    Greedy: Sort by END time, pick earliest ending, skip overlaps.
    Why: Earliest end leaves most room for future intervals.
    """
    if not intervals:
        return 0

    # Sort by end time (KEY: not start time!)
    intervals.sort(key=lambda x: x[1])

    count = 1
    current_end = intervals[0][1]

    for start, end in intervals[1:]:
        if start >= current_end:  # No overlap
            count += 1
            current_end = end

    return count

# Time: O(n log n) for sorting
# Space: O(1) excluding sort

# Why it works: Exchange argument
# If optimal solution chose different interval first,
# swapping it with earliest-ending leaves same or more room
\`\`\`

**Pattern 2: Fractional Knapsack**

Can take fractions of items. Greedy works (unlike 0/1 knapsack).

\`\`\`python
def fractional_knapsack(items, capacity):
    """
    items = [(value, weight), ...]
    Greedy: Take items by value/weight ratio (highest first).
    """
    # Sort by value/weight ratio (descending)
    items.sort(key=lambda x: x[0]/x[1], reverse=True)

    total_value = 0
    remaining = capacity

    for value, weight in items:
        if weight <= remaining:
            # Take entire item
            total_value += value
            remaining -= weight
        else:
            # Take fraction
            fraction = remaining / weight
            total_value += value * fraction
            break  # Knapsack full

    return total_value

# Time: O(n log n)
# Why it works: Stays-ahead argument
# At each step, we've packed maximum value for weight used
\`\`\`

**Pattern 3: Huffman Coding (Minimum Cost Tree)**

Build optimal prefix-free binary code.

\`\`\`python
import heapq

def huffman_encoding(frequencies):
    """
    Greedy: Repeatedly merge two lowest-frequency nodes.
    Why: Lowest frequency should be deepest in tree (longest code).
    """
    # Min heap of (frequency, node)
    heap = [(freq, char) for char, freq in frequencies.items()]
    heapq.heapify(heap)

    while len(heap) > 1:
        freq1, node1 = heapq.heappop(heap)
        freq2, node2 = heapq.heappop(heap)

        # Merge: create parent with combined frequency
        merged = (freq1 + freq2, (node1, node2))
        heapq.heappush(heap, merged)

    return heap[0]  # Root of Huffman tree

# Time: O(n log n)
# Why it works: Stays-ahead - minimum frequency nodes should be deepest
\`\`\`

**Pattern 4: Minimum Spanning Tree (Kruskal's)**

Connect all vertices with minimum total edge weight.

\`\`\`python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False

        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1
        return True

def kruskal_mst(n, edges):
    """
    edges = [(weight, u, v), ...]
    Greedy: Sort edges by weight, add if doesn't create cycle.
    """
    edges.sort()  # Sort by weight
    uf = UnionFind(n)
    mst_weight = 0
    mst_edges = []

    for weight, u, v in edges:
        if uf.union(u, v):  # Doesn't create cycle
            mst_weight += weight
            mst_edges.append((u, v))

            if len(mst_edges) == n - 1:  # MST complete
                break

    return mst_weight, mst_edges

# Time: O(E log E) for sorting edges
# Why it works: Cut property - lightest edge crossing a cut is in some MST
\`\`\`

**Pattern 5: Jump Game (Can Reach End)**

\`\`\`python
def can_jump(nums):
    """
    nums[i] = max jump length from index i.
    Greedy: Track furthest reachable position.
    """
    max_reach = 0

    for i in range(len(nums)):
        if i > max_reach:  # Can't reach this position
            return False

        max_reach = max(max_reach, i + nums[i])

        if max_reach >= len(nums) - 1:  # Can reach end
            return True

    return True

# Time: O(n)
# Why it works: If we can reach position i, we can try all jumps from i
\`\`\`

**Pattern 6: Gas Station (Circular Tour)**

\`\`\`python
def can_complete_circuit(gas, cost):
    """
    gas[i] = gas at station i, cost[i] = cost to reach next station.
    Find starting station to complete circular tour.
    """
    if sum(gas) < sum(cost):  # Impossible
        return -1

    total_tank = 0
    current_tank = 0
    start = 0

    for i in range(len(gas)):
        total_tank += gas[i] - cost[i]
        current_tank += gas[i] - cost[i]

        # If can't reach next station, start after i
        if current_tank < 0:
            start = i + 1
            current_tank = 0

    return start if total_tank >= 0 else -1

# Time: O(n)
# Why it works: If sum(gas) >= sum(cost), solution exists.
# If can't reach from A to B, can't start anywhere between A and B either.
\`\`\`

WHEN GREEDY FAILS: CLASSIC COUNTER-EXAMPLES

**Failure 1: 0/1 Knapsack**

Cannot take fractions. Greedy by value/weight ratio FAILS.

\`\`\`python
# Counter-example:
capacity = 10
items = [(60, 10), (100, 20), (120, 30)]  # (value, weight)
# Greedy by ratio: 60/10=6, 100/20=5, 120/30=4
# Greedy takes: item 1 (value 60) - WRONG!
# Optimal: items 2+3 (value 220) - can't fit item 1 with others

# Solution: Use DP
def knapsack_01(items, capacity):
    n = len(items)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        value, weight = items[i-1]
        for w in range(capacity + 1):
            if weight <= w:
                dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight] + value)
            else:
                dp[i][w] = dp[i-1][w]

    return dp[n][capacity]
# Time: O(n * capacity)
\`\`\`

**Failure 2: Coin Change (Arbitrary Denominations)**

Greedy (largest coin first) FAILS for arbitrary denominations.

\`\`\`python
# Counter-example:
coins = [1, 3, 4]
amount = 6
# Greedy: 4 + 1 + 1 = 3 coins - WRONG!
# Optimal: 3 + 3 = 2 coins

# Solution: Use DP
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1
# Time: O(amount * len(coins))

# NOTE: Greedy DOES work for canonical coin systems (US coins: 1,5,10,25)
\`\`\`

**Failure 3: Longest Path in General Graph**

Greedy (pick longest edge available) FAILS.

\`\`\`python
# Counter-example: Graph with edges
# A -> B (weight 10)
# A -> C (weight 1)
# C -> D (weight 9)
# Greedy from A: picks A->B (10), stuck - WRONG!
# Optimal: A->C->D (1+9=10)

# Solution: DFS with backtracking or DP on DAG
\`\`\`

GREEDY VS DYNAMIC PROGRAMMING: THE DECISION TREE

\`\`\`
┌─ Problem involves optimization? (min/max) ──┐
│                                              │
├─ Can you prove greedy choice property? ─────┤
│  │                                           │
│  ├─ YES: Greedy (O(n log n))                │
│  │   Examples: Interval scheduling,         │
│  │            Fractional knapsack,           │
│  │            Huffman coding                 │
│  │                                           │
│  └─ NO/UNSURE: Try DP (O(n²) or worse)      │
│      Examples: 0/1 Knapsack,                 │
│                Coin change,                   │
│                Longest path                   │
│                                              │
└─ Need to count ways? → Always DP            │
   (Greedy finds one solution, can't count)   │
\`\`\`

**When to try greedy first:**
- Sorting seems natural for the problem
- Local choice seems obviously safe
- Problem involves intervals/scheduling
- O(n log n) time is hinted at

**When to skip greedy:**
- Counter-example comes to mind easily
- 0/1 choices (can't take fractions)
- Need ALL solutions or count ways
- Overlapping subproblems are obvious

COMMON GREEDY MISTAKES:

**Mistake 1: No proof of correctness**

\`\`\`python
# ❌ WRONG: "It seems greedy should work"
def solve(items):
    items.sort()  # Seems reasonable
    return items[0]  # Take first one

# ✅ CORRECT: Explain WHY
def solve(items):
    # Greedy: Pick minimum value
    # Proof: By exchange argument, swapping any other value
    # with minimum doesn't decrease total...
    return min(items)
\`\`\`

**Mistake 2: Sorting by wrong criterion**

\`\`\`python
# ❌ WRONG: Interval scheduling sorted by START time
def max_intervals_wrong(intervals):
    intervals.sort(key=lambda x: x[0])  # Sort by start - WRONG!
    # Fails: [(1,10), (2,3), (4,5)] chooses (1,10), misses (2,3) and (4,5)

# ✅ CORRECT: Sort by END time
def max_intervals_correct(intervals):
    intervals.sort(key=lambda x: x[1])  # Sort by end - CORRECT!
    # Picks (2,3) first, then (4,5), max = 2
\`\`\`

**Mistake 3: Greedy on wrong subproblem**

\`\`\`python
# Problem: Minimum jumps to reach end
# ❌ WRONG: Greedy "always jump maximum distance"
def min_jumps_wrong(nums):
    jumps = 0
    i = 0
    while i < len(nums) - 1:
        i += nums[i]  # Always max jump - WRONG!
        jumps += 1
    return jumps
# Fails: [2,3,1,1,4] jumps to index 2, then can only jump 1 at a time

# ✅ CORRECT: Greedy "jump to position that reaches furthest"
def min_jumps_correct(nums):
    if len(nums) <= 1:
        return 0

    jumps = 0
    current_max = 0
    next_max = 0

    for i in range(len(nums) - 1):
        next_max = max(next_max, i + nums[i])

        if i == current_max:  # Reached limit of current jump
            jumps += 1
            current_max = next_max

    return jumps
# Time: O(n)
\`\`\`

INTERVIEW STRATEGY:

**Step 1: Check if greedy might work**
- Does sorting help?
- Is there an obvious "best choice" at each step?
- Does problem involve intervals/scheduling?

**Step 2: Try small examples**
\`\`\`python
# Test greedy on 2-3 examples
# If it works, proceed to proof
# If it fails, switch to DP
\`\`\`

**Step 3: Prove correctness (if greedy works)**
- Use exchange argument (most common)
- Or stays-ahead argument
- Explain verbally in interview

**Step 4: Code with comments explaining greedy choice**
\`\`\`python
def greedy_solution(items):
    # Greedy choice: sort by value/weight ratio
    # Proof: By stays-ahead, this maximizes value per weight
    items.sort(key=lambda x: x[0]/x[1], reverse=True)
    ...
\`\`\`

BEST PRACTICES:

1. **Always explain WHY greedy works**: Don't just say "greedy", explain the greedy choice property

2. **Test counter-examples**: Before committing, try to break your greedy approach

3. **Know the failures**: 0/1 Knapsack, arbitrary coin change, longest path

4. **Sort carefully**: Wrong sort key ruins greedy (END time for intervals, not START)

5. **Use proof templates**: Exchange argument is your friend

6. **When in doubt, DP**: Greedy is great when correct, but DP is safer

7. **Complexity check**: Greedy is usually O(n log n), DP is O(n²)—if your greedy is O(n²), something's wrong

8. **Document the greedy choice**: Code comments should explain the strategy`

export function GreedyPage() {
  return (
    <TypePage
      type="Greedy Algorithms" badge="grdy" color="var(--accent-greedy)"
      description="Make locally optimal choices hoping for global optimum. Works when greedy choice property + optimal substructure exist."
      intro={greedyIntro}
      tip={`Greedy choice property + optimal substructure? Greedy works! But MUST prove correctness (exchange argument)
Interval scheduling? Sort by END time (not start!) — earliest end leaves max room for future
Prove greedy? Exchange argument: if optimal differs, swap to match greedy without worsening → greedy optimal
Greedy FAILS? 0/1 Knapsack (coins=[1,3,4], amt=6: greedy 4+1+1=3 coins, optimal 3+3=2) → use DP
Greedy vs DP decision? Can prove local→global? Greedy O(n log n). Overlapping subproblems? DP O(n²)
Jump game? Track max_reach = max(max_reach, i + nums[i]) — if i > max_reach, unreachable
Common mistake? Sorting by wrong key (start vs end) or no proof — "seems greedy" fails on edge cases!`}
      methods={greedyMethods}
      tabs={<DSCategoryTabs basePath="/greedy" problemCount={getProblemCount('greedy')} />}
    />
  )
}

const intervalsIntro = `Interval problems involve ranges with start and end points. These problems appear frequently in scheduling, time management, and range queries. The key insight: sorting by start or end time (choosing correctly!) often transforms a hard problem into a simple linear scan—but the wrong sort choice makes the problem impossible.

WHY INTERVALS ARE INTERVIEW FAVORITES: Interval problems test multiple skills at once: sorting strategy, greedy thinking, and edge case handling. The pattern appears everywhere: meeting rooms, task scheduling, resource allocation, range merging. Master intervals and you've conquered 10-15% of all interview problems.

**The interval paradox:**
- Sort by START: enables overlap detection, merging, finding gaps
- Sort by END: enables greedy maximum selection (activity selection)
- Wrong choice: correct algorithm becomes impossible
- The decision is NOT arbitrary—it depends on what you're optimizing

SORT BY START VS END: THE CRITICAL DECISION

This is the #1 decision in interval problems. Get it wrong and your algorithm fails on edge cases.

**Sort by START time when:**
1. **Merging overlapping intervals**: Need to process in chronological order
2. **Finding gaps**: Need consecutive intervals in time order
3. **Detecting all overlaps**: Need to scan pairs in sequence
4. **Insert interval into sorted list**: Need to find position by start time

**Sort by END time when:**
1. **Maximizing non-overlapping intervals**: Greedy—pick earliest ending leaves most room
2. **Activity selection**: Choose activities that finish early
3. **Minimum intervals to remove**: Keep ones that end earliest
4. **Earliest deadline first scheduling**: Process shortest tasks first

**Why the difference matters:**
\`\`\`python
intervals = [[1, 4], [2, 3], [3, 6]]

# Sort by START
sorted_start = [[1, 4], [2, 3], [3, 6]]
# Best for merging: [1,4] overlaps [2,3], merge to [1,4], overlaps [3,6], merge to [1,6]

# Sort by END
sorted_end = [[2, 3], [1, 4], [3, 6]]
# Best for max non-overlapping: pick [2,3], skip [1,4] (overlaps), pick [3,6] = 2 intervals
\`\`\`

PATTERN 1: MERGE OVERLAPPING INTERVALS

**Problem**: Given list of intervals, merge all overlapping intervals.

**Strategy**: Sort by START, scan linearly, extend or add

\`\`\`python
def merge_intervals(intervals):
    """
    Merge all overlapping intervals.
    Time: O(n log n) for sorting
    Space: O(n) for result
    """
    if not intervals:
        return []

    # CRITICAL: Sort by START time
    intervals.sort(key=lambda x: x[0])

    merged = [intervals[0]]

    for start, end in intervals[1:]:
        last_end = merged[-1][1]

        if start <= last_end:
            # Overlap: extend last interval
            merged[-1][1] = max(merged[-1][1], end)
        else:
            # No overlap: add new interval
            merged.append([start, end])

    return merged

# Example
intervals = [[1,3], [2,6], [8,10], [15,18]]
# Result: [[1,6], [8,10], [15,18]]
# Explanation: [1,3] and [2,6] overlap → [1,6]
\`\`\`

**Key insights:**
- Must use \`max(merged[-1][1], end)\` not just \`end\` - current might be inside previous!
- Example: \`[[1,5], [2,3]]\` → without max, would incorrectly become \`[1,3]\`
- Overlap condition: \`start <= last_end\` (not \`<\`) - touching intervals merge!
- Example: \`[[1,2], [2,3]]\` should merge to \`[1,3]\`

PATTERN 2: INSERT INTERVAL

**Problem**: Insert new interval into sorted non-overlapping list, merge if needed.

**Strategy**: Find position, insert, merge overlaps

\`\`\`python
def insert_interval(intervals, new_interval):
    """
    Insert interval into sorted list and merge overlaps.
    Time: O(n)
    Space: O(n)
    """
    result = []
    i = 0
    n = len(intervals)
    new_start, new_end = new_interval

    # Add all intervals before new interval
    while i < n and intervals[i][1] < new_start:
        result.append(intervals[i])
        i += 1

    # Merge all overlapping intervals with new interval
    while i < n and intervals[i][0] <= new_end:
        new_start = min(new_start, intervals[i][0])
        new_end = max(new_end, intervals[i][1])
        i += 1

    result.append([new_start, new_end])

    # Add all intervals after new interval
    while i < n:
        result.append(intervals[i])
        i += 1

    return result

# Example
intervals = [[1,3], [6,9]]
new = [2,5]
# Result: [[1,5], [6,9]]
# Explanation: [2,5] merges with [1,3] → [1,5]
\`\`\`

PATTERN 3: NON-OVERLAPPING INTERVALS (GREEDY MAXIMUM)

**Problem**: Find maximum number of non-overlapping intervals.

**Strategy**: SORT BY END, greedy select earliest ending

\`\`\`python
def max_non_overlapping(intervals):
    """
    Maximum number of non-overlapping intervals.
    Time: O(n log n)
    """
    if not intervals:
        return 0

    # CRITICAL: Sort by END time!
    intervals.sort(key=lambda x: x[1])

    count = 1
    current_end = intervals[0][1]

    for start, end in intervals[1:]:
        if start >= current_end:
            # No overlap: include this interval
            count += 1
            current_end = end

    return count

# Example
intervals = [[1,3], [2,4], [3,5]]
# Sorted by end: [[1,3], [2,4], [3,5]]
# Pick [1,3] (end=3), skip [2,4] (starts at 2 < 3), pick [3,5] = 2 intervals
\`\`\`

**Why sort by END?**
- Greedy: pick interval that ends earliest
- Leaves maximum room for future intervals
- Exchange argument: swapping any other choice doesn't improve solution

**Variant: Minimum intervals to remove**
\`\`\`python
def min_intervals_to_remove(intervals):
    # Remove fewest to make non-overlapping
    # Answer: total - max_non_overlapping
    return len(intervals) - max_non_overlapping(intervals)
\`\`\`

PATTERN 4: SWEEP LINE TECHNIQUE

**Concept**: Process interval start/end events in chronological order, maintain active count.

**Use cases:**
- Minimum meeting rooms needed
- Maximum concurrent intervals
- Interval coverage count

\`\`\`python
def min_meeting_rooms(intervals):
    """
    Minimum meeting rooms to accommodate all meetings.
    Time: O(n log n)
    Space: O(n)
    """
    if not intervals:
        return 0

    # Create events: (time, type)
    events = []
    for start, end in intervals:
        events.append((start, 1))   # Meeting starts: +1 room
        events.append((end, -1))    # Meeting ends: -1 room

    events.sort()

    current_rooms = 0
    max_rooms = 0

    for time, delta in events:
        current_rooms += delta
        max_rooms = max(max_rooms, current_rooms)

    return max_rooms

# Example
intervals = [[0,30], [5,10], [15,20]]
# Events: (0,+1), (5,+1), (10,-1), (15,+1), (20,-1), (30,-1)
# Rooms:    1       2       1        2        1       0
# Max = 2
\`\`\`

**Why sweep line works:**
- Processes events in time order (causality!)
- Tracks active count at each time point
- Maximum active count = minimum resources needed

**Tie-breaking rule:**
- When start and end at same time: end first!
- Reason: room becomes free before next meeting starts
- Implementation: sort by time, then by type (-1 before 1)

\`\`\`python
# Better: handle tie-breaking
events.sort(key=lambda x: (x[0], x[1]))  # time, then delta
# end=-1 comes before start=+1 alphabetically
\`\`\`

PATTERN 5: PRIORITY QUEUE / MIN-HEAP

**Alternative to sweep line**: Track specific intervals, not just count.

\`\`\`python
import heapq

def min_meeting_rooms_heap(intervals):
    """
    Min meeting rooms using heap.
    Time: O(n log n)
    Space: O(n)
    """
    if not intervals:
        return 0

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    # Min-heap of end times
    heap = []

    for start, end in intervals:
        # Remove all meetings that have ended
        while heap and heap[0] <= start:
            heapq.heappop(heap)

        # Add current meeting's end time
        heapq.heappush(heap, end)

    # Heap size = concurrent meetings
    return len(heap)

# Same example: [[0,30], [5,10], [15,20]]
# Process [0,30]: heap = [30], size = 1
# Process [5,10]: heap = [10, 30], size = 2
# Process [15,20]: pop 10 (ended), heap = [20, 30], size = 2
# Max heap size = 2
\`\`\`

**Heap vs Sweep Line:**
- Heap: O(n log n), tracks specific intervals
- Sweep Line: O(n log n), tracks count only
- Use heap when you need to know which intervals are active
- Use sweep line when you only need the count

PATTERN 6: INTERVAL INTERSECTION

**Problem**: Find intersection of two lists of intervals.

\`\`\`python
def interval_intersection(list1, list2):
    """
    Find intersection of two interval lists.
    Both lists are sorted and non-overlapping.
    Time: O(m + n)
    """
    result = []
    i, j = 0, 0

    while i < len(list1) and j < len(list2):
        start1, end1 = list1[i]
        start2, end2 = list2[j]

        # Check if intervals overlap
        overlap_start = max(start1, start2)
        overlap_end = min(end1, end2)

        if overlap_start <= overlap_end:
            result.append([overlap_start, overlap_end])

        # Move pointer of interval that ends first
        if end1 < end2:
            i += 1
        else:
            j += 1

    return result

# Example
list1 = [[0,2], [5,10], [13,23], [24,25]]
list2 = [[1,5], [8,12], [15,24], [25,26]]
# Result: [[1,2], [5,5], [8,10], [15,23], [24,24], [25,25]]
\`\`\`

PATTERN 7: REMOVE COVERED INTERVALS

**Problem**: Remove intervals that are covered by another interval.

\`\`\`python
def remove_covered_intervals(intervals):
    """
    Count intervals not covered by another.
    Interval [a,b] is covered by [c,d] if c <= a and b <= d.
    Time: O(n log n)
    """
    # Sort by start ascending, end descending
    intervals.sort(key=lambda x: (x[0], -x[1]))

    count = 0
    max_end = 0

    for start, end in intervals:
        if end > max_end:
            # Not covered by previous intervals
            count += 1
            max_end = end

    return count

# Example
intervals = [[1,4], [2,3], [3,6]]
# Sorted: [[1,4], [3,6], [2,3]]
# Process [1,4]: max_end = 4, count = 1
# Process [3,6]: 6 > 4, count = 2, max_end = 6
# Process [2,3]: 3 <= 6, skip (covered by [1,4])
# Result: 2
\`\`\`

**Why sort by (start ascending, end descending)?**
- Intervals with same start: process longest first
- Longer interval can cover shorter ones with same start
- Example: \`[[1,5], [1,3]]\` → \`[1,5]\` covers \`[1,3]\`

COMMON PATTERNS SUMMARY

| Problem | Sort By | Algorithm | Time |
|---------|---------|-----------|------|
| Merge overlapping | START | Linear scan, extend/add | O(n log n) |
| Insert interval | START | Three-phase scan | O(n) |
| Max non-overlapping | END | Greedy earliest end | O(n log n) |
| Min meeting rooms | Events | Sweep line or heap | O(n log n) |
| Interval intersection | None (presorted) | Two pointers | O(m + n) |
| Remove covered | START, -END | Track max end | O(n log n) |

COMMON GOTCHAS AND EDGE CASES

**1. Touching intervals: overlap or not?**
\`\`\`python
# [[1,2], [2,3]] - do they overlap?
# Depends on problem! Usually YES (use <=)
if start <= last_end:  # Touching counts as overlap
    merge()
\`\`\`

**2. Merging must use max, not just end:**
\`\`\`python
# ❌ WRONG
merged[-1][1] = end  # Fails for [[1,5], [2,3]]

# ✅ CORRECT
merged[-1][1] = max(merged[-1][1], end)
\`\`\`

**3. Sweep line tie-breaking:**
\`\`\`python
# If meeting ends at time T and another starts at T,
# end should process first (room becomes free)
events.sort(key=lambda x: (x[0], x[1]))  # -1 (end) before +1 (start)
\`\`\`

**4. Empty intervals edge case:**
\`\`\`python
# What if intervals = []?
if not intervals:
    return []  # or 0, or appropriate default
\`\`\`

**5. Interval representation:**
- Some problems use \`[start, end]\`
- Others use \`(start, end)\` tuples
- Or objects with \`.start\` and \`.end\` attributes
- Be consistent!

BEST PRACTICES FOR INTERVIEWS

1. **Clarify interval format:**
   - Inclusive or exclusive endpoints?
   - \`[start, end]\` or \`[start, end)\`?
   - Can start equal end (zero-length interval)?

2. **Ask about edge cases:**
   - Empty list?
   - Single interval?
   - All overlapping?
   - All non-overlapping?

3. **Choose sort strategy carefully:**
   - Merge/insert/gaps → sort by START
   - Max selection → sort by END
   - When unsure, think: "What do I process first?"

4. **Draw timeline:**
   - Visualize intervals on a number line
   - Helps see overlaps and patterns
   - Catches edge cases

5. **Complexity check:**
   - Sorting: O(n log n)
   - Linear scan after sort: O(n)
   - Total: O(n log n)
   - If asked to optimize: usually can't beat O(n log n) due to sorting

6. **Communication:**
   - State your sort choice explicitly: "I'll sort by END time because..."
   - Explain why (greedy, chronological, etc.)
   - Walk through an example

WHEN INTERVALS APPEAR IN INTERVIEWS

**Strong signals:**
- "Schedule", "meetings", "rooms", "resources"
- "Overlapping", "non-overlapping", "merge"
- "Earliest", "latest", "maximum", "minimum"
- Input: list of \`[start, end]\` pairs

**Common problems:**
- LeetCode 56: Merge Intervals
- LeetCode 57: Insert Interval
- LeetCode 435: Non-overlapping Intervals
- LeetCode 252: Meeting Rooms
- LeetCode 253: Meeting Rooms II
- LeetCode 986: Interval List Intersections

**Pro tip:** If you see intervals, immediately ask:
1. "Should I sort by start or end time?"
2. "How should I handle touching intervals?"
3. "What does overlap mean exactly?"

Mastering intervals means recognizing the pattern, choosing the right sort, and handling edge cases. Once you've seen the 5-6 core patterns (merge, insert, max selection, sweep line, heap, intersection), you can solve any interval problem.`

export function IntervalsPage() {
  return (
    <TypePage
      type="Intervals Pattern" badge="[ ]" color="var(--accent-intervals)"
      description="Interval problems: merge, insert, schedule. Key techniques: sort by start/end, sweep line, event processing."
      intro={intervalsIntro}
      tip={`Merge overlapping? Sort by START, extend with max(last_end, end) — NOT just end! Fails on [[1,5],[2,3]]
Max non-overlapping? Sort by END (greedy) — earliest end leaves most room, exchange argument
Min meeting rooms? Sweep line O(n log n) or heap O(n log n) — both work, heap tracks which intervals
Insert interval? Three-phase: before, merge overlapping, after — O(n) since presorted
Touching intervals? start <= last_end (not <) — [[1,2],[2,3]] usually merges to [1,3]
Sweep line tie-break? End before start at same time — room frees before next meeting starts
Summary table? START for merge/insert/gaps, END for greedy max — wrong sort = impossible problem`}
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
All permutations/combinations? itertools.permutations(arr), combinations(arr, k) - one-liners vs complex backtracking
Top k elements from unsorted? heapq.nlargest(k, arr) O(n log k) - or heapify O(n), push/pop O(log n)
Binary search in sorted? bisect.bisect_left/right(arr, x) O(log n) - find insertion point, use for range queries`}
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

WHY MATH IN INTERVIEWS: Math problems test pattern recognition and formula application, not theoretical proofs. When you see "count ways to arrange", think combinatorics. "Find cycle length", think GCD/LCM. "Result mod 10⁹+7", think modular arithmetic. "Is prime", think trial division or sieve. The trick is recognizing which tool to use—once you know, the implementation is straightforward.

**The math interview paradox:**
- Interview = pattern recognition (which formula applies?)
- NOT = mathematical proofs or derivations
- Strategy: Learn when to use each technique, not why it works
- Common fear: "I'm bad at math" → Actually, you just need to recognize patterns

GCD AND LCM: WHEN AND WHY

**GCD (Greatest Common Divisor)**: Largest number that divides both inputs evenly.

Use GCD when:
- Simplifying fractions: \`gcd(numerator, denominator)\`
- Checking if coprime (gcd = 1): for cryptography, hashing
- Finding repeating cycles/patterns: cycle length divides both periods
- Reducing problems to simplest form

**LCM (Least Common Multiple)**: Smallest number divisible by both inputs.

Use LCM when:
- Synchronization: "When do events align again?"
- Finding common denominators for fraction addition
- Merging cycles: lights blinking at different rates
- Tiling problems: when patterns repeat together

\`\`\`python
import math

# GCD - highly optimized, use it!
def gcd_example(a, b):
    return math.gcd(a, b)  # Euclidean algorithm O(log min(a,b))

# LCM formula (no built-in until Python 3.9)
def lcm(a, b):
    return a * b // math.gcd(a, b)  # Divide first to avoid overflow

# Multiple numbers
from functools import reduce
def gcd_multiple(nums):
    return reduce(math.gcd, nums)

def lcm_multiple(nums):
    return reduce(lcm, nums)

# Example: Simplify fraction
def simplify_fraction(num, denom):
    g = math.gcd(num, denom)
    return num // g, denom // g

# Example: Check if coprime
def are_coprime(a, b):
    return math.gcd(a, b) == 1
\`\`\`

**Euclidean Algorithm** (how GCD works):
\`\`\`python
def gcd_manual(a, b):
    while b:
        a, b = b, a % b
    return a
# Time: O(log min(a,b))
# Why: Each step reduces problem by at least half
\`\`\`

**Interview Pattern - Cycle Detection:**
\`\`\`python
# Two cyclic processes with periods a and b
# When do they align again?
def next_alignment(period_a, period_b):
    return lcm(period_a, period_b)

# Example: Traffic lights
# Light A: 30 seconds, Light B: 45 seconds
# Both green again in lcm(30, 45) = 90 seconds
\`\`\`

PRIME NUMBERS: TRIAL DIVISION VS SIEVE OF ERATOSTHENES

**When to use which:**
- **ONE number**: Trial division O(√n) - check if prime
- **MANY numbers**: Sieve O(n log log n) - find all primes up to N

**Trial Division** (checking ONE number):

\`\`\`python
def is_prime(n):
    """
    Check if n is prime.
    Time: O(√n)
    Works for n up to 10¹² in interviews (fast enough!)
    """
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:  # Even numbers
        return False

    # Only check odd divisors up to √n
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False

    return True

# Why √n? If n = a*b and a > √n, then b < √n
# So we find all factors by checking up to √n
\`\`\`

**Sieve of Eratosthenes** (finding ALL primes up to N):

\`\`\`python
def sieve_of_eratosthenes(n):
    """
    Find all primes up to n.
    Time: O(n log log n)
    Space: O(n)
    """
    if n < 2:
        return []

    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False

    # Only need to check up to √n
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            # Mark all multiples of i as composite
            # Start at i² (smaller multiples already marked)
            for j in range(i * i, n + 1, i):
                is_prime[j] = False

    return [i for i in range(n + 1) if is_prime[i]]

# Example: Find all primes up to 100
primes = sieve_of_eratosthenes(100)
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, ...]

# Optimization: Start at i² because smaller multiples
# (like 2i, 3i, ..., (i-1)i) already marked by smaller primes
\`\`\`

**Performance comparison:**
- N = 1,000,000
- Trial division (check each): ~10 seconds
- Sieve (find all): ~0.1 seconds
- **Use sieve when finding many primes or preprocessing!**

**Prime Factorization:**

\`\`\`python
def prime_factors(n):
    """
    Find all prime factors of n.
    Time: O(√n)
    """
    factors = []

    # Check for 2s
    while n % 2 == 0:
        factors.append(2)
        n //= 2

    # Check odd factors from 3 to √n
    i = 3
    while i * i <= n:
        while n % i == 0:
            factors.append(i)
            n //= i
        i += 2

    # If n > 1, it's a prime factor
    if n > 1:
        factors.append(n)

    return factors

# Example: prime_factors(84)
# [2, 2, 3, 7] because 84 = 2² × 3 × 7
\`\`\`

MODULAR ARITHMETIC: THE 10⁹+7 PATTERN

**Why "return answer mod 10⁹+7"?**
- Prevents integer overflow in other languages (Python has infinite precision)
- Makes answers comparable (massive numbers like 10¹⁰⁰⁰ → manageable)
- 10⁹+7 is prime (useful for modular inverse)

**Modular arithmetic rules:**

\`\`\`python
MOD = 10**9 + 7

# Addition
(a + b) % MOD = ((a % MOD) + (b % MOD)) % MOD

# Subtraction
(a - b) % MOD = ((a % MOD) - (b % MOD) + MOD) % MOD  # +MOD handles negatives

# Multiplication
(a * b) % MOD = ((a % MOD) * (b % MOD)) % MOD

# Power (exponentiation)
pow(base, exp, MOD)  # Built-in uses fast binary exponentiation

# Division - DOESN'T WORK DIRECTLY! Use modular inverse
\`\`\`

**Apply mod to intermediate results** to prevent overflow:

\`\`\`python
# ❌ WRONG - computes huge number first
def factorial_mod_wrong(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result % MOD  # Too late! Already overflowed in other languages

# ✅ CORRECT - apply mod at each step
def factorial_mod_correct(n):
    result = 1
    for i in range(1, n + 1):
        result = (result * i) % MOD  # Keep result manageable
    return result
\`\`\`

**Binary exponentiation** (fast power):

\`\`\`python
def pow_mod(base, exp, mod):
    """
    Compute (base^exp) % mod efficiently.
    Time: O(log exp)
    Python's built-in pow(base, exp, mod) uses this!
    """
    result = 1
    base %= mod

    while exp > 0:
        if exp % 2 == 1:  # Odd exponent
            result = (result * base) % mod
        base = (base * base) % mod
        exp //= 2

    return result

# Example: pow(2, 1000, MOD) - instant!
# Naive: 2^1000 is ~10³⁰⁰ digit number - impossible!
# Binary exp: Only 10 iterations (log₂ 1000 ≈ 10)
\`\`\`

MODULAR INVERSE: DIVISION UNDER MODULO

**Problem**: (a / b) % MOD doesn't work directly.
**Solution**: Multiply by modular inverse of b.

When MOD is prime, use **Fermat's Little Theorem**:
\`b^(MOD-1) ≡ 1 (mod MOD)\`
So: \`b^(MOD-2) ≡ b⁻¹ (mod MOD)\`

\`\`\`python
MOD = 10**9 + 7

def mod_inverse(a, mod=MOD):
    """
    Compute modular inverse of a under mod (mod must be prime).
    Returns: a^(-1) mod MOD
    """
    return pow(a, mod - 2, mod)  # Fermat's little theorem

# Division under modulo
def divide_mod(a, b, mod=MOD):
    """
    Compute (a / b) % mod
    """
    return (a * mod_inverse(b, mod)) % mod

# Example: (7 / 3) % MOD
result = divide_mod(7, 3, MOD)

# Common use: Combinatorics (dividing factorials)
def nCr_mod(n, r, mod=MOD):
    """
    Compute C(n, r) % mod = n! / (r! * (n-r)!)
    """
    if r > n or r < 0:
        return 0

    numerator = factorial_mod(n)
    denominator = (factorial_mod(r) * factorial_mod(n - r)) % mod

    # Can't divide directly! Use modular inverse
    return (numerator * mod_inverse(denominator, mod)) % mod
\`\`\`

COMBINATORICS: COUNTING ARRANGEMENTS

**Permutations** (order matters):
- Arrange n items: \`n!\` ways
- Arrange r from n: \`P(n,r) = n! / (n-r)!\`

**Combinations** (order doesn't matter):
- Choose r from n: \`C(n,r) = n! / (r! * (n-r)!)\`

\`\`\`python
import math

# Permutations
def permutations(n, r):
    return math.factorial(n) // math.factorial(n - r)

# Combinations
def combinations(n, r):
    return math.factorial(n) // (math.factorial(r) * math.factorial(n - r))

# With modular arithmetic
def combinations_mod(n, r, mod=10**9 + 7):
    if r > n or r < 0:
        return 0

    # Precompute factorials
    fact = [1] * (n + 1)
    for i in range(1, n + 1):
        fact[i] = (fact[i-1] * i) % mod

    # C(n, r) = n! / (r! * (n-r)!)
    numerator = fact[n]
    denominator = (fact[r] * fact[n - r]) % mod

    return (numerator * pow(denominator, mod - 2, mod)) % mod
\`\`\`

**Pascal's Triangle** (dynamic programming approach):

\`\`\`python
def pascal_triangle(n):
    """
    Generate first n rows of Pascal's triangle.
    C(n, r) = C(n-1, r-1) + C(n-1, r)
    """
    triangle = [[1]]

    for i in range(1, n):
        row = [1]
        for j in range(1, i):
            row.append(triangle[i-1][j-1] + triangle[i-1][j])
        row.append(1)
        triangle.append(row)

    return triangle

# Triangle[n][r] = C(n, r)
\`\`\`

ADDITIONAL MATH PATTERNS

**Digit manipulation:**

\`\`\`python
# Extract digits
def get_digits(n):
    digits = []
    while n > 0:
        digits.append(n % 10)
        n //= 10
    return digits[::-1]  # Reverse for left-to-right order

# Sum of digits
def digit_sum(n):
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total

# Reverse number
def reverse_number(n):
    result = 0
    while n > 0:
        result = result * 10 + (n % 10)
        n //= 10
    return result
\`\`\`

**Fast exponentiation pattern:**

\`\`\`python
# a^n in O(log n) instead of O(n)
def fast_power(a, n):
    result = 1
    while n > 0:
        if n % 2 == 1:
            result *= a
        a *= a
        n //= 2
    return result

# Example: 2^1000 takes 10 iterations, not 1000!
\`\`\`

**Perfect squares and sqrt:**

\`\`\`python
import math

# Check if perfect square
def is_perfect_square(n):
    sqrt = int(math.sqrt(n))
    return sqrt * sqrt == n

# Find sqrt without using built-in (binary search)
def sqrt_binary_search(n):
    if n < 2:
        return n

    left, right = 1, n // 2

    while left <= right:
        mid = (left + right) // 2
        square = mid * mid

        if square == n:
            return mid
        elif square < n:
            left = mid + 1
        else:
            right = mid - 1

    return right  # Floor of sqrt
\`\`\`

WHEN MATH APPEARS IN INTERVIEWS: PATTERN RECOGNITION

**Signal → Technique:**
- "Count ways to..." → Combinatorics (permutations/combinations)
- "Find pattern/cycle" → GCD/LCM
- "Return answer mod 10⁹+7" → Modular arithmetic
- "Is prime" or "prime factors" → Trial division or sieve
- "Large powers" → Binary exponentiation
- "Digit manipulation" → Extract with % 10 and // 10
- "Perfect square/cube" → Binary search on sqrt/cbrt

**Don't panic!** Math problems in interviews test formula application, not proofs. Recognize the pattern, apply the technique, implement carefully with edge cases.

COMMON GOTCHAS AND PITFALLS

**1. Integer division in Python 3:**
\`\`\`python
# ❌ WRONG in Python 3
result = a / b  # Returns float!

# ✅ CORRECT
result = a // b  # Integer division
\`\`\`

**2. Negative modulo:**
\`\`\`python
# Python handles negatives correctly
-5 % 3  # = 1 (Python)
# Other languages: -5 % 3 = -2

# Safe formula (works everywhere)
result = ((a % MOD) + MOD) % MOD
\`\`\`

**3. Factorial overflow:**
\`\`\`python
# ❌ WRONG - compute factorial then mod
fact = 1
for i in range(1, n+1):
    fact *= i
return fact % MOD  # Too late!

# ✅ CORRECT - apply mod at each step
fact = 1
for i in range(1, n+1):
    fact = (fact * i) % MOD
return fact
\`\`\`

**4. Sieve optimization:**
\`\`\`python
# ✅ Start marking at i*i, not 2*i
for i in range(2, int(n**0.5) + 1):
    if is_prime[i]:
        for j in range(i*i, n+1, i):  # Start at i*i!
            is_prime[j] = False
\`\`\`

**5. Edge cases:**
- GCD(0, n) = n, GCD(n, 0) = n
- 0 and 1 are not prime
- Combinatorics: C(n, 0) = C(n, n) = 1

BEST PRACTICES FOR MATH INTERVIEWS

1. **Recognize the pattern first**: Don't jump into code. Ask: "Is this GCD? Modular? Combinatorics?"

2. **Use Python built-ins**: \`math.gcd()\`, \`pow(base, exp, mod)\` are highly optimized

3. **Apply mod early and often**: Don't wait until the end

4. **Handle edge cases**: 0, 1, negative numbers, empty inputs

5. **Check for overflow** (even in Python for time limits)

6. **Test with small examples**: Verify formula with n=0,1,2 before implementing

7. **Know when to precompute**: Factorials, primes (sieve), Pascal's triangle

8. **Binary search on the answer**: For problems involving sqrt, powers, or "find largest X such that..."`

export function MathPage() {
  return (
    <TypePage
      type="Math Algorithms" badge="∑" color="var(--accent-math)"
      description="GCD/LCM, primes, modular arithmetic, combinatorics. Foundation for many interview problems."
      intro={mathIntro}
      tip={`Check ONE prime? Trial division O(√n) up to 10¹² — Find ALL primes ≤N? Sieve O(n log log n)
GCD/LCM pattern? math.gcd(a,b) O(log n) — LCM = a*b // gcd(a,b) (avoid overflow!)
"Return mod 10⁹+7"? Apply mod at EACH step (fact * i) % MOD — not at end! Prevents overflow
Modular division? (a/b) % m = (a * pow(b, m-2, m)) % m when m prime (Fermat's little theorem)
Permutations vs Combinations? P(n,r) = n!/(n-r)! order matters — C(n,r) = n!/(r!(n-r)!) order doesn't
Combinatorics with mod? Precompute factorials, use modular inverse for division — can't divide directly!
Fast power? pow(base, exp, MOD) uses binary exp O(log exp) — 2^1000 takes 10 iterations not 1000!`}
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
Build data pipeline? Chain generators (read → filter → transform → aggregate) - O(1) memory for entire pipeline
Flatten or chain generators? yield from other_gen - cleaner than "for item in other_gen: yield item"
Need len() or indexing? Use list not generator - generators don't support len() or gen[i]
Two-way communication? gen.send(value) for coroutines - generator receives values via yield expression
Gotcha: Generators EXHAUST after one pass! Convert to list or use itertools.tee(gen, 2) for multiple iterations`}
      methods={generatorMethods}
    />
  )
}

const segmentTreeIntro = `Segment Trees and Binary Indexed Trees (BIT/Fenwick Trees) efficiently handle range queries and updates. The key insight: precompute answers for segments of the array so range queries don't require scanning all elements. Both achieve O(log n) query and update time—turning O(nq) brute force into O(q log n) for q queries.

WHY SEGMENT TREES AND BIT MATTER: When you have an array that changes and need to answer range queries efficiently, you hit a fundamental trade-off. Brute force: O(1) update, O(n) query. Prefix sums: O(n) update, O(1) query. Segment Trees/BIT: O(log n) for both! This makes them essential for problems with many queries and updates on dynamic data.

**The efficiency breakthrough:**
- Brute force: scan range for every query → O(nq) total
- Prefix sums: rebuild prefix array for every update → O(nq) total
- Segment Tree/BIT: logarithmic for both → O((n+q) log n) total
- For n=10⁵, q=10⁵: brute force 10¹⁰ ops, Segment Tree 3M ops (3000× faster!)

WHEN TO USE EACH APPROACH: DECISION TREE

**Prefix Sum Array** (build O(n), query O(1), update O(n)):
- **Use when**: Static array with NO updates
- **Perfect for**: "Given fixed array, answer Q range sum queries"
- **Code**: \`prefix[i] = sum(arr[0:i])\`, \`range_sum(l, r) = prefix[r+1] - prefix[l]\`

**Binary Indexed Tree / Fenwick Tree** (all operations O(log n)):
- **Use when**: Range SUM queries with point updates
- **Perfect for**: "Update arr[i], query sum(arr[l:r+1]), repeat Q times"
- **Advantage**: Simple implementation (~20 lines), low constants
- **Limitation**: ONLY supports prefix sums (can't do min/max/GCD directly)

**Segment Tree** (all operations O(log n)):
- **Use when**: Range queries for ANY associative operation (sum, min, max, GCD, XOR) with updates
- **Perfect for**: "Find min in range [l, r], update arr[i], find max in range [a, b]"
- **Advantage**: Supports any associative operation, range updates with lazy propagation
- **Limitation**: More complex implementation (~100 lines)

**When ALL are overkill:**
- Small arrays (n < 1000): just scan O(n) - simpler and faster in practice
- Few queries (< 10): building tree costs O(n), not worth it
- Rare updates: sometimes just recalculating is simpler

BINARY INDEXED TREE (BIT / FENWICK TREE): THE SIMPLE SOLUTION

**How BIT works:** Uses bit manipulation magic! Each index i stores sum of elements in range determined by i's binary representation. Index 12 (binary 1100) stores sum of 1 element (last set bit = 4 = 2²). This creates overlapping ranges that combine to give any prefix sum in O(log n) steps.

**Key insight:** \`i & (-i)\` extracts the last set bit. For update: add last bit to climb tree. For query: subtract last bit to descend.

\`\`\`python
class BIT:
    def __init__(self, n):
        """
        Create BIT for array of size n.
        Time: O(n), Space: O(n)
        """
        self.n = n
        self.tree = [0] * (n + 1)  # 1-indexed (tree[0] unused)

    def update(self, i, delta):
        """
        Add delta to arr[i].
        Time: O(log n)
        """
        i += 1  # Convert to 1-indexed
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)  # Add last set bit (go to parent)

    def query(self, i):
        """
        Compute prefix sum arr[0..i].
        Time: O(log n)
        """
        i += 1  # Convert to 1-indexed
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)  # Remove last set bit (go to contributor)
        return s

    def range_sum(self, left, right):
        """
        Compute sum(arr[left..right]).
        Time: O(log n)
        """
        if left == 0:
            return self.query(right)
        return self.query(right) - self.query(left - 1)

    def build(self, arr):
        """
        Initialize BIT from array.
        Time: O(n log n)
        """
        for i, val in enumerate(arr):
            self.update(i, val)

# Usage example
arr = [1, 3, 5, 7, 9, 11]
bit = BIT(len(arr))
bit.build(arr)

print(bit.range_sum(1, 4))  # sum([3, 5, 7, 9]) = 24
bit.update(2, 10)           # arr[2] = 5 + 10 = 15
print(bit.range_sum(1, 4))  # sum([3, 15, 7, 9]) = 34
\`\`\`

**Why i & (-i) works:**
- -i in two's complement: flip bits, add 1
- Example: i=12 (binary 1100), -i = ...0100 (in two's complement)
- i & (-i) = 1100 & 0100 = 0100 = 4 (extracts rightmost 1)

**BIT limitations:**
- Only supports prefix sums (can't directly do range min/max)
- Can't efficiently support range updates (would need difference array trick)
- Less intuitive than Segment Tree (bit manipulation is clever but obscure)

SEGMENT TREE: THE FLEXIBLE SOLUTION

**Structure:** Binary tree where:
- Leaf nodes represent single array elements
- Internal nodes represent merge of children (sum, min, max, etc.)
- Root represents entire array
- Height = O(log n), total nodes = 2n - 1

**Array representation:** Store tree in array of size 4n (worst case). Node i has children 2i and 2i+1.

\`\`\`python
class SegmentTree:
    def __init__(self, arr, operation='sum'):
        """
        Build segment tree from array.
        operation: 'sum', 'min', 'max', 'gcd', etc.
        Time: O(n), Space: O(n)
        """
        self.n = len(arr)
        self.arr = arr
        self.tree = [0] * (4 * self.n)  # 4n is safe size
        self.op = operation

        # Define merge operation
        if operation == 'sum':
            self.merge = lambda a, b: a + b
            self.identity = 0
        elif operation == 'min':
            self.merge = lambda a, b: min(a, b)
            self.identity = float('inf')
        elif operation == 'max':
            self.merge = lambda a, b: max(a, b)
            self.identity = float('-inf')
        elif operation == 'gcd':
            import math
            self.merge = lambda a, b: math.gcd(a, b)
            self.identity = 0

        self._build(0, 0, self.n - 1)

    def _build(self, node, start, end):
        """
        Recursively build tree.
        node: current node index in tree array
        [start, end]: range this node represents
        """
        if start == end:
            # Leaf node
            self.tree[node] = self.arr[start]
        else:
            mid = (start + end) // 2
            left_child = 2 * node + 1
            right_child = 2 * node + 2

            self._build(left_child, start, mid)
            self._build(right_child, mid + 1, end)

            # Internal node: merge children
            self.tree[node] = self.merge(
                self.tree[left_child],
                self.tree[right_child]
            )

    def update(self, idx, val):
        """
        Update arr[idx] = val.
        Time: O(log n)
        """
        self._update(0, 0, self.n - 1, idx, val)

    def _update(self, node, start, end, idx, val):
        if start == end:
            # Leaf node
            self.arr[idx] = val
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            left_child = 2 * node + 1
            right_child = 2 * node + 2

            if idx <= mid:
                self._update(left_child, start, mid, idx, val)
            else:
                self._update(right_child, mid + 1, end, idx, val)

            # Recalculate after child update
            self.tree[node] = self.merge(
                self.tree[left_child],
                self.tree[right_child]
            )

    def query(self, left, right):
        """
        Query range [left, right].
        Time: O(log n)
        """
        return self._query(0, 0, self.n - 1, left, right)

    def _query(self, node, start, end, left, right):
        # No overlap
        if right < start or end < left:
            return self.identity

        # Complete overlap
        if left <= start and end <= right:
            return self.tree[node]

        # Partial overlap: recurse
        mid = (start + end) // 2
        left_result = self._query(2 * node + 1, start, mid, left, right)
        right_result = self._query(2 * node + 2, mid + 1, end, left, right)

        return self.merge(left_result, right_result)

# Usage example
arr = [1, 3, 5, 7, 9, 11]

# Range sum queries
seg_sum = SegmentTree(arr, 'sum')
print(seg_sum.query(1, 4))  # sum([3, 5, 7, 9]) = 24
seg_sum.update(2, 10)       # arr[2] = 10
print(seg_sum.query(1, 4))  # sum([3, 10, 7, 9]) = 29

# Range min queries
seg_min = SegmentTree(arr, 'min')
print(seg_min.query(1, 4))  # min([3, 5, 7, 9]) = 3
seg_min.update(1, 20)       # arr[1] = 20
print(seg_min.query(1, 4))  # min([20, 5, 7, 9]) = 5
\`\`\`

LAZY PROPAGATION: EFFICIENT RANGE UPDATES

**Problem:** Updating every element in range [L, R] takes O(n) even with Segment Tree—no better than brute force!

**Solution:** Lazy propagation—mark nodes as "lazy", postpone actual updates until queries need them.

**Concept:**
1. Mark node as lazy instead of updating all descendants
2. When querying lazy node, push laziness down to children first
3. Converts O(n) range update to O(log n)

\`\`\`python
class SegmentTreeLazy:
    def __init__(self, arr):
        self.n = len(arr)
        self.arr = arr
        self.tree = [0] * (4 * self.n)
        self.lazy = [0] * (4 * self.n)  # Lazy propagation array
        self._build(0, 0, self.n - 1)

    def _build(self, node, start, end):
        if start == end:
            self.tree[node] = self.arr[start]
        else:
            mid = (start + end) // 2
            self._build(2*node+1, start, mid)
            self._build(2*node+2, mid+1, end)
            self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]

    def _push(self, node, start, end):
        """Push lazy value down to children."""
        if self.lazy[node] != 0:
            # Apply lazy update to current node
            self.tree[node] += (end - start + 1) * self.lazy[node]

            # Propagate to children if not leaf
            if start != end:
                self.lazy[2*node+1] += self.lazy[node]
                self.lazy[2*node+2] += self.lazy[node]

            # Clear lazy
            self.lazy[node] = 0

    def range_update(self, left, right, val):
        """Add val to all elements in [left, right]. Time: O(log n)"""
        self._range_update(0, 0, self.n-1, left, right, val)

    def _range_update(self, node, start, end, left, right, val):
        # Push down existing lazy value
        self._push(node, start, end)

        # No overlap
        if right < start or end < left:
            return

        # Complete overlap: mark lazy
        if left <= start and end <= right:
            self.lazy[node] += val
            self._push(node, start, end)
            return

        # Partial overlap: recurse
        mid = (start + end) // 2
        self._range_update(2*node+1, start, mid, left, right, val)
        self._range_update(2*node+2, mid+1, end, left, right, val)

        # Recalculate after updates (with lazy pushed)
        self._push(2*node+1, start, mid)
        self._push(2*node+2, mid+1, end)
        self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]
\`\`\`

**When lazy propagation matters:**
- Range updates are frequent (not just point updates)
- Competitive programming (common pattern)
- Interviews: rarely required, but good to know conceptually

INTERVIEW PATTERNS AND COMMON PROBLEMS

**Pattern 1: Range Sum with Updates**
- Problem: "Given array, process Q queries: update arr[i] or query sum(arr[l:r])"
- Solution: BIT (simpler) or Segment Tree (more general)

**Pattern 2: Range Min/Max Queries**
- Problem: "Find minimum in range [l, r], with updates"
- Solution: Segment Tree (BIT can't do this directly)

**Pattern 3: Counting Inversions**
- Problem: "Count pairs (i, j) where i < j and arr[i] > arr[j]"
- Solution: BIT for coordinate compression + counting

**Pattern 4: Range GCD Queries**
- Problem: "Find GCD of elements in range [l, r]"
- Solution: Segment Tree with GCD merge operation

**Pattern 5: Kth Smallest in Range**
- Problem: "Find kth smallest element in range [l, r]"
- Solution: Merge Sort Tree (variant of Segment Tree with sorted sublists)

SEGMENT TREE VS BIT: DETAILED COMPARISON

| Feature | BIT (Fenwick) | Segment Tree |
|---------|---------------|--------------|
| **Operations** | Prefix sums only | Any associative operation |
| **Code Length** | ~20 lines | ~100 lines |
| **Complexity** | O(log n) query/update | O(log n) query/update |
| **Range Update** | Tricky (needs tricks) | Easy with lazy propagation |
| **Intuition** | Bit manipulation (obscure) | Tree structure (clear) |
| **Memory** | O(n) | O(4n) = O(n) |
| **Constants** | Low | Higher (more recursive calls) |
| **Interview** | Good for sum queries | Good for min/max/gcd |

**Choose BIT when:**
- Only need range sum queries
- Want simpler code
- Care about low constants

**Choose Segment Tree when:**
- Need min, max, GCD, XOR, etc.
- Need range updates
- Want clearer code (despite being longer)

COMMON GOTCHAS AND PITFALLS

**1. Array size for Segment Tree:**
\`\`\`python
# ❌ WRONG - tree size too small
tree = [0] * (2 * n)  # May overflow!

# ✅ CORRECT - safe size
tree = [0] * (4 * n)  # Always sufficient
\`\`\`

**2. 0-indexed vs 1-indexed:**
- BIT traditionally uses 1-indexed (tree[0] unused)
- Convert: \`i += 1\` when calling BIT operations
- Segment Tree can use either (be consistent!)

**3. Range query boundaries:**
\`\`\`python
# Query range [left, right] INCLUSIVE
# Common mistake: forgetting endpoints are inclusive
seg.query(0, n-1)  # Entire array
seg.query(0, 0)    # Just first element
\`\`\`

**4. Update vs set in BIT:**
- BIT.update(i, delta) ADDS delta to arr[i]
- To SET arr[i] = val: \`update(i, val - arr[i])\`

**5. Forgetting to push lazy:**
- Must push lazy before querying node
- Must push lazy before recursing on children

BEST PRACTICES FOR INTERVIEWS

1. **Ask about constraints:**
   - Array size n? (< 1000 → maybe brute force)
   - Number of queries Q? (< 10 → maybe don't need tree)
   - Types of queries? (only sum → BIT, min/max → Segment Tree)

2. **Start with simpler solutions:**
   - Static array → prefix sums
   - Only sum queries → BIT
   - Only min queries → Segment Tree

3. **Know when it's overkill:**
   - Small n (< 10³): just scan
   - Few queries: building cost not worth it
   - If interviewer hints "is there a simpler way?", maybe prefix sums suffice

4. **Implementation tips:**
   - Test with small example (n=4) on paper first
   - Draw the tree structure to visualize
   - Use helper functions for build/query/update

5. **Complexity analysis:**
   - Build: O(n)
   - Query: O(log n)
   - Update: O(log n)
   - Total for Q operations: O(n + Q log n)

6. **Interview communication:**
   - Explain why you need O(log n) (brute force too slow)
   - Mention tradeoff: O(n) preprocessing for O(log n) queries
   - If stuck on implementation, explain concept and ask if pseudocode is ok

7. **When interviewer asks "optimize":**
   - Brute force O(nq) → "We can use Segment Tree for O(q log n)"
   - Show you know the tool exists even if implementation is complex

WHEN SEGMENT TREE APPEARS IN REAL INTERVIEWS

**Signals in problem statement:**
- "Answer Q queries on array" (large Q → likely need tree structure)
- "Support both queries and updates" (dynamic → not just prefix sums)
- "Find min/max/sum in range" (range query → possible tree)

**Red herrings (DON'T need Segment Tree):**
- "Given fixed array, answer range sum queries" → prefix sums
- "Find max in sliding window" → deque, not Segment Tree
- "Count elements in range" → binary search on sorted array

**True Segment Tree problems:**
- LeetCode 307: Range Sum Query - Mutable (BIT or Segment Tree)
- LeetCode 315: Count of Smaller Numbers After Self (BIT with coordinate compression)
- "Range minimum query with updates" (Segment Tree)
- "Count inversions in array" (BIT)

The key: Segment Trees are powerful but complex. In interviews, knowing when to use them and explaining the tradeoff matters more than perfect implementation. If you identify the need for O(log n) range queries with updates, you've shown the right intuition—even if you can't code it perfectly in 45 minutes.`

export function SegmentTreePage() {
  return (
    <TypePage
      type="Segment Tree / BIT" badge="tree" color="var(--accent-segment-tree)"
      description="O(log n) range queries + point updates. Segment Tree for sum/min/max, BIT (Fenwick) for simpler prefix sums."
      intro={segmentTreeIntro}
      tip={`Range sum + updates? BIT (Fenwick) ~20 lines vs Segment Tree ~100 lines — BIT simpler for sum only
Range min/max/GCD + updates? Segment Tree supports ANY associative operation — BIT can't do min/max directly
Static array (no updates)? Prefix sum O(1) query vs Segment Tree O(log n) — don't build tree if no updates
Segment Tree size? tree = [0] * (4*n) NOT 2*n — prevents overflow in worst case
BIT indexing? 1-indexed! i+=1 when calling ops, tree[0] unused — common off-by-one error
Range updates? Segment Tree with lazy propagation O(log n) — BIT needs tricks for range updates
Overkill check? n < 1000 or Q < 10 queries → brute force simpler — ask constraints before building tree`}
      methods={segmentTreeMethods}
    />
  )
}
