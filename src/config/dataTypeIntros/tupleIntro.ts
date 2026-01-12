export const tupleIntro = `Use Tuples for Immutable Sequences
Tuples are immutable—cannot be modified after creation. Immutability enables hashability, making tuples usable as dict keys and set elements (lists can't be hashed). CRITICAL: immutability is SHALLOW—tuple([1, 2], [3, 4]) can't be reassigned, but inner lists CAN be modified. Use tuples for fixed data (coordinates, function returns), dict keys, and performance (faster than lists).

\`\`\`python
# IMMUTABLE - Can't modify
t = (1, 2, 3)
# t[0] = 99  # TypeError!
# t.append(4)  # AttributeError!

# HASHABLE - Can be dict key
coords = {}
coords[(0, 0)] = "origin"
coords[(1, 2)] = "point"
# coords[[1, 2]] = "bad"  # TypeError! Lists not hashable

# SHALLOW IMMUTABILITY - Inner objects can change
t = ([1, 2], [3, 4])
# t[0] = [99]  # TypeError! Can't reassign
t[0].append(99)  # OK! Inner list is mutable
print(t)  # ([1, 2, 99], [3, 4])

# PERFORMANCE - Tuples are faster
import sys
sys.getsizeof((1, 2, 3))  # 64 bytes
sys.getsizeof([1, 2, 3])  # 88 bytes (larger!)
\`\`\`python
---
Tuple Unpacking and Multiple Return Values
Tuple unpacking assigns multiple variables in one line. Functions return multiple values as tuples. Swap variables with a, b = b, a. Use _ for values you don't need.

\`\`\`python
# BASIC UNPACKING
t = (1, 2, 3)
a, b, c = t  # a=1, b=2, c=3

# SWAP WITHOUT TEMP
x, y = 5, 10
x, y = y, x  # x=10, y=5 (elegant!)

# MULTIPLE RETURN VALUES
def min_max(arr):
    return min(arr), max(arr)

lo, hi = min_max([1, 5, 3, 9, 2])  # lo=1, hi=9

# IGNORE VALUES WITH _
first, _, third = (1, 2, 3)  # first=1, third=3

# STAR UNPACKING - Collect rest
first, *rest = (1, 2, 3, 4, 5)
# first=1, rest=[2, 3, 4, 5]

*head, last = (1, 2, 3, 4, 5)
# head=[1, 2, 3, 4], last=5

first, *middle, last = (1, 2, 3, 4, 5)
# first=1, middle=[2, 3, 4], last=5
\`\`\`python
---
Tuples vs Lists
Use tuples for heterogeneous data (different types, fixed structure like coordinates). Use lists for homogeneous data (same type, variable length like numbers). Tuples are immutable and hashable. Lists are mutable and faster for append/extend.

\`\`\`python
# TUPLE - Heterogeneous, fixed structure
person = ("Alice", 30, "Engineer")  # Name, age, job
# Different types, fixed meaning for each position

# LIST - Homogeneous, variable length
numbers = [1, 2, 3, 4, 5]  # All ints, can grow
numbers.append(6)  # OK
numbers.extend([7, 8, 9])  # OK

# TUPLE FOR DICT KEYS
positions = {}
positions[(0, 0)] = "start"
positions[(10, 5)] = "checkpoint"
# Lists can't be keys!

# SINGLE ELEMENT TUPLE - Need trailing comma
t = (42,)  # Tuple with one element
not_tuple = (42)  # Just 42 (int), not a tuple!
type((42,))  # <class 'tuple'>
type((42))   # <class 'int'>

# EMPTY TUPLE
empty = ()
empty = tuple()
\`\`\``
