import type { Method } from '../../types'

export const operatorsExpressionsMethods: Method[] = [
  {
    section: 'Operators & Expressions',
    signature: 'Operator Precedence',
    description: '** binds tightest, then */%, then +-. Use parentheses to override. Associativity: ** is right-to-left.',
    complexity: 'Concept',
    example: `2 + 3 * 4     # 14 (not 20)
(2 + 3) * 4   # 20
2 ** 3 ** 2   # 512 (= 2^9, right-to-left)
(2 ** 3) ** 2 # 64

-3 ** 2       # -9 (** binds tighter than -)
(-3) ** 2     # 9`,
  },
  {
    section: 'Operators & Expressions',
    signature: 'Mixed-Type Conversion',
    description: 'Python converts "up" to the most complex type. int → float → complex. No implicit str conversion.',
    complexity: 'Concept',
    example: `3 + 4.0       # 7.0 (int → float)
2 + 3j        # (2+3j) (int → complex)
True + 1      # 2 (bool is int subclass)

"x" + 3       # TypeError (no implicit conversion)
"x" + str(3)  # "x3" (explicit conversion)`,
  },
  {
    section: 'Operators & Expressions',
    signature: 'Division Types',
    description: 'True division (/) always returns float. Floor division (//) truncates toward negative infinity.',
    complexity: 'Concept',
    example: `7 / 2         # 3.5 (true division)
7 // 2        # 3 (floor division)
-7 // 2       # -4 (floors toward -∞)

divmod(7, 2)  # (3, 1) — quotient and remainder
7 % 2         # 1 (modulo)`,
  },
  {
    section: 'Operators & Expressions',
    signature: 'Chained Comparisons',
    description: 'Python allows chaining: a < b < c means (a < b) and (b < c). More readable than manual AND.',
    complexity: 'Concept',
    example: `x = 5
1 < x < 10    # True (x is between 1 and 10)
1 < x > 3     # True (x > 1 and x > 3)

# Equivalent to:
1 < x and x < 10  # True`,
  },
  {
    section: 'Operators & Expressions',
    signature: 'Float Equality',
    description: 'Never use == for floats due to hardware limitations. Use math.isclose() or compare with tolerance.',
    complexity: 'Concept',
    example: `0.1 + 0.2 == 0.3        # False!
0.1 + 0.2               # 0.30000000000000004

import math
math.isclose(0.1 + 0.2, 0.3)  # True

# Or manual tolerance:
abs((0.1 + 0.2) - 0.3) < 1e-9  # True`,
  },
  {
    section: 'Operators & Expressions',
    signature: 'Bitwise Operations',
    description: 'Work on integer bits: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift).',
    complexity: 'Concept',
    example: `5 & 3         # 1  (0101 & 0011 = 0001)
5 | 3         # 7  (0101 | 0011 = 0111)
5 ^ 3         # 6  (0101 ^ 0011 = 0110)
~5            # -6 (inverts all bits)
1 << 3        # 8  (shift left = multiply by 2^n)
8 >> 2        # 2  (shift right = divide by 2^n)`,
  },
]
