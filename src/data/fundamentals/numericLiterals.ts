import type { Method } from '../../types'

export const numericLiteralsMethods: Method[] = [
  {
    section: 'Numeric Literals',
    signature: 'Alternative Bases',
    description: 'Integers can be written in hex (0x), octal (0o), and binary (0b). Underscores improve readability.',
    complexity: 'Concept',
    example: `0xFF        # 255 (hexadecimal)
0o77        # 63 (octal)
0b1010      # 10 (binary)
1_000_000   # 1000000 (underscores ignored)

bin(10)     # '0b1010'
hex(255)    # '0xff'
oct(64)     # '0o100'`,
  },
  {
    section: 'Numeric Literals',
    signature: 'Complex Numbers',
    description: 'Written as real+imagj. Used in engineering and science. Access parts with .real and .imag.',
    complexity: 'Concept',
    example: `z = 3 + 4j
z.real      # 3.0
z.imag      # 4.0
abs(z)      # 5.0 (magnitude)
z * (1 - 2j)  # (11-2j)`,
  },
  {
    section: 'Numeric Literals',
    signature: 'Decimal & Fraction',
    description: 'Decimal avoids float inaccuracy. Fraction represents exact ratios. Import from decimal/fractions modules.',
    complexity: 'Concept',
    example: `from decimal import Decimal
Decimal('0.1') + Decimal('0.2')  # Decimal('0.3')
0.1 + 0.2  # 0.30000000000000004 (float!)

from fractions import Fraction
Fraction(1, 3) + Fraction(1, 6)  # Fraction(1, 2)`,
  },
]
