import type { Method } from '../../types'

export const conditionalsTernary: Method[] = [
  {
    section: 'Ternary Expression',
    signature: 'Y if X else Z',
    description: 'One-line conditional expression. Returns Y if X is true, else Z. Not a statement.',
    complexity: 'Concept',
    example: `x = 10
result = "even" if x % 2 == 0 else "odd"
print(result)  # even

# In function call
print("yes" if True else "no")  # yes

# Assignment
score = 85
grade = 'pass' if score >= 60 else 'fail'`,
  },
  {
    section: 'Ternary Expression',
    signature: 'Nested Ternary',
    description: 'Can be chained but avoid deep nesting for readability.',
    complexity: 'Concept',
    example: `x = 5
size = "small" if x < 3 else "medium" if x < 7 else "large"
print(size)  # medium

# Equivalent if/elif/else
if x < 3:
    size = "small"
elif x < 7:
    size = "medium"
else:
    size = "large"`,
  },
]
