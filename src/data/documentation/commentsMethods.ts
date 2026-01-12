import type { Method } from '../../types'

export const commentsMethods: Method[] = [
  {
    section: 'Comments',
    signature: '# comment',
    description: 'Basic in-file documentation. Python ignores text after #. Best for small-scale implementation notes.',
    complexity: 'Concept',
    example: `x = 10  # inline comment

# Full line comment explaining next block
for i in range(x):
    # Implementation detail
    process(i)

# TODO: refactor this later
# FIXME: edge case not handled`,
  },
  {
    section: 'Comments',
    signature: 'Comment Best Practices',
    description: 'Use comments for "why" not "what". Code should be self-documenting; comments explain intent.',
    complexity: 'Concept',
    example: `# Bad: describes what code does (obvious)
x = x + 1  # increment x

# Good: explains why
x = x + 1  # account for 0-based indexing

# Bad: redundant
# loop through items
for item in items:

# Good: explains business logic
# Skip inactive users per GDPR requirements
for user in users:
    if not user.active:
        continue`,
  },
]
