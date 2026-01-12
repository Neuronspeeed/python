import type { Method } from '../../../types'

export const boatsMethods: Method[] = [
  { signature: 'Boats to Save People', description: 'Pair heaviest with lightest if possible. Two pointers after sorting.', complexity: 'O(n log n)', section: 'Boats', example: `def num_rescue_boats(people, limit):
    """
    Each boat holds at most 2 people and weight <= limit.
    Return minimum number of boats.
    """
    people.sort()
    boats = 0
    left, right = 0, len(people) - 1

    while left <= right:
        # Try to pair heaviest (right) with lightest (left)
        if people[left] + people[right] <= limit:
            left += 1  # Lightest person fits
        right -= 1  # Heaviest person always goes
        boats += 1

    return boats

# Example: people = [3, 2, 2, 1], limit = 3
# Sorted: [1, 2, 2, 3]
# Boat 1: 1 + ?, try 3: 1+3=4 > 3, so just 3
# Boat 2: 1 + ?, try 2: 1+2=3 <= 3, pair them
# Boat 3: 2 alone
# Total: 3 boats

# GREEDY INSIGHT: Always try to pair heaviest with lightest
# If lightest can't fit with heaviest, no one can` },
]
