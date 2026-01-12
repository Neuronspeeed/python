import type { Method } from '../../../types'

export const specialSortingMethods: Method[] = [
  { signature: 'Sort Colors (Dutch Flag)', description: 'Sort array with 3 distinct values. Three-pointer technique.', complexity: 'O(n)', section: 'Special Sorting', example: `def sort_colors(nums):
    # Dutch National Flag algorithm
    low, mid, high = 0, 0, len(nums) - 1

    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:  # nums[mid] == 2
            nums[high], nums[mid] = nums[mid], nums[high]
            high -= 1
            # Don't increment mid - need to check swapped value

    return nums

# Example: [2, 0, 2, 1, 1, 0]
# Result: [0, 0, 1, 1, 2, 2]

# Generalized: Sort with K colors
def sort_k_colors(nums, k):
    for color in range(1, k):
        # Partition: color vs rest
        left = 0
        for i in range(len(nums)):
            if nums[i] == color:
                nums[left], nums[i] = nums[i], nums[left]
                left += 1` },
  { signature: 'Merge Intervals', description: 'Merge overlapping intervals after sorting.', complexity: 'O(n log n)', section: 'Special Sorting', example: `def merge_intervals(intervals):
    if not intervals:
        return []

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    result = [intervals[0]]

    for start, end in intervals[1:]:
        # If overlapping with last, merge
        if start <= result[-1][1]:
            result[-1][1] = max(result[-1][1], end)
        else:
            result.append([start, end])

    return result

# Example: [[1,3], [2,6], [8,10], [15,18]]
# Output: [[1,6], [8,10], [15,18]]

# Insert and merge
def insert_interval(intervals, new):
    result = []
    i = 0
    n = len(intervals)

    # Add all before new interval
    while i < n and intervals[i][1] < new[0]:
        result.append(intervals[i])
        i += 1

    # Merge overlapping
    while i < n and intervals[i][0] <= new[1]:
        new[0] = min(new[0], intervals[i][0])
        new[1] = max(new[1], intervals[i][1])
        i += 1
    result.append(new)

    # Add remaining
    result.extend(intervals[i:])
    return result` },
]
