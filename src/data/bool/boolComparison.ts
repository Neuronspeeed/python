import type { Method } from '../../types'

export const boolComparison: Method[] = [
  { section: 'Comparison Operators', signature: '== != < > <= >=', description: 'Compare values: == (equal), != (not equal), < > <= >= (ordering). Returns True or False. Common mistake: = vs ==', complexity: 'O(1)', example: `# Equality
print(1 == 1)       # True
print(1 != 2)       # True
print("a" == "a")   # True
print("a" == "A")   # False (case-sensitive!)

# Ordering (works with numbers and strings)
print(3 > 5)        # False
print(3 <= 3)       # True
print("apple" < "banana")  # True (lexicographic)

# COMMON MISTAKE: = vs ==
x = 5        # Assignment (sets value)
x == 5       # Comparison (returns True/False)
# if x = 5:  # SyntaxError! Use == not =` },
  { section: 'Comparison Operators', signature: 'Chained comparisons', description: 'Python allows chained comparisons like a < b < c, equivalent to (a < b) and (b < c). More readable and efficient.', complexity: 'O(1)', example: `x = 5
print(1 < x < 10)     # True - cleaner than (1 < x) and (x < 10)
print(1 < x < 3)      # False
print(1 < x <= 5)     # True

# Multiple chains
a, b, c = 1, 2, 3
print(a < b < c)      # True
print(a < b == 2 < c)  # True

# More readable than:
print((1 < x) and (x < 10))  # Same but verbose` },
]
