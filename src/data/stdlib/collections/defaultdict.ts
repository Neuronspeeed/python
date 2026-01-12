import type { Method } from '../../../types'

export const collectionsDefaultdictMethods: Method[] = [
  { signature: 'defaultdict Patterns', description: 'Dict with default factory for missing keys. Avoids KeyError and setdefault.', complexity: 'O(1)', section: 'defaultdict', example: `from collections import defaultdict

# Default to empty list
graph = defaultdict(list)
graph['a'].append('b')  # No KeyError!
graph['a'].append('c')
# defaultdict(list, {'a': ['b', 'c']})

# Default to 0 (counting)
counter = defaultdict(int)
for word in "hello world".split():
    counter[word] += 1
# defaultdict(int, {'hello': 1, 'world': 1})

# Default to set (unique collections)
index = defaultdict(set)
docs = [("doc1", "hello"), ("doc1", "world"), ("doc2", "hello")]
for doc, word in docs:
    index[word].add(doc)
# defaultdict(set, {'hello': {'doc1', 'doc2'}, 'world': {'doc1'}})

# INTERVIEW: Group anagrams
def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))  # Sorted chars as key
        groups[key].append(s)
    return list(groups.values())

print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
# [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]` },

  { signature: 'defaultdict with lambda', description: 'Use lambda for complex default values. Nest defaultdicts for multi-level dicts.', complexity: 'O(1)', section: 'defaultdict', example: `from collections import defaultdict

# Lambda for mutable defaults
def make_counter():
    return defaultdict(lambda: {'count': 0, 'sum': 0})

stats = make_counter()
stats['user1']['count'] += 1
stats['user1']['sum'] += 100
# {'user1': {'count': 1, 'sum': 100}}

# Nested defaultdict (auto-vivification)
def nested_dict():
    return defaultdict(nested_dict)

tree = nested_dict()
tree['a']['b']['c'] = 1  # No KeyError at any level!
tree['x']['y'] = 2
# Access: tree['a']['b']['c'] -> 1

# 2D grid with default value
grid = defaultdict(lambda: defaultdict(int))
grid[0][0] = 1
grid[5][10] = 99
# grid[100][200] -> 0 (default)

# INTERVIEW: Build adjacency list with weights
edges = [(0, 1, 5), (0, 2, 3), (1, 2, 2)]
graph = defaultdict(lambda: defaultdict(lambda: float('inf')))
for u, v, w in edges:
    graph[u][v] = w
    graph[v][u] = w

# Access: graph[0][1] -> 5, graph[5][6] -> inf` },
]
