import type { Method } from '../../../types'

export const dp2dWhyWhenMethods: Method[] = [
  { signature: 'When to use 2D DP', description: 'Pattern: two sequences/dimensions, decision depends on both indices. Recognize by: grid paths, string matching, two arrays optimization.', complexity: 'Concept', section: 'Why & When', example: `# 2D DP SIGNALS:
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
# Larger → need optimization or different approach`,
  },
  { signature: 'Interval DP pattern - when and how', description: 'Pattern: optimal way to process interval [i, j]. Recurrence splits interval. O(n³) typical. Use for: burst balloons, matrix chain, palindromes.', complexity: 'Concept', section: 'Why & When', example: `# INTERVAL DP TEMPLATE:
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
# Sometimes can reduce to O(n²)`,
  },
  { signature: 'String DP - common patterns', description: 'Substring vs subsequence. Substring: contiguous, use DP[i][j]. Subsequence: gaps ok, often 2D DP comparing characters.', complexity: 'Concept', section: 'Why & When', example: `# SUBSTRING vs SUBSEQUENCE

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
# - LCS: 2D subsequence`,
  },
]
