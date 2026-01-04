import type { Method } from '../../types'

// Why & When, Merge Intervals, Insert Interval
export const intervalBasicsMethods: Method[] = [
  // Why & When
  { signature: 'Why Intervals?', description: 'Intervals represent ranges [start, end]. Common in scheduling, calendar, and range query problems. Key insight: sort by start or end time.', complexity: 'Concept', section: 'Why & When', example: `# INTERVAL PROBLEMS OVERVIEW
#
# Interval = [start, end] representing a range
# Common problems:
# - Merge overlapping intervals
# - Find intersections
# - Count overlapping at a point
# - Schedule without conflicts
#
# KEY TECHNIQUES:
# 1. Sort by start time (most common)
# 2. Sort by end time (greedy selection)
# 3. Sweep line (event-based processing)
# 4. Interval trees (advanced queries)

# OVERLAP CONDITIONS:
# Two intervals [a, b] and [c, d] overlap if:
#   a <= d AND c <= b
#
# No overlap if:
#   b < c OR d < a (one ends before other starts)

def overlaps(int1, int2):
    """Check if two intervals overlap."""
    return int1[0] <= int2[1] and int2[0] <= int1[1]

def intersection(int1, int2):
    """Return intersection of two intervals, or None."""
    if not overlaps(int1, int2):
        return None
    return [max(int1[0], int2[0]), min(int1[1], int2[1])]` },

  { signature: 'Interval Sorting', description: 'Sort by start time for merging, by end time for greedy selection. Sorting is almost always the first step.', complexity: 'O(n log n)', section: 'Why & When', example: `# SORTING STRATEGIES
intervals = [[1,3], [2,6], [8,10], [15,18]]

# Sort by start time (default for merging)
intervals.sort(key=lambda x: x[0])
# Result: [[1,3], [2,6], [8,10], [15,18]]

# Sort by end time (for activity selection)
intervals.sort(key=lambda x: x[1])

# Sort by start, then by end (for ties)
intervals.sort(key=lambda x: (x[0], x[1]))

# Sort by start, then by REVERSE end (for containment)
intervals.sort(key=lambda x: (x[0], -x[1]))
# Longer intervals come first when same start

# WHEN TO USE EACH:
# - Start time: Merging, inserting
# - End time: Activity selection, greedy
# - Start then -end: Remove covered intervals` },

  { signature: 'Sweep Line Concept', description: 'Process events (starts/ends) in sorted order. Track active count or state. Essential for meeting rooms, max overlap.', complexity: 'O(n log n)', section: 'Why & When', example: `# SWEEP LINE TECHNIQUE
# Convert intervals to events, process chronologically

def max_overlap(intervals):
    """Find maximum number of overlapping intervals."""
    events = []
    for start, end in intervals:
        events.append((start, 1))   # +1 at start
        events.append((end, -1))    # -1 at end

    # Sort: by time, then ends before starts at same time
    events.sort(key=lambda x: (x[0], x[1]))

    current = 0
    max_count = 0
    for time, delta in events:
        current += delta
        max_count = max(max_count, current)

    return max_count

# Example: [[1,4], [2,5], [3,6]]
# Events: (1,+1), (2,+1), (3,+1), (4,-1), (5,-1), (6,-1)
# Sweep: 1->2->3->2->1->0
# Max overlap: 3

# APPLICATIONS:
# - Meeting rooms needed
# - Maximum CPU load
# - Point with max coverage` },

  // Merge Intervals
  { signature: 'Merge Intervals', description: 'Combine overlapping intervals. Sort by start, extend end if overlap, else add new interval.', complexity: 'O(n log n)', section: 'Merge Intervals', example: `def merge(intervals):
    """
    Merge all overlapping intervals.
    Return list of non-overlapping intervals.
    """
    if not intervals:
        return []

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    merged = [intervals[0]]

    for start, end in intervals[1:]:
        # If current overlaps with last merged
        if start <= merged[-1][1]:
            # Extend the end
            merged[-1][1] = max(merged[-1][1], end)
        else:
            # No overlap, add new interval
            merged.append([start, end])

    return merged

# Example: [[1,3], [2,6], [8,10], [15,18]]
# Sorted: same (already sorted)
# Process [1,3]: merged = [[1,3]]
# Process [2,6]: 2 <= 3, extend to [1,6]
# Process [8,10]: 8 > 6, add new
# Process [15,18]: 15 > 10, add new
# Result: [[1,6], [8,10], [15,18]]` },

  { signature: 'Merge Intervals (In-Place)', description: 'Modify input array in place to save space. Use write pointer technique.', complexity: 'O(n log n) time, O(1) space', section: 'Merge Intervals', example: `def merge_in_place(intervals):
    """Merge intervals modifying array in place."""
    if not intervals:
        return []

    intervals.sort(key=lambda x: x[0])

    write = 0  # Write pointer for merged intervals

    for i in range(1, len(intervals)):
        if intervals[i][0] <= intervals[write][1]:
            # Overlap: extend current merged interval
            intervals[write][1] = max(intervals[write][1], intervals[i][1])
        else:
            # No overlap: move write pointer, copy interval
            write += 1
            intervals[write] = intervals[i]

    # Return only the merged portion
    return intervals[:write + 1]

# Space-optimized version
# Only O(log n) for sorting, O(1) extra space` },

  // Insert Interval
  { signature: 'Insert Interval', description: 'Insert new interval into sorted non-overlapping list, merging if necessary. Three-phase approach.', complexity: 'O(n)', section: 'Insert Interval', example: `def insert(intervals, new_interval):
    """
    Insert new_interval into sorted non-overlapping intervals.
    Merge if necessary.
    """
    result = []
    i = 0
    n = len(intervals)

    # Phase 1: Add all intervals ending before new starts
    while i < n and intervals[i][1] < new_interval[0]:
        result.append(intervals[i])
        i += 1

    # Phase 2: Merge all overlapping intervals
    while i < n and intervals[i][0] <= new_interval[1]:
        new_interval[0] = min(new_interval[0], intervals[i][0])
        new_interval[1] = max(new_interval[1], intervals[i][1])
        i += 1
    result.append(new_interval)

    # Phase 3: Add all remaining intervals
    while i < n:
        result.append(intervals[i])
        i += 1

    return result

# Example: intervals = [[1,3],[6,9]], new = [2,5]
# Phase 1: nothing (1,3 ends at 3 >= 2)
# Phase 2: merge [1,3] and [2,5] -> [1,5]
#          [6,9] starts at 6 > 5, stop
# Phase 3: add [6,9]
# Result: [[1,5], [6,9]]` },

  { signature: 'Insert Interval (Binary Search)', description: 'Use binary search to find insertion point for very large interval lists.', complexity: 'O(n) overall, O(log n) search', section: 'Insert Interval', example: `import bisect

def insert_binary_search(intervals, new_interval):
    """
    Insert with binary search for finding position.
    Still O(n) due to array insertion/merging.
    """
    if not intervals:
        return [new_interval]

    # Find where new_interval would start
    starts = [i[0] for i in intervals]
    pos = bisect.bisect_left(starts, new_interval[0])

    # Insert at position
    intervals.insert(pos, new_interval)

    # Now merge from that position
    result = []
    for interval in intervals:
        if not result or result[-1][1] < interval[0]:
            result.append(interval)
        else:
            result[-1][1] = max(result[-1][1], interval[1])

    return result

# Binary search helps if we need to find position quickly
# but merging still requires O(n) in worst case` },

  { signature: 'Remove Covered Intervals', description: 'Remove intervals completely covered by another. Sort by start asc, end desc.', complexity: 'O(n log n)', section: 'Insert Interval', example: `def remove_covered_intervals(intervals):
    """
    Return count of intervals NOT covered by another.
    Interval [a,b] is covered by [c,d] if c <= a and b <= d.
    """
    # Sort by start ascending, then end descending
    # This way, for same start, longer interval comes first
    intervals.sort(key=lambda x: (x[0], -x[1]))

    count = 0
    max_end = 0

    for start, end in intervals:
        # If this interval extends beyond previous max_end
        if end > max_end:
            count += 1
            max_end = end
        # Otherwise, it's covered by a previous interval

    return count

# Example: [[1,4], [3,6], [2,8]]
# Sorted: [[1,4], [2,8], [3,6]]
# [1,4]: end(4) > max(0), count=1, max=4
# [2,8]: end(8) > max(4), count=2, max=8
# [3,6]: end(6) <= max(8), covered!
# Return 2

# WHY SORT BY -END?
# If [1,4] and [1,10] both start at 1, we want
# [1,10] first so [1,4] is correctly marked as covered` },
]
