import type { Method } from '../../../types'

export const setGameOfLifeMethods: Method[] = [
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
]
