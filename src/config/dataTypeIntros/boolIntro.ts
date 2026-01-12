export const boolIntro = `bool is Subclass of int
True is literally 1, False is 0—you can do arithmetic with booleans. This enables elegant patterns like sum(condition for x in items) to count matches. All objects have truthiness: 0, [], "", None, False are falsy; everything else is truthy. Use sum() to count True values, any() for OR, all() for AND.

\`\`\`python
# BOOL ARITHMETIC - True=1, False=0
True + True   # 2
True * 10     # 10
False * 10    # 0

# COUNT TRUE VALUES
bools = [True, False, True, True, False]
sum(bools)  # 3 (counts True)

# COUNT CONDITIONS
nums = [1, 2, 3, 4, 5, 6]
count_even = sum(n % 2 == 0 for n in nums)  # 3
count_positive = sum(n > 0 for n in nums)   # 6
count_large = sum(n > 3 for n in nums)      # 3
\`\`\`
---
Truthiness and Falsy Values
Empty containers ([], {}, "", set()), zero (0, 0.0), and None are falsy. Everything else is truthy. Use if container: instead of if len(container) > 0:. Use bool() to convert to True/False explicitly.

\`\`\`python
# FALSY VALUES - These are False in boolean context
bool([])        # False (empty list)
bool({})        # False (empty dict)
bool("")        # False (empty string)
bool(0)         # False (zero)
bool(0.0)       # False (zero float)
bool(None)      # False
bool(False)     # False

# TRUTHY - Everything else
bool([1])       # True (non-empty list)
bool("text")    # True (non-empty string)
bool(42)        # True (non-zero number)
bool(" ")       # True (whitespace is not empty!)

# IDIOMATIC CHECKS
if items:  # Better than if len(items) > 0:
    process(items)

if not result:  # Better than if result == []:
    handle_empty()
\`\`\`
---
Boolean Operations
any() returns True if ANY element is truthy (short-circuits on first True). all() returns True if ALL elements are truthy (short-circuits on first False). Use these for elegant condition checking instead of loops.

\`\`\`python
# ANY - At least one True
any([False, False, True])  # True
any([False, False])        # False
any([])                    # False (empty is False)

# Check if any element > 10
any(x > 10 for x in [1, 5, 15, 3])  # True

# ALL - Every element True
all([True, True, True])  # True
all([True, False])       # False
all([])                  # True (vacuous truth!)

# Check if all even
all(x % 2 == 0 for x in [2, 4, 6, 8])  # True

# SHORT-CIRCUIT
def expensive_check(x):
    print(f"Checking {x}")
    return x > 5

# Only checks until first True
any(expensive_check(x) for x in [1, 2, 10, 20])
# Prints: Checking 1, Checking 2, Checking 10
# Stops at 10 (first True)
\`\`\``
