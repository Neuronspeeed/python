import type { Method } from '../../types'

export const floatMathTrig: Method[] = [
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
