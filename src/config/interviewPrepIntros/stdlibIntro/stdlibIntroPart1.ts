export const stdlibIntroPart1 = `Python's Standard Library is interview gold—battle-tested tools that transform hard problems into one-liners. The key insight: @lru_cache converts O(2^n) DP to O(n) with one decorator, Counter eliminates manual frequency counting, deque gives O(1) queue operations, and bisect provides binary search. Mastering stdlib means solving problems faster, cleaner, and with fewer bugs.

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
`
