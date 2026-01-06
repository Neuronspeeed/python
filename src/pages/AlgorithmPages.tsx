import { TypePage } from '../components/TypePage'
import { sortingMethods } from '../data/sorting'
import { binarySearchMethods } from '../data/binarySearch'
import { twoPointersMethods } from '../data/twoPointers'
import { backtrackingMethods } from '../data/backtracking'
import { dpMethods } from '../data/dp'
import { graphMethods } from '../data/graph'
import { DSCategoryTabs } from '../components/DSCategoryTabs'
import { getProblemCount } from '../data/learn'

const sortingIntro = `When to Sort First
Sorting costs O(n log n) but often unlocks O(n) or O(log n) solutions that would otherwise be O(n²). Use Python's built-in Timsort (sort()/sorted()) for 99% of cases—highly optimized, stable, O(n log n) worst/O(n) best on nearly-sorted data.

\`\`\`python
# BUILT-IN SORTING
arr.sort()  # In-place, O(1) extra space
sorted_arr = sorted(arr)  # New list, O(n) space
students.sort(key=lambda x: x[1])  # Custom key
students.sort(key=lambda x: x[1], reverse=True)  # Descending
\`\`\`python
---
Sorted Data Enables Patterns
Two pointers for O(n) pair finding, binary search for O(log n) lookup, greedy for locally optimal choices, duplicate detection via consecutive elements, efficient merging of sorted sequences.

\`\`\`python
# TWO SUM - O(n log n + n) with sorting
def two_sum_sorted(arr, target):
    arr.sort()
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target: return True
        elif s < target: left += 1
        else: right -= 1
    return False

# FIND DUPLICATES - Check consecutive
def has_duplicates(arr):
    arr.sort()
    for i in range(len(arr) - 1):
        if arr[i] == arr[i + 1]: return True
    return False
\`\`\`python
---
Custom Comparators and Stability
Use key parameter for custom sorting. Stable sort preserves order of equal elements—critical for multi-level sorting. Use functools.cmp_to_key for complex comparisons.

\`\`\`python
# CUSTOM KEY
words.sort(key=lambda x: (len(x), x))  # Length then alphabetically
nums.sort(key=abs)  # By absolute value

# STABLE SORT - Preserves equal element order
data = [(1, 'a'), (2, 'b'), (1, 'c')]
data.sort(key=lambda x: x[0])
# Result: [(1, 'a'), (1, 'c'), (2, 'b')]
# 'a' before 'c' preserved for key=1

# COMPLEX COMPARATOR
from functools import cmp_to_key
def largest_number(nums):
    nums = list(map(str, nums))
    def compare(x, y):
        if x + y > y + x: return -1
        elif x + y < y + x: return 1
        return 0
    nums.sort(key=cmp_to_key(compare))
    return ''.join(nums)
\`\`\`python
`
export function SortingPage() {
  return (
    <TypePage
      type="Sorting Algorithms" badge="sort" color="var(--accent-sorting)"
      description="Master sorting algorithms. Know when to use each. Python's Timsort is usually best."
      intro={sortingIntro}
      methods={sortingMethods}
    />
  )
}

const binarySearchIntro = `Binary Search for O(log n)
Binary search divides sorted data in half repeatedly—search 1 billion elements in only 30 comparisons. Requires sorted data. O(log n) time, O(1) space iterative.

\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1
\`\`\`python
---
Bisect Module Variants
bisect_left finds leftmost position, bisect_right finds rightmost. Use for finding ranges, insertion points.

\`\`\`python
import bisect
arr = [1, 2, 4, 4, 4, 6]
bisect.bisect_left(arr, 4)   # 2 (leftmost)
bisect.bisect_right(arr, 4)  # 5 (after rightmost)
bisect.insort(arr, 5)  # Insert maintaining sort

def find_range(arr, target):
    left = bisect.bisect_left(arr, target)
    right = bisect.bisect_right(arr, target)
    return [left, right - 1] if left < right else [-1, -1]
\`\`\`python
---
Binary Search on Answer Space
Search on possible answer range, not indices. For "find minimum X where condition(X) is true".

\`\`\`python
def sqrt(x):
    left, right = 1, x // 2
    while left <= right:
        mid = left + (right - left) // 2
        if mid * mid <= x: left = mid + 1
        else: right = mid - 1
    return right  # Floor of sqrt

def ship_within_days(weights, days):
    def can_ship(cap):
        curr, needed = 0, 1
        for w in weights:
            if curr + w > cap:
                needed += 1
                curr = w
            else: curr += w
        return needed <= days
    
    left, right = max(weights), sum(weights)
    while left < right:
        mid = left + (right - left) // 2
        if can_ship(mid): right = mid
        else: left = mid + 1
    return left
\`\`\`python
`
export function BinarySearchPage() {
  return (
    <TypePage
      type="Binary Search" badge="log" color="var(--accent-binary-search)"
      description="O(log n) search in sorted data. Master the three variants: exact, left-most, right-most."
      intro={binarySearchIntro}
      methods={binarySearchMethods}
      tabs={<DSCategoryTabs basePath="/binary-search" problemCount={getProblemCount('binarySearch')} />}
    />
  )
}

const twoPointersIntro = `Two Pointers for Linear Scans
Use two pointers converging from ends for sorted arrays, or fast/slow for linked lists. Reduces O(n²) brute force to O(n).

\`\`\`python
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target: return [left, right]
        elif s < target: left += 1
        else: right -= 1

def has_cycle(head):  # Fast/slow pointers
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow == fast: return True
    return False
\`\`\`python
---
Container With Most Water
Move pointer with smaller height inward. O(n) vs O(n²) checking all pairs.

\`\`\`python
def max_area(height):
    left, right, max_water = 0, len(height) - 1, 0
    while left < right:
        width = right - left
        area = width * min(height[left], height[right])
        max_water = max(max_water, area)
        if height[left] < height[right]: left += 1
        else: right -= 1
    return max_water
\`\`\`python
---
In-Place with Write/Read Pointers
Write tracks where to place next valid element, read scans ahead. O(1) space.

\`\`\`python
def remove_duplicates(nums):
    if not nums: return 0
    write = 1
    for read in range(1, len(nums)):
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1
    return write

def remove_element(nums, val):
    write = 0
    for read in range(len(nums)):
        if nums[read] != val:
            nums[write] = nums[read]
            write += 1
    return write
\`\`\`python
`
export function TwoPointersPage() {
  return (
    <TypePage
      type="Two Pointers & Sliding Window" badge="2ptr" color="var(--accent-two-pointers)"
      description="Two pointers for O(n) solutions. Sliding window for subarray/substring problems."
      intro={twoPointersIntro}
      methods={twoPointersMethods}
      tabs={<DSCategoryTabs basePath="/two-pointers" problemCount={getProblemCount('twoPointers')} />}
    />
  )
}

const backtrackingIntro = `Backtracking for Combinatorial Search
Build candidates incrementally, backtrack from invalid branches early. O(2ⁿ) or O(n!) but prunes dead ends. Use for permutations, combinations, subsets, N-Queens, Sudoku.

\`\`\`python
def backtrack(path, choices):
    if is_valid_solution(path):
        result.append(path[:])
        return
    for choice in choices:
        if is_valid(choice):
            path.append(choice)
            backtrack(path, next_choices())
            path.pop()  # Undo choice

def subsets(nums):
    result = []
    def bt(start, path):
        result.append(path[:])
        for i in range(start, len(nums)):
            bt(i + 1, path + [nums[i]])
    bt(0, [])
    return result
\`\`\`python
---
N-Queens Pattern
Place N queens row by row, check column/diagonal conflicts, backtrack on invalid placement.

\`\`\`python
def solve_n_queens(n):
    result, cols, d1, d2 = [], set(), set(), set()
    board = [['.'] * n for _ in range(n)]
    
    def bt(row):
        if row == n:
            result.append([''.join(r) for r in board])
            return
        for col in range(n):
            if col in cols or (row-col) in d1 or (row+col) in d2:
                continue
            board[row][col] = 'Q'
            cols.add(col)
            d1.add(row - col)
            d2.add(row + col)
            bt(row + 1)
            board[row][col] = '.'
            cols.remove(col)
            d1.remove(row - col)
            d2.remove(row + col)
    bt(0)
    return result
\`\`\`python
---
Combination Sum Pattern
Backtrack with running sum, prune when exceeds target. Can reuse or not based on problem.

\`\`\`python
def combination_sum(candidates, target):
    result = []
    def bt(start, path, total):
        if total == target:
            result.append(path[:])
            return
        if total > target: return
        for i in range(start, len(candidates)):
            bt(i, path + [candidates[i]], total + candidates[i])  # Can reuse
    bt(0, [], 0)
    return result

def combination_sum2(candidates, target):  # No reuse
    candidates.sort()
    result = []
    def bt(start, path, total):
        if total == target:
            result.append(path[:])
            return
        if total > target: return
        for i in range(start, len(candidates)):
            if i > start and candidates[i] == candidates[i-1]: continue
            bt(i + 1, path + [candidates[i]], total + candidates[i])
    bt(0, [], 0)
    return result
\`\`\`python
`
export function BacktrackingPage() {
  return (
    <TypePage
      type="Backtracking" badge="bt" color="var(--accent-backtracking)"
      description="Explore all solutions by building incrementally. Essential for permutations, combinations, constraint satisfaction."
      intro={backtrackingIntro}
      methods={backtrackingMethods}
      tabs={<DSCategoryTabs basePath="/backtracking" problemCount={getProblemCount('backtracking')} />}
    />
  )
}

const dpIntro = `When to Use Dynamic Programming: Two Requirements
DP solves optimization problems by caching subproblem results to avoid recomputation. Reduces exponential O(2^n) to polynomial O(n) or O(n²). Requires both **optimal substructure** (optimal solution contains optimal subsolutions) AND **overlapping subproblems** (same subproblems recomputed multiple times). Without both, DP does not help.

\`\`\`python
# FIBONACCI: Classic DP example
# NAIVE RECURSION: O(2^n) - exponential redundancy
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
# fib(5) calls fib(3) twice, fib(2) three times - massive waste

# DYNAMIC PROGRAMMING: O(n) - each subproblem solved once
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
# fib(3) computed once, cached, reused - no redundancy

# TWO REQUIREMENTS:
# 1. Optimal Substructure: fib(n) = fib(n-1) + fib(n-2)
#    Optimal solution built from optimal subsolutions
# 2. Overlapping Subproblems: fib(3) needed multiple times
#    Without overlap, caching gives no benefit

# SIGNAL WORDS (when to try DP):
# • "Count the number of ways to..."
# • "Find minimum/maximum cost/value/length"
# • "Longest/shortest subsequence/substring"
# • "Is it possible to..." (decision problems)

# NOT DP:
# • "Find ALL solutions" - use Backtracking (DP counts, not enumerates)
# • Simple greedy works - no need for DP overhead
\`\`\`python
---
Top-Down (Memoization) vs Bottom-Up (Tabulation)
Two approaches to DP. Top-down adds \`@lru_cache\` to recursive solution (easier to code, natural thinking). Bottom-up builds table iteratively from base cases (faster, better space control). Both give same time complexity. Start with top-down in interviews, optimize to bottom-up if needed.

\`\`\`python
# TOP-DOWN (Memoization): Recursive + caching
from functools import lru_cache

@lru_cache(maxsize=None)
def climb_stairs(n):
    if n <= 1:
        return 1
    return climb_stairs(n-1) + climb_stairs(n-2)
# Pros: Natural recursion, cleaner code, only computes needed subproblems
# Cons: Recursion overhead, stack overflow risk for deep recursion

# BOTTOM-UP (Tabulation): Iterative table building
def climb_stairs(n):
    if n <= 1:
        return 1
    dp = [0] * (n + 1)
    dp[0], dp[1] = 1, 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
# Pros: No recursion overhead (faster), better space optimization, no stack overflow
# Cons: Harder to think about initially, more index management

# WHEN TO USE EACH:
# • Interviews: Start top-down (@lru_cache is one line), convert if asked
# • Production: Bottom-up for performance-critical code
# • Learning: Try both to understand the pattern

# SPACE OPTIMIZATION (bottom-up only):
def climb_stairs_optimized(n):
    if n <= 1:
        return 1
    prev2, prev1 = 1, 1
    for i in range(2, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    return prev1
# O(1) space - only track last 2 values instead of full array
\`\`\`python
---
Master These Patterns: 1D and 2D DP
Two common DP dimensionalities. 1D DP when state depends on single variable (index, sum). 2D DP when state depends on two variables (two sequences, items + capacity, grid position). Identify the state, find recurrence relation, set base cases, fill table in correct order.

\`\`\`python
# 1D DP PATTERN: House Robber
# dp[i] = max money from first i houses
def rob(nums):
    if not nums:
        return 0
    n = len(nums)
    if n == 1:
        return nums[0]

    dp = [0] * n
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])

    for i in range(2, n):
        # Rob current + skip previous, OR skip current
        dp[i] = max(nums[i] + dp[i-2], dp[i-1])

    return dp[n-1]
# Time: O(n), Space: O(n) - optimizable to O(1)

# 1D DP PATTERN: Coin Change
# dp[i] = min coins to make amount i
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # Base: 0 coins for 0 amount

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1
# Time: O(amount * coins), Space: O(amount)

# 2D DP PATTERN: Longest Common Subsequence
# dp[i][j] = LCS length for s1[:i] and s2[:j]
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1  # Match - extend LCS
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])  # Skip from either

    return dp[m][n]
# Time: O(m*n), Space: O(m*n)

# 2D DP PATTERN: 0/1 Knapsack
# dp[i][w] = max value with first i items, capacity w
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Don't take item i
            dp[i][w] = dp[i-1][w]
            # Take item i if it fits
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                              dp[i-1][w - weights[i-1]] + values[i-1])

    return dp[n][capacity]
# Time: O(n*capacity), Space: O(n*capacity) - optimizable to O(capacity)
\`\`\``

export function DynamicProgrammingPage() {
  return (
    <TypePage
      type="Dynamic Programming" badge="dp" color="var(--accent-dp)"
      description="Solve complex problems by breaking into overlapping subproblems. Memoization vs tabulation."
      intro={dpIntro}
      methods={dpMethods}
      tabs={<DSCategoryTabs basePath="/dynamic-programming" problemCount={getProblemCount('dynamicProgramming')} />}
    />
  )
}

const graphIntro = `Graph Traversal Patterns
Graphs are vertices (nodes) connected by edges. Can be directed or undirected, weighted or unweighted. DFS (stack/recursion) and BFS (queue) both O(V+E).

\`\`\`python
graph = {'A': ['B','C'], 'B': ['D','E'], 'C': ['F']}

def dfs(graph, start, visited=None):
    if visited is None: visited = set()
    visited.add(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited

from collections import deque
def bfs(graph, start):
    visited, queue = {start}, deque([start])
    while queue:
        v = queue.popleft()
        for n in graph[v]:
            if n not in visited:
                visited.add(n)
                queue.append(n)
    return visited
\`\`\`python
---
DFS vs BFS Trade-offs
DFS for finding paths, checking connectivity, topological sort. BFS for shortest path in unweighted graphs, finding closest nodes. DFS uses less memory.

\`\`\`python
def shortest_path_bfs(graph, start, target):
    queue = deque([(start, [start])])
    visited = {start}
    while queue:
        v, path = queue.popleft()
        if v == target: return path
        for n in graph[v]:
            if n not in visited:
                visited.add(n)
                queue.append((n, path + [n]))
    return None

def find_path_dfs(graph, start, target, path=None):
    if path is None: path = []
    path.append(start)
    if start == target: return path
    for n in graph[start]:
        if n not in path:
            newpath = find_path_dfs(graph, n, target, path[:])
            if newpath: return newpath
    return None
\`\`\`python
---
Cycle Detection and Topological Sort
DFS with recursion stack detects cycles in directed graphs. Topological sort uses DFS post-order. Only works on DAGs.

\`\`\`python
def has_cycle(graph):
    visited, rec = set(), set()
    def dfs(node):
        visited.add(node)
        rec.add(node)
        for n in graph.get(node, []):
            if n not in visited and dfs(n): return True
            elif n in rec: return True
        rec.remove(node)
        return False
    return any(dfs(n) for n in graph if n not in visited)

def topological_sort(graph):
    visited, result = set(), []
    def dfs(node):
        visited.add(node)
        for n in graph.get(node, []):
            if n not in visited: dfs(n)
        result.append(node)  # Add AFTER exploring neighbors
    for n in graph:
        if n not in visited: dfs(n)
    return result[::-1]  # Reverse for correct order
\`\`\`python
`
export function GraphPage() {
  return (
    <TypePage
      type="Graph Algorithms" badge="bfs" color="var(--accent-graph)"
      description="Graph traversal, shortest paths, and spanning trees. Master DFS, BFS, Dijkstra, and topological sort."
      intro={graphIntro}
      methods={graphMethods}
      tabs={<DSCategoryTabs basePath="/graph" problemCount={getProblemCount('graphs')} />}
    />
  )
}
