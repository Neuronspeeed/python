export const matrixIntro = `Use Matrices When...
You need 2D grid representation for grids, images, game boards, or graph adjacency. Access element at row i, column j with matrix[i][j] in O(1). Master directions arrays for traversal, boundary checks (0 <= i < rows and 0 <= j < cols), and transformations. Common mistake: mixing rows and columns—remember matrix[row][col], height is rows, width is cols.

\`\`\`python
# BASIC TRAVERSAL - 4 directions
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]

rows, cols = len(matrix), len(matrix[0])
directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]  # right, down, left, up

def neighbors(r, c):
    for dr, dc in directions:
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols:
            yield matrix[nr][nc]

# 8 DIRECTIONS - Include diagonals
directions_8 = [(0,1), (1,0), (0,-1), (-1,0),  # cardinal
                (1,1), (1,-1), (-1,1), (-1,-1)]  # diagonal

# ROTATION - 90 clockwise
def rotate_clockwise(matrix):
    # Transpose then reverse rows
    n = len(matrix)
    for i in range(n):
        for j in range(i+1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    for row in matrix:
        row.reverse()
\`\`\`
---
Island Problems Pattern
Given grid of 1s (land) and 0s (water), count islands (connected components). Pattern: iterate grid, when you find 1, increment count and DFS/BFS to mark all connected 1s as visited. Each DFS marks one complete island. Also applies to flood fill (change all connected cells of same color).

\`\`\`python
def num_islands(grid):
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'  # Mark visited
        # Explore 4 directions
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)  # Mark entire island

    return count

# FLOOD FILL - Same pattern
def flood_fill(image, sr, sc, new_color):
    old_color = image[sr][sc]
    if old_color == new_color:
        return image

    def dfs(r, c):
        if (r < 0 or r >= len(image) or c < 0 or c >= len(image[0]) or
            image[r][c] != old_color):
            return
        image[r][c] = new_color
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)

    dfs(sr, sc)
    return image
\`\`\`
---
Matrix as Graph
Adjacency matrix represents graphs: matrix[i][j] = edge weight from i to j (or 1 if exists, 0 if not). Space O(V^2)—good for dense graphs or O(1) edge lookup. For sparse graphs, adjacency list is better (O(V + E) space). Matrix enables simple graph algorithms.

\`\`\`python
# ADJACENCY MATRIX - Dense graph
n = 4  # 4 vertices
graph = [[0] * n for _ in range(n)]
graph[0][1] = 1  # Edge from 0 to 1
graph[1][2] = 1
graph[2][3] = 1
graph[3][0] = 1

# Check edge exists - O(1)
has_edge = graph[0][1] == 1

# Get all neighbors - O(V)
neighbors = [j for j in range(n) if graph[i][j] > 0]

# ADJACENCY LIST - Sparse graph (better)
graph_list = {
    0: [1],
    1: [2],
    2: [3],
    3: [0]
}
# Space: O(V + E) vs O(V^2) for matrix
# Get neighbors - O(1) access to list

# SPIRAL TRAVERSAL - Four pointers
def spiral_order(matrix):
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        # Right
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1
        # Down
        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1
        # Left
        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1
        # Up
        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1

    return result
\`\`\``
