import type { Method } from '../../../types'

export const greedyBinarySearchMethods: Method[] = [
  { signature: 'Binary Search for Minimum', description: 'Find minimum value satisfying condition. Search on answer space.', complexity: 'O(log(range) * check)', section: 'Greedy Binary Search', example: `# TEMPLATE: Find MINIMUM x where condition(x) is True
# Condition transitions from False...False to True...True
def binary_search_min(lo, hi, condition):
    while lo < hi:
        mid = (lo + hi) // 2
        if condition(mid):
            hi = mid  # Maybe we can do smaller
        else:
            lo = mid + 1  # Need larger
    return lo

# Example: Koko Eating Bananas
# Find minimum speed to finish in h hours
def min_eating_speed(piles, h):
    def can_finish(speed):
        hours = sum((p + speed - 1) // speed for p in piles)
        return hours <= h

    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_finish(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo

# Capacity to Ship Within D Days
def ship_within_days(weights, days):
    def can_ship(capacity):
        d, curr = 1, 0
        for w in weights:
            if curr + w > capacity:
                d += 1
                curr = 0
            curr += w
        return d <= days

    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_ship(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo` },
  { signature: 'Binary Search for Maximum', description: 'Find maximum value satisfying condition. Search on answer space.', complexity: 'O(log(range) * check)', section: 'Greedy Binary Search', example: `# TEMPLATE: Find MAXIMUM x where condition(x) is True
# Condition transitions from True...True to False...False
def binary_search_max(lo, hi, condition):
    while lo < hi:
        mid = (lo + hi + 1) // 2  # Ceiling division!
        if condition(mid):
            lo = mid  # Maybe we can do larger
        else:
            hi = mid - 1  # Need smaller
    return lo

# Example: Maximum length of subarray with sum <= target
def max_subarray_length(arr, target):
    def can_achieve(length):
        # Check if any subarray of this length has sum <= target
        window_sum = sum(arr[:length])
        if window_sum <= target:
            return True
        for i in range(length, len(arr)):
            window_sum += arr[i] - arr[i - length]
            if window_sum <= target:
                return True
        return False

    lo, hi = 0, len(arr)
    while lo < hi:
        mid = (lo + hi + 1) // 2
        if can_achieve(mid):
            lo = mid
        else:
            hi = mid - 1
    return lo` },
]
