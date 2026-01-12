import type { Method } from '../../../types'

export const pythonBuiltinMethods: Method[] = [
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
]
