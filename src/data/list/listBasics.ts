import type { Method } from '../../types'

// Why & When, Creation, Adding, Removing, Searching
export const listBasicsMethods: Method[] = [
  // Fundamentals
  { signature: 'List Basics', description: 'Lists are MUTABLE ordered sequences. Create with brackets []. Can modify elements. Use for dynamic collections that need to change.', complexity: 'Concept', example: `# Create lists with square brackets []
colors = ["red", "yellow", "green", "blue"]
print(type(colors))  # <class 'list'>

# Mixed types allowed (but typically use same type)
mixed = ["one", 2, 3.0]  # Valid but not typical

# From other sequences
list((1, 2, 3))      # [1, 2, 3] from tuple
list("Python")       # ['P', 'y', 't', 'h', 'o', 'n']

# From string with split()
groceries = "eggs, milk, cheese"
grocery_list = groceries.split(", ")  # ['eggs', 'milk', 'cheese']

# Empty list
empty = []` },
  { signature: 'List Mutability', description: 'Lists CAN be changed! Modify elements, add new ones, remove existing. This is the KEY difference from tuples.', complexity: 'Concept', example: `# Lists are MUTABLE - can change after creation!
colors = ["red", "yellow", "green", "blue"]

# Change single element
colors[0] = "burgundy"
print(colors)  # ['burgundy', 'yellow', 'green', 'blue']

# Change multiple with slice assignment
colors[1:3] = ["orange", "magenta"]
print(colors)  # ['burgundy', 'orange', 'magenta', 'blue']

# Slice assignment can change length!
colors[1:3] = ["yellow"]  # Shrinks list
print(colors)  # ['burgundy', 'yellow', 'blue']

# In-place modification methods
colors.append("green")   # Modifies list
colors.insert(1, "pink") # Modifies list
colors.pop()             # Modifies list` },
  // Why & When to Use Lists
  { signature: 'Why use List?', description: 'Lists are Python\'s go-to ordered collection. Mutable, dynamic sizing, mixed types allowed. Best for sequences where order matters and you need to modify elements.', complexity: 'Concept', example: `# Lists are MUTABLE ordered sequences
# Use when you need:
# - Ordered data
# - Ability to modify (add/remove/change)
# - Dynamic sizing (grows as needed)
# - Index-based access

shopping = ["milk", "eggs", "bread"]
shopping.append("butter")  # Can modify
shopping[0] = "almond milk"  # Can update

# Lists allow mixed types (but avoid when possible)
mixed = [1, "hello", 3.14, [4, 5]]

# Lists preserve insertion order
# Lists allow duplicates` },
  { signature: 'List vs other collections', description: 'List vs Tuple: mutable vs immutable. List vs Set: ordered+duplicates vs unordered+unique. List vs Dict: index access vs key access.', complexity: 'Concept', example: `# LIST vs TUPLE
# - List: mutable, use for data that changes
# - Tuple: immutable, use for fixed data, dict keys
lst = [1, 2, 3]  # Can modify
tpl = (1, 2, 3)  # Cannot modify, hashable

# LIST vs SET
# - List: ordered, allows duplicates, O(n) lookup
# - Set: unordered, unique only, O(1) lookup
lst = [1, 2, 2, 3]  # [1, 2, 2, 3]
st = {1, 2, 2, 3}   # {1, 2, 3}

# LIST vs DICT
# - List: access by index (0, 1, 2...)
# - Dict: access by key (any hashable)
lst[0]        # First item
dct["name"]   # Named access

# RULE: Need lookup speed? Use set/dict
# RULE: Need order + duplicates? Use list` },
  { signature: 'Performance characteristics', description: 'Know these for efficient code: O(1) append/pop end, O(n) insert/remove elsewhere, O(n) search, O(1) index access.', complexity: 'O(varies)', example: `# FAST - O(1)
lst.append(x)     # Add to end
lst.pop()         # Remove from end
lst[i]            # Access by index
len(lst)          # Get length

# SLOW - O(n)
lst.insert(0, x)  # Insert at beginning
lst.pop(0)        # Remove from beginning
lst.remove(x)     # Remove by value
x in lst          # Search (use set for O(1))
lst.index(x)      # Find index

# Need fast operations on both ends?
from collections import deque
dq = deque([1, 2, 3])
dq.appendleft(0)  # O(1)
dq.popleft()      # O(1)` },

  // Creation
  { signature: 'list()', description: 'Creates an empty list or converts an iterable to a list.', complexity: 'O(n)', example: `print(list())           # []
print(list("hello"))    # ['h', 'e', 'l', 'l', 'o']
print(list(range(5)))   # [0, 1, 2, 3, 4]
print(list((1, 2, 3)))  # [1, 2, 3]` },
  { signature: '[x, y, z]', description: 'List literal syntax. Creates a list with the given elements.', complexity: 'O(n)', example: `nums = [1, 2, 3]
mixed = [1, "hello", 3.14, [4, 5]]
empty = []` },
  { signature: '[expr for x in iterable]', description: 'List comprehension. Creates a list by applying expression to each item. Preferred for simple transforms.', complexity: 'O(n)', example: `squares = [x**2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]

# Nested comprehension (flatten)
matrix = [[1, 2], [3, 4]]
flat = [x for row in matrix for x in row]
print(flat)  # [1, 2, 3, 4]` },

  // Adding Elements
  { signature: 'list.append(x)', description: 'Adds x to the end of the list. O(1) amortized. Returns None. Most common way to grow a list.', complexity: 'O(1)', example: `lst = [1, 2, 3]
lst.append(4)
print(lst)  # [1, 2, 3, 4]

# append adds single element
lst.append([5, 6])  # Appends as single element
print(lst)  # [1, 2, 3, 4, [5, 6]]

# Building list in loop - O(n) total
result = []
for i in range(5):
    result.append(i)  # O(1) each` },
  { signature: 'list.extend(iterable)', description: 'Extends list by appending all elements from the iterable. Faster than multiple appends.', complexity: 'O(k)', example: `lst = [1, 2, 3]
lst.extend([4, 5])
print(lst)  # [1, 2, 3, 4, 5]

lst.extend("ab")  # Strings are iterable
print(lst)  # [1, 2, 3, 4, 5, 'a', 'b']

# extend vs append
lst1 = [1, 2]
lst1.append([3, 4])   # [[3, 4]] as element
lst2 = [1, 2]
lst2.extend([3, 4])   # 3, 4 as separate elements` },
  { signature: 'list.insert(i, x)', description: 'Inserts x at index i. O(n) because all elements after i shift. Avoid in loops if possible.', complexity: 'O(n)', example: `lst = [1, 2, 3]
lst.insert(0, 0)    # Insert at beginning - SLOW O(n)
print(lst)  # [0, 1, 2, 3]

lst.insert(2, 1.5)  # Insert at index 2
print(lst)  # [0, 1, 1.5, 2, 3]

# For frequent inserts at beginning, use deque:
from collections import deque
dq = deque([1, 2, 3])
dq.appendleft(0)  # O(1)!` },

  // Removing Elements
  { signature: 'list.remove(x)', description: 'Removes the first occurrence of x. Raises ValueError if not found. O(n) search + shift.', complexity: 'O(n)', example: `lst = [1, 2, 3, 2, 1]
lst.remove(2)
print(lst)  # [1, 3, 2, 1] (first 2 removed)

# Check before removing to avoid ValueError
if 99 in lst:
    lst.remove(99)

# Or use try/except
try:
    lst.remove(99)
except ValueError:
    pass  # Not found, ignore` },
  { signature: 'list.pop([i])', description: 'Removes and RETURNS item at index i (default: last). pop() is O(1), pop(0) is O(n).', complexity: 'O(1) last, O(n) other', example: `lst = [1, 2, 3, 4]
print(lst.pop())     # 4 (returns removed item)
print(lst)           # [1, 2, 3]

print(lst.pop(0))    # 1 - SLOW O(n)
print(lst)           # [2, 3]

# Use pop() for stack (LIFO)
stack = []
stack.append(1)
stack.append(2)
stack.pop()  # 2 - last in, first out` },
  { signature: 'list.clear()', description: 'Removes all items from the list. Equivalent to del lst[:].', complexity: 'O(n)', example: `lst = [1, 2, 3]
lst.clear()
print(lst)  # []

# Alternatives
lst = [1, 2, 3]
lst[:] = []  # Also clears
# lst = []  # Creates NEW list (doesn't clear original)` },
  { signature: 'del list[i]', description: 'Deletes item at index i or slice. Statement, not method. No return value.', complexity: 'O(n)', example: `lst = [0, 1, 2, 3, 4]
del lst[0]      # Delete first - O(n)
print(lst)  # [1, 2, 3, 4]

del lst[1:3]    # Delete slice
print(lst)  # [1, 4]

del lst[:]      # Clear all
print(lst)  # []` },

  // Searching
  { signature: 'list.index(x[, start[, end]])', description: 'Returns index of first occurrence of x. Raises ValueError if not found. O(n) search.', complexity: 'O(n)', example: `lst = ['a', 'b', 'c', 'b', 'd']
print(lst.index('b'))      # 1
print(lst.index('b', 2))   # 3 (search from index 2)

# Check existence first to avoid ValueError
if 'z' in lst:
    idx = lst.index('z')
else:
    idx = -1  # Not found` },
  { signature: 'list.count(x)', description: 'Returns the number of times x appears in the list.', complexity: 'O(n)', example: `lst = [1, 2, 2, 3, 2, 4]
print(lst.count(2))  # 3
print(lst.count(5))  # 0

# For frequent counts, use Counter
from collections import Counter
counts = Counter(lst)
print(counts[2])  # 3 - O(1) after initial O(n)` },
  { signature: 'x in list', description: 'Returns True if x is in the list. O(n) - for O(1) lookup, use a set.', complexity: 'O(n)', example: `lst = [1, 2, 3]
print(2 in lst)      # True
print(5 in lst)      # False
print(5 not in lst)  # True

# For many lookups, convert to set first
lookup = set(lst)    # O(n) once
5 in lookup          # O(1) each lookup` },
]
