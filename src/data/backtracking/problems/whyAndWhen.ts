import type { Method } from '../../../types'

export const whyAndWhenMethods: Method[] = [
  { signature: 'When to use backtracking', description: 'Pattern: explore all possibilities with constraints. Recognize by: "all combinations", "all permutations", "solve puzzle". Complexity often exponential.', complexity: 'Concept', section: 'Why & When', example: `# BACKTRACKING SIGNALS:
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
# - No better alternative exists`,
  },
  { signature: 'Backtracking template and pruning', description: 'Core pattern: choose → explore → unchoose. Pruning is critical - prune early, prune often. Without pruning, exponential explodes.', complexity: 'Concept', section: 'Why & When', example: `# BACKTRACKING TEMPLATE
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
# 4. Memoize impossible states (DP hybrid)`,
  },
  { signature: 'Backtracking vs DP - when to choose which', description: 'Backtracking: need all solutions, no overlapping subproblems. DP: optimal solution, overlapping subproblems. Sometimes both work.', complexity: 'Concept', section: 'Why & When', example: `# BACKTRACKING PROBLEMS:
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
# "Find longest subset with property" → DP (one optimal)`,
  },
]
