import type { Method } from '../../../types'

export const functoolsSortingMethods: Method[] = [
  { signature: 'cmp_to_key()', description: 'Convert old-style comparison function to key function. For complex custom sorting.', complexity: 'O(n log n)', section: 'Sorting', example: `from functools import cmp_to_key

# Old-style comparator: returns -1, 0, or 1
def compare(a, b):
    if a < b:
        return -1
    elif a > b:
        return 1
    return 0

# Convert to key function
nums = [3, 1, 4, 1, 5, 9]
sorted_nums = sorted(nums, key=cmp_to_key(compare))

# INTERVIEW CLASSIC: Largest Number
# Arrange numbers to form largest number
def largest_number(nums):
    def compare(x, y):
        # Compare concatenations: "9" + "34" vs "34" + "9"
        if x + y > y + x:
            return -1  # x should come first
        elif x + y < y + x:
            return 1   # y should come first
        return 0

    strs = [str(n) for n in nums]
    strs.sort(key=cmp_to_key(compare))

    # Handle edge case: all zeros
    if strs[0] == '0':
        return '0'
    return ''.join(strs)

print(largest_number([3, 30, 34, 5, 9]))  # "9534330"

# Custom object sorting
class Task:
    def __init__(self, priority, deadline):
        self.priority = priority
        self.deadline = deadline

def task_compare(t1, t2):
    # Higher priority first, then earlier deadline
    if t1.priority != t2.priority:
        return t2.priority - t1.priority
    return t1.deadline - t2.deadline

tasks = [Task(2, 10), Task(1, 5), Task(2, 8)]
tasks.sort(key=cmp_to_key(task_compare))` },

  { signature: '@total_ordering', description: 'Generate all comparison methods from __eq__ and one of __lt__, __le__, __gt__, __ge__.', complexity: 'O(1)', section: 'Sorting', example: `from functools import total_ordering

@total_ordering
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

    def __eq__(self, other):
        return self.grade == other.grade

    def __lt__(self, other):
        return self.grade < other.grade

    # @total_ordering provides: __le__, __gt__, __ge__

s1 = Student("Alice", 85)
s2 = Student("Bob", 90)

print(s1 < s2)   # True
print(s1 <= s2)  # True (auto-generated)
print(s1 > s2)   # False (auto-generated)
print(s1 >= s2)  # False (auto-generated)
print(s1 == s2)  # False

# Now works with sorted()!
students = [Student("A", 85), Student("B", 90), Student("C", 78)]
sorted_students = sorted(students)  # Sorted by grade

# Practical: Priority queue item
@total_ordering
class Task:
    def __init__(self, priority, name):
        self.priority = priority
        self.name = name

    def __eq__(self, other):
        return self.priority == other.priority

    def __lt__(self, other):
        return self.priority < other.priority  # Lower = higher priority

import heapq
tasks = [Task(3, "Low"), Task(1, "High"), Task(2, "Medium")]
heapq.heapify(tasks)
print(heapq.heappop(tasks).name)  # "High"` },
]
