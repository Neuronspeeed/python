import type { Method } from '../../../types'

export const spiralDiagonalMethods: Method[] = [
  { signature: 'Spiral Order Traversal', description: 'Traverse matrix in spiral order. Track boundaries.', complexity: 'O(m*n)', section: 'Spiral & Diagonal', example: `def spiral_order(matrix):
    if not matrix:
        return []

    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        # Right
        for j in range(left, right + 1):
            result.append(matrix[top][j])
        top += 1

        # Down
        for i in range(top, bottom + 1):
            result.append(matrix[i][right])
        right -= 1

        # Left (check if rows remain)
        if top <= bottom:
            for j in range(right, left - 1, -1):
                result.append(matrix[bottom][j])
            bottom -= 1

        # Up (check if cols remain)
        if left <= right:
            for i in range(bottom, top - 1, -1):
                result.append(matrix[i][left])
            left += 1

    return result

# Example:
# [[1, 2, 3],
#  [4, 5, 6],
#  [7, 8, 9]]
# Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]` },
  { signature: 'Generate Spiral Matrix', description: 'Fill matrix with 1 to n² in spiral order.', complexity: 'O(n²)', section: 'Spiral & Diagonal', example: `def generate_spiral(n):
    matrix = [[0] * n for _ in range(n)]
    num = 1
    top, bottom, left, right = 0, n - 1, 0, n - 1

    while top <= bottom and left <= right:
        # Right
        for j in range(left, right + 1):
            matrix[top][j] = num
            num += 1
        top += 1

        # Down
        for i in range(top, bottom + 1):
            matrix[i][right] = num
            num += 1
        right -= 1

        # Left
        if top <= bottom:
            for j in range(right, left - 1, -1):
                matrix[bottom][j] = num
                num += 1
            bottom -= 1

        # Up
        if left <= right:
            for i in range(bottom, top - 1, -1):
                matrix[i][left] = num
                num += 1
            left += 1

    return matrix

# Example: n = 3
# [[1, 2, 3],
#  [8, 9, 4],
#  [7, 6, 5]]` },
  { signature: 'Diagonal Traversal', description: 'Traverse diagonals alternating direction.', complexity: 'O(m*n)', section: 'Spiral & Diagonal', example: `def diagonal_traverse(matrix):
    if not matrix:
        return []

    m, n = len(matrix), len(matrix[0])
    result = []

    for d in range(m + n - 1):
        if d % 2 == 0:
            # Go up-right
            row = min(d, m - 1)
            col = d - row
            while row >= 0 and col < n:
                result.append(matrix[row][col])
                row -= 1
                col += 1
        else:
            # Go down-left
            col = min(d, n - 1)
            row = d - col
            while row < m and col >= 0:
                result.append(matrix[row][col])
                row += 1
                col -= 1

    return result

# Example:
# [[1, 2, 3],
#  [4, 5, 6],
#  [7, 8, 9]]
# Output: [1, 2, 4, 7, 5, 3, 6, 8, 9]

# Group by diagonals (same i-j)
def get_diagonals(matrix):
    from collections import defaultdict
    diagonals = defaultdict(list)
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            diagonals[i - j].append(matrix[i][j])
    return diagonals` },
]
