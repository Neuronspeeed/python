import type { Method } from '../../types'

export const arrayBasicsMethods: Method[] = [
  // Overview - Key Insight
  {
    signature: 'Arrays vs Strings: Key Difference',
    description: 'Arrays are mutable (fast end ops). Strings are immutable (every change copies all characters). See Big O page for full comparison table.',
    complexity: 'Reference',
    section: 'Overview',
    example: `# ARRAYS: Mutable - O(1) for end operations
arr = [1, 2, 3]
arr.append(4)      # Just fills next slot = O(1)
arr.pop()          # Removes last = O(1)

# STRINGS: Immutable - O(n) for any change
s = "hello"
s += "!"           # Creates NEW string "hello!" = O(n)
# Must copy all n characters to new memory

# Rule of thumb:
# - Need to modify? Use list, then ''.join()
# - Read-only? String is fine`
  },
  // What is an Array
  {
    signature: 'What is an Array?',
    description: 'A collection of elements stored at contiguous memory locations. Each element accessed directly using an index, making arrays highly efficient for random access.',
    complexity: 'Concept',
    section: 'Fundamentals',
    example: `# Using Python lists (dynamic arrays)
my_list = [10, 20, 30, 40, 50]

# Using the array module (fixed-type arrays)
import array
my_array = array.array('i', [10, 20, 30, 40, 50])  # 'i' = signed integers

# Using NumPy arrays (most common for numerical work)
import numpy as np
np_array = np.array([10, 20, 30, 40, 50])

# KEY CHARACTERISTICS:
# - Fixed or Dynamic Size: Python lists are dynamic
# - Indexed Access: Zero-based indices (0, 1, 2, ...)
# - Homogeneous Elements: Traditional arrays store same-type
# - O(1) Access Time: Direct access to any element by index`
  },
  {
    signature: 'Accessing Elements',
    description: 'Elements accessed using their index (position). Python uses zero-based indexing. Supports positive indices, negative indices, and slicing.',
    complexity: 'O(1)',
    section: 'Fundamentals',
    example: `arr = [10, 20, 30, 40, 50]

# Access by positive index (from start)
arr[0]   # 10 (first element)
arr[2]   # 30 (third element)
arr[4]   # 50 (fifth element)

# Access by negative index (from end)
arr[-1]  # 50 (last element)
arr[-2]  # 40 (second to last)

# Slicing - access multiple elements
arr[1:4]   # [20, 30, 40] (index 1 to 3)
arr[:3]    # [10, 20, 30] (first 3 elements)
arr[2:]    # [30, 40, 50] (from index 2 to end)
arr[::2]   # [10, 30, 50] (every 2nd element)

# Iterating with index
for i, element in enumerate(arr):
    print(f"Index {i}: {element}")

# TIME COMPLEXITY:
# Access by index: O(1)
# Search for value: O(n)
# Slicing: O(k) where k is slice size`
  },
  {
    signature: 'Capacity vs Length',
    description: 'Length = number of elements stored. Capacity = total space allocated. Python lists manage capacity automatically, growing when needed.',
    complexity: 'Concept',
    section: 'Fundamentals',
    example: `import sys

# Python lists manage capacity automatically
arr = []
print(f"Length: {len(arr)}")  # 0

# Watch how memory allocation grows
for i in range(20):
    arr.append(i)
    # sys.getsizeof shows allocated bytes (reflects capacity)
    print(f"Length: {len(arr):2d}, Size: {sys.getsizeof(arr)}")

# Output shows jumps in memory (capacity increases):
# Length:  1, Size: 88
# Length:  5, Size: 120  <- capacity doubled
# Length:  9, Size: 184  <- capacity grew again

# SIMULATING FIXED-CAPACITY ARRAY:
class FixedArray:
    def __init__(self, capacity):
        self.capacity = capacity
        self.length = 0
        self.data = [None] * capacity

    def append(self, value):
        if self.length >= self.capacity:
            raise Exception("Array is full!")
        self.data[self.length] = value
        self.length += 1

    def get(self, index):
        if index < 0 or index >= self.length:
            raise IndexError("Index out of bounds")
        return self.data[index]

arr = FixedArray(5)
arr.append(10)
arr.append(20)
# Length: 2, Capacity: 5`
  },
]
