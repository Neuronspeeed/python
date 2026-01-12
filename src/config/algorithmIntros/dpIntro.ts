export const dpIntro = `When to Use Dynamic Programming: Two Requirements
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
