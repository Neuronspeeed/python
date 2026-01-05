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
      tip={`Comments vs Docstrings? Comments = WHY (for developers), Docstrings = WHAT (for users of API)
Public function? ALWAYS write docstring with Args/Returns/Examples — users need to understand API
Type hints? Completely ignored at runtime, but enable mypy/IDE autocomplete — use both hints + docstrings
Docstring format? Google style most readable, NumPy for science, reST for Sphinx — pick one, be consistent
Explore API? dir(obj) shows attributes, help(obj) shows formatted docstrings — perfect for REPL
Executable docs? Use >>> examples in docstrings, run with doctest.testmod() — docs that test themselves!
Project docs? Sphinx with autodoc extracts docstrings → beautiful HTML — standard for Python projects`}
      methods={documentationMethods}
    />
  )
}

const modulesIntro = `Modules are Python's highest layer of program architecture. Every .py file is automatically a module—no special syntax required. Think of a module as a "Physical File-to-Logical Namespace mapping": wrapping code in a .py file creates a protected environment for your variables.

Namespaces & Encapsulation: A module is a package of variable names. All top-level assignments (outside def/class) become module attributes. Each module is a separate namespace, so a variable \`x\` in one module doesn't conflict with \`x\` in another. This automatic encapsulation is a core strength of Python's module system.

Import vs From: The \`import\` statement loads a module as an object—access contents via dot syntax (\`module.name\`), preserving the namespace. The \`from\` statement copies specific names into your scope, collapsing the namespace. Use \`from module import *\` sparingly—it pollutes your namespace and makes code harder to trace.

Import Mechanics: Import is a three-step process on first load: (1) find the file on sys.path, (2) compile to bytecode, (3) execute top-to-bottom to create attributes. Subsequent imports reuse the cached module object. Use \`importlib.reload()\` to re-run module code—but note that objects already imported with \`from\` still reference old versions.

Module Search Path: Python searches sys.path in order: script directory, PYTHONPATH, standard library, site-packages. First match wins. A local file named "math.py" shadows the stdlib math module!

Packages: Directories containing __init__.py become packages. The __init__.py runs on import and can expose submodule contents. Use relative imports (from . import x) within packages to avoid name conflicts.

Privacy Convention: Names starting with underscore (_internal) are not copied by \`from module import *\`. This is Python's convention for marking implementation details as private.`

export function ModulesPage() {
  return (
    <TypePage
      type="Modules" badge="import" color="var(--accent-concurrency)"
      description="Import mechanics, bytecode, packages, and program architecture."
      intro={modulesIntro}
      tip={`Script or imported? if __name__ == "__main__"
Where's the module? module.__file__
Add import path? sys.path.append()`}
      methods={modulesMethods}
    />
  )
}

const exceptionsIntro = `EXCEPTION CONCEPT: Exceptions are a high-level control flow device—a structured "go-to" that lets a program jump immediately from the point of an error to a handler, abandoning all active functions in between. They're triggered automatically by Python on runtime errors (like dividing by zero) but can also be raised manually by your code.

ROLES OF EXCEPTIONS: (1) Error Handling—wrap risky code in try blocks instead of cluttering with endless if checks. (2) Event Notification—signal conditions like "search failed" across library boundaries without passing result flags. (3) Termination Actions—try/finally guarantees cleanup regardless of errors. (4) Control Flow—jump out of multiple nested loops instantly.

TRY STATEMENT STRUCTURE: A single try can combine all clauses. Order must be: \`try\` → \`except\` → \`else\` → \`finally\`. You need at least one except or a finally. Catch specific exceptions (\`except IndexError:\`), multiple (\`except (IndexError, TypeError):\`), or all (\`except Exception:\`—use with caution). Access the instance with \`as\` (\`except IndexError as e:\`).

ELSE CLAUSE: Runs only if no exception occurred in try. Better than putting success code inside try because it prevents the except handler from accidentally catching an exception raised by the success logic itself. Logically separates "guarding against errors" from "processing the result."

FINALLY CLAUSE: Always executes on the way out—whether an exception was raised, handled, or not raised at all. Standard idiom for cleanup: closing files, releasing connections, ensuring resources are freed even if code crashes.

RAISE STATEMENT: \`raise IndexError('message')\` triggers manually. Bare \`raise\` inside except re-raises the active exception (intercept, log, then pass up). Exception chaining: \`raise NewError from original\` preserves context of original error.

ASSERT STATEMENT: \`assert test, message\` raises AssertionError if test is false. Development/debugging tool for internal self-checks. Can be disabled with \`python -O\` (optimize flag)—don't use for production validation!

WITH STATEMENT: Alternative to try/finally for context managers. Automatically calls \`__enter__\` on entry and \`__exit__\` on exit (even if exception occurs). \`with open('file') as f:\` closes file automatically—no explicit finally needed.

EXCEPTIONS ARE CLASS INSTANCES: All exceptions are class instance objects. User-defined exceptions must inherit from Exception (or BaseException). Because they're classes, you can define \`__init__\` to store extra state (error codes, filenames) and methods for exception-specific behavior.

EXCEPTION HIERARCHIES: Organize exceptions into inheritance trees—superclass represents general category, subclasses represent specific errors. \`except GeneralError:\` catches that class AND all subclasses. Add new specific errors without changing existing handlers.

NESTING & PROPAGATION: try statements stack at runtime (physically nested or via function calls). When raised, Python searches newest-to-oldest for matching except. If no match, exception propagates up to caller—continues until handled or default handler stops the program. All finally blocks execute during unwinding.

EXCEPTION IDIOMS: Break nested loops instantly (raise exception instead of flag variables). Signal conditions like "search failed" across function boundaries without return codes. Default traceback is often the primary debugging tool.

DESIGN TIPS: Wrap only the code that might raise the specific exception. Avoid bare \`except:\`—catches system exits and Ctrl+C. Use \`except Exception:\` for standard errors. Balance granularity: not every line in try, not entire program in one try.`

export function ExceptionsPage() {
  return (
    <TypePage
      type="Exceptions" badge="try" color="var(--accent-exceptions)"
      description="Exception handling in Python. Try/except for graceful error handling, raise for signaling errors."
      intro={exceptionsIntro}
      tip={`Key might be missing? try/except KeyError
Catch all errors? Never bare except:
Cleanup always needed? finally block`}
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
      tip={`Production logging? Use logging module, NEVER print() — configurable levels, file output, timestamps
Log exception stack trace? logging.error("msg", exc_info=True) — includes full traceback
Performance hotspot? logging.debug(f"{expensive()}") calls expensive() even when disabled! Use logging.debug("msg %s", expensive())
Micro-benchmark? timeit.timeit(stmt, setup, number=10000) — runs millions of times for accuracy
Find slow function? cProfile.run('my_func()') then pstats — shows ncalls, tottime, cumtime
Interactive debugging? breakpoint() drops into pdb (3.7+) — step through code, inspect vars
Log levels? DEBUG (dev trace), INFO (events), WARNING (unexpected), ERROR (failures), CRITICAL (system failure)`}
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
      tip={`I/O-bound? Threading (<100 tasks) or Async (1000+ tasks) — GIL released during I/O waits
CPU-bound? ONLY Multiprocessing — threading won't help due to GIL (one thread at a time!)
Threading fails for CPU? GIL allows only ONE thread executing bytecode at a time — no parallelism!
Use ProcessPoolExecutor? executor.map(func, data) cleaner than raw Process — auto manages workers
async requires async libs? Can't use requests, must use aiohttp — mixing sync/async is hard
Rate limit? ThreadPoolExecutor(max_workers=5) — limits concurrent tasks
Timeout? future.result(timeout=5) raises TimeoutError — prevents hanging tasks`}
      methods={concurrencyMethods}
    />
  )
}

const fileioIntro = `File I/O allows Python to read and write data to disk. Every file is a sequence of bytes that must be decoded/encoded properly.

Opening Files: Use open(path, mode, encoding) or Path.open(). Always close files or use with statement for auto-cleanup. File modes: "r" (read), "w" (write/overwrite), "a" (append). Add "b" for binary mode.

Reading: file.read() loads entire file as string. file.readlines() returns list of lines. Iterate file object directly for memory efficiency. Lines include \\n newline character.

Writing: file.write(text) writes string to file. file.writelines(lines) writes list of strings. Write mode OVERWRITES existing content! Use append mode to add to end.

Encoding: UTF-8 is universal standard. ASCII limited to English characters. Windows defaults to UTF-16 for .txt files. MUST use same encoding to decode as was used to encode!

Line Endings: Unix/Mac use \\n, Windows uses \\r\\n. Python handles conversion automatically in text mode.

pathlib: Cross-platform path handling. Path() creates path objects. Path.home() and Path.cwd() get standard directories. Use / operator to join paths. Methods: .exists(), .is_file(), .is_dir(), .touch(), .mkdir().

With Statement: Pythonic way to open files. Guarantees file closure even if exception raised. Context manager protocol handles cleanup automatically.`

export function FileIOPage() {
  return (
    <TypePage
      type="File I/O" badge="file" color="var(--accent-fileio)"
      description="Reading and writing files. Cross-platform path handling with pathlib."
      intro={fileioIntro}
      tip={`Always use with statement for files!
UTF-8 is the safe default encoding
Write mode overwrites! Use 'a' to append`}
      methods={fileioMethods}
    />
  )
}
