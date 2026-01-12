import type { Method } from '../../../types'

export const deletionMethods: Method[] = [
  {
    signature: 'Delete from End — pop()',
    description: 'Remove and return last element. O(1) operation.',
    complexity: 'O(1)',
    section: 'Deletions',
    example: `arr = [1, 2, 3, 4]
last = arr.pop()
print(last)  # 4
print(arr)   # [1, 2, 3]

# Pop in loop (safe - removing from end)
arr = [1, 2, 3, 4, 5]
while arr:
    print(arr.pop())  # Each pop is O(1)
# Output: 5, 4, 3, 2, 1
# NOTE: Each pop is O(1), but n pops = O(n) total`
  },
  {
    signature: 'Delete from Beginning — pop(0)',
    description: 'Remove first element. O(n) because all elements shift left.',
    complexity: 'O(n)',
    section: 'Deletions',
    example: `arr = [1, 2, 3, 4]
first = arr.pop(0)
print(first)  # 1
print(arr)    # [2, 3, 4]

# WHY O(n)? Every element shifts:
# Before: [1, 2, 3, 4]
# Remove index 0:
#         [2, 3, 4, _]  <- shift all left
#         [2, 3, 4]

# For O(1) head removal, use deque
from collections import deque
d = deque([1, 2, 3, 4])
d.popleft()  # O(1)!`
  },
  {
    signature: 'Delete by Value — remove(x)',
    description: 'Remove FIRST occurrence of value. O(n) to find and shift.',
    complexity: 'O(n)',
    section: 'Deletions',
    example: `arr = [1, 2, 3, 2, 4]
arr.remove(2)  # removes FIRST 2 only
print(arr)  # [1, 3, 2, 4]

# Remove ALL occurrences
arr = [1, 2, 3, 2, 4, 2]

# Method 1: List comprehension (creates new list)
arr = [x for x in arr if x != 2]
print(arr)  # [1, 3, 4]

# Method 2: While loop (in-place but O(n²))
arr = [1, 2, 3, 2, 4, 2]
while 2 in arr:
    arr.remove(2)
print(arr)  # [1, 3, 4]`
  },
  {
    signature: 'Delete with del & clear()',
    description: 'del removes by index/slice. clear() empties the array.',
    complexity: 'O(n)',
    section: 'Deletions',
    example: `arr = [1, 2, 3, 4, 5]

# Delete single index
del arr[2]
print(arr)  # [1, 2, 4, 5]

# Delete slice
del arr[1:3]
print(arr)  # [1, 5]

# Clear entire array
arr = [1, 2, 3]
arr.clear()
print(arr)  # []

# SUMMARY:
# End (pop())       O(1)
# Beginning         O(n)
# By index          O(n)
# By value          O(n)`
  },
]
