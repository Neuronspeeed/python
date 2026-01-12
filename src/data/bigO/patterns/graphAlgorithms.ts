import type { Method } from '../../../types'

export const graphAlgorithmsMethods: Method[] = [
  { signature: 'Graph Algorithm Complexities', description: 'BFS/DFS: O(V+E). Dijkstra: O((V+E) log V). Floyd-Warshall: O(V³).', complexity: 'Reference', section: 'Graph Algorithms', example: `# GRAPH ALGORITHM COMPLEXITIES
# V = vertices, E = edges
#
# Algorithm           Time            Space
# ─────────────────────────────────────────────
# BFS                 O(V + E)        O(V)
# DFS                 O(V + E)        O(V)
# Dijkstra (heap)     O((V+E) log V)  O(V)
# Bellman-Ford        O(V * E)        O(V)
# Floyd-Warshall      O(V³)           O(V²)
# Topological Sort    O(V + E)        O(V)
# Kruskal (MST)       O(E log E)      O(V)
# Prim (MST)          O((V+E) log V)  O(V)
# Tarjan (SCC)        O(V + E)        O(V)

# WHEN TO USE:
# Shortest path (unweighted): BFS
# Shortest path (positive):   Dijkstra
# Shortest path (negative):   Bellman-Ford
# All pairs shortest:         Floyd-Warshall
# Minimum spanning tree:      Kruskal or Prim
# Cycle detection:            DFS
# Topological order:          Kahn's or DFS` },
]
