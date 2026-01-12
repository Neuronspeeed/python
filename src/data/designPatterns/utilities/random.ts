import type { Method } from '../../../types'

export const randomMethods: Method[] = [
  { signature: 'Random Pick with Weight', description: 'Pick random index with probability proportional to weight. Use prefix sums + binary search.', complexity: 'O(log n) pick', section: 'Random', example: `import random
import bisect

class Solution:
    """
    Pick random index where probability is
    proportional to weight.
    """
    def __init__(self, w: list):
        # Build prefix sum
        self.prefix = []
        total = 0
        for weight in w:
            total += weight
            self.prefix.append(total)
        self.total = total

    def pickIndex(self) -> int:
        # Random value in [1, total]
        target = random.randint(1, self.total)
        # Binary search for first prefix >= target
        return bisect.bisect_left(self.prefix, target)

# Example:
# w = [1, 3]
# prefix = [1, 4]
# total = 4
# Random 1: index 0 (1/4 probability)
# Random 2,3,4: index 1 (3/4 probability)

# Shuffle Array (Fisher-Yates)
class ShuffleArray:
    def __init__(self, nums: list):
        self.original = nums[:]
        self.array = nums

    def reset(self) -> list:
        self.array = self.original[:]
        return self.array

    def shuffle(self) -> list:
        for i in range(len(self.array) - 1, 0, -1):
            j = random.randint(0, i)
            self.array[i], self.array[j] = self.array[j], self.array[i]
        return self.array` },
]
