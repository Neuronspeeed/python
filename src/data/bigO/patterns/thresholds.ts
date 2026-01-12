import type { Method } from '../../../types'

export const thresholdsMethods: Method[] = [
  { signature: 'When Big O matters - real-world thresholds', description: 'n < 100: don\'t care. n < 10,000: O(n²) ok. n < 1M: need O(n log n). n > 1M: need O(n). Hidden constants matter more than you think.', complexity: 'Concept', section: 'Why & When', example: `# BIG O IN PRACTICE - Real performance impact
import time

# SMALL INPUT (n < 100) - Algorithm doesn't matter
arr = list(range(100))
# O(n²) bubble sort: 0.001 seconds
# O(n log n) merge sort: 0.0005 seconds
# Difference: negligible! Use simpler code.

# MEDIUM INPUT (n = 10,000) - O(n²) becomes painful
arr = list(range(10000))
# O(n²): 5 seconds (100M operations)
# O(n log n): 0.01 seconds (130K operations)
# 500x difference! Use efficient algorithm.

# LARGE INPUT (n = 1,000,000) - Need O(n) or O(n log n)
arr = list(range(1000000))
# O(n²): days (won't finish!)
# O(n log n): 1 second
# O(n): 0.1 second

# REAL-WORLD THRESHOLDS:
# n < 10: Any algorithm works
# n < 100: O(n²) acceptable (insertion sort often fastest!)
# n < 10,000: O(n²) tolerable (<1 sec)
# n < 1,000,000: Need O(n log n) minimum
# n > 1,000,000: Prefer O(n), avoid O(n log n) if possible
# n > 100,000,000: Must be O(n) or better

# HIDDEN CONSTANTS MATTER:
# Fast O(n²): 500 * n²
# Slow O(n log n): 10000 * n log n
# At n = 100:
# O(n²): 500 * 10,000 = 5M ops
# O(n log n): 10000 * 664 = 6.6M ops
# O(n²) wins! (Better constant)

# When Big O doesn't matter:
# - Prototype/POC code
# - Known small input
# - One-time scripts
# - Clarity > performance

# When Big O critical:
# - Production code
# - User-facing features
# - Growing datasets
# - Real-time systems

# Rule: Optimize when:
# 1. Performance is measured problem
# 2. Input size is known large
# 3. Code runs frequently
# Otherwise, write clear code first!`,
  },
  { signature: 'Choosing between complexities - decision framework', description: 'O(1) impossible? Try O(log n) with sorting/BST. O(n) too slow? Try O(n) with hash table. O(n²) unavoidable? Limit input size.', complexity: 'Concept', section: 'Why & When', example: `# ALGORITHM DECISION TREE

# GOAL: Find if pair sums to target
arr = [2, 7, 11, 15]
target = 9

# APPROACH 1: O(n²) - Brute force
def two_sum_n2(arr, target):
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] + arr[j] == target:
                return [i, j]
# When: n < 1000, simplest to understand

# APPROACH 2: O(n log n) - Sort + two pointers
def two_sum_nlogn(arr, target):
    sorted_arr = sorted(enumerate(arr), key=lambda x: x[1])
    left, right = 0, len(arr) - 1
    while left < right:
        s = sorted_arr[left][1] + sorted_arr[right][1]
        if s == target:
            return [sorted_arr[left][0], sorted_arr[right][0]]
        elif s < target:
            left += 1
        else:
            right -= 1
# When: Input already sorted, or sorting has other benefits

# APPROACH 3: O(n) - Hash table (BEST!)
def two_sum_n(arr, target):
    seen = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
# When: n > 1000, space available

# COMPLEXITY UPGRADE PATH:
# 1. Start with O(n²) brute force (working code!)
# 2. Profile - is it actually slow?
# 3. If yes, optimize to O(n log n) with sorting
# 4. Still slow? Try O(n) with hash table
# 5. Still slow? Problem may be O(n) optimal

# COMMON OPTIMIZATIONS:
# O(n²) → O(n log n): Sort first
# O(n²) → O(n): Use hash table
# O(n log n) → O(n): Use counting/bucket sort
# O(n) → O(1): Precompute or use math

# Decision factors:
# 1. Input size (n)
# 2. Memory available
# 3. Code complexity budget
# 4. Performance requirements
# 5. Maintainability

# Example: Checking duplicates
# Small n (<1000): any works, pick simplest
# Medium n (<100k): sorted() then scan O(n log n)
# Large n (>100k): set() O(n) - 10x faster!

# Golden rule:
# Make it work → Make it right → Make it fast`,
  },
]
