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

const binarySearchIntro = `Binary search is the fundamental O(log n) algorithm for searching sorted data. Instead of checking every element, it repeatedly divides the search space in half. The key insight: if you can eliminate half the possibilities with one comparison, you get logarithmic time.

THREE VARIANTS: The exact variant finds a target value. The left-most variant finds the first position where you could insert target (smallest index ≥ target). The right-most variant finds the position after the last occurrence (smallest index > target). Most interview problems need left-most or right-most, not exact.

TEMPLATE - EXACT MATCH: Standard binary search to find if target exists. Returns index if found, -1 otherwise. Use \`while left <= right\` because we need to check when \`left == right\`.

\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
\`\`\`

TEMPLATE - LEFT-MOST (LOWER BOUND): Find first position ≥ target. Use \`while left < right\` (no equals!) because we're finding a boundary. When \`arr[mid] >= target\`, target could be at mid or earlier, so \`right = mid\` (not mid-1). Python's \`bisect_left\` does this.

\`\`\`python
def bisect_left(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid  # Could be at mid
    return left
\`\`\`

TEMPLATE - RIGHT-MOST (UPPER BOUND): Find first position > target. Same pattern, different condition. When \`arr[mid] <= target\`, we need to search right, so \`left = mid + 1\`. Python's \`bisect_right\` does this.

\`\`\`python
def bisect_right(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] <= target:
            left = mid + 1
        else:
            right = mid
    return left
\`\`\`

SEARCH ON THE ANSWER: The breakthrough pattern for "minimum X where condition works" problems. Instead of searching in an array, binary search on the answer space. Example: "Minimum speed to finish in H hours" → binary search speeds [1...max], check if each speed works. The key insight: if speed X works, speed X+1 also works (monotonic). Find the minimum that satisfies the condition.

WHEN TO USE WHICH: Need to find if value exists → exact. Need first/last occurrence → left/right-most. "Minimum X where..." → search on answer with left-most template. "Maximum X where..." → search on answer, reverse the condition. Insert position → left-most gives you where to insert to maintain sorted order.

COMMON MISTAKES: Using \`left <= right\` for boundary problems (infinite loop risk). Forgetting that right-most returns position AFTER last occurrence. Not checking if returned index is valid (\`bisect_left\` can return \`len(arr)\`). Integer overflow in \`mid = (left + right) // 2\` (use \`left + (right - left) // 2\` for very large arrays, though Python handles big ints).`

export function BinarySearchPage() {
  return (
    <TypePage
      type="Binary Search" badge="log" color="var(--accent-binary-search)"
      description="O(log n) search in sorted data. Master the three variants: exact, left-most, right-most."
      intro={binarySearchIntro}
      tip={`Sorted data? Binary search
"Minimum speed/capacity where condition works"? Binary search on answer
Find boundary? while left < right, not left <= right
Python has it! bisect_left for ≥ target, bisect_right for > target`}
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

const graphIntro = `Graphs represent relationships between objects. A graph is a set of vertices (nodes) connected by edges. Graphs can be directed (one-way edges) or undirected (two-way edges), weighted (edges have costs) or unweighted. The key insight: many real-world problems (social networks, maps, dependencies) are naturally modeled as graphs.

GRAPH REPRESENTATION: Adjacency list - dictionary mapping vertex to list of neighbors. Space O(V + E), efficient for sparse graphs. Most common in interviews. Adjacency matrix - 2D array where matrix[i][j] = 1 if edge exists. Space O(V²), fast edge lookup O(1), use for dense graphs. Python: use \`defaultdict(list)\` for adjacency list, \`[[0]*n for _ in range(n)]\` for matrix.

\`\`\`python
# Adjacency list (most common)
graph = {
    0: [1, 2],
    1: [2],
    2: [3],
    3: []
}
# or defaultdict(list) for easier building
from collections import defaultdict
graph = defaultdict(list)
graph[0].append(1)
\`\`\`

BFS VS DFS: BFS (Breadth-First Search) explores level by level using a queue. Finds shortest path in unweighted graphs, explores neighbors before going deeper. Use for: shortest path (unweighted), level-order traversal, testing bipartiteness, finding connected components at minimum distance. DFS (Depth-First Search) explores as deep as possible using recursion or stack. Use for: finding all paths, detecting cycles, topological sort, strongly connected components, maze solving. Both are O(V + E) time.

\`\`\`python
# BFS template
from collections import deque
def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

# DFS template (recursive)
def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
\`\`\`

SHORTEST PATH ALGORITHMS: Unweighted graph → BFS finds shortest path in O(V + E). Weighted graph with non-negative edges → Dijkstra's algorithm uses priority queue, O((V + E) log V). Negative edge weights → Bellman-Ford, O(V * E), also detects negative cycles. All pairs shortest paths → Floyd-Warshall, O(V³), finds distances between all vertex pairs. Decision: unweighted = BFS, weighted non-negative = Dijkstra, negative edges = Bellman-Ford, all pairs with small V = Floyd-Warshall.

TOPOLOGICAL SORT: Ordering of directed acyclic graph (DAG) vertices so every edge goes from earlier to later in the ordering. Use for: course prerequisites, build systems, task scheduling. Two methods: Kahn's algorithm (BFS-based, easy to detect cycles), DFS-based (add to result in reverse post-order). Both O(V + E). If graph has cycle, topological sort is impossible.

CYCLE DETECTION: Undirected graph → DFS, mark vertices as visited, if you visit a visited neighbor (not parent), there's a cycle. Directed graph → DFS with 3 colors (white=unvisited, gray=in progress, black=done), edge to gray node means cycle. Or use topological sort - if it succeeds, no cycle.

CONNECTED COMPONENTS: Use DFS or BFS to find all vertices reachable from a starting vertex. Run DFS/BFS from each unvisited vertex to find all components. Alternative: Union-Find (disjoint set union) for dynamic connectivity queries.`

export function GraphPage() {
  return (
    <TypePage
      type="Graph Algorithms" badge="bfs" color="var(--accent-graph)"
      description="Graph traversal, shortest paths, and spanning trees. Master DFS, BFS, Dijkstra, and topological sort."
      intro={graphIntro}
      tip={`Shortest path unweighted? BFS - Weighted non-negative? Dijkstra - Negative edges? Bellman-Ford
Explore all paths? DFS - Level-by-level? BFS - Cycle detection? DFS with colors
Dependencies/ordering? Topological sort (Kahn's for cycle detect, DFS for simplicity)
Connected components? DFS or Union-Find`}
      methods={graphMethods}
      tabs={<DSCategoryTabs basePath="/graph" problemCount={getProblemCount('graphs')} />}
    />
  )
}
