import type { Method } from '../types'

export const intMethods: Method[] = [
  // Fundamentals
  { signature: 'Integer Basics', description: 'Integers are whole numbers with no decimal places. Python has no size limit for integers. Type is int.', complexity: 'Concept', example: `# Integer literals
x = 1
y = 1000000         # Hard to read
z = 1_000_000       # Use underscores for readability

# Check type
print(type(42))     # <class 'int'>

# No size limit!
huge = 999999999999999999999999999999
print(huge)         # Works fine!

# Negative integers
neg = -42
print(neg)          # -42` },
  { signature: 'int vs float', description: 'Integer has no decimal, float has decimal. Mixing int and float in operations usually returns float.', complexity: 'Concept', example: `# Integer vs Float
x = 1      # int
y = 1.0    # float

# Operations with mixed types
print(1 + 2)      # 3 (int)
print(1.0 + 2)    # 3.0 (float)
print(1 * 2)      # 2 (int)
print(1.0 * 2)    # 2.0 (float)

# Division always returns float
print(6 / 2)      # 3.0 (float, not int!)
print(6 // 2)     # 3 (int, floor division)` },
  // Creation & Conversion
  { signature: 'int(x=0)', description: 'Creates an integer from a number or string. Truncates floats toward zero.', complexity: 'O(n)', example: `print(int(3.7))      # 3
print(int(-3.7))     # -3
print(int("42"))     # 42
print(int("25"))     # 25 (from string)
print(int("1010", 2)) # 10 (binary)` },
  { signature: 'int(x, base)', description: 'Converts string x in the given base (2-36) to integer.', complexity: 'O(n)', example: `print(int("ff", 16))   # 255 (hex)
print(int("77", 8))    # 63 (octal)
print(int("z", 36))    # 35` },

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
