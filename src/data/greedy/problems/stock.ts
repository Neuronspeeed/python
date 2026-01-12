import type { Method } from '../../../types'

export const stockMethods: Method[] = [
  { signature: 'Best Time to Buy Stock II', description: 'Unlimited transactions allowed. Collect every upward price movement.', complexity: 'O(n)', section: 'Stock', example: `def max_profit(prices):
    """
    Can make unlimited transactions (buy then sell).
    Return maximum profit.
    """
    profit = 0
    for i in range(1, len(prices)):
        # Collect every positive difference
        if prices[i] > prices[i-1]:
            profit += prices[i] - prices[i-1]
    return profit

# Example: prices = [7, 1, 5, 3, 6, 4]
# Day 1->2: 1-7 = -6 (skip)
# Day 2->3: 5-1 = +4 (take)
# Day 3->4: 3-5 = -2 (skip)
# Day 4->5: 6-3 = +3 (take)
# Day 5->6: 4-6 = -2 (skip)
# Total: 4 + 3 = 7

# GREEDY INSIGHT: Every local increase is profit
# Equivalent to: buy at every local min, sell at every local max
# But simpler: just sum all positive differences` },
]
