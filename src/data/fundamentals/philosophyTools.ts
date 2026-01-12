import type { Method } from '../../types'

export const philosophyToolsMethods: Method[] = [
  {
    section: 'Philosophy & Tools',
    signature: 'The Zen of Python',
    description: 'Python\'s design principles. "Beautiful is better than ugly. Simple is better than complex."',
    complexity: 'Concept',
    example: `import this  # Print the Zen of Python

# Key principles:
# "Explicit is better than implicit"
# "Simple is better than complex"
# "Readability counts"
# "There should be one obvious way to do it"
# "Errors should never pass silently"
# "In the face of ambiguity, refuse to temptation to guess"

# Check: is my code readable? explicit? simple?`,
  },
  {
    section: 'Philosophy & Tools',
    signature: 'Tool Redundancy',
    description: 'Python offers overlapping tools. Know the options, but prefer the simplest that works.',
    complexity: 'Concept',
    example: `# STRING FORMATTING (4 ways)
name = "Alice"
"Hello, %s" % name           # % (legacy)
"Hello, {}".format(name)     # .format()
f"Hello, {name}"             # f-string (preferred!)

# ATTRIBUTE MANAGEMENT (4 ways)
# @property       → Simple computed attributes
# Descriptors     → Reusable attribute logic
# __getattr__     → Undefined attribute fallback
# __getattribute__→ ALL attribute access (rare)

# CLASS AUGMENTATION (3 ways)
# Manual rebind   → C = decorator(C)
# @decorator      → Syntactic sugar (preferred!)
# metaclass=      → Framework-level (rare)`,
  },
  {
    section: 'Philosophy & Tools',
    signature: 'Recommended Choices',
    description: 'When in doubt, prefer the simpler, more readable option. Advanced features are for frameworks.',
    complexity: 'Concept',
    example: `# PREFER:
f"Hello, {name}"     # Over % or .format()
with open(f) as f:   # Over try/finally
@property            # Over descriptors
@decorator           # Over metaclasses
list comprehension   # Over map/filter

# USE ADVANCED WHEN NEEDED:
# Descriptors      → Reusable validation
# __getattr__      → Delegation/proxies
# Metaclasses      → Framework APIs
# Generators       → Large/infinite data

# "If you wonder whether you need metaclasses,
#  you probably don't."`,
  },
]
