import type { Method } from '../../types'

// Topological Sort + Other Algorithms
export const graphCyclesMethods: Method[] = [
  // Topological Sort (indices 12-13)
  { section: 'Topological Sort', signature: 'Topological Sort (Kahn\'s)', description: 'Order nodes so all edges go left to right. For DAG only. BFS with in-degree.', complexity: 'O(V+E)', example: `from collections import deque

def topological_sort(n, edges):
    # Build graph and in-degree
    graph = [[] for _ in range(n)]
    in_degree = [0] * n

    for u, v in edges:
        graph[u].append(v)
        in_degree[v] += 1

    # Start with nodes having no prerequisites
    queue = deque([i for i in range(n) if in_degree[i] == 0])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # Check if valid (no cycle)
    if len(result) != n:
        return []  # Cycle exists, no valid ordering

    return result

# Example: Course Schedule
# n=4, edges=[(1,0), (2,0), (3,1), (3,2)]
# Meaning: 1->0, 2->0, 3->1, 3->2 (prerequisites)
# Valid order: [3, 1, 2, 0] or [3, 2, 1, 0]` },
  { section: 'Topological Sort', signature: 'Topological Sort (DFS)', description: 'DFS-based topological sort. Process node after all descendants.', complexity: 'O(V+E)', example: `def topological_sort_dfs(n, edges):
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)

    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * n
    result = []
    has_cycle = False

    def dfs(node):
        nonlocal has_cycle
        if has_cycle:
            return

        color[node] = GRAY  # Processing

        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                has_cycle = True
                return
            if color[neighbor] == WHITE:
                dfs(neighbor)

        color[node] = BLACK  # Done
        result.append(node)

    for i in range(n):
        if color[i] == WHITE:
            dfs(i)

    if has_cycle:
        return []

    return result[::-1]  # Reverse for correct order` },

  // Other Algorithms (indices 16-18)
  { section: 'Other Algorithms', signature: 'Cycle Detection (Directed)', description: 'DFS with three colors: white (unvisited), gray (processing), black (done).', complexity: 'O(V+E)', example: `def has_cycle_directed(graph, n):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * n

    def dfs(node):
        color[node] = GRAY

        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                return True  # Back edge -> cycle
            if color[neighbor] == WHITE:
                if dfs(neighbor):
                    return True

        color[node] = BLACK
        return False

    for i in range(n):
        if color[i] == WHITE:
            if dfs(i):
                return True

    return False

# For UNDIRECTED graphs:
def has_cycle_undirected(graph, n):
    visited = [False] * n

    def dfs(node, parent):
        visited[node] = True
        for neighbor in graph[node]:
            if not visited[neighbor]:
                if dfs(neighbor, node):
                    return True
            elif neighbor != parent:
                return True  # Cycle found
        return False

    for i in range(n):
        if not visited[i]:
            if dfs(i, -1):
                return True
    return False` },
  { section: 'Other Algorithms', signature: 'Connected Components', description: 'Count separate groups in undirected graph. DFS/BFS from each unvisited node.', complexity: 'O(V+E)', example: `def count_components(n, edges):
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    visited = [False] * n
    count = 0

    def dfs(node):
        visited[node] = True
        for neighbor in graph[node]:
            if not visited[neighbor]:
                dfs(neighbor)

    for i in range(n):
        if not visited[i]:
            dfs(i)
            count += 1

    return count

# Get all components
def get_components(n, edges):
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    visited = [False] * n
    components = []

    def dfs(node, component):
        visited[node] = True
        component.append(node)
        for neighbor in graph[node]:
            if not visited[neighbor]:
                dfs(neighbor, component)

    for i in range(n):
        if not visited[i]:
            component = []
            dfs(i, component)
            components.append(component)

    return components` },
  { section: 'Other Algorithms', signature: 'Bipartite Check', description: 'Can graph be 2-colored? BFS/DFS with color tracking. No odd cycles.', complexity: 'O(V+E)', example: `from collections import deque

def is_bipartite(graph, n):
    color = [-1] * n

    def bfs(start):
        queue = deque([start])
        color[start] = 0

        while queue:
            node = queue.popleft()
            for neighbor in graph[node]:
                if color[neighbor] == -1:
                    color[neighbor] = 1 - color[node]
                    queue.append(neighbor)
                elif color[neighbor] == color[node]:
                    return False
        return True

    for i in range(n):
        if color[i] == -1:
            if not bfs(i):
                return False

    return True

# A graph is bipartite if and only if
# it contains no odd-length cycles

# USE CASES:
# - Matching problems
# - Two-team assignments
# - Conflict scheduling` },
]
