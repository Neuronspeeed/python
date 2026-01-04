import type { Method } from '../../types'

// Counter advanced, defaultdict patterns, OrderedDict, ChainMap
export const stdlibCollectionsMethods: Method[] = [
  // Counter
  { signature: 'Counter Arithmetic', description: 'Counter supports +, -, &, | operations. Powerful for multiset operations.', complexity: 'O(n)', section: 'Counter', example: `from collections import Counter

# Basic counting
words = ['a', 'b', 'a', 'c', 'b', 'a']
count = Counter(words)
# Counter({'a': 3, 'b': 2, 'c': 1})

# Addition: combine counts
c1 = Counter(a=3, b=1)
c2 = Counter(a=1, b=2)
print(c1 + c2)  # Counter({'a': 4, 'b': 3})

# Subtraction: remove counts (keeps positive only)
print(c1 - c2)  # Counter({'a': 2})

# Intersection (minimum of each)
print(c1 & c2)  # Counter({'a': 1, 'b': 1})

# Union (maximum of each)
print(c1 | c2)  # Counter({'a': 3, 'b': 2})

# INTERVIEW: Check if anagrams
def is_anagram(s1, s2):
    return Counter(s1) == Counter(s2)

print(is_anagram("listen", "silent"))  # True

# INTERVIEW: Minimum window containing all chars
def min_window(s, t):
    need = Counter(t)
    have = Counter()
    # ... window sliding logic
    pass` },

  { signature: 'Counter.most_common()', description: 'Get n most frequent elements. Returns list of (element, count) tuples.', complexity: 'O(n log k)', section: 'Counter', example: `from collections import Counter

words = "the quick brown fox jumps over the lazy dog the fox".split()
count = Counter(words)

# Top 3 most common
print(count.most_common(3))
# [('the', 3), ('fox', 2), ('quick', 1)]

# All elements sorted by frequency
print(count.most_common())
# [('the', 3), ('fox', 2), ('quick', 1), ...]

# Least common (reverse)
print(count.most_common()[-3:])

# INTERVIEW: Top K Frequent Elements
def top_k_frequent(nums, k):
    return [item for item, count in Counter(nums).most_common(k)]

print(top_k_frequent([1,1,1,2,2,3], 2))  # [1, 2]

# INTERVIEW: Top K Frequent Words
def top_k_words(words, k):
    count = Counter(words)
    # Sort by frequency (desc), then alphabetically
    return sorted(count.keys(),
                  key=lambda w: (-count[w], w))[:k]

# Practical: Find majority element
def majority_element(nums):
    count = Counter(nums)
    return count.most_common(1)[0][0]` },

  { signature: 'Counter.elements()', description: 'Iterator over elements repeating each as many times as its count.', complexity: 'O(n)', section: 'Counter', example: `from collections import Counter

c = Counter(a=3, b=2, c=1)

# Get elements with repetition
elements = list(c.elements())
# ['a', 'a', 'a', 'b', 'b', 'c']

# Note: order may vary, negative counts ignored
c2 = Counter(a=2, b=-1)
print(list(c2.elements()))  # ['a', 'a']

# Practical: Reconstruct sorted list
nums = [3, 1, 4, 1, 5, 9, 2, 6]
count = Counter(nums)
sorted_nums = sorted(count.elements())
# [1, 1, 2, 3, 4, 5, 6, 9]

# total() - sum of all counts (Python 3.10+)
c = Counter(a=10, b=5, c=7)
print(c.total())  # 22

# subtract() - in-place subtraction
c1 = Counter(a=4, b=2)
c1.subtract(Counter(a=1, b=1))
print(c1)  # Counter({'a': 3, 'b': 1})

# update() - add counts
c1.update(Counter(a=1, c=5))
print(c1)  # Counter({'c': 5, 'a': 4, 'b': 1})` },

  // defaultdict
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

  // OrderedDict
  { signature: 'OrderedDict', description: 'Dict that remembers insertion order. Essential for LRU cache implementation.', complexity: 'O(1)', section: 'OrderedDict', example: `from collections import OrderedDict

# Maintains insertion order (dict does too in 3.7+)
od = OrderedDict()
od['a'] = 1
od['b'] = 2
od['c'] = 3

# move_to_end: reorder element
od.move_to_end('a')  # Move 'a' to end
print(list(od.keys()))  # ['b', 'c', 'a']

od.move_to_end('c', last=False)  # Move 'c' to beginning
print(list(od.keys()))  # ['c', 'b', 'a']

# popitem: remove from end or beginning
od.popitem()           # Removes 'a' (last)
od.popitem(last=False) # Removes 'c' (first)

# INTERVIEW: LRU Cache with OrderedDict
class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        # Move to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove oldest` },

  // deque
  { signature: 'deque Operations', description: 'Double-ended queue with O(1) append/pop on both ends. Better than list for queues.', complexity: 'O(1) ends', section: 'deque', example: `from collections import deque

# Basic operations
dq = deque([1, 2, 3])

# O(1) operations on both ends
dq.append(4)       # [1, 2, 3, 4]
dq.appendleft(0)   # [0, 1, 2, 3, 4]
dq.pop()           # Returns 4, now [0, 1, 2, 3]
dq.popleft()       # Returns 0, now [1, 2, 3]

# extend on both ends
dq.extend([4, 5])        # [1, 2, 3, 4, 5]
dq.extendleft([0, -1])   # [-1, 0, 1, 2, 3, 4, 5] (reversed!)

# rotate
dq = deque([1, 2, 3, 4, 5])
dq.rotate(2)   # [4, 5, 1, 2, 3] (right rotation)
dq.rotate(-2)  # [1, 2, 3, 4, 5] (left rotation)

# maxlen: fixed-size buffer
recent = deque(maxlen=3)
for i in range(5):
    recent.append(i)
# deque([2, 3, 4], maxlen=3)

# INTERVIEW: Sliding window maximum
def max_sliding_window(nums, k):
    result = []
    dq = deque()  # Store indices
    for i, num in enumerate(nums):
        # Remove indices outside window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        # Remove smaller elements
        while dq and nums[dq[-1]] < num:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result` },

  // ChainMap
  { signature: 'ChainMap', description: 'Combine multiple dicts into single view. First dict has priority for lookups.', complexity: 'O(n) lookup', section: 'ChainMap', example: `from collections import ChainMap

# Combine multiple dicts
defaults = {'color': 'red', 'user': 'guest'}
user_prefs = {'color': 'blue'}
cmd_args = {}

config = ChainMap(cmd_args, user_prefs, defaults)
print(config['color'])  # 'blue' (from user_prefs)
print(config['user'])   # 'guest' (from defaults)

# First dict is the "front" - mutations go there
config['new_key'] = 'value'
print(cmd_args)  # {'new_key': 'value'}

# Practical: Variable scoping
def make_scope():
    global_scope = {'x': 1, 'y': 2}
    local_scope = {'x': 10}
    scope = ChainMap(local_scope, global_scope)
    print(scope['x'])  # 10 (local)
    print(scope['y'])  # 2 (global)

# new_child: create new scope
child = config.new_child({'temp': 123})
print(child['temp'])   # 123
print(child['color'])  # 'blue'

# parents: skip first mapping
print(child.parents['color'])  # 'blue'

# Convert to regular dict
flat = dict(config)

# List all keys (unique across all maps)
print(list(config.keys()))` },

  // namedtuple
  { signature: 'namedtuple', description: 'Tuple with named fields. Immutable, memory efficient, self-documenting.', complexity: 'O(1)', section: 'namedtuple', example: `from collections import namedtuple

# Define a Point type
Point = namedtuple('Point', ['x', 'y'])

p = Point(3, 4)
print(p.x, p.y)    # 3, 4
print(p[0], p[1])  # 3, 4 (tuple access still works)

# Unpack like tuple
x, y = p
print(x, y)  # 3, 4

# Immutable (can't modify)
# p.x = 5  # Error!

# _replace: create modified copy
p2 = p._replace(x=10)
print(p2)  # Point(x=10, y=4)

# _asdict: convert to dict
print(p._asdict())  # {'x': 3, 'y': 4}

# Default values (Python 3.7+)
Point = namedtuple('Point', ['x', 'y', 'z'], defaults=[0])
print(Point(1, 2))  # Point(x=1, y=2, z=0)

# INTERVIEW: Use for clean code
Edge = namedtuple('Edge', ['src', 'dst', 'weight'])
edges = [Edge(0, 1, 5), Edge(1, 2, 3)]

for edge in edges:
    print(f"{edge.src} -> {edge.dst}: {edge.weight}")

# Practical: Return multiple values clearly
Result = namedtuple('Result', ['value', 'error', 'metadata'])
def process():
    return Result(42, None, {'time': 1.5})

result = process()
print(result.value)  # 42` },
]
