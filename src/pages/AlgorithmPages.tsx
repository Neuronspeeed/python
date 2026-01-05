import { TypePage } from '../components/TypePage'
import { sortingMethods } from '../data/sorting'
import { binarySearchMethods } from '../data/binarySearch'
import { twoPointersMethods } from '../data/twoPointers'
import { backtrackingMethods } from '../data/backtracking'
import { dpMethods } from '../data/dp'
import { graphMethods } from '../data/graph'
import { DSCategoryTabs } from '../components/DSCategoryTabs'
import { getProblemCount } from '../data/learn'

const sortingIntro = `Sorting is the process of arranging elements in order. It's one of the most fundamental operations in computer science—many algorithms become trivial once data is sorted. The key insight: spending O(n log n) to sort often unlocks O(n) or O(log n) algorithms that would otherwise be O(n²) or impossible.

PYTHON'S TIMSORT: Python uses Timsort (hybrid merge-insertion sort) for both \`list.sort()\` and \`sorted()\`. Timsort is optimized for real-world data with runs of already-sorted elements. Performance: O(n log n) worst case, O(n) best case on nearly-sorted data. It's stable (preserves order of equal elements) and highly optimized in C. Bottom line: Python's built-in sort is usually your best choice—don't implement quicksort or mergesort unless specifically required.

SORT FIRST STRATEGY: When stuck on a problem, ask "what if I sort first?" Sorting unlocks powerful patterns. Sorting enables two pointers (find pair with target sum), binary search (search in O(log n)), greedy algorithms (interval scheduling), and eliminates the need to track multiple states. Example: "Find if array has duplicate" becomes trivial after sorting—just check consecutive elements.

CUSTOM SORT KEYS: The \`key\` parameter transforms each element before comparison. Common patterns: \`key=lambda x: x[0]\` sorts tuples by first element, \`key=lambda x: (x[0], -x[1])\` sorts by first ascending, second descending (negate for reverse), \`key=len\` sorts by length, \`key=str.lower\` case-insensitive sort. The key function is called once per element (efficient).

\`\`\`python
# Sort 2D points by x, then y
points.sort(key=lambda p: (p[0], p[1]))

# Sort intervals by end time (greedy scheduling)
intervals.sort(key=lambda i: i[1])

# Sort strings by length, then alphabetically
words.sort(key=lambda w: (len(w), w))

# Descending by first element
arr.sort(key=lambda x: -x[0])
\`\`\`

STABILITY MATTERS: A stable sort preserves the original order of equal elements. Example: sorting [(1, 'a'), (2, 'b'), (1, 'c')] by first element gives [(1, 'a'), (1, 'c'), (2, 'b')]—the two 1s stay in original order. Python's sort is stable. When does this matter? When you sort multiple times by different keys (sort by secondary key first, then primary key—stable sort preserves secondary ordering). When equal elements have hidden state you want preserved. When implementing tie-breakers.

IN-PLACE VS NEW LIST: \`list.sort()\` sorts in place, modifies the list, returns None, uses O(1) extra space. \`sorted(list)\` returns a new sorted list, original unchanged, uses O(n) extra space. Use \`sort()\` when you don't need the original. Use \`sorted()\` when you need to keep original, or when sorting other iterables (tuples, strings, generators).

\`\`\`python
# In-place - modifies arr
arr = [3, 1, 2]
arr.sort()  # arr is now [1, 2, 3]

# New list - original unchanged
arr = [3, 1, 2]
new = sorted(arr)  # new is [1, 2, 3], arr still [3, 1, 2]
\`\`\`

ALGORITHM COMPARISON: Bubble/Selection/Insertion are O(n²) average case—only use for educational purposes or tiny arrays (n < 10). Merge sort is O(n log n) worst case, stable, but needs O(n) space—good for linked lists. Quick sort is O(n log n) average, O(n²) worst case, in-place but unstable—rarely implement in Python since Timsort is better. Heap sort is O(n log n) worst case, in-place but unstable—use when you need guaranteed O(n log n) with O(1) space. Counting/Radix sort are O(n+k) for integers in range k—use when sorting integers in limited range.

WHEN NOT TO SORT: If you need the k smallest/largest elements, use a heap (O(n log k) vs O(n log n) for full sort). If data arrives in real-time, maintain a sorted structure (heap, BST) instead of repeatedly sorting. If you only need one element (min/max), use O(n) \`min()\`/\`max()\` instead of O(n log n) sort.`

export function SortingPage() {
  return (
    <TypePage
      type="Sorting Algorithms" badge="sort" color="var(--accent-sorting)"
      description="Master sorting algorithms. Know when to use each. Python's Timsort is usually best."
      intro={sortingIntro}
      tip={`Custom sort key? key=lambda x: (x[0], -x[1]) for tuples, use - for descending
In-place vs new? list.sort() mutates O(1) space, sorted() returns new O(n) space
Stuck on problem? Try sorting first - unlocks greedy, two pointers, binary search
Stable sort matters? Python's sort is stable (preserves original order for equal elements)`}
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

const backtrackingIntro = `Backtracking systematically explores all possible solutions by building candidates incrementally and abandoning (backtracking from) candidates as soon as it's determined they cannot lead to a valid solution. The key insight: instead of generating all possibilities upfront, build them one choice at a time, pruning invalid branches early.

CHOOSE-EXPLORE-UNCHOOSE PATTERN: The universal backtracking template. Choose: make a choice and add it to current path. Explore: recursively solve the subproblem. Unchoose: remove the choice (backtrack) to try other options. This pattern generates all possibilities while maintaining state correctly.

\`\`\`python
def backtrack(path, choices):
    if is_complete(path):
        result.append(path[:])  # Store copy!
        return

    for choice in choices:
        if is_valid(choice, path):  # Prune early
            path.append(choice)      # Choose
            backtrack(path, remaining)  # Explore
            path.pop()               # Unchoose
\`\`\`

WHEN TO USE BACKTRACKING: "Find all combinations/permutations/subsets" → backtracking. "Solve this constraint satisfaction puzzle" (Sudoku, N-Queens) → backtracking. Key signal: need ALL solutions, not just optimal one. Backtracking vs DP: backtracking enumerates solutions, DP counts/optimizes without enumerating. If problem asks "how many ways" (count only), consider DP. If it asks "list all ways", use backtracking.

PRUNING IS CRITICAL: Backtracking is exponential time—O(b^d) where b is branching factor, d is depth. Without pruning, it's too slow. Prune BEFORE recursing, not after. Check constraints at each step: if current path violates rules, don't explore children. Example: N-Queens placing queen in attacked position → don't recurse, skip to next column. Good pruning can reduce runtime from hours to milliseconds.

\`\`\`python
# BAD - explores then checks
def backtrack(path):
    if len(path) == n:
        if is_valid(path):  # Too late!
            result.append(path[:])
        return
    for choice in choices:
        path.append(choice)
        backtrack(path)
        path.pop()

# GOOD - checks before exploring
def backtrack(path):
    if len(path) == n:
        result.append(path[:])  # Know it's valid
        return
    for choice in choices:
        if is_valid_choice(choice, path):  # Prune early
            path.append(choice)
            backtrack(path)
            path.pop()
\`\`\`

STATE MANAGEMENT GOTCHA: When storing results, always copy the path: \`result.append(path[:])\` or \`result.append(list(path))\`. If you append \`path\` directly, you're appending a reference—when path changes later, the stored result changes too! All stored results end up pointing to the same list. Use \`path[:]\` to create a shallow copy.

COMMON PATTERNS: Permutations - choose from remaining elements, reduce choices each level. Combinations - choose from elements at current index onward (avoid duplicates by not going backward). Subsets - at each element, choose to include or exclude (2^n total). Constraint satisfaction - validate constraints at each step, backtrack if violated.

COMPLEXITY ANALYSIS: Permutations: O(n!). Subsets: O(2^n). Combinations: O(C(n,k) * k) where k is combination size. Sudoku: O(9^(empty cells)) worst case. For n > 20, backtracking gets slow even with pruning. Consider dynamic programming, greedy, or heuristics for larger inputs.`

export function BacktrackingPage() {
  return (
    <TypePage
      type="Backtracking" badge="bt" color="var(--accent-backtracking)"
      description="Explore all solutions by building incrementally. Essential for permutations, combinations, constraint satisfaction."
      intro={backtrackingIntro}
      tip={`"Find ALL combinations/permutations"? Backtracking (not DP!)
Pattern? choose → explore (recurse) → unchoose (backtrack)
Store result? append path[:] not path (copy required!)
Prune early? Check constraints BEFORE recursing, not after (huge speedup)`}
      methods={backtrackingMethods}
      tabs={<DSCategoryTabs basePath="/backtracking" problemCount={getProblemCount('backtracking')} />}
    />
  )
}

const dpIntro = `Dynamic Programming (DP) solves optimization problems by breaking them into overlapping subproblems, solving each subproblem once, and storing results to avoid redundant computation. The key insight: if a problem has optimal substructure (optimal solution contains optimal solutions to subproblems) and overlapping subproblems (same subproblems solved multiple times), DP can reduce exponential time to polynomial.

WHEN TO USE DP: Signal words: "count the number of ways", "find minimum/maximum cost", "longest/shortest sequence". If the problem asks for ALL solutions, use backtracking. If it asks to COUNT or OPTIMIZE, use DP. Classic DP: Fibonacci, coin change, knapsack, longest common subsequence, edit distance, matrix chain multiplication.

TOP-DOWN (MEMOIZATION) VS BOTTOM-UP (TABULATION): Top-down: write recursive solution, add memoization to cache results. Natural to think about, solves only needed subproblems. Use \`@lru_cache\` decorator in Python (one line!). Bottom-up: build table iteratively from base cases. Usually faster, better space control, no recursion overhead. Choose top-down for clarity, bottom-up for performance.

\`\`\`python
# TOP-DOWN (memoization with @lru_cache)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# BOTTOM-UP (tabulation with array)
def fib(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
\`\`\`

THE 4-STEP DP FRAMEWORK: (1) Define STATE: what information do you need to solve a subproblem? For Fibonacci: dp[i] = ith Fibonacci number. For knapsack: dp[i][w] = max value using first i items with capacity w. (2) Find RECURRENCE: how to compute dp[state] from smaller states? Fibonacci: dp[i] = dp[i-1] + dp[i-2]. (3) Set BASE CASES: smallest subproblems you can solve directly. Fibonacci: dp[0] = 0, dp[1] = 1. (4) Determine COMPUTATION ORDER: which direction to fill the table? Fibonacci: increasing order (i = 2 to n).

1D DP PATTERNS: Use when state depends on a single variable. Climbing stairs: dp[i] = ways to reach step i. House robber: dp[i] = max money robbing houses 0..i. Coin change: dp[i] = min coins to make amount i. Generally: problems with single sequence, single variable optimization.

2D DP PATTERNS: Use when state depends on two variables. Two sequences: LCS (longest common subsequence) dp[i][j] = LCS of first i chars of s1, first j chars of s2. Edit distance: dp[i][j] = min edits to transform first i chars to first j chars. Knapsack: dp[i][w] = max value with first i items, capacity w. Intervals: dp[i][j] = optimal for range [i, j]. Grid paths: dp[i][j] = ways to reach cell (i, j).

COMMON MISTAKES: Forgetting base cases (causes wrong answers or crashes). Wrong iteration order (accessing uncomputed values). Not using enough dimensions (state missing critical information). Thinking DP works when subproblems aren't overlapping (just use recursion). Off-by-one errors in indices.

OPTIMIZATION TECHNIQUES: Space optimization - if dp[i] only depends on dp[i-1], use two variables instead of array (Fibonacci: O(n) → O(1) space). State compression - encode multiple dimensions into one using bitmask. Print solution - store parent pointers to reconstruct path, not just optimal value.`

export function DynamicProgrammingPage() {
  return (
    <TypePage
      type="Dynamic Programming" badge="dp" color="var(--accent-dp)"
      description="Solve complex problems by breaking into overlapping subproblems. Memoization vs tabulation."
      intro={dpIntro}
      tip={`"Count ways" or "min/max cost"? Almost always DP
Framework? (1) state (2) recurrence (3) base case (4) order
Quick memo? @lru_cache decorator (top-down), or build dp[] table (bottom-up)
1D vs 2D? Single sequence → 1D, two sequences or intervals → 2D`}
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
