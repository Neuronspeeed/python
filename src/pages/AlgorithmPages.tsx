import { TypePage } from '../components/TypePage'
import { sortingMethods } from '../data/sorting'
import { binarySearchMethods } from '../data/binarySearch'
import { twoPointersMethods } from '../data/twoPointers'
import { backtrackingMethods } from '../data/backtracking'
import { dpMethods } from '../data/dp'
import { graphMethods } from '../data/graph'
import { DSCategoryTabs } from '../components/DSCategoryTabs'
import { getProblemCount } from '../data/learn'

export function SortingPage() {
  return (
    <TypePage
      type="Sorting Algorithms" badge="sort" color="var(--accent-sorting)"
      description="Master sorting algorithms. Know when to use each. Python's Timsort is usually best."
      tip={`Custom sort key? key=lambda x: (x[0], -x[1])
In-place vs new? sort() mutates, sorted() returns new
Stuck on problem? Try sorting first`}
      methods={sortingMethods}
    />
  )
}

export function BinarySearchPage() {
  return (
    <TypePage
      type="Binary Search" badge="log" color="var(--accent-binary-search)"
      description="O(log n) search in sorted data. Master the three variants: exact, left-most, right-most."
      tip={`Sorted data? Binary search
"Min/max that satisfies X?" Binary search on answer
Find boundary? left < right, not left <= right`}
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

export function BacktrackingPage() {
  return (
    <TypePage
      type="Backtracking" badge="bt" color="var(--accent-backtracking)"
      description="Explore all solutions by building incrementally. Essential for permutations, combinations, constraint satisfaction."
      tip={`"Find ALL combinations"? Backtracking
Pattern? choose → explore → unchoose
Store result? append path[:] not path`}
      methods={backtrackingMethods}
      tabs={<DSCategoryTabs basePath="/backtracking" problemCount={getProblemCount('backtracking')} />}
    />
  )
}

export function DynamicProgrammingPage() {
  return (
    <TypePage
      type="Dynamic Programming" badge="dp" color="var(--accent-dp)"
      description="Solve complex problems by breaking into overlapping subproblems. Memoization vs tabulation."
      tip={`"Count ways" or "min cost"? DP
Framework? state → recurrence → base case
Quick memo? @lru_cache decorator`}
      methods={dpMethods}
      tabs={<DSCategoryTabs basePath="/dynamic-programming" problemCount={getProblemCount('dynamicProgramming')} />}
    />
  )
}

export function GraphPage() {
  return (
    <TypePage
      type="Graph Algorithms" badge="bfs" color="var(--accent-graph)"
      description="Graph traversal, shortest paths, and spanning trees. Master DFS, BFS, Dijkstra, and topological sort."
      tip={`Shortest path (unweighted)? BFS
Explore all paths? DFS
Dependencies/ordering? Topological sort`}
      methods={graphMethods}
      tabs={<DSCategoryTabs basePath="/graph" problemCount={getProblemCount('graphs')} />}
    />
  )
}
