import type { Method } from '../../../types'

export const dp2dIntervalMethods: Method[] = [
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
]
