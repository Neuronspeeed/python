import type { Method } from '../../types'

export const boolWhyWhen: Method[] = [
  { section: 'Why & When', signature: 'Why use Booleans?', description: 'Booleans control program flow. Use for conditions, flags, validation, filtering. Leverage truthiness for cleaner code.', complexity: 'Concept', example: `# Control flow - if/while/for conditions
is_valid = True
if is_valid:  # Direct boolean check
    print("Proceed")

# Flags - track state
is_done = False
has_error = False
is_authenticated = True

# Validation - check conditions
age = 20
can_vote = age >= 18  # Boolean result

# Filtering - select items
numbers = [1, 2, 3, 4, 5]
evens = [n for n in numbers if n % 2 == 0]

# Truthiness - cleaner code
items = []
if items:  # Pythonic - uses truthiness
    print("has items")
# NOT: if len(items) > 0  # Less pythonic` },
  { section: 'Why & When', signature: 'Boolean vs other types', description: 'Boolean is a subclass of int. True=1, False=0. Use truthiness in conditions. Avoid explicit bool() calls.', complexity: 'Concept', example: `# Boolean IS-A int subclass
print(isinstance(True, int))   # True
print(True + True)             # 2
print(False + 5)               # 5
print(sum([True, True, False]))  # 2 (count Trues!)

# Truthiness vs explicit bool()
lst = [1, 2, 3]
if lst:  # GOOD - uses truthiness
    print("has items")

if bool(lst):  # REDUNDANT - unnecessary bool()
    print("has items")

if len(lst) > 0:  # VERBOSE - not pythonic
    print("has items")

# Boolean in math - count True values
answers = [True, False, True, True, False]
score = sum(answers)  # 3 correct
percentage = sum(answers) / len(answers)  # 0.6` },
  { section: 'Why & When', signature: 'Performance & Best Practices', description: 'Use truthiness for cleaner code. Short-circuit evaluation saves computation. all()/any() are optimized. Avoid unnecessary bool() conversions.', complexity: 'O(varies)', example: `# Short-circuit evaluation - stops early
# "and" stops at first False
result = expensive_check() and another_check()  # Skips 2nd if 1st is False

# "or" stops at first True
result = cheap_check() or expensive_check()  # Skips 2nd if 1st is True

# all() - stops at first False (O(n) worst, O(1) best)
all([True, True, False, True])  # Stops at 3rd element

# any() - stops at first True (O(n) worst, O(1) best)
any([False, False, True, False])  # Stops at 3rd element

# FAST - direct comparison
if x:  # O(1) - checks truthiness
    pass

# SLOW - unnecessary conversion
if bool(x):  # O(1) but adds function call overhead
    pass

# Performance tip: put cheap checks first
if cheap_condition and expensive_condition:
    pass  # Evaluate cheap first to short-circuit` },
]
