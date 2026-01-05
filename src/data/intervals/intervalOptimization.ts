import type { Method } from '../../types'

// Overlapping + Platforms - Optimization & Greedy Problems
export const intervalOptimizationMethods: Method[] = [
  // Overlapping Problems
  { signature: 'Interval List Intersections', description: 'Find all intersections between two sorted interval lists. Two pointer approach.', complexity: 'O(m + n)', section: 'Overlapping', example: `def interval_intersection(A, B):
    """
    A, B: sorted lists of disjoint intervals
    Return intersection of these two interval lists.
    """
    result = []
    i = j = 0

    while i < len(A) and j < len(B):
        # Find intersection
        start = max(A[i][0], B[j][0])
        end = min(A[i][1], B[j][1])

        if start <= end:  # Valid intersection
            result.append([start, end])

        # Move pointer with earlier end
        if A[i][1] < B[j][1]:
            i += 1
        else:
            j += 1

    return result

# Example:
# A = [[0,2], [5,10], [13,23], [24,25]]
# B = [[1,5], [8,12], [15,24], [25,26]]
#
# i=0, j=0: [0,2] & [1,5] -> [1,2]
# i=1, j=0: [5,10] & [1,5] -> [5,5]
# i=1, j=1: [5,10] & [8,12] -> [8,10]
# ...
# Result: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]` },

  { signature: 'Non-overlapping Intervals', description: 'Minimum removals to make all intervals non-overlapping. Greedy: keep earliest ending.', complexity: 'O(n log n)', section: 'Overlapping', example: `def erase_overlap_intervals(intervals):
    """
    Return minimum number of intervals to remove
    to make rest non-overlapping.
    """
    if not intervals:
        return 0

    # Sort by end time (greedy choice)
    intervals.sort(key=lambda x: x[1])

    count = 1  # Count of non-overlapping we can keep
    end = intervals[0][1]

    for i in range(1, len(intervals)):
        if intervals[i][0] >= end:  # No overlap
            count += 1
            end = intervals[i][1]

    return len(intervals) - count

# Example: [[1,2], [2,3], [3,4], [1,3]]
# Sorted by end: [[1,2], [2,3], [1,3], [3,4]]
# Keep [1,2], end=2
# [2,3]: 2 >= 2, keep, end=3
# [1,3]: 1 < 3, skip (remove)
# [3,4]: 3 >= 3, keep, end=4
# Keep 3, remove 1

# WHY SORT BY END?
# Earliest ending interval leaves most room for others` },

  { signature: 'Minimum Arrows to Burst Balloons', description: 'Find minimum points to hit all intervals. Track common overlap region.', complexity: 'O(n log n)', section: 'Overlapping', example: `def find_min_arrow_shots(points):
    """
    points[i] = [start, end] of balloon i
    Arrow at x bursts balloon if start <= x <= end
    Return minimum arrows to burst all.
    """
    if not points:
        return 0

    # Sort by end position
    points.sort(key=lambda x: x[1])

    arrows = 1
    arrow_pos = points[0][1]  # Shoot at end of first

    for start, end in points[1:]:
        if start > arrow_pos:  # Need new arrow
            arrows += 1
            arrow_pos = end

    return arrows

# Example: [[10,16], [2,8], [1,6], [7,12]]
# Sorted by end: [[1,6], [2,8], [7,12], [10,16]]
# Arrow at 6: bursts [1,6] and [2,8]
# Arrow at 12: bursts [7,12] and [10,16]
# Total: 2 arrows

# Same pattern as activity selection
# Each arrow = one "activity" we're selecting` },

  // Minimum Platforms / Max Load
  { signature: 'Minimum Platforms', description: 'Minimum train platforms needed at a station. Classic sweep line problem.', complexity: 'O(n log n)', section: 'Platforms', example: `def min_platforms(arrivals, departures):
    """
    arrivals[i], departures[i] = train i times
    Return minimum platforms needed.
    """
    events = []
    for arr in arrivals:
        events.append((arr, 1))    # Arrival: need platform
    for dep in departures:
        events.append((dep, -1))   # Departure: free platform

    # Sort: by time, departures before arrivals at same time
    events.sort(key=lambda x: (x[0], x[1]))

    platforms = max_platforms = 0
    for time, delta in events:
        platforms += delta
        max_platforms = max(max_platforms, platforms)

    return max_platforms

# Example:
# arr = [900, 940, 950, 1100, 1500, 1800]
# dep = [910, 1200, 1120, 1130, 1900, 2000]
#
# Events sorted: (900,+1), (910,-1), (940,+1), (950,+1),
#                (1100,+1), (1120,-1), (1130,-1), (1200,-1),
#                (1500,+1), (1800,+1), (1900,-1), (2000,-1)
#
# Max concurrent: 3 platforms needed` },

  { signature: 'Maximum CPU Load', description: 'Find maximum CPU load at any time given jobs with start, end, load.', complexity: 'O(n log n)', section: 'Platforms', example: `def max_cpu_load(jobs):
    """
    jobs[i] = [start, end, load]
    Return maximum CPU load at any time.
    """
    events = []
    for start, end, load in jobs:
        events.append((start, load))   # Job starts
        events.append((end, -load))    # Job ends

    events.sort(key=lambda x: (x[0], x[1]))

    current_load = max_load = 0
    for time, delta in events:
        current_load += delta
        max_load = max(max_load, current_load)

    return max_load

# Alternative: Min-heap approach
import heapq

def max_cpu_load_heap(jobs):
    jobs.sort(key=lambda x: x[0])  # Sort by start

    heap = []  # (end_time, load)
    current_load = max_load = 0

    for start, end, load in jobs:
        # Remove finished jobs
        while heap and heap[0][0] <= start:
            _, finished_load = heapq.heappop(heap)
            current_load -= finished_load

        # Add current job
        heapq.heappush(heap, (end, load))
        current_load += load
        max_load = max(max_load, current_load)

    return max_load` },

  { signature: 'Employee Free Time', description: 'Find common free intervals for all employees. Merge all busy times, find gaps.', complexity: 'O(n log n)', section: 'Platforms', example: `def employee_free_time(schedules):
    """
    schedules[i] = list of intervals for employee i
    Return list of finite intervals when ALL are free.
    """
    # Flatten all intervals
    all_intervals = []
    for schedule in schedules:
        all_intervals.extend(schedule)

    # Sort by start time
    all_intervals.sort(key=lambda x: x[0])

    # Merge busy times
    merged = [all_intervals[0]]
    for start, end in all_intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])

    # Find gaps between merged intervals
    free_time = []
    for i in range(1, len(merged)):
        free_time.append([merged[i-1][1], merged[i][0]])

    return free_time

# Example:
# Employee 1: [[1,3], [6,7]]
# Employee 2: [[2,4]]
# Employee 3: [[2,5], [9,12]]
#
# All: [[1,3], [2,4], [2,5], [6,7], [9,12]]
# Merged: [[1,5], [6,7], [9,12]]
# Free: [[5,6], [7,9]]` },

  { signature: 'Range Module', description: 'Add/query/remove ranges dynamically. Use sorted list of disjoint intervals.', complexity: 'O(n) per operation', section: 'Platforms', example: `from sortedcontainers import SortedList

class RangeModule:
    """
    Track ranges and query if ranges are covered.
    """
    def __init__(self):
        # Store as flat list: [s1, e1, s2, e2, ...]
        self.ranges = SortedList()

    def addRange(self, left: int, right: int) -> None:
        # Find overlapping ranges and merge
        i = self.ranges.bisect_left(left)
        j = self.ranges.bisect_right(right)

        # Adjust boundaries
        if i % 2 == 1:  # left is inside existing range
            left = self.ranges[i - 1]
        if j % 2 == 1:  # right is inside existing range
            right = self.ranges[j]

        # Remove old, add new merged range
        self.ranges = SortedList(
            list(self.ranges[:i - (i%2)]) +
            [left, right] +
            list(self.ranges[j + (j%2):])
        )

    def queryRange(self, left: int, right: int) -> bool:
        i = self.ranges.bisect_right(left)
        # Both left and right must be in same range
        return i % 2 == 1 and i < len(self.ranges) and right <= self.ranges[i]

    def removeRange(self, left: int, right: int) -> None:
        i = self.ranges.bisect_left(left)
        j = self.ranges.bisect_right(right)

        new_ranges = []
        if i % 2 == 1:  # Split existing range
            new_ranges.append(left)
        if j % 2 == 1:  # Split existing range
            new_ranges.insert(0, right)

        self.ranges = SortedList(
            list(self.ranges[:i]) +
            new_ranges +
            list(self.ranges[j:])
        )` },
]
