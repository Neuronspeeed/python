import type { Method } from '../../types'

// Interval Scheduling, Gas Station, Task Scheduler, Partition Labels, More Problems
export const greedyProblemsMethods: Method[] = [
  // Gas Station
  { signature: 'Gas Station', description: 'Find starting station to complete circuit. Track total gas and current tank.', complexity: 'O(n)', section: 'Gas Station', example: `def can_complete_circuit(gas, cost):
    """
    gas[i] = gas at station i
    cost[i] = cost to travel from i to i+1
    Return starting station index, or -1 if impossible
    """
    total_tank = 0
    current_tank = 0
    start = 0

    for i in range(len(gas)):
        total_tank += gas[i] - cost[i]
        current_tank += gas[i] - cost[i]

        # Can't reach next station from current start
        if current_tank < 0:
            start = i + 1  # Try starting from next station
            current_tank = 0

    # If total gas >= total cost, solution exists
    return start if total_tank >= 0 else -1

# Example:
# gas  = [1, 2, 3, 4, 5]
# cost = [3, 4, 5, 1, 2]
# Start at index 3:
# Station 3: tank = 4-1 = 3
# Station 4: tank = 3+5-2 = 6
# Station 0: tank = 6+1-3 = 4
# Station 1: tank = 4+2-4 = 2
# Station 2: tank = 2+3-5 = 0 (just made it!)

# WHY IT WORKS:
# If total gas >= total cost, solution exists.
# If we can't reach station j from i, we also can't
# reach j from any station between i and j.` },

  // Task Scheduler
  { signature: 'Task Scheduler', description: 'Schedule tasks with cooldown. Greedy: schedule most frequent tasks first.', complexity: 'O(n)', section: 'Task Scheduler', example: `def least_interval(tasks, n):
    """
    tasks: list of task labels (e.g., ['A','A','A','B','B'])
    n: cooldown between same tasks
    Return minimum time to finish all tasks
    """
    from collections import Counter

    freq = Counter(tasks)
    max_freq = max(freq.values())
    # Count tasks with maximum frequency
    max_count = sum(1 for f in freq.values() if f == max_freq)

    # Formula: (max_freq - 1) * (n + 1) + max_count
    # Explanation:
    # - (max_freq - 1) full cycles of length (n + 1)
    # - Plus final partial cycle with max_count tasks

    # But we need at least len(tasks) slots
    return max(len(tasks), (max_freq - 1) * (n + 1) + max_count)

# Example: tasks = ['A','A','A','B','B','B'], n = 2
# max_freq = 3 (both A and B), max_count = 2
# (3-1) * (2+1) + 2 = 2 * 3 + 2 = 8
# Schedule: A B _ A B _ A B
#           ^   ^ ^   ^ ^   (8 time units)

# Example: tasks = ['A','A','A','B','B','B'], n = 0
# max(6, 0 + 2) = 6
# Schedule: A B A B A B (no idle needed)` },

  // Partition Labels
  { signature: 'Partition Labels', description: 'Split string so each letter appears in at most one part. Track last occurrence of each char.', complexity: 'O(n)', section: 'Partition Labels', example: `def partition_labels(s):
    """
    Return list of partition sizes where each letter
    appears in at most one partition.
    """
    # Find last occurrence of each character
    last = {c: i for i, c in enumerate(s)}

    result = []
    start = 0
    end = 0

    for i, c in enumerate(s):
        # Extend partition to include last occurrence of c
        end = max(end, last[c])

        # If we've reached the end of current partition
        if i == end:
            result.append(end - start + 1)
            start = i + 1

    return result

# Example: s = "ababcbacadefegdehijhklij"
# last = {a:8, b:5, c:7, d:14, e:15, f:11, g:13, h:19, ...}
# i=0 (a): end = 8
# i=1 (b): end = max(8, 5) = 8
# ... continue until i=8, partition size = 9
# Result: [9, 7, 8]` },

  // Candy Distribution
  { signature: 'Candy Distribution', description: 'Give candies so higher-rated child gets more than neighbors. Two-pass greedy.', complexity: 'O(n)', section: 'Candy', example: `def candy(ratings):
    """
    Each child must have at least 1 candy.
    Child with higher rating gets more than neighbors.
    Return minimum total candies.
    """
    n = len(ratings)
    candies = [1] * n

    # Left to right: handle increasing ratings
    for i in range(1, n):
        if ratings[i] > ratings[i-1]:
            candies[i] = candies[i-1] + 1

    # Right to left: handle decreasing ratings
    for i in range(n-2, -1, -1):
        if ratings[i] > ratings[i+1]:
            candies[i] = max(candies[i], candies[i+1] + 1)

    return sum(candies)

# Example: ratings = [1, 0, 2]
# Left pass:  [1, 1, 2]  (only index 2 > index 1)
# Right pass: [2, 1, 2]  (index 0 > index 1)
# Total: 5

# Example: ratings = [1, 2, 2]
# Left pass:  [1, 2, 1]  (index 1 > index 0, index 2 == index 1)
# Right pass: [1, 2, 1]  (no changes)
# Total: 4` },

  // Boats to Save People
  { signature: 'Boats to Save People', description: 'Pair heaviest with lightest if possible. Two pointers after sorting.', complexity: 'O(n log n)', section: 'Boats', example: `def num_rescue_boats(people, limit):
    """
    Each boat holds at most 2 people and weight <= limit.
    Return minimum number of boats.
    """
    people.sort()
    boats = 0
    left, right = 0, len(people) - 1

    while left <= right:
        # Try to pair heaviest (right) with lightest (left)
        if people[left] + people[right] <= limit:
            left += 1  # Lightest person fits
        right -= 1  # Heaviest person always goes
        boats += 1

    return boats

# Example: people = [3, 2, 2, 1], limit = 3
# Sorted: [1, 2, 2, 3]
# Boat 1: 1 + ?, try 3: 1+3=4 > 3, so just 3
# Boat 2: 1 + ?, try 2: 1+2=3 <= 3, pair them
# Boat 3: 2 alone
# Total: 3 boats

# GREEDY INSIGHT: Always try to pair heaviest with lightest
# If lightest can't fit with heaviest, no one can` },

  // Queue Reconstruction
  { signature: 'Queue Reconstruction by Height', description: 'People have height h and count k of taller people in front. Sort and insert.', complexity: 'O(n^2)', section: 'Queue', example: `def reconstruct_queue(people):
    """
    people[i] = [h, k] where h is height and k is
    number of people in front who are taller or equal.
    Return reconstructed queue.
    """
    # Sort by height (descending), then by k (ascending)
    people.sort(key=lambda x: (-x[0], x[1]))

    result = []
    for person in people:
        # Insert at index k (k taller people in front)
        result.insert(person[1], person)

    return result

# Example: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
# Sorted: [[7,0],[7,1],[6,1],[5,0],[5,2],[4,4]]
# Insert [7,0] at index 0: [[7,0]]
# Insert [7,1] at index 1: [[7,0],[7,1]]
# Insert [6,1] at index 1: [[7,0],[6,1],[7,1]]
# Insert [5,0] at index 0: [[5,0],[7,0],[6,1],[7,1]]
# Insert [5,2] at index 2: [[5,0],[7,0],[5,2],[6,1],[7,1]]
# Insert [4,4] at index 4: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]

# WHY IT WORKS: Process tallest first, they don't care
# about shorter people. Shorter people insert without
# disrupting taller people's k values.` },

  // Assign Cookies
  { signature: 'Assign Cookies', description: 'Match greedy children with smallest sufficient cookies. Sort both arrays.', complexity: 'O(n log n)', section: 'Assign', example: `def find_content_children(g, s):
    """
    g[i] = greed factor of child i
    s[j] = size of cookie j
    Return max number of content children.
    """
    g.sort()  # Children by greed
    s.sort()  # Cookies by size

    child = 0
    cookie = 0

    while child < len(g) and cookie < len(s):
        if s[cookie] >= g[child]:
            # Cookie satisfies child
            child += 1
        cookie += 1  # Try next cookie

    return child

# Example: g = [1, 2, 3], s = [1, 1]
# Sorted g: [1, 2, 3], s: [1, 1]
# cookie[0]=1 >= g[0]=1: satisfied, child=1
# cookie[1]=1 < g[1]=2: not satisfied, try next cookie
# No more cookies, return 1

# GREEDY INSIGHT: Give smallest sufficient cookie to each child
# This saves larger cookies for greedier children` },

  // Non-overlapping Intervals
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

  // Minimum Arrows
  { signature: 'Minimum Arrows to Burst Balloons', description: 'Find minimum points to hit all intervals. Track rightmost left boundary.', complexity: 'O(n log n)', section: 'Min Arrows', example: `def find_min_arrow_shots(points):
    """
    points[i] = [start, end] of balloon i
    Arrow at x bursts all balloons where start <= x <= end
    Return minimum arrows to burst all.
    """
    if not points:
        return 0

    # Sort by end position
    points.sort(key=lambda x: x[1])

    arrows = 1
    arrow_pos = points[0][1]  # Shoot at end of first balloon

    for start, end in points[1:]:
        if start > arrow_pos:  # Arrow can't reach this balloon
            arrows += 1
            arrow_pos = end

    return arrows

# Example: points = [[10,16],[2,8],[1,6],[7,12]]
# Sorted by end: [[1,6],[2,8],[7,12],[10,16]]
# Arrow 1 at 6: bursts [1,6] and [2,8]
# Arrow 2 at 12: bursts [7,12] and [10,16]
# Total: 2 arrows

# WHY SORT BY END?
# Shooting at the rightmost point of earliest-ending balloon
# maximizes chance of hitting other balloons` },

  // Meeting Rooms II
  { signature: 'Meeting Rooms II', description: 'Minimum conference rooms needed. Track overlapping meetings with heap or sweep line.', complexity: 'O(n log n)', section: 'Meeting Rooms', example: `def min_meeting_rooms(intervals):
    """
    intervals[i] = [start, end] of meeting i
    Return minimum meeting rooms required.
    """
    import heapq

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

# Alternative: Sweep line approach
def min_meeting_rooms_sweep(intervals):
    events = []
    for start, end in intervals:
        events.append((start, 1))   # Meeting starts
        events.append((end, -1))    # Meeting ends

    events.sort()

    rooms = 0
    max_rooms = 0
    for time, delta in events:
        rooms += delta
        max_rooms = max(max_rooms, rooms)

    return max_rooms` },

  // Best Time to Buy and Sell Stock II
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

  // Hand of Straights
  { signature: 'Hand of Straights / Split Array', description: 'Divide cards into groups of consecutive numbers. Use Counter and greedy.', complexity: 'O(n log n)', section: 'Straights', example: `def is_n_straight_hand(hand, group_size):
    """
    Can we divide hand into groups of group_size
    consecutive cards?
    """
    from collections import Counter

    if len(hand) % group_size != 0:
        return False

    count = Counter(hand)

    for card in sorted(count):
        if count[card] > 0:
            # Start a group with this card
            num_groups = count[card]
            for i in range(group_size):
                if count[card + i] < num_groups:
                    return False
                count[card + i] -= num_groups

    return True

# Example: hand = [1,2,3,6,2,3,4,7,8], group_size = 3
# count = {1:1, 2:2, 3:2, 4:1, 6:1, 7:1, 8:1}
# Start at 1: need [1,2,3], have them, decrement
# count = {1:0, 2:1, 3:1, 4:1, 6:1, 7:1, 8:1}
# Start at 2: need [2,3,4], have them, decrement
# count = {2:0, 3:0, 4:0, 6:1, 7:1, 8:1}
# Start at 6: need [6,7,8], have them, decrement
# All used, return True` },
]
