import type { Method } from '../../types'

export const dictWhyWhenMethods: Method[] = [
  { section: 'Why & When', signature: 'Why use Dictionary?', description: 'Dicts provide O(1) average key-value lookups. Use when you need fast access by key, counting, caching, or mapping relationships.', complexity: 'Concept', example: `# Dictionary = Hash Table = O(1) lookup
# Use for: key-value mappings, fast lookups, caching

# FAST operations (O(1) average):
d['key']           # Access by key
d['key'] = value   # Set value
'key' in d         # Membership test
del d['key']       # Delete

# Common use cases:
# 1. Configuration/settings
config = {'debug': True, 'port': 8080}

# 2. Counting occurrences
from collections import Counter
counts = Counter(['a', 'b', 'a', 'c', 'a'])

# 3. Caching/memoization
cache = {}
def expensive(n):
    if n not in cache:
        cache[n] = n ** 2  # Compute once
    return cache[n]` },
  { section: 'Why & When', signature: 'Dict vs other types', description: 'Dict vs list: O(1) vs O(n) lookup. Dict keys must be hashable (immutable). Ordered since Python 3.7.', complexity: 'Concept', example: `# DICT vs LIST for lookups
users_list = [('alice', 1), ('bob', 2)]  # O(n) search
users_dict = {'alice': 1, 'bob': 2}      # O(1) lookup

# Key requirements: must be HASHABLE
valid_keys = {
    'string': 1,        # str - hashable
    42: 2,              # int - hashable
    (1, 2): 3,          # tuple - hashable
}
# invalid: {[1, 2]: 1}  # list - NOT hashable
# invalid: {{}: 1}      # dict - NOT hashable

# ORDERED since Python 3.7
d = {}
d['first'] = 1
d['second'] = 2
list(d.keys())  # ['first', 'second'] - guaranteed!

# Use defaultdict for grouping
from collections import defaultdict
groups = defaultdict(list)
groups['a'].append(1)  # No KeyError!` },
  { section: 'Why & When', signature: 'Performance tips', description: 'Use .get() to avoid KeyError. defaultdict for grouping. Counter for counting. Keys lookup is O(1).', complexity: 'O(varies)', example: `# AVOID KeyError
d = {'a': 1}
# BAD: d['missing']  # KeyError!
# GOOD:
d.get('missing', 0)      # Returns 0
d.setdefault('b', [])    # Creates if missing

# EFFICIENT patterns
# Counting - use Counter
from collections import Counter
counts = Counter(items)  # vs manual loop

# Grouping - use defaultdict
from collections import defaultdict
groups = defaultdict(list)

# Merging (Python 3.9+)
merged = d1 | d2  # New dict
d1 |= d2          # Update in place

# Memory: dict overhead ~232 bytes empty
# For small fixed keys, consider namedtuple` },
]
