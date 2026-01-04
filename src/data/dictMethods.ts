import type { Method } from '../types'

export const dictMethods: Method[] = [
  // Fundamentals
  { section: 'Fundamentals', signature: 'Dictionary Basics', description: 'Dictionaries store KEY-VALUE pairs. Create with {}. Keys must be hashable (immutable). Values can be anything. Order preserved since Python 3.7.', complexity: 'Concept', example: `# Create dict with curly braces {}
capitals = {
    "California": "Sacramento",
    "New York": "Albany",
    "Texas": "Austin",
}

# Or from tuples with dict()
pairs = (("CA", "Sacramento"), ("NY", "Albany"))
capitals = dict(pairs)

# Empty dict
empty = {}  # or dict()

# Key-value pair structure
# Key: unique identifier (must be hashable: str, int, tuple)
# Value: any Python object

# Mixed types OK (but typically use same types)
data = {
    "name": "Alice",    # str key, str value
    1: [1, 2, 3],       # int key, list value
    (0, 0): "origin",   # tuple key, str value
}` },
  { section: 'Fundamentals', signature: 'Dictionary Access', description: 'Access values with [key]. Raises KeyError if key missing. Use .get() for safe access with default value.', complexity: 'O(1)', example: `capitals = {"Texas": "Austin", "California": "Sacramento"}

# Access with []
print(capitals["Texas"])  # "Austin"

# KeyError if missing!
# capitals["Arizona"]  # KeyError: 'Arizona'

# Check before accessing
if "Arizona" in capitals:
    print(capitals["Arizona"])

# Safe access with .get()
print(capitals.get("Arizona"))  # None (no error!)
print(capitals.get("Arizona", "Unknown"))  # "Unknown"

# Note: 'in' only checks KEYS, not values
print("Austin" in capitals)  # False! (it's a value, not a key)
print("Texas" in capitals)   # True (it's a key)` },
  { section: 'Fundamentals', signature: 'Dictionary Mutability', description: 'Dicts are MUTABLE. Can add, modify, and delete items. Keys unique - assigning to existing key OVERWRITES value.', complexity: 'O(1)', example: `capitals = {"Texas": "Austin"}

# Add new key-value pair
capitals["Colorado"] = "Denver"
print(capitals)  # {'Texas': 'Austin', 'Colorado': 'Denver'}

# Modify existing (overwrites!)
capitals["Texas"] = "Houston"
print(capitals)  # {'Texas': 'Houston', ...}

# Delete with del
del capitals["Texas"]
print(capitals)  # {'Colorado': 'Denver'}

# Each key can only map to ONE value
# If you assign to same key again, old value is lost!
d = {"key": "first"}
d["key"] = "second"  # "first" is gone!
print(d)  # {'key': 'second'}` },
  { section: 'Fundamentals', signature: 'Iterating Over Dicts', description: 'for loop iterates over KEYS by default. Use .items() for key-value pairs, .values() for just values.', complexity: 'O(n)', example: `capitals = {
    "California": "Sacramento",
    "New York": "Albany",
    "Texas": "Austin",
}

# Loop over keys (default)
for state in capitals:
    print(state)  # California, New York, Texas

# Loop and access values
for state in capitals:
    print(f"{state}: {capitals[state]}")

# Better: Loop over key-value pairs with .items()
for state, capital in capitals.items():
    print(f"The capital of {state} is {capital}")

# .items() returns list-like of tuples
print(capitals.items())
# dict_items([('California', 'Sacramento'), ...])` },
  // Why & When
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

  // Creation
  { section: 'Creation', signature: 'dict()', description: 'Creates an empty dictionary or converts mappings/iterables to dict.', complexity: 'O(n)', example: `print(dict())                    # {}
print(dict(a=1, b=2))            # {'a': 1, 'b': 2}
print(dict([('a', 1), ('b', 2)])) # {'a': 1, 'b': 2}
print(dict(zip(['a','b'], [1,2]))) # {'a': 1, 'b': 2}` },
  { section: 'Creation', signature: '{key: value}', description: 'Dictionary literal syntax. Keys must be hashable.', complexity: 'O(n)', example: `d = {'name': 'Alice', 'age': 30}
d = {1: 'one', 2: 'two'}
d = {}  # Empty dict` },
  { section: 'Creation', signature: '{k: v for ...}', description: 'Dictionary comprehension. Creates dict from expression.', complexity: 'O(n)', example: `squares = {x: x**2 for x in range(5)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# With condition
even_sq = {x: x**2 for x in range(10) if x % 2 == 0}
print(even_sq)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}` },
  { section: 'Creation', signature: 'dict.fromkeys(keys[, value])', description: 'Creates dict with keys from iterable, all set to value (default None).', complexity: 'O(n)', example: `keys = ['a', 'b', 'c']
d = dict.fromkeys(keys)
print(d)  # {'a': None, 'b': None, 'c': None}

d = dict.fromkeys(keys, 0)
print(d)  # {'a': 0, 'b': 0, 'c': 0}

# Warning: mutable default is shared!
d = dict.fromkeys(keys, [])
d['a'].append(1)
print(d)  # {'a': [1], 'b': [1], 'c': [1]} (all same list!)` },

  // Access
  { section: 'Access', signature: 'dict[key]', description: 'Returns value for key. Raises KeyError if key not found.', complexity: 'O(1) avg', example: `d = {'name': 'Alice', 'age': 30}
print(d['name'])  # 'Alice'
# print(d['job'])  # KeyError: 'job'` },
  { section: 'Access', signature: 'dict.get(key[, default])', description: 'Returns value for key, or default (None) if not found. Never raises KeyError.', complexity: 'O(1) avg', example: `d = {'name': 'Alice', 'age': 30}
print(d.get('name'))       # 'Alice'
print(d.get('job'))        # None
print(d.get('job', 'N/A')) # 'N/A'` },
  { section: 'Access', signature: 'dict.setdefault(key[, default])', description: 'Returns value if key exists; otherwise inserts key with default and returns it.', complexity: 'O(1) avg', example: `d = {'a': 1}
print(d.setdefault('a', 99))  # 1 (existing)
print(d.setdefault('b', 2))   # 2 (inserted)
print(d)  # {'a': 1, 'b': 2}

# Useful for grouping
groups = {}
for item in ['apple', 'banana', 'apricot']:
    groups.setdefault(item[0], []).append(item)
print(groups)  # {'a': ['apple', 'apricot'], 'b': ['banana']}` },

  // Modification
  { section: 'Modification', signature: 'dict[key] = value', description: 'Sets value for key. Adds key if not present.', complexity: 'O(1) avg', example: `d = {'a': 1}
d['a'] = 99    # Update existing
d['b'] = 2     # Add new
print(d)  # {'a': 99, 'b': 2}` },
  { section: 'Modification', signature: 'dict.update([other])', description: 'Updates dict with key-value pairs from other dict or iterable.', complexity: 'O(n)', example: `d = {'a': 1, 'b': 2}
d.update({'b': 99, 'c': 3})
print(d)  # {'a': 1, 'b': 99, 'c': 3}

d.update(d=4, e=5)  # Keyword args
print(d)  # {'a': 1, 'b': 99, 'c': 3, 'd': 4, 'e': 5}

d.update([('f', 6)])  # From iterable of pairs
print(d)` },
  { section: 'Modification', signature: 'dict | other (Python 3.9+)', description: 'Merge operator. Returns new dict with combined items.', complexity: 'O(n+m)', example: `d1 = {'a': 1, 'b': 2}
d2 = {'b': 99, 'c': 3}
merged = d1 | d2
print(merged)  # {'a': 1, 'b': 99, 'c': 3}
print(d1)      # {'a': 1, 'b': 2} (unchanged)` },
  { section: 'Modification', signature: 'dict |= other (Python 3.9+)', description: 'Update operator. Updates dict in place.', complexity: 'O(n)', example: `d = {'a': 1, 'b': 2}
d |= {'b': 99, 'c': 3}
print(d)  # {'a': 1, 'b': 99, 'c': 3}` },

  // Removal
  { section: 'Removal', signature: 'dict.pop(key[, default])', description: 'Removes key and returns its value. Returns default if not found (or raises KeyError).', complexity: 'O(1) avg', example: `d = {'a': 1, 'b': 2, 'c': 3}
print(d.pop('b'))      # 2
print(d)               # {'a': 1, 'c': 3}
print(d.pop('z', 99))  # 99 (default)
# d.pop('z')  # KeyError` },
  { section: 'Removal', signature: 'dict.popitem()', description: 'Removes and returns an arbitrary (last inserted in 3.7+) key-value pair. Raises KeyError if empty.', complexity: 'O(1)', example: `d = {'a': 1, 'b': 2, 'c': 3}
print(d.popitem())  # ('c', 3) in Python 3.7+
print(d)            # {'a': 1, 'b': 2}` },
  { section: 'Removal', signature: 'del dict[key]', description: 'Deletes key-value pair. Raises KeyError if key not found.', complexity: 'O(1) avg', example: `d = {'a': 1, 'b': 2}
del d['a']
print(d)  # {'b': 2}
# del d['z']  # KeyError` },
  { section: 'Removal', signature: 'dict.clear()', description: 'Removes all items from the dictionary.', complexity: 'O(n)', example: `d = {'a': 1, 'b': 2}
d.clear()
print(d)  # {}` },

  // Views
  { section: 'Views', signature: 'dict.keys()', description: 'Returns a view of the dictionary\'s keys.', complexity: 'O(1)', example: `d = {'a': 1, 'b': 2, 'c': 3}
keys = d.keys()
print(keys)        # dict_keys(['a', 'b', 'c'])
print(list(keys))  # ['a', 'b', 'c']
print('a' in keys) # True (O(1) membership)

# View is dynamic
d['d'] = 4
print(keys)  # dict_keys(['a', 'b', 'c', 'd'])` },
  { section: 'Views', signature: 'dict.values()', description: 'Returns a view of the dictionary\'s values.', complexity: 'O(1)', example: `d = {'a': 1, 'b': 2, 'c': 3}
values = d.values()
print(values)        # dict_values([1, 2, 3])
print(list(values))  # [1, 2, 3]` },
  { section: 'Views', signature: 'dict.items()', description: 'Returns a view of key-value pairs as tuples.', complexity: 'O(1)', example: `d = {'a': 1, 'b': 2}
items = d.items()
print(items)       # dict_items([('a', 1), ('b', 2)])
print(list(items)) # [('a', 1), ('b', 2)]

# Iteration
for key, value in d.items():
    print(f"{key}: {value}")` },

  // Membership & Length
  { section: 'Membership & Length', signature: 'key in dict', description: 'Returns True if key is in the dictionary.', complexity: 'O(1) avg', example: `d = {'a': 1, 'b': 2}
print('a' in d)      # True
print('z' in d)      # False
print('z' not in d)  # True` },
  { section: 'Membership & Length', signature: 'len(dict)', description: 'Returns the number of key-value pairs.', complexity: 'O(1)', example: `d = {'a': 1, 'b': 2, 'c': 3}
print(len(d))  # 3` },

  // Copying
  { section: 'Copying', signature: 'dict.copy()', description: 'Returns a shallow copy of the dictionary.', complexity: 'O(n)', example: `d = {'a': 1, 'b': [2, 3]}
copy = d.copy()
copy['a'] = 99
print(d)     # {'a': 1, 'b': [2, 3]} (unchanged)

copy['b'].append(4)  # Nested object shared!
print(d)     # {'a': 1, 'b': [2, 3, 4]}` },
  { section: 'Copying', signature: 'copy.deepcopy(dict)', description: 'Creates a deep copy. Nested objects are also copied.', complexity: 'O(n)', example: `import copy
d = {'a': 1, 'b': [2, 3]}
deep = copy.deepcopy(d)
deep['b'].append(4)
print(d)     # {'a': 1, 'b': [2, 3]} (unchanged!)
print(deep)  # {'a': 1, 'b': [2, 3, 4]}` },

  // Iteration Patterns
  { section: 'Iteration', signature: 'for key in dict', description: 'Iterates over keys (default iteration).', complexity: 'O(n)', example: `d = {'a': 1, 'b': 2}
for key in d:
    print(key, d[key])  # a 1, b 2` },
  { section: 'Iteration', signature: 'for k, v in dict.items()', description: 'Iterates over key-value pairs. Most common pattern.', complexity: 'O(n)', example: `d = {'a': 1, 'b': 2}
for key, value in d.items():
    print(f"{key} = {value}")` },

  // DefaultDict
  { section: 'Specialized Dicts', signature: 'defaultdict(default_factory)', description: 'Dict subclass that provides default values for missing keys.', complexity: 'O(1)', example: `from collections import defaultdict

# Default to 0
counts = defaultdict(int)
for char in "hello":
    counts[char] += 1
print(dict(counts))  # {'h': 1, 'e': 1, 'l': 2, 'o': 1}

# Default to empty list
groups = defaultdict(list)
groups['a'].append(1)  # No KeyError!
print(dict(groups))  # {'a': [1]}` },

  // Counter
  { section: 'Specialized Dicts', signature: 'Counter(iterable)', description: 'Dict subclass for counting hashable objects.', complexity: 'O(n)', example: `from collections import Counter

c = Counter("abracadabra")
print(c)  # Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})
print(c['a'])           # 5
print(c['z'])           # 0 (not KeyError!)
print(c.most_common(2)) # [('a', 5), ('b', 2)]` },

  // OrderedDict
  { section: 'Specialized Dicts', signature: 'OrderedDict()', description: 'Dict that remembers insertion order. (Regular dicts preserve order since 3.7)', complexity: 'O(1)', example: `from collections import OrderedDict

od = OrderedDict()
od['a'] = 1
od['b'] = 2
od.move_to_end('a')  # Move 'a' to end
print(list(od.keys()))  # ['b', 'a']

# popitem(last=False) pops first item
print(od.popitem(last=False))  # ('b', 2)` },

  // Common Patterns
  { section: 'Common Patterns', signature: 'Invert dictionary', description: 'Swap keys and values. Values must be hashable.', complexity: 'O(n)', example: `d = {'a': 1, 'b': 2, 'c': 3}
inverted = {v: k for k, v in d.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}` },
  { section: 'Common Patterns', signature: 'Merge with defaults', description: 'Use ChainMap or unpacking to provide default values.', complexity: 'O(n)', example: `defaults = {'color': 'red', 'size': 'medium'}
user_prefs = {'color': 'blue'}

# Method 1: Unpacking (Python 3.5+)
config = {**defaults, **user_prefs}
print(config)  # {'color': 'blue', 'size': 'medium'}

# Method 2: ChainMap (looks up in order)
from collections import ChainMap
config = ChainMap(user_prefs, defaults)
print(config['color'])  # 'blue'
print(config['size'])   # 'medium'` },
  { section: 'Common Patterns', signature: 'Group by key', description: 'Group items by a computed key.', complexity: 'O(n)', example: `from collections import defaultdict

words = ['apple', 'banana', 'apricot', 'blueberry']
by_first_letter = defaultdict(list)
for word in words:
    by_first_letter[word[0]].append(word)
print(dict(by_first_letter))
# {'a': ['apple', 'apricot'], 'b': ['banana', 'blueberry']}` },
]
