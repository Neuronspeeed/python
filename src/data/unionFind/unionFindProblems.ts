import type { Method } from '../../types'

// Union Find Problems
export const unionFindProblemsMethods: Method[] = [
  { signature: 'Number of Connected Components', description: 'Count connected components in undirected graph.', complexity: 'O(n + e * α(n))', section: 'Problems', example: `def count_components(n, edges):
    uf = UnionFind(n)

    for u, v in edges:
        uf.union(u, v)

    return uf.get_count()

# Alternative: count unique roots
def count_components_v2(n, edges):
    parent = list(range(n))

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    for u, v in edges:
        root_u, root_v = find(u), find(v)
        if root_u != root_v:
            parent[root_u] = root_v

    # Count unique roots
    return len(set(find(i) for i in range(n)))

# Example:
# n = 5, edges = [[0,1], [1,2], [3,4]]
# Components: {0,1,2}, {3,4}
# Output: 2` },
  { signature: 'Graph Valid Tree', description: 'Check if edges form a valid tree. No cycles, fully connected.', complexity: 'O(n + e * α(n))', section: 'Problems', example: `def valid_tree(n, edges):
    # Tree has exactly n-1 edges and no cycles
    if len(edges) != n - 1:
        return False

    uf = UnionFind(n)

    for u, v in edges:
        # If already connected, adding edge creates cycle
        if not uf.union(u, v):
            return False

    # Check if all connected (single component)
    return uf.get_count() == 1

# Alternative: DFS approach
def valid_tree_dfs(n, edges):
    if len(edges) != n - 1:
        return False

    # Build adjacency list
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)

    # DFS from node 0
    visited = set()

    def dfs(node, parent):
        visited.add(node)
        for neighbor in adj[node]:
            if neighbor == parent:
                continue
            if neighbor in visited:
                return False  # Cycle found
            if not dfs(neighbor, node):
                return False
        return True

    return dfs(0, -1) and len(visited) == n` },
  { signature: 'Redundant Connection', description: 'Find edge that creates a cycle.', complexity: 'O(n * α(n))', section: 'Problems', example: `def find_redundant_connection(edges):
    n = len(edges)
    uf = UnionFind(n + 1)  # 1-indexed

    for u, v in edges:
        if not uf.union(u, v):
            return [u, v]  # This edge creates cycle

    return []

# Example: [[1,2], [1,3], [2,3]]
# After [1,2]: {1,2}, {3}
# After [1,3]: {1,2,3}
# [2,3] would create cycle -> return [2,3]

# For directed graph (Redundant Connection II)
# More complex: need to handle two cases
# 1. Node has two parents
# 2. Cycle exists` },
  { signature: 'Number of Islands II', description: 'Count islands after each land addition. Dynamic connectivity.', complexity: 'O(k * α(mn))', section: 'Problems', example: `def num_islands_ii(m, n, positions):
    uf = {}
    result = []
    count = 0
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]

    def find(x):
        if uf[x] != x:
            uf[x] = find(uf[x])
        return uf[x]

    def union(x, y):
        nonlocal count
        root_x, root_y = find(x), find(y)
        if root_x != root_y:
            uf[root_x] = root_y
            count -= 1

    for r, c in positions:
        if (r, c) in uf:
            result.append(count)
            continue

        uf[(r, c)] = (r, c)
        count += 1

        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if (nr, nc) in uf:
                union((r, c), (nr, nc))

        result.append(count)

    return result

# Example:
# m = 3, n = 3
# positions = [[0,0], [0,1], [1,2], [2,1]]
# Output: [1, 1, 2, 3]` },
  { signature: 'Accounts Merge', description: 'Merge accounts with common emails.', complexity: 'O(n * α(n))', section: 'Problems', example: `def accounts_merge(accounts):
    from collections import defaultdict

    # Map email to first account index that has it
    email_to_id = {}
    # Map email to account name
    email_to_name = {}

    uf = UnionFind(len(accounts))

    for i, account in enumerate(accounts):
        name = account[0]
        for email in account[1:]:
            email_to_name[email] = name
            if email in email_to_id:
                uf.union(i, email_to_id[email])
            email_to_id[email] = i

    # Group emails by root account
    root_to_emails = defaultdict(list)
    for email, idx in email_to_id.items():
        root = uf.find(idx)
        root_to_emails[root].append(email)

    # Build result
    result = []
    for root, emails in root_to_emails.items():
        name = email_to_name[emails[0]]
        result.append([name] + sorted(emails))

    return result

# Example:
# accounts = [["John", "j1@mail.com", "j2@mail.com"],
#             ["John", "j3@mail.com"],
#             ["John", "j1@mail.com", "j4@mail.com"]]
# Output: [["John", "j1@mail.com", "j2@mail.com", "j4@mail.com"],
#          ["John", "j3@mail.com"]]` },
  { signature: 'Longest Consecutive Sequence', description: 'Find longest consecutive sequence using Union Find.', complexity: 'O(n * α(n))', section: 'Problems', example: `def longest_consecutive_uf(nums):
    if not nums:
        return 0

    num_to_idx = {num: i for i, num in enumerate(nums)}
    uf = UnionFind(len(nums))

    for num in nums:
        if num + 1 in num_to_idx:
            uf.union(num_to_idx[num], num_to_idx[num + 1])

    return max(uf.get_size(i) for i in range(len(nums)))

# Set-based approach (simpler, also O(n))
def longest_consecutive(nums):
    num_set = set(nums)
    longest = 0

    for num in num_set:
        # Only start from sequence beginning
        if num - 1 not in num_set:
            length = 1
            while num + length in num_set:
                length += 1
            longest = max(longest, length)

    return longest

# Example: [100, 4, 200, 1, 3, 2]
# Sequence: 1, 2, 3, 4 -> length 4` },
  { signature: 'Evaluate Division', description: 'Given equations a/b=k, answer queries. Union Find with weights.', complexity: 'O((n+q) * α(n))', section: 'Problems', example: `def calc_equation(equations, values, queries):
    # Weighted Union Find
    # weight[x] = x / parent[x]
    parent = {}
    weight = {}

    def find(x):
        if x not in parent:
            parent[x] = x
            weight[x] = 1.0
            return x

        if parent[x] != x:
            root = find(parent[x])
            weight[x] *= weight[parent[x]]
            parent[x] = root

        return parent[x]

    def union(x, y, val):
        root_x, root_y = find(x), find(y)
        if root_x != root_y:
            parent[root_x] = root_y
            # x / root_x = weight[x]
            # y / root_y = weight[y]
            # x / y = val
            # root_x / root_y = ?
            weight[root_x] = val * weight[y] / weight[x]

    # Build union find
    for (a, b), val in zip(equations, values):
        union(a, b, val)

    # Answer queries
    result = []
    for a, b in queries:
        if a not in parent or b not in parent:
            result.append(-1.0)
        elif find(a) != find(b):
            result.append(-1.0)
        else:
            result.append(weight[a] / weight[b])

    return result

# Example:
# equations = [["a","b"], ["b","c"]]
# values = [2.0, 3.0]
# queries = [["a","c"], ["b","a"]]
# Output: [6.0, 0.5]  (a/c = 2*3 = 6, b/a = 1/2)` },
]
