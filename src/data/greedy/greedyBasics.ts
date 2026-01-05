import type { Method } from '../../types'

// Why & When, Greedy vs DP, Activity Selection, Jump Game
export const greedyBasicsMethods: Method[] = [
  // Why & When
  { signature: 'Why use Greedy?', description: 'Make locally optimal choice at each step hoping to find global optimum. Works when problem has greedy choice property + optimal substructure.', complexity: 'Concept', section: 'Why & When', example: `# GREEDY ALGORITHM CHARACTERISTICS:
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
# use greedy!` },
  { signature: 'Greedy vs DP', description: 'Greedy makes one choice and moves on. DP explores all choices. Greedy is faster but only works for specific problems.', complexity: 'Concept', section: 'Why & When', example: `# GREEDY vs DYNAMIC PROGRAMMING
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
    pass` },
  { signature: 'Greedy Template', description: 'Sort by some criteria, then iterate making locally optimal choices.', complexity: 'O(n log n)', section: 'Why & When', example: `# GREEDY TEMPLATE
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
# - Size/weight (bin packing heuristics)` },

  // Activity Selection
  { signature: 'Activity Selection Problem', description: 'Select maximum non-overlapping activities. Classic greedy: sort by end time, always pick earliest ending.', complexity: 'O(n log n)', section: 'Activity Selection', example: `def activity_selection(activities):
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
# This is the greedy choice that's provably optimal` },
  { signature: 'Weighted Activity Selection', description: 'Activities have weights/values. Need DP, not pure greedy.', complexity: 'O(n log n)', section: 'Activity Selection', example: `def weighted_activity_selection(activities):
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

# Note: Can optimize find_last_non_conflict with binary search` },

  // Jump Game
  { signature: 'Jump Game I', description: 'Can you reach the last index? Track maximum reachable position.', complexity: 'O(n)', section: 'Jump Game', example: `def can_jump(nums):
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
# i=4: i(4) > max_reach(3), return False` },
  { signature: 'Jump Game II', description: 'Minimum jumps to reach end. Track current jump range and next range.', complexity: 'O(n)', section: 'Jump Game', example: `def jump(nums):
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
# next jump's reach, not necessarily the farthest position` },
  { signature: 'Jump Game III', description: 'Can reach index with value 0? BFS/DFS from start position.', complexity: 'O(n)', section: 'Jump Game', example: `def can_reach(arr, start):
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

    return False` },
]
