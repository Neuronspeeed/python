import type { Method } from '../../types'

export const floatProperties: Method[] = [
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
]
