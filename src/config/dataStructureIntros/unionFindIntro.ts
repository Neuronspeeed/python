export const unionFindIntro = `Use Union-Find When...
You need dynamic connectivity queries—are x and y connected? With path compression and union by rank, find and union operations run in O(a(n)) ~ O(1) amortized, where a is inverse Ackermann function (< 5 for practical n). Perfect for connected components, cycle detection in undirected graphs, and Kruskal's MST. Each set is represented as a tree with root as representative.

\`\`\`python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))  # Each node is own parent
        self.rank = [0] * n           # Height upper bound

    def find(self, x):
        # Path compression: make all nodes point to root
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        root_x, root_y = self.find(x), self.find(y)
        if root_x == root_y:
            return False  # Already connected

        # Union by rank: attach shorter to taller
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        return True

    def connected(self, x, y):
        return self.find(x) == self.find(y)
\`\`\`
---
Path Compression and Union by Rank
Path compression flattens trees by making all nodes on path point directly to root during find(). Union by rank attaches shorter tree to taller tree, preventing linear chains. These two optimizations together achieve O(a(n)) ~ O(1)—without them, operations degrade to O(n) on linear chains.

\`\`\`python
# WITHOUT OPTIMIZATIONS - O(n) worst case
class NaiveUnionFind:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, x):
        while self.parent[x] != x:
            x = self.parent[x]  # Walk to root
        return x  # O(n) on linear chain: 0->1->2->3->4

    def union(self, x, y):
        self.parent[self.find(x)] = self.find(y)
        # Can create long chains!

# WITH OPTIMIZATIONS - O(a(n)) ~ O(1)
# Path compression: self.parent[x] = self.find(self.parent[x])
# Union by rank: attach shorter to taller

# EXAMPLE: After path compression
# Before: 0->1->2->3->4->root
# After find(0): 0->root, 1->root, 2->root, 3->root, 4->root
# Tree flattened! Future finds are O(1)
\`\`\`
---
Cycle Detection with Union-Find
For undirected graphs, process edges one by one. For edge (u, v): if find(u) == find(v), they're already connected—adding edge creates cycle. Otherwise, union(u, v). This is basis of Kruskal's MST (process edges by weight, skip cycles).

\`\`\`python
def has_cycle(n, edges):
    uf = UnionFind(n)
    for u, v in edges:
        if uf.connected(u, v):
            return True  # Cycle detected!
        uf.union(u, v)
    return False

# EXAMPLE: edges = [(0,1), (1,2), (2,0)]
# Process (0,1): union(0,1) - OK
# Process (1,2): union(1,2) - OK
# Process (2,0): find(2)==find(0)? YES! - Cycle detected

# KRUSKAL'S MST - Sort edges by weight, use union-find
def kruskal_mst(n, edges):
    edges.sort(key=lambda e: e[2])  # Sort by weight
    uf = UnionFind(n)
    mst, total_cost = [], 0

    for u, v, weight in edges:
        if uf.union(u, v):  # If not cycle
            mst.append((u, v, weight))
            total_cost += weight
            if len(mst) == n - 1:  # MST complete
                break

    return mst, total_cost
\`\`\``
