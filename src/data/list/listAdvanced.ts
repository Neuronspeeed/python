import type { Method } from '../../types'

// Ordering, Copying, Slicing, Operators, Built-ins, Iteration, Patterns
export const listAdvancedMethods: Method[] = [
  // Ordering (0-3)
  { section: 'Ordering', signature: 'list.sort(*, key=None, reverse=False)', description: 'Sorts list IN PLACE. Returns None (not the list!). Stable sort (equal elements keep order).', complexity: 'O(n log n)', example: `lst = [3, 1, 4, 1, 5]
lst.sort()
print(lst)  # [1, 1, 3, 4, 5]

lst.sort(reverse=True)
print(lst)  # [5, 4, 3, 1, 1]

# Sort by key function
words = ["banana", "apple", "Cherry"]
words.sort(key=str.lower)  # Case-insensitive
print(words)  # ['apple', 'banana', 'Cherry']

words.sort(key=len)  # By length
print(words)  # ['apple', 'Cherry', 'banana']` },
  { section: 'Ordering', signature: 'list.reverse()', description: 'Reverses the list IN PLACE. Returns None.', complexity: 'O(n)', example: `lst = [1, 2, 3, 4]
lst.reverse()
print(lst)  # [4, 3, 2, 1]

# Alternative: slice
lst = lst[::-1]  # Creates new list` },
  { section: 'Ordering', signature: 'sorted(iterable, *, key=None, reverse=False)', description: 'Returns a NEW sorted list. Does not modify original. Works on any iterable.', complexity: 'O(n log n)', example: `lst = [3, 1, 4, 1, 5]
new_lst = sorted(lst)
print(new_lst)  # [1, 1, 3, 4, 5]
print(lst)      # [3, 1, 4, 1, 5] (unchanged)

# Sort by length
words = ["aa", "b", "ccc"]
print(sorted(words, key=len))  # ['b', 'aa', 'ccc']

# Sort dicts by value
data = [{"name": "Bob", "age": 25}, {"name": "Alice", "age": 30}]
print(sorted(data, key=lambda x: x["age"]))` },
  { section: 'Ordering', signature: 'reversed(list)', description: 'Returns a reverse ITERATOR over the list. O(1) to create, lazy evaluation.', complexity: 'O(1)', example: `lst = [1, 2, 3]
for x in reversed(lst):
    print(x)  # 3, 2, 1

print(lst)  # [1, 2, 3] (unchanged)
print(list(reversed(lst)))  # [3, 2, 1]

# reversed is memory efficient - doesn't copy` },

  // Copying (4-6)
  { section: 'Copying', signature: 'list.copy()', description: 'Returns a SHALLOW copy of the list. Nested objects are still shared!', complexity: 'O(n)', example: `lst = [1, 2, [3, 4]]
copy = lst.copy()
copy[0] = 99
print(lst)   # [1, 2, [3, 4]] (unchanged)
copy[2][0] = 99
print(lst)   # [1, 2, [99, 4]] (nested list shared!)

# Shallow copy methods:
# lst.copy(), lst[:], list(lst)` },
  { section: 'Copying', signature: 'list[:]', description: 'Slice copy. Returns a shallow copy of the list.', complexity: 'O(n)', example: `lst = [1, 2, 3]
copy = lst[:]
copy[0] = 99
print(lst)   # [1, 2, 3]
print(copy)  # [99, 2, 3]` },
  { section: 'Copying', signature: 'copy.deepcopy(list)', description: 'Creates a DEEP copy. Nested objects are also copied. Use when you have nested mutable objects.', complexity: 'O(n)', example: `import copy
lst = [1, [2, 3]]
deep = copy.deepcopy(lst)
deep[1][0] = 99
print(lst)   # [1, [2, 3]] (unchanged!)
print(deep)  # [1, [99, 3]]

# When to use:
# Shallow copy: Simple lists, no nested mutables
# Deep copy: Nested lists/dicts that you need independent` },

  // Slicing (7-8)
  { section: 'Slicing', signature: 'list[start:stop:step]', description: 'Returns a new list from start to stop-1 with step. Powerful and Pythonic. All params optional.', complexity: 'O(k)', example: `lst = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(lst[2:5])     # [2, 3, 4] - index 2,3,4
print(lst[:3])      # [0, 1, 2] - first 3
print(lst[7:])      # [7, 8, 9] - from index 7
print(lst[::2])     # [0, 2, 4, 6, 8] - every 2nd
print(lst[::-1])    # [9, 8, 7...] - reversed
print(lst[-3:])     # [7, 8, 9] - last 3
print(lst[:-3])     # [0, 1, 2, 3, 4, 5, 6] - all but last 3` },
  { section: 'Slicing', signature: 'list[i:j] = iterable', description: 'Slice assignment. Replaces elements from i to j-1 with iterable. Can change list size.', complexity: 'O(n)', example: `lst = [0, 1, 2, 3, 4]
lst[1:3] = [10, 20, 30]  # Can be different length
print(lst)  # [0, 10, 20, 30, 3, 4]

lst[1:4] = []  # Delete elements
print(lst)  # [0, 3, 4]

# Insert without replacing
lst[1:1] = [1, 2]  # Insert at index 1
print(lst)  # [0, 1, 2, 3, 4]` },

  // Operators (9-11)
  { section: 'Operators', signature: 'list1 + list2', description: 'Concatenation. Returns a NEW list with all elements. Creates copy - use extend() for in-place.', complexity: 'O(n+m)', example: `a = [1, 2]
b = [3, 4]
print(a + b)  # [1, 2, 3, 4]
print(a)      # [1, 2] (unchanged)

# For building strings, use join not +
# For building lists, use extend or comprehension` },
  { section: 'Operators', signature: 'list * n', description: 'Repetition. Returns a new list with elements repeated n times. BEWARE with nested lists!', complexity: 'O(n*k)', example: `lst = [1, 2]
print(lst * 3)  # [1, 2, 1, 2, 1, 2]
print([0] * 5)  # [0, 0, 0, 0, 0]

# WARNING: nested lists share reference!
matrix = [[0] * 3] * 3  # BAD!
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0], [1, 0, 0], [1, 0, 0]]

# CORRECT way:
matrix = [[0] * 3 for _ in range(3)]
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0], [0, 0, 0], [0, 0, 0]]` },
  { section: 'Operators', signature: 'list += iterable', description: 'In-place extend. Equivalent to list.extend(iterable). Modifies original list.', complexity: 'O(k)', example: `lst = [1, 2]
lst += [3, 4]
print(lst)  # [1, 2, 3, 4]

lst += "ab"  # Strings are iterable
print(lst)  # [1, 2, 3, 4, 'a', 'b']` },

  // Built-in Functions (12-15)
  { section: 'Built-in Functions', signature: 'len(list)', description: 'Returns the number of elements in the list. O(1) - Python stores length.', complexity: 'O(1)', example: `print(len([1, 2, 3]))  # 3
print(len([]))         # 0

# Empty check
if lst:        # Truthy check (preferred)
    print("not empty")
if len(lst) > 0:  # Works but verbose
    print("not empty")` },
  { section: 'Built-in Functions', signature: 'min(list)', description: 'Returns the smallest element. Elements must be comparable. O(n) - scans all.', complexity: 'O(n)', example: `print(min([3, 1, 4]))  # 1
print(min(["b", "a", "c"]))  # 'a'
print(min([3, 1, 4], key=lambda x: -x))  # 4

# With key function for complex objects
people = [{"name": "Bob", "age": 25}, {"name": "Alice", "age": 30}]
youngest = min(people, key=lambda p: p["age"])` },
  { section: 'Built-in Functions', signature: 'max(list)', description: 'Returns the largest element. Elements must be comparable.', complexity: 'O(n)', example: `print(max([3, 1, 4]))  # 4
print(max([3, 1, 4], key=lambda x: -x))  # 1

# Find second largest
lst = [3, 1, 4, 1, 5, 9, 2]
sorted_lst = sorted(set(lst), reverse=True)
second = sorted_lst[1] if len(sorted_lst) > 1 else None` },
  { section: 'Built-in Functions', signature: 'sum(list[, start])', description: 'Returns sum of elements plus start (default 0). Works with numbers.', complexity: 'O(n)', example: `print(sum([1, 2, 3]))      # 6
print(sum([1, 2, 3], 10))  # 16

# Flatten list of lists
print(sum([[1], [2], [3]], []))  # [1, 2, 3]
# But list comprehension is clearer:
# [x for sublist in lists for x in sublist]` },

  // Iteration (16-19)
  { section: 'Iteration', signature: 'enumerate(list, start=0)', description: 'Returns iterator of (index, element) tuples. The Pythonic way to get index AND value.', complexity: 'O(1)', example: `lst = ['a', 'b', 'c']
for i, val in enumerate(lst):
    print(i, val)  # 0 a, 1 b, 2 c

# Start from 1 (useful for 1-based counting)
for i, val in enumerate(lst, 1):
    print(i, val)  # 1 a, 2 b, 3 c

# DON'T do this:
for i in range(len(lst)):  # Anti-pattern
    print(i, lst[i])` },
  { section: 'Iteration', signature: 'zip(*lists)', description: 'Pairs elements from multiple iterables. Stops at shortest. Essential for parallel iteration.', complexity: 'O(1)', example: `names = ["Alice", "Bob"]
ages = [25, 30]
for name, age in zip(names, ages):
    print(f"{name}: {age}")

# Create dict from two lists
dict(zip(names, ages))  # {'Alice': 25, 'Bob': 30}

# Unzip (transpose)
pairs = [(1, 'a'), (2, 'b')]
nums, letters = zip(*pairs)` },
  { section: 'Iteration', signature: 'map(func, list)', description: 'Applies function to each element. Returns iterator. Often list comprehension is clearer.', complexity: 'O(1)', example: `lst = [1, 2, 3]
squared = list(map(lambda x: x**2, lst))
print(squared)  # [1, 4, 9]

# List comprehension often clearer:
squared = [x**2 for x in lst]

# map with multiple lists
list(map(lambda x, y: x+y, [1,2], [3,4]))  # [4, 6]` },
  { section: 'Iteration', signature: 'filter(func, list)', description: 'Returns iterator of elements where func returns True. List comprehension often clearer.', complexity: 'O(1)', example: `lst = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, lst))
print(evens)  # [2, 4, 6]

# List comprehension often clearer:
evens = [x for x in lst if x % 2 == 0]

# None removes falsy values
print(list(filter(None, [0, 1, "", "hi", []])))  # [1, 'hi']` },

  // Common Patterns (20-22)
  { section: 'Common Patterns', signature: 'Flatten nested list', description: 'Convert nested list to flat list using comprehension or itertools.', complexity: 'O(n)', example: `nested = [[1, 2], [3, 4], [5]]
flat = [x for sublist in nested for x in sublist]
print(flat)  # [1, 2, 3, 4, 5]

# Or with itertools (more efficient for large/deep)
from itertools import chain
flat = list(chain.from_iterable(nested))

# Deep flatten (recursive)
def deep_flatten(lst):
    for item in lst:
        if isinstance(item, list):
            yield from deep_flatten(item)
        else:
            yield item` },
  { section: 'Common Patterns', signature: 'Remove duplicates', description: 'Remove duplicates while optionally preserving order.', complexity: 'O(n)', example: `lst = [1, 2, 2, 3, 1, 4, 2]

# Preserve order (Python 3.7+)
unique = list(dict.fromkeys(lst))
print(unique)  # [1, 2, 3, 4]

# Order doesn't matter
unique = list(set(lst))  # Order not guaranteed

# Remove consecutive duplicates only
from itertools import groupby
lst = [1, 1, 2, 2, 2, 3, 1, 1]
result = [k for k, _ in groupby(lst)]  # [1, 2, 3, 1]` },
  { section: 'Common Patterns', signature: 'Chunk list', description: 'Split list into chunks of size n.', complexity: 'O(n)', example: `def chunks(lst, n):
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

lst = [1, 2, 3, 4, 5, 6, 7]
print(list(chunks(lst, 3)))  # [[1,2,3], [4,5,6], [7]]

# One-liner
n = 3
[lst[i:i+n] for i in range(0, len(lst), n)]` },
]
