export const dictIntro = `Use Dicts When You Need O(1) Lookups
Hash tables provide instant O(1) key-value lookups. The classic interview optimization: convert nested O(n²) loops to single O(n) pass with a dict. Checking \`if key in dict\` is O(1) vs \`if x in list\` which is O(n). Keys must be hashable (strings, numbers, tuples OK; lists, dicts, sets NOT allowed). Ordered since Python 3.7 (insertion order maintained).

\`\`\`python
# TWO SUM: Classic O(n²) to O(n) optimization
# BAD: Nested loops check all pairs
def two_sum_slow(nums, target):
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]  # O(n²)

# GOOD: Dict tracks what we've seen
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        if target - num in seen:  # O(1) lookup
            return [seen[target - num], i]
        seen[num] = i  # O(1) insert
# O(n) total - single pass

# HASHABLE KEYS RULE:
d = {1: "int", "key": "str", (1, 2): "tuple"}  # OK
d = {[1, 2]: "list"}  # TypeError - lists are mutable
\`\`\`python
---
Dict vs DefaultDict vs Counter
Regular dict for general key-value storage. DefaultDict when missing keys should auto-create with default value. Counter for frequency counting with built-in operations. Each solves common patterns more elegantly.

\`\`\`python
# REGULAR DICT:
freq = {}
for x in [1, 2, 2, 3]:
    freq[x] = freq.get(x, 0) + 1

# DEFAULTDICT:
from collections import defaultdict
freq = defaultdict(int)
for x in [1, 2, 2, 3]:
    freq[x] += 1  # Auto-creates 0

# COUNTER:
from collections import Counter
freq = Counter([1, 2, 2, 3])
freq.most_common(2)  # → [(2, 2), (3, 1)]

# GROUPING with defaultdict:
groups = defaultdict(list)
for word in ["cat", "dog", "car"]:
    groups[word[0]].append(word)
# → {'c': ['cat', 'car'], 'd': ['dog']}
\`\`\`python
---
Master These Patterns
Two Sum with "seen" dict. Frequency counting with Counter. Grouping with defaultdict(list). Memoization caches results. These four patterns solve most dict interview problems.

\`\`\`python
# PATTERN 1: Two Sum
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        if target - num in seen:
            return [seen[target - num], i]
        seen[num] = i

# PATTERN 2: Frequency
from collections import Counter
def first_unique(s):
    freq = Counter(s)
    for i, char in enumerate(s):
        if freq[char] == 1:
            return i
    return -1

# PATTERN 3: Grouping - Anagrams
from collections import defaultdict
def group_anagrams(words):
    groups = defaultdict(list)
    for word in words:
        key = "".join(sorted(word))
        groups[key].append(word)
    return list(groups.values())

# PATTERN 4: Memoization
memo = {}
def fib(n):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]
\`\`\``
