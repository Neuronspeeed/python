import type { Method } from '../../types'

// Spiral + Diagonal + Search + Set Operations + Game of Life + Islands
export const matrixOperationsMethods: Method[] = [
  // Spiral
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

  // Diagonal
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

  // Search
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

  // Set Operations
  { signature: 'Set Matrix Zeroes', description: 'If element is 0, set entire row and col to 0.', complexity: 'O(m*n) time, O(1) space', section: 'Set & Game of Life', example: `def set_zeroes(matrix):
    m, n = len(matrix), len(matrix[0])

    # Use first row/col as markers
    first_row_zero = any(matrix[0][j] == 0 for j in range(n))
    first_col_zero = any(matrix[i][0] == 0 for i in range(m))

    # Mark zeros in first row/col
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0

    # Set zeros based on markers
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0

    # Handle first row and col
    if first_row_zero:
        for j in range(n):
            matrix[0][j] = 0
    if first_col_zero:
        for i in range(m):
            matrix[i][0] = 0

# Example:
# [[1, 1, 1],     [[1, 0, 1],
#  [1, 0, 1],  ->  [0, 0, 0],
#  [1, 1, 1]]      [1, 0, 1]]` },

  // Game of Life
  { signature: 'Game of Life', description: 'Simulate Conway\'s Game of Life in-place using state encoding.', complexity: 'O(m*n)', section: 'Set & Game of Life', example: `def game_of_life(board):
    # States: 0=dead, 1=live
    # Encode: 2=dead->live, 3=live->dead

    m, n = len(board), len(board[0])

    def count_neighbors(i, j):
        count = 0
        for di in [-1, 0, 1]:
            for dj in [-1, 0, 1]:
                if di == 0 and dj == 0:
                    continue
                ni, nj = i + di, j + dj
                if 0 <= ni < m and 0 <= nj < n:
                    # Count original live (1 or 3)
                    if board[ni][nj] in [1, 3]:
                        count += 1
        return count

    for i in range(m):
        for j in range(n):
            neighbors = count_neighbors(i, j)
            if board[i][j] == 1:
                # Live cell dies if < 2 or > 3 neighbors
                if neighbors < 2 or neighbors > 3:
                    board[i][j] = 3  # live -> dead
            else:
                # Dead cell lives if exactly 3 neighbors
                if neighbors == 3:
                    board[i][j] = 2  # dead -> live

    # Final update
    for i in range(m):
        for j in range(n):
            if board[i][j] == 2:
                board[i][j] = 1
            elif board[i][j] == 3:
                board[i][j] = 0

# Rules:
# Live + <2 neighbors -> dies (underpopulation)
# Live + 2-3 neighbors -> lives
# Live + >3 neighbors -> dies (overpopulation)
# Dead + 3 neighbors -> lives (reproduction)` },

  // Islands
  { signature: 'Number of Islands', description: 'Count connected land regions using DFS/BFS.', complexity: 'O(m*n)', section: 'Islands', example: `def num_islands(grid):
    if not grid:
        return 0

    m, n = len(grid), len(grid[0])
    count = 0

    def dfs(i, j):
        if i < 0 or i >= m or j < 0 or j >= n:
            return
        if grid[i][j] != '1':
            return

        grid[i][j] = '#'  # Mark visited
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)

    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1':
                dfs(i, j)
                count += 1

    return count

# BFS version
from collections import deque

def num_islands_bfs(grid):
    m, n = len(grid), len(grid[0])
    count = 0

    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1':
                count += 1
                queue = deque([(i, j)])
                grid[i][j] = '#'

                while queue:
                    x, y = queue.popleft()
                    for dx, dy in [(1,0), (-1,0), (0,1), (0,-1)]:
                        nx, ny = x + dx, y + dy
                        if 0 <= nx < m and 0 <= ny < n and grid[nx][ny] == '1':
                            grid[nx][ny] = '#'
                            queue.append((nx, ny))

    return count` },
  { signature: 'Max Area of Island', description: 'Find largest island by area.', complexity: 'O(m*n)', section: 'Islands', example: `def max_area_of_island(grid):
    m, n = len(grid), len(grid[0])

    def dfs(i, j):
        if i < 0 or i >= m or j < 0 or j >= n:
            return 0
        if grid[i][j] != 1:
            return 0

        grid[i][j] = 0  # Mark visited
        return 1 + dfs(i+1, j) + dfs(i-1, j) + dfs(i, j+1) + dfs(i, j-1)

    max_area = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                max_area = max(max_area, dfs(i, j))

    return max_area

# Example:
# [[0,0,1,0,0],
#  [0,0,1,0,0],
#  [0,1,1,1,0],
#  [0,0,1,0,0]]
# Max area = 5` },
]
