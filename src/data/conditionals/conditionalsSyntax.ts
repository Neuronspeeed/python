import type { Method } from '../../types'

export const conditionalsSyntax: Method[] = [
  {
    section: 'Syntax Rules',
    signature: 'Indentation-Based Blocks',
    description: 'Python uses indentation (not braces) to define blocks. Consistent spaces required.',
    complexity: 'Concept',
    example: `# Correct indentation
if True:
    print("a")
    print("b")    # same block
    if True:
        print("c")  # nested block
    print("d")    # back to outer block

# IndentationError examples
if True:
print("wrong")    # not indented
  print("also wrong")  # inconsistent`,
  },
  {
    section: 'Syntax Rules',
    signature: 'Open-Pairs Rule',
    description: 'Code in (), [], {} can span multiple lines. Preferred way to handle long statements.',
    complexity: 'Concept',
    example: `# Long list
items = [
    "apple",
    "banana",
    "cherry",
]

# Long function call
result = some_function(
    arg1,
    arg2,
    kwarg=value,
)

# Long condition
if (condition1 and
    condition2 and
    condition3):
    do_something()`,
  },
  {
    section: 'Syntax Rules',
    signature: 'Docstrings',
    description: 'String at top of module/function/class stored in __doc__. Use triple quotes.',
    complexity: 'Concept',
    example: `def greet(name):
    """Return a greeting message.

    Args:
        name: The name to greet.

    Returns:
        A greeting string.
    """
    return f"Hello, {name}!"

print(greet.__doc__)  # prints docstring
help(greet)           # shows docstring`,
  },
]
