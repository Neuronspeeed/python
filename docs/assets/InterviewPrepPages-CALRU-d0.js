import{c as e,r as t,t as n}from"./index-Dfa-XKD4.js";import{n as r}from"./learn-Cv_zenSA.js";const i=[{signature:`Why use Greedy?`,description:`Make locally optimal choice at each step hoping to find global optimum. Works when problem has greedy choice property + optimal substructure.`,complexity:`Concept`,section:`Why & When`,example:`# GREEDY ALGORITHM CHARACTERISTICS:
#
# 1. Greedy Choice Property:
#    - Locally optimal choice leads to globally optimal solution
#    - Never reconsider previous choices
#
# 2. Optimal Substructure:
#    - Optimal solution contains optimal solutions to subproblems
#
# WHEN TO USE GREEDY:
# - Activity selection, interval scheduling
# - Huffman coding
# - Minimum spanning trees (Kruskal, Prim)
# - Dijkstra's shortest path
# - Fractional knapsack
#
# WHEN NOT TO USE:
# - 0/1 Knapsack (need DP)
# - Longest path in general graphs
# - Problems requiring backtracking

# Core principle: If choosing the "best" option now
# never prevents finding the optimal solution later,
# use greedy!`},{signature:`Greedy vs DP`,description:`Greedy makes one choice and moves on. DP explores all choices. Greedy is faster but only works for specific problems.`,complexity:`Concept`,section:`Why & When`,example:`# GREEDY vs DYNAMIC PROGRAMMING
#
# Greedy:
# - Makes one choice per subproblem
# - Never reconsiders choices
# - O(n) or O(n log n) typically
# - Proof of correctness needed
#
# Dynamic Programming:
# - Explores all choices
# - Stores results for reuse
# - O(n^2) or O(n*W) typically
# - Always finds optimal if applicable

# EXAMPLE: Coin Change
# Coins = [1, 5, 10, 25], Amount = 30

# Greedy approach (works for US coins):
# 25 + 5 = 2 coins (OPTIMAL)

# But for coins = [1, 3, 4], amount = 6:
# Greedy: 4 + 1 + 1 = 3 coins
# DP: 3 + 3 = 2 coins (OPTIMAL)

# Greedy FAILS when local optimum != global optimum

def can_use_greedy(problem):
    """
    Ask yourself:
    1. Does taking the best option now ever block
       finding the best solution later?
    2. Can I prove greedy choice is always safe?
    """
    pass`},{signature:`Greedy Template`,description:`Sort by some criteria, then iterate making locally optimal choices.`,complexity:`O(n log n)`,section:`Why & When`,example:`# GREEDY TEMPLATE
def greedy_algorithm(items):
    # Step 1: Sort by relevant criteria
    items.sort(key=lambda x: x.some_property)

    result = []
    current_state = initial_state

    # Step 2: Iterate and make greedy choice
    for item in items:
        if can_include(item, current_state):
            result.append(item)
            current_state = update_state(current_state, item)

    return result

# COMMON SORTING CRITERIA:
# - End time (interval scheduling)
# - Ratio value/weight (fractional knapsack)
# - Deadline (job scheduling)
# - Start time (some meeting problems)
# - Size/weight (bin packing heuristics)`},{signature:`Activity Selection Problem`,description:`Select maximum non-overlapping activities. Classic greedy: sort by end time, always pick earliest ending.`,complexity:`O(n log n)`,section:`Activity Selection`,example:`def activity_selection(activities):
    """
    activities: list of (start, end) tuples
    Returns: maximum number of non-overlapping activities
    """
    # Sort by end time (CRITICAL!)
    activities.sort(key=lambda x: x[1])

    selected = [activities[0]]
    last_end = activities[0][1]

    for start, end in activities[1:]:
        if start >= last_end:  # No overlap
            selected.append((start, end))
            last_end = end

    return selected

# Example:
# activities = [(1,3), (2,5), (4,6), (6,8), (5,7), (8,9)]
# Sorted by end: [(1,3), (2,5), (4,6), (5,7), (6,8), (8,9)]
# Selected: [(1,3), (4,6), (6,8), (8,9)] = 4 activities

# WHY SORT BY END TIME?
# Finishing earliest leaves most room for future activities
# This is the greedy choice that's provably optimal`},{signature:`Weighted Activity Selection`,description:`Activities have weights/values. Need DP, not pure greedy.`,complexity:`O(n log n)`,section:`Activity Selection`,example:`def weighted_activity_selection(activities):
    """
    activities: list of (start, end, weight)
    Returns: maximum total weight of non-overlapping activities

    This requires DP because greedy doesn't work!
    """
    n = len(activities)
    # Sort by end time
    activities.sort(key=lambda x: x[1])

    # Find latest non-conflicting activity for each
    def find_last_non_conflict(idx):
        for j in range(idx - 1, -1, -1):
            if activities[j][1] <= activities[idx][0]:
                return j
        return -1

    # DP: dp[i] = max weight using activities 0..i
    dp = [0] * n
    dp[0] = activities[0][2]

    for i in range(1, n):
        include = activities[i][2]
        j = find_last_non_conflict(i)
        if j != -1:
            include += dp[j]
        dp[i] = max(dp[i-1], include)

    return dp[n-1]

# Note: Can optimize find_last_non_conflict with binary search`},{signature:`Jump Game I`,description:`Can you reach the last index? Track maximum reachable position.`,complexity:`O(n)`,section:`Jump Game`,example:`def can_jump(nums):
    """
    nums[i] = max jump length from position i
    Return True if can reach last index
    """
    max_reach = 0

    for i, jump in enumerate(nums):
        # Can't reach this position
        if i > max_reach:
            return False
        # Update maximum reachable position
        max_reach = max(max_reach, i + jump)
        # Early termination
        if max_reach >= len(nums) - 1:
            return True

    return True

# Example:
# nums = [2, 3, 1, 1, 4]
# i=0: max_reach = 0+2 = 2
# i=1: max_reach = max(2, 1+3) = 4 >= 4, return True

# nums = [3, 2, 1, 0, 4]
# i=0: max_reach = 3
# i=1: max_reach = max(3, 3) = 3
# i=2: max_reach = max(3, 3) = 3
# i=3: max_reach = max(3, 3) = 3
# i=4: i(4) > max_reach(3), return False`},{signature:`Jump Game II`,description:`Minimum jumps to reach end. Track current jump range and next range.`,complexity:`O(n)`,section:`Jump Game`,example:`def jump(nums):
    """
    Return minimum number of jumps to reach last index.
    Guaranteed you can reach the end.
    """
    if len(nums) <= 1:
        return 0

    jumps = 0
    current_end = 0    # End of current jump range
    farthest = 0       # Farthest we can reach

    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])

        # Must jump when reaching end of current range
        if i == current_end:
            jumps += 1
            current_end = farthest

            # Early termination
            if current_end >= len(nums) - 1:
                break

    return jumps

# Example: nums = [2, 3, 1, 1, 4]
# i=0: farthest=2, i==current_end(0), jumps=1, current_end=2
# i=1: farthest=4, not at current_end yet
# i=2: farthest=4, i==current_end(2), jumps=2, current_end=4
# Answer: 2 jumps (0->1->4)

# GREEDY INSIGHT: Always jump to position that maximizes
# next jump's reach, not necessarily the farthest position`},{signature:`Jump Game III`,description:`Can reach index with value 0? BFS/DFS from start position.`,complexity:`O(n)`,section:`Jump Game`,example:`def can_reach(arr, start):
    """
    From index i, can jump to i+arr[i] or i-arr[i].
    Return True if can reach any index with value 0.
    """
    n = len(arr)
    visited = set()

    def dfs(i):
        if i < 0 or i >= n or i in visited:
            return False
        if arr[i] == 0:
            return True

        visited.add(i)
        return dfs(i + arr[i]) or dfs(i - arr[i])

    return dfs(start)

# BFS version (often preferred for shortest path)
from collections import deque

def can_reach_bfs(arr, start):
    n = len(arr)
    visited = set([start])
    queue = deque([start])

    while queue:
        i = queue.popleft()
        if arr[i] == 0:
            return True

        for next_i in [i + arr[i], i - arr[i]]:
            if 0 <= next_i < n and next_i not in visited:
                visited.add(next_i)
                queue.append(next_i)

    return False`}],a=[{signature:`When greedy works`,description:`Pattern: local optimal leads to global optimal. Recognize by: sorting helps, no future dependencies. Greedy often simpler than DP. But prove correctness!`,complexity:`Concept`,section:`Why & When`,example:`# GREEDY WORKS WHEN:
# 1. Greedy choice property
#    Local optimal → global optimal
# 2. Optimal substructure
#    Optimal solution contains optimal subsolutions

# CLASSIC GREEDY PROBLEMS:
# - Activity selection (max non-overlapping)
# - Huffman coding (min encoding)
# - Fractional knapsack (take highest value/weight)
# - Minimum spanning tree (Kruskal, Prim)
# - Dijkstra's algorithm (shortest path)

# GREEDY FAILS WHEN:
# - 0/1 Knapsack (need DP)
# - Longest increasing subsequence (need DP)
# - Coin change with arbitrary denominations (need DP)

# Example: Coin Change
# Coins = [1, 5, 10, 25], amount = 30
# Greedy: 25 + 5 = 2 coins - (works!)

# Coins = [1, 3, 4], amount = 6
# Greedy: 4 + 1 + 1 = 3 coins
# Optimal: 3 + 3 = 2 coins
# Greedy FAILS! Need DP.

# HOW TO VERIFY GREEDY:
# 1. Sort by some criterion
# 2. Make greedy choice (local optimal)
# 3. Prove: any optimal includes this choice OR
#          can be modified to include it
# 4. Solve remaining subproblem

# GREEDY vs DP:
# Greedy: O(n log n) (sort + scan)
# DP: O(n²) or worse
# Use greedy when it works (faster!)`},{signature:`Common greedy patterns`,description:`Earliest deadline first. Sort by end time. Exchange argument proof. Maximize/minimize with constraints. Learn patterns to recognize greedy problems.`,complexity:`Concept`,section:`Why & When`,example:`# PATTERN 1: Earliest Deadline First
# Activity selection: Sort by END time, pick earliest
intervals.sort(key=lambda x: x[1])  # By end
selected = [intervals[0]]
end = intervals[0][1]
for start, e in intervals[1:]:
    if start >= end:
        selected.append([start, e])
        end = e

# PATTERN 2: Latest Start Time
# Task scheduling: Do tasks closest to deadline last
tasks.sort(key=lambda x: x.deadline, reverse=True)

# PATTERN 3: Maximize/Minimize Locally
# Gas station: If can't reach from i, start from i+1
total_gas = 0
current_gas = 0
start = 0
for i in range(n):
    total_gas += gas[i] - cost[i]
    current_gas += gas[i] - cost[i]
    if current_gas < 0:
        start = i + 1  # Greedy: reset
        current_gas = 0

# PATTERN 4: Huffman/Priority Queue
# Always pick two smallest, combine
import heapq
heap = list(nums)
heapq.heapify(heap)
while len(heap) > 1:
    a = heapq.heappop(heap)
    b = heapq.heappop(heap)
    heapq.heappush(heap, a + b)

# PATTERN 5: Two Pointers Greedy
# Assign smallest to smallest, largest to largest
children.sort()
cookies.sort()
i = j = 0
while i < len(children) and j < len(cookies):
    if cookies[j] >= children[i]:
        i += 1  # Satisfied
    j += 1

# PROOF TECHNIQUE: Exchange Argument
# Assume optimal doesn't use greedy choice
# Show: can swap to use greedy choice without worse result
# → Greedy is optimal!`},{signature:`Gas Station`,description:`Find starting station to complete circuit. Track total gas and current tank.`,complexity:`O(n)`,section:`Gas Station`,example:`def can_complete_circuit(gas, cost):
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
# reach j from any station between i and j.`},{signature:`Task Scheduler`,description:`Schedule tasks with cooldown. Greedy: schedule most frequent tasks first.`,complexity:`O(n)`,section:`Task Scheduler`,example:`def least_interval(tasks, n):
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
# Schedule: A B A B A B (no idle needed)`},{signature:`Partition Labels`,description:`Split string so each letter appears in at most one part. Track last occurrence of each char.`,complexity:`O(n)`,section:`Partition Labels`,example:`def partition_labels(s):
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
# Result: [9, 7, 8]`},{signature:`Candy Distribution`,description:`Give candies so higher-rated child gets more than neighbors. Two-pass greedy.`,complexity:`O(n)`,section:`Candy`,example:`def candy(ratings):
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
# Total: 4`},{signature:`Boats to Save People`,description:`Pair heaviest with lightest if possible. Two pointers after sorting.`,complexity:`O(n log n)`,section:`Boats`,example:`def num_rescue_boats(people, limit):
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
# If lightest can't fit with heaviest, no one can`},{signature:`Queue Reconstruction by Height`,description:`People have height h and count k of taller people in front. Sort and insert.`,complexity:`O(n^2)`,section:`Queue`,example:`def reconstruct_queue(people):
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
# disrupting taller people's k values.`},{signature:`Assign Cookies`,description:`Match greedy children with smallest sufficient cookies. Sort both arrays.`,complexity:`O(n log n)`,section:`Assign`,example:`def find_content_children(g, s):
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
# This saves larger cookies for greedier children`},{signature:`Non-overlapping Intervals`,description:`Minimum removals to make non-overlapping. Same as max non-overlapping (activity selection).`,complexity:`O(n log n)`,section:`Non-overlapping`,example:`def erase_overlap_intervals(intervals):
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
# Keep 3, remove 1`},{signature:`Minimum Arrows to Burst Balloons`,description:`Find minimum points to hit all intervals. Track rightmost left boundary.`,complexity:`O(n log n)`,section:`Min Arrows`,example:`def find_min_arrow_shots(points):
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
# maximizes chance of hitting other balloons`},{signature:`Meeting Rooms II`,description:`Minimum conference rooms needed. Track overlapping meetings with heap or sweep line.`,complexity:`O(n log n)`,section:`Meeting Rooms`,example:`def min_meeting_rooms(intervals):
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

    return max_rooms`},{signature:`Best Time to Buy Stock II`,description:`Unlimited transactions allowed. Collect every upward price movement.`,complexity:`O(n)`,section:`Stock`,example:`def max_profit(prices):
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
# But simpler: just sum all positive differences`},{signature:`Hand of Straights / Split Array`,description:`Divide cards into groups of consecutive numbers. Use Counter and greedy.`,complexity:`O(n log n)`,section:`Straights`,example:`def is_n_straight_hand(hand, group_size):
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
# All used, return True`}],o=[...i,...a],s=[{signature:`Why Intervals?`,description:`Intervals represent ranges [start, end]. Common in scheduling, calendar, and range query problems. Key insight: sort by start or end time.`,complexity:`Concept`,section:`Why & When`,example:`# INTERVAL PROBLEMS OVERVIEW
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
    return [max(int1[0], int2[0]), min(int1[1], int2[1])]`},{signature:`Interval Sorting`,description:`Sort by start time for merging, by end time for greedy selection. Sorting is almost always the first step.`,complexity:`O(n log n)`,section:`Why & When`,example:`# SORTING STRATEGIES
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
# - Start then -end: Remove covered intervals`},{signature:`Sweep Line Concept`,description:`Process events (starts/ends) in sorted order. Track active count or state. Essential for meeting rooms, max overlap.`,complexity:`O(n log n)`,section:`Why & When`,example:`# SWEEP LINE TECHNIQUE
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
# - Point with max coverage`},{signature:`Merge Intervals`,description:`Combine overlapping intervals. Sort by start, extend end if overlap, else add new interval.`,complexity:`O(n log n)`,section:`Merge Intervals`,example:`def merge(intervals):
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
# Result: [[1,6], [8,10], [15,18]]`},{signature:`Merge Intervals (In-Place)`,description:`Modify input array in place to save space. Use write pointer technique.`,complexity:`O(n log n) time, O(1) space`,section:`Merge Intervals`,example:`def merge_in_place(intervals):
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
# Only O(log n) for sorting, O(1) extra space`},{signature:`Insert Interval`,description:`Insert new interval into sorted non-overlapping list, merging if necessary. Three-phase approach.`,complexity:`O(n)`,section:`Insert Interval`,example:`def insert(intervals, new_interval):
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
# Result: [[1,5], [6,9]]`},{signature:`Insert Interval (Binary Search)`,description:`Use binary search to find insertion point for very large interval lists.`,complexity:`O(n) overall, O(log n) search`,section:`Insert Interval`,example:`import bisect

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
# but merging still requires O(n) in worst case`},{signature:`Remove Covered Intervals`,description:`Remove intervals completely covered by another. Sort by start asc, end desc.`,complexity:`O(n log n)`,section:`Insert Interval`,example:`def remove_covered_intervals(intervals):
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
# [1,10] first so [1,4] is correctly marked as covered`}],c=[{signature:`Interval scheduling patterns`,description:`Key insight: sort first! By start for overlap check, by end for greedy selection. Sweep line for concurrent count. Pattern recognition critical.`,complexity:`Concept`,section:`Why & When`,example:`# INTERVAL PROBLEM PATTERNS

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
# Why? Picking earliest end leaves most room for future`},{signature:`Meeting Rooms I`,description:`Can a person attend all meetings? Check if any intervals overlap.`,complexity:`O(n log n)`,section:`Meeting Rooms`,example:`def can_attend_meetings(intervals):
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
# Return True`},{signature:`Meeting Rooms II`,description:`Minimum rooms needed. Use min-heap to track room end times or sweep line.`,complexity:`O(n log n)`,section:`Meeting Rooms`,example:`import heapq

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
# Answer: 2 rooms`},{signature:`My Calendar I`,description:`Book appointments without double booking. Store and check intervals.`,complexity:`O(n) per booking`,section:`Calendar`,example:`class MyCalendar:
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
        return True`},{signature:`My Calendar II`,description:`Allow double booking but not triple. Track single and double bookings separately.`,complexity:`O(n) per booking`,section:`Calendar`,example:`class MyCalendarTwo:
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
# book(5, 15) -> False, would triple-book [10,15)`},{signature:`My Calendar III`,description:`Return max concurrent bookings. Use sweep line with sorted events.`,complexity:`O(n log n) per booking`,section:`Calendar`,example:`from collections import defaultdict
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
        return max_k`}],l=[{signature:`Interval List Intersections`,description:`Find all intersections between two sorted interval lists. Two pointer approach.`,complexity:`O(m + n)`,section:`Overlapping`,example:`def interval_intersection(A, B):
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
# Result: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]`},{signature:`Non-overlapping Intervals`,description:`Minimum removals to make all intervals non-overlapping. Greedy: keep earliest ending.`,complexity:`O(n log n)`,section:`Overlapping`,example:`def erase_overlap_intervals(intervals):
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
# Earliest ending interval leaves most room for others`},{signature:`Minimum Arrows to Burst Balloons`,description:`Find minimum points to hit all intervals. Track common overlap region.`,complexity:`O(n log n)`,section:`Overlapping`,example:`def find_min_arrow_shots(points):
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
# Each arrow = one "activity" we're selecting`},{signature:`Minimum Platforms`,description:`Minimum train platforms needed at a station. Classic sweep line problem.`,complexity:`O(n log n)`,section:`Platforms`,example:`def min_platforms(arrivals, departures):
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
# Max concurrent: 3 platforms needed`},{signature:`Maximum CPU Load`,description:`Find maximum CPU load at any time given jobs with start, end, load.`,complexity:`O(n log n)`,section:`Platforms`,example:`def max_cpu_load(jobs):
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

    return max_load`},{signature:`Employee Free Time`,description:`Find common free intervals for all employees. Merge all busy times, find gaps.`,complexity:`O(n log n)`,section:`Platforms`,example:`def employee_free_time(schedules):
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
# Free: [[5,6], [7,9]]`},{signature:`Range Module`,description:`Add/query/remove ranges dynamically. Use sorted list of disjoint intervals.`,complexity:`O(n) per operation`,section:`Platforms`,example:`from sortedcontainers import SortedList

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
        )`}],u=[...s,...c,...l],d=[{signature:`Why functools?`,description:`Higher-order functions for functional programming. Use when: memoization (DP), function transformation, custom sorting.`,complexity:`Concept`,section:`Why & When`,example:`# FUNCTOOLS = Functional programming utilities
# Core tools: @lru_cache, reduce, partial, cmp_to_key

# USE CASES:
# 1. MEMOIZATION - #1 interview tool for DP
#    Convert O(2^n) to O(n) with one decorator
# 2. FUNCTION TRANSFORMATION - partial application, wrapping
# 3. CUSTOM SORTING - old-style cmp to key function
# 4. REDUCTION - reduce list to single value

# WHY @lru_cache IS INTERVIEW GOLD:
# Before: Manual DP with dictionary
memo = {}
def fib(n):
    if n in memo:
        return memo[n]
    if n < 2:
        return n
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]

# After: One decorator line
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

# WHEN TO USE:
# - DP problems (Fibonacci, climbing stairs, coin change)
# - Expensive function calls with repeated inputs
# - Recursive algorithms with overlapping subproblems
# - Performance optimization with minimal code

# WHEN NOT TO USE:
# - Arguments aren't hashable (lists, dicts)
# - Function has side effects (prints, modifies globals)
# - Cache would grow unbounded (use maxsize)
# - Need cache invalidation logic`},{signature:`functools vs manual implementation`,description:`Decorator is cleaner and faster. Use functools unless you need custom cache logic.`,complexity:`Concept`,section:`Why & When`,example:`# COMPARISON: Manual memoization vs @lru_cache

# Manual: More code, more bugs
class Solution:
    def __init__(self):
        self.memo = {}

    def helper(self, n):
        if n in self.memo:
            return self.memo[n]
        # ... compute result
        self.memo[n] = result
        return result

# functools: One line, battle-tested
from functools import lru_cache

class Solution:
    @lru_cache(maxsize=None)
    def helper(self, n):
        # ... compute result
        return result

# ADVANTAGES OF @lru_cache:
# 1. Less code → fewer bugs
# 2. Optimized C implementation → faster
# 3. cache_info() for debugging
# 4. Thread-safe by default
# 5. Handles edge cases (None, tuples, etc.)

# WHEN TO IMPLEMENT MANUALLY:
# - Need custom eviction policy
# - Cache key computation is complex
# - Need to inspect cache contents
# - Memory constraints require precise control
# - Educational purposes (interviews may ask)

# INTERVIEW TIP:
# Always start with @lru_cache for DP
# Only switch to manual if requirements demand it`},{signature:`@lru_cache`,description:`Memoize function results. Essential for DP and recursive optimization. Caches based on arguments.`,complexity:`O(1) lookup`,section:`Memoization`,example:`from functools import lru_cache

# Basic usage - memoize recursive function
@lru_cache(maxsize=None)  # None = unlimited cache
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Without cache: O(2^n)
# With cache: O(n)
print(fibonacci(100))  # Instant!

# With size limit
@lru_cache(maxsize=128)
def expensive_computation(x, y):
    return x ** y

# Cache info
print(fibonacci.cache_info())
# CacheInfo(hits=98, misses=101, maxsize=None, currsize=101)

# Clear cache
fibonacci.cache_clear()

# IMPORTANT: Arguments must be hashable!
# Lists, dicts won't work - use tuples instead
@lru_cache
def process(items):  # items must be tuple, not list
    return sum(items)

process((1, 2, 3))  # OK
# process([1, 2, 3])  # Error! Lists aren't hashable`},{signature:`@cache`,description:`Python 3.9+ shorthand for @lru_cache(maxsize=None). Simpler syntax for unlimited cache.`,complexity:`O(1) lookup`,section:`Memoization`,example:`from functools import cache  # Python 3.9+

# Equivalent to @lru_cache(maxsize=None)
@cache
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Perfect for interview DP problems!
@cache
def climb_stairs(n):
    """Number of ways to climb n stairs (1 or 2 steps)."""
    if n <= 2:
        return n
    return climb_stairs(n - 1) + climb_stairs(n - 2)

@cache
def coin_change(coins, amount):
    """Minimum coins needed. coins must be tuple!"""
    if amount == 0:
        return 0
    if amount < 0:
        return float('inf')

    min_coins = float('inf')
    for coin in coins:
        result = coin_change(coins, amount - coin)
        min_coins = min(min_coins, result + 1)

    return min_coins

# Usage: coin_change((1, 5, 10, 25), 63)`},{signature:`@lru_cache with typed_cache`,description:`Control whether different arg types share cache. typed=True separates int 3 from float 3.0.`,complexity:`O(1) lookup`,section:`Memoization`,example:`from functools import lru_cache

# Default: 3 and 3.0 share same cache entry
@lru_cache(maxsize=32)
def compute(x):
    print(f"Computing for {x} (type: {type(x).__name__})")
    return x * 2

compute(3)    # Computing for 3 (type: int)
compute(3.0)  # Uses cached result from 3

# With typed=True: separate cache for different types
@lru_cache(maxsize=32, typed=True)
def compute_typed(x):
    print(f"Computing for {x} (type: {type(x).__name__})")
    return x * 2

compute_typed(3)    # Computing for 3 (type: int)
compute_typed(3.0)  # Computing for 3.0 (type: float)

# PRACTICAL USE: When int/float distinction matters
@lru_cache(maxsize=1000, typed=True)
def divide_safely(a, b):
    if b == 0:
        return None
    return a / b  # Different result for int vs float division`},{signature:`reduce()`,description:`Apply function cumulatively to sequence. Reduce list to single value.`,complexity:`O(n)`,section:`Reduction`,example:`from functools import reduce

# Basic: reduce list to single value
nums = [1, 2, 3, 4, 5]

# Sum (but use sum() instead!)
total = reduce(lambda acc, x: acc + x, nums)
# 15

# Product
product = reduce(lambda acc, x: acc * x, nums)
# 120

# With initial value
product_with_init = reduce(lambda acc, x: acc * x, nums, 10)
# 10 * 1 * 2 * 3 * 4 * 5 = 1200

# Find max (but use max() instead!)
maximum = reduce(lambda a, b: a if a > b else b, nums)

# Practical uses
# 1. Flatten nested list
nested = [[1, 2], [3, 4], [5]]
flat = reduce(lambda acc, lst: acc + lst, nested, [])
# [1, 2, 3, 4, 5]

# 2. Build dict from pairs
pairs = [('a', 1), ('b', 2), ('c', 3)]
d = reduce(lambda acc, p: {**acc, p[0]: p[1]}, pairs, {})
# {'a': 1, 'b': 2, 'c': 3}

# 3. GCD of list
from math import gcd
numbers = [12, 18, 24]
result = reduce(gcd, numbers)  # 6`},{signature:`partial()`,description:`Create new function with some arguments pre-filled. Useful for callbacks and currying.`,complexity:`O(1)`,section:`Partial`,example:`from functools import partial

# Basic partial application
def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))  # 25
print(cube(5))    # 125

# Pre-fill first argument
def greet(greeting, name):
    return f"{greeting}, {name}!"

say_hello = partial(greet, "Hello")
say_goodbye = partial(greet, "Goodbye")

print(say_hello("Alice"))   # "Hello, Alice!"
print(say_goodbye("Bob"))   # "Goodbye, Bob!"

# Practical: Configure logging
import logging
def log_message(level, category, message):
    print(f"[{level}] {category}: {message}")

error_log = partial(log_message, "ERROR")
auth_error = partial(error_log, "AUTH")

auth_error("Invalid password")
# [ERROR] AUTH: Invalid password

# With sorted() key functions
data = [{'name': 'Alice', 'age': 30}, {'name': 'Bob', 'age': 25}]
get_field = lambda field, d: d[field]
by_age = partial(get_field, 'age')
sorted_data = sorted(data, key=lambda d: get_field('age', d))`},{signature:`cmp_to_key()`,description:`Convert old-style comparison function to key function. For complex custom sorting.`,complexity:`O(n log n)`,section:`Sorting`,example:`from functools import cmp_to_key

# Old-style comparator: returns -1, 0, or 1
def compare(a, b):
    if a < b:
        return -1
    elif a > b:
        return 1
    return 0

# Convert to key function
nums = [3, 1, 4, 1, 5, 9]
sorted_nums = sorted(nums, key=cmp_to_key(compare))

# INTERVIEW CLASSIC: Largest Number
# Arrange numbers to form largest number
def largest_number(nums):
    def compare(x, y):
        # Compare concatenations: "9" + "34" vs "34" + "9"
        if x + y > y + x:
            return -1  # x should come first
        elif x + y < y + x:
            return 1   # y should come first
        return 0

    strs = [str(n) for n in nums]
    strs.sort(key=cmp_to_key(compare))

    # Handle edge case: all zeros
    if strs[0] == '0':
        return '0'
    return ''.join(strs)

print(largest_number([3, 30, 34, 5, 9]))  # "9534330"

# Custom object sorting
class Task:
    def __init__(self, priority, deadline):
        self.priority = priority
        self.deadline = deadline

def task_compare(t1, t2):
    # Higher priority first, then earlier deadline
    if t1.priority != t2.priority:
        return t2.priority - t1.priority
    return t1.deadline - t2.deadline

tasks = [Task(2, 10), Task(1, 5), Task(2, 8)]
tasks.sort(key=cmp_to_key(task_compare))`},{signature:`@total_ordering`,description:`Generate all comparison methods from __eq__ and one of __lt__, __le__, __gt__, __ge__.`,complexity:`O(1)`,section:`Sorting`,example:`from functools import total_ordering

@total_ordering
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

    def __eq__(self, other):
        return self.grade == other.grade

    def __lt__(self, other):
        return self.grade < other.grade

    # @total_ordering provides: __le__, __gt__, __ge__

s1 = Student("Alice", 85)
s2 = Student("Bob", 90)

print(s1 < s2)   # True
print(s1 <= s2)  # True (auto-generated)
print(s1 > s2)   # False (auto-generated)
print(s1 >= s2)  # False (auto-generated)
print(s1 == s2)  # False

# Now works with sorted()!
students = [Student("A", 85), Student("B", 90), Student("C", 78)]
sorted_students = sorted(students)  # Sorted by grade

# Practical: Priority queue item
@total_ordering
class Task:
    def __init__(self, priority, name):
        self.priority = priority
        self.name = name

    def __eq__(self, other):
        return self.priority == other.priority

    def __lt__(self, other):
        return self.priority < other.priority  # Lower = higher priority

import heapq
tasks = [Task(3, "Low"), Task(1, "High"), Task(2, "Medium")]
heapq.heapify(tasks)
print(heapq.heappop(tasks).name)  # "High"`},{signature:`@wraps()`,description:`Preserve function metadata when wrapping with decorator. Essential for debugging.`,complexity:`O(1)`,section:`Wrapping`,example:`from functools import wraps
import time

# WITHOUT @wraps - loses original function info
def timer_bad(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Took {time.time() - start:.3f}s")
        return result
    return wrapper

# WITH @wraps - preserves function info
def timer_good(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Took {time.time() - start:.3f}s")
        return result
    return wrapper

@timer_good
def slow_function():
    """This is a slow function."""
    time.sleep(0.1)

print(slow_function.__name__)  # "slow_function" (not "wrapper")
print(slow_function.__doc__)   # "This is a slow function."

# Generic decorator template
def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Before
        result = func(*args, **kwargs)
        # After
        return result
    return wrapper`},{signature:`singledispatch`,description:`Single-dispatch generic function. Method overloading based on first argument type.`,complexity:`O(1)`,section:`Wrapping`,example:`from functools import singledispatch

@singledispatch
def process(data):
    """Default handler for unknown types."""
    raise NotImplementedError(f"Cannot process {type(data)}")

@process.register(int)
def _(data):
    return f"Integer: {data * 2}"

@process.register(str)
def _(data):
    return f"String: {data.upper()}"

@process.register(list)
def _(data):
    return f"List with {len(data)} items"

print(process(42))        # "Integer: 84"
print(process("hello"))   # "String: HELLO"
print(process([1, 2, 3])) # "List with 3 items"

# Type hints work too (Python 3.7+)
@process.register
def _(data: dict):
    return f"Dict with keys: {list(data.keys())}"

print(process({"a": 1}))  # "Dict with keys: ['a']"

# Check registered types
print(process.registry.keys())
# dict_keys([object, int, str, list, dict])`}],f=[{signature:`Why itertools?`,description:`Memory-efficient iterator algebra. Use when: combinatorics, infinite sequences, lazy evaluation, iterator chaining.`,complexity:`Concept`,section:`Why & When`,example:`# ITERTOOLS = Iterator building blocks
# Core tools: permutations, combinations, product, chain, groupby

# USE CASES:
# 1. COMBINATORICS - permutations, combinations, cartesian product
# 2. INFINITE ITERATORS - count, cycle, repeat
# 3. TERMINATING ITERATORS - accumulate, chain, compress, groupby
# 4. LAZY EVALUATION - process data without loading into memory

# WHY itertools BEATS MANUAL LOOPS:
# Manual nested loops (verbose, O(n!) space)
def get_permutations(items):
    result = []
    def backtrack(path, remaining):
        if not remaining:
            result.append(path[:])
            return
        for i, item in enumerate(remaining):
            backtrack(path + [item], remaining[:i] + remaining[i+1:])
    backtrack([], items)
    return result

# itertools (one line, O(1) space per iteration)
from itertools import permutations
result = list(permutations(items))

# INTERVIEW PATTERNS:
# - All permutations: permutations(arr)
# - All combinations: combinations(arr, k)
# - Cartesian product: product(arr1, arr2)
# - Running sum: accumulate(arr)
# - Group consecutive: groupby(arr)

# WHEN TO USE:
# - Need all permutations/combinations
# - Cartesian product of multiple lists
# - Infinite sequences (count for IDs)
# - Lazy processing of large datasets
# - Iterator chaining/flattening

# WHEN NOT TO USE:
# - Need specific permutation (use algorithm)
# - Result must be random (itertools is deterministic)
# - Need to modify elements during iteration`},{signature:`itertools vs manual loops`,description:`Built-in combinatorics are faster and cleaner. Use itertools unless you need custom logic.`,complexity:`Concept`,section:`Why & When`,example:`# COMPARISON: itertools vs manual

# 1. PERMUTATIONS
# Manual (recursive backtracking - 15+ lines):
def permute(nums):
    result = []
    def backtrack(path, remaining):
        if not remaining:
            result.append(path[:])
            return
        for i in range(len(remaining)):
            backtrack(
                path + [remaining[i]],
                remaining[:i] + remaining[i+1:]
            )
    backtrack([], nums)
    return result

# itertools (one line):
from itertools import permutations
result = [list(p) for p in permutations(nums)]

# 2. COMBINATIONS
# Manual (complex recursion):
def combine(n, k):
    result = []
    def backtrack(start, path):
        if len(path) == k:
            result.append(path[:])
            return
        for i in range(start, n + 1):
            backtrack(i + 1, path + [i])
    backtrack(1, [])
    return result

# itertools (one line):
from itertools import combinations
result = [list(c) for c in combinations(range(1, n+1), k)]

# 3. CARTESIAN PRODUCT
# Manual (nested loops):
result = []
for a in list1:
    for b in list2:
        for c in list3:
            result.append((a, b, c))

# itertools (one line):
from itertools import product
result = list(product(list1, list2, list3))

# PERFORMANCE:
# itertools is implemented in C - much faster!
# Memory: itertools yields one at a time (lazy)
# Manual: often builds full list in memory

# INTERVIEW TIP:
# Know when interviewer wants algorithm vs library
# "Implement permutations" → write backtracking
# "Generate all permutations" → use itertools`},{signature:`permutations()`,description:`All orderings of elements. Order matters, no repetition. n! permutations.`,complexity:`O(n!)`,section:`Combinatorics`,example:`from itertools import permutations

# All permutations of iterable
items = [1, 2, 3]
perms = list(permutations(items))
# [(1,2,3), (1,3,2), (2,1,3), (2,3,1), (3,1,2), (3,2,1)]
# 3! = 6 permutations

# Permutations of specific length
perms_2 = list(permutations(items, 2))
# [(1,2), (1,3), (2,1), (2,3), (3,1), (3,2)]
# P(3,2) = 6

# String permutations
word = "abc"
for p in permutations(word):
    print(''.join(p))  # abc, acb, bac, bca, cab, cba

# INTERVIEW: Generate all permutations
def all_permutations(nums):
    return [list(p) for p in permutations(nums)]

# INTERVIEW: Next Permutation (don't use itertools)
def next_permutation(nums):
    """Modify nums in-place to next lexicographic permutation."""
    i = len(nums) - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1
    if i >= 0:
        j = len(nums) - 1
        while nums[j] <= nums[i]:
            j -= 1
        nums[i], nums[j] = nums[j], nums[i]
    nums[i + 1:] = reversed(nums[i + 1:])`},{signature:`combinations()`,description:`All subsets of specific size. Order does not matter, no repetition. C(n,r) combinations.`,complexity:`O(C(n,r))`,section:`Combinatorics`,example:`from itertools import combinations

# Choose r items from n (order doesn't matter)
items = [1, 2, 3, 4]
combs = list(combinations(items, 2))
# [(1,2), (1,3), (1,4), (2,3), (2,4), (3,4)]
# C(4,2) = 6

# All subsets of size 3
combs_3 = list(combinations(items, 3))
# [(1,2,3), (1,2,4), (1,3,4), (2,3,4)]

# INTERVIEW: Generate all subsets
def all_subsets(nums):
    result = []
    for r in range(len(nums) + 1):
        result.extend(combinations(nums, r))
    return result

# INTERVIEW: Combination Sum (with size constraint)
def combination_sum(candidates, target, k):
    """Find combinations of k numbers that sum to target."""
    result = []
    for combo in combinations(candidates, k):
        if sum(combo) == target:
            result.append(list(combo))
    return result

# Practical: Find pairs with sum
def find_pairs_with_sum(nums, target):
    return [(a, b) for a, b in combinations(nums, 2) if a + b == target]

print(find_pairs_with_sum([1, 2, 3, 4, 5], 6))
# [(1, 5), (2, 4)]`},{signature:`combinations_with_replacement()`,description:`Combinations allowing same element multiple times. For "bags" or multisets.`,complexity:`O(C(n+r-1, r))`,section:`Combinatorics`,example:`from itertools import combinations_with_replacement

# Allow repeated elements
items = [1, 2, 3]
combs = list(combinations_with_replacement(items, 2))
# [(1,1), (1,2), (1,3), (2,2), (2,3), (3,3)]

# Dice rolls (order doesn't matter)
dice = [1, 2, 3, 4, 5, 6]
two_dice = list(combinations_with_replacement(dice, 2))
# All unique sums when rolling 2 dice

# INTERVIEW: Coin combinations
# How many ways to make amount with coins (unordered)?
def coin_combinations(coins, amount, num_coins):
    result = []
    for combo in combinations_with_replacement(coins, num_coins):
        if sum(combo) == amount:
            result.append(combo)
    return result

print(coin_combinations([1, 5, 10], 11, 2))
# [(1, 10)]

# Stars and bars: distribute n items into k bins
# combinations_with_replacement(range(k), n) gives distributions`},{signature:`product()`,description:`Cartesian product of iterables. Equivalent to nested for loops.`,complexity:`O(n^k)`,section:`Combinatorics`,example:`from itertools import product

# Cartesian product of two lists
colors = ['red', 'blue']
sizes = ['S', 'M', 'L']
variants = list(product(colors, sizes))
# [('red','S'), ('red','M'), ('red','L'),
#  ('blue','S'), ('blue','M'), ('blue','L')]

# Multiple iterables
a, b, c = [1, 2], [3, 4], [5, 6]
for x, y, z in product(a, b, c):
    print(x, y, z)  # 2 * 2 * 2 = 8 combinations

# Repeat parameter - same iterable multiple times
binary = list(product([0, 1], repeat=3))
# All 3-bit binary numbers: (0,0,0) to (1,1,1)

# INTERVIEW: Generate all passwords
def generate_passwords(chars, length):
    for combo in product(chars, repeat=length):
        yield ''.join(combo)

# Practical: Grid coordinates
rows = range(3)
cols = range(4)
for r, c in product(rows, cols):
    print(f"Cell ({r}, {c})")

# Replace nested loops
# Instead of:
# for i in range(n):
#     for j in range(m):
#         for k in range(p):
# Use:
# for i, j, k in product(range(n), range(m), range(p)):`},{signature:`accumulate()`,description:`Running totals or cumulative results. Like reduce but yields intermediate values.`,complexity:`O(n)`,section:`Accumulation`,example:`from itertools import accumulate
import operator

# Running sum (prefix sum)
nums = [1, 2, 3, 4, 5]
prefix_sum = list(accumulate(nums))
# [1, 3, 6, 10, 15]

# Running product
prefix_product = list(accumulate(nums, operator.mul))
# [1, 2, 6, 24, 120]

# Running maximum
data = [3, 1, 4, 1, 5, 9, 2, 6]
running_max = list(accumulate(data, max))
# [3, 3, 4, 4, 5, 9, 9, 9]

# Running minimum
running_min = list(accumulate(data, min))
# [3, 1, 1, 1, 1, 1, 1, 1]

# Custom function
def concat(a, b):
    return a + [b]
nested = list(accumulate([1, 2, 3], concat, initial=[]))
# [[], [1], [1, 2], [1, 2, 3]]

# INTERVIEW: Range sum queries with prefix sum
class RangeSumQuery:
    def __init__(self, nums):
        self.prefix = [0] + list(accumulate(nums))

    def sum_range(self, left, right):
        return self.prefix[right + 1] - self.prefix[left]

# Example: [1, 2, 3, 4]
# prefix: [0, 1, 3, 6, 10]
# sum(1, 3) = prefix[4] - prefix[1] = 10 - 1 = 9`},{signature:`groupby()`,description:`Group consecutive elements by key. Data MUST be sorted by the same key first!`,complexity:`O(n)`,section:`Grouping`,example:`from itertools import groupby

# Group consecutive identical elements
data = [1, 1, 2, 2, 2, 3, 1, 1]
for key, group in groupby(data):
    print(key, list(group))
# 1 [1, 1]
# 2 [2, 2, 2]
# 3 [3]
# 1 [1, 1]  # Note: not merged with first 1s!

# MUST SORT FIRST for logical grouping
data = [1, 1, 2, 2, 2, 3, 1, 1]
data.sort()  # [1, 1, 1, 1, 2, 2, 2, 3]
for key, group in groupby(data):
    print(key, list(group))
# 1 [1, 1, 1, 1]
# 2 [2, 2, 2]
# 3 [3]

# Group by key function
words = ['apple', 'ant', 'banana', 'bee', 'cherry']
words.sort(key=lambda x: x[0])  # Sort by first letter first!
for letter, group in groupby(words, key=lambda x: x[0]):
    print(letter, list(group))
# a ['apple', 'ant']
# b ['banana', 'bee']
# c ['cherry']

# INTERVIEW: Compress string
def compress(s):
    """Compress "aaabbc" -> "a3b2c1" """
    return ''.join(f"{c}{len(list(g))}" for c, g in groupby(s))

print(compress("aaabbcc"))  # "a3b2c2"`},{signature:`chain()`,description:`Flatten one level of nesting. Iterate over multiple iterables as one.`,complexity:`O(n)`,section:`Chaining`,example:`from itertools import chain

# Chain multiple iterables
a = [1, 2, 3]
b = [4, 5]
c = [6, 7, 8, 9]

combined = list(chain(a, b, c))
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# More efficient than a + b + c (no intermediate lists)

# Chain string iterables
words = chain("hello", "world")
print(list(words))  # ['h','e','l','l','o','w','o','r','l','d']

# Flatten list of lists
nested = [[1, 2], [3, 4, 5], [6]]
flat = list(chain.from_iterable(nested))
# [1, 2, 3, 4, 5, 6]

# INTERVIEW: Flatten nested lists
def flatten(nested):
    return list(chain.from_iterable(nested))

# Practical: Merge sorted iterators
import heapq
def merge_sorted(*iterables):
    return heapq.merge(*iterables)
    # Or: sorted(chain(*iterables))

# Combine generators
def gen1():
    yield 1
    yield 2

def gen2():
    yield 3
    yield 4

for x in chain(gen1(), gen2()):
    print(x)  # 1, 2, 3, 4`},{signature:`islice()`,description:`Slice iterator without creating list. Memory efficient for large iterables.`,complexity:`O(stop)`,section:`Slicing`,example:`from itertools import islice

# Slice an iterator
nums = range(1000000)  # Very large

# Get first 5 elements
first_5 = list(islice(nums, 5))
# [0, 1, 2, 3, 4]

# Get elements from index 10 to 20
middle = list(islice(nums, 10, 20))
# [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

# Every 3rd element from first 30
every_3rd = list(islice(nums, 0, 30, 3))
# [0, 3, 6, 9, 12, 15, 18, 21, 24, 27]

# Skip first n elements
from itertools import islice
def skip(iterable, n):
    return islice(iterable, n, None)

skipped = list(skip(range(10), 3))
# [3, 4, 5, 6, 7, 8, 9]

# PRACTICAL: Read first n lines of huge file
def head(filename, n=10):
    with open(filename) as f:
        return list(islice(f, n))

# Get nth element of iterator
def nth(iterable, n, default=None):
    return next(islice(iterable, n, None), default)

print(nth(range(100), 42))  # 42`},{signature:`takewhile() / dropwhile()`,description:`Take/drop elements while predicate is True. Stops at first False.`,complexity:`O(n)`,section:`Slicing`,example:`from itertools import takewhile, dropwhile

# Take while condition is True
nums = [1, 3, 5, 7, 4, 2, 6, 8]

small = list(takewhile(lambda x: x < 6, nums))
# [1, 3, 5]  # Stops at 7 (first >= 6)

# Drop while condition is True (then take rest)
large = list(dropwhile(lambda x: x < 6, nums))
# [7, 4, 2, 6, 8]  # Starts at 7, takes everything after

# IMPORTANT: Only checks prefix, not whole list!
# takewhile stops at FIRST failure
# dropwhile starts at FIRST failure

# Practical: Skip header lines
lines = ["# Comment", "# Another", "data1", "data2"]
data = list(dropwhile(lambda x: x.startswith("#"), lines))
# ["data1", "data2"]

# Practical: Take valid entries
entries = [5, 10, 15, -1, 20, 25]  # -1 is sentinel
valid = list(takewhile(lambda x: x >= 0, entries))
# [5, 10, 15]`},{signature:`cycle() / repeat()`,description:`Infinite iterators. cycle() loops forever, repeat() yields same value.`,complexity:`O(1) per item`,section:`Infinite`,example:`from itertools import cycle, repeat, islice

# Cycle infinitely through iterable
colors = cycle(['red', 'green', 'blue'])
print([next(colors) for _ in range(7)])
# ['red', 'green', 'blue', 'red', 'green', 'blue', 'red']

# Practical: Round-robin assignment
tasks = ['A', 'B', 'C', 'D', 'E']
workers = cycle(['Alice', 'Bob', 'Charlie'])
assignments = list(zip(tasks, workers))
# [('A', 'Alice'), ('B', 'Bob'), ('C', 'Charlie'),
#  ('D', 'Alice'), ('E', 'Bob')]

# Repeat value (optionally n times)
threes = list(repeat(3, 5))
# [3, 3, 3, 3, 3]

# Repeat forever (use islice to limit)
infinite_zeros = repeat(0)
first_10 = list(islice(infinite_zeros, 10))
# [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

# Practical: Initialize with repeat
from itertools import repeat
import operator
# Square each number
nums = [1, 2, 3, 4, 5]
squares = list(map(pow, nums, repeat(2)))
# [1, 4, 9, 16, 25]

# count() - infinite counter
from itertools import count
counter = count(start=10, step=2)
print([next(counter) for _ in range(5)])
# [10, 12, 14, 16, 18]`},{signature:`starmap() / zip_longest()`,description:`Apply function to unpacked tuples. Zip with fill value for unequal lengths.`,complexity:`O(n)`,section:`Infinite`,example:`from itertools import starmap, zip_longest

# starmap: apply function to unpacked arguments
pairs = [(2, 5), (3, 2), (10, 3)]
results = list(starmap(pow, pairs))
# [32, 9, 1000]  # pow(2,5), pow(3,2), pow(10,3)

# Compare to map with multiple iterables
bases = [2, 3, 10]
exps = [5, 2, 3]
results = list(map(pow, bases, exps))
# Same: [32, 9, 1000]

# Practical: apply function to pre-paired arguments
def point_distance(x1, y1, x2, y2):
    return ((x2-x1)**2 + (y2-y1)**2) ** 0.5

segments = [(0, 0, 3, 4), (1, 1, 4, 5)]
distances = list(starmap(point_distance, segments))
# [5.0, 5.0]

# zip_longest: zip with fill value
a = [1, 2, 3]
b = [4, 5]
zipped = list(zip_longest(a, b, fillvalue=0))
# [(1, 4), (2, 5), (3, 0)]

# Practical: merge columns with different lengths
col1 = ['A', 'B', 'C']
col2 = [1, 2]
col3 = ['x', 'y', 'z', 'w']
merged = list(zip_longest(col1, col2, col3, fillvalue='-'))
# [('A', 1, 'x'), ('B', 2, 'y'), ('C', '-', 'z'), ('-', '-', 'w')]`}],p=[{signature:`Why collections?`,description:`Specialized containers beyond list/dict/set. Use when: frequency counting, default values, ordered dicts, double-ended queues.`,complexity:`Concept`,section:`Why & When`,example:`# COLLECTIONS = Specialized container datatypes
# Core: Counter, defaultdict, deque, OrderedDict, ChainMap

# USE CASES:
# 1. Counter - frequency counting, top-k problems, anagrams
# 2. defaultdict - eliminate KeyError, group by key
# 3. deque - O(1) operations at both ends (queue, sliding window)
# 4. OrderedDict - maintain insertion order + LRU cache
# 5. ChainMap - chain multiple dicts, scope management

# WHY COUNTER BEATS MANUAL DICT:
# Manual approach (verbose, error-prone)
freq = {}
for item in arr:
    if item in freq:
        freq[item] += 1
    else:
        freq[item] = 1

# Counter approach (one line, clean)
from collections import Counter
freq = Counter(arr)

# INTERVIEW PATTERNS:
# - Top K Frequent: Counter(arr).most_common(k)
# - Anagram check: Counter(s1) == Counter(s2)
# - Character frequency: Counter(string)
# - Find majority element: Counter(arr).most_common(1)[0][0]

# WHY defaultdict ELIMINATES KeyError:
# Manual checking
groups = {}
for item in items:
    key = get_key(item)
    if key not in groups:
        groups[key] = []
    groups[key].append(item)

# defaultdict (cleaner)
from collections import defaultdict
groups = defaultdict(list)
for item in items:
    groups[get_key(item)].append(item)

# WHY deque BEATS list FOR QUEUES:
# list.pop(0) is O(n) - shifts all elements!
# deque.popleft() is O(1) - designed for this

# WHEN TO USE:
# - Counter: frequency analysis, top-k, anagrams
# - defaultdict: grouping, graphs (adjacency lists)
# - deque: BFS, sliding window, queue operations
# - OrderedDict: LRU cache, ordered iterations`},{signature:`collections vs dict/list`,description:`Specialized collections offer cleaner code and better performance for specific use cases.`,complexity:`Concept`,section:`Why & When`,example:`# COMPARISON: collections vs manual

# 1. COUNTING - Counter vs dict
# Manual dict:
freq = {}
for c in "hello":
    freq[c] = freq.get(c, 0) + 1

# Counter (cleaner):
from collections import Counter
freq = Counter("hello")

# 2. GROUPING - defaultdict vs dict
# Manual dict:
groups = {}
for word in words:
    key = len(word)
    if key not in groups:
        groups[key] = []
    groups[key].append(word)

# defaultdict (cleaner):
from collections import defaultdict
groups = defaultdict(list)
for word in words:
    groups[len(word)].append(word)

# 3. QUEUE - deque vs list
# list (SLOW - O(n) popleft):
queue = [1, 2, 3]
queue.pop(0)  # Shifts all elements!

# deque (FAST - O(1) popleft):
from collections import deque
queue = deque([1, 2, 3])
queue.popleft()  # Instant!

# PERFORMANCE COMPARISON:
# Operation       list      deque
# append          O(1)      O(1)
# pop             O(1)      O(1)
# appendleft      O(n)      O(1)   ← deque wins
# popleft         O(n)      O(1)   ← deque wins

# INTERVIEW TIP:
# ALWAYS use deque for BFS, never list!
# One wrong pop(0) costs you O(n) per iteration`},{signature:`Counter Arithmetic`,description:`Counter supports +, -, &, | operations. Powerful for multiset operations.`,complexity:`O(n)`,section:`Counter`,example:`from collections import Counter

# Basic counting
words = ['a', 'b', 'a', 'c', 'b', 'a']
count = Counter(words)
# Counter({'a': 3, 'b': 2, 'c': 1})

# Addition: combine counts
c1 = Counter(a=3, b=1)
c2 = Counter(a=1, b=2)
print(c1 + c2)  # Counter({'a': 4, 'b': 3})

# Subtraction: remove counts (keeps positive only)
print(c1 - c2)  # Counter({'a': 2})

# Intersection (minimum of each)
print(c1 & c2)  # Counter({'a': 1, 'b': 1})

# Union (maximum of each)
print(c1 | c2)  # Counter({'a': 3, 'b': 2})

# INTERVIEW: Check if anagrams
def is_anagram(s1, s2):
    return Counter(s1) == Counter(s2)

print(is_anagram("listen", "silent"))  # True

# INTERVIEW: Minimum window containing all chars
def min_window(s, t):
    need = Counter(t)
    have = Counter()
    # ... window sliding logic
    pass`},{signature:`Counter.most_common()`,description:`Get n most frequent elements. Returns list of (element, count) tuples.`,complexity:`O(n log k)`,section:`Counter`,example:`from collections import Counter

words = "the quick brown fox jumps over the lazy dog the fox".split()
count = Counter(words)

# Top 3 most common
print(count.most_common(3))
# [('the', 3), ('fox', 2), ('quick', 1)]

# All elements sorted by frequency
print(count.most_common())
# [('the', 3), ('fox', 2), ('quick', 1), ...]

# Least common (reverse)
print(count.most_common()[-3:])

# INTERVIEW: Top K Frequent Elements
def top_k_frequent(nums, k):
    return [item for item, count in Counter(nums).most_common(k)]

print(top_k_frequent([1,1,1,2,2,3], 2))  # [1, 2]

# INTERVIEW: Top K Frequent Words
def top_k_words(words, k):
    count = Counter(words)
    # Sort by frequency (desc), then alphabetically
    return sorted(count.keys(),
                  key=lambda w: (-count[w], w))[:k]

# Practical: Find majority element
def majority_element(nums):
    count = Counter(nums)
    return count.most_common(1)[0][0]`},{signature:`Counter.elements()`,description:`Iterator over elements repeating each as many times as its count.`,complexity:`O(n)`,section:`Counter`,example:`from collections import Counter

c = Counter(a=3, b=2, c=1)

# Get elements with repetition
elements = list(c.elements())
# ['a', 'a', 'a', 'b', 'b', 'c']

# Note: order may vary, negative counts ignored
c2 = Counter(a=2, b=-1)
print(list(c2.elements()))  # ['a', 'a']

# Practical: Reconstruct sorted list
nums = [3, 1, 4, 1, 5, 9, 2, 6]
count = Counter(nums)
sorted_nums = sorted(count.elements())
# [1, 1, 2, 3, 4, 5, 6, 9]

# total() - sum of all counts (Python 3.10+)
c = Counter(a=10, b=5, c=7)
print(c.total())  # 22

# subtract() - in-place subtraction
c1 = Counter(a=4, b=2)
c1.subtract(Counter(a=1, b=1))
print(c1)  # Counter({'a': 3, 'b': 1})

# update() - add counts
c1.update(Counter(a=1, c=5))
print(c1)  # Counter({'c': 5, 'a': 4, 'b': 1})`},{signature:`defaultdict Patterns`,description:`Dict with default factory for missing keys. Avoids KeyError and setdefault.`,complexity:`O(1)`,section:`defaultdict`,example:`from collections import defaultdict

# Default to empty list
graph = defaultdict(list)
graph['a'].append('b')  # No KeyError!
graph['a'].append('c')
# defaultdict(list, {'a': ['b', 'c']})

# Default to 0 (counting)
counter = defaultdict(int)
for word in "hello world".split():
    counter[word] += 1
# defaultdict(int, {'hello': 1, 'world': 1})

# Default to set (unique collections)
index = defaultdict(set)
docs = [("doc1", "hello"), ("doc1", "world"), ("doc2", "hello")]
for doc, word in docs:
    index[word].add(doc)
# defaultdict(set, {'hello': {'doc1', 'doc2'}, 'world': {'doc1'}})

# INTERVIEW: Group anagrams
def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))  # Sorted chars as key
        groups[key].append(s)
    return list(groups.values())

print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
# [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]`},{signature:`defaultdict with lambda`,description:`Use lambda for complex default values. Nest defaultdicts for multi-level dicts.`,complexity:`O(1)`,section:`defaultdict`,example:`from collections import defaultdict

# Lambda for mutable defaults
def make_counter():
    return defaultdict(lambda: {'count': 0, 'sum': 0})

stats = make_counter()
stats['user1']['count'] += 1
stats['user1']['sum'] += 100
# {'user1': {'count': 1, 'sum': 100}}

# Nested defaultdict (auto-vivification)
def nested_dict():
    return defaultdict(nested_dict)

tree = nested_dict()
tree['a']['b']['c'] = 1  # No KeyError at any level!
tree['x']['y'] = 2
# Access: tree['a']['b']['c'] -> 1

# 2D grid with default value
grid = defaultdict(lambda: defaultdict(int))
grid[0][0] = 1
grid[5][10] = 99
# grid[100][200] -> 0 (default)

# INTERVIEW: Build adjacency list with weights
edges = [(0, 1, 5), (0, 2, 3), (1, 2, 2)]
graph = defaultdict(lambda: defaultdict(lambda: float('inf')))
for u, v, w in edges:
    graph[u][v] = w
    graph[v][u] = w

# Access: graph[0][1] -> 5, graph[5][6] -> inf`},{signature:`OrderedDict`,description:`Dict that remembers insertion order. Essential for LRU cache implementation.`,complexity:`O(1)`,section:`OrderedDict`,example:`from collections import OrderedDict

# Maintains insertion order (dict does too in 3.7+)
od = OrderedDict()
od['a'] = 1
od['b'] = 2
od['c'] = 3

# move_to_end: reorder element
od.move_to_end('a')  # Move 'a' to end
print(list(od.keys()))  # ['b', 'c', 'a']

od.move_to_end('c', last=False)  # Move 'c' to beginning
print(list(od.keys()))  # ['c', 'b', 'a']

# popitem: remove from end or beginning
od.popitem()           # Removes 'a' (last)
od.popitem(last=False) # Removes 'c' (first)

# INTERVIEW: LRU Cache with OrderedDict
class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        # Move to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove oldest`},{signature:`deque Operations`,description:`Double-ended queue with O(1) append/pop on both ends. Better than list for queues.`,complexity:`O(1) ends`,section:`deque`,example:`from collections import deque

# Basic operations
dq = deque([1, 2, 3])

# O(1) operations on both ends
dq.append(4)       # [1, 2, 3, 4]
dq.appendleft(0)   # [0, 1, 2, 3, 4]
dq.pop()           # Returns 4, now [0, 1, 2, 3]
dq.popleft()       # Returns 0, now [1, 2, 3]

# extend on both ends
dq.extend([4, 5])        # [1, 2, 3, 4, 5]
dq.extendleft([0, -1])   # [-1, 0, 1, 2, 3, 4, 5] (reversed!)

# rotate
dq = deque([1, 2, 3, 4, 5])
dq.rotate(2)   # [4, 5, 1, 2, 3] (right rotation)
dq.rotate(-2)  # [1, 2, 3, 4, 5] (left rotation)

# maxlen: fixed-size buffer
recent = deque(maxlen=3)
for i in range(5):
    recent.append(i)
# deque([2, 3, 4], maxlen=3)

# INTERVIEW: Sliding window maximum
def max_sliding_window(nums, k):
    result = []
    dq = deque()  # Store indices
    for i, num in enumerate(nums):
        # Remove indices outside window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        # Remove smaller elements
        while dq and nums[dq[-1]] < num:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result`},{signature:`ChainMap`,description:`Combine multiple dicts into single view. First dict has priority for lookups.`,complexity:`O(n) lookup`,section:`ChainMap`,example:`from collections import ChainMap

# Combine multiple dicts
defaults = {'color': 'red', 'user': 'guest'}
user_prefs = {'color': 'blue'}
cmd_args = {}

config = ChainMap(cmd_args, user_prefs, defaults)
print(config['color'])  # 'blue' (from user_prefs)
print(config['user'])   # 'guest' (from defaults)

# First dict is the "front" - mutations go there
config['new_key'] = 'value'
print(cmd_args)  # {'new_key': 'value'}

# Practical: Variable scoping
def make_scope():
    global_scope = {'x': 1, 'y': 2}
    local_scope = {'x': 10}
    scope = ChainMap(local_scope, global_scope)
    print(scope['x'])  # 10 (local)
    print(scope['y'])  # 2 (global)

# new_child: create new scope
child = config.new_child({'temp': 123})
print(child['temp'])   # 123
print(child['color'])  # 'blue'

# parents: skip first mapping
print(child.parents['color'])  # 'blue'

# Convert to regular dict
flat = dict(config)

# List all keys (unique across all maps)
print(list(config.keys()))`},{signature:`namedtuple`,description:`Tuple with named fields. Immutable, memory efficient, self-documenting.`,complexity:`O(1)`,section:`namedtuple`,example:`from collections import namedtuple

# Define a Point type
Point = namedtuple('Point', ['x', 'y'])

p = Point(3, 4)
print(p.x, p.y)    # 3, 4
print(p[0], p[1])  # 3, 4 (tuple access still works)

# Unpack like tuple
x, y = p
print(x, y)  # 3, 4

# Immutable (can't modify)
# p.x = 5  # Error!

# _replace: create modified copy
p2 = p._replace(x=10)
print(p2)  # Point(x=10, y=4)

# _asdict: convert to dict
print(p._asdict())  # {'x': 3, 'y': 4}

# Default values (Python 3.7+)
Point = namedtuple('Point', ['x', 'y', 'z'], defaults=[0])
print(Point(1, 2))  # Point(x=1, y=2, z=0)

# INTERVIEW: Use for clean code
Edge = namedtuple('Edge', ['src', 'dst', 'weight'])
edges = [Edge(0, 1, 5), Edge(1, 2, 3)]

for edge in edges:
    print(f"{edge.src} -> {edge.dst}: {edge.weight}")

# Practical: Return multiple values clearly
Result = namedtuple('Result', ['value', 'error', 'metadata'])
def process():
    return Result(42, None, {'time': 1.5})

result = process()
print(result.value)  # 42`}],m=[...d,...f,...p],h=[{signature:`Why caching?`,description:`Trade memory for speed. Cache eviction policies: LRU (recency), LFU (frequency), TTL (time). Choose based on access patterns.`,complexity:`Concept`,section:`Why & When`,example:`# CACHING = Store frequently accessed data for O(1) retrieval
# Eviction policies: LRU, LFU, TTL, FIFO, Random

# WHY CACHE?
# - Avoid expensive recomputation (database, API, calculations)
# - Reduce latency for frequent requests
# - Limit memory usage with eviction policy

# LRU (Least Recently Used):
# - Evict item that hasn't been accessed in longest time
# - Good for: general-purpose caching, recency matters
# - Implementation: HashMap + Doubly Linked List OR OrderedDict
# - Use when: recent items likely to be accessed again

# LFU (Least Frequently Used):
# - Evict item with lowest access count
# - Good for: frequency matters more than recency
# - Implementation: HashMap + nested structure (freq → items)
# - Use when: popular items should stay cached

# TTL (Time To Live):
# - Evict items after expiration time
# - Good for: data that becomes stale, rate limiting
# - Implementation: HashMap + timestamps
# - Use when: data has natural expiration

# INTERVIEW PATTERNS:
# - "Design LRU Cache" → OrderedDict or HashMap + DLL
# - "Design LFU Cache" → Nested structure
# - "Rate limiter" → TTL cache
# - "URL shortener" → Cache with TTL

# WHEN TO USE WHICH:
# Recent >> Frequent? → LRU
# Frequent >> Recent? → LFU
# Data expires? → TTL
# Don't care? → FIFO/Random`},{signature:`LRU vs LFU trade-offs`,description:`LRU optimizes for recency, LFU for frequency. Different access patterns need different policies.`,complexity:`Concept`,section:`Why & When`,example:`# LRU vs LFU - choosing the right policy

# ACCESS PATTERN 1: Browsing history
# User views: A, B, C, D, E (capacity=3)
# Cache state (LRU): [C, D, E] - most recent
# User revisits: A
# LRU evicts C (least recently used)
# Cache: [D, E, A] - Good! Recency matters

# ACCESS PATTERN 2: Hot items
# Requests: A, A, A, B, C, D (capacity=3)
# Cache state (LRU): [B, C, D]
# A is evicted despite being most frequent!
# LFU cache: [A, B, C] - Better! A is very frequent

# COMPARISON:
# Metric          LRU              LFU
# ─────────────────────────────────────────
# Optimizes for   Recency          Frequency
# Complexity      O(1) get/put     O(1) get/put
# Implementation  OrderedDict      Nested maps
# Space           O(capacity)      O(capacity + freqs)
# Code length     ~20 lines        ~50 lines
# Hit rate        Good general     Good for hot items

# USE LRU WHEN:
# - Recent items likely accessed again (web browser)
# - Time-based locality (recent files)
# - Simple implementation preferred
# - Access patterns change over time

# USE LFU WHEN:
# - Popular items accessed repeatedly (trending)
# - Frequency >> recency (music streaming)
# - Long-term popularity matters
# - Access patterns stable

# HYBRID: LRU-K
# Track last K accesses, evict by Kth-recent
# Balances recency and frequency`},{signature:`LRU Cache (OrderedDict)`,description:`Least Recently Used cache. OrderedDict implementation is cleanest Python approach.`,complexity:`O(1) get/put`,section:`LRU Cache`,example:`from collections import OrderedDict

class LRUCache:
    """
    Least Recently Used cache using OrderedDict.
    Most Pythonic implementation.
    """
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        # Move to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            # Update and move to end
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            # Remove oldest (first item)
            self.cache.popitem(last=False)

# Usage:
# cache = LRUCache(2)
# cache.put(1, 1)    # cache: {1=1}
# cache.put(2, 2)    # cache: {1=1, 2=2}
# cache.get(1)       # returns 1, cache: {2=2, 1=1}
# cache.put(3, 3)    # evicts 2, cache: {1=1, 3=3}
# cache.get(2)       # returns -1 (not found)`},{signature:`LRU Cache (Doubly Linked List)`,description:`Classic implementation with HashMap + Doubly Linked List. Shows understanding of data structure design.`,complexity:`O(1) get/put`,section:`LRU Cache`,example:`class DLLNode:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCacheDLL:
    """
    HashMap + Doubly Linked List implementation.
    Shows deeper understanding for interviews.
    """
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> Node

        # Dummy head and tail
        self.head = DLLNode()
        self.tail = DLLNode()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _add_to_head(self, node):
        """Add node right after head (most recent)."""
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        """Remove node from list."""
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_head(self, node):
        """Move existing node to head."""
        self._remove_node(node)
        self._add_to_head(node)

    def _pop_tail(self):
        """Remove and return the least recent node."""
        node = self.tail.prev
        self._remove_node(node)
        return node

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._move_to_head(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.val = value
            self._move_to_head(node)
        else:
            node = DLLNode(key, value)
            self.cache[key] = node
            self._add_to_head(node)
            if len(self.cache) > self.capacity:
                tail = self._pop_tail()
                del self.cache[tail.key]`},{signature:`LFU Cache`,description:`Least Frequently Used cache. Track frequency counts with nested structure.`,complexity:`O(1) get/put`,section:`LFU Cache`,example:`from collections import defaultdict, OrderedDict

class LFUCache:
    """
    Least Frequently Used cache.
    Evicts least frequent; ties broken by LRU.
    """
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.min_freq = 0
        self.key_to_val = {}           # key -> value
        self.key_to_freq = {}          # key -> frequency
        self.freq_to_keys = defaultdict(OrderedDict)  # freq -> OrderedDict of keys

    def _update_freq(self, key):
        """Increment frequency of key."""
        freq = self.key_to_freq[key]
        self.key_to_freq[key] = freq + 1

        # Remove from current frequency bucket
        del self.freq_to_keys[freq][key]
        if not self.freq_to_keys[freq]:
            del self.freq_to_keys[freq]
            if self.min_freq == freq:
                self.min_freq += 1

        # Add to new frequency bucket
        self.freq_to_keys[freq + 1][key] = None

    def get(self, key: int) -> int:
        if key not in self.key_to_val:
            return -1
        self._update_freq(key)
        return self.key_to_val[key]

    def put(self, key: int, value: int) -> None:
        if self.capacity <= 0:
            return

        if key in self.key_to_val:
            self.key_to_val[key] = value
            self._update_freq(key)
            return

        if len(self.key_to_val) >= self.capacity:
            # Evict LFU (and LRU among ties)
            evict_key, _ = self.freq_to_keys[self.min_freq].popitem(last=False)
            del self.key_to_val[evict_key]
            del self.key_to_freq[evict_key]

        # Add new key
        self.key_to_val[key] = value
        self.key_to_freq[key] = 1
        self.freq_to_keys[1][key] = None
        self.min_freq = 1`},{signature:`TTL Cache`,description:`Cache with time-based expiration. Items expire after TTL seconds.`,complexity:`O(1) average`,section:`TTL Cache`,example:`import time
from collections import OrderedDict

class TTLCache:
    """
    Cache with Time-To-Live expiration.
    Items expire after ttl seconds.
    """
    def __init__(self, capacity: int, ttl: float):
        self.capacity = capacity
        self.ttl = ttl
        self.cache = OrderedDict()  # key -> (value, expiry_time)

    def _is_expired(self, key):
        if key not in self.cache:
            return True
        _, expiry = self.cache[key]
        return time.time() > expiry

    def _cleanup_expired(self):
        """Remove all expired entries."""
        now = time.time()
        expired = [k for k, (v, exp) in self.cache.items() if now > exp]
        for k in expired:
            del self.cache[k]

    def get(self, key: int):
        if key not in self.cache or self._is_expired(key):
            if key in self.cache:
                del self.cache[key]
            return None
        value, expiry = self.cache[key]
        # Refresh position (optional: refresh TTL)
        self.cache.move_to_end(key)
        return value

    def put(self, key: int, value) -> None:
        self._cleanup_expired()

        if key in self.cache:
            self.cache.move_to_end(key)

        expiry = time.time() + self.ttl
        self.cache[key] = (value, expiry)

        while len(self.cache) > self.capacity:
            self.cache.popitem(last=False)

# Usage:
# cache = TTLCache(capacity=100, ttl=60)  # 60 second TTL
# cache.put("session_123", user_data)
# data = cache.get("session_123")  # None if expired`},{signature:`Lazy TTL Cache`,description:`Only check expiration on access. More efficient for infrequent cleanup.`,complexity:`O(1) access`,section:`TTL Cache`,example:`import time
from functools import lru_cache

class LazyTTLCache:
    """
    Lazy expiration - only check on access.
    More efficient when cleanup isn't critical.
    """
    def __init__(self, ttl: float = 300):
        self.ttl = ttl
        self.cache = {}  # key -> (value, timestamp)

    def get(self, key):
        if key not in self.cache:
            return None
        value, timestamp = self.cache[key]
        if time.time() - timestamp > self.ttl:
            del self.cache[key]
            return None
        return value

    def set(self, key, value):
        self.cache[key] = (value, time.time())

    def delete(self, key):
        self.cache.pop(key, None)

# Decorator version with TTL
def ttl_cache(ttl_seconds=300):
    """Decorator that adds TTL to lru_cache."""
    def decorator(func):
        @lru_cache(maxsize=128)
        def cached_with_ttl(*args, _ttl_hash=None):
            return func(*args)

        def wrapper(*args):
            # TTL hash changes every ttl_seconds
            ttl_hash = int(time.time() / ttl_seconds)
            return cached_with_ttl(*args, _ttl_hash=ttl_hash)

        wrapper.cache_clear = cached_with_ttl.cache_clear
        return wrapper
    return decorator

@ttl_cache(ttl_seconds=60)
def expensive_api_call(user_id):
    # Result cached for 60 seconds
    return fetch_user_data(user_id)`},{signature:`Write-Through Cache`,description:`Writes go to cache AND backing store immediately. Simple but slower writes.`,complexity:`O(1) + backend`,section:`Cache Patterns`,example:`class WriteThroughCache:
    """
    Write-Through: writes update cache AND backend.
    Pros: Simple, consistent
    Cons: Slower writes
    """
    def __init__(self, backend, capacity=100):
        self.cache = {}
        self.backend = backend  # Database/API
        self.capacity = capacity

    def get(self, key):
        # Try cache first
        if key in self.cache:
            return self.cache[key]

        # Cache miss: fetch from backend
        value = self.backend.get(key)
        if value is not None:
            self._add_to_cache(key, value)
        return value

    def put(self, key, value):
        # Write to backend FIRST (synchronous)
        self.backend.put(key, value)
        # Then update cache
        self._add_to_cache(key, value)

    def _add_to_cache(self, key, value):
        if len(self.cache) >= self.capacity:
            # Simple eviction: remove arbitrary key
            self.cache.pop(next(iter(self.cache)))
        self.cache[key] = value

# Usage:
# cache = WriteThroughCache(database)
# cache.put("user:123", user_data)  # Writes to DB immediately
# data = cache.get("user:123")      # Fast from cache`},{signature:`Write-Back Cache`,description:`Writes only to cache, async flush to backend. Fast writes but risk of data loss.`,complexity:`O(1) write`,section:`Cache Patterns`,example:`import threading
import time

class WriteBackCache:
    """
    Write-Back (Write-Behind): writes to cache only.
    Background thread flushes to backend.
    Pros: Fast writes
    Cons: Risk of data loss, complexity
    """
    def __init__(self, backend, flush_interval=5):
        self.cache = {}
        self.dirty = set()  # Keys with pending writes
        self.backend = backend
        self.lock = threading.Lock()

        # Start background flush thread
        self.running = True
        self.flush_thread = threading.Thread(target=self._flush_loop,
                                             args=(flush_interval,))
        self.flush_thread.daemon = True
        self.flush_thread.start()

    def get(self, key):
        with self.lock:
            if key in self.cache:
                return self.cache[key]
        return self.backend.get(key)

    def put(self, key, value):
        with self.lock:
            self.cache[key] = value
            self.dirty.add(key)  # Mark for later flush

    def _flush_loop(self, interval):
        while self.running:
            time.sleep(interval)
            self._flush()

    def _flush(self):
        with self.lock:
            for key in list(self.dirty):
                if key in self.cache:
                    self.backend.put(key, self.cache[key])
            self.dirty.clear()

    def close(self):
        self.running = False
        self._flush()  # Final flush

# Usage:
# cache = WriteBackCache(database, flush_interval=10)
# cache.put("key", "value")  # Fast, async write to DB`}],g=[{signature:`Why custom data structures?`,description:`Design structures optimized for specific constraints. Use when stdlib doesn't meet O() requirements.`,complexity:`Concept`,section:`Why & When`,example:`# DESIGN PATTERNS = Custom data structures for interviews
# Common: Min Stack, Queue using Stacks, Circular Queue

# WHY CUSTOM STRUCTURES?
# - Meet specific O() requirements (O(1) getMin)
# - Combine operations (stack + min tracking)
# - Implement missing features (queue using stacks)
# - Optimize for constraints (circular queue)

# MIN STACK PATTERN:
# Problem: Stack that supports push, pop, top, getMin in O(1)
# Challenge: How to track minimum efficiently?
# Solution: Store min alongside each element

# WHY NOT JUST min(stack)?
# - min(stack) is O(n) - too slow!
# - Need O(1) getMin

# APPROACHES:
# 1. Tuple Stack: store (val, current_min) pairs
# 2. Two Stacks: main stack + min stack
# Both are O(1) space per element

# INTERVIEW SIGNALS:
# "Design X with O(1) Y" → Custom structure
# "Implement queue using stacks" → Algorithmic thinking
# "Circular buffer" → Array + wraparound indexing

# WHEN TO DESIGN CUSTOM:
# - Specific O() constraint
# - Combine multiple operations
# - Simulate one structure with another
# - Memory/space optimization needed

# WHEN TO USE STDLIB:
# - Standard operations sufficient
# - No special constraints
# - Readability matters more
# - Not in interview context`},{signature:`Design patterns decision tree`,description:`Choose structure based on operations needed and constraints given.`,complexity:`Concept`,section:`Why & When`,example:`# DECISION TREE FOR DESIGN PROBLEMS

# Need O(1) min/max on stack?
# → Min Stack / Max Stack
# Store (value, current_min/max) tuples

# Implement queue using stacks?
# → Two stacks: input + output
# Amortized O(1) operations

# Implement stack using queues?
# → Two queues or one queue + rotation
# O(1) pop OR push (not both)

# Fixed-size circular buffer?
# → Array + head/tail pointers
# Wrap around with modulo

# Need O(1) insert/delete/getRandom?
# → HashMap + Array
# Map for O(1) lookup, array for O(1) random

# Track running median?
# → Two heaps (max-heap + min-heap)
# Balance sizes for O(1) median

# LRU Cache?
# → OrderedDict or HashMap + DLL
# O(1) get/put operations

# IMPLEMENTATION COMPLEXITY:
# Min Stack: ~15 lines
# Queue using 2 Stacks: ~30 lines
# Circular Queue: ~40 lines
# Insert/Delete/GetRandom: ~50 lines
# LRU Cache: ~20 (OrderedDict) or ~80 (DLL)

# INTERVIEW STRATEGY:
# 1. Clarify requirements (what operations, what O()?)
# 2. Identify data structures needed
# 3. Sketch approach before coding
# 4. Code cleanly with edge cases
# 5. Test with examples`},{signature:`Min Stack`,description:`Stack with O(1) getMin. Store min alongside each element or use auxiliary stack.`,complexity:`O(1) all ops`,section:`Min Stack`,example:`class MinStack:
    """
    Stack with O(1) push, pop, top, and getMin.
    Store (value, current_min) pairs.
    """
    def __init__(self):
        self.stack = []  # (value, min_so_far)

    def push(self, val: int) -> None:
        if not self.stack:
            self.stack.append((val, val))
        else:
            current_min = min(val, self.stack[-1][1])
            self.stack.append((val, current_min))

    def pop(self) -> None:
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1][0]

    def getMin(self) -> int:
        return self.stack[-1][1]

# Alternative: Two stacks
class MinStackTwoStacks:
    def __init__(self):
        self.stack = []
        self.min_stack = []  # Only push when new min

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        if self.stack.pop() == self.min_stack[-1]:
            self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`},{signature:`Max Stack`,description:`Stack with O(1) peekMax and O(log n) popMax. Use heap + lazy deletion.`,complexity:`O(log n) popMax`,section:`Min Stack`,example:`import heapq

class MaxStack:
    """
    Stack with popMax(). Uses heap + lazy deletion.
    """
    def __init__(self):
        self.stack = []       # (value, id)
        self.heap = []        # (-value, -id) for max heap
        self.removed = set()  # Removed ids
        self.counter = 0

    def push(self, x: int) -> None:
        self.stack.append((x, self.counter))
        heapq.heappush(self.heap, (-x, -self.counter))
        self.counter += 1

    def pop(self) -> int:
        self._clean_stack()
        val, idx = self.stack.pop()
        self.removed.add(idx)
        return val

    def top(self) -> int:
        self._clean_stack()
        return self.stack[-1][0]

    def peekMax(self) -> int:
        self._clean_heap()
        return -self.heap[0][0]

    def popMax(self) -> int:
        self._clean_heap()
        val, idx = heapq.heappop(self.heap)
        self.removed.add(-idx)
        return -val

    def _clean_stack(self):
        while self.stack and self.stack[-1][1] in self.removed:
            self.stack.pop()

    def _clean_heap(self):
        while self.heap and -self.heap[0][1] in self.removed:
            heapq.heappop(self.heap)`},{signature:`Queue using Stacks`,description:`Implement FIFO queue with two LIFO stacks. Amortized O(1) operations.`,complexity:`O(1) amortized`,section:`Queue Stack`,example:`class MyQueue:
    """
    Queue using two stacks.
    Amortized O(1) per operation.
    """
    def __init__(self):
        self.in_stack = []   # For push
        self.out_stack = []  # For pop/peek

    def push(self, x: int) -> None:
        self.in_stack.append(x)

    def pop(self) -> int:
        self._transfer()
        return self.out_stack.pop()

    def peek(self) -> int:
        self._transfer()
        return self.out_stack[-1]

    def empty(self) -> bool:
        return not self.in_stack and not self.out_stack

    def _transfer(self):
        # Only transfer when out_stack is empty
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())

# Push: O(1)
# Pop: Amortized O(1) - each element transferred at most once
# Peek: Amortized O(1)`},{signature:`Stack using Queues`,description:`Implement LIFO stack with one or two FIFO queues. Less practical, interview classic.`,complexity:`O(n) push or pop`,section:`Queue Stack`,example:`from collections import deque

class MyStack:
    """
    Stack using single queue.
    O(n) push, O(1) pop.
    """
    def __init__(self):
        self.queue = deque()

    def push(self, x: int) -> None:
        self.queue.append(x)
        # Rotate so new element is at front
        for _ in range(len(self.queue) - 1):
            self.queue.append(self.queue.popleft())

    def pop(self) -> int:
        return self.queue.popleft()

    def top(self) -> int:
        return self.queue[0]

    def empty(self) -> bool:
        return len(self.queue) == 0

# Alternative: O(1) push, O(n) pop
class MyStackAlt:
    def __init__(self):
        self.q1 = deque()
        self.q2 = deque()

    def push(self, x: int) -> None:
        self.q1.append(x)

    def pop(self) -> int:
        # Move all but last to q2
        while len(self.q1) > 1:
            self.q2.append(self.q1.popleft())
        result = self.q1.popleft()
        self.q1, self.q2 = self.q2, self.q1
        return result`},{signature:`Circular Queue`,description:`Fixed-size queue with wrap-around. Uses modulo arithmetic for indices.`,complexity:`O(1) all ops`,section:`Circular Queue`,example:`class MyCircularQueue:
    """
    Fixed-size circular queue.
    Wrap around using modulo.
    """
    def __init__(self, k: int):
        self.queue = [None] * k
        self.capacity = k
        self.head = 0
        self.count = 0

    def enQueue(self, value: int) -> bool:
        if self.isFull():
            return False
        tail = (self.head + self.count) % self.capacity
        self.queue[tail] = value
        self.count += 1
        return True

    def deQueue(self) -> bool:
        if self.isEmpty():
            return False
        self.head = (self.head + 1) % self.capacity
        self.count -= 1
        return True

    def Front(self) -> int:
        if self.isEmpty():
            return -1
        return self.queue[self.head]

    def Rear(self) -> int:
        if self.isEmpty():
            return -1
        tail = (self.head + self.count - 1) % self.capacity
        return self.queue[tail]

    def isEmpty(self) -> bool:
        return self.count == 0

    def isFull(self) -> bool:
        return self.count == self.capacity

# Example:
# q = MyCircularQueue(3)
# q.enQueue(1)  # [1, _, _], head=0
# q.enQueue(2)  # [1, 2, _], head=0
# q.enQueue(3)  # [1, 2, 3], head=0
# q.enQueue(4)  # False (full)
# q.deQueue()   # [_, 2, 3], head=1
# q.enQueue(4)  # [4, 2, 3], head=1 (wrapped!)`}],_=[{signature:`Why design utilities?`,description:`Common design problems: iterators, rate limiters, random structures. Test understanding of protocols and system design.`,complexity:`Concept`,section:`Why & When`,example:`# DESIGN UTILITIES = Practical system components
# Common: Iterator, Rate Limiter, Browser History, Random Insert/Delete

# ITERATOR PATTERN:
# Why: Python's iteration protocol (__iter__, __next__)
# When: Custom traversal logic needed
# Example: Flatten nested list lazily

# Why lazy iteration?
# Pre-flatten: all in memory at once (O(n) space)
# Lazy: one element at a time (O(1) space)

# RATE LIMITER PATTERN:
# Why: Prevent abuse, ensure fair usage
# When: APIs, login attempts, request throttling
# Approaches:
# - Sliding Window: track timestamps in deque
# - Token Bucket: refill tokens at rate
# - Fixed Window: reset count every interval

# BROWSER HISTORY PATTERN:
# Why: Undo/redo, forward/back navigation
# When: State management with history
# Implementation: Two stacks (back + forward)

# RANDOM INSERT/DELETE/GETRANDOM:
# Why: O(1) operations for all three
# When: Sampling, randomized algorithms
# Implementation: HashMap + Array
# - Array: O(1) random access by index
# - HashMap: O(1) lookup by value

# INTERVIEW PATTERNS:
# "Flatten nested iterator" → Stack-based lazy eval
# "Rate limiter" → Sliding window with deque
# "Browser history" → Two stacks
# "getRandom O(1)" → HashMap + Array combo`},{signature:`Iterator protocol explained`,description:`Python iteration: __iter__ returns iterator, __next__ yields values, StopIteration signals end.`,complexity:`Concept`,section:`Why & When`,example:`# PYTHON ITERATOR PROTOCOL

# Three components:
# 1. __iter__() → returns iterator object
# 2. __next__() → returns next value
# 3. StopIteration → signals exhaustion

# SIMPLE EXAMPLE:
class CountDown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self  # Iterator is itself

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

# Usage:
for num in CountDown(3):
    print(num)  # 3, 2, 1

# WHY __iter__ AND __next__ SEPARATE?
# - Separation of concerns
# - __iter__ can return different iterator types
# - Allows multiple simultaneous iterations

# BUILT-IN USES PROTOCOL:
# for loop calls: iter(obj) → obj.__iter__()
# Then repeatedly: next(iterator) → iterator.__next__()
# Until: StopIteration caught → loop ends

# INTERVIEW TIP:
# If asked "implement iterator":
# 1. __init__ stores state
# 2. __iter__ returns self
# 3. __next__ yields and updates state
# 4. Raise StopIteration when done

# LAZY VS EAGER:
# Lazy (generator/iterator): yield one at a time
# Eager (list): compute all upfront
# Choose lazy for large/infinite sequences`},{signature:`Flatten Nested List Iterator`,description:`Iterate over nested structure. Use stack for lazy traversal.`,complexity:`O(1) amortized next`,section:`Iterator`,example:`class NestedIterator:
    """
    Flatten nested list: [[1,1],2,[1,1]] -> 1,1,2,1,1
    Stack-based lazy evaluation.
    """
    def __init__(self, nestedList):
        self.stack = list(reversed(nestedList))

    def next(self) -> int:
        self._flatten_top()
        return self.stack.pop().getInteger()

    def hasNext(self) -> bool:
        self._flatten_top()
        return len(self.stack) > 0

    def _flatten_top(self):
        # Keep flattening until top is integer
        while self.stack and not self.stack[-1].isInteger():
            nested = self.stack.pop().getList()
            self.stack.extend(reversed(nested))

# Alternative: Pre-flatten (simpler but O(n) space)
class NestedIteratorPreFlatten:
    def __init__(self, nestedList):
        self.flat = []
        self._flatten(nestedList)
        self.index = 0

    def _flatten(self, lst):
        for item in lst:
            if item.isInteger():
                self.flat.append(item.getInteger())
            else:
                self._flatten(item.getList())

    def next(self) -> int:
        result = self.flat[self.index]
        self.index += 1
        return result

    def hasNext(self) -> bool:
        return self.index < len(self.flat)`},{signature:`Peeking Iterator`,description:`Iterator with peek() that shows next without consuming. Wrapper pattern.`,complexity:`O(1)`,section:`Iterator`,example:`class PeekingIterator:
    """
    Wrapper that adds peek() to any iterator.
    Cache one element ahead.
    """
    def __init__(self, iterator):
        self.iterator = iterator
        self.peeked = None
        self.has_peeked = False

    def peek(self) -> int:
        if not self.has_peeked:
            self.peeked = next(self.iterator)
            self.has_peeked = True
        return self.peeked

    def next(self) -> int:
        if self.has_peeked:
            self.has_peeked = False
            return self.peeked
        return next(self.iterator)

    def hasNext(self) -> bool:
        if self.has_peeked:
            return True
        try:
            self.peeked = next(self.iterator)
            self.has_peeked = True
            return True
        except StopIteration:
            return False

# Zigzag Iterator
class ZigzagIterator:
    """
    Alternate between multiple lists.
    [1,2], [3,4,5,6] -> 1,3,2,4,5,6
    """
    def __init__(self, v1: list, v2: list):
        from collections import deque
        self.queue = deque()
        for v in [v1, v2]:
            if v:
                self.queue.append(iter(v))

    def next(self) -> int:
        it = self.queue.popleft()
        result = next(it)
        try:
            next(it)  # Check if more elements
            self.queue.append(it)
        except StopIteration:
            pass
        return result

    def hasNext(self) -> bool:
        return len(self.queue) > 0`},{signature:`Token Bucket Rate Limiter`,description:`Allow burst traffic up to bucket size. Tokens regenerate over time.`,complexity:`O(1)`,section:`Rate Limiter`,example:`import time

class TokenBucket:
    """
    Token Bucket rate limiter.
    Allows bursts up to bucket size.
    """
    def __init__(self, capacity: int, refill_rate: float):
        self.capacity = capacity        # Max tokens
        self.tokens = capacity          # Current tokens
        self.refill_rate = refill_rate  # Tokens per second
        self.last_refill = time.time()

    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        self.tokens = min(
            self.capacity,
            self.tokens + elapsed * self.refill_rate
        )
        self.last_refill = now

    def consume(self, tokens: int = 1) -> bool:
        """Try to consume tokens. Returns True if allowed."""
        self._refill()
        if self.tokens >= tokens:
            self.tokens -= tokens
            return True
        return False

# Usage:
# limiter = TokenBucket(capacity=10, refill_rate=1)  # 1 token/sec
# limiter.consume()  # True (has 10 tokens)
# for _ in range(9): limiter.consume()  # True
# limiter.consume()  # False (no tokens left)
# time.sleep(5)
# limiter.consume()  # True (5 tokens refilled)`},{signature:`Sliding Window Rate Limiter`,description:`Limit requests in sliding time window. More precise than fixed window.`,complexity:`O(1)`,section:`Rate Limiter`,example:`import time
from collections import deque

class SlidingWindowRateLimiter:
    """
    Sliding window rate limiter.
    Limit to max_requests per window_seconds.
    """
    def __init__(self, max_requests: int, window_seconds: float):
        self.max_requests = max_requests
        self.window = window_seconds
        self.requests = deque()  # Timestamps

    def is_allowed(self) -> bool:
        now = time.time()

        # Remove old requests outside window
        while self.requests and self.requests[0] < now - self.window:
            self.requests.popleft()

        if len(self.requests) < self.max_requests:
            self.requests.append(now)
            return True
        return False

# Per-user rate limiting
class UserRateLimiter:
    def __init__(self, max_requests: int, window_seconds: float):
        self.max_requests = max_requests
        self.window = window_seconds
        self.user_requests = {}  # user_id -> deque of timestamps

    def is_allowed(self, user_id: str) -> bool:
        now = time.time()

        if user_id not in self.user_requests:
            self.user_requests[user_id] = deque()

        requests = self.user_requests[user_id]

        # Clean old requests
        while requests and requests[0] < now - self.window:
            requests.popleft()

        if len(requests) < self.max_requests:
            requests.append(now)
            return True
        return False`},{signature:`Browser History`,description:`Support back, forward, visit. Use list with pointer or two stacks.`,complexity:`O(1)`,section:`Browser`,example:`class BrowserHistory:
    """
    Browser history with back/forward navigation.
    List with current position pointer.
    """
    def __init__(self, homepage: str):
        self.history = [homepage]
        self.current = 0

    def visit(self, url: str) -> None:
        # Clear forward history
        self.history = self.history[:self.current + 1]
        self.history.append(url)
        self.current += 1

    def back(self, steps: int) -> str:
        self.current = max(0, self.current - steps)
        return self.history[self.current]

    def forward(self, steps: int) -> str:
        self.current = min(len(self.history) - 1, self.current + steps)
        return self.history[self.current]

# Two stacks version
class BrowserHistoryStacks:
    def __init__(self, homepage: str):
        self.back_stack = [homepage]
        self.forward_stack = []

    def visit(self, url: str) -> None:
        self.back_stack.append(url)
        self.forward_stack.clear()

    def back(self, steps: int) -> str:
        while steps > 0 and len(self.back_stack) > 1:
            self.forward_stack.append(self.back_stack.pop())
            steps -= 1
        return self.back_stack[-1]

    def forward(self, steps: int) -> str:
        while steps > 0 and self.forward_stack:
            self.back_stack.append(self.forward_stack.pop())
            steps -= 1
        return self.back_stack[-1]`},{signature:`Random Pick with Weight`,description:`Pick random index with probability proportional to weight. Use prefix sums + binary search.`,complexity:`O(log n) pick`,section:`Random`,example:`import random
import bisect

class Solution:
    """
    Pick random index where probability is
    proportional to weight.
    """
    def __init__(self, w: list):
        # Build prefix sum
        self.prefix = []
        total = 0
        for weight in w:
            total += weight
            self.prefix.append(total)
        self.total = total

    def pickIndex(self) -> int:
        # Random value in [1, total]
        target = random.randint(1, self.total)
        # Binary search for first prefix >= target
        return bisect.bisect_left(self.prefix, target)

# Example:
# w = [1, 3]
# prefix = [1, 4]
# total = 4
# Random 1: index 0 (1/4 probability)
# Random 2,3,4: index 1 (3/4 probability)

# Shuffle Array (Fisher-Yates)
class ShuffleArray:
    def __init__(self, nums: list):
        self.original = nums[:]
        self.array = nums

    def reset(self) -> list:
        self.array = self.original[:]
        return self.array

    def shuffle(self) -> list:
        for i in range(len(self.array) - 1, 0, -1):
            j = random.randint(0, i)
            self.array[i], self.array[j] = self.array[j], self.array[i]
        return self.array`}],v=[...h,...g,..._],y=[{signature:`GCD/LCM - when you need them`,description:`GCD: simplify fractions, find patterns, scheduling. LCM: synchronization, repeating events. Both O(log n). More common in interviews than you think!`,complexity:`Concept`,section:`Why & When`,example:`# GCD (Greatest Common Divisor)
# USE CASES:
# 1. Simplify fractions: gcd(numerator, denominator)
# 2. Check if coprime: gcd(a, b) == 1
# 3. Reduce problem size: array pattern problems
# 4. Scheduling: "Every X and Y days" → gcd

# Example: Simplify 18/24
import math
g = math.gcd(18, 24)  # 6
print(f"{18//g}/{24//g}")  # 3/4

# Example: Rotating array problem
# "After how many rotations does array return to start?"
# Answer: len(arr) / gcd(len(arr), k)

# LCM (Least Common Multiple)
# USE CASES:
# 1. Find when events sync: buses every X and Y min
# 2. Fraction addition (common denominator)
# 3. Grid problems (when patterns align)

# Example: Two buses - every 6 and 8 minutes
# When do they meet again?
lcm = 6 * 8 // math.gcd(6, 8)  # 24 minutes

# INTERVIEW GOTCHA:
# "Reduce array by gcd" problems:
# [2, 4, 6, 8] → gcd = 2 → [1, 2, 3, 4]
# [12, 18, 24] → gcd = 6 → [2, 3, 4]

# PERFORMANCE:
# math.gcd() is FAST: O(log min(a,b))
# Even for large numbers: gcd(10^18, 10^18) < 100 steps`},{signature:`Prime numbers - when and how`,description:`Trial division for single check O(√n). Sieve for multiple primes O(n log log n). Choose based on problem: checking vs generating. Big performance difference!`,complexity:`Concept`,section:`Why & When`,example:`# PROBLEM: Check if ONE number is prime
# → Use TRIAL DIVISION: O(√n)
def is_prime(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0: return False
    return True

# Fast enough for n up to 10^12 in interviews!

# PROBLEM: Find ALL primes up to N
# → Use SIEVE: O(n log log n)
def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False
    return [i for i in range(n+1) if is_prime[i]]

# PERFORMANCE COMPARISON:
# Find all primes up to 1,000,000:
# Trial division (check each): ~10 seconds
# Sieve: ~0.1 seconds (100x faster!)

# WHEN SIEVE MATTERS:
# - Need primes up to N (N < 10^7)
# - Factorization of many numbers
# - Counting primes in range

# WHEN TRIAL DIVISION:
# - Check single number
# - N is very large (> 10^9)
# - Need primality only, not all primes

# INTERVIEW PATTERN:
# "Count primes up to n" → Sieve (LeetCode 204)
# "Is n prime?" → Trial division
# "Prime factorization" → Trial division with √n limit`},{signature:`Modular arithmetic - why it matters`,description:`Prevents integer overflow. Required for large number problems. Competitive programming staple. Learn the rules: (a+b)%m, (a*b)%m work. Division needs modular inverse!`,complexity:`Concept`,section:`Why & When`,example:`# WHY MODULO?
# Problem: Compute 2^1000
# Answer has 300+ digits! Python int can handle it, but...
# - Memory intensive
# - Comparison/arithmetic slow
# - Interview: "return answer mod 10^9+7"

MOD = 10**9 + 7  # Common in competitive programming

# MODULAR RULES (what works):
a, b = 12345, 67890

# Addition (correct)
print((a + b) % MOD == ((a % MOD) + (b % MOD)) % MOD)

# Subtraction - (watch negatives!)
print((a - b + MOD) % MOD)  # Add MOD to handle negative

# Multiplication (correct)
print((a * b) % MOD == ((a % MOD) * (b % MOD)) % MOD)

# Exponentiation (correct)
print(pow(2, 100, MOD))  # Built-in handles mod efficiently!

# Division - (DOESN'T WORK DIRECTLY!)
# (a / b) % MOD is WRONG!
# Need modular inverse: (a * modinv(b)) % MOD

# WHEN YOU SEE MOD:
# "Return answer modulo 10^9+7" →
# 1. Apply mod to intermediate results
# 2. Use pow(base, exp, MOD) for powers
# 3. For division, use modular inverse (Fermat's)

# INTERVIEW EXAMPLE: Factorial mod
def factorial_mod(n):
    result = 1
    for i in range(2, n + 1):
        result = (result * i) % MOD
    return result

# Without mod: factorial(100) has 150+ digits
# With mod: always fits in int32

# COMMON INTERVIEW PATTERN:
# "Count ways to..." → answer is huge → return mod 10^9+7
# Examples: Climbing stairs, unique paths, combinations`},{signature:`GCD - Euclidean Algorithm`,description:`Greatest Common Divisor. Use modulo recursively until remainder is 0.`,complexity:`O(log min(a,b))`,section:`GCD/LCM`,example:`import math

# Built-in (Python 3.5+)
print(math.gcd(12, 18))  # 6

# Manual implementation (Euclidean algorithm)
def gcd(a, b):
    """Greatest Common Divisor using Euclidean algorithm."""
    while b:
        a, b = b, a % b
    return a

# How it works:
# gcd(48, 18)
# = gcd(18, 48 % 18) = gcd(18, 12)
# = gcd(12, 18 % 12) = gcd(12, 6)
# = gcd(6, 12 % 6) = gcd(6, 0)
# = 6

# Recursive version
def gcd_recursive(a, b):
    return a if b == 0 else gcd_recursive(b, a % b)

# GCD of list (Python 3.9+)
from math import gcd
from functools import reduce

nums = [12, 18, 24]
result = reduce(gcd, nums)  # 6`},{signature:`LCM - Least Common Multiple`,description:`LCM = (a * b) / GCD. Avoid overflow by dividing first.`,complexity:`O(log min(a,b))`,section:`GCD/LCM`,example:`import math

# Built-in (Python 3.9+)
print(math.lcm(4, 6))  # 12

# Manual implementation using GCD
def lcm(a, b):
    """Least Common Multiple using GCD."""
    return a * b // math.gcd(a, b)

# Avoid overflow: divide before multiply
def lcm_safe(a, b):
    return a // math.gcd(a, b) * b

# LCM of list
from functools import reduce
nums = [4, 6, 8]
result = reduce(lcm, nums)  # 24

# INTERVIEW: Fraction addition
# To add fractions, find LCM of denominators
def add_fractions(frac1, frac2):
    """Add two fractions given as (numerator, denominator)."""
    n1, d1 = frac1
    n2, d2 = frac2
    common_denom = lcm(d1, d2)
    new_num = n1 * (common_denom // d1) + n2 * (common_denom // d2)
    common = math.gcd(new_num, common_denom)
    return (new_num // common, common_denom // common)

print(add_fractions((1, 4), (1, 6)))  # (5, 12)`},{signature:`Extended Euclidean Algorithm`,description:`Find x, y such that ax + by = gcd(a, b). Used for modular inverse.`,complexity:`O(log min(a,b))`,section:`GCD/LCM`,example:`def extended_gcd(a, b):
    """
    Returns (gcd, x, y) such that ax + by = gcd(a, b)
    """
    if b == 0:
        return a, 1, 0

    gcd, x1, y1 = extended_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1

    return gcd, x, y

# Example: 35x + 15y = gcd(35, 15) = 5
g, x, y = extended_gcd(35, 15)
print(f"{35}*{x} + {15}*{y} = {g}")
# 35 * 1 + 15 * (-2) = 5

# Application: Modular inverse
# Find x such that (a * x) % m = 1
def mod_inverse(a, m):
    """
    Modular multiplicative inverse.
    Returns x such that (a * x) % m = 1.
    Only exists if gcd(a, m) = 1.
    """
    g, x, _ = extended_gcd(a, m)
    if g != 1:
        return None  # Inverse doesn't exist
    return x % m

print(mod_inverse(3, 7))  # 5, because 3*5 = 15 = 1 (mod 7)`},{signature:`Prime Check`,description:`Check if number is prime. Only check up to sqrt(n).`,complexity:`O(sqrt(n))`,section:`Primes`,example:`def is_prime(n):
    """Check if n is prime."""
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False

    # Only check odd numbers up to sqrt(n)
    i = 3
    while i * i <= n:
        if n % i == 0:
            return False
        i += 2

    return True

# More readable version
def is_prime_v2(n):
    if n < 2:
        return False
    if n == 2 or n == 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False

    # All primes > 3 are of form 6k +/- 1
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6

    return True

print([n for n in range(20) if is_prime(n)])
# [2, 3, 5, 7, 11, 13, 17, 19]`},{signature:`Sieve of Eratosthenes`,description:`Find all primes up to n. Mark multiples of each prime as composite.`,complexity:`O(n log log n)`,section:`Primes`,example:`def sieve_of_eratosthenes(n):
    """
    Return list of all primes up to n.
    Classic O(n log log n) algorithm.
    """
    if n < 2:
        return []

    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False

    # Only need to check up to sqrt(n)
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            # Mark all multiples as not prime
            # Start at i*i (smaller multiples already marked)
            for j in range(i * i, n + 1, i):
                is_prime[j] = False

    return [i for i in range(n + 1) if is_prime[i]]

print(sieve_of_eratosthenes(30))
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

# Count primes (LeetCode 204)
def count_primes(n):
    if n <= 2:
        return 0
    sieve = [True] * n
    sieve[0] = sieve[1] = False
    for i in range(2, int(n**0.5) + 1):
        if sieve[i]:
            for j in range(i*i, n, i):
                sieve[j] = False
    return sum(sieve)`},{signature:`Prime Factorization`,description:`Find all prime factors with their powers. Divide by smallest factor repeatedly.`,complexity:`O(sqrt(n))`,section:`Primes`,example:`def prime_factorization(n):
    """
    Return dict of {prime: power}.
    """
    factors = {}

    # Check for 2s
    while n % 2 == 0:
        factors[2] = factors.get(2, 0) + 1
        n //= 2

    # Check odd numbers up to sqrt(n)
    i = 3
    while i * i <= n:
        while n % i == 0:
            factors[i] = factors.get(i, 0) + 1
            n //= i
        i += 2

    # If n is still > 1, it's a prime factor
    if n > 1:
        factors[n] = 1

    return factors

print(prime_factorization(84))
# {2: 2, 3: 1, 7: 1}  ->  84 = 2^2 * 3 * 7

print(prime_factorization(100))
# {2: 2, 5: 2}  ->  100 = 2^2 * 5^2

# Get all factors (not just prime)
def all_factors(n):
    factors = []
    for i in range(1, int(n**0.5) + 1):
        if n % i == 0:
            factors.append(i)
            if i != n // i:
                factors.append(n // i)
    return sorted(factors)

print(all_factors(12))  # [1, 2, 3, 4, 6, 12]`},{signature:`Modular Exponentiation`,description:`Compute (base^exp) % mod efficiently. Square-and-multiply algorithm.`,complexity:`O(log exp)`,section:`Modular`,example:`# Built-in pow with mod (fastest)
result = pow(2, 100, 1000000007)

# Manual implementation
def mod_pow(base, exp, mod):
    """
    Compute (base^exp) % mod efficiently.
    Uses binary exponentiation.
    """
    result = 1
    base = base % mod

    while exp > 0:
        # If exp is odd, multiply result
        if exp % 2 == 1:
            result = (result * base) % mod

        # Square the base
        exp //= 2
        base = (base * base) % mod

    return result

print(mod_pow(2, 10, 1000))  # 24 (1024 % 1000)

# INTERVIEW: Large power computation
# 2^100 % (10^9 + 7)
MOD = 10**9 + 7
print(pow(2, 100, MOD))  # Fast!

# Recursive version
def mod_pow_recursive(base, exp, mod):
    if exp == 0:
        return 1
    if exp % 2 == 0:
        half = mod_pow_recursive(base, exp // 2, mod)
        return (half * half) % mod
    else:
        return (base * mod_pow_recursive(base, exp - 1, mod)) % mod`},{signature:`Modular Inverse`,description:`Find x where (a * x) % m = 1. Use Fermat or extended GCD.`,complexity:`O(log m)`,section:`Modular`,example:`# Method 1: Using pow (Python 3.8+)
# Works when m is prime
def mod_inverse_pow(a, m):
    """
    Modular inverse using Fermat's little theorem.
    Only works when m is PRIME.
    a^(-1) = a^(m-2) (mod m)
    """
    return pow(a, m - 2, m)

MOD = 10**9 + 7  # Prime!
inv = mod_inverse_pow(3, MOD)
print((3 * inv) % MOD)  # 1

# Method 2: Extended GCD (works for any coprime m)
def mod_inverse_ext_gcd(a, m):
    def extended_gcd(a, b):
        if b == 0:
            return a, 1, 0
        g, x, y = extended_gcd(b, a % b)
        return g, y, x - (a // b) * y

    g, x, _ = extended_gcd(a % m, m)
    if g != 1:
        return None
    return x % m

# INTERVIEW: Division under modulo
# a / b (mod m) = a * b^(-1) (mod m)
def mod_divide(a, b, m):
    return (a * mod_inverse_pow(b, m)) % m

# Example: 10 / 2 (mod 7) = 5 (since 5*2 = 10 = 3 (mod 7))
print(mod_divide(10, 2, 7))  # 5`},{signature:`Modular Arithmetic Rules`,description:`Addition, subtraction, multiplication under modulo. Division needs modular inverse.`,complexity:`O(1)`,section:`Modular`,example:`MOD = 10**9 + 7

# Addition
def mod_add(a, b, m=MOD):
    return (a % m + b % m) % m

# Subtraction (handle negative)
def mod_sub(a, b, m=MOD):
    return (a % m - b % m + m) % m

# Multiplication
def mod_mul(a, b, m=MOD):
    return (a % m * b % m) % m

# IMPORTANT: No direct division!
# a / b (mod m) = a * mod_inverse(b, m) (mod m)

# INTERVIEW: Compute factorial % MOD
def factorial_mod(n, mod=MOD):
    result = 1
    for i in range(2, n + 1):
        result = (result * i) % mod
    return result

# Compute nCr % MOD
def ncr_mod(n, r, mod=MOD):
    """Compute C(n, r) % mod using Fermat's little theorem."""
    if r > n or r < 0:
        return 0

    # Precompute factorials
    fact = [1] * (n + 1)
    for i in range(1, n + 1):
        fact[i] = (fact[i-1] * i) % mod

    # nCr = n! / (r! * (n-r)!)
    # Under mod: n! * inverse(r!) * inverse((n-r)!)
    numerator = fact[n]
    denominator = (fact[r] * fact[n - r]) % mod
    return (numerator * pow(denominator, mod - 2, mod)) % mod

print(ncr_mod(10, 3))  # 120`}],b=[{signature:`Pascal Triangle nCr`,description:`Compute combinations using Pascal's triangle. Avoids factorial overflow.`,complexity:`O(n*r)`,section:`Combinatorics`,example:`def ncr_pascal(n, r):
    """
    Compute C(n, r) using Pascal's triangle.
    Avoids large intermediate values.
    """
    if r > n - r:
        r = n - r  # Optimization: C(n,r) = C(n, n-r)

    # Build row of Pascal's triangle
    dp = [1] * (r + 1)

    for i in range(1, n - r + 1):
        for j in range(r, 0, -1):
            dp[j] += dp[j - 1]

    return dp[r]

print(ncr_pascal(10, 3))  # 120

# Alternative: Direct formula
def ncr_direct(n, r):
    """
    C(n,r) = n! / (r! * (n-r)!)
    Compute without full factorial.
    """
    if r > n - r:
        r = n - r

    result = 1
    for i in range(r):
        result = result * (n - i) // (i + 1)

    return result

# Generate full Pascal's triangle
def pascal_triangle(n):
    triangle = [[1]]
    for i in range(1, n):
        row = [1]
        for j in range(1, i):
            row.append(triangle[i-1][j-1] + triangle[i-1][j])
        row.append(1)
        triangle.append(row)
    return triangle`},{signature:`Catalan Numbers`,description:`Count valid parentheses, BST structures, paths. C(n) = C(2n,n)/(n+1).`,complexity:`O(n)`,section:`Combinatorics`,example:`def catalan(n):
    """
    nth Catalan number.
    Applications:
    - Valid parentheses combinations
    - Number of BST structures with n nodes
    - Paths in grid staying below diagonal
    """
    if n <= 1:
        return 1

    # Formula: C(n) = C(2n, n) / (n + 1)
    result = 1
    for i in range(n):
        result = result * (2 * n - i) // (i + 1)
    return result // (n + 1)

# DP approach
def catalan_dp(n):
    dp = [0] * (n + 1)
    dp[0] = dp[1] = 1

    for i in range(2, n + 1):
        for j in range(i):
            dp[i] += dp[j] * dp[i - 1 - j]

    return dp[n]

# First 10 Catalan numbers:
print([catalan(i) for i in range(10)])
# [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862]

# INTERVIEW: Unique BSTs
def num_trees(n):
    """Number of structurally unique BSTs with n nodes."""
    return catalan(n)`},{signature:`Power of Two/Three/Four`,description:`Check if number is power of base. Use bit manipulation or log.`,complexity:`O(1)`,section:`Powers`,example:`import math

# Power of 2: only one bit set
def is_power_of_2(n):
    return n > 0 and (n & (n - 1)) == 0

# Power of 3: largest power of 3 divisible by n
def is_power_of_3(n):
    # 3^19 = 1162261467 is largest 32-bit power of 3
    return n > 0 and 1162261467 % n == 0

# Power of 4: power of 2 AND bits at even positions
def is_power_of_4(n):
    # 0x55555555 = 0101...0101 (bits at even positions)
    return n > 0 and (n & (n - 1)) == 0 and (n & 0x55555555) != 0

# Generic power check
def is_power_of(n, base):
    if n <= 0:
        return False
    while n % base == 0:
        n //= base
    return n == 1

# Using logarithm
def is_power_of_log(n, base):
    if n <= 0:
        return False
    log_val = math.log(n) / math.log(base)
    return abs(log_val - round(log_val)) < 1e-10

print(is_power_of_2(16))  # True
print(is_power_of_3(27))  # True
print(is_power_of_4(64))  # True`},{signature:`Sqrt & Power Functions`,description:`Compute square root and power without built-ins. Binary search or Newton's method.`,complexity:`O(log n)`,section:`Powers`,example:`# Square root with binary search
def my_sqrt(x):
    """Integer square root (floor)."""
    if x < 2:
        return x

    left, right = 1, x // 2

    while left <= right:
        mid = (left + right) // 2
        if mid * mid == x:
            return mid
        elif mid * mid < x:
            left = mid + 1
        else:
            right = mid - 1

    return right

# Newton's method (faster convergence)
def sqrt_newton(x, precision=1e-10):
    if x < 0:
        raise ValueError("Negative input")
    if x == 0:
        return 0

    guess = x
    while abs(guess * guess - x) > precision:
        guess = (guess + x / guess) / 2

    return guess

# Power function (x^n)
def my_pow(x, n):
    """Compute x^n using binary exponentiation."""
    if n < 0:
        x = 1 / x
        n = -n

    result = 1
    while n > 0:
        if n % 2 == 1:
            result *= x
        x *= x
        n //= 2

    return result

print(my_sqrt(8))       # 2
print(my_pow(2, 10))    # 1024
print(my_pow(2, -2))    # 0.25`},{signature:`Happy Number`,description:`Sum of squares of digits eventually reaches 1. Use cycle detection.`,complexity:`O(log n)`,section:`Number Theory`,example:`def is_happy(n):
    """
    A happy number reaches 1 when replacing with
    sum of squares of digits repeatedly.
    Use Floyd's cycle detection.
    """
    def get_next(num):
        total = 0
        while num > 0:
            digit = num % 10
            total += digit * digit
            num //= 10
        return total

    slow = n
    fast = get_next(n)

    while fast != 1 and slow != fast:
        slow = get_next(slow)
        fast = get_next(get_next(fast))

    return fast == 1

# Alternative: HashSet for cycle detection
def is_happy_set(n):
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = sum(int(d) ** 2 for d in str(n))
    return n == 1

print(is_happy(19))  # True: 19->82->68->100->1
print(is_happy(2))   # False`},{signature:`Ugly Number`,description:`Numbers whose prime factors are only 2, 3, 5. Use heap or DP.`,complexity:`O(n)`,section:`Number Theory`,example:`# Check if ugly
def is_ugly(n):
    """Ugly number has only 2, 3, 5 as prime factors."""
    if n <= 0:
        return False
    for p in [2, 3, 5]:
        while n % p == 0:
            n //= p
    return n == 1

# Find nth ugly number (DP)
def nth_ugly(n):
    """Return the nth ugly number."""
    ugly = [0] * n
    ugly[0] = 1

    i2 = i3 = i5 = 0  # Pointers for each prime
    next2, next3, next5 = 2, 3, 5

    for i in range(1, n):
        next_ugly = min(next2, next3, next5)
        ugly[i] = next_ugly

        if next_ugly == next2:
            i2 += 1
            next2 = ugly[i2] * 2
        if next_ugly == next3:
            i3 += 1
            next3 = ugly[i3] * 3
        if next_ugly == next5:
            i5 += 1
            next5 = ugly[i5] * 5

    return ugly[n - 1]

print(nth_ugly(10))  # 12
# Sequence: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12...

# Super Ugly (generalized primes)
import heapq

def nth_super_ugly(n, primes):
    heap = [1]
    seen = {1}

    for _ in range(n):
        ugly = heapq.heappop(heap)
        for p in primes:
            next_ugly = ugly * p
            if next_ugly not in seen:
                seen.add(next_ugly)
                heapq.heappush(heap, next_ugly)

    return ugly`},{signature:`Reverse Integer`,description:`Reverse digits handling overflow. Check bounds before multiplying.`,complexity:`O(log n)`,section:`Number Theory`,example:`def reverse_integer(x):
    """
    Reverse digits of 32-bit signed integer.
    Return 0 if overflow.
    """
    INT_MIN, INT_MAX = -2**31, 2**31 - 1

    sign = 1 if x >= 0 else -1
    x = abs(x)

    result = 0
    while x:
        digit = x % 10
        x //= 10

        # Check for overflow before adding
        if result > (INT_MAX - digit) // 10:
            return 0

        result = result * 10 + digit

    return sign * result

print(reverse_integer(123))   # 321
print(reverse_integer(-123))  # -321
print(reverse_integer(1534236469))  # 0 (overflow)

# Palindrome number
def is_palindrome(x):
    """Check if integer is palindrome without converting to string."""
    if x < 0 or (x % 10 == 0 and x != 0):
        return False

    reversed_half = 0
    while x > reversed_half:
        reversed_half = reversed_half * 10 + x % 10
        x //= 10

    return x == reversed_half or x == reversed_half // 10

print(is_palindrome(121))   # True
print(is_palindrome(1221))  # True`},{signature:`Integer to Roman`,description:`Convert integer to Roman numeral. Greedy with value-symbol pairs.`,complexity:`O(1)`,section:`Number Theory`,example:`def int_to_roman(num):
    """Convert integer to Roman numeral."""
    val_sym = [
        (1000, 'M'), (900, 'CM'), (500, 'D'), (400, 'CD'),
        (100, 'C'), (90, 'XC'), (50, 'L'), (40, 'XL'),
        (10, 'X'), (9, 'IX'), (5, 'V'), (4, 'IV'), (1, 'I')
    ]

    result = []
    for val, sym in val_sym:
        while num >= val:
            result.append(sym)
            num -= val

    return ''.join(result)

print(int_to_roman(1994))  # "MCMXCIV"

def roman_to_int(s):
    """Convert Roman numeral to integer."""
    values = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50,
        'C': 100, 'D': 500, 'M': 1000
    }

    result = 0
    prev = 0

    for char in reversed(s):
        curr = values[char]
        if curr < prev:
            result -= curr
        else:
            result += curr
        prev = curr

    return result

print(roman_to_int("MCMXCIV"))  # 1994`},{signature:`Count Digits / Sum of Digits`,description:`Count or sum digits of a number. Use modulo and division.`,complexity:`O(log n)`,section:`Number Theory`,example:`def count_digits(n):
    """Count number of digits."""
    if n == 0:
        return 1
    count = 0
    n = abs(n)
    while n:
        count += 1
        n //= 10
    return count

# Or using log
import math
def count_digits_log(n):
    if n == 0:
        return 1
    return int(math.log10(abs(n))) + 1

def sum_of_digits(n):
    """Sum of all digits."""
    total = 0
    n = abs(n)
    while n:
        total += n % 10
        n //= 10
    return total

# Digital root (repeated sum until single digit)
def digital_root(n):
    """
    Keep summing digits until single digit.
    Formula: 1 + (n-1) % 9 for n > 0
    """
    if n == 0:
        return 0
    return 1 + (n - 1) % 9

print(count_digits(12345))    # 5
print(sum_of_digits(12345))   # 15
print(digital_root(12345))    # 6 (1+2+3+4+5=15, 1+5=6)

# Add digits (LeetCode 258)
def add_digits(num):
    return digital_root(num)`},{signature:`Self Dividing Numbers`,description:`Numbers divisible by all their digits. No zeros allowed.`,complexity:`O(log n)`,section:`Number Theory`,example:`def is_self_dividing(n):
    """
    Number divisible by all its non-zero digits.
    Example: 128 -> 128%1=0, 128%2=0, 128%8=0 (correct)
    """
    original = n
    while n:
        digit = n % 10
        if digit == 0 or original % digit != 0:
            return False
        n //= 10
    return True

def self_dividing_range(left, right):
    """Find all self-dividing numbers in range."""
    return [n for n in range(left, right + 1) if is_self_dividing(n)]

print(self_dividing_range(1, 22))
# [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]

# Armstrong/Narcissistic numbers
def is_armstrong(n):
    """
    Sum of digits^(num_digits) equals number.
    Example: 153 = 1^3 + 5^3 + 3^3
    """
    s = str(n)
    power = len(s)
    return n == sum(int(d) ** power for d in s)

print([n for n in range(1, 1000) if is_armstrong(n)])
# [1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407]`}],x=[...y,...b],S=[{signature:`Why Generators?`,description:`Memory-efficient iteration. Yield values one at a time instead of creating full list in memory.`,complexity:`O(1) memory`,section:`Why Generators`,example:`# MEMORY COMPARISON
# List: stores ALL values in memory at once
# Generator: produces ONE value at a time

# Bad: Creates list of 1 billion numbers
huge_list = [x for x in range(1_000_000_000)]  # ~8GB memory!

# Good: Produces one number at a time
def huge_gen():
    for x in range(1_000_000_000):
        yield x  # Only one value in memory

# USE GENERATORS WHEN:
# 1. Working with large/infinite sequences
# 2. You only need to iterate once
# 3. Memory is constrained
# 4. Values are expensive to compute

# DON'T USE WHEN:
# 1. You need random access (list[5])
# 2. You need to iterate multiple times
# 3. You need len()
# 4. Sequence is small enough to fit in memory

# Real-world example: Processing large files
def read_large_file(path):
    with open(path) as f:
        for line in f:  # File is already a generator!
            yield line.strip()

# Process 100GB log file with constant memory
for line in read_large_file("huge.log"):
    if "ERROR" in line:
        print(line)`},{signature:`Generator vs List Comprehension`,description:`Generator expressions use () instead of []. Same syntax, lazy evaluation.`,complexity:`O(1) space`,section:`Why Generators`,example:`# List comprehension: [expr for x in iterable]
squares_list = [x**2 for x in range(10)]
# Creates list [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Generator expression: (expr for x in iterable)
squares_gen = (x**2 for x in range(10))
# Creates generator object

# Memory comparison
import sys

list_size = sys.getsizeof([x for x in range(1000)])
gen_size = sys.getsizeof(x for x in range(1000))

print(f"List: {list_size} bytes")   # ~8856 bytes
print(f"Generator: {gen_size} bytes")  # ~120 bytes

# Converting generator to list
squares_gen = (x**2 for x in range(5))
squares_list = list(squares_gen)  # [0, 1, 4, 9, 16]

# IMPORTANT: Generator is exhausted after one use!
gen = (x for x in range(3))
print(list(gen))  # [0, 1, 2]
print(list(gen))  # [] (empty!)

# Passing to functions
sum_result = sum(x**2 for x in range(10))  # No extra []
# Equivalent to: sum([x**2 for x in range(10)])
# But more memory efficient`},{signature:`yield Keyword`,description:`Pause function and return value. State is preserved between calls.`,complexity:`O(1) per yield`,section:`yield`,example:`def simple_generator():
    """Generator function using yield."""
    print("Start")
    yield 1
    print("After first yield")
    yield 2
    print("After second yield")
    yield 3
    print("End")

# Create generator object (doesn't run yet!)
gen = simple_generator()

# Each next() runs until next yield
print(next(gen))  # "Start", returns 1
print(next(gen))  # "After first yield", returns 2
print(next(gen))  # "After second yield", returns 3
# next(gen)       # "End", raises StopIteration

# Using in for loop (handles StopIteration)
for value in simple_generator():
    print(value)
# Output: Start, 1, After first yield, 2, After second yield, 3, End

# Generator state is preserved
def counter():
    count = 0
    while True:
        yield count
        count += 1

c = counter()
print(next(c))  # 0
print(next(c))  # 1
print(next(c))  # 2`},{signature:`yield from`,description:`Delegate to another generator. Flatten nested generators elegantly.`,complexity:`O(1) delegation`,section:`yield`,example:`# Without yield from (verbose)
def flatten_manual(nested):
    for item in nested:
        if isinstance(item, list):
            for x in flatten_manual(item):
                yield x
        else:
            yield item

# With yield from (elegant)
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

nested = [1, [2, 3, [4, 5]], 6]
print(list(flatten(nested)))  # [1, 2, 3, 4, 5, 6]

# Delegate to another generator
def gen1():
    yield 1
    yield 2

def gen2():
    yield from gen1()  # Delegate to gen1
    yield 3
    yield 4

print(list(gen2()))  # [1, 2, 3, 4]

# Chain multiple generators
def chain_generators(*gens):
    for gen in gens:
        yield from gen

combined = chain_generators(
    range(3),
    "abc",
    [10, 20]
)
print(list(combined))  # [0, 1, 2, 'a', 'b', 'c', 10, 20]`},{signature:`Generator State`,description:`Generators remember their state between yields. Use for stateful iteration.`,complexity:`O(1)`,section:`yield`,example:`def running_average():
    """Generator that computes running average."""
    total = 0
    count = 0

    while True:
        value = yield total / count if count else 0
        if value is not None:
            total += value
            count += 1

# Usage (with send)
avg = running_average()
next(avg)  # Prime the generator
print(avg.send(10))  # 10.0
print(avg.send(20))  # 15.0
print(avg.send(30))  # 20.0

# Generator for unique IDs
def id_generator(prefix="ID"):
    """Generate unique IDs."""
    count = 0
    while True:
        yield f"{prefix}_{count:05d}"
        count += 1

ids = id_generator("USER")
print(next(ids))  # USER_00000
print(next(ids))  # USER_00001

# Generator remembers position
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
first_10 = [next(fib) for _ in range(10)]
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Continue from where we left off!
next_5 = [next(fib) for _ in range(5)]
# [55, 89, 144, 233, 377]`},{signature:`next() and StopIteration`,description:`Manually advance generator. Handle end of iteration.`,complexity:`O(1)`,section:`next`,example:`def simple_gen():
    yield 1
    yield 2
    yield 3

gen = simple_gen()

# next() advances generator
print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3
# print(next(gen))  # StopIteration exception!

# Default value to avoid exception
gen = simple_gen()
print(next(gen, "default"))  # 1
print(next(gen, "default"))  # 2
print(next(gen, "default"))  # 3
print(next(gen, "default"))  # "default"

# Check if generator has more values
def has_next(gen):
    """Check if generator has more values without consuming."""
    try:
        first = next(gen)
        # Put it back by chaining
        from itertools import chain
        return chain([first], gen)
    except StopIteration:
        return None

# Practical: Get first N items
def take(n, iterable):
    for i, item in enumerate(iterable):
        if i >= n:
            break
        yield item

gen = (x**2 for x in range(100))
first_5 = list(take(5, gen))  # [0, 1, 4, 9, 16]`},{signature:`__iter__ and __next__`,description:`Make custom class iterable. Implement iterator protocol.`,complexity:`O(1) per iteration`,section:`Custom Iterators`,example:`class Range:
    """Custom implementation of range()."""

    def __init__(self, start, stop=None, step=1):
        if stop is None:
            start, stop = 0, start
        self.start = start
        self.stop = stop
        self.step = step

    def __iter__(self):
        self.current = self.start
        return self

    def __next__(self):
        if (self.step > 0 and self.current >= self.stop) or \\
           (self.step < 0 and self.current <= self.stop):
            raise StopIteration
        result = self.current
        self.current += self.step
        return result

# Usage
for i in Range(5):
    print(i)  # 0, 1, 2, 3, 4

for i in Range(2, 10, 2):
    print(i)  # 2, 4, 6, 8

# Separate Iterator class (better practice)
class LinkedList:
    def __init__(self, values):
        self.head = None
        for v in reversed(values):
            node = {"val": v, "next": self.head}
            self.head = node

    def __iter__(self):
        return LinkedListIterator(self.head)

class LinkedListIterator:
    def __init__(self, head):
        self.current = head

    def __next__(self):
        if self.current is None:
            raise StopIteration
        val = self.current["val"]
        self.current = self.current["next"]
        return val

ll = LinkedList([1, 2, 3])
print(list(ll))  # [1, 2, 3]`},{signature:`Sentinel Pattern with iter()`,description:`iter() with callable and sentinel. Read until condition met.`,complexity:`O(n)`,section:`Custom Iterators`,example:`# iter(callable, sentinel)
# Calls callable until it returns sentinel

import random

# Roll dice until we get 6
def roll():
    return random.randint(1, 6)

rolls = iter(roll, 6)
print(list(rolls))  # [3, 1, 4, 2, ...] (stops at first 6)

# Read file in chunks
def read_chunk():
    return file.read(1024)

# for chunk in iter(read_chunk, b''):
#     process(chunk)

# Read lines until empty
import sys
def get_line():
    return input("Enter (empty to stop): ")

# for line in iter(get_line, ''):
#     print(f"Got: {line}")

# Practical: Read until EOF
with open('data.txt', 'rb') as f:
    for block in iter(lambda: f.read(4096), b''):
        process_block(block)

# Infinite counter with sentinel
def make_counter():
    n = 0
    def count():
        nonlocal n
        n += 1
        return n
    return count

counter = make_counter()
# Get numbers until we reach 5
nums = list(iter(counter, 5))
print(nums)  # [1, 2, 3, 4]`}],C=[{signature:`Generator send()`,description:`Send values INTO generator. Two-way communication with yield.`,complexity:`O(1)`,section:`Coroutines`,example:`def coroutine():
    """Generator that receives values via send()."""
    print("Starting coroutine")
    while True:
        received = yield  # Pause and receive
        print(f"Received: {received}")

# Create and prime the coroutine
coro = coroutine()
next(coro)  # Advance to first yield (priming)
# Output: Starting coroutine

coro.send(10)   # Received: 10
coro.send(20)   # Received: 20

# Yield AND receive
def accumulator():
    """Accumulate values, yield running total."""
    total = 0
    while True:
        value = yield total  # Return total, receive value
        if value is not None:
            total += value

acc = accumulator()
next(acc)       # Prime, returns 0
print(acc.send(10))  # 10
print(acc.send(20))  # 30
print(acc.send(5))   # 35

# Decorator to auto-prime coroutines
def coroutine_decorator(func):
    def wrapper(*args, **kwargs):
        gen = func(*args, **kwargs)
        next(gen)  # Auto-prime
        return gen
    return wrapper

@coroutine_decorator
def printer():
    while True:
        value = yield
        print(f"> {value}")

p = printer()  # Already primed!
p.send("Hello")  # > Hello`},{signature:`Generator throw() and close()`,description:`Inject exceptions or cleanly shutdown generators.`,complexity:`O(1)`,section:`Coroutines`,example:`def generator_with_cleanup():
    """Generator with proper cleanup handling."""
    print("Starting")
    try:
        while True:
            value = yield
            print(f"Got: {value}")
    except GeneratorExit:
        print("Closing gracefully")
    finally:
        print("Cleanup done")

gen = generator_with_cleanup()
next(gen)
gen.send(1)  # Got: 1
gen.close()  # Closing gracefully, Cleanup done

# throw() - inject exception
def cancellable_task():
    try:
        while True:
            yield "working..."
    except Exception as e:
        yield f"Error: {e}"
        return

task = cancellable_task()
print(next(task))  # working...
print(task.throw(ValueError, "Cancelled!"))  # Error: Cancelled!

# Practical: Timeout handling
class TimeoutError(Exception):
    pass

def long_running():
    try:
        for i in range(100):
            yield i
    except TimeoutError:
        yield "Timed out!"

gen = long_running()
for i, val in enumerate(gen):
    if i > 5:
        print(gen.throw(TimeoutError))
        break
    print(val)`},{signature:`Generator Pipelines`,description:`Chain generators for data processing. Memory-efficient ETL pattern.`,complexity:`O(n) time, O(1) space`,section:`Pipelines`,example:`# Pipeline: read -> filter -> transform -> output
# Each step is a generator, data flows through one item at a time

def read_data(filename):
    """Stage 1: Read lines."""
    with open(filename) as f:
        for line in f:
            yield line.strip()

def filter_empty(lines):
    """Stage 2: Filter empty lines."""
    for line in lines:
        if line:
            yield line

def parse_json(lines):
    """Stage 3: Parse as JSON."""
    import json
    for line in lines:
        try:
            yield json.loads(line)
        except json.JSONDecodeError:
            continue

def extract_field(records, field):
    """Stage 4: Extract specific field."""
    for record in records:
        if field in record:
            yield record[field]

# Build pipeline
pipeline = extract_field(
    parse_json(
        filter_empty(
            read_data("data.jsonl")
        )
    ),
    "name"
)

# Process with constant memory
for name in pipeline:
    print(name)

# Functional style
def pipeline(*stages):
    """Compose generators into pipeline."""
    def run(data):
        for stage in stages:
            data = stage(data)
        return data
    return run

process = pipeline(
    filter_empty,
    str.upper,  # Transform
    list  # Materialize
)`},{signature:`Generator Map/Filter/Reduce`,description:`Lazy versions of functional operations. Build custom pipelines.`,complexity:`O(n)`,section:`Pipelines`,example:`# Lazy map
def lazy_map(func, iterable):
    for item in iterable:
        yield func(item)

# Lazy filter
def lazy_filter(predicate, iterable):
    for item in iterable:
        if predicate(item):
            yield item

# Lazy reduce (returns generator of partial results)
def lazy_reduce(func, iterable, initial=None):
    it = iter(iterable)
    if initial is None:
        try:
            acc = next(it)
        except StopIteration:
            return
    else:
        acc = initial
    yield acc
    for item in it:
        acc = func(acc, item)
        yield acc

# Usage
nums = range(10)
pipeline = lazy_filter(
    lambda x: x % 2 == 0,
    lazy_map(lambda x: x ** 2, nums)
)
print(list(pipeline))  # [0, 4, 16, 36, 64]

# Running sum
sums = lazy_reduce(lambda a, b: a + b, [1, 2, 3, 4, 5])
print(list(sums))  # [1, 3, 6, 10, 15]

# Chunk generator
def chunked(iterable, size):
    """Yield chunks of given size."""
    chunk = []
    for item in iterable:
        chunk.append(item)
        if len(chunk) == size:
            yield chunk
            chunk = []
    if chunk:
        yield chunk

print(list(chunked(range(10), 3)))
# [[0,1,2], [3,4,5], [6,7,8], [9]]`}],w=[{signature:`Generator Context Manager`,description:`Use generator as context manager with contextlib. Elegant resource management.`,complexity:`O(1)`,section:`Context Managers`,example:`from contextlib import contextmanager

@contextmanager
def open_file(path, mode='r'):
    """Context manager using generator."""
    print(f"Opening {path}")
    f = open(path, mode)
    try:
        yield f  # This is what 'with' returns
    finally:
        print(f"Closing {path}")
        f.close()

# Usage
with open_file("data.txt") as f:
    content = f.read()

# Timing context manager
import time

@contextmanager
def timer(label):
    start = time.time()
    try:
        yield
    finally:
        elapsed = time.time() - start
        print(f"{label}: {elapsed:.3f}s")

with timer("Processing"):
    time.sleep(0.5)
# Output: Processing: 0.500s

# Temporary change context
@contextmanager
def temp_attr(obj, attr, value):
    """Temporarily change an attribute."""
    old_value = getattr(obj, attr)
    setattr(obj, attr, value)
    try:
        yield
    finally:
        setattr(obj, attr, old_value)`},{signature:`suppress() and ExitStack`,description:`Advanced context management. Suppress exceptions, manage multiple contexts.`,complexity:`O(1)`,section:`Context Managers`,example:`from contextlib import suppress, ExitStack

# Suppress specific exceptions
with suppress(FileNotFoundError):
    with open("nonexistent.txt") as f:
        data = f.read()
# No exception raised, continues normally

# Multiple contexts dynamically
def process_files(filenames):
    with ExitStack() as stack:
        files = [stack.enter_context(open(f)) for f in filenames]
        for f in files:
            print(f.read())

# Conditional context manager
@contextmanager
def maybe_open(path):
    if path:
        with open(path) as f:
            yield f
    else:
        yield None

with maybe_open(None) as f:
    if f:
        print(f.read())

# Redirect stdout
from contextlib import redirect_stdout
import io

buffer = io.StringIO()
with redirect_stdout(buffer):
    print("Hello, World!")

captured = buffer.getvalue()  # "Hello, World!\\n"`},{signature:`Infinite Generators`,description:`Generators that never end. Use with islice or takewhile to limit.`,complexity:`O(1) per item`,section:`Infinite`,example:`from itertools import islice, takewhile

# Infinite counter
def count_forever(start=0, step=1):
    n = start
    while True:
        yield n
        n += step

# Take first 5
first_5 = list(islice(count_forever(), 5))
print(first_5)  # [0, 1, 2, 3, 4]

# Infinite Fibonacci
def fibonacci_infinite():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Fibonacci numbers under 100
fibs = list(takewhile(lambda x: x < 100, fibonacci_infinite()))
print(fibs)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]

# Infinite primes
def primes_infinite():
    """Generate prime numbers infinitely."""
    yield 2
    primes_found = [2]
    candidate = 3

    while True:
        is_prime = True
        for p in primes_found:
            if p * p > candidate:
                break
            if candidate % p == 0:
                is_prime = False
                break

        if is_prime:
            primes_found.append(candidate)
            yield candidate

        candidate += 2

first_10_primes = list(islice(primes_infinite(), 10))
print(first_10_primes)  # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`},{signature:`Cycle and Repeat Patterns`,description:`Loop through sequences infinitely. Useful for round-robin and defaults.`,complexity:`O(1) per item`,section:`Infinite`,example:`from itertools import cycle, repeat

# Cycle through items
colors = cycle(['red', 'green', 'blue'])
color_list = [next(colors) for _ in range(7)]
print(color_list)
# ['red', 'green', 'blue', 'red', 'green', 'blue', 'red']

# Round-robin assignment
def round_robin(items, workers):
    """Assign items to workers in round-robin fashion."""
    worker_cycle = cycle(workers)
    for item in items:
        yield (next(worker_cycle), item)

tasks = ['A', 'B', 'C', 'D', 'E']
workers = ['Alice', 'Bob']
assignments = list(round_robin(tasks, workers))
# [('Alice', 'A'), ('Bob', 'B'), ('Alice', 'C'), ...]

# Repeat value
ones = repeat(1, 5)  # 1, 1, 1, 1, 1

# Infinite repeat (no count)
zeros = repeat(0)  # Infinite zeros

# Practical: zip with padding
from itertools import zip_longest

def pad_to_length(iterable, length, pad_value=None):
    return islice(
        zip_longest(iterable, repeat(pad_value)),
        length
    )`},{signature:`Lazy File Processing`,description:`Process huge files line by line. Constant memory usage.`,complexity:`O(1) memory`,section:`Lazy Evaluation`,example:`# Process 100GB log file with constant memory
def grep(pattern, lines):
    """Filter lines matching pattern."""
    for line in lines:
        if pattern in line:
            yield line

def count_lines(lines):
    """Count lines (consuming generator)."""
    return sum(1 for _ in lines)

# Memory-efficient word count
def word_count(lines):
    """Count words in all lines."""
    return sum(len(line.split()) for line in lines)

# Chain operations
def process_log(filename, pattern):
    with open(filename) as f:
        matching = grep(pattern, f)
        count = count_lines(matching)
    return count

# Process CSV lazily
import csv

def process_csv_lazy(filename):
    with open(filename) as f:
        reader = csv.DictReader(f)
        for row in reader:
            yield row  # One row at a time

# Filter and transform
for row in process_csv_lazy("huge_data.csv"):
    if float(row['price']) > 100:
        print(row['name'])

# Parallel processing with generators
def parallel_map(func, iterable, workers=4):
    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=workers) as executor:
        yield from executor.map(func, iterable)`},{signature:`Generator Expressions vs Functions`,description:`When to use expression vs function. Trade-offs in readability and reuse.`,complexity:`O(n)`,section:`Lazy Evaluation`,example:`# Generator Expression: Simple, one-liner
squares = (x**2 for x in range(10))

# Generator Function: Complex logic, reusable
def squares_with_logging(n):
    for x in range(n):
        result = x**2
        print(f"Computing {x}^2")
        yield result

# Expression: When logic is simple
evens = (x for x in range(100) if x % 2 == 0)

# Function: When you need state or complex logic
def running_average_gen(nums):
    total = 0
    count = 0
    for n in nums:
        total += n
        count += 1
        yield total / count

# Expression in function calls
max_square = max(x**2 for x in [-3, 1, 5, -2])  # 25

# Can't do this with generator functions inline!

# Reusable generator function
def filtered_squares(nums, threshold):
    for n in nums:
        sq = n ** 2
        if sq > threshold:
            yield sq

# Use multiple times
gen1 = filtered_squares(range(10), 20)
gen2 = filtered_squares(range(20), 50)

# RULE OF THUMB:
# - Simple transform/filter: generator expression
# - Need state, logging, complex logic: generator function
# - Need to pass parameters: generator function
# - One-time use inline: generator expression`},{signature:`Generator Debugging Tips`,description:`Debug generators without consuming. Use tee and peekable patterns.`,complexity:`O(n)`,section:`Lazy Evaluation`,example:`from itertools import tee

# Problem: Generators are consumed when you look at them
gen = (x**2 for x in range(5))
print(list(gen))  # [0, 1, 4, 9, 16]
print(list(gen))  # [] - already consumed!

# Solution 1: tee() - create independent copies
gen = (x**2 for x in range(5))
gen1, gen2 = tee(gen, 2)
print(list(gen1))  # [0, 1, 4, 9, 16]
print(list(gen2))  # [0, 1, 4, 9, 16]

# Solution 2: Peekable wrapper
class Peekable:
    def __init__(self, iterable):
        self._it = iter(iterable)
        self._peeked = []

    def peek(self, default=None):
        if not self._peeked:
            try:
                self._peeked.append(next(self._it))
            except StopIteration:
                return default
        return self._peeked[0]

    def __next__(self):
        if self._peeked:
            return self._peeked.pop(0)
        return next(self._it)

    def __iter__(self):
        return self

# Debug with logging wrapper
def debug_generator(gen, label=""):
    for i, item in enumerate(gen):
        print(f"[{label}] Item {i}: {item}")
        yield item

# Use in pipeline for debugging
pipeline = debug_generator(
    (x**2 for x in range(5)),
    label="squares"
)
result = list(pipeline)`}],T=[...S,...C,...w],E=[{signature:`Why Segment Tree?`,description:`Efficient range queries + point updates. Both in O(log n). Use when you need both operations frequently.`,complexity:`Concept`,section:`Why & When`,example:`# SEGMENT TREE USE CASES
#
# When to use:
# 1. Range queries (sum, min, max, GCD, etc.)
# 2. Point updates (change single element)
# 3. Both operations are frequent
#
# Comparison with alternatives:
#
# Operation          Array    Prefix Sum   Segment Tree
# ------------------------------------------------------
# Build              O(n)     O(n)         O(n)
# Point Update       O(1)     O(n)         O(log n)
# Range Query        O(n)     O(1)         O(log n)
#
# USE SEGMENT TREE when:
# - Mix of updates AND queries
# - Need range operations (sum, min, max)
#
# DON'T USE when:
# - Only queries, no updates -> Prefix Sum
# - Only updates, no queries -> Simple Array
# - Only point queries -> Simple Array
#
# ADVANCED VARIANTS:
# - Lazy Propagation: Range updates O(log n)
# - Persistent: Keep history of all versions
# - 2D Segment Tree: 2D range queries`},{signature:`Segment Tree Structure`,description:`Binary tree where leaves are array elements, internal nodes store aggregates of children.`,complexity:`O(n) space`,section:`Why & When`,example:`# SEGMENT TREE STRUCTURE
# Array: [1, 3, 5, 7, 9, 11]
#
# Tree (range sum):
#                    [36]          <- root: sum of [0,5]
#                  /      \\
#             [9]           [27]    <- sum of [0,2] and [3,5]
#            /   \\         /    \\
#         [4]    [5]    [16]   [11] <- sum of [0,1], [2,2], etc.
#        /  \\          /  \\
#      [1]  [3]      [7]  [9]       <- leaves = original array
#
# PROPERTIES:
# 1. Leaves = original array elements
# 2. Internal node = aggregate of children
# 3. Height = ceil(log2(n))
# 4. Array-based: node i has children at 2i+1, 2i+2
#
# MEMORY LAYOUT (1-indexed is cleaner):
# tree[1] = root
# tree[i] children: tree[2*i], tree[2*i+1]
# tree[i] parent: tree[i//2]
#
# Size: 2*n for perfect tree, 4*n for safety`},{signature:`Segment Tree (Array)`,description:`Array-based segment tree. 1-indexed for cleaner parent/child math.`,complexity:`O(n) build`,section:`Basic Implementation`,example:`class SegmentTree:
    """
    Segment Tree for range sum queries.
    Uses 1-indexed array for cleaner math.
    """
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * (4 * self.n)  # Safe size
        if self.n > 0:
            self._build(nums, 1, 0, self.n - 1)

    def _build(self, nums, node, start, end):
        """Build tree recursively."""
        if start == end:
            # Leaf node
            self.tree[node] = nums[start]
        else:
            mid = (start + end) // 2
            left_child = 2 * node
            right_child = 2 * node + 1

            self._build(nums, left_child, start, mid)
            self._build(nums, right_child, mid + 1, end)

            # Internal node = sum of children
            self.tree[node] = self.tree[left_child] + self.tree[right_child]

# Build walkthrough for [1, 3, 5, 7]:
# _build(node=1, 0-3): split into [0-1] and [2-3]
#   _build(node=2, 0-1): split into [0-0] and [1-1]
#     _build(node=4, 0-0): leaf, tree[4] = 1
#     _build(node=5, 1-1): leaf, tree[5] = 3
#     tree[2] = 1 + 3 = 4
#   _build(node=3, 2-3): split into [2-2] and [3-3]
#     _build(node=6, 2-2): leaf, tree[6] = 5
#     _build(node=7, 3-3): leaf, tree[7] = 7
#     tree[3] = 5 + 7 = 12
#   tree[1] = 4 + 12 = 16`},{signature:`Point Update`,description:`Update single element. Propagate change up to root.`,complexity:`O(log n)`,section:`Basic Implementation`,example:`class SegmentTree:
    # ... (init and build from above)

    def update(self, idx, val):
        """Update nums[idx] to val."""
        self._update(1, 0, self.n - 1, idx, val)

    def _update(self, node, start, end, idx, val):
        if start == end:
            # Leaf node - update value
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            left_child = 2 * node
            right_child = 2 * node + 1

            if idx <= mid:
                self._update(left_child, start, mid, idx, val)
            else:
                self._update(right_child, mid + 1, end, idx, val)

            # Recalculate current node
            self.tree[node] = self.tree[left_child] + self.tree[right_child]

# Update walkthrough: update index 1 from 3 to 10
# [1, 3, 5, 7] -> [1, 10, 5, 7]
#
# _update(node=1, 0-3, idx=1, val=10)
#   mid=1, idx=1 <= 1, go left
#   _update(node=2, 0-1, idx=1, val=10)
#     mid=0, idx=1 > 0, go right
#     _update(node=5, 1-1, idx=1, val=10)
#       leaf! tree[5] = 10
#     tree[2] = tree[4] + tree[5] = 1 + 10 = 11
#   tree[1] = tree[2] + tree[3] = 11 + 12 = 23`},{signature:`Range Query`,description:`Query aggregate over range [left, right]. Combine partial results from overlapping nodes.`,complexity:`O(log n)`,section:`Basic Implementation`,example:`class SegmentTree:
    # ... (init, build, update from above)

    def query(self, left, right):
        """Return sum of nums[left:right+1]."""
        return self._query(1, 0, self.n - 1, left, right)

    def _query(self, node, start, end, left, right):
        # Case 1: No overlap
        if right < start or end < left:
            return 0  # Identity for sum

        # Case 2: Complete overlap
        if left <= start and end <= right:
            return self.tree[node]

        # Case 3: Partial overlap
        mid = (start + end) // 2
        left_sum = self._query(2 * node, start, mid, left, right)
        right_sum = self._query(2 * node + 1, mid + 1, end, left, right)

        return left_sum + right_sum

# Query walkthrough: query(1, 2) on [1, 3, 5, 7]
# _query(node=1, 0-3, left=1, right=2)
#   partial overlap, split
#   _query(node=2, 0-1, 1, 2)
#     partial overlap, split
#     _query(node=4, 0-0, 1, 2) -> no overlap, return 0
#     _query(node=5, 1-1, 1, 2) -> complete overlap, return 3
#     return 0 + 3 = 3
#   _query(node=3, 2-3, 1, 2)
#     partial overlap, split
#     _query(node=6, 2-2, 1, 2) -> complete overlap, return 5
#     _query(node=7, 3-3, 1, 2) -> no overlap, return 0
#     return 5 + 0 = 5
#   return 3 + 5 = 8 (correct)`},{signature:`Range Minimum Query`,description:`Segment tree for minimum instead of sum. Change aggregate function.`,complexity:`O(log n)`,section:`Range Min/Max`,example:`class RangeMinTree:
    """Segment Tree for Range Minimum Query (RMQ)."""

    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [float('inf')] * (4 * self.n)
        self.nums = nums
        if self.n > 0:
            self._build(1, 0, self.n - 1)

    def _build(self, node, start, end):
        if start == end:
            self.tree[node] = self.nums[start]
        else:
            mid = (start + end) // 2
            self._build(2 * node, start, mid)
            self._build(2 * node + 1, mid + 1, end)
            # Min instead of sum
            self.tree[node] = min(
                self.tree[2 * node],
                self.tree[2 * node + 1]
            )

    def query(self, left, right):
        return self._query(1, 0, self.n - 1, left, right)

    def _query(self, node, start, end, left, right):
        if right < start or end < left:
            return float('inf')  # Identity for min
        if left <= start and end <= right:
            return self.tree[node]

        mid = (start + end) // 2
        left_min = self._query(2 * node, start, mid, left, right)
        right_min = self._query(2 * node + 1, mid + 1, end, left, right)
        return min(left_min, right_min)

    def update(self, idx, val):
        self._update(1, 0, self.n - 1, idx, val)

    def _update(self, node, start, end, idx, val):
        if start == end:
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            if idx <= mid:
                self._update(2 * node, start, mid, idx, val)
            else:
                self._update(2 * node + 1, mid + 1, end, idx, val)
            self.tree[node] = min(self.tree[2 * node], self.tree[2 * node + 1])`},{signature:`Generic Segment Tree`,description:`Template with configurable operation and identity. Reuse for sum, min, max, GCD.`,complexity:`O(log n)`,section:`Range Min/Max`,example:`class SegmentTree:
    """
    Generic Segment Tree with configurable operation.
    """
    def __init__(self, nums, op, identity):
        """
        op: binary function (e.g., lambda a,b: a+b)
        identity: identity element (e.g., 0 for sum)
        """
        self.n = len(nums)
        self.op = op
        self.identity = identity
        self.tree = [identity] * (4 * self.n)
        if self.n > 0:
            self._build(nums, 1, 0, self.n - 1)

    def _build(self, nums, node, start, end):
        if start == end:
            self.tree[node] = nums[start]
        else:
            mid = (start + end) // 2
            self._build(nums, 2 * node, start, mid)
            self._build(nums, 2 * node + 1, mid + 1, end)
            self.tree[node] = self.op(
                self.tree[2 * node],
                self.tree[2 * node + 1]
            )

    # ... query and update use self.op and self.identity

# Usage examples:
nums = [1, 3, 5, 7, 9]

# Sum tree
sum_tree = SegmentTree(nums, lambda a, b: a + b, 0)

# Min tree
min_tree = SegmentTree(nums, min, float('inf'))

# Max tree
max_tree = SegmentTree(nums, max, float('-inf'))

# GCD tree
from math import gcd
gcd_tree = SegmentTree(nums, gcd, 0)

# Product tree
prod_tree = SegmentTree(nums, lambda a, b: a * b, 1)`},{signature:`Range Sum Query - Mutable`,description:`LeetCode 307. Classic segment tree problem.`,complexity:`O(log n)`,section:`Problems`,example:`class NumArray:
    """
    LeetCode 307: Range Sum Query - Mutable
    """
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * (2 * self.n)

        # Build tree (iterative, bottom-up)
        # Leaves at indices [n, 2n-1]
        for i in range(self.n):
            self.tree[self.n + i] = nums[i]

        # Build internal nodes
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = self.tree[2 * i] + self.tree[2 * i + 1]

    def update(self, index: int, val: int) -> None:
        # Update leaf
        pos = self.n + index
        self.tree[pos] = val

        # Update parents
        while pos > 1:
            pos //= 2
            self.tree[pos] = self.tree[2 * pos] + self.tree[2 * pos + 1]

    def sumRange(self, left: int, right: int) -> int:
        # Query [left, right] inclusive
        result = 0
        left += self.n
        right += self.n

        while left <= right:
            if left % 2 == 1:  # Left is right child
                result += self.tree[left]
                left += 1
            if right % 2 == 0:  # Right is left child
                result += self.tree[right]
                right -= 1
            left //= 2
            right //= 2

        return result

# Usage:
# numArray = NumArray([1, 3, 5])
# numArray.sumRange(0, 2)  # 9
# numArray.update(1, 2)
# numArray.sumRange(0, 2)  # 8`}],D=[{signature:`Segment Tree vs BIT - when to use which`,description:`Segment Tree: range queries + range updates, any operation. BIT: simpler, faster, but only prefix sums. Choose based on query type and implementation comfort.`,complexity:`Concept`,section:`Why & When`,example:`# SEGMENT TREE
# Use when: Range query + range update
# - Range sum, min, max, GCD
# - Range updates (add value to range)
# - Complex operations (custom merge)
# Complexity: O(log n) query/update
# Space: O(4n) = O(n)
# Implementation: ~100 lines (complex!)

# BINARY INDEXED TREE (BIT/Fenwick)
# Use when: Prefix sums + point updates
# - Range sum queries
# - Point updates (arr[i] += delta)
# - Simpler than segment tree
# Complexity: O(log n) query/update
# Space: O(n)
# Implementation: ~20 lines (simple!)

# DECISION TREE:
# Need range min/max/GCD? → Segment Tree
# Need range updates? → Segment Tree (with lazy prop)
# Only range sum + point update? → BIT (simpler!)
# 2D range queries? → 2D BIT or 2D Segment Tree

# WHEN NEITHER:
# - Prefix sum array: O(1) query, no updates
# - Sparse table: O(1) query, no updates, idempotent ops
# - sqrt decomposition: Simpler than seg tree, O(sqrt n)

# Example: Range sum with updates
# BIT code (20 lines):
class BIT:
    def __init__(self, n):
        self.tree = [0] * (n + 1)
    def update(self, i, delta):
        while i < len(self.tree):
            self.tree[i] += delta
            i += i & (-i)
    def query(self, i):
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s

# Segment tree: ~100 lines for same functionality!
# Use BIT when possible (simpler debugging)`},{signature:`When segment tree is overkill`,description:`Static array? Use prefix sum. Rare updates? Recompute. Small n (<1000)? Brute force faster. Reserve segment tree for: frequent updates + queries + large n.`,complexity:`Concept`,section:`Why & When`,example:`# SEGMENT TREE OVERHEAD:
# - Implementation: ~100-200 lines
# - Debugging: Hard (tree structure)
# - Space: 4n (significant for large n)
# - Constants: Hidden overhead

# USE SIMPLER ALTERNATIVES:

# STATIC ARRAY (no updates) → Prefix sum
arr = [1, 2, 3, 4, 5]
prefix = [0]
for x in arr:
    prefix.append(prefix[-1] + x)
# Range sum [L, R]: O(1)
def range_sum(L, R):
    return prefix[R+1] - prefix[L]

# RARE UPDATES → Just recompute
# If updates << queries
total = sum(arr)
def update(i, new_val):
    global total
    total += new_val - arr[i]
    arr[i] = new_val
# O(1) update, O(1) query for sum!

# SMALL N (<1000) → Brute force
def range_min(arr, L, R):
    return min(arr[L:R+1])  # O(n) but fast for small n

# SQRT DECOMPOSITION → Simpler than seg tree
# Split array into sqrt(n) blocks
# Query: O(sqrt n), Update: O(1)
# Easier to code and debug

# USE SEGMENT TREE WHEN:
# - Frequent queries AND updates
# - Large n (>10,000)
# - Complex range operations (min, GCD, etc.)
# - Can't use simpler alternatives

# AVOID when:
# - Static data (use prefix sum)
# - Rare updates (recompute)
# - Small n (brute force)
# - Only need sums (use BIT instead)`},{signature:`Lazy Propagation Concept`,description:`Defer range updates until needed. Enables O(log n) range updates.`,complexity:`O(log n)`,section:`Lazy Propagation`,example:`# LAZY PROPAGATION
#
# Problem: Range updates are O(n) with basic segment tree
# Solution: Store pending updates, apply when needed
#
# Key idea:
# - Mark node with pending update
# - Don't propagate to children immediately
# - Push update down when we visit children
#
# USE CASES:
# - Range add: add value to all elements in range
# - Range set: set all elements in range to value
# - Any range update + range query combination
#
# LAZY ARRAY:
# lazy[node] = pending update for this subtree
#
# TWO OPERATIONS:
# 1. Push down: propagate lazy value to children
# 2. Update: apply lazy value to current node
#
# Example: Add 5 to range [0, 3]
# Instead of updating 4 nodes, mark root with lazy[1] = 5
# When querying, push lazy value down as needed`},{signature:`Lazy Propagation Implementation`,description:`Segment tree with lazy propagation for range updates.`,complexity:`O(log n) update/query`,section:`Lazy Propagation`,example:`class LazySegmentTree:
    """
    Segment Tree with Lazy Propagation.
    Supports range add and range sum query.
    """
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * (4 * self.n)
        self.lazy = [0] * (4 * self.n)
        if self.n > 0:
            self._build(nums, 1, 0, self.n - 1)

    def _build(self, nums, node, start, end):
        if start == end:
            self.tree[node] = nums[start]
        else:
            mid = (start + end) // 2
            self._build(nums, 2 * node, start, mid)
            self._build(nums, 2 * node + 1, mid + 1, end)
            self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def _push_down(self, node, start, end):
        """Push lazy value to children."""
        if self.lazy[node] != 0:
            mid = (start + end) // 2
            left_len = mid - start + 1
            right_len = end - mid

            # Update children
            self.tree[2 * node] += self.lazy[node] * left_len
            self.tree[2 * node + 1] += self.lazy[node] * right_len

            # Pass lazy to children
            self.lazy[2 * node] += self.lazy[node]
            self.lazy[2 * node + 1] += self.lazy[node]

            # Clear current lazy
            self.lazy[node] = 0

    def range_add(self, left, right, val):
        """Add val to all elements in [left, right]."""
        self._range_add(1, 0, self.n - 1, left, right, val)

    def _range_add(self, node, start, end, left, right, val):
        if right < start or end < left:
            return

        if left <= start and end <= right:
            # Completely covered - apply lazy
            self.tree[node] += val * (end - start + 1)
            self.lazy[node] += val
            return

        # Partial overlap - push down and recurse
        self._push_down(node, start, end)
        mid = (start + end) // 2
        self._range_add(2 * node, start, mid, left, right, val)
        self._range_add(2 * node + 1, mid + 1, end, left, right, val)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def query(self, left, right):
        return self._query(1, 0, self.n - 1, left, right)

    def _query(self, node, start, end, left, right):
        if right < start or end < left:
            return 0

        if left <= start and end <= right:
            return self.tree[node]

        self._push_down(node, start, end)
        mid = (start + end) // 2
        return (self._query(2 * node, start, mid, left, right) +
                self._query(2 * node + 1, mid + 1, end, left, right))`},{signature:`Binary Indexed Tree Concept`,description:`Also called Fenwick Tree. Simpler than segment tree, uses bit manipulation.`,complexity:`O(log n)`,section:`Fenwick Tree`,example:`# BINARY INDEXED TREE (BIT) / FENWICK TREE
#
# Simpler alternative to segment tree for:
# - Prefix sum queries
# - Point updates
#
# Uses binary representation of index
# bit[i] stores sum of specific range based on lowest set bit
#
# Index (1-indexed)  Binary   Stores sum of
# -------------------------------------------------
# 1                  0001     [1, 1]
# 2                  0010     [1, 2]
# 3                  0011     [3, 3]
# 4                  0100     [1, 4]
# 5                  0101     [5, 5]
# 6                  0110     [5, 6]
# 7                  0111     [7, 7]
# 8                  1000     [1, 8]
#
# OPERATIONS:
# - lowbit(x) = x & (-x)  # Lowest set bit
# - Update: add to i, i + lowbit(i), i + lowbit(i + lowbit(i)), ...
# - Query: sum of i, i - lowbit(i), i - lowbit(i - lowbit(i)), ...
#
# COMPARISON TO SEGMENT TREE:
# - Simpler code (shorter)
# - Less memory (exactly n+1 elements)
# - Only works for prefix/range sum (not min/max)
# - Segment tree is more versatile`},{signature:`BIT Implementation`,description:`Binary Indexed Tree for prefix sums and point updates.`,complexity:`O(log n)`,section:`Fenwick Tree`,example:`class BinaryIndexedTree:
    """
    Binary Indexed Tree (Fenwick Tree).
    1-indexed for cleaner bit operations.
    """
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)

    def update(self, i, delta):
        """Add delta to index i (1-indexed)."""
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)  # Add lowest set bit

    def prefix_sum(self, i):
        """Sum of [1, i] (1-indexed)."""
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & (-i)  # Remove lowest set bit
        return total

    def range_sum(self, left, right):
        """Sum of [left, right] (1-indexed)."""
        return self.prefix_sum(right) - self.prefix_sum(left - 1)

# Build from array
def build_BIT(nums):
    n = len(nums)
    bit = BinaryIndexedTree(n)
    for i, num in enumerate(nums, 1):  # 1-indexed
        bit.update(i, num)
    return bit

# Example:
nums = [1, 3, 5, 7, 9]
bit = build_BIT(nums)
print(bit.prefix_sum(3))  # 1+3+5 = 9
print(bit.range_sum(2, 4))  # 3+5+7 = 15

bit.update(2, 2)  # Add 2 to index 2
print(bit.prefix_sum(3))  # 1+5+5 = 11`},{signature:`BIT for Range Update, Point Query`,description:`Use difference array with BIT for range updates.`,complexity:`O(log n)`,section:`Fenwick Tree`,example:`class BITRangeUpdate:
    """
    BIT for range updates and point queries.
    Uses difference array technique.
    """
    def __init__(self, n):
        self.bit = BinaryIndexedTree(n)

    def range_add(self, left, right, val):
        """Add val to all elements in [left, right]."""
        self.bit.update(left, val)
        if right + 1 <= self.bit.n:
            self.bit.update(right + 1, -val)

    def point_query(self, i):
        """Get value at index i."""
        return self.bit.prefix_sum(i)

# How it works:
# Difference array: diff[i] = arr[i] - arr[i-1]
# To add val to [L, R]:
#   diff[L] += val
#   diff[R+1] -= val
# To get arr[i]: sum of diff[1..i] = prefix sum

# Example:
# arr = [0, 0, 0, 0, 0]
# range_add(2, 4, 5)
# diff becomes: [0, 0, 5, 0, 0, -5]
# point_query(3) = prefix_sum(3) = 0 + 0 + 5 = 5 (correct)

# For range update AND range query, need TWO BITs
class BITRangeUpdateRangeQuery:
    def __init__(self, n):
        self.n = n
        self.B1 = BinaryIndexedTree(n)
        self.B2 = BinaryIndexedTree(n)

    def range_add(self, left, right, val):
        self.B1.update(left, val)
        self.B1.update(right + 1, -val)
        self.B2.update(left, val * (left - 1))
        self.B2.update(right + 1, -val * right)

    def prefix_sum(self, i):
        return self.B1.prefix_sum(i) * i - self.B2.prefix_sum(i)

    def range_sum(self, left, right):
        return self.prefix_sum(right) - self.prefix_sum(left - 1)`},{signature:`Count Smaller After Self`,description:`LeetCode 315. Count elements smaller than each element to its right.`,complexity:`O(n log n)`,section:`Problems`,example:`def count_smaller(nums):
    """
    LeetCode 315: Count of Smaller Numbers After Self.
    Use BIT to count inversions.
    """
    # Coordinate compression
    sorted_nums = sorted(set(nums))
    rank = {v: i + 1 for i, v in enumerate(sorted_nums)}

    n = len(sorted_nums)
    bit = BinaryIndexedTree(n)
    result = []

    # Process from right to left
    for num in reversed(nums):
        r = rank[num]
        # Count numbers smaller than current (already processed)
        count = bit.prefix_sum(r - 1)
        result.append(count)
        # Add current number to BIT
        bit.update(r, 1)

    return result[::-1]

# Example: nums = [5, 2, 6, 1]
# Process from right:
# 1: count(< 1) = 0, add 1
# 6: count(< 6) = 1, add 6
# 2: count(< 2) = 1, add 2
# 5: count(< 5) = 2, add 5
# Result: [2, 1, 1, 0]

# Alternative: Merge Sort approach
def count_smaller_mergesort(nums):
    def merge_count(arr):
        if len(arr) <= 1:
            return arr

        mid = len(arr) // 2
        left = merge_count(arr[:mid])
        right = merge_count(arr[mid:])

        result = []
        i = j = 0
        while i < len(left) and j < len(right):
            if left[i][0] <= right[j][0]:
                result.append(left[i])
                i += 1
            else:
                # Count: all remaining left elements are greater
                for k in range(i, len(left)):
                    counts[left[k][1]] += len(right) - j
                result.append(right[j])
                j += 1

        result.extend(left[i:])
        result.extend(right[j:])
        return result

    counts = [0] * len(nums)
    indexed = [(num, i) for i, num in enumerate(nums)]
    merge_count(indexed)
    return counts`},{signature:`Range Sum Query 2D - Mutable`,description:`LeetCode 308. 2D segment tree or 2D BIT.`,complexity:`O(log^2 n)`,section:`Problems`,example:`class BIT2D:
    """
    2D Binary Indexed Tree.
    For 2D range sum queries with point updates.
    """
    def __init__(self, m, n):
        self.m = m
        self.n = n
        self.tree = [[0] * (n + 1) for _ in range(m + 1)]

    def update(self, row, col, delta):
        """Add delta to position (row, col)."""
        i = row + 1  # 1-indexed
        while i <= self.m:
            j = col + 1
            while j <= self.n:
                self.tree[i][j] += delta
                j += j & (-j)
            i += i & (-i)

    def prefix_sum(self, row, col):
        """Sum of rectangle [0,0] to [row,col]."""
        total = 0
        i = row + 1
        while i > 0:
            j = col + 1
            while j > 0:
                total += self.tree[i][j]
                j -= j & (-j)
            i -= i & (-i)
        return total

    def range_sum(self, r1, c1, r2, c2):
        """Sum of rectangle [r1,c1] to [r2,c2]."""
        return (self.prefix_sum(r2, c2) -
                self.prefix_sum(r2, c1 - 1) -
                self.prefix_sum(r1 - 1, c2) +
                self.prefix_sum(r1 - 1, c1 - 1))

class NumMatrix:
    """LeetCode 308 solution."""
    def __init__(self, matrix):
        m, n = len(matrix), len(matrix[0])
        self.matrix = [[0] * n for _ in range(m)]
        self.bit = BIT2D(m, n)

        for i in range(m):
            for j in range(n):
                self.update(i, j, matrix[i][j])

    def update(self, row, col, val):
        delta = val - self.matrix[row][col]
        self.matrix[row][col] = val
        self.bit.update(row, col, delta)

    def sumRegion(self, r1, c1, r2, c2):
        return self.bit.range_sum(r1, c1, r2, c2)`},{signature:`Count Range Sum`,description:`LeetCode 327. Count range sums in [lower, upper]. Use merge sort or BIT.`,complexity:`O(n log n)`,section:`Problems`,example:`def count_range_sum(nums, lower, upper):
    """
    LeetCode 327: Count of Range Sum.
    Count pairs (i,j) where lower <= sum(nums[i:j+1]) <= upper.
    """
    # Key insight: range sum = prefix[j+1] - prefix[i]
    # We want: lower <= prefix[j+1] - prefix[i] <= upper
    # Rearranged: prefix[j+1] - upper <= prefix[i] <= prefix[j+1] - lower

    from sortedcontainers import SortedList

    prefix = [0]
    for num in nums:
        prefix.append(prefix[-1] + num)

    count = 0
    sorted_prefix = SortedList([0])  # Seen prefixes

    for j in range(1, len(prefix)):
        # Count valid i values
        # We need: prefix[j] - upper <= prefix[i] <= prefix[j] - lower
        lo = prefix[j] - upper
        hi = prefix[j] - lower

        # Count prefixes in [lo, hi]
        left_idx = sorted_prefix.bisect_left(lo)
        right_idx = sorted_prefix.bisect_right(hi)
        count += right_idx - left_idx

        # Add current prefix
        sorted_prefix.add(prefix[j])

    return count

# Merge sort approach (no external library)
def count_range_sum_merge(nums, lower, upper):
    prefix = [0]
    for num in nums:
        prefix.append(prefix[-1] + num)

    def merge_count(lo, hi):
        if lo >= hi:
            return 0

        mid = (lo + hi) // 2
        count = merge_count(lo, mid) + merge_count(mid + 1, hi)

        # Count cross-partition pairs
        j = k = mid + 1
        for i in range(lo, mid + 1):
            while j <= hi and prefix[j] - prefix[i] < lower:
                j += 1
            while k <= hi and prefix[k] - prefix[i] <= upper:
                k += 1
            count += k - j

        # Merge
        prefix[lo:hi+1] = sorted(prefix[lo:hi+1])
        return count

    return merge_count(0, len(prefix) - 1)`}],O=[...E,...D];var k=e(),A=`Python's Standard Library is interview gold—battle-tested tools that transform hard problems into one-liners. The key insight: @lru_cache converts O(2ⁿ) DP to O(n) with one decorator, Counter eliminates manual frequency counting, deque gives O(1) queue operations, and bisect provides binary search. Mastering stdlib means solving problems faster, cleaner, and with fewer bugs.

WHY STDLIB DOMINATES INTERVIEWS: Stdlib tools are optimized in C, battle-tested across millions of projects, and designed by experts. Using Counter instead of manual dict counting shows you know Python idioms. Using @lru_cache instead of manual memoization shows you can recognize patterns. Using deque instead of list.pop(0) shows you understand time complexity. Interviewers notice when you reach for the right tool.

**The stdlib advantage:**
- Cleaner code: One line vs 15+ lines of implementation
- Faster execution: C-optimized vs Python loops
- Fewer bugs: Battle-tested vs your ad-hoc solution
- Interview signal: "I know Python idioms and tools"

FUNCTOOLS: @LRU_CACHE - THE #1 INTERVIEW TOOL

Dynamic programming problems start with exponential time complexity due to repeated subproblem calculations. Manual memoization requires managing a dictionary, checking for cached results, and handling edge cases. The @lru_cache decorator does all this automatically—convert any recursive function to memoized DP by adding one line. It's implemented in C, thread-safe, provides cache statistics (.cache_info()), and handles hashable argument types correctly.

\`\`\`python
# ❌ Manual DP - error-prone, verbose
memo = {}
def fib(n):
    if n in memo:
        return memo[n]
    if n < 2:
        return n
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]

# ✅ @lru_cache - clean, fast, correct
from functools import lru_cache

@lru_cache(maxsize=None)  # maxsize=None for unlimited cache
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

# Interview wins:
# - Fibonacci: O(2^n) → O(n)
# - Climbing stairs: O(2^n) → O(n)
# - Coin change: O(2^n) → O(n*m)
# - Word break: O(2^n) → O(n*m)
# All become one-decorator solutions!

# Cache stats for optimization
print(fib.cache_info())  # CacheInfo(hits=8, misses=11, maxsize=None, currsize=11)
\`\`\`python

**Other functools tools:**

\`\`\`python
from functools import reduce, partial, cache

# reduce: Fold/accumulate pattern
sum_all = reduce(lambda x, y: x + y, [1, 2, 3, 4])  # 10
product = reduce(lambda x, y: x * y, [1, 2, 3, 4])  # 24

# partial: Preset function arguments
from operator import mul
double = partial(mul, 2)
print(double(5))  # 10

# @cache: Python 3.9+ simpler @lru_cache(maxsize=None)
@cache
def expensive_function(n):
    return n ** 2
\`\`\`python

COLLECTIONS: COUNTER - FREQUENCY ANALYSIS GOLD

Frequency analysis appears constantly in interviews—finding anagrams, top-k frequent elements, character counts, majority elements. Manual dictionary counting requires initialization checks and increment logic. Counter does it all: \`Counter(arr)\` counts frequencies, \`.most_common(k)\` finds top k elements, and Counter supports set-like operations (intersection, union, difference) for comparing frequencies.

\`\`\`python
from collections import Counter

# ❌ Manual counting - verbose, error-prone
freq = {}
for char in string:
    if char in freq:
        freq[char] += 1
    else:
        freq[char] = 1

# ✅ Counter - one line
freq = Counter(string)

# Interview patterns
is_anagram = Counter(s1) == Counter(s2)  # Anagram check O(n)
top_k = Counter(arr).most_common(k)      # Top k frequent elements
majority = Counter(arr).most_common(1)[0][0]  # Majority element
char_freq = Counter("hello")  # Counter({'l': 2, 'h': 1, 'e': 1, 'o': 1})

# Set-like operations
c1 = Counter(['a', 'b', 'c', 'a'])
c2 = Counter(['a', 'b', 'd'])
c1 & c2  # Intersection: Counter({'a': 1, 'b': 1})
c1 | c2  # Union: Counter({'a': 2, 'c': 1, 'b': 1, 'd': 1})
c1 - c2  # Difference: Counter({'a': 1, 'c': 1})

# Elements: flatten back to list
Counter(['a', 'a', 'b']).elements()  # ['a', 'a', 'b']
\`\`\`python

COLLECTIONS: DEQUE - DOUBLE-ENDED QUEUE (MANDATORY FOR BFS)

**CRITICAL**: Never use list for queue operations! \`list.pop(0)\` shifts all elements (O(n)), while \`deque.popleft()\` is O(1). This difference turns O(n²) BFS into O(n). deque also supports efficient sliding window implementations with O(1) operations at both ends.

\`\`\`python
from collections import deque

# ❌ WRONG - list for queue: O(n) pop(0)
queue = [1, 2, 3]
queue.pop(0)  # O(n) - shifts all elements!

# ✅ CORRECT - deque: O(1) popleft
queue = deque([1, 2, 3])
queue.popleft()  # O(1)

# BFS template with deque
def bfs(graph, start):
    visited = set([start])
    queue = deque([start])

    while queue:
        node = queue.popleft()  # O(1)!
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)  # O(1)

# Sliding window with deque
def max_sliding_window(nums, k):
    dq = deque()  # Stores indices
    result = []

    for i, num in enumerate(nums):
        # Remove out-of-window elements
        while dq and dq[0] < i - k + 1:
            dq.popleft()  # O(1)

        # Remove smaller elements
        while dq and nums[dq[-1]] < num:
            dq.pop()  # O(1)

        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])

    return result
\`\`\`python

COLLECTIONS: DEFAULTDICT - NO MORE KEYERROR

\`\`\`python
from collections import defaultdict

# ❌ Manual initialization
graph = {}
for u, v in edges:
    if u not in graph:
        graph[u] = []
    graph[u].append(v)

# ✅ defaultdict - auto-creates
graph = defaultdict(list)
for u, v in edges:
    graph[u].append(v)  # No KeyError!

# Common use cases
freq = defaultdict(int)  # Auto-creates 0 for new keys
for char in string:
    freq[char] += 1  # No if-check needed!

groups = defaultdict(list)  # Auto-creates [] for new keys
for key, value in items:
    groups[key].append(value)
\`\`\`python

COLLECTIONS: NAMEDTUPLE - READABLE RECORDS

\`\`\`python
from collections import namedtuple

# Instead of tuple unpacking
point = (3, 4)
x, y = point

# Use namedtuple for clarity
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)  # Readable attribute access
\`\`\`python

ITERTOOLS: COMBINATORICS MADE EASY

Implementing permutations or combinations from scratch requires complex recursive backtracking (15+ lines, easy to bug). itertools provides permutations(), combinations(), product() as one-liners. These are lazy iterators (memory-efficient) implemented in C (fast).

\`\`\`python
from itertools import permutations, combinations, product, combinations_with_replacement

# Permutations (order matters)
list(permutations([1, 2, 3]))  # [(1,2,3), (1,3,2), (2,1,3), ...]
list(permutations([1, 2, 3], 2))  # [(1,2), (1,3), (2,1), (2,3), ...]

# Combinations (order doesn't matter)
list(combinations([1, 2, 3], 2))  # [(1,2), (1,3), (2,3)]

# Combinations with replacement
list(combinations_with_replacement([1, 2], 2))  # [(1,1), (1,2), (2,2)]

# Cartesian product
list(product([1, 2], ['a', 'b']))  # [(1,'a'), (1,'b'), (2,'a'), (2,'b')]
\`\`\`python

ITERTOOLS: INFINITE ITERATORS

\`\`\`python
from itertools import count, cycle, repeat, islice

# count: infinite counter
for i in count(10, 2):  # Start at 10, step by 2
    if i > 20: break
    print(i)  # 10, 12, 14, 16, 18, 20

# cycle: infinite repeating
for i, item in zip(range(5), cycle(['a', 'b'])):
    print(item)  # a, b, a, b, a

# repeat: repeat value
list(islice(repeat(10), 3))  # [10, 10, 10]
\`\`\`python

ITERTOOLS: SLICING AND GROUPING

\`\`\`python
from itertools import islice, groupby, chain, accumulate

# islice: slice iterator without loading all
first_10 = list(islice(infinite_generator(), 10))

# groupby: group consecutive elements
data = [1, 1, 2, 2, 2, 3, 1]
for key, group in groupby(data):
    print(key, list(group))
# 1 [1, 1]
# 2 [2, 2, 2]
# 3 [3]
# 1 [1]

# chain: concatenate iterables
list(chain([1, 2], [3, 4]))  # [1, 2, 3, 4]

# accumulate: running totals
list(accumulate([1, 2, 3, 4]))  # [1, 3, 6, 10]
\`\`\`python

HEAPQ: MIN-HEAP OPERATIONS (INTERVIEW ESSENTIAL)

Python doesn't have a built-in heap class, but heapq provides heap operations on lists. Always a min-heap (smallest element first). For max-heap, negate values.

\`\`\`python
import heapq

# Create heap
heap = [3, 1, 4, 1, 5]
heapq.heapify(heap)  # O(n) - convert list to heap

# Push/pop
heapq.heappush(heap, 2)  # O(log n)
smallest = heapq.heappop(heap)  # O(log n)

# Top k elements
nums = [3, 1, 4, 1, 5, 9, 2, 6]
k_largest = heapq.nlargest(3, nums)  # [9, 6, 5]
k_smallest = heapq.nsmallest(3, nums)  # [1, 1, 2]

# Max-heap trick: negate values
max_heap = [-x for x in nums]
heapq.heapify(max_heap)
largest = -heapq.heappop(max_heap)  # Get largest

# Merge sorted sequences
heapq.merge([1, 3, 5], [2, 4, 6])  # Lazy iterator: 1, 2, 3, 4, 5, 6
\`\`\`python

BISECT: BINARY SEARCH IN SORTED LISTS

\`\`\`python
import bisect

sorted_arr = [1, 3, 4, 4, 6, 8]

# Find insertion index (left)
bisect.bisect_left(sorted_arr, 4)  # 2 (first 4)

# Find insertion index (right)
bisect.bisect_right(sorted_arr, 4)  # 4 (after last 4)

# Insert and maintain sorted order
bisect.insort_left(sorted_arr, 5)  # [1, 3, 4, 4, 5, 6, 8]

# Interview pattern: sorted ranges
def count_range(arr, left, right):
    return bisect.bisect_right(arr, right) - bisect.bisect_left(arr, left)
\`\`\`python

MATH MODULE ESSENTIALS

\`\`\`python
import math

# GCD and LCM
math.gcd(12, 18)  # 6
math.lcm(12, 18)  # 36 (Python 3.9+)

# Combinatorics (Python 3.8+)
math.comb(5, 2)  # C(5,2) = 10
math.perm(5, 2)  # P(5,2) = 20

# Factorial
math.factorial(5)  # 120

# Other
math.sqrt(16)  # 4.0
math.ceil(4.2)  # 5
math.floor(4.8)  # 4
math.isqrt(16)  # 4 (integer sqrt, Python 3.8+)
\`\`\`python

WHEN STDLIB BEATS MANUAL

Use stdlib when it matches your needs exactly—the code is cleaner, faster, and less buggy:
- DP with recursion → @lru_cache
- Frequency counting → Counter
- Queue/BFS → deque
- Graph adjacency → defaultdict(list)
- Permutations/combinations → itertools
- Heap operations → heapq
- Binary search → bisect

**Implement manually when:**
- Interviewer explicitly asks for the algorithm
- You need custom logic stdlib doesn't support
- You need to explain the algorithm step-by-step
- Problem is about implementing the data structure itself

Always start with stdlib; switch to manual only when necessary.

COMMON STDLIB GOTCHAS

\`\`\`python
# 1. heapq is min-heap only
# For max-heap, negate values
max_heap = [-x for x in nums]

# 2. Counter most_common() returns list of tuples
top_k = Counter(arr).most_common(k)  # [(elem, count), ...]
elements = [elem for elem, count in top_k]  # Extract elements

# 3. @lru_cache requires hashable arguments
# Lists don't work!
@lru_cache
def func(arr):  # ERROR: list is unhashable
    pass

# Solution: convert to tuple
@lru_cache
def func(arr_tuple):
    arr = list(arr_tuple)
    ...

# 4. groupby requires sorted data
# Won't group non-consecutive duplicates!
data = [1, 2, 1]
list(groupby(data))  # [(1, [1]), (2, [2]), (1, [1])] - three groups!

# 5. defaultdict factory is called without arguments
# Can't pass arguments!
defaultdict(list)  # ✅ OK
defaultdict(lambda: [])  # ✅ OK
defaultdict(list(10))  # ❌ WRONG - calls list(10) immediately
\`\`\`python

BEST PRACTICES FOR INTERVIEWS

1. **Show you know stdlib**: Reach for Counter, deque, @lru_cache—signals Python expertise
2. **Explain the tool**: "I'll use Counter because it's O(n) frequency counting with clean syntax"
3. **Know the complexity**: @lru_cache is O(n), Counter.most_common is O(n log k)
4. **Fallback to manual**: If interviewer says "implement it yourself," switch gracefully
5. **Import at top**: \`from collections import Counter\` before function, not inside
6. **Use in context**: Stdlib shines in real interviews, less useful in algorithmic deep dives`,j=`Design pattern problems test your ability to build custom data structures optimized for specific constraints. The key insight: combine basic structures (arrays, hash maps, stacks, heaps) to achieve required time complexities—O(1) operations require creative combinations. LRU cache, min stack, and rate limiters are interview favorites.

WHY DESIGN PATTERNS DOMINATE INTERVIEWS: These problems test multiple skills at once: data structure knowledge, time complexity analysis, and creative problem-solving. They're practical—real systems use LRU caches (browsers, databases), rate limiters (APIs, microservices), and custom iterators (data pipelines). Interviewers love them because they separate candidates who memorize algorithms from those who can design solutions.

**The design pattern mindset:**
- Start with requirements: What operations? What time complexity?
- Choose building blocks: Hash map for O(1) lookup, linked list for O(1) insert/delete
- Combine creatively: LRU = HashMap + Doubly Linked List
- Trade space for time: Extra memory often enables O(1) operations

LRU CACHE - THE CLASSIC INTERVIEW PROBLEM

**Problem**: Design a cache with:
- \`get(key)\`: Return value if exists, -1 otherwise—O(1)
- \`put(key, value)\`: Insert/update key—O(1)
- Capacity limit: When full, evict Least Recently Used item

**The challenge**: How to track access order AND maintain O(1) lookup?
- HashMap alone: O(1) lookup, but no ordering
- List alone: O(n) to find element
- **Solution**: Combine both!

**Approach 1: OrderedDict (Python-specific, ~20 lines)**

\`\`\`python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)  # Mark as recently used - O(1)!
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)  # Update access order
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove oldest (LRU) - O(1)

# Why OrderedDict works:
# - Maintains insertion order
# - move_to_end(key) moves to end (most recent) in O(1)
# - popitem(last=False) removes from front (least recent) in O(1)
# - All operations O(1) time complexity!
\`\`\`python

**Approach 2: HashMap + Doubly Linked List (universal, ~80 lines)**

This approach works in any language and shows deep understanding of data structures.

\`\`\`python
class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}  # key -> Node
        # Dummy head and tail for easier manipulation
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def _add_to_head(self, node):
        """Add node right after head (most recent)"""
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        """Remove node from current position"""
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_head(self, node):
        """Move existing node to head (mark as recently used)"""
        self._remove_node(node)
        self._add_to_head(node)

    def get(self, key):
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._move_to_head(node)  # Update access order
        return node.value

    def put(self, key, value):
        if key in self.cache:
            # Update existing key
            node = self.cache[key]
            node.value = value
            self._move_to_head(node)
        else:
            # Add new key
            node = Node(key, value)
            self.cache[key] = node
            self._add_to_head(node)

            # Check capacity
            if len(self.cache) > self.capacity:
                # Remove LRU (node before tail)
                lru = self.tail.prev
                self._remove_node(lru)
                del self.cache[lru.key]

# Why this works:
# - HashMap: O(1) lookup to find node
# - Doubly Linked List: O(1) move/remove operations
# - Head = most recent, Tail = least recent
# - All operations maintain O(1) time!
\`\`\`python

LFU CACHE - LEAST FREQUENTLY USED

**Problem**: Instead of evicting by recency, evict by frequency (access count).
- \`get(key)\`: Return value, increment frequency—O(1)
- \`put(key, value)\`: Insert/update, evict least frequent if full—O(1)
- Tie-breaking: If same frequency, evict LRU

**Solution**: HashMap + HashMap of Doubly Linked Lists
- \`cache\`: key → (value, frequency)
- \`freq_map\`: frequency → doubly linked list of keys
- \`min_freq\`: track minimum frequency for eviction

\`\`\`python
from collections import defaultdict

class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.freq = 1
        self.prev = None
        self.next = None

class LFUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}  # key -> Node
        self.freq_map = defaultdict(lambda: self._create_list())  # freq -> LinkedList
        self.min_freq = 0

    def _create_list(self):
        head, tail = Node(0, 0), Node(0, 0)
        head.next, tail.prev = tail, head
        return (head, tail)

    def _remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_to_head(self, freq, node):
        head, tail = self.freq_map[freq]
        node.next = head.next
        node.prev = head
        head.next.prev = node
        head.next = node

    def _update_freq(self, node):
        freq = node.freq
        self._remove_node(node)

        # Check if this was the only node at min_freq
        head, tail = self.freq_map[freq]
        if head.next == tail and freq == self.min_freq:
            self.min_freq += 1

        node.freq += 1
        self._add_to_head(node.freq, node)

    def get(self, key):
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._update_freq(node)
        return node.value

    def put(self, key, value):
        if self.capacity == 0:
            return

        if key in self.cache:
            node = self.cache[key]
            node.value = value
            self._update_freq(node)
        else:
            if len(self.cache) >= self.capacity:
                # Evict LFU (or LRU if tie)
                head, tail = self.freq_map[self.min_freq]
                lfu_node = tail.prev
                self._remove_node(lfu_node)
                del self.cache[lfu_node.key]

            node = Node(key, value)
            self.cache[key] = node
            self._add_to_head(1, node)
            self.min_freq = 1

# Complexity: All operations O(1)!
\`\`\`python

**LRU vs LFU - When to use which:**
- **LRU**: General-purpose caching (web browsers, file systems, database buffers)
  - Assumption: Recently accessed items likely accessed again (temporal locality)
  - Simpler implementation
- **LFU**: Frequency matters more than recency (trending content, popular queries)
  - Assumption: Frequently accessed items stay popular
  - More complex implementation

MIN STACK - O(1) MINIMUM TRACKING

**Problem**: Design a stack with push, pop, top, and getMin—all in O(1).

**Naive approach**: \`min(stack)\` is O(n)—too slow!

**Insight**: Track minimum alongside each element. Store \`(value, current_min)\` where current_min is the minimum of all elements at or below this position.

\`\`\`python
class MinStack:
    def __init__(self):
        self.stack = []  # Store (value, current_min) tuples

    def push(self, val):
        if not self.stack:
            self.stack.append((val, val))
        else:
            current_min = min(val, self.stack[-1][1])
            self.stack.append((val, current_min))

    def pop(self):
        self.stack.pop()

    def top(self):
        return self.stack[-1][0]

    def getMin(self):
        return self.stack[-1][1]  # O(1) min!

# Time: O(1) all operations
# Space: O(n) for tuples
\`\`\`python

**Variant: Max Stack** - Same pattern, just track max instead of min.

QUEUE USING TWO STACKS

**Problem**: Implement queue (FIFO) using only two stacks (LIFO).

**Insight**: Use one stack for enqueue, one for dequeue. Reverse when needed.

\`\`\`python
class QueueWithStacks:
    def __init__(self):
        self.in_stack = []   # For enqueue
        self.out_stack = []  # For dequeue

    def enqueue(self, x):
        self.in_stack.append(x)  # O(1)

    def dequeue(self):
        if not self.out_stack:
            # Transfer all from in_stack to out_stack (reverses order)
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())

        if not self.out_stack:
            raise IndexError("Queue is empty")

        return self.out_stack.pop()

    def peek(self):
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack[-1]

# Time: Amortized O(1) for all operations
# Each element moved at most twice (in→out, out→return)
\`\`\`python

INSERT DELETE GETRANDOM O(1)

**Problem**: Design a data structure supporting:
- \`insert(val)\`: Add element—O(1)
- \`remove(val)\`: Remove element—O(1)
- \`getRandom()\`: Return random element with equal probability—O(1)

**Insight**: HashMap + Array combination
- Array: Enables O(1) random access for getRandom
- HashMap: Maps value → index for O(1) insert/remove

\`\`\`python
import random

class RandomizedSet:
    def __init__(self):
        self.vals = []  # Array for random access
        self.pos = {}   # value -> index in array

    def insert(self, val):
        if val in self.pos:
            return False
        self.pos[val] = len(self.vals)
        self.vals.append(val)
        return True

    def remove(self, val):
        if val not in self.pos:
            return False

        # Swap with last element, then pop
        idx = self.pos[val]
        last_val = self.vals[-1]

        self.vals[idx] = last_val
        self.pos[last_val] = idx

        self.vals.pop()
        del self.pos[val]
        return True

    def getRandom(self):
        return random.choice(self.vals)  # O(1) random access

# All operations O(1)!
\`\`\`python

RATE LIMITER - SYSTEM DESIGN CLASSIC

**Problem**: Limit requests to N per time window (e.g., 100 requests per minute).

**Approach 1: Fixed Window** (simplest, but allows bursts)
\`\`\`python
import time

class FixedWindowLimiter:
    def __init__(self, max_requests, window_seconds):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.count = 0
        self.window_start = time.time()

    def allow_request(self):
        now = time.time()

        # Reset window if expired
        if now - self.window_start >= self.window_seconds:
            self.count = 0
            self.window_start = now

        if self.count < self.max_requests:
            self.count += 1
            return True
        return False

# Problem: Allows 2N requests at window boundary!
# Example: 100 requests at 0:59, 100 more at 1:00
\`\`\`python

**Approach 2: Sliding Window** (accurate, higher space)
\`\`\`python
from collections import deque
import time

class SlidingWindowLimiter:
    def __init__(self, max_requests, window_seconds):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.timestamps = deque()

    def allow_request(self):
        now = time.time()

        # Remove timestamps outside window
        while self.timestamps and now - self.timestamps[0] >= self.window_seconds:
            self.timestamps.popleft()

        if len(self.timestamps) < self.max_requests:
            self.timestamps.append(now)
            return True
        return False

# Accurate rate limiting, O(1) amortized
\`\`\`python

**Approach 3: Token Bucket** (smooth rate limiting)
\`\`\`python
import time

class TokenBucketLimiter:
    def __init__(self, capacity, refill_rate):
        self.capacity = capacity
        self.tokens = capacity
        self.refill_rate = refill_rate  # tokens per second
        self.last_refill = time.time()

    def allow_request(self):
        now = time.time()

        # Refill tokens based on elapsed time
        elapsed = now - self.last_refill
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
        self.last_refill = now

        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False

# Smooth rate limiting, allows bursts up to capacity
\`\`\`python

ITERATOR PROTOCOL - CUSTOM ITERATION

**Pattern**: Implement \`__iter__()\` and \`__next__()\` for custom iteration.

\`\`\`python
class FlattenIterator:
    """Flatten nested list iterator"""
    def __init__(self, nested_list):
        self.stack = [[nested_list, 0]]

    def __iter__(self):
        return self

    def __next__(self):
        while self.stack:
            curr_list, idx = self.stack[-1]

            if idx >= len(curr_list):
                self.stack.pop()
                continue

            elem = curr_list[idx]
            self.stack[-1][1] += 1

            if isinstance(elem, list):
                self.stack.append([elem, 0])
            else:
                return elem

        raise StopIteration

# Usage
nested = [1, [2, [3, 4]], 5]
for num in FlattenIterator(nested):
    print(num)  # 1, 2, 3, 4, 5
\`\`\`python

MEDIAN FINDER - TWO HEAPS PATTERN

**Problem**: Design a data structure for finding median from a stream.
- \`addNum(num)\`: Add number to stream—O(log n)
- \`findMedian()\`: Return median—O(1)

**Insight**: Two heaps—max-heap for smaller half, min-heap for larger half.

\`\`\`python
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # Max-heap (negate values)
        self.large = []  # Min-heap

    def addNum(self, num):
        # Add to max-heap (small half)
        heapq.heappush(self.small, -num)

        # Balance: move largest from small to large
        heapq.heappush(self.large, -heapq.heappop(self.small))

        # Ensure small has equal or one more element
        if len(self.small) < len(self.large):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2

# Time: addNum O(log n), findMedian O(1)
\`\`\`python

COMMON DESIGN PATTERNS SUMMARY

| Pattern | Building Blocks | Use Case | Time |
|---------|----------------|----------|------|
| LRU Cache | HashMap + Doubly Linked List | General caching | O(1) |
| LFU Cache | HashMap + Freq Map + Lists | Frequency-based caching | O(1) |
| Min/Max Stack | Stack + Tuples | Track extreme with stack | O(1) |
| Queue with Stacks | Two Stacks | FIFO with LIFO primitives | O(1) amortized |
| Insert/Delete/Random | HashMap + Array | Random access + fast ops | O(1) |
| Rate Limiter | Deque (timestamps) | API rate limiting | O(1) amortized |
| Median Finder | Two Heaps | Stream median | O(log n) add, O(1) find |
| Custom Iterator | State + __next__ | Flatten, peek, filter | O(1) per item |

WHEN TO USE EACH PATTERN

- **Need O(1) lookup + ordering?** HashMap + Linked List (LRU)
- **Need to track extremes (min/max)?** Tuples or separate stack
- **Need FIFO with LIFO primitives?** Two stacks (queue)
- **Need random access + fast insert/delete?** HashMap + Array
- **Need to limit rate?** Sliding window with deque
- **Need median from stream?** Two heaps (max + min)
- **Need custom iteration logic?** Iterator protocol

BEST PRACTICES FOR DESIGN INTERVIEWS

1. **Clarify requirements**: What operations? Time complexity? Space constraints?
2. **Start simple**: Naive solution first, then optimize
3. **Draw diagrams**: Visual representation helps with linked lists, heaps
4. **Explain trade-offs**: "HashMap gives O(1) lookup, but I need ordering too, so..."
5. **Code incrementally**: Implement one method at a time, test each
6. **Handle edge cases**: Empty structures, capacity limits, invalid inputs
7. **Analyze complexity**: State time/space for each operation
8. **Consider alternatives**: "Could use OrderedDict instead of manual doubly linked list"`,M=`Generators enable lazy evaluation—producing values one at a time instead of building entire sequences in memory. The key insight: process infinite sequences, handle huge files, and build data pipelines with constant memory. The yield keyword transforms functions into generators, unlocking memory-efficient iteration patterns impossible with lists.

WHY GENERATORS MATTER IN INTERVIEWS: Generators solve the memory problem elegantly. When interviewers ask "how would you handle a 100GB file?" or "process an infinite stream?", generators are the answer. They're Python's secret weapon for scalable data processing—constant O(1) memory regardless of input size. Master generators and you can handle any data scale problem.

**The generator advantage:**
- Lists: O(n) memory, load everything upfront
- Generators: O(1) memory, produce values on-demand
- Use case: 1 billion integers = 8GB list vs 128 bytes generator
- Interview gold: "I'll use a generator to keep memory constant"

MEMORY EFFICIENCY: THE FUNDAMENTAL DIFFERENCE

Lists store all elements in memory simultaneously. Generators yield one element at a time, maintaining state between yields. For large datasets, this difference is dramatic.

\`\`\`python
# List approach - loads everything
def range_list(n):
    result = []
    for i in range(n):
        result.append(i)
    return result

huge_list = range_list(1_000_000_000)  # 8GB+ memory!
# Entire list built before you can use it

# Generator approach - yields one at a time
def range_gen(n):
    for i in range(n):
        yield i  # Pause here, return value

huge_gen = range_gen(1_000_000_000)  # ~128 bytes memory
for num in huge_gen:
    process(num)  # Only one number in memory at a time
\`\`\`python

**Real-world example: Reading huge log files**
\`\`\`python
# ❌ BAD - loads entire 100GB file into memory
def read_log_list(filename):
    with open(filename) as f:
        return f.readlines()  # Memory: 100GB!

lines = read_log_list('huge.log')  # CRASH!
for line in lines:
    process(line)

# ✅ GOOD - processes one line at a time
def read_log_generator(filename):
    with open(filename) as f:
        for line in f:  # Files are generators!
            yield line.strip()

for line in read_log_generator('huge.log'):
    process(line)  # Memory: O(1) per line
\`\`\`python

YIELD KEYWORD: HOW GENERATORS WORK

When a function contains \`yield\`, calling it returns a generator object (doesn't execute the function). Each call to \`next()\` executes until the next \`yield\`, returns the yielded value, and pauses. State (local variables, execution position) is preserved between yields.

\`\`\`python
def countdown(n):
    print(f"Starting from {n}")
    while n > 0:
        yield n  # Pause and return n
        n -= 1
    print("Done!")

gen = countdown(3)  # Returns generator, prints nothing yet
print(type(gen))    # <class 'generator'>

print(next(gen))    # "Starting from 3", returns 3
print(next(gen))    # Returns 2 (resumes after yield)
print(next(gen))    # Returns 1
print(next(gen))    # "Done!", raises StopIteration

# Generators work with for loops
for num in countdown(3):
    print(num)  # 3, 2, 1 (for handles StopIteration)
\`\`\`python

**Generator state preservation:**
\`\`\`python
def fibonacci():
    a, b = 0, 1
    while True:  # Infinite generator!
        yield a
        a, b = b, a + b

fib = fibonacci()
print(next(fib))  # 0
print(next(fib))  # 1
print(next(fib))  # 1
print(next(fib))  # 2
print(next(fib))  # 3
# State (a, b) preserved between calls!
\`\`\`python

GENERATOR EXPRESSIONS: LAZY COMPREHENSIONS

Like list comprehensions but with parentheses instead of brackets. Lazy evaluation—values computed on-demand.

\`\`\`python
# List comprehension - immediate evaluation
squares_list = [x**2 for x in range(1_000_000)]  # ~8MB memory
print(len(squares_list))    # 1000000
print(squares_list[500000]) # Random access OK
for sq in squares_list:     # Can iterate multiple times
    pass

# Generator expression - lazy evaluation
squares_gen = (x**2 for x in range(1_000_000))  # ~128 bytes
# print(len(squares_gen))   # TypeError: no len()!
# print(squares_gen[500000])# TypeError: no indexing!

for sq in squares_gen:      # Iterate once
    if sq > 1000:
        break

# Generator exhausted - can't iterate again!
for sq in squares_gen:      # Nothing printed
    print(sq)
\`\`\`python

**When to use which:**
- Generator \`()\`: One-time iteration, large data, memory-constrained
- List \`[]\`: Multiple iterations, need \`len()\`, need indexing

**Converting generator to list:**
\`\`\`python
gen = (x**2 for x in range(10))
lst = list(gen)  # Materialize all values
# Now have: len(), indexing, multiple iterations
# But: defeats memory benefits!
\`\`\`python

GENERATOR PIPELINES: COMPOSABLE DATA PROCESSING

Chain generators to process data in stages without intermediate storage. Each generator feeds the next, maintaining constant memory.

\`\`\`python
# Process huge log file in pipeline
def read_lines(filename):
    """Generator: read file line by line"""
    with open(filename) as f:
        for line in f:
            yield line.strip()

def filter_errors(lines):
    """Generator: filter for error lines"""
    for line in lines:
        if 'ERROR' in line:
            yield line

def parse_timestamps(lines):
    """Generator: extract timestamps"""
    for line in lines:
        # Assume format: [timestamp] ERROR message
        timestamp = line.split(']')[0][1:]
        yield timestamp

def count_by_hour(timestamps):
    """Terminal: consume and aggregate"""
    from collections import Counter
    hours = (ts.split(':')[0] for ts in timestamps)
    return Counter(hours)

# Pipeline: compose generators
lines = read_lines('huge.log')
errors = filter_errors(lines)
timestamps = parse_timestamps(errors)
hourly_counts = count_by_hour(timestamps)

# Entire pipeline uses O(1) memory!
# Processes 100GB file with constant memory
\`\`\`python

**Pipeline pattern:**
1. **Source**: Generator that produces data
2. **Transform**: Generator that modifies data
3. **Filter**: Generator that selects data
4. **Sink**: Terminal operation that consumes

YIELD FROM: DELEGATING TO SUBGENERATORS

\`yield from\` delegates to another generator. Instead of manual looping, delegate directly.

\`\`\`python
# ❌ Manual looping
def flatten_manual(nested):
    for sublist in nested:
        for item in sublist:
            yield item

# ✅ yield from - cleaner and faster
def flatten(nested):
    for sublist in nested:
        yield from sublist

nested = [[1, 2], [3, 4], [5]]
list(flatten(nested))  # [1, 2, 3, 4, 5]
\`\`\`python

**Recursive tree traversal:**
\`\`\`python
class Node:
    def __init__(self, value, children=None):
        self.value = value
        self.children = children or []

def traverse(node):
    yield node.value
    for child in node.children:
        yield from traverse(child)  # Recursive delegation

tree = Node(1, [Node(2, [Node(4), Node(5)]), Node(3)])
list(traverse(tree))  # [1, 2, 4, 5, 3]
\`\`\`python

**Why \`yield from\` vs manual loop:**
- Cleaner syntax
- Faster (avoids Python function call overhead)
- Properly handles exceptions and return values

ADVANCED: SEND AND TWO-WAY COMMUNICATION

Generators can receive values via \`.send()\`, enabling coroutines and two-way communication.

\`\`\`python
def running_average():
    total = 0
    count = 0
    average = None
    while True:
        value = yield average  # Receive value via send()
        total += value
        count += 1
        average = total / count

avg = running_average()
next(avg)  # Prime the generator
print(avg.send(10))  # 10.0
print(avg.send(20))  # 15.0
print(avg.send(30))  # 20.0
\`\`\`python

**Use cases for send():**
- Streaming aggregations
- Coroutine-based pipelines
- Event-driven systems

WHEN GENERATORS WIN VS LOSE

**Use generators when:**
- Large or infinite sequences
- One-pass iteration sufficient
- Streaming data
- Memory constraints
- Building data pipelines
- Processing files line-by-line

**Example problems:**
- "Process a 100GB log file"
- "Generate infinite Fibonacci sequence"
- "Find first 1 million primes without storing all"
- "Stream processing: read → filter → transform → aggregate"

**Avoid generators when:**
- Need \`len()\` (generators don't have length)
- Need random access (no indexing: \`gen[i]\`)
- Need to iterate multiple times (generators exhaust)
- Small data that fits in memory (lists are simpler)
- Need to check if value exists (requires full iteration)

**Converting when needed:**
\`\`\`python
gen = (x for x in range(10))

# Need len?
lst = list(gen)
print(len(lst))

# Need to iterate twice?
import itertools
gen1, gen2 = itertools.tee(gen, 2)
# Now can iterate gen1 and gen2 independently
\`\`\`python

COMMON PATTERNS AND IDIOMS

**Pattern 1: Infinite sequences**
\`\`\`python
def count(start=0):
    while True:
        yield start
        start += 1

# Use with itertools.islice
from itertools import islice
first_10 = list(islice(count(), 10))  # [0, 1, ..., 9]
\`\`\`python

**Pattern 2: File processing with context**
\`\`\`python
def process_file(filename):
    with open(filename) as f:
        for line in f:  # File itself is a generator
            if line.strip():  # Skip empty lines
                yield line.strip().upper()

for line in process_file('data.txt'):
    print(line)
# File automatically closed when generator exhausted
\`\`\`python

**Pattern 3: Batching**
\`\`\`python
def batch(iterable, n):
    """Yield batches of n items"""
    from itertools import islice
    iterator = iter(iterable)
    while True:
        batch = list(islice(iterator, n))
        if not batch:
            break
        yield batch

for batch in batch(range(10), 3):
    print(batch)  # [0,1,2], [3,4,5], [6,7,8], [9]
\`\`\`python

**Pattern 4: Generator state machine**
\`\`\`python
def stateful_processor():
    state = 'START'
    while True:
        value = yield state
        if value == 'reset':
            state = 'START'
        elif value == 'next':
            state = 'PROCESSING' if state == 'START' else 'DONE'
\`\`\`python

COMMON GOTCHAS

**1. Generator exhaustion:**
\`\`\`python
gen = (x for x in range(3))
list(gen)  # [0, 1, 2]
list(gen)  # [] - generator exhausted!

# Solution: recreate or use itertools.tee
\`\`\`python

**2. Early binding in generator expressions:**
\`\`\`python
# ❌ WRONG - captures final value
funcs = [(lambda: i) for i in range(3)]
[f() for f in funcs]  # [2, 2, 2] - all return 2!

# ✅ CORRECT with generator
funcs = list((lambda i=i: i) for i in range(3))
[f() for f in funcs]  # [0, 1, 2]
\`\`\`python

**3. Forgetting to consume:**
\`\`\`python
# ❌ Generator created but never consumed
(print(x) for x in range(10))  # Nothing printed!

# ✅ Consume the generator
list(print(x) for x in range(10))  # Prints 0-9
\`\`\`python

**4. Can't check containment efficiently:**
\`\`\`python
gen = (x for x in range(1000000))
# ❌ BAD - iterates entire generator
if 500 in gen:  # O(n), exhausts generator
    pass

# ✅ GOOD - use set or list if need membership testing
\`\`\`python

BEST PRACTICES FOR INTERVIEWS

1. **Recognize generator opportunities:**
   - "Process large file" → generator
   - "Infinite sequence" → generator
   - "Memory constraint" → generator
   - "Stream processing" → generator pipeline

2. **Communicate memory benefits:**
   - "This generator uses O(1) memory instead of O(n)"
   - "We can handle any file size with constant memory"
   - "Generator pipeline avoids intermediate storage"

3. **Know the tradeoffs:**
   - One-time iteration
   - No len(), no indexing
   - Must consume to execute

4. **Combine with itertools:**
   - \`islice()\` for limiting
   - \`chain()\` for concatenating
   - \`tee()\` for duplicating
   - \`groupby()\` for grouping

5. **Use generator expressions:**
   - Prefer \`sum(x**2 for x in data)\` over \`sum([x**2 for x in data])\`
   - Memory efficient, just as readable

INTERVIEW EXAMPLES

**Example 1: First N primes without storing all**
\`\`\`python
def is_prime(n):
    if n < 2: return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0: return False
    return True

def primes():
    n = 2
    while True:
        if is_prime(n):
            yield n
        n += 1

# Get first 1000 primes without storing all primes
from itertools import islice
first_1000 = list(islice(primes(), 1000))
\`\`\`python

**Example 2: Process logs with filtering**
\`\`\`python
def error_logs(filename):
    with open(filename) as f:
        for line in f:
            if 'ERROR' in line:
                yield line.strip()

errors = list(error_logs('app.log'))
\`\`\`python

Generators are Python's answer to scalable iteration. They turn memory nightmares into elegant constant-space solutions. When you see "large data" or "infinite sequence" in an interview, think generators.`,N=`Greedy algorithms make locally optimal choices at each step, hoping to find a global optimum. The key insight: if you can prove that local optimality leads to global optimality, greedy is dramatically simpler and faster than dynamic programming—but the challenge is proving correctness. When greedy works, it's elegant. When it fails, it fails catastrophically.

WHY GREEDY IS POWERFUL (AND DANGEROUS): Greedy algorithms are seductive: they're intuitive, easy to code, and often O(n log n) instead of O(n²) or exponential. But they're also dangerous—most problems where greedy seems obvious actually require DP or backtracking. The real skill is knowing when greedy works and being able to prove it. In interviews, if you claim a greedy solution, you MUST explain why it's correct.

**The greedy paradox:**
- When it works: O(n log n) with 10 lines of code
- When it fails: Wrong answer with no warning
- The hard part: Proving which category your problem is in

THE TWO REQUIREMENTS FOR GREEDY:

**1. Greedy Choice Property**
Making the locally optimal choice at each step leads to a globally optimal solution. You can make a choice that looks best right now without considering future consequences.

Example (Activity Selection): Choosing the activity that ends earliest is always safe—it leaves maximum room for future activities. Proof: If optimal solution chose different activity, swapping it with earliest-ending doesn't make solution worse.

Counter-example (0/1 Knapsack): Choosing item with highest value/weight ratio locally doesn't guarantee global optimum. You might need to skip high-ratio items to fit others.

**2. Optimal Substructure**
An optimal solution contains optimal solutions to subproblems. After making a greedy choice, the remaining problem is smaller and has the same structure.

Example (Activity Selection): After choosing earliest-ending activity, the remaining problem is "select maximum activities from remaining time" - same structure, smaller input.

**Both properties required:** Optimal substructure alone isn't enough (DP has it too). Greedy choice property is what makes greedy work.

PROOF TECHNIQUES: HOW TO VERIFY GREEDY CORRECTNESS

**Technique 1: Exchange Argument** (Most Common)

Assume an optimal solution exists that differs from greedy. Show you can "exchange" elements to match greedy's choice without making it worse. If you can always do this, greedy must be optimal.

\`\`\`python
Proof pattern:
1. Assume optimal solution O differs from greedy solution G at some point
2. Take first difference: O chose x, G chose y
3. Show: exchanging x for y in O produces O' that is:
   - Still valid (satisfies constraints)
   - Still optimal (same or better objective value)
4. Repeat exchange until O becomes G
5. Therefore: G is optimal
\`\`\`python

**Example: Activity Selection**
- Greedy: Always pick activity ending earliest
- Proof: If optimal picks activity ending at time t2, and greedy picks one ending at t1 < t2, swap them. Still have same number of activities, but more time left for future choices. Therefore greedy is at least as good.

**Technique 2: Stays-Ahead Argument**

Show that after each step, greedy maintains a solution at least as good as any other algorithm.

\`\`\`python
Proof pattern:
1. Define what "better partial solution" means
2. Prove: after each greedy choice, greedy's partial solution ≥ any other algorithm's
3. Therefore: at the end, greedy has the best solution
\`\`\`python

**Example: Fractional Knapsack**
- Greedy: Take items in order of value/weight ratio
- Proof: At any point, greedy has packed highest total value for given weight. Any other choice would have lower value for same weight.

**Technique 3: Cut-and-Paste Argument**

Show that any optimal solution can be modified to match greedy's structure without losing optimality.

**Without proof, greedy is just a heuristic** — it might work on test cases but fail on edge cases. In interviews, always explain WHY your greedy approach works.

CLASSIC GREEDY PATTERNS:

**Pattern 1: Activity/Interval Selection**

Given intervals with start/end times, select maximum number without overlap.

\`\`\`python
def max_non_overlapping_intervals(intervals):
    """
    Greedy: Sort by END time, pick earliest ending, skip overlaps.
    Why: Earliest end leaves most room for future intervals.
    """
    if not intervals:
        return 0

    # Sort by end time (KEY: not start time!)
    intervals.sort(key=lambda x: x[1])

    count = 1
    current_end = intervals[0][1]

    for start, end in intervals[1:]:
        if start >= current_end:  # No overlap
            count += 1
            current_end = end

    return count

# Time: O(n log n) for sorting
# Space: O(1) excluding sort

# Why it works: Exchange argument
# If optimal solution chose different interval first,
# swapping it with earliest-ending leaves same or more room
\`\`\`python

**Pattern 2: Fractional Knapsack**

Can take fractions of items. Greedy works (unlike 0/1 knapsack).

\`\`\`python
def fractional_knapsack(items, capacity):
    """
    items = [(value, weight), ...]
    Greedy: Take items by value/weight ratio (highest first).
    """
    # Sort by value/weight ratio (descending)
    items.sort(key=lambda x: x[0]/x[1], reverse=True)

    total_value = 0
    remaining = capacity

    for value, weight in items:
        if weight <= remaining:
            # Take entire item
            total_value += value
            remaining -= weight
        else:
            # Take fraction
            fraction = remaining / weight
            total_value += value * fraction
            break  # Knapsack full

    return total_value

# Time: O(n log n)
# Why it works: Stays-ahead argument
# At each step, we've packed maximum value for weight used
\`\`\`python

**Pattern 3: Huffman Coding (Minimum Cost Tree)**

Build optimal prefix-free binary code.

\`\`\`python
import heapq

def huffman_encoding(frequencies):
    """
    Greedy: Repeatedly merge two lowest-frequency nodes.
    Why: Lowest frequency should be deepest in tree (longest code).
    """
    # Min heap of (frequency, node)
    heap = [(freq, char) for char, freq in frequencies.items()]
    heapq.heapify(heap)

    while len(heap) > 1:
        freq1, node1 = heapq.heappop(heap)
        freq2, node2 = heapq.heappop(heap)

        # Merge: create parent with combined frequency
        merged = (freq1 + freq2, (node1, node2))
        heapq.heappush(heap, merged)

    return heap[0]  # Root of Huffman tree

# Time: O(n log n)
# Why it works: Stays-ahead - minimum frequency nodes should be deepest
\`\`\`python

**Pattern 4: Minimum Spanning Tree (Kruskal's)**

Connect all vertices with minimum total edge weight.

\`\`\`python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False

        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1
        return True

def kruskal_mst(n, edges):
    """
    edges = [(weight, u, v), ...]
    Greedy: Sort edges by weight, add if doesn't create cycle.
    """
    edges.sort()  # Sort by weight
    uf = UnionFind(n)
    mst_weight = 0
    mst_edges = []

    for weight, u, v in edges:
        if uf.union(u, v):  # Doesn't create cycle
            mst_weight += weight
            mst_edges.append((u, v))

            if len(mst_edges) == n - 1:  # MST complete
                break

    return mst_weight, mst_edges

# Time: O(E log E) for sorting edges
# Why it works: Cut property - lightest edge crossing a cut is in some MST
\`\`\`python

**Pattern 5: Jump Game (Can Reach End)**

\`\`\`python
def can_jump(nums):
    """
    nums[i] = max jump length from index i.
    Greedy: Track furthest reachable position.
    """
    max_reach = 0

    for i in range(len(nums)):
        if i > max_reach:  # Can't reach this position
            return False

        max_reach = max(max_reach, i + nums[i])

        if max_reach >= len(nums) - 1:  # Can reach end
            return True

    return True

# Time: O(n)
# Why it works: If we can reach position i, we can try all jumps from i
\`\`\`python

**Pattern 6: Gas Station (Circular Tour)**

\`\`\`python
def can_complete_circuit(gas, cost):
    """
    gas[i] = gas at station i, cost[i] = cost to reach next station.
    Find starting station to complete circular tour.
    """
    if sum(gas) < sum(cost):  # Impossible
        return -1

    total_tank = 0
    current_tank = 0
    start = 0

    for i in range(len(gas)):
        total_tank += gas[i] - cost[i]
        current_tank += gas[i] - cost[i]

        # If can't reach next station, start after i
        if current_tank < 0:
            start = i + 1
            current_tank = 0

    return start if total_tank >= 0 else -1

# Time: O(n)
# Why it works: If sum(gas) >= sum(cost), solution exists.
# If can't reach from A to B, can't start anywhere between A and B either.
\`\`\`python

WHEN GREEDY FAILS: CLASSIC COUNTER-EXAMPLES

**Failure 1: 0/1 Knapsack**

Cannot take fractions. Greedy by value/weight ratio FAILS.

\`\`\`python
# Counter-example:
capacity = 10
items = [(60, 10), (100, 20), (120, 30)]  # (value, weight)
# Greedy by ratio: 60/10=6, 100/20=5, 120/30=4
# Greedy takes: item 1 (value 60) - WRONG!
# Optimal: items 2+3 (value 220) - can't fit item 1 with others

# Solution: Use DP
def knapsack_01(items, capacity):
    n = len(items)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        value, weight = items[i-1]
        for w in range(capacity + 1):
            if weight <= w:
                dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight] + value)
            else:
                dp[i][w] = dp[i-1][w]

    return dp[n][capacity]
# Time: O(n * capacity)
\`\`\`python

**Failure 2: Coin Change (Arbitrary Denominations)**

Greedy (largest coin first) FAILS for arbitrary denominations.

\`\`\`python
# Counter-example:
coins = [1, 3, 4]
amount = 6
# Greedy: 4 + 1 + 1 = 3 coins - WRONG!
# Optimal: 3 + 3 = 2 coins

# Solution: Use DP
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1
# Time: O(amount * len(coins))

# NOTE: Greedy DOES work for canonical coin systems (US coins: 1,5,10,25)
\`\`\`python

**Failure 3: Longest Path in General Graph**

Greedy (pick longest edge available) FAILS.

\`\`\`python
# Counter-example: Graph with edges
# A -> B (weight 10)
# A -> C (weight 1)
# C -> D (weight 9)
# Greedy from A: picks A->B (10), stuck - WRONG!
# Optimal: A->C->D (1+9=10)

# Solution: DFS with backtracking or DP on DAG
\`\`\`python

GREEDY VS DYNAMIC PROGRAMMING: THE DECISION TREE

\`\`\`python
┌─ Problem involves optimization? (min/max) ──┐
│                                              │
├─ Can you prove greedy choice property? ─────┤
│  │                                           │
│  ├─ YES: Greedy (O(n log n))                │
│  │   Examples: Interval scheduling,         │
│  │            Fractional knapsack,           │
│  │            Huffman coding                 │
│  │                                           │
│  └─ NO/UNSURE: Try DP (O(n²) or worse)      │
│      Examples: 0/1 Knapsack,                 │
│                Coin change,                   │
│                Longest path                   │
│                                              │
└─ Need to count ways? → Always DP            │
   (Greedy finds one solution, can't count)   │
\`\`\`python

**When to try greedy first:**
- Sorting seems natural for the problem
- Local choice seems obviously safe
- Problem involves intervals/scheduling
- O(n log n) time is hinted at

**When to skip greedy:**
- Counter-example comes to mind easily
- 0/1 choices (can't take fractions)
- Need ALL solutions or count ways
- Overlapping subproblems are obvious

COMMON GREEDY MISTAKES:

**Mistake 1: No proof of correctness**

\`\`\`python
# ❌ WRONG: "It seems greedy should work"
def solve(items):
    items.sort()  # Seems reasonable
    return items[0]  # Take first one

# ✅ CORRECT: Explain WHY
def solve(items):
    # Greedy: Pick minimum value
    # Proof: By exchange argument, swapping any other value
    # with minimum doesn't decrease total...
    return min(items)
\`\`\`python

**Mistake 2: Sorting by wrong criterion**

\`\`\`python
# ❌ WRONG: Interval scheduling sorted by START time
def max_intervals_wrong(intervals):
    intervals.sort(key=lambda x: x[0])  # Sort by start - WRONG!
    # Fails: [(1,10), (2,3), (4,5)] chooses (1,10), misses (2,3) and (4,5)

# ✅ CORRECT: Sort by END time
def max_intervals_correct(intervals):
    intervals.sort(key=lambda x: x[1])  # Sort by end - CORRECT!
    # Picks (2,3) first, then (4,5), max = 2
\`\`\`python

**Mistake 3: Greedy on wrong subproblem**

\`\`\`python
# Problem: Minimum jumps to reach end
# ❌ WRONG: Greedy "always jump maximum distance"
def min_jumps_wrong(nums):
    jumps = 0
    i = 0
    while i < len(nums) - 1:
        i += nums[i]  # Always max jump - WRONG!
        jumps += 1
    return jumps
# Fails: [2,3,1,1,4] jumps to index 2, then can only jump 1 at a time

# ✅ CORRECT: Greedy "jump to position that reaches furthest"
def min_jumps_correct(nums):
    if len(nums) <= 1:
        return 0

    jumps = 0
    current_max = 0
    next_max = 0

    for i in range(len(nums) - 1):
        next_max = max(next_max, i + nums[i])

        if i == current_max:  # Reached limit of current jump
            jumps += 1
            current_max = next_max

    return jumps
# Time: O(n)
\`\`\`python

INTERVIEW STRATEGY:

**Step 1: Check if greedy might work**
- Does sorting help?
- Is there an obvious "best choice" at each step?
- Does problem involve intervals/scheduling?

**Step 2: Try small examples**
\`\`\`python
# Test greedy on 2-3 examples
# If it works, proceed to proof
# If it fails, switch to DP
\`\`\`python

**Step 3: Prove correctness (if greedy works)**
- Use exchange argument (most common)
- Or stays-ahead argument
- Explain verbally in interview

**Step 4: Code with comments explaining greedy choice**
\`\`\`python
def greedy_solution(items):
    # Greedy choice: sort by value/weight ratio
    # Proof: By stays-ahead, this maximizes value per weight
    items.sort(key=lambda x: x[0]/x[1], reverse=True)
    ...
\`\`\`python

BEST PRACTICES:

1. **Always explain WHY greedy works**: Don't just say "greedy", explain the greedy choice property

2. **Test counter-examples**: Before committing, try to break your greedy approach

3. **Know the failures**: 0/1 Knapsack, arbitrary coin change, longest path

4. **Sort carefully**: Wrong sort key ruins greedy (END time for intervals, not START)

5. **Use proof templates**: Exchange argument is your friend

6. **When in doubt, DP**: Greedy is great when correct, but DP is safer

7. **Complexity check**: Greedy is usually O(n log n), DP is O(n²)—if your greedy is O(n²), something's wrong

8. **Document the greedy choice**: Code comments should explain the strategy`;function P(){return(0,k.jsx)(t,{type:`Greedy Algorithms`,badge:`grdy`,color:`var(--accent-greedy)`,description:`Make locally optimal choices hoping for global optimum. Works when greedy choice property + optimal substructure exist.`,intro:N,methods:o,tabs:(0,k.jsx)(n,{basePath:`/greedy`,problemCount:r(`greedy`)})})}var F=`Interval problems involve ranges with start and end points. These problems appear frequently in scheduling, time management, and range queries. The key insight: sorting by start or end time (choosing correctly!) often transforms a hard problem into a simple linear scan—but the wrong sort choice makes the problem impossible.

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

# Example
intervals = [[1,3], [2,6], [8,10], [15,18]]
# Result: [[1,6], [8,10], [15,18]]
# Explanation: [1,3] and [2,6] overlap → [1,6]
\`\`\`python

**Key insights:**
- Must use \`max(merged[-1][1], end)\` not just \`end\` - current might be inside previous!
- Example: \`[[1,5], [2,3]]\` → without max, would incorrectly become \`[1,3]\`
- Overlap condition: \`start <= last_end\` (not \`<\`) - touching intervals merge!
- Example: \`[[1,2], [2,3]]\` should merge to \`[1,3]\`

PATTERN 2: INSERT INTERVAL

**Problem**: Insert new interval into sorted non-overlapping list, merge if needed.

**Strategy**: Find position, insert, merge overlaps

\`\`\`python
def insert_interval(intervals, new_interval):
    """
    Insert interval into sorted list and merge overlaps.
    Time: O(n)
    Space: O(n)
    """
    result = []
    i = 0
    n = len(intervals)
    new_start, new_end = new_interval

    # Add all intervals before new interval
    while i < n and intervals[i][1] < new_start:
        result.append(intervals[i])
        i += 1

    # Merge all overlapping intervals with new interval
    while i < n and intervals[i][0] <= new_end:
        new_start = min(new_start, intervals[i][0])
        new_end = max(new_end, intervals[i][1])
        i += 1

    result.append([new_start, new_end])

    # Add all intervals after new interval
    while i < n:
        result.append(intervals[i])
        i += 1

    return result

# Example
intervals = [[1,3], [6,9]]
new = [2,5]
# Result: [[1,5], [6,9]]
# Explanation: [2,5] merges with [1,3] → [1,5]
\`\`\`python

PATTERN 3: NON-OVERLAPPING INTERVALS (GREEDY MAXIMUM)

**Problem**: Find maximum number of non-overlapping intervals.

**Strategy**: SORT BY END, greedy select earliest ending

\`\`\`python
def max_non_overlapping(intervals):
    """
    Maximum number of non-overlapping intervals.
    Time: O(n log n)
    """
    if not intervals:
        return 0

    # CRITICAL: Sort by END time!
    intervals.sort(key=lambda x: x[1])

    count = 1
    current_end = intervals[0][1]

    for start, end in intervals[1:]:
        if start >= current_end:
            # No overlap: include this interval
            count += 1
            current_end = end

    return count

# Example
intervals = [[1,3], [2,4], [3,5]]
# Sorted by end: [[1,3], [2,4], [3,5]]
# Pick [1,3] (end=3), skip [2,4] (starts at 2 < 3), pick [3,5] = 2 intervals
\`\`\`python

**Why sort by END?**
- Greedy: pick interval that ends earliest
- Leaves maximum room for future intervals
- Exchange argument: swapping any other choice doesn't improve solution

**Variant: Minimum intervals to remove**
\`\`\`python
def min_intervals_to_remove(intervals):
    # Remove fewest to make non-overlapping
    # Answer: total - max_non_overlapping
    return len(intervals) - max_non_overlapping(intervals)
\`\`\`python

PATTERN 4: SWEEP LINE TECHNIQUE

**Concept**: Process interval start/end events in chronological order, maintain active count.

**Use cases:**
- Minimum meeting rooms needed
- Maximum concurrent intervals
- Interval coverage count

\`\`\`python
def min_meeting_rooms(intervals):
    """
    Minimum meeting rooms to accommodate all meetings.
    Time: O(n log n)
    Space: O(n)
    """
    if not intervals:
        return 0

    # Create events: (time, type)
    events = []
    for start, end in intervals:
        events.append((start, 1))   # Meeting starts: +1 room
        events.append((end, -1))    # Meeting ends: -1 room

    events.sort()

    current_rooms = 0
    max_rooms = 0

    for time, delta in events:
        current_rooms += delta
        max_rooms = max(max_rooms, current_rooms)

    return max_rooms

# Example
intervals = [[0,30], [5,10], [15,20]]
# Events: (0,+1), (5,+1), (10,-1), (15,+1), (20,-1), (30,-1)
# Rooms:    1       2       1        2        1       0
# Max = 2
\`\`\`python

**Why sweep line works:**
- Processes events in time order (causality!)
- Tracks active count at each time point
- Maximum active count = minimum resources needed

**Tie-breaking rule:**
- When start and end at same time: end first!
- Reason: room becomes free before next meeting starts
- Implementation: sort by time, then by type (-1 before 1)

\`\`\`python
# Better: handle tie-breaking
events.sort(key=lambda x: (x[0], x[1]))  # time, then delta
# end=-1 comes before start=+1 alphabetically
\`\`\`python

PATTERN 5: PRIORITY QUEUE / MIN-HEAP

**Alternative to sweep line**: Track specific intervals, not just count.

\`\`\`python
import heapq

def min_meeting_rooms_heap(intervals):
    """
    Min meeting rooms using heap.
    Time: O(n log n)
    Space: O(n)
    """
    if not intervals:
        return 0

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    # Min-heap of end times
    heap = []

    for start, end in intervals:
        # Remove all meetings that have ended
        while heap and heap[0] <= start:
            heapq.heappop(heap)

        # Add current meeting's end time
        heapq.heappush(heap, end)

    # Heap size = concurrent meetings
    return len(heap)

# Same example: [[0,30], [5,10], [15,20]]
# Process [0,30]: heap = [30], size = 1
# Process [5,10]: heap = [10, 30], size = 2
# Process [15,20]: pop 10 (ended), heap = [20, 30], size = 2
# Max heap size = 2
\`\`\`python

**Heap vs Sweep Line:**
- Heap: O(n log n), tracks specific intervals
- Sweep Line: O(n log n), tracks count only
- Use heap when you need to know which intervals are active
- Use sweep line when you only need the count

PATTERN 6: INTERVAL INTERSECTION

**Problem**: Find intersection of two lists of intervals.

\`\`\`python
def interval_intersection(list1, list2):
    """
    Find intersection of two interval lists.
    Both lists are sorted and non-overlapping.
    Time: O(m + n)
    """
    result = []
    i, j = 0, 0

    while i < len(list1) and j < len(list2):
        start1, end1 = list1[i]
        start2, end2 = list2[j]

        # Check if intervals overlap
        overlap_start = max(start1, start2)
        overlap_end = min(end1, end2)

        if overlap_start <= overlap_end:
            result.append([overlap_start, overlap_end])

        # Move pointer of interval that ends first
        if end1 < end2:
            i += 1
        else:
            j += 1

    return result

# Example
list1 = [[0,2], [5,10], [13,23], [24,25]]
list2 = [[1,5], [8,12], [15,24], [25,26]]
# Result: [[1,2], [5,5], [8,10], [15,23], [24,24], [25,25]]
\`\`\`python

PATTERN 7: REMOVE COVERED INTERVALS

**Problem**: Remove intervals that are covered by another interval.

\`\`\`python
def remove_covered_intervals(intervals):
    """
    Count intervals not covered by another.
    Interval [a,b] is covered by [c,d] if c <= a and b <= d.
    Time: O(n log n)
    """
    # Sort by start ascending, end descending
    intervals.sort(key=lambda x: (x[0], -x[1]))

    count = 0
    max_end = 0

    for start, end in intervals:
        if end > max_end:
            # Not covered by previous intervals
            count += 1
            max_end = end

    return count

# Example
intervals = [[1,4], [2,3], [3,6]]
# Sorted: [[1,4], [3,6], [2,3]]
# Process [1,4]: max_end = 4, count = 1
# Process [3,6]: 6 > 4, count = 2, max_end = 6
# Process [2,3]: 3 <= 6, skip (covered by [1,4])
# Result: 2
\`\`\`python

**Why sort by (start ascending, end descending)?**
- Intervals with same start: process longest first
- Longer interval can cover shorter ones with same start
- Example: \`[[1,5], [1,3]]\` → \`[1,5]\` covers \`[1,3]\`

COMMON PATTERNS SUMMARY

| Problem | Sort By | Algorithm | Time |
|---------|---------|-----------|------|
| Merge overlapping | START | Linear scan, extend/add | O(n log n) |
| Insert interval | START | Three-phase scan | O(n) |
| Max non-overlapping | END | Greedy earliest end | O(n log n) |
| Min meeting rooms | Events | Sweep line or heap | O(n log n) |
| Interval intersection | None (presorted) | Two pointers | O(m + n) |
| Remove covered | START, -END | Track max end | O(n log n) |

COMMON GOTCHAS AND EDGE CASES

**1. Touching intervals: overlap or not?**
\`\`\`python
# [[1,2], [2,3]] - do they overlap?
# Depends on problem! Usually YES (use <=)
if start <= last_end:  # Touching counts as overlap
    merge()
\`\`\`python

**2. Merging must use max, not just end:**
\`\`\`python
# ❌ WRONG
merged[-1][1] = end  # Fails for [[1,5], [2,3]]

# ✅ CORRECT
merged[-1][1] = max(merged[-1][1], end)
\`\`\`python

**3. Sweep line tie-breaking:**
\`\`\`python
# If meeting ends at time T and another starts at T,
# end should process first (room becomes free)
events.sort(key=lambda x: (x[0], x[1]))  # -1 (end) before +1 (start)
\`\`\`python

**4. Empty intervals edge case:**
\`\`\`python
# What if intervals = []?
if not intervals:
    return []  # or 0, or appropriate default
\`\`\`python

**5. Interval representation:**
- Some problems use \`[start, end]\`
- Others use \`(start, end)\` tuples
- Or objects with \`.start\` and \`.end\` attributes
- Be consistent!

BEST PRACTICES FOR INTERVIEWS

1. **Clarify interval format:**
   - Inclusive or exclusive endpoints?
   - \`[start, end]\` or \`[start, end)\`?
   - Can start equal end (zero-length interval)?

2. **Ask about edge cases:**
   - Empty list?
   - Single interval?
   - All overlapping?
   - All non-overlapping?

3. **Choose sort strategy carefully:**
   - Merge/insert/gaps → sort by START
   - Max selection → sort by END
   - When unsure, think: "What do I process first?"

4. **Draw timeline:**
   - Visualize intervals on a number line
   - Helps see overlaps and patterns
   - Catches edge cases

5. **Complexity check:**
   - Sorting: O(n log n)
   - Linear scan after sort: O(n)
   - Total: O(n log n)
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

Mastering intervals means recognizing the pattern, choosing the right sort, and handling edge cases. Once you've seen the 5-6 core patterns (merge, insert, max selection, sweep line, heap, intersection), you can solve any interval problem.`;function I(){return(0,k.jsx)(t,{type:`Intervals Pattern`,badge:`[ ]`,color:`var(--accent-intervals)`,description:`Interval problems: merge, insert, schedule. Key techniques: sort by start/end, sweep line, event processing.`,intro:F,methods:u,tabs:(0,k.jsx)(n,{basePath:`/intervals`,problemCount:r(`intervals`)})})}function L(){return(0,k.jsx)(t,{type:`Python Standard Library`,badge:`py`,color:`var(--accent-stdlib)`,description:`Essential functools, itertools, and collections for interviews. @lru_cache is interview gold for DP memoization.`,intro:A,methods:m})}function R(){return(0,k.jsx)(t,{type:`Design Patterns`,badge:`LRU`,color:`var(--accent-design)`,description:`LRU/LFU Cache, Min Stack, Rate Limiter, and other frequently asked design problems.`,intro:j,methods:v})}var z=`Mathematical algorithms form the foundation for many coding problems. These aren't abstract formulas—they're practical tools that appear in interviews and real systems. The key insight: knowing when to use each technique (GCD vs LCM, sieve vs trial division, modular arithmetic) matters more than memorizing proofs.

WHY MATH IN INTERVIEWS: Math problems test pattern recognition and formula application, not theoretical proofs. When you see "count ways to arrange", think combinatorics. "Find cycle length", think GCD/LCM. "Result mod 10⁹+7", think modular arithmetic. "Is prime", think trial division or sieve. The trick is recognizing which tool to use—once you know, the implementation is straightforward.

**The math interview paradox:**
- Interview = pattern recognition (which formula applies?)
- NOT = mathematical proofs or derivations
- Strategy: Learn when to use each technique, not why it works
- Common fear: "I'm bad at math" → Actually, you just need to recognize patterns

GCD AND LCM: WHEN AND WHY

**GCD (Greatest Common Divisor)**: Largest number that divides both inputs evenly.

Use GCD when:
- Simplifying fractions: \`gcd(numerator, denominator)\`
- Checking if coprime (gcd = 1): for cryptography, hashing
- Finding repeating cycles/patterns: cycle length divides both periods
- Reducing problems to simplest form

**LCM (Least Common Multiple)**: Smallest number divisible by both inputs.

Use LCM when:
- Synchronization: "When do events align again?"
- Finding common denominators for fraction addition
- Merging cycles: lights blinking at different rates
- Tiling problems: when patterns repeat together

\`\`\`python
import math

# GCD - highly optimized, use it!
def gcd_example(a, b):
    return math.gcd(a, b)  # Euclidean algorithm O(log min(a,b))

# LCM formula (no built-in until Python 3.9)
def lcm(a, b):
    return a * b // math.gcd(a, b)  # Divide first to avoid overflow

# Multiple numbers
from functools import reduce
def gcd_multiple(nums):
    return reduce(math.gcd, nums)

def lcm_multiple(nums):
    return reduce(lcm, nums)

# Example: Simplify fraction
def simplify_fraction(num, denom):
    g = math.gcd(num, denom)
    return num // g, denom // g

# Example: Check if coprime
def are_coprime(a, b):
    return math.gcd(a, b) == 1
\`\`\`python

**Euclidean Algorithm** (how GCD works):
\`\`\`python
def gcd_manual(a, b):
    while b:
        a, b = b, a % b
    return a
# Time: O(log min(a,b))
# Why: Each step reduces problem by at least half
\`\`\`python

**Interview Pattern - Cycle Detection:**
\`\`\`python
# Two cyclic processes with periods a and b
# When do they align again?
def next_alignment(period_a, period_b):
    return lcm(period_a, period_b)

# Example: Traffic lights
# Light A: 30 seconds, Light B: 45 seconds
# Both green again in lcm(30, 45) = 90 seconds
\`\`\`python

PRIME NUMBERS: TRIAL DIVISION VS SIEVE OF ERATOSTHENES

**When to use which:**
- **ONE number**: Trial division O(√n) - check if prime
- **MANY numbers**: Sieve O(n log log n) - find all primes up to N

**Trial Division** (checking ONE number):

\`\`\`python
def is_prime(n):
    """
    Check if n is prime.
    Time: O(√n)
    Works for n up to 10¹² in interviews (fast enough!)
    """
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:  # Even numbers
        return False

    # Only check odd divisors up to √n
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False

    return True

# Why √n? If n = a*b and a > √n, then b < √n
# So we find all factors by checking up to √n
\`\`\`python

**Sieve of Eratosthenes** (finding ALL primes up to N):

\`\`\`python
def sieve_of_eratosthenes(n):
    """
    Find all primes up to n.
    Time: O(n log log n)
    Space: O(n)
    """
    if n < 2:
        return []

    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False

    # Only need to check up to √n
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            # Mark all multiples of i as composite
            # Start at i² (smaller multiples already marked)
            for j in range(i * i, n + 1, i):
                is_prime[j] = False

    return [i for i in range(n + 1) if is_prime[i]]

# Example: Find all primes up to 100
primes = sieve_of_eratosthenes(100)
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, ...]

# Optimization: Start at i² because smaller multiples
# (like 2i, 3i, ..., (i-1)i) already marked by smaller primes
\`\`\`python

**Performance comparison:**
- N = 1,000,000
- Trial division (check each): ~10 seconds
- Sieve (find all): ~0.1 seconds
- **Use sieve when finding many primes or preprocessing!**

**Prime Factorization:**

\`\`\`python
def prime_factors(n):
    """
    Find all prime factors of n.
    Time: O(√n)
    """
    factors = []

    # Check for 2s
    while n % 2 == 0:
        factors.append(2)
        n //= 2

    # Check odd factors from 3 to √n
    i = 3
    while i * i <= n:
        while n % i == 0:
            factors.append(i)
            n //= i
        i += 2

    # If n > 1, it's a prime factor
    if n > 1:
        factors.append(n)

    return factors

# Example: prime_factors(84)
# [2, 2, 3, 7] because 84 = 2² × 3 × 7
\`\`\`python

MODULAR ARITHMETIC: THE 10⁹+7 PATTERN

**Why "return answer mod 10⁹+7"?**
- Prevents integer overflow in other languages (Python has infinite precision)
- Makes answers comparable (massive numbers like 10¹⁰⁰⁰ → manageable)
- 10⁹+7 is prime (useful for modular inverse)

**Modular arithmetic rules:**

\`\`\`python
MOD = 10**9 + 7

# Addition
(a + b) % MOD = ((a % MOD) + (b % MOD)) % MOD

# Subtraction
(a - b) % MOD = ((a % MOD) - (b % MOD) + MOD) % MOD  # +MOD handles negatives

# Multiplication
(a * b) % MOD = ((a % MOD) * (b % MOD)) % MOD

# Power (exponentiation)
pow(base, exp, MOD)  # Built-in uses fast binary exponentiation

# Division - DOESN'T WORK DIRECTLY! Use modular inverse
\`\`\`python

**Apply mod to intermediate results** to prevent overflow:

\`\`\`python
# ❌ WRONG - computes huge number first
def factorial_mod_wrong(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result % MOD  # Too late! Already overflowed in other languages

# ✅ CORRECT - apply mod at each step
def factorial_mod_correct(n):
    result = 1
    for i in range(1, n + 1):
        result = (result * i) % MOD  # Keep result manageable
    return result
\`\`\`python

**Binary exponentiation** (fast power):

\`\`\`python
def pow_mod(base, exp, mod):
    """
    Compute (base^exp) % mod efficiently.
    Time: O(log exp)
    Python's built-in pow(base, exp, mod) uses this!
    """
    result = 1
    base %= mod

    while exp > 0:
        if exp % 2 == 1:  # Odd exponent
            result = (result * base) % mod
        base = (base * base) % mod
        exp //= 2

    return result

# Example: pow(2, 1000, MOD) - instant!
# Naive: 2^1000 is ~10³⁰⁰ digit number - impossible!
# Binary exp: Only 10 iterations (log₂ 1000 ≈ 10)
\`\`\`python

MODULAR INVERSE: DIVISION UNDER MODULO

**Problem**: (a / b) % MOD doesn't work directly.
**Solution**: Multiply by modular inverse of b.

When MOD is prime, use **Fermat's Little Theorem**:
\`b^(MOD-1) ≡ 1 (mod MOD)\`
So: \`b^(MOD-2) ≡ b⁻¹ (mod MOD)\`

\`\`\`python
MOD = 10**9 + 7

def mod_inverse(a, mod=MOD):
    """
    Compute modular inverse of a under mod (mod must be prime).
    Returns: a^(-1) mod MOD
    """
    return pow(a, mod - 2, mod)  # Fermat's little theorem

# Division under modulo
def divide_mod(a, b, mod=MOD):
    """
    Compute (a / b) % mod
    """
    return (a * mod_inverse(b, mod)) % mod

# Example: (7 / 3) % MOD
result = divide_mod(7, 3, MOD)

# Common use: Combinatorics (dividing factorials)
def nCr_mod(n, r, mod=MOD):
    """
    Compute C(n, r) % mod = n! / (r! * (n-r)!)
    """
    if r > n or r < 0:
        return 0

    numerator = factorial_mod(n)
    denominator = (factorial_mod(r) * factorial_mod(n - r)) % mod

    # Can't divide directly! Use modular inverse
    return (numerator * mod_inverse(denominator, mod)) % mod
\`\`\`python

COMBINATORICS: COUNTING ARRANGEMENTS

**Permutations** (order matters):
- Arrange n items: \`n!\` ways
- Arrange r from n: \`P(n,r) = n! / (n-r)!\`

**Combinations** (order doesn't matter):
- Choose r from n: \`C(n,r) = n! / (r! * (n-r)!)\`

\`\`\`python
import math

# Permutations
def permutations(n, r):
    return math.factorial(n) // math.factorial(n - r)

# Combinations
def combinations(n, r):
    return math.factorial(n) // (math.factorial(r) * math.factorial(n - r))

# With modular arithmetic
def combinations_mod(n, r, mod=10**9 + 7):
    if r > n or r < 0:
        return 0

    # Precompute factorials
    fact = [1] * (n + 1)
    for i in range(1, n + 1):
        fact[i] = (fact[i-1] * i) % mod

    # C(n, r) = n! / (r! * (n-r)!)
    numerator = fact[n]
    denominator = (fact[r] * fact[n - r]) % mod

    return (numerator * pow(denominator, mod - 2, mod)) % mod
\`\`\`python

**Pascal's Triangle** (dynamic programming approach):

\`\`\`python
def pascal_triangle(n):
    """
    Generate first n rows of Pascal's triangle.
    C(n, r) = C(n-1, r-1) + C(n-1, r)
    """
    triangle = [[1]]

    for i in range(1, n):
        row = [1]
        for j in range(1, i):
            row.append(triangle[i-1][j-1] + triangle[i-1][j])
        row.append(1)
        triangle.append(row)

    return triangle

# Triangle[n][r] = C(n, r)
\`\`\`python

ADDITIONAL MATH PATTERNS

**Digit manipulation:**

\`\`\`python
# Extract digits
def get_digits(n):
    digits = []
    while n > 0:
        digits.append(n % 10)
        n //= 10
    return digits[::-1]  # Reverse for left-to-right order

# Sum of digits
def digit_sum(n):
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total

# Reverse number
def reverse_number(n):
    result = 0
    while n > 0:
        result = result * 10 + (n % 10)
        n //= 10
    return result
\`\`\`python

**Fast exponentiation pattern:**

\`\`\`python
# a^n in O(log n) instead of O(n)
def fast_power(a, n):
    result = 1
    while n > 0:
        if n % 2 == 1:
            result *= a
        a *= a
        n //= 2
    return result

# Example: 2^1000 takes 10 iterations, not 1000!
\`\`\`python

**Perfect squares and sqrt:**

\`\`\`python
import math

# Check if perfect square
def is_perfect_square(n):
    sqrt = int(math.sqrt(n))
    return sqrt * sqrt == n

# Find sqrt without using built-in (binary search)
def sqrt_binary_search(n):
    if n < 2:
        return n

    left, right = 1, n // 2

    while left <= right:
        mid = (left + right) // 2
        square = mid * mid

        if square == n:
            return mid
        elif square < n:
            left = mid + 1
        else:
            right = mid - 1

    return right  # Floor of sqrt
\`\`\`python

WHEN MATH APPEARS IN INTERVIEWS: PATTERN RECOGNITION

**Signal → Technique:**
- "Count ways to..." → Combinatorics (permutations/combinations)
- "Find pattern/cycle" → GCD/LCM
- "Return answer mod 10⁹+7" → Modular arithmetic
- "Is prime" or "prime factors" → Trial division or sieve
- "Large powers" → Binary exponentiation
- "Digit manipulation" → Extract with % 10 and // 10
- "Perfect square/cube" → Binary search on sqrt/cbrt

**Don't panic!** Math problems in interviews test formula application, not proofs. Recognize the pattern, apply the technique, implement carefully with edge cases.

COMMON GOTCHAS AND PITFALLS

**1. Integer division in Python 3:**
\`\`\`python
# ❌ WRONG in Python 3
result = a / b  # Returns float!

# ✅ CORRECT
result = a // b  # Integer division
\`\`\`python

**2. Negative modulo:**
\`\`\`python
# Python handles negatives correctly
-5 % 3  # = 1 (Python)
# Other languages: -5 % 3 = -2

# Safe formula (works everywhere)
result = ((a % MOD) + MOD) % MOD
\`\`\`python

**3. Factorial overflow:**
\`\`\`python
# ❌ WRONG - compute factorial then mod
fact = 1
for i in range(1, n+1):
    fact *= i
return fact % MOD  # Too late!

# ✅ CORRECT - apply mod at each step
fact = 1
for i in range(1, n+1):
    fact = (fact * i) % MOD
return fact
\`\`\`python

**4. Sieve optimization:**
\`\`\`python
# ✅ Start marking at i*i, not 2*i
for i in range(2, int(n**0.5) + 1):
    if is_prime[i]:
        for j in range(i*i, n+1, i):  # Start at i*i!
            is_prime[j] = False
\`\`\`python

**5. Edge cases:**
- GCD(0, n) = n, GCD(n, 0) = n
- 0 and 1 are not prime
- Combinatorics: C(n, 0) = C(n, n) = 1

BEST PRACTICES FOR MATH INTERVIEWS

1. **Recognize the pattern first**: Don't jump into code. Ask: "Is this GCD? Modular? Combinatorics?"

2. **Use Python built-ins**: \`math.gcd()\`, \`pow(base, exp, mod)\` are highly optimized

3. **Apply mod early and often**: Don't wait until the end

4. **Handle edge cases**: 0, 1, negative numbers, empty inputs

5. **Check for overflow** (even in Python for time limits)

6. **Test with small examples**: Verify formula with n=0,1,2 before implementing

7. **Know when to precompute**: Factorials, primes (sieve), Pascal's triangle

8. **Binary search on the answer**: For problems involving sqrt, powers, or "find largest X such that..."`;function B(){return(0,k.jsx)(t,{type:`Math Algorithms`,badge:`∑`,color:`var(--accent-math)`,description:`GCD/LCM, primes, modular arithmetic, combinatorics. Foundation for many interview problems.`,intro:z,methods:x})}function V(){return(0,k.jsx)(t,{type:`Generators & Iterators`,badge:`yield`,color:`var(--accent-generators)`,description:`Memory-efficient iteration with yield. Process huge files with constant memory. Build data pipelines.`,intro:M,methods:T})}var H=`Segment Trees and Binary Indexed Trees (BIT/Fenwick Trees) efficiently handle range queries and updates. The key insight: precompute answers for segments of the array so range queries don't require scanning all elements. Both achieve O(log n) query and update time—turning O(nq) brute force into O(q log n) for q queries.

WHY SEGMENT TREES AND BIT MATTER: When you have an array that changes and need to answer range queries efficiently, you hit a fundamental trade-off. Brute force: O(1) update, O(n) query. Prefix sums: O(n) update, O(1) query. Segment Trees/BIT: O(log n) for both! This makes them essential for problems with many queries and updates on dynamic data.

**The efficiency breakthrough:**
- Brute force: scan range for every query → O(nq) total
- Prefix sums: rebuild prefix array for every update → O(nq) total
- Segment Tree/BIT: logarithmic for both → O((n+q) log n) total
- For n=10⁵, q=10⁵: brute force 10¹⁰ ops, Segment Tree 3M ops (3000× faster!)

WHEN TO USE EACH APPROACH: DECISION TREE

**Prefix Sum Array** (build O(n), query O(1), update O(n)):
- **Use when**: Static array with NO updates
- **Perfect for**: "Given fixed array, answer Q range sum queries"
- **Code**: \`prefix[i] = sum(arr[0:i])\`, \`range_sum(l, r) = prefix[r+1] - prefix[l]\`

**Binary Indexed Tree / Fenwick Tree** (all operations O(log n)):
- **Use when**: Range SUM queries with point updates
- **Perfect for**: "Update arr[i], query sum(arr[l:r+1]), repeat Q times"
- **Advantage**: Simple implementation (~20 lines), low constants
- **Limitation**: ONLY supports prefix sums (can't do min/max/GCD directly)

**Segment Tree** (all operations O(log n)):
- **Use when**: Range queries for ANY associative operation (sum, min, max, GCD, XOR) with updates
- **Perfect for**: "Find min in range [l, r], update arr[i], find max in range [a, b]"
- **Advantage**: Supports any associative operation, range updates with lazy propagation
- **Limitation**: More complex implementation (~100 lines)

**When ALL are overkill:**
- Small arrays (n < 1000): just scan O(n) - simpler and faster in practice
- Few queries (< 10): building tree costs O(n), not worth it
- Rare updates: sometimes just recalculating is simpler

BINARY INDEXED TREE (BIT / FENWICK TREE): THE SIMPLE SOLUTION

**How BIT works:** Uses bit manipulation magic! Each index i stores sum of elements in range determined by i's binary representation. Index 12 (binary 1100) stores sum of 1 element (last set bit = 4 = 2²). This creates overlapping ranges that combine to give any prefix sum in O(log n) steps.

**Key insight:** \`i & (-i)\` extracts the last set bit. For update: add last bit to climb tree. For query: subtract last bit to descend.

\`\`\`python
class BIT:
    def __init__(self, n):
        """
        Create BIT for array of size n.
        Time: O(n), Space: O(n)
        """
        self.n = n
        self.tree = [0] * (n + 1)  # 1-indexed (tree[0] unused)

    def update(self, i, delta):
        """
        Add delta to arr[i].
        Time: O(log n)
        """
        i += 1  # Convert to 1-indexed
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)  # Add last set bit (go to parent)

    def query(self, i):
        """
        Compute prefix sum arr[0..i].
        Time: O(log n)
        """
        i += 1  # Convert to 1-indexed
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)  # Remove last set bit (go to contributor)
        return s

    def range_sum(self, left, right):
        """
        Compute sum(arr[left..right]).
        Time: O(log n)
        """
        if left == 0:
            return self.query(right)
        return self.query(right) - self.query(left - 1)

    def build(self, arr):
        """
        Initialize BIT from array.
        Time: O(n log n)
        """
        for i, val in enumerate(arr):
            self.update(i, val)

# Usage example
arr = [1, 3, 5, 7, 9, 11]
bit = BIT(len(arr))
bit.build(arr)

print(bit.range_sum(1, 4))  # sum([3, 5, 7, 9]) = 24
bit.update(2, 10)           # arr[2] = 5 + 10 = 15
print(bit.range_sum(1, 4))  # sum([3, 15, 7, 9]) = 34
\`\`\`python

**Why i & (-i) works:**
- -i in two's complement: flip bits, add 1
- Example: i=12 (binary 1100), -i = ...0100 (in two's complement)
- i & (-i) = 1100 & 0100 = 0100 = 4 (extracts rightmost 1)

**BIT limitations:**
- Only supports prefix sums (can't directly do range min/max)
- Can't efficiently support range updates (would need difference array trick)
- Less intuitive than Segment Tree (bit manipulation is clever but obscure)

SEGMENT TREE: THE FLEXIBLE SOLUTION

**Structure:** Binary tree where:
- Leaf nodes represent single array elements
- Internal nodes represent merge of children (sum, min, max, etc.)
- Root represents entire array
- Height = O(log n), total nodes = 2n - 1

**Array representation:** Store tree in array of size 4n (worst case). Node i has children 2i and 2i+1.

\`\`\`python
class SegmentTree:
    def __init__(self, arr, operation='sum'):
        """
        Build segment tree from array.
        operation: 'sum', 'min', 'max', 'gcd', etc.
        Time: O(n), Space: O(n)
        """
        self.n = len(arr)
        self.arr = arr
        self.tree = [0] * (4 * self.n)  # 4n is safe size
        self.op = operation

        # Define merge operation
        if operation == 'sum':
            self.merge = lambda a, b: a + b
            self.identity = 0
        elif operation == 'min':
            self.merge = lambda a, b: min(a, b)
            self.identity = float('inf')
        elif operation == 'max':
            self.merge = lambda a, b: max(a, b)
            self.identity = float('-inf')
        elif operation == 'gcd':
            import math
            self.merge = lambda a, b: math.gcd(a, b)
            self.identity = 0

        self._build(0, 0, self.n - 1)

    def _build(self, node, start, end):
        """
        Recursively build tree.
        node: current node index in tree array
        [start, end]: range this node represents
        """
        if start == end:
            # Leaf node
            self.tree[node] = self.arr[start]
        else:
            mid = (start + end) // 2
            left_child = 2 * node + 1
            right_child = 2 * node + 2

            self._build(left_child, start, mid)
            self._build(right_child, mid + 1, end)

            # Internal node: merge children
            self.tree[node] = self.merge(
                self.tree[left_child],
                self.tree[right_child]
            )

    def update(self, idx, val):
        """
        Update arr[idx] = val.
        Time: O(log n)
        """
        self._update(0, 0, self.n - 1, idx, val)

    def _update(self, node, start, end, idx, val):
        if start == end:
            # Leaf node
            self.arr[idx] = val
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            left_child = 2 * node + 1
            right_child = 2 * node + 2

            if idx <= mid:
                self._update(left_child, start, mid, idx, val)
            else:
                self._update(right_child, mid + 1, end, idx, val)

            # Recalculate after child update
            self.tree[node] = self.merge(
                self.tree[left_child],
                self.tree[right_child]
            )

    def query(self, left, right):
        """
        Query range [left, right].
        Time: O(log n)
        """
        return self._query(0, 0, self.n - 1, left, right)

    def _query(self, node, start, end, left, right):
        # No overlap
        if right < start or end < left:
            return self.identity

        # Complete overlap
        if left <= start and end <= right:
            return self.tree[node]

        # Partial overlap: recurse
        mid = (start + end) // 2
        left_result = self._query(2 * node + 1, start, mid, left, right)
        right_result = self._query(2 * node + 2, mid + 1, end, left, right)

        return self.merge(left_result, right_result)

# Usage example
arr = [1, 3, 5, 7, 9, 11]

# Range sum queries
seg_sum = SegmentTree(arr, 'sum')
print(seg_sum.query(1, 4))  # sum([3, 5, 7, 9]) = 24
seg_sum.update(2, 10)       # arr[2] = 10
print(seg_sum.query(1, 4))  # sum([3, 10, 7, 9]) = 29

# Range min queries
seg_min = SegmentTree(arr, 'min')
print(seg_min.query(1, 4))  # min([3, 5, 7, 9]) = 3
seg_min.update(1, 20)       # arr[1] = 20
print(seg_min.query(1, 4))  # min([20, 5, 7, 9]) = 5
\`\`\`python

LAZY PROPAGATION: EFFICIENT RANGE UPDATES

**Problem:** Updating every element in range [L, R] takes O(n) even with Segment Tree—no better than brute force!

**Solution:** Lazy propagation—mark nodes as "lazy", postpone actual updates until queries need them.

**Concept:**
1. Mark node as lazy instead of updating all descendants
2. When querying lazy node, push laziness down to children first
3. Converts O(n) range update to O(log n)

\`\`\`python
class SegmentTreeLazy:
    def __init__(self, arr):
        self.n = len(arr)
        self.arr = arr
        self.tree = [0] * (4 * self.n)
        self.lazy = [0] * (4 * self.n)  # Lazy propagation array
        self._build(0, 0, self.n - 1)

    def _build(self, node, start, end):
        if start == end:
            self.tree[node] = self.arr[start]
        else:
            mid = (start + end) // 2
            self._build(2*node+1, start, mid)
            self._build(2*node+2, mid+1, end)
            self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]

    def _push(self, node, start, end):
        """Push lazy value down to children."""
        if self.lazy[node] != 0:
            # Apply lazy update to current node
            self.tree[node] += (end - start + 1) * self.lazy[node]

            # Propagate to children if not leaf
            if start != end:
                self.lazy[2*node+1] += self.lazy[node]
                self.lazy[2*node+2] += self.lazy[node]

            # Clear lazy
            self.lazy[node] = 0

    def range_update(self, left, right, val):
        """Add val to all elements in [left, right]. Time: O(log n)"""
        self._range_update(0, 0, self.n-1, left, right, val)

    def _range_update(self, node, start, end, left, right, val):
        # Push down existing lazy value
        self._push(node, start, end)

        # No overlap
        if right < start or end < left:
            return

        # Complete overlap: mark lazy
        if left <= start and end <= right:
            self.lazy[node] += val
            self._push(node, start, end)
            return

        # Partial overlap: recurse
        mid = (start + end) // 2
        self._range_update(2*node+1, start, mid, left, right, val)
        self._range_update(2*node+2, mid+1, end, left, right, val)

        # Recalculate after updates (with lazy pushed)
        self._push(2*node+1, start, mid)
        self._push(2*node+2, mid+1, end)
        self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]
\`\`\`python

**When lazy propagation matters:**
- Range updates are frequent (not just point updates)
- Competitive programming (common pattern)
- Interviews: rarely required, but good to know conceptually

INTERVIEW PATTERNS AND COMMON PROBLEMS

**Pattern 1: Range Sum with Updates**
- Problem: "Given array, process Q queries: update arr[i] or query sum(arr[l:r])"
- Solution: BIT (simpler) or Segment Tree (more general)

**Pattern 2: Range Min/Max Queries**
- Problem: "Find minimum in range [l, r], with updates"
- Solution: Segment Tree (BIT can't do this directly)

**Pattern 3: Counting Inversions**
- Problem: "Count pairs (i, j) where i < j and arr[i] > arr[j]"
- Solution: BIT for coordinate compression + counting

**Pattern 4: Range GCD Queries**
- Problem: "Find GCD of elements in range [l, r]"
- Solution: Segment Tree with GCD merge operation

**Pattern 5: Kth Smallest in Range**
- Problem: "Find kth smallest element in range [l, r]"
- Solution: Merge Sort Tree (variant of Segment Tree with sorted sublists)

SEGMENT TREE VS BIT: DETAILED COMPARISON

| Feature | BIT (Fenwick) | Segment Tree |
|---------|---------------|--------------|
| **Operations** | Prefix sums only | Any associative operation |
| **Code Length** | ~20 lines | ~100 lines |
| **Complexity** | O(log n) query/update | O(log n) query/update |
| **Range Update** | Tricky (needs tricks) | Easy with lazy propagation |
| **Intuition** | Bit manipulation (obscure) | Tree structure (clear) |
| **Memory** | O(n) | O(4n) = O(n) |
| **Constants** | Low | Higher (more recursive calls) |
| **Interview** | Good for sum queries | Good for min/max/gcd |

**Choose BIT when:**
- Only need range sum queries
- Want simpler code
- Care about low constants

**Choose Segment Tree when:**
- Need min, max, GCD, XOR, etc.
- Need range updates
- Want clearer code (despite being longer)

COMMON GOTCHAS AND PITFALLS

**1. Array size for Segment Tree:**
\`\`\`python
# ❌ WRONG - tree size too small
tree = [0] * (2 * n)  # May overflow!

# ✅ CORRECT - safe size
tree = [0] * (4 * n)  # Always sufficient
\`\`\`python

**2. 0-indexed vs 1-indexed:**
- BIT traditionally uses 1-indexed (tree[0] unused)
- Convert: \`i += 1\` when calling BIT operations
- Segment Tree can use either (be consistent!)

**3. Range query boundaries:**
\`\`\`python
# Query range [left, right] INCLUSIVE
# Common mistake: forgetting endpoints are inclusive
seg.query(0, n-1)  # Entire array
seg.query(0, 0)    # Just first element
\`\`\`python

**4. Update vs set in BIT:**
- BIT.update(i, delta) ADDS delta to arr[i]
- To SET arr[i] = val: \`update(i, val - arr[i])\`

**5. Forgetting to push lazy:**
- Must push lazy before querying node
- Must push lazy before recursing on children

BEST PRACTICES FOR INTERVIEWS

1. **Ask about constraints:**
   - Array size n? (< 1000 → maybe brute force)
   - Number of queries Q? (< 10 → maybe don't need tree)
   - Types of queries? (only sum → BIT, min/max → Segment Tree)

2. **Start with simpler solutions:**
   - Static array → prefix sums
   - Only sum queries → BIT
   - Only min queries → Segment Tree

3. **Know when it's overkill:**
   - Small n (< 10³): just scan
   - Few queries: building cost not worth it
   - If interviewer hints "is there a simpler way?", maybe prefix sums suffice

4. **Implementation tips:**
   - Test with small example (n=4) on paper first
   - Draw the tree structure to visualize
   - Use helper functions for build/query/update

5. **Complexity analysis:**
   - Build: O(n)
   - Query: O(log n)
   - Update: O(log n)
   - Total for Q operations: O(n + Q log n)

6. **Interview communication:**
   - Explain why you need O(log n) (brute force too slow)
   - Mention tradeoff: O(n) preprocessing for O(log n) queries
   - If stuck on implementation, explain concept and ask if pseudocode is ok

7. **When interviewer asks "optimize":**
   - Brute force O(nq) → "We can use Segment Tree for O(q log n)"
   - Show you know the tool exists even if implementation is complex

WHEN SEGMENT TREE APPEARS IN REAL INTERVIEWS

**Signals in problem statement:**
- "Answer Q queries on array" (large Q → likely need tree structure)
- "Support both queries and updates" (dynamic → not just prefix sums)
- "Find min/max/sum in range" (range query → possible tree)

**Red herrings (DON'T need Segment Tree):**
- "Given fixed array, answer range sum queries" → prefix sums
- "Find max in sliding window" → deque, not Segment Tree
- "Count elements in range" → binary search on sorted array

**True Segment Tree problems:**
- LeetCode 307: Range Sum Query - Mutable (BIT or Segment Tree)
- LeetCode 315: Count of Smaller Numbers After Self (BIT with coordinate compression)
- "Range minimum query with updates" (Segment Tree)
- "Count inversions in array" (BIT)

The key: Segment Trees are powerful but complex. In interviews, knowing when to use them and explaining the tradeoff matters more than perfect implementation. If you identify the need for O(log n) range queries with updates, you've shown the right intuition—even if you can't code it perfectly in 45 minutes.`;function U(){return(0,k.jsx)(t,{type:`Segment Tree / BIT`,badge:`tree`,color:`var(--accent-segment-tree)`,description:`O(log n) range queries + point updates. Segment Tree for sum/min/max, BIT (Fenwick) for simpler prefix sums.`,intro:H,methods:O})}export{R as DesignPatternsPage,V as GeneratorsPage,P as GreedyPage,I as IntervalsPage,B as MathPage,U as SegmentTreePage,L as StdlibPage};