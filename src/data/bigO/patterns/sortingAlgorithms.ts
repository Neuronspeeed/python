import type { Method } from '../../../types'

export const sortingAlgorithmsMethods: Method[] = [
  { signature: 'Sorting Algorithm Comparison', description: 'Quick/Merge/Heap sort: O(n log n). Python sorted() uses Timsort - O(n log n) adaptive.', complexity: 'Reference', section: 'Sorting Algorithms', example: `# SORTING ALGORITHMS COMPARISON
#
# Algorithm      Time (avg)   Time (worst)  Space   Stable
# ─────────────────────────────────────────────────────────
# Bubble Sort    O(n²)        O(n²)         O(1)    Yes
# Selection Sort O(n²)        O(n²)         O(1)    No
# Insertion Sort O(n²)        O(n²)         O(1)    Yes
# Merge Sort     O(n log n)   O(n log n)    O(n)    Yes
# Quick Sort     O(n log n)   O(n²)         O(log n) No
# Heap Sort      O(n log n)   O(n log n)    O(1)    No
# Counting Sort  O(n + k)     O(n + k)      O(k)    Yes
# Radix Sort     O(nk)        O(nk)         O(n+k)  Yes
# Timsort        O(n log n)   O(n log n)    O(n)    Yes

# PYTHON'S sorted() uses TIMSORT
# - Hybrid of merge sort and insertion sort
# - O(n) for nearly sorted data
# - Always use built-in unless you need custom

arr = [3, 1, 4, 1, 5]
sorted(arr)           # Returns new list
arr.sort()            # Sorts in place` },
  { signature: 'When to Use Which Sort', description: 'Small n or nearly sorted: Insertion. General purpose: Timsort (built-in). Integer range: Counting/Radix.', complexity: 'Reference', section: 'Sorting Algorithms', example: `# CHOOSING A SORTING ALGORITHM
#
# USE BUILT-IN sorted() FOR:
# - General purpose sorting
# - Custom key functions
# - Stability requirements

# INSERTION SORT (O(n²)) WHEN:
# - Very small arrays (n < 20)
# - Nearly sorted data (O(n) best case)
# - Online sorting (streaming data)

# COUNTING SORT (O(n + k)) WHEN:
# - Integers in small range [0, k]
# - k is not much larger than n
def counting_sort(arr, k):
    count = [0] * (k + 1)
    for x in arr:
        count[x] += 1
    result = []
    for i, c in enumerate(count):
        result.extend([i] * c)
    return result

# BUCKET SORT WHEN:
# - Uniformly distributed data
# - Can use O(n) extra space

# HEAP SORT WHEN:
# - Need guaranteed O(n log n)
# - Limited extra space (O(1))
# - Don't need stability` },
]
