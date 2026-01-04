import type { Method } from '../../types'

// Why & When + Basic Implementation
export const unionFindBasicsMethods: Method[] = [
  // Why & When
  { signature: 'Why use Union Find?', description: 'Track disjoint sets efficiently. Near O(1) union and find with optimizations. Use for: connected components, cycle detection, Kruskal MST.', complexity: 'Concept', section: 'Why & When', example: `# UNION FIND (Disjoint Set Union / DSU)
# Track which elements belong to which group

# USE CASES:
# - Connected components in graph
# - Cycle detection in undirected graph
# - Kruskal's MST algorithm
# - Friend circles / social networks
# - Image processing (connected pixels)
# - Percolation problems

# OPERATIONS:
# - find(x): Find representative of x's set
# - union(x, y): Merge sets containing x and y
# - connected(x, y): Check if x and y in same set

# COMPLEXITY:
# Without optimization: O(n) per operation
# With path compression: O(log n) amortized
# With both optimizations: O(α(n)) ≈ O(1) amortized
# α(n) = inverse Ackermann function, < 5 for practical n

# OPTIMIZATIONS:
# 1. Path Compression: flatten tree during find
# 2. Union by Rank/Size: attach smaller tree to larger` },
  { signature: 'Union Find vs DFS/BFS', description: 'Union Find for dynamic connectivity. DFS/BFS for static graphs.', complexity: 'Concept', section: 'Why & When', example: `# WHEN TO USE UNION FIND:
# - Many union/find operations
# - Need to track connected components over time
# - Don't need to traverse paths, just connectivity
# - Undirected graph problems

# WHEN TO USE DFS/BFS:
# - Need actual path between nodes
# - One-time connectivity check
# - Directed graphs
# - Need to explore neighbors

# EXAMPLES:
# Union Find:
# - "Are cities A and B connected after adding road?"
# - "How many connected components after each edge?"
# - "Is there a cycle if we add this edge?"

# DFS/BFS:
# - "What's the shortest path from A to B?"
# - "List all nodes reachable from A"
# - "Find all paths from A to B"` },

  // Basic Implementation
  { signature: 'Basic Union Find', description: 'Simple implementation without optimizations. O(n) per operation.', complexity: 'O(n)', section: 'Basic Implementation', example: `class UnionFindBasic:
    def __init__(self, n):
        # Each element is its own parent initially
        self.parent = list(range(n))

    def find(self, x):
        # Follow parent pointers until root
        while self.parent[x] != x:
            x = self.parent[x]
        return x

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x != root_y:
            self.parent[root_x] = root_y

    def connected(self, x, y):
        return self.find(x) == self.find(y)

# Problem: Trees can become very tall (like linked list)
# find() can take O(n) in worst case

# Example:
# union(0, 1), union(1, 2), union(2, 3)
# Tree: 3 <- 2 <- 1 <- 0
# find(0) needs to traverse all nodes` },
  { signature: 'Path Compression', description: 'Flatten tree during find. Points all nodes directly to root.', complexity: 'O(log n) amortized', section: 'Basic Implementation', example: `class UnionFindPathCompression:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, x):
        if self.parent[x] != x:
            # Recursively find root AND update parent
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x != root_y:
            self.parent[root_x] = root_y

# Iterative path compression
def find_iterative(self, x):
    root = x
    while self.parent[root] != root:
        root = self.parent[root]

    # Second pass: point all nodes to root
    while self.parent[x] != root:
        next_x = self.parent[x]
        self.parent[x] = root
        x = next_x

    return root

# Before: 3 <- 2 <- 1 <- 0
# After find(0): all point to 3
#     3
#    /|\\
#   0 1 2` },
  { signature: 'Union by Rank', description: 'Attach smaller tree under larger. Keeps trees balanced.', complexity: 'O(log n)', section: 'Basic Implementation', example: `class UnionFindByRank:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n  # Height of tree

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False  # Already connected

        # Attach smaller tree under larger
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1

        return True

# Rank is upper bound on height
# With path compression, actual height may be less` },
  { signature: 'Union by Size', description: 'Attach smaller set under larger. Track component sizes.', complexity: 'O(α(n)) ≈ O(1)', section: 'Basic Implementation', example: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n
        self.count = n  # Number of components

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False

        # Attach smaller to larger
        if self.size[root_x] < self.size[root_y]:
            root_x, root_y = root_y, root_x

        self.parent[root_y] = root_x
        self.size[root_x] += self.size[root_y]
        self.count -= 1

        return True

    def connected(self, x, y):
        return self.find(x) == self.find(y)

    def get_size(self, x):
        return self.size[self.find(x)]

    def get_count(self):
        return self.count

# Usage
uf = UnionFind(5)
uf.union(0, 1)
uf.union(2, 3)
print(uf.get_count())      # 3 components
print(uf.get_size(0))      # 2
print(uf.connected(0, 1))  # True
print(uf.connected(0, 2))  # False` },
]
