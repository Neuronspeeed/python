import type { Method } from '../../../types'

export const islandsMethods: Method[] = [
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
