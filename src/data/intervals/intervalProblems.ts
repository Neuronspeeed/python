import type { Method } from '../../types'

// Meeting Rooms, Calendar, Overlapping, Minimum Platforms
export const intervalProblemsMethods: Method[] = [
  // Meeting Rooms
  { signature: 'Meeting Rooms I', description: 'Can a person attend all meetings? Check if any intervals overlap.', complexity: 'O(n log n)', section: 'Meeting Rooms', example: `def can_attend_meetings(intervals):
    """
    Return True if person can attend all meetings
    (no two meetings overlap).
    """
    if not intervals:
        return True

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    # Check if any consecutive meetings overlap
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i-1][1]:
            return False

    return True

# Example: [[0,30], [5,10], [15,20]]
# Sorted: same
# Check: 5 < 30? Yes! Overlap found
# Return False

# Example: [[7,10], [2,4]]
# Sorted: [[2,4], [7,10]]
# Check: 7 < 4? No, no overlap
# Return True` },

  { signature: 'Meeting Rooms II', description: 'Minimum rooms needed. Use min-heap to track room end times or sweep line.', complexity: 'O(n log n)', section: 'Meeting Rooms', example: `import heapq

def min_meeting_rooms(intervals):
    """Return minimum conference rooms needed."""
    if not intervals:
        return 0

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    # Min-heap of end times (rooms in use)
    rooms = []
    heapq.heappush(rooms, intervals[0][1])

    for start, end in intervals[1:]:
        # If earliest ending room is free, reuse it
        if start >= rooms[0]:
            heapq.heappop(rooms)
        heapq.heappush(rooms, end)

    return len(rooms)

# Sweep line alternative
def min_meeting_rooms_sweep(intervals):
    events = []
    for start, end in intervals:
        events.append((start, 1))   # Start: need room
        events.append((end, -1))    # End: free room

    events.sort(key=lambda x: (x[0], x[1]))

    rooms = max_rooms = 0
    for time, delta in events:
        rooms += delta
        max_rooms = max(max_rooms, rooms)

    return max_rooms

# Example: [[0,30], [5,10], [15,20]]
# Heap approach:
# [0,30]: rooms = [30]
# [5,10]: 5 < 30, can't reuse, rooms = [10, 30]
# [15,20]: 15 >= 10, reuse, rooms = [20, 30]
# Answer: 2 rooms` },

  // Calendar
  { signature: 'My Calendar I', description: 'Book appointments without double booking. Store and check intervals.', complexity: 'O(n) per booking', section: 'Calendar', example: `class MyCalendar:
    """
    Book events without double booking.
    book(start, end) returns True if booked successfully.
    """
    def __init__(self):
        self.bookings = []

    def book(self, start: int, end: int) -> bool:
        for s, e in self.bookings:
            # Check overlap: NOT (end <= s OR start >= e)
            if not (end <= s or start >= e):
                return False
        self.bookings.append((start, end))
        return True

# Example usage:
# cal = MyCalendar()
# cal.book(10, 20)  # True
# cal.book(15, 25)  # False (overlaps with [10,20])
# cal.book(20, 30)  # True ([20,30) doesn't overlap [10,20))

# OPTIMIZED: Use sorted list with binary search
import bisect

class MyCalendarOptimized:
    def __init__(self):
        self.starts = []
        self.ends = []

    def book(self, start: int, end: int) -> bool:
        i = bisect.bisect_right(self.starts, start)
        if i > 0 and self.ends[i-1] > start:
            return False
        if i < len(self.starts) and self.starts[i] < end:
            return False
        bisect.insort(self.starts, start)
        bisect.insort(self.ends, end)
        return True` },

  { signature: 'My Calendar II', description: 'Allow double booking but not triple. Track single and double bookings separately.', complexity: 'O(n) per booking', section: 'Calendar', example: `class MyCalendarTwo:
    """
    Book events allowing double but not triple booking.
    """
    def __init__(self):
        self.single = []  # Single bookings
        self.double = []  # Double-booked regions

    def book(self, start: int, end: int) -> bool:
        # Check if would cause triple booking
        for s, e in self.double:
            if not (end <= s or start >= e):
                return False  # Would be triple booked

        # Add to double bookings where overlaps with single
        for s, e in self.single:
            if not (end <= s or start >= e):
                # Overlap region becomes double-booked
                overlap_start = max(start, s)
                overlap_end = min(end, e)
                self.double.append((overlap_start, overlap_end))

        self.single.append((start, end))
        return True

# Example:
# book(10, 20) -> True, single=[(10,20)]
# book(50, 60) -> True, single=[(10,20),(50,60)]
# book(10, 40) -> True, double=[(10,20)], single += (10,40)
# book(5, 15) -> False, would triple-book [10,15)` },

  { signature: 'My Calendar III', description: 'Return max concurrent bookings. Use sweep line with sorted events.', complexity: 'O(n log n) per booking', section: 'Calendar', example: `from collections import defaultdict
import bisect

class MyCalendarThree:
    """
    Return maximum K-booking after each book call.
    K-booking = K events have overlapping time.
    """
    def __init__(self):
        self.events = defaultdict(int)

    def book(self, start: int, end: int) -> int:
        self.events[start] += 1  # Event starts
        self.events[end] -= 1    # Event ends

        # Sweep through all events
        max_booking = current = 0
        for time in sorted(self.events.keys()):
            current += self.events[time]
            max_booking = max(max_booking, current)

        return max_booking

# More efficient with SortedDict
from sortedcontainers import SortedDict

class MyCalendarThreeOptimized:
    def __init__(self):
        self.events = SortedDict()

    def book(self, start: int, end: int) -> int:
        self.events[start] = self.events.get(start, 0) + 1
        self.events[end] = self.events.get(end, 0) - 1

        max_k = current = 0
        for delta in self.events.values():
            current += delta
            max_k = max(max_k, current)
        return max_k` },

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

# KEY INSIGHT: Same as activity selection!
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
