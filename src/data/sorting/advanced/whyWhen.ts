import type { Method } from '../../../types'

export const whyWhenMethods: Method[] = [
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
]
