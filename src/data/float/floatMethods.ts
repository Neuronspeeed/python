import type { Method } from '../../types'

export const floatMethodsSection: Method[] = [
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
]
