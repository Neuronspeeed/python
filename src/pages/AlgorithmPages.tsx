import { TypePage } from '../components/TypePage'
import { sortingMethods } from '../data/sorting'
import { binarySearchMethods } from '../data/binarySearch'
import { twoPointersMethods } from '../data/twoPointers'
import { backtrackingMethods } from '../data/backtracking'
import { dpMethods } from '../data/dp'
import { graphMethods } from '../data/graph'
import { DSCategoryTabs } from '../components/DSCategoryTabs'
import { getProblemCount } from '../data/learn'

const sortingIntro = `Sorting is the process of arranging elements in order. It's one of the most fundamental operations in computer science—many algorithms become trivial once data is sorted. The key insight: spending O(n log n) to sort often unlocks O(n) or O(log n) algorithms that would otherwise be O(n²) or impossible.

PYTHON'S TIMSORT: Python uses Timsort (hybrid merge-insertion sort) for both \`list.sort()\` and \`sorted()\`. Timsort is optimized for real-world data with runs of already-sorted elements. Performance: O(n log n) worst case, O(n) best case on nearly-sorted data. It's stable (preserves order of equal elements) and highly optimized in C. Bottom line: Python's built-in sort is usually your best choice—don't implement quicksort or mergesort unless specifically required.

SORT FIRST STRATEGY: When stuck on a problem, ask "what if I sort first?" Sorting unlocks powerful patterns. Sorting enables two pointers (find pair with target sum), binary search (search in O(log n)), greedy algorithms (interval scheduling), and eliminates the need to track multiple states. Example: "Find if array has duplicate" becomes trivial after sorting—just check consecutive elements.

CUSTOM SORT KEYS: The \`key\` parameter transforms each element before comparison. Common patterns: \`key=lambda x: x[0]\` sorts tuples by first element, \`key=lambda x: (x[0], -x[1])\` sorts by first ascending, second descending (negate for reverse), \`key=len\` sorts by length, \`key=str.lower\` case-insensitive sort. The key function is called once per element (efficient).

\`\`\`python
# Sort 2D points by x, then y
points.sort(key=lambda p: (p[0], p[1]))

# Sort intervals by end time (greedy scheduling)
intervals.sort(key=lambda i: i[1])

# Sort strings by length, then alphabetically
words.sort(key=lambda w: (len(w), w))

# Descending by first element
arr.sort(key=lambda x: -x[0])
\`\`\`

STABILITY MATTERS: A stable sort preserves the original order of equal elements. Example: sorting [(1, 'a'), (2, 'b'), (1, 'c')] by first element gives [(1, 'a'), (1, 'c'), (2, 'b')]—the two 1s stay in original order. Python's sort is stable. When does this matter? When you sort multiple times by different keys (sort by secondary key first, then primary key—stable sort preserves secondary ordering). When equal elements have hidden state you want preserved. When implementing tie-breakers.

IN-PLACE VS NEW LIST: \`list.sort()\` sorts in place, modifies the list, returns None, uses O(1) extra space. \`sorted(list)\` returns a new sorted list, original unchanged, uses O(n) extra space. Use \`sort()\` when you don't need the original. Use \`sorted()\` when you need to keep original, or when sorting other iterables (tuples, strings, generators).

\`\`\`python
# In-place - modifies arr
arr = [3, 1, 2]
arr.sort()  # arr is now [1, 2, 3]

# New list - original unchanged
arr = [3, 1, 2]
new = sorted(arr)  # new is [1, 2, 3], arr still [3, 1, 2]
\`\`\`

ALGORITHM COMPARISON: Bubble/Selection/Insertion are O(n²) average case—only use for educational purposes or tiny arrays (n < 10). Merge sort is O(n log n) worst case, stable, but needs O(n) space—good for linked lists. Quick sort is O(n log n) average, O(n²) worst case, in-place but unstable—rarely implement in Python since Timsort is better. Heap sort is O(n log n) worst case, in-place but unstable—use when you need guaranteed O(n log n) with O(1) space. Counting/Radix sort are O(n+k) for integers in range k—use when sorting integers in limited range.

WHEN NOT TO SORT: If you need the k smallest/largest elements, use a heap (O(n log k) vs O(n log n) for full sort). If data arrives in real-time, maintain a sorted structure (heap, BST) instead of repeatedly sorting. If you only need one element (min/max), use O(n) \`min()\`/\`max()\` instead of O(n log n) sort.`

export function SortingPage() {
  return (
    <TypePage
      type="Sorting Algorithms" badge="sort" color="var(--accent-sorting)"
      description="Master sorting algorithms. Know when to use each. Python's Timsort is usually best."
      intro={sortingIntro}
      tip={`Custom sort key? key=lambda x: (x[0], -x[1]) for tuples, use - for descending
In-place vs new? list.sort() mutates O(1) space, sorted() returns new O(n) space
Stuck on problem? Try sorting first - unlocks greedy, two pointers, binary search
Stable sort matters? Python's sort is stable (preserves original order for equal elements)`}
      methods={sortingMethods}
    />
  )
}

const binarySearchIntro = `Binary search is the fundamental O(log n) algorithm for searching sorted data. Instead of checking every element, it repeatedly divides the search space in half. The key insight: if you can eliminate half the possibilities with one comparison, you get logarithmic time.

THREE VARIANTS: The exact variant finds a target value. The left-most variant finds the first position where you could insert target (smallest index ≥ target). The right-most variant finds the position after the last occurrence (smallest index > target). Most interview problems need left-most or right-most, not exact.

TEMPLATE - EXACT MATCH: Standard binary search to find if target exists. Returns index if found, -1 otherwise. Use \`while left <= right\` because we need to check when \`left == right\`.

\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
\`\`\`

TEMPLATE - LEFT-MOST (LOWER BOUND): Find first position ≥ target. Use \`while left < right\` (no equals!) because we're finding a boundary. When \`arr[mid] >= target\`, target could be at mid or earlier, so \`right = mid\` (not mid-1). Python's \`bisect_left\` does this.

\`\`\`python
def bisect_left(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid  # Could be at mid
    return left
\`\`\`

TEMPLATE - RIGHT-MOST (UPPER BOUND): Find first position > target. Same pattern, different condition. When \`arr[mid] <= target\`, we need to search right, so \`left = mid + 1\`. Python's \`bisect_right\` does this.

\`\`\`python
def bisect_right(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] <= target:
            left = mid + 1
        else:
            right = mid
    return left
\`\`\`

SEARCH ON THE ANSWER: The breakthrough pattern for "minimum X where condition works" problems. Instead of searching in an array, binary search on the answer space. Example: "Minimum speed to finish in H hours" → binary search speeds [1...max], check if each speed works. The key insight: if speed X works, speed X+1 also works (monotonic). Find the minimum that satisfies the condition.

WHEN TO USE WHICH: Need to find if value exists → exact. Need first/last occurrence → left/right-most. "Minimum X where..." → search on answer with left-most template. "Maximum X where..." → search on answer, reverse the condition. Insert position → left-most gives you where to insert to maintain sorted order.

COMMON MISTAKES: Using \`left <= right\` for boundary problems (infinite loop risk). Forgetting that right-most returns position AFTER last occurrence. Not checking if returned index is valid (\`bisect_left\` can return \`len(arr)\`). Integer overflow in \`mid = (left + right) // 2\` (use \`left + (right - left) // 2\` for very large arrays, though Python handles big ints).`

export function BinarySearchPage() {
  return (
    <TypePage
      type="Binary Search" badge="log" color="var(--accent-binary-search)"
      description="O(log n) search in sorted data. Master the three variants: exact, left-most, right-most."
      intro={binarySearchIntro}
      tip={`Sorted data? Binary search
"Minimum speed/capacity where condition works"? Binary search on answer
Find boundary? while left < right, not left <= right
Python has it! bisect_left for ≥ target, bisect_right for > target`}
      methods={binarySearchMethods}
      tabs={<DSCategoryTabs basePath="/binary-search" problemCount={getProblemCount('binarySearch')} />}
    />
  )
}

const twoPointersIntro = `Two pointers uses two integer variables moving along an array or string. Instead of checking all O(n²) pairs with nested loops, we strategically move pointers to find answers in O(n) time.

PATTERN 1 - OPPOSITE ENDS: Start pointers at first and last index, move toward each other until they meet. Use when: searching for pairs in SORTED arrays, palindrome checking, or comparing elements from both ends.

Template: \`left, right = 0, len(arr) - 1\` then \`while left < right\` — at each step, move left forward, right backward, or both based on comparison. Key insight: in sorted array, if \`arr[left] + arr[right] > target\`, ALL pairs ending at right are too big (move right back). If sum is too small, ALL pairs starting at left are too small (move left forward).

PATTERN 2 - SAME DIRECTION: Both pointers start at index 0, move forward through input. Use when: merging sorted arrays, comparing two sequences, or finding subsequences.

Template: \`i, j = 0, 0\` then \`while i < len(arr1) and j < len(arr2)\` — move whichever pointer points to the smaller/relevant element. After loop, handle remaining elements in either array.

SLIDING WINDOW: A special two-pointer pattern for subarray/substring problems. Expand window (move right) to include elements, shrink window (move left) when constraint violated. Use when: "longest/shortest subarray with property X", "subarray with sum = k", or "substring containing all characters".

WHY IT WORKS: Each pointer moves at most n times and never moves backward. Total operations: O(n), not O(n²). Works because sorted order or problem structure lets us eliminate impossible pairs/subarrays without checking them.

WHEN TO USE: Pair/triplet in sorted array → opposite ends. Merge sorted inputs → same direction. "Longest subarray with X" → sliding window. Palindrome check → opposite ends. Subsequence matching → same direction.`

export function TwoPointersPage() {
  return (
    <TypePage
      type="Two Pointers & Sliding Window" badge="2ptr" color="var(--accent-two-pointers)"
      description="Two pointers for O(n) solutions. Sliding window for subarray/substring problems."
      intro={twoPointersIntro}
      tip={`Find pair in sorted array? Two pointers from ends
"Longest subarray with X"? Sliding window
Shrink window when? Constraint violated`}
      methods={twoPointersMethods}
      tabs={<DSCategoryTabs basePath="/two-pointers" problemCount={getProblemCount('twoPointers')} />}
    />
  )
}

const backtrackingIntro = `Backtracking systematically explores all possible solutions by building candidates incrementally and abandoning (backtracking from) candidates as soon as it's determined they cannot lead to a valid solution. The key insight: instead of generating all possibilities upfront, build them one choice at a time, pruning invalid branches early.

CHOOSE-EXPLORE-UNCHOOSE PATTERN: The universal backtracking template. Choose: make a choice and add it to current path. Explore: recursively solve the subproblem. Unchoose: remove the choice (backtrack) to try other options. This pattern generates all possibilities while maintaining state correctly.

\`\`\`python
def backtrack(path, choices):
    if is_complete(path):
        result.append(path[:])  # Store copy!
        return

    for choice in choices:
        if is_valid(choice, path):  # Prune early
            path.append(choice)      # Choose
            backtrack(path, remaining)  # Explore
            path.pop()               # Unchoose
\`\`\`

WHEN TO USE BACKTRACKING: "Find all combinations/permutations/subsets" → backtracking. "Solve this constraint satisfaction puzzle" (Sudoku, N-Queens) → backtracking. Key signal: need ALL solutions, not just optimal one. Backtracking vs DP: backtracking enumerates solutions, DP counts/optimizes without enumerating. If problem asks "how many ways" (count only), consider DP. If it asks "list all ways", use backtracking.

PRUNING IS CRITICAL: Backtracking is exponential time—O(b^d) where b is branching factor, d is depth. Without pruning, it's too slow. Prune BEFORE recursing, not after. Check constraints at each step: if current path violates rules, don't explore children. Example: N-Queens placing queen in attacked position → don't recurse, skip to next column. Good pruning can reduce runtime from hours to milliseconds.

\`\`\`python
# BAD - explores then checks
def backtrack(path):
    if len(path) == n:
        if is_valid(path):  # Too late!
            result.append(path[:])
        return
    for choice in choices:
        path.append(choice)
        backtrack(path)
        path.pop()

# GOOD - checks before exploring
def backtrack(path):
    if len(path) == n:
        result.append(path[:])  # Know it's valid
        return
    for choice in choices:
        if is_valid_choice(choice, path):  # Prune early
            path.append(choice)
            backtrack(path)
            path.pop()
\`\`\`

STATE MANAGEMENT GOTCHA: When storing results, always copy the path: \`result.append(path[:])\` or \`result.append(list(path))\`. If you append \`path\` directly, you're appending a reference—when path changes later, the stored result changes too! All stored results end up pointing to the same list. Use \`path[:]\` to create a shallow copy.

COMMON PATTERNS: Permutations - choose from remaining elements, reduce choices each level. Combinations - choose from elements at current index onward (avoid duplicates by not going backward). Subsets - at each element, choose to include or exclude (2^n total). Constraint satisfaction - validate constraints at each step, backtrack if violated.

COMPLEXITY ANALYSIS: Permutations: O(n!). Subsets: O(2^n). Combinations: O(C(n,k) * k) where k is combination size. Sudoku: O(9^(empty cells)) worst case. For n > 20, backtracking gets slow even with pruning. Consider dynamic programming, greedy, or heuristics for larger inputs.`

export function BacktrackingPage() {
  return (
    <TypePage
      type="Backtracking" badge="bt" color="var(--accent-backtracking)"
      description="Explore all solutions by building incrementally. Essential for permutations, combinations, constraint satisfaction."
      intro={backtrackingIntro}
      tip={`"Find ALL combinations/permutations"? Backtracking (not DP!)
Pattern? choose → explore (recurse) → unchoose (backtrack)
Store result? append path[:] not path (copy required!)
Prune early? Check constraints BEFORE recursing, not after (huge speedup)`}
      methods={backtrackingMethods}
      tabs={<DSCategoryTabs basePath="/backtracking" problemCount={getProblemCount('backtracking')} />}
    />
  )
}

const dpIntro = `Dynamic Programming (DP) solves optimization problems by breaking them into overlapping subproblems, solving each subproblem once, and storing results to avoid redundant computation. The key insight: if a problem has optimal substructure (optimal solution contains optimal solutions to subproblems) and overlapping subproblems (same subproblems solved multiple times), DP can reduce exponential time to polynomial.

WHEN TO USE DP: Signal words: "count the number of ways", "find minimum/maximum cost", "longest/shortest sequence". If the problem asks for ALL solutions, use backtracking. If it asks to COUNT or OPTIMIZE, use DP. Classic DP: Fibonacci, coin change, knapsack, longest common subsequence, edit distance, matrix chain multiplication.

TOP-DOWN (MEMOIZATION) VS BOTTOM-UP (TABULATION): Top-down: write recursive solution, add memoization to cache results. Natural to think about, solves only needed subproblems. Use \`@lru_cache\` decorator in Python (one line!). Bottom-up: build table iteratively from base cases. Usually faster, better space control, no recursion overhead. Choose top-down for clarity, bottom-up for performance.

\`\`\`python
# TOP-DOWN (memoization with @lru_cache)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# BOTTOM-UP (tabulation with array)
def fib(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
\`\`\`

THE 4-STEP DP FRAMEWORK: (1) Define STATE: what information do you need to solve a subproblem? For Fibonacci: dp[i] = ith Fibonacci number. For knapsack: dp[i][w] = max value using first i items with capacity w. (2) Find RECURRENCE: how to compute dp[state] from smaller states? Fibonacci: dp[i] = dp[i-1] + dp[i-2]. (3) Set BASE CASES: smallest subproblems you can solve directly. Fibonacci: dp[0] = 0, dp[1] = 1. (4) Determine COMPUTATION ORDER: which direction to fill the table? Fibonacci: increasing order (i = 2 to n).

1D DP PATTERNS: Use when state depends on a single variable. Climbing stairs: dp[i] = ways to reach step i. House robber: dp[i] = max money robbing houses 0..i. Coin change: dp[i] = min coins to make amount i. Generally: problems with single sequence, single variable optimization.

2D DP PATTERNS: Use when state depends on two variables. Two sequences: LCS (longest common subsequence) dp[i][j] = LCS of first i chars of s1, first j chars of s2. Edit distance: dp[i][j] = min edits to transform first i chars to first j chars. Knapsack: dp[i][w] = max value with first i items, capacity w. Intervals: dp[i][j] = optimal for range [i, j]. Grid paths: dp[i][j] = ways to reach cell (i, j).

COMMON MISTAKES: Forgetting base cases (causes wrong answers or crashes). Wrong iteration order (accessing uncomputed values). Not using enough dimensions (state missing critical information). Thinking DP works when subproblems aren't overlapping (just use recursion). Off-by-one errors in indices.

OPTIMIZATION TECHNIQUES: Space optimization - if dp[i] only depends on dp[i-1], use two variables instead of array (Fibonacci: O(n) → O(1) space). State compression - encode multiple dimensions into one using bitmask. Print solution - store parent pointers to reconstruct path, not just optimal value.`

export function DynamicProgrammingPage() {
  return (
    <TypePage
      type="Dynamic Programming" badge="dp" color="var(--accent-dp)"
      description="Solve complex problems by breaking into overlapping subproblems. Memoization vs tabulation."
      intro={dpIntro}
      tip={`"Count ways" or "min/max cost"? Almost always DP
Framework? (1) state (2) recurrence (3) base case (4) order
Quick memo? @lru_cache decorator (top-down), or build dp[] table (bottom-up)
1D vs 2D? Single sequence → 1D, two sequences or intervals → 2D`}
      methods={dpMethods}
      tabs={<DSCategoryTabs basePath="/dynamic-programming" problemCount={getProblemCount('dynamicProgramming')} />}
    />
  )
}

const graphIntro = `Graphs represent relationships between objects. A graph is a set of vertices (nodes) connected by edges. Graphs can be directed (one-way edges) or undirected (two-way edges), weighted (edges have costs) or unweighted. The key insight: many real-world problems (social networks, maps, dependencies) are naturally modeled as graphs.

GRAPH REPRESENTATION: Adjacency list - dictionary mapping vertex to list of neighbors. Space O(V + E), efficient for sparse graphs. Most common in interviews. Adjacency matrix - 2D array where matrix[i][j] = 1 if edge exists. Space O(V²), fast edge lookup O(1), use for dense graphs. Python: use \`defaultdict(list)\` for adjacency list, \`[[0]*n for _ in range(n)]\` for matrix.

\`\`\`python
# Adjacency list (most common)
graph = {
    0: [1, 2],
    1: [2],
    2: [3],
    3: []
}
# or defaultdict(list) for easier building
from collections import defaultdict
graph = defaultdict(list)
graph[0].append(1)
\`\`\`

BFS VS DFS: BFS (Breadth-First Search) explores level by level using a queue. Finds shortest path in unweighted graphs, explores neighbors before going deeper. Use for: shortest path (unweighted), level-order traversal, testing bipartiteness, finding connected components at minimum distance. DFS (Depth-First Search) explores as deep as possible using recursion or stack. Use for: finding all paths, detecting cycles, topological sort, strongly connected components, maze solving. Both are O(V + E) time.

\`\`\`python
# BFS template
from collections import deque
def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

# DFS template (recursive)
def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
\`\`\`

SHORTEST PATH ALGORITHMS: Unweighted graph → BFS finds shortest path in O(V + E). Weighted graph with non-negative edges → Dijkstra's algorithm uses priority queue, O((V + E) log V). Negative edge weights → Bellman-Ford, O(V * E), also detects negative cycles. All pairs shortest paths → Floyd-Warshall, O(V³), finds distances between all vertex pairs. Decision: unweighted = BFS, weighted non-negative = Dijkstra, negative edges = Bellman-Ford, all pairs with small V = Floyd-Warshall.

TOPOLOGICAL SORT: Ordering of directed acyclic graph (DAG) vertices so every edge goes from earlier to later in the ordering. Use for: course prerequisites, build systems, task scheduling. Two methods: Kahn's algorithm (BFS-based, easy to detect cycles), DFS-based (add to result in reverse post-order). Both O(V + E). If graph has cycle, topological sort is impossible.

CYCLE DETECTION: Undirected graph → DFS, mark vertices as visited, if you visit a visited neighbor (not parent), there's a cycle. Directed graph → DFS with 3 colors (white=unvisited, gray=in progress, black=done), edge to gray node means cycle. Or use topological sort - if it succeeds, no cycle.

CONNECTED COMPONENTS: Use DFS or BFS to find all vertices reachable from a starting vertex. Run DFS/BFS from each unvisited vertex to find all components. Alternative: Union-Find (disjoint set union) for dynamic connectivity queries.`

export function GraphPage() {
  return (
    <TypePage
      type="Graph Algorithms" badge="bfs" color="var(--accent-graph)"
      description="Graph traversal, shortest paths, and spanning trees. Master DFS, BFS, Dijkstra, and topological sort."
      intro={graphIntro}
      tip={`Shortest path unweighted? BFS - Weighted non-negative? Dijkstra - Negative edges? Bellman-Ford
Explore all paths? DFS - Level-by-level? BFS - Cycle detection? DFS with colors
Dependencies/ordering? Topological sort (Kahn's for cycle detect, DFS for simplicity)
Connected components? DFS or Union-Find`}
      methods={graphMethods}
      tabs={<DSCategoryTabs basePath="/graph" problemCount={getProblemCount('graphs')} />}
    />
  )
}
