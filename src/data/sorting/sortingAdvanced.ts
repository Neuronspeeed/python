import type { Method } from '../../types'

// Non-Comparison Sorts + Python Built-in + Special Sorting
export const sortingAdvancedMethods: Method[] = [
  // Why & When
  { signature: 'When to use non-comparison sorts', description: 'Counting sort: small integer range. Radix sort: fixed-length integers/strings. Bucket sort: uniform distribution. All beat O(n log n) in specific cases.', complexity: 'Concept', section: 'Why & When', example: `# COUNTING SORT - O(n + k)
# Use when: integers in small range [0, k]
# Example: Sort ages (0-120), sort grades (0-100)
ages = [25, 30, 18, 25, 30, 21]  # Range: 0-120
# k = 120, n = 6 → O(126) faster than O(6 log 6)!

# Good: k << n², excellent for small ranges
# Bad: k >> n, wastes memory (don't sort IDs!)

# RADIX SORT - O(n * k) where k = digits
# Use when: fixed-length numbers/strings
# Example: Sort 10M phone numbers (10 digits)
phone_numbers = ["1234567890", "9876543210", ...]  # 10M numbers
# O(10M * 10) = 100M ops
# vs sorted() O(10M * log 10M * 10) = 230M ops

# Good: many items, few digits
# Bad: variable length, non-numeric data

# BUCKET SORT - O(n) average
# Use when: uniform distribution, floats in [0, 1)
# Example: Sort random probabilities
probabilities = [0.3, 0.1, 0.9, 0.5]
# Uniform → each bucket gets ~1 item → O(n)!

# Good: uniformly distributed, known range
# Bad: skewed distribution (all in one bucket)

# DECISION:
# Integer 0-100? → Counting sort
# Phone/zip codes? → Radix sort
# Floats [0,1)? → Bucket sort
# General data? → Python's sorted()`,
  },
  { signature: 'Python sorted() - when to trust it', description: 'Timsort (built-in) beats hand-coded sorts 99% of time. Adaptive, stable, highly optimized. Only implement custom for special cases.', complexity: 'Concept', section: 'Why & When', example: `# ALWAYS USE SORTED() UNLESS:

# DEFAULT: Use built-in sorted()
arr = [3, 1, 4, 1, 5]
sorted(arr)  # Timsort: O(n log n), stable, adaptive

# Timsort wins because:
# 1. O(n) on nearly sorted data
# 2. Optimized C implementation
# 3. Cache-friendly
# 4. Stable (preserves order)
# 5. Adaptive (fast on patterns)

# WHEN TO IMPLEMENT CUSTOM SORT:

# Case 1: Special integer range
# sorted(): O(n log n)
# counting_sort(): O(n + k) when k small
ages = list(range(1000000))  # 1M ages 0-120
# Counting sort 3x faster!

# Case 2: Custom comparison (rare)
# When key function isn't enough
from functools import cmp_to_key
def compare(a, b):
    # Complex logic comparing a and b
    return -1 if a_before_b else 1
sorted(arr, key=cmp_to_key(compare))

# Case 3: Online/streaming sort
# Need to insert into sorted array repeatedly
# Use heapq or bisect, not repeated sorted()

# GOTCHA: sorted() is FAST
# "I'll optimize with custom sort!"
# Reality: sorted() usually wins due to:
# - C implementation (50-100x faster)
# - Cache optimization
# - Adaptive behavior

# Benchmark before replacing sorted()!`,
  },
  { signature: 'Stability and key functions - when they matter', description: 'Stability: equal elements keep original order. Matters for multi-level sorting. Key functions: transform before comparing. Critical for custom sorts.', complexity: 'Concept', section: 'Why & When', example: `# STABILITY MATTERS

# Example: Sort students by grade, preserve name order
students = [('Alice', 85), ('Bob', 90), ('Charlie', 85)]

# Stable sort (sorted(), Timsort):
sorted(students, key=lambda s: s[1])
# [(Alice, 85), (Charlie, 85), (Bob, 90)]
# Alice before Charlie preserved!

# Unstable sort (quicksort):
# [(Charlie, 85), (Alice, 85), (Bob, 90)]
# Order changed among equals!

# WHEN STABILITY CRITICAL:
# 1. Multi-level sorting
data = [(3, 'a'), (1, 'b'), (3, 'c'), (1, 'd')]
# Sort by first element, preserve second order:
data.sort(key=lambda x: x[1])  # By second
data.sort(key=lambda x: x[0])  # By first (stable!)
# [(1, 'b'), (1, 'd'), (3, 'a'), (3, 'c')]

# 2. Database-style sorting
# SQL ORDER BY name, age → need stability

# KEY FUNCTIONS - Transform before compare

# Bad: Compare strings ignoring case
def compare_lower(a, b):
    return -1 if a.lower() < b.lower() else 1
sorted(words, key=cmp_to_key(compare_lower))

# Good: Use key function (10x faster!)
sorted(words, key=str.lower)

# Common key patterns:
# By length: key=len
# By absolute: key=abs
# By attribute: key=attrgetter('name')
# By index: key=itemgetter(1)
# By multiple: key=lambda x: (x[0], -x[1])

# PERFORMANCE:
# Key function called once per item: O(n)
# Comparator called O(n log n) times
# → Key functions much faster!

# GOTCHA: In-place vs copy
arr = [3, 1, 4]
sorted(arr)  # Returns new list, arr unchanged
arr.sort()   # Modifies arr in-place
# Use .sort() to save memory`,
  },

  // Non-Comparison Sorts
  { signature: 'Counting Sort', description: 'Count occurrences, calculate positions. O(n+k) for range k.', complexity: 'O(n + k)', section: 'Non-Comparison Sorts', example: `def counting_sort(arr):
    if not arr:
        return arr

    min_val, max_val = min(arr), max(arr)
    range_size = max_val - min_val + 1

    # Count occurrences
    count = [0] * range_size
    for num in arr:
        count[num - min_val] += 1

    # Build sorted array
    result = []
    for i, c in enumerate(count):
        result.extend([i + min_val] * c)

    return result

# Stable counting sort (preserves order of equal elements)
def counting_sort_stable(arr, key=lambda x: x):
    if not arr:
        return arr

    min_val = min(key(x) for x in arr)
    max_val = max(key(x) for x in arr)
    range_size = max_val - min_val + 1

    # Count occurrences
    count = [0] * range_size
    for item in arr:
        count[key(item) - min_val] += 1

    # Calculate positions (cumulative sum)
    for i in range(1, range_size):
        count[i] += count[i - 1]

    # Build output (traverse backwards for stability)
    output = [None] * len(arr)
    for item in reversed(arr):
        idx = key(item) - min_val
        count[idx] -= 1
        output[count[idx]] = item

    return output

# When to use:
# - Small integer range (k << n²)
# - Need stable sort
# - Used as subroutine in radix sort` },
  { signature: 'Radix Sort', description: 'Sort by each digit using counting sort. O(nk) for k digits.', complexity: 'O(n * k)', section: 'Non-Comparison Sorts', example: `def radix_sort(arr):
    if not arr:
        return arr

    # Find max to know number of digits
    max_val = max(arr)

    # Sort by each digit (LSD - Least Significant Digit)
    exp = 1
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10

    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    # Count occurrences of digit
    for num in arr:
        digit = (num // exp) % 10
        count[digit] += 1

    # Cumulative count
    for i in range(1, 10):
        count[i] += count[i - 1]

    # Build output (backwards for stability)
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        count[digit] -= 1
        output[count[digit]] = arr[i]

    # Copy back
    for i in range(n):
        arr[i] = output[i]

# Handle negative numbers
def radix_sort_with_negatives(arr):
    negatives = [-x for x in arr if x < 0]
    positives = [x for x in arr if x >= 0]

    if negatives:
        radix_sort(negatives)
        negatives = [-x for x in reversed(negatives)]

    if positives:
        radix_sort(positives)

    return negatives + positives

# When to use:
# - Fixed-length integers or strings
# - Large n with small digit range
# - Need stable O(n) sort` },
  { signature: 'Bucket Sort', description: 'Distribute into buckets, sort each bucket. O(n) for uniform distribution.', complexity: 'O(n) avg', section: 'Non-Comparison Sorts', example: `def bucket_sort(arr, num_buckets=10):
    if not arr:
        return arr

    min_val, max_val = min(arr), max(arr)
    if min_val == max_val:
        return arr

    # Create buckets
    bucket_range = (max_val - min_val) / num_buckets
    buckets = [[] for _ in range(num_buckets)]

    # Distribute into buckets
    for num in arr:
        idx = int((num - min_val) / bucket_range)
        idx = min(idx, num_buckets - 1)  # Handle max value
        buckets[idx].append(num)

    # Sort each bucket and concatenate
    result = []
    for bucket in buckets:
        bucket.sort()  # Use any sort for small buckets
        result.extend(bucket)

    return result

# For floating point [0, 1)
def bucket_sort_float(arr):
    n = len(arr)
    buckets = [[] for _ in range(n)]

    for num in arr:
        idx = int(n * num)
        idx = min(idx, n - 1)
        buckets[idx].append(num)

    result = []
    for bucket in buckets:
        bucket.sort()  # Insertion sort for small buckets
        result.extend(bucket)

    return result

# When to use:
# - Uniformly distributed data
# - Floating point in known range
# - When data fits in memory` },

  // Python Built-in
  { signature: 'Python sorted() and list.sort()', description: 'Timsort: hybrid merge+insertion. Stable, adaptive, O(n log n).', complexity: 'O(n log n)', section: 'Python Built-in', example: `# sorted() - returns new list
arr = [3, 1, 4, 1, 5]
sorted_arr = sorted(arr)  # [1, 1, 3, 4, 5]
# Original arr unchanged

# list.sort() - in-place
arr = [3, 1, 4, 1, 5]
arr.sort()  # arr is now [1, 1, 3, 4, 5]

# Custom key function
words = ['banana', 'apple', 'Cherry']
sorted(words)                    # ['Cherry', 'apple', 'banana']
sorted(words, key=str.lower)     # ['apple', 'banana', 'Cherry']
sorted(words, key=len)           # ['apple', 'Cherry', 'banana']

# Reverse order
sorted([3, 1, 4], reverse=True)  # [4, 3, 1]

# Sort by multiple keys
people = [('Alice', 25), ('Bob', 30), ('Alice', 20)]
sorted(people)                              # By name, then age
sorted(people, key=lambda x: (x[1], x[0]))  # By age, then name
sorted(people, key=lambda x: (-x[1], x[0])) # Age desc, name asc

# itemgetter and attrgetter (faster)
from operator import itemgetter, attrgetter
sorted(people, key=itemgetter(1))     # By second element
sorted(objects, key=attrgetter('age'))  # By 'age' attribute` },
  { signature: 'Custom Comparator', description: 'Use functools.cmp_to_key for custom comparison logic.', complexity: 'O(n log n)', section: 'Python Built-in', example: `from functools import cmp_to_key

# Custom comparator: return negative, zero, or positive
def compare(a, b):
    if a < b:
        return -1
    elif a > b:
        return 1
    return 0

arr = [3, 1, 4]
sorted(arr, key=cmp_to_key(compare))

# Example: Largest number from array
def largest_number(nums):
    def compare(x, y):
        # Compare concatenations
        if x + y > y + x:
            return -1  # x should come first
        return 1

    nums = [str(n) for n in nums]
    nums.sort(key=cmp_to_key(compare))
    result = ''.join(nums)
    return '0' if result[0] == '0' else result

# Example: [3, 30, 34, 5, 9]
# "9534330" (9 > 5 > 34 > 3 > 30)

# Sort intervals by end time, then by start time
intervals = [[1, 3], [2, 3], [1, 2]]
def compare_intervals(a, b):
    if a[1] != b[1]:
        return a[1] - b[1]  # By end time
    return a[0] - b[0]      # Then by start time

sorted(intervals, key=cmp_to_key(compare_intervals))
# [[1, 2], [1, 3], [2, 3]]` },

  // Special Sorting
  { signature: 'Sort Colors (Dutch Flag)', description: 'Sort array with 3 distinct values. Three-pointer technique.', complexity: 'O(n)', section: 'Special Sorting', example: `def sort_colors(nums):
    # Dutch National Flag algorithm
    low, mid, high = 0, 0, len(nums) - 1

    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:  # nums[mid] == 2
            nums[high], nums[mid] = nums[mid], nums[high]
            high -= 1
            # Don't increment mid - need to check swapped value

    return nums

# Example: [2, 0, 2, 1, 1, 0]
# Result: [0, 0, 1, 1, 2, 2]

# Generalized: Sort with K colors
def sort_k_colors(nums, k):
    for color in range(1, k):
        # Partition: color vs rest
        left = 0
        for i in range(len(nums)):
            if nums[i] == color:
                nums[left], nums[i] = nums[i], nums[left]
                left += 1` },
  { signature: 'Merge Intervals', description: 'Merge overlapping intervals after sorting.', complexity: 'O(n log n)', section: 'Special Sorting', example: `def merge_intervals(intervals):
    if not intervals:
        return []

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    result = [intervals[0]]

    for start, end in intervals[1:]:
        # If overlapping with last, merge
        if start <= result[-1][1]:
            result[-1][1] = max(result[-1][1], end)
        else:
            result.append([start, end])

    return result

# Example: [[1,3], [2,6], [8,10], [15,18]]
# Output: [[1,6], [8,10], [15,18]]

# Insert and merge
def insert_interval(intervals, new):
    result = []
    i = 0
    n = len(intervals)

    # Add all before new interval
    while i < n and intervals[i][1] < new[0]:
        result.append(intervals[i])
        i += 1

    # Merge overlapping
    while i < n and intervals[i][0] <= new[1]:
        new[0] = min(new[0], intervals[i][0])
        new[1] = max(new[1], intervals[i][1])
        i += 1
    result.append(new)

    # Add remaining
    result.extend(intervals[i:])
    return result` },
]
