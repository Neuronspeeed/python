export const heapIntro = `Use Heaps When...
You need O(1) access to min/max with O(log n) insert/delete—perfect for priority queues and top-k problems. Min-heap keeps smallest at root (parent <= children), max-heap keeps largest at root (parent >= children). The complete binary tree structure guarantees O(log n) height. Choose heaps when you need dynamic min/max tracking without full sorting.

\`\`\`python
import heapq

# MIN-HEAP - Python's heapq default
heap = [5, 2, 8, 1, 9]
heapq.heapify(heap)       # O(n) - not O(n log n)!
print(heap[0])            # O(1) - peek min: 1
heapq.heappush(heap, 3)   # O(log n) - insert
heapq.heappop(heap)       # O(log n) - remove min

# MAX-HEAP - Use negative values
max_heap = [-x for x in [5, 2, 8, 1, 9]]
heapq.heapify(max_heap)
print(-max_heap[0])       # O(1) - peek max: 9
heapq.heappush(max_heap, -10)
largest = -heapq.heappop(max_heap)
\`\`\`
---
Top-K Pattern
To find K largest elements, use min-heap of size K. Process elements: if new element > heap[0], pop smallest and push new. The heap maintains K largest seen. For K smallest, use max-heap. This avoids full sort—O(n log k) vs O(n log n).

\`\`\`python
def k_largest(nums, k):
    # Min-heap of size k keeps k largest
    heap = nums[:k]
    heapq.heapify(heap)     # O(k)

    for num in nums[k:]:    # O((n-k) log k)
        if num > heap[0]:   # Bigger than smallest in heap
            heapq.heapreplace(heap, num)  # Pop & push in one

    return heap  # k largest elements

# EXAMPLE: Find 3 largest in [3, 1, 5, 12, 2, 11]
# After heapify: [1, 3, 5]
# Process 12: 12 > 1, replace: [3, 5, 12]
# Process 2:  2 < 3, skip
# Process 11: 11 > 3, replace: [5, 11, 12]
# Result: [5, 11, 12] in O(n log k)
\`\`\`
---
Heap vs Sorted Array
Both give O(1) min/max peek. Heap: O(log n) insert, O(log n) delete. Sorted array: O(n) insert (maintain sort), O(1) delete if mutable. Use heap for dynamic data with frequent insertions. Use sorted array for static data or when you need binary search (heaps don't support efficient search).

\`\`\`python
# HEAP - Dynamic priority queue
import heapq
pq = []
heapq.heappush(pq, (priority, task))  # O(log n) insert
next_task = heapq.heappop(pq)         # O(log n) remove
# Can't search efficiently - O(n) to find element

# SORTED ARRAY - Static with search
import bisect
arr = [1, 3, 5, 7, 9]
bisect.insort(arr, 4)   # O(n) - shift elements
min_val = arr[0]        # O(1) - peek min
idx = bisect.bisect_left(arr, 5)  # O(log n) - binary search

# RUNNING MEDIAN - Two heaps trick
max_heap = []  # Lower half (negated for max)
min_heap = []  # Upper half

def add_num(num):
    heapq.heappush(max_heap, -num)
    heapq.heappush(min_heap, -heapq.heappop(max_heap))
    if len(min_heap) > len(max_heap):
        heapq.heappush(max_heap, -heapq.heappop(min_heap))

def get_median():
    if len(max_heap) > len(min_heap):
        return -max_heap[0]
    return (-max_heap[0] + min_heap[0]) / 2.0
\`\`\``
