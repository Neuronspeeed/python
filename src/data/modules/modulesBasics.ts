import type { Method } from '../../types'

export const modulesBasicsMethods: Method[] = [
  // Why & When
  {
    section: 'Why & When',
    signature: 'When to split code into modules',
    description: 'Split when: file > 300 lines, distinct responsibilities, reusable across projects, or team collaboration needs.',
    complexity: 'Concept',
    example: `# MONOLITH - hard to navigate, test, reuse
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
from payments import process`,
  },
  {
    section: 'Why & When',
    signature: 'Module vs package vs script',
    description: 'Module: reusable .py file. Package: directory with __init__.py. Script: .py run directly (if __name__ == "__main__").',
    complexity: 'Concept',
    example: `# MODULE - designed to be imported
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
# import script; script.main()  # Import as module`,
  },
  {
    section: 'Why & When',
    signature: 'Import cost & lazy loading',
    description: 'First import: ~1-10ms (file I/O + execution). Use lazy imports for: optional features, CLI tools, large deps.',
    complexity: 'O(n)',
    example: `# EAGER - imports at module load (~5ms each)
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
# - Development-only imports (debuggers, profilers)`,
  },
  {
    section: 'Why & When',
    signature: 'When to use __all__',
    description: 'Use __all__ to: define public API, control "from x import *", document intended exports. Omit for internal modules.',
    complexity: 'Concept',
    example: `# PUBLIC API MODULE - use __all__
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
# - Application code → usually skip __all__`,
  },
  {
    section: 'Why & When',
    signature: 'from x import * vs explicit imports',
    description: '"from x import *" pollutes namespace, hides origins. Use explicit imports for: clarity, IDE support, avoiding conflicts.',
    complexity: 'Concept',
    example: `# BAD - namespace pollution
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
# Exception: typing module, well-controlled configs`,
  },

  // Import Mechanics
  {
    section: 'Import Mechanics',
    signature: 'import module',
    description: 'Imports entire module. Three-step process: find file, compile to bytecode, execute top-to-bottom.',
    complexity: 'O(n)',
    example: `import math
print(math.sqrt(16))  # 4.0

import os
print(os.getcwd())

# Module is an object with attributes
print(type(math))  # <class 'module'>
print(dir(math))   # list all attributes`,
  },
  {
    section: 'Import Mechanics',
    signature: 'from module import name',
    description: 'Imports specific names into current namespace. Copies references, not the module object.',
    complexity: 'O(n)',
    example: `from math import sqrt, pi
print(sqrt(16))  # 4.0 (no prefix needed)
print(pi)        # 3.14159...

from os import getcwd, listdir
print(getcwd())

# Import with alias
from collections import defaultdict as dd`,
  },
  {
    section: 'Import Mechanics',
    signature: 'import module as alias',
    description: 'Import with a shorter or clearer name. Common for long module names.',
    complexity: 'O(n)',
    example: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Use alias
arr = np.array([1, 2, 3])

# Avoid name conflicts
import mymodule as mm
import theirmodule as tm`,
  },
  {
    section: 'Import Mechanics',
    signature: 'First import only',
    description: 'Import runs module code only on first import. Subsequent imports reuse cached module object.',
    complexity: 'Concept',
    example: `# mymodule.py
print("Module loading...")  # runs once
x = 10

# main.py
import mymodule  # prints "Module loading..."
import mymodule  # no output (cached)
import mymodule  # no output (cached)

# Force reload
from importlib import reload
reload(mymodule)  # runs code again`,
  },

  // Bytecode & __pycache__
  {
    section: 'Bytecode',
    signature: '__pycache__ & compileall',
    description: 'Python saves .pyc bytecode in __pycache__. Use compileall to pre-compile before distributing.',
    complexity: 'O(n)',
    example: `# After importing mymodule.py:
# __pycache__/mymodule.cpython-312.pyc

# .pyc only for imported files, not scripts
# Delete to force recompilation: rm -rf __pycache__

# Pre-compile all files
python -m compileall mypackage/
# Or: import compileall; compileall.compile_dir('pkg')

# Source-less distribution: ship only .pyc files`,
  },

  // Module Search Path
  {
    section: 'Module Search Path',
    signature: 'sys.path',
    description: 'List of directories Python searches for modules. First match wins.',
    complexity: 'O(n)',
    example: `import sys
print(sys.path)
# ['', '/usr/lib/python3.12', ...]

# '' means current directory (searched first)

# Add custom path at runtime
sys.path.append('/my/modules')
sys.path.insert(0, '/priority/path')

# Or use PYTHONPATH environment variable
# export PYTHONPATH=/my/modules`,
  },
  {
    section: 'Module Search Path',
    signature: 'Search order',
    description: 'Python searches: 1) script directory, 2) PYTHONPATH, 3) stdlib, 4) site-packages.',
    complexity: 'Concept',
    example: `# Search order:
# 1. Directory of running script
# 2. PYTHONPATH directories
# 3. Standard library
# 4. site-packages (pip installs)

# Check where module was found
import math
print(math.__file__)
# /usr/lib/python3.12/lib-dynload/math.cpython-312-...

# Watch out: local file named 'math.py'
# would shadow the stdlib math module!`,
  },

  // Module Attributes
  {
    section: 'Module Attributes',
    signature: '__name__',
    description: 'Module name. Equals "__main__" when run as script, module name when imported.',
    complexity: 'O(1)',
    example: `# mymodule.py
print(__name__)

# When run directly:
# python mymodule.py  → prints "__main__"

# When imported:
# import mymodule  → prints "mymodule"

# Common pattern
if __name__ == "__main__":
    # Only runs when executed directly
    main()`,
  },
  {
    section: 'Module Attributes',
    signature: '__file__, __doc__, __all__',
    description: 'Module path, docstring, and public API list for "from module import *".',
    complexity: 'O(1)',
    example: `import os
print(os.__file__)  # /usr/lib/python3.12/os.py
print(os.__doc__)   # module docstring

# __all__ controls "from x import *"
# mymodule.py
__all__ = ['public_func', 'PublicClass']
def _private(): pass  # not exported by *

# Built-ins have no __file__
import sys
# sys.__file__  # AttributeError`,
  },

  // Packages
  {
    section: 'Packages',
    signature: '__init__.py & relative imports',
    description: 'Directory with __init__.py becomes a package. Use dots for relative imports within packages.',
    complexity: 'Concept',
    example: `# mypackage/__init__.py
from .module1 import func1  # expose submodule

# Inside package, use relative imports:
from . import sibling       # same package
from .. import parent       # parent package

# Dot syntax navigates hierarchy:
import package.subpackage.module  # each dot = subdirectory`,
  },
  {
    section: 'Packages',
    signature: '__main__.py',
    description: 'Allows package to be executed as a script: python -m package.',
    complexity: 'Concept',
    example: `# mypackage/
#   __init__.py
#   __main__.py   ← executed by python -m

# mypackage/__main__.py
from . import core
if __name__ == "__main__":
    core.main()

# Run entire package:
# python -m mypackage
# Example: python -m http.server 8000`,
  },
]
