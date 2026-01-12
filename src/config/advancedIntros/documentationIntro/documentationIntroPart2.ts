export const documentationIntroPart2 = `

DIR() FUNCTION: Runtime introspection—what attributes are available?

\`dir()\` lists all attribute names on an object. It's a "memory jogger" when exploring code interactively—shows what's available but not what it does.

\`\`\`python
# Explore module
import math
dir(math)
# ['__doc__', '__name__', 'acos', 'asin', 'atan', 'ceil', 'cos', ...]

# Explore type
dir(str)
# ['__add__', '__class__', 'capitalize', 'center', 'count', 'endswith', ...]

# Explore instance
s = "hello"
dir(s)
# Same as dir(str)

# Filter to just public methods (no dunder)
[name for name in dir(str) if not name.startswith('_')]
# ['capitalize', 'center', 'count', 'endswith', 'find', ...]
\`\`\`python

HELP() FUNCTION: Interactive documentation browser.

\`help()\` displays formatted docstrings with signature information. It's perfect for learning how to use unfamiliar code at the interactive prompt.

\`\`\`python
help(len)
# Help on built-in function len in module builtins:
#
# len(obj, /)
#     Return the number of items in a container.

help(str.split)
# Help on method_descriptor:
#
# split(self, /, sep=None, maxsplit=-1)
#     Return a list of substrings...

help(math.sqrt)
# Help on built-in function sqrt in module math:
#
# sqrt(x, /)
#     Return the square root of x.
\`\`\`python

PYDOC: Generate HTML documentation from docstrings.

Pydoc can generate HTML docs or run a local documentation server:

\`\`\`bash
# Generate HTML for module
python -m pydoc -w mymodule

# Start documentation server on localhost:8080
python -m pydoc -p 8080

# Open browser to module docs
python -m pydoc -b mymodule
\`\`\`python

SPHINX: Professional documentation for projects.

Sphinx is the standard for Python project documentation. It generates beautiful HTML docs from reStructuredText or Markdown source, automatically extracting docstrings.

Setup:
\`\`\`bash
# Install Sphinx
pip install sphinx

# Initialize in docs/ directory
mkdir docs
cd docs
sphinx-quickstart

# Build HTML docs
make html
\`\`\`python

Sphinx Features:
- Auto-generates API docs from docstrings
- Cross-references between pages
- Code highlighting
- Multiple output formats (HTML, PDF, ePub)
- Themes (Read the Docs, Alabaster, etc.)
- Extensions (autodoc, napoleon, coverage)

Example Sphinx Source (index.rst):
\`\`\`rst
Welcome to My Project
=====================

.. automodule:: mymodule
   :members:
   :undoc-members:
   :show-inheritance:
\`\`\`python

DOCUMENTATION BEST PRACTICES:

1. **Write docstrings for all public APIs**: Functions, classes, modules that users interact with.

2. **Don't document private internals**: Functions starting with \`_\` don't need docstrings (comments are fine).

3. **Examples in docstrings**: Show typical usage with \`>>>\` examples (testable with doctest!).

4. **Keep it updated**: Outdated docs are worse than no docs—they mislead users.

5. **One-line summary first**: First line should stand alone, separated by blank line from details.

6. **Type hints + docstrings**: Use both—type hints for structure, docstrings for behavior.

7. **README for projects**: Every project needs a README with: what it does, how to install, quick example.

DOCUMENTATION ANTI-PATTERNS:

1. **Obvious docstrings**: \`def add(a, b): """Add a and b"""\` adds no value.

2. **Outdated docs**: Function changed but docstring didn't—users get confused.

3. **Copy-paste docstrings**: \`def subtract(a, b): """Add a and b"""\` (forgot to update!)

4. **No examples**: Abstract description without showing how to use it.

5. **Implementation details in docstrings**: Docstrings are for users, not implementation notes.

DOCTEST: Executable documentation—examples that are also tests!

\`\`\`python
def factorial(n):
    """Calculate factorial of n.

    Args:
        n: Non-negative integer

    Returns:
        Factorial of n

    Examples:
        >>> factorial(0)
        1
        >>> factorial(5)
        120
        >>> factorial(-1)
        Traceback (most recent call last):
            ...
        ValueError: n must be non-negative
    """
    if n < 0:
        raise ValueError("n must be non-negative")
    if n == 0:
        return 1
    return n * factorial(n - 1)

# Run tests from docstrings
if __name__ == "__main__":
    import doctest
    doctest.testmod()
\`\`\`python

WHEN TO DOCUMENT WHAT:

| Code Element | Needs Docstring? | Needs Comments? | Needs Type Hints? |
|--------------|------------------|-----------------|-------------------|
| Public function | YES | Only for complex logic | YES |
| Private function (_func) | NO (optional) | YES for complexity | Optional |
| Class | YES | Rarely | YES |
| Module | YES | NO | N/A |
| Simple getter/setter | NO | NO | YES |
| Complex algorithm | YES | YES (explain steps) | YES |

REAL-WORLD EXAMPLE: Well-documented function.

\`\`\`python
from typing import List, Optional

def find_duplicates(items: List[int], threshold: int = 1) -> List[int]:
    """Find values that appear more than threshold times.

    Uses a frequency counter approach with O(n) time complexity.
    More efficient than nested loops for large datasets.

    Args:
        items: List of integers to search for duplicates
        threshold: Minimum number of occurrences (default: 1 means 2+ occurrences)

    Returns:
        List of values that appear more than threshold times,
        in order of first appearance.

    Raises:
        ValueError: If threshold is negative.

    Examples:
        >>> find_duplicates([1, 2, 3, 2, 1])
        [1, 2]
        >>> find_duplicates([1, 2, 3, 2, 1], threshold=2)
        []
        >>> find_duplicates([1, 1, 1, 2, 2], threshold=1)
        [1, 2]

    Note:
        This function does not preserve the original order of items,
        only the order in which duplicates were first seen.
    """
    if threshold < 0:
        raise ValueError("threshold must be non-negative")

    # Build frequency counter: O(n) time, O(n) space
    from collections import Counter
    counts = Counter(items)

    # Extract values exceeding threshold, preserving first-seen order
    seen = set()
    result = []
    for item in items:
        if counts[item] > threshold and item not in seen:
            result.append(item)
            seen.add(item)

    return result
\`\`\`python

BEST PRACTICES SUMMARY:

- Write docstrings for all public functions, classes, modules
- Use type hints for static analysis and IDE support
- Comments explain WHY, not WHAT
- Keep documentation close to code
- Use examples in docstrings (great for doctest)
- Generate API docs with Sphinx for projects
- Update docs when code changes
- Don't document the obvious
- Use consistent docstring format across project
- Test examples with doctest`
