import type { Method } from '../../types'

export const floatWhyWhen: Method[] = [
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
]
