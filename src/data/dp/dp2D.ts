import type { Method } from '../../types'

// 2D DP + Interval DP + String DP
export const dp2DMethods: Method[] = [
  // 2D DP
  { signature: 'Unique Paths', description: 'Count paths in grid from top-left to bottom-right.', complexity: 'O(m*n)', section: '2D DP', example: `def unique_paths(m, n):
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

    return dp[m-1][n-1]` },
  { signature: 'Minimum Path Sum', description: 'Find path with minimum sum from top-left to bottom-right.', complexity: 'O(m*n)', section: '2D DP', example: `def min_path_sum(grid):
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

    return grid[m-1][n-1]` },
  { signature: 'Longest Common Subsequence', description: 'Find LCS of two strings. Classic 2D DP.', complexity: 'O(m*n)', section: '2D DP', example: `def longest_common_subsequence(text1, text2):
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

# Example: "abcde", "ace" -> LCS = "ace", length = 3` },
  { signature: 'Edit Distance', description: 'Minimum operations to transform word1 to word2.', complexity: 'O(m*n)', section: '2D DP', example: `def min_distance(word1, word2):
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
# Output: 3` },

  // Interval DP
  { signature: 'Burst Balloons', description: 'Max coins by bursting balloons. Interval DP classic.', complexity: 'O(n³)', section: 'Interval DP', example: `def max_coins(nums):
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
# Total: 167` },
  { signature: 'Matrix Chain Multiplication', description: 'Minimum cost to multiply chain of matrices.', complexity: 'O(n³)', section: 'Interval DP', example: `def matrix_chain_order(dims):
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
# Output: 4500` },

  // String DP
  { signature: 'Longest Palindromic Substring', description: 'Find longest palindrome in string. Expand around center or DP.', complexity: 'O(n²)', section: 'String DP', example: `# Expand around center (cleaner)
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

# Example: "babad" -> "bab" or "aba"` },
  { signature: 'Palindrome Substrings Count', description: 'Count all palindromic substrings.', complexity: 'O(n²)', section: 'String DP', example: `def count_substrings(s):
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
# Example: "aaa" -> 6 (a, a, a, aa, aa, aaa)` },
]
