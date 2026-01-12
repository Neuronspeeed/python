import type { Method } from '../../types'

export const floatMathRounding: Method[] = [
  { section: 'Math Module - Rounding', signature: 'math.floor(x)', description: 'Returns largest integer <= x (rounds toward -∞). Returns int in Python 3.', complexity: 'O(1)', example: `import math
print(math.floor(3.7))   # 3
print(math.floor(-3.7))  # -4 (toward -∞)
print(math.floor(3.0))   # 3

# Compare to int() (truncates toward zero)
print(int(-3.7))         # -3 (different!)` },
  { section: 'Math Module - Rounding', signature: 'math.ceil(x)', description: 'Returns smallest integer >= x (rounds toward +∞). Returns int in Python 3.', complexity: 'O(1)', example: `import math
print(math.ceil(3.2))   # 4
print(math.ceil(-3.2))  # -3 (toward +∞)
print(math.ceil(3.0))   # 3

# Useful for "round up" scenarios
items_per_page = 10
total_items = 47
pages = math.ceil(total_items / items_per_page)  # 5` },
  { section: 'Math Module - Rounding', signature: 'math.trunc(x)', description: 'Truncates x toward zero (drops decimal). Same as int(x) for numbers.', complexity: 'O(1)', example: `import math
print(math.trunc(3.7))   # 3 (drops .7)
print(math.trunc(-3.7))  # -3 (toward zero)

# Equivalent to int() for numbers
print(int(3.7))   # 3
print(int(-3.7))  # -3` },
]
