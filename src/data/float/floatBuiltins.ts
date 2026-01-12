import type { Method } from '../../types'

export const floatBuiltins: Method[] = [
  { section: 'Built-in Functions', signature: 'abs(x)', description: 'Returns absolute value (distance from zero).', complexity: 'O(1)', example: `print(abs(-3.14))  # 3.14
print(abs(3.14))   # 3.14
print(abs(0.0))    # 0.0
print(abs(-0.0))   # 0.0` },
  { section: 'Built-in Functions', signature: 'int(x)', description: 'Truncates float toward zero to integer. Drops decimal part.', complexity: 'O(1)', example: `print(int(3.9))   # 3 (drops .9)
print(int(-3.9))  # -3 (toward zero, not floor!)
print(int(3.1))   # 3
print(int(-3.1))  # -3

# Compare to floor (rounds toward -∞)
import math
print(math.floor(3.9))   # 3
print(math.floor(-3.9))  # -4 (different!)` },
  { section: 'Built-in Functions', signature: 'divmod(x, y)', description: 'Returns tuple (quotient, remainder) where quotient = x // y and remainder = x % y.', complexity: 'O(1)', example: `print(divmod(7.5, 2.0))  # (3.0, 1.5)
print(divmod(10.5, 3.0)) # (3.0, 1.5)

# Equivalent to:
q, r = 7.5 // 2.0, 7.5 % 2.0
print(q, r)  # 3.0 1.5` },
]
