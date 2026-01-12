import type { Method } from '../../../types'

export const recursionPatternsMethods: Method[] = [
  { section: 'Recursion Patterns', signature: 'Cycle detection', description: 'Track visited items to avoid infinite loops in cyclic/graph structures.', complexity: 'O(n)', example: `def traverse(node, visited=None):
    if visited is None:
        visited = set()
    if id(node) in visited:  # already seen
        return
    visited.add(id(node))
    process(node)
    for child in node.children:
        traverse(child, visited)

# For graph traversal
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)` },
]
