import type { Method } from '../../types'

export const floatMathPower: Method[] = [
  { section: 'Math Module - Power & Logarithm', signature: 'math.sqrt(x)', description: 'Returns square root of x. Raises ValueError for negative x.', complexity: 'O(1)', example: `import math
print(math.sqrt(16))    # 4.0
print(math.sqrt(2))     # 1.4142135623730951
print(math.sqrt(0))     # 0.0

# For negative, use complex
# math.sqrt(-1)  # ValueError!
print((-1) ** 0.5)  # (6.123233995736766e-17+1j)` },
  { section: 'Math Module - Power & Logarithm', signature: 'math.pow(x, y)', description: 'Returns x ** y as float. Unlike **, always returns float and handles special cases.', complexity: 'O(1)', example: `import math
print(math.pow(2, 10))  # 1024.0 (always float)
print(math.pow(2, 0.5)) # 1.4142135623730951
print(2 ** 10)          # 1024 (int if both ints)` },
  { section: 'Math Module - Power & Logarithm', signature: 'math.exp(x)', description: 'Returns e^x (e raised to power x).', complexity: 'O(1)', example: `import math
print(math.exp(1))    # 2.718281828459045 (e)
print(math.exp(0))    # 1.0
print(math.exp(2))    # 7.38905609893065

# Natural exponential function
# Inverse of math.log()` },
  { section: 'Math Module - Power & Logarithm', signature: 'math.log(x[, base])', description: 'Returns logarithm of x. Natural log (base e) by default, or specified base.', complexity: 'O(1)', example: `import math
# Natural logarithm (base e)
print(math.log(math.e))    # 1.0
print(math.log(1))         # 0.0

# Custom base
print(math.log(100, 10))   # 2.0 (log₁₀ 100)
print(math.log(8, 2))      # 3.0 (log₂ 8)` },
  { section: 'Math Module - Power & Logarithm', signature: 'math.log10(x)', description: 'Returns base-10 logarithm of x. Common for scientific notation.', complexity: 'O(1)', example: `import math
print(math.log10(1000))  # 3.0 (10³ = 1000)
print(math.log10(1))     # 0.0
print(math.log10(100))   # 2.0

# How many digits?
n = 12345
digits = int(math.log10(n)) + 1  # 5` },
  { section: 'Math Module - Power & Logarithm', signature: 'math.log2(x)', description: 'Returns base-2 logarithm of x. Useful for binary operations.', complexity: 'O(1)', example: `import math
print(math.log2(8))    # 3.0 (2³ = 8)
print(math.log2(1024)) # 10.0 (2¹⁰ = 1024)

# Check if power of 2
def is_power_of_2(n):
    return n > 0 and math.log2(n).is_integer()` },
]
