import type { Method } from '../../../types'

export const nonOverlappingMethods: Method[] = [
  { signature: 'Non-overlapping Intervals', description: 'Minimum removals to make non-overlapping. Same as max non-overlapping (activity selection).', complexity: 'O(n log n)', section: 'Non-overlapping', example: `def erase_overlap_intervals(intervals):
    """
    Return minimum number of intervals to remove
    to make the rest non-overlapping.
    """
    if not intervals:
        return 0

    # Sort by end time
    intervals.sort(key=lambda x: x[1])

    count = 1  # Keep count of non-overlapping
    end = intervals[0][1]

    for i in range(1, len(intervals)):
        if intervals[i][0] >= end:  # No overlap
            count += 1
            end = intervals[i][1]

    return len(intervals) - count

# Example: intervals = [[1,2],[2,3],[3,4],[1,3]]
# Sorted by end: [[1,2],[2,3],[1,3],[3,4]]
# Keep [1,2], end=2
# [2,3]: start(2) >= end(2), keep, end=3
# [1,3]: start(1) < end(3), skip
# [3,4]: start(3) >= end(3), keep, end=4
# Keep 3, remove 1` },
]
