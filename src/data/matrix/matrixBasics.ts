import type { Method } from '../../types'

// Why & When + Traversal + Creation + Transformation
export const matrixBasicsMethods: Method[] = [
  // Why & When
  { signature: 'Why Matrix Operations?', description: '2D arrays for grids, images, graphs. Common interview topic. Master traversal patterns.', complexity: 'Concept', section: 'Why & When', example: `# MATRIX = 2D Array / Grid
# Rows x Columns

# USE CASES:
# - Game boards (chess, tic-tac-toe)
# - Image processing (pixels)
# - Graph adjacency matrix
# - Dynamic programming tables
# - Spreadsheets
# - Maps and grids

# BASIC ACCESS:
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]

rows = len(matrix)           # 3
cols = len(matrix[0])        # 3
element = matrix[1][2]       # 6 (row 1, col 2)

# COMMON PATTERNS:
# - Traversal (row by row, col by col, diagonal)
# - Rotation / Transpose
# - Spiral order
# - Search (binary, BFS/DFS)
# - Path finding
# - Island problems` },
  { signature: 'Matrix Traversal Patterns', description: 'Row-major, column-major, diagonal, anti-diagonal traversals.', complexity: 'O(m*n)', section: 'Why & When', example: `# ROW BY ROW (most common)
for i in range(rows):
    for j in range(cols):
        print(matrix[i][j])

# COLUMN BY COLUMN
for j in range(cols):
    for i in range(rows):
        print(matrix[i][j])

# MAIN DIAGONAL (top-left to bottom-right)
# Cells where i == j
for i in range(min(rows, cols)):
    print(matrix[i][i])

# ALL DIAGONALS (top-left to bottom-right)
# Each diagonal has constant i - j
for d in range(-cols + 1, rows):
    for i in range(rows):
        j = i - d
        if 0 <= j < cols:
            print(matrix[i][j])

# ANTI-DIAGONAL (top-right to bottom-left)
# Cells where i + j == constant
for i in range(min(rows, cols)):
    print(matrix[i][cols - 1 - i])

# ALL ANTI-DIAGONALS
for d in range(rows + cols - 1):
    for i in range(rows):
        j = d - i
        if 0 <= j < cols:
            print(matrix[i][j])` },

  // Creation
  { signature: 'Create Matrix', description: 'Initialize matrix with default values. Avoid common pitfalls.', complexity: 'O(m*n)', section: 'Creation', example: `# CORRECT: List comprehension (new list each row)
m, n = 3, 4
matrix = [[0] * n for _ in range(m)]

# WRONG: Shallow copy (all rows reference same list!)
matrix = [[0] * n] * m  # DON'T DO THIS!
matrix[0][0] = 1  # Changes ALL rows!

# With specific values
matrix = [[i * n + j for j in range(n)] for i in range(m)]
# [[0, 1, 2, 3],
#  [4, 5, 6, 7],
#  [8, 9, 10, 11]]

# Identity matrix
n = 3
identity = [[1 if i == j else 0 for j in range(n)] for i in range(n)]
# [[1, 0, 0],
#  [0, 1, 0],
#  [0, 0, 1]]

# From 1D array
arr = [1, 2, 3, 4, 5, 6]
rows, cols = 2, 3
matrix = [arr[i*cols:(i+1)*cols] for i in range(rows)]
# [[1, 2, 3],
#  [4, 5, 6]]

# Deep copy
import copy
matrix_copy = copy.deepcopy(matrix)
# Or: matrix_copy = [row[:] for row in matrix]` },

  // Transformation
  { signature: 'Transpose Matrix', description: 'Swap rows and columns. Element at [i][j] moves to [j][i].', complexity: 'O(m*n)', section: 'Transformation', example: `def transpose(matrix):
    rows, cols = len(matrix), len(matrix[0])
    # Create new matrix with swapped dimensions
    return [[matrix[i][j] for i in range(rows)] for j in range(cols)]

# Using zip (elegant)
def transpose_zip(matrix):
    return [list(row) for row in zip(*matrix)]

# Example:
# [[1, 2, 3],     [[1, 4, 7],
#  [4, 5, 6],  ->  [2, 5, 8],
#  [7, 8, 9]]      [3, 6, 9]]

# In-place transpose (square matrix only)
def transpose_inplace(matrix):
    n = len(matrix)
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    return matrix` },
  { signature: 'Rotate Matrix 90°', description: 'Rotate clockwise: transpose + reverse rows. Counter-clockwise: reverse rows + transpose.', complexity: 'O(n²)', section: 'Transformation', example: `# CLOCKWISE 90°: Transpose then reverse each row
def rotate_clockwise(matrix):
    n = len(matrix)
    # Transpose
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Reverse each row
    for row in matrix:
        row.reverse()
    return matrix

# Or: reverse columns then transpose
def rotate_clockwise_v2(matrix):
    return [list(row) for row in zip(*matrix[::-1])]

# COUNTER-CLOCKWISE 90°: Reverse each row then transpose
def rotate_counter_clockwise(matrix):
    n = len(matrix)
    # Reverse each row
    for row in matrix:
        row.reverse()
    # Transpose
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    return matrix

# Or: transpose then reverse columns
def rotate_counter_clockwise_v2(matrix):
    return [list(row)[::-1] for row in zip(*matrix)]

# Example clockwise:
# [[1, 2, 3],     [[7, 4, 1],
#  [4, 5, 6],  ->  [8, 5, 2],
#  [7, 8, 9]]      [9, 6, 3]]` },
  { signature: 'Rotate 180°', description: 'Reverse row order then reverse each row. Or rotate 90° twice.', complexity: 'O(n²)', section: 'Transformation', example: `def rotate_180(matrix):
    # Reverse row order, then reverse each row
    return [row[::-1] for row in matrix[::-1]]

# In-place
def rotate_180_inplace(matrix):
    n, m = len(matrix), len(matrix[0])
    for i in range(n // 2):
        matrix[i], matrix[n-1-i] = matrix[n-1-i], matrix[i]
    for row in matrix:
        row.reverse()
    if n % 2:  # Odd rows, reverse middle
        matrix[n//2].reverse()
    return matrix

# Example:
# [[1, 2, 3],     [[9, 8, 7],
#  [4, 5, 6],  ->  [6, 5, 4],
#  [7, 8, 9]]      [3, 2, 1]]` },
  { signature: 'Flip Matrix', description: 'Flip horizontally (mirror) or vertically.', complexity: 'O(m*n)', section: 'Transformation', example: `# HORIZONTAL FLIP (mirror left-right)
def flip_horizontal(matrix):
    return [row[::-1] for row in matrix]

# Example:
# [[1, 2, 3],     [[3, 2, 1],
#  [4, 5, 6],  ->  [6, 5, 4],
#  [7, 8, 9]]      [9, 8, 7]]

# VERTICAL FLIP (mirror top-bottom)
def flip_vertical(matrix):
    return matrix[::-1]

# Example:
# [[1, 2, 3],     [[7, 8, 9],
#  [4, 5, 6],  ->  [4, 5, 6],
#  [7, 8, 9]]      [1, 2, 3]]

# In-place horizontal flip
def flip_horizontal_inplace(matrix):
    for row in matrix:
        row.reverse()
    return matrix

# In-place vertical flip
def flip_vertical_inplace(matrix):
    n = len(matrix)
    for i in range(n // 2):
        matrix[i], matrix[n-1-i] = matrix[n-1-i], matrix[i]
    return matrix` },
]
