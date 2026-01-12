export const listIntro = `Use Lists When...
Lists are mutable, ordered, dynamic arrays with O(1) append/pop at END, but O(n) insert/delete in MIDDLE (elements must shift). Appending is O(1) amortized with occasional resizes. For frequent front operations, use collections.deque with O(1) appendleft/popleft. Lists are the default choice for ordered collections.

\`\`\`python
# FAST OPERATIONS - O(1)
arr = [1, 2, 3]
arr.append(4)      # O(1) - add to end
arr.pop()          # O(1) - remove from end
arr[-1]            # O(1) - access by index
len(arr)           # O(1) - cached length

# SLOW OPERATIONS - O(n)
arr.insert(0, 99)  # O(n) - shift all elements right
arr.pop(0)         # O(n) - shift all elements left
99 in arr          # O(n) - linear search
arr.remove(99)     # O(n) - find then shift

# Use deque for O(1) front operations
from collections import deque
dq = deque([1, 2, 3])
dq.appendleft(0)   # O(1)
dq.popleft()       # O(1)
\`\`\`python
---
Mutable Default Argument Gotcha
NEVER use mutable defaults like def f(arr=[]). Python evaluates defaults ONCE at function definition—all calls share the SAME list object! This causes mysterious bugs where data persists across calls. Use arr=None and create new list inside function.

\`\`\`python
# WRONG - Mutable default (shared across calls!)
def append_wrong(item, arr=[]):
    arr.append(item)
    return arr

append_wrong(1)  # [1]
append_wrong(2)  # [1, 2] (!)  Same list!
append_wrong(3)  # [1, 2, 3] (!!!)

# CORRECT - Use None default
def append_right(item, arr=None):
    if arr is None:
        arr = []
    arr.append(item)
    return arr

append_right(1)  # [1]
append_right(2)  # [2]  New list each time
append_right(3)  # [3]

# WHY: Default evaluated ONCE
def show_id(arr=[]):
    print(id(arr))  # Same object every call!
    return arr

show_id()  # 140234567890
show_id()  # 140234567890 (same!)
\`\`\`python
---
Two Pointers and In-Place Modification
Use two pointers for array problems: left/right converging for palindrome, fast/slow for cycle detection. For in-place modifications, write index tracks where to write, read index scans ahead. Avoid creating new lists when you can modify in place.

\`\`\`python
# TWO POINTERS - Reverse in place
def reverse(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1

# REMOVE DUPLICATES - In place
def remove_duplicates(arr):
    if not arr:
        return 0
    write = 1  # Where to write next unique
    for read in range(1, len(arr)):
        if arr[read] != arr[read - 1]:
            arr[write] = arr[read]
            write += 1
    return write  # New length

# PARTITION - Move all < pivot to left
def partition(arr, pivot):
    write = 0
    for read in range(len(arr)):
        if arr[read] < pivot:
            arr[write], arr[read] = arr[read], arr[write]
            write += 1
    return write
\`\`\``
