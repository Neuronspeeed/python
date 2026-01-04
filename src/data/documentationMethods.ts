import type { Method } from '../types'

export const documentationMethods: Method[] = [
  // Comments
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

  // dir Function
  {
    section: 'dir Function',
    signature: 'dir(object)',
    description: 'Lists all attribute names of an object. A "memory jogger" showing available methods without descriptions.',
    complexity: 'O(n)',
    example: `# List string methods
dir(str)
# ['__add__', ..., 'capitalize', 'center', ...]

# List methods on instance
dir("hello")
dir([1, 2, 3])

# List module attributes
import math
dir(math)  # ['cos', 'sin', 'sqrt', ...]`,
  },
  {
    section: 'dir Function',
    signature: 'Filter dir() output',
    description: 'Use list comprehension to filter out dunder methods (__x__) and show only public attributes.',
    complexity: 'O(n)',
    example: `# Show only public methods (no dunders)
[m for m in dir(str) if not m.startswith('_')]
# ['capitalize', 'casefold', 'center', ...]

# Show only methods (callable)
[m for m in dir(str)
 if not m.startswith('_') and callable(getattr(str, m))]

# Find methods containing 'split'
[m for m in dir(str) if 'split' in m]
# ['rsplit', 'split', 'splitlines']`,
  },

  // Docstrings
  {
    section: 'Docstrings',
    signature: '"""docstring"""',
    description: 'String at top of module/function/class. Stored in __doc__ attribute. Use triple quotes for multiline.',
    complexity: 'Concept',
    example: `def greet(name):
    """Return a greeting message.

    Args:
        name: The person's name.

    Returns:
        A greeting string.
    """
    return f"Hello, {name}!"

# Access docstring
print(greet.__doc__)`,
  },
  {
    section: 'Docstrings',
    signature: 'Module Docstring',
    description: 'First statement in a .py file. Describes module purpose and contents.',
    complexity: 'Concept',
    example: `"""Utility functions for data processing.

This module provides helpers for cleaning,
transforming, and validating data inputs.

Example:
    from utils import clean_data
    result = clean_data(raw_input)
"""

import os
# ... rest of module`,
  },
  {
    section: 'Docstrings',
    signature: 'Class Docstring',
    description: 'Immediately after class header. Documents class purpose and public interface.',
    complexity: 'Concept',
    example: `class DataProcessor:
    """Process and transform data records.

    Attributes:
        source: The data source path.
        format: Output format ('json' or 'csv').

    Example:
        dp = DataProcessor('data.csv')
        dp.transform()
    """

    def __init__(self, source):
        self.source = source`,
  },
  {
    section: 'Docstrings',
    signature: 'r"""raw docstring"""',
    description: 'Use raw strings (r-prefix) to avoid backslash escape warnings. Recommended in Python 3.12+.',
    complexity: 'Concept',
    example: `def regex_match(pattern):
    r"""Match pattern against input.

    Pattern uses regex: \\d+ for digits,
    \\w+ for word characters.
    """
    pass

# Without r-prefix, \\d would cause warnings
# in Python 3.12+`,
  },

  // help Function
  {
    section: 'help & pydoc',
    signature: 'help(object)',
    description: 'Interactive documentation viewer. Shows docstrings, method signatures, and type info.',
    complexity: 'Concept',
    example: `# Get help on a function
help(len)

# Get help on a type
help(str)
help(list)

# Get help on a method
help(str.split)

# Get help on a module
import json
help(json)`,
  },
  {
    section: 'help & pydoc',
    signature: 'help() interactive mode',
    description: 'Call help() with no args for interactive mode. Type topics, modules, or "quit" to exit.',
    complexity: 'Concept',
    example: `>>> help()
help> str
# ... shows str documentation
help> modules
# ... lists all available modules
help> keywords
# ... lists Python keywords
help> quit
>>>`,
  },
  {
    section: 'help & pydoc',
    signature: 'pydoc command line',
    description: 'Run pydoc from terminal. Can generate HTML docs or start local doc server.',
    complexity: 'Concept',
    example: `# View docs in terminal
$ python -m pydoc str
$ python -m pydoc json

# Generate HTML file
$ python -m pydoc -w mymodule

# Start local doc server (port 8080)
$ python -m pydoc -p 8080
# Then open http://localhost:8080`,
  },

  // External Tools
  {
    section: 'External Tools',
    signature: 'Sphinx',
    description: 'Third-party tool for rich documentation. Generates HTML/PDF from reStructuredText or Markdown.',
    complexity: 'Concept',
    example: `# Install Sphinx
$ pip install sphinx

# Create docs project
$ sphinx-quickstart docs

# Build HTML docs
$ cd docs && make html

# Common in open source projects
# Supports cross-references, API docs,
# themes, and hosting on ReadTheDocs`,
  },
  {
    section: 'External Tools',
    signature: 'Type Hints as Docs',
    description: 'Type annotations serve as inline documentation. Tools like mypy validate them.',
    complexity: 'Concept',
    example: `def process(
    data: list[dict[str, int]],
    limit: int = 100
) -> list[str]:
    """Process data records.

    Types provide documentation:
    - data: list of dicts with str keys, int values
    - limit: max records to process
    - returns: list of processed strings
    """
    pass`,
  },
]
