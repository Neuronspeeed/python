import type { Method } from '../../types'

// Kadane's Algorithm + Knapsack Problems
export const dpKnapsackMethods: Method[] = [
  // Why & When
  { signature: 'Kadane\'s algorithm - when to use', description: 'Pattern: maximum/minimum subarray sum/product. O(n) single pass beats O(n²) brute force. Works because optimal subarray either includes current or starts fresh.', complexity: 'Concept', section: 'Why & When', example: `# KADANE'S ALGORITHM PATTERN
# Maximum subarray sum

def max_subarray(nums):
    current_sum = max_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        # Either extend or start new
        max_sum = max(max_sum, current_sum)
    return max_sum

# WHY IT WORKS:
# At each position, optimal is:
# - Start new subarray here (num)
# - Extend previous subarray (current_sum + num)
# Take max! No need to try all O(n²) subarrays.

# USE KADANE'S WHEN:
# ✓ Maximum/minimum subarray sum
# ✓ Maximum subarray product
# ✓ Best time to buy/sell stock (1 transaction)
# ✓ Circular array max sum (with modification)

# VARIATIONS:
# Max product: Track both max and min (negatives!)
# At least K elements: Use prefix sum + deque
# Circular: Max of (normal kadane, total - min subarray)

# PERFORMANCE:
# Kadane: O(n), single pass
# Brute force: O(n²), check all pairs
# For n=10,000:
# Kadane: 10k ops (~0.1ms)
# Brute: 100M ops (~10ms)`,
  },
  { signature: '0/1 Knapsack vs Unbounded - when to use which', description: '0/1: each item once. Unbounded: items unlimited. Coin change is unbounded knapsack. Similar DP, different iteration order.', complexity: 'Concept', section: 'Why & When', example: `# 0/1 KNAPSACK (each item used once)
def knapsack_01(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Don't take item i-1
            dp[i][w] = dp[i-1][w]
            # Take item i-1 (if fits)
            if w >= weights[i-1]:
                dp[i][w] = max(
                    dp[i][w],
                    dp[i-1][w - weights[i-1]] + values[i-1]
                )
                # ^^^ dp[i-1]: can't reuse item

    return dp[n][capacity]

# UNBOUNDED KNAPSACK (items unlimited)
def knapsack_unbounded(weights, values, capacity):
    dp = [0] * (capacity + 1)

    for w in range(1, capacity + 1):
        for i in range(len(weights)):
            if w >= weights[i]:
                dp[w] = max(
                    dp[w],
                    dp[w - weights[i]] + values[i]
                )
                # ^^^ dp[w-weight]: can reuse item

    return dp[capacity]

# WHEN TO USE:
# 0/1 Knapsack:
# - "Select items without replacement"
# - "Each item used at most once"
# - Subset sum (find subset summing to target)

# Unbounded Knapsack:
# - "Unlimited items of each type"
# - Coin change (min coins, count ways)
# - Rod cutting (max value)

# SPACE OPTIMIZATION:
# 0/1: Need 2D or reverse iteration
# Unbounded: 1D forward iteration works!

# Example: Coin Change
# coins = [1, 2, 5], amount = 11
# Unbounded (can reuse coins)
# dp[11] uses dp[10], dp[9], dp[6]
# Those might already use same coins!`,
  },

  // Kadane & Subarray
  { signature: 'Kadane\'s Algorithm', description: 'Maximum subarray sum in O(n). Track current and global max.', complexity: 'O(n)', section: 'Kadane & Subarray', example: `def max_subarray(nums):
    max_sum = curr_sum = nums[0]

    for num in nums[1:]:
        # Either extend current subarray or start new
        curr_sum = max(num, curr_sum + num)
        max_sum = max(max_sum, curr_sum)

    return max_sum

# Return indices too
def max_subarray_indices(nums):
    max_sum = curr_sum = nums[0]
    start = end = temp_start = 0

    for i in range(1, len(nums)):
        if nums[i] > curr_sum + nums[i]:
            curr_sum = nums[i]
            temp_start = i
        else:
            curr_sum += nums[i]

        if curr_sum > max_sum:
            max_sum = curr_sum
            start = temp_start
            end = i

    return max_sum, start, end

# Maximum circular subarray
def max_subarray_circular(nums):
    # Max is either in middle or wraps around
    # If wraps: total - min_subarray
    total = sum(nums)
    max_sum = min_sum = nums[0]
    curr_max = curr_min = nums[0]

    for num in nums[1:]:
        curr_max = max(num, curr_max + num)
        curr_min = min(num, curr_min + num)
        max_sum = max(max_sum, curr_max)
        min_sum = min(min_sum, curr_min)

    # If all negative, can't wrap
    if max_sum < 0:
        return max_sum
    return max(max_sum, total - min_sum)

# Example: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
# Output: 6 (subarray [4, -1, 2, 1])` },
  { signature: 'Maximum Product Subarray', description: 'Max product subarray. Track both max and min (negatives flip).', complexity: 'O(n)', section: 'Kadane & Subarray', example: `def max_product(nums):
    max_prod = min_prod = result = nums[0]

    for num in nums[1:]:
        # Negative can flip min to max
        if num < 0:
            max_prod, min_prod = min_prod, max_prod

        max_prod = max(num, max_prod * num)
        min_prod = min(num, min_prod * num)
        result = max(result, max_prod)

    return result

# Example: [2, 3, -2, 4]
# Output: 6 (subarray [2, 3])

# Example: [-2, 0, -1]
# Output: 0

# Example: [-2, 3, -4]
# Output: 24 (entire array)` },

  // Knapsack
  { signature: '0/1 Knapsack', description: 'Max value with weight limit. Each item used at most once.', complexity: 'O(n*W)', section: 'Knapsack', example: `def knapsack_01(weights, values, capacity):
    n = len(weights)

    # dp[i][w] = max value using items 0..i-1 with capacity w
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Don't take item i-1
            dp[i][w] = dp[i-1][w]
            # Take item i-1 if possible
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                              dp[i-1][w - weights[i-1]] + values[i-1])

    return dp[n][capacity]

# Space optimized (traverse backwards)
def knapsack_01_opt(weights, values, capacity):
    dp = [0] * (capacity + 1)

    for i in range(len(weights)):
        # Go backwards to avoid using same item twice
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[capacity]

# Example:
# weights = [2, 3, 4, 5], values = [3, 4, 5, 6], capacity = 5
# Output: 7 (items with weights 2 and 3)` },
  { signature: 'Unbounded Knapsack', description: 'Max value with unlimited items. Same item can be used multiple times.', complexity: 'O(n*W)', section: 'Knapsack', example: `def knapsack_unbounded(weights, values, capacity):
    dp = [0] * (capacity + 1)

    for w in range(1, capacity + 1):
        for i in range(len(weights)):
            if weights[i] <= w:
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[capacity]

# Alternative: iterate items first
def knapsack_unbounded_v2(weights, values, capacity):
    dp = [0] * (capacity + 1)

    for i in range(len(weights)):
        # Go forwards (unlike 0/1) to allow multiple uses
        for w in range(weights[i], capacity + 1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[capacity]

# This is also "Coin Change Max Value" problem` },
  { signature: 'Partition Equal Subset Sum', description: 'Can array be partitioned into two equal sum subsets? 0/1 knapsack variant.', complexity: 'O(n*sum)', section: 'Knapsack', example: `def can_partition(nums):
    total = sum(nums)

    # Must be even
    if total % 2 != 0:
        return False

    target = total // 2

    # dp[i] = can we make sum i?
    dp = [False] * (target + 1)
    dp[0] = True

    for num in nums:
        # Go backwards for 0/1 knapsack
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]

    return dp[target]

# Using set (sometimes faster)
def can_partition_set(nums):
    total = sum(nums)
    if total % 2 != 0:
        return False

    target = total // 2
    possible = {0}

    for num in nums:
        possible = possible | {s + num for s in possible if s + num <= target}
        if target in possible:
            return True

    return target in possible

# Example: [1, 5, 11, 5] -> True ([1, 5, 5] and [11])
# Example: [1, 2, 3, 5] -> False` },
]
