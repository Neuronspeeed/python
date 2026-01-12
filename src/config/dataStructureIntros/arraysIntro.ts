export const arraysIntro = `Use Arrays When...
You need O(1) random access by index. Arrays excel when iteration and lookup dominate—cache locality makes them blazing fast. Python lists are dynamic arrays that resize automatically (1.5-2x when capacity exceeded), making \`append()\` O(1) amortized. Choose arrays when size is predictable or grows slowly.

\`\`\`python
# WHEN ARRAYS SHINE
nums = [1, 2, 3, 4, 5]
value = nums[2]           # O(1) - Direct memory access
for num in nums:          # Cache-friendly iteration
    process(num)

# Building with append() is O(n) total, not O(n^2)
result = []
for i in range(n):
    result.append(i)      # O(1) amortized per append

# WHEN TO AVOID
# AVOID: Frequent insertions in middle (O(n) shifts)
nums.insert(0, 99)        # Shifts entire array
# BETTER: Use deque for O(1) insertions at both ends
from collections import deque
dq = deque([1, 2, 3])
dq.appendleft(99)         # O(1) - No shifts
\`\`\`
---
Master These Patterns
Three essential array patterns solve 80% of problems. **Sliding Window** for subarray problems (max sum, longest substring). **Two Pointers** for palindrome/pair finding in sorted arrays. **Prefix Sum** for range queries on static arrays. Each reduces O(n^2) brute force to O(n) with clever traversal.

\`\`\`python
# SLIDING WINDOW - Max sum subarray of size k
def max_sum_window(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i-k] + arr[i]  # Slide: remove left, add right
        max_sum = max(max_sum, window_sum)
    return max_sum  # O(n) vs O(n*k) brute force

# TWO POINTERS - Pair sum in sorted array
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current = arr[left] + arr[right]
        if current == target:
            return [left, right]
        elif current < target:
            left += 1       # Need larger sum
        else:
            right -= 1      # Need smaller sum
    return []  # O(n) vs O(n^2) nested loops

# PREFIX SUM - Range sum queries
def build_prefix(arr):
    prefix = [0]
    for num in arr:
        prefix.append(prefix[-1] + num)
    return prefix  # O(n) preprocessing

# Query sum(arr[left:right]) in O(1)
prefix = build_prefix([1, 2, 3, 4, 5])
range_sum = prefix[4] - prefix[1]  # sum([2, 3, 4]) = 9
\`\`\`
---
Arrays vs Linked Lists: The Fundamental Trade-off
Arrays give O(1) access but O(n) insertion/deletion (must shift elements). Linked Lists give O(1) insertion/deletion at known position but O(n) access (must traverse). Cache locality matters too—arrays are contiguous (fast iteration), linked lists scatter nodes (cache misses). The decision: does your workload need random access or frequent middle insertions?

\`\`\`python
# ARRAY: Fast access, slow middle insertion
arr = [1, 2, 3, 4, 5]
value = arr[2]            # O(1) - Direct index calculation
arr.insert(2, 99)         # O(n) - Must shift arr[2:] right

# LINKED LIST: Slow access, fast middle insertion
class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

# Access requires traversal
node = head
for _ in range(index):    # O(n) - Must walk the chain
    node = node.next

# Insertion at known position is just pointer update
new_node.next = node.next  # O(1) - No shifts needed
node.next = new_node

# DECISION MATRIX
# Choose ARRAYS when:
#   - Random access needed (indexing, binary search)
#   - Iteration dominates (cache locality wins)
#   - Size is predictable or slowly growing

# Choose LINKED LISTS when:
#   - Frequent middle insertions/deletions (if you maintain references)
#   - Implementing queue/deque (O(1) at both ends with doubly linked)
#   - Size varies wildly or unknown upfront
\`\`\``
