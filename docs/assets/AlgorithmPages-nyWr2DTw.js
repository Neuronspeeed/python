import{c as e,r as t,t as n}from"./index-BvioVRON.js";import{n as r}from"./learn-Cv_zenSA.js";const i={sorting:{type:`Sorting Algorithms`,badge:`sort`,color:`var(--accent-sorting)`,description:`Master sorting algorithms. Know when to use each. Python's Timsort is usually best.`,intro:`When to Sort First
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
`,hasTabs:!1},binarySearch:{type:`Binary Search`,badge:`log`,color:`var(--accent-binary-search)`,description:`O(log n) search in sorted data. Master the three variants: exact, left-most, right-most.`,intro:`Binary Search for O(log n)
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
`,hasTabs:!0,basePath:`/binary-search`,problemCategory:`binarySearch`},twoPointers:{type:`Two Pointers & Sliding Window`,badge:`2ptr`,color:`var(--accent-two-pointers)`,description:`Two pointers for O(n) solutions. Sliding window for subarray/substring problems.`,intro:`Two Pointers for Linear Scans
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
`,hasTabs:!0,basePath:`/two-pointers`,problemCategory:`twoPointers`},backtracking:{type:`Backtracking`,badge:`bt`,color:`var(--accent-backtracking)`,description:`Explore all solutions by building incrementally. Essential for permutations, combinations, constraint satisfaction.`,intro:`Backtracking for Combinatorial Search
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
`,hasTabs:!0,basePath:`/backtracking`,problemCategory:`backtracking`},dynamicProgramming:{type:`Dynamic Programming`,badge:`dp`,color:`var(--accent-dp)`,description:`Solve complex problems by breaking into overlapping subproblems. Memoization vs tabulation.`,intro:`When to Use Dynamic Programming: Two Requirements
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
\`\`\``,hasTabs:!0,basePath:`/dynamic-programming`,problemCategory:`dynamicProgramming`},graph:{type:`Graph Algorithms`,badge:`bfs`,color:`var(--accent-graph)`,description:`Graph traversal, shortest paths, and spanning trees. Master DFS, BFS, Dijkstra, and topological sort.`,intro:`Graph Traversal Patterns
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
`,hasTabs:!0,basePath:`/graph`,problemCategory:`graphs`}},a=[{signature:`Why understand Sorting?`,description:`Foundation of CS. Different algorithms for different data. O(n log n) optimal for comparison sorts.`,complexity:`Concept`,section:`Why & When`,example:`# SORTING = Arrange elements in order
# Foundation of many algorithms

# COMPARISON SORTS (O(n log n) optimal):
# - Merge Sort: stable, O(n) space
# - Quick Sort: fast average, O(1) space
# - Heap Sort: in-place, not stable

# NON-COMPARISON SORTS (can be O(n)):
# - Counting Sort: small integer range
# - Radix Sort: fixed-length integers/strings
# - Bucket Sort: uniform distribution

# WHEN TO USE EACH:
# - Need stable? Merge Sort
# - Need in-place? Quick/Heap Sort
# - Small integers? Counting Sort
# - Nearly sorted? Insertion Sort
# - Small array? Insertion Sort

# PYTHON'S TIMSORT:
# - Hybrid: Merge + Insertion
# - O(n log n) worst, O(n) best
# - Stable, adaptive
sorted([3, 1, 4, 1, 5])  # [1, 1, 3, 4, 5]
[3, 1, 4].sort()         # In-place`},{signature:`Sorting Comparison`,description:`Compare time, space, stability of sorting algorithms.`,complexity:`Concept`,section:`Why & When`,example:`# COMPARISON TABLE
#
# Algorithm      Best      Avg       Worst     Space   Stable
# ───────────────────────────────────────────────────────────
# Bubble         O(n)      O(n²)     O(n²)     O(1)    Yes
# Selection      O(n²)     O(n²)     O(n²)     O(1)    No
# Insertion      O(n)      O(n²)     O(n²)     O(1)    Yes
# Merge          O(nlogn)  O(nlogn)  O(nlogn)  O(n)    Yes
# Quick          O(nlogn)  O(nlogn)  O(n²)     O(logn) No
# Heap           O(nlogn)  O(nlogn)  O(nlogn)  O(1)    No
# Counting       O(n+k)    O(n+k)    O(n+k)    O(k)    Yes
# Radix          O(nk)     O(nk)     O(nk)     O(n+k)  Yes
# Bucket         O(n+k)    O(n+k)    O(n²)     O(n)    Yes
# Tim            O(n)      O(nlogn)  O(nlogn)  O(n)    Yes

# STABILITY = Equal elements keep original order
# [3a, 1, 3b] -> stable: [1, 3a, 3b]
# [3a, 1, 3b] -> unstable: [1, 3b, 3a] possible`},{signature:`Bubble Sort`,description:`Repeatedly swap adjacent elements. Simple but slow.`,complexity:`O(n²)`,section:`O(n²) Sorts`,example:`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # Early exit if no swaps (already sorted)
        if not swapped:
            break
    return arr

# Visualization:
# [5, 3, 8, 4, 2]
# Pass 1: [3, 5, 4, 2, 8] (8 bubbles to end)
# Pass 2: [3, 4, 2, 5, 8] (5 bubbles up)
# Pass 3: [3, 2, 4, 5, 8]
# Pass 4: [2, 3, 4, 5, 8]

# When to use:
# - Educational purposes
# - Already nearly sorted (O(n) best case)
# - Very small arrays`},{signature:`Selection Sort`,description:`Find minimum, place at beginning. Simple, minimal swaps.`,complexity:`O(n²)`,section:`O(n²) Sorts`,example:`def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        # Find minimum in unsorted portion
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        # Swap minimum to sorted portion
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Visualization:
# [5, 3, 8, 4, 2]
# i=0: min=2, swap -> [2, 3, 8, 4, 5]
# i=1: min=3, no swap -> [2, 3, 8, 4, 5]
# i=2: min=4, swap -> [2, 3, 4, 8, 5]
# i=3: min=5, swap -> [2, 3, 4, 5, 8]

# When to use:
# - Minimize number of swaps (n-1 max)
# - Memory writes are expensive`},{signature:`Insertion Sort`,description:`Insert each element into sorted portion. Great for nearly sorted data.`,complexity:`O(n²) / O(n) best`,section:`O(n²) Sorts`,example:`def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # Shift elements right until correct position
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

# Visualization:
# [5, 3, 8, 4, 2]
# i=1: key=3, [5,5,8,4,2] -> [3,5,8,4,2]
# i=2: key=8, no shift -> [3,5,8,4,2]
# i=3: key=4, [3,5,8,8,2] -> [3,5,5,8,2] -> [3,4,5,8,2]
# i=4: key=2, shift all -> [2,3,4,5,8]

# Binary insertion sort (fewer comparisons)
from bisect import bisect_left

def binary_insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = bisect_left(arr, key, 0, i)
        arr[j+1:i+1] = arr[j:i]
        arr[j] = key
    return arr

# When to use:
# - Small arrays (< 10-20 elements)
# - Nearly sorted data (O(n) best)
# - Online algorithm (sort as data arrives)
# - Used by Timsort for small runs`},{signature:`Merge Sort`,description:`Divide and conquer. Stable, predictable O(n log n). Uses O(n) space.`,complexity:`O(n log n)`,section:`O(n log n) Sorts`,example:`def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:  # <= for stability
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result

# In-place merge sort (more complex)
def merge_sort_inplace(arr, left, right):
    if left < right:
        mid = (left + right) // 2
        merge_sort_inplace(arr, left, mid)
        merge_sort_inplace(arr, mid + 1, right)
        merge_inplace(arr, left, mid, right)

# When to use:
# - Need stable sort
# - Predictable performance needed
# - Sorting linked lists (no random access needed)
# - External sorting (large files)`},{signature:`Quick Sort`,description:`Partition around pivot. Fast average, O(n²) worst. In-place.`,complexity:`O(n log n) avg`,section:`O(n log n) Sorts`,example:`def quick_sort(arr):
    def partition(low, high):
        pivot = arr[high]  # Choose last as pivot
        i = low - 1

        for j in range(low, high):
            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]

        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        return i + 1

    def sort(low, high):
        if low < high:
            pi = partition(low, high)
            sort(low, pi - 1)
            sort(pi + 1, high)

    sort(0, len(arr) - 1)
    return arr

# Three-way partition (for duplicates)
def quick_sort_3way(arr, low, high):
    if low >= high:
        return

    lt, gt = low, high
    pivot = arr[low]
    i = low + 1

    while i <= gt:
        if arr[i] < pivot:
            arr[lt], arr[i] = arr[i], arr[lt]
            lt += 1
            i += 1
        elif arr[i] > pivot:
            arr[gt], arr[i] = arr[i], arr[gt]
            gt -= 1
        else:
            i += 1

    quick_sort_3way(arr, low, lt - 1)
    quick_sort_3way(arr, gt + 1, high)

# Randomized pivot (avoid O(n²) on sorted input)
import random
def partition_random(arr, low, high):
    pivot_idx = random.randint(low, high)
    arr[pivot_idx], arr[high] = arr[high], arr[pivot_idx]
    # ... rest of partition`},{signature:`Heap Sort`,description:`Build max-heap, extract max repeatedly. In-place, not stable.`,complexity:`O(n log n)`,section:`O(n log n) Sorts`,example:`def heap_sort(arr):
    n = len(arr)

    def heapify(n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right

        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(n, largest)

    # Build max heap - O(n)
    for i in range(n // 2 - 1, -1, -1):
        heapify(n, i)

    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]  # Move max to end
        heapify(i, 0)  # Restore heap property

    return arr

# Using heapq (min-heap, so negate for max)
import heapq
def heap_sort_heapq(arr):
    heapq.heapify(arr)  # O(n)
    return [heapq.heappop(arr) for _ in range(len(arr))]

# When to use:
# - Need in-place O(n log n)
# - Don't need stability
# - Want guaranteed O(n log n) (unlike quicksort)`}],o=[{signature:`When to use non-comparison sorts`,description:`Counting sort: small integer range. Radix sort: fixed-length integers/strings. Bucket sort: uniform distribution. All beat O(n log n) in specific cases.`,complexity:`Concept`,section:`Why & When`,example:`# COUNTING SORT - O(n + k)
# Use when: integers in small range [0, k]
# Example: Sort ages (0-120), sort grades (0-100)
ages = [25, 30, 18, 25, 30, 21]  # Range: 0-120
# k = 120, n = 6 → O(126) faster than O(6 log 6)!

# Good: k << n², excellent for small ranges
# Bad: k >> n, wastes memory (don't sort IDs!)

# RADIX SORT - O(n * k) where k = digits
# Use when: fixed-length numbers/strings
# Example: Sort 10M phone numbers (10 digits)
phone_numbers = ["1234567890", "9876543210", ...]  # 10M numbers
# O(10M * 10) = 100M ops
# vs sorted() O(10M * log 10M * 10) = 230M ops

# Good: many items, few digits
# Bad: variable length, non-numeric data

# BUCKET SORT - O(n) average
# Use when: uniform distribution, floats in [0, 1)
# Example: Sort random probabilities
probabilities = [0.3, 0.1, 0.9, 0.5]
# Uniform → each bucket gets ~1 item → O(n)!

# Good: uniformly distributed, known range
# Bad: skewed distribution (all in one bucket)

# DECISION:
# Integer 0-100? → Counting sort
# Phone/zip codes? → Radix sort
# Floats [0,1)? → Bucket sort
# General data? → Python's sorted()`},{signature:`Python sorted() - when to trust it`,description:`Timsort (built-in) beats hand-coded sorts 99% of time. Adaptive, stable, highly optimized. Only implement custom for special cases.`,complexity:`Concept`,section:`Why & When`,example:`# ALWAYS USE SORTED() UNLESS:

# DEFAULT: Use built-in sorted()
arr = [3, 1, 4, 1, 5]
sorted(arr)  # Timsort: O(n log n), stable, adaptive

# Timsort wins because:
# 1. O(n) on nearly sorted data
# 2. Optimized C implementation
# 3. Cache-friendly
# 4. Stable (preserves order)
# 5. Adaptive (fast on patterns)

# WHEN TO IMPLEMENT CUSTOM SORT:

# Case 1: Special integer range
# sorted(): O(n log n)
# counting_sort(): O(n + k) when k small
ages = list(range(1000000))  # 1M ages 0-120
# Counting sort 3x faster!

# Case 2: Custom comparison (rare)
# When key function isn't enough
from functools import cmp_to_key
def compare(a, b):
    # Complex logic comparing a and b
    return -1 if a_before_b else 1
sorted(arr, key=cmp_to_key(compare))

# Case 3: Online/streaming sort
# Need to insert into sorted array repeatedly
# Use heapq or bisect, not repeated sorted()

# GOTCHA: sorted() is FAST
# "I'll optimize with custom sort!"
# Reality: sorted() usually wins due to:
# - C implementation (50-100x faster)
# - Cache optimization
# - Adaptive behavior

# Benchmark before replacing sorted()!`},{signature:`Stability and key functions - when they matter`,description:`Stability: equal elements keep original order. Matters for multi-level sorting. Key functions: transform before comparing. Critical for custom sorts.`,complexity:`Concept`,section:`Why & When`,example:`# STABILITY MATTERS

# Example: Sort students by grade, preserve name order
students = [('Alice', 85), ('Bob', 90), ('Charlie', 85)]

# Stable sort (sorted(), Timsort):
sorted(students, key=lambda s: s[1])
# [(Alice, 85), (Charlie, 85), (Bob, 90)]
# Alice before Charlie preserved!

# Unstable sort (quicksort):
# [(Charlie, 85), (Alice, 85), (Bob, 90)]
# Order changed among equals!

# WHEN STABILITY CRITICAL:
# 1. Multi-level sorting
data = [(3, 'a'), (1, 'b'), (3, 'c'), (1, 'd')]
# Sort by first element, preserve second order:
data.sort(key=lambda x: x[1])  # By second
data.sort(key=lambda x: x[0])  # By first (stable!)
# [(1, 'b'), (1, 'd'), (3, 'a'), (3, 'c')]

# 2. Database-style sorting
# SQL ORDER BY name, age → need stability

# KEY FUNCTIONS - Transform before compare

# Bad: Compare strings ignoring case
def compare_lower(a, b):
    return -1 if a.lower() < b.lower() else 1
sorted(words, key=cmp_to_key(compare_lower))

# Good: Use key function (10x faster!)
sorted(words, key=str.lower)

# Common key patterns:
# By length: key=len
# By absolute: key=abs
# By attribute: key=attrgetter('name')
# By index: key=itemgetter(1)
# By multiple: key=lambda x: (x[0], -x[1])

# PERFORMANCE:
# Key function called once per item: O(n)
# Comparator called O(n log n) times
# → Key functions much faster!

# GOTCHA: In-place vs copy
arr = [3, 1, 4]
sorted(arr)  # Returns new list, arr unchanged
arr.sort()   # Modifies arr in-place
# Use .sort() to save memory`}],s=[{signature:`Counting Sort`,description:`Count occurrences, calculate positions. O(n+k) for range k.`,complexity:`O(n + k)`,section:`Non-Comparison Sorts`,example:`def counting_sort(arr):
    if not arr:
        return arr

    min_val, max_val = min(arr), max(arr)
    range_size = max_val - min_val + 1

    # Count occurrences
    count = [0] * range_size
    for num in arr:
        count[num - min_val] += 1

    # Build sorted array
    result = []
    for i, c in enumerate(count):
        result.extend([i + min_val] * c)

    return result

# Stable counting sort (preserves order of equal elements)
def counting_sort_stable(arr, key=lambda x: x):
    if not arr:
        return arr

    min_val = min(key(x) for x in arr)
    max_val = max(key(x) for x in arr)
    range_size = max_val - min_val + 1

    # Count occurrences
    count = [0] * range_size
    for item in arr:
        count[key(item) - min_val] += 1

    # Calculate positions (cumulative sum)
    for i in range(1, range_size):
        count[i] += count[i - 1]

    # Build output (traverse backwards for stability)
    output = [None] * len(arr)
    for item in reversed(arr):
        idx = key(item) - min_val
        count[idx] -= 1
        output[count[idx]] = item

    return output

# When to use:
# - Small integer range (k << n²)
# - Need stable sort
# - Used as subroutine in radix sort`},{signature:`Radix Sort`,description:`Sort by each digit using counting sort. O(nk) for k digits.`,complexity:`O(n * k)`,section:`Non-Comparison Sorts`,example:`def radix_sort(arr):
    if not arr:
        return arr

    # Find max to know number of digits
    max_val = max(arr)

    # Sort by each digit (LSD - Least Significant Digit)
    exp = 1
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10

    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    # Count occurrences of digit
    for num in arr:
        digit = (num // exp) % 10
        count[digit] += 1

    # Cumulative count
    for i in range(1, 10):
        count[i] += count[i - 1]

    # Build output (backwards for stability)
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        count[digit] -= 1
        output[count[digit]] = arr[i]

    # Copy back
    for i in range(n):
        arr[i] = output[i]

# Handle negative numbers
def radix_sort_with_negatives(arr):
    negatives = [-x for x in arr if x < 0]
    positives = [x for x in arr if x >= 0]

    if negatives:
        radix_sort(negatives)
        negatives = [-x for x in reversed(negatives)]

    if positives:
        radix_sort(positives)

    return negatives + positives

# When to use:
# - Fixed-length integers or strings
# - Large n with small digit range
# - Need stable O(n) sort`},{signature:`Bucket Sort`,description:`Distribute into buckets, sort each bucket. O(n) for uniform distribution.`,complexity:`O(n) avg`,section:`Non-Comparison Sorts`,example:`def bucket_sort(arr, num_buckets=10):
    if not arr:
        return arr

    min_val, max_val = min(arr), max(arr)
    if min_val == max_val:
        return arr

    # Create buckets
    bucket_range = (max_val - min_val) / num_buckets
    buckets = [[] for _ in range(num_buckets)]

    # Distribute into buckets
    for num in arr:
        idx = int((num - min_val) / bucket_range)
        idx = min(idx, num_buckets - 1)  # Handle max value
        buckets[idx].append(num)

    # Sort each bucket and concatenate
    result = []
    for bucket in buckets:
        bucket.sort()  # Use any sort for small buckets
        result.extend(bucket)

    return result

# For floating point [0, 1)
def bucket_sort_float(arr):
    n = len(arr)
    buckets = [[] for _ in range(n)]

    for num in arr:
        idx = int(n * num)
        idx = min(idx, n - 1)
        buckets[idx].append(num)

    result = []
    for bucket in buckets:
        bucket.sort()  # Insertion sort for small buckets
        result.extend(bucket)

    return result

# When to use:
# - Uniformly distributed data
# - Floating point in known range
# - When data fits in memory`}],c=[{signature:`Python sorted() and list.sort()`,description:`Timsort: hybrid merge+insertion. Stable, adaptive, O(n log n).`,complexity:`O(n log n)`,section:`Python Built-in`,example:`# sorted() - returns new list
arr = [3, 1, 4, 1, 5]
sorted_arr = sorted(arr)  # [1, 1, 3, 4, 5]
# Original arr unchanged

# list.sort() - in-place
arr = [3, 1, 4, 1, 5]
arr.sort()  # arr is now [1, 1, 3, 4, 5]

# Custom key function
words = ['banana', 'apple', 'Cherry']
sorted(words)                    # ['Cherry', 'apple', 'banana']
sorted(words, key=str.lower)     # ['apple', 'banana', 'Cherry']
sorted(words, key=len)           # ['apple', 'Cherry', 'banana']

# Reverse order
sorted([3, 1, 4], reverse=True)  # [4, 3, 1]

# Sort by multiple keys
people = [('Alice', 25), ('Bob', 30), ('Alice', 20)]
sorted(people)                              # By name, then age
sorted(people, key=lambda x: (x[1], x[0]))  # By age, then name
sorted(people, key=lambda x: (-x[1], x[0])) # Age desc, name asc

# itemgetter and attrgetter (faster)
from operator import itemgetter, attrgetter
sorted(people, key=itemgetter(1))     # By second element
sorted(objects, key=attrgetter('age'))  # By 'age' attribute`},{signature:`Custom Comparator`,description:`Use functools.cmp_to_key for custom comparison logic.`,complexity:`O(n log n)`,section:`Python Built-in`,example:`from functools import cmp_to_key

# Custom comparator: return negative, zero, or positive
def compare(a, b):
    if a < b:
        return -1
    elif a > b:
        return 1
    return 0

arr = [3, 1, 4]
sorted(arr, key=cmp_to_key(compare))

# Example: Largest number from array
def largest_number(nums):
    def compare(x, y):
        # Compare concatenations
        if x + y > y + x:
            return -1  # x should come first
        return 1

    nums = [str(n) for n in nums]
    nums.sort(key=cmp_to_key(compare))
    result = ''.join(nums)
    return '0' if result[0] == '0' else result

# Example: [3, 30, 34, 5, 9]
# "9534330" (9 > 5 > 34 > 3 > 30)

# Sort intervals by end time, then by start time
intervals = [[1, 3], [2, 3], [1, 2]]
def compare_intervals(a, b):
    if a[1] != b[1]:
        return a[1] - b[1]  # By end time
    return a[0] - b[0]      # Then by start time

sorted(intervals, key=cmp_to_key(compare_intervals))
# [[1, 2], [1, 3], [2, 3]]`}],l=[{signature:`Sort Colors (Dutch Flag)`,description:`Sort array with 3 distinct values. Three-pointer technique.`,complexity:`O(n)`,section:`Special Sorting`,example:`def sort_colors(nums):
    # Dutch National Flag algorithm
    low, mid, high = 0, 0, len(nums) - 1

    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:  # nums[mid] == 2
            nums[high], nums[mid] = nums[mid], nums[high]
            high -= 1
            # Don't increment mid - need to check swapped value

    return nums

# Example: [2, 0, 2, 1, 1, 0]
# Result: [0, 0, 1, 1, 2, 2]

# Generalized: Sort with K colors
def sort_k_colors(nums, k):
    for color in range(1, k):
        # Partition: color vs rest
        left = 0
        for i in range(len(nums)):
            if nums[i] == color:
                nums[left], nums[i] = nums[i], nums[left]
                left += 1`},{signature:`Merge Intervals`,description:`Merge overlapping intervals after sorting.`,complexity:`O(n log n)`,section:`Special Sorting`,example:`def merge_intervals(intervals):
    if not intervals:
        return []

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    result = [intervals[0]]

    for start, end in intervals[1:]:
        # If overlapping with last, merge
        if start <= result[-1][1]:
            result[-1][1] = max(result[-1][1], end)
        else:
            result.append([start, end])

    return result

# Example: [[1,3], [2,6], [8,10], [15,18]]
# Output: [[1,6], [8,10], [15,18]]

# Insert and merge
def insert_interval(intervals, new):
    result = []
    i = 0
    n = len(intervals)

    # Add all before new interval
    while i < n and intervals[i][1] < new[0]:
        result.append(intervals[i])
        i += 1

    # Merge overlapping
    while i < n and intervals[i][0] <= new[1]:
        new[0] = min(new[0], intervals[i][0])
        new[1] = max(new[1], intervals[i][1])
        i += 1
    result.append(new)

    # Add remaining
    result.extend(intervals[i:])
    return result`}],u=[...o,...s,...c,...l],d=[...a,...u],f=[{signature:`Why use Binary Search?`,description:`O(log n) search in sorted data. Halve search space each step. Use when data is sorted or answer has monotonic property.`,complexity:`Concept`,section:`Why & When`,example:`# BINARY SEARCH = Divide and conquer
# O(log n) because we halve search space each step

# REQUIREMENTS:
# 1. Data must be SORTED (or have monotonic property)
# 2. Random access (arrays, not linked lists)

# PATTERN:
# left, right = 0, n-1
# while left <= right (or left < right):
#     mid = (left + right) // 2
#     if condition:
#         left = mid + 1
#     else:
#         right = mid - 1

# USE CASES:
# - Search in sorted array
# - Find insertion position
# - Search in rotated array
# - Find peak element
# - Minimize/maximize with constraint
# - Square root, nth root`},{signature:`Binary Search Variants`,description:`Three variants: exact match, left boundary, right boundary. Know when to use each.`,complexity:`O(log n)`,section:`Why & When`,example:`# VARIANT 1: Find exact match
# while left <= right
# Return mid when found

# VARIANT 2: Find leftmost (first occurrence)
# while left < right
# right = mid (not mid - 1)
# Returns first position where condition is true

# VARIANT 3: Find rightmost (last occurrence)
# while left < right
# left = mid (with ceiling division)
# Returns last position where condition is true

# BISECT MODULE (Python's binary search)
from bisect import bisect_left, bisect_right

arr = [1, 2, 2, 2, 3, 4]
# bisect_left: leftmost position to insert (first >= x)
# bisect_right: rightmost position to insert (first > x)
print(bisect_left(arr, 2))   # 1 (first 2)
print(bisect_right(arr, 2))  # 4 (after last 2)`},{signature:`Basic Binary Search`,description:`Find exact target. Return index or -1 if not found.`,complexity:`O(log n)`,section:`Basic Binary Search`,example:`def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1  # Not found

# Example
arr = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(arr, 7))   # 3
print(binary_search(arr, 6))   # -1

# Using bisect
from bisect import bisect_left
def binary_search_bisect(arr, target):
    i = bisect_left(arr, target)
    if i < len(arr) and arr[i] == target:
        return i
    return -1`},{signature:`Left-most Insertion Point`,description:`Find first position >= target. Works with duplicates.`,complexity:`O(log n)`,section:`Boundary Finding`,example:`def bisect_left(arr, target):
    left, right = 0, len(arr)

    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid  # Don't skip potential answer

    return left

# Example with duplicates
arr = [1, 2, 2, 2, 3, 4]
print(bisect_left(arr, 2))  # 1 (first 2)
print(bisect_left(arr, 2.5))  # 4 (where 2.5 would go)

# Find first occurrence
def first_occurrence(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left if left < len(arr) and arr[left] == target else -1`},{signature:`Right-most Insertion Point`,description:`Find first position > target. Insert after last duplicate.`,complexity:`O(log n)`,section:`Boundary Finding`,example:`def bisect_right(arr, target):
    left, right = 0, len(arr)

    while left < right:
        mid = (left + right) // 2
        if arr[mid] <= target:  # Note: <= not <
            left = mid + 1
        else:
            right = mid

    return left

# Example with duplicates
arr = [1, 2, 2, 2, 3, 4]
print(bisect_right(arr, 2))  # 4 (after last 2)

# Find last occurrence
def last_occurrence(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] <= target:
            left = mid + 1
        else:
            right = mid
    return left - 1 if left > 0 and arr[left - 1] == target else -1

# Count occurrences
def count_occurrences(arr, target):
    from bisect import bisect_left, bisect_right
    return bisect_right(arr, target) - bisect_left(arr, target)`}],p=[{signature:`Recognizing "search on the answer" problems`,description:`Not searching in array - searching for optimal value. Pattern: "minimum X where condition" or "maximum X where condition". Binary search on answer space.`,complexity:`Concept`,section:`Why & When`,example:`# PATTERN: Can you binary search the ANSWER?

# Example: Koko eating bananas
# "Find MINIMUM speed to finish in h hours"
# → Binary search speeds [1...max(piles)]

# Recognition signals:
# 1. "Minimum X where..." → search for minimum
# 2. "Maximum X where..." → search for maximum
# 3. Can check if X works? → condition(X)
# 4. Monotonic: If X works, X+1 works (or vice versa)

# TEMPLATE 1: Find minimum where condition true
def min_where_true(lo, hi, condition):
    # Find min X where condition(X) = True
    # False False False True True True
    #                   ^answer
    while lo < hi:
        mid = (lo + hi) // 2
        if condition(mid):
            hi = mid  # Try smaller
        else:
            lo = mid + 1
    return lo

# TEMPLATE 2: Find maximum where condition true
def max_where_true(lo, hi, condition):
    # Find max X where condition(X) = True
    # True True True False False False
    #             ^answer
    while lo < hi:
        mid = (lo + hi + 1) // 2  # CEILING!
        if condition(mid):
            lo = mid  # Try larger
        else:
            hi = mid - 1
    return lo

# Real examples:
# - Koko bananas: min speed → Template 1
# - Ship packages: min capacity → Template 1
# - Split array: min largest sum → Template 1
# - Magnetic force: max distance → Template 2

# Non-examples (regular binary search):
# - Find target in sorted array
# - Search rotated array
# These search IN array, not on answer space`},{signature:`Binary search pitfalls - off-by-one and infinite loops`,description:`Common bugs: wrong mid calculation, wrong bounds update, infinite loop. Memorize templates to avoid mistakes.`,complexity:`Concept`,section:`Why & When`,example:`# PITFALL 1: Overflow in mid calculation
mid = (left + right) // 2  # Can overflow!
# Better:
mid = left + (right - left) // 2

# Python: No overflow, both work
# C/C++/Java: Use left + (right - left) // 2

# PITFALL 2: Infinite loop - wrong ceiling
def buggy_max_search(lo, hi):
    while lo < hi:
        mid = (lo + hi) // 2  # FLOOR! Wrong for max search
        if condition(mid):
            lo = mid  # Infinite loop when lo=mid
        else:
            hi = mid - 1
    return lo

# Fix: Use ceiling for max search
mid = (lo + hi + 1) // 2  # CEILING!

# PITFALL 3: Wrong boundary update
while left <= right:  # Inclusive
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        left = mid  # BUG! Should be mid + 1
    else:
        right = mid  # BUG! Should be mid - 1
# Creates infinite loop!

# PITFALL 4: Off-by-one in range
def find_insert_position(arr, target):
    left, right = 0, len(arr)  # Exclusive right
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left  # Correct!

# vs bisect_left pattern (same result):
left, right = 0, len(arr)  # NOT len(arr) - 1

# SAFEGUARDS:
# 1. Use proven templates (above)
# 2. Check loop invariant
# 3. Test with small examples
# 4. Verify lo < hi vs lo <= hi choice

# Debugging: Add assertion
assert left <= right, "Invalid state!"`},{signature:`bisect module - when to use vs custom binary search`,description:`Use bisect for simple find/insert. Write custom for complex conditions, non-comparable types, or "search on answer" problems.`,complexity:`Concept`,section:`Why & When`,example:`from bisect import bisect_left, bisect_right, insort

# USE BISECT WHEN:
# 1. Simple find/insert in sorted list
arr = [1, 3, 5, 7, 9]
idx = bisect_left(arr, 6)  # 3
insort(arr, 6)  # [1, 3, 5, 6, 7, 9]

# 2. Count occurrences
count = bisect_right(arr, 5) - bisect_left(arr, 5)

# 3. Range queries
def count_in_range(arr, lo, hi):
    return bisect_right(arr, hi) - bisect_left(arr, lo)

# WRITE CUSTOM WHEN:
# 1. Search on answer (not in array)
def min_speed(piles, h):
    # Searching speed space, not piles!
    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_finish(mid, piles, h):
            hi = mid
        else:
            lo = mid + 1
    return lo

# 2. Complex condition
def search_rotated(nums, target):
    # Array not sorted, bisect won't work
    # Need custom logic for rotation

# 3. Non-comparable types
# bisect needs __lt__ defined
# Custom search can use custom comparison

# 4. Need both index AND value
# bisect only returns index

# bisect GOTCHA: O(n) insert!
for x in data:
    insort(arr, x)  # O(n²) total!
# Better: arr.extend(data); arr.sort()

# bisect LIMITATION: No key function before 3.10
# Python 3.10+:
bisect_left(arr, x, key=lambda v: v.lower())
# Before 3.10: transform array first

# PERFORMANCE:
# bisect: ~5-10 ns overhead (C implementation)
# Custom: ~50-100 ns overhead (Python)
# For 1M array: both ~20 comparisons
# Difference negligible!`}],m=[{signature:`Binary Search for Minimum`,description:`Find minimum value satisfying condition. Search on answer space.`,complexity:`O(log(range) * check)`,section:`Greedy Binary Search`,example:`# TEMPLATE: Find MINIMUM x where condition(x) is True
# Condition transitions from False...False to True...True
def binary_search_min(lo, hi, condition):
    while lo < hi:
        mid = (lo + hi) // 2
        if condition(mid):
            hi = mid  # Maybe we can do smaller
        else:
            lo = mid + 1  # Need larger
    return lo

# Example: Koko Eating Bananas
# Find minimum speed to finish in h hours
def min_eating_speed(piles, h):
    def can_finish(speed):
        hours = sum((p + speed - 1) // speed for p in piles)
        return hours <= h

    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_finish(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo

# Capacity to Ship Within D Days
def ship_within_days(weights, days):
    def can_ship(capacity):
        d, curr = 1, 0
        for w in weights:
            if curr + w > capacity:
                d += 1
                curr = 0
            curr += w
        return d <= days

    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_ship(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo`},{signature:`Binary Search for Maximum`,description:`Find maximum value satisfying condition. Search on answer space.`,complexity:`O(log(range) * check)`,section:`Greedy Binary Search`,example:`# TEMPLATE: Find MAXIMUM x where condition(x) is True
# Condition transitions from True...True to False...False
def binary_search_max(lo, hi, condition):
    while lo < hi:
        mid = (lo + hi + 1) // 2  # Ceiling division!
        if condition(mid):
            lo = mid  # Maybe we can do larger
        else:
            hi = mid - 1  # Need smaller
    return lo

# Example: Maximum length of subarray with sum <= target
def max_subarray_length(arr, target):
    def can_achieve(length):
        # Check if any subarray of this length has sum <= target
        window_sum = sum(arr[:length])
        if window_sum <= target:
            return True
        for i in range(length, len(arr)):
            window_sum += arr[i] - arr[i - length]
            if window_sum <= target:
                return True
        return False

    lo, hi = 0, len(arr)
    while lo < hi:
        mid = (lo + hi + 1) // 2
        if can_achieve(mid):
            lo = mid
        else:
            hi = mid - 1
    return lo`}],h=[{signature:`Search in Rotated Sorted Array`,description:`One half is always sorted. Check which half, then decide direction.`,complexity:`O(log n)`,section:`Special Problems`,example:`def search_rotated(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2

        if nums[mid] == target:
            return mid

        # Left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1

# Example: [4,5,6,7,0,1,2], target=0 -> returns 4

# Find minimum in rotated array
def find_min_rotated(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid
    return nums[left]`},{signature:`Find Peak Element`,description:`Element greater than neighbors. Binary search works because peak always exists.`,complexity:`O(log n)`,section:`Special Problems`,example:`def find_peak_element(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = (left + right) // 2

        if nums[mid] < nums[mid + 1]:
            # Rising slope, peak is to the right
            left = mid + 1
        else:
            # Falling slope, peak is at mid or left
            right = mid

    return left

# Why this works:
# - If we're on rising slope -> peak must be to the right
# - If we're on falling slope -> peak must be at mid or left
# - Eventually converges to a peak

# Example: [1,2,3,1] -> returns 2 (index of 3)
# Example: [1,2,1,3,5,6,4] -> returns 1 or 5`},{signature:`Search 2D Matrix`,description:`Treat 2D matrix as sorted 1D array. Or start from corner.`,complexity:`O(log(m*n))`,section:`Special Problems`,example:`# Matrix where each row is sorted and
# first element of row > last element of previous row
def search_matrix(matrix, target):
    m, n = len(matrix), len(matrix[0])
    left, right = 0, m * n - 1

    while left <= right:
        mid = (left + right) // 2
        # Convert 1D index to 2D
        row, col = mid // n, mid % n
        val = matrix[row][col]

        if val == target:
            return True
        elif val < target:
            left = mid + 1
        else:
            right = mid - 1

    return False

# Matrix where rows and columns are sorted
# (but not flattened sorted)
def search_matrix_ii(matrix, target):
    if not matrix:
        return False

    # Start from top-right corner
    row, col = 0, len(matrix[0]) - 1

    while row < len(matrix) and col >= 0:
        if matrix[row][col] == target:
            return True
        elif matrix[row][col] > target:
            col -= 1  # Eliminate column
        else:
            row += 1  # Eliminate row

    return False  # O(m + n)`},{signature:`Square Root`,description:`Binary search on answer. Find largest x where x*x <= n.`,complexity:`O(log n)`,section:`Special Problems`,example:`def sqrt(n):
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

    return right  # Largest where mid*mid <= n

# With precision (for decimal)
def sqrt_decimal(n, precision=0.0001):
    left, right = 0.0, n

    while right - left > precision:
        mid = (left + right) / 2
        if mid * mid <= n:
            left = mid
        else:
            right = mid

    return left

# Newton's method (faster)
def sqrt_newton(n):
    x = n
    while x * x > n:
        x = (x + n // x) // 2
    return x`},{signature:`Find First and Last Position`,description:`Use bisect_left and bisect_right, or two binary searches.`,complexity:`O(log n)`,section:`Special Problems`,example:`def search_range(nums, target):
    def find_left():
        left, right = 0, len(nums)
        while left < right:
            mid = (left + right) // 2
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid
        return left

    def find_right():
        left, right = 0, len(nums)
        while left < right:
            mid = (left + right) // 2
            if nums[mid] <= target:
                left = mid + 1
            else:
                right = mid
        return left

    left_idx = find_left()
    if left_idx == len(nums) or nums[left_idx] != target:
        return [-1, -1]

    return [left_idx, find_right() - 1]

# Using bisect
from bisect import bisect_left, bisect_right
def search_range_bisect(nums, target):
    left = bisect_left(nums, target)
    if left == len(nums) or nums[left] != target:
        return [-1, -1]
    right = bisect_right(nums, target) - 1
    return [left, right]`}],g=[{signature:`bisect Module Functions`,description:`Python built-in binary search. bisect_left, bisect_right, insort.`,complexity:`O(log n)`,section:`Python bisect`,example:`from bisect import bisect_left, bisect_right, insort

arr = [1, 3, 3, 3, 5, 7]

# bisect_left: First position where x can be inserted
print(bisect_left(arr, 3))   # 1 (before first 3)
print(bisect_left(arr, 4))   # 4 (between 3s and 5)

# bisect_right: Last position where x can be inserted
print(bisect_right(arr, 3))  # 4 (after last 3)

# insort: Insert and maintain sorted order
insort(arr, 4)  # [1, 3, 3, 3, 4, 5, 7]

# Custom comparison (Python 3.10+)
# bisect_left(arr, x, key=lambda v: v.lower())

# For older Python, transform the array
keys = [v.lower() for v in strings]
i = bisect_left(keys, target.lower())

# Count elements in range [lo, hi]
def count_in_range(arr, lo, hi):
    return bisect_right(arr, hi) - bisect_left(arr, lo)`}],_=[...p,...m,...h,...g],v=[...f,..._],y=[{signature:`Why use Two Pointers?`,description:`Two pointers reduce O(n²) brute force to O(n) by avoiding redundant comparisons. Essential pattern for array/string problems.`,complexity:`Concept`,section:`Why & When`,example:`# TWO POINTERS = O(n) instead of O(n²)
# Use when: searching pairs, comparing from both ends,
# merging sorted arrays, or checking palindromes

# BRUTE FORCE O(n²) - check all pairs
def two_sum_brute(arr, target):
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] + arr[j] == target:
                return [i, j]
    return []

# TWO POINTERS O(n) - for SORTED array
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1    # Need larger sum
        else:
            right -= 1   # Need smaller sum
    return []`},{signature:`Two Pointer Patterns`,description:`Three main patterns: opposite ends (sorted array), same direction (fast/slow), and two inputs (merge).`,complexity:`Concept`,section:`Why & When`,example:`# PATTERN 1: Opposite Ends
# Start: left=0, right=n-1, move toward each other
# Use for: sorted array problems, palindrome check

# PATTERN 2: Same Direction (Fast/Slow)
# Start: both at 0, fast moves ahead
# Use for: remove duplicates, find cycle, partition

# PATTERN 3: Two Inputs
# Start: one pointer per array
# Use for: merge sorted arrays, compare sequences

# CHOOSING THE RIGHT PATTERN:
# - Sorted array + find pair? -> Opposite ends
# - Remove in-place? -> Same direction
# - Merge two arrays? -> Two inputs
# - Find cycle? -> Fast/slow (tortoise and hare)`},{signature:`Two pointers: opposite ends`,description:`Pointers start at opposite ends, move toward center based on condition. Classic for sorted arrays.`,complexity:`O(n)`,section:`Opposite Ends`,example:`def fn(arr):
    left = 0
    right = len(arr) - 1
    ans = 0

    while left < right:
        # Do some logic with arr[left] and arr[right]
        if CONDITION:
            left += 1
        else:
            right -= 1

    return ans

# EXAMPLE: Two Sum in Sorted Array
def two_sum(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        s = numbers[left] + numbers[right]
        if s == target:
            return [left + 1, right + 1]  # 1-indexed
        elif s < target:
            left += 1
        else:
            right -= 1
    return []

# EXAMPLE: Container With Most Water
def max_area(height):
    left, right = 0, len(height) - 1
    max_water = 0
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_water`},{signature:`Palindrome Check`,description:`Classic opposite-ends pattern. Compare characters from both ends moving inward.`,complexity:`O(n)`,section:`Opposite Ends`,example:`def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

# With alphanumeric filter
def is_palindrome_alnum(s):
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True

# Valid Palindrome II (can delete one char)
def valid_palindrome_ii(s):
    def is_pali(l, r):
        while l < r:
            if s[l] != s[r]:
                return False
            l += 1
            r -= 1
        return True

    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            # Try skipping left or right
            return is_pali(left+1, right) or is_pali(left, right-1)
        left += 1
        right -= 1
    return True`},{signature:`Three Sum`,description:`Fix one element, use two pointers on remainder. Sort first to enable the pattern.`,complexity:`O(n²)`,section:`Opposite Ends`,example:`def three_sum(nums):
    nums.sort()  # Must sort first!
    result = []

    for i in range(len(nums) - 2):
        # Skip duplicates for first element
        if i > 0 and nums[i] == nums[i-1]:
            continue

        # Two pointers for remaining pair
        left, right = i + 1, len(nums) - 1
        target = -nums[i]

        while left < right:
            s = nums[left] + nums[right]
            if s == target:
                result.append([nums[i], nums[left], nums[right]])
                # Skip duplicates
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1
                right -= 1
            elif s < target:
                left += 1
            else:
                right -= 1

    return result`},{signature:`Two pointers: same direction`,description:`Both pointers move in same direction. Fast pointer explores, slow tracks position to modify.`,complexity:`O(n)`,section:`Same Direction`,example:`def fn(arr):
    slow = 0
    for fast in range(len(arr)):
        if CONDITION:
            # Do something with slow
            arr[slow] = arr[fast]  # Often used for in-place
            slow += 1
    return slow  # Often return slow as new length

# EXAMPLE: Remove Duplicates from Sorted Array
def remove_duplicates(nums):
    if not nums:
        return 0
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1  # Length of unique elements

# EXAMPLE: Move Zeroes
def move_zeroes(nums):
    slow = 0
    for fast in range(len(nums)):
        if nums[fast] != 0:
            nums[slow], nums[fast] = nums[fast], nums[slow]
            slow += 1`},{signature:`Remove Element In-Place`,description:`Slow pointer marks write position, fast pointer scans all elements.`,complexity:`O(n)`,section:`Same Direction`,example:`def remove_element(nums, val):
    slow = 0
    for fast in range(len(nums)):
        if nums[fast] != val:
            nums[slow] = nums[fast]
            slow += 1
    return slow

# Remove duplicates (allow at most k duplicates)
def remove_duplicates_k(nums, k=2):
    if len(nums) <= k:
        return len(nums)
    slow = k
    for fast in range(k, len(nums)):
        if nums[fast] != nums[slow - k]:
            nums[slow] = nums[fast]
            slow += 1
    return slow

# Partition array (Dutch National Flag)
def sort_colors(nums):
    # 0s go to left, 2s go to right, 1s stay middle
    left, mid, right = 0, 0, len(nums) - 1
    while mid <= right:
        if nums[mid] == 0:
            nums[left], nums[mid] = nums[mid], nums[left]
            left += 1
            mid += 1
        elif nums[mid] == 2:
            nums[mid], nums[right] = nums[right], nums[mid]
            right -= 1
        else:
            mid += 1`},{signature:`Two pointers: two inputs`,description:`One pointer per array, process both arrays in a single pass. Classic for merging.`,complexity:`O(n+m)`,section:`Fixed Window`,example:`def fn(arr1, arr2):
    i = j = 0
    ans = []

    while i < len(arr1) and j < len(arr2):
        if CONDITION:
            # Process arr1[i]
            i += 1
        else:
            # Process arr2[j]
            j += 1

    # Don't forget remaining elements!
    while i < len(arr1):
        # Process remaining arr1
        i += 1
    while j < len(arr2):
        # Process remaining arr2
        j += 1

    return ans

# EXAMPLE: Merge Sorted Arrays
def merge(nums1, m, nums2, n):
    # Merge from the end to avoid overwriting
    i, j, k = m - 1, n - 1, m + n - 1
    while i >= 0 and j >= 0:
        if nums1[i] > nums2[j]:
            nums1[k] = nums1[i]
            i -= 1
        else:
            nums1[k] = nums2[j]
            j -= 1
        k -= 1
    # Copy remaining nums2 elements
    while j >= 0:
        nums1[k] = nums2[j]
        j -= 1
        k -= 1`},{signature:`Is Subsequence`,description:`Check if s is subsequence of t. Two pointers, one per string.`,complexity:`O(n)`,section:`Fixed Window`,example:`def is_subsequence(s, t):
    i = j = 0
    while i < len(s) and j < len(t):
        if s[i] == t[j]:
            i += 1
        j += 1
    return i == len(s)

# Example: is "ace" subsequence of "abcde"?
# s: a c e
# t: a b c d e
#    ^   ^   ^  -> Yes, found all of s in order

# Intersection of Two Arrays
def intersection(nums1, nums2):
    nums1.sort()
    nums2.sort()
    i = j = 0
    result = []

    while i < len(nums1) and j < len(nums2):
        if nums1[i] < nums2[j]:
            i += 1
        elif nums1[i] > nums2[j]:
            j += 1
        else:
            if not result or result[-1] != nums1[i]:
                result.append(nums1[i])
            i += 1
            j += 1

    return result`}],b=[{signature:`When to use sliding window`,description:`Pattern: contiguous subarray/substring problems with "longest/shortest/count with condition". Recognize by: O(n) possible, window state trackable.`,complexity:`Concept`,section:`Why & When`,example:`# SLIDING WINDOW SIGNALS:
# 1. "Longest/shortest/count SUBARRAY/SUBSTRING"
# 2. Contiguous elements (no gaps)
# 3. Condition on window state (sum, unique chars, etc.)

# USE SLIDING WINDOW:
# - Longest substring without repeating
# - Minimum window with all chars
# - Max sum of k consecutive
# - Count subarrays with sum = k

# DON'T USE (use other techniques):
# - Subsequence problems (not contiguous) → DP
# - Global optimization → DP or greedy
# - Multiple non-overlapping windows → DP

# Example decision:
# "Longest increasing SUBSTRING" → Sliding window
# "Longest increasing SUBSEQUENCE" → DP (not contiguous)

# PERFORMANCE:
# Sliding window: O(n) single pass
# Nested loops: O(n²) check all subarrays
# For n = 10,000:
# Sliding: 10k ops (~1ms)
# Nested: 100M ops (~100ms)

# WHEN IT DOESN'T WORK:
# Problem: "Find max sum of k non-consecutive elements"
# → Can't use window (elements not contiguous)
# → Use DP or greedy instead`},{signature:`Fixed vs variable window - when to use each`,description:`Fixed window: size k known upfront, slide by 1. Variable window: grow right, shrink left when invalid. Fixed is simpler.`,complexity:`Concept`,section:`Why & When`,example:`# FIXED WINDOW - size k given
# Pattern: "...of k consecutive elements"
def max_sum_k_elements(arr, k):
    # Window size = k (constant)
    window = sum(arr[:k])
    ans = window
    for i in range(k, len(arr)):
        window += arr[i] - arr[i-k]  # Slide
        ans = max(ans, window)
    return ans

# Use when:
# - "k consecutive"
# - "every k elements"
# - "within k distance"

# VARIABLE WINDOW - size adjusts
# Pattern: "longest/shortest with condition"
def longest_sum_at_most_k(arr, k):
    # Window size varies
    left = 0
    curr_sum = 0
    ans = 0
    for right in range(len(arr)):
        curr_sum += arr[right]
        while curr_sum > k:  # Shrink
            curr_sum -= arr[left]
            left += 1
        ans = max(ans, right - left + 1)
    return ans

# Use when:
# - "longest/shortest with..."
# - "maximum/minimum satisfying..."
# - Window size not fixed

# COMPLEXITY:
# Fixed: Always O(n) - clear single pass
# Variable: O(n) but left pointer resets
# Both right and left visit each element once!

# GOTCHA: Variable window looks O(n²)
# while curr_sum > k:  # Inner loop?
#     left += 1
# NO! left only moves right, never resets
# Total iterations: n (not n²)`},{signature:`The "at most k" trick for exact k`,description:`Problem: exactly k. Solution: at_most(k) - at_most(k-1). Works because monotonic: at_most increases with k.`,complexity:`Concept`,section:`Why & When`,example:`# PATTERN: Count subarrays with EXACTLY k X

# Direct approach: Hard to track exact k
# Trick: exactly(k) = at_most(k) - at_most(k-1)

# Example: Exactly k distinct elements
def exactly_k_distinct(arr, k):
    return at_most_k(arr, k) - at_most_k(arr, k-1)

def at_most_k(arr, k):
    count = {}
    left = 0
    result = 0
    for right in range(len(arr)):
        count[arr[right]] = count.get(arr[right], 0) + 1
        while len(count) > k:  # Shrink
            count[arr[left]] -= 1
            if count[arr[left]] == 0:
                del count[arr[left]]
            left += 1
        result += right - left + 1  # All subarrays
    return result

# WHY THIS WORKS:
# at_most(k) = {windows with ≤k distinct}
# at_most(k-1) = {windows with ≤k-1 distinct}
# Difference = {windows with exactly k distinct}

# WHEN TO USE:
# - "exactly k distinct/unique/different"
# - "sum exactly equals k" (use prefix sum instead!)
# - Any "exactly" that's easier as "at most"

# LIMITATIONS:
# Doesn't work for:
# - Non-monotonic conditions
# - Complex "exactly" constraints
# - When at_most is hard to compute

# SIMILAR TRICK:
# exactly(k) = at_least(k) - at_least(k+1)
# Use whichever is easier to implement!`},{signature:`Sliding Window Pattern`,description:`Window expands right, contracts left when condition breaks. O(n) for subarray/substring problems.`,complexity:`O(n)`,section:`Variable Window`,example:`# SLIDING WINDOW TEMPLATE
def fn(arr):
    left = 0
    window = {}  # or other state
    ans = 0

    for right in range(len(arr)):
        # Add arr[right] to window

        while WINDOW_INVALID:  # Contract from left
            # Remove arr[left] from window
            left += 1

        # Update ans (window is now valid)
        ans = max(ans, right - left + 1)

    return ans

# WHEN TO USE:
# - Contiguous subarray/substring
# - "Find longest/shortest with condition"
    # - "Find number of subarrays with..."`},{signature:`Fixed Size Window`,description:`Window size is fixed. Slide by adding right and removing left simultaneously.`,complexity:`O(n)`,section:`Variable Window`,example:`# Max sum of k consecutive elements
def max_sum_k(arr, k):
    if len(arr) < k:
        return 0

    # Initial window
    window_sum = sum(arr[:k])
    max_sum = window_sum

    # Slide window
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]  # Add right, remove left
        max_sum = max(max_sum, window_sum)

    return max_sum

# Check if array contains duplicate within k distance
def contains_nearby_duplicate(nums, k):
    window = set()
    for i, num in enumerate(nums):
        if num in window:
            return True
        window.add(num)
        if i >= k:
            window.remove(nums[i - k])
    return False`},{signature:`Variable Size Window`,description:`Window grows/shrinks based on condition. Track state as window changes.`,complexity:`O(n)`,section:`Variable Window`,example:`# Longest Substring Without Repeating Characters
def length_of_longest_substring(s):
    char_set = set()
    left = 0
    max_len = 0

    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)

    return max_len

# Minimum Size Subarray Sum >= target
def min_subarray_len(target, nums):
    left = 0
    curr_sum = 0
    min_len = float('inf')

    for right in range(len(nums)):
        curr_sum += nums[right]

        while curr_sum >= target:
            min_len = min(min_len, right - left + 1)
            curr_sum -= nums[left]
            left += 1

    return min_len if min_len != float('inf') else 0`},{signature:`Number of Subarrays (Exact Criteria)`,description:`Count subarrays where condition exactly equals k. Use "at most k" minus "at most k-1" trick.`,complexity:`O(n)`,section:`Prefix Sum`,example:`# Subarrays with exactly k distinct =
# at_most(k) - at_most(k-1)

def subarrays_with_k_distinct(nums, k):
    def at_most(k):
        count = {}
        left = 0
        result = 0

        for right in range(len(nums)):
            count[nums[right]] = count.get(nums[right], 0) + 1

            while len(count) > k:
                count[nums[left]] -= 1
                if count[nums[left]] == 0:
                    del count[nums[left]]
                left += 1

            result += right - left + 1

        return result

    return at_most(k) - at_most(k - 1)

# WHY right - left + 1?
# For window [left, right], count all subarrays ending at right:
# [left..right], [left+1..right], ..., [right]
# That's (right - left + 1) subarrays`},{signature:`Prefix Sum Pattern`,description:`Precompute cumulative sums. Query any range sum in O(1) after O(n) preprocessing.`,complexity:`O(n) build, O(1) query`,section:`Prefix Sum`,example:`# BUILD PREFIX SUM
def build_prefix(arr):
    prefix = [0]
    for num in arr:
        prefix.append(prefix[-1] + num)
    return prefix

# QUERY RANGE SUM [i, j] inclusive
def range_sum(prefix, i, j):
    return prefix[j + 1] - prefix[i]

# Example:
# arr =    [1, 2, 3, 4, 5]
# prefix = [0, 1, 3, 6, 10, 15]
# sum(1,3) = prefix[4] - prefix[1] = 10 - 1 = 9

# TEMPLATE
def fn(arr):
    prefix = [0]
    for num in arr:
        prefix.append(prefix[-1] + num)

    ans = 0
    for i in range(len(arr)):
        for j in range(i, len(arr)):
            # Sum from i to j
            subarray_sum = prefix[j + 1] - prefix[i]
            # Do something with subarray_sum
    return ans`},{signature:`Subarray Sum Equals K`,description:`Use hash map to find prefix sums that differ by k. Count subarrays in O(n).`,complexity:`O(n)`,section:`Prefix Sum`,example:`def subarray_sum(nums, k):
    # prefix[j] - prefix[i] = k means sum(i, j-1) = k
    # For each prefix[j], count how many prefix[i] = prefix[j] - k

    count = {0: 1}  # Empty prefix has sum 0
    curr_sum = 0
    result = 0

    for num in nums:
        curr_sum += num
        # How many previous prefixes give us sum = k?
        if curr_sum - k in count:
            result += count[curr_sum - k]
        count[curr_sum] = count.get(curr_sum, 0) + 1

    return result

# Example: nums = [1, 2, 3], k = 3
# prefix sums: 0, 1, 3, 6
# At sum=3: check if 3-3=0 exists -> Yes (1 time)
# At sum=6: check if 6-3=3 exists -> Yes (1 time)
# Answer: 2 subarrays ([1,2] and [3])`},{signature:`Efficient String Building`,description:`Strings are immutable. Use list + join() instead of += concatenation in loops.`,complexity:`O(n) vs O(n²)`,section:`Prefix Sum`,example:`# BAD - O(n²) due to string immutability
def build_string_bad(chars):
    result = ""
    for c in chars:
        result += c  # Creates new string each time!
    return result

# GOOD - O(n) using list
def build_string_good(chars):
    result = []
    for c in chars:
        result.append(c)  # O(1) amortized
    return "".join(result)  # O(n) once

# WHY += IS SLOW:
# "a" + "b" creates new string "ab"
# "ab" + "c" creates new string "abc"
# Each step copies all previous characters!
# Total: 1 + 2 + 3 + ... + n = O(n²)

# COMMON PATTERNS:
# Transform chars
s = "hello"
result = "".join(c.upper() for c in s)

# Filter chars
result = "".join(c for c in s if c.isalpha())

# Reverse string
result = "".join(reversed(s))  # or s[::-1]`}],x=[...y,...b],S=[{signature:`Why use Backtracking?`,description:`Explore all possible solutions by building incrementally and abandoning paths that fail constraints. Use for: permutations, combinations, subsets, constraint satisfaction.`,complexity:`Concept`,section:`Why & When`,example:`# BACKTRACKING = DFS with pruning
# "Try something, if it doesn't work, undo and try another"

# USE CASES:
# - Generate all permutations/combinations
# - Subset generation
# - N-Queens problem
# - Sudoku solver
# - Word search in grid
# - Partition problems
# - Graph coloring

# TEMPLATE:
def backtrack(state, choices):
    if is_solution(state):
        result.append(state.copy())
        return

    for choice in choices:
        if is_valid(choice, state):
            make_choice(state, choice)  # Try
            backtrack(state, new_choices)
            undo_choice(state, choice)  # Backtrack

# Explore the solution space as a tree
# Prune branches that can't lead to valid solutions`},{signature:`Backtracking vs DP vs Greedy`,description:`Backtracking explores all paths. DP stores subproblem results. Greedy makes locally optimal choices.`,complexity:`Concept`,section:`Why & When`,example:`# WHEN TO USE EACH:

# BACKTRACKING:
# - Need ALL solutions (not just optimal)
# - Constraint satisfaction
# - Can't use memoization (no overlapping subproblems)
# - O(k^n) or worse typically

# DYNAMIC PROGRAMMING:
# - Need optimal solution
# - Overlapping subproblems exist
# - Can define recurrence relation
# - O(n*k) typically

# GREEDY:
# - Local optimal leads to global optimal
# - Can prove greedy choice property
# - O(n log n) typically

# EXAMPLES:
# - Find ONE shortest path -> BFS/Dijkstra
# - Find ALL paths -> Backtracking
# - Find number of paths -> DP
# - Generate all subsets -> Backtracking`},{signature:`Subsets (Power Set)`,description:`Generate all 2^n subsets. Include/exclude each element.`,complexity:`O(2^n)`,section:`Subsets & Combinations`,example:`def subsets(nums):
    result = []

    def backtrack(start, path):
        result.append(path[:])  # Add current subset

        for i in range(start, len(nums)):
            path.append(nums[i])      # Include
            backtrack(i + 1, path)    # Recurse
            path.pop()                # Exclude (backtrack)

    backtrack(0, [])
    return result

# Example: [1, 2, 3]
# Output: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]

# Iterative approach
def subsets_iterative(nums):
    result = [[]]
    for num in nums:
        result += [curr + [num] for curr in result]
    return result

# Bit manipulation approach
def subsets_bits(nums):
    n = len(nums)
    result = []
    for mask in range(1 << n):  # 0 to 2^n - 1
        subset = [nums[i] for i in range(n) if mask & (1 << i)]
        result.append(subset)
    return result`},{signature:`Subsets with Duplicates`,description:`Generate unique subsets when input has duplicates. Sort and skip consecutive duplicates.`,complexity:`O(2^n)`,section:`Subsets & Combinations`,example:`def subsets_with_dup(nums):
    result = []
    nums.sort()  # Sort to handle duplicates

    def backtrack(start, path):
        result.append(path[:])

        for i in range(start, len(nums)):
            # Skip duplicates at same level
            if i > start and nums[i] == nums[i - 1]:
                continue

            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()

    backtrack(0, [])
    return result

# Example: [1, 2, 2]
# Output: [[], [1], [1,2], [1,2,2], [2], [2,2]]
# Note: [2] appears once, not twice`},{signature:`Combinations`,description:`Generate all C(n,k) combinations. Choose k elements from n.`,complexity:`O(C(n,k))`,section:`Subsets & Combinations`,example:`def combinations(n, k):
    result = []

    def backtrack(start, path):
        if len(path) == k:
            result.append(path[:])
            return

        # Pruning: need k - len(path) more elements
        # Can't start later than n - (k - len(path)) + 1
        for i in range(start, n - (k - len(path)) + 2):
            path.append(i)
            backtrack(i + 1, path)
            path.pop()

    backtrack(1, [])
    return result

# Example: n=4, k=2
# Output: [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]

# Combination Sum: find combinations that sum to target
def combination_sum(candidates, target):
    result = []

    def backtrack(start, path, remaining):
        if remaining == 0:
            result.append(path[:])
            return
        if remaining < 0:
            return

        for i in range(start, len(candidates)):
            path.append(candidates[i])
            # Can reuse same element, so pass i not i+1
            backtrack(i, path, remaining - candidates[i])
            path.pop()

    backtrack(0, [], target)
    return result`},{signature:`Combination Sum II`,description:`Find combinations summing to target. Each candidate used once. Handle duplicates.`,complexity:`O(2^n)`,section:`Subsets & Combinations`,example:`def combination_sum2(candidates, target):
    result = []
    candidates.sort()  # Sort to handle duplicates

    def backtrack(start, path, remaining):
        if remaining == 0:
            result.append(path[:])
            return
        if remaining < 0:
            return

        for i in range(start, len(candidates)):
            # Skip duplicates at same level
            if i > start and candidates[i] == candidates[i - 1]:
                continue

            # Pruning: if current > remaining, all future will too
            if candidates[i] > remaining:
                break

            path.append(candidates[i])
            backtrack(i + 1, path, remaining - candidates[i])
            path.pop()

    backtrack(0, [], target)
    return result

# Example: candidates = [10,1,2,7,6,1,5], target = 8
# Output: [[1,1,6], [1,2,5], [1,7], [2,6]]

# Key differences from Combination Sum I:
# 1. Each number used at most once (i + 1 not i)
# 2. Input may have duplicates (need to skip)
# 3. Sort + skip pattern for unique combinations`},{signature:`Permutations`,description:`Generate all n! permutations. Use each element exactly once.`,complexity:`O(n!)`,section:`Permutations`,example:`def permutations(nums):
    result = []

    def backtrack(path, used):
        if len(path) == len(nums):
            result.append(path[:])
            return

        for i in range(len(nums)):
            if used[i]:
                continue

            used[i] = True
            path.append(nums[i])
            backtrack(path, used)
            path.pop()
            used[i] = False

    backtrack([], [False] * len(nums))
    return result

# Example: [1, 2, 3]
# Output: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]

# Alternative: swap-based
def permutations_swap(nums):
    result = []

    def backtrack(start):
        if start == len(nums):
            result.append(nums[:])
            return

        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]
            backtrack(start + 1)
            nums[start], nums[i] = nums[i], nums[start]

    backtrack(0)
    return result`},{signature:`Permutations with Duplicates`,description:`Generate unique permutations. Sort and skip used duplicates.`,complexity:`O(n!)`,section:`Permutations`,example:`def permute_unique(nums):
    result = []
    nums.sort()

    def backtrack(path, used):
        if len(path) == len(nums):
            result.append(path[:])
            return

        for i in range(len(nums)):
            if used[i]:
                continue
            # Skip duplicate if previous same element not used
            if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]:
                continue

            used[i] = True
            path.append(nums[i])
            backtrack(path, used)
            path.pop()
            used[i] = False

    backtrack([], [False] * len(nums))
    return result

# Example: [1, 1, 2]
# Output: [[1,1,2], [1,2,1], [2,1,1]]
# NOT: [[1,1,2], [1,1,2], [1,2,1], [1,2,1], [2,1,1], [2,1,1]]`}],C=[{signature:`When to use backtracking`,description:`Pattern: explore all possibilities with constraints. Recognize by: "all combinations", "all permutations", "solve puzzle". Complexity often exponential.`,complexity:`Concept`,section:`Why & When`,example:`# BACKTRACKING SIGNALS:
# 1. "Find all solutions/combinations/permutations"
# 2. Constraint satisfaction (Sudoku, N-Queens)
# 3. Exhaustive search with pruning
# 4. Build solution incrementally, backtrack on failure

# USE BACKTRACKING:
# - Generate all subsets/combinations
# - N-Queens, Sudoku puzzles
# - Word search in grid
# - Generate valid parentheses
# - Permutations with constraints

# DON'T USE (other techniques better):
# - Shortest path → BFS/Dijkstra
# - Optimization with overlapping subproblems → DP
# - Single valid solution exists → Greedy might work
# - n > 20-25 → Too slow (exponential)

# COMPLEXITY WARNING:
# Backtracking is SLOW (exponential)
# n = 10: ~millions operations
# n = 20: ~trillions operations
# n = 30: won't finish!

# Use when:
# - n is small (<20)
# - Need ALL solutions
# - Pruning reduces search space significantly
# - No better alternative exists`},{signature:`Backtracking template and pruning`,description:`Core pattern: choose → explore → unchoose. Pruning is critical - prune early, prune often. Without pruning, exponential explodes.`,complexity:`Concept`,section:`Why & When`,example:`# BACKTRACKING TEMPLATE
def backtrack(state, choices, result):
    # Base case: solution found
    if is_solution(state):
        result.append(state.copy())
        return

    for choice in choices:
        # PRUNE: Skip invalid choices early
        if not is_valid(choice, state):
            continue

        # Choose
        state.add(choice)

        # Explore
        backtrack(state, choices, result)

        # Unchoose (backtrack)
        state.remove(choice)

# PRUNING EXAMPLES:

# Bad: Check validity after building
def generate_permutations_slow(nums):
    def backtrack(perm):
        if len(perm) == len(nums):
            if is_valid(perm):  # Too late!
                result.append(perm[:])
            return
        for num in nums:
            if num not in perm:
                perm.append(num)
                backtrack(perm)
                perm.pop()

# Good: Prune early
def generate_permutations_fast(nums):
    def backtrack(perm):
        if len(perm) == len(nums):
            result.append(perm[:])  # Already valid
            return
        for num in nums:
            if num in perm:  # PRUNE early!
                continue
            perm.append(num)
            backtrack(perm)
            perm.pop()

# PRUNING IMPACT:
# N-Queens without pruning: O(n^n)
# N-Queens with pruning: O(n!)
# For n=8: 16M vs 40k solutions checked!

# Pruning strategies:
# 1. Check constraints before recursion
# 2. Use sets for O(1) conflict detection
# 3. Sort choices (try promising first)
# 4. Memoize impossible states (DP hybrid)`},{signature:`Backtracking vs DP - when to choose which`,description:`Backtracking: need all solutions, no overlapping subproblems. DP: optimal solution, overlapping subproblems. Sometimes both work.`,complexity:`Concept`,section:`Why & When`,example:`# BACKTRACKING PROBLEMS:
# - Generate all permutations
# - N-Queens (all solutions)
# - Sudoku solver
# - Word search in grid
# Common: Need ALL solutions

# DP PROBLEMS:
# - Longest increasing subsequence
# - Coin change (min coins)
# - Edit distance
# Common: ONE optimal solution, overlapping subproblems

# HYBRID (both can work):

# Problem: Count ways to partition string into palindromes
# Backtracking: Generate all, count
def count_partitions_bt(s):
    count = 0
    def backtrack(start, path):
        nonlocal count
        if start == len(s):
            count += 1
            return
        for end in range(start + 1, len(s) + 1):
            if is_palindrome(s[start:end]):
                backtrack(end, path + [s[start:end]])
    backtrack(0, [])
    return count
# O(2^n) - explores all partitions

# DP: Count without generating
def count_partitions_dp(s):
    n = len(s)
    dp = [0] * (n + 1)
    dp[0] = 1
    for i in range(1, n + 1):
        for j in range(i):
            if is_palindrome(s[j:i]):
                dp[i] += dp[j]
    return dp[n]
# O(n²) - much faster!

# DECISION:
# Need ALL solutions → Backtracking
# Need COUNT only → DP (if overlapping)
# Need ONE optimal → DP
# Small input (<20) → Backtracking ok
# Large input → DP if possible

# Example confusion:
# "Generate all subsets" → Backtracking (need all)
# "Find longest subset with property" → DP (one optimal)`}],w=[{signature:`N-Queens`,description:`Place N queens on NxN board so none attack each other.`,complexity:`O(n!)`,section:`Classic Problems`,example:`def solve_n_queens(n):
    result = []
    board = [['.'] * n for _ in range(n)]

    def is_safe(row, col):
        # Check column
        for i in range(row):
            if board[i][col] == 'Q':
                return False
        # Check upper-left diagonal
        i, j = row - 1, col - 1
        while i >= 0 and j >= 0:
            if board[i][j] == 'Q':
                return False
            i -= 1
            j -= 1
        # Check upper-right diagonal
        i, j = row - 1, col + 1
        while i >= 0 and j < n:
            if board[i][j] == 'Q':
                return False
            i -= 1
            j += 1
        return True

    def backtrack(row):
        if row == n:
            result.append([''.join(r) for r in board])
            return

        for col in range(n):
            if is_safe(row, col):
                board[row][col] = 'Q'
                backtrack(row + 1)
                board[row][col] = '.'

    backtrack(0)
    return result

# Optimized with sets for O(1) conflict check
def solve_n_queens_opt(n):
    result = []
    cols = set()
    diag1 = set()  # row - col
    diag2 = set()  # row + col
    board = [['.'] * n for _ in range(n)]

    def backtrack(row):
        if row == n:
            result.append([''.join(r) for r in board])
            return

        for col in range(n):
            if col in cols or row - col in diag1 or row + col in diag2:
                continue

            cols.add(col)
            diag1.add(row - col)
            diag2.add(row + col)
            board[row][col] = 'Q'

            backtrack(row + 1)

            cols.remove(col)
            diag1.remove(row - col)
            diag2.remove(row + col)
            board[row][col] = '.'

    backtrack(0)
    return result`},{signature:`Sudoku Solver`,description:`Fill 9x9 grid so each row, column, and 3x3 box has digits 1-9.`,complexity:`O(9^(empty cells))`,section:`Classic Problems`,example:`def solve_sudoku(board):
    def is_valid(row, col, num):
        # Check row
        if num in board[row]:
            return False
        # Check column
        if num in [board[i][col] for i in range(9)]:
            return False
        # Check 3x3 box
        box_row, box_col = 3 * (row // 3), 3 * (col // 3)
        for i in range(box_row, box_row + 3):
            for j in range(box_col, box_col + 3):
                if board[i][j] == num:
                    return False
        return True

    def solve():
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    for num in '123456789':
                        if is_valid(i, j, num):
                            board[i][j] = num
                            if solve():
                                return True
                            board[i][j] = '.'
                    return False  # No valid number
        return True  # All cells filled

    solve()

# Optimized with sets
def solve_sudoku_opt(board):
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    empty = []

    for i in range(9):
        for j in range(9):
            if board[i][j] != '.':
                num = board[i][j]
                rows[i].add(num)
                cols[j].add(num)
                boxes[(i // 3) * 3 + j // 3].add(num)
            else:
                empty.append((i, j))

    def backtrack(idx):
        if idx == len(empty):
            return True
        i, j = empty[idx]
        box_idx = (i // 3) * 3 + j // 3

        for num in '123456789':
            if num not in rows[i] and num not in cols[j] and num not in boxes[box_idx]:
                board[i][j] = num
                rows[i].add(num)
                cols[j].add(num)
                boxes[box_idx].add(num)

                if backtrack(idx + 1):
                    return True

                board[i][j] = '.'
                rows[i].remove(num)
                cols[j].remove(num)
                boxes[box_idx].remove(num)

        return False

    backtrack(0)`},{signature:`Word Search`,description:`Find if word exists in grid by moving adjacent cells.`,complexity:`O(m*n*4^L)`,section:`Classic Problems`,example:`def exist(board, word):
    m, n = len(board), len(board[0])

    def backtrack(i, j, k):
        if k == len(word):
            return True

        if i < 0 or i >= m or j < 0 or j >= n:
            return False
        if board[i][j] != word[k]:
            return False

        # Mark as visited
        temp = board[i][j]
        board[i][j] = '#'

        # Explore all 4 directions
        found = (backtrack(i + 1, j, k + 1) or
                 backtrack(i - 1, j, k + 1) or
                 backtrack(i, j + 1, k + 1) or
                 backtrack(i, j - 1, k + 1))

        # Restore
        board[i][j] = temp
        return found

    for i in range(m):
        for j in range(n):
            if backtrack(i, j, 0):
                return True
    return False

# Example:
# board = [["A","B","C","E"],
#          ["S","F","C","S"],
#          ["A","D","E","E"]]
# word = "ABCCED" -> True
# word = "SEE" -> True
# word = "ABCB" -> False`},{signature:`Palindrome Partitioning`,description:`Partition string into all possible palindrome substrings.`,complexity:`O(n * 2^n)`,section:`Classic Problems`,example:`def partition(s):
    result = []

    def is_palindrome(sub):
        return sub == sub[::-1]

    def backtrack(start, path):
        if start == len(s):
            result.append(path[:])
            return

        for end in range(start + 1, len(s) + 1):
            substring = s[start:end]
            if is_palindrome(substring):
                path.append(substring)
                backtrack(end, path)
                path.pop()

    backtrack(0, [])
    return result

# Example: "aab"
# Output: [["a","a","b"], ["aa","b"]]

# Optimized with DP for palindrome check
def partition_opt(s):
    n = len(s)
    # Precompute palindrome DP
    is_pal = [[False] * n for _ in range(n)]
    for i in range(n - 1, -1, -1):
        for j in range(i, n):
            if s[i] == s[j] and (j - i <= 2 or is_pal[i + 1][j - 1]):
                is_pal[i][j] = True

    result = []

    def backtrack(start, path):
        if start == n:
            result.append(path[:])
            return
        for end in range(start, n):
            if is_pal[start][end]:
                path.append(s[start:end + 1])
                backtrack(end + 1, path)
                path.pop()

    backtrack(0, [])
    return result`},{signature:`Generate Parentheses`,description:`Generate all valid combinations of n pairs of parentheses.`,complexity:`O(4^n / sqrt(n))`,section:`Classic Problems`,example:`def generate_parenthesis(n):
    result = []

    def backtrack(path, open_count, close_count):
        if len(path) == 2 * n:
            result.append(''.join(path))
            return

        # Can add open if we haven't used all
        if open_count < n:
            path.append('(')
            backtrack(path, open_count + 1, close_count)
            path.pop()

        # Can add close if it won't exceed open
        if close_count < open_count:
            path.append(')')
            backtrack(path, open_count, close_count + 1)
            path.pop()

    backtrack([], 0, 0)
    return result

# Example: n = 3
# Output: ["((()))","(()())","(())()","()(())","()()()"]

# String version (slightly cleaner)
def generate_parenthesis_str(n):
    result = []

    def backtrack(s, open_count, close_count):
        if len(s) == 2 * n:
            result.append(s)
            return
        if open_count < n:
            backtrack(s + '(', open_count + 1, close_count)
        if close_count < open_count:
            backtrack(s + ')', open_count, close_count + 1)

    backtrack('', 0, 0)
    return result`},{signature:`Letter Combinations of Phone`,description:`Generate all letter combinations from phone digits.`,complexity:`O(4^n)`,section:`Classic Problems`,example:`def letter_combinations(digits):
    if not digits:
        return []

    phone = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    }

    result = []

    def backtrack(index, path):
        if index == len(digits):
            result.append(''.join(path))
            return

        for letter in phone[digits[index]]:
            path.append(letter)
            backtrack(index + 1, path)
            path.pop()

    backtrack(0, [])
    return result

# Example: "23"
# Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

# Iterative BFS-style
def letter_combinations_iter(digits):
    if not digits:
        return []

    phone = {'2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
             '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'}

    result = ['']
    for digit in digits:
        result = [prefix + letter
                  for prefix in result
                  for letter in phone[digit]]
    return result`}],T=[...C,...w],E=[...S,...T],D=[{signature:`Why use Dynamic Programming?`,description:`Solve complex problems by breaking into overlapping subproblems. Store results to avoid recomputation. O(n) or O(n²) vs exponential.`,complexity:`Concept`,section:`Why & When`,example:`# DYNAMIC PROGRAMMING = Recursion + Memoization
# "Remember past results to avoid redundant work"

# KEY PROPERTIES:
# 1. Optimal Substructure: optimal solution contains optimal solutions to subproblems
# 2. Overlapping Subproblems: same subproblems solved multiple times

# TWO APPROACHES:
# 1. Top-Down (Memoization): recursive with cache
# 2. Bottom-Up (Tabulation): iterative, fill table

# STEPS TO SOLVE:
# 1. Define state: what info needed to solve subproblem?
# 2. Define recurrence: how do states relate?
# 3. Define base case: smallest subproblems
# 4. Define answer: which state gives final answer?

# EXAMPLE: Fibonacci
# Without DP: O(2^n) - exponential
# With DP: O(n) - linear

# Top-Down
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n-1) + fib_memo(n-2)
    return memo[n]

# Bottom-Up
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]`},{signature:`Top-Down vs Bottom-Up`,description:`Top-down uses recursion with cache. Bottom-up builds table iteratively. Both have same complexity.`,complexity:`Concept`,section:`Why & When`,example:`# TOP-DOWN (Memoization)
# Pros: Natural recursive thinking, only compute needed states
# Cons: Recursion overhead, stack limit

from functools import lru_cache

@lru_cache(maxsize=None)
def solve_top_down(state):
    if base_case(state):
        return base_value
    # Recursively solve subproblems
    return combine(solve_top_down(subproblem))

# BOTTOM-UP (Tabulation)
# Pros: No recursion overhead, easier to optimize space
# Cons: Must figure out order, may compute unnecessary states

def solve_bottom_up(n):
    dp = [base_value] * (n + 1)
    for i in range(start, n + 1):
        dp[i] = combine(dp[smaller_states])
    return dp[n]

# SPACE OPTIMIZATION
# Often only need last few states, not entire table
def fib_optimized(n):
    if n <= 1:
        return n
    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    return prev1  # O(1) space!`},{signature:`Climbing Stairs`,description:`Classic 1D DP. Ways to reach step n from step 0.`,complexity:`O(n)`,section:`1D DP`,example:`# Ways to climb n stairs, can take 1 or 2 steps
def climb_stairs(n):
    if n <= 2:
        return n

    # dp[i] = ways to reach step i
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2

    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]

    return dp[n]

# Space optimized
def climb_stairs_opt(n):
    if n <= 2:
        return n
    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    return prev1

# With k steps (1 to k)
def climb_stairs_k(n, k):
    dp = [0] * (n + 1)
    dp[0] = 1
    for i in range(1, n + 1):
        for j in range(1, min(k, i) + 1):
            dp[i] += dp[i - j]
    return dp[n]`},{signature:`House Robber`,description:`Maximum sum of non-adjacent elements. Classic 1D DP pattern.`,complexity:`O(n)`,section:`1D DP`,example:`# Can't rob adjacent houses
def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]

    # dp[i] = max money robbing houses 0..i
    dp = [0] * len(nums)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])

    for i in range(2, len(nums)):
        dp[i] = max(dp[i-1], dp[i-2] + nums[i])

    return dp[-1]

# Space optimized
def rob_opt(nums):
    if not nums:
        return 0
    prev2, prev1 = 0, 0
    for num in nums:
        curr = max(prev1, prev2 + num)
        prev2, prev1 = prev1, curr
    return prev1

# House Robber II (circular)
def rob_circular(nums):
    if len(nums) == 1:
        return nums[0]
    # Either skip first or skip last house
    return max(rob_opt(nums[1:]), rob_opt(nums[:-1]))`},{signature:`Coin Change`,description:`Minimum coins to make amount. Unbounded knapsack variant.`,complexity:`O(amount * n)`,section:`1D DP`,example:`# Minimum coins to make amount
def coin_change(coins, amount):
    # dp[i] = min coins for amount i
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i and dp[i - coin] != float('inf'):
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1

# Number of ways to make amount (Coin Change 2)
def coin_change_ways(coins, amount):
    dp = [0] * (amount + 1)
    dp[0] = 1

    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] += dp[i - coin]

    return dp[amount]

# Example: coins = [1, 2, 5], amount = 11
# Min coins: 3 (5 + 5 + 1)
# Ways: 1+1+...+1, 1+1+...+2, ..., 5+5+1`},{signature:`Longest Increasing Subsequence`,description:`Find length of LIS. O(n²) DP or O(n log n) with binary search.`,complexity:`O(n²) or O(n log n)`,section:`1D DP`,example:`# O(n²) DP solution
def length_of_lis(nums):
    n = len(nums)
    if n == 0:
        return 0

    # dp[i] = LIS ending at index i
    dp = [1] * n

    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)

# O(n log n) with binary search
def length_of_lis_fast(nums):
    from bisect import bisect_left

    # tails[i] = smallest tail for LIS of length i+1
    tails = []

    for num in nums:
        pos = bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num

    return len(tails)

# Example: [10, 9, 2, 5, 3, 7, 101, 18]
# LIS: [2, 3, 7, 18] or [2, 3, 7, 101]
# Length: 4`},{signature:`Word Break`,description:`Can string be segmented into dictionary words? DP on string prefixes.`,complexity:`O(n² * k)`,section:`1D DP`,example:`def word_break(s, wordDict):
    word_set = set(wordDict)
    n = len(s)

    # dp[i] = can s[0:i] be segmented?
    dp = [False] * (n + 1)
    dp[0] = True

    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break

    return dp[n]

# Return all possible segmentations (Word Break II)
def word_break_all(s, wordDict):
    word_set = set(wordDict)
    memo = {}

    def backtrack(start):
        if start in memo:
            return memo[start]
        if start == len(s):
            return ['']

        result = []
        for end in range(start + 1, len(s) + 1):
            word = s[start:end]
            if word in word_set:
                for rest in backtrack(end):
                    if rest:
                        result.append(word + ' ' + rest)
                    else:
                        result.append(word)

        memo[start] = result
        return result

    return backtrack(0)

# Example: "leetcode", ["leet", "code"]
# Output: True, ["leet code"]`},{signature:`Decode Ways`,description:`Number of ways to decode digit string to letters.`,complexity:`O(n)`,section:`1D DP`,example:`def num_decodings(s):
    if not s or s[0] == '0':
        return 0

    n = len(s)
    # dp[i] = ways to decode s[0:i]
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1

    for i in range(2, n + 1):
        # Single digit (1-9)
        if s[i-1] != '0':
            dp[i] += dp[i-1]

        # Two digits (10-26)
        two_digit = int(s[i-2:i])
        if 10 <= two_digit <= 26:
            dp[i] += dp[i-2]

    return dp[n]

# Space optimized
def num_decodings_opt(s):
    if not s or s[0] == '0':
        return 0

    prev2, prev1 = 1, 1

    for i in range(1, len(s)):
        curr = 0
        if s[i] != '0':
            curr = prev1
        two_digit = int(s[i-1:i+1])
        if 10 <= two_digit <= 26:
            curr += prev2
        prev2, prev1 = prev1, curr

    return prev1

# Example: "226"
# Decodings: "BZ" (2 26), "VF" (22 6), "BBF" (2 2 6)
# Output: 3`}],O=[{signature:`When to use 2D DP`,description:`Pattern: two sequences/dimensions, decision depends on both indices. Recognize by: grid paths, string matching, two arrays optimization.`,complexity:`Concept`,section:`Why & When`,example:`# 2D DP SIGNALS:
# 1. Two strings/sequences (LCS, edit distance)
# 2. Grid navigation (paths, min sum)
# 3. State depends on (i, j) indices
# 4. Recurrence: dp[i][j] = f(dp[i-1][j], dp[i][j-1], ...)

# USE 2D DP:
# - Longest common subsequence (two strings)
# - Edit distance (transform string A → B)
# - Grid paths, min path sum
# - Match wildcards (* and ?)
# - Two arrays, pick elements with constraints

# DON'T USE (other techniques):
# - Single sequence optimization → 1D DP
# - Tree/graph traversal → DFS/BFS
# - Greedy works → Use greedy (simpler)

# SPACE OPTIMIZATION:
# 2D: O(m*n) space
# 1D: O(n) space (if only need previous row)

# Example: LCS
# Need dp[i-1][j] and dp[i][j-1]
# → Only need 1 previous row!
# → Reduce O(m*n) → O(n)

# Performance:
# m=100, n=100: 10k cells, ~0.1ms
# m=1000, n=1000: 1M cells, ~10ms
# m=5000, n=5000: 25M cells, ~250ms
# Larger → need optimization or different approach`},{signature:`Interval DP pattern - when and how`,description:`Pattern: optimal way to process interval [i, j]. Recurrence splits interval. O(n³) typical. Use for: burst balloons, matrix chain, palindromes.`,complexity:`Concept`,section:`Why & When`,example:`# INTERVAL DP TEMPLATE:
# Process intervals bottom-up by length

for length in range(2, n+1):  # Start with length 2
    for i in range(n - length + 1):
        j = i + length - 1
        # dp[i][j] = optimal for interval [i, j]
        for k in range(i, j):  # Try split points
            dp[i][j] = min/max(
                dp[i][k] + dp[k+1][j] + cost
            )

# WHEN TO USE:
# Problem mentions:
# - "Optimal way to process subarray"
# - "Merge intervals with cost"
# - "Burst balloons in order"
# - "Matrix chain multiplication"
# - "Palindrome partitioning"

# EXAMPLES:
# 1. Burst Balloons
#    dp[i][j] = max coins from bursting (i, j)
#    Try each k as LAST balloon burst

# 2. Matrix Chain Multiplication
#    dp[i][j] = min ops to multiply matrices[i:j]
#    Try each k as split point

# 3. Palindrome Partitioning
#    dp[i][j] = min cuts for s[i:j]
#    If s[i:j] palindrome: 0 cuts
#    Else: try split points

# COMPLEXITY:
# Outer loops: O(n²) intervals
# Inner loop: O(n) split points
# Total: O(n³)

# For n=100: 1M operations (~10ms)
# For n=500: 125M operations (~1sec)
# For n>1000: Too slow!

# OPTIMIZATION:
# Precompute helper data (isPalindrome)
# Memoize expensive checks
# Sometimes can reduce to O(n²)`},{signature:`String DP - common patterns`,description:`Substring vs subsequence. Substring: contiguous, use DP[i][j]. Subsequence: gaps ok, often 2D DP comparing characters.`,complexity:`Concept`,section:`Why & When`,example:`# SUBSTRING vs SUBSEQUENCE

# SUBSTRING (contiguous):
# "abc" has substrings: "", "a", "b", "c", "ab", "bc", "abc"
# Pattern: dp[i][j] = property of s[i:j]

# Longest Palindrome Substring
def longest_palindrome_substring(s):
    n = len(s)
    dp = [[False] * n for _ in range(n)]
    start, max_len = 0, 1

    # Base: single chars
    for i in range(n):
        dp[i][i] = True

    # Length 2
    for i in range(n-1):
        if s[i] == s[i+1]:
            dp[i][i+1] = True
            start, max_len = i, 2

    # Length 3+
    for length in range(3, n+1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j] and dp[i+1][j-1]:
                dp[i][j] = True
                start, max_len = i, length

    return s[start:start + max_len]

# SUBSEQUENCE (can skip chars):
# "abc" has subsequences: "", "a", "b", "c", "ab", "ac", "bc", "abc"
# Pattern: dp[i][j] comparing s1[i] with s2[j]

# Longest Common Subsequence
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n+1) for _ in range(m+1)]

    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1  # Match
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])  # Skip

    return dp[m][n]

# KEY DIFFERENCES:
# Substring: Interval DP, O(n²) or O(n³)
# Subsequence: 2D DP comparing sequences, O(m*n)

# Common string DP problems:
# - Edit distance: 2D, transform operations
# - Wildcard matching: 2D, handle * and ?
# - Regular expression: 2D, handle . and *
# - Palindrome partitions: Interval DP
# - LCS: 2D subsequence`}],k=[{signature:`Unique Paths`,description:`Count paths in grid from top-left to bottom-right.`,complexity:`O(m*n)`,section:`2D DP`,example:`def unique_paths(m, n):
    # dp[i][j] = paths to reach (i, j)
    dp = [[1] * n for _ in range(m)]

    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]

    return dp[m-1][n-1]

# Space optimized (O(n))
def unique_paths_opt(m, n):
    dp = [1] * n
    for _ in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]
    return dp[n-1]

# With obstacles
def unique_paths_obstacles(grid):
    m, n = len(grid), len(grid[0])
    if grid[0][0] == 1:
        return 0

    dp = [[0] * n for _ in range(m)]
    dp[0][0] = 1

    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                dp[i][j] = 0
            else:
                if i > 0:
                    dp[i][j] += dp[i-1][j]
                if j > 0:
                    dp[i][j] += dp[i][j-1]

    return dp[m-1][n-1]`},{signature:`Minimum Path Sum`,description:`Find path with minimum sum from top-left to bottom-right.`,complexity:`O(m*n)`,section:`2D DP`,example:`def min_path_sum(grid):
    m, n = len(grid), len(grid[0])

    # dp[i][j] = min sum to reach (i, j)
    dp = [[0] * n for _ in range(m)]
    dp[0][0] = grid[0][0]

    # Fill first row
    for j in range(1, n):
        dp[0][j] = dp[0][j-1] + grid[0][j]

    # Fill first column
    for i in range(1, m):
        dp[i][0] = dp[i-1][0] + grid[i][0]

    # Fill rest
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]

    return dp[m-1][n-1]

# Space optimized (modify in place)
def min_path_sum_inplace(grid):
    m, n = len(grid), len(grid[0])

    for i in range(m):
        for j in range(n):
            if i == 0 and j == 0:
                continue
            elif i == 0:
                grid[i][j] += grid[i][j-1]
            elif j == 0:
                grid[i][j] += grid[i-1][j]
            else:
                grid[i][j] += min(grid[i-1][j], grid[i][j-1])

    return grid[m-1][n-1]`},{signature:`Longest Common Subsequence`,description:`Find LCS of two strings. Classic 2D DP.`,complexity:`O(m*n)`,section:`2D DP`,example:`def longest_common_subsequence(text1, text2):
    m, n = len(text1), len(text2)

    # dp[i][j] = LCS of text1[0:i] and text2[0:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]

# Space optimized
def lcs_opt(text1, text2):
    m, n = len(text1), len(text2)
    if m < n:
        text1, text2 = text2, text1
        m, n = n, m

    prev = [0] * (n + 1)
    curr = [0] * (n + 1)

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                curr[j] = prev[j-1] + 1
            else:
                curr[j] = max(prev[j], curr[j-1])
        prev, curr = curr, [0] * (n + 1)

    return prev[n]

# Example: "abcde", "ace" -> LCS = "ace", length = 3`},{signature:`Edit Distance`,description:`Minimum operations to transform word1 to word2.`,complexity:`O(m*n)`,section:`2D DP`,example:`def min_distance(word1, word2):
    m, n = len(word1), len(word2)

    # dp[i][j] = min ops to transform word1[0:i] to word2[0:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases
    for i in range(m + 1):
        dp[i][0] = i  # Delete all
    for j in range(n + 1):
        dp[0][j] = j  # Insert all

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]  # No operation
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # Delete
                    dp[i][j-1],    # Insert
                    dp[i-1][j-1]   # Replace
                )

    return dp[m][n]

# Example: "horse" -> "ros"
# horse -> rorse (replace h with r)
# rorse -> rose (delete r)
# rose -> ros (delete e)
# Output: 3`}],A=[{signature:`Burst Balloons`,description:`Max coins by bursting balloons. Interval DP classic.`,complexity:`O(n³)`,section:`Interval DP`,example:`def max_coins(nums):
    # Add boundary balloons
    nums = [1] + nums + [1]
    n = len(nums)

    # dp[i][j] = max coins from bursting balloons between i and j
    dp = [[0] * n for _ in range(n)]

    # Length of interval
    for length in range(2, n):
        for left in range(0, n - length):
            right = left + length

            # k is last balloon to burst in (left, right)
            for k in range(left + 1, right):
                dp[left][right] = max(
                    dp[left][right],
                    dp[left][k] + dp[k][right] +
                    nums[left] * nums[k] * nums[right]
                )

    return dp[0][n-1]

# Example: [3, 1, 5, 8]
# Burst 1: 3*1*5 = 15
# Burst 5: 3*5*8 = 120
# Burst 3: 1*3*8 = 24
# Burst 8: 1*8*1 = 8
# Total: 167`},{signature:`Matrix Chain Multiplication`,description:`Minimum cost to multiply chain of matrices.`,complexity:`O(n³)`,section:`Interval DP`,example:`def matrix_chain_order(dims):
    # dims = [d0, d1, d2, ..., dn]
    # Matrix i has dimensions dims[i-1] x dims[i]
    n = len(dims) - 1

    # dp[i][j] = min cost to multiply matrices i to j
    dp = [[0] * n for _ in range(n)]

    # Length of chain
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = float('inf')

            # Try all split points
            for k in range(i, j):
                cost = (dp[i][k] + dp[k+1][j] +
                       dims[i] * dims[k+1] * dims[j+1])
                dp[i][j] = min(dp[i][j], cost)

    return dp[0][n-1]

# Example: dims = [10, 30, 5, 60]
# A: 10x30, B: 30x5, C: 5x60
# (AB)C = 10*30*5 + 10*5*60 = 1500 + 3000 = 4500
# A(BC) = 30*5*60 + 10*30*60 = 9000 + 18000 = 27000
# Output: 4500`}],j=[{signature:`Longest Palindromic Substring`,description:`Find longest palindrome in string. Expand around center or DP.`,complexity:`O(n²)`,section:`String DP`,example:`# Expand around center (cleaner)
def longest_palindrome(s):
    def expand(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return s[left + 1:right]

    result = ""
    for i in range(len(s)):
        # Odd length
        odd = expand(i, i)
        if len(odd) > len(result):
            result = odd
        # Even length
        even = expand(i, i + 1)
        if len(even) > len(result):
            result = even

    return result

# DP approach
def longest_palindrome_dp(s):
    n = len(s)
    if n < 2:
        return s

    # dp[i][j] = is s[i:j+1] palindrome?
    dp = [[False] * n for _ in range(n)]
    start, max_len = 0, 1

    # All single chars are palindromes
    for i in range(n):
        dp[i][i] = True

    # Check substrings of length 2 to n
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                if length == 2 or dp[i+1][j-1]:
                    dp[i][j] = True
                    if length > max_len:
                        start, max_len = i, length

    return s[start:start + max_len]

# Example: "babad" -> "bab" or "aba"`},{signature:`Palindrome Substrings Count`,description:`Count all palindromic substrings.`,complexity:`O(n²)`,section:`String DP`,example:`def count_substrings(s):
    count = 0

    def expand(left, right):
        nonlocal count
        while left >= 0 and right < len(s) and s[left] == s[right]:
            count += 1
            left -= 1
            right += 1

    for i in range(len(s)):
        expand(i, i)      # Odd length
        expand(i, i + 1)  # Even length

    return count

# Example: "abc" -> 3 (a, b, c)
# Example: "aaa" -> 6 (a, a, a, aa, aa, aaa)`}],M=[...O,...k,...A,...j],N=[{signature:`Kadane's algorithm - when to use`,description:`Pattern: maximum/minimum subarray sum/product. O(n) single pass beats O(n²) brute force. Works because optimal subarray either includes current or starts fresh.`,complexity:`Concept`,section:`Why & When`,example:`# KADANE'S ALGORITHM PATTERN
# Maximum subarray sum

def max_subarray(nums):
    current_sum = max_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        # Either extend or start new
        max_sum = max(max_sum, current_sum)
    return max_sum

# WHY IT WORKS:
# At each position, optimal is:
# - Start new subarray here (num)
# - Extend previous subarray (current_sum + num)
# Take max! No need to try all O(n²) subarrays.

# USE KADANE'S WHEN:
# - Maximum/minimum subarray sum
# - Maximum subarray product
# - Best time to buy/sell stock (1 transaction)
# - Circular array max sum (with modification)

# VARIATIONS:
# Max product: Track both max and min (negatives!)
# At least K elements: Use prefix sum + deque
# Circular: Max of (normal kadane, total - min subarray)

# PERFORMANCE:
# Kadane: O(n), single pass
# Brute force: O(n²), check all pairs
# For n=10,000:
# Kadane: 10k ops (~0.1ms)
# Brute: 100M ops (~10ms)`},{signature:`0/1 Knapsack vs Unbounded - when to use which`,description:`0/1: each item once. Unbounded: items unlimited. Coin change is unbounded knapsack. Similar DP, different iteration order.`,complexity:`Concept`,section:`Why & When`,example:`# 0/1 KNAPSACK (each item used once)
def knapsack_01(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Don't take item i-1
            dp[i][w] = dp[i-1][w]
            # Take item i-1 (if fits)
            if w >= weights[i-1]:
                dp[i][w] = max(
                    dp[i][w],
                    dp[i-1][w - weights[i-1]] + values[i-1]
                )
                # ^^^ dp[i-1]: can't reuse item

    return dp[n][capacity]

# UNBOUNDED KNAPSACK (items unlimited)
def knapsack_unbounded(weights, values, capacity):
    dp = [0] * (capacity + 1)

    for w in range(1, capacity + 1):
        for i in range(len(weights)):
            if w >= weights[i]:
                dp[w] = max(
                    dp[w],
                    dp[w - weights[i]] + values[i]
                )
                # ^^^ dp[w-weight]: can reuse item

    return dp[capacity]

# WHEN TO USE:
# 0/1 Knapsack:
# - "Select items without replacement"
# - "Each item used at most once"
# - Subset sum (find subset summing to target)

# Unbounded Knapsack:
# - "Unlimited items of each type"
# - Coin change (min coins, count ways)
# - Rod cutting (max value)

# SPACE OPTIMIZATION:
# 0/1: Need 2D or reverse iteration
# Unbounded: 1D forward iteration works!

# Example: Coin Change
# coins = [1, 2, 5], amount = 11
# Unbounded (can reuse coins)
# dp[11] uses dp[10], dp[9], dp[6]
# Those might already use same coins!`},{signature:`Kadane's Algorithm`,description:`Maximum subarray sum in O(n). Track current and global max.`,complexity:`O(n)`,section:`Kadane & Subarray`,example:`def max_subarray(nums):
    max_sum = curr_sum = nums[0]

    for num in nums[1:]:
        # Either extend current subarray or start new
        curr_sum = max(num, curr_sum + num)
        max_sum = max(max_sum, curr_sum)

    return max_sum

# Return indices too
def max_subarray_indices(nums):
    max_sum = curr_sum = nums[0]
    start = end = temp_start = 0

    for i in range(1, len(nums)):
        if nums[i] > curr_sum + nums[i]:
            curr_sum = nums[i]
            temp_start = i
        else:
            curr_sum += nums[i]

        if curr_sum > max_sum:
            max_sum = curr_sum
            start = temp_start
            end = i

    return max_sum, start, end

# Maximum circular subarray
def max_subarray_circular(nums):
    # Max is either in middle or wraps around
    # If wraps: total - min_subarray
    total = sum(nums)
    max_sum = min_sum = nums[0]
    curr_max = curr_min = nums[0]

    for num in nums[1:]:
        curr_max = max(num, curr_max + num)
        curr_min = min(num, curr_min + num)
        max_sum = max(max_sum, curr_max)
        min_sum = min(min_sum, curr_min)

    # If all negative, can't wrap
    if max_sum < 0:
        return max_sum
    return max(max_sum, total - min_sum)

# Example: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
# Output: 6 (subarray [4, -1, 2, 1])`},{signature:`Maximum Product Subarray`,description:`Max product subarray. Track both max and min (negatives flip).`,complexity:`O(n)`,section:`Kadane & Subarray`,example:`def max_product(nums):
    max_prod = min_prod = result = nums[0]

    for num in nums[1:]:
        # Negative can flip min to max
        if num < 0:
            max_prod, min_prod = min_prod, max_prod

        max_prod = max(num, max_prod * num)
        min_prod = min(num, min_prod * num)
        result = max(result, max_prod)

    return result

# Example: [2, 3, -2, 4]
# Output: 6 (subarray [2, 3])

# Example: [-2, 0, -1]
# Output: 0

# Example: [-2, 3, -4]
# Output: 24 (entire array)`},{signature:`0/1 Knapsack`,description:`Max value with weight limit. Each item used at most once.`,complexity:`O(n*W)`,section:`Knapsack`,example:`def knapsack_01(weights, values, capacity):
    n = len(weights)

    # dp[i][w] = max value using items 0..i-1 with capacity w
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Don't take item i-1
            dp[i][w] = dp[i-1][w]
            # Take item i-1 if possible
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                              dp[i-1][w - weights[i-1]] + values[i-1])

    return dp[n][capacity]

# Space optimized (traverse backwards)
def knapsack_01_opt(weights, values, capacity):
    dp = [0] * (capacity + 1)

    for i in range(len(weights)):
        # Go backwards to avoid using same item twice
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[capacity]

# Example:
# weights = [2, 3, 4, 5], values = [3, 4, 5, 6], capacity = 5
# Output: 7 (items with weights 2 and 3)`},{signature:`Unbounded Knapsack`,description:`Max value with unlimited items. Same item can be used multiple times.`,complexity:`O(n*W)`,section:`Knapsack`,example:`def knapsack_unbounded(weights, values, capacity):
    dp = [0] * (capacity + 1)

    for w in range(1, capacity + 1):
        for i in range(len(weights)):
            if weights[i] <= w:
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[capacity]

# Alternative: iterate items first
def knapsack_unbounded_v2(weights, values, capacity):
    dp = [0] * (capacity + 1)

    for i in range(len(weights)):
        # Go forwards (unlike 0/1) to allow multiple uses
        for w in range(weights[i], capacity + 1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[capacity]

# This is also "Coin Change Max Value" problem`},{signature:`Partition Equal Subset Sum`,description:`Can array be partitioned into two equal sum subsets? 0/1 knapsack variant.`,complexity:`O(n*sum)`,section:`Knapsack`,example:`def can_partition(nums):
    total = sum(nums)

    # Must be even
    if total % 2 != 0:
        return False

    target = total // 2

    # dp[i] = can we make sum i?
    dp = [False] * (target + 1)
    dp[0] = True

    for num in nums:
        # Go backwards for 0/1 knapsack
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]

    return dp[target]

# Using set (sometimes faster)
def can_partition_set(nums):
    total = sum(nums)
    if total % 2 != 0:
        return False

    target = total // 2
    possible = {0}

    for num in nums:
        possible = possible | {s + num for s in possible if s + num <= target}
        if target in possible:
            return True

    return target in possible

# Example: [1, 5, 11, 5] -> True ([1, 5, 5] and [11])
# Example: [1, 2, 3, 5] -> False`}],P=[...D,...M.slice(0,4),...N.slice(0,2),...N.slice(2),...M.slice(4,6),...M.slice(6)],F=[{section:`Why & When`,signature:`Why use Graphs?`,description:`Model relationships and connections. Use for: networks, maps, dependencies, social connections, state machines.`,complexity:`Concept`,example:`# GRAPH = Nodes (vertices) + Edges (connections)
#
#     A --- B
#     |     |
#     C --- D
#
# USE CASES:
# - Social networks (friends)
# - Maps (cities, roads)
# - Dependencies (build systems)
# - Web crawling (pages, links)
# - Recommendation systems
# - State machines

# TYPES:
# - Directed vs Undirected
# - Weighted vs Unweighted
# - Cyclic vs Acyclic (DAG)
# - Connected vs Disconnected

# REPRESENTATIONS:
# 1. Adjacency List (sparse graphs)
# 2. Adjacency Matrix (dense graphs)
# 3. Edge List`},{section:`Why & When`,signature:`Graph Terminology`,description:`Essential graph vocabulary: vertices, edges, degree, path, cycle, connected, weighted.`,complexity:`Concept`,example:`# TERMINOLOGY:
# Vertex/Node: A point in the graph
# Edge: Connection between two vertices
# Degree: Number of edges connected to a vertex
#   - In-degree: edges coming IN (directed)
#   - Out-degree: edges going OUT (directed)
# Path: Sequence of vertices connected by edges
# Cycle: Path that starts and ends at same vertex
# Connected: Path exists between any two vertices
# Weighted: Edges have associated costs/values

# GRAPH PROPERTIES:
# - Sparse: Few edges (E << V²)
# - Dense: Many edges (E ≈ V²)
# - Complete: Edge between every pair (E = V(V-1)/2)
# - Tree: Connected graph with no cycles (E = V-1)
# - DAG: Directed Acyclic Graph`},{section:`Why & When`,signature:`When to Use Which Algorithm`,description:`Quick reference for choosing the right graph algorithm based on problem type.`,complexity:`Concept`,example:`# ALGORITHM SELECTION GUIDE:

# TRAVERSAL (visit all nodes):
# - DFS: Deep exploration, backtracking, paths
# - BFS: Level-order, shortest path (unweighted)

# SHORTEST PATH:
# - Unweighted → BFS
# - Non-negative weights → Dijkstra
# - Negative weights → Bellman-Ford
# - All pairs → Floyd-Warshall

# CYCLE DETECTION:
# - Undirected → DFS with parent tracking
# - Directed → DFS with colors (white/gray/black)

# ORDERING:
# - Dependencies → Topological Sort (DAG only)

# CONNECTIVITY:
# - Components → DFS/BFS from each unvisited
# - MST → Kruskal (sparse) or Prim (dense)

# BIPARTITE:
# - 2-coloring → BFS/DFS with alternating colors`},{section:`Graph Representation`,signature:`Adjacency List`,description:`Most common representation. O(V+E) space, efficient for sparse graphs.`,complexity:`O(V+E) space`,example:`# ADJACENCY LIST (most common)
# Space: O(V + E)
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}

# Or with defaultdict
from collections import defaultdict
graph = defaultdict(list)
edges = [('A','B'), ('A','C'), ('B','D'), ('C','D')]
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)  # Undirected

# WEIGHTED GRAPH (adjacency list)
graph = {
    'A': [('B', 5), ('C', 3)],  # (neighbor, weight)
    'B': [('A', 5), ('D', 2)],
}

# With defaultdict for weighted
graph = defaultdict(list)
for u, v, w in weighted_edges:
    graph[u].append((v, w))
    graph[v].append((u, w))  # Undirected`},{section:`Graph Representation`,signature:`Adjacency Matrix`,description:`O(V²) space, O(1) edge lookup. Good for dense graphs.`,complexity:`O(V²) space`,example:`# ADJACENCY MATRIX
# Space: O(V²), O(1) edge check
# Good for dense graphs
matrix = [
    [0, 1, 1, 0],  # A
    [1, 0, 0, 1],  # B
    [1, 0, 0, 1],  # C
    [0, 1, 1, 0],  # D
]
# matrix[i][j] = 1 means edge from i to j

# WEIGHTED MATRIX
# matrix[i][j] = weight (0 or inf for no edge)
INF = float('inf')
matrix = [
    [0,   5,   3,   INF],
    [5,   0,   INF, 2  ],
    [3,   INF, 0,   4  ],
    [INF, 2,   4,   0  ],
]

# Check edge existence: O(1)
has_edge = matrix[i][j] != 0  # or != INF

# Get neighbors: O(V)
neighbors = [j for j in range(n) if matrix[i][j]]`},{section:`DFS & BFS`,signature:`DFS Recursive Template`,description:`Explore as deep as possible before backtracking. Use for: path finding, cycle detection, topological sort.`,complexity:`O(V+E)`,example:`# DFS with visited set
def dfs(graph, node, visited):
    if node in visited:
        return
    visited.add(node)

    # Process node
    print(node)

    for neighbor in graph[node]:
        dfs(graph, neighbor, visited)

# Usage
graph = {0: [1, 2], 1: [2], 2: [3], 3: []}
visited = set()
dfs(graph, 0, visited)

# Return all reachable nodes
def dfs_all_nodes(graph, start):
    visited = set()

    def dfs(node):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)

    dfs(start)
    return visited`},{section:`DFS & BFS`,signature:`DFS Iterative Template`,description:`Use explicit stack. Better for very deep graphs (no recursion limit).`,complexity:`O(V+E)`,example:`def dfs_iterative(graph, start):
    visited = set()
    stack = [start]

    while stack:
        node = stack.pop()
        if node in visited:
            continue
        visited.add(node)

        # Process node
        print(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                stack.append(neighbor)

    return visited

# With path tracking
def dfs_with_path(graph, start, end):
    stack = [(start, [start])]
    visited = set()

    while stack:
        node, path = stack.pop()
        if node == end:
            return path
        if node in visited:
            continue
        visited.add(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                stack.append((neighbor, path + [neighbor]))

    return []  # No path found`},{section:`DFS & BFS`,signature:`BFS Template`,description:`Explore level by level. Find shortest path (unweighted), level order.`,complexity:`O(V+E)`,example:`from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])

    while queue:
        node = queue.popleft()

        # Process node
        print(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return visited

# Shortest path (unweighted)
def shortest_path(graph, start, end):
    if start == end:
        return [start]

    visited = set([start])
    queue = deque([(start, [start])])

    while queue:
        node, path = queue.popleft()

        for neighbor in graph[node]:
            if neighbor == end:
                return path + [neighbor]
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))

    return []  # No path`},{section:`DFS & BFS`,signature:`BFS with Distance`,description:`Track distance from start. Common for shortest path problems.`,complexity:`O(V+E)`,example:`from collections import deque

def bfs_distance(graph, start):
    distance = {start: 0}
    queue = deque([start])

    while queue:
        node = queue.popleft()

        for neighbor in graph[node]:
            if neighbor not in distance:
                distance[neighbor] = distance[node] + 1
                queue.append(neighbor)

    return distance

# Multi-source BFS (from multiple starting points)
def multi_source_bfs(graph, sources):
    distance = {s: 0 for s in sources}
    queue = deque(sources)

    while queue:
        node = queue.popleft()

        for neighbor in graph[node]:
            if neighbor not in distance:
                distance[neighbor] = distance[node] + 1
                queue.append(neighbor)

    return distance`}],I=[{section:`Why & When`,signature:`Choosing shortest path algorithm`,description:`BFS: unweighted. Dijkstra: non-negative weights. Bellman-Ford: negative weights. Floyd-Warshall: all pairs, small graph. Choose based on graph type.`,complexity:`Concept`,example:`# SHORTEST PATH DECISION TREE

# UNWEIGHTED GRAPH → BFS
# All edges weight 1
# O(V + E), simplest
graph = {0: [1, 2], 1: [2, 3], 2: [3]}
from collections import deque
def bfs_shortest(graph, start):
    queue = deque([(start, 0)])
    visited = {start}
    while queue:
        node, dist = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))

# NON-NEGATIVE WEIGHTS → Dijkstra
# O((V + E) log V) with heap
# Greedy, always picks shortest unvisited
# Use when: typical road networks, weighted graphs

# NEGATIVE WEIGHTS → Bellman-Ford
# O(V * E), slower but handles negatives
# Detects negative cycles
# Use when: currency exchange, arbitrage

# ALL PAIRS → Floyd-Warshall
# O(V³), computes all-to-all distances
# Use when: V small (<500), need all distances
# Example: distance matrix for traveling salesman

# DECISION:
# Single source, no negatives → Dijkstra (fastest)
# Single source, negatives → Bellman-Ford
# All pairs, small V → Floyd-Warshall
# Unweighted → BFS (don't overcomplicate!)`},{section:`Why & When`,signature:`MST - when you need it`,description:`MST: minimum edges to connect all nodes. Use Kruskal (sparse) or Prim (dense). Applications: network design, clustering. Different from shortest path!`,complexity:`Concept`,example:`# MINIMUM SPANNING TREE (MST)
# Problem: Connect n cities with minimum total cable

# MST vs SHORTEST PATH:
# MST: Connects ALL nodes with min total cost
# Shortest path: Min cost from A to B

# Example: 4 cities
# MST might use: A-B(1), B-C(2), C-D(3) = 6 total
# Shortest A to D: might be A-D(10) direct!

# KRUSKAL'S ALGORITHM
# Sort edges by weight, add if no cycle
# O(E log E) ~ O(E log V)
# Best for: Sparse graphs (E ~ V)
def kruskal(n, edges):
    edges.sort(key=lambda x: x[2])  # By weight
    uf = UnionFind(n)
    mst = []
    for u, v, w in edges:
        if uf.union(u, v):  # No cycle
            mst.append((u, v, w))
    return mst

# PRIM'S ALGORITHM
# Grow MST from start node with min-heap
# O((V + E) log V)
# Best for: Dense graphs (E ~ V²)

# WHEN TO USE MST:
# - Network design (min cable/pipes)
# - Clustering (cut largest MST edges)
# - Approximate TSP (MST + shortcuts)
# - Image segmentation

# WHICH ALGORITHM:
# Sparse graph (E ~ V) → Kruskal
# Dense graph (E ~ V²) → Prim
# Both give same MST cost (might differ in edges)`},{section:`Shortest Path`,signature:`Dijkstra's Algorithm`,description:`Shortest path in weighted graph (non-negative weights). Uses min-heap.`,complexity:`O((V+E) log V)`,example:`import heapq

def dijkstra(graph, start):
    # graph[u] = [(v, weight), ...]
    distances = {start: 0}
    heap = [(0, start)]  # (distance, node)

    while heap:
        dist, node = heapq.heappop(heap)

        # Skip if we found a better path already
        if dist > distances.get(node, float('inf')):
            continue

        for neighbor, weight in graph[node]:
            new_dist = dist + weight
            if new_dist < distances.get(neighbor, float('inf')):
                distances[neighbor] = new_dist
                heapq.heappush(heap, (new_dist, neighbor))

    return distances

# With path reconstruction
def dijkstra_path(graph, start, end):
    distances = {start: 0}
    prev = {start: None}
    heap = [(0, start)]

    while heap:
        dist, node = heapq.heappop(heap)

        if node == end:
            # Reconstruct path
            path = []
            while node:
                path.append(node)
                node = prev[node]
            return path[::-1], dist

        if dist > distances.get(node, float('inf')):
            continue

        for neighbor, weight in graph[node]:
            new_dist = dist + weight
            if new_dist < distances.get(neighbor, float('inf')):
                distances[neighbor] = new_dist
                prev[neighbor] = node
                heapq.heappush(heap, (new_dist, neighbor))

    return [], float('inf')  # No path`},{section:`Shortest Path`,signature:`Bellman-Ford Algorithm`,description:`Shortest path with negative weights. Detects negative cycles. Slower than Dijkstra.`,complexity:`O(V*E)`,example:`def bellman_ford(n, edges, start):
    # edges = [(u, v, weight), ...]
    distances = [float('inf')] * n
    distances[start] = 0

    # Relax all edges V-1 times
    for _ in range(n - 1):
        for u, v, weight in edges:
            if distances[u] + weight < distances[v]:
                distances[v] = distances[u] + weight

    # Check for negative cycle
    for u, v, weight in edges:
        if distances[u] + weight < distances[v]:
            return None  # Negative cycle exists

    return distances

# Example:
# edges = [(0,1,4), (0,2,5), (1,2,-3), (2,3,4)]
# bellman_ford(4, edges, 0)
# Returns: [0, 4, 1, 5]

# WHEN TO USE:
# - Graph has negative edge weights
# - Need to detect negative cycles
# - Dijkstra won't work`},{section:`Shortest Path`,signature:`Floyd-Warshall Algorithm`,description:`All-pairs shortest path. O(V³) time. Good for dense graphs with small V.`,complexity:`O(V³)`,example:`def floyd_warshall(n, edges):
    # Initialize distance matrix
    INF = float('inf')
    dist = [[INF] * n for _ in range(n)]

    # Distance to self is 0
    for i in range(n):
        dist[i][i] = 0

    # Set direct edge weights
    for u, v, w in edges:
        dist[u][v] = w
        # dist[v][u] = w  # Uncomment for undirected

    # DP: try each vertex as intermediate
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]

    return dist

# Check for negative cycle
# If dist[i][i] < 0 for any i, negative cycle exists

# WHEN TO USE:
# - Need shortest path between ALL pairs
# - Small number of vertices (V < 500)
# - Dense graph`},{section:`MST Algorithms`,signature:`Kruskal's Algorithm (MST)`,description:`Build MST by adding cheapest edge that doesn't create cycle. Uses Union-Find.`,complexity:`O(E log E)`,example:`def kruskal(n, edges):
    # edges = [(u, v, weight), ...]
    # Sort by weight
    edges.sort(key=lambda x: x[2])

    parent = list(range(n))
    rank = [0] * n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return False
        if rank[px] < rank[py]:
            px, py = py, px
        parent[py] = px
        if rank[px] == rank[py]:
            rank[px] += 1
        return True

    mst = []
    mst_weight = 0

    for u, v, weight in edges:
        if union(u, v):
            mst.append((u, v, weight))
            mst_weight += weight
            if len(mst) == n - 1:
                break

    return mst, mst_weight`},{section:`MST Algorithms`,signature:`Prim's Algorithm (MST)`,description:`Build MST by growing from a starting node. Uses min-heap for efficiency.`,complexity:`O((V+E) log V)`,example:`import heapq

def prim(n, graph):
    # graph[u] = [(v, weight), ...]
    visited = [False] * n
    mst = []
    mst_weight = 0

    # Start from node 0
    heap = [(0, 0, -1)]  # (weight, node, parent)

    while heap and len(mst) < n:
        weight, node, parent = heapq.heappop(heap)

        if visited[node]:
            continue

        visited[node] = True
        if parent != -1:
            mst.append((parent, node, weight))
            mst_weight += weight

        for neighbor, w in graph[node]:
            if not visited[neighbor]:
                heapq.heappush(heap, (w, neighbor, node))

    return mst, mst_weight

# KRUSKAL vs PRIM:
# Kruskal: Better for sparse graphs, needs Union-Find
# Prim: Better for dense graphs, similar to Dijkstra`}],L=[{section:`Why & When`,signature:`Topological sort - when you need it`,description:`Pattern: order tasks with dependencies. Only works on DAG (no cycles). Use Kahn's (BFS) for cycle detection, DFS for simplicity.`,complexity:`Concept`,example:`# TOPOLOGICAL SORT USE CASES:
# - Course prerequisites (take A before B)
# - Build systems (compile X before Y)
# - Task scheduling with dependencies
# - Package dependency resolution

# REQUIREMENT: Must be DAG (Directed Acyclic Graph)
# If cycle exists → no valid order!

# KAHN'S ALGORITHM (BFS-based)
# 1. Track in-degree (incoming edges) for each node
# 2. Queue nodes with in-degree 0
# 3. Process queue, reduce in-degrees
# 4. If all nodes processed → valid topo sort
# 5. If queue empty but nodes remain → cycle!

from collections import deque
def topological_sort(n, edges):
    in_degree = [0] * n
    graph = [[] for _ in range(n)]

    for u, v in edges:
        graph[u].append(v)
        in_degree[v] += 1

    queue = deque([i for i in range(n) if in_degree[i] == 0])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return result if len(result) == n else []  # Cycle check

# DFS-BASED TOPOLOGICAL SORT
# Simpler code but doesn't detect cycles as easily
# Post-order DFS, reverse result

# WHEN TO USE WHICH:
# Need cycle detection → Kahn's (explicit check)
# Simple topo sort → DFS (cleaner code)
# Want to process level-by-level → Kahn's (BFS structure)`},{section:`Why & When`,signature:`Cycle detection - directed vs undirected`,description:`Directed: 3-color DFS (white/gray/black). Undirected: track parent in DFS. Union-Find also works for undirected. Different techniques!`,complexity:`Concept`,example:`# CYCLE DETECTION: DIRECTED GRAPH
# Use 3-color DFS
# White: unvisited, Gray: processing, Black: done
# Cycle: Edge to gray node (back edge)

def has_cycle_directed(graph, n):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * n

    def dfs(node):
        color[node] = GRAY
        for neighbor in graph[node]:
            if color[neighbor] == GRAY:  # Cycle!
                return True
            if color[neighbor] == WHITE and dfs(neighbor):
                return True
        color[node] = BLACK
        return False

    return any(dfs(i) for i in range(n) if color[i] == WHITE)

# CYCLE DETECTION: UNDIRECTED GRAPH
# Track parent to avoid false positives
# Edge to visited (non-parent) → cycle

def has_cycle_undirected(graph, n):
    visited = [False] * n

    def dfs(node, parent):
        visited[node] = True
        for neighbor in graph[node]:
            if not visited[neighbor]:
                if dfs(neighbor, node):
                    return True
            elif neighbor != parent:  # Cycle!
                return True
        return False

    return any(dfs(i, -1) for i in range(n) if not visited[i])

# UNION-FIND (undirected only)
# Simpler for undirected!
class UnionFind:
    def union(self, x, y):
        if self.find(x) == self.find(y):
            return False  # Cycle!
        # ... merge ...
        return True

# DECISION:
# Directed graph → 3-color DFS
# Undirected graph → Parent-tracking DFS or Union-Find
# Already using Union-Find → reuse it for cycle check`},{section:`Topological Sort`,signature:`Topological Sort (Kahn's)`,description:`Order nodes so all edges go left to right. For DAG only. BFS with in-degree.`,complexity:`O(V+E)`,example:`from collections import deque

def topological_sort(n, edges):
    # Build graph and in-degree
    graph = [[] for _ in range(n)]
    in_degree = [0] * n

    for u, v in edges:
        graph[u].append(v)
        in_degree[v] += 1

    # Start with nodes having no prerequisites
    queue = deque([i for i in range(n) if in_degree[i] == 0])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # Check if valid (no cycle)
    if len(result) != n:
        return []  # Cycle exists, no valid ordering

    return result

# Example: Course Schedule
# n=4, edges=[(1,0), (2,0), (3,1), (3,2)]
# Meaning: 1->0, 2->0, 3->1, 3->2 (prerequisites)
# Valid order: [3, 1, 2, 0] or [3, 2, 1, 0]`},{section:`Topological Sort`,signature:`Topological Sort (DFS)`,description:`DFS-based topological sort. Process node after all descendants.`,complexity:`O(V+E)`,example:`def topological_sort_dfs(n, edges):
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)

    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * n
    result = []
    has_cycle = False

    def dfs(node):
        nonlocal has_cycle
        if has_cycle:
            return

        color[node] = GRAY  # Processing

        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                has_cycle = True
                return
            if color[neighbor] == WHITE:
                dfs(neighbor)

        color[node] = BLACK  # Done
        result.append(node)

    for i in range(n):
        if color[i] == WHITE:
            dfs(i)

    if has_cycle:
        return []

    return result[::-1]  # Reverse for correct order`},{section:`Other Algorithms`,signature:`Cycle Detection (Directed)`,description:`DFS with three colors: white (unvisited), gray (processing), black (done).`,complexity:`O(V+E)`,example:`def has_cycle_directed(graph, n):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * n

    def dfs(node):
        color[node] = GRAY

        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                return True  # Back edge -> cycle
            if color[neighbor] == WHITE:
                if dfs(neighbor):
                    return True

        color[node] = BLACK
        return False

    for i in range(n):
        if color[i] == WHITE:
            if dfs(i):
                return True

    return False

# For UNDIRECTED graphs:
def has_cycle_undirected(graph, n):
    visited = [False] * n

    def dfs(node, parent):
        visited[node] = True
        for neighbor in graph[node]:
            if not visited[neighbor]:
                if dfs(neighbor, node):
                    return True
            elif neighbor != parent:
                return True  # Cycle found
        return False

    for i in range(n):
        if not visited[i]:
            if dfs(i, -1):
                return True
    return False`},{section:`Other Algorithms`,signature:`Connected Components`,description:`Count separate groups in undirected graph. DFS/BFS from each unvisited node.`,complexity:`O(V+E)`,example:`def count_components(n, edges):
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    visited = [False] * n
    count = 0

    def dfs(node):
        visited[node] = True
        for neighbor in graph[node]:
            if not visited[neighbor]:
                dfs(neighbor)

    for i in range(n):
        if not visited[i]:
            dfs(i)
            count += 1

    return count

# Get all components
def get_components(n, edges):
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    visited = [False] * n
    components = []

    def dfs(node, component):
        visited[node] = True
        component.append(node)
        for neighbor in graph[node]:
            if not visited[neighbor]:
                dfs(neighbor, component)

    for i in range(n):
        if not visited[i]:
            component = []
            dfs(i, component)
            components.append(component)

    return components`},{section:`Other Algorithms`,signature:`Bipartite Check`,description:`Can graph be 2-colored? BFS/DFS with color tracking. No odd cycles.`,complexity:`O(V+E)`,example:`from collections import deque

def is_bipartite(graph, n):
    color = [-1] * n

    def bfs(start):
        queue = deque([start])
        color[start] = 0

        while queue:
            node = queue.popleft()
            for neighbor in graph[node]:
                if color[neighbor] == -1:
                    color[neighbor] = 1 - color[node]
                    queue.append(neighbor)
                elif color[neighbor] == color[node]:
                    return False
        return True

    for i in range(n):
        if color[i] == -1:
            if not bfs(i):
                return False

    return True

# A graph is bipartite if and only if
# it contains no odd-length cycles

# USE CASES:
# - Matching problems
# - Two-team assignments
# - Conflict scheduling`}],R=[...F,...I,...L];var z=e();function B(e,i){return function(){let a=e.hasTabs&&e.basePath&&e.problemCategory?(0,z.jsx)(n,{basePath:e.basePath,problemCount:r(e.problemCategory)}):void 0;return(0,z.jsx)(t,{type:e.type,badge:e.badge,color:e.color,description:e.description,intro:e.intro,methods:i,tabs:a})}}const V=B(i.sorting,d),H=B(i.binarySearch,v),U=B(i.twoPointers,x),W=B(i.backtracking,E),G=B(i.dynamicProgramming,P),K=B(i.graph,R);export{W as BacktrackingPage,H as BinarySearchPage,G as DynamicProgrammingPage,K as GraphPage,V as SortingPage,U as TwoPointersPage};