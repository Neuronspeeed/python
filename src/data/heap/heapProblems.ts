import type { Method } from '../../types'

// Top K, Merge K, Two Heaps, Other Problems
export const heapProblemsMethods: Method[] = [
  // Top K Problems
  { signature: 'Find Top K Elements', description: 'Use min-heap of size k. Push all, pop when size > k. Final heap has k largest.', complexity: 'O(n log k)', section: 'Top K Problems', example: `import heapq

def find_k_largest(nums, k):
    # Min-heap of size k
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)  # Remove smallest
    return sorted(heap, reverse=True)  # k largest

# Alternative: heapq.nlargest
def find_k_largest_simple(nums, k):
    return heapq.nlargest(k, nums)

# K smallest: use max-heap (negate) or nsmallest
def find_k_smallest(nums, k):
    return heapq.nsmallest(k, nums)

# Example:
nums = [3, 1, 4, 1, 5, 9, 2, 6, 5]
print(find_k_largest(nums, 3))  # [9, 6, 5]` },
  { signature: 'Kth Largest Element', description: 'Min-heap of size k. After processing all, top of heap is kth largest.', complexity: 'O(n log k)', section: 'Top K Problems', example: `import heapq

def find_kth_largest(nums, k):
    # Maintain min-heap of k largest elements
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)

    return heap[0]  # kth largest is the smallest in heap

# Alternative: QuickSelect O(n) average
# But heap is simpler and O(n log k) is often good enough

# Example:
nums = [3, 2, 1, 5, 6, 4]
print(find_kth_largest(nums, 2))  # 5

# Kth smallest: same logic
def find_kth_smallest(nums, k):
    # Max-heap of k smallest (negate values)
    heap = []
    for num in nums:
        heapq.heappush(heap, -num)
        if len(heap) > k:
            heapq.heappop(heap)
    return -heap[0]` },
  { signature: 'Top K Frequent Elements', description: 'Count frequencies, then find k most frequent using heap.', complexity: 'O(n log k)', section: 'Top K Problems', example: `import heapq
from collections import Counter

def top_k_frequent(nums, k):
    # Count frequencies - O(n)
    counts = Counter(nums)

    # Use min-heap of size k - O(n log k)
    heap = []
    for num, freq in counts.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)

    return [num for freq, num in heap]

# Using nlargest
def top_k_frequent_simple(nums, k):
    counts = Counter(nums)
    return heapq.nlargest(k, counts.keys(), key=counts.get)

# Bucket sort approach - O(n)
def top_k_frequent_bucket(nums, k):
    counts = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]

    for num, freq in counts.items():
        buckets[freq].append(num)

    result = []
    for i in range(len(buckets) - 1, -1, -1):
        result.extend(buckets[i])
        if len(result) >= k:
            return result[:k]
    return result` },

  // Merge K Sorted
  { signature: 'Merge K Sorted Lists', description: 'Use heap to always pick the smallest head among k lists.', complexity: 'O(n log k)', section: 'Merge K Sorted', example: `import heapq

def merge_k_lists(lists):
    # Heap: (value, list_index, node_index)
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))

    result = []
    while heap:
        val, list_idx, node_idx = heapq.heappop(heap)
        result.append(val)

        # Push next element from same list
        if node_idx + 1 < len(lists[list_idx]):
            next_val = lists[list_idx][node_idx + 1]
            heapq.heappush(heap, (next_val, list_idx, node_idx + 1))

    return result

# For linked lists
def merge_k_linked_lists(lists):
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))

    dummy = ListNode()
    curr = dummy

    while heap:
        val, idx, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, idx, node.next))

    return dummy.next` },

  // Two Heaps
  { signature: 'Find Median from Stream', description: 'Use two heaps: max-heap for lower half, min-heap for upper half.', complexity: 'O(log n) add, O(1) median', section: 'Two Heaps', example: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # Max-heap (negated) for smaller half
        self.large = []  # Min-heap for larger half

    def addNum(self, num):
        # Add to small (max-heap)
        heapq.heappush(self.small, -num)

        # Ensure small's max <= large's min
        if self.large and -self.small[0] > self.large[0]:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)

        # Balance sizes (small can have at most 1 more)
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        elif len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)

    def findMedian(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2

# Usage
mf = MedianFinder()
mf.addNum(1)
mf.addNum(2)
print(mf.findMedian())  # 1.5
mf.addNum(3)
print(mf.findMedian())  # 2` },
  { signature: 'Sliding Window Median', description: 'Two heaps with lazy removal. Track elements to remove.', complexity: 'O(n log n)', section: 'Two Heaps', example: `import heapq
from collections import defaultdict

def median_sliding_window(nums, k):
    small = []  # Max-heap (negated)
    large = []  # Min-heap
    removed = defaultdict(int)  # Lazy removal
    result = []

    def balance():
        # Move from small to large if needed
        while small and large and -small[0] > large[0]:
            heapq.heappush(large, -heapq.heappop(small))
        # Balance sizes
        while len(small) > len(large) + 1:
            heapq.heappush(large, -heapq.heappop(small))
        while len(large) > len(small):
            heapq.heappush(small, -heapq.heappop(large))

    def clean(heap, is_max):
        while heap:
            val = -heap[0] if is_max else heap[0]
            if removed[val] > 0:
                heapq.heappop(heap)
                removed[val] -= 1
            else:
                break

    def get_median():
        if k % 2 == 1:
            return -small[0]
        return (-small[0] + large[0]) / 2

    for i, num in enumerate(nums):
        heapq.heappush(small, -num)
        balance()
        clean(small, True)
        clean(large, False)

        if i >= k:
            removed[nums[i - k]] += 1
            clean(small, True)
            clean(large, False)
            balance()

        if i >= k - 1:
            result.append(get_median())

    return result` },

  // Other Problems
  { signature: 'Task Scheduler', description: 'Schedule tasks with cooldown. Use max-heap for most frequent tasks.', complexity: 'O(n)', section: 'Other Problems', example: `import heapq
from collections import Counter

def least_interval(tasks, n):
    counts = Counter(tasks)
    heap = [-c for c in counts.values()]  # Max-heap
    heapq.heapify(heap)

    time = 0
    while heap:
        temp = []
        for _ in range(n + 1):  # One cycle
            if heap:
                count = heapq.heappop(heap)
                if count + 1 < 0:  # More of this task left
                    temp.append(count + 1)
            time += 1

            if not heap and not temp:
                break

        for c in temp:
            heapq.heappush(heap, c)

    return time

# Example: tasks = ["A","A","A","B","B","B"], n = 2
# Output: 8
# Sequence: A -> B -> idle -> A -> B -> idle -> A -> B` },
  { signature: 'Reorganize String', description: 'Arrange string so no two adjacent chars are same. Use max-heap.', complexity: 'O(n log k)', section: 'Other Problems', example: `import heapq
from collections import Counter

def reorganize_string(s):
    counts = Counter(s)

    # Check if possible
    max_count = max(counts.values())
    if max_count > (len(s) + 1) // 2:
        return ""

    # Max-heap
    heap = [(-c, ch) for ch, c in counts.items()]
    heapq.heapify(heap)

    result = []
    prev_count, prev_char = 0, ''

    while heap:
        count, char = heapq.heappop(heap)
        result.append(char)

        # Push back previous char if count remains
        if prev_count < 0:
            heapq.heappush(heap, (prev_count, prev_char))

        prev_count = count + 1  # Used one
        prev_char = char

    return ''.join(result)

# Example: "aab" -> "aba"
# Example: "aaab" -> "" (impossible)` },
  { signature: 'Meeting Rooms II', description: 'Find minimum meeting rooms needed. Use min-heap for end times.', complexity: 'O(n log n)', section: 'Other Problems', example: `import heapq

def min_meeting_rooms(intervals):
    if not intervals:
        return 0

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    # Min-heap of end times
    heap = []

    for start, end in intervals:
        # If earliest ending meeting is done, reuse room
        if heap and heap[0] <= start:
            heapq.heappop(heap)

        # Allocate room (add end time)
        heapq.heappush(heap, end)

    return len(heap)  # Number of rooms in use

# Example: [[0,30],[5,10],[15,20]]
# Output: 2
# Room 1: [0,30]
# Room 2: [5,10], [15,20]` },
]
