import { TypePage } from '../components/TypePage'
import { documentationMethods } from '../data/documentationMethods'
import { modulesMethods } from '../data/modules'
import { exceptionsMethods } from '../data/exceptions'
import { loggingMethods } from '../data/logging'
import { concurrencyMethods } from '../data/concurrency'
import { fileioMethods } from '../data/fileio'

const documentationIntro = `Documentation is code's instruction manual—it explains what code does, why it exists, and how to use it. Good documentation is the difference between code that's maintained for years and code that's rewritten because nobody understands it. Python offers a spectrum of documentation tools from simple comments to sophisticated auto-generated API docs. Understanding when and how to use each is essential for professional development.

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
\`\`\`

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
\`\`\`

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
\`\`\`

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
\`\`\`

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
\`\`\`

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
\`\`\`

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
\`\`\`

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
\`\`\`

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
\`\`\`

Modern Type Hints (Python 3.9+):
\`\`\`python
# Use built-in types instead of typing module
def process(items: list[int]) -> dict[str, int]:
    pass

# Use | instead of Union
def parse(value: int | str) -> float:
    pass
\`\`\`

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
\`\`\`

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
\`\`\`

PYDOC: Generate HTML documentation from docstrings.

Pydoc can generate HTML docs or run a local documentation server:

\`\`\`bash
# Generate HTML for module
python -m pydoc -w mymodule

# Start documentation server on localhost:8080
python -m pydoc -p 8080

# Open browser to module docs
python -m pydoc -b mymodule
\`\`\`

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
\`\`\`

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
\`\`\`

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
\`\`\`

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
\`\`\`

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

export function DocumentationPage() {
  return (
    <TypePage
      type="Documentation" badge="doc" color="var(--accent-logging)"
      description="Tools for documenting Python code: comments, docstrings, dir(), help(), and external tools."
      intro={documentationIntro}
      methods={documentationMethods}
    />
  )
}

const modulesIntro = `Modules are Python's fundamental unit of code organization—every .py file is automatically a module with its own namespace. Understanding import mechanics, the module search path, and package structure is essential for building maintainable Python projects. Mastering modules means understanding how Python finds code, loads it, and makes it available to your program.

THE MODULE CONCEPT: Physical files mapped to logical namespaces.

Every .py file is a module. When you write \`import mymodule\`, Python finds mymodule.py, executes it, and creates a module object containing all top-level names (functions, classes, variables). This automatic namespace isolation prevents naming conflicts—\`x\` in module A doesn't conflict with \`x\` in module B.

\`\`\`python
# mymodule.py
x = 42
def greet(name):
    return f"Hello, {name}"

# main.py
import mymodule
print(mymodule.x)        # 42
print(mymodule.greet("Alice"))  # Hello, Alice
\`\`\`

IMPORT MECHANICS: The three-step process.

When Python encounters \`import mymodule\` for the FIRST time, it performs three steps:

1. **FIND**: Search sys.path for mymodule.py
2. **COMPILE**: Compile source to bytecode (.pyc in __pycache__)
3. **EXECUTE**: Run top-to-bottom to populate module namespace

Subsequent imports skip all three steps—Python reuses the cached module object from sys.modules. This means module code runs ONCE per program, not once per import.

\`\`\`python
# expensive_module.py
print("Initializing expensive module...")
import time
time.sleep(2)  # Expensive initialization
DATA = [1, 2, 3, 4, 5]

# main.py
import expensive_module  # Prints "Initializing...", waits 2 seconds
import expensive_module  # INSTANT! Uses cached module, no print
import expensive_module  # Still instant

# Verify caching:
import sys
print('expensive_module' in sys.modules)  # True
\`\`\`

MODULE SEARCH PATH (sys.path): Where Python looks for modules.

Python searches directories in sys.path order. First match wins!

\`\`\`python
import sys
print(sys.path)
# [
#   '',                      # Current directory (script's directory)
#   '/usr/lib/python3.11',   # Standard library
#   '/usr/lib/python3.11/site-packages',  # Third-party packages
#   ...
# ]
\`\`\`

Search Order:
1. **Current directory** (where script is running)
2. **PYTHONPATH** environment variable directories
3. **Standard library** installation directory
4. **site-packages** (pip install location)

CRITICAL GOTCHA: Local files shadow stdlib modules!

\`\`\`python
# BAD: Create a file named random.py in your project
# random.py
def my_function():
    pass

# main.py
import random
print(random.randint(1, 10))  # AttributeError: no 'randint'!
# Your local random.py shadows stdlib random module!

# FIX: Rename your file to something else (my_random.py)
\`\`\`

IMPORT VS FROM: Preserving vs collapsing namespaces.

\`\`\`python
# IMPORT: Load module as object, access via dot notation
import math
print(math.sqrt(16))  # 4.0
# Namespace preserved: clear where sqrt comes from

# FROM: Copy specific names into current namespace
from math import sqrt
print(sqrt(16))  # 4.0
# sqrt is now a local name, namespace collapsed

# FROM *: Copy ALL public names (BAD PRACTICE!)
from math import *
print(sqrt(16))  # Works, but where did sqrt come from?
print(pi)        # Works, but code is harder to understand
# Pollutes namespace, makes debugging hard
\`\`\`

When to Use What:
- **\`import module\`**: Default choice, clear origin of names
- **\`from module import name\`**: When typing \`module.name\` repeatedly is annoying
- **\`from module import *\`**: NEVER! (Except in interactive prompt for exploration)

AS Keyword: Aliasing for shorter names or avoiding conflicts.

\`\`\`python
# Long module names
import matplotlib.pyplot as plt
plt.plot([1, 2, 3])  # Shorter than matplotlib.pyplot.plot()

# Avoiding conflicts
from collections import Counter
from my_stats import Counter as MyCounter  # Avoid name collision
\`\`\`

PACKAGES: Organizing modules into directories.

A package is a directory containing \`__init__.py\`. This makes the directory importable as a module.

\`\`\`
myproject/
    __init__.py         # Makes 'myproject' a package
    utils.py            # myproject.utils
    database/
        __init__.py     # Makes 'myproject.database' a package
        models.py       # myproject.database.models
        queries.py      # myproject.database.queries
\`\`\`

\`\`\`python
# Import from package
import myproject.utils
from myproject.database import models
from myproject.database.queries import get_user

# Package __init__.py can expose submodules:
# myproject/__init__.py
from . import utils
from .database import models

# Now users can do:
import myproject
myproject.utils.some_function()
myproject.models.User()
\`\`\`

RELATIVE VS ABSOLUTE IMPORTS: Within packages.

\`\`\`python
# myproject/database/queries.py

# ABSOLUTE IMPORT (from project root):
from myproject.database.models import User
from myproject.utils import helper

# RELATIVE IMPORT (from current module):
from .models import User       # Same directory
from ..utils import helper     # Parent directory
from .submodule import func    # Subdirectory

# Relative imports ONLY work inside packages!
# They DON'T work in scripts run directly.
\`\`\`

Best Practice:
- Use **absolute imports** for clarity (explicit is better than implicit)
- Use **relative imports** within a package to avoid hard-coding package name
- NEVER use relative imports in scripts meant to be run directly

CIRCULAR IMPORTS: The classic gotcha.

Circular imports happen when module A imports B, and B imports A. This often causes \`AttributeError\` or \`ImportError\`.

\`\`\`python
# a.py
from b import foo  # Import from b
def bar():
    return "bar"

# b.py
from a import bar  # Import from a - CIRCULAR!
def foo():
    return "foo"

# main.py
import a  # ImportError: cannot import name 'bar' from partially initialized module 'a'
\`\`\`

Why It Fails:
1. main.py imports a
2. a.py tries to import from b
3. b.py tries to import from a (but a isn't finished initializing!)
4. Error!

Solutions:

1. **Restructure** (best): Move shared code to a third module
\`\`\`python
# shared.py
def bar():
    return "bar"

# a.py
from shared import bar

# b.py
from shared import bar
\`\`\`

2. **Import inside function** (defer import until needed):
\`\`\`python
# a.py
def bar():
    from b import foo  # Import when function is CALLED, not at module load
    return foo()
\`\`\`

3. **Import at bottom** (after definitions):
\`\`\`python
# a.py
def bar():
    return "bar"

from b import foo  # Import AFTER defining bar
\`\`\`

MODULE RELOADING: For interactive development.

By default, modules are cached in sys.modules. Changes to source files don't take effect until you restart Python. For interactive development, use \`importlib.reload()\`:

\`\`\`python
import mymodule
mymodule.some_function()

# Edit mymodule.py in your editor, save changes...

# Regular import won't see changes:
import mymodule  # Uses cached version!

# Reload to see changes:
import importlib
importlib.reload(mymodule)  # Re-executes mymodule.py
mymodule.some_function()    # Now uses new code
\`\`\`

Reload Gotchas:
- Objects created from OLD module still use old code
- \`from module import name\` doesn't see reloaded changes (still references old object)
- Reload is for development only—production code should restart

THE __name__ == "__main__" PATTERN: Script vs module mode.

Every module has a \`__name__\` attribute:
- When imported: \`__name__\` is the module name
- When run as script: \`__name__\` is \`"__main__"\`

\`\`\`python
# mymodule.py
def greet(name):
    return f"Hello, {name}"

# This only runs when script is executed directly:
if __name__ == "__main__":
    # Test code, CLI interface, demos
    print(greet("World"))
    import doctest
    doctest.testmod()

# When imported, __name__ is "mymodule", so this block is skipped
\`\`\`

Use Cases:
- Self-testing code
- CLI interfaces
- Example usage demonstrations
- Running benchmarks

PRIVACY CONVENTIONS: Marking internal implementation.

Python has no true private members, but conventions signal "this is internal, don't use":

\`\`\`python
# mymodule.py
PUBLIC_CONSTANT = 42
_internal_helper = "not for export"

def public_function():
    return _internal_helper()

def _internal_function():
    return "internal"

# from mymodule import * will NOT import:
# - _internal_helper
# - _internal_function
# But they're still accessible via mymodule._internal_function
\`\`\`

Control \`from module import *\` with \`__all__\`:

\`\`\`python
# mymodule.py
__all__ = ['public_function', 'PUBLIC_CONSTANT']

PUBLIC_CONSTANT = 42
ANOTHER_CONSTANT = 99  # Not in __all__

def public_function():
    pass

def another_function():  # Not in __all__
    pass

# from mymodule import * will ONLY import:
# - public_function
# - PUBLIC_CONSTANT
\`\`\`

NAMESPACE PACKAGES (PEP 420): Packages without __init__.py.

Python 3.3+ allows packages without \`__init__.py\`. Useful for splitting a package across multiple directories:

\`\`\`
site-packages/
    mynamespace/
        plugin1.py
    another-location/
        mynamespace/
            plugin2.py

# Both directories contribute to 'mynamespace' package
import mynamespace.plugin1
import mynamespace.plugin2
\`\`\`

Use for: Plugin systems, splitting packages across repos.

BEST PRACTICES SUMMARY:

- Use absolute imports for clarity (\`from myproject.utils import helper\`)
- Prefer \`import module\` over \`from module import *\`
- NEVER shadow stdlib module names (random.py, string.py, etc.)
- Use \`if __name__ == "__main__":\` for script code
- Mark internal implementation with leading underscore
- Define \`__all__\` to control \`from module import *\`
- Avoid circular imports by refactoring shared code
- Use packages (__init__.py) to organize related modules
- Keep sys.path manipulation to a minimum
- Document dependencies (requirements.txt, setup.py)

COMMON GOTCHAS:

1. **Shadowing stdlib**: Local \`random.py\` shadows stdlib \`random\`
2. **Circular imports**: A imports B, B imports A
3. **Mutable default arguments persist across imports**: Module-level \`cache = []\` is shared!
4. **\`from...import\` doesn't see reloads**: Reload doesn't update already-imported names
5. **Relative imports in scripts**: Relative imports only work inside packages
6. **Case sensitivity**: \`MyModule.py\` vs \`mymodule.py\` can cause issues on case-insensitive filesystems
7. **Module executed twice**: Running a package module as script breaks relative imports

REAL-WORLD PATTERN: Structured project.

\`\`\`
myproject/
    __init__.py           # Empty or exports main API
    __main__.py           # python -m myproject runs this
    cli.py                # Command-line interface
    core/
        __init__.py       # Expose core.api
        api.py            # Public API
        _internal.py      # Private implementation
    utils/
        __init__.py
        helpers.py
    tests/
        __init__.py
        test_api.py
    setup.py              # Package metadata
    README.md
    requirements.txt
\`\`\`

\`\`\`python
# myproject/__init__.py
from .core.api import main_function
from .utils.helpers import helper

__all__ = ['main_function', 'helper']
__version__ = '1.0.0'

# Users can do:
from myproject import main_function
\`\`\``

export function ModulesPage() {
  return (
    <TypePage
      type="Modules" badge="import" color="var(--accent-concurrency)"
      description="Import mechanics, bytecode, packages, and program architecture."
      intro={modulesIntro}
      methods={modulesMethods}
    />
  )
}

const exceptionsIntro = `Exception handling is Python's structured approach to dealing with runtime errors and exceptional conditions. Unlike error codes or sentinel values, exceptions provide a clean separation between error detection and error handling, enabling robust, readable code that gracefully handles failures without cluttering business logic with endless if checks.

EXCEPTION PHILOSOPHY: Python follows the EAFP principle—"Easier to Ask for Forgiveness than Permission." Instead of checking if an operation is safe before attempting it (LBYL: Look Before You Leap), Python encourages trying the operation and catching exceptions if it fails. This approach is more Pythonic, faster (one try/except vs multiple checks), and handles race conditions better.

\`\`\`python
# LBYL: Look Before You Leap (defensive, verbose)
if key in dictionary:
    value = dictionary[key]
else:
    value = default

if os.path.exists(filename):
    with open(filename) as f:
        data = f.read()

# EAFP: Easier to Ask for Forgiveness than Permission (Pythonic!)
try:
    value = dictionary[key]
except KeyError:
    value = default

try:
    with open(filename) as f:
        data = f.read()
except FileNotFoundError:
    handle_missing_file()
\`\`\`

Why EAFP wins: (1) Atomic—no race condition between check and use. (2) Faster—one operation instead of check + operation. (3) More readable—exception handling is separate from main logic. (4) Handles unexpected errors—what if file exists but lacks read permission?

TRY/EXCEPT/ELSE/FINALLY STRUCTURE: The complete try statement has four clauses with strict ordering.

\`\`\`python
try:
    # Code that might raise exceptions
    result = risky_operation()
except SpecificError as e:
    # Handle specific exception type
    handle_error(e)
except (TypeError, ValueError) as e:
    # Handle multiple exception types
    handle_type_or_value_error(e)
except Exception as e:
    # Catch-all for unexpected errors (use sparingly!)
    log_unexpected_error(e)
else:
    # Runs ONLY if NO exception occurred in try block
    # Don't put this code in try—keeps except handlers focused
    process_success(result)
finally:
    # ALWAYS runs—even if exception, even if return/break
    # Cleanup: close files, release locks, restore state
    cleanup_resources()
\`\`\`

Key Rules:
- Order must be: try → except(s) → else → finally
- Must have at least one except OR a finally
- Else runs only if try completes with NO exception
- Finally ALWAYS runs (even if exception propagates up)
- Catch specific exceptions first, general exceptions last

THE EXCEPTION HIERARCHY: Python's built-in exceptions form an inheritance tree. Catching a parent class catches ALL its subclasses.

\`\`\`python
BaseException                    # Don't catch this! System exits inherit from it
├── SystemExit                   # sys.exit() raises this
├── KeyboardInterrupt            # Ctrl+C raises this
├── GeneratorExit               # generator.close() raises this
└── Exception                    # Catch this for "normal" errors
    ├── StopIteration           # Iteration complete
    ├── ArithmeticError
    │   ├── ZeroDivisionError   # Division by zero
    │   ├── OverflowError       # Result too large
    │   └── FloatingPointError
    ├── LookupError
    │   ├── IndexError          # Index out of range
    │   └── KeyError            # Dict key not found
    ├── ValueError              # Right type, wrong value
    ├── TypeError               # Wrong type
    ├── AttributeError          # Attribute doesn't exist
    ├── NameError               # Variable not defined
    ├── OSError                 # Operating system error
    │   ├── FileNotFoundError   # File doesn't exist
    │   ├── PermissionError     # Insufficient permissions
    │   └── IOError             # I/O operation failed
    └── RuntimeError            # Generic runtime error
\`\`\`

CRITICAL: NEVER use bare \`except:\` or \`except BaseException:\`—this catches SystemExit (sys.exit()) and KeyboardInterrupt (Ctrl+C), making your program impossible to stop! Use \`except Exception:\` for catch-all handlers.

\`\`\`python
# WRONG: Catches EVERYTHING including Ctrl+C and sys.exit()
try:
    do_something()
except:  # or except BaseException:
    pass  # User can't stop program with Ctrl+C!

# CORRECT: Catch only "normal" errors
try:
    do_something()
except Exception as e:
    handle_error(e)  # Ctrl+C and sys.exit() still work
\`\`\`

COMMON EXCEPTION TYPES: Understanding when each exception is raised helps you write targeted handlers.

**KeyError**: Accessing missing dictionary key
\`\`\`python
data = {"name": "Alice"}
try:
    age = data["age"]  # Raises KeyError
except KeyError:
    age = None  # Or use data.get("age")
\`\`\`

**IndexError**: List/tuple index out of range
\`\`\`python
items = [1, 2, 3]
try:
    item = items[10]  # Raises IndexError
except IndexError:
    item = None
\`\`\`

**ValueError**: Correct type but invalid value
\`\`\`python
try:
    number = int("not a number")  # Raises ValueError
except ValueError:
    number = 0
\`\`\`

**TypeError**: Wrong type for operation
\`\`\`python
try:
    result = "5" + 5  # Raises TypeError (can't add str + int)
except TypeError:
    result = "5" + str(5)
\`\`\`

**FileNotFoundError**: File doesn't exist
\`\`\`python
try:
    with open("missing.txt") as f:
        data = f.read()
except FileNotFoundError:
    data = ""
\`\`\`

**AttributeError**: Object lacks attribute
\`\`\`python
try:
    length = obj.length  # obj has no 'length' attribute
except AttributeError:
    length = len(obj)  # Try len() instead
\`\`\`

RAISING EXCEPTIONS: Use \`raise\` to signal errors in your own code.

\`\`\`python
def withdraw(balance, amount):
    if amount > balance:
        raise ValueError(f"Insufficient funds: {balance} < {amount}")
    return balance - amount

# Re-raise current exception (intercept, log, pass up)
try:
    risky_operation()
except Exception as e:
    log_error(e)
    raise  # Re-raise same exception (preserves traceback)

# Raise new exception
try:
    process_data()
except ValueError as e:
    raise RuntimeError("Processing failed") from e  # Chain exceptions
\`\`\`

EXCEPTION CHAINING: Use \`raise ... from ...\` to preserve context when wrapping exceptions.

\`\`\`python
# WITHOUT chaining: loses context
try:
    data = json.loads(text)
except json.JSONDecodeError:
    raise ValueError("Invalid data")  # Original error is lost!

# WITH chaining: preserves context
try:
    data = json.loads(text)
except json.JSONDecodeError as e:
    raise ValueError("Invalid data") from e
# Traceback shows BOTH errors:
#   JSONDecodeError: ... (original)
#   ValueError: Invalid data (wrapper)

# Suppress context with "from None"
try:
    data = json.loads(text)
except json.JSONDecodeError:
    raise ValueError("Invalid data") from None  # Hide original error
\`\`\`

CUSTOM EXCEPTIONS: Create domain-specific exceptions for your application.

\`\`\`python
# Simple custom exception
class ValidationError(Exception):
    """Raised when data validation fails"""
    pass

# Exception with extra state
class HTTPError(Exception):
    def __init__(self, status_code, message):
        self.status_code = status_code
        self.message = message
        super().__init__(f"{status_code}: {message}")

# Exception hierarchy for fine-grained handling
class DatabaseError(Exception):
    """Base class for database errors"""
    pass

class ConnectionError(DatabaseError):
    """Cannot connect to database"""
    pass

class QueryError(DatabaseError):
    """SQL query failed"""
    pass

# Usage
try:
    execute_query(sql)
except ConnectionError:
    reconnect()
except QueryError as e:
    log_invalid_query(e)
except DatabaseError:  # Catches both subclasses
    alert_admin()
\`\`\`

THE ELSE CLAUSE: Runs only if try completes with NO exception. Keeps success logic separate from error handling.

\`\`\`python
# WITHOUT else: success code mixed with risky code
try:
    data = load_data()
    process(data)  # If this raises, except catches it (confusing!)
except IOError:
    handle_load_error()

# WITH else: clean separation
try:
    data = load_data()
except IOError:
    handle_load_error()
else:
    process(data)  # Only runs if load succeeded
    # If process() raises, it propagates up (clearer!)
\`\`\`

THE FINALLY CLAUSE: ALWAYS executes—even if exception propagates, even if return/break in try/except.

\`\`\`python
def read_file(filename):
    f = open(filename)
    try:
        return f.read()  # Returns here...
    except Exception as e:
        log_error(e)
        return None      # ...or here...
    finally:
        f.close()        # ...but this ALWAYS runs first!

# Common use: cleanup resources
lock.acquire()
try:
    critical_section()
finally:
    lock.release()  # Guaranteed to release, even if exception
\`\`\`

CONTEXT MANAGERS: The \`with\` statement is syntactic sugar for try/finally cleanup.

\`\`\`python
# Manual cleanup with try/finally
f = open("file.txt")
try:
    data = f.read()
finally:
    f.close()

# Automatic cleanup with context manager
with open("file.txt") as f:
    data = f.read()
# File automatically closed, even if exception!

# Multiple context managers
with open("input.txt") as infile, open("output.txt", "w") as outfile:
    outfile.write(infile.read())

# Custom context manager using __enter__ and __exit__
class Timer:
    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.time() - self.start
        print(f"Elapsed: {self.elapsed:.2f}s")
        return False  # Don't suppress exceptions

with Timer() as t:
    slow_operation()
# Prints elapsed time automatically
\`\`\`

ASSERTION: Use \`assert\` for debugging and development checks, NOT production validation.

\`\`\`python
def calculate_average(numbers):
    assert len(numbers) > 0, "List cannot be empty"  # Debug check
    return sum(numbers) / len(numbers)

# Assertions can be DISABLED with python -O
# Never use for security checks or input validation!

# WRONG: using assert for validation
def withdraw(amount):
    assert amount > 0  # Can be disabled!

# RIGHT: using raise for validation
def withdraw(amount):
    if amount <= 0:
        raise ValueError("Amount must be positive")
\`\`\`

PERFORMANCE IMPACT: Exceptions are expensive when raised but free when not raised.

\`\`\`python
# Exceptions are slow when raised (microseconds vs nanoseconds)
# Use for exceptional conditions, not control flow in hot loops

# SLOW: Exception in tight loop
total = 0
for i in range(1000000):
    try:
        total += 1 / i  # Raises ZeroDivisionError once
    except ZeroDivisionError:
        pass

# FAST: Check prevents exception
total = 0
for i in range(1000000):
    if i != 0:
        total += 1 / i

# But for rare exceptions, try/except is fine
try:
    with open(filename) as f:  # Fast path: file usually exists
        return f.read()
except FileNotFoundError:  # Rare: file missing is exceptional
    return default_content()
\`\`\`

Cost breakdown:
- Setting up try block: nearly free (no overhead)
- Exception NOT raised: free (no cost)
- Exception raised: expensive (stack unwinding, traceback creation)

Rule: Use exceptions for exceptional conditions. For common cases, use if checks.

EXCEPTION HANDLING PATTERNS: Practical patterns for robust code.

**Pattern 1: Specific to General**
\`\`\`python
try:
    data = json.loads(text)
except json.JSONDecodeError:
    # Handle JSON-specific errors
    data = parse_fallback(text)
except ValueError:
    # Handle other value errors
    data = None
except Exception as e:
    # Catch-all for unexpected errors
    log_unexpected(e)
    raise
\`\`\`

**Pattern 2: Multi-Exception Handler**
\`\`\`python
try:
    result = risky_operation()
except (KeyError, IndexError, TypeError) as e:
    # Handle any of these similarly
    result = default_value
\`\`\`

**Pattern 3: Cleanup in Finally**
\`\`\`python
connection = create_connection()
try:
    perform_operations(connection)
except OperationError:
    connection.rollback()
    raise
else:
    connection.commit()
finally:
    connection.close()  # Always cleanup
\`\`\`

**Pattern 4: Suppress Specific Errors**
\`\`\`python
try:
    os.remove(temp_file)  # Delete if exists
except FileNotFoundError:
    pass  # Already deleted, that's fine
\`\`\`

**Pattern 5: Retry with Backoff**
\`\`\`python
import time

for attempt in range(3):
    try:
        response = api_call()
        break
    except ConnectionError:
        if attempt == 2:  # Last attempt
            raise
        time.sleep(2 ** attempt)  # Exponential backoff
\`\`\`

EXCEPTION ANTI-PATTERNS: Common mistakes to avoid.

\`\`\`python
# ANTI-PATTERN 1: Bare except (catches Ctrl+C and sys.exit!)
try:
    do_something()
except:  # NEVER DO THIS
    pass

# FIX: Catch Exception, not everything
try:
    do_something()
except Exception:
    pass

# ANTI-PATTERN 2: Too broad try block
try:
    data = load_data()
    validate(data)
    process(data)
    save_results(data)
except Exception:
    # Which operation failed? We don't know!
    pass

# FIX: Narrow try blocks
data = load_data()
validate(data)

try:
    process(data)
except ProcessError:
    handle_process_error()

try:
    save_results(data)
except IOError:
    handle_save_error()

# ANTI-PATTERN 3: Silently swallowing errors
try:
    important_operation()
except Exception:
    pass  # Error disappears, impossible to debug!

# FIX: Log the error
try:
    important_operation()
except Exception as e:
    logger.error(f"Operation failed: {e}", exc_info=True)
    raise

# ANTI-PATTERN 4: Using exceptions for control flow
try:
    while True:
        item = next(iterator)
        process(item)
except StopIteration:
    pass  # Reached end

# FIX: Use for loop (Pythonic iteration)
for item in iterator:
    process(item)
\`\`\`

BEST PRACTICES SUMMARY:

1. **Prefer EAFP over LBYL**: Try and catch exceptions instead of checking conditions first
2. **Catch specific exceptions**: \`except ValueError:\` not \`except Exception:\`
3. **Never use bare except**: Always \`except Exception:\` minimum
4. **Use else clause**: Separate success logic from error handling
5. **Always cleanup with finally**: Or use \`with\` statement for context managers
6. **Raise exceptions for errors**: Don't return error codes or None for failures
7. **Chain exceptions**: Use \`raise NewError from original\` to preserve context
8. **Custom exceptions**: Create domain-specific exception classes
9. **Log before re-raising**: Intercept, log with context, then \`raise\`
10. **Don't use assert for validation**: It can be disabled! Use \`raise\` instead`

export function ExceptionsPage() {
  return (
    <TypePage
      type="Exceptions" badge="try" color="var(--accent-exceptions)"
      description="Exception handling in Python. Try/except for graceful error handling, raise for signaling errors."
      intro={exceptionsIntro}
      methods={exceptionsMethods}
    />
  )
}

const loggingIntro = `Logging, debugging, and profiling are essential tools for building production-ready applications and optimizing performance. The \`logging\` module provides structured, leveled output that's configurable and persistent—far superior to \`print()\` for anything beyond simple scripts. Understanding how to properly log, debug, and profile your code is critical for maintainability, troubleshooting, and performance optimization.

LOGGING VS PRINT(): Why \`print()\` fails in production and why \`logging\` is the professional choice.

\`print()\` writes to stdout with no levels, no configuration, and no filtering—it's all-or-nothing output. Once your code is running in production, you can't easily disable prints without editing code. \`logging\` solves this with five severity levels (DEBUG, INFO, WARNING, ERROR, CRITICAL) that can be configured per-module, written to multiple destinations, formatted with timestamps/metadata, and toggled on/off without code changes.

\`\`\`python
# PRINT: All-or-nothing, no context, clutters output
print("User logged in")
print("Processing data...")
print("Error occurred!")  # How severe? What timestamp?

# LOGGING: Leveled, configurable, structured
import logging

logging.info("User logged in")          # Level: INFO
logging.debug("Processing data...")     # Level: DEBUG (hidden in prod)
logging.error("Error occurred!")        # Level: ERROR (always shown)

# Output includes timestamp, level, module:
# 2024-01-15 14:23:45 INFO User logged in
# 2024-01-15 14:23:46 ERROR Error occurred!
\`\`\`

THE FIVE LOG LEVELS: Understanding when to use each level is critical for effective logging.

1. **DEBUG**: Detailed diagnostic information for developers. Use during development to trace execution flow, variable values, loop iterations. NEVER leave expensive debug logging in hot paths—it slows production! Typically disabled in production.

2. **INFO**: Confirmational messages that the system is working as expected. Use for: user actions (login, logout), business events (order placed, payment processed), system state changes (server started, connection established). Safe to leave in production—helps track normal operations.

3. **WARNING**: Something unexpected happened, but the program can continue. Use for: deprecated feature usage, recoverable errors (retry succeeded), configuration issues (using default values), resource concerns (disk 80% full). Investigate warnings—they often precede failures!

4. **ERROR**: A serious problem prevented a specific operation from completing. Use for: exceptions caught and handled, failed operations (couldn't save file, API call failed), data validation failures. Requires attention but system continues running.

5. **CRITICAL**: System failure or severe error requiring immediate action. Use for: application crash imminent, database connection lost, critical resource exhausted. Typically triggers alerts to on-call engineers.

\`\`\`python
# Real-world example: API request handler
def handle_api_request(user_id, data):
    logging.info(f"API request from user {user_id}")

    if not validate_data(data):
        logging.warning(f"Invalid data from user {user_id}, using defaults")
        data = get_defaults()

    try:
        result = process_data(data)
        logging.debug(f"Processed data: {result}")  # Verbose, disabled in prod
        return result
    except Exception as e:
        logging.error(f"Processing failed for user {user_id}: {e}", exc_info=True)
        return error_response()
\`\`\`

BASIC LOGGING CONFIGURATION: Set up logging with \`basicConfig()\` for simple cases, or use \`logging.config\` for complex setups.

\`\`\`python
import logging

# Simple setup: console output with level and format
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Now all logging calls work:
logging.info("Application started")
logging.error("Something went wrong")

# Output:
# 2024-01-15 14:30:15,123 - root - INFO - Application started
# 2024-01-15 14:30:16,456 - root - ERROR - Something went wrong
\`\`\`

Format String Keys (Common):
- \`%(asctime)s\`: Timestamp (2024-01-15 14:30:15)
- \`%(name)s\`: Logger name (usually module name)
- \`%(levelname)s\`: Level (INFO, ERROR, etc.)
- \`%(message)s\`: Your log message
- \`%(filename)s\`: Source file
- \`%(lineno)d\`: Line number
- \`%(funcName)s\`: Function name

HANDLERS: Where logs go (console, file, network, etc.).

Handlers determine log destinations. One logger can have multiple handlers (e.g., console + file). Each handler can have its own level and format.

\`\`\`python
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)  # Logger level: minimum to consider

# Handler 1: Console (only WARNING+)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.WARNING)
console_handler.setFormatter(logging.Formatter('%(levelname)s: %(message)s'))

# Handler 2: File (DEBUG+, everything)
file_handler = logging.FileHandler('app.log')
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
))

logger.addHandler(console_handler)
logger.addHandler(file_handler)

# Now logs go to both destinations:
logger.debug("Debug message")   # → File only (below WARNING)
logger.info("Info message")     # → File only
logger.warning("Warning!")      # → Console + File (WARNING+)
\`\`\`

Common Handler Types:
- \`StreamHandler()\`: Console output (stdout/stderr)
- \`FileHandler(filename)\`: Write to file
- \`RotatingFileHandler(filename, maxBytes, backupCount)\`: Auto-rotate when file reaches size limit
- \`TimedRotatingFileHandler(filename, when='midnight')\`: Rotate daily/hourly/etc.
- \`SMTPHandler\`: Email logs (for CRITICAL alerts)
- \`HTTPHandler\`: Send logs to web server

LOGGERS: Per-module loggers for better organization.

\`\`\`python
# In module1.py:
import logging
logger = logging.getLogger(__name__)  # Logger named "module1"

def func():
    logger.info("Called func in module1")

# In module2.py:
import logging
logger = logging.getLogger(__name__)  # Logger named "module2"

def func():
    logger.info("Called func in module2")

# Configure separately:
logging.getLogger("module1").setLevel(logging.DEBUG)  # Verbose
logging.getLogger("module2").setLevel(logging.WARNING)  # Quiet
\`\`\`

Logger Hierarchy: Loggers form a tree based on names. \`app.db.query\` is a child of \`app.db\` which is a child of \`app\`. Child loggers inherit configuration from parents unless overridden.

STRUCTURED LOGGING: Modern approach using key-value pairs instead of formatted strings.

\`\`\`python
import logging

# OLD: String formatting (hard to parse)
logging.info(f"User {user_id} placed order {order_id} for \\$99.99")

# BETTER: Lazy % formatting (parameters not evaluated if log filtered)
logging.info("User %s placed order %s for $%s", user_id, order_id, amount)

# BEST: Structured logging (machine-readable, searchable)
import structlog
logger = structlog.get_logger()
logger.info("order_placed", user_id=user_id, order_id=order_id, amount=amount)

# Output: JSON for log aggregation tools (Elasticsearch, Splunk)
# {"event": "order_placed", "user_id": 123, "order_id": 456, "amount": 99.99, "timestamp": "2024-01-15T14:30:15"}
\`\`\`

DEBUGGING WITH PDB: Python's built-in debugger for interactive code inspection.

\`breakpoint()\` (Python 3.7+) is the modern way to drop into the debugger:

\`\`\`python
def buggy_function(data):
    result = process_data(data)
    breakpoint()  # Execution pauses here!
    return result

# When breakpoint() hits, you get interactive prompt:
# (Pdb) print(data)
# (Pdb) print(result)
# (Pdb) n  # Next line
# (Pdb) s  # Step into function
# (Pdb) c  # Continue execution
\`\`\`

Common PDB Commands:
- \`n\` (next): Execute next line
- \`s\` (step): Step into function call
- \`c\` (continue): Continue until next breakpoint
- \`l\` (list): Show current code location
- \`p var\` (print): Print variable value
- \`pp var\`: Pretty-print variable
- \`w\` (where): Show stack trace
- \`u\`/\`d\`: Navigate up/down stack frames
- \`q\` (quit): Exit debugger

Post-Mortem Debugging: Debug after an exception crashes your program:

\`\`\`python
import pdb

try:
    buggy_function()
except:
    pdb.post_mortem()  # Drop into debugger at exception point
\`\`\`

PERFORMANCE PROFILING WITH TIMEIT: Accurate micro-benchmarking for comparing implementations.

\`timeit\` runs code millions of times and reports execution time—essential for proving O(n) vs O(n²) performance:

\`\`\`python
import timeit

# Compare list vs generator comprehension
setup = "data = range(1000)"

list_time = timeit.timeit("[x**2 for x in data]", setup=setup, number=10000)
gen_time = timeit.timeit("list(x**2 for x in data)", setup=setup, number=10000)

print(f"List comp: {list_time:.4f}s")  # ~0.45s
print(f"Generator: {gen_time:.4f}s")   # ~0.52s
# List comp slightly faster for small data (pre-sized allocation)

# For one-liners, use -m timeit from command line:
# python -m timeit "[x**2 for x in range(1000)]"
\`\`\`

Best Practices:
- Use \`number=\` parameter to control iterations (default: 1 million)
- Use \`repeat=\` to run multiple trials, take minimum (most stable)
- Run on same machine, close other programs
- Warm up code first (JIT compilation)
- Measure multiple input sizes to confirm complexity

PROFILING WITH CPROFILE: Find performance bottlenecks in real programs.

\`cProfile\` shows where your program spends time—which functions are slow and how often they're called:

\`\`\`python
import cProfile
import pstats

# Profile a function
cProfile.run('my_function()', 'profile_stats')

# Analyze results
stats = pstats.Stats('profile_stats')
stats.strip_dirs()
stats.sort_stats('cumulative')  # Sort by cumulative time
stats.print_stats(10)  # Top 10 slowest functions

# Output shows:
# - ncalls: how many times called
# - tottime: time in function (excluding subcalls)
# - cumtime: total time (including subcalls)
# - filename:lineno(function): where defined
\`\`\`

MEMORY PROFILING: Track memory usage and find leaks.

\`\`\`python
import sys

# Quick size check:
x = list(range(1000000))
print(f"Size: {sys.getsizeof(x) / 1024:.2f} KB")  # Size of list object
# NOTE: Doesn't count referenced integers! Use tracemalloc for full picture.

# Detailed memory tracing:
import tracemalloc

tracemalloc.start()
# ... code to profile ...
snapshot = tracemalloc.take_snapshot()
top_stats = snapshot.statistics('lineno')

print("Top 10 memory allocations:")
for stat in top_stats[:10]:
    print(stat)
# Shows: filename:line, size, count of allocations
\`\`\`

WHEN TO USE WHAT:

Use **logging** for:
- Production applications tracking events
- Long-running services (web servers, daemons)
- Libraries (let users configure logging)
- Debugging in production (can't use \`print()\`)

Use **\`print()\`** for:
- Quick debugging during development
- Simple scripts run once
- Output that IS the program's purpose (CLI tools)

Use **pdb/breakpoint()** for:
- Understanding complex control flow
- Inspecting state at specific point
- Stepping through unfamiliar code
- When print debugging isn't enough

Use **timeit** for:
- Comparing two implementations (which is faster?)
- Micro-benchmarks (sub-millisecond timing)
- Proving algorithmic complexity (O(n) vs O(n²))

Use **cProfile** for:
- Finding slow functions in real programs
- Understanding overall performance profile
- Before optimization (measure first!)

Use **tracemalloc** for:
- Finding memory leaks
- Understanding memory usage patterns
- Optimizing memory-intensive code

COMMON GOTCHAS:

1. **Forgetting to configure logging**: Without \`basicConfig()\`, default level is WARNING—you won't see INFO/DEBUG logs!

2. **Expensive logging in hot paths**: \`logging.debug(f"Value: {expensive_call()}")\` evaluates \`expensive_call()\` even if DEBUG is disabled! Use lazy formatting: \`logging.debug("Value: %s", expensive_call())\`

3. **Leaving debug logging in production**: Debug logs in tight loops (million iterations/sec) can slow code 10-100x. Disable or remove.

4. **Not using \`exc_info=True\`**: When logging exceptions, \`logging.error("Error occurred", exc_info=True)\` includes full stack trace—essential for debugging!

5. **timeit gotchas**: Results vary wildly between runs (GC, OS scheduling). Always use \`repeat=\` and take minimum, not average!

BEST PRACTICES SUMMARY:

- Use \`logging\` for all production code, never \`print()\`
- Configure logging once at application entry point
- Use appropriate log levels: DEBUG for trace, INFO for events, WARNING for unexpected, ERROR for failures
- Include context: user IDs, request IDs, transaction IDs
- Use lazy formatting for performance: \`logger.info("User %s", user_id)\`
- Add \`exc_info=True\` when logging exceptions
- Rotate log files to prevent filling disk
- Use structured logging (JSON) for log aggregation tools
- Profile before optimizing—measure, don't guess!
- Use \`timeit\` for micro-benchmarks, \`cProfile\` for whole-program profiling`

export function LoggingPage() {
  return (
    <TypePage
      type="Logging & Debug" badge="log" color="var(--accent-logging)"
      description="Logging, debugging, and profiling in Python. Better than print for production code."
      intro={loggingIntro}
      methods={loggingMethods}
    />
  )
}

const concurrencyIntro = `Concurrency and parallelism allow programs to do multiple things at once—but in Python, the approach you choose matters enormously. The GIL (Global Interpreter Lock) in CPython is the critical constraint that determines which concurrency model to use. Understanding threading vs multiprocessing vs async/await—and when to use each—is essential for writing performant Python applications.

THE FUNDAMENTAL QUESTION: I/O-bound or CPU-bound?

This single question determines your entire concurrency strategy. Get this wrong and your "optimized" code might be SLOWER than single-threaded!

**I/O-bound tasks**: Waiting on external resources (network requests, file I/O, database queries). CPU sits idle waiting for data. Examples: web scraping, API calls, file uploads/downloads. Solution: Threading or Async/Await (both work well).

**CPU-bound tasks**: Performing computations (math, data processing, image manipulation). CPU is the bottleneck, not I/O. Examples: matrix multiplication, image processing, machine learning training. Solution: Multiprocessing (ONLY option that helps).

\`\`\`python
# I/O-bound example: Network requests
import requests
# Most time spent WAITING for server response
# CPU is idle during network I/O
# → Use threading or async/await

def fetch_url(url):
    response = requests.get(url)  # Waits for network I/O
    return response.text

# CPU-bound example: Computation
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)  # CPU works hard
# → Use multiprocessing
\`\`\`

THE GLOBAL INTERPRETER LOCK (GIL): Why Python's threading is "weird."

CPython's GIL is a mutex that allows only ONE thread to execute Python bytecode at a time—even on multi-core CPUs! This means:

1. **Threading DOES NOT parallelize CPU-bound code**: Two threads doing math run sequentially, not in parallel. No speedup, often slower due to context switching overhead.

2. **Threading DOES help I/O-bound code**: When thread waits for I/O, GIL is released, allowing other threads to run. Speedup comes from overlapping wait times, not parallel execution.

3. **Multiprocessing bypasses GIL**: Each process has its own Python interpreter and GIL. True parallelism on multi-core CPUs. But: higher memory usage, slower inter-process communication.

\`\`\`python
# GIL demonstration: CPU-bound threading FAILS
import threading
import time

def cpu_task():
    # CPU-bound: compute sum
    total = sum(i*i for i in range(10_000_000))

# Sequential (baseline):
start = time.time()
cpu_task()
cpu_task()
print(f"Sequential: {time.time() - start:.2f}s")  # ~2.0s

# Threading (SAME or SLOWER!):
start = time.time()
t1 = threading.Thread(target=cpu_task)
t2 = threading.Thread(target=cpu_task)
t1.start(); t2.start()
t1.join(); t2.join()
print(f"Threading: {time.time() - start:.2f}s")  # ~2.0s (NO speedup!)

# Multiprocessing (FASTER!):
import multiprocessing
start = time.time()
p1 = multiprocessing.Process(target=cpu_task)
p2 = multiprocessing.Process(target=cpu_task)
p1.start(); p2.start()
p1.join(); p2.join()
print(f"Multiprocessing: {time.time() - start:.2f}s")  # ~1.0s (2x speedup!)
\`\`\`

THREADING: Best for I/O-bound tasks with moderate concurrency.

Use threading when:
- Task is I/O-bound (network, file I/O, database)
- Need shared memory between tasks
- Number of concurrent tasks is manageable (<100 threads)
- Want simple implementation

\`\`\`python
import threading
import requests

urls = ["https://example.com/page1", "https://example.com/page2", ...]

def fetch(url):
    response = requests.get(url)
    print(f"Fetched {url}: {len(response.text)} bytes")

# Create and start threads
threads = [threading.Thread(target=fetch, args=(url,)) for url in urls]
for thread in threads:
    thread.start()

# Wait for all to complete
for thread in threads:
    thread.join()
\`\`\`

ThreadPoolExecutor (Modern Approach): Simpler API, thread pooling, easier error handling.

\`\`\`python
from concurrent.futures import ThreadPoolExecutor
import requests

urls = ["https://example.com/page1", "https://example.com/page2", ...]

def fetch(url):
    response = requests.get(url)
    return url, len(response.text)

# ThreadPoolExecutor manages thread creation/cleanup
with ThreadPoolExecutor(max_workers=10) as executor:
    # Submit all tasks, get Future objects
    futures = [executor.submit(fetch, url) for url in urls]

    # Get results as they complete
    for future in concurrent.futures.as_completed(futures):
        url, size = future.result()
        print(f"Fetched {url}: {size} bytes")
\`\`\`

Threading Gotchas:
- **Race conditions**: Multiple threads accessing shared state without locks can corrupt data
- **Deadlocks**: Two threads waiting for each other's locks
- **Thread overhead**: Each thread consumes ~8MB memory
- **GIL contention**: CPU-bound threads fight for GIL, slowing each other down

MULTIPROCESSING: Best for CPU-bound tasks and true parallelism.

Use multiprocessing when:
- Task is CPU-bound (computation, data processing)
- Need to utilize multiple CPU cores
- Tasks are independent (minimal communication)
- Memory overhead acceptable (each process ~50MB+)

\`\`\`python
import multiprocessing

def cpu_intensive_task(n):
    # Expensive computation
    return sum(i*i for i in range(n))

numbers = [10_000_000, 10_000_000, 10_000_000, 10_000_000]

# Sequential (slow):
results = [cpu_intensive_task(n) for n in numbers]

# Parallel with Pool (fast!):
with multiprocessing.Pool(processes=4) as pool:
    results = pool.map(cpu_intensive_task, numbers)
    # Automatically distributes work across 4 processes
\`\`\`

ProcessPoolExecutor (Modern Approach): Consistent API with ThreadPoolExecutor.

\`\`\`python
from concurrent.futures import ProcessPoolExecutor

def cpu_intensive_task(n):
    return sum(i*i for i in range(n))

numbers = [10_000_000, 10_000_000, 10_000_000, 10_000_000]

with ProcessPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(cpu_intensive_task, numbers))
    # Results in same order as input
\`\`\`

Multiprocessing Gotchas:
- **Startup overhead**: Creating processes is expensive (~100ms each)
- **Memory overhead**: Each process duplicates Python interpreter (~50MB+)
- **Communication cost**: Sharing data requires pickling (serialization), which is slow
- **Platform differences**: Windows requires \`if __name__ == "__main__":\` guard

ASYNC/AWAIT: Best for high-concurrency I/O-bound tasks.

Use async/await when:
- Task is I/O-bound (network, database, file I/O)
- Need MANY concurrent operations (1000+ connections)
- Single-threaded performance acceptable
- Using async-compatible libraries (aiohttp, asyncpg, etc.)

Async is **cooperative multitasking**: functions voluntarily yield control with \`await\`, allowing other tasks to run. All tasks run in a SINGLE thread—no GIL contention, no thread overhead.

\`\`\`python
import asyncio
import aiohttp  # Async HTTP library

async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    urls = ["https://example.com/1", "https://example.com/2", ...]

    async with aiohttp.ClientSession() as session:
        # Create tasks for all URLs
        tasks = [fetch(session, url) for url in urls]

        # Run concurrently (all in ONE thread!)
        results = await asyncio.gather(*tasks)

    print(f"Fetched {len(results)} URLs")

# Run the async main function
asyncio.run(main())
\`\`\`

Async vs Threading for I/O:
- **Async**: Scales to 10,000+ concurrent connections with low memory overhead. But requires async libraries (can't use \`requests\`, must use \`aiohttp\`).
- **Threading**: Works with any library. But limited to ~100-1000 threads due to memory overhead and GIL contention.

Async Gotchas:
- **Blocking calls break everything**: \`time.sleep(1)\` blocks ALL tasks! Must use \`await asyncio.sleep(1)\`
- **Library compatibility**: Can't mix sync (\`requests\`) with async code without workarounds
- **Debugging complexity**: Stack traces can be confusing
- **Learning curve**: Requires understanding event loops, coroutines, \`await\`

DECISION MATRIX: Choosing the right concurrency model.

| Workload | Concurrency | Best Choice | Why |
|----------|-------------|-------------|-----|
| I/O-bound, <100 tasks | Low | **Threading** | Simple, works with any library |
| I/O-bound, 100-1000 tasks | Medium | **Threading** or **Async** | Threading simpler, async more scalable |
| I/O-bound, 1000+ tasks | High | **Async** | Threading can't scale, too much overhead |
| CPU-bound | Any | **Multiprocessing** | ONLY way to use multiple cores |
| Mixed I/O + CPU | Any | **Multiprocessing + Threading** | Process per core, threads for I/O in each |

\`\`\`python
# Example: Which to use?

# Scenario 1: Fetch 50 URLs → Threading
# Simple, works with requests library, <100 tasks

# Scenario 2: Web server handling 10,000 connections → Async
# High concurrency, I/O-bound, need scalability

# Scenario 3: Image processing on 100 images → Multiprocessing
# CPU-bound (resize, filters), parallel computation

# Scenario 4: Download + process images → Multiprocessing + Async
# Download (I/O) with async, process (CPU) with multiprocessing
\`\`\`

COMMON PATTERNS:

1. **Map Pattern**: Apply function to each item in parallel.
\`\`\`python
from concurrent.futures import ProcessPoolExecutor

data = [1, 2, 3, 4, 5, 6, 7, 8]

with ProcessPoolExecutor() as executor:
    results = list(executor.map(expensive_function, data))
\`\`\`

2. **As-Completed Pattern**: Process results as they finish (not in order).
\`\`\`python
from concurrent.futures import ThreadPoolExecutor, as_completed

with ThreadPoolExecutor(max_workers=10) as executor:
    future_to_url = {executor.submit(fetch, url): url for url in urls}

    for future in as_completed(future_to_url):
        url = future_to_url[future]
        result = future.result()
        print(f"Completed: {url}")
\`\`\`

3. **Rate Limiting**: Limit concurrent requests (e.g., API rate limits).
\`\`\`python
from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=5) as executor:
    # Only 5 requests at a time
    results = list(executor.map(api_call, items))
\`\`\`

4. **Timeout Handling**: Cancel slow tasks.
\`\`\`python
with ThreadPoolExecutor() as executor:
    future = executor.submit(slow_function)
    try:
        result = future.result(timeout=5)  # Wait max 5 seconds
    except TimeoutError:
        print("Function took too long!")
\`\`\`

WHEN NOT TO USE CONCURRENCY:

- **Simple scripts**: Overhead not worth it
- **Sequential dependencies**: Task B needs result from Task A
- **Shared state complexity**: If you need lots of locks, consider redesign
- **Debugging**: Makes debugging much harder
- **Premature optimization**: Profile first! Is this actually a bottleneck?

BEST PRACTICES SUMMARY:

- Identify workload first: I/O-bound → threading/async, CPU-bound → multiprocessing
- Use ProcessPoolExecutor/ThreadPoolExecutor over raw Process/Thread (simpler, safer)
- Always use context managers (\`with\`) for executors
- Set \`max_workers\` based on workload (CPU cores for CPU-bound, 10-100 for I/O-bound)
- Handle exceptions from worker tasks (\`future.result()\` can raise!)
- Use timeouts to prevent hanging
- Test with small worker counts first
- Profile to verify speedup—concurrency can make things SLOWER if used wrong!
- Avoid shared mutable state—use queues for communication
- For web servers, use async frameworks (FastAPI, aiohttp) not threading`

export function ConcurrencyPage() {
  return (
    <TypePage
      type="Concurrency" badge="async" color="var(--accent-concurrency)"
      description="Concurrent and parallel programming in Python. Threading, multiprocessing, and async/await."
      intro={concurrencyIntro}
      methods={concurrencyMethods}
    />
  )
}

const fileioIntro = `File I/O is essential for persisting data, reading configuration, processing logs, and working with external data sources. Every file operation involves encoding (converting Python strings to bytes) and decoding (bytes back to strings). Understanding file modes, encoding, and the \`with\` statement is critical for reliable file handling. Misunderstanding encoding is the #1 cause of file I/O bugs.

TEXT VS BINARY MODES: The fundamental distinction.

Files are ALWAYS bytes on disk. The difference is whether Python decodes/encodes for you:

**Text mode** (default): Python automatically converts bytes ↔ strings using an encoding (UTF-8 by default). You work with strings. Lines are split on newline characters.

**Binary mode** ('b'): You work directly with bytes. No encoding/decoding. Use for: images, audio, video, executables, or when you need exact byte control.

\`\`\`python
# TEXT MODE (default): Work with strings
with open('data.txt', 'r') as f:
    content = f.read()  # Returns str
    print(type(content))  # <class 'str'>

# BINARY MODE: Work with bytes
with open('image.png', 'rb') as f:
    content = f.read()  # Returns bytes
    print(type(content))  # <class 'bytes'>
\`\`\`

FILE MODES: Reading, writing, appending.

\`\`\`python
# READ (r) - Default, file must exist
with open('data.txt', 'r') as f:
    content = f.read()

# WRITE (w) - Creates file or OVERWRITES if exists! DESTRUCTIVE!
with open('output.txt', 'w') as f:
    f.write("New content")  # OLD CONTENT DESTROYED!

# APPEND (a) - Creates file or adds to end
with open('log.txt', 'a') as f:
    f.write("New log entry\\n")  # Preserves old content

# READ+WRITE (r+) - File must exist, can read and write
with open('data.txt', 'r+') as f:
    content = f.read()
    f.write("More data")

# WRITE+READ (w+) - Creates/overwrites, can read and write
with open('data.txt', 'w+') as f:
    f.write("Data")
    f.seek(0)  # Go back to start
    content = f.read()
\`\`\`

Common Mode Combinations:
- \`'r'\`: Read text (default)
- \`'w'\`: Write text (OVERWRITES!)
- \`'a'\`: Append text
- \`'rb'\`: Read binary
- \`'wb'\`: Write binary (OVERWRITES!)
- \`'r+'\`: Read+write text (file must exist)
- \`'w+'\`: Write+read text (creates/overwrites)

THE WITH STATEMENT: Always use it for files!

\`with\` ensures files are closed even if exceptions occur. Without it, files might stay open, causing resource leaks and locking issues.

\`\`\`python
# BAD: Manual close (fragile!)
f = open('data.txt')
try:
    data = f.read()
finally:
    f.close()  # Easy to forget!

# GOOD: with statement (automatic cleanup)
with open('data.txt') as f:
    data = f.read()
# File automatically closed here, even if exception!

# GREAT: Multiple files
with open('input.txt') as infile, open('output.txt', 'w') as outfile:
    outfile.write(infile.read())
# Both files closed automatically
\`\`\`

ENCODING: The #1 source of file I/O bugs.

Every text file is bytes on disk. Python must know HOW to decode bytes → strings. Use the SAME encoding for reading that was used for writing, or you get garbage or exceptions!

\`\`\`python
# WRITE with UTF-8
with open('data.txt', 'w', encoding='utf-8') as f:
    f.write("Hello 世界 🌍")  # Unicode characters

# READ with UTF-8 (CORRECT)
with open('data.txt', 'r', encoding='utf-8') as f:
    print(f.read())  # Hello 世界 🌍

# READ with ASCII (WRONG!)
with open('data.txt', 'r', encoding='ascii') as f:
    print(f.read())  # UnicodeDecodeError!
\`\`\`

Common Encodings:
- **UTF-8**: Universal standard, handles all Unicode (RECOMMENDED!)
- **ASCII**: English only (a-z, A-Z, 0-9, basic punctuation)
- **Latin-1** (ISO-8859-1): Western European languages
- **UTF-16**: Windows default for some .txt files
- **CP1252**: Windows legacy encoding

Best Practice: **ALWAYS specify \`encoding='utf-8'\`** unless you have a specific reason not to!

\`\`\`python
# ALWAYS DO THIS:
with open('data.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# NOT THIS (relies on platform default):
with open('data.txt', 'r') as f:  # encoding=None → platform default
    content = f.read()
\`\`\`

READING STRATEGIES: read(), readline(), readlines(), iteration.

\`\`\`python
# READ ENTIRE FILE (small files only!)
with open('data.txt') as f:
    content = f.read()  # Returns entire file as single string

# READ LINE BY LINE (memory efficient for huge files)
with open('huge.log') as f:
    for line in f:  # Lazy iteration, one line at a time
        process(line)

# READ ALL LINES INTO LIST (moderate files)
with open('data.txt') as f:
    lines = f.readlines()  # ['line1\\n', 'line2\\n', ...]

# READ ONE LINE AT A TIME (manual iteration)
with open('data.txt') as f:
    line = f.readline()  # First line
    while line:
        process(line)
        line = f.readline()
\`\`\`

Performance Comparison (1 GB file):
- \`f.read()\`: Loads entire 1 GB into memory → 1 GB RAM used
- \`for line in f:\`: Loads one line at a time → ~4 KB RAM used
- \`f.readlines()\`: Loads all lines into list → 1 GB+ RAM used

Best Practice: **Prefer iteration** (\`for line in f:\`) for large files.

WRITING STRATEGIES: write(), writelines().

\`\`\`python
# WRITE STRING
with open('output.txt', 'w') as f:
    f.write("First line\\n")
    f.write("Second line\\n")

# WRITE MULTIPLE LINES (no automatic newlines!)
with open('output.txt', 'w') as f:
    lines = ["First line\\n", "Second line\\n", "Third line\\n"]
    f.writelines(lines)  # Must include \\n yourself!

# WRITE WITH PRINT (adds newline automatically)
with open('output.txt', 'w') as f:
    print("First line", file=f)
    print("Second line", file=f)
\`\`\`

GOTCHA: writelines() does NOT add newlines!

\`\`\`python
# WRONG: Lines run together
lines = ["First", "Second", "Third"]
with open('output.txt', 'w') as f:
    f.writelines(lines)
# Output: FirstSecondThird

# RIGHT: Add newlines yourself
with open('output.txt', 'w') as f:
    f.writelines(line + '\\n' for line in lines)
# Output: First\\nSecond\\nThird
\`\`\`

PATHLIB: Modern, cross-platform path handling.

The \`pathlib\` module (Python 3.4+) is the modern way to work with file paths. It's object-oriented, cross-platform, and more readable than \`os.path\`.

\`\`\`python
from pathlib import Path

# CREATE PATH OBJECTS
p = Path('data/file.txt')
home = Path.home()           # User's home directory
cwd = Path.cwd()             # Current working directory

# JOIN PATHS (use / operator!)
config_file = home / '.config' / 'app' / 'settings.json'
# Works on Windows (\\\\) and Unix (/)

# PATH PROPERTIES
print(p.name)        # 'file.txt'
print(p.stem)        # 'file' (name without extension)
print(p.suffix)      # '.txt'
print(p.parent)      # Path('data')
print(p.absolute())  # Absolute path

# CHECK EXISTENCE
if p.exists():
    if p.is_file():
        print("It's a file")
    elif p.is_dir():
        print("It's a directory")

# CREATE/DELETE
p.touch()           # Create empty file
p.mkdir()           # Create directory
p.mkdir(parents=True, exist_ok=True)  # Like mkdir -p
p.unlink()          # Delete file
p.rmdir()           # Delete empty directory
\`\`\`

Reading/Writing with Path:

\`\`\`python
from pathlib import Path

p = Path('data.txt')

# READ ENTIRE FILE
content = p.read_text(encoding='utf-8')

# WRITE ENTIRE FILE
p.write_text("New content", encoding='utf-8')

# READ BYTES
data = p.read_bytes()

# WRITE BYTES
p.write_bytes(b'\\x89PNG...')

# OPEN FILE (with statement still works)
with p.open('r', encoding='utf-8') as f:
    content = f.read()
\`\`\`

GLOB PATTERNS: Find files matching patterns.

\`\`\`python
from pathlib import Path

# FIND ALL .txt FILES IN DIRECTORY
for txt_file in Path('.').glob('*.txt'):
    print(txt_file)

# FIND ALL .py FILES RECURSIVELY
for py_file in Path('.').rglob('*.py'):
    print(py_file)

# FIND FILES MATCHING PATTERN
for log in Path('/var/log').glob('app-*.log'):
    process(log)
\`\`\`

ERROR HANDLING: Common file I/O exceptions.

\`\`\`python
from pathlib import Path

try:
    with open('missing.txt', 'r') as f:
        content = f.read()
except FileNotFoundError:
    print("File doesn't exist")
except PermissionError:
    print("No permission to read file")
except IsADirectoryError:
    print("Path is a directory, not a file")
except UnicodeDecodeError:
    print("Wrong encoding - file not UTF-8")

# CHECK BEFORE OPENING (TOCTTOU race condition!)
# DON'T DO THIS:
if Path('file.txt').exists():
    with open('file.txt') as f:  # File might be deleted between check and open!
        content = f.read()

# DO THIS (EAFP: Easier to Ask Forgiveness than Permission):
try:
    with open('file.txt') as f:
        content = f.read()
except FileNotFoundError:
    handle_missing_file()
\`\`\`

CSV FILES: Working with tabular data.

\`\`\`python
import csv

# WRITE CSV
with open('data.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Name', 'Age', 'City'])
    writer.writerow(['Alice', 30, 'NYC'])
    writer.writerow(['Bob', 25, 'LA'])

# READ CSV
with open('data.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    header = next(reader)  # Skip header
    for row in reader:
        name, age, city = row
        print(f"{name} is {age} from {city}")

# DICTREADER (more convenient)
with open('data.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row['Name'], row['Age'], row['City'])
\`\`\`

JSON FILES: Serializing Python objects.

\`\`\`python
import json

# WRITE JSON
data = {'name': 'Alice', 'age': 30, 'hobbies': ['reading', 'coding']}
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

# READ JSON
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    print(data['name'])  # Alice

# PRETTY PRINT JSON
print(json.dumps(data, indent=2))
\`\`\`

PERFORMANCE TIPS:

1. **Buffer size**: Large reads/writes are faster than many small ones
\`\`\`python
# SLOW: Write one line at a time (many system calls)
with open('huge.txt', 'w') as f:
    for line in lines:
        f.write(line + '\\n')

# FAST: Batch writes (fewer system calls)
with open('huge.txt', 'w') as f:
    f.write('\\n'.join(lines))
\`\`\`

2. **Iterate don't load**: For huge files, iterate line-by-line
\`\`\`python
# SLOW: Load entire 1GB file
with open('huge.log') as f:
    lines = f.readlines()  # 1GB in memory!
    for line in lines:
        process(line)

# FAST: Iterate lazily
with open('huge.log') as f:
    for line in f:  # ~4KB in memory
        process(line)
\`\`\`

3. **Binary mode is faster**: No encoding overhead
\`\`\`python
# For large data, binary mode faster
with open('data.bin', 'wb') as f:
    f.write(bytes_data)
\`\`\`

COMMON GOTCHAS:

1. **Forgetting newlines in writelines()**: writelines() doesn't add \\n
2. **Write mode destroys files**: 'w' OVERWRITES! Use 'a' to append
3. **Mixing modes**: Can't write() to file opened in 'r' mode
4. **Wrong encoding**: Must decode with same encoding used to encode
5. **Forgetting to close**: Use \`with\` statement always!
6. **Binary mode requires bytes**: Can't write str to binary file
7. **Not specifying encoding**: Platform default varies, always use encoding='utf-8'

BEST PRACTICES SUMMARY:

- ALWAYS use \`with\` statement for automatic cleanup
- ALWAYS specify \`encoding='utf-8'\` for text files
- Use pathlib.Path for cross-platform path handling
- Prefer iteration (\`for line in f:\`) over \`read()\` for large files
- Use 'a' (append) mode when you want to preserve existing content
- Handle FileNotFoundError and PermissionError
- Use csv module for CSV, json module for JSON
- Never rely on platform default encoding
- Test file I/O with non-ASCII characters (世界, éñ, 🌍)
- Use 'rb'/'wb' for binary data (images, audio, executables)`

export function FileIOPage() {
  return (
    <TypePage
      type="File I/O" badge="file" color="var(--accent-fileio)"
      description="Reading and writing files. Cross-platform path handling with pathlib."
      intro={fileioIntro}
      methods={fileioMethods}
    />
  )
}
