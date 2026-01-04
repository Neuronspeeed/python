import type { Method } from '../../types'

// Why & When + Basic Operations
export const heapBasicsMethods: Method[] = [
  // Why & When
  { signature: 'Why use Heap?', description: 'Get min/max in O(1), insert/delete in O(log n). Use for: priority queues, top-k problems, median finding.', complexity: 'Concept', section: 'Why & When', example: `# HEAP = Complete binary tree with heap property
# Min-heap: parent <= children (root is minimum)
# Max-heap: parent >= children (root is maximum)

# USE CASES:
# - Priority Queue (tasks by priority)
# - Find K largest/smallest elements
# - Merge K sorted lists
# - Running median
# - Dijkstra's algorithm
# - Huffman coding

# PYTHON: heapq module (MIN-HEAP only)
import heapq

# For MAX-HEAP: negate values
# Push -x, pop and negate result

# OPERATIONS:
# heappush    O(log n)  Add element
# heappop     O(log n)  Remove and return min
# heap[0]     O(1)      Peek min (don't pop)
# heapify     O(n)      Convert list to heap` },
  { signature: 'Heap vs Sorted Array', description: 'Heap: O(log n) insert, O(1) peek. Sorted array: O(n) insert, O(1) peek. Use heap for dynamic data.', complexity: 'Concept', section: 'Why & When', example: `# HEAP vs SORTED ARRAY
#
# Operation      Heap         Sorted Array
# ──────────────────────────────────────────
# Insert        O(log n)      O(n)
# Get min/max   O(1)          O(1)
# Delete min    O(log n)      O(1) or O(n)
# Search        O(n)          O(log n)
# Build         O(n)          O(n log n)

# USE HEAP WHEN:
# - Frequent insertions
# - Only need min/max (not search)
# - Streaming data (online algorithm)

# USE SORTED ARRAY WHEN:
# - Data is static
# - Need binary search
# - Need kth element quickly` },

  // Basic Operations
  { signature: 'heapq Operations', description: 'Python heapq module. Min-heap operations on a regular list.', complexity: 'O(log n)', section: 'Basic Operations', example: `import heapq

# Create heap from list - O(n)
nums = [3, 1, 4, 1, 5, 9, 2, 6]
heapq.heapify(nums)  # Modifies in place
print(nums)  # [1, 1, 2, 3, 5, 9, 4, 6] (heap order)

# Push - O(log n)
heapq.heappush(nums, 0)

# Pop minimum - O(log n)
smallest = heapq.heappop(nums)

# Peek minimum - O(1)
smallest = nums[0]  # Don't use heappop

# Push and pop in one operation - O(log n)
result = heapq.heappushpop(nums, 7)  # Push 7, pop min

# Pop and push in one operation - O(log n)
result = heapq.heapreplace(nums, 7)  # Pop min, push 7

# n largest/smallest - O(n log k)
heapq.nlargest(3, nums)
heapq.nsmallest(3, nums)` },
  { signature: 'Max Heap in Python', description: 'Python only has min-heap. Negate values for max-heap behavior.', complexity: 'O(log n)', section: 'Basic Operations', example: `import heapq

# MAX HEAP: Negate values
class MaxHeap:
    def __init__(self):
        self.heap = []

    def push(self, val):
        heapq.heappush(self.heap, -val)

    def pop(self):
        return -heapq.heappop(self.heap)

    def peek(self):
        return -self.heap[0]

    def __len__(self):
        return len(self.heap)

# Usage
max_heap = MaxHeap()
max_heap.push(3)
max_heap.push(1)
max_heap.push(4)
print(max_heap.pop())  # 4 (largest)
print(max_heap.pop())  # 3
print(max_heap.pop())  # 1

# Or inline:
heap = []
heapq.heappush(heap, -5)  # Push 5
heapq.heappush(heap, -3)  # Push 3
largest = -heapq.heappop(heap)  # 5` },
  { signature: 'Heap with Custom Objects', description: 'Use tuples for priority. First element is the key for comparison.', complexity: 'O(log n)', section: 'Basic Operations', example: `import heapq

# Tuple-based priority
heap = []
heapq.heappush(heap, (2, "task B"))
heapq.heappush(heap, (1, "task A"))
heapq.heappush(heap, (3, "task C"))

while heap:
    priority, task = heapq.heappop(heap)
    print(priority, task)
# Output: 1 task A, 2 task B, 3 task C

# For objects, wrap in tuple
class Task:
    def __init__(self, name, priority):
        self.name = name
        self.priority = priority

tasks = [Task("A", 2), Task("B", 1), Task("C", 3)]
heap = [(t.priority, i, t) for i, t in enumerate(tasks)]
heapq.heapify(heap)

# Counter breaks ties (when priorities are equal)
import itertools
counter = itertools.count()
heap = []
heapq.heappush(heap, (priority, next(counter), task))` },
]
