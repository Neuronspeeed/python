import { TypePage } from '../components/TypePage'
import { sortingMethods } from '../data/sorting'
import { binarySearchMethods } from '../data/binarySearch'
import { twoPointersMethods } from '../data/twoPointers'
import { backtrackingMethods } from '../data/backtracking'
import { dpMethods } from '../data/dp'
import { graphMethods } from '../data/graph'
import { DSCategoryTabs } from '../components/DSCategoryTabs'
import { getProblemCount } from '../data/learn'

const sortingIntro = `Sorting is the process of arranging elements in a specific order (ascending or descending). It's one of the most fundamental operations in computer science—many complex algorithms become trivial once data is sorted. The key insight: spending O(n log n) to sort often unlocks O(n) or O(log n) solutions that would otherwise be O(n²) or impossible.

WHY SORTING MATTERS: Sorted data enables powerful patterns and dramatically reduces complexity for many problems:
- Two Pointers: Find pair with target sum in O(n) instead of O(n²)
- Binary Search: Search in O(log n) instead of O(n)
- Greedy: Make locally optimal choices (interval scheduling, activity selection)
- Duplicate Detection: Check consecutive elements instead of hash set
- Finding Closest Pairs: Adjacent elements in sorted array are closest
- Merging: Combine sorted sequences efficiently

Trade-off: Sorting costs O(n log n), but often reduces overall complexity from O(n²) to O(n log n) or O(n).

PYTHON'S TIMSORT: The Gold Standard

Python uses Timsort for both \`list.sort()\` and \`sorted()\`. Timsort is a hybrid of merge sort and insertion sort, optimized for real-world data with runs of already-sorted elements.

**Performance:**
- Worst case: O(n log n)
- Best case: O(n) on nearly-sorted data
- Average case: O(n log n)
- Space: O(n)
- Stable: YES (preserves order of equal elements)

**Why Timsort wins:**
- Highly optimized C implementation
- Adaptive: exploits existing order in data
- Stable: critical for multi-level sorting
- General-purpose: handles all data types

**Bottom line:** Use Python's built-in \`sort()\`/\`sorted()\` for 99% of cases. Only implement custom sorting algorithms when specifically required by the problem or interviewer.

\`\`\`python
# Use built-in sorting
arr.sort()  # In-place, O(1) space
sorted_arr = sorted(arr)  # New list, O(n) space

# Don't implement this unless required:
def quicksort(arr):  # Timsort is better!
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
\`\`\`

SORTING.SORT() VS SORTED(): When to Use Each

**list.sort()** - In-place sorting:
- Modifies the original list
- Returns None (common gotcha!)
- O(1) extra space
- Only works on lists

\`\`\`python
arr = [3, 1, 2]
result = arr.sort()  # result is None! (common mistake)
print(arr)  # [1, 2, 3] - arr was modified
\`\`\`

**sorted()** - Returns new sorted list:
- Original unchanged
- Returns new sorted list
- O(n) extra space
- Works on any iterable (list, tuple, string, dict, set, generator)

\`\`\`python
arr = [3, 1, 2]
sorted_arr = sorted(arr)
print(arr)  # [3, 1, 2] - original unchanged
print(sorted_arr)  # [1, 2, 3] - new sorted list

# Works on any iterable
sorted("hello")  # ['e', 'h', 'l', 'l', 'o']
sorted({3, 1, 2})  # [1, 2, 3]
sorted({"b": 2, "a": 1})  # ['a', 'b'] - keys only
\`\`\`

**When to use:**
- sort(): When you don't need the original
- sorted(): When you need to preserve original, or sorting non-list iterables

CUSTOM SORT KEYS: The Power of key Parameter

The \`key\` parameter applies a function to each element BEFORE comparison. The function is called ONCE per element (efficient), not on every comparison.

**Common patterns:**

\`\`\`python
# Sort tuples/lists by specific index
points.sort(key=lambda p: p[0])  # Sort by x-coordinate

# Multi-level sorting: tuple of keys
points.sort(key=lambda p: (p[0], p[1]))  # x first, then y

# Reverse secondary sort: negate numbers
arr.sort(key=lambda x: (x[0], -x[1]))  # First asc, second desc

# Sort by length
words.sort(key=len)

# Case-insensitive string sort
words.sort(key=str.lower)

# Sort by absolute value
nums.sort(key=abs)

# Sort by multiple criteria
students.sort(key=lambda s: (s.grade, -s.age, s.name))
# First by grade (asc), then age (desc), then name (asc)

# Descending order: use reverse parameter
arr.sort(reverse=True)
arr.sort(key=lambda x: x[1], reverse=True)
\`\`\`

**GOTCHA: Negation for descending only works with numbers!**

\`\`\`python
# GOOD: Numbers can be negated
arr.sort(key=lambda x: (x[0], -x[1]))

# BAD: Can't negate strings!
words.sort(key=lambda w: -w)  # TypeError!

# SOLUTION: Sort twice (stable sort preserves)
words.sort(key=lambda w: w[1])  # Secondary key first
words.sort(key=lambda w: w[0], reverse=True)  # Primary key second

# OR use functools.cmp_to_key for complex comparisons
\`\`\`

STABILITY: Why It Matters

A stable sort preserves the relative order of elements with equal keys. Python's sort is STABLE.

\`\`\`python
# Data: [(grade, name)]
students = [(85, 'Alice'), (90, 'Bob'), (85, 'Charlie')]

students.sort(key=lambda s: s[0])
# [(85, 'Alice'), (85, 'Charlie'), (90, 'Bob')]
# Alice before Charlie preserved (both have 85)
\`\`\`

**When stability matters:**

1. **Multi-level sorting**: Sort by secondary key first, then primary key
\`\`\`python
# Sort by grade (primary), then name (secondary)
students.sort(key=lambda s: s[1])  # Name second
students.sort(key=lambda s: s[0])  # Grade first
# Stable sort preserves name order within same grade
\`\`\`

2. **Preserving original order**: When equal elements have hidden state
\`\`\`python
tasks = [(3, "urgent"), (1, "low"), (3, "normal")]
tasks.sort(key=lambda t: t[0])
# Among priority 3 tasks, "urgent" stays before "normal"
\`\`\`

3. **Tie-breakers**: Natural ordering when primary keys match

SORTING ALGORITHM COMPARISON:

**Quick Reference Table:**
| Algorithm | Average | Worst | Space | Stable | Notes |
|-----------|---------|-------|-------|--------|-------|
| Timsort (Python) | O(n log n) | O(n log n) | O(n) | YES | Best general choice |
| Quick Sort | O(n log n) | O(n²) | O(log n) | NO | Fast in practice |
| Merge Sort | O(n log n) | O(n log n) | O(n) | YES | Good for linked lists |
| Heap Sort | O(n log n) | O(n log n) | O(1) | NO | Guaranteed O(n log n) |
| Insertion Sort | O(n²) | O(n²) | O(1) | YES | Fast for small/sorted |
| Bubble Sort | O(n²) | O(n²) | O(1) | YES | Educational only |
| Counting Sort | O(n+k) | O(n+k) | O(k) | YES | Integers in range k |

**1. Quick Sort:** (Interview classic)
- Average O(n log n), worst O(n²) if poor pivot choice
- In-place (O(log n) stack space for recursion)
- Unstable
- Fast in practice due to cache locality and low constants

\`\`\`python
def quicksort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]  # Choose middle element
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quicksort(left) + middle + quicksort(right)
# Time: O(n log n) average, O(n²) worst
# Space: O(n) for new lists (can optimize to O(log n))
\`\`\`

**2. Merge Sort:** (Stable, predictable)
- Always O(n log n) (no worst case degradation)
- O(n) space for merging
- Stable
- Best for linked lists (no random access needed)

\`\`\`python
def mergesort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = mergesort(arr[:mid])
    right = mergesort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:  # <= for stability
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result
\`\`\`

**3. Heap Sort:** (Space-efficient)
- Always O(n log n)
- O(1) space (in-place)
- Unstable
- Use when you need guaranteed O(n log n) with minimal space

**4. Counting Sort:** (Linear for integers)
- O(n + k) where k is range of values
- O(k) space
- Stable
- Only for integers in known, limited range

\`\`\`python
def counting_sort(arr):
    if not arr:
        return arr

    # Find range
    min_val, max_val = min(arr), max(arr)
    range_size = max_val - min_val + 1

    # Count occurrences
    count = [0] * range_size
    for num in arr:
        count[num - min_val] += 1

    # Reconstruct sorted array
    result = []
    for i, cnt in enumerate(count):
        result.extend([i + min_val] * cnt)

    return result
# Time: O(n + k), Space: O(k)
# Only use when k is small (k ≈ n or smaller)
\`\`\`

SORT FIRST STRATEGY: When to Sort

**Strong signals to sort first:**
- "Find pair/triplet with target sum" → Sort + two pointers
- "Find duplicates" → Sort, check consecutive elements
- "Merge intervals" → Sort by start time
- "Find kth largest" → Sort (or use heap for O(n log k))
- "Activity selection / scheduling" → Sort by end time (greedy)
- "Closest pair" → Sort, check adjacent elements

\`\`\`python
# BEFORE SORTING: Find if array has duplicate - O(n) with hash set
def has_duplicate(arr):
    return len(arr) != len(set(arr))  # O(n) space

# AFTER SORTING: Find duplicate - O(n log n) with O(1) space
def has_duplicate(arr):
    arr.sort()
    for i in range(len(arr) - 1):
        if arr[i] == arr[i + 1]:
            return True
    return False
# Trade-off: O(n log n) time but O(1) space vs O(n) time and O(n) space
\`\`\`

**When NOT to sort:**
- Need to preserve original indices (use hash map instead)
- Only need min/max (use O(n) min()/max() instead of O(n log n) sort)
- Need k smallest/largest (use heap - O(n log k) vs O(n log n))
- Data arrives in real-time (maintain heap/BST, don't re-sort)
- Problem has no ordering benefit (graph traversal, tree problems)

INTERVIEW PATTERNS:

**Pattern 1: Sort + Two Pointers**
\`\`\`python
# Two Sum II (sorted array)
def two_sum(arr, target):
    arr.sort()  # O(n log n)
    left, right = 0, len(arr) - 1

    while left < right:  # O(n)
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return None
# Total: O(n log n)
\`\`\`

**Pattern 2: Sort + Greedy**
\`\`\`python
# Merge Intervals
def merge_intervals(intervals):
    if not intervals:
        return []

    # Sort by start time
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for curr in intervals[1:]:
        if curr[0] <= merged[-1][1]:  # Overlap
            merged[-1][1] = max(merged[-1][1], curr[1])
        else:  # No overlap
            merged.append(curr)

    return merged
\`\`\`

**Pattern 3: Custom Comparator**
\`\`\`python
# Largest Number: Arrange to form largest number
# [3, 30, 34, 5, 9] → "9534330"
from functools import cmp_to_key

def largest_number(nums):
    # Compare concatenations: "9" + "5" vs "5" + "9"
    def compare(x, y):
        if x + y > y + x:
            return -1  # x should come first
        elif x + y < y + x:
            return 1   # y should come first
        else:
            return 0

    nums_str = [str(num) for num in nums]
    nums_str.sort(key=cmp_to_key(compare))

    return ''.join(nums_str)
\`\`\`

COMMON PITFALLS:

**1. Forgetting list.sort() returns None**
\`\`\`python
# WRONG
arr = [3, 1, 2]
sorted_arr = arr.sort()  # sorted_arr is None!

# RIGHT
arr.sort()  # arr is now sorted
# OR
sorted_arr = sorted(arr)
\`\`\`

**2. Mutating during iteration**
\`\`\`python
# WRONG
for x in arr:
    if condition(x):
        arr.remove(x)  # Modifies while iterating!

# RIGHT
arr = [x for x in arr if not condition(x)]
\`\`\`

**3. Negating non-numbers for descending**
\`\`\`python
# WRONG
words.sort(key=lambda w: -w)  # Can't negate strings!

# RIGHT
words.sort(reverse=True)
# OR
words.sort(key=lambda w: w, reverse=True)
\`\`\`

**4. Assuming in-place after sorted()**
\`\`\`python
# WRONG
arr = [3, 1, 2]
sorted(arr)  # Returns new list, doesn't modify arr
print(arr)  # Still [3, 1, 2]!

# RIGHT
arr = sorted(arr)
# OR
arr.sort()
\`\`\`

BEST PRACTICES:

1. **Default to Python's built-in sort**: Timsort is fast, stable, and optimized
2. **Use key parameter**: More Pythonic and efficient than comparators
3. **Leverage stability**: Sort by secondary key first, then primary key
4. **Consider space**: sort() is O(1) extra space, sorted() is O(n)
5. **Test with edge cases**: Empty, single element, all duplicates, reverse sorted
6. **Know when NOT to sort**: Sometimes O(n) hash approach beats O(n log n) sort
7. **Understand stability**: Critical for multi-level sorting and preserving order`


export function SortingPage() {
  return (
    <TypePage
      type="Sorting Algorithms" badge="sort" color="var(--accent-sorting)"
      description="Master sorting algorithms. Know when to use each. Python's Timsort is usually best."
      intro={sortingIntro}
      tip={`list.sort() returns None! Common gotcha — modifies in-place, sorted() returns new list
Custom sort key? key=lambda x: (x[0], -x[1]) — tuple for multi-level, negate numbers for descending
Stable sort? Python is stable — preserves order of equal elements, critical for multi-level sorting
Sort first strategy? Unlocks two pointers O(n), binary search O(log n), greedy patterns
Counting sort for integers? O(n+k) when range k is small — linear time vs O(n log n)
When NOT to sort? Need indices, only need min/max, k smallest (heap), real-time data
Timsort always? YES for 99% cases — optimized C, stable, adaptive, O(n log n) guaranteed`}
      methods={sortingMethods}
    />
  )
}

const binarySearchIntro = `Binary search is the fundamental O(log n) algorithm for searching sorted data. Instead of checking every element linearly, it repeatedly divides the search space in half. The key insight: if you can eliminate half the possibilities with one comparison, you achieve logarithmic time—searching 1 billion elements takes only 30 comparisons.

WHY BINARY SEARCH IS POWERFUL: The dramatic efficiency comes from exponential reduction. Each comparison cuts the problem size in half: n → n/2 → n/4 → n/8... After k steps, we have n/(2^k) elements left. When does this reach 1? When k = log₂(n). This is why 1M elements needs only 20 comparisons, and 1B elements needs only 30. Linear search would take 1 billion comparisons.

**Real-world impact:**
- Searching 1,000 elements: Linear = 1,000 ops, Binary = 10 ops (100x faster)
- Searching 1,000,000 elements: Linear = 1M ops, Binary = 20 ops (50,000x faster)
- Searching 1,000,000,000 elements: Linear = 1B ops, Binary = 30 ops (33M times faster!)

THE THREE VARIANTS: WHEN TO USE WHICH

Most binary search problems are NOT "find exact value." They're about finding boundaries:

**1. Exact Match** (Rare in Interviews)
Find if target exists, return index or -1.
Use case: Dictionary lookup, "does this value exist?"

**2. Left-Most / Lower Bound** (Very Common)
Find first position where \`arr[i] >= target\`.
Use case: First occurrence, insert position, "count elements < target"
Python: \`bisect_left(arr, target)\`

**3. Right-Most / Upper Bound** (Very Common)
Find first position where \`arr[i] > target\`.
Use case: Last occurrence, "count elements <= target"
Python: \`bisect_right(arr, target)\`

**Interview reality:** 80% of binary search problems use left-most or right-most, NOT exact match.

TEMPLATE 1: EXACT MATCH

The classic "find target or return -1" search:

\`\`\`python
def binary_search_exact(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:  # CRITICAL: <= not <
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid  # Found!
        elif arr[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half

    return -1  # Not found

# Time: O(log n)
# Space: O(1)
# Invariant: if target exists, it's in [left, right]
\`\`\`

**Critical details:**
- \`while left <= right\`: Must use \`<=\` because when \`left == right\`, there's still one element to check
- \`right = mid - 1\`: We EXCLUDE mid because we checked it (\`arr[mid] != target\`)
- Loop terminates when \`left > right\` (search space exhausted)

**Visualization:**
\`\`\`
arr = [1, 3, 5, 7, 9, 11, 13], target = 7

Step 1: left=0, right=6, mid=3, arr[3]=7 ✓ Found!
\`\`\`

TEMPLATE 2: LEFT-MOST (LOWER BOUND)

Find the first position where you could insert target to maintain sorted order (smallest index where \`arr[i] >= target\`):

\`\`\`python
def bisect_left(arr, target):
    left, right = 0, len(arr)  # CRITICAL: right = len(arr), not len(arr) - 1

    while left < right:  # CRITICAL: < not <=
        mid = (left + right) // 2

        if arr[mid] < target:
            left = mid + 1  # target is in right half
        else:
            right = mid  # CRITICAL: mid, not mid - 1 (could be at mid!)

    return left  # left == right, this is the answer

# Time: O(log n)
# Space: O(1)
# Invariant: arr[0:left] < target, arr[right:] >= target
\`\`\`

**Critical details:**
- \`right = len(arr)\`: Not \`len(arr) - 1\`! We need to return \`len(arr)\` if all elements < target
- \`while left < right\`: NOT \`<=\`! With \`<=\`, infinite loop when \`left == right\`
- \`right = mid\`: NOT \`mid - 1\`! We haven't confirmed \`arr[mid] < target\`, so mid could be the answer
- Returns: \`left == right\`, guaranteed valid insert position [0, len(arr)]

**Why this works:**
We maintain the invariant: everything before \`left\` is < target, everything from \`right\` onward is >= target. When \`left == right\`, we've found the boundary.

**Visualization:**
\`\`\`
arr = [1, 3, 3, 3, 5, 7], target = 3

Step 1: left=0, right=6, mid=3, arr[3]=3 >= 3 → right = 3
Step 2: left=0, right=3, mid=1, arr[1]=3 >= 3 → right = 1
Step 3: left=0, right=1, mid=0, arr[0]=1 < 3 → left = 1
Step 4: left=1, right=1 → STOP, return 1 (first 3)

arr = [1, 2, 4, 5], target = 3
Returns 2 (insert position, arr[2]=4 >= 3)
\`\`\`

TEMPLATE 3: RIGHT-MOST (UPPER BOUND)

Find the first position where \`arr[i] > target\` (position AFTER last occurrence):

\`\`\`python
def bisect_right(arr, target):
    left, right = 0, len(arr)

    while left < right:
        mid = (left + right) // 2

        if arr[mid] <= target:  # CRITICAL: <= not <
            left = mid + 1
        else:
            right = mid

    return left  # left == right, this is the answer

# Time: O(log n)
# Space: O(1)
# Invariant: arr[0:left] <= target, arr[right:] > target
\`\`\`

**Critical details:**
- \`arr[mid] <= target\`: Use \`<=\` (not just \`<\`) to continue right when equal
- Returns position AFTER last occurrence (not the last occurrence itself)
- To get last occurrence: \`bisect_right(arr, target) - 1\` (if it exists)

**Visualization:**
\`\`\`
arr = [1, 3, 3, 3, 5, 7], target = 3

Step 1: left=0, right=6, mid=3, arr[3]=3 <= 3 → left = 4
Step 2: left=4, right=6, mid=5, arr[5]=7 > 3 → right = 5
Step 3: left=4, right=5, mid=4, arr[4]=5 > 3 → right = 4
Step 4: left=4, right=4 → STOP, return 4 (position after last 3)
\`\`\`

**LEFT vs RIGHT comparison:**

\`\`\`python
arr = [1, 3, 3, 3, 5, 7]

bisect_left(arr, 3)   # → 1 (first 3)
bisect_right(arr, 3)  # → 4 (after last 3)

# Count occurrences:
count = bisect_right(arr, 3) - bisect_left(arr, 3)  # 4 - 1 = 3

# First occurrence:
first = bisect_left(arr, 3)  # 1

# Last occurrence (if exists):
last = bisect_right(arr, 3) - 1  # 3
# Check: arr[last] == 3

# Elements < target:
count_less = bisect_left(arr, 3)  # 1

# Elements <= target:
count_less_equal = bisect_right(arr, 3)  # 4
\`\`\`

SEARCH ON THE ANSWER: THE BREAKTHROUGH PATTERN

Many problems don't give you a sorted array—they ask "find minimum/maximum X where condition is satisfied." The key insight: **binary search on the answer space**.

**Pattern recognition signals:**
- "Minimum speed to finish in time"
- "Minimum capacity to ship packages"
- "Maximum weight without breaking"
- "Smallest divisor resulting in sum <= threshold"
- "Kth smallest element in multiplication table"

**Template:**

\`\`\`python
def search_on_answer(condition_func, low, high):
    """
    Find minimum value in [low, high] where condition_func(value) is True.
    Assumes: if condition(x) is True, then condition(x+1) is also True (monotonic)
    """
    left, right = low, high + 1  # right is exclusive

    while left < right:
        mid = (left + right) // 2

        if condition_func(mid):
            right = mid  # mid works, try smaller
        else:
            left = mid + 1  # mid doesn't work, need larger

    return left  # Minimum value where condition is True

# Time: O(log(high - low) * T) where T = time for condition check
\`\`\`

**Example 1: Koko Eating Bananas**

*Problem:* Koko has n piles of bananas. She can eat at most k bananas per hour. Find minimum k to finish all piles in h hours.

\`\`\`python
def min_eating_speed(piles, h):
    def can_finish(speed):
        # Can Koko finish all piles in h hours at this speed?
        hours = sum((pile + speed - 1) // speed for pile in piles)  # Ceiling division
        return hours <= h

    # Binary search on answer: speed in [1, max(piles)]
    return search_on_answer(can_finish, 1, max(piles))

# Time: O(n log m) where m = max(piles)
# n iterations to check condition, log m binary search steps
\`\`\`

**Example 2: Capacity To Ship Packages Within D Days**

*Problem:* Ship packages in order within d days. Find minimum ship capacity.

\`\`\`python
def ship_within_days(weights, days):
    def can_ship(capacity):
        # Can we ship all packages in 'days' days with this capacity?
        current_load = 0
        days_needed = 1

        for weight in weights:
            if weight > capacity:  # Can't ship this package
                return False

            if current_load + weight > capacity:
                days_needed += 1  # Need new day
                current_load = weight
            else:
                current_load += weight

        return days_needed <= days

    # Binary search on capacity: [max(weights), sum(weights)]
    return search_on_answer(can_ship, max(weights), sum(weights))

# Time: O(n log S) where S = sum(weights)
\`\`\`

**Why this works:**
If capacity C works, capacity C+1 also works (monotonic property). We're finding the minimum C where the condition is satisfied—exactly what left-most binary search does!

COMMON PATTERNS & PROBLEMS:

**Pattern 1: Rotated Sorted Array**

\`\`\`python
def search_rotated(arr, target):
    """
    [4,5,6,7,0,1,2] rotated at pivot. Find target.
    """
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid

        # Determine which half is sorted
        if arr[left] <= arr[mid]:  # Left half is sorted
            if arr[left] <= target < arr[mid]:
                right = mid - 1  # target in left half
            else:
                left = mid + 1  # target in right half
        else:  # Right half is sorted
            if arr[mid] < target <= arr[right]:
                left = mid + 1  # target in right half
            else:
                right = mid - 1  # target in left half

    return -1

# Key insight: At least one half is always sorted
# Use sorted half to decide which direction to search
\`\`\`

**Pattern 2: Find Peak Element**

\`\`\`python
def find_peak_element(arr):
    """
    Peak: arr[i] > arr[i-1] and arr[i] > arr[i+1]
    """
    left, right = 0, len(arr) - 1

    while left < right:
        mid = (left + right) // 2

        if arr[mid] < arr[mid + 1]:
            left = mid + 1  # Peak is to the right
        else:
            right = mid  # Peak is at mid or to the left

    return left  # left == right, this is a peak

# Works because: if arr[mid] < arr[mid+1], peak must be in right half
# (going upward guarantees peak ahead)
\`\`\`

**Pattern 3: Search in 2D Matrix**

\`\`\`python
def search_matrix(matrix, target):
    """
    Sorted rows and columns. Treat as 1D sorted array.
    """
    if not matrix or not matrix[0]:
        return False

    rows, cols = len(matrix), len(matrix[0])
    left, right = 0, rows * cols - 1

    while left <= right:
        mid = (left + right) // 2
        row, col = mid // cols, mid % cols  # Convert 1D index to 2D
        value = matrix[row][col]

        if value == target:
            return True
        elif value < target:
            left = mid + 1
        else:
            right = mid - 1

    return False

# Time: O(log(m*n))
# Treat m×n matrix as 1D array of length m*n
\`\`\`

**Pattern 4: Sqrt(x) / Integer Square Root**

\`\`\`python
def my_sqrt(x):
    """
    Find floor(sqrt(x)) without using sqrt().
    """
    if x < 2:
        return x

    left, right = 1, x // 2  # sqrt(x) <= x/2 for x >= 4

    while left <= right:
        mid = (left + right) // 2
        square = mid * mid

        if square == x:
            return mid
        elif square < x:
            left = mid + 1
        else:
            right = mid - 1

    return right  # Floor of sqrt (right ends up being the answer)

# Time: O(log n)
# Alternative: Newton's method, but binary search is cleaner
\`\`\`

GOTCHAS AND EDGE CASES:

**1. Off-by-one errors (most common bug)**

\`\`\`python
# ❌ WRONG: Infinite loop
def bisect_wrong(arr, target):
    left, right = 0, len(arr)
    while left <= right:  # BUG: should be <
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid  # BUG: when left == right, right stays same
    return left

# ✅ CORRECT: Use < for boundary search
def bisect_correct(arr, target):
    left, right = 0, len(arr)
    while left < right:  # < not <=
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left
\`\`\`

**2. Forgetting to validate returned index**

\`\`\`python
# ❌ WRONG: Doesn't check if target exists
idx = bisect_left(arr, target)
value = arr[idx]  # IndexError if idx == len(arr)!

# ✅ CORRECT: Validate index
idx = bisect_left(arr, target)
if idx < len(arr) and arr[idx] == target:
    print(f"Found at {idx}")
else:
    print("Not found")
\`\`\`

**3. Using exact match template for boundary problems**

\`\`\`python
# ❌ WRONG: Finding first occurrence with exact match
def first_occurrence_wrong(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid  # BUG: might not be first!
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# ✅ CORRECT: Use left-most template
def first_occurrence_correct(arr, target):
    idx = bisect_left(arr, target)
    if idx < len(arr) and arr[idx] == target:
        return idx
    return -1
\`\`\`

**4. Integer overflow (rare in Python, common in C++/Java)**

\`\`\`python
# In languages with fixed-size integers:
# ❌ WRONG: Overflow when left + right > MAX_INT
mid = (left + right) // 2

# ✅ CORRECT: Avoids overflow
mid = left + (right - left) // 2

# Python handles arbitrary precision integers, so not an issue
# But good to know for other languages
\`\`\`

**5. Condition function not monotonic**

\`\`\`python
# ❌ WRONG: Binary search on answer when condition is not monotonic
# If condition(5) = True but condition(6) = False, binary search fails!

# ✅ CORRECT: Verify monotonicity
# For "minimum X where condition(X) is True":
# Must guarantee: condition(X) True → condition(X+1) True
# For "maximum X where condition(X) is True":
# Must guarantee: condition(X) True → condition(X-1) True
\`\`\`

WHEN TO USE BINARY SEARCH:

**Strong signals:**
- ✅ Data is sorted (or rotated sorted)
- ✅ "Find minimum/maximum X where..."
- ✅ "In O(log n) time"
- ✅ Can check a condition in O(n) or less
- ✅ Condition has monotonic property

**When NOT to use:**
- ❌ Data is completely unsorted (sort first if possible)
- ❌ Need to find ALL occurrences (two binary searches for first + last)
- ❌ Small dataset (n < 100): linear search is simpler and comparable
- ❌ Condition is not monotonic

BEST PRACTICES:

1. **Use Python's bisect module**: Don't reinvent the wheel
   \`\`\`python
   from bisect import bisect_left, bisect_right
   # bisect_left: first position >= target
   # bisect_right: first position > target
   \`\`\`

2. **Know the invariants**:
   - Exact: if target exists, it's in [left, right]
   - Left-most: arr[0:left] < target, arr[right:] >= target
   - Right-most: arr[0:left] <= target, arr[right:] > target

3. **Match template to problem**:
   - "Find value" → exact (\`left <= right\`)
   - "Find boundary" → left/right-most (\`left < right\`)
   - "Minimum where..." → search on answer (left-most pattern)

4. **Validate results**:
   - Check \`idx < len(arr)\` before accessing \`arr[idx]\`
   - Check \`arr[idx] == target\` if you need exact match

5. **Handle empty arrays**:
   \`\`\`python
   if not arr:
       return -1  # or appropriate default
   \`\`\`

6. **Test edge cases**:
   - Empty array: \`[]\`
   - Single element: \`[1]\`
   - Target not found
   - Target at boundaries: first or last element
   - All elements equal: \`[5, 5, 5, 5]\`
   - Target smaller/larger than all elements

7. **Visualize with small examples**: Draw the array, track left/mid/right through iterations

8. **Remember the math**: log₂(1,000,000) ≈ 20 steps. If you're doing more, something's wrong.`

export function BinarySearchPage() {
  return (
    <TypePage
      type="Binary Search" badge="log" color="var(--accent-binary-search)"
      description="O(log n) search in sorted data. Master the three variants: exact, left-most, right-most."
      intro={binarySearchIntro}
      tip={`Sorted data O(log n)? Binary search — 1M elements = 20 comparisons, 1B = 30 comparisons
Find first/last occurrence? bisect_left (≥ target), bisect_right (> target) — NOT exact match!
"Minimum X where condition works"? Search on answer (condition must be monotonic)
Boundary search? while left < right, right = mid — exact match? while left <= right, right = mid - 1
Off-by-one? Use < for boundaries (not <=), or infinite loop when left == right
Validate index! bisect_left can return len(arr) — check idx < len(arr) and arr[idx] == target
Count occurrences? bisect_right(arr, x) - bisect_left(arr, x) — both O(log n)`}
      methods={binarySearchMethods}
      tabs={<DSCategoryTabs basePath="/binary-search" problemCount={getProblemCount('binarySearch')} />}
    />
  )
}

const twoPointersIntro = `Two pointers is a technique that uses two integer variables to traverse an array or string, typically moving in opposite directions or at different speeds. Instead of checking all O(n²) pairs with nested loops, we strategically move pointers based on problem constraints to find solutions in O(n) time. The key insight: proper pointer movement eliminates impossible candidates without checking them.

WHY TWO POINTERS WORKS: The efficiency comes from eliminating large portions of the search space with each pointer movement. In a sorted array searching for a pair sum, if \`arr[left] + arr[right] > target\`, we know ALL pairs ending at right index are too large—we eliminate n potential pairs with one comparison! This is why two pointers achieves O(n) instead of O(n²).

\`\`\`python
# BRUTE FORCE: Check all pairs - O(n²)
for i in range(len(arr)):
    for j in range(i + 1, len(arr)):
        if arr[i] + arr[j] == target:
            return [i, j]

# TWO POINTERS: Eliminate half the pairs each step - O(n)
left, right = 0, len(arr) - 1
while left < right:
    current_sum = arr[left] + arr[right]
    if current_sum == target:
        return [left, right]
    elif current_sum < target:
        left += 1  # All pairs with this left are too small
    else:
        right -= 1  # All pairs with this right are too large
\`\`\`

PATTERN 1: OPPOSITE ENDS (Converging Pointers)

Start pointers at opposite ends (index 0 and n-1), move toward each other until they meet. This pattern works when the array is SORTED or when the problem has symmetry (like palindromes).

**When to use:**
- Find pair/triplet in sorted array with target sum
- Palindrome validation (compare characters from both ends)
- Container with most water (maximize area between boundaries)
- Trapping rain water (process from both ends)
- Reverse array in-place

**Template:**
\`\`\`python
left, right = 0, len(arr) - 1

while left < right:
    # Process current pair
    if condition_met(arr[left], arr[right]):
        return result

    # Move pointers based on comparison
    if arr[left] + arr[right] < target:
        left += 1  # Need larger sum
    else:
        right -= 1  # Need smaller sum
\`\`\`

**Example: Two Sum II (sorted array)**
\`\`\`python
def two_sum(arr, target):
    left, right = 0, len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]

        if current_sum == target:
            return [left, right]  # Found!
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum

    return None  # No solution
# Time: O(n), Space: O(1)
\`\`\`

**Example: Valid Palindrome**
\`\`\`python
def is_palindrome(s):
    left, right = 0, len(s) - 1

    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1

    return True
# Time: O(n), Space: O(1)
\`\`\`

PATTERN 2: SAME DIRECTION (Fast/Slow Pointers)

Both pointers start at the beginning and move forward, typically at different speeds or with different conditions. This pattern works for merging, partitioning, or processing sequential data.

**When to use:**
- Merge two sorted arrays
- Remove duplicates from sorted array (in-place)
- Partition array (move elements satisfying condition to front)
- Move zeros to end
- Compare two sequences or find subsequence

**Template:**
\`\`\`python
slow, fast = 0, 0

while fast < len(arr):
    if condition(arr[fast]):
        arr[slow] = arr[fast]
        slow += 1
    fast += 1
\`\`\`

**Example: Remove Duplicates from Sorted Array**
\`\`\`python
def remove_duplicates(nums):
    if not nums:
        return 0

    slow = 0  # Position for next unique element

    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]

    return slow + 1  # New length
# Time: O(n), Space: O(1) - modifies in-place
\`\`\`

**Example: Merge Two Sorted Arrays**
\`\`\`python
def merge(arr1, arr2):
    i, j = 0, 0
    result = []

    # Compare and take smaller element
    while i < len(arr1) and j < len(arr2):
        if arr1[i] <= arr2[j]:
            result.append(arr1[i])
            i += 1
        else:
            result.append(arr2[j])
            j += 1

    # Append remaining elements
    result.extend(arr1[i:])
    result.extend(arr2[j:])

    return result
# Time: O(n + m), Space: O(n + m)
\`\`\`

PATTERN 3: SLIDING WINDOW (Variable/Fixed Size)

A window defined by two pointers expands (move right) to include new elements and shrinks (move left) when a constraint is violated. This is a specialized two-pointer pattern for contiguous subarray/substring problems.

**When to use:**
- "Longest/shortest subarray with property X"
- "Minimum window substring containing all characters"
- "Maximum sum subarray of size k"
- "Longest substring without repeating characters"
- Any problem asking about contiguous subarrays

**Fixed-Size Window Template:**
\`\`\`python
window_size = k
for right in range(len(arr)):
    # Add arr[right] to window

    if right >= window_size - 1:
        # Window is full, process it
        result = max(result, window_sum)

        # Remove arr[left] from window
        left = right - window_size + 1
\`\`\`

**Variable-Size Window Template:**
\`\`\`python
left = 0
for right in range(len(arr)):
    # Add arr[right] to window
    window_state.add(arr[right])

    # Shrink window while constraint violated
    while constraint_violated():
        window_state.remove(arr[left])
        left += 1

    # Update result with current valid window
    result = max(result, right - left + 1)
\`\`\`

**Example: Longest Substring Without Repeating Characters**
\`\`\`python
def length_of_longest_substring(s):
    char_set = set()
    left = 0
    max_length = 0

    for right in range(len(s)):
        # Shrink window while duplicate exists
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1

        # Add current character
        char_set.add(s[right])

        # Update max length
        max_length = max(max_length, right - left + 1)

    return max_length
# Time: O(n), Space: O(min(n, alphabet_size))
\`\`\`

**Example: Maximum Sum Subarray of Size K**
\`\`\`python
def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum

    for right in range(k, len(arr)):
        # Slide window: add new element, remove old element
        window_sum = window_sum + arr[right] - arr[right - k]
        max_sum = max(max_sum, window_sum)

    return max_sum
# Time: O(n), Space: O(1)
\`\`\`

THREE POINTERS FOR THREE SUM:

For problems requiring three elements (3Sum), use one fixed pointer with two moving pointers.

\`\`\`python
def three_sum(nums, target):
    nums.sort()  # O(n log n)
    result = []

    for i in range(len(nums) - 2):
        # Skip duplicates for first pointer
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        # Two pointers for remaining pair
        left, right = i + 1, len(nums) - 1

        while left < right:
            total = nums[i] + nums[left] + nums[right]

            if total == target:
                result.append([nums[i], nums[left], nums[right]])

                # Skip duplicates
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1

                left += 1
                right -= 1
            elif total < target:
                left += 1
            else:
                right -= 1

    return result
# Time: O(n²), Space: O(1) excluding output
\`\`\`

WHEN TO SORT FIRST:

Many two-pointer problems require a sorted array. If the input isn't sorted, ask: "Does sorting enable a simpler algorithm?"

**Trade-off:** Sorting costs O(n log n), but unlocks O(n) two-pointer solutions. Total: O(n log n), which is better than O(n²) brute force.

\`\`\`python
# Without sorting: O(n²) hash map approach
def two_sum_unsorted(arr, target):
    seen = {}
    for i, num in enumerate(arr):
        if target - num in seen:
            return [seen[target - num], i]
        seen[num] = i

# With sorting: O(n log n) sort + O(n) two pointers
def two_sum_sorted(arr, target):
    sorted_arr = sorted(enumerate(arr), key=lambda x: x[1])
    left, right = 0, len(sorted_arr) - 1

    while left < right:
        current_sum = sorted_arr[left][1] + sorted_arr[right][1]
        if current_sum == target:
            return [sorted_arr[left][0], sorted_arr[right][0]]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
\`\`\`

**When sorting helps:**
- Find pairs, triplets, or quadruplets with target sum
- Find closest pair to target
- Remove duplicates (sorted duplicates are adjacent)
- Container/trapping water problems

**When NOT to sort:**
- Need to preserve original indices (use hash map instead)
- Input is already structured (linked list, stream)
- Sorting destroys important properties

POINTER MOVEMENT DECISIONS:

The key to two pointers is knowing WHEN to move WHICH pointer. Common strategies:

**1. Comparison-Based (Opposite Ends):**
\`\`\`python
if current_sum < target:
    left += 1  # Need larger sum
else:
    right -= 1  # Need smaller sum
\`\`\`

**2. Constraint-Based (Sliding Window):**
\`\`\`python
while window_invalid():
    remove(arr[left])
    left += 1  # Shrink until valid
\`\`\`

**3. Merge-Based (Same Direction):**
\`\`\`python
if arr1[i] <= arr2[j]:
    take arr1[i]
    i += 1
else:
    take arr2[j]
    j += 1
\`\`\`

**4. Partition-Based (Same Direction):**
\`\`\`python
if meets_condition(arr[fast]):
    swap(arr[slow], arr[fast])
    slow += 1
fast += 1
\`\`\`

COMMON PITFALLS:

**1. Infinite Loops:**
Ensure at least one pointer always moves forward in each iteration.

\`\`\`python
# BAD: Can infinite loop if condition never met
while left < right:
    if some_condition:
        left += 1
    # Missing else - right never moves!

# GOOD: Always move at least one pointer
while left < right:
    if some_condition:
        left += 1
    else:
        right -= 1
\`\`\`

**2. Off-by-One Errors:**
Carefully choose \`<\` vs \`<=\` and understand boundary conditions.

\`\`\`python
# For opposite ends: use left < right (not <=)
# If left == right, we're looking at same element twice!

# For sliding window: right - left + 1 is window size
# (not right - left!)
\`\`\`

**3. Forgetting to Handle Remaining Elements:**
When merging or comparing two sequences, don't forget leftover elements.

\`\`\`python
while i < len(arr1) and j < len(arr2):
    # Merge logic

# DON'T FORGET THESE!
result.extend(arr1[i:])
result.extend(arr2[j:])
\`\`\`

**4. Skipping Duplicates Incorrectly:**
In 3Sum-style problems, skip duplicates AFTER finding a solution, not before.

\`\`\`python
# CORRECT
if found_solution:
    result.append(solution)
    # Skip duplicates after adding
    while left < right and nums[left] == nums[left + 1]:
        left += 1
\`\`\`

DECISION TREE: WHICH PATTERN TO USE?

\`\`\`
Is the array sorted (or can you sort it)?
├─ Yes → Opposite ends pattern (find pairs/triplets)
└─ No
   ├─ Need to merge two sequences? → Same direction
   ├─ Need contiguous subarray? → Sliding window
   ├─ Need to partition/rearrange? → Same direction (fast/slow)
   └─ Need to detect cycle/find middle? → Fast/slow pointers (linked list)
\`\`\`

BEST PRACTICES:

1. **Always check if sorting helps**: O(n log n) sort + O(n) two pointers = O(n log n) total, often better than O(n²)
2. **Draw a diagram**: Visualize pointer positions to understand movement
3. **Invariant thinking**: What property is maintained as pointers move?
4. **Handle edge cases**: Empty array, single element, all duplicates
5. **Test with small examples**: [1, 2], [2, 2], [1, 2, 3] catch most bugs
6. **Window size formula**: \`right - left + 1\` (inclusive range)
7. **Shrink before expand**: In sliding window, shrink to fix violations before expanding`

export function TwoPointersPage() {
  return (
    <TypePage
      type="Two Pointers & Sliding Window" badge="2ptr" color="var(--accent-two-pointers)"
      description="Two pointers for O(n) solutions. Sliding window for subarray/substring problems."
      intro={twoPointersIntro}
      tip={`Pair/triplet in sorted array? Opposite ends (left=0, right=n-1) — O(n) beats O(n²) brute force
"Longest/shortest subarray"? Sliding window (expand right, shrink left when invalid) — O(n)
Remove duplicates in-place? Same direction fast/slow — slow tracks unique position, fast scans
3Sum problem? Fix one element, use two pointers on rest — O(n²) total (n × O(n))
Window size formula? right - left + 1 (INCLUSIVE range) — common off-by-one source!
Infinite loop risk? ALWAYS move at least one pointer per iteration — missing else causes stuck loop
Sort first? O(n log n) + O(n) = O(n log n) often beats O(n²) — enables two pointers on unsorted data`}
      methods={twoPointersMethods}
      tabs={<DSCategoryTabs basePath="/two-pointers" problemCount={getProblemCount('twoPointers')} />}
    />
  )
}

const backtrackingIntro = `Backtracking systematically explores all possible solutions by building candidates incrementally and abandoning (backtracking from) candidates as soon as it's determined they cannot lead to a valid solution. The key insight: instead of generating all possibilities upfront (O(2ⁿ) or O(n!) space), we build them one choice at a time, pruning invalid branches early to avoid exploring exponential dead ends.

WHY BACKTRACKING WORKS: The power comes from two principles: (1) Incremental construction—build solutions piece by piece, validating each step, (2) Early pruning—detect invalid paths immediately and skip entire subtrees. Without pruning, backtracking degenerates to brute force enumeration. WITH pruning, it can solve seemingly intractable problems (9×9 Sudoku has 9⁸¹ possible boards, but pruning makes it solvable in milliseconds).

THE UNIVERSAL BACKTRACKING TEMPLATE:

**The Choose-Explore-Unchoose Pattern**

Every backtracking problem follows this three-step recursive pattern:

\`\`\`python
def backtrack(path, choices, result):
    # BASE CASE: Check if current path is a complete solution
    if is_complete(path):
        result.append(path[:])  # CRITICAL: Store COPY, not reference!
        return

    # RECURSIVE CASE: Try each valid choice
    for choice in get_choices(choices):
        # PRUNE: Skip if choice violates constraints
        if not is_valid(choice, path):
            continue

        # CHOOSE: Add choice to current path
        path.append(choice)

        # EXPLORE: Recurse with updated state
        backtrack(path, get_remaining(choice, choices), result)

        # UNCHOOSE: Remove choice to try next option (backtrack!)
        path.pop()

# Time: O(b^d) where b = branching factor, d = depth
# Space: O(d) for recursion stack (not counting result storage)
\`\`\`

**Critical Details:**
- \`path[:]\` creates a copy—NEVER append \`path\` directly (common gotcha!)
- Prune BEFORE recursing, not after—check \`is_valid()\` before \`path.append()\`
- \`path.pop()\` is the "unchoose" step—removes last choice to backtrack
- Result is built outside function and passed by reference

WHEN TO USE BACKTRACKING:

**Strong signals for backtracking:**
- "Find ALL combinations/permutations/subsets"
- "List ALL valid solutions"
- "Solve constraint satisfaction puzzle" (Sudoku, N-Queens, word search)
- "Generate all possibilities matching constraints"
- Problem has NO optimal solution criteria (just validity)

**BACKTRACKING VS DYNAMIC PROGRAMMING:**

This is a critical distinction that trips up many candidates:

| Aspect | Backtracking | Dynamic Programming |
|--------|--------------|---------------------|
| Goal | Enumerate ALL solutions | Find ONE optimal solution |
| Question Type | "List all ways" | "How many ways" or "Best way" |
| Subproblems | Independent paths | Overlapping subproblems |
| Approach | Generate explicitly | Count/optimize implicitly |
| Time Complexity | O(b^d) exponential | O(n) to O(n³) polynomial |

Examples:
- "Generate all permutations of [1,2,3]" → **Backtracking** (need actual lists)
- "How many permutations of length k?" → **DP or Math** (just count)
- "Find all Sudoku solutions" → **Backtracking** (need actual boards)
- "Count ways to climb stairs" → **DP** (just count, don't list)

If the problem says "find ALL" or "list ALL", it's backtracking. If it says "count" or "how many" or "maximum/minimum", consider DP first.

PRUNING: THE KEY TO PERFORMANCE

Backtracking without pruning is brute force with extra steps. Pruning is what makes it practical.

**Prune BEFORE recursing, not after:**

\`\`\`python
# ❌ BAD - Explores then checks (too late!)
def backtrack_bad(path):
    if len(path) == n:
        if is_valid_solution(path):  # Wasted all that recursion!
            result.append(path[:])
        return

    for choice in choices:
        path.append(choice)  # No validation!
        backtrack_bad(path)
        path.pop()

# ✅ GOOD - Checks before exploring (prune early!)
def backtrack_good(path):
    if len(path) == n:
        result.append(path[:])  # Already know it's valid
        return

    for choice in choices:
        if is_valid_choice(choice, path):  # Prune before recursion
            path.append(choice)
            backtrack_good(path)
            path.pop()
\`\`\`

**Example: N-Queens pruning**

Placing queens on a chessboard: bad approach explores 8⁸ positions, good approach prunes attacked squares immediately.

\`\`\`python
def solve_n_queens(n):
    def is_safe(row, col, queens):
        # Check if placing queen at (row, col) attacks existing queens
        for r, c in queens:
            if c == col:  # Same column
                return False
            if abs(r - row) == abs(c - col):  # Same diagonal
                return False
        return True  # Same row impossible (one queen per row)

    def backtrack(row, queens, result):
        if row == n:  # Placed all queens
            result.append(queens[:])
            return

        for col in range(n):
            if is_safe(row, col, queens):  # PRUNE: skip attacked positions
                queens.append((row, col))  # Choose
                backtrack(row + 1, queens, result)  # Explore
                queens.pop()  # Unchoose

    result = []
    backtrack(0, [], result)
    return result

# Without pruning: 8^8 = 16,777,216 positions
# With pruning: ~2,057 positions for 8-Queens (10,000x faster!)
\`\`\`

COMMON BACKTRACKING PATTERNS:

**Pattern 1: Permutations** (Order matters, use each element once)

\`\`\`python
def permute(nums):
    result = []

    def backtrack(path, remaining):
        if not remaining:  # Used all numbers
            result.append(path[:])
            return

        for i in range(len(remaining)):
            # Choose: pick remaining[i]
            backtrack(path + [remaining[i]],
                     remaining[:i] + remaining[i+1:])  # Exclude chosen

    backtrack([], nums)
    return result

# permute([1,2,3]) → [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
# Time: O(n! * n) - n! permutations, O(n) to copy each
# Space: O(n) recursion depth
\`\`\`

**Pattern 2: Combinations** (Order doesn't matter, avoid duplicates)

\`\`\`python
def combine(n, k):
    result = []

    def backtrack(start, path):
        if len(path) == k:  # Combination complete
            result.append(path[:])
            return

        for i in range(start, n + 1):  # Start from 'start' to avoid duplicates
            path.append(i)  # Choose
            backtrack(i + 1, path)  # IMPORTANT: i+1, not start (go forward only)
            path.pop()  # Unchoose

    backtrack(1, [])
    return result

# combine(4, 2) → [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]
# Key insight: start parameter prevents [2,1] when [1,2] already exists
# Time: O(C(n,k) * k) = O(n! / ((n-k)! * k!) * k)
\`\`\`

**Pattern 3: Subsets** (Include or exclude each element)

\`\`\`python
def subsets(nums):
    result = []

    def backtrack(start, path):
        result.append(path[:])  # Every path is a valid subset!

        for i in range(start, len(nums)):
            path.append(nums[i])  # Include nums[i]
            backtrack(i + 1, path)  # Recurse with remaining
            path.pop()  # Backtrack to exclude nums[i]

    backtrack(0, [])
    return result

# subsets([1,2,3]) → [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
# Time: O(2^n * n) - 2^n subsets, O(n) to copy each
# Space: O(n) recursion depth

# Alternative: bit manipulation (non-backtracking)
def subsets_bits(nums):
    result = []
    n = len(nums)
    for i in range(2**n):  # 2^n possible subsets
        subset = [nums[j] for j in range(n) if (i >> j) & 1]
        result.append(subset)
    return result
\`\`\`

**Pattern 4: Constraint Satisfaction** (Sudoku, Word Search, N-Queens)

\`\`\`python
def exist(board, word):
    """Word Search: Find if word exists in grid (can move up/down/left/right)"""
    rows, cols = len(board), len(board[0])

    def backtrack(r, c, index):
        # BASE CASE: Found entire word
        if index == len(word):
            return True

        # PRUNE: Out of bounds or wrong letter
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return False
        if board[r][c] != word[index]:
            return False

        # CHOOSE: Mark as visited (modify board in-place)
        temp = board[r][c]
        board[r][c] = '#'  # Mark visited

        # EXPLORE: Try all 4 directions
        found = (backtrack(r+1, c, index+1) or
                backtrack(r-1, c, index+1) or
                backtrack(r, c+1, index+1) or
                backtrack(r, c-1, index+1))

        # UNCHOOSE: Restore board state
        board[r][c] = temp

        return found

    # Try starting from each cell
    for r in range(rows):
        for c in range(cols):
            if backtrack(r, c, 0):
                return True
    return False

# Time: O(m*n * 4^L) where L = len(word), m*n cells, 4 directions
# Space: O(L) recursion depth
\`\`\`

STATE MANAGEMENT: CRITICAL GOTCHAS

**Gotcha 1: Appending reference instead of copy**

\`\`\`python
# ❌ WRONG - All results point to same list!
def permute_wrong(nums):
    result = []
    path = []

    def backtrack(remaining):
        if not remaining:
            result.append(path)  # ❌ Appends REFERENCE to path!
            return

        for i in range(len(remaining)):
            path.append(remaining[i])
            backtrack(remaining[:i] + remaining[i+1:])
            path.pop()

    backtrack(nums)
    return result
# Result: [[], [], [], [], [], []] - all empty! (path ended empty)

# ✅ CORRECT - Store copy
def permute_correct(nums):
    result = []
    path = []

    def backtrack(remaining):
        if not remaining:
            result.append(path[:])  # ✅ Stores COPY with [:]
            # OR: result.append(list(path))
            # OR: result.append(path.copy())
            return

        for i in range(len(remaining)):
            path.append(remaining[i])
            backtrack(remaining[:i] + remaining[i+1:])
            path.pop()

    backtrack(nums)
    return result
\`\`\`

**Gotcha 2: Modifying shared state without restoring**

\`\`\`python
# ❌ WRONG - Doesn't restore visited set
def backtrack_wrong(path, visited):
    if is_complete(path):
        result.append(path[:])
        return

    for choice in choices:
        if choice not in visited:
            visited.add(choice)  # ❌ Never removed!
            path.append(choice)
            backtrack_wrong(path, visited)
            path.pop()  # Removes from path but NOT from visited!

# ✅ CORRECT - Restore ALL modified state
def backtrack_correct(path, visited):
    if is_complete(path):
        result.append(path[:])
        return

    for choice in choices:
        if choice not in visited:
            visited.add(choice)  # Choose
            path.append(choice)
            backtrack_correct(path, visited)
            path.pop()  # Unchoose path
            visited.remove(choice)  # ✅ Unchoose visited!
\`\`\`

**Gotcha 3: Using immutable updates inefficiently**

\`\`\`python
# ⚠️ WORKS but inefficient - creates new lists every call
def backtrack_slow(path, remaining):
    if not remaining:
        result.append(path)  # Can append directly (path is new each time)
        return

    for i in range(len(remaining)):
        # These create NEW lists (O(n) each time)
        backtrack_slow(path + [remaining[i]],
                      remaining[:i] + remaining[i+1:])
# Time: O(n! * n^2) - O(n) list creation per recursive call

# ✅ FAST - Modify in place, restore after
def backtrack_fast(path, remaining):
    if not remaining:
        result.append(path[:])  # Must copy now (path is shared)
        return

    for i in range(len(remaining)):
        path.append(remaining[i])  # O(1)
        elem = remaining.pop(i)    # O(n) but only once per call
        backtrack_fast(path, remaining)
        remaining.insert(i, elem)  # Restore
        path.pop()
# Time: O(n! * n) - Much faster!

# Both are correct. Use immutable for clarity, mutable for performance.
\`\`\`

WHEN NOT TO USE BACKTRACKING:

**1. Just counting solutions (use DP or math)**
- "How many permutations?" → n! (math)
- "Count ways to climb stairs" → DP (Fibonacci)
- Backtracking would generate all solutions just to count them (wasteful)

**2. Need optimal solution, not all solutions (use DP/greedy)**
- "Shortest path" → BFS or Dijkstra
- "Maximum sum subarray" → Kadane's algorithm
- "Minimum coins" → DP
- Backtracking would find all paths then pick best (inefficient)

**3. Problem has polynomial solution**
- Sorting → O(n log n) with built-in sort
- Two Sum → O(n) with hash map
- Don't use exponential backtracking for polynomial problems

**4. Input size too large (n > 20)**
- Backtracking is exponential: 2²⁰ = 1M, 2²⁵ = 33M, 2³⁰ = 1B
- For large inputs, need greedy, DP, or approximation algorithms

COMPLEXITY ANALYSIS:

Backtracking complexity depends on the search tree structure:

| Problem Type | Complexity | Explanation |
|--------------|------------|-------------|
| Permutations | O(n! * n) | n! solutions, O(n) to copy each |
| Subsets | O(2ⁿ * n) | 2ⁿ solutions, O(n) to copy each |
| Combinations C(n,k) | O(C(n,k) * k) | C(n,k) solutions, O(k) to copy |
| N-Queens | O(n!) | n choices first row, n-1 second, etc. |
| Sudoku | O(9^(empty cells)) | Up to 9 choices per cell |

**Pruning impact:**
- Without pruning: Explore EVERY branch (worst case)
- With pruning: Skip invalid branches (can be 1000x faster)
- Good pruning can turn "impossible" into "solvable"

BEST PRACTICES:

1. **Always copy when storing results**: \`result.append(path[:])\` not \`result.append(path)\`

2. **Prune early**: Check constraints BEFORE recursing, not after

3. **Restore ALL modified state**: If you modify visited sets, boards, etc., undo it!

4. **Choose efficient state representation**:
   - Use sets for O(1) membership checks
   - Use lists for O(1) append/pop
   - Avoid creating new lists unless necessary

5. **Optimize pruning**: Add constraints that catch invalid states early
   - N-Queens: check column/diagonal before recursing
   - Sudoku: eliminate impossible numbers first

6. **Consider iterative solutions**: For subsets, bit manipulation is cleaner

7. **Test with small inputs**: Backtracking bugs are easiest to debug with n ≤ 3

8. **Know when to stop**: If recursion is too deep or taking too long, backtracking might not be the right approach`

export function BacktrackingPage() {
  return (
    <TypePage
      type="Backtracking" badge="bt" color="var(--accent-backtracking)"
      description="Explore all solutions by building incrementally. Essential for permutations, combinations, constraint satisfaction."
      intro={backtrackingIntro}
      tip={`"Find ALL" or "List ALL"? Backtracking — DP is for counting/optimizing, not enumerating
Pattern? choose → explore → unchoose — modify state, recurse, restore (3-step template)
Store result? result.append(path[:]) — NEVER append path directly (copies reference!)
Prune early? Check is_valid() BEFORE recursing — 1000x faster than checking after
Restore ALL state? path.pop() AND visited.remove() — forgot to restore = subtle bugs
Permutations vs Combinations? Perm: order matters, all remaining. Combo: start index, avoid duplicates
n > 20? Too large for backtracking (2²⁰=1M, 2²⁵=33M) — use DP/greedy/approximation`}
      methods={backtrackingMethods}
      tabs={<DSCategoryTabs basePath="/backtracking" problemCount={getProblemCount('backtracking')} />}
    />
  )
}

const dpIntro = `Dynamic Programming (DP) solves optimization problems by breaking them into overlapping subproblems, solving each subproblem once, and storing results to avoid redundant computation. The key insight: if a problem exhibits optimal substructure (optimal solution contains optimal solutions to subproblems) AND overlapping subproblems (same subproblems appear multiple times), DP can reduce exponential O(2ⁿ) time to polynomial O(n) or O(n²) time.

WHY DYNAMIC PROGRAMMING WORKS: DP eliminates redundant work. Naive Fibonacci recursion solves fib(n) by calling fib(n-1) and fib(n-2), which both recursively call fib(n-3), causing exponential redundancy. DP solves fib(n-3) ONCE and reuses the result, reducing O(2ⁿ) to O(n).

\`\`\`python
# NAIVE RECURSION: O(2^n) - exponential
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
# fib(5) calls fib(3) twice, fib(2) three times!

# DYNAMIC PROGRAMMING: O(n) - linear
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
# Each fib(k) computed ONCE, cached, reused
\`\`\`

TWO REQUIREMENTS FOR DP:

**1. Optimal Substructure**: The optimal solution to a problem contains optimal solutions to its subproblems.

Example (Shortest Path): If shortest path A→C goes through B, then A→B must be the shortest A→B path. You can't have shorter A→C by taking a longer A→B.

**2. Overlapping Subproblems**: The same subproblems are solved multiple times when solving the original problem.

Example (Fibonacci): Computing fib(5) requires fib(4) and fib(3). Computing fib(4) also requires fib(3). fib(3) is an overlapping subproblem.

**Without both properties, DP doesn't help:**
- No overlapping subproblems? Just use regular recursion (Merge Sort, Quick Sort)
- No optimal substructure? Can't build solution from subproblems (Traveling Salesman needs different approach)

WHEN TO USE DP: SIGNAL WORDS

**Strong DP signals:**
- "Count the number of ways to..."
- "Find minimum/maximum cost/value/length"
- "Longest/shortest subsequence/substring"
- "Is it possible to..." (decision problems)

**NOT DP:**
- "Find ALL solutions" → Use Backtracking instead (DP counts or optimizes, doesn't enumerate)
- "Find ONE valid solution" → May not need DP, could use greedy or simple algorithm

\`\`\`python
# DP: "How many ways can you climb to step n?"
def climb_stairs(n):
    dp = [0] * (n + 1)
    dp[0], dp[1] = 1, 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# BACKTRACKING: "List all ways to climb to step n"
def climb_stairs_all(n, path=[]):
    if n == 0:
        results.append(path[:])
        return
    if n >= 1:
        climb_stairs_all(n-1, path + [1])
    if n >= 2:
        climb_stairs_all(n-2, path + [2])
\`\`\`

THE 4-STEP DP FRAMEWORK:

**Step 1: Define STATE**
What information do you need to solve a subproblem? This becomes your dp array dimensions.

Examples:
- Fibonacci: \`dp[i]\` = ith Fibonacci number (1D)
- Knapsack: \`dp[i][w]\` = max value using first i items with capacity w (2D)
- Edit Distance: \`dp[i][j]\` = min edits to transform s1[:i] to s2[:j] (2D)

**Step 2: Find RECURRENCE RELATION**
How do you compute \`dp[state]\` from smaller states? This is the heart of DP.

Examples:
- Fibonacci: \`dp[i] = dp[i-1] + dp[i-2]\`
- Climbing Stairs: \`dp[i] = dp[i-1] + dp[i-2]\` (can arrive from 1 or 2 steps below)
- Coin Change: \`dp[i] = min(dp[i - coin] + 1 for coin in coins)\`

**Step 3: Set BASE CASES**
Smallest subproblems you can solve directly without recursion.

Examples:
- Fibonacci: \`dp[0] = 0, dp[1] = 1\`
- Climbing Stairs: \`dp[0] = 1, dp[1] = 1\`
- Knapsack: \`dp[0][w] = 0\` for all w (no items = no value)

**Step 4: Determine COMPUTATION ORDER**
Which direction should you fill the table to ensure smaller problems are solved before larger ones?

Examples:
- Fibonacci: Forward (i = 2 to n)
- Knapsack: Forward for both dimensions
- Interval DP: By increasing interval length

TOP-DOWN (MEMOIZATION) VS BOTTOM-UP (TABULATION):

**Top-Down (Memoization):**
- Write natural recursive solution
- Add caching to avoid recomputation
- Python's \`@lru_cache\` makes this trivial

Pros:
- Easier to think about (natural recursion)
- Only computes needed subproblems
- Cleaner code (less index management)

Cons:
- Recursion overhead (slower)
- Stack overflow risk for deep recursion
- Less control over evaluation order

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)
def climb_stairs(n):
    if n <= 1:
        return 1
    return climb_stairs(n-1) + climb_stairs(n-2)
\`\`\`

**Bottom-Up (Tabulation):**
- Build table iteratively from base cases
- No recursion, just loops

Pros:
- Usually faster (no function call overhead)
- Better space control (can optimize to O(1))
- No stack overflow

Cons:
- Harder to think about initially
- Computes ALL subproblems (even unneeded)
- More complex code with index management

\`\`\`python
def climb_stairs(n):
    if n <= 1:
        return 1

    dp = [0] * (n + 1)
    dp[0], dp[1] = 1, 1

    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]

    return dp[n]
\`\`\`

**When to choose:**
- Interviews: Start with top-down (@lru_cache), convert to bottom-up if asked
- Production: Bottom-up for performance-critical code
- Learning: Try both to understand the pattern

1D DP PATTERNS:

Use 1D DP when state depends on a single variable.

**Pattern: Single Sequence**
\`dp[i]\` = answer for first i elements

\`\`\`python
# House Robber: Max money without robbing adjacent houses
def rob(nums):
    if not nums:
        return 0

    n = len(nums)
    if n == 1:
        return nums[0]

    dp = [0] * n
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])

    for i in range(2, n):
        # Either rob current + i-2, or skip current (take i-1)
        dp[i] = max(nums[i] + dp[i-2], dp[i-1])

    return dp[n-1]
# Time: O(n), Space: O(n)
\`\`\`

**Pattern: Target Sum**
\`dp[i]\` = ways to reach sum i

\`\`\`python
# Coin Change: Min coins to make amount
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # Base case: 0 coins for amount 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1
# Time: O(amount * coins), Space: O(amount)
\`\`\`

2D DP PATTERNS:

Use 2D DP when state depends on two variables.

**Pattern 1: Two Sequences**
\`dp[i][j]\` = answer for s1[:i] and s2[:j]

\`\`\`python
# Longest Common Subsequence
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1  # Match!
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])  # Skip one

    return dp[m][n]
# Time: O(m*n), Space: O(m*n)
\`\`\`

**Pattern 2: Knapsack (Items + Capacity)**
\`dp[i][w]\` = max value using first i items with capacity w

\`\`\`python
# 0/1 Knapsack
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Option 1: Don't take item i
            dp[i][w] = dp[i-1][w]

            # Option 2: Take item i (if it fits)
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                              dp[i-1][w - weights[i-1]] + values[i-1])

    return dp[n][capacity]
# Time: O(n*capacity), Space: O(n*capacity)
\`\`\`

**Pattern 3: Grid Paths**
\`dp[i][j]\` = answer for cell (i, j)

\`\`\`python
# Unique Paths: Ways to reach bottom-right
def unique_paths(m, n):
    dp = [[0] * n for _ in range(m)]
    dp[0][0] = 1

    # Fill first row and column
    for i in range(m):
        dp[i][0] = 1
    for j in range(n):
        dp[0][j] = 1

    # Each cell = sum of top + left
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]

    return dp[m-1][n-1]
# Time: O(m*n), Space: O(m*n)
\`\`\`

**Pattern 4: Intervals**
\`dp[i][j]\` = answer for range [i, j]

\`\`\`python
# Palindromic Substrings: Count all palindromes
def count_palindromes(s):
    n = len(s)
    dp = [[False] * n for _ in range(n)]
    count = 0

    # Every single character is a palindrome
    for i in range(n):
        dp[i][i] = True
        count += 1

    # Check substrings of length 2
    for i in range(n - 1):
        if s[i] == s[i+1]:
            dp[i][i+1] = True
            count += 1

    # Check substrings of length 3+
    for length in range(3, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j] and dp[i+1][j-1]:
                dp[i][j] = True
                count += 1

    return count
# Time: O(n²), Space: O(n²)
\`\`\`

SPACE OPTIMIZATION:

When \`dp[i]\` only depends on \`dp[i-1]\`, use rolling array or variables instead of full array.

\`\`\`python
# Fibonacci - Space: O(n) → O(1)
def fib_optimized(n):
    if n <= 1:
        return n

    prev2, prev1 = 0, 1

    for i in range(2, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr

    return prev1
# Time: O(n), Space: O(1)

# House Robber - Space: O(n) → O(1)
def rob_optimized(nums):
    if not nums:
        return 0

    prev2, prev1 = 0, 0

    for num in nums:
        curr = max(num + prev2, prev1)
        prev2, prev1 = prev1, curr

    return prev1
# Time: O(n), Space: O(1)
\`\`\`

COMMON PITFALLS:

**1. Forgetting Base Cases**
\`\`\`python
# BAD: Missing base case causes crash
dp = [0] * n
for i in range(2, n):
    dp[i] = dp[i-1] + dp[i-2]  # dp[0], dp[1] are 0!

# GOOD: Initialize base cases
dp = [0] * n
dp[0], dp[1] = 1, 1
for i in range(2, n):
    dp[i] = dp[i-1] + dp[i-2]
\`\`\`

**2. Wrong Iteration Order**
\`\`\`python
# BAD: Computing dp[i] before dp[i-1]
for i in range(n, 0, -1):  # Wrong direction!
    dp[i] = dp[i-1] + dp[i-2]  # Accessing uncomputed values

# GOOD: Compute smaller problems first
for i in range(2, n + 1):
    dp[i] = dp[i-1] + dp[i-2]
\`\`\`

**3. Off-by-One Errors**
\`\`\`python
# BAD: Index out of bounds
dp = [0] * n
dp[n] = ...  # IndexError!

# GOOD: Allocate correct size
dp = [0] * (n + 1)  # Extra space for dp[n]
\`\`\`

**4. Not Using Enough Dimensions**
\`\`\`python
# BAD: Missing critical state information
# Knapsack with 1D won't work - need current capacity!
dp = [0] * num_items

# GOOD: Include all state variables
dp = [[0] * (capacity + 1) for _ in range(num_items + 1)]
\`\`\`

DECISION TREE: RECURSION VS DP VS GREEDY

\`\`\`
Does the problem ask to optimize/count?
├─ No → Just solve it directly
└─ Yes
   ├─ Can you make locally optimal choice that's globally optimal?
   │  └─ Yes → GREEDY (Activity Selection, Huffman Coding)
   └─ No
      ├─ Are there overlapping subproblems?
      │  ├─ Yes → DYNAMIC PROGRAMMING
      │  └─ No → RECURSION (Merge Sort, Tree Traversal)
      └─ Do you need ALL solutions (not just count/optimize)?
         └─ Yes → BACKTRACKING
\`\`\`

RECONSTRUCTING THE SOLUTION:

DP often finds the optimal VALUE, but you may need to reconstruct the actual SOLUTION.

\`\`\`python
# Coin Change: Return actual coins used
def coin_change_solution(coins, amount):
    dp = [float('inf')] * (amount + 1)
    parent = [-1] * (amount + 1)  # Track which coin was used
    dp[0] = 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i and dp[i - coin] + 1 < dp[i]:
                dp[i] = dp[i - coin] + 1
                parent[i] = coin  # Remember this choice

    if dp[amount] == float('inf'):
        return []

    # Reconstruct solution
    result = []
    curr = amount
    while curr > 0:
        coin = parent[curr]
        result.append(coin)
        curr -= coin

    return result
\`\`\`

BEST PRACTICES:

1. **Start with recursion**: Write the recursive solution first, then add memoization
2. **Draw the recursion tree**: Visualize overlapping subproblems to verify DP is useful
3. **Define state carefully**: Missing information in state = wrong answer
4. **Test with small examples**: dp[0], dp[1], dp[2] catch most bugs
5. **Check boundaries**: i-1, j-1 can go negative—handle edge cases
6. **Consider space optimization**: After solving, optimize O(n) → O(1) if possible
7. **Use @lru_cache first**: Simplest way to verify your recursion is correct`

export function DynamicProgrammingPage() {
  return (
    <TypePage
      type="Dynamic Programming" badge="dp" color="var(--accent-dp)"
      description="Solve complex problems by breaking into overlapping subproblems. Memoization vs tabulation."
      intro={dpIntro}
      tip={`"Count ways" or "min/max cost"? Almost always DP — "find ALL solutions" use backtracking instead
4-step framework? (1) Define state (2) Find recurrence (3) Set base cases (4) Determine order
Top-down vs bottom-up? @lru_cache is easiest (memoization), dp[] table is fastest (tabulation)
1D vs 2D? Single sequence/amount → 1D, two sequences/knapsack → 2D
Space optimization? If dp[i] only needs dp[i-1], use two variables instead of array — O(n) → O(1)
Forgetting base cases? dp[0], dp[1] must be initialized — common source of wrong answers!
Reconstruct solution? Store parent pointers to track choices, not just final optimal value`}
      methods={dpMethods}
      tabs={<DSCategoryTabs basePath="/dynamic-programming" problemCount={getProblemCount('dynamicProgramming')} />}
    />
  )
}

const graphIntro = `Graphs represent relationships between objects—a graph is a set of vertices (nodes) connected by edges. Graphs can be directed (one-way edges) or undirected (two-way edges), weighted (edges have costs) or unweighted. The key insight: many seemingly different problems (social networks, web crawling, task scheduling, route finding, dependency resolution) are all graph traversal in disguise.

WHY GRAPHS MATTER: Graph algorithms unlock solutions to problems that appear unrelated on the surface. A maze is a graph (cells = nodes, passages = edges). Course prerequisites are a directed acyclic graph (DAG). Finding the shortest route on a map is weighted shortest path. Detecting deadlocks in concurrent systems is cycle detection. Master graph algorithms, and you've mastered a huge class of interview problems.

GRAPH REPRESENTATION: ADJACENCY LIST VS ADJACENCY MATRIX

**Adjacency List** (Most Common in Interviews)

Dictionary or list of lists where each vertex maps to its neighbors:

\`\`\`python
# Dictionary of lists (most flexible)
graph = {
    0: [1, 2],
    1: [2, 3],
    2: [3],
    3: []
}

# List of lists (when vertices are 0 to n-1)
graph = [
    [1, 2],    # neighbors of vertex 0
    [2, 3],    # neighbors of vertex 1
    [3],       # neighbors of vertex 2
    []         # neighbors of vertex 3
]

# defaultdict for easier building (no KeyError)
from collections import defaultdict
graph = defaultdict(list)
for u, v in edges:
    graph[u].append(v)  # directed
    graph[v].append(u)  # add this for undirected

# Weighted graph: store tuples (neighbor, weight)
graph = defaultdict(list)
graph[0].append((1, 4))  # edge 0→1 with weight 4
graph[0].append((2, 1))  # edge 0→2 with weight 1
\`\`\`

**When to use:**
- Sparse graphs (few edges relative to vertices)
- Space: O(V + E) — efficient when E << V²
- Edge lookup: O(degree of vertex)
- Iterate neighbors: O(degree)
- **Best for: interviews (99% of problems), social networks, web graphs**

**Adjacency Matrix**

2D array where \`matrix[i][j]\` indicates edge from i to j:

\`\`\`python
# n x n matrix for n vertices
n = 4
graph = [[0] * n for _ in range(n)]

# Add edge from u to v
graph[u][v] = 1  # unweighted
graph[u][v] = weight  # weighted

# Undirected: symmetric matrix
graph[u][v] = graph[v][u] = 1

# Check if edge exists: O(1)
if graph[u][v]:
    print(f"Edge {u} → {v} exists")
\`\`\`

**When to use:**
- Dense graphs (many edges, E ≈ V²)
- Space: O(V²) — wasteful for sparse graphs
- Edge lookup: O(1) — very fast
- Iterate neighbors: O(V) — must scan entire row
- **Best for: dense graphs, Floyd-Warshall (all-pairs shortest path)**

**Trade-off Decision:**
- V = 1000, E = 2000 (sparse) → Adjacency list uses 2000 + 1000 = 3K space, matrix uses 1M space
- V = 100, E = 5000 (dense) → Both similar, matrix has O(1) edge lookup
- **Default choice: adjacency list** (unless problem specifically needs dense representation)

BFS VS DFS: THE FUNDAMENTAL GRAPH TRAVERSAL CHOICE

**BFS (Breadth-First Search)**: Level-by-level exploration

Explore all neighbors at current distance before going deeper. Uses a **queue** (FIFO).

\`\`\`python
from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    result = []

    while queue:
        node = queue.popleft()  # FIFO: process oldest first
        result.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)  # Mark BEFORE adding to queue!
                queue.append(neighbor)

    return result

# Time: O(V + E) - visit each vertex once, check each edge once
# Space: O(V) - queue can hold up to V vertices in worst case
\`\`\`

**When to use BFS:**
- ✅ **Shortest path in unweighted graph** (guaranteed minimum hops)
- ✅ Level-order traversal (process by distance from start)
- ✅ Testing bipartiteness (2-coloring)
- ✅ Finding connected components at minimum distance
- ✅ Web crawling (explore nearby pages first)
- ✅ Shortest transformation sequence (word ladder)

**DFS (Depth-First Search)**: Go deep before going wide

Explore as far as possible along each branch before backtracking. Uses **recursion** or **stack** (LIFO).

\`\`\`python
# Recursive DFS (cleaner)
def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()

    visited.add(node)
    result = [node]

    for neighbor in graph[node]:
        if neighbor not in visited:
            result.extend(dfs_recursive(graph, neighbor, visited))

    return result

# Iterative DFS (better for deep graphs, avoids stack overflow)
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    result = []

    while stack:
        node = stack.pop()  # LIFO: process most recent

        if node not in visited:
            visited.add(node)
            result.append(node)

            # Add neighbors in reverse for same order as recursive
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append(neighbor)

    return result

# Time: O(V + E)
# Space: O(V) for recursion stack or explicit stack
\`\`\`

**When to use DFS:**
- ✅ **Find ALL paths** between two vertices
- ✅ **Detect cycles** (easier with DFS + coloring)
- ✅ **Topological sort** (reverse post-order)
- ✅ **Strongly connected components** (Kosaraju's, Tarjan's)
- ✅ Maze solving (explore one path fully before trying another)
- ✅ Backtracking problems (combinations, permutations on graphs)
- ✅ Tree traversals (in-order, pre-order, post-order)

**BFS vs DFS Comparison:**

| Aspect | BFS | DFS |
|--------|-----|-----|
| Data Structure | Queue (deque) | Stack or Recursion |
| Explores | Level by level | Branch by branch |
| Shortest Path | YES (unweighted) | NO |
| Space | O(V) - can be large | O(h) height, usually smaller |
| Implementation | Iterative (queue) | Recursive (cleaner) or iterative |
| Use Case | Distance, shortest path | All paths, cycles, topological |

**Common Gotcha:**
Mark vertices as visited WHEN ADDING to queue/stack, not when popping! Otherwise same vertex gets added multiple times.

\`\`\`python
# ❌ WRONG - vertex added to queue multiple times
def bfs_wrong(graph, start):
    queue = deque([start])
    visited = set()

    while queue:
        node = queue.popleft()
        visited.add(node)  # Too late! Already in queue multiple times

        for neighbor in graph[node]:
            if neighbor not in visited:
                queue.append(neighbor)  # Can add same neighbor multiple times

# ✅ CORRECT - mark when adding
def bfs_correct(graph, start):
    visited = set([start])
    queue = deque([start])

    while queue:
        node = queue.popleft()

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)  # Mark immediately!
                queue.append(neighbor)
\`\`\`

SHORTEST PATH ALGORITHMS: THE DECISION TREE

**Decision Tree:**
1. Unweighted graph? → **BFS** (O(V + E))
2. Weighted graph with non-negative edges? → **Dijkstra** (O((V + E) log V))
3. Negative edge weights? → **Bellman-Ford** (O(V * E))
4. All pairs shortest paths? → **Floyd-Warshall** (O(V³))

**Algorithm 1: BFS for Unweighted Shortest Path**

\`\`\`python
from collections import deque

def shortest_path_bfs(graph, start, target):
    if start == target:
        return [start]

    visited = {start}
    queue = deque([(start, [start])])  # (node, path to node)

    while queue:
        node, path = queue.popleft()

        for neighbor in graph[node]:
            if neighbor not in visited:
                new_path = path + [neighbor]

                if neighbor == target:
                    return new_path  # First path found = shortest

                visited.add(neighbor)
                queue.append((neighbor, new_path))

    return None  # No path exists

# Time: O(V + E)
# Space: O(V) for visited + paths
\`\`\`

**Algorithm 2: Dijkstra for Weighted Non-Negative**

\`\`\`python
import heapq
from collections import defaultdict

def dijkstra(graph, start):
    # graph[u] = [(v, weight), ...]
    distances = {start: 0}
    pq = [(0, start)]  # (distance, node)

    while pq:
        curr_dist, node = heapq.heappop(pq)

        # Skip if we already found better path
        if curr_dist > distances.get(node, float('inf')):
            continue

        for neighbor, weight in graph[node]:
            distance = curr_dist + weight

            # Relaxation: found shorter path?
            if distance < distances.get(neighbor, float('inf')):
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))

    return distances

# Time: O((V + E) log V) with binary heap
# Space: O(V) for distances and priority queue
# Note: Fibonacci heap achieves O(E + V log V) but constant factor high
\`\`\`

**Algorithm 3: Bellman-Ford for Negative Edges**

\`\`\`python
def bellman_ford(edges, V, start):
    # edges = [(u, v, weight), ...]
    distances = [float('inf')] * V
    distances[start] = 0

    # Relax all edges V-1 times
    for _ in range(V - 1):
        for u, v, weight in edges:
            if distances[u] + weight < distances[v]:
                distances[v] = distances[u] + weight

    # Check for negative cycles
    for u, v, weight in edges:
        if distances[u] + weight < distances[v]:
            return None  # Negative cycle detected

    return distances

# Time: O(V * E) - slower than Dijkstra but handles negative weights
# Space: O(V)
# Can detect negative cycles (Dijkstra cannot)
\`\`\`

**Algorithm 4: Floyd-Warshall for All Pairs**

\`\`\`python
def floyd_warshall(graph, V):
    # graph[i][j] = weight of edge i→j (or inf if no edge)
    dist = [[float('inf')] * V for _ in range(V)]

    # Distance from vertex to itself is 0
    for i in range(V):
        dist[i][i] = 0

    # Initialize with direct edges
    for u in range(V):
        for v, weight in graph[u]:
            dist[u][v] = weight

    # Consider each vertex as intermediate
    for k in range(V):
        for i in range(V):
            for j in range(V):
                # Is path i→k→j shorter than i→j?
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])

    return dist

# Time: O(V³) - expensive but simple
# Space: O(V²)
# Use when V is small (< 500) and need all pairs
\`\`\`

TOPOLOGICAL SORT: ORDERING DEPENDENCIES

Topological sort orders vertices in a Directed Acyclic Graph (DAG) such that for every edge u→v, u comes before v.

**Use cases:**
- Course prerequisites (take A before B)
- Build systems (compile X before Y)
- Task scheduling with dependencies
- Detecting circular dependencies

**Two algorithms:**

**Method 1: Kahn's Algorithm (BFS-based, easy cycle detection)**

\`\`\`python
from collections import deque, defaultdict

def topological_sort_kahn(graph, V):
    # Calculate in-degrees
    in_degree = [0] * V
    for u in range(V):
        for v in graph[u]:
            in_degree[v] += 1

    # Queue vertices with no incoming edges
    queue = deque([i for i in range(V) if in_degree[i] == 0])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        # Remove this node, decrease in-degrees
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If result has all vertices, no cycle. Otherwise cycle exists.
    return result if len(result) == V else None

# Time: O(V + E)
# Space: O(V)
# BONUS: Detects cycles (if len(result) < V, cycle exists!)
\`\`\`

**Method 2: DFS-based (simpler, reverse post-order)**

\`\`\`python
def topological_sort_dfs(graph, V):
    visited = set()
    result = []

    def dfs(node):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)
        result.append(node)  # Add in POST-order

    for i in range(V):
        if i not in visited:
            dfs(i)

    return result[::-1]  # Reverse for topological order

# Time: O(V + E)
# Space: O(V)
# Simpler but doesn't detect cycles as easily
\`\`\`

CYCLE DETECTION:

**Undirected Graph:**

\`\`\`python
def has_cycle_undirected(graph, V):
    visited = set()

    def dfs(node, parent):
        visited.add(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                if dfs(neighbor, node):  # Recurse
                    return True
            elif neighbor != parent:  # Visited neighbor (not parent) = cycle
                return True

        return False

    # Check all components
    for i in range(V):
        if i not in visited:
            if dfs(i, -1):
                return True

    return False
\`\`\`

**Directed Graph (3-color method):**

\`\`\`python
def has_cycle_directed(graph, V):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * V

    def dfs(node):
        color[node] = GRAY  # Currently exploring

        for neighbor in graph[node]:
            if color[neighbor] == GRAY:  # Back edge = cycle!
                return True
            if color[neighbor] == WHITE:
                if dfs(neighbor):
                    return True

        color[node] = BLACK  # Done exploring
        return False

    for i in range(V):
        if color[i] == WHITE:
            if dfs(i):
                return True

    return False

# WHITE = unvisited, GRAY = in progress, BLACK = done
# Edge to GRAY node = back edge = cycle
\`\`\`

BIPARTITE GRAPHS (2-COLORING):

A graph is bipartite if vertices can be colored with two colors such that no edge connects same-colored vertices.

**Use cases:**
- Matching problems (students ↔ projects)
- Scheduling (tasks ↔ time slots)
- Detecting odd cycles (graph is bipartite ⟺ no odd cycles)

\`\`\`python
from collections import deque

def is_bipartite(graph):
    color = {}

    def bfs(start):
        queue = deque([start])
        color[start] = 0

        while queue:
            node = queue.popleft()

            for neighbor in graph[node]:
                if neighbor not in color:
                    color[neighbor] = 1 - color[node]  # Opposite color
                    queue.append(neighbor)
                elif color[neighbor] == color[node]:  # Same color!
                    return False

        return True

    # Check all components
    for node in graph:
        if node not in color:
            if not bfs(node):
                return False

    return True

# Time: O(V + E)
# Works with DFS too, BFS is cleaner
\`\`\`

CONNECTED COMPONENTS:

\`\`\`python
def count_components(graph, V):
    visited = set()
    count = 0

    def dfs(node):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)

    for i in range(V):
        if i not in visited:
            dfs(i)  # Explore entire component
            count += 1

    return count

# Time: O(V + E)
# BFS works too, DFS is simpler
\`\`\`

**Union-Find (Disjoint Set Union)** is faster for dynamic connectivity:

\`\`\`python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False  # Already connected

        # Union by rank
        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1
        return True

# Time: O(α(n)) ≈ O(1) amortized per operation
# Better than DFS for dynamic edge additions
\`\`\`

COMMON GRAPH PATTERNS:

**Pattern 1: "Number of Islands" (Grid DFS/BFS)**

\`\`\`python
def num_islands(grid):
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    visited = set()
    count = 0

    def dfs(r, c):
        if (r < 0 or r >= rows or c < 0 or c >= cols or
            (r, c) in visited or grid[r][c] == '0'):
            return

        visited.add((r, c))
        # Explore 4 directions
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1' and (r, c) not in visited:
                dfs(r, c)  # Explore entire island
                count += 1

    return count
\`\`\`

**Pattern 2: "Clone Graph" (Deep Copy)**

\`\`\`python
def clone_graph(node):
    if not node:
        return None

    clones = {}

    def dfs(node):
        if node in clones:
            return clones[node]

        clone = Node(node.val)
        clones[node] = clone  # Must create before recursing (avoid cycle!)

        for neighbor in node.neighbors:
            clone.neighbors.append(dfs(neighbor))

        return clone

    return dfs(node)
\`\`\`

BEST PRACTICES:

1. **Choose right representation**: Adjacency list for sparse, matrix for dense

2. **Mark visited when adding**: Prevents duplicates in queue/stack

3. **Use deque for BFS**: \`collections.deque\` is O(1) for popleft(), list is O(n)

4. **DFS: iterative for deep graphs**: Avoids stack overflow

5. **Dijkstra: check distance when popping**: Skip outdated entries in priority queue

6. **Negative weights? Use Bellman-Ford**: Dijkstra gives wrong answers with negative weights

7. **Grid problems = graph problems**: Treat cells as vertices, adjacency as edges

8. **Topological sort requires DAG**: If cycle exists, topological sort is impossible

9. **Union-Find for dynamic connectivity**: Better than DFS when edges added incrementally`

export function GraphPage() {
  return (
    <TypePage
      type="Graph Algorithms" badge="bfs" color="var(--accent-graph)"
      description="Graph traversal, shortest paths, and spanning trees. Master DFS, BFS, Dijkstra, and topological sort."
      intro={graphIntro}
      tip={`Shortest path unweighted? BFS O(V+E) — weighted non-negative? Dijkstra O((V+E)log V) — negative? Bellman-Ford
BFS vs DFS? BFS for shortest path/levels, DFS for all paths/cycles/topological sort
Mark visited WHEN ADDING to queue! Not when popping — prevents duplicate additions
Topological sort? Kahn's (BFS, detects cycles), DFS (reverse post-order, simpler)
Cycle detection? Undirected: DFS with parent check — Directed: 3-color (GRAY node = cycle)
Graph representation? Adjacency list for sparse (99% of interviews), matrix for dense/Floyd-Warshall
Use deque for BFS! collections.deque is O(1) for popleft(), list is O(n)`}
      methods={graphMethods}
      tabs={<DSCategoryTabs basePath="/graph" problemCount={getProblemCount('graphs')} />}
    />
  )
}
