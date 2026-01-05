import type { Method } from '../../types'

// permutations, combinations, product, accumulate, groupby, chain, islice, etc.
export const stdlibItertoolsMethods: Method[] = [
  // Why & When
  { signature: 'Why itertools?', description: 'Memory-efficient iterator algebra. Use when: combinatorics, infinite sequences, lazy evaluation, iterator chaining.', complexity: 'Concept', section: 'Why & When', example: `# ITERTOOLS = Iterator building blocks
# Core tools: permutations, combinations, product, chain, groupby

# USE CASES:
# 1. COMBINATORICS - permutations, combinations, cartesian product
# 2. INFINITE ITERATORS - count, cycle, repeat
# 3. TERMINATING ITERATORS - accumulate, chain, compress, groupby
# 4. LAZY EVALUATION - process data without loading into memory

# WHY itertools BEATS MANUAL LOOPS:
# Manual nested loops (verbose, O(n!) space)
def get_permutations(items):
    result = []
    def backtrack(path, remaining):
        if not remaining:
            result.append(path[:])
            return
        for i, item in enumerate(remaining):
            backtrack(path + [item], remaining[:i] + remaining[i+1:])
    backtrack([], items)
    return result

# itertools (one line, O(1) space per iteration)
from itertools import permutations
result = list(permutations(items))

# INTERVIEW PATTERNS:
# - All permutations: permutations(arr)
# - All combinations: combinations(arr, k)
# - Cartesian product: product(arr1, arr2)
# - Running sum: accumulate(arr)
# - Group consecutive: groupby(arr)

# WHEN TO USE:
# - Need all permutations/combinations
# - Cartesian product of multiple lists
# - Infinite sequences (count for IDs)
# - Lazy processing of large datasets
# - Iterator chaining/flattening

# WHEN NOT TO USE:
# - Need specific permutation (use algorithm)
# - Result must be random (itertools is deterministic)
# - Need to modify elements during iteration` },

  { signature: 'itertools vs manual loops', description: 'Built-in combinatorics are faster and cleaner. Use itertools unless you need custom logic.', complexity: 'Concept', section: 'Why & When', example: `# COMPARISON: itertools vs manual

# 1. PERMUTATIONS
# Manual (recursive backtracking - 15+ lines):
def permute(nums):
    result = []
    def backtrack(path, remaining):
        if not remaining:
            result.append(path[:])
            return
        for i in range(len(remaining)):
            backtrack(
                path + [remaining[i]],
                remaining[:i] + remaining[i+1:]
            )
    backtrack([], nums)
    return result

# itertools (one line):
from itertools import permutations
result = [list(p) for p in permutations(nums)]

# 2. COMBINATIONS
# Manual (complex recursion):
def combine(n, k):
    result = []
    def backtrack(start, path):
        if len(path) == k:
            result.append(path[:])
            return
        for i in range(start, n + 1):
            backtrack(i + 1, path + [i])
    backtrack(1, [])
    return result

# itertools (one line):
from itertools import combinations
result = [list(c) for c in combinations(range(1, n+1), k)]

# 3. CARTESIAN PRODUCT
# Manual (nested loops):
result = []
for a in list1:
    for b in list2:
        for c in list3:
            result.append((a, b, c))

# itertools (one line):
from itertools import product
result = list(product(list1, list2, list3))

# PERFORMANCE:
# itertools is implemented in C - much faster!
# Memory: itertools yields one at a time (lazy)
# Manual: often builds full list in memory

# INTERVIEW TIP:
# Know when interviewer wants algorithm vs library
# "Implement permutations" → write backtracking
# "Generate all permutations" → use itertools` },

  // Combinatorics
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

  // Accumulation
  { signature: 'accumulate()', description: 'Running totals or cumulative results. Like reduce but yields intermediate values.', complexity: 'O(n)', section: 'Accumulation', example: `from itertools import accumulate
import operator

# Running sum (prefix sum)
nums = [1, 2, 3, 4, 5]
prefix_sum = list(accumulate(nums))
# [1, 3, 6, 10, 15]

# Running product
prefix_product = list(accumulate(nums, operator.mul))
# [1, 2, 6, 24, 120]

# Running maximum
data = [3, 1, 4, 1, 5, 9, 2, 6]
running_max = list(accumulate(data, max))
# [3, 3, 4, 4, 5, 9, 9, 9]

# Running minimum
running_min = list(accumulate(data, min))
# [3, 1, 1, 1, 1, 1, 1, 1]

# Custom function
def concat(a, b):
    return a + [b]
nested = list(accumulate([1, 2, 3], concat, initial=[]))
# [[], [1], [1, 2], [1, 2, 3]]

# INTERVIEW: Range sum queries with prefix sum
class RangeSumQuery:
    def __init__(self, nums):
        self.prefix = [0] + list(accumulate(nums))

    def sum_range(self, left, right):
        return self.prefix[right + 1] - self.prefix[left]

# Example: [1, 2, 3, 4]
# prefix: [0, 1, 3, 6, 10]
# sum(1, 3) = prefix[4] - prefix[1] = 10 - 1 = 9` },

  // Grouping
  { signature: 'groupby()', description: 'Group consecutive elements by key. Data MUST be sorted by the same key first!', complexity: 'O(n)', section: 'Grouping', example: `from itertools import groupby

# Group consecutive identical elements
data = [1, 1, 2, 2, 2, 3, 1, 1]
for key, group in groupby(data):
    print(key, list(group))
# 1 [1, 1]
# 2 [2, 2, 2]
# 3 [3]
# 1 [1, 1]  # Note: not merged with first 1s!

# MUST SORT FIRST for logical grouping
data = [1, 1, 2, 2, 2, 3, 1, 1]
data.sort()  # [1, 1, 1, 1, 2, 2, 2, 3]
for key, group in groupby(data):
    print(key, list(group))
# 1 [1, 1, 1, 1]
# 2 [2, 2, 2]
# 3 [3]

# Group by key function
words = ['apple', 'ant', 'banana', 'bee', 'cherry']
words.sort(key=lambda x: x[0])  # Sort by first letter first!
for letter, group in groupby(words, key=lambda x: x[0]):
    print(letter, list(group))
# a ['apple', 'ant']
# b ['banana', 'bee']
# c ['cherry']

# INTERVIEW: Compress string
def compress(s):
    """Compress "aaabbc" -> "a3b2c1" """
    return ''.join(f"{c}{len(list(g))}" for c, g in groupby(s))

print(compress("aaabbcc"))  # "a3b2c2"` },

  // Chaining
  { signature: 'chain()', description: 'Flatten one level of nesting. Iterate over multiple iterables as one.', complexity: 'O(n)', section: 'Chaining', example: `from itertools import chain

# Chain multiple iterables
a = [1, 2, 3]
b = [4, 5]
c = [6, 7, 8, 9]

combined = list(chain(a, b, c))
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# More efficient than a + b + c (no intermediate lists)

# Chain string iterables
words = chain("hello", "world")
print(list(words))  # ['h','e','l','l','o','w','o','r','l','d']

# Flatten list of lists
nested = [[1, 2], [3, 4, 5], [6]]
flat = list(chain.from_iterable(nested))
# [1, 2, 3, 4, 5, 6]

# INTERVIEW: Flatten nested lists
def flatten(nested):
    return list(chain.from_iterable(nested))

# Practical: Merge sorted iterators
import heapq
def merge_sorted(*iterables):
    return heapq.merge(*iterables)
    # Or: sorted(chain(*iterables))

# Combine generators
def gen1():
    yield 1
    yield 2

def gen2():
    yield 3
    yield 4

for x in chain(gen1(), gen2()):
    print(x)  # 1, 2, 3, 4` },

  // Slicing & Filtering
  { signature: 'islice()', description: 'Slice iterator without creating list. Memory efficient for large iterables.', complexity: 'O(stop)', section: 'Slicing', example: `from itertools import islice

# Slice an iterator
nums = range(1000000)  # Very large

# Get first 5 elements
first_5 = list(islice(nums, 5))
# [0, 1, 2, 3, 4]

# Get elements from index 10 to 20
middle = list(islice(nums, 10, 20))
# [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

# Every 3rd element from first 30
every_3rd = list(islice(nums, 0, 30, 3))
# [0, 3, 6, 9, 12, 15, 18, 21, 24, 27]

# Skip first n elements
from itertools import islice
def skip(iterable, n):
    return islice(iterable, n, None)

skipped = list(skip(range(10), 3))
# [3, 4, 5, 6, 7, 8, 9]

# PRACTICAL: Read first n lines of huge file
def head(filename, n=10):
    with open(filename) as f:
        return list(islice(f, n))

# Get nth element of iterator
def nth(iterable, n, default=None):
    return next(islice(iterable, n, None), default)

print(nth(range(100), 42))  # 42` },

  { signature: 'takewhile() / dropwhile()', description: 'Take/drop elements while predicate is True. Stops at first False.', complexity: 'O(n)', section: 'Slicing', example: `from itertools import takewhile, dropwhile

# Take while condition is True
nums = [1, 3, 5, 7, 4, 2, 6, 8]

small = list(takewhile(lambda x: x < 6, nums))
# [1, 3, 5]  # Stops at 7 (first >= 6)

# Drop while condition is True (then take rest)
large = list(dropwhile(lambda x: x < 6, nums))
# [7, 4, 2, 6, 8]  # Starts at 7, takes everything after

# IMPORTANT: Only checks prefix, not whole list!
# takewhile stops at FIRST failure
# dropwhile starts at FIRST failure

# Practical: Skip header lines
lines = ["# Comment", "# Another", "data1", "data2"]
data = list(dropwhile(lambda x: x.startswith("#"), lines))
# ["data1", "data2"]

# Practical: Take valid entries
entries = [5, 10, 15, -1, 20, 25]  # -1 is sentinel
valid = list(takewhile(lambda x: x >= 0, entries))
# [5, 10, 15]` },

  // Infinite & Cycling
  { signature: 'cycle() / repeat()', description: 'Infinite iterators. cycle() loops forever, repeat() yields same value.', complexity: 'O(1) per item', section: 'Infinite', example: `from itertools import cycle, repeat, islice

# Cycle infinitely through iterable
colors = cycle(['red', 'green', 'blue'])
print([next(colors) for _ in range(7)])
# ['red', 'green', 'blue', 'red', 'green', 'blue', 'red']

# Practical: Round-robin assignment
tasks = ['A', 'B', 'C', 'D', 'E']
workers = cycle(['Alice', 'Bob', 'Charlie'])
assignments = list(zip(tasks, workers))
# [('A', 'Alice'), ('B', 'Bob'), ('C', 'Charlie'),
#  ('D', 'Alice'), ('E', 'Bob')]

# Repeat value (optionally n times)
threes = list(repeat(3, 5))
# [3, 3, 3, 3, 3]

# Repeat forever (use islice to limit)
infinite_zeros = repeat(0)
first_10 = list(islice(infinite_zeros, 10))
# [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

# Practical: Initialize with repeat
from itertools import repeat
import operator
# Square each number
nums = [1, 2, 3, 4, 5]
squares = list(map(pow, nums, repeat(2)))
# [1, 4, 9, 16, 25]

# count() - infinite counter
from itertools import count
counter = count(start=10, step=2)
print([next(counter) for _ in range(5)])
# [10, 12, 14, 16, 18]` },

  { signature: 'starmap() / zip_longest()', description: 'Apply function to unpacked tuples. Zip with fill value for unequal lengths.', complexity: 'O(n)', section: 'Infinite', example: `from itertools import starmap, zip_longest

# starmap: apply function to unpacked arguments
pairs = [(2, 5), (3, 2), (10, 3)]
results = list(starmap(pow, pairs))
# [32, 9, 1000]  # pow(2,5), pow(3,2), pow(10,3)

# Compare to map with multiple iterables
bases = [2, 3, 10]
exps = [5, 2, 3]
results = list(map(pow, bases, exps))
# Same: [32, 9, 1000]

# Practical: apply function to pre-paired arguments
def point_distance(x1, y1, x2, y2):
    return ((x2-x1)**2 + (y2-y1)**2) ** 0.5

segments = [(0, 0, 3, 4), (1, 1, 4, 5)]
distances = list(starmap(point_distance, segments))
# [5.0, 5.0]

# zip_longest: zip with fill value
a = [1, 2, 3]
b = [4, 5]
zipped = list(zip_longest(a, b, fillvalue=0))
# [(1, 4), (2, 5), (3, 0)]

# Practical: merge columns with different lengths
col1 = ['A', 'B', 'C']
col2 = [1, 2]
col3 = ['x', 'y', 'z', 'w']
merged = list(zip_longest(col1, col2, col3, fillvalue='-'))
# [('A', 1, 'x'), ('B', 2, 'y'), ('C', '-', 'z'), ('-', '-', 'w')]` },
]
