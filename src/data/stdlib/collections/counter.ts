import type { Method } from '../../../types'

export const collectionsCounterMethods: Method[] = [
  { signature: 'Counter Arithmetic', description: 'Counter supports +, -, &, | operations. Powerful for multiset operations.', complexity: 'O(n)', section: 'Counter', example: `from collections import Counter

# Basic counting
words = ['a', 'b', 'a', 'c', 'b', 'a']
count = Counter(words)
# Counter({'a': 3, 'b': 2, 'c': 1})

# Addition: combine counts
c1 = Counter(a=3, b=1)
c2 = Counter(a=1, b=2)
print(c1 + c2)  # Counter({'a': 4, 'b': 3})

# Subtraction: remove counts (keeps positive only)
print(c1 - c2)  # Counter({'a': 2})

# Intersection (minimum of each)
print(c1 & c2)  # Counter({'a': 1, 'b': 1})

# Union (maximum of each)
print(c1 | c2)  # Counter({'a': 3, 'b': 2})

# INTERVIEW: Check if anagrams
def is_anagram(s1, s2):
    return Counter(s1) == Counter(s2)

print(is_anagram("listen", "silent"))  # True

# INTERVIEW: Minimum window containing all chars
def min_window(s, t):
    need = Counter(t)
    have = Counter()
    # ... window sliding logic
    pass` },

  { signature: 'Counter.most_common()', description: 'Get n most frequent elements. Returns list of (element, count) tuples.', complexity: 'O(n log k)', section: 'Counter', example: `from collections import Counter

words = "the quick brown fox jumps over the lazy dog the fox".split()
count = Counter(words)

# Top 3 most common
print(count.most_common(3))
# [('the', 3), ('fox', 2), ('quick', 1)]

# All elements sorted by frequency
print(count.most_common())
# [('the', 3), ('fox', 2), ('quick', 1), ...]

# Least common (reverse)
print(count.most_common()[-3:])

# INTERVIEW: Top K Frequent Elements
def top_k_frequent(nums, k):
    return [item for item, count in Counter(nums).most_common(k)]

print(top_k_frequent([1,1,1,2,2,3], 2))  # [1, 2]

# INTERVIEW: Top K Frequent Words
def top_k_words(words, k):
    count = Counter(words)
    # Sort by frequency (desc), then alphabetically
    return sorted(count.keys(),
                  key=lambda w: (-count[w], w))[:k]

# Practical: Find majority element
def majority_element(nums):
    count = Counter(nums)
    return count.most_common(1)[0][0]` },

  { signature: 'Counter.elements()', description: 'Iterator over elements repeating each as many times as its count.', complexity: 'O(n)', section: 'Counter', example: `from collections import Counter

c = Counter(a=3, b=2, c=1)

# Get elements with repetition
elements = list(c.elements())
# ['a', 'a', 'a', 'b', 'b', 'c']

# Note: order may vary, negative counts ignored
c2 = Counter(a=2, b=-1)
print(list(c2.elements()))  # ['a', 'a']

# Practical: Reconstruct sorted list
nums = [3, 1, 4, 1, 5, 9, 2, 6]
count = Counter(nums)
sorted_nums = sorted(count.elements())
# [1, 1, 2, 3, 4, 5, 6, 9]

# total() - sum of all counts (Python 3.10+)
c = Counter(a=10, b=5, c=7)
print(c.total())  # 22

# subtract() - in-place subtraction
c1 = Counter(a=4, b=2)
c1.subtract(Counter(a=1, b=1))
print(c1)  # Counter({'a': 3, 'b': 1})

# update() - add counts
c1.update(Counter(a=1, c=5))
print(c1)  # Counter({'c': 5, 'a': 4, 'b': 1})` },
]
