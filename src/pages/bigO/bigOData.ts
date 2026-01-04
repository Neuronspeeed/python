// Complexity data for interactive cards and chart
export const complexities = [
  { notation: 'O(1)', name: 'Constant', rating: 'Excellent', color: '#16A34A', calc: () => 1 },
  { notation: 'O(log n)', name: 'Logarithmic', rating: 'Good', color: '#78716C', calc: (n: number) => Math.log2(n) },
  { notation: 'O(n)', name: 'Linear', rating: 'Fair', color: '#CA8A04', calc: (n: number) => n },
  { notation: 'O(n log n)', name: 'Linearithmic', rating: 'Bad', color: '#EA580C', calc: (n: number) => n * Math.log2(n) },
  { notation: 'O(n²)', name: 'Quadratic', rating: 'Horrible', color: '#DC2626', calc: (n: number) => n * n },
  { notation: 'O(2ⁿ)', name: 'Exponential', rating: 'Horrible', color: '#9333EA', calc: (n: number) => Math.pow(2, Math.min(n, 20)) },
]

// LeetCode examples with real interview problems
export const leetcodeExamples = [
  {
    title: 'Hash Map Lookup',
    subtitle: 'Two Sum · LeetCode #1',
    complexity: 'O(1)',
    rating: 'excellent' as const,
    desc: 'Hash table operations have constant time on average. The gold standard for fast lookups.',
    tags: ['Hash Table', 'Array'],
    code: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}  # O(1) lookup
    for i, num in enumerate(nums):
        if target - num in seen:
            return [seen[target - num], i]
        seen[num] = i
    return []`,
  },
  {
    title: 'Binary Search',
    subtitle: 'Search in Rotated Array · #33',
    complexity: 'O(log n)',
    rating: 'good' as const,
    desc: 'Halves search space each iteration. Essential for sorted array problems.',
    tags: ['Binary Search', 'Array'],
    code: `def search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1`,
  },
  {
    title: 'Two Pointers',
    subtitle: 'Container With Most Water · #11',
    complexity: 'O(n)',
    rating: 'fair' as const,
    desc: 'Single pass through array. Common pattern for array and string problems.',
    tags: ['Two Pointers', 'Greedy'],
    code: `def max_area(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    max_water = 0
    while left < right:
        h = min(height[left], height[right])
        max_water = max(max_water, (right - left) * h)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_water`,
  },
  {
    title: 'Merge Sort',
    subtitle: 'Sort an Array · LeetCode #912',
    complexity: 'O(n log n)',
    rating: 'bad' as const,
    desc: 'Divide and conquer. Optimal comparison-based sorting used in Timsort.',
    tags: ['Divide & Conquer', 'Sorting'],
    code: `def merge_sort(nums: list[int]) -> list[int]:
    if len(nums) <= 1:
        return nums
    mid = len(nums) // 2
    left = merge_sort(nums[:mid])
    right = merge_sort(nums[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    return result + left[i:] + right[j:]`,
  },
  {
    title: 'Dynamic Programming',
    subtitle: 'Longest Common Subsequence · #1143',
    complexity: 'O(n²)',
    rating: 'horrible' as const,
    desc: 'Nested iteration over two dimensions. Classic DP with memoization.',
    tags: ['DP', 'String', 'Memoization'],
    code: `def lcs(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`,
  },
  {
    title: 'Backtracking',
    subtitle: 'Subsets · LeetCode #78',
    complexity: 'O(2ⁿ)',
    rating: 'horrible' as const,
    desc: 'Generates all combinations. Exponential growth—use pruning when possible.',
    tags: ['Backtracking', 'Recursion'],
    code: `def subsets(nums: list[int]) -> list[list[int]]:
    result = []

    def backtrack(start: int, path: list):
        result.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()  # Backtrack

    backtrack(0, [])
    return result  # Returns 2^n subsets`,
  },
]

// Data Structure Operations data
export const dataStructureOps = [
  { name: 'Array', avgAccess: 'Θ(1)', avgSearch: 'Θ(n)', avgInsert: 'Θ(n)', avgDelete: 'Θ(n)', worstAccess: 'O(1)', worstSearch: 'O(n)', worstInsert: 'O(n)', worstDelete: 'O(n)', space: 'O(n)' },
  { name: 'Stack', avgAccess: 'Θ(n)', avgSearch: 'Θ(n)', avgInsert: 'Θ(1)', avgDelete: 'Θ(1)', worstAccess: 'O(n)', worstSearch: 'O(n)', worstInsert: 'O(1)', worstDelete: 'O(1)', space: 'O(n)' },
  { name: 'Queue', avgAccess: 'Θ(n)', avgSearch: 'Θ(n)', avgInsert: 'Θ(1)', avgDelete: 'Θ(1)', worstAccess: 'O(n)', worstSearch: 'O(n)', worstInsert: 'O(1)', worstDelete: 'O(1)', space: 'O(n)' },
  { name: 'Singly-Linked List', avgAccess: 'Θ(n)', avgSearch: 'Θ(n)', avgInsert: 'Θ(1)', avgDelete: 'Θ(1)', worstAccess: 'O(n)', worstSearch: 'O(n)', worstInsert: 'O(1)', worstDelete: 'O(1)', space: 'O(n)' },
  { name: 'Doubly-Linked List', avgAccess: 'Θ(n)', avgSearch: 'Θ(n)', avgInsert: 'Θ(1)', avgDelete: 'Θ(1)', worstAccess: 'O(n)', worstSearch: 'O(n)', worstInsert: 'O(1)', worstDelete: 'O(1)', space: 'O(n)' },
  { name: 'Skip List', avgAccess: 'Θ(log n)', avgSearch: 'Θ(log n)', avgInsert: 'Θ(log n)', avgDelete: 'Θ(log n)', worstAccess: 'O(n)', worstSearch: 'O(n)', worstInsert: 'O(n)', worstDelete: 'O(n)', space: 'O(n log n)' },
  { name: 'Hash Table', avgAccess: 'N/A', avgSearch: 'Θ(1)', avgInsert: 'Θ(1)', avgDelete: 'Θ(1)', worstAccess: 'N/A', worstSearch: 'O(n)', worstInsert: 'O(n)', worstDelete: 'O(n)', space: 'O(n)' },
  { name: 'Binary Search Tree', avgAccess: 'Θ(log n)', avgSearch: 'Θ(log n)', avgInsert: 'Θ(log n)', avgDelete: 'Θ(log n)', worstAccess: 'O(n)', worstSearch: 'O(n)', worstInsert: 'O(n)', worstDelete: 'O(n)', space: 'O(n)' },
  { name: 'B-Tree', avgAccess: 'Θ(log n)', avgSearch: 'Θ(log n)', avgInsert: 'Θ(log n)', avgDelete: 'Θ(log n)', worstAccess: 'O(log n)', worstSearch: 'O(log n)', worstInsert: 'O(log n)', worstDelete: 'O(log n)', space: 'O(n)' },
  { name: 'Red-Black Tree', avgAccess: 'Θ(log n)', avgSearch: 'Θ(log n)', avgInsert: 'Θ(log n)', avgDelete: 'Θ(log n)', worstAccess: 'O(log n)', worstSearch: 'O(log n)', worstInsert: 'O(log n)', worstDelete: 'O(log n)', space: 'O(n)' },
  { name: 'AVL Tree', avgAccess: 'Θ(log n)', avgSearch: 'Θ(log n)', avgInsert: 'Θ(log n)', avgDelete: 'Θ(log n)', worstAccess: 'O(log n)', worstSearch: 'O(log n)', worstInsert: 'O(log n)', worstDelete: 'O(log n)', space: 'O(n)' },
]

// Sorting Algorithms data
export const sortingAlgorithms = [
  { name: 'Quicksort', best: 'Ω(n log n)', avg: 'Θ(n log n)', worst: 'O(n²)', space: 'O(log n)' },
  { name: 'Mergesort', best: 'Ω(n log n)', avg: 'Θ(n log n)', worst: 'O(n log n)', space: 'O(n)' },
  { name: 'Timsort', best: 'Ω(n)', avg: 'Θ(n log n)', worst: 'O(n log n)', space: 'O(n)' },
  { name: 'Heapsort', best: 'Ω(n log n)', avg: 'Θ(n log n)', worst: 'O(n log n)', space: 'O(1)' },
  { name: 'Bubble Sort', best: 'Ω(n)', avg: 'Θ(n²)', worst: 'O(n²)', space: 'O(1)' },
  { name: 'Insertion Sort', best: 'Ω(n)', avg: 'Θ(n²)', worst: 'O(n²)', space: 'O(1)' },
  { name: 'Selection Sort', best: 'Ω(n²)', avg: 'Θ(n²)', worst: 'O(n²)', space: 'O(1)' },
  { name: 'Tree Sort', best: 'Ω(n log n)', avg: 'Θ(n log n)', worst: 'O(n²)', space: 'O(n)' },
  { name: 'Shell Sort', best: 'Ω(n log n)', avg: 'Θ(n(log n)²)', worst: 'O(n(log n)²)', space: 'O(1)' },
  { name: 'Bucket Sort', best: 'Ω(n+k)', avg: 'Θ(n+k)', worst: 'O(n²)', space: 'O(n)' },
  { name: 'Radix Sort', best: 'Ω(nk)', avg: 'Θ(nk)', worst: 'O(nk)', space: 'O(n+k)' },
  { name: 'Counting Sort', best: 'Ω(n+k)', avg: 'Θ(n+k)', worst: 'O(n+k)', space: 'O(k)' },
]

export function formatOps(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`
  return Math.round(n).toString()
}

// Complexity color mapping
export type ComplexityLevel = 'excellent' | 'good' | 'fair' | 'bad' | 'horrible' | 'na'

export function getComplexityClass(complexity: string): ComplexityLevel {
  const c = complexity.toLowerCase().replace(/\s/g, '')
  if (c === 'n/a' || c === '-') return 'na'
  if (c.includes('1)') && !c.includes('n')) return 'excellent'
  if (c.includes('logn)') && !c.includes('nlog')) return 'good'
  if (c.includes('n)') && !c.includes('n²') && !c.includes('n^2') && !c.includes('nlog') && !c.includes('nk') && !c.includes('n+k')) return 'fair'
  if (c.includes('nlogn)') || c.includes('n+k)') || c.includes('nk)')) return 'bad'
  if (c.includes('n²') || c.includes('n^2') || c.includes('(n(log')) return 'horrible'
  return 'fair'
}
