export const modulesIntro = `Modules are Python's fundamental unit of code organization—every .py file is automatically a module with its own namespace. Understanding import mechanics, the module search path, and package structure is essential for building maintainable Python projects. Mastering modules means understanding how Python finds code, loads it, and makes it available to your program.

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

PACKAGES: Organizing modules into directories.

A package is a directory containing \`__init__.py\`. This makes the directory importable as a module.

\`\`\`python
myproject/
    __init__.py         # Makes 'myproject' a package
    utils.py            # myproject.utils
    database/
        __init__.py     # Makes 'myproject.database' a package
        models.py       # myproject.database.models
        queries.py      # myproject.database.queries
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

2. **Import inside function** (defer import until needed):
\`\`\`python
# a.py
def bar():
    from b import foo  # Import when function is CALLED, not at module load
    return foo()
\`\`\`python

3. **Import at bottom** (after definitions):
\`\`\`python
# a.py
def bar():
    return "bar"

from b import foo  # Import AFTER defining bar
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

NAMESPACE PACKAGES (PEP 420): Packages without __init__.py.

Python 3.3+ allows packages without \`__init__.py\`. Useful for splitting a package across multiple directories:

\`\`\`python
site-packages/
    mynamespace/
        plugin1.py
    another-location/
        mynamespace/
            plugin2.py

# Both directories contribute to 'mynamespace' package
import mynamespace.plugin1
import mynamespace.plugin2
\`\`\`python

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

\`\`\`python
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
\`\`\`python

\`\`\`python
# myproject/__init__.py
from .core.api import main_function
from .utils.helpers import helper

__all__ = ['main_function', 'helper']
__version__ = '1.0.0'

# Users can do:
from myproject import main_function
\`\`\`\``
