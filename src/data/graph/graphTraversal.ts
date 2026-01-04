import type { Method } from '../../types'

// Why & When + Representations + DFS + BFS
export const graphTraversalMethods: Method[] = [
  // Why & When (indices 0-2)
  { section: 'Why & When', signature: 'Why use Graphs?', description: 'Model relationships and connections. Use for: networks, maps, dependencies, social connections, state machines.', complexity: 'Concept', example: `# GRAPH = Nodes (vertices) + Edges (connections)
#
#     A --- B
#     |     |
#     C --- D
#
# USE CASES:
# - Social networks (friends)
# - Maps (cities, roads)
# - Dependencies (build systems)
# - Web crawling (pages, links)
# - Recommendation systems
# - State machines

# TYPES:
# - Directed vs Undirected
# - Weighted vs Unweighted
# - Cyclic vs Acyclic (DAG)
# - Connected vs Disconnected

# REPRESENTATIONS:
# 1. Adjacency List (sparse graphs)
# 2. Adjacency Matrix (dense graphs)
# 3. Edge List` },
  { section: 'Why & When', signature: 'Graph Terminology', description: 'Essential graph vocabulary: vertices, edges, degree, path, cycle, connected, weighted.', complexity: 'Concept', example: `# TERMINOLOGY:
# Vertex/Node: A point in the graph
# Edge: Connection between two vertices
# Degree: Number of edges connected to a vertex
#   - In-degree: edges coming IN (directed)
#   - Out-degree: edges going OUT (directed)
# Path: Sequence of vertices connected by edges
# Cycle: Path that starts and ends at same vertex
# Connected: Path exists between any two vertices
# Weighted: Edges have associated costs/values

# GRAPH PROPERTIES:
# - Sparse: Few edges (E << V²)
# - Dense: Many edges (E ≈ V²)
# - Complete: Edge between every pair (E = V(V-1)/2)
# - Tree: Connected graph with no cycles (E = V-1)
# - DAG: Directed Acyclic Graph` },
  { section: 'Why & When', signature: 'When to Use Which Algorithm', description: 'Quick reference for choosing the right graph algorithm based on problem type.', complexity: 'Concept', example: `# ALGORITHM SELECTION GUIDE:

# TRAVERSAL (visit all nodes):
# - DFS: Deep exploration, backtracking, paths
# - BFS: Level-order, shortest path (unweighted)

# SHORTEST PATH:
# - Unweighted → BFS
# - Non-negative weights → Dijkstra
# - Negative weights → Bellman-Ford
# - All pairs → Floyd-Warshall

# CYCLE DETECTION:
# - Undirected → DFS with parent tracking
# - Directed → DFS with colors (white/gray/black)

# ORDERING:
# - Dependencies → Topological Sort (DAG only)

# CONNECTIVITY:
# - Components → DFS/BFS from each unvisited
# - MST → Kruskal (sparse) or Prim (dense)

# BIPARTITE:
# - 2-coloring → BFS/DFS with alternating colors` },

  // Graph Representation (indices 3-4)
  { section: 'Graph Representation', signature: 'Adjacency List', description: 'Most common representation. O(V+E) space, efficient for sparse graphs.', complexity: 'O(V+E) space', example: `# ADJACENCY LIST (most common)
# Space: O(V + E)
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}

# Or with defaultdict
from collections import defaultdict
graph = defaultdict(list)
edges = [('A','B'), ('A','C'), ('B','D'), ('C','D')]
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)  # Undirected

# WEIGHTED GRAPH (adjacency list)
graph = {
    'A': [('B', 5), ('C', 3)],  # (neighbor, weight)
    'B': [('A', 5), ('D', 2)],
}

# With defaultdict for weighted
graph = defaultdict(list)
for u, v, w in weighted_edges:
    graph[u].append((v, w))
    graph[v].append((u, w))  # Undirected` },
  { section: 'Graph Representation', signature: 'Adjacency Matrix', description: 'O(V²) space, O(1) edge lookup. Good for dense graphs.', complexity: 'O(V²) space', example: `# ADJACENCY MATRIX
# Space: O(V²), O(1) edge check
# Good for dense graphs
matrix = [
    [0, 1, 1, 0],  # A
    [1, 0, 0, 1],  # B
    [1, 0, 0, 1],  # C
    [0, 1, 1, 0],  # D
]
# matrix[i][j] = 1 means edge from i to j

# WEIGHTED MATRIX
# matrix[i][j] = weight (0 or inf for no edge)
INF = float('inf')
matrix = [
    [0,   5,   3,   INF],
    [5,   0,   INF, 2  ],
    [3,   INF, 0,   4  ],
    [INF, 2,   4,   0  ],
]

# Check edge existence: O(1)
has_edge = matrix[i][j] != 0  # or != INF

# Get neighbors: O(V)
neighbors = [j for j in range(n) if matrix[i][j]]` },

  // DFS & BFS (indices 5-8)
  { section: 'DFS & BFS', signature: 'DFS Recursive Template', description: 'Explore as deep as possible before backtracking. Use for: path finding, cycle detection, topological sort.', complexity: 'O(V+E)', example: `# DFS with visited set
def dfs(graph, node, visited):
    if node in visited:
        return
    visited.add(node)

    # Process node
    print(node)

    for neighbor in graph[node]:
        dfs(graph, neighbor, visited)

# Usage
graph = {0: [1, 2], 1: [2], 2: [3], 3: []}
visited = set()
dfs(graph, 0, visited)

# Return all reachable nodes
def dfs_all_nodes(graph, start):
    visited = set()

    def dfs(node):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)

    dfs(start)
    return visited` },
  { section: 'DFS & BFS', signature: 'DFS Iterative Template', description: 'Use explicit stack. Better for very deep graphs (no recursion limit).', complexity: 'O(V+E)', example: `def dfs_iterative(graph, start):
    visited = set()
    stack = [start]

    while stack:
        node = stack.pop()
        if node in visited:
            continue
        visited.add(node)

        # Process node
        print(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                stack.append(neighbor)

    return visited

# With path tracking
def dfs_with_path(graph, start, end):
    stack = [(start, [start])]
    visited = set()

    while stack:
        node, path = stack.pop()
        if node == end:
            return path
        if node in visited:
            continue
        visited.add(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                stack.append((neighbor, path + [neighbor]))

    return []  # No path found` },
  { section: 'DFS & BFS', signature: 'BFS Template', description: 'Explore level by level. Find shortest path (unweighted), level order.', complexity: 'O(V+E)', example: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])

    while queue:
        node = queue.popleft()

        # Process node
        print(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return visited

# Shortest path (unweighted)
def shortest_path(graph, start, end):
    if start == end:
        return [start]

    visited = set([start])
    queue = deque([(start, [start])])

    while queue:
        node, path = queue.popleft()

        for neighbor in graph[node]:
            if neighbor == end:
                return path + [neighbor]
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))

    return []  # No path` },
  { section: 'DFS & BFS', signature: 'BFS with Distance', description: 'Track distance from start. Common for shortest path problems.', complexity: 'O(V+E)', example: `from collections import deque

def bfs_distance(graph, start):
    distance = {start: 0}
    queue = deque([start])

    while queue:
        node = queue.popleft()

        for neighbor in graph[node]:
            if neighbor not in distance:
                distance[neighbor] = distance[node] + 1
                queue.append(neighbor)

    return distance

# Multi-source BFS (from multiple starting points)
def multi_source_bfs(graph, sources):
    distance = {s: 0 for s in sources}
    queue = deque(sources)

    while queue:
        node = queue.popleft()

        for neighbor in graph[node]:
            if neighbor not in distance:
                distance[neighbor] = distance[node] + 1
                queue.append(neighbor)

    return distance` },
]
