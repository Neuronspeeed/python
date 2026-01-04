import type { Method } from '../../types'

export const comprehensionsMethods: Method[] = [
  // Fundamentals
  {
    section: 'Fundamentals',
    signature: 'Comprehension Syntax',
    description: 'Comprehensions provide concise syntax for creating collections. Four types: list [], dict {k:v}, set {}, generator (). All share the same structure.',
    complexity: 'Concept',
    example: `# List comprehension - builds entire list in memory
squares_list = [x**2 for x in range(5)]
print(squares_list)  # [0, 1, 4, 9, 16]

# Set comprehension - unique values only
squares_set = {x**2 for x in range(-3, 4)}
print(squares_set)  # {0, 1, 4, 9} (no duplicates)

# Dict comprehension - key:value pairs
squares_dict = {x: x**2 for x in range(5)}
print(squares_dict)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Generator expression - lazy evaluation (memory efficient)
squares_gen = (x**2 for x in range(5))
print(list(squares_gen))  # [0, 1, 4, 9, 16]

# All use same structure: [EXPR for VAR in ITERABLE if CONDITION]`,
  },

  // Why & When
  {
    section: 'Why & When',
    signature: 'When to use Comprehensions',
    description: 'Use comprehensions for simple transformations/filtering. Use regular loops for complex logic, multiple statements, or when readability suffers.',
    complexity: 'Concept',
    example: `# GOOD - simple transformation
squares = [x**2 for x in range(10)]

# GOOD - filter and transform
evens = [x for x in range(20) if x % 2 == 0]

# BAD - too complex (use regular loop instead!)
# result = [x.upper() if x.startswith('a') else x.lower()
#           if len(x) > 3 else x for x in words if x]

# BETTER - regular loop for complex logic
result = []
for x in words:
    if not x:
        continue
    if x.startswith('a'):
        result.append(x.upper())
    elif len(x) > 3:
        result.append(x.lower())
    else:
        result.append(x)

# RULE: If you can't read it easily, use a loop`,
  },
  {
    section: 'Why & When',
    signature: 'Comprehension vs Loop vs map/filter',
    description: 'Comprehensions: readable, Pythonic. Loops: flexible, debuggable. map/filter: functional style, less readable. Choose based on complexity.',
    complexity: 'Concept',
    example: `# LIST COMPREHENSION - most Pythonic
squares = [x**2 for x in range(10)]

# REGULAR LOOP - more lines but debuggable
squares = []
for x in range(10):
    squares.append(x**2)  # Can add breakpoint here

# MAP - functional style (less Pythonic in Python)
squares = list(map(lambda x: x**2, range(10)))

# Performance: comprehensions ≈ loops > map/filter
# Readability: comprehensions > loops > map/filter

# WHEN TO USE EACH:
# Comprehension: simple transform/filter (1-2 operations)
# Loop: complex logic, multiple statements, debugging
# map/filter: when already have function, functional codebase`,
  },
  {
    section: 'Why & When',
    signature: 'List vs Generator Expression',
    description: 'List []: builds all items immediately. Generator (): yields items lazily. Use generator for large data, one-time iteration, or infinite sequences.',
    complexity: 'Concept',
    example: `# LIST - all items in memory (fast iteration, high memory)
squares_list = [x**2 for x in range(1000000)]
print(sum(squares_list))  # Uses ~8MB memory!

# GENERATOR - one item at a time (slower iteration, low memory)
squares_gen = (x**2 for x in range(1000000))
print(sum(squares_gen))  # Uses ~100 bytes! (constant memory)

# When to use LIST []:
# - Need to iterate multiple times
# - Small dataset (< 10K items)
# - Need len(), indexing, slicing

# When to use GENERATOR ():
# - Large dataset (> 100K items)
# - Only iterate once
# - Pipeline of transformations
# - Infinite sequences

# WARNING: Generators exhaust after one iteration!
gen = (x for x in range(3))
print(list(gen))  # [0, 1, 2]
print(list(gen))  # [] (EMPTY - already consumed!)`,
  },

  // List Comprehension
  {
    section: 'List Comprehension',
    signature: '[expr for x in iterable]',
    description: 'Creates a list by applying expression to each item. Most common comprehension form.',
    complexity: 'O(n)',
    example: `squares = [x**2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

doubled = [x * 2 for x in [1, 2, 3]]
print(doubled)  # [2, 4, 6]

upper = [s.upper() for s in ['a', 'b', 'c']]
print(upper)  # ['A', 'B', 'C']

# Convert types
strings = [str(x) for x in [1, 2, 3]]
print(strings)  # ['1', '2', '3']`,
  },
  {
    section: 'List Comprehension',
    signature: '[expr for x in iterable if condition]',
    description: 'List comprehension with filter condition. Condition filters which items are processed.',
    complexity: 'O(n)',
    example: `evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]

# Only positive
positives = [x for x in [-2, -1, 0, 1, 2] if x > 0]
print(positives)  # [1, 2]

# Filter and transform
words = ['hello', '', 'world', '']
non_empty = [w.upper() for w in words if w]
print(non_empty)  # ['HELLO', 'WORLD']

# Multiple conditions
result = [x for x in range(20) if x % 2 == 0 if x % 3 == 0]
print(result)  # [0, 6, 12, 18] (divisible by 2 AND 3)`,
  },
  {
    section: 'List Comprehension',
    signature: '[expr if cond else other for x in iter]',
    description: 'Conditional expression (ternary) in comprehension. Transforms items based on condition.',
    complexity: 'O(n)',
    example: `# Replace negatives with 0
nums = [-2, -1, 0, 1, 2]
result = [x if x > 0 else 0 for x in nums]
print(result)  # [0, 0, 0, 1, 2]

# Label values
labels = ['even' if x % 2 == 0 else 'odd' for x in range(5)]
print(labels)  # ['even', 'odd', 'even', 'odd', 'even']

# Clamp values
clamped = [min(x, 100) for x in [50, 150, 200]]
print(clamped)  # [50, 100, 100]`,
  },
  {
    section: 'List Comprehension',
    signature: 'Nested comprehension',
    description: 'Multiple for clauses in a single comprehension. Flattens nested structures or creates combinations.',
    complexity: 'O(n*m)',
    example: `# Flatten nested list
nested = [[1, 2], [3, 4], [5]]
flat = [x for sublist in nested for x in sublist]
print(flat)  # [1, 2, 3, 4, 5]

# All combinations (cartesian product)
pairs = [(x, y) for x in [1, 2] for y in ['a', 'b']]
print(pairs)  # [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]

# Matrix creation
matrix = [[i*3+j for j in range(3)] for i in range(3)]
print(matrix)  # [[0,1,2], [3,4,5], [6,7,8]]

# WARNING: Readability limit!
# Too many nested fors = use regular loops instead`,
  },

  // Dict & Set Comprehension
  {
    section: 'Dict Comprehension',
    signature: '{k: v for ...}',
    description: 'Creates a dictionary from key-value expression. Keys must be hashable and unique.',
    complexity: 'O(n)',
    example: `squares = {x: x**2 for x in range(5)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# From two lists (zip)
keys = ['a', 'b', 'c']
values = [1, 2, 3]
d = {k: v for k, v in zip(keys, values)}
print(d)  # {'a': 1, 'b': 2, 'c': 3}

# With condition (filter)
d = {x: x**2 for x in range(10) if x % 2 == 0}
print(d)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

# From items
d = {k.upper(): v*2 for k, v in [('a', 1), ('b', 2)]}
print(d)  # {'A': 2, 'B': 4}`,
  },
  {
    section: 'Dict Comprehension',
    signature: 'Invert dict',
    description: 'Swap keys and values using comprehension. WARNING: Values must be unique and hashable.',
    complexity: 'O(n)',
    example: `original = {'a': 1, 'b': 2, 'c': 3}
inverted = {v: k for k, v in original.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}

# WARNING: Duplicate values = last one wins!
dup = {'a': 1, 'b': 1, 'c': 2}
inv = {v: k for k, v in dup.items()}
print(inv)  # {1: 'b', 2: 'c'} ('a' lost!)

# Group by value (use defaultdict instead)
from collections import defaultdict
grouped = defaultdict(list)
for k, v in dup.items():
    grouped[v].append(k)
print(dict(grouped))  # {1: ['a', 'b'], 2: ['c']}`,
  },
  {
    section: 'Set Comprehension',
    signature: '{expr for x in iterable}',
    description: 'Creates a set from expression. Duplicates automatically removed. Use for unique values.',
    complexity: 'O(n)',
    example: `squares = {x**2 for x in range(-3, 4)}
print(squares)  # {0, 1, 4, 9} (duplicates removed)

# Unique first letters
words = ['apple', 'banana', 'apricot', 'blueberry']
first_letters = {w[0] for w in words}
print(first_letters)  # {'a', 'b'}

# Remove duplicates from list
nums = [1, 2, 2, 3, 3, 3]
unique = {x for x in nums}
print(unique)  # {1, 2, 3}

# With filter
unique_evens = {x for x in range(20) if x % 2 == 0}
print(unique_evens)  # {0, 2, 4, ..., 18}`,
  },

  // Generator Expression
  {
    section: 'Generator Expression',
    signature: '(expr for x in iterable)',
    description: 'Creates a generator. Memory efficient - yields items one at a time. Use for large data or one-time iteration.',
    complexity: 'O(1) creation',
    example: `gen = (x**2 for x in range(5))
print(gen)       # <generator object ...>
print(list(gen)) # [0, 1, 4, 9, 16]

# Memory efficient for large data
sum_squares = sum(x**2 for x in range(1000000))
# Uses constant memory (not 1M-item list!)

# Can only iterate once! (exhausts)
gen = (x for x in [1, 2, 3])
print(list(gen))  # [1, 2, 3]
print(list(gen))  # [] (EMPTY - already consumed!)

# Pipeline of generators (memory efficient)
nums = range(1000000)
evens = (x for x in nums if x % 2 == 0)
squares = (x**2 for x in evens)
result = sum(squares)  # Only uses ~100 bytes!`,
  },

  // Advanced Patterns
  {
    section: 'Advanced Patterns',
    signature: 'Walrus in comprehension',
    description: 'Assignment expression := can capture intermediate values. Python 3.8+ only.',
    complexity: 'O(n)',
    example: `# Capture intermediate result
data = [1, 2, 3, 4, 5]
results = [y for x in data if (y := x**2) > 10]
print(results)  # [16, 25] (squares > 10)

# Avoid repeated calculation
import math
nums = [10, 20, 30, 40]
sqrt_vals = [s for n in nums if (s := math.sqrt(n)) > 4]
print(sqrt_vals)  # [4.47..., 5.47..., 6.32...]

# WARNING: Variable leaks into outer scope (3.8-3.11)
# In Python 3.12+ this is fixed`,
  },
  {
    section: 'Advanced Patterns',
    signature: 'Flatten nested structures',
    description: 'Use nested for loops to flatten multi-level nesting. Order: outer for first, inner for second.',
    complexity: 'O(n*m)',
    example: `# Flatten 2D list
matrix = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
flat = [item for row in matrix for item in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Flatten 3D list
cube = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
flat = [x for layer in cube for row in layer for x in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8]

# Alternative: itertools.chain.from_iterable
from itertools import chain
flat = list(chain.from_iterable(matrix))
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]`,
  },
  {
    section: 'Advanced Patterns',
    signature: 'Comprehension with enumerate',
    description: 'Combine comprehension with enumerate for index-aware transformations.',
    complexity: 'O(n)',
    example: `# Add index to values
words = ['apple', 'banana', 'cherry']
indexed = [f"{i}: {w}" for i, w in enumerate(words)]
print(indexed)  # ['0: apple', '1: banana', '2: cherry']

# Filter by index
evens_only = [w for i, w in enumerate(words) if i % 2 == 0]
print(evens_only)  # ['apple', 'cherry']

# Create dict with index as key
d = {i: w for i, w in enumerate(words)}
print(d)  # {0: 'apple', 1: 'banana', 2: 'cherry'}`,
  },
]
