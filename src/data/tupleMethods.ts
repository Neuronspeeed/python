import type { Method } from '../types'

export const tupleMethods: Method[] = [
  // Fundamentals
  { section: 'Fundamentals', signature: 'Tuple Basics', description: 'Tuples are IMMUTABLE ordered sequences. Create with parentheses (). Can contain any types. Remember: tuples CANNOT be modified after creation.', complexity: 'Concept', example: `# Create tuples with parentheses
my_tuple = (1, 2, 3)
mixed = (1, 2.0, "three")  # Different types OK
print(type(my_tuple))      # <class 'tuple'>

# Empty tuple
empty = ()

# Single element tuple - MUST have comma!
single = (1,)     # tuple - correct!
not_tuple = (1)   # int - just parentheses, no tuple!

# Tuple from other sequences
tuple("abc")      # ('a', 'b', 'c')
tuple([1, 2, 3])  # (1, 2, 3)` },
  { section: 'Fundamentals', signature: 'Tuple Packing & Unpacking', description: 'Pack: create tuple without parentheses. Unpack: extract values into variables. Number of variables must match tuple length.', complexity: 'O(1)', example: `# PACKING - create tuple without ()
coordinates = 4.21, 9.29     # Packs into tuple
print(type(coordinates))     # <class 'tuple'>

# UNPACKING - extract values
x, y = coordinates
print(x)  # 4.21
print(y)  # 9.29

# Multiple assignment in one line
name, age, job = "David", 34, "programmer"

# Must match length!
# a, b = 1, 2, 3  # ValueError: too many values
# a, b, c = 1, 2  # ValueError: not enough values

# Unpacking function returns
def get_user():
    return "Alice", 30, "admin"

name, age, role = get_user()` },
  { section: 'Fundamentals', signature: 'Tuple Immutability', description: 'Tuples CANNOT be changed after creation. No item assignment, no append, no remove. Must create new tuple to "change" values.', complexity: 'Concept', example: `# Cannot modify tuples!
values = (1, 2, 3)
# values[0] = 99      # TypeError: tuple doesn't support item assignment
# values.append(4)    # AttributeError: no append method

# To "change", create NEW tuple
values = (99, 2, 3)  # Reassign to new tuple - OK

# Slicing creates new tuple
new_values = values[1:]  # (2, 3) - new tuple

# Concatenation creates new tuple
combined = values + (4, 5)  # (99, 2, 3, 4, 5)` },
  // Why & When
  { section: 'Why & When', signature: 'Why use Tuple?', description: 'Tuples are immutable sequences. Use for fixed data, dict keys, function returns, and when you want to guarantee data won\'t change.', complexity: 'Concept', example: `# Tuple = IMMUTABLE sequence
# Use when: data shouldn't change, dict keys, returning multiple values

# 1. DICT KEYS (lists can't be keys!)
locations = {
    (40.7, -74.0): "New York",  # tuple key - OK
    (51.5, -0.1): "London",
}
# {[40.7, -74.0]: "NYC"}  # ERROR: list not hashable

# 2. MULTIPLE RETURN VALUES
def get_user():
    return "Alice", 30, "admin"  # Returns tuple

name, age, role = get_user()  # Unpacking

# 3. FIXED/CONSTANT DATA
RGB_RED = (255, 0, 0)     # Color constant
ORIGIN = (0, 0)           # Point constant
CONFIG = ('localhost', 8080)  # Shouldn't change

# 4. MEMORY EFFICIENCY (sizes vary by platform)
import sys
sys.getsizeof([1,2,3])   # ~88-120 bytes (list)
sys.getsizeof((1,2,3))   # ~64-72 bytes (tuple)` },
  { section: 'Why & When', signature: 'Tuple vs List', description: 'Tuple: immutable, hashable, less memory. List: mutable, more methods. Use tuple for heterogeneous fixed data, list for homogeneous collections.', complexity: 'Concept', example: `# TUPLE vs LIST
# Tuple: immutable, hashable, lightweight
# List: mutable, more methods, dynamic

# IMMUTABILITY
t = (1, 2, 3)
# t[0] = 99  # ERROR: can't modify!
# t.append(4)  # ERROR: no append!

lst = [1, 2, 3]
lst[0] = 99  # OK
lst.append(4)  # OK

# HASHABLE (can use as dict key/set element)
valid_key = {(1, 2): "value"}  # tuple - OK
# invalid = {[1, 2]: "value"}  # list - ERROR

# CONVENTION:
# Tuple = heterogeneous data (different types)
person = ("Alice", 30, True)  # name, age, active

# List = homogeneous data (same type)
names = ["Alice", "Bob", "Charlie"]
scores = [95, 87, 92]

# GOTCHA: tuple with ONE element needs comma!
single = (1,)   # This is a tuple
not_tuple = (1) # This is just int 1!` },
  { section: 'Why & When', signature: 'Performance tips', description: 'Tuples are faster to create and use less memory than lists. Use namedtuple for self-documenting tuples.', complexity: 'O(varies)', example: `# PERFORMANCE: tuple vs list
import sys

# Memory (tuple wins) - sizes are approximate and platform-dependent
sys.getsizeof((1,2,3,4,5))  # ~64-80 bytes
sys.getsizeof([1,2,3,4,5])  # ~96-120 bytes

# Creation time (tuple wins)
# tuple() is ~2x faster than list()

# BUT tuples have only 2 methods:
t = (1, 2, 2, 3)
t.count(2)   # 2
t.index(2)   # 1
# That's it! No append, remove, sort, etc.

# NAMEDTUPLE for readable tuples
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)  # 3 4  (better than p[0], p[1])

# UNPACKING is powerful
x, y, z = (1, 2, 3)
first, *rest = (1, 2, 3, 4, 5)  # first=1, rest=[2,3,4,5]
a, _, b = (1, 2, 3)  # ignore middle value` },

  // Creation
  { section: 'Creation', signature: 'tuple()', description: 'Creates an empty tuple or converts an iterable to a tuple.', complexity: 'O(n)', example: `print(tuple())           # ()
print(tuple([1, 2, 3]))  # (1, 2, 3)
print(tuple("hello"))    # ('h', 'e', 'l', 'l', 'o')
print(tuple(range(5)))   # (0, 1, 2, 3, 4)` },
  { section: 'Creation', signature: '(x, y, z)', description: 'Tuple literal with parentheses. Parentheses optional except for empty tuple.', complexity: 'O(n)', example: `t = (1, 2, 3)
t = 1, 2, 3      # Parentheses optional
t = (1,)         # Single element needs comma!
t = 1,           # Also valid single element
t = ()           # Empty tuple needs parentheses` },
  { section: 'Creation', signature: 'x,', description: 'Single element tuple. The comma makes it a tuple, not parentheses.', complexity: 'O(1)', example: `single = (1,)    # Tuple with one element
print(type(single))  # <class 'tuple'>

not_tuple = (1)  # This is just an int!
print(type(not_tuple))  # <class 'int'>` },

  // Methods (only 2!)
  { section: 'Methods', signature: 'tuple.count(x)', description: 'Returns the number of times x appears in the tuple.', complexity: 'O(n)', example: `t = (1, 2, 2, 3, 2, 4)
print(t.count(2))  # 3
print(t.count(5))  # 0` },
  { section: 'Methods', signature: 'tuple.index(x[, start[, end]])', description: 'Returns index of first occurrence of x. Raises ValueError if not found.', complexity: 'O(n)', example: `t = ('a', 'b', 'c', 'b', 'd')
print(t.index('b'))      # 1
print(t.index('b', 2))   # 3 (search from index 2)
# t.index('z')  # ValueError` },

  // Immutability
  { section: 'Immutability', signature: 'Immutability', description: 'Tuples cannot be modified after creation. No append, remove, or item assignment.', complexity: 'O(1)', example: `t = (1, 2, 3)
# t[0] = 99     # TypeError: 'tuple' object does not support item assignment
# t.append(4)   # AttributeError: 'tuple' object has no attribute 'append'

# But mutable objects inside can change!
t = ([1, 2], [3, 4])
t[0].append(99)
print(t)  # ([1, 2, 99], [3, 4])` },

  // Membership & Indexing
  { section: 'Membership & Indexing', signature: 'x in tuple', description: 'Returns True if x is in the tuple.', complexity: 'O(n)', example: `t = (1, 2, 3)
print(2 in t)      # True
print(5 in t)      # False
print(5 not in t)  # True` },
  { section: 'Membership & Indexing', signature: 'tuple[i]', description: 'Access element at index i. Negative indices count from end.', complexity: 'O(1)', example: `t = ('a', 'b', 'c', 'd')
print(t[0])   # 'a'
print(t[-1])  # 'd'
print(t[-2])  # 'c'` },

  // Slicing
  { section: 'Slicing', signature: 'tuple[start:stop:step]', description: 'Returns a new tuple from start to stop-1 with step.', complexity: 'O(k)', example: `t = (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
print(t[2:5])     # (2, 3, 4)
print(t[:3])      # (0, 1, 2)
print(t[7:])      # (7, 8, 9)
print(t[::2])     # (0, 2, 4, 6, 8)
print(t[::-1])    # (9, 8, 7, 6, 5, 4, 3, 2, 1, 0)` },

  // Unpacking
  { section: 'Unpacking', signature: 'a, b, c = tuple', description: 'Tuple unpacking. Assigns elements to variables.', complexity: 'O(n)', example: `t = (1, 2, 3)
a, b, c = t
print(a, b, c)  # 1 2 3

# Swap values
x, y = 1, 2
x, y = y, x
print(x, y)  # 2 1` },
  { section: 'Unpacking', signature: '*rest unpacking', description: 'Extended unpacking. Captures remaining elements in a list.', complexity: 'O(n)', example: `t = (1, 2, 3, 4, 5)
first, *rest = t
print(first, rest)  # 1 [2, 3, 4, 5]

*rest, last = t
print(rest, last)   # [1, 2, 3, 4] 5

first, *middle, last = t
print(first, middle, last)  # 1 [2, 3, 4] 5` },
  { section: 'Unpacking', signature: '_ placeholder', description: 'Use underscore to ignore values during unpacking.', complexity: 'O(1)', example: `t = (1, 2, 3)
a, _, c = t
print(a, c)  # 1 3

# Ignore multiple
first, *_, last = (1, 2, 3, 4, 5)
print(first, last)  # 1 5` },

  // Operators
  { section: 'Operators', signature: 'tuple1 + tuple2', description: 'Concatenation. Returns a new tuple.', complexity: 'O(n+m)', example: `t1 = (1, 2)
t2 = (3, 4)
print(t1 + t2)  # (1, 2, 3, 4)` },
  { section: 'Operators', signature: 'tuple * n', description: 'Repetition. Returns a new tuple with elements repeated.', complexity: 'O(n*k)', example: `t = (1, 2)
print(t * 3)  # (1, 2, 1, 2, 1, 2)
print((0,) * 5)  # (0, 0, 0, 0, 0)` },

  // Built-in Functions
  { section: 'Built-in Functions', signature: 'len(tuple)', description: 'Returns the number of elements.', complexity: 'O(1)', example: `print(len((1, 2, 3)))  # 3
print(len(()))         # 0` },
  { section: 'Built-in Functions', signature: 'min(tuple)', description: 'Returns the smallest element.', complexity: 'O(n)', example: `print(min((3, 1, 4)))  # 1` },
  { section: 'Built-in Functions', signature: 'max(tuple)', description: 'Returns the largest element.', complexity: 'O(n)', example: `print(max((3, 1, 4)))  # 4` },
  { section: 'Built-in Functions', signature: 'sum(tuple)', description: 'Returns sum of numeric elements.', complexity: 'O(n)', example: `print(sum((1, 2, 3)))  # 6` },
  { section: 'Built-in Functions', signature: 'sorted(tuple)', description: 'Returns a sorted list (not tuple).', complexity: 'O(n log n)', example: `t = (3, 1, 4, 1, 5)
print(sorted(t))       # [1, 1, 3, 4, 5] (list!)
print(tuple(sorted(t))) # (1, 1, 3, 4, 5)` },

  // Named Tuples
  { section: 'Named Tuples', signature: 'namedtuple(name, fields)', description: 'Creates a tuple subclass with named fields. More readable than indices.', complexity: 'O(1)', example: `from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)  # 3 4
print(p[0])      # 3 (still indexable)
print(p)         # Point(x=3, y=4)` },
  { section: 'Named Tuples', signature: 'namedtuple._make(iterable)', description: 'Creates a namedtuple from an iterable.', complexity: 'O(n)', example: `from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])

data = [3, 4]
p = Point._make(data)
print(p)  # Point(x=3, y=4)` },
  { section: 'Named Tuples', signature: 'namedtuple._asdict()', description: 'Returns an OrderedDict representation.', complexity: 'O(n)', example: `from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p._asdict())  # {'x': 3, 'y': 4}` },
  { section: 'Named Tuples', signature: 'namedtuple._replace(**kwargs)', description: 'Returns a new namedtuple with specified fields replaced.', complexity: 'O(n)', example: `from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
p2 = p._replace(x=10)
print(p2)  # Point(x=10, y=4)
print(p)   # Point(x=3, y=4) (unchanged)` },

  // When to Use
  { section: 'When to Use', signature: 'When to use tuple', description: 'Use tuples for heterogeneous data, dict keys, and when immutability is needed.', complexity: 'O(1)', example: `# Tuple as dict key (list cannot be key)
locations = {
    (40.7128, -74.0060): "New York",
    (51.5074, -0.1278): "London",
}

# Return multiple values
def get_dimensions():
    return 1920, 1080  # Returns tuple

width, height = get_dimensions()

# Heterogeneous data
person = ("Alice", 30, "Engineer")  # name, age, job` },

  // Comparison & Hash
  { section: 'Comparison & Hash', signature: 'tuple1 == tuple2', description: 'Equality comparison. Compares element by element.', complexity: 'O(n)', example: `print((1, 2, 3) == (1, 2, 3))  # True
print((1, 2) == (1, 2, 3))     # False` },
  { section: 'Comparison & Hash', signature: 'tuple1 < tuple2', description: 'Lexicographic comparison. Compares element by element.', complexity: 'O(n)', example: `print((1, 2) < (1, 3))     # True
print((1, 2) < (2, 0))     # True (first element decides)
print((1, 2, 3) < (1, 2))  # False (longer is greater)` },
  { section: 'Comparison & Hash', signature: 'hash(tuple)', description: 'Returns hash value. Works only if all elements are hashable.', complexity: 'O(n)', example: `t = (1, 2, 3)
print(hash(t))  # Some integer

# Can use as dict key or set element
d = {(1, 2): "value"}
s = {(1, 2), (3, 4)}

# Tuple with mutable element cannot be hashed
# hash(([1, 2],))  # TypeError: unhashable type: 'list'` },
]
