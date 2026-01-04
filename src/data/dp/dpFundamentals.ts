import type { Method } from '../../types'

// Why & When + 1D DP Problems
export const dpFundamentalsMethods: Method[] = [
  // Why & When
  { signature: 'Why use Dynamic Programming?', description: 'Solve complex problems by breaking into overlapping subproblems. Store results to avoid recomputation. O(n) or O(n²) vs exponential.', complexity: 'Concept', section: 'Why & When', example: `# DYNAMIC PROGRAMMING = Recursion + Memoization
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
    return dp[n]` },
  { signature: 'Top-Down vs Bottom-Up', description: 'Top-down uses recursion with cache. Bottom-up builds table iteratively. Both have same complexity.', complexity: 'Concept', section: 'Why & When', example: `# TOP-DOWN (Memoization)
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
    return prev1  # O(1) space!` },

  // 1D DP
  { signature: 'Climbing Stairs', description: 'Classic 1D DP. Ways to reach step n from step 0.', complexity: 'O(n)', section: '1D DP', example: `# Ways to climb n stairs, can take 1 or 2 steps
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
    return dp[n]` },
  { signature: 'House Robber', description: 'Maximum sum of non-adjacent elements. Classic 1D DP pattern.', complexity: 'O(n)', section: '1D DP', example: `# Can't rob adjacent houses
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
    return max(rob_opt(nums[1:]), rob_opt(nums[:-1]))` },
  { signature: 'Coin Change', description: 'Minimum coins to make amount. Unbounded knapsack variant.', complexity: 'O(amount * n)', section: '1D DP', example: `# Minimum coins to make amount
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
# Ways: 1+1+...+1, 1+1+...+2, ..., 5+5+1` },
  { signature: 'Longest Increasing Subsequence', description: 'Find length of LIS. O(n²) DP or O(n log n) with binary search.', complexity: 'O(n²) or O(n log n)', section: '1D DP', example: `# O(n²) DP solution
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
# Length: 4` },
  { signature: 'Word Break', description: 'Can string be segmented into dictionary words? DP on string prefixes.', complexity: 'O(n² * k)', section: '1D DP', example: `def word_break(s, wordDict):
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
# Output: True, ["leet code"]` },
  { signature: 'Decode Ways', description: 'Number of ways to decode digit string to letters.', complexity: 'O(n)', section: '1D DP', example: `def num_decodings(s):
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
# Output: 3` },
]
