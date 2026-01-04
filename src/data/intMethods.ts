import type { Method } from '../types'

export const intMethods: Method[] = [
  // Fundamentals
  { section: 'Fundamentals', signature: 'Integer Basics', description: 'Integers are whole numbers. Python has UNLIMITED size (arbitrary precision). Use underscores for readability.', complexity: 'Concept', example: `# Integer literals
x = 1
y = 1000000         # Hard to read
z = 1_000_000       # Use underscores for readability (Python 3.6+)

# Check type
print(type(42))     # <class 'int'>

# NO SIZE LIMIT - arbitrary precision!
huge = 99999999999999999999999999999999999999
print(huge)         # Works fine! No overflow.
print(huge + 1)     # Still works!

# Compare to other languages:
# Java int:  -2³¹ to 2³¹-1 (4 bytes, overflow possible)
# C int:     -2³¹ to 2³¹-1 (4 bytes, overflow possible)
# Python:    unlimited size!

# Negative integers
neg = -42
print(type(neg))    # <class 'int'>` },
  { section: 'Fundamentals', signature: 'int(x=0)', description: 'Converts number or string to integer. Truncates floats toward zero. Optional base for string parsing.', complexity: 'O(n)', example: `# From floats (truncates toward zero)
print(int(3.7))      # 3 (drops .7)
print(int(-3.7))     # -3 (toward zero, not floor!)
print(int(3.99))     # 3

# From strings (base 10 default)
print(int("42"))     # 42
print(int("  25 "))  # 25 (strips whitespace)

# From strings with different bases
print(int("1010", 2))   # 10 (binary)
print(int("ff", 16))    # 255 (hexadecimal)
print(int("77", 8))     # 63 (octal)
print(int("z", 36))     # 35 (base 36)

# From booleans
print(int(True))     # 1
print(int(False))    # 0` },
  { section: 'Fundamentals', signature: 'Number Bases', description: 'Python supports binary (0b), octal (0o), hex (0x) literals. Use bin(), oct(), hex() for conversion.', complexity: 'Concept', example: `# Integer literals in different bases
binary = 0b1010      # 10 in decimal
octal = 0o12         # 10 in decimal
hexadecimal = 0xa    # 10 in decimal
print(binary == octal == hexadecimal)  # True

# Convert TO different bases (returns string)
n = 42
print(bin(n))        # '0b101010' (binary)
print(oct(n))        # '0o52' (octal)
print(hex(n))        # '0x2a' (hexadecimal)

# Convert FROM different bases (use int with base)
print(int('101010', 2))  # 42 (from binary string)
print(int('52', 8))      # 42 (from octal string)
print(int('2a', 16))     # 42 (from hex string)` },

  // Why & When
  { section: 'Why & When', signature: 'Why use Integers?', description: 'Use integers for counting, indexing, exact calculations. Unlimited precision - no overflow. Faster than float for whole numbers.', complexity: 'Concept', example: `# GOOD uses for int:
# - Counting and iteration
for i in range(10):  # Indices are always ints
    count += 1

# - Array/list indices
items = [10, 20, 30]
print(items[0])  # Index must be int

# - Exact calculations (no rounding errors)
total = 100 + 200 + 300  # 600 (exact)

# - Large numbers (no overflow!)
factorial_100 = 1
for i in range(1, 101):
    factorial_100 *= i
# Result: 93326215443944152681699238856266700490715968264...
# Would overflow in C/Java!

# - Bit manipulation
flags = 0b1010
print(flags & 0b0011)  # Bitwise operations

# BAD uses for int:
# - Measurements with decimals
# height = 1  # Should be 1.75 (float)
# - Money (use Decimal for precision)
# - Ratios/percentages (use float)` },
  { section: 'Why & When', signature: 'Int vs Float vs Decimal', description: 'Int: exact whole numbers, unlimited size. Float: approximate decimals, fast. Decimal: exact decimals, slow.', complexity: 'Concept', example: `# INT - exact whole numbers, unlimited
x = 123456789012345678901234567890  # No overflow!
print(x + 1)  # Exact

# FLOAT - approximate, limited precision
y = 0.1 + 0.2
print(y)  # 0.30000000000000004 (WRONG!)
print(y == 0.3)  # False

# DECIMAL - exact decimals, slower
from decimal import Decimal
z = Decimal('0.1') + Decimal('0.2')
print(z)  # 0.3 (CORRECT!)

# Performance comparison:
# int:     FAST for whole numbers, slower for huge values
# float:   FASTEST for decimals (hardware support)
# Decimal: SLOWEST (software implementation)

# Use cases:
# int:     counting, indices, large exact values
# float:   scientific computing, measurements
# Decimal: money, financial calculations` },
  { section: 'Why & When', signature: 'Common Integer Patterns', description: 'Modulo for cyclic patterns. Floor division for chunking. Bit operations for flags/optimization.', complexity: 'Concept', example: `# MODULO - cyclic patterns
# Alternating rows (even/odd)
for i in range(10):
    if i % 2 == 0:
        print(f"Row {i}: even")
    else:
        print(f"Row {i}: odd")

# Circular indexing
items = ['A', 'B', 'C']
for i in range(10):
    print(items[i % 3])  # Cycles: A, B, C, A, B, C...

# FLOOR DIVISION - chunking/pagination
total_items = 47
page_size = 10
num_pages = (total_items + page_size - 1) // page_size  # 5 (round up)

# DIVMOD - get quotient and remainder together
minutes = 125
hours, mins = divmod(minutes, 60)  # (2, 5) = 2h 5m

# POWER OF 2 CHECK - bit trick
def is_power_of_2(n):
    return n > 0 and (n & (n - 1)) == 0

print(is_power_of_2(16))  # True
print(is_power_of_2(15))  # False` },

  // Creation & Conversion
  { section: 'Number Base Conversion', signature: 'int(x, base)', description: 'Converts string in given base (2-36) to integer. Case-insensitive for letters.', complexity: 'O(n)', example: `# Binary to int
print(int("1010", 2))   # 10
print(int("11111111", 2))  # 255

# Hexadecimal to int (0-9, a-f)
print(int("ff", 16))    # 255
print(int("FF", 16))    # 255 (case-insensitive)
print(int("a5", 16))    # 165

# Octal to int
print(int("77", 8))     # 63
print(int("100", 8))    # 64

# Base 36 (0-9, a-z)
print(int("z", 36))     # 35
print(int("10", 36))    # 36

# Remove prefix if parsing user input
hex_str = "0xff"
print(int(hex_str, 16))  # 255 (0x prefix allowed)` },

  // Bit Operations
  { signature: 'int.bit_length()', description: 'Returns the number of bits necessary to represent the integer in binary, excluding sign and leading zeros.', complexity: 'O(1)', example: `print((37).bit_length())   # 6 (100101)
print((-37).bit_length())  # 6
print((0).bit_length())    # 0` },
  { signature: 'int.bit_count() [3.10+]', description: 'Returns the number of ones in the binary representation. Also known as population count. Requires Python 3.10+.', complexity: 'O(1)', example: `# Python 3.10+ required
print((13).bit_count())  # 3 (1101 has three 1s)
print((255).bit_count()) # 8` },
  { signature: 'int.to_bytes(length, byteorder, *, signed=False)', description: 'Returns an array of bytes representing the integer.', complexity: 'O(n)', example: `n = 1024
print(n.to_bytes(2, "big"))     # b'\\x04\\x00'
print(n.to_bytes(2, "little"))  # b'\\x00\\x04'
print((-1).to_bytes(1, "big", signed=True))  # b'\\xff'` },
  { signature: 'int.from_bytes(bytes, byteorder, *, signed=False)', description: 'Class method that returns the integer represented by the given array of bytes.', complexity: 'O(n)', example: `print(int.from_bytes(b'\\x04\\x00', "big"))    # 1024
print(int.from_bytes(b'\\xff', "big", signed=True))  # -1` },
  { signature: 'int.as_integer_ratio()', description: 'Returns a pair of integers whose ratio equals the integer and denominator is 1.', complexity: 'O(1)', example: `print((10).as_integer_ratio())  # (10, 1)
print((-3).as_integer_ratio())  # (-3, 1)` },

  // Properties (for numeric types)
  { signature: 'int.real', description: 'Property that returns the real part (the integer itself).', complexity: 'O(1)', example: `n = 42
print(n.real)  # 42` },
  { signature: 'int.imag', description: 'Property that returns the imaginary part (always 0 for integers).', complexity: 'O(1)', example: `n = 42
print(n.imag)  # 0` },
  { signature: 'int.numerator', description: 'Property that returns the numerator (the integer itself for integers).', complexity: 'O(1)', example: `n = 42
print(n.numerator)  # 42` },
  { signature: 'int.denominator', description: 'Property that returns the denominator (always 1 for integers).', complexity: 'O(1)', example: `n = 42
print(n.denominator)  # 1` },
  { signature: 'int.conjugate()', description: 'Returns the complex conjugate (the integer itself for real numbers).', complexity: 'O(1)', example: `n = 42
print(n.conjugate())  # 42` },

  // Arithmetic Operators
  { signature: 'x + y', description: 'Addition. Returns the sum of two numbers.', complexity: 'O(1)', example: `print(5 + 3)   # 8
print(-5 + 3)  # -2` },
  { signature: 'x - y', description: 'Subtraction. Returns the difference of two numbers.', complexity: 'O(1)', example: `print(5 - 3)   # 2
print(3 - 5)   # -2` },
  { signature: 'x * y', description: 'Multiplication. Returns the product of two numbers.', complexity: 'O(1)', example: `print(5 * 3)   # 15
print(-5 * 3)  # -15` },
  { signature: 'x / y', description: 'True division. Always returns a float.', complexity: 'O(1)', example: `print(7 / 2)   # 3.5
print(6 / 2)   # 3.0 (still float!)` },
  { signature: 'x // y', description: 'Floor division. Returns the largest integer less than or equal to the quotient.', complexity: 'O(1)', example: `print(7 // 2)   # 3
print(-7 // 2)  # -4 (floors toward negative infinity)` },
  { signature: 'x % y', description: 'Modulo. Returns the remainder of the division.', complexity: 'O(1)', example: `print(7 % 3)   # 1
print(-7 % 3)  # 2 (Python: result has same sign as divisor)` },
  { signature: 'x ** y', description: 'Exponentiation. Returns x raised to the power y.', complexity: 'O(log y)', example: `print(2 ** 10)  # 1024
print((-2) ** 3) # -8
print(2 ** -1)  # 0.5 (returns float)` },
  { signature: '-x', description: 'Unary negation. Returns the negation of x.', complexity: 'O(1)', example: `x = 5
print(-x)   # -5
print(-(-x)) # 5` },
  { signature: '+x', description: 'Unary plus. Returns x unchanged.', complexity: 'O(1)', example: `x = -5
print(+x)  # -5 (no change)` },
  { signature: 'abs(x)', description: 'Returns the absolute value of x.', complexity: 'O(1)', example: `print(abs(-5))  # 5
print(abs(5))   # 5` },
  { signature: 'divmod(x, y)', description: 'Returns tuple (x // y, x % y).', complexity: 'O(1)', example: `print(divmod(7, 3))   # (2, 1)
print(divmod(-7, 3))  # (-3, 2)` },
  { signature: 'pow(x, y[, z])', description: 'Returns x**y or (x**y) % z if z is provided. More efficient for modular exponentiation.', complexity: 'O(log y)', example: `print(pow(2, 10))      # 1024
print(pow(2, 10, 100)) # 24 (modular exponentiation)` },

  // Bitwise Operators
  { signature: 'x & y', description: 'Bitwise AND. Returns 1 for each bit position where both bits are 1.', complexity: 'O(1)', example: `print(5 & 3)   # 1 (0101 & 0011 = 0001)
print(12 & 10) # 8 (1100 & 1010 = 1000)` },
  { signature: 'x | y', description: 'Bitwise OR. Returns 1 for each bit position where at least one bit is 1.', complexity: 'O(1)', example: `print(5 | 3)   # 7 (0101 | 0011 = 0111)
print(12 | 10) # 14` },
  { signature: 'x ^ y', description: 'Bitwise XOR. Returns 1 for each bit position where exactly one bit is 1.', complexity: 'O(1)', example: `print(5 ^ 3)   # 6 (0101 ^ 0011 = 0110)
print(12 ^ 10) # 6` },
  { signature: '~x', description: 'Bitwise NOT. Returns the complement of x. Equivalent to -(x+1).', complexity: 'O(1)', example: `print(~5)   # -6
print(~0)   # -1
print(~-1)  # 0` },
  { signature: 'x << n', description: 'Left shift. Shifts bits left by n positions. Equivalent to x * (2**n).', complexity: 'O(1)', example: `print(1 << 4)   # 16 (0001 -> 10000)
print(5 << 2)   # 20` },
  { signature: 'x >> n', description: 'Right shift. Shifts bits right by n positions. Equivalent to x // (2**n).', complexity: 'O(1)', example: `print(16 >> 2)  # 4 (10000 -> 100)
print(-16 >> 2) # -4 (arithmetic shift)` },

  // Comparison Operators
  { signature: 'x == y', description: 'Equality. Returns True if x equals y.', complexity: 'O(1)', example: `print(5 == 5)    # True
print(5 == 5.0)  # True (cross-type comparison)` },
  { signature: 'x != y', description: 'Inequality. Returns True if x does not equal y.', complexity: 'O(1)', example: `print(5 != 3)  # True
print(5 != 5)  # False` },
  { signature: 'x < y', description: 'Less than. Returns True if x is strictly less than y.', complexity: 'O(1)', example: `print(3 < 5)  # True
print(5 < 5)  # False` },
  { signature: 'x <= y', description: 'Less than or equal. Returns True if x is less than or equal to y.', complexity: 'O(1)', example: `print(3 <= 5)  # True
print(5 <= 5)  # True` },
  { signature: 'x > y', description: 'Greater than. Returns True if x is strictly greater than y.', complexity: 'O(1)', example: `print(5 > 3)  # True
print(5 > 5)  # False` },
  { signature: 'x >= y', description: 'Greater than or equal. Returns True if x is greater than or equal to y.', complexity: 'O(1)', example: `print(5 >= 3)  # True
print(5 >= 5)  # True` },

  // Built-in Functions
  { signature: 'bin(x)', description: 'Converts integer to binary string prefixed with "0b".', complexity: 'O(log n)', example: `print(bin(10))   # '0b1010'
print(bin(-10))  # '-0b1010'` },
  { signature: 'oct(x)', description: 'Converts integer to octal string prefixed with "0o".', complexity: 'O(log n)', example: `print(oct(8))   # '0o10'
print(oct(64))  # '0o100'` },
  { signature: 'hex(x)', description: 'Converts integer to hexadecimal string prefixed with "0x".', complexity: 'O(log n)', example: `print(hex(255))  # '0xff'
print(hex(16))   # '0x10'` },
  { signature: 'round(x[, ndigits])', description: 'Rounds to nearest integer (or ndigits decimal places). Uses banker\'s rounding.', complexity: 'O(1)', example: `print(round(2.5))   # 2 (banker's rounding)
print(round(3.5))   # 4
print(round(2.675, 2))  # 2.67 (float precision!)` },
]
