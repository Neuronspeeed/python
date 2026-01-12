import type { Method } from '../../../types'

export const whyWhenMethods: Method[] = [
  { signature: 'When greedy works', description: 'Pattern: local optimal leads to global optimal. Recognize by: sorting helps, no future dependencies. Greedy often simpler than DP. But prove correctness!', complexity: 'Concept', section: 'Why & When', example: `# GREEDY WORKS WHEN:
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
# Use greedy when it works (faster!)`,
  },
  { signature: 'Common greedy patterns', description: 'Earliest deadline first. Sort by end time. Exchange argument proof. Maximize/minimize with constraints. Learn patterns to recognize greedy problems.', complexity: 'Concept', section: 'Why & When', example: `# PATTERN 1: Earliest Deadline First
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
# → Greedy is optimal!`,
  },
]
