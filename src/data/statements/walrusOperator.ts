import type { Method } from '../../types'

export const walrusOperator: Method[] = [
  {
    section: 'Walrus Operator',
    signature: 'name := expression',
    description: 'Named expression (Python 3.8+). Assigns and returns value in one expression. Useful in conditions.',
    complexity: 'Concept',
    example: `# In while loops - read, assign, test
while (line := input()) != "quit":
    print(f"You typed: {line}")

# In if statements
if (n := len(data)) > 10:
    print(f"Too long: {n} items")

# In comprehensions
results = [y for x in data if (y := process(x))]`,
  },
  {
    section: 'Walrus Operator',
    signature: ':= in Comprehensions',
    description: 'Avoid duplicate computation by assigning intermediate results within comprehensions.',
    complexity: 'Concept',
    example: `# Without walrus - calls func twice
[func(x) for x in data if func(x) > 0]

# With walrus - calls func once
[y for x in data if (y := func(x)) > 0]

# Filter and transform in one pass
[clean for s in strings if (clean := s.strip())]`,
  },
]
