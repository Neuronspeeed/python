import type { Method } from '../../types'

// Sliding Window + Prefix Sum + String Building
export const slidingWindowMethods: Method[] = [
  // Sliding Window
  { signature: 'Sliding Window Pattern', description: 'Window expands right, contracts left when condition breaks. O(n) for subarray/substring problems.', complexity: 'O(n)', section: 'Variable Window', example: `# SLIDING WINDOW TEMPLATE
def fn(arr):
    left = 0
    window = {}  # or other state
    ans = 0

    for right in range(len(arr)):
        # Add arr[right] to window

        while WINDOW_INVALID:  # Contract from left
            # Remove arr[left] from window
            left += 1

        # Update ans (window is now valid)
        ans = max(ans, right - left + 1)

    return ans

# WHEN TO USE:
# - Contiguous subarray/substring
# - "Find longest/shortest with condition"
    # - "Find number of subarrays with..."` },
  { signature: 'Fixed Size Window', description: 'Window size is fixed. Slide by adding right and removing left simultaneously.', complexity: 'O(n)', section: 'Variable Window', example: `# Max sum of k consecutive elements
def max_sum_k(arr, k):
    if len(arr) < k:
        return 0

    # Initial window
    window_sum = sum(arr[:k])
    max_sum = window_sum

    # Slide window
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]  # Add right, remove left
        max_sum = max(max_sum, window_sum)

    return max_sum

# Check if array contains duplicate within k distance
def contains_nearby_duplicate(nums, k):
    window = set()
    for i, num in enumerate(nums):
        if num in window:
            return True
        window.add(num)
        if i >= k:
            window.remove(nums[i - k])
    return False` },
  { signature: 'Variable Size Window', description: 'Window grows/shrinks based on condition. Track state as window changes.', complexity: 'O(n)', section: 'Variable Window', example: `# Longest Substring Without Repeating Characters
def length_of_longest_substring(s):
    char_set = set()
    left = 0
    max_len = 0

    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)

    return max_len

# Minimum Size Subarray Sum >= target
def min_subarray_len(target, nums):
    left = 0
    curr_sum = 0
    min_len = float('inf')

    for right in range(len(nums)):
        curr_sum += nums[right]

        while curr_sum >= target:
            min_len = min(min_len, right - left + 1)
            curr_sum -= nums[left]
            left += 1

    return min_len if min_len != float('inf') else 0` },
  { signature: 'Number of Subarrays (Exact Criteria)', description: 'Count subarrays where condition exactly equals k. Use "at most k" minus "at most k-1" trick.', complexity: 'O(n)', section: 'Prefix Sum', example: `# Subarrays with exactly k distinct =
# at_most(k) - at_most(k-1)

def subarrays_with_k_distinct(nums, k):
    def at_most(k):
        count = {}
        left = 0
        result = 0

        for right in range(len(nums)):
            count[nums[right]] = count.get(nums[right], 0) + 1

            while len(count) > k:
                count[nums[left]] -= 1
                if count[nums[left]] == 0:
                    del count[nums[left]]
                left += 1

            result += right - left + 1

        return result

    return at_most(k) - at_most(k - 1)

# WHY right - left + 1?
# For window [left, right], count all subarrays ending at right:
# [left..right], [left+1..right], ..., [right]
# That's (right - left + 1) subarrays` },

  // Prefix Sum
  { signature: 'Prefix Sum Pattern', description: 'Precompute cumulative sums. Query any range sum in O(1) after O(n) preprocessing.', complexity: 'O(n) build, O(1) query', section: 'Prefix Sum', example: `# BUILD PREFIX SUM
def build_prefix(arr):
    prefix = [0]
    for num in arr:
        prefix.append(prefix[-1] + num)
    return prefix

# QUERY RANGE SUM [i, j] inclusive
def range_sum(prefix, i, j):
    return prefix[j + 1] - prefix[i]

# Example:
# arr =    [1, 2, 3, 4, 5]
# prefix = [0, 1, 3, 6, 10, 15]
# sum(1,3) = prefix[4] - prefix[1] = 10 - 1 = 9

# TEMPLATE
def fn(arr):
    prefix = [0]
    for num in arr:
        prefix.append(prefix[-1] + num)

    ans = 0
    for i in range(len(arr)):
        for j in range(i, len(arr)):
            # Sum from i to j
            subarray_sum = prefix[j + 1] - prefix[i]
            # Do something with subarray_sum
    return ans` },
  { signature: 'Subarray Sum Equals K', description: 'Use hash map to find prefix sums that differ by k. Count subarrays in O(n).', complexity: 'O(n)', section: 'Prefix Sum', example: `def subarray_sum(nums, k):
    # prefix[j] - prefix[i] = k means sum(i, j-1) = k
    # For each prefix[j], count how many prefix[i] = prefix[j] - k

    count = {0: 1}  # Empty prefix has sum 0
    curr_sum = 0
    result = 0

    for num in nums:
        curr_sum += num
        # How many previous prefixes give us sum = k?
        if curr_sum - k in count:
            result += count[curr_sum - k]
        count[curr_sum] = count.get(curr_sum, 0) + 1

    return result

# Example: nums = [1, 2, 3], k = 3
# prefix sums: 0, 1, 3, 6
# At sum=3: check if 3-3=0 exists -> Yes (1 time)
# At sum=6: check if 6-3=3 exists -> Yes (1 time)
# Answer: 2 subarrays ([1,2] and [3])` },

  // String Building
  { signature: 'Efficient String Building', description: 'Strings are immutable. Use list + join() instead of += concatenation in loops.', complexity: 'O(n) vs O(n²)', section: 'Prefix Sum', example: `# BAD - O(n²) due to string immutability
def build_string_bad(chars):
    result = ""
    for c in chars:
        result += c  # Creates new string each time!
    return result

# GOOD - O(n) using list
def build_string_good(chars):
    result = []
    for c in chars:
        result.append(c)  # O(1) amortized
    return "".join(result)  # O(n) once

# WHY += IS SLOW:
# "a" + "b" creates new string "ab"
# "ab" + "c" creates new string "abc"
# Each step copies all previous characters!
# Total: 1 + 2 + 3 + ... + n = O(n²)

# COMMON PATTERNS:
# Transform chars
s = "hello"
result = "".join(c.upper() for c in s)

# Filter chars
result = "".join(c for c in s if c.isalpha())

# Reverse string
result = "".join(reversed(s))  # or s[::-1]` },
]
