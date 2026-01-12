import type { Method } from '../../types'

export const floatMathSpecial: Method[] = [
  { section: 'Math Module - Special Values', signature: 'math.isnan(x)', description: 'Returns True if x is NaN (Not a Number). NaN != NaN, so use this function.', complexity: 'O(1)', example: `import math
nan = float("nan")
print(math.isnan(nan))   # True
print(math.isnan(3.14))  # False

# NaN != NaN!
print(nan == nan)        # False (always!)
print(math.isnan(nan))   # True (correct way)` },
  { section: 'Math Module - Special Values', signature: 'math.isinf(x)', description: 'Returns True if x is positive or negative infinity.', complexity: 'O(1)', example: `import math
print(math.isinf(float("inf")))  # True
print(math.isinf(float("-inf"))) # True
print(math.isinf(3.14))          # False

# Infinity from overflow
print(math.isinf(1e308 * 10))  # True` },
  { section: 'Math Module - Special Values', signature: 'math.isfinite(x)', description: 'Returns True if x is neither infinity nor NaN. Opposite of isinf() or isnan().', complexity: 'O(1)', example: `import math
print(math.isfinite(3.14))           # True
print(math.isfinite(1e308))          # True
print(math.isfinite(float("inf")))   # False
print(math.isfinite(float("nan")))   # False

# Safe for calculations
if math.isfinite(result):
    print(f"Valid: {result}")` },
  { section: 'Math Module - Special Values', signature: 'math.isclose(a, b, *, rel_tol=1e-9, abs_tol=0.0)', description: 'Returns True if a and b are close. ESSENTIAL for float comparison. Use instead of ==.', complexity: 'O(1)', example: `import math

# WRONG - direct comparison
print(0.1 + 0.2 == 0.3)  # False!

# CORRECT - use isclose
print(math.isclose(0.1 + 0.2, 0.3))  # True

# Custom tolerance
print(math.isclose(1.0, 1.001, rel_tol=0.01))  # True (1% tolerance)
print(math.isclose(1.0, 1.001, rel_tol=0.0001))  # False

# Absolute tolerance for values near zero
print(math.isclose(0.0, 1e-10, abs_tol=1e-9))  # True` },
]
