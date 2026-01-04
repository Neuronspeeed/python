import type { Method } from '../types'

export const floatMethods: Method[] = [
  // Fundamentals
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

  // Why & When
  { section: 'Why & When', signature: 'Why use Floats?', description: 'Use floats for scientific calculations, measurements, continuous values. NOT for money (use Decimal). Understand precision limits.', complexity: 'Concept', example: `# GOOD uses for float:
# - Scientific calculations
speed = 299_792_458.0  # m/s
distance = speed * 3600  # meters in 1 hour

# - Measurements and ratios
height = 1.75  # meters
weight = 68.5  # kg
bmi = weight / (height ** 2)

# - Statistical analysis
import statistics
temps = [72.5, 73.1, 71.8, 74.2]
avg = statistics.mean(temps)

# BAD uses for float:
# - Money (use Decimal instead!)
# price = 19.99  # WRONG - precision errors!
from decimal import Decimal
price = Decimal('19.99')  # CORRECT

# - Counting (use int instead!)
# count = 5.0  # WRONG - should be int
count = 5  # CORRECT` },
  { section: 'Why & When', signature: 'Float vs Decimal vs Fraction', description: 'Float: fast approximations. Decimal: exact decimals (finance). Fraction: exact ratios. Choose based on needs.', complexity: 'Concept', example: `# FLOAT - fast but approximate (scientific computing)
x = 0.1
y = 0.2
print(x + y)  # 0.30000000000000004 (WRONG but FAST)

# DECIMAL - exact decimals but slower (finance, money)
from decimal import Decimal
price1 = Decimal('19.99')
price2 = Decimal('5.01')
total = price1 + price2  # Decimal('25.00') (CORRECT & SLOW)

# FRACTION - exact ratios (math, music)
from fractions import Fraction
f1 = Fraction(1, 3)  # 1/3
f2 = Fraction(2, 3)  # 2/3
print(f1 + f2)  # 1 (EXACT)

# Performance comparison:
# float:    O(1) - hardware support
# Decimal:  O(n) - software implementation
# Fraction: O(n) - GCD calculations` },
  { section: 'Why & When', signature: 'Float Comparison Pitfalls', description: 'NEVER use == for floats. Use math.isclose() or round(). Accumulation errors grow with operations.', complexity: 'Concept', example: `import math

# WRONG - direct comparison
print(0.1 + 0.2 == 0.3)  # False! (precision error)

# CORRECT - use math.isclose()
print(math.isclose(0.1 + 0.2, 0.3))  # True

# CORRECT - round for comparison
print(round(0.1 + 0.2, 10) == round(0.3, 10))  # True

# ACCUMULATION ERRORS - grow with many operations
total = 0.0
for i in range(10):
    total += 0.1
print(total)  # 0.9999999999999999 (not 1.0!)
print(math.isclose(total, 1.0))  # True

# SOLUTION: Minimize operations or use Decimal
from decimal import Decimal
total = Decimal('0')
for i in range(10):
    total += Decimal('0.1')
print(total)  # 1.0 (exact!)` },

  // Float Methods
  { section: 'Float Methods', signature: 'float.is_integer()', description: 'Returns True if the float is finite with integral value (no decimal part).', complexity: 'O(1)', example: `print((3.0).is_integer())   # True
print((3.5).is_integer())   # False
print((-0.0).is_integer())  # True
print((1e10).is_integer())  # True

# Useful for validation
x = 4.0
if x.is_integer():
    print("Whole number")` },
  { section: 'Float Methods', signature: 'float.as_integer_ratio()', description: 'Returns pair of integers (numerator, denominator) whose ratio exactly equals the float.', complexity: 'O(1)', example: `# Simple ratios
print((0.5).as_integer_ratio())   # (1, 2) - 1/2
print((1.5).as_integer_ratio())   # (3, 2) - 3/2
print((0.75).as_integer_ratio())  # (3, 4) - 3/4

# Shows precision issues!
print((0.1).as_integer_ratio())
# (3602879701896397, 36028797018963968) - binary approximation!

# Convert back to Fraction
from fractions import Fraction
f = Fraction(*((0.1).as_integer_ratio()))
print(f)  # 3602879701896397/36028797018963968` },
  { section: 'Float Methods', signature: 'float.hex()', description: 'Returns hexadecimal string representation showing exact binary value. Useful for exact float serialization.', complexity: 'O(1)', example: `print((255.0).hex())    # '0x1.fe00000000000p+7'
print((-0.5).hex())     # '-0x1.0000000000000p-1'
print((0.0).hex())      # '0x0.0p+0'

# Round-trip conversion (preserves exact value)
x = 0.1
hex_str = x.hex()
y = float.fromhex(hex_str)
print(x == y)  # True (exact match!)` },
  { section: 'Float Methods', signature: 'float.fromhex(s)', description: 'Class method creating float from hexadecimal string. Guarantees exact value preservation.', complexity: 'O(n)', example: `print(float.fromhex('0x1.ffffp10'))  # 2047.984375
print(float.fromhex('0x1.0p-1'))     # 0.5
print(float.fromhex('0x0.0p+0'))     # 0.0

# Perfect for exact float serialization
original = 0.1
stored = original.hex()  # Save to file/database
restored = float.fromhex(stored)  # Load back
print(original == restored)  # True (bit-for-bit match!)` },
  { section: 'Float Methods', signature: 'float.conjugate()', description: 'Returns complex conjugate. For floats, returns the float itself (compatibility with complex).', complexity: 'O(1)', example: `x = 3.14
print(x.conjugate())  # 3.14 (same as x)

# Mainly for complex number compatibility
c = 3 + 4j
print(c.conjugate())  # (3-4j)` },

  // Properties
  { section: 'Float Properties', signature: 'float.real', description: 'Read-only property returning the real part (the float itself). Compatibility with complex.', complexity: 'O(1)', example: `x = 3.14
print(x.real)  # 3.14

# Complex compatibility
c = 3 + 4j
print(c.real)  # 3.0` },
  { section: 'Float Properties', signature: 'float.imag', description: 'Read-only property returning imaginary part (always 0.0 for floats). Compatibility with complex.', complexity: 'O(1)', example: `x = 3.14
print(x.imag)  # 0.0

# Complex compatibility
c = 3 + 4j
print(c.imag)  # 4.0` },

  // Arithmetic
  { section: 'Arithmetic Operations', signature: 'x + y', description: 'Addition. Returns float if either operand is float. Watch for precision errors.', complexity: 'O(1)', example: `print(3.5 + 2.5)   # 6.0
print(3.5 + 2)     # 5.5 (int promoted to float)
print(0.1 + 0.2)   # 0.30000000000000004 (precision!)` },
  { section: 'Arithmetic Operations', signature: 'x - y', description: 'Subtraction. Returns float if either operand is float.', complexity: 'O(1)', example: `print(5.5 - 3.0)   # 2.5
print(5.5 - 3)     # 2.5
print(3 - 2.5)     # 0.5` },
  { section: 'Arithmetic Operations', signature: 'x * y', description: 'Multiplication. Returns float if either operand is float.', complexity: 'O(1)', example: `print(2.5 * 4.0)   # 10.0
print(2.5 * 4)     # 10.0
print(0.1 * 3)     # 0.30000000000000004 (precision!)` },
  { section: 'Arithmetic Operations', signature: 'x / y', description: 'True division. ALWAYS returns float, even with two ints.', complexity: 'O(1)', example: `print(7.0 / 2.0)   # 3.5
print(7.0 / 2)     # 3.5
print(7 / 2)       # 3.5 (both ints → float result!)
print(1 / 3)       # 0.3333333333333333` },
  { section: 'Arithmetic Operations', signature: 'x // y', description: 'Floor division. With floats, returns float (not int!). Rounds toward negative infinity.', complexity: 'O(1)', example: `print(7.5 // 2.0)  # 3.0 (not 3!)
print(-7.5 // 2.0) # -4.0 (rounds toward -∞)
print(7 // 2.0)    # 3.0
print(7.5 // 2)    # 3.0` },
  { section: 'Arithmetic Operations', signature: 'x % y', description: 'Modulo. Returns float remainder if either operand is float.', complexity: 'O(1)', example: `print(7.5 % 2.0)   # 1.5
print(7.5 % 2.5)   # 0.0
print(7.5 % 2)     # 1.5
print(-7.5 % 2.0)  # 0.5 (Python modulo has sign of divisor)` },
  { section: 'Arithmetic Operations', signature: 'x ** y', description: 'Exponentiation. Can produce complex results for negative bases with fractional exponents.', complexity: 'O(1)', example: `print(2.0 ** 0.5)    # 1.4142135623730951 (√2)
print(4.0 ** 0.5)    # 2.0
print(2.0 ** -1)     # 0.5 (negative exponent)
print((-1.0) ** 0.5) # (6.123233995736766e-17+1j) (complex!)` },

  // Built-in Functions
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

  // Math Module - Rounding
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

  // Math Module - Power & Logarithm
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

  // Math Module - Special Values
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

  // Math Module - Trigonometry
  { section: 'Math Module - Trigonometry', signature: 'math.sin(x)', description: 'Returns sine of x (in radians). Returns value in [-1, 1].', complexity: 'O(1)', example: `import math
print(math.sin(0))              # 0.0
print(math.sin(math.pi / 2))    # 1.0
print(math.sin(math.pi))        # 1.2246467991473532e-16 (≈0)

# Degrees to radians
angle_deg = 90
angle_rad = math.radians(angle_deg)
print(math.sin(angle_rad))  # 1.0` },
  { section: 'Math Module - Trigonometry', signature: 'math.cos(x)', description: 'Returns cosine of x (in radians). Returns value in [-1, 1].', complexity: 'O(1)', example: `import math
print(math.cos(0))           # 1.0
print(math.cos(math.pi))     # -1.0
print(math.cos(math.pi / 2)) # 6.123233995736766e-17 (≈0)

# Degrees to radians
print(math.cos(math.radians(180)))  # -1.0` },
  { section: 'Math Module - Trigonometry', signature: 'math.tan(x)', description: 'Returns tangent of x (in radians). Undefined at π/2, 3π/2, etc.', complexity: 'O(1)', example: `import math
print(math.tan(0))              # 0.0
print(math.tan(math.pi / 4))    # 0.9999999999999999 (≈1)
print(math.tan(math.pi))        # -1.2246467991473532e-16 (≈0)

# tan(90°) is undefined (division by zero)
# print(math.tan(math.pi / 2))  # 1.633123935319537e+16 (huge!)` },
]
