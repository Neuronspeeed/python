import type { Method } from '../../../types'

export const itertoolsCombinatoricsMethods: Method[] = [
  { signature: 'permutations()', description: 'All orderings of elements. Order matters, no repetition. n! permutations.', complexity: 'O(n!)', section: 'Combinatorics', example: `from itertools import permutations

# All permutations of iterable
items = [1, 2, 3]
perms = list(permutations(items))
# [(1,2,3), (1,3,2), (2,1,3), (2,3,1), (3,1,2), (3,2,1)]
# 3! = 6 permutations

# Permutations of specific length
perms_2 = list(permutations(items, 2))
# [(1,2), (1,3), (2,1), (2,3), (3,1), (3,2)]
# P(3,2) = 6

# String permutations
word = "abc"
for p in permutations(word):
    print(''.join(p))  # abc, acb, bac, bca, cab, cba

# INTERVIEW: Generate all permutations
def all_permutations(nums):
    return [list(p) for p in permutations(nums)]

# INTERVIEW: Next Permutation (don't use itertools)
def next_permutation(nums):
    """Modify nums in-place to next lexicographic permutation."""
    i = len(nums) - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1
    if i >= 0:
        j = len(nums) - 1
        while nums[j] <= nums[i]:
            j -= 1
        nums[i], nums[j] = nums[j], nums[i]
    nums[i + 1:] = reversed(nums[i + 1:])` },

  { signature: 'combinations()', description: 'All subsets of specific size. Order does not matter, no repetition. C(n,r) combinations.', complexity: 'O(C(n,r))', section: 'Combinatorics', example: `from itertools import combinations

# Choose r items from n (order doesn't matter)
items = [1, 2, 3, 4]
combs = list(combinations(items, 2))
# [(1,2), (1,3), (1,4), (2,3), (2,4), (3,4)]
# C(4,2) = 6

# All subsets of size 3
combs_3 = list(combinations(items, 3))
# [(1,2,3), (1,2,4), (1,3,4), (2,3,4)]

# INTERVIEW: Generate all subsets
def all_subsets(nums):
    result = []
    for r in range(len(nums) + 1):
        result.extend(combinations(nums, r))
    return result

# INTERVIEW: Combination Sum (with size constraint)
def combination_sum(candidates, target, k):
    """Find combinations of k numbers that sum to target."""
    result = []
    for combo in combinations(candidates, k):
        if sum(combo) == target:
            result.append(list(combo))
    return result

# Practical: Find pairs with sum
def find_pairs_with_sum(nums, target):
    return [(a, b) for a, b in combinations(nums, 2) if a + b == target]

print(find_pairs_with_sum([1, 2, 3, 4, 5], 6))
# [(1, 5), (2, 4)]` },

  { signature: 'combinations_with_replacement()', description: 'Combinations allowing same element multiple times. For "bags" or multisets.', complexity: 'O(C(n+r-1, r))', section: 'Combinatorics', example: `from itertools import combinations_with_replacement

# Allow repeated elements
items = [1, 2, 3]
combs = list(combinations_with_replacement(items, 2))
# [(1,1), (1,2), (1,3), (2,2), (2,3), (3,3)]

# Dice rolls (order doesn't matter)
dice = [1, 2, 3, 4, 5, 6]
two_dice = list(combinations_with_replacement(dice, 2))
# All unique sums when rolling 2 dice

# INTERVIEW: Coin combinations
# How many ways to make amount with coins (unordered)?
def coin_combinations(coins, amount, num_coins):
    result = []
    for combo in combinations_with_replacement(coins, num_coins):
        if sum(combo) == amount:
            result.append(combo)
    return result

print(coin_combinations([1, 5, 10], 11, 2))
# [(1, 10)]

# Stars and bars: distribute n items into k bins
# combinations_with_replacement(range(k), n) gives distributions` },

  { signature: 'product()', description: 'Cartesian product of iterables. Equivalent to nested for loops.', complexity: 'O(n^k)', section: 'Combinatorics', example: `from itertools import product

# Cartesian product of two lists
colors = ['red', 'blue']
sizes = ['S', 'M', 'L']
variants = list(product(colors, sizes))
# [('red','S'), ('red','M'), ('red','L'),
#  ('blue','S'), ('blue','M'), ('blue','L')]

# Multiple iterables
a, b, c = [1, 2], [3, 4], [5, 6]
for x, y, z in product(a, b, c):
    print(x, y, z)  # 2 * 2 * 2 = 8 combinations

# Repeat parameter - same iterable multiple times
binary = list(product([0, 1], repeat=3))
# All 3-bit binary numbers: (0,0,0) to (1,1,1)

# INTERVIEW: Generate all passwords
def generate_passwords(chars, length):
    for combo in product(chars, repeat=length):
        yield ''.join(combo)

# Practical: Grid coordinates
rows = range(3)
cols = range(4)
for r, c in product(rows, cols):
    print(f"Cell ({r}, {c})")

# Replace nested loops
# Instead of:
# for i in range(n):
#     for j in range(m):
#         for k in range(p):
# Use:
# for i, j, k in product(range(n), range(m), range(p)):` },
]
