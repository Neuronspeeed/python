import type { Method } from '../types'

export const setMethods: Method[] = [
  // Why & When
  { section: 'Why & When', signature: 'Why use Set?', description: 'Sets provide O(1) membership testing and automatic deduplication. Use when you need unique elements or fast "is X in collection" checks.', complexity: 'Concept', example: `# Set = Hash Table for unique values
# Use for: O(1) membership, deduplication, set math

# MEMBERSHIP TEST: O(1) vs O(n) for list!
allowed = {'admin', 'user', 'moderator'}
if role in allowed:  # O(1) - FAST!
    grant_access()

# vs list membership (SLOW)
if role in ['admin', 'user', 'moderator']:  # O(n)
    grant_access()

# DEDUPLICATION
items = [1, 2, 2, 3, 1, 4]
unique = set(items)  # {1, 2, 3, 4}

# SET MATH - find differences
old_users = {'alice', 'bob', 'charlie'}
new_users = {'bob', 'charlie', 'diana'}
added = new_users - old_users    # {'diana'}
removed = old_users - new_users  # {'alice'}` },
  { section: 'Why & When', signature: 'Set vs other types', description: 'Set vs list: O(1) vs O(n) membership. Sets are unordered and require hashable elements. Use frozenset for immutable sets.', complexity: 'Concept', example: `# SET vs LIST
# Use SET when: membership testing, uniqueness needed
# Use LIST when: order matters, duplicates allowed

# HASHABILITY requirement (like dict keys)
valid = {1, 'string', (1, 2)}     # OK
# invalid = {[1, 2]}  # ERROR: list not hashable
# invalid = {{1: 2}}  # ERROR: dict not hashable

# UNORDERED - no indexing!
s = {3, 1, 4}
# s[0]  # TypeError: 'set' object is not subscriptable

# FROZENSET - immutable set
fs = frozenset([1, 2, 3])
# fs.add(4)  # ERROR: no add method
# Can use as dict key or in another set
valid_dict = {frozenset([1, 2]): 'value'}

# Note: {} is empty DICT, not set!
empty_set = set()  # Correct
empty_dict = {}    # This is a dict!` },
  { section: 'Why & When', signature: 'Performance tips', description: 'Convert list to set for repeated membership tests. Use set operations for finding differences. Frozenset for hashable sets.', complexity: 'O(varies)', example: `# WHEN TO CONVERT TO SET
items = [1, 2, 3, 4, 5]

# BAD: checking membership many times in list
for x in range(1000):
    if x in items:  # O(n) each time = O(n*k) total
        pass

# GOOD: convert to set first
items_set = set(items)  # O(n) once
for x in range(1000):
    if x in items_set:  # O(1) each = O(k) total
        pass

# SET OPERATIONS vs manual loops
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# GOOD - use set operations
common = a & b         # {3, 4}
only_in_a = a - b      # {1, 2}
all_items = a | b      # {1, 2, 3, 4, 5, 6}

# Memory: ~224 bytes empty + ~32 bytes per item` },

  // Creation
  { section: 'Creation', signature: 'set()', description: 'Creates an empty set or converts an iterable to a set.', complexity: 'O(n)', example: `print(set())            # set()
print(set([1, 2, 2, 3])) # {1, 2, 3} (duplicates removed)
print(set("hello"))      # {'h', 'e', 'l', 'o'}
print(set(range(5)))     # {0, 1, 2, 3, 4}` },
  { section: 'Creation', signature: '{x, y, z}', description: 'Set literal syntax. Elements must be hashable. Cannot use {} for empty set.', complexity: 'O(n)', example: `s = {1, 2, 3}
s = {1, 2, 2, 3}  # {1, 2, 3} (duplicates removed)
# s = {}  # This creates empty DICT, not set!
s = set()  # Empty set` },
  { section: 'Creation', signature: '{expr for x in iterable}', description: 'Set comprehension. Creates set from expression.', complexity: 'O(n)', example: `squares = {x**2 for x in range(5)}
print(squares)  # {0, 1, 4, 9, 16}

# With condition
evens = {x for x in range(10) if x % 2 == 0}
print(evens)  # {0, 2, 4, 6, 8}` },
  { section: 'Creation', signature: 'frozenset(iterable)', description: 'Immutable set. Can be used as dict key or in another set.', complexity: 'O(n)', example: `fs = frozenset([1, 2, 3])
# fs.add(4)  # AttributeError: no add method

# Can use as dict key
d = {frozenset([1, 2]): "value"}

# Can add to set
s = {frozenset([1, 2]), frozenset([3, 4])}` },

  // Adding Elements
  { section: 'Adding Elements', signature: 'set.add(elem)', description: 'Adds element to the set. No effect if element already present.', complexity: 'O(1) avg', example: `s = {1, 2}
s.add(3)
print(s)  # {1, 2, 3}

s.add(2)  # No effect
print(s)  # {1, 2, 3}` },
  { section: 'Adding Elements', signature: 'set.update(*others)', description: 'Updates set with elements from all iterables.', complexity: 'O(n)', example: `s = {1, 2}
s.update([3, 4], {5, 6})
print(s)  # {1, 2, 3, 4, 5, 6}

s.update("ab")
print(s)  # {1, 2, 3, 4, 5, 6, 'a', 'b'}` },

  // Removing Elements
  { section: 'Removing Elements', signature: 'set.remove(elem)', description: 'Removes element from set. Raises KeyError if not present.', complexity: 'O(1) avg', example: `s = {1, 2, 3}
s.remove(2)
print(s)  # {1, 3}

# s.remove(99)  # KeyError: 99` },
  { section: 'Removing Elements', signature: 'set.discard(elem)', description: 'Removes element if present. No error if not present.', complexity: 'O(1) avg', example: `s = {1, 2, 3}
s.discard(2)
print(s)  # {1, 3}

s.discard(99)  # No error
print(s)  # {1, 3}` },
  { section: 'Removing Elements', signature: 'set.pop()', description: 'Removes and returns an arbitrary element. Raises KeyError if empty.', complexity: 'O(1)', example: `s = {1, 2, 3}
elem = s.pop()
print(elem)  # Some element (arbitrary)
print(s)     # Remaining elements

# set().pop()  # KeyError: 'pop from an empty set'` },
  { section: 'Removing Elements', signature: 'set.clear()', description: 'Removes all elements from the set.', complexity: 'O(n)', example: `s = {1, 2, 3}
s.clear()
print(s)  # set()` },

  // Set Operations
  { section: 'Set Operations', signature: 'set.union(*others) or set | other', description: 'Returns new set with elements from set and all others.', complexity: 'O(n+m)', example: `a = {1, 2, 3}
b = {3, 4, 5}
print(a.union(b))     # {1, 2, 3, 4, 5}
print(a | b)          # {1, 2, 3, 4, 5}
print(a | b | {6})    # {1, 2, 3, 4, 5, 6}` },
  { section: 'Set Operations', signature: 'set.intersection(*others) or set & other', description: 'Returns new set with elements common to set and all others.', complexity: 'O(min(n,m))', example: `a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a.intersection(b))  # {3, 4}
print(a & b)              # {3, 4}
print(a & b & {3, 7})     # {3}` },
  { section: 'Set Operations', signature: 'set.difference(*others) or set - other', description: 'Returns new set with elements in set but not in others.', complexity: 'O(n)', example: `a = {1, 2, 3, 4}
b = {3, 4, 5}
print(a.difference(b))  # {1, 2}
print(a - b)            # {1, 2}
print(a - b - {1})      # {2}` },
  { section: 'Set Operations', signature: 'set.symmetric_difference(other) or set ^ other', description: 'Returns new set with elements in either set but not both.', complexity: 'O(n+m)', example: `a = {1, 2, 3}
b = {2, 3, 4}
print(a.symmetric_difference(b))  # {1, 4}
print(a ^ b)                      # {1, 4}` },

  // In-place Operations
  { section: 'In-place Operations', signature: 'set.update(*others) or set |= other', description: 'Updates set with union. Adds elements from others.', complexity: 'O(n)', example: `s = {1, 2}
s.update([3, 4])
print(s)  # {1, 2, 3, 4}

s |= {5, 6}
print(s)  # {1, 2, 3, 4, 5, 6}` },
  { section: 'In-place Operations', signature: 'set.intersection_update(*others) or set &= other', description: 'Updates set with intersection. Keeps only common elements.', complexity: 'O(n)', example: `s = {1, 2, 3, 4}
s.intersection_update({2, 3, 5})
print(s)  # {2, 3}

s &= {2, 6}
print(s)  # {2}` },
  { section: 'In-place Operations', signature: 'set.difference_update(*others) or set -= other', description: 'Updates set with difference. Removes elements found in others.', complexity: 'O(n)', example: `s = {1, 2, 3, 4}
s.difference_update({2, 3})
print(s)  # {1, 4}

s -= {1}
print(s)  # {4}` },
  { section: 'In-place Operations', signature: 'set.symmetric_difference_update(other) or set ^= other', description: 'Updates set with symmetric difference.', complexity: 'O(n)', example: `s = {1, 2, 3}
s.symmetric_difference_update({2, 3, 4})
print(s)  # {1, 4}

s ^= {1, 5}
print(s)  # {4, 5}` },

  // Comparison
  { section: 'Comparison', signature: 'set.issubset(other) or set <= other', description: 'Returns True if every element of set is in other.', complexity: 'O(n)', example: `a = {1, 2}
b = {1, 2, 3, 4}
print(a.issubset(b))  # True
print(a <= b)         # True
print(a <= a)         # True (equal sets are subsets)` },
  { section: 'Comparison', signature: 'set < other', description: 'Returns True if set is a proper subset (subset but not equal).', complexity: 'O(n)', example: `a = {1, 2}
b = {1, 2, 3}
print(a < b)  # True
print(a < a)  # False (not proper subset of itself)` },
  { section: 'Comparison', signature: 'set.issuperset(other) or set >= other', description: 'Returns True if every element of other is in set.', complexity: 'O(n)', example: `a = {1, 2, 3, 4}
b = {1, 2}
print(a.issuperset(b))  # True
print(a >= b)           # True` },
  { section: 'Comparison', signature: 'set > other', description: 'Returns True if set is a proper superset (superset but not equal).', complexity: 'O(n)', example: `a = {1, 2, 3}
b = {1, 2}
print(a > b)  # True
print(a > a)  # False` },
  { section: 'Comparison', signature: 'set.isdisjoint(other)', description: 'Returns True if sets have no elements in common.', complexity: 'O(min(n,m))', example: `a = {1, 2}
b = {3, 4}
c = {2, 3}
print(a.isdisjoint(b))  # True
print(a.isdisjoint(c))  # False (share 2)` },

  // Membership & Basics
  { section: 'Membership & Basics', signature: 'elem in set', description: 'Returns True if element is in the set.', complexity: 'O(1) avg', example: `s = {1, 2, 3}
print(2 in s)      # True
print(5 in s)      # False
print(5 not in s)  # True` },
  { section: 'Membership & Basics', signature: 'len(set)', description: 'Returns the number of elements in the set.', complexity: 'O(1)', example: `s = {1, 2, 3}
print(len(s))  # 3
print(len(set()))  # 0` },
  { section: 'Membership & Basics', signature: 'set.copy()', description: 'Returns a shallow copy of the set.', complexity: 'O(n)', example: `s = {1, 2, 3}
copy = s.copy()
copy.add(4)
print(s)     # {1, 2, 3}
print(copy)  # {1, 2, 3, 4}` },

  // Iteration & Functions
  { section: 'Iteration & Functions', signature: 'for elem in set', description: 'Iterates over set elements. Order is arbitrary.', complexity: 'O(n)', example: `s = {3, 1, 4, 1, 5}
for elem in s:
    print(elem)  # Order not guaranteed` },
  { section: 'Iteration & Functions', signature: 'min(set)', description: 'Returns the smallest element.', complexity: 'O(n)', example: `s = {3, 1, 4, 1, 5}
print(min(s))  # 1` },
  { section: 'Iteration & Functions', signature: 'max(set)', description: 'Returns the largest element.', complexity: 'O(n)', example: `s = {3, 1, 4, 1, 5}
print(max(s))  # 5` },
  { section: 'Iteration & Functions', signature: 'sum(set)', description: 'Returns sum of numeric elements.', complexity: 'O(n)', example: `s = {1, 2, 3, 4}
print(sum(s))  # 10` },
  { section: 'Iteration & Functions', signature: 'sorted(set)', description: 'Returns a sorted list of set elements.', complexity: 'O(n log n)', example: `s = {3, 1, 4, 1, 5}
print(sorted(s))  # [1, 3, 4, 5]` },

  // Common Patterns
  { section: 'Common Patterns', signature: 'Remove duplicates', description: 'Convert to set and back to list to remove duplicates.', complexity: 'O(n)', example: `lst = [1, 2, 2, 3, 1, 4, 2]
unique = list(set(lst))  # Order not preserved!
print(unique)  # [1, 2, 3, 4] (order may vary)

# Preserve order (Python 3.7+)
unique = list(dict.fromkeys(lst))
print(unique)  # [1, 2, 3, 4] (order preserved)` },
  { section: 'Common Patterns', signature: 'Find common elements', description: 'Use intersection to find elements in multiple collections.', complexity: 'O(n)', example: `list1 = [1, 2, 3, 4]
list2 = [3, 4, 5, 6]
common = set(list1) & set(list2)
print(common)  # {3, 4}` },
  { section: 'Common Patterns', signature: 'Find differences', description: 'Use set operations to find what changed.', complexity: 'O(n)', example: `old_data = {1, 2, 3, 4}
new_data = {3, 4, 5, 6}

added = new_data - old_data
removed = old_data - new_data
unchanged = old_data & new_data

print(f"Added: {added}")      # {5, 6}
print(f"Removed: {removed}")  # {1, 2}
print(f"Unchanged: {unchanged}")  # {3, 4}` },
  { section: 'Common Patterns', signature: 'Check for any/all in set', description: 'Fast membership testing with sets.', complexity: 'O(1) per check', example: `allowed = {'admin', 'user', 'moderator'}
roles = ['guest', 'user']

# Check if any role is allowed
has_access = any(role in allowed for role in roles)
print(has_access)  # True

# Check if all roles are allowed
all_valid = all(role in allowed for role in roles)
print(all_valid)  # False ('guest' not allowed)` },
]
