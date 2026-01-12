import type { Method } from '../../types'

export const floatArithmetic: Method[] = [
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
]
