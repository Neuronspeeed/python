import{c as e,r as t}from"./index-Dfa-XKD4.js";const n=[{section:`Why & When`,signature:`Comments vs Docstrings vs External Docs`,description:`Comments: implementation details. Docstrings: public API. External docs: guides, tutorials. Choose based on audience and scope.`,complexity:`Concept`,example:`# COMMENTS - for developers reading the code
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
# - Library/framework → external docs (Sphinx)`},{section:`Why & When`,signature:`When to write documentation`,description:`Always: public APIs, complex logic. Sometimes: internal functions. Never: obvious code. Time investment vs future savings.`,complexity:`Concept`,example:`# ALWAYS DOCUMENT - public API
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
# Onboarding time saved: Hours for new team members`},{section:`Why & When`,signature:`Docstring styles: Google vs NumPy vs Sphinx`,description:`Google: readable, concise. NumPy: detailed, scientific. Sphinx: reStructuredText, tool-friendly. Pick one style, be consistent.`,complexity:`Concept`,example:`# GOOGLE STYLE - most popular, readable
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
# - Team → whatever they already use!`},{section:`Why & When`,signature:`Type hints as documentation`,description:`Type hints document expected types and replace verbose docstrings. Use for new code. Validated by mypy/pyright.`,complexity:`Concept`,example:`# WITHOUT TYPE HINTS - need verbose docstring
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
# - Dynamic/meta code`},{section:`Why & When`,signature:`Sphinx vs pydoc - when to invest`,description:`pydoc: free, built-in, good enough for small projects. Sphinx: rich docs, cross-refs, themes. Worth investment for libraries.`,complexity:`Concept`,example:`# PYDOC - built-in, zero setup
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
# Framework/library → comprehensive Sphinx`},{section:`Comments`,signature:`# comment`,description:`Basic in-file documentation. Python ignores text after #. Best for small-scale implementation notes.`,complexity:`Concept`,example:`x = 10  # inline comment

# Full line comment explaining next block
for i in range(x):
    # Implementation detail
    process(i)

# TODO: refactor this later
# FIXME: edge case not handled`},{section:`Comments`,signature:`Comment Best Practices`,description:`Use comments for "why" not "what". Code should be self-documenting; comments explain intent.`,complexity:`Concept`,example:`# Bad: describes what code does (obvious)
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
        continue`},{section:`dir Function`,signature:`dir(object)`,description:`Lists all attribute names of an object. A "memory jogger" showing available methods without descriptions.`,complexity:`O(n)`,example:`# List string methods
dir(str)
# ['__add__', ..., 'capitalize', 'center', ...]

# List methods on instance
dir("hello")
dir([1, 2, 3])

# List module attributes
import math
dir(math)  # ['cos', 'sin', 'sqrt', ...]`},{section:`dir Function`,signature:`Filter dir() output`,description:`Use list comprehension to filter out dunder methods (__x__) and show only public attributes.`,complexity:`O(n)`,example:`# Show only public methods (no dunders)
[m for m in dir(str) if not m.startswith('_')]
# ['capitalize', 'casefold', 'center', ...]

# Show only methods (callable)
[m for m in dir(str)
 if not m.startswith('_') and callable(getattr(str, m))]

# Find methods containing 'split'
[m for m in dir(str) if 'split' in m]
# ['rsplit', 'split', 'splitlines']`},{section:`Docstrings`,signature:`"""docstring"""`,description:`String at top of module/function/class. Stored in __doc__ attribute. Use triple quotes for multiline.`,complexity:`Concept`,example:`def greet(name):
    """Return a greeting message.

    Args:
        name: The person's name.

    Returns:
        A greeting string.
    """
    return f"Hello, {name}!"

# Access docstring
print(greet.__doc__)`},{section:`Docstrings`,signature:`Module Docstring`,description:`First statement in a .py file. Describes module purpose and contents.`,complexity:`Concept`,example:`"""Utility functions for data processing.

This module provides helpers for cleaning,
transforming, and validating data inputs.

Example:
    from utils import clean_data
    result = clean_data(raw_input)
"""

import os
# ... rest of module`},{section:`Docstrings`,signature:`Class Docstring`,description:`Immediately after class header. Documents class purpose and public interface.`,complexity:`Concept`,example:`class DataProcessor:
    """Process and transform data records.

    Attributes:
        source: The data source path.
        format: Output format ('json' or 'csv').

    Example:
        dp = DataProcessor('data.csv')
        dp.transform()
    """

    def __init__(self, source):
        self.source = source`},{section:`Docstrings`,signature:`r"""raw docstring"""`,description:`Use raw strings (r-prefix) to avoid backslash escape warnings. Recommended in Python 3.12+.`,complexity:`Concept`,example:`def regex_match(pattern):
    r"""Match pattern against input.

    Pattern uses regex: \\d+ for digits,
    \\w+ for word characters.
    """
    pass

# Without r-prefix, \\d would cause warnings
# in Python 3.12+`},{section:`help & pydoc`,signature:`help(object)`,description:`Interactive documentation viewer. Shows docstrings, method signatures, and type info.`,complexity:`Concept`,example:`# Get help on a function
help(len)

# Get help on a type
help(str)
help(list)

# Get help on a method
help(str.split)

# Get help on a module
import json
help(json)`},{section:`help & pydoc`,signature:`help() interactive mode`,description:`Call help() with no args for interactive mode. Type topics, modules, or "quit" to exit.`,complexity:`Concept`,example:`>>> help()
help> str
# ... shows str documentation
help> modules
# ... lists all available modules
help> keywords
# ... lists Python keywords
help> quit
>>>`},{section:`help & pydoc`,signature:`pydoc command line`,description:`Run pydoc from terminal. Can generate HTML docs or start local doc server.`,complexity:`Concept`,example:`# View docs in terminal
$ python -m pydoc str
$ python -m pydoc json

# Generate HTML file
$ python -m pydoc -w mymodule

# Start local doc server (port 8080)
$ python -m pydoc -p 8080
# Then open http://localhost:8080`},{section:`External Tools`,signature:`Sphinx`,description:`Third-party tool for rich documentation. Generates HTML/PDF from reStructuredText or Markdown.`,complexity:`Concept`,example:`# Install Sphinx
$ pip install sphinx

# Create docs project
$ sphinx-quickstart docs

# Build HTML docs
$ cd docs && make html

# Common in open source projects
# Supports cross-references, API docs,
# themes, and hosting on ReadTheDocs`},{section:`External Tools`,signature:`Type Hints as Docs`,description:`Type annotations serve as inline documentation. Tools like mypy validate them.`,complexity:`Concept`,example:`def process(
    data: list[dict[str, int]],
    limit: int = 100
) -> list[str]:
    """Process data records.

    Types provide documentation:
    - data: list of dicts with str keys, int values
    - limit: max records to process
    - returns: list of processed strings
    """
    pass`}],r=[{section:`Why & When`,signature:`When to split code into modules`,description:`Split when: file > 300 lines, distinct responsibilities, reusable across projects, or team collaboration needs.`,complexity:`Concept`,example:`# MONOLITH - hard to navigate, test, reuse
# app.py (1500 lines)
def connect_db(): ...
def send_email(): ...
def process_payment(): ...
def render_ui(): ...

# MODULES - organized, testable, reusable
# database.py
def connect(): ...

# email.py
def send(): ...

# payments.py
def process(): ...

# ui.py
def render(): ...

# app.py - imports what it needs
from database import connect
from payments import process`},{section:`Why & When`,signature:`Module vs package vs script`,description:`Module: reusable .py file. Package: directory with __init__.py. Script: .py run directly (if __name__ == "__main__").`,complexity:`Concept`,example:`# MODULE - designed to be imported
# utils.py
def helper():
    return "I'm reusable"

# PACKAGE - collection of modules
# mypackage/
#   __init__.py
#   module1.py
#   module2.py

# SCRIPT - designed to be run
# script.py
if __name__ == "__main__":
    print("Running as script")

# File can be BOTH module and script:
def main():
    print("Main logic")

if __name__ == "__main__":
    main()  # Run when script
# import script; script.main()  # Import as module`},{section:`Why & When`,signature:`Import cost & lazy loading`,description:`First import: ~1-10ms (file I/O + execution). Use lazy imports for: optional features, CLI tools, large deps.`,complexity:`O(n)`,example:`# EAGER - imports at module load (~5ms each)
import pandas as pd
import matplotlib.pyplot as plt
import tensorflow as tf
# Total startup cost: ~100ms+ even if unused!

# LAZY - import only when needed
def analyze_data():
    import pandas as pd  # ~5ms only when called
    return pd.DataFrame(data)

def plot():
    import matplotlib.pyplot as plt  # ~20ms only when called
    plt.plot([1, 2, 3])

# Use lazy imports for:
# - CLI tools (import only used commands)
# - Optional features (plugins)
# - Heavy dependencies (ML, data science)
# - Development-only imports (debuggers, profilers)`},{section:`Why & When`,signature:`When to use __all__`,description:`Use __all__ to: define public API, control "from x import *", document intended exports. Omit for internal modules.`,complexity:`Concept`,example:`# PUBLIC API MODULE - use __all__
# api.py
__all__ = ['Client', 'authenticate', 'fetch']

class Client: ...
def authenticate(): ...
def fetch(): ...
def _internal_helper(): ...  # not in __all__

# from api import *  → only Client, authenticate, fetch

# INTERNAL MODULE - skip __all__
# _internals.py (or internals.py in package)
# No __all__ needed - not meant for * imports

# Rule of thumb:
# - Public-facing modules → __all__
# - Internal/private modules → no __all__
# - Libraries/frameworks → always __all__
# - Application code → usually skip __all__`},{section:`Why & When`,signature:`from x import * vs explicit imports`,description:`"from x import *" pollutes namespace, hides origins. Use explicit imports for: clarity, IDE support, avoiding conflicts.`,complexity:`Concept`,example:`# BAD - namespace pollution
from math import *
from statistics import *
print(sqrt(4))  # Which module? Can't tell!

# GOOD - explicit and clear
from math import sqrt, pi
from statistics import mean, median
print(sqrt(4))  # Obviously from math

# ACCEPTABLE - import * cases:
# 1. Interactive shell (exploration)
# 2. Well-designed APIs with __all__
from typing import *  # OK - designed for it

# 3. Single authoritative module
from myconfig import *  # OK if myconfig is THE config

# General rule: Never use * in production code
# Exception: typing module, well-controlled configs`},{section:`Import Mechanics`,signature:`import module`,description:`Imports entire module. Three-step process: find file, compile to bytecode, execute top-to-bottom.`,complexity:`O(n)`,example:`import math
print(math.sqrt(16))  # 4.0

import os
print(os.getcwd())

# Module is an object with attributes
print(type(math))  # <class 'module'>
print(dir(math))   # list all attributes`},{section:`Import Mechanics`,signature:`from module import name`,description:`Imports specific names into current namespace. Copies references, not the module object.`,complexity:`O(n)`,example:`from math import sqrt, pi
print(sqrt(16))  # 4.0 (no prefix needed)
print(pi)        # 3.14159...

from os import getcwd, listdir
print(getcwd())

# Import with alias
from collections import defaultdict as dd`},{section:`Import Mechanics`,signature:`import module as alias`,description:`Import with a shorter or clearer name. Common for long module names.`,complexity:`O(n)`,example:`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Use alias
arr = np.array([1, 2, 3])

# Avoid name conflicts
import mymodule as mm
import theirmodule as tm`},{section:`Import Mechanics`,signature:`First import only`,description:`Import runs module code only on first import. Subsequent imports reuse cached module object.`,complexity:`Concept`,example:`# mymodule.py
print("Module loading...")  # runs once
x = 10

# main.py
import mymodule  # prints "Module loading..."
import mymodule  # no output (cached)
import mymodule  # no output (cached)

# Force reload
from importlib import reload
reload(mymodule)  # runs code again`},{section:`Bytecode`,signature:`__pycache__ & compileall`,description:`Python saves .pyc bytecode in __pycache__. Use compileall to pre-compile before distributing.`,complexity:`O(n)`,example:`# After importing mymodule.py:
# __pycache__/mymodule.cpython-312.pyc

# .pyc only for imported files, not scripts
# Delete to force recompilation: rm -rf __pycache__

# Pre-compile all files
python -m compileall mypackage/
# Or: import compileall; compileall.compile_dir('pkg')

# Source-less distribution: ship only .pyc files`},{section:`Module Search Path`,signature:`sys.path`,description:`List of directories Python searches for modules. First match wins.`,complexity:`O(n)`,example:`import sys
print(sys.path)
# ['', '/usr/lib/python3.12', ...]

# '' means current directory (searched first)

# Add custom path at runtime
sys.path.append('/my/modules')
sys.path.insert(0, '/priority/path')

# Or use PYTHONPATH environment variable
# export PYTHONPATH=/my/modules`},{section:`Module Search Path`,signature:`Search order`,description:`Python searches: 1) script directory, 2) PYTHONPATH, 3) stdlib, 4) site-packages.`,complexity:`Concept`,example:`# Search order:
# 1. Directory of running script
# 2. PYTHONPATH directories
# 3. Standard library
# 4. site-packages (pip installs)

# Check where module was found
import math
print(math.__file__)
# /usr/lib/python3.12/lib-dynload/math.cpython-312-...

# Watch out: local file named 'math.py'
# would shadow the stdlib math module!`},{section:`Module Attributes`,signature:`__name__`,description:`Module name. Equals "__main__" when run as script, module name when imported.`,complexity:`O(1)`,example:`# mymodule.py
print(__name__)

# When run directly:
# python mymodule.py  → prints "__main__"

# When imported:
# import mymodule  → prints "mymodule"

# Common pattern
if __name__ == "__main__":
    # Only runs when executed directly
    main()`},{section:`Module Attributes`,signature:`__file__, __doc__, __all__`,description:`Module path, docstring, and public API list for "from module import *".`,complexity:`O(1)`,example:`import os
print(os.__file__)  # /usr/lib/python3.12/os.py
print(os.__doc__)   # module docstring

# __all__ controls "from x import *"
# mymodule.py
__all__ = ['public_func', 'PublicClass']
def _private(): pass  # not exported by *

# Built-ins have no __file__
import sys
# sys.__file__  # AttributeError`},{section:`Packages`,signature:`__init__.py & relative imports`,description:`Directory with __init__.py becomes a package. Use dots for relative imports within packages.`,complexity:`Concept`,example:`# mypackage/__init__.py
from .module1 import func1  # expose submodule

# Inside package, use relative imports:
from . import sibling       # same package
from .. import parent       # parent package

# Dot syntax navigates hierarchy:
import package.subpackage.module  # each dot = subdirectory`},{section:`Packages`,signature:`__main__.py`,description:`Allows package to be executed as a script: python -m package.`,complexity:`Concept`,example:`# mypackage/
#   __init__.py
#   __main__.py   ← executed by python -m

# mypackage/__main__.py
from . import core
if __name__ == "__main__":
    core.main()

# Run entire package:
# python -m mypackage
# Example: python -m http.server 8000`}],i=[{section:`Why & When`,signature:`Dynamic imports vs static imports`,description:`Static imports (import x): compile-time, fast, analyzable. Dynamic imports (importlib): runtime, flexible, plugins. Use static 99% of the time.`,complexity:`Concept`,example:`# STATIC - compile-time, normal usage
import json
import requests
from utils import helper
# Benefits: fast, IDE autocomplete, linters catch errors

# DYNAMIC - runtime, when module name is variable
import importlib

def load_handler(config):
    handler_name = config['handler']  # From config file
    return importlib.import_module(f"handlers.{handler_name}")

# Use dynamic imports for:
# 1. Plugin systems (load user-provided modules)
# 2. Optional dependencies (try import, fallback if missing)
# 3. Lazy loading (defer expensive imports)
# 4. Testing (mock modules by name)

# AVOID dynamic imports for:
# - Normal code (use static import)
# - Performance-critical paths (slower)
# - Code that needs IDE support

# Example: optional dependency
def get_serializer():
    try:
        return importlib.import_module('orjson')
    except ImportError:
        return importlib.import_module('json')`},{section:`Why & When`,signature:`reload() - development only`,description:`reload() for interactive development (REPL, Jupyter). NEVER in production—partial updates cause inconsistency.`,complexity:`Concept`,example:`from importlib import reload
import mymodule

# GOOD - interactive development
# >>> import mymodule
# >>> mymodule.func()  # test it
# ... edit mymodule.py in editor ...
# >>> reload(mymodule)  # pick up changes
# >>> mymodule.func()  # test new version

# BAD - production code
def process_request(request):
    reload(handlers)  # DON'T! Unpredictable behavior
    return handlers.handle(request)

# Why reload is dangerous:
# 1. Only reloads one module (not dependencies)
# 2. Old objects still reference old code
# 3. Class instances become incompatible
# 4. Race conditions in multi-threaded apps

# Production: restart the process to reload code
# Development: use reload() in REPL/Jupyter only`},{section:`Why & When`,signature:`When to create packages vs modules`,description:`Single file (<500 lines) → module. Multiple files, shared theme → package. Packages group related modules.`,complexity:`Concept`,example:`# SINGLE MODULE - simple, standalone
# utils.py (300 lines)
def helper1(): pass
def helper2(): pass
def helper3(): pass
# Usage: from utils import helper1

# PACKAGE - multiple files, shared theme
# database/
#   __init__.py        # Package marker + public API
#   connection.py      # Connection logic
#   query.py           # Query builders
#   models.py          # ORM models
#   migrations.py      # Schema changes
# Usage: from database import connect

# database/__init__.py
from .connection import connect, disconnect
from .query import Query
__all__ = ['connect', 'disconnect', 'Query']

# Create package when:
# - Single file > 500 lines (split by concern)
# - Multiple related modules (api/, models/, utils/)
# - Need sub-packages (api/v1/, api/v2/)
# - Building library for distribution

# Stay single module when:
# - Simple utility functions
# - Single responsibility
# - < 500 lines`},{section:`Why & When`,signature:`from module import * - when to avoid`,description:`Avoid "import *" in production: pollutes namespace, hides origins, breaks tools. OK for: interactive REPL, well-designed APIs with __all__.`,complexity:`Concept`,example:`# BAD - production code
from utils import *
from helpers import *
result = process(data)  # Which module is process from?

# GOOD - explicit imports
from utils import process_user
from helpers import process_data
result = process_data(data)  # Clear origin

# ACCEPTABLE - interactive exploration
# >>> from math import *
# >>> sqrt(16)  # Quick testing
# >>> pi
# 3.14159...

# ACCEPTABLE - well-designed API
# typing.py defines __all__ for this use case
from typing import *  # List, Dict, Optional, etc.

# GOOD - controlled with __all__
# myapi.py
__all__ = ['Client', 'authenticate', 'fetch']

class Client: pass
def authenticate(): pass
def fetch(): pass
def _internal(): pass  # Not exported

# from myapi import *  → only gets __all__ items

# Rule: Never use * unless:
# 1. Interactive session (exploration)
# 2. Module designed for it (__all__ defined)
# 3. You're the typing module`},{section:`Why & When`,signature:`Package structure best practices`,description:`Flat is better than nested. Deep hierarchies (a.b.c.d.e) are hard to navigate. 2-3 levels max for most projects.`,complexity:`Concept`,example:`# BAD - too deep, hard to navigate
from myapp.services.api.handlers.v2.users.actions import get_user
# 8 levels deep! Where do I find this code?

# GOOD - flat, clear structure
from myapp.api.users import get_user
# 3 levels, easy to find

# GOOD project structure (2-3 levels)
myproject/
  __init__.py
  core/           # Core business logic
    __init__.py
    models.py
    services.py
  api/            # API layer
    __init__.py
    routes.py
    handlers.py
  utils/          # Utilities
    __init__.py
    helpers.py

# BAD - over-engineered (5+ levels)
myproject/
  src/
    main/
      python/
        com/
          company/
            project/
              module/
                file.py  # 9 folders deep!

# Rule of thumb:
# - App: 2-3 package levels
# - Library: 1-2 levels
# - If > 4 levels, rethink structure`},{section:`Program Structure`,signature:`Main script + modules`,description:`Programs have one main script (entry point) and library modules providing tools.`,complexity:`Concept`,example:`# project/
#   main.py          ← entry point
#   utils/
#     __init__.py
#     helpers.py
#     database.py
#   config.py

# main.py
from utils.helpers import process
from utils.database import connect
import config

def main():
    db = connect(config.DB_URL)
    process(db)

if __name__ == "__main__":
    main()`},{section:`Program Structure`,signature:`Naming constraints`,description:`Module/package names must follow variable rules because they become variable names in code.`,complexity:`Concept`,example:`# VALID: mymodule.py, my_module.py, module2.py

# INVALID (can't import):
# my-module.py  → import my-module = my MINUS module!
# 2module.py    → starts with digit
# for.py        → reserved word

# Package folders follow same rules
# my-package/ will cause SyntaxError on import`},{section:`Namespaces`,signature:`Module as namespace`,description:`A module is a package of variable names. Top-level assignments become module attributes.`,complexity:`Concept`,example:`# mymodule.py
x = 10              # becomes mymodule.x
def func(): pass    # becomes mymodule.func
class MyClass: pass # becomes mymodule.MyClass

# Only top-level names become attributes
# Names inside def/class are local to those

# other.py
import mymodule
print(mymodule.x)       # 10
mymodule.func()         # works
obj = mymodule.MyClass()`},{section:`Namespaces`,signature:`Encapsulation`,description:`Each module is a separate namespace. Same variable names in different modules don't conflict.`,complexity:`Concept`,example:`# mod1.py
x = 10
def process(): return x * 2

# mod2.py
x = 99  # No conflict with mod1.x!
def process(): return x + 1

# main.py
import mod1
import mod2

print(mod1.x)  # 10
print(mod2.x)  # 99
# Qualification keeps them separate`},{section:`Import Variants`,signature:`from module import *`,description:`Copies all top-level names from module. Avoid in production—pollutes namespace.`,complexity:`O(n)`,example:`from math import *
print(sqrt(16))  # 4.0
print(pi)        # 3.14159...

# Copies EVERY public name into your namespace
# Problems:
# - Don't know what names you're getting
# - May overwrite existing names
# - Hard to trace where names come from

# OK for interactive exploration
# Bad for production code`},{section:`Import Variants`,signature:`_underscore privacy`,description:`Names starting with _ are not copied by "from module import *". Convention for private names.`,complexity:`Concept`,example:`# mymodule.py
public_api = "use this"
_internal = "implementation detail"

def public_func(): pass
def _helper(): pass

# other.py
from mymodule import *
# Gets: public_func, public_api
# Does NOT get: _internal, _helper

# Can still access explicitly:
from mymodule import _internal  # works`},{section:`Reloading`,signature:`importlib.reload()`,description:`Re-run module code to pick up changes. Requires already-loaded module object.`,complexity:`O(n)`,example:`from importlib import reload
import mymodule

# Edit mymodule.py externally...

reload(mymodule)  # Re-executes module code

# Caveats:
# - Only updates the module object
# - Objects imported with 'from' still reference old!

from mymodule import func  # old func
reload(mymodule)           # module updated
# func still points to old version`},{section:`Reloading`,signature:`Transitive reloading`,description:`reload() only updates one module. For dependencies, must reload recursively with cycle detection.`,complexity:`O(n)`,example:`# Standard reload doesn't reload dependencies
# For full reload, walk import graph recursively

def transitive_reload(module, visited=None):
    if visited is None:
        visited = set()  # Track visited to avoid cycles
    if module in visited:
        return  # Already reloaded, skip (cycle!)
    visited.add(module)

    # Reload dependencies first
    for name in dir(module):
        attr = getattr(module, name)
        if isinstance(attr, type(module)):
            transitive_reload(attr, visited)

    reload(module)`},{section:`Dynamic Imports`,signature:`importlib.import_module()`,description:`Import module by name string at runtime. Foundation for plugin architectures.`,complexity:`O(n)`,example:`import importlib

# Import when module name is a string variable
module_name = "json"
mod = importlib.import_module(module_name)
print(mod.dumps({"a": 1}))  # '{"a": 1}'

# Plugin architecture pattern
def load_plugin(name):
    return importlib.import_module(f"plugins.{name}")

plugin = load_plugin("auth")  # loads plugins/auth.py
plugin.initialize()`},{section:`Dynamic Imports`,signature:`__import__() builtin`,description:`Low-level import by string. Prefer importlib.import_module() for clarity.`,complexity:`O(n)`,example:`# __import__ is the builtin behind import statement
mod = __import__("json")
print(mod.dumps([1, 2]))  # '[1, 2]'

# For nested modules, use importlib instead
# __import__("pkg.mod") returns pkg, not mod!

import importlib
mod = importlib.import_module("pkg.mod")  # returns mod

# Use case: loading modules from config files
config = {"handler": "handlers.email"}
handler = importlib.import_module(config["handler"])`}],a=[...r,...i],o=[{signature:`Exceptions vs return codes`,description:`Exceptions: abnormal conditions, can't be ignored. Return codes/None: expected alternatives, can be ignored. Use exceptions when caller shouldn't continue.`,complexity:`Concept`,section:`Why & When`,example:`# RETURN CODES - expected cases
def find_user(user_id):
    user = db.get(user_id)
    return user  # None if not found (OK)

user = find_user(123)
if user:
    print(user.name)

# EXCEPTIONS - abnormal conditions
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# Caller MUST handle this
try:
    result = divide(10, 0)
except ValueError:
    result = float('inf')

# Rule: Return None for "not found"
#       Raise exception for "invalid input"`},{signature:`EAFP vs LYBYL`,description:`EAFP (Easier to Ask Forgiveness): try first, handle exceptions. LYBYL (Look Before You Leap): check first. Python prefers EAFP.`,complexity:`Concept`,section:`Why & When`,example:`# LYBYL - check before action
if key in my_dict:
    value = my_dict[key]
else:
    value = default
# Problem: race condition in threading, 2 lookups

# EAFP - just try it
try:
    value = my_dict[key]
except KeyError:
    value = default
# Better: atomic, one lookup, catches all edge cases

# EAFP is Pythonic for:
# - File operations (don't check exists, just open)
# - Attribute access (hasattr → getattr with default)
# - Type checking (try operation, not isinstance)
# LYBYL is better for:
# - Expensive operations where failure is common
# - User input validation (fail fast)`},{signature:`Exception performance cost`,description:`try: ~0 cost. Raising exception: ~1-5μs (microseconds). Use for exceptional cases, not control flow.`,complexity:`O(1)`,section:`Why & When`,example:`# GOOD - exceptions for errors
def get_user(user_id):
    user = db.query(user_id)
    if not user:
        raise ValueError(f"User {user_id} not found")
    return user
# Exception raised rarely

# BAD - exceptions for control flow
def first_even(numbers):
    for num in numbers:
        try:
            if num % 2 == 0:
                raise StopIteration(num)  # DON'T DO THIS
        except StopIteration as e:
            return e.value
# Exception raised every call! Slow!

# GOOD - normal control flow
def first_even(numbers):
    for num in numbers:
        if num % 2 == 0:
            return num
    return None

# Benchmark: 1 million iterations
# Exception: ~5 seconds
# If/else:   ~0.2 seconds (25x faster)`},{signature:`When to catch vs propagate`,description:`Catch when: you can handle it, have meaningful recovery, at API boundaries. Propagate when: can't fix, need more context, want caller to decide.`,complexity:`Concept`,section:`Why & When`,example:`# CATCH - can handle locally
def read_config(path):
    try:
        with open(path) as f:
            return json.load(f)
    except FileNotFoundError:
        return {}  # Use defaults
    except json.JSONDecodeError:
        return {}  # Invalid JSON → defaults

# PROPAGATE - need caller context
def fetch_user(user_id):
    response = requests.get(f"/api/users/{user_id}")
    response.raise_for_status()  # Let caller handle 404/500
    return response.json()

# CATCH AT BOUNDARY
def main():
    try:
        user = fetch_user(123)
        config = read_config("config.json")
        app.run(user, config)
    except requests.HTTPError as e:
        print(f"API error: {e}")
    except Exception as e:
        log.error(f"Unexpected: {e}")
        raise  # Re-raise after logging

# Rule: Handle at the level with enough context`},{signature:`When to create custom exceptions`,description:`Create custom exceptions when: need domain-specific error types, want to attach extra data, have exception hierarchy, building library/API.`,complexity:`Concept`,section:`Why & When`,example:`# DON'T - built-in is enough
class InvalidNumber(ValueError):
    pass
# Just use ValueError!

# DO - need extra data
class ValidationError(Exception):
    def __init__(self, field, value, reason):
        self.field = field
        self.value = value
        self.reason = reason
        super().__init__(f"{field}: {reason} (got {value})")

try:
    raise ValidationError("age", -5, "must be positive")
except ValidationError as e:
    print(f"Field: {e.field}")   # age
    print(f"Reason: {e.reason}") # must be positive

# DO - exception hierarchy for library
class DatabaseError(Exception):
    """Base for all DB errors"""
    pass

class ConnectionError(DatabaseError):
    pass

class QueryError(DatabaseError):
    pass

# Users can catch specific or all DB errors
try:
    db.query(sql)
except ConnectionError:
    retry()
except DatabaseError:
    log_error()`},{signature:`try: ... except:`,description:`Basic exception handling. Catches all exceptions if no type specified.`,complexity:`O(1)`,section:`Basic Handling`,example:`try:
    x = 1 / 0
except:
    print("An error occurred")

# Better: specify exception type
try:
    x = 1 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")`},{signature:`try: ... except ExceptionType:`,description:`Catch specific exception type. Multiple except blocks possible.`,complexity:`O(1)`,section:`Basic Handling`,example:`try:
    num = int(input("Enter number: "))
    result = 10 / num
except ValueError:
    print("Invalid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catch multiple types
try:
    # risky code
    pass
except (TypeError, ValueError):
    print("Type or Value error")`},{signature:`except ExceptionType as e:`,description:`Capture exception object for details.`,complexity:`O(1)`,section:`Basic Handling`,example:`try:
    x = 1 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")           # division by zero
    print(f"Type: {type(e)}")      # <class 'ZeroDivisionError'>
    print(f"Args: {e.args}")       # ('division by zero',)

try:
    open("missing.txt")
except FileNotFoundError as e:
    print(f"File: {e.filename}")   # missing.txt
    print(f"Error: {e.strerror}")  # No such file or directory`},{signature:`try: ... else:`,description:`else block runs if no exception occurred.`,complexity:`O(1)`,section:`Basic Handling`,example:`try:
    num = int("42")
except ValueError:
    print("Invalid!")
else:
    print(f"Success: {num}")  # Success: 42

# Useful pattern
def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        return None
    else:
        print("Division successful")
        return result`},{signature:`try: ... finally:`,description:`finally block always executes, even if exception raised.`,complexity:`O(1)`,section:`Basic Handling`,example:`try:
    f = open("file.txt", "w")
    f.write("Hello")
except IOError:
    print("Error writing file")
finally:
    f.close()  # Always runs
    print("File closed")

# Even with return
def test():
    try:
        return 1
    finally:
        print("Finally runs!")  # Still prints!

test()  # Prints "Finally runs!" then returns 1`},{signature:`raise ExceptionType`,description:`Raise an exception to signal an error.`,complexity:`O(1)`,section:`Raising Exceptions`,example:`def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age seems unrealistic")
    return True

try:
    validate_age(-5)
except ValueError as e:
    print(e)  # Age cannot be negative`},{signature:`raise ExceptionType(message)`,description:`Raise with custom error message.`,complexity:`O(1)`,section:`Raising Exceptions`,example:`def withdraw(balance, amount):
    if amount > balance:
        raise ValueError(f"Insufficient funds: need {amount}, have {balance}")
    return balance - amount

try:
    withdraw(100, 150)
except ValueError as e:
    print(e)  # Insufficient funds: need 150, have 100`},{signature:`raise`,description:`Re-raise current exception. Preserves original traceback.`,complexity:`O(1)`,section:`Raising Exceptions`,example:`try:
    try:
        x = 1 / 0
    except ZeroDivisionError:
        print("Logging error...")
        raise  # Re-raise the same exception
except ZeroDivisionError:
    print("Caught re-raised exception")`},{signature:`raise ... from ...`,description:`Chain exceptions. Shows cause in traceback.`,complexity:`O(1)`,section:`Raising Exceptions`,example:`def load_config(filename):
    try:
        with open(filename) as f:
            return f.read()
    except FileNotFoundError as e:
        raise RuntimeError(f"Config failed: {filename}") from e

try:
    load_config("missing.yaml")
except RuntimeError as e:
    print(e)                 # Config failed: missing.yaml
    print(e.__cause__)       # Original FileNotFoundError`},{signature:`class CustomError(Exception):`,description:`Create custom exception by inheriting from Exception.`,complexity:`O(1)`,section:`Custom Exceptions`,example:`class ValidationError(Exception):
    """Raised when validation fails"""
    pass

class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"Need {amount}, have {balance}")

try:
    raise InsufficientFundsError(100, 150)
except InsufficientFundsError as e:
    print(f"Balance: {e.balance}")  # 100
    print(f"Amount: {e.amount}")    # 150`},{signature:`Exception hierarchy`,description:`Create exception hierarchies for related errors.`,complexity:`O(1)`,section:`Custom Exceptions`,example:`class APIError(Exception):
    """Base class for API errors"""
    pass

class AuthenticationError(APIError):
    """Failed to authenticate"""
    pass

class RateLimitError(APIError):
    """Too many requests"""
    def __init__(self, retry_after):
        self.retry_after = retry_after
        super().__init__(f"Rate limited, retry in {retry_after}s")

# Catch all API errors
try:
    raise RateLimitError(60)
except APIError as e:
    print(f"API Error: {e}")`},{signature:`ValueError`,description:`Raised when function receives correct type but invalid value.`,complexity:`O(1)`,section:`Built-in Exceptions`,example:`int("abc")      # ValueError: invalid literal
int("3.14")     # ValueError
list().remove(5) # ValueError: 5 not in list

# Common validation pattern
def parse_positive(s):
    num = int(s)
    if num <= 0:
        raise ValueError("Must be positive")
    return num`},{signature:`TypeError`,description:`Raised when operation applied to wrong type.`,complexity:`O(1)`,section:`Built-in Exceptions`,example:`"hello" + 5        # TypeError: can only concatenate str
len(42)            # TypeError: object has no len()
sum("abc")         # TypeError: unsupported operand type

# Check types
def add_numbers(a, b):
    if not isinstance(a, (int, float)):
        raise TypeError(f"Expected number, got {type(a)}")
    return a + b`},{signature:`KeyError`,description:`Raised when dictionary key not found.`,complexity:`O(1)`,section:`Built-in Exceptions`,example:`d = {"a": 1}
d["b"]            # KeyError: 'b'

# Avoid with .get()
value = d.get("b", "default")

# Or try/except
try:
    value = d["b"]
except KeyError:
    value = "default"`},{signature:`IndexError`,description:`Raised when sequence index out of range.`,complexity:`O(1)`,section:`Built-in Exceptions`,example:`lst = [1, 2, 3]
lst[10]           # IndexError: list index out of range

# Safe access
def safe_get(lst, idx, default=None):
    try:
        return lst[idx]
    except IndexError:
        return default

print(safe_get([1, 2, 3], 10, "N/A"))  # N/A`},{signature:`AttributeError`,description:`Raised when attribute access or assignment fails.`,complexity:`O(1)`,section:`Built-in Exceptions`,example:`"hello".foo()     # AttributeError: no attribute 'foo'
None.something    # AttributeError

# Check with hasattr
obj = "hello"
if hasattr(obj, 'upper'):
    print(obj.upper())

# Or try/except
try:
    result = obj.foo()
except AttributeError:
    result = None`},{signature:`FileNotFoundError`,description:`Raised when file or directory not found.`,complexity:`O(1)`,section:`Built-in Exceptions`,example:`open("missing.txt")  # FileNotFoundError

# Handle missing files
def read_file(path):
    try:
        with open(path) as f:
            return f.read()
    except FileNotFoundError:
        return None  # Or create file, etc.`},{signature:`ImportError / ModuleNotFoundError`,description:`Raised when import fails.`,complexity:`O(1)`,section:`Built-in Exceptions`,example:`# import nonexistent  # ModuleNotFoundError

# Optional dependency pattern
try:
    import numpy as np
    HAS_NUMPY = True
except ImportError:
    HAS_NUMPY = False

def calculate(data):
    if HAS_NUMPY:
        return np.mean(data)
    return sum(data) / len(data)`},{signature:`StopIteration`,description:`Raised by next() when iterator exhausted.`,complexity:`O(1)`,section:`Built-in Exceptions`,example:`it = iter([1, 2])
print(next(it))  # 1
print(next(it))  # 2
# next(it)       # StopIteration

# With default
print(next(it, "done"))  # "done" (no exception)

# In generator
def gen():
    yield 1
    yield 2
    # StopIteration raised automatically at end`},{signature:`AssertionError`,description:`Raised when assert statement fails.`,complexity:`O(1)`,section:`Built-in Exceptions`,example:`assert 1 == 1      # OK
# assert 1 == 2    # AssertionError

# With message
x = -5
assert x > 0, f"x must be positive, got {x}"
# AssertionError: x must be positive, got -5

# Note: assertions can be disabled with -O flag
# Don't use for data validation in production!`}],s=[{signature:`with statement`,description:`Automatic resource management. Ensures cleanup.`,complexity:`O(1)`,section:`Context Managers`,example:`# File automatically closed
with open("file.txt") as f:
    content = f.read()
# f is closed here, even if exception occurred

# Multiple contexts
with open("in.txt") as f_in, open("out.txt", "w") as f_out:
    f_out.write(f_in.read())

# Equivalent to:
# f = open("file.txt")
# try:
#     content = f.read()
# finally:
#     f.close()`},{signature:`@contextmanager`,description:`Create context manager from generator function.`,complexity:`O(1)`,section:`Context Managers`,example:`from contextlib import contextmanager

@contextmanager
def timer(label):
    import time
    start = time.time()
    try:
        yield  # Code in 'with' block runs here
    finally:
        end = time.time()
        print(f"{label}: {end - start:.2f}s")

with timer("Processing"):
    sum(range(1000000))
# Prints: Processing: 0.03s`},{signature:`Custom context manager class`,description:`Implement __enter__ and __exit__ methods.`,complexity:`O(1)`,section:`Context Managers`,example:`class DatabaseConnection:
    def __init__(self, host):
        self.host = host

    def __enter__(self):
        print(f"Connecting to {self.host}")
        self.conn = f"Connection to {self.host}"
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing connection")
        if exc_type is not None:
            print(f"Error occurred: {exc_val}")
        return False  # Don't suppress exceptions

with DatabaseConnection("localhost") as conn:
    print(f"Using {conn}")
# Connecting to localhost
# Using Connection to localhost
# Closing connection`},{signature:`contextlib.suppress`,description:`Suppress specified exceptions silently.`,complexity:`O(1)`,section:`Context Managers`,example:`from contextlib import suppress

# Instead of try/except/pass
with suppress(FileNotFoundError):
    os.remove("maybe_missing.txt")

# Equivalent to:
# try:
#     os.remove("maybe_missing.txt")
# except FileNotFoundError:
#     pass

# Multiple exceptions
with suppress(KeyError, IndexError):
    x = d["missing"]
    y = lst[100]`},{signature:`contextlib.redirect_stdout`,description:`Temporarily redirect stdout to file or buffer.`,complexity:`O(1)`,section:`Context Managers`,example:`from contextlib import redirect_stdout
from io import StringIO

# Capture output
buffer = StringIO()
with redirect_stdout(buffer):
    print("This goes to buffer")
    print("So does this")

captured = buffer.getvalue()
print(f"Captured: {captured}")

# Redirect to file
with open("output.txt", "w") as f:
    with redirect_stdout(f):
        print("Goes to file")`},{signature:`Context managers vs try/finally`,description:`Context managers (with): for resources needing cleanup (files, locks). try/finally: for one-off cleanup. Prefer with for reusable patterns.`,complexity:`Concept`,section:`Why & When`,example:`# ONE-OFF CLEANUP - try/finally
lock.acquire()
try:
    critical_section()
finally:
    lock.release()  # One-time cleanup

# REUSABLE RESOURCE - context manager
with open("file.txt") as f:
    process(f)
# File auto-closed

# Create context manager for reusable patterns
from contextlib import contextmanager

@contextmanager
def acquired(lock):
    lock.acquire()
    try:
        yield
    finally:
        lock.release()

# Now reusable!
with acquired(my_lock):
    critical_section()

# Use context manager when:
# - Resource needs cleanup (file, connection, lock)
# - Pattern repeats across codebase
# - Want to guarantee cleanup on error

# Use try/finally when:
# - One-off cleanup
# - Simple case, not worth extracting`},{signature:`Custom exceptions vs built-ins`,description:`Use built-ins when: error fits standard type (ValueError, TypeError). Custom when: need domain context, extra data, or exception hierarchy.`,complexity:`Concept`,section:`Why & When`,example:`# USE BUILT-IN - error is standard
def parse_age(s):
    age = int(s)  # Raises ValueError
    if age < 0:
        raise ValueError("Age must be positive")
    return age

# USE CUSTOM - need domain context
class PaymentError(Exception):
    """Base for payment errors"""
    pass

class InsufficientFundsError(PaymentError):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"Need {amount}, have {balance}")

class PaymentProcessingError(PaymentError):
    def __init__(self, transaction_id, reason):
        self.transaction_id = transaction_id
        super().__init__(f"Transaction {transaction_id}: {reason}")

# Custom exceptions when:
# - Need to attach extra data (balance, transaction_id)
# - Need exception hierarchy (catch all PaymentError)
# - Building library/API (domain-specific errors)
# - Want type safety (isinstance checks)

# Built-in exceptions when:
# - Error is generic (invalid value, wrong type)
# - No extra context needed
# - Internal code (not public API)`},{signature:`contextlib.suppress - when to use`,description:`Use suppress when: error is expected and should be ignored, no logging needed. Avoid when: error indicates real problem.`,complexity:`Concept`,section:`Why & When`,example:`from contextlib import suppress

# GOOD - expected, safe to ignore
with suppress(FileNotFoundError):
    os.remove("temp_file.txt")  # OK if missing

with suppress(KeyError):
    del cache["maybe_there"]  # OK if not in cache

# GOOD - cleanup, failure OK
with suppress(OSError):
    shutil.rmtree("temp_dir")  # Best effort cleanup

# BAD - error indicates real problem
with suppress(ValueError):
    user_id = int(request.data['id'])  # Invalid data!
# Should handle, not suppress

# BAD - lose debugging info
with suppress(Exception):  # Too broad!
    process_payment()
# Can't debug what went wrong

# Use suppress when:
# - Error is expected (file might not exist)
# - Silence is correct behavior
# - Best-effort cleanup (temp files)
# - No logging/handling needed

# Don't suppress when:
# - Error indicates bug or data issue
# - Need to log/report error
# - Catching too broad (Exception)`},{signature:`warnings vs exceptions`,description:`Warnings: deprecations, future behavior changes, non-fatal issues. Exceptions: errors that prevent continuation.`,complexity:`Concept`,section:`Why & When`,example:`import warnings

# USE WARNING - deprecation
def old_api():
    warnings.warn(
        "old_api deprecated, use new_api",
        DeprecationWarning,
        stacklevel=2
    )
    return new_api()  # Still works

# USE WARNING - non-fatal issues
def save_config(path):
    if not path.endswith('.json'):
        warnings.warn("Config should be .json", UserWarning)
    # Continue anyway
    with open(path, 'w') as f:
        json.dump(config, f)

# USE EXCEPTION - fatal error
def load_config(path):
    if not os.path.exists(path):
        raise FileNotFoundError(f"Config not found: {path}")
    # Can't continue without config

# Warnings for:
# - Deprecation notices (old_api → new_api)
# - Future behavior changes
# - Non-critical issues (code still works)
# - Development/debugging hints

# Exceptions for:
# - Errors preventing continuation
# - Invalid input that must be fixed
# - Resource failures (missing file, network down)
# - Contract violations (preconditions failed)

# Users can control warnings:
# warnings.filterwarnings("ignore")  # Silence
# warnings.filterwarnings("error")   # Convert to exception`},{signature:`Exception chaining - when to use "from"`,description:`Use "raise ... from ..." when: wrapping low-level errors in high-level context, maintaining error history. Shows cause in traceback.`,complexity:`Concept`,section:`Why & When`,example:`# WITHOUT CHAINING - lose context
def load_user(user_id):
    try:
        data = db.query(f"SELECT * FROM users WHERE id={user_id}")
    except DatabaseError:
        raise ValueError(f"User {user_id} not found")
# Lost original DB error!

# WITH CHAINING - preserve context
def load_user(user_id):
    try:
        data = db.query(f"SELECT * FROM users WHERE id={user_id}")
    except DatabaseError as e:
        raise ValueError(f"User {user_id} not found") from e
# Shows: ValueError caused by DatabaseError

# IMPLICIT CHAINING - exception during handling
try:
    value = data['key']
except KeyError:
    print(value)  # NameError!
# Shows both KeyError and NameError

# SUPPRESS CHAINING - intentional replacement
try:
    old_operation()
except OldError:
    raise NewError() from None  # Hide old error

# Use "from" when:
# - Wrapping implementation errors (DB → domain error)
# - Adding context while preserving history
# - Debugging needs full error chain

# Use "from None" when:
# - Replacing implementation details
# - Old error is noise (not helpful)

# Traceback shows:
# - Direct cause: raise X from Y
# - During handling: exception while handling exception
# - Suppressed: raise X from None`},{signature:`Nested try/finally (propagation)`,description:`Exceptions bubble up through nested handlers. All finally blocks execute during unwinding.`,complexity:`O(1)`,section:`Nesting & Idioms`,example:`def inner():
    try:
        raise ValueError("Oops")
    finally:
        print("inner finally")  # Always runs

def outer():
    try:
        inner()
    finally:
        print("outer finally")  # Also runs

try:
    outer()
except ValueError as e:
    print(f"Caught: {e}")
# inner finally
# outer finally
# Caught: Oops`},{signature:`Break nested loops`,description:`Use exception to jump out of deeply nested loops instantly. Cleaner than flag variables.`,complexity:`O(1)`,section:`Nesting & Idioms`,example:`class Found(Exception):
    pass

matrix = [[1, 2], [3, 4], [5, 6]]
target = 4

try:
    for row in matrix:
        for val in row:
            if val == target:
                raise Found()
except Found:
    print(f"Found {target}!")

# vs messy flag approach:
# found = False
# for row in matrix:
#     for val in row:
#         if val == target:
#             found = True
#             break
#     if found: break`},{signature:`Exception with state/methods`,description:`Attach data via __init__, add methods for exception-specific behavior.`,complexity:`O(1)`,section:`Nesting & Idioms`,example:`class DatabaseError(Exception):
    def __init__(self, message, code, query=None):
        super().__init__(message)
        self.code = code
        self.query = query

    def log(self):
        return f"[DB-{self.code}] {self} | Query: {self.query}"

try:
    raise DatabaseError("Connection failed", 503, "SELECT *")
except DatabaseError as e:
    print(e.code)       # 503
    print(e.query)      # SELECT *
    print(e.log())      # [DB-503] Connection failed | Query: SELECT *`},{signature:`warnings.warn()`,description:`Issue a warning without stopping execution.`,complexity:`O(1)`,section:`Warnings & Info`,example:`import warnings

def deprecated_function():
    warnings.warn(
        "deprecated_function is deprecated, use new_function",
        DeprecationWarning,
        stacklevel=2
    )
    return "old behavior"

# Control warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("error", category=UserWarning)  # Treat as error`},{signature:`sys.exc_info()`,description:`Get current exception info tuple (type, value, traceback).`,complexity:`O(1)`,section:`Warnings & Info`,example:`import sys

try:
    x = 1 / 0
except:
    exc_type, exc_value, exc_tb = sys.exc_info()
    print(f"Type: {exc_type}")     # <class 'ZeroDivisionError'>
    print(f"Value: {exc_value}")   # division by zero
    print(f"Line: {exc_tb.tb_lineno}")`}],c=[...o,...s],l=[{signature:`Logging vs print() - when to use each`,description:`print(): development/debugging. logging: production. Logging provides levels, timestamps, file output, filtering. Never use print in production.`,complexity:`Concept`,section:`Why & When`,example:`# PRINT - development only
def process_data(data):
    print(f"Processing {len(data)} items")  # OK for quick debugging
    print(f"Result: {result}")

# LOGGING - production code
import logging
logger = logging.getLogger(__name__)

def process_data(data):
    logger.debug(f"Processing {len(data)} items")  # Filterable
    logger.info(f"Result: {result}")  # With timestamps

# Why logging wins:
# - Levels (debug, info, warning, error)
# - Timestamps automatic
# - Output to file/syslog/remote
# - Can disable without code changes
# - Structured data (JSON)
# - Production monitoring integration

# Use print when:
# - Quick one-off debugging
# - Interactive scripts (CLI tools)
# - Learning Python

# Use logging when:
# - Production code
# - Long-running services
# - Error tracking needed
# - Multiple output destinations
# - Team collaboration (others need to debug)`},{signature:`Log levels - when to use which`,description:`DEBUG: development details. INFO: major events. WARNING: unexpected but handled. ERROR: functionality broken. CRITICAL: system down.`,complexity:`Concept`,section:`Why & When`,example:`import logging

# DEBUG - detailed diagnostic info (disabled in production)
logger.debug(f"Cache hit for key={key}, value={value}")
logger.debug("Entering retry loop, attempt 3/5")
# Use: algorithm internals, state tracking

# INFO - major milestones (keep in production)
logger.info("Application started")
logger.info("Processing batch 42/100")
logger.info("User alice logged in from IP 1.2.3.4")
# Use: important events, audit trail

# WARNING - unexpected but handled
logger.warning("API rate limit approaching (90%)")
logger.warning("Config file missing, using defaults")
logger.warning("Deprecated function called")
# Use: degraded mode, fallbacks, deprecations

# ERROR - functionality failed
logger.error("Failed to send email to user@example.com")
logger.error("Database connection lost, retrying...")
# Use: operation failed but app continues

# CRITICAL - system failure
logger.critical("Out of memory, shutting down")
logger.critical("Database corrupted, cannot start")
# Use: unrecoverable errors, system down

# Production level config:
# Development → DEBUG (see everything)
# Staging → INFO (important events)
# Production → WARNING (problems only)`},{signature:`Handlers - console vs file vs rotating`,description:`Console: development. File: production audit. Rotating: long-running services. Use multiple handlers for different audiences.`,complexity:`Concept`,section:`Why & When`,example:`import logging
from logging.handlers import RotatingFileHandler

logger = logging.getLogger('myapp')
logger.setLevel(logging.DEBUG)

# CONSOLE - development, real-time monitoring
console = logging.StreamHandler()
console.setLevel(logging.INFO)  # Less noise
console.setFormatter(logging.Formatter('%(levelname)s: %(message)s'))
logger.addHandler(console)

# FILE - production audit trail
file_handler = logging.FileHandler('app.log')
file_handler.setLevel(logging.DEBUG)  # Everything to file
file_handler.setFormatter(
    logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
)
logger.addHandler(file_handler)

# ROTATING - long-running services (prevents disk fill)
rotating = RotatingFileHandler(
    'app.log',
    maxBytes=10*1024*1024,  # 10 MB per file
    backupCount=5           # Keep 5 files = 50 MB max
)
logger.addHandler(rotating)

# Common patterns:
# Development: console only (INFO+)
# Production: file (DEBUG+) + console (ERROR+)
# Long-running: rotating file + remote syslog
# Containerized: console only (Docker captures)`},{signature:`Structured/JSON logging - when it matters`,description:`Plain text: humans. JSON: machines, log aggregators. Use JSON when: centralized logging, complex queries, production systems at scale.`,complexity:`Concept`,section:`Why & When`,example:`# PLAIN TEXT - good for humans
logging.basicConfig(format='%(asctime)s - %(message)s')
logger.info("User alice purchased item for $42.50")
# 2024-01-15 10:30:45 - User alice purchased item for $42.50

# JSON - good for machines
import json

class JsonFormatter(logging.Formatter):
    def format(self, record):
        return json.dumps({
            'timestamp': self.formatTime(record),
            'level': record.levelname,
            'event': record.getMessage(),
            'user': getattr(record, 'user', None),
            'amount': getattr(record, 'amount', None)
        })

logger.info("Purchase completed", extra={'user': 'alice', 'amount': 42.50})
# {"timestamp": "2024-01-15 10:30:45", "event": "Purchase completed", "user": "alice", "amount": 42.50}

# Use JSON when:
# - Centralized logging (ELK, Splunk, Datadog)
# - Need to query/filter logs
# - Microservices architecture
# - Production systems (>100 req/sec)
# - Compliance/audit requirements

# Use plain text when:
# - Small projects
# - Debugging locally
# - Reading logs directly (tail -f)
# - Simple applications`},{signature:`Logging performance - when it matters`,description:`Logging is fast (~1-10μs per call) but adds up. Use lazy evaluation, conditional logging. Matters for hot paths (>1000 calls/sec).`,complexity:`O(1)`,section:`Why & When`,example:`import logging
logger = logging.getLogger(__name__)

# BAD - always formats, even if not logged
logger.debug("Processing user: " + str(user))  # String concat happens even if DEBUG disabled!

# GOOD - lazy evaluation with %
logger.debug("Processing user: %s", user)  # Only formats if DEBUG enabled

# GOOD - lazy with f-string (Python 3.8+)
if logger.isEnabledFor(logging.DEBUG):
    logger.debug(f"Processing {expensive_computation()}")

# Performance impact:
# - Disabled log: ~10 nanoseconds (level check only)
# - Enabled log to console: ~1 microsecond
# - Enabled log to file: ~5-10 microseconds
# - JSON formatting: ~20 microseconds

# When logging matters:
# Hot path (called 1000s times/sec):
for item in millions_of_items:
    logger.debug(f"Item: {item}")  # BAD! Huge overhead

    # Instead, sample or aggregate:
    if item_count % 1000 == 0:
        logger.info(f"Processed {item_count} items")

# Rule of thumb:
# <100 calls/sec → don't worry about it
# 100-1000 calls/sec → use lazy evaluation
# >1000 calls/sec → conditional logging, sampling`},{signature:`import logging`,description:`Built-in logging module. Better than print for production.`,complexity:`O(1)`,section:`Basic Logging`,example:`import logging

# Quick start - root logger
logging.warning("This is a warning")    # Shown
logging.info("This is info")            # Not shown (default level is WARNING)

# Configure root logger
logging.basicConfig(level=logging.DEBUG)
logging.debug("Now this shows")
logging.info("And this too")`},{signature:`Logging levels`,description:`DEBUG < INFO < WARNING < ERROR < CRITICAL`,complexity:`O(1)`,section:`Basic Logging`,example:`import logging
logging.basicConfig(level=logging.DEBUG)

logging.debug("Detailed info for debugging")
logging.info("General information")
logging.warning("Something unexpected")
logging.error("Something went wrong")
logging.critical("System is down!")

# Numeric values
# DEBUG: 10, INFO: 20, WARNING: 30, ERROR: 40, CRITICAL: 50`},{signature:`logging.basicConfig()`,description:`Configure root logger format, file, level.`,complexity:`O(1)`,section:`Basic Logging`,example:`import logging

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
    filename='app.log',  # Log to file
    filemode='w'         # Overwrite (default is 'a' append)
)

logging.info("Application started")
# 2024-01-15 10:30:45 - root - INFO - Application started`},{signature:`logging.getLogger(name)`,description:`Create/get named logger. Use __name__ for module logger.`,complexity:`O(1)`,section:`Basic Logging`,example:`import logging

# Get logger for current module
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Add handler
handler = logging.StreamHandler()
handler.setFormatter(logging.Formatter('%(name)s - %(message)s'))
logger.addHandler(handler)

logger.info("Module initialized")
# __main__ - Module initialized`},{signature:`StreamHandler`,description:`Output logs to stream (stdout/stderr).`,complexity:`O(1)`,section:`Handlers`,example:`import logging

logger = logging.getLogger('myapp')
logger.setLevel(logging.DEBUG)

# Console handler
console = logging.StreamHandler()
console.setLevel(logging.INFO)
console.setFormatter(logging.Formatter('%(levelname)s: %(message)s'))

logger.addHandler(console)
logger.info("To console")`},{signature:`FileHandler`,description:`Output logs to file.`,complexity:`O(1)`,section:`Handlers`,example:`import logging

logger = logging.getLogger('myapp')

# File handler
file_handler = logging.FileHandler('app.log')
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(
    logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
)

logger.addHandler(file_handler)
logger.info("To file")`},{signature:`RotatingFileHandler`,description:`Auto-rotate log files by size.`,complexity:`O(1)`,section:`Handlers`,example:`from logging.handlers import RotatingFileHandler

handler = RotatingFileHandler(
    'app.log',
    maxBytes=5*1024*1024,  # 5 MB
    backupCount=3          # Keep 3 backup files
)

# Creates: app.log, app.log.1, app.log.2, app.log.3`},{signature:`TimedRotatingFileHandler`,description:`Auto-rotate log files by time.`,complexity:`O(1)`,section:`Handlers`,example:`from logging.handlers import TimedRotatingFileHandler

handler = TimedRotatingFileHandler(
    'app.log',
    when='midnight',     # Rotate at midnight
    interval=1,          # Every 1 day
    backupCount=7        # Keep 7 days
)

# when options: 'S', 'M', 'H', 'D', 'midnight', 'W0'-'W6'`},{signature:`Format attributes`,description:`Common format attributes for log messages.`,complexity:`O(1)`,section:`Formatters`,example:`import logging

# Available attributes:
# %(name)s       - Logger name
# %(levelname)s  - Level (DEBUG, INFO, etc.)
# %(message)s    - Log message
# %(asctime)s    - Timestamp
# %(filename)s   - Source filename
# %(lineno)d     - Line number
# %(funcName)s   - Function name
# %(pathname)s   - Full path

fmt = '%(asctime)s | %(levelname)-8s | %(filename)s:%(lineno)d | %(message)s'
logging.basicConfig(format=fmt)`},{signature:`Extra fields`,description:`Add custom fields to log records.`,complexity:`O(1)`,section:`Structured Logging`,example:`import logging

logging.basicConfig(
    format='%(asctime)s - %(user)s - %(message)s'
)

# Pass extra data
logging.info("User logged in", extra={'user': 'alice'})
# 2024-01-15 10:30:45 - alice - User logged in

# Or use LoggerAdapter
class CustomAdapter(logging.LoggerAdapter):
    def process(self, msg, kwargs):
        return f"[{self.extra['user']}] {msg}", kwargs

logger = CustomAdapter(logging.getLogger(), {'user': 'bob'})
logger.info("Action performed")`},{signature:`JSON logging`,description:`Output logs as JSON for parsing.`,complexity:`O(1)`,section:`Structured Logging`,example:`import logging
import json

class JsonFormatter(logging.Formatter):
    def format(self, record):
        return json.dumps({
            'timestamp': self.formatTime(record),
            'level': record.levelname,
            'message': record.getMessage(),
            'module': record.module,
            'line': record.lineno
        })

handler = logging.StreamHandler()
handler.setFormatter(JsonFormatter())
logger = logging.getLogger()
logger.addHandler(handler)

logger.info("Structured log")
# {"timestamp": "2024-01-15 10:30:45", "level": "INFO", ...}`}],u=[{signature:`import pdb; pdb.set_trace()`,description:`Start interactive debugger at this point.`,complexity:`O(1)`,section:`Debugging with pdb`,example:`def buggy_function(x, y):
    result = x + y
    import pdb; pdb.set_trace()  # Debugger starts here
    return result * 2

# In Python 3.7+, use builtin:
def buggy_function(x, y):
    result = x + y
    breakpoint()  # Same as pdb.set_trace()
    return result * 2

# Common pdb commands:
# n (next)     - Execute next line
# s (step)     - Step into function
# c (continue) - Continue until next breakpoint
# p expr       - Print expression
# l (list)     - Show source code
# q (quit)     - Quit debugger`},{signature:`pdb commands`,description:`Common debugger commands in pdb.`,complexity:`O(1)`,section:`Debugging with pdb`,example:`# Navigation
# n (next)     - Execute next line (skip functions)
# s (step)     - Step into function call
# r (return)   - Continue until function returns
# c (continue) - Continue execution
# q (quit)     - Quit debugger

# Inspection
# p expr       - Print expression value
# pp expr      - Pretty-print expression
# l (list)     - List source code
# ll           - List whole function
# w (where)    - Print stack trace
# a (args)     - Print function arguments

# Breakpoints
# b line       - Set breakpoint at line
# b func       - Set breakpoint at function
# cl           - Clear breakpoints
# disable/enable - Toggle breakpoints`},{signature:`Post-mortem debugging`,description:`Debug after exception occurs.`,complexity:`O(1)`,section:`Debugging with pdb`,example:`import pdb

def divide(a, b):
    return a / b

try:
    divide(1, 0)
except:
    pdb.post_mortem()  # Start debugger at exception point

# Or run script with debugging
# python -m pdb script.py

# Auto post-mortem on any exception
import sys
def debug_hook(type, value, tb):
    pdb.pm()
sys.excepthook = debug_hook`},{signature:`breakpoint()`,description:`Python 3.7+ built-in debugger entry point.`,complexity:`O(1)`,section:`Debugging with pdb`,example:`def calculate(x):
    result = x * 2
    breakpoint()  # Debugger starts here
    return result + 1

# Disable with environment variable
# PYTHONBREAKPOINT=0 python script.py

# Use different debugger
# PYTHONBREAKPOINT=ipdb.set_trace python script.py
# PYTHONBREAKPOINT=pudb.set_trace python script.py`},{signature:`assert condition`,description:`Raise AssertionError if condition is False.`,complexity:`O(1)`,section:`Assert Statements`,example:`def divide(a, b):
    assert b != 0, "Divisor cannot be zero"
    return a / b

divide(10, 2)   # OK
# divide(10, 0) # AssertionError: Divisor cannot be zero

# Assert with expression
x = -5
assert x > 0, f"Expected positive, got {x}"

# WARNING: Assertions disabled with -O flag
# python -O script.py  # Assertions skipped!`},{signature:`Assert best practices`,description:`Use asserts for internal invariants, not input validation.`,complexity:`O(1)`,section:`Assert Statements`,example:`# GOOD: Internal invariant check
def binary_search(arr, target):
    assert arr == sorted(arr), "Array must be sorted"
    # ... implementation

# BAD: User input validation (use exceptions instead)
def process_age(age):
    # Don't do this - can be disabled with -O
    assert age > 0, "Age must be positive"

    # Do this instead
    if age <= 0:
        raise ValueError("Age must be positive")`},{signature:`traceback.format_exc()`,description:`Get current exception traceback as string.`,complexity:`O(1)`,section:`Traceback Module`,example:`import traceback

try:
    x = 1 / 0
except:
    tb = traceback.format_exc()
    print(tb)
    # Traceback (most recent call last):
    #   File "<stdin>", line 2, in <module>
    # ZeroDivisionError: division by zero

# Or print directly
traceback.print_exc()`},{signature:`traceback.extract_tb()`,description:`Extract traceback frames for analysis.`,complexity:`O(n)`,section:`Traceback Module`,example:`import traceback
import sys

try:
    x = 1 / 0
except:
    _, _, tb = sys.exc_info()
    frames = traceback.extract_tb(tb)

    for frame in frames:
        print(f"File: {frame.filename}")
        print(f"Line: {frame.lineno}")
        print(f"Function: {frame.name}")
        print(f"Code: {frame.line}")`},{signature:`traceback.format_stack()`,description:`Get current call stack as formatted string.`,complexity:`O(n)`,section:`Traceback Module`,example:`import traceback

def inner():
    print("Current stack:")
    for line in traceback.format_stack():
        print(line.strip())

def outer():
    inner()

outer()
# File "script.py", line 10, in <module>
#   outer()
# File "script.py", line 8, in outer
#   inner()
# File "script.py", line 5, in inner
#   for line in traceback.format_stack():`},{signature:`inspect.currentframe()`,description:`Get current stack frame for inspection.`,complexity:`O(1)`,section:`Inspect Module`,example:`import inspect

def debug_info():
    frame = inspect.currentframe()
    caller = frame.f_back

    print(f"Called from: {caller.f_code.co_name}")
    print(f"Line: {caller.f_lineno}")
    print(f"Locals: {caller.f_locals}")

def example():
    x = 42
    debug_info()

example()
# Called from: example
# Line: 12
# Locals: {'x': 42}`},{signature:`inspect.signature()`,description:`Get function signature details.`,complexity:`O(1)`,section:`Inspect Module`,example:`import inspect

def greet(name, greeting="Hello", *, formal=False):
    pass

sig = inspect.signature(greet)
print(sig)  # (name, greeting='Hello', *, formal=False)

for name, param in sig.parameters.items():
    print(f"{name}: {param.kind.name}, default={param.default}")
# name: POSITIONAL_OR_KEYWORD, default=<class 'inspect._empty'>
# greeting: POSITIONAL_OR_KEYWORD, default=Hello
# formal: KEYWORD_ONLY, default=False`},{signature:`cProfile`,description:`Profile code to find performance bottlenecks.`,complexity:`O(1)`,section:`Performance Profiling`,example:`import cProfile

def slow_function():
    total = 0
    for i in range(1000000):
        total += i
    return total

# Profile function
cProfile.run('slow_function()')

# Or from command line:
# python -m cProfile script.py
# python -m cProfile -s cumtime script.py  # Sort by cumulative time`},{signature:`timeit`,description:`Time small code snippets accurately.`,complexity:`O(1)`,section:`Performance Profiling`,example:`import timeit

# Time a statement
time = timeit.timeit('sum(range(100))', number=10000)
print(f"Time: {time:.4f}s")

# Time with setup
time = timeit.timeit(
    stmt='lst.append(1)',
    setup='lst = []',
    number=100000
)

# From command line:
# python -m timeit "sum(range(100))"`},{signature:`timeit.repeat()`,description:`Run multiple trials and take minimum. More reliable than single run.`,complexity:`O(1)`,section:`Performance Profiling`,example:`import timeit

# Run 5 trials, take minimum (most reliable)
times = timeit.repeat(
    stmt='[x**2 for x in range(100)]',
    number=10000,
    repeat=5
)
print(f"Min: {min(times):.4f}s")

# Compare alternatives
def compare():
    loop = min(timeit.repeat('[x**2 for x in range(100)]', repeat=5))
    comp = min(timeit.repeat('list(map(lambda x: x**2, range(100)))', repeat=5))
    print(f"Comprehension: {loop:.4f}s")
    print(f"Map+lambda: {comp:.4f}s")`},{signature:`Performance patterns`,description:`Common speed comparisons. Comprehensions ~2x faster than loops at C speed.`,complexity:`Concept`,section:`Performance Profiling`,example:`# Comprehensions faster than for loops
# (iterations run at C speed inside interpreter)
[x*2 for x in data]  # Fast
result = []
for x in data: result.append(x*2)  # Slower

# File iterators fastest for reading
for line in open('f.txt'): ...  # Fast (iterator)
for line in f.readlines(): ...  # Medium (builds list)
while line := f.readline(): ...  # Slowest

# sqrt alternatives (math.sqrt usually fastest)
import math
math.sqrt(144)  # Fast
144 ** 0.5      # Medium
pow(144, 0.5)   # Slower`},{signature:`time.perf_counter()`,description:`High-resolution timer for benchmarking.`,complexity:`O(1)`,section:`Performance Profiling`,example:`import time

start = time.perf_counter()

# Code to measure
total = sum(range(1000000))

end = time.perf_counter()
print(f"Elapsed: {end - start:.4f}s")

# Context manager pattern
from contextlib import contextmanager

@contextmanager
def timer(label):
    start = time.perf_counter()
    yield
    print(f"{label}: {time.perf_counter() - start:.4f}s")

with timer("Computation"):
    sum(range(1000000))`},{signature:`sys.getsizeof()`,description:`Get memory size of object in bytes.`,complexity:`O(1)`,section:`Memory Debugging`,example:`import sys

print(sys.getsizeof([]))         # 56 bytes (empty list)
print(sys.getsizeof([1,2,3]))    # 80 bytes
print(sys.getsizeof("hello"))    # 54 bytes
print(sys.getsizeof({}))         # 64 bytes (empty dict)

# Note: doesn't include referenced objects
lst = [[1,2,3], [4,5,6]]
print(sys.getsizeof(lst))        # Only counts list structure`},{signature:`tracemalloc`,description:`Trace memory allocations.`,complexity:`O(n)`,section:`Memory Debugging`,example:`import tracemalloc

tracemalloc.start()

# Code that uses memory
data = [x**2 for x in range(10000)]

snapshot = tracemalloc.take_snapshot()
top_stats = snapshot.statistics('lineno')

print("Top 5 memory consumers:")
for stat in top_stats[:5]:
    print(stat)

current, peak = tracemalloc.get_traced_memory()
print(f"Current: {current / 1024:.1f} KB")
print(f"Peak: {peak / 1024:.1f} KB")

tracemalloc.stop()`},{signature:`Debug decorator`,description:`Log function calls automatically.`,complexity:`O(1)`,section:`Debug Utilities`,example:`import functools
import logging

def debug(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        args_repr = [repr(a) for a in args]
        kwargs_repr = [f"{k}={v!r}" for k, v in kwargs.items()]
        signature = ", ".join(args_repr + kwargs_repr)
        logging.debug(f"Calling {func.__name__}({signature})")

        result = func(*args, **kwargs)

        logging.debug(f"{func.__name__!r} returned {result!r}")
        return result
    return wrapper

@debug
def add(a, b):
    return a + b

add(2, 3)  # Logs: Calling add(2, 3) / 'add' returned 5`},{signature:`DEBUG environment`,description:`Control debug mode via environment variable.`,complexity:`O(1)`,section:`Debug Utilities`,example:`import os

DEBUG = os.environ.get('DEBUG', '').lower() in ('1', 'true', 'yes')

if DEBUG:
    logging.basicConfig(level=logging.DEBUG)
    print("Debug mode enabled")
else:
    logging.basicConfig(level=logging.INFO)

# Run with:
# DEBUG=1 python script.py`}],d=[...l,...u],f=[{signature:`Threads vs Processes vs Async - decision tree`,description:`I/O-bound → async (fastest) or threads. CPU-bound → multiprocessing. Simple I/O → threads. Complex async logic → async/await.`,complexity:`Concept`,section:`Why & When`,example:`# I/O-BOUND (network, disk, database)
# Option 1: ASYNC (best for I/O)
import asyncio
async def fetch_urls(urls):
    # Single-threaded, event loop
    # Can handle 1000s of concurrent requests
    pass

# Option 2: THREADS (good for I/O)
import threading
def download_file(url):
    # Multiple OS threads
    # Can handle 10s-100s concurrent
    pass

# Option 3: PROCESSES (overkill for I/O)
import multiprocessing
# Don't use for I/O - too much overhead

# CPU-BOUND (computation, data processing)
# MUST use multiprocessing (GIL limits threads)
from multiprocessing import Pool
def process_data(chunk):
    # Parallel computation
    # Bypasses GIL
    pass

# Decision tree:
# I/O-bound + async-friendly → async/await
# I/O-bound + simple → threads
# I/O-bound + legacy code → threads
# CPU-bound → multiprocessing
# Mixed workload → processes + thread pools`},{signature:`GIL (Global Interpreter Lock) - when it matters`,description:`GIL prevents true parallelism in threads. Irrelevant for I/O (threads release GIL). Critical for CPU-bound (use multiprocessing instead).`,complexity:`Concept`,section:`Why & When`,example:`import threading
import time

# I/O-BOUND - GIL doesn't matter
def io_task():
    time.sleep(1)  # Releases GIL during sleep
    # File I/O, network, DB also release GIL

threads = [threading.Thread(target=io_task) for _ in range(10)]
# All 10 run concurrently! (GIL released during I/O)

# CPU-BOUND - GIL kills performance
def cpu_task():
    sum(range(10_000_000))  # Pure Python, holds GIL

threads = [threading.Thread(target=cpu_task) for _ in range(10)]
# Runs SLOWER than sequential! (GIL contention)

# Solution for CPU-bound:
from multiprocessing import Pool
with Pool(10) as pool:
    pool.map(cpu_task, range(10))
# True parallelism, bypasses GIL

# GIL is released during:
# - time.sleep()
# - I/O operations (file, network, DB)
# - C extensions (NumPy, etc.)
#
# GIL is held during:
# - Pure Python computation
# - List comprehensions
# - For loops with Python objects`},{signature:`When to use locks (thread safety)`,description:`Need locks when: multiple threads modify shared data. Don't need locks when: read-only access, thread-local data, immutable objects.`,complexity:`Concept`,section:`Why & When`,example:`import threading

# NEED LOCK - shared mutable data
counter = 0
lock = threading.Lock()

def increment():
    global counter
    with lock:  # REQUIRED
        counter += 1  # Read-modify-write

# NO LOCK NEEDED - read-only
config = {"timeout": 30}

def read_config():
    return config["timeout"]  # Read-only, safe

# NO LOCK NEEDED - thread-local storage
import threading
local = threading.local()

def worker():
    local.value = 42  # Each thread has its own
    print(local.value)

# NO LOCK NEEDED - immutable
data = (1, 2, 3)  # Tuple is immutable

def process():
    print(data[0])  # Safe without lock

# NO LOCK NEEDED - queue (built-in thread-safe)
from queue import Queue
q = Queue()  # Already thread-safe!

def producer():
    q.put(item)  # No lock needed

# Rule: Lock only for shared mutable state
# Cost: ~100ns per lock acquire (cheap!)`},{signature:`ThreadPoolExecutor vs manual threads`,description:`ThreadPoolExecutor: simple tasks, many jobs, auto cleanup. Manual threads: complex lifecycle, state management, long-running.`,complexity:`Concept`,section:`Why & When`,example:`from concurrent.futures import ThreadPoolExecutor
import threading

# USE ThreadPoolExecutor - simple tasks
urls = ['url1', 'url2', ...]  # 100s of URLs

with ThreadPoolExecutor(max_workers=10) as executor:
    results = executor.map(download, urls)
# Auto cleanup, easy to use, perfect for batches

# USE manual threads - complex lifecycle
class DatabaseSyncer(threading.Thread):
    def __init__(self):
        super().__init__(daemon=True)
        self.running = True

    def run(self):
        while self.running:
            sync_database()
            time.sleep(60)

    def stop(self):
        self.running = False

syncer = DatabaseSyncer()
syncer.start()
# Need: custom lifecycle, state, graceful shutdown

# ThreadPoolExecutor when:
# - Batch processing (map 100s of tasks)
# - Simple function calls
# - Auto cleanup desired
# - Don't need thread control

# Manual threads when:
# - Long-running background workers
# - Complex state management
# - Custom start/stop logic
# - Need thread references`},{signature:`Multiprocessing - when to escalate`,description:`Use multiprocessing when: CPU-bound, need true parallelism, have multiple cores. Overhead: ~100ms startup per process. Worth it for >1 sec tasks.`,complexity:`Concept`,section:`Why & When`,example:`from multiprocessing import Pool
import threading

# MULTIPROCESSING - CPU-bound tasks
def process_image(img):
    # Heavy computation: ~10 seconds
    # Uses PIL, OpenCV (releases GIL but still benefits)
    return transformed_img

# Worth the overhead for long tasks
with Pool(8) as pool:
    results = pool.map(process_image, images)

# THREADING - I/O-bound (don't use multiprocessing!)
def fetch_url(url):
    # Network I/O: ~1 second
    return requests.get(url).text

# Threads are 100x faster to create
with ThreadPoolExecutor(10) as executor:
    results = executor.map(fetch_url, urls)

# Overhead comparison:
# Thread startup: ~0.1ms
# Process startup: ~100ms (1000x slower!)

# Use multiprocessing when:
# - CPU-bound computation (>1 sec per task)
# - Need true parallelism
# - Have multiple CPU cores
# - Task overhead >> process startup

# Stick with threads when:
# - I/O-bound operations
# - Tasks < 100ms
# - Need shared memory
# - Simple concurrency`},{signature:`import threading`,description:`Thread-based parallelism. Good for I/O-bound tasks. Limited by GIL for CPU-bound.`,complexity:`O(1)`,section:`Threading Basics`,example:`import threading
import time

def worker(name):
    print(f"{name} starting")
    time.sleep(2)
    print(f"{name} finished")

# Create threads
t1 = threading.Thread(target=worker, args=("Thread-1",))
t2 = threading.Thread(target=worker, args=("Thread-2",))

# Start threads
t1.start()
t2.start()

# Wait for completion
t1.join()
t2.join()
print("All done")`},{signature:`Thread with class`,description:`Subclass Thread for more complex workers.`,complexity:`O(1)`,section:`Threading Basics`,example:`import threading

class DownloadThread(threading.Thread):
    def __init__(self, url):
        super().__init__()
        self.url = url
        self.result = None

    def run(self):
        # Simulate download
        import time
        time.sleep(1)
        self.result = f"Data from {self.url}"

threads = [DownloadThread(f"url{i}") for i in range(3)]
for t in threads:
    t.start()
for t in threads:
    t.join()
    print(t.result)`},{signature:`threading.Lock`,description:`Mutual exclusion lock. Prevents race conditions.`,complexity:`O(1)`,section:`Threading Basics`,example:`import threading

counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(100000):
        with lock:  # Acquire/release automatically
            counter += 1

threads = [threading.Thread(target=increment) for _ in range(5)]
for t in threads:
    t.start()
for t in threads:
    t.join()

print(counter)  # Exactly 500000 (without lock, less due to race)`},{signature:`threading.RLock`,description:`Reentrant lock. Can be acquired multiple times by same thread.`,complexity:`O(1)`,section:`Threading Basics`,example:`import threading

rlock = threading.RLock()

def outer():
    with rlock:
        print("Outer acquired")
        inner()

def inner():
    with rlock:  # Same thread can acquire again
        print("Inner acquired")

outer()

# With regular Lock, inner() would deadlock!`},{signature:`threading.Semaphore`,description:`Limit concurrent access to a resource.`,complexity:`O(1)`,section:`Threading Basics`,example:`import threading
import time

# Allow max 3 concurrent workers
semaphore = threading.Semaphore(3)

def worker(id):
    with semaphore:
        print(f"Worker {id} acquired")
        time.sleep(2)
        print(f"Worker {id} released")

threads = [threading.Thread(target=worker, args=(i,)) for i in range(10)]
for t in threads:
    t.start()
# Only 3 workers run at a time`},{signature:`threading.Event`,description:`Signal between threads. Set/wait/clear.`,complexity:`O(1)`,section:`Threading Basics`,example:`import threading
import time

event = threading.Event()

def waiter():
    print("Waiting for event...")
    event.wait()  # Block until event is set
    print("Event received!")

def setter():
    time.sleep(2)
    print("Setting event")
    event.set()

threading.Thread(target=waiter).start()
threading.Thread(target=setter).start()`},{signature:`threading.Condition`,description:`Wait for condition with notification.`,complexity:`O(1)`,section:`Threading Basics`,example:`import threading

condition = threading.Condition()
items = []

def consumer():
    with condition:
        while not items:
            condition.wait()  # Release lock and wait
        item = items.pop(0)
        print(f"Consumed: {item}")

def producer():
    with condition:
        items.append("item")
        print("Produced item")
        condition.notify()  # Wake up one waiter

threading.Thread(target=consumer).start()
import time; time.sleep(0.1)
threading.Thread(target=producer).start()`},{signature:`queue.Queue`,description:`Thread-safe queue for producer/consumer patterns.`,complexity:`O(1)`,section:`Threading Basics`,example:`import threading
import queue

q = queue.Queue()

def producer():
    for i in range(5):
        q.put(i)
        print(f"Produced {i}")
    q.put(None)  # Sentinel

def consumer():
    while True:
        item = q.get()
        if item is None:
            break
        print(f"Consumed {item}")
        q.task_done()

threading.Thread(target=producer).start()
threading.Thread(target=consumer).start()

q.join()  # Wait until all items processed`},{signature:`ThreadPoolExecutor`,description:`Pool of threads for concurrent execution.`,complexity:`O(1)`,section:`ThreadPoolExecutor`,example:`from concurrent.futures import ThreadPoolExecutor
import time

def fetch_url(url):
    time.sleep(1)  # Simulate network request
    return f"Data from {url}"

urls = ["url1", "url2", "url3", "url4", "url5"]

with ThreadPoolExecutor(max_workers=3) as executor:
    results = executor.map(fetch_url, urls)
    for result in results:
        print(result)`},{signature:`executor.submit()`,description:`Submit individual tasks and get Future objects.`,complexity:`O(1)`,section:`ThreadPoolExecutor`,example:`from concurrent.futures import ThreadPoolExecutor, as_completed

def process(n):
    import time
    time.sleep(n)
    return n * 2

with ThreadPoolExecutor(max_workers=3) as executor:
    futures = {executor.submit(process, i): i for i in [3, 1, 2]}

    # Get results as they complete
    for future in as_completed(futures):
        n = futures[future]
        result = future.result()
        print(f"process({n}) = {result}")`},{signature:`import multiprocessing`,description:`Process-based parallelism. Bypasses GIL. Best for CPU-bound tasks.`,complexity:`O(1)`,section:`Multiprocessing`,example:`import multiprocessing

def square(n):
    return n ** 2

if __name__ == '__main__':
    with multiprocessing.Pool(4) as pool:
        results = pool.map(square, range(10))
        print(results)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]`},{signature:`Process class`,description:`Create individual processes.`,complexity:`O(1)`,section:`Multiprocessing`,example:`import multiprocessing

def worker(num):
    print(f"Worker {num} running")
    return num * 2

if __name__ == '__main__':
    processes = []
    for i in range(4):
        p = multiprocessing.Process(target=worker, args=(i,))
        processes.append(p)
        p.start()

    for p in processes:
        p.join()
    print("All processes complete")`},{signature:`multiprocessing.Queue`,description:`Process-safe queue for inter-process communication.`,complexity:`O(1)`,section:`Multiprocessing`,example:`import multiprocessing

def producer(q):
    for i in range(5):
        q.put(i)
    q.put(None)  # Sentinel

def consumer(q):
    while True:
        item = q.get()
        if item is None:
            break
        print(f"Got: {item}")

if __name__ == '__main__':
    q = multiprocessing.Queue()
    p1 = multiprocessing.Process(target=producer, args=(q,))
    p2 = multiprocessing.Process(target=consumer, args=(q,))
    p1.start()
    p2.start()
    p1.join()
    p2.join()`},{signature:`ProcessPoolExecutor`,description:`Pool of processes for parallel execution.`,complexity:`O(1)`,section:`Multiprocessing`,example:`from concurrent.futures import ProcessPoolExecutor

def cpu_intensive(n):
    return sum(i*i for i in range(n))

if __name__ == '__main__':
    with ProcessPoolExecutor(max_workers=4) as executor:
        numbers = [10000, 20000, 30000, 40000]
        results = list(executor.map(cpu_intensive, numbers))
        print(results)`},{signature:`Shared memory`,description:`Share data between processes efficiently.`,complexity:`O(1)`,section:`Multiprocessing`,example:`import multiprocessing

def increment(shared_value, shared_array):
    shared_value.value += 1
    for i in range(len(shared_array)):
        shared_array[i] += 1

if __name__ == '__main__':
    # Shared Value
    counter = multiprocessing.Value('i', 0)  # 'i' = integer

    # Shared Array
    arr = multiprocessing.Array('d', [1.0, 2.0, 3.0])  # 'd' = double

    processes = [
        multiprocessing.Process(target=increment, args=(counter, arr))
        for _ in range(4)
    ]
    for p in processes:
        p.start()
    for p in processes:
        p.join()

    print(counter.value)  # 4
    print(list(arr))      # [5.0, 6.0, 7.0]`}],p=[{signature:`Async/await vs Threads - when to choose async`,description:`Async wins: many (100+) I/O tasks, web servers, API clients. Threads win: few (<10) I/O tasks, legacy code, simpler mental model.`,complexity:`Concept`,section:`Why & When`,example:`# ASYNC WINS - many concurrent I/O operations
import asyncio
import aiohttp

async def fetch_all(urls):
    # Can handle 1000s of concurrent requests
    # Single thread, event loop
    # Memory: ~50KB per task
    async with aiohttp.ClientSession() as session:
        tasks = [session.get(url) for url in urls]
        return await asyncio.gather(*tasks)

# 1000 URLs: ~2-3 seconds, ~50MB memory

# THREADS WIN - few I/O tasks, simpler code
import threading
import requests

def fetch_all(urls):
    # Good for 10-100 concurrent requests
    # Multiple threads
    # Memory: ~8MB per thread
    with ThreadPoolExecutor(max_workers=10) as pool:
        return list(pool.map(requests.get, urls))

# 10 URLs: ~2 seconds, ~80MB memory

# Decision matrix:
# 1-10 I/O tasks → Threads (simpler)
# 10-100 I/O tasks → Either (preference)
# 100-1000s I/O tasks → Async (lower overhead)
# CPU-bound → Neither (use multiprocessing)
# Legacy libraries (no async support) → Threads
# Modern web frameworks → Async
# Mixed sync/async code → Threads (easier integration)

# Overhead comparison:
# Thread creation: ~0.1ms, ~8MB per thread
# Async task creation: ~0.001ms, ~50KB per task
# Context switch (threads): ~1-10μs
# Context switch (async): ~0.1μs (10-100x faster!)`},{signature:`Event loop - how async actually works`,description:`Single-threaded cooperative multitasking. Tasks voluntarily yield (await). Never blocks entire program. Understanding prevents bugs.`,complexity:`Concept`,section:`Why & When`,example:`import asyncio

# UNDERSTANDING THE EVENT LOOP
async def task_a():
    print("A: start")
    await asyncio.sleep(1)  # Yields control here!
    print("A: done")

async def task_b():
    print("B: start")
    await asyncio.sleep(0.5)  # Yields control here!
    print("B: done")

async def main():
    await asyncio.gather(task_a(), task_b())

# Timeline (single thread!):
# 0.0s: A: start → sleep(1) → yield to event loop
# 0.0s: B: start → sleep(0.5) → yield to event loop
# 0.5s: B: done (sleep finished)
# 1.0s: A: done (sleep finished)
# Total: 1.0s (concurrent, not parallel!)

# BLOCKING = BAD (freezes event loop)
async def bad():
    import time
    time.sleep(1)  # BLOCKS entire event loop!
    # All other tasks frozen for 1 second

# GOOD - use async version or executor
async def good():
    await asyncio.sleep(1)  # Yields, other tasks run

# Or wrap blocking code:
async def wrap_blocking():
    loop = asyncio.get_running_loop()
    # Runs in thread pool, doesn't block loop
    await loop.run_in_executor(None, time.sleep, 1)

# Event loop is:
# - Single-threaded (no race conditions!)
# - Cooperative (tasks must yield)
# - Non-blocking (if you follow rules)
# - Efficient (1 million tasks possible)

# Key insight: await = "pause me, run others"`},{signature:`When async shines - the 1000 connection problem`,description:`Async excels at handling massive concurrency with minimal resources. Perfect for web servers, API gateways, websockets. Overkill for simple scripts.`,complexity:`Concept`,section:`Why & When`,example:`# PROBLEM: Handle 10,000 concurrent HTTP requests
# Each request takes 100ms of I/O wait time

# THREADS - Resource exhaustion
import threading

def handle_request(req):
    time.sleep(0.1)  # I/O wait
    return "response"

# 10,000 threads × 8MB = 80GB memory!
# OS limit: ~1000-2000 threads max
# Context switching kills performance

# ASYNC - Lightweight tasks
import asyncio

async def handle_request(req):
    await asyncio.sleep(0.1)  # I/O wait
    return "response"

async def main():
    requests = [handle_request(i) for i in range(10000)]
    return await asyncio.gather(*requests)

# 10,000 tasks × 50KB = 500MB memory
# No thread limit
# Minimal context switching
# Total time: ~100ms (all concurrent!)

# Real-world async wins:
# - Web servers (FastAPI, aiohttp): 10k+ req/sec
# - WebSocket servers: 100k+ connections
# - Database connection pooling
# - API aggregation (fetch from 100s of APIs)
# - Chat servers (many idle connections)

# When NOT to use async:
# - Simple scripts (overkill)
# - CPU-bound work (use multiprocessing)
# - Legacy libraries (no async support)
# - Team unfamiliar with async (learning curve)
# - <10 concurrent tasks (threads simpler)

# Rule of thumb:
# Concurrency < 10 → don't bother with async
# Concurrency 10-100 → consider async
# Concurrency > 100 → definitely use async`},{signature:`Common async pitfalls - what breaks and why`,description:`Mixing sync/async, blocking calls, missing await, exception handling. These bugs are subtle and hard to debug. Learn patterns upfront.`,complexity:`Concept`,section:`Why & When`,example:`import asyncio

# PITFALL 1: Forgetting await (silent failure!)
async def bad():
    asyncio.sleep(1)  # BUG: Returns coroutine, doesn't sleep!
    print("Instant!")

async def good():
    await asyncio.sleep(1)  # Correct
    print("After 1 second")

# PITFALL 2: Blocking the event loop
async def bad():
    import time
    time.sleep(5)  # BLOCKS everything for 5 seconds!

async def good():
    # Option 1: Use async version
    await asyncio.sleep(5)

    # Option 2: Run blocking code in executor
    loop = asyncio.get_running_loop()
    await loop.run_in_executor(None, time.sleep, 5)

# PITFALL 3: Not handling task exceptions
async def failing_task():
    raise ValueError("Oops")

async def bad():
    task = asyncio.create_task(failing_task())
    await asyncio.sleep(1)
    # Exception is lost!

async def good():
    task = asyncio.create_task(failing_task())
    try:
        await task
    except ValueError as e:
        print(f"Caught: {e}")

# PITFALL 4: Creating new event loop in running loop
async def bad():
    asyncio.run(some_async_func())  # ERROR! Can't nest

async def good():
    await some_async_func()  # Just await it

# PITFALL 5: Using sync library in async code
async def bad():
    import requests
    requests.get(url)  # Blocks event loop!

async def good():
    import aiohttp
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            return await resp.text()

# PITFALL 6: Shared state without locks
counter = 0

async def bad():
    global counter
    # Not atomic in async! (though single-threaded)
    temp = counter
    await asyncio.sleep(0)  # Other tasks can run here!
    counter = temp + 1

async def good():
    global counter
    async with asyncio.Lock():
        counter += 1

# Debugging tips:
# - Enable debug mode: asyncio.run(main(), debug=True)
# - Check for "coroutine was never awaited" warnings
# - Use asyncio.create_task() to track tasks
# - Always await or gather tasks before exit`},{signature:`Async performance - when it matters and when it doesn't`,description:`Async overhead: ~1μs per task creation, ~0.1μs context switch. Shines with I/O wait, worthless for CPU work. Measure, don't guess.`,complexity:`Concept`,section:`Why & When`,example:`import asyncio
import time

# PERFORMANCE BREAKDOWN

# Task creation overhead
async def measure_task_creation():
    start = time.perf_counter()
    tasks = [asyncio.create_task(asyncio.sleep(0)) for _ in range(10000)]
    await asyncio.gather(*tasks)
    elapsed = time.perf_counter() - start
    # ~10-20ms for 10k tasks = ~1-2μs per task

# Compare to threads:
# Thread creation: ~0.1ms per thread = 100x slower!

# WHEN ASYNC WINS
async def io_bound():
    # 1000 HTTP requests, each 100ms
    # Sequential: 100 seconds
    # Async: 100ms (all concurrent)
    # Speedup: 1000x!
    async with aiohttp.ClientSession() as session:
        tasks = [session.get(url) for url in urls]
        return await asyncio.gather(*tasks)

# WHEN ASYNC LOSES
async def cpu_bound():
    # Pure computation, no I/O
    # Sequential: 10 seconds
    # Async: 10 seconds (still single-threaded!)
    # Speedup: 1x (no benefit)
    return sum(i**2 for i in range(10_000_000))

# SCALABILITY LIMITS
# Async can handle:
# - 10,000 tasks: Easy (~500MB memory)
# - 100,000 tasks: Possible (~5GB memory)
# - 1,000,000 tasks: Hard (memory + CPU)

# Real-world benchmarks:
# FastAPI (async web server):
# - Simple endpoint: 20k req/sec (single process)
# - With DB queries: 5k req/sec
# - CPU-heavy endpoint: 500 req/sec (same as sync!)

# Flask (sync web server):
# - Simple endpoint: 2k req/sec (single process)
# - With DB queries: 500 req/sec
# - CPU-heavy endpoint: 500 req/sec

# Key insights:
# 1. Async wins only with I/O wait
# 2. No free lunch with CPU work
# 3. Overhead is tiny (~1μs), don't worry about it
# 4. Memory is the real limit (50KB per task)
# 5. Always profile before optimizing

# Profiling async code:
import cProfile
import pstats

async def main():
    # Your async code
    pass

cProfile.run('asyncio.run(main())', 'profile.stats')
stats = pstats.Stats('profile.stats')
stats.sort_stats('cumtime')
stats.print_stats(10)`},{signature:`async def`,description:`Define coroutine function. Must be awaited.`,complexity:`O(1)`,section:`Async/Await`,example:`import asyncio

async def fetch_data(url):
    print(f"Fetching {url}")
    await asyncio.sleep(1)  # Simulated I/O
    return f"Data from {url}"

async def main():
    result = await fetch_data("example.com")
    print(result)

asyncio.run(main())`},{signature:`await`,description:`Pause coroutine and wait for result. Allows other coroutines to run.`,complexity:`O(1)`,section:`Async/Await`,example:`import asyncio

async def task(name, seconds):
    print(f"{name} starting")
    await asyncio.sleep(seconds)
    print(f"{name} done after {seconds}s")
    return name

async def main():
    # Sequential - takes 3 seconds
    result1 = await task("A", 1)
    result2 = await task("B", 2)

asyncio.run(main())`},{signature:`asyncio.gather()`,description:`Run multiple coroutines concurrently.`,complexity:`O(1)`,section:`Async/Await`,example:`import asyncio

async def task(name, seconds):
    await asyncio.sleep(seconds)
    return f"{name}: {seconds}s"

async def main():
    # Concurrent - takes only 2 seconds (max)
    results = await asyncio.gather(
        task("A", 1),
        task("B", 2),
        task("C", 1)
    )
    print(results)  # ['A: 1s', 'B: 2s', 'C: 1s']

asyncio.run(main())`},{signature:`asyncio.create_task()`,description:`Schedule coroutine to run concurrently.`,complexity:`O(1)`,section:`Async/Await`,example:`import asyncio

async def background_task():
    while True:
        print("Background running...")
        await asyncio.sleep(1)

async def main():
    # Start background task
    task = asyncio.create_task(background_task())

    # Do other work
    await asyncio.sleep(3)

    # Cancel background task
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("Task cancelled")

asyncio.run(main())`},{signature:`asyncio.wait()`,description:`Wait for multiple tasks with timeout or first completion.`,complexity:`O(n)`,section:`Async/Await`,example:`import asyncio

async def task(n):
    await asyncio.sleep(n)
    return n

async def main():
    tasks = [asyncio.create_task(task(i)) for i in [3, 1, 2]]

    # Wait for first to complete
    done, pending = await asyncio.wait(
        tasks,
        return_when=asyncio.FIRST_COMPLETED
    )
    print(f"First done: {done.pop().result()}")  # 1

    # Cancel pending
    for t in pending:
        t.cancel()

asyncio.run(main())`},{signature:`asyncio.Queue`,description:`Async-safe queue for coroutine communication.`,complexity:`O(1)`,section:`Async/Await`,example:`import asyncio

async def producer(queue):
    for i in range(5):
        await queue.put(i)
        print(f"Produced {i}")
    await queue.put(None)

async def consumer(queue):
    while True:
        item = await queue.get()
        if item is None:
            break
        print(f"Consumed {item}")
        await asyncio.sleep(0.5)

async def main():
    queue = asyncio.Queue()
    await asyncio.gather(
        producer(queue),
        consumer(queue)
    )

asyncio.run(main())`},{signature:`asyncio.Semaphore`,description:`Limit concurrent async operations.`,complexity:`O(1)`,section:`Async/Await`,example:`import asyncio

async def fetch(url, semaphore):
    async with semaphore:
        print(f"Fetching {url}")
        await asyncio.sleep(1)
        return f"Data from {url}"

async def main():
    semaphore = asyncio.Semaphore(3)  # Max 3 concurrent
    urls = [f"url{i}" for i in range(10)]

    tasks = [fetch(url, semaphore) for url in urls]
    results = await asyncio.gather(*tasks)
    print(f"Got {len(results)} results")

asyncio.run(main())`},{signature:`asyncio.Lock`,description:`Async mutual exclusion lock.`,complexity:`O(1)`,section:`Async/Await`,example:`import asyncio

counter = 0
lock = asyncio.Lock()

async def increment():
    global counter
    for _ in range(1000):
        async with lock:
            counter += 1

async def main():
    await asyncio.gather(*[increment() for _ in range(10)])
    print(counter)  # 10000

asyncio.run(main())`},{signature:`asyncio.Event`,description:`Async event for signaling between coroutines.`,complexity:`O(1)`,section:`Async/Await`,example:`import asyncio

async def waiter(event, name):
    print(f"{name} waiting...")
    await event.wait()
    print(f"{name} proceeding!")

async def setter(event):
    await asyncio.sleep(2)
    print("Setting event!")
    event.set()

async def main():
    event = asyncio.Event()
    await asyncio.gather(
        waiter(event, "A"),
        waiter(event, "B"),
        setter(event)
    )

asyncio.run(main())`},{signature:`async with`,description:`Async context manager for resources.`,complexity:`O(1)`,section:`Async Context & Iterators`,example:`import asyncio

class AsyncTimer:
    async def __aenter__(self):
        self.start = asyncio.get_running_loop().time()  # 3.10+
        return self

    async def __aexit__(self, *args):
        elapsed = asyncio.get_running_loop().time() - self.start
        print(f"Elapsed: {elapsed:.2f}s")

async def main():
    async with AsyncTimer():
        await asyncio.sleep(1)

asyncio.run(main())`},{signature:`@asynccontextmanager`,description:`Create async context manager from generator.`,complexity:`O(1)`,section:`Async Context & Iterators`,example:`from contextlib import asynccontextmanager

@asynccontextmanager
async def async_timer(label):
    import time
    start = time.time()
    try:
        yield
    finally:
        print(f"{label}: {time.time() - start:.2f}s")

async def main():
    async with async_timer("Task"):
        await asyncio.sleep(1)

asyncio.run(main())`},{signature:`async for`,description:`Iterate over async iterator/generator.`,complexity:`O(n)`,section:`Async Context & Iterators`,example:`import asyncio

async def async_range(n):
    for i in range(n):
        await asyncio.sleep(0.1)
        yield i

async def main():
    async for num in async_range(5):
        print(num)

asyncio.run(main())`},{signature:`Async generator`,description:`Generator that yields asynchronously.`,complexity:`O(1)`,section:`Async Context & Iterators`,example:`import asyncio

async def fetch_pages(urls):
    for url in urls:
        await asyncio.sleep(0.5)  # Simulate fetch
        yield f"Page content from {url}"

async def main():
    urls = ["page1", "page2", "page3"]
    async for content in fetch_pages(urls):
        print(content)

asyncio.run(main())`},{signature:`aiohttp (async HTTP)`,description:`Popular async HTTP client library.`,complexity:`O(1)`,section:`Async HTTP`,example:`# pip install aiohttp
import asyncio
import aiohttp

async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    urls = [
        "https://example.com",
        "https://httpbin.org/get"
    ]

    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        for url, data in zip(urls, results):
            print(f"{url}: {len(data)} bytes")

# asyncio.run(main())`},{signature:`Threading vs Multiprocessing vs Async`,description:`Choose the right tool for the job.`,complexity:`O(1)`,section:`Best Practices`,example:`# THREADING - Good for:
# - I/O-bound tasks (network, file I/O)
# - Waiting on external resources
# - Limited by GIL for CPU-bound work
# Use: ThreadPoolExecutor

# MULTIPROCESSING - Good for:
# - CPU-bound tasks (calculations, data processing)
# - Bypasses GIL
# - Higher memory overhead (separate processes)
# Use: ProcessPoolExecutor

# ASYNCIO - Good for:
# - Many I/O-bound tasks
# - Single-threaded, cooperative multitasking
# - Web servers, API clients
# - Lower overhead than threading
# Use: async/await with asyncio`},{signature:`Avoid common pitfalls`,description:`Common concurrency mistakes and solutions.`,complexity:`O(1)`,section:`Best Practices`,example:`# 1. Race conditions - use locks
counter = 0
lock = threading.Lock()
with lock:
    counter += 1

# 2. Deadlocks - acquire locks in consistent order
# Bad: Thread1 locks A then B, Thread2 locks B then A
# Good: Always lock A before B

# 3. Resource exhaustion - use pools
with ThreadPoolExecutor(max_workers=10) as pool:
    pool.map(work, items)

# 4. GIL bottleneck - use multiprocessing for CPU work
with ProcessPoolExecutor() as pool:
    pool.map(cpu_heavy_work, items)

# 5. Blocking in async - use run_in_executor
loop = asyncio.get_running_loop()  # 3.10+ (use inside async)
await loop.run_in_executor(None, blocking_function)`},{signature:`asyncio.run_in_executor()`,description:`Run blocking code in thread/process pool from async.`,complexity:`O(1)`,section:`Best Practices`,example:`import asyncio
from concurrent.futures import ThreadPoolExecutor

def blocking_io():
    import time
    time.sleep(1)
    return "Done"

async def main():
    loop = asyncio.get_running_loop()  # 3.10+ preferred

    # Run in default executor (thread pool)
    result = await loop.run_in_executor(None, blocking_io)
    print(result)

    # Or with custom executor
    with ThreadPoolExecutor() as pool:
        result = await loop.run_in_executor(pool, blocking_io)

asyncio.run(main())`}],m=[...f,...p],h=[...[{section:`Why & When`,signature:`Text mode vs Binary mode - when to use each`,description:`Text mode: human-readable files (.txt, .csv, .json). Binary mode: everything else (.jpg, .mp3, .pdf). Wrong mode = corruption.`,complexity:`Concept`,example:`# TEXT MODE - human-readable content
with open("data.txt", "r", encoding="utf-8") as f:
    # Handles encoding, line endings automatically
    # Returns str objects
    content = f.read()  # str

# Use text mode for:
# - .txt, .csv, .json, .xml, .html files
# - Configuration files
# - Log files
# - Any file you'd open in text editor

# BINARY MODE - raw bytes
with open("image.jpg", "rb") as f:
    # No encoding, raw bytes
    # Returns bytes objects
    data = f.read()  # bytes

# Use binary mode for:
# - Images (.jpg, .png, .gif)
# - Audio/video (.mp3, .mp4, .wav)
# - PDFs, Word docs (.pdf, .docx)
# - Executables, zip files
# - ANY file you can't read as text

# CRITICAL: Wrong mode = file corruption!
# Bad: open image in text mode
with open("photo.jpg", "r") as f:  # WRONG!
    content = f.read()
    # May work on read, but...
with open("copy.jpg", "w") as f:  # WRONG!
    f.write(content)  # Corrupted! Line endings changed

# Good: use binary mode
with open("photo.jpg", "rb") as f:
    data = f.read()
with open("copy.jpg", "wb") as f:
    f.write(data)  # Perfect copy

# Rule: If you don't know → use binary mode (safer)`},{section:`Why & When`,signature:`read() vs readlines() vs iteration - memory tradeoffs`,description:`read(): simple, fast, memory hog. readlines(): list access, still loads all. Iteration: memory efficient, preferred for large files.`,complexity:`Concept`,example:`# SMALL FILE (<100MB) - read() is fine
with open("config.txt", "r") as f:
    content = f.read()  # Load entire file
    # Memory: file size
    # Speed: ~100 MB/sec

# MEDIUM FILE (100MB-1GB) - readlines() if need list
with open("data.csv", "r") as f:
    lines = f.readlines()  # List of lines
    # Memory: ~2x file size (list overhead)
    # Can index: lines[42]
    # Can slice: lines[10:20]

# LARGE FILE (>1GB) - ITERATE!
with open("huge.log", "r") as f:
    for line in f:  # One line at a time
        process(line)
    # Memory: constant (~4KB buffer)
    # Speed: same as read()
    # No random access

# Real example: process 10GB log file
# Bad - OOM (out of memory)
with open("10gb.log", "r") as f:
    content = f.read()  # Tries to allocate 10GB!

# Good - constant memory
with open("10gb.log", "r") as f:
    for line in f:
        if "ERROR" in line:
            print(line.strip())
# Memory: ~4KB (tiny!)

# Pattern: count lines efficiently
# Bad
with open("big.txt", "r") as f:
    lines = f.readlines()
    count = len(lines)  # Loads all into memory

# Good
with open("big.txt", "r") as f:
    count = sum(1 for line in f)  # Memory efficient

# Performance comparison (100 MB file):
# read(): 1.0 seconds, 100 MB memory
# readlines(): 1.2 seconds, 200 MB memory
# iteration: 1.0 seconds, 4 KB memory

# Decision matrix:
# Need entire file as string → read()
# Need random line access → readlines()
# Process line by line → iteration (always!)
# File > 100MB → iteration (always!)`},{section:`Why & When`,signature:`pathlib vs os.path - modern Python best practices`,description:`pathlib: modern, object-oriented, chainable. os.path: old, functional, verbose. Always use pathlib for new code.`,complexity:`Concept`,example:`from pathlib import Path
import os

# PATHLIB - modern, clean
path = Path.home() / "documents" / "data.txt"
if path.exists():
    content = path.read_text()
parent = path.parent
name = path.name
stem = path.stem  # filename without extension

# OS.PATH - old, verbose
import os.path
path = os.path.join(os.path.expanduser("~"), "documents", "data.txt")
if os.path.exists(path):
    with open(path, "r") as f:
        content = f.read()
parent = os.path.dirname(path)
name = os.path.basename(path)
stem = os.path.splitext(name)[0]

# Why pathlib wins:
# 1. Object-oriented (paths are objects)
# 2. Chainable (path / "sub" / "file.txt")
# 3. Built-in methods (.read_text(), .write_text())
# 4. Cross-platform (handles Windows/Unix differences)
# 5. More readable

# Common operations comparison:
# Join paths
p = Path("a") / "b" / "c.txt"          # pathlib
p = os.path.join("a", "b", "c.txt")    # os.path

# Read file
Path("f.txt").read_text()              # pathlib
open("f.txt").read()                   # os.path

# Get extension
Path("f.txt").suffix                   # pathlib
os.path.splitext("f.txt")[1]           # os.path

# List directory
list(Path(".").glob("*.txt"))          # pathlib
[f for f in os.listdir(".") if f.endswith(".txt")]  # os.path

# When to use os.path:
# - Legacy code (already uses it)
# - Python < 3.4 (pathlib added in 3.4)
# - Interop with old libraries expecting strings

# When to use pathlib:
# - ALL new code
# - Python >= 3.4
# - Cleaner, more maintainable code

# Migration tip: Path works with open()
path = Path("data.txt")
with open(path, "r") as f:  # Works!
    content = f.read()`},{section:`Why & When`,signature:`File encoding - when it matters and how to handle it`,description:`UTF-8 is default and correct 99% of the time. Windows files may be UTF-16. Legacy systems use Latin-1. Wrong encoding = gibberish.`,complexity:`Concept`,example:`# UTF-8 - ALWAYS use this for new files
with open("data.txt", "w", encoding="utf-8") as f:
    f.write("Hello 世界 🌍")  # Handles all Unicode

# UTF-8 handles:
# - English (ASCII compatible)
# - Accents (café, naïve)
# - Non-Latin (日本語, العربية, Русский)
# - Emojis (🎉, 👍)

# WHEN ENCODING MATTERS
# Problem 1: Reading file with unknown encoding
try:
    with open("mystery.txt", "r", encoding="utf-8") as f:
        content = f.read()
except UnicodeDecodeError:
    # Try Latin-1 (common for old European files)
    with open("mystery.txt", "r", encoding="latin-1") as f:
        content = f.read()

# Problem 2: Windows text files
# Windows Notepad defaults to UTF-16!
with open("windows.txt", "r", encoding="utf-16") as f:
    content = f.read()

# Problem 3: CSV from Excel
# Excel exports as Windows-1252 (not UTF-8!)
with open("excel.csv", "r", encoding="windows-1252") as f:
    content = f.read()

# DETECTING ENCODING
# Option 1: chardet library
import chardet
with open("mystery.txt", "rb") as f:
    raw = f.read()
    result = chardet.detect(raw)
    encoding = result["encoding"]  # "utf-8", "latin-1", etc.

with open("mystery.txt", "r", encoding=encoding) as f:
    content = f.read()

# Option 2: Try common encodings
def read_with_fallback(path):
    encodings = ["utf-8", "latin-1", "windows-1252", "utf-16"]
    for enc in encodings:
        try:
            with open(path, "r", encoding=enc) as f:
                return f.read()
        except UnicodeDecodeError:
            continue
    raise ValueError("Could not decode file")

# SYMPTOMS of wrong encoding:
# � (replacement character)
# ñ becomes Ã±
# " becomes â€œ
# Mojibake (文字化け)

# Best practices:
# 1. Always specify encoding explicitly
# 2. UTF-8 for all new files
# 3. Test with non-ASCII chars (café, 日本語)
# 4. Windows files: check for UTF-16
# 5. Excel CSVs: probably windows-1252`},{section:`Why & When`,signature:`Common file I/O pitfalls - avoid these mistakes`,description:`Forgetting with statement, using wrong mode, encoding errors, platform-specific paths. Learn patterns that prevent bugs.`,complexity:`Concept`,example:`# PITFALL 1: Not using with statement
# Bad - file left open if exception
f = open("data.txt", "r")
content = f.read()
process(content)  # If this crashes...
f.close()         # ...this never runs!

# Good - always closed
with open("data.txt", "r") as f:
    content = f.read()
    process(content)  # Exception or not, file closes

# PITFALL 2: Write mode destroys data
data = load_from_database()
with open("backup.txt", "w") as f:  # Overwrites immediately!
    # Even if this crashes, file is already empty
    f.write(data)

# Good - write to temp file, then rename
import os
with open("backup.tmp", "w") as f:
    f.write(data)
os.replace("backup.tmp", "backup.txt")  # Atomic on Unix

# PITFALL 3: Forgetting to strip newlines
with open("names.txt", "r") as f:
    names = f.readlines()
    # names = ["Alice\\n", "Bob\\n", "Carol\\n"]

if "Alice" in names:  # FALSE! It's "Alice\\n"
    print("Found Alice")

# Good - strip whitespace
names = [line.strip() for line in f.readlines()]

# PITFALL 4: Platform-specific paths
# Bad - breaks on Windows
path = "/home/user/data.txt"  # Unix only!

# Bad - breaks on Unix
path = "C:\\\\Users\\\\user\\\\data.txt"  # Windows only!

# Good - use pathlib
from pathlib import Path
path = Path.home() / "data.txt"  # Cross-platform!

# PITFALL 5: Reading binary as text
with open("image.jpg", "r") as f:  # WRONG!
    data = f.read()
# UnicodeDecodeError or corrupted data

# Good - use binary mode
with open("image.jpg", "rb") as f:
    data = f.read()

# PITFALL 6: Assuming file exists
content = open("config.txt").read()  # Crashes if missing!

# Good - check first
from pathlib import Path
path = Path("config.txt")
if path.exists():
    content = path.read_text()
else:
    content = "default config"

# Or use try/except
try:
    content = open("config.txt").read()
except FileNotFoundError:
    content = "default config"

# PITFALL 7: Modifying file while reading
# Bad - undefined behavior!
with open("data.txt", "r+") as f:
    for line in f:
        f.write(line.upper())  # Reading + writing same file!

# Good - read all, then write
with open("data.txt", "r") as f:
    lines = f.readlines()
with open("data.txt", "w") as f:
    for line in lines:
        f.write(line.upper())

# Safety checklist:
# - Use with statement
# - Specify encoding
# - Check mode (r/w/a)
# - Use pathlib for paths
# - Binary mode for non-text
# - Handle FileNotFoundError
# - Read before write (same file)`},{section:`File Basics`,signature:`What is a file?`,description:`A file is a sequence of bytes (integers 0-255). Must be decoded/encoded to interpret contents. Python handles encoding/decoding for you.`,complexity:`Concept`,example:`# Files are sequences of bytes
# Bytes must be decoded into meaningful data

# Text files: bytes → characters (with encoding)
# Binary files: raw bytes (images, audio, etc.)

# Python handles decoding for text files
# You just specify the encoding (utf-8, ascii, etc.)`},{section:`File Basics`,signature:`Character encoding`,description:`Determines how bytes map to characters. UTF-8 is most common. ASCII limited to English. Encoding/decoding must match!`,complexity:`Concept`,example:`# Common encodings:
# - ASCII: English only, can't encode ñ or ü
# - UTF-8: Universal, backwards compatible with ASCII
# - UTF-16: Used by Windows for .txt files
# - UTF-32: 4 bytes per character

# CRITICAL: Use same encoding to decode as was used to encode!
# UTF-8 text decoded as UTF-16 = gibberish

# Default: UTF-8 on Mac/Linux, UTF-16 on Windows`},{section:`File Basics`,signature:`Line endings`,description:`Lines end with \\n (Unix/Mac) or \\r\\n (Windows). Python handles conversion automatically in text mode.`,complexity:`Concept`,example:`# Line ending characters:
# \\n = line feed (Unix/Mac)
# \\r = carriage return
# \\r\\n = both (Windows)

# Windows file opened on Unix might show extra blank lines
# Python handles this automatically in text mode

# Rarely a problem in practice!`},{section:`Opening Files`,signature:`open(path, mode, encoding)`,description:`Opens file and returns file object. Specify mode ("r", "w", "a") and encoding. Always close with .close() or use with statement.`,complexity:`O(1)`,example:`# Basic file opening
file = open("data.txt", mode="r", encoding="utf-8")
# ... do something with file ...
file.close()  # MUST close!

# Better: use with statement (auto-closes)
with open("data.txt", mode="r", encoding="utf-8") as file:
    content = file.read()
# file auto-closed here`},{section:`Opening Files`,signature:`File modes`,description:`Mode determines operation: "r" (read), "w" (write/overwrite), "a" (append). Add "b" for binary.`,complexity:`Concept`,example:`# Text modes:
# "r"  - read (error if file doesn't exist)
# "w"  - write (OVERWRITES existing file!)
# "a"  - append (adds to end of file)

# Binary modes:
# "rb" - read binary
# "wb" - write binary
# "ab" - append binary

# Write mode DANGER!
with open("data.txt", "w") as f:
    f.write("new")  # Old content GONE!`},{section:`Opening Files`,signature:`with statement`,description:`Opens file in context manager. Auto-closes even if exception raised. Pythonic way to work with files.`,complexity:`O(1)`,example:`# ALWAYS use with statement for files!
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
    # Process content...
# File automatically closed here

# Even if exception occurs:
try:
    with open("data.txt", "r") as file:
        risky_operation(file)
except Exception:
    pass
# File still closed properly!

# Don't do this:
file = open("data.txt")  # Easy to forget .close()
content = file.read()
file.close()  # What if exception before this?`},{section:`Reading Files`,signature:`file.read()`,description:`Reads entire file as single string. Lines separated by \\n. Good for small files.`,complexity:`O(n)`,example:`# Read entire file into string
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)

# Example file content:
# Line 1
# Line 2
# Line 3

# Result: "Line 1\\nLine 2\\nLine 3"

# WARNING: .read() loads entire file into memory!
# Don't use for huge files`},{section:`Reading Files`,signature:`file.readlines()`,description:`Returns list of lines. Each line includes \\n at end. Use for line-by-line processing.`,complexity:`O(n)`,example:`# Read file as list of lines
with open("data.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()
    for line in lines:
        print(line.strip())  # strip() removes \\n

# Better: iterate directly (more memory efficient)
with open("data.txt", "r") as file:
    for line in file:  # file object is iterable!
        print(line.strip())

# Process lines one at a time (doesn't load whole file)`},{section:`Reading Files`,signature:`FileNotFoundError`,description:`Raised when opening file that doesn't exist in read mode. Catch with try/except.`,complexity:`O(1)`,example:`# File doesn't exist → exception
try:
    with open("missing.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("File not found!")

# Check if file exists first
from pathlib import Path
path = Path("data.txt")
if path.exists():
    with open(path, "r") as file:
        content = file.read()`},{section:`Writing Files`,signature:`file.write(text)`,description:`Writes string to file. Must open in "w" (overwrite) or "a" (append) mode. Returns number of characters written.`,complexity:`O(n)`,example:`# Write mode OVERWRITES file!
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Hello World!\\n")
    file.write("Line 2\\n")

# Append mode ADDS to end
with open("output.txt", "a", encoding="utf-8") as file:
    file.write("Line 3\\n")

# Write doesn't add \\n automatically!
file.write("No newline")
file.write("Same line!")
# Result: "No newlineSame line!"`},{section:`Writing Files`,signature:`file.writelines(lines)`,description:`Writes list of strings to file. Doesn't add newlines! Must include \\n in each string.`,complexity:`O(n)`,example:`lines = ["Line 1\\n", "Line 2\\n", "Line 3\\n"]

# Write list of lines
with open("output.txt", "w") as file:
    file.writelines(lines)

# WARNING: doesn't add \\n automatically!
bad_lines = ["Line 1", "Line 2", "Line 3"]
file.writelines(bad_lines)
# Result: "Line 1Line 2Line 3" (all on one line!)

# Use loop instead if needed:
for line in bad_lines:
    file.write(line + "\\n")`},{section:`pathlib`,signature:`Path(string)`,description:`Creates Path object from string. Cross-platform file path handling. Use / operator to join paths.`,complexity:`O(1)`,example:`from pathlib import Path

# Create Path from string
path = Path("/Users/david/data.txt")

# Windows paths: use forward slash or raw string
path = Path("C:/Users/david/data.txt")
path = Path(r"C:\\Users\\david\\data.txt")

# Join paths with / operator
base = Path("/Users/david")
file_path = base / "documents" / "data.txt"
# Result: /Users/david/documents/data.txt`},{section:`pathlib`,signature:`Path.home(), Path.cwd()`,description:`Get home directory or current working directory. Cross-platform.`,complexity:`O(1)`,example:`from pathlib import Path

# Home directory (cross-platform!)
home = Path.home()
# Mac/Linux: /Users/username
# Windows: C:\\Users\\username

# Current working directory
cwd = Path.cwd()
print(cwd)

# Build path from home
config_path = Path.home() / ".config" / "app.conf"`},{section:`pathlib`,signature:`path.open(mode, encoding)`,description:`Opens file from Path object. Same as open() but uses existing Path.`,complexity:`O(1)`,example:`from pathlib import Path

path = Path.home() / "data.txt"

# Open using Path.open()
with path.open(mode="r", encoding="utf-8") as file:
    content = file.read()

# Equivalent to:
with open(path, mode="r", encoding="utf-8") as file:
    content = file.read()

# Useful when you already have Path object`},{section:`pathlib`,signature:`path.exists(), path.is_file(), path.is_dir()`,description:`Check if path exists and what type it is.`,complexity:`O(1)`,example:`from pathlib import Path

path = Path("data.txt")

# Check existence
if path.exists():
    print("Path exists!")

# Check if file
if path.is_file():
    print("It's a file!")

# Check if directory
if path.is_dir():
    print("It's a directory!")

# Safe file reading
if path.exists() and path.is_file():
    with open(path) as file:
        content = file.read()`},{section:`pathlib`,signature:`path.touch(), path.mkdir()`,description:`Create empty file or directory.`,complexity:`O(1)`,example:`from pathlib import Path

# Create empty file (like Unix touch)
path = Path("newfile.txt")
path.touch()

# Create directory
dir_path = Path("new_folder")
dir_path.mkdir()

# Create parent directories too
deep_path = Path("a/b/c")
deep_path.mkdir(parents=True)

# Don't error if already exists
dir_path.mkdir(exist_ok=True)`}]];var g=e(),_=`Documentation is code's instruction manual—it explains what code does, why it exists, and how to use it. Good documentation is the difference between code that's maintained for years and code that's rewritten because nobody understands it. Python offers a spectrum of documentation tools from simple comments to sophisticated auto-generated API docs. Understanding when and how to use each is essential for professional development.

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
- Test examples with doctest`;function v(){return(0,g.jsx)(t,{type:`Documentation`,badge:`doc`,color:`var(--accent-logging)`,description:`Tools for documenting Python code: comments, docstrings, dir(), help(), and external tools.`,intro:_,methods:n})}var y=`Modules are Python's fundamental unit of code organization—every .py file is automatically a module with its own namespace. Understanding import mechanics, the module search path, and package structure is essential for building maintainable Python projects. Mastering modules means understanding how Python finds code, loads it, and makes it available to your program.

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
\`\`\``;function b(){return(0,g.jsx)(t,{type:`Modules`,badge:`import`,color:`var(--accent-concurrency)`,description:`Import mechanics, bytecode, packages, and program architecture.`,intro:y,methods:a})}var x=`Exception handling is Python's structured approach to dealing with runtime errors and exceptional conditions. Unlike error codes or sentinel values, exceptions provide a clean separation between error detection and error handling, enabling robust, readable code that gracefully handles failures without cluttering business logic with endless if checks.

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

COMMON EXCEPTION TYPES: Understanding when each exception is raised helps you write targeted handlers.

**KeyError**: Accessing missing dictionary key
\`\`\`python
data = {"name": "Alice"}
try:
    age = data["age"]  # Raises KeyError
except KeyError:
    age = None  # Or use data.get("age")
\`\`\`python

**IndexError**: List/tuple index out of range
\`\`\`python
items = [1, 2, 3]
try:
    item = items[10]  # Raises IndexError
except IndexError:
    item = None
\`\`\`python

**ValueError**: Correct type but invalid value
\`\`\`python
try:
    number = int("not a number")  # Raises ValueError
except ValueError:
    number = 0
\`\`\`python

**TypeError**: Wrong type for operation
\`\`\`python
try:
    result = "5" + 5  # Raises TypeError (can't add str + int)
except TypeError:
    result = "5" + str(5)
\`\`\`python

**FileNotFoundError**: File doesn't exist
\`\`\`python
try:
    with open("missing.txt") as f:
        data = f.read()
except FileNotFoundError:
    data = ""
\`\`\`python

**AttributeError**: Object lacks attribute
\`\`\`python
try:
    length = obj.length  # obj has no 'length' attribute
except AttributeError:
    length = len(obj)  # Try len() instead
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

**Pattern 2: Multi-Exception Handler**
\`\`\`python
try:
    result = risky_operation()
except (KeyError, IndexError, TypeError) as e:
    # Handle any of these similarly
    result = default_value
\`\`\`python

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
\`\`\`python

**Pattern 4: Suppress Specific Errors**
\`\`\`python
try:
    os.remove(temp_file)  # Delete if exists
except FileNotFoundError:
    pass  # Already deleted, that's fine
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
10. **Don't use assert for validation**: It can be disabled! Use \`raise\` instead`;function S(){return(0,g.jsx)(t,{type:`Exceptions`,badge:`try`,color:`var(--accent-exceptions)`,description:`Exception handling in Python. Try/except for graceful error handling, raise for signaling errors.`,intro:x,methods:c})}var C=`Logging, debugging, and profiling are essential tools for building production-ready applications and optimizing performance. The \`logging\` module provides structured, leveled output that's configurable and persistent—far superior to \`print()\` for anything beyond simple scripts. Understanding how to properly log, debug, and profile your code is critical for maintainability, troubleshooting, and performance optimization.

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
- Use \`timeit\` for micro-benchmarks, \`cProfile\` for whole-program profiling`;function w(){return(0,g.jsx)(t,{type:`Logging & Debug`,badge:`log`,color:`var(--accent-logging)`,description:`Logging, debugging, and profiling in Python. Better than print for production code.`,intro:C,methods:d})}var T=`Concurrency and parallelism allow programs to do multiple things at once—but in Python, the approach you choose matters enormously. The GIL (Global Interpreter Lock) in CPython is the critical constraint that determines which concurrency model to use. Understanding threading vs multiprocessing vs async/await—and when to use each—is essential for writing performant Python applications.

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

ProcessPoolExecutor (Modern Approach): Consistent API with ThreadPoolExecutor.

\`\`\`python
from concurrent.futures import ProcessPoolExecutor

def cpu_intensive_task(n):
    return sum(i*i for i in range(n))

numbers = [10_000_000, 10_000_000, 10_000_000, 10_000_000]

with ProcessPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(cpu_intensive_task, numbers))
    # Results in same order as input
\`\`\`python

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
\`\`\`python

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
\`\`\`python

COMMON PATTERNS:

1. **Map Pattern**: Apply function to each item in parallel.
\`\`\`python
from concurrent.futures import ProcessPoolExecutor

data = [1, 2, 3, 4, 5, 6, 7, 8]

with ProcessPoolExecutor() as executor:
    results = list(executor.map(expensive_function, data))
\`\`\`python

2. **As-Completed Pattern**: Process results as they finish (not in order).
\`\`\`python
from concurrent.futures import ThreadPoolExecutor, as_completed

with ThreadPoolExecutor(max_workers=10) as executor:
    future_to_url = {executor.submit(fetch, url): url for url in urls}

    for future in as_completed(future_to_url):
        url = future_to_url[future]
        result = future.result()
        print(f"Completed: {url}")
\`\`\`python

3. **Rate Limiting**: Limit concurrent requests (e.g., API rate limits).
\`\`\`python
from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=5) as executor:
    # Only 5 requests at a time
    results = list(executor.map(api_call, items))
\`\`\`python

4. **Timeout Handling**: Cancel slow tasks.
\`\`\`python
with ThreadPoolExecutor() as executor:
    future = executor.submit(slow_function)
    try:
        result = future.result(timeout=5)  # Wait max 5 seconds
    except TimeoutError:
        print("Function took too long!")
\`\`\`python

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
- For web servers, use async frameworks (FastAPI, aiohttp) not threading`;function E(){return(0,g.jsx)(t,{type:`Concurrency`,badge:`async`,color:`var(--accent-concurrency)`,description:`Concurrent and parallel programming in Python. Threading, multiprocessing, and async/await.`,intro:T,methods:m})}var D=`File I/O is essential for persisting data, reading configuration, processing logs, and working with external data sources. Every file operation involves encoding (converting Python strings to bytes) and decoding (bytes back to strings). Understanding file modes, encoding, and the \`with\` statement is critical for reliable file handling. Misunderstanding encoding is the #1 cause of file I/O bugs.

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

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
\`\`\`python

3. **Binary mode is faster**: No encoding overhead
\`\`\`python
# For large data, binary mode faster
with open('data.bin', 'wb') as f:
    f.write(bytes_data)
\`\`\`python

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
- Use 'rb'/'wb' for binary data (images, audio, executables)`;function O(){return(0,g.jsx)(t,{type:`File I/O`,badge:`file`,color:`var(--accent-fileio)`,description:`Reading and writing files. Cross-platform path handling with pathlib.`,intro:D,methods:h})}export{E as ConcurrencyPage,v as DocumentationPage,S as ExceptionsPage,O as FileIOPage,w as LoggingPage,b as ModulesPage};