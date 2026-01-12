import type { Method } from '../../../types'

export const itertoolsAccumulationMethods: Method[] = [
  { signature: 'accumulate()', description: 'Running totals or cumulative results. Like reduce but yields intermediate values.', complexity: 'O(n)', section: 'Accumulation', example: `from itertools import accumulate
import operator

# Running sum (prefix sum)
nums = [1, 2, 3, 4, 5]
prefix_sum = list(accumulate(nums))
# [1, 3, 6, 10, 15]

# Running product
prefix_product = list(accumulate(nums, operator.mul))
# [1, 2, 6, 24, 120]

# Running maximum
data = [3, 1, 4, 1, 5, 9, 2, 6]
running_max = list(accumulate(data, max))
# [3, 3, 4, 4, 5, 9, 9, 9]

# Running minimum
running_min = list(accumulate(data, min))
# [3, 1, 1, 1, 1, 1, 1, 1]

# Custom function
def concat(a, b):
    return a + [b]
nested = list(accumulate([1, 2, 3], concat, initial=[]))
# [[], [1], [1, 2], [1, 2, 3]]

# INTERVIEW: Range sum queries with prefix sum
class RangeSumQuery:
    def __init__(self, nums):
        self.prefix = [0] + list(accumulate(nums))

    def sum_range(self, left, right):
        return self.prefix[right + 1] - self.prefix[left]

# Example: [1, 2, 3, 4]
# prefix: [0, 1, 3, 6, 10]
# sum(1, 3) = prefix[4] - prefix[1] = 10 - 1 = 9` },
]
