import type { Method } from '../../types'

// Shortest Path + MST Algorithms
export const graphPathsMSTMethods: Method[] = [
  // Shortest Path (indices 9-11)
  { section: 'Shortest Path', signature: 'Dijkstra\'s Algorithm', description: 'Shortest path in weighted graph (non-negative weights). Uses min-heap.', complexity: 'O((V+E) log V)', example: `import heapq

def dijkstra(graph, start):
    # graph[u] = [(v, weight), ...]
    distances = {start: 0}
    heap = [(0, start)]  # (distance, node)

    while heap:
        dist, node = heapq.heappop(heap)

        # Skip if we found a better path already
        if dist > distances.get(node, float('inf')):
            continue

        for neighbor, weight in graph[node]:
            new_dist = dist + weight
            if new_dist < distances.get(neighbor, float('inf')):
                distances[neighbor] = new_dist
                heapq.heappush(heap, (new_dist, neighbor))

    return distances

# With path reconstruction
def dijkstra_path(graph, start, end):
    distances = {start: 0}
    prev = {start: None}
    heap = [(0, start)]

    while heap:
        dist, node = heapq.heappop(heap)

        if node == end:
            # Reconstruct path
            path = []
            while node:
                path.append(node)
                node = prev[node]
            return path[::-1], dist

        if dist > distances.get(node, float('inf')):
            continue

        for neighbor, weight in graph[node]:
            new_dist = dist + weight
            if new_dist < distances.get(neighbor, float('inf')):
                distances[neighbor] = new_dist
                prev[neighbor] = node
                heapq.heappush(heap, (new_dist, neighbor))

    return [], float('inf')  # No path` },

  { section: 'Shortest Path', signature: 'Bellman-Ford Algorithm', description: 'Shortest path with negative weights. Detects negative cycles. Slower than Dijkstra.', complexity: 'O(V*E)', example: `def bellman_ford(n, edges, start):
    # edges = [(u, v, weight), ...]
    distances = [float('inf')] * n
    distances[start] = 0

    # Relax all edges V-1 times
    for _ in range(n - 1):
        for u, v, weight in edges:
            if distances[u] + weight < distances[v]:
                distances[v] = distances[u] + weight

    # Check for negative cycle
    for u, v, weight in edges:
        if distances[u] + weight < distances[v]:
            return None  # Negative cycle exists

    return distances

# Example:
# edges = [(0,1,4), (0,2,5), (1,2,-3), (2,3,4)]
# bellman_ford(4, edges, 0)
# Returns: [0, 4, 1, 5]

# WHEN TO USE:
# - Graph has negative edge weights
# - Need to detect negative cycles
# - Dijkstra won't work` },

  { section: 'Shortest Path', signature: 'Floyd-Warshall Algorithm', description: 'All-pairs shortest path. O(V³) time. Good for dense graphs with small V.', complexity: 'O(V³)', example: `def floyd_warshall(n, edges):
    # Initialize distance matrix
    INF = float('inf')
    dist = [[INF] * n for _ in range(n)]

    # Distance to self is 0
    for i in range(n):
        dist[i][i] = 0

    # Set direct edge weights
    for u, v, w in edges:
        dist[u][v] = w
        # dist[v][u] = w  # Uncomment for undirected

    # DP: try each vertex as intermediate
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]

    return dist

# Check for negative cycle
# If dist[i][i] < 0 for any i, negative cycle exists

# WHEN TO USE:
# - Need shortest path between ALL pairs
# - Small number of vertices (V < 500)
# - Dense graph` },

  // MST Algorithms (indices 14-15)
  { section: 'MST Algorithms', signature: 'Kruskal\'s Algorithm (MST)', description: 'Build MST by adding cheapest edge that doesn\'t create cycle. Uses Union-Find.', complexity: 'O(E log E)', example: `def kruskal(n, edges):
    # edges = [(u, v, weight), ...]
    # Sort by weight
    edges.sort(key=lambda x: x[2])

    parent = list(range(n))
    rank = [0] * n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return False
        if rank[px] < rank[py]:
            px, py = py, px
        parent[py] = px
        if rank[px] == rank[py]:
            rank[px] += 1
        return True

    mst = []
    mst_weight = 0

    for u, v, weight in edges:
        if union(u, v):
            mst.append((u, v, weight))
            mst_weight += weight
            if len(mst) == n - 1:
                break

    return mst, mst_weight` },
  { section: 'MST Algorithms', signature: 'Prim\'s Algorithm (MST)', description: 'Build MST by growing from a starting node. Uses min-heap for efficiency.', complexity: 'O((V+E) log V)', example: `import heapq

def prim(n, graph):
    # graph[u] = [(v, weight), ...]
    visited = [False] * n
    mst = []
    mst_weight = 0

    # Start from node 0
    heap = [(0, 0, -1)]  # (weight, node, parent)

    while heap and len(mst) < n:
        weight, node, parent = heapq.heappop(heap)

        if visited[node]:
            continue

        visited[node] = True
        if parent != -1:
            mst.append((parent, node, weight))
            mst_weight += weight

        for neighbor, w in graph[node]:
            if not visited[neighbor]:
                heapq.heappush(heap, (w, neighbor, node))

    return mst, mst_weight

# KRUSKAL vs PRIM:
# Kruskal: Better for sparse graphs, needs Union-Find
# Prim: Better for dense graphs, similar to Dijkstra` },
]
