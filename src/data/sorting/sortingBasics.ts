import type { Method } from '../../types'

// Why & When + O(n²) Sorts + O(n log n) Sorts
export const sortingBasicsMethods: Method[] = [
  // Why & When
  { signature: 'Why understand Sorting?', description: 'Foundation of CS. Different algorithms for different data. O(n log n) optimal for comparison sorts.', complexity: 'Concept', section: 'Why & When', example: `# SORTING = Arrange elements in order
# Foundation of many algorithms

# COMPARISON SORTS (O(n log n) optimal):
# - Merge Sort: stable, O(n) space
# - Quick Sort: fast average, O(1) space
# - Heap Sort: in-place, not stable

# NON-COMPARISON SORTS (can be O(n)):
# - Counting Sort: small integer range
# - Radix Sort: fixed-length integers/strings
# - Bucket Sort: uniform distribution

# WHEN TO USE EACH:
# - Need stable? Merge Sort
# - Need in-place? Quick/Heap Sort
# - Small integers? Counting Sort
# - Nearly sorted? Insertion Sort
# - Small array? Insertion Sort

# PYTHON'S TIMSORT:
# - Hybrid: Merge + Insertion
# - O(n log n) worst, O(n) best
# - Stable, adaptive
sorted([3, 1, 4, 1, 5])  # [1, 1, 3, 4, 5]
[3, 1, 4].sort()         # In-place` },
  { signature: 'Sorting Comparison', description: 'Compare time, space, stability of sorting algorithms.', complexity: 'Concept', section: 'Why & When', example: `# COMPARISON TABLE
#
# Algorithm      Best      Avg       Worst     Space   Stable
# ───────────────────────────────────────────────────────────
# Bubble         O(n)      O(n²)     O(n²)     O(1)    Yes
# Selection      O(n²)     O(n²)     O(n²)     O(1)    No
# Insertion      O(n)      O(n²)     O(n²)     O(1)    Yes
# Merge          O(nlogn)  O(nlogn)  O(nlogn)  O(n)    Yes
# Quick          O(nlogn)  O(nlogn)  O(n²)     O(logn) No
# Heap           O(nlogn)  O(nlogn)  O(nlogn)  O(1)    No
# Counting       O(n+k)    O(n+k)    O(n+k)    O(k)    Yes
# Radix          O(nk)     O(nk)     O(nk)     O(n+k)  Yes
# Bucket         O(n+k)    O(n+k)    O(n²)     O(n)    Yes
# Tim            O(n)      O(nlogn)  O(nlogn)  O(n)    Yes

# STABILITY = Equal elements keep original order
# [3a, 1, 3b] -> stable: [1, 3a, 3b]
# [3a, 1, 3b] -> unstable: [1, 3b, 3a] possible` },

  // O(n²) Sorts
  { signature: 'Bubble Sort', description: 'Repeatedly swap adjacent elements. Simple but slow.', complexity: 'O(n²)', section: 'O(n²) Sorts', example: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # Early exit if no swaps (already sorted)
        if not swapped:
            break
    return arr

# Visualization:
# [5, 3, 8, 4, 2]
# Pass 1: [3, 5, 4, 2, 8] (8 bubbles to end)
# Pass 2: [3, 4, 2, 5, 8] (5 bubbles up)
# Pass 3: [3, 2, 4, 5, 8]
# Pass 4: [2, 3, 4, 5, 8]

# When to use:
# - Educational purposes
# - Already nearly sorted (O(n) best case)
# - Very small arrays` },
  { signature: 'Selection Sort', description: 'Find minimum, place at beginning. Simple, minimal swaps.', complexity: 'O(n²)', section: 'O(n²) Sorts', example: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        # Find minimum in unsorted portion
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        # Swap minimum to sorted portion
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Visualization:
# [5, 3, 8, 4, 2]
# i=0: min=2, swap -> [2, 3, 8, 4, 5]
# i=1: min=3, no swap -> [2, 3, 8, 4, 5]
# i=2: min=4, swap -> [2, 3, 4, 8, 5]
# i=3: min=5, swap -> [2, 3, 4, 5, 8]

# When to use:
# - Minimize number of swaps (n-1 max)
# - Memory writes are expensive` },
  { signature: 'Insertion Sort', description: 'Insert each element into sorted portion. Great for nearly sorted data.', complexity: 'O(n²) / O(n) best', section: 'O(n²) Sorts', example: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # Shift elements right until correct position
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

# Visualization:
# [5, 3, 8, 4, 2]
# i=1: key=3, [5,5,8,4,2] -> [3,5,8,4,2]
# i=2: key=8, no shift -> [3,5,8,4,2]
# i=3: key=4, [3,5,8,8,2] -> [3,5,5,8,2] -> [3,4,5,8,2]
# i=4: key=2, shift all -> [2,3,4,5,8]

# Binary insertion sort (fewer comparisons)
from bisect import bisect_left

def binary_insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = bisect_left(arr, key, 0, i)
        arr[j+1:i+1] = arr[j:i]
        arr[j] = key
    return arr

# When to use:
# - Small arrays (< 10-20 elements)
# - Nearly sorted data (O(n) best)
# - Online algorithm (sort as data arrives)
# - Used by Timsort for small runs` },

  // O(n log n) Sorts
  { signature: 'Merge Sort', description: 'Divide and conquer. Stable, predictable O(n log n). Uses O(n) space.', complexity: 'O(n log n)', section: 'O(n log n) Sorts', example: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:  # <= for stability
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result

# In-place merge sort (more complex)
def merge_sort_inplace(arr, left, right):
    if left < right:
        mid = (left + right) // 2
        merge_sort_inplace(arr, left, mid)
        merge_sort_inplace(arr, mid + 1, right)
        merge_inplace(arr, left, mid, right)

# When to use:
# - Need stable sort
# - Predictable performance needed
# - Sorting linked lists (no random access needed)
# - External sorting (large files)` },
  { signature: 'Quick Sort', description: 'Partition around pivot. Fast average, O(n²) worst. In-place.', complexity: 'O(n log n) avg', section: 'O(n log n) Sorts', example: `def quick_sort(arr):
    def partition(low, high):
        pivot = arr[high]  # Choose last as pivot
        i = low - 1

        for j in range(low, high):
            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]

        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        return i + 1

    def sort(low, high):
        if low < high:
            pi = partition(low, high)
            sort(low, pi - 1)
            sort(pi + 1, high)

    sort(0, len(arr) - 1)
    return arr

# Three-way partition (for duplicates)
def quick_sort_3way(arr, low, high):
    if low >= high:
        return

    lt, gt = low, high
    pivot = arr[low]
    i = low + 1

    while i <= gt:
        if arr[i] < pivot:
            arr[lt], arr[i] = arr[i], arr[lt]
            lt += 1
            i += 1
        elif arr[i] > pivot:
            arr[gt], arr[i] = arr[i], arr[gt]
            gt -= 1
        else:
            i += 1

    quick_sort_3way(arr, low, lt - 1)
    quick_sort_3way(arr, gt + 1, high)

# Randomized pivot (avoid O(n²) on sorted input)
import random
def partition_random(arr, low, high):
    pivot_idx = random.randint(low, high)
    arr[pivot_idx], arr[high] = arr[high], arr[pivot_idx]
    # ... rest of partition` },
  { signature: 'Heap Sort', description: 'Build max-heap, extract max repeatedly. In-place, not stable.', complexity: 'O(n log n)', section: 'O(n log n) Sorts', example: `def heap_sort(arr):
    n = len(arr)

    def heapify(n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right

        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(n, largest)

    # Build max heap - O(n)
    for i in range(n // 2 - 1, -1, -1):
        heapify(n, i)

    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]  # Move max to end
        heapify(i, 0)  # Restore heap property

    return arr

# Using heapq (min-heap, so negate for max)
import heapq
def heap_sort_heapq(arr):
    heapq.heapify(arr)  # O(n)
    return [heapq.heappop(arr) for _ in range(len(arr))]

# When to use:
# - Need in-place O(n log n)
# - Don't need stability
# - Want guaranteed O(n log n) (unlike quicksort)` },
]
