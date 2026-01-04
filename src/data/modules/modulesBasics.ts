import type { Method } from '../../types'

export const modulesBasicsMethods: Method[] = [
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
