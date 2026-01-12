export const setIntro = `Use Sets for O(1) Membership Testing
Sets are unordered collections of unique, hashable elements with O(1) membership testing. "if x in my_list" is O(n), but "if x in my_set" is O(1)—constant time regardless of size. This is the most common interview optimization: convert list to set. Automatic deduplication makes sets perfect for uniqueness. Elements must be hashable (ints, strings, tuples OK; lists, dicts NOT OK).

\`\`\`python
# O(1) MEMBERSHIP - Much faster than list
seen = set()
if 42 in seen:  # O(1) - constant time
    print("Found!")

# Compare to list (O(n) - linear time)
seen_list = []
if 42 in seen_list:  # O(n) - scans every element!
    print("Slow!")

# REMOVE DUPLICATES AUTOMATICALLY
nums = [1, 2, 2, 3, 3, 3, 4]
unique = set(nums)  # {1, 2, 3, 4}
# Back to list: list(unique) but LOSES order!

# HASHABLE ELEMENTS ONLY
s = {1, "text", (1, 2)}  # OK
# s = {1, [2, 3]}  # TypeError! Lists not hashable
# s = {1, {2: 3}}  # TypeError! Dicts not hashable

# EMPTY SET - MUST use set()
empty = set()  # Correct
# empty = {}  # WRONG! This is empty DICT!
\`\`\`python
---
Set Operations for Common Patterns
Use & for intersection (common elements), | for union (all elements), - for difference (in A not B), ^ for symmetric difference (in either but not both). These operations are O(min(len(a), len(b))) and much clearer than loops.

\`\`\`python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# INTERSECTION & - Elements in both
a & b  # {3, 4}
a.intersection(b)  # Same thing

# UNION | - All elements
a | b  # {1, 2, 3, 4, 5, 6}
a.union(b)  # Same thing

# DIFFERENCE - - In a but not b
a - b  # {1, 2}
a.difference(b)  # Same thing

# SYMMETRIC DIFFERENCE ^ - In either but not both
a ^ b  # {1, 2, 5, 6}
a.symmetric_difference(b)  # Same thing

# SUBSET / SUPERSET
{1, 2} <= {1, 2, 3}  # True (subset)
{1, 2, 3} >= {1, 2}  # True (superset)

# INTERVIEW PATTERN - Find common elements
def common_elements(arr1, arr2):
    return list(set(arr1) & set(arr2))
\`\`\`python
---
"Have We Seen X?" Pattern
Use seen = set() for duplicate detection. Add elements to seen as you process. Check membership with if x in seen: for O(1) lookups. This pattern is fundamental for two-sum, finding duplicates, detecting cycles.

\`\`\`python
# FIND FIRST DUPLICATE
def first_duplicate(arr):
    seen = set()
    for x in arr:
        if x in seen:
            return x  # Found duplicate!
        seen.add(x)
    return None

# TWO SUM with set
def two_sum(arr, target):
    seen = set()
    for num in arr:
        complement = target - num
        if complement in seen:
            return True
        seen.add(num)
    return False

# LINKED LIST CYCLE - Fast/slow + set
def has_cycle(head):
    seen = set()
    while head:
        if head in seen:
            return True  # Cycle detected!
        seen.add(head)
        head = head.next
    return False

# REMOVE DUPLICATES (preserve order)
def remove_dups_ordered(arr):
    seen = set()
    result = []
    for x in arr:
        if x not in seen:
            seen.add(x)
            result.append(x)
    return result

# Python 3.7+: dict.fromkeys() preserves order
def remove_dups_ordered_short(arr):
    return list(dict.fromkeys(arr))
\`\`\``
