import type { Method } from '../../types'

// Meeting Rooms + Calendar Scheduling Problems
export const intervalSchedulingMethods: Method[] = [
  // Why & When
  { signature: 'Interval scheduling patterns', description: 'Key insight: sort first! By start for overlap check, by end for greedy selection. Sweep line for concurrent count. Pattern recognition critical.', complexity: 'Concept', section: 'Why & When', example: `# INTERVAL PROBLEM PATTERNS

# PATTERN 1: Check overlap - sort by START
def can_attend_all(intervals):
    intervals.sort(key=lambda x: x[0])  # By start
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i-1][1]:
            return False  # Overlap!
    return True

# PATTERN 2: Max non-overlapping - sort by END
def max_meetings(intervals):
    intervals.sort(key=lambda x: x[1])  # By end
    count = 1
    end = intervals[0][1]
    for start, e in intervals[1:]:
        if start >= end:
            count += 1
            end = e
    return count
# Greedy: Pick earliest ending first

# PATTERN 3: Min rooms needed - sweep line
def min_rooms(intervals):
    events = []
    for start, end in intervals:
        events.append((start, 1))   # Meeting starts
        events.append((end, -1))    # Meeting ends
    events.sort()
    rooms = max_rooms = 0
    for time, delta in events:
        rooms += delta
        max_rooms = max(max_rooms, rooms)
    return max_rooms

# DECISION TREE:
# "Can attend all?" → Sort by start, check overlap
# "Max meetings?" → Sort by end, greedy
# "Min rooms?" → Sweep line / events
# "Merge overlapping?" → Sort by start, merge

# GOTCHA: Sort by END for greedy max
# Why? Picking earliest end leaves most room for future`,
  },

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
]
