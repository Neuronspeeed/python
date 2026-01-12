export const modulesIntroPart1 = `Modules are Python's fundamental unit of code organization—every .py file is automatically a module with its own namespace. Understanding import mechanics, the module search path, and package structure is essential for building maintainable Python projects. Mastering modules means understanding how Python finds code, loads it, and makes it available to your program.

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
`
