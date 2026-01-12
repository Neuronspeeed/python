import type { Method } from '../../types'

export const docstringsMethods: Method[] = [
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
]
