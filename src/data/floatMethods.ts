import type { Method } from '../types'

export const floatMethods: Method[] = [
  // Creation & Conversion
  { signature: 'float(x=0.0)', description: 'Creates a floating point number from a number or string.', complexity: 'O(n)', example: `print(float(3))        # 3.0
print(float("3.14"))   # 3.14
print(float("inf"))    # inf
print(float("-inf"))   # -inf
print(float("nan"))    # nan` },

  // Methods
  { signature: 'float.is_integer()', description: 'Returns True if the float is finite with integral value.', complexity: 'O(1)', example: `print((3.0).is_integer())   # True
print((3.5).is_integer())   # False
print((-0.0).is_integer())  # True` },
  { signature: 'float.as_integer_ratio()', description: 'Returns pair of integers whose ratio equals the float exactly.', complexity: 'O(1)', example: `print((0.5).as_integer_ratio())   # (1, 2)
print((1.5).as_integer_ratio())   # (3, 2)
print((0.1).as_integer_ratio())   # (3602879701896397, 36028797018963968)` },
  { signature: 'float.hex()', description: 'Returns hexadecimal string representation of the float.', complexity: 'O(1)', example: `print((255.0).hex())    # '0x1.fe00000000000p+7'
print((-0.5).hex())     # '-0x1.0000000000000p-1'
print((0.0).hex())      # '0x0.0p+0'` },
  { signature: 'float.fromhex(s)', description: 'Class method that creates a float from a hexadecimal string.', complexity: 'O(n)', example: `print(float.fromhex('0x1.ffffp10'))  # 2047.984375
print(float.fromhex('0x1.0p-1'))     # 0.5` },
  { signature: 'float.conjugate()', description: 'Returns the complex conjugate (the float itself).', complexity: 'O(1)', example: `x = 3.14
print(x.conjugate())  # 3.14` },

  // Properties
  { signature: 'float.real', description: 'Property that returns the real part (the float itself).', complexity: 'O(1)', example: `x = 3.14
print(x.real)  # 3.14` },
  { signature: 'float.imag', description: 'Property that returns the imaginary part (always 0.0 for floats).', complexity: 'O(1)', example: `x = 3.14
print(x.imag)  # 0.0` },

  // Arithmetic (same as int but with float results)
  { signature: 'x + y', description: 'Addition. Returns the sum as a float if either operand is float.', complexity: 'O(1)', example: `print(3.5 + 2.5)   # 6.0
print(3.5 + 2)     # 5.5` },
  { signature: 'x - y', description: 'Subtraction. Returns the difference as a float.', complexity: 'O(1)', example: `print(5.5 - 3.0)   # 2.5
print(5.5 - 3)     # 2.5` },
  { signature: 'x * y', description: 'Multiplication. Returns the product as a float.', complexity: 'O(1)', example: `print(2.5 * 4.0)   # 10.0
print(2.5 * 4)     # 10.0` },
  { signature: 'x / y', description: 'True division. Always returns a float.', complexity: 'O(1)', example: `print(7.0 / 2.0)   # 3.5
print(7.0 / 2)     # 3.5` },
  { signature: 'x // y', description: 'Floor division with floats. Returns largest float integer <= quotient.', complexity: 'O(1)', example: `print(7.5 // 2.0)  # 3.0
print(-7.5 // 2.0) # -4.0` },
  { signature: 'x % y', description: 'Modulo with floats. Returns float remainder.', complexity: 'O(1)', example: `print(7.5 % 2.0)   # 1.5
print(7.5 % 2.5)   # 0.0` },
  { signature: 'x ** y', description: 'Exponentiation. Can produce complex results for negative bases.', complexity: 'O(1)', example: `print(2.0 ** 0.5)    # 1.4142135623730951
print((-1.0) ** 0.5) # (6.123233995736766e-17+1j)` },

  // Built-in Functions
  { signature: 'abs(x)', description: 'Returns the absolute value of the float.', complexity: 'O(1)', example: `print(abs(-3.14))  # 3.14
print(abs(3.14))   # 3.14` },
  { signature: 'round(x[, ndigits])', description: 'Rounds to ndigits decimal places. Uses banker\'s rounding for ties.', complexity: 'O(1)', example: `print(round(3.14159, 2))  # 3.14
print(round(2.5))         # 2 (banker's rounding)
print(round(3.5))         # 4` },
  { signature: 'int(x)', description: 'Truncates float toward zero to integer.', complexity: 'O(1)', example: `print(int(3.9))   # 3
print(int(-3.9))  # -3` },
  { signature: 'divmod(x, y)', description: 'Returns tuple (x // y, x % y) for floats.', complexity: 'O(1)', example: `print(divmod(7.5, 2.0))  # (3.0, 1.5)` },

  // Math module functions (commonly used)
  { signature: 'math.floor(x)', description: 'Returns largest integer <= x.', complexity: 'O(1)', example: `import math
print(math.floor(3.7))   # 3
print(math.floor(-3.7))  # -4` },
  { signature: 'math.ceil(x)', description: 'Returns smallest integer >= x.', complexity: 'O(1)', example: `import math
print(math.ceil(3.2))   # 4
print(math.ceil(-3.2))  # -3` },
  { signature: 'math.trunc(x)', description: 'Truncates x toward zero.', complexity: 'O(1)', example: `import math
print(math.trunc(3.7))   # 3
print(math.trunc(-3.7))  # -3` },
  { signature: 'math.sqrt(x)', description: 'Returns the square root of x.', complexity: 'O(1)', example: `import math
print(math.sqrt(16))    # 4.0
print(math.sqrt(2))     # 1.4142135623730951` },
  { signature: 'math.pow(x, y)', description: 'Returns x raised to power y. Always returns float.', complexity: 'O(1)', example: `import math
print(math.pow(2, 10))  # 1024.0
print(math.pow(2, 0.5)) # 1.4142135623730951` },
  { signature: 'math.exp(x)', description: 'Returns e raised to the power x.', complexity: 'O(1)', example: `import math
print(math.exp(1))    # 2.718281828459045
print(math.exp(0))    # 1.0` },
  { signature: 'math.log(x[, base])', description: 'Returns natural logarithm of x, or log base if provided.', complexity: 'O(1)', example: `import math
print(math.log(math.e))    # 1.0
print(math.log(100, 10))   # 2.0` },
  { signature: 'math.log10(x)', description: 'Returns base-10 logarithm of x.', complexity: 'O(1)', example: `import math
print(math.log10(1000))  # 3.0
print(math.log10(1))     # 0.0` },
  { signature: 'math.log2(x)', description: 'Returns base-2 logarithm of x.', complexity: 'O(1)', example: `import math
print(math.log2(8))    # 3.0
print(math.log2(1024)) # 10.0` },

  // Special values
  { signature: 'math.isnan(x)', description: 'Returns True if x is NaN (Not a Number).', complexity: 'O(1)', example: `import math
print(math.isnan(float("nan")))  # True
print(math.isnan(3.14))          # False` },
  { signature: 'math.isinf(x)', description: 'Returns True if x is positive or negative infinity.', complexity: 'O(1)', example: `import math
print(math.isinf(float("inf")))  # True
print(math.isinf(float("-inf"))) # True
print(math.isinf(3.14))          # False` },
  { signature: 'math.isfinite(x)', description: 'Returns True if x is neither infinity nor NaN.', complexity: 'O(1)', example: `import math
print(math.isfinite(3.14))       # True
print(math.isfinite(float("inf"))) # False
print(math.isfinite(float("nan"))) # False` },
  { signature: 'math.isclose(a, b, *, rel_tol=1e-9, abs_tol=0.0)', description: 'Returns True if a and b are close to each other. Essential for float comparison.', complexity: 'O(1)', example: `import math
# Direct comparison fails due to float precision
print(0.1 + 0.2 == 0.3)          # False!
print(math.isclose(0.1 + 0.2, 0.3))  # True` },

  // Trig functions
  { signature: 'math.sin(x)', description: 'Returns sine of x radians.', complexity: 'O(1)', example: `import math
print(math.sin(0))              # 0.0
print(math.sin(math.pi / 2))    # 1.0` },
  { signature: 'math.cos(x)', description: 'Returns cosine of x radians.', complexity: 'O(1)', example: `import math
print(math.cos(0))           # 1.0
print(math.cos(math.pi))     # -1.0` },
  { signature: 'math.tan(x)', description: 'Returns tangent of x radians.', complexity: 'O(1)', example: `import math
print(math.tan(0))              # 0.0
print(math.tan(math.pi / 4))    # 0.9999999999999999` },
]
