export const sortingIntro = `When to Sort First
Sorting costs O(n log n) but often unlocks O(n) or O(log n) solutions that would otherwise be O(n²). Use Python's built-in Timsort (sort()/sorted()) for 99% of cases—highly optimized, stable, O(n log n) worst/O(n) best on nearly-sorted data.

\`\`\`python
# BUILT-IN SORTING
arr.sort()  # In-place, O(1) extra space
sorted_arr = sorted(arr)  # New list, O(n) space
students.sort(key=lambda x: x[1])  # Custom key
students.sort(key=lambda x: x[1], reverse=True)  # Descending
\`\`\`python
---
Sorted Data Enables Patterns
Two pointers for O(n) pair finding, binary search for O(log n) lookup, greedy for locally optimal choices, duplicate detection via consecutive elements, efficient merging of sorted sequences.

\`\`\`python
# TWO SUM - O(n log n + n) with sorting
def two_sum_sorted(arr, target):
    arr.sort()
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target: return True
        elif s < target: left += 1
        else: right -= 1
    return False

# FIND DUPLICATES - Check consecutive
def has_duplicates(arr):
    arr.sort()
    for i in range(len(arr) - 1):
        if arr[i] == arr[i + 1]: return True
    return False
\`\`\`python
---
Custom Comparators and Stability
Use key parameter for custom sorting. Stable sort preserves order of equal elements—critical for multi-level sorting. Use functools.cmp_to_key for complex comparisons.

\`\`\`python
# CUSTOM KEY
words.sort(key=lambda x: (len(x), x))  # Length then alphabetically
nums.sort(key=abs)  # By absolute value

# STABLE SORT - Preserves equal element order
data = [(1, 'a'), (2, 'b'), (1, 'c')]
data.sort(key=lambda x: x[0])
# Result: [(1, 'a'), (1, 'c'), (2, 'b')]
# 'a' before 'c' preserved for key=1

# COMPLEX COMPARATOR
from functools import cmp_to_key
def largest_number(nums):
    nums = list(map(str, nums))
    def compare(x, y):
        if x + y > y + x: return -1
        elif x + y < y + x: return 1
        return 0
    nums.sort(key=cmp_to_key(compare))
    return ''.join(nums)
\`\`\`python
`
