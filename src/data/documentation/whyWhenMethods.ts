import type { Method } from '../../types'

export const whyWhenMethods: Method[] = [
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
]
