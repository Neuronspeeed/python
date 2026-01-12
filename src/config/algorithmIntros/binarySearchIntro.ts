export const binarySearchIntro = `Binary Search for O(log n)
Binary search divides sorted data in half repeatedly—search 1 billion elements in only 30 comparisons. Requires sorted data. O(log n) time, O(1) space iterative.

\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1
\`\`\`python
---
Bisect Module Variants
bisect_left finds leftmost position, bisect_right finds rightmost. Use for finding ranges, insertion points.

\`\`\`python
import bisect
arr = [1, 2, 4, 4, 4, 6]
bisect.bisect_left(arr, 4)   # 2 (leftmost)
bisect.bisect_right(arr, 4)  # 5 (after rightmost)
bisect.insort(arr, 5)  # Insert maintaining sort

def find_range(arr, target):
    left = bisect.bisect_left(arr, target)
    right = bisect.bisect_right(arr, target)
    return [left, right - 1] if left < right else [-1, -1]
\`\`\`python
---
Binary Search on Answer Space
Search on possible answer range, not indices. For "find minimum X where condition(X) is true".

\`\`\`python
def sqrt(x):
    left, right = 1, x // 2
    while left <= right:
        mid = left + (right - left) // 2
        if mid * mid <= x: left = mid + 1
        else: right = mid - 1
    return right  # Floor of sqrt

def ship_within_days(weights, days):
    def can_ship(cap):
        curr, needed = 0, 1
        for w in weights:
            if curr + w > cap:
                needed += 1
                curr = w
            else: curr += w
        return needed <= days

    left, right = max(weights), sum(weights)
    while left < right:
        mid = left + (right - left) // 2
        if can_ship(mid): right = mid
        else: left = mid + 1
    return left
\`\`\`python
`
