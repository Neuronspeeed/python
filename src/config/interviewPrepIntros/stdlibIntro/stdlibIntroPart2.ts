export const stdlibIntroPart2 = `

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
