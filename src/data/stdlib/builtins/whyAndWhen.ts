import type { Method } from '../../../types'

export const builtinsWhyAndWhenMethods: Method[] = [
  {
    signature: 'Why know builtins?',
    description: 'Python built-in functions for type checking, identity, and introspection. Essential for writing robust interview code.',
    complexity: 'Concept',
    section: 'Why & When',
    example: `# ESSENTIAL BUILT-INS FOR INTERVIEWS

# TYPE CHECKING - Validate input types
def process(data):
    if not isinstance(data, (list, tuple)):
        raise TypeError("Expected sequence")
    # ...

# IDENTITY - Check if same object (not just equal value)
a = [1, 2, 3]
b = a        # Same object
c = [1, 2, 3]  # Different object, same value
a is b  # True - same object
a is c  # False - different objects
a == c  # True - same value

# INTROSPECTION - Explore objects dynamically
dir(str)  # List all string methods
help(str.split)  # Documentation for method

# DEBUGGING - Object identity for reference tracking
id(a)  # Memory address (unique per object)

# INTERVIEW PATTERNS:
# - Validate function arguments with isinstance()
# - Distinguish None from other falsy values with 'is None'
# - Explore unfamiliar APIs with dir() and help()
# - Debug aliasing issues with id()`
  },
]
