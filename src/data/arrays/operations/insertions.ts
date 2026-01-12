import type { Method } from '../../../types'

export const insertionMethods: Method[] = [
  {
    signature: 'Insert at End — append()',
    description: 'Add element to end of array. Amortized O(1) due to dynamic resizing.',
    complexity: 'O(1)',
    section: 'Insertions',
    example: `arr = [1, 2, 3]
arr.append(4)
print(arr)  # [1, 2, 3, 4]

# Multiple appends in loop
arr = []
for i in range(5):
    arr.append(i)  # Each append is O(1)
print(arr)  # [0, 1, 2, 3, 4]
# NOTE: Each append is O(1), but n appends = O(n) total`
  },
  {
    signature: 'Insert at Beginning — insert(0, x)',
    description: 'Add element at start. O(n) because all elements must shift right.',
    complexity: 'O(n)',
    section: 'Insertions',
    example: `arr = [1, 2, 3]
arr.insert(0, 0)
print(arr)  # [0, 1, 2, 3]

# WHY O(n)? Every element shifts:
# Before: [1, 2, 3]
# Insert 0 at index 0:
#         [_, 1, 2, 3]  <- shift all right
#         [0, 1, 2, 3]  <- insert

# For frequent head insertions, use collections.deque
from collections import deque
d = deque([1, 2, 3])
d.appendleft(0)  # O(1)!`
  },
  {
    signature: 'Insert at Index — insert(i, x)',
    description: 'Insert element at specific position. O(n) worst case.',
    complexity: 'O(n)',
    section: 'Insertions',
    example: `arr = [1, 2, 4, 5]
arr.insert(2, 3)  # insert 3 at index 2
print(arr)  # [1, 2, 3, 4, 5]

# Insert multiple using slicing
arr = [1, 2, 5, 6]
arr[2:2] = [3, 4]  # insert at index 2
print(arr)  # [1, 2, 3, 4, 5, 6]

# extend() - add multiple at end only
arr = [1, 2]
arr.extend([3, 4, 5])
print(arr)  # [1, 2, 3, 4, 5]

# SUMMARY:
# End (append)    O(1)
# Beginning       O(n)
# Middle          O(n)`
  },
]
