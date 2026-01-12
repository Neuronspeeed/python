import type { Method } from '../../types'

export const floatFundamentals: Method[] = [
  { section: 'Fundamentals', signature: 'Float Basics', description: 'Floating-point numbers represent real numbers with decimals. IEEE 754 standard. Use E-notation for very large/small values.', complexity: 'Concept', example: `# Float literals
x = 1.0
y = 1.25
z = -2.75

# E-notation for large/small numbers
big = 1e6           # 1000000.0 (1 × 10⁶)
small = 1e-4        # 0.0001 (1 × 10⁻⁴)
print(2e17)         # 2e+17 (Python displays large floats in E-notation)

# Underscores for readability (Python 3.6+)
readable = 1_000_000.0
tax_rate = 0.07_5   # 0.075

# Check type
print(type(1.0))    # <class 'float'>
print(type(1))      # <class 'int'>

# Special values
print(2e400)        # inf (overflow)
print(-2e400)       # -inf
print(float('nan')) # nan (not a number)` },
  { section: 'Fundamentals', signature: 'Floating-Point Precision', description: 'Floats are APPROXIMATIONS in binary. Decimals like 0.1 cannot be represented exactly. Use Decimal for financial calculations.', complexity: 'Concept', example: `# THE PROBLEM: 0.1 + 0.2 ≠ 0.3
print(0.1 + 0.2)              # 0.30000000000000004 (WRONG!)
print(0.1 + 0.2 == 0.3)       # False

# Why? Binary cannot represent 0.1 exactly
# 0.1 in binary is infinite: 0.00011001100110011...
# Stored as approximation: 0.1000000000000000055511...

# Python displays shortest decimal that rounds to stored value
print(0.1)                    # 0.1 (not the full approximation)

# SOLUTION 1: Decimal module (exact decimal arithmetic)
from decimal import Decimal
print(Decimal('0.1') + Decimal('0.2'))  # 0.3 (CORRECT!)

# SOLUTION 2: math.isclose() for comparisons
import math
print(math.isclose(0.1 + 0.2, 0.3))     # True

# SOLUTION 3: Round for display/comparison
print(round(0.1 + 0.2, 10) == round(0.3, 10))  # True` },
  { section: 'Fundamentals', signature: 'float(x=0.0)', description: 'Converts number or string to float. Returns 0.0 if no argument.', complexity: 'O(n)', example: `# From integers
print(float(3))        # 3.0
print(float(0))        # 0.0
print(float(-5))       # -5.0

# From strings
print(float("3.14"))   # 3.14
print(float("1.25"))   # 1.25
print(float("  42 "))  # 42.0 (strips whitespace)

# Special string values
print(float("inf"))    # inf
print(float("-inf"))   # -inf
print(float("nan"))    # nan

# From booleans
print(float(True))     # 1.0
print(float(False))    # 0.0` },
  { section: 'Fundamentals', signature: 'round(number[, ndigits])', description: 'Rounds to nearest integer or ndigits decimals. Uses banker\'s rounding (ties to even).', complexity: 'O(1)', example: `# Round to nearest integer
print(round(2.3))        # 2
print(round(2.7))        # 3
print(round(-2.7))       # -3

# Round to decimal places
print(round(3.14159, 2)) # 3.14
print(round(2.71828, 3)) # 2.718

# BANKER'S ROUNDING: ties (0.5) round to EVEN
print(round(2.5))        # 2 (rounds down to even)
print(round(3.5))        # 4 (rounds up to even)
print(round(4.5))        # 4 (rounds down to even)
print(round(5.5))        # 6 (rounds up to even)

# WARNING: Precision issues
print(round(2.675, 2))   # 2.67 (not 2.68 due to binary storage!)` },
]
