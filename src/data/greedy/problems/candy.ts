import type { Method } from '../../../types'

export const candyMethods: Method[] = [
  { signature: 'Candy Distribution', description: 'Give candies so higher-rated child gets more than neighbors. Two-pass greedy.', complexity: 'O(n)', section: 'Candy', example: `def candy(ratings):
    """
    Each child must have at least 1 candy.
    Child with higher rating gets more than neighbors.
    Return minimum total candies.
    """
    n = len(ratings)
    candies = [1] * n

    # Left to right: handle increasing ratings
    for i in range(1, n):
        if ratings[i] > ratings[i-1]:
            candies[i] = candies[i-1] + 1

    # Right to left: handle decreasing ratings
    for i in range(n-2, -1, -1):
        if ratings[i] > ratings[i+1]:
            candies[i] = max(candies[i], candies[i+1] + 1)

    return sum(candies)

# Example: ratings = [1, 0, 2]
# Left pass:  [1, 1, 2]  (only index 2 > index 1)
# Right pass: [2, 1, 2]  (index 0 > index 1)
# Total: 5

# Example: ratings = [1, 2, 2]
# Left pass:  [1, 2, 1]  (index 1 > index 0, index 2 == index 1)
# Right pass: [1, 2, 1]  (no changes)
# Total: 4` },
]
