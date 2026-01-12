export const intervalsIntro = `Interval problems involve ranges with start and end points. These problems appear frequently in scheduling, time management, and range queries. The key insight: sorting by start or end time (choosing correctly!) often transforms a hard problem into a simple linear scan—but the wrong sort choice makes the problem impossible.

WHY INTERVALS ARE INTERVIEW FAVORITES: Interval problems test multiple skills at once: sorting strategy, greedy thinking, and edge case handling. The pattern appears everywhere: meeting rooms, task scheduling, resource allocation, range merging. Master intervals and you've conquered 10-15% of all interview problems.

**The interval paradox:**
- Sort by START: enables overlap detection, merging, finding gaps
- Sort by END: enables greedy maximum selection (activity selection)
- Wrong choice: correct algorithm becomes impossible
- The decision is NOT arbitrary—it depends on what you're optimizing

SORT BY START VS END: THE CRITICAL DECISION

This is the #1 decision in interval problems. Get it wrong and your algorithm fails on edge cases.

**Sort by START time when:**
1. **Merging overlapping intervals**: Need to process in chronological order
2. **Finding gaps**: Need consecutive intervals in time order
3. **Detecting all overlaps**: Need to scan pairs in sequence
4. **Insert interval into sorted list**: Need to find position by start time

**Sort by END time when:**
1. **Maximizing non-overlapping intervals**: Greedy—pick earliest ending leaves most room
2. **Activity selection**: Choose activities that finish early
3. **Minimum intervals to remove**: Keep ones that end earliest
4. **Earliest deadline first scheduling**: Process shortest tasks first

**Why the difference matters:**
\`\`\`python
intervals = [[1, 4], [2, 3], [3, 6]]

# Sort by START
sorted_start = [[1, 4], [2, 3], [3, 6]]
# Best for merging: [1,4] overlaps [2,3], merge to [1,4], overlaps [3,6], merge to [1,6]

# Sort by END
sorted_end = [[2, 3], [1, 4], [3, 6]]
# Best for max non-overlapping: pick [2,3], skip [1,4] (overlaps), pick [3,6] = 2 intervals
\`\`\`python

PATTERN 1: MERGE OVERLAPPING INTERVALS

**Problem**: Given list of intervals, merge all overlapping intervals.

**Strategy**: Sort by START, scan linearly, extend or add

\`\`\`python
def merge_intervals(intervals):
    """
    Merge all overlapping intervals.
    Time: O(n log n) for sorting
    Space: O(n) for result
    """
    if not intervals:
        return []

    # CRITICAL: Sort by START time
    intervals.sort(key=lambda x: x[0])

    merged = [intervals[0]]

    for start, end in intervals[1:]:
        last_end = merged[-1][1]

        if start <= last_end:
            # Overlap: extend last interval
            merged[-1][1] = max(merged[-1][1], end)
        else:
            # No overlap: add new interval
            merged.append([start, end])

    return merged

# Example: [[1,3], [2,6], [8,10], [15,18]]
# After sort: [[1,3], [2,6], [8,10], [15,18]]
# Process: [1,3] start, [2,6] overlaps -> [1,6], [8,10] no overlap, [15,18] no overlap
# Result: [[1,6], [8,10], [15,18]]
\`\`\`python

PATTERN 2: INSERT INTERVAL

**Problem**: Insert new interval into sorted list, merge if needed.

\`\`\`python
def insert_interval(intervals, new):
    """
    Insert interval into sorted list, merge overlaps.
    Time: O(n), Space: O(n)
    """
    result = []
    i = 0
    n = len(intervals)

    # Add all intervals ending before new starts
    while i < n and intervals[i][1] < new[0]:
        result.append(intervals[i])
        i += 1

    # Merge overlapping intervals
    while i < n and intervals[i][0] <= new[1]:
        new = [min(new[0], intervals[i][0]),
               max(new[1], intervals[i][1])]
        i += 1
    result.append(new)

    # Add remaining intervals
    while i < n:
        result.append(intervals[i])
        i += 1

    return result
\`\`\`python

PATTERN 3: MAXIMUM NON-OVERLAPPING INTERVALS

**Problem**: Select maximum number of non-overlapping intervals.

**Strategy**: Sort by END, greedily pick earliest-ending.

\`\`\`python
def max_non_overlapping(intervals):
    """
    Select maximum non-overlapping intervals.
    GREEDY: Sort by END, always pick earliest ending.
    WHY: Earliest ending leaves most room for future intervals.
    """
    if not intervals:
        return 0

    # CRITICAL: Sort by END time
    intervals.sort(key=lambda x: x[1])

    count = 1
    end = intervals[0][1]

    for start, finish in intervals[1:]:
        if start >= end:  # No overlap
            count += 1
            end = finish

    return count

# Equivalent problem: Minimum intervals to REMOVE to make non-overlapping
# Answer: len(intervals) - max_non_overlapping(intervals)
\`\`\`python

PATTERN 4: MEETING ROOMS

**Problem 1**: Can one person attend all meetings? (any overlap = no)

\`\`\`python
def can_attend_all(intervals):
    """Check if any intervals overlap."""
    intervals.sort(key=lambda x: x[0])

    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i-1][1]:
            return False  # Overlap found

    return True
\`\`\`python

**Problem 2**: Minimum meeting rooms needed? (max concurrent)

\`\`\`python
def min_meeting_rooms(intervals):
    """
    Find minimum rooms needed (max concurrent meetings).
    APPROACH: Sweep line - track events chronologically.
    """
    events = []
    for start, end in intervals:
        events.append((start, 1))   # Meeting starts
        events.append((end, -1))    # Meeting ends

    events.sort()  # Sort by time, -1 before 1 at same time

    max_rooms = current = 0
    for time, delta in events:
        current += delta
        max_rooms = max(max_rooms, current)

    return max_rooms

# Heap approach (more intuitive):
import heapq

def min_rooms_heap(intervals):
    """Track end times in min-heap."""
    if not intervals:
        return 0

    intervals.sort(key=lambda x: x[0])
    heap = []  # End times of ongoing meetings

    for start, end in intervals:
        if heap and heap[0] <= start:
            heapq.heappop(heap)  # Room freed up
        heapq.heappush(heap, end)

    return len(heap)  # Max concurrent
\`\`\`python

PATTERN 5: INTERVAL INTERSECTION

**Problem**: Find intersection of two sorted interval lists.

\`\`\`python
def interval_intersection(A, B):
    """
    Find all intervals that appear in both A and B.
    Both lists are sorted and non-overlapping internally.
    """
    result = []
    i = j = 0

    while i < len(A) and j < len(B):
        # Find overlap
        lo = max(A[i][0], B[j][0])
        hi = min(A[i][1], B[j][1])

        if lo <= hi:
            result.append([lo, hi])

        # Move pointer for interval that ends first
        if A[i][1] < B[j][1]:
            i += 1
        else:
            j += 1

    return result
\`\`\`python

EDGE CASES TO WATCH:

\`\`\`python
# 1. Touching intervals: [1,2], [2,3]
# "Overlapping" if start <= end? Or start < end?
# Clarify with interviewer!

# 2. Single point intervals: [1,1]
# Are these valid? How do they overlap?

# 3. Empty input
if not intervals:
    return []

# 4. Single interval
if len(intervals) == 1:
    return intervals

# 5. Identical intervals: [1,3], [1,3]
# Should merge to [1,3] (single interval)
\`\`\`python

COMPLEXITY ANALYSIS:

Most interval problems are:
- **Sorting**: O(n log n)
- **Scanning**: O(n)
- **Total**: O(n log n)
- If asked to optimize: usually can't beat O(n log n) due to sorting

6. **Communication:**
- State your sort choice explicitly: "I'll sort by END time because..."
- Explain why (greedy, chronological, etc.)
- Walk through an example

WHEN INTERVALS APPEAR IN INTERVIEWS

**Strong signals:**
- "Schedule", "meetings", "rooms", "resources"
- "Overlapping", "non-overlapping", "merge"
- "Earliest", "latest", "maximum", "minimum"
- Input: list of \`[start, end]\` pairs

**Common problems:**
- LeetCode 56: Merge Intervals
- LeetCode 57: Insert Interval
- LeetCode 435: Non-overlapping Intervals
- LeetCode 252: Meeting Rooms
- LeetCode 253: Meeting Rooms II
- LeetCode 986: Interval List Intersections

**Pro tip:** If you see intervals, immediately ask:
1. "Should I sort by start or end time?"
2. "How should I handle touching intervals?"
3. "What does overlap mean exactly?"

Mastering intervals means recognizing the pattern, choosing the right sort, and handling edge cases. Once you've seen the 5-6 core patterns (merge, insert, max selection, sweep line, heap, intersection), you can solve any interval problem.`
