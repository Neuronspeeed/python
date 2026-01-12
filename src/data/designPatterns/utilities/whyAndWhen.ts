import type { Method } from '../../../types'

export const whyAndWhenMethods: Method[] = [
  { signature: 'Why design utilities?', description: 'Common design problems: iterators, rate limiters, random structures. Test understanding of protocols and system design.', complexity: 'Concept', section: 'Why & When', example: `# DESIGN UTILITIES = Practical system components
# Common: Iterator, Rate Limiter, Browser History, Random Insert/Delete

# ITERATOR PATTERN:
# Why: Python's iteration protocol (__iter__, __next__)
# When: Custom traversal logic needed
# Example: Flatten nested list lazily

# Why lazy iteration?
# Pre-flatten: all in memory at once (O(n) space)
# Lazy: one element at a time (O(1) space)

# RATE LIMITER PATTERN:
# Why: Prevent abuse, ensure fair usage
# When: APIs, login attempts, request throttling
# Approaches:
# - Sliding Window: track timestamps in deque
# - Token Bucket: refill tokens at rate
# - Fixed Window: reset count every interval

# BROWSER HISTORY PATTERN:
# Why: Undo/redo, forward/back navigation
# When: State management with history
# Implementation: Two stacks (back + forward)

# RANDOM INSERT/DELETE/GETRANDOM:
# Why: O(1) operations for all three
# When: Sampling, randomized algorithms
# Implementation: HashMap + Array
# - Array: O(1) random access by index
# - HashMap: O(1) lookup by value

# INTERVIEW PATTERNS:
# "Flatten nested iterator" → Stack-based lazy eval
# "Rate limiter" → Sliding window with deque
# "Browser history" → Two stacks
# "getRandom O(1)" → HashMap + Array combo` },

  { signature: 'Iterator protocol explained', description: 'Python iteration: __iter__ returns iterator, __next__ yields values, StopIteration signals end.', complexity: 'Concept', section: 'Why & When', example: `# PYTHON ITERATOR PROTOCOL

# Three components:
# 1. __iter__() → returns iterator object
# 2. __next__() → returns next value
# 3. StopIteration → signals exhaustion

# SIMPLE EXAMPLE:
class CountDown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self  # Iterator is itself

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

# Usage:
for num in CountDown(3):
    print(num)  # 3, 2, 1

# WHY __iter__ AND __next__ SEPARATE?
# - Separation of concerns
# - __iter__ can return different iterator types
# - Allows multiple simultaneous iterations

# BUILT-IN USES PROTOCOL:
# for loop calls: iter(obj) → obj.__iter__()
# Then repeatedly: next(iterator) → iterator.__next__()
# Until: StopIteration caught → loop ends

# INTERVIEW TIP:
# If asked "implement iterator":
# 1. __init__ stores state
# 2. __iter__ returns self
# 3. __next__ yields and updates state
# 4. Raise StopIteration when done

# LAZY VS EAGER:
# Lazy (generator/iterator): yield one at a time
# Eager (list): compute all upfront
# Choose lazy for large/infinite sequences` },
]
