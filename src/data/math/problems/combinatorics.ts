import type { Method } from '../../../types'

export const combinatoricsMethods: Method[] = [
  { signature: 'Pascal Triangle nCr', description: 'Compute combinations using Pascal\'s triangle. Avoids factorial overflow.', complexity: 'O(n*r)', section: 'Combinatorics', example: `def ncr_pascal(n, r):
    """
    Compute C(n, r) using Pascal's triangle.
    Avoids large intermediate values.
    """
    if r > n - r:
        r = n - r  # Optimization: C(n,r) = C(n, n-r)

    # Build row of Pascal's triangle
    dp = [1] * (r + 1)

    for i in range(1, n - r + 1):
        for j in range(r, 0, -1):
            dp[j] += dp[j - 1]

    return dp[r]

print(ncr_pascal(10, 3))  # 120

# Alternative: Direct formula
def ncr_direct(n, r):
    """
    C(n,r) = n! / (r! * (n-r)!)
    Compute without full factorial.
    """
    if r > n - r:
        r = n - r

    result = 1
    for i in range(r):
        result = result * (n - i) // (i + 1)

    return result

# Generate full Pascal's triangle
def pascal_triangle(n):
    triangle = [[1]]
    for i in range(1, n):
        row = [1]
        for j in range(1, i):
            row.append(triangle[i-1][j-1] + triangle[i-1][j])
        row.append(1)
        triangle.append(row)
    return triangle` },

  { signature: 'Catalan Numbers', description: 'Count valid parentheses, BST structures, paths. C(n) = C(2n,n)/(n+1).', complexity: 'O(n)', section: 'Combinatorics', example: `def catalan(n):
    """
    nth Catalan number.
    Applications:
    - Valid parentheses combinations
    - Number of BST structures with n nodes
    - Paths in grid staying below diagonal
    """
    if n <= 1:
        return 1

    # Formula: C(n) = C(2n, n) / (n + 1)
    result = 1
    for i in range(n):
        result = result * (2 * n - i) // (i + 1)
    return result // (n + 1)

# DP approach
def catalan_dp(n):
    dp = [0] * (n + 1)
    dp[0] = dp[1] = 1

    for i in range(2, n + 1):
        for j in range(i):
            dp[i] += dp[j] * dp[i - 1 - j]

    return dp[n]

# First 10 Catalan numbers:
print([catalan(i) for i in range(10)])
# [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862]

# INTERVIEW: Unique BSTs
def num_trees(n):
    """Number of structurally unique BSTs with n nodes."""
    return catalan(n)` },
]
