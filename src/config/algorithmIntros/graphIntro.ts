export const graphIntro = `Graph Traversal Patterns
Graphs are vertices (nodes) connected by edges. Can be directed or undirected, weighted or unweighted. DFS (stack/recursion) and BFS (queue) both O(V+E).

\`\`\`python
graph = {'A': ['B','C'], 'B': ['D','E'], 'C': ['F']}

def dfs(graph, start, visited=None):
    if visited is None: visited = set()
    visited.add(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited

from collections import deque
def bfs(graph, start):
    visited, queue = {start}, deque([start])
    while queue:
        v = queue.popleft()
        for n in graph[v]:
            if n not in visited:
                visited.add(n)
                queue.append(n)
    return visited
\`\`\`python
---
DFS vs BFS Trade-offs
DFS for finding paths, checking connectivity, topological sort. BFS for shortest path in unweighted graphs, finding closest nodes. DFS uses less memory.

\`\`\`python
def shortest_path_bfs(graph, start, target):
    queue = deque([(start, [start])])
    visited = {start}
    while queue:
        v, path = queue.popleft()
        if v == target: return path
        for n in graph[v]:
            if n not in visited:
                visited.add(n)
                queue.append((n, path + [n]))
    return None

def find_path_dfs(graph, start, target, path=None):
    if path is None: path = []
    path.append(start)
    if start == target: return path
    for n in graph[start]:
        if n not in path:
            newpath = find_path_dfs(graph, n, target, path[:])
            if newpath: return newpath
    return None
\`\`\`python
---
Cycle Detection and Topological Sort
DFS with recursion stack detects cycles in directed graphs. Topological sort uses DFS post-order. Only works on DAGs.

\`\`\`python
def has_cycle(graph):
    visited, rec = set(), set()
    def dfs(node):
        visited.add(node)
        rec.add(node)
        for n in graph.get(node, []):
            if n not in visited and dfs(n): return True
            elif n in rec: return True
        rec.remove(node)
        return False
    return any(dfs(n) for n in graph if n not in visited)

def topological_sort(graph):
    visited, result = set(), []
    def dfs(node):
        visited.add(node)
        for n in graph.get(node, []):
            if n not in visited: dfs(n)
        result.append(node)  # Add AFTER exploring neighbors
    for n in graph:
        if n not in visited: dfs(n)
    return result[::-1]  # Reverse for correct order
\`\`\`python
`
