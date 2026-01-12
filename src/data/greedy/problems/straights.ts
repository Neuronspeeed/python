import type { Method } from '../../../types'

export const straightsMethods: Method[] = [
  { signature: 'Hand of Straights / Split Array', description: 'Divide cards into groups of consecutive numbers. Use Counter and greedy.', complexity: 'O(n log n)', section: 'Straights', example: `def is_n_straight_hand(hand, group_size):
    """
    Can we divide hand into groups of group_size
    consecutive cards?
    """
    from collections import Counter

    if len(hand) % group_size != 0:
        return False

    count = Counter(hand)

    for card in sorted(count):
        if count[card] > 0:
            # Start a group with this card
            num_groups = count[card]
            for i in range(group_size):
                if count[card + i] < num_groups:
                    return False
                count[card + i] -= num_groups

    return True

# Example: hand = [1,2,3,6,2,3,4,7,8], group_size = 3
# count = {1:1, 2:2, 3:2, 4:1, 6:1, 7:1, 8:1}
# Start at 1: need [1,2,3], have them, decrement
# count = {1:0, 2:1, 3:1, 4:1, 6:1, 7:1, 8:1}
# Start at 2: need [2,3,4], have them, decrement
# count = {2:0, 3:0, 4:0, 6:1, 7:1, 8:1}
# Start at 6: need [6,7,8], have them, decrement
# All used, return True` },
]
