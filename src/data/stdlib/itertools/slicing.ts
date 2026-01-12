import type { Method } from '../../../types'

export const itertoolsSlicingMethods: Method[] = [
  { signature: 'islice()', description: 'Slice iterator without creating list. Memory efficient for large iterables.', complexity: 'O(stop)', section: 'Slicing', example: `from itertools import islice

# Slice an iterator
nums = range(1000000)  # Very large

# Get first 5 elements
first_5 = list(islice(nums, 5))
# [0, 1, 2, 3, 4]

# Get elements from index 10 to 20
middle = list(islice(nums, 10, 20))
# [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

# Every 3rd element from first 30
every_3rd = list(islice(nums, 0, 30, 3))
# [0, 3, 6, 9, 12, 15, 18, 21, 24, 27]

# Skip first n elements
from itertools import islice
def skip(iterable, n):
    return islice(iterable, n, None)

skipped = list(skip(range(10), 3))
# [3, 4, 5, 6, 7, 8, 9]

# PRACTICAL: Read first n lines of huge file
def head(filename, n=10):
    with open(filename) as f:
        return list(islice(f, n))

# Get nth element of iterator
def nth(iterable, n, default=None):
    return next(islice(iterable, n, None), default)

print(nth(range(100), 42))  # 42` },

  { signature: 'takewhile() / dropwhile()', description: 'Take/drop elements while predicate is True. Stops at first False.', complexity: 'O(n)', section: 'Slicing', example: `from itertools import takewhile, dropwhile

# Take while condition is True
nums = [1, 3, 5, 7, 4, 2, 6, 8]

small = list(takewhile(lambda x: x < 6, nums))
# [1, 3, 5]  # Stops at 7 (first >= 6)

# Drop while condition is True (then take rest)
large = list(dropwhile(lambda x: x < 6, nums))
# [7, 4, 2, 6, 8]  # Starts at 7, takes everything after

# IMPORTANT: Only checks prefix, not whole list!
# takewhile stops at FIRST failure
# dropwhile starts at FIRST failure

# Practical: Skip header lines
lines = ["# Comment", "# Another", "data1", "data2"]
data = list(dropwhile(lambda x: x.startswith("#"), lines))
# ["data1", "data2"]

# Practical: Take valid entries
entries = [5, 10, 15, -1, 20, 25]  # -1 is sentinel
valid = list(takewhile(lambda x: x >= 0, entries))
# [5, 10, 15]` },
]
