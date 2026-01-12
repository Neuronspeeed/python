export const documentationIntroPart1 = `Documentation is code's instruction manual—it explains what code does, why it exists, and how to use it. Good documentation is the difference between code that's maintained for years and code that's rewritten because nobody understands it. Python offers a spectrum of documentation tools from simple comments to sophisticated auto-generated API docs. Understanding when and how to use each is essential for professional development.

THE DOCUMENTATION SPECTRUM: From quick notes to professional API docs.

Python provides five levels of documentation, each serving different audiences and purposes:

1. **Comments (#)**: For implementation notes, aimed at developers reading the code
2. **Docstrings ("""...""")**: For API documentation, aimed at users of the code
3. **Type Hints**: For static analysis and IDE support
4. **dir() and help()**: For runtime introspection
5. **External Tools (Sphinx)**: For comprehensive project documentation websites

The key principle: **Code tells you HOW, comments tell you WHY, docstrings tell you WHAT.**

COMMENTS (#): Implementation notes for developers.

Comments are for explaining non-obvious code—the "why" behind decisions, the "gotcha" to watch for, the "TODO" for future work. They're invisible to users of your code—only developers reading the source see them.

\`\`\`python
# GOOD: Explains WHY (non-obvious reasoning)
# Use binary search because dataset is sorted and can be 1M+ items
result = binary_search(data, target)

# GOOD: Warns about gotcha
# NOTE: Don't call this in a loop—it's O(n²) due to string concatenation
build_report(items)

# GOOD: Documents workaround
# HACK: requests doesn't support async, so we use thread pool
with ThreadPoolExecutor() as executor:
    results = executor.map(fetch_url, urls)

# BAD: Explains WHAT (code already shows this!)
# Loop through users
for user in users:
    # Print the user's name
    print(user.name)

# BAD: Obvious information
x = 5  # Set x to 5
\`\`\`python

When to Use Comments:
- Explain WHY you chose this approach (not WHAT the code does)
- Document workarounds and hacks
- Warn about non-obvious behavior or gotchas
- Mark TODOs, FIXMEs, HACKs
- Explain complex algorithms (with reference to source)
- Disable code temporarily during debugging

When NOT to Use Comments:
- Don't explain WHAT code does (code should be self-documenting)
- Don't duplicate docstrings
- Don't leave old code commented out (use version control!)
- Don't write obvious comments that add no value

DOCSTRINGS ("""..."""): API documentation for users of your code.

Docstrings are string literals immediately after \`def\`, \`class\`, or module start. They're stored in \`__doc__\` attribute and displayed by \`help()\`. They document the PUBLIC API—what users need to know to use your code, not how it's implemented internally.

\`\`\`python
def calculate_distance(lat1, lon1, lat2, lon2):
    """Calculate great circle distance between two points on Earth.

    Uses the Haversine formula to compute distance in kilometers.
    Accurate to within 0.5% for most points on Earth's surface.

    Args:
        lat1: Latitude of first point in decimal degrees (-90 to 90)
        lon1: Longitude of first point in decimal degrees (-180 to 180)
        lat2: Latitude of second point in decimal degrees
        lon2: Longitude of second point in decimal degrees

    Returns:
        Distance in kilometers as a float.

    Raises:
        ValueError: If any coordinate is out of valid range.

    Example:
        >>> calculate_distance(40.7128, -74.0060, 34.0522, -118.2437)
        3935.746
    """
    # Implementation here...
\`\`\`python

Docstring Formats (choose one, be consistent):

1. **Google Style** (most readable):
\`\`\`python
def function(arg1, arg2):
    """Summary line.

    Extended description.

    Args:
        arg1: Description of arg1
        arg2: Description of arg2

    Returns:
        Description of return value

    Raises:
        ValueError: When and why
    """
\`\`\`python

2. **NumPy Style** (for scientific code):
\`\`\`python
def function(arg1, arg2):
    """Summary line.

    Extended description.

    Parameters
    ----------
    arg1 : type
        Description
    arg2 : type
        Description

    Returns
    -------
    type
        Description
    """
\`\`\`python

3. **reStructuredText** (Sphinx default):
\`\`\`python
def function(arg1, arg2):
    """Summary line.

    Extended description.

    :param arg1: Description
    :type arg1: type
    :param arg2: Description
    :returns: Description
    :rtype: type
    """
\`\`\`python

Module-Level Docstrings:
\`\`\`python
"""Module for calculating geographical distances.

This module provides functions for computing distances between
points on Earth's surface using various formulas (Haversine,
Vincenty). All distances are in kilometers unless specified.

Typical usage example:
    from geomath import calculate_distance

    dist = calculate_distance(lat1, lon1, lat2, lon2)
"""

import math
# Rest of module...
\`\`\`python

Class Docstrings:
\`\`\`python
class BankAccount:
    """Represents a bank account with balance tracking.

    Attributes:
        account_number: Unique identifier for account
        balance: Current balance in dollars
        owner: Name of account owner
    """

    def __init__(self, account_number, owner):
        """Initialize account with zero balance.

        Args:
            account_number: Unique account ID
            owner: Account owner name
        """
        self.account_number = account_number
        self.owner = owner
        self.balance = 0.0
\`\`\`python

TYPE HINTS: Static typing for documentation and tooling.

Type hints are Python 3.5+ syntax for documenting expected types. They're COMPLETELY IGNORED at runtime—no type checking happens. But they enable static analysis tools (mypy, pyright) to catch type errors before running code, and IDEs use them for autocomplete.

\`\`\`python
def greet(name: str, age: int) -> str:
    """Greet a person by name and age.

    Args:
        name: Person's name
        age: Person's age in years

    Returns:
        Greeting message
    """
    return f"Hello {name}, you are {age} years old!"

# Static analysis catches errors:
greet("Alice", "30")  # mypy error: Expected int, got str
greet(42, 30)         # mypy error: Expected str, got int
\`\`\`python

Common Type Hints:
\`\`\`python
from typing import List, Dict, Optional, Union, Tuple, Callable

# Basic types
def func(x: int, y: float, z: bool) -> str:
    pass

# Collections
def process(items: List[int]) -> Dict[str, int]:
    pass

# Optional (None allowed)
def find(key: str) -> Optional[int]:
    return None  # or int

# Union (multiple types)
def parse(value: Union[int, str]) -> float:
    pass

# Tuple (fixed size)
def get_coords() -> Tuple[float, float]:
    return 10.5, 20.3

# Callable (function type)
def apply(func: Callable[[int], str], x: int) -> str:
    return func(x)
\`\`\`python

Modern Type Hints (Python 3.9+):
\`\`\`python
# Use built-in types instead of typing module
def process(items: list[int]) -> dict[str, int]:
    pass

# Use | instead of Union
def parse(value: int | str) -> float:
    pass
\`\`\`python
`
