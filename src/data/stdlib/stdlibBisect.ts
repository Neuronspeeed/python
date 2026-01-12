import type { Method } from '../../types'

export const stdlibBisectMethods: Method[] = [
  // Why & When section
  {
    signature: 'Why bisect?',
    description: 'O(log n) binary search and sorted insertion. Use bisect instead of manual binary search for cleaner code.',
    complexity: 'Concept',
    section: 'Why & When',
    example: `# BISECT = Binary search + sorted insertion
# All operations O(log n) on sorted lists

# WHY BISECT BEATS MANUAL BINARY SEARCH:
# Manual binary search (verbose, error-prone):
def find_insert_pos(arr, x):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < x:
            left = mid + 1
        else:
            right = mid
    return left

# bisect (one line, battle-tested):
from bisect import bisect_left
pos = bisect_left(arr, x)

# INTERVIEW USE CASES:
# 1. Find insertion point: bisect_left(arr, x)
# 2. Maintain sorted list: insort(arr, x)
# 3. Count occurrences: bisect_right(x) - bisect_left(x)
# 4. Find range: [bisect_left(lo), bisect_right(hi))
# 5. Search rotated array: bisect with custom logic

# WHEN TO USE BISECT vs CUSTOM:
# - Simple insertion point -> bisect_left/bisect_right
# - Maintain sorted order -> insort_left/insort_right
# - Complex condition -> custom binary search
# - Need index of existing element -> custom (bisect finds insertion point)`
  },

  // Search Functions section
  {
    signature: 'bisect_left(a, x)',
    description: 'Find leftmost insertion point for x in sorted list a. Returns index where x should be inserted to keep a sorted.',
    complexity: 'O(log n)',
    section: 'Search Functions',
    example: `from bisect import bisect_left

# Find insertion point (leftmost position)
arr = [1, 3, 3, 3, 5, 7]

bisect_left(arr, 3)   # 1 - insert BEFORE existing 3s
bisect_left(arr, 4)   # 4 - between 3s and 5
bisect_left(arr, 0)   # 0 - before everything
bisect_left(arr, 10)  # 6 - after everything

# USE CASE 1: Check if element exists at exact position
def binary_search(arr, x):
    i = bisect_left(arr, x)
    return i < len(arr) and arr[i] == x

# USE CASE 2: Count elements less than x
def count_less_than(arr, x):
    return bisect_left(arr, x)

# USE CASE 3: Find first occurrence
def find_first(arr, x):
    i = bisect_left(arr, x)
    if i < len(arr) and arr[i] == x:
        return i
    return -1

# With lo/hi bounds (search subarray)
bisect_left(arr, 3, lo=2, hi=5)  # Search arr[2:5] only`
  },

  {
    signature: 'bisect_right(a, x)',
    description: 'Find rightmost insertion point for x in sorted list a. Equivalent to bisect(). Returns index after any existing entries of x.',
    complexity: 'O(log n)',
    section: 'Search Functions',
    example: `from bisect import bisect_right, bisect

# Find insertion point (rightmost position)
arr = [1, 3, 3, 3, 5, 7]

bisect_right(arr, 3)  # 4 - insert AFTER existing 3s
bisect(arr, 3)        # 4 - bisect() is alias for bisect_right()

# KEY DIFFERENCE from bisect_left:
# bisect_left(arr, 3)  -> 1 (before 3s)
# bisect_right(arr, 3) -> 4 (after 3s)

# USE CASE 1: Count elements less than or equal to x
def count_less_or_equal(arr, x):
    return bisect_right(arr, x)

# USE CASE 2: Find last occurrence
def find_last(arr, x):
    i = bisect_right(arr, x) - 1
    if i >= 0 and arr[i] == x:
        return i
    return -1

# USE CASE 3: Count occurrences of x
def count_occurrences(arr, x):
    return bisect_right(arr, x) - bisect_left(arr, x)

# INTERVIEW PATTERN: Find first and last position
def search_range(arr, target):
    left = bisect_left(arr, target)
    if left == len(arr) or arr[left] != target:
        return [-1, -1]
    right = bisect_right(arr, target) - 1
    return [left, right]`
  },

  // Insert Functions section
  {
    signature: 'insort_left(a, x)',
    description: 'Insert x in sorted list a, maintaining sort order. If x already exists, insert to the left of existing entries.',
    complexity: 'O(n)',
    section: 'Insert Functions',
    example: `from bisect import insort_left

# Insert while maintaining sorted order
arr = [1, 3, 5, 7]
insort_left(arr, 4)
print(arr)  # [1, 3, 4, 5, 7]

# With duplicates - inserts LEFT of existing
arr = [1, 3, 3, 5]
insort_left(arr, 3)
print(arr)  # [1, 3, 3, 3, 5] - new 3 at index 1

# COMPLEXITY NOTE:
# Finding position: O(log n) - binary search
# Inserting: O(n) - shifting elements
# Total: O(n) due to insertion

# USE CASE: Maintain sorted list of scores
scores = []
for score in [85, 92, 78, 95, 88]:
    insort_left(scores, score)
print(scores)  # [78, 85, 88, 92, 95]

# USE CASE: Sliding window with sorted values
from collections import deque
def median_sliding_window(nums, k):
    window = sorted(nums[:k])
    medians = []
    for i in range(k, len(nums) + 1):
        # Get median
        mid = k // 2
        if k % 2:
            medians.append(window[mid])
        else:
            medians.append((window[mid-1] + window[mid]) / 2)
        if i < len(nums):
            # Remove outgoing, add incoming
            window.remove(nums[i-k])
            insort_left(window, nums[i])
    return medians`
  },

  {
    signature: 'insort_right(a, x)',
    description: 'Insert x in sorted list a, maintaining sort order. If x already exists, insert to the right of existing entries. Alias: insort().',
    complexity: 'O(n)',
    section: 'Insert Functions',
    example: `from bisect import insort_right, insort

# Insert while maintaining sorted order
arr = [1, 3, 5, 7]
insort_right(arr, 4)
print(arr)  # [1, 3, 4, 5, 7]

# insort() is alias for insort_right()
insort(arr, 6)
print(arr)  # [1, 3, 4, 5, 6, 7]

# With duplicates - inserts RIGHT of existing
arr = [1, 3, 3, 5]
insort_right(arr, 3)
print(arr)  # [1, 3, 3, 3, 5] - new 3 at index 3

# KEY DIFFERENCE from insort_left:
arr1 = [1, 3, 3, 5]
arr2 = [1, 3, 3, 5]
insort_left(arr1, 3)   # [1, 3, 3, 3, 5] - at index 1
insort_right(arr2, 3)  # [1, 3, 3, 3, 5] - at index 3

# WHEN ORDER MATTERS:
# - Use insort_left for FIFO among equals (first come first)
# - Use insort_right for LIFO among equals (most recent first)`
  },

  // Practical Patterns section
  {
    signature: 'Key Function (Python 3.10+)',
    description: 'Use key parameter to search/insert based on transformed values. Essential for objects and custom sorting.',
    complexity: 'O(log n)',
    section: 'Practical Patterns',
    example: `from bisect import bisect_left, insort_left

# Python 3.10+ added key parameter
# (Earlier versions: use SortedList from sortedcontainers)

# Search by object attribute
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

students = [
    Student("Alice", 85),
    Student("Bob", 90),
    Student("Carol", 92),
]

# Find where to insert student with grade 88
pos = bisect_left(students, 88, key=lambda s: s.grade)
# pos = 1 (between Alice and Bob)

# Insert maintaining grade order
new_student = Student("Dave", 88)
insort_left(students, new_student, key=lambda s: s.grade)

# WORKAROUND for Python < 3.10:
# Option 1: Store tuples (sort_key, value)
items = [(85, "Alice"), (90, "Bob"), (92, "Carol")]
pos = bisect_left(items, (88,))  # Compare tuples

# Option 2: Use sortedcontainers.SortedList
# pip install sortedcontainers
from sortedcontainers import SortedList
sl = SortedList(key=lambda x: x.grade)
sl.add(Student("Alice", 85))`
  },

  {
    signature: 'Grade/Range Lookup',
    description: 'Classic interview pattern: map scores to grades or values to buckets using bisect.',
    complexity: 'O(log n)',
    section: 'Practical Patterns',
    example: `from bisect import bisect, bisect_right

# PATTERN: Map value to category using breakpoints
def get_grade(score):
    # Breakpoints: F < 60 <= D < 70 <= C < 80 <= B < 90 <= A
    breakpoints = [60, 70, 80, 90]
    grades = ['F', 'D', 'C', 'B', 'A']
    return grades[bisect(breakpoints, score)]

get_grade(55)   # 'F'
get_grade(60)   # 'D' (60 >= 60, so index 1)
get_grade(85)   # 'B'
get_grade(100)  # 'A'

# PATTERN: Find price tier
def get_shipping_cost(weight):
    # 0-1kg: $5, 1-5kg: $10, 5-10kg: $15, 10+kg: $25
    breakpoints = [1, 5, 10]
    costs = [5, 10, 15, 25]
    return costs[bisect(breakpoints, weight)]

# PATTERN: Time-based lookup (timestamps)
def get_value_at_time(timestamps, values, query_time):
    # Find most recent value at or before query_time
    idx = bisect_right(timestamps, query_time) - 1
    if idx < 0:
        return None  # No value before query_time
    return values[idx]

# Example: Stock prices at different times
times = [9, 10, 11, 14, 16]  # Hours
prices = [100, 102, 99, 105, 103]
get_value_at_time(times, prices, 12)  # 99 (11:00 price)`
  },

  {
    signature: 'SortedList Pattern',
    description: 'Maintain a sorted list with O(log n) search and O(n) insert. For O(log n) insert, use sortedcontainers.',
    complexity: 'O(n)',
    section: 'Practical Patterns',
    example: `from bisect import insort_left, bisect_left

# PATTERN: Maintain sorted list manually
class SortedList:
    def __init__(self):
        self.data = []

    def add(self, x):
        insort_left(self.data, x)  # O(n)

    def remove(self, x):
        i = bisect_left(self.data, x)
        if i < len(self.data) and self.data[i] == x:
            self.data.pop(i)  # O(n)

    def __contains__(self, x):
        i = bisect_left(self.data, x)
        return i < len(self.data) and self.data[i] == x

    def count_range(self, lo, hi):
        # Count elements in [lo, hi)
        return bisect_left(self.data, hi) - bisect_left(self.data, lo)

# Usage
sl = SortedList()
for x in [5, 2, 8, 1, 9]:
    sl.add(x)
print(sl.data)  # [1, 2, 5, 8, 9]
print(3 in sl)  # False
print(sl.count_range(2, 8))  # 2 (elements 2, 5)

# FOR BETTER PERFORMANCE: Use sortedcontainers
# pip install sortedcontainers
# from sortedcontainers import SortedList
# O(log n) for add, remove, and contains!`
  },
]
