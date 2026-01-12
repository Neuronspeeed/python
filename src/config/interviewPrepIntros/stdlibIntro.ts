export const stdlibIntro = `Python's Standard Library is interview gold—battle-tested tools that transform hard problems into one-liners. The key insight: @lru_cache converts O(2^n) DP to O(n) with one decorator, Counter eliminates manual frequency counting, deque gives O(1) queue operations, and bisect provides binary search. Mastering stdlib means solving problems faster, cleaner, and with fewer bugs.

WHY STDLIB DOMINATES INTERVIEWS: Stdlib tools are optimized in C, battle-tested across millions of projects, and designed by experts. Using Counter instead of manual dict counting shows you know Python idioms. Using @lru_cache instead of manual memoization shows you can recognize patterns. Using deque instead of list.pop(0) shows you understand time complexity. Interviewers notice when you reach for the right tool.

**The stdlib advantage:**
- Cleaner code: One line vs 15+ lines of implementation
- Faster execution: C-optimized vs Python loops
- Fewer bugs: Battle-tested vs your ad-hoc solution
- Interview signal: "I know Python idioms and tools"

FUNCTOOLS: @LRU_CACHE - THE #1 INTERVIEW TOOL

Dynamic programming problems start with exponential time complexity due to repeated subproblem calculations. Manual memoization requires managing a dictionary, checking for cached results, and handling edge cases. The @lru_cache decorator does all this automatically—convert any recursive function to memoized DP by adding one line. It's implemented in C, thread-safe, provides cache statistics (.cache_info()), and handles hashable argument types correctly.

\`\`\`python
# BAD: Manual DP - error-prone, verbose
memo = {}
def fib(n):
    if n in memo:
        return memo[n]
    if n < 2:
        return n
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]

# GOOD: @lru_cache - clean, fast, correct
from functools import lru_cache

@lru_cache(maxsize=None)  # maxsize=None for unlimited cache
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

# Interview wins:
# - Fibonacci: O(2^n) -> O(n)
# - Climbing stairs: O(2^n) -> O(n)
# - Coin change: O(2^n) -> O(n*m)
# - Word break: O(2^n) -> O(n*m)
# All become one-decorator solutions!

# Cache stats for optimization
print(fib.cache_info())  # CacheInfo(hits=8, misses=11, maxsize=None, currsize=11)
\`\`\`python

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
\`\`\`python

COLLECTIONS: COUNTER - FREQUENCY ANALYSIS GOLD

Frequency analysis appears constantly in interviews—finding anagrams, top-k frequent elements, character counts, majority elements. Manual dictionary counting requires initialization checks and increment logic. Counter does it all: \`Counter(arr)\` counts frequencies, \`.most_common(k)\` finds top k elements, and Counter supports set-like operations (intersection, union, difference) for comparing frequencies.

\`\`\`python
from collections import Counter

# BAD: Manual counting - verbose, error-prone
freq = {}
for char in string:
    if char in freq:
        freq[char] += 1
    else:
        freq[char] = 1

# GOOD: Counter - one line
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
\`\`\`python

COLLECTIONS: DEQUE - DOUBLE-ENDED QUEUE (MANDATORY FOR BFS)

**CRITICAL**: Never use list for queue operations! \`list.pop(0)\` shifts all elements (O(n)), while \`deque.popleft()\` is O(1). This difference turns O(n^2) BFS into O(n). deque also supports efficient sliding window implementations with O(1) operations at both ends.

\`\`\`python
from collections import deque

# WRONG - list for queue: O(n) pop(0)
queue = [1, 2, 3]
queue.pop(0)  # O(n) - shifts all elements!

# GOOD: CORRECT - deque: O(1) popleft
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
\`\`\`python

COLLECTIONS: DEFAULTDICT - NO MORE KEYERROR

\`\`\`python
from collections import defaultdict

# BAD: Manual initialization
graph = {}
for u, v in edges:
    if u not in graph:
        graph[u] = []
    graph[u].append(v)

# GOOD: defaultdict - auto-creates
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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

WHEN STDLIB BEATS MANUAL

Use stdlib when it matches your needs exactly—the code is cleaner, faster, and less buggy:
- DP with recursion -> @lru_cache
- Frequency counting -> Counter
- Queue/BFS -> deque
- Graph adjacency -> defaultdict(list)
- Permutations/combinations -> itertools
- Heap operations -> heapq
- Binary search -> bisect

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
defaultdict(list)  # GOOD: OK
defaultdict(lambda: [])  # GOOD: OK
defaultdict(list(10))  # WRONG - calls list(10) immediately
\`\`\`python

BEST PRACTICES FOR INTERVIEWS

1. **Show you know stdlib**: Reach for Counter, deque, @lru_cache—signals Python expertise
2. **Explain the tool**: "I'll use Counter because it's O(n) frequency counting with clean syntax"
3. **Know the complexity**: @lru_cache is O(n), Counter.most_common is O(n log k)
4. **Fallback to manual**: If interviewer says "implement it yourself," switch gracefully
5. **Import at top**: \`from collections import Counter\` before function, not inside
6. **Use in context**: Stdlib shines in real interviews, less useful in algorithmic deep dives`
