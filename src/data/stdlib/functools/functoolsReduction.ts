import type { Method } from '../../../types'

export const functoolsReductionMethods: Method[] = [
  { signature: 'reduce()', description: 'Apply function cumulatively to sequence. Reduce list to single value.', complexity: 'O(n)', section: 'Reduction', example: `from functools import reduce

# Basic: reduce list to single value
nums = [1, 2, 3, 4, 5]

# Sum (but use sum() instead!)
total = reduce(lambda acc, x: acc + x, nums)
# 15

# Product
product = reduce(lambda acc, x: acc * x, nums)
# 120

# With initial value
product_with_init = reduce(lambda acc, x: acc * x, nums, 10)
# 10 * 1 * 2 * 3 * 4 * 5 = 1200

# Find max (but use max() instead!)
maximum = reduce(lambda a, b: a if a > b else b, nums)

# Practical uses
# 1. Flatten nested list
nested = [[1, 2], [3, 4], [5]]
flat = reduce(lambda acc, lst: acc + lst, nested, [])
# [1, 2, 3, 4, 5]

# 2. Build dict from pairs
pairs = [('a', 1), ('b', 2), ('c', 3)]
d = reduce(lambda acc, p: {**acc, p[0]: p[1]}, pairs, {})
# {'a': 1, 'b': 2, 'c': 3}

# 3. GCD of list
from math import gcd
numbers = [12, 18, 24]
result = reduce(gcd, numbers)  # 6` },
]
