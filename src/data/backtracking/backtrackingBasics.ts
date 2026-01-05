import type { Method } from '../../types'

// Why & When + Subsets & Combinations + Permutations
export const backtrackingBasicsMethods: Method[] = [
  // Why & When
  { signature: 'Why use Backtracking?', description: 'Explore all possible solutions by building incrementally and abandoning paths that fail constraints. Use for: permutations, combinations, subsets, constraint satisfaction.', complexity: 'Concept', section: 'Why & When', example: `# BACKTRACKING = DFS with pruning
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
# Prune branches that can't lead to valid solutions` },
  { signature: 'Backtracking vs DP vs Greedy', description: 'Backtracking explores all paths. DP stores subproblem results. Greedy makes locally optimal choices.', complexity: 'Concept', section: 'Why & When', example: `# WHEN TO USE EACH:

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
# - Generate all subsets -> Backtracking` },

  // Subsets & Combinations
  { signature: 'Subsets (Power Set)', description: 'Generate all 2^n subsets. Include/exclude each element.', complexity: 'O(2^n)', section: 'Subsets & Combinations', example: `def subsets(nums):
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
    return result` },
  { signature: 'Subsets with Duplicates', description: 'Generate unique subsets when input has duplicates. Sort and skip consecutive duplicates.', complexity: 'O(2^n)', section: 'Subsets & Combinations', example: `def subsets_with_dup(nums):
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
# Note: [2] appears once, not twice` },
  { signature: 'Combinations', description: 'Generate all C(n,k) combinations. Choose k elements from n.', complexity: 'O(C(n,k))', section: 'Subsets & Combinations', example: `def combinations(n, k):
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
    return result` },
  { signature: 'Combination Sum II', description: 'Find combinations summing to target. Each candidate used once. Handle duplicates.', complexity: 'O(2^n)', section: 'Subsets & Combinations', example: `def combination_sum2(candidates, target):
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
# 3. Sort + skip pattern for unique combinations` },

  // Permutations
  { signature: 'Permutations', description: 'Generate all n! permutations. Use each element exactly once.', complexity: 'O(n!)', section: 'Permutations', example: `def permutations(nums):
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
    return result` },
  { signature: 'Permutations with Duplicates', description: 'Generate unique permutations. Sort and skip used duplicates.', complexity: 'O(n!)', section: 'Permutations', example: `def permute_unique(nums):
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
# NOT: [[1,1,2], [1,1,2], [1,2,1], [1,2,1], [2,1,1], [2,1,1]]` },
]
