import type { Method } from '../../../types'

export const searchMethods: Method[] = [
  { signature: 'Search in Sorted Matrix', description: 'Search in row/col sorted matrix. Start from corner.', complexity: 'O(m + n)', section: 'Search', example: `# Matrix where rows and cols are sorted
def search_matrix(matrix, target):
    if not matrix:
        return False

    m, n = len(matrix), len(matrix[0])
    # Start from top-right corner
    row, col = 0, n - 1

    while row < m and col >= 0:
        if matrix[row][col] == target:
            return True
        elif matrix[row][col] > target:
            col -= 1  # Eliminate column
        else:
            row += 1  # Eliminate row

    return False

# Example:
# [[1,  4,  7, 11],
#  [2,  5,  8, 12],
#  [3,  6,  9, 16],
#  [10, 13, 14, 17]]
# target = 5 -> True
# Start at 11, too big -> go left to 7
# 7 > 5 -> go left to 4
# 4 < 5 -> go down to 5 -> found!

# Alternative: start from bottom-left
def search_matrix_bl(matrix, target):
    row, col = len(matrix) - 1, 0
    while row >= 0 and col < len(matrix[0]):
        if matrix[row][col] == target:
            return True
        elif matrix[row][col] > target:
            row -= 1
        else:
            col += 1
    return False` },
  { signature: 'Binary Search in Matrix', description: 'Treat sorted matrix as 1D array for binary search.', complexity: 'O(log(m*n))', section: 'Search', example: `# Matrix where each row is sorted AND
# first element of row > last element of previous row
def search_matrix_binary(matrix, target):
    if not matrix:
        return False

    m, n = len(matrix), len(matrix[0])
    left, right = 0, m * n - 1

    while left <= right:
        mid = (left + right) // 2
        # Convert 1D index to 2D
        row, col = mid // n, mid % n
        val = matrix[row][col]

        if val == target:
            return True
        elif val < target:
            left = mid + 1
        else:
            right = mid - 1

    return False

# Example:
# [[1,  3,  5,  7],
#  [10, 11, 16, 20],
#  [23, 30, 34, 60]]
# target = 3 -> True
# Treat as [1,3,5,7,10,11,16,20,23,30,34,60]
# Binary search normally` },
]
