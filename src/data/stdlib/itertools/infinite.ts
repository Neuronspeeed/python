import type { Method } from '../../../types'

export const itertoolsInfiniteMethods: Method[] = [
  { signature: 'cycle() / repeat()', description: 'Infinite iterators. cycle() loops forever, repeat() yields same value.', complexity: 'O(1) per item', section: 'Infinite', example: `from itertools import cycle, repeat, islice

# Cycle infinitely through iterable
colors = cycle(['red', 'green', 'blue'])
print([next(colors) for _ in range(7)])
# ['red', 'green', 'blue', 'red', 'green', 'blue', 'red']

# Practical: Round-robin assignment
tasks = ['A', 'B', 'C', 'D', 'E']
workers = cycle(['Alice', 'Bob', 'Charlie'])
assignments = list(zip(tasks, workers))
# [('A', 'Alice'), ('B', 'Bob'), ('C', 'Charlie'),
#  ('D', 'Alice'), ('E', 'Bob')]

# Repeat value (optionally n times)
threes = list(repeat(3, 5))
# [3, 3, 3, 3, 3]

# Repeat forever (use islice to limit)
infinite_zeros = repeat(0)
first_10 = list(islice(infinite_zeros, 10))
# [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

# Practical: Initialize with repeat
from itertools import repeat
import operator
# Square each number
nums = [1, 2, 3, 4, 5]
squares = list(map(pow, nums, repeat(2)))
# [1, 4, 9, 16, 25]

# count() - infinite counter
from itertools import count
counter = count(start=10, step=2)
print([next(counter) for _ in range(5)])
# [10, 12, 14, 16, 18]` },

  { signature: 'starmap() / zip_longest()', description: 'Apply function to unpacked tuples. Zip with fill value for unequal lengths.', complexity: 'O(n)', section: 'Infinite', example: `from itertools import starmap, zip_longest

# starmap: apply function to unpacked arguments
pairs = [(2, 5), (3, 2), (10, 3)]
results = list(starmap(pow, pairs))
# [32, 9, 1000]  # pow(2,5), pow(3,2), pow(10,3)

# Compare to map with multiple iterables
bases = [2, 3, 10]
exps = [5, 2, 3]
results = list(map(pow, bases, exps))
# Same: [32, 9, 1000]

# Practical: apply function to pre-paired arguments
def point_distance(x1, y1, x2, y2):
    return ((x2-x1)**2 + (y2-y1)**2) ** 0.5

segments = [(0, 0, 3, 4), (1, 1, 4, 5)]
distances = list(starmap(point_distance, segments))
# [5.0, 5.0]

# zip_longest: zip with fill value
a = [1, 2, 3]
b = [4, 5]
zipped = list(zip_longest(a, b, fillvalue=0))
# [(1, 4), (2, 5), (3, 0)]

# Practical: merge columns with different lengths
col1 = ['A', 'B', 'C']
col2 = [1, 2]
col3 = ['x', 'y', 'z', 'w']
merged = list(zip_longest(col1, col2, col3, fillvalue='-'))
# [('A', 1, 'x'), ('B', 2, 'y'), ('C', '-', 'z'), ('-', '-', 'w')]` },
]
