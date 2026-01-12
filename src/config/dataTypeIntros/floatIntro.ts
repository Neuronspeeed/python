export const floatIntro = `Use math.isclose() for Comparisons
Floats are 64-bit IEEE 754 double-precision with FINITE PRECISION (~15-17 digits). Many decimals like 0.1, 0.2, 0.3 cannot be exactly represented in binary—0.1 + 0.2 = 0.30000000000000004 (not 0.3!). NEVER use == for float comparisons—use math.isclose() instead. For exact decimal arithmetic (finance), use decimal.Decimal.

\`\`\`python
# PRECISION ISSUE - NEVER use ==
0.1 + 0.2 == 0.3  # False (!)
0.1 + 0.2         # 0.30000000000000004

# CORRECT - Use math.isclose()
import math
math.isclose(0.1 + 0.2, 0.3)  # True
math.isclose(1.000001, 1.0, rel_tol=1e-5)  # True

# Cumulative errors
sum_val = 0.0
for _ in range(10):
    sum_val += 0.1
sum_val == 1.0  # False! (0.9999999999999999)
math.isclose(sum_val, 1.0)  # True
\`\`\`python
---
Float vs Decimal
Use float for scientific computation (fast, hardware-supported). Use Decimal for exact decimal arithmetic where precision matters (finance, money). Decimal is slower but has configurable precision and no binary representation issues.

\`\`\`python
# FLOAT - Fast but imprecise decimals
price = 0.1 + 0.2  # 0.30000000000000004
total = price * 3  # 0.9000000000000001 (wrong!)

# DECIMAL - Exact decimal arithmetic
from decimal import Decimal
price = Decimal('0.1') + Decimal('0.2')  # Decimal('0.3')
total = price * 3  # Decimal('0.9') (exact!)

# Always use string constructor
Decimal(0.1)    # Decimal('0.1000000000000000055...') (bad!)
Decimal('0.1')  # Decimal('0.1') (exact!)

# Configure precision
from decimal import getcontext
getcontext().prec = 50  # 50 decimal places
\`\`\`python
---
Infinity and NaN
Use float('inf') and float('-inf') for unbounded values in comparisons. Use math.isnan() to check for NaN—NEVER use == since nan != nan (even to itself). Use math.isinf() for infinity checks.

\`\`\`python
# INFINITY - Larger than any finite number
inf = float('inf')
print(inf > 1000000)  # True
print(min(5, 10, inf))  # 5

# Initialize min/max
min_val = float('inf')
max_val = float('-inf')
for num in nums:
    min_val = min(min_val, num)
    max_val = max(max_val, num)

# NaN - Not a Number
nan = float('nan')
nan == nan  # False (!)
math.isnan(nan)  # True (correct way)

# Division by zero
float('inf') / float('inf')  # nan
1.0 / 0.0  # ZeroDivisionError
\`\`\``
