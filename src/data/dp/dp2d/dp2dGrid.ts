import type { Method } from '../../../types'

export const dp2dGridMethods: Method[] = [
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
]
