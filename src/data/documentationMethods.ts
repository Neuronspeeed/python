import type { Method } from '../types'

export const documentationMethods: Method[] = [
  // Why & When
  {
    section: 'Why & When',
    signature: 'Comments vs Docstrings vs External Docs',
    description: 'Comments: implementation details. Docstrings: public API. External docs: guides, tutorials. Choose based on audience and scope.',
    complexity: 'Concept',
    example: `# COMMENTS - for developers reading the code
def calculate_price(items):
    # Apply 10% bulk discount for orders > 100 items
    # Business rule: effective until Q2 2024
    if len(items) > 100:
        discount = 0.10
    return total * (1 - discount)

# DOCSTRINGS - for API users
def calculate_price(items):
    """Calculate total price with applicable discounts.

    Args:
        items: List of items in the order

    Returns:
        Final price as float
    """
    # Implementation details in comments
    if len(items) > 100:
        discount = 0.10
    return total * (1 - discount)

# EXTERNAL DOCS (Sphinx) - for comprehensive guides
# - Getting started tutorials
# - Architecture overviews
# - API reference (auto-generated from docstrings)
# - Examples and best practices

# Rule of thumb:
# - Private code → comments only
# - Public functions/classes → docstrings required
# - Library/framework → external docs (Sphinx)`,
  },
  {
    section: 'Why & When',
    signature: 'When to write documentation',
    description: 'Always: public APIs, complex logic. Sometimes: internal functions. Never: obvious code. Time investment vs future savings.',
    complexity: 'Concept',
    example: `# ALWAYS DOCUMENT - public API
def parse_config(path: str) -> dict:
    """Load and parse configuration file.

    Required for all public functions.
    Users need to know how to call this.
    """
    pass

# ALWAYS DOCUMENT - complex logic
def optimize_route(graph, constraints):
    """Find optimal path using A* with custom heuristics.

    Complex algorithms need explanation.
    Even YOU won't remember this in 6 months.

    Algorithm: Modified A* with:
    - Bidirectional search
    - Dynamic weight adjustment
    - Constraint propagation
    """
    pass

# SOMETIMES DOCUMENT - internal helper
def _validate_input(data):
    # Basic validation, name is self-explanatory
    # Only add docstring if logic is tricky
    return isinstance(data, dict) and 'id' in data

# NEVER DOCUMENT - obvious code
def get_name(user):
    return user.name  # Don't write docstring!

# Cost/benefit:
# Documentation time: 2-5 minutes per function
# Debugging time saved: 30+ minutes when you revisit
# Onboarding time saved: Hours for new team members`,
  },
  {
    section: 'Why & When',
    signature: 'Docstring styles: Google vs NumPy vs Sphinx',
    description: 'Google: readable, concise. NumPy: detailed, scientific. Sphinx: reStructuredText, tool-friendly. Pick one style, be consistent.',
    complexity: 'Concept',
    example: `# GOOGLE STYLE - most popular, readable
def greet(name, title=None):
    """Greet a person with optional title.

    Args:
        name: Person's name
        title: Optional title (Dr., Prof., etc.)

    Returns:
        Greeting string

    Raises:
        ValueError: If name is empty
    """
    pass

# NUMPY STYLE - scientific community
def compute(x, y):
    """
    Compute complex result.

    Parameters
    ----------
    x : np.ndarray
        Input array of shape (n, m)
    y : float
        Scaling factor

    Returns
    -------
    result : np.ndarray
        Scaled output

    Notes
    -----
    Uses FFT for performance.
    """
    pass

# SPHINX (reST) STYLE - old, verbose
def process(data):
    """Process input data.

    :param data: Input data
    :type data: dict
    :returns: Processed result
    :rtype: list
    :raises KeyError: If required key missing
    """
    pass

# Recommendation:
# - New projects → Google style (cleanest)
# - Scientific → NumPy style (detailed)
# - Legacy → Sphinx style (compatibility)
# - Team → whatever they already use!`,
  },
  {
    section: 'Why & When',
    signature: 'Type hints as documentation',
    description: 'Type hints document expected types and replace verbose docstrings. Use for new code. Validated by mypy/pyright.',
    complexity: 'Concept',
    example: `# WITHOUT TYPE HINTS - need verbose docstring
def fetch_users(database, max_count):
    """Fetch users from database.

    Args:
        database: Database connection object
        max_count: Maximum number of users (int)

    Returns:
        List of user dictionaries, each with 'id' and 'name' keys
    """
    pass

# WITH TYPE HINTS - types self-document
from typing import TypedDict

class User(TypedDict):
    id: int
    name: str

def fetch_users(
    database: DatabaseConnection,
    max_count: int = 100
) -> list[User]:
    """Fetch users from database."""
    pass
# Types tell the full story!

# Benefits:
# - IDE autocomplete
# - Static type checking (mypy)
# - Less docstring boilerplate
# - Self-documenting code

# Use when:
# - Python 3.9+ (modern syntax)
# - Team uses type checkers
# - Library/public API
#
# Skip when:
# - Quick scripts
# - Python < 3.9
# - Dynamic/meta code`,
  },
  {
    section: 'Why & When',
    signature: 'Sphinx vs pydoc - when to invest',
    description: 'pydoc: free, built-in, good enough for small projects. Sphinx: rich docs, cross-refs, themes. Worth investment for libraries.',
    complexity: 'Concept',
    example: `# PYDOC - built-in, zero setup
# Good for:
# - Personal projects
# - Internal tools
# - Quick reference
# - Learning Python

# Just write docstrings:
def my_function():
    """Do something useful."""
    pass

# View docs:
# python -m pydoc mymodule

# SPHINX - rich documentation system
# Worth investment for:
# - Open source libraries
# - Team projects (>3 people)
# - Complex APIs
# - Public documentation sites

# Setup cost:
# - Initial: 2-4 hours
# - Maintenance: 10-20% of dev time
# - Hosting (ReadTheDocs): Free!

# Features:
# - Beautiful themes
# - Cross-references
# - API auto-generation
# - Multiple formats (HTML, PDF)
# - Search functionality
# - Version tracking

# Decision matrix:
# Small script → just comments
# Internal tool → docstrings + pydoc
# Team project → docstrings + basic Sphinx
# Open source → full Sphinx + ReadTheDocs
# Framework/library → comprehensive Sphinx`,
  },

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
