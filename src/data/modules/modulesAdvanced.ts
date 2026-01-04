import type { Method } from '../../types'

export const modulesAdvancedMethods: Method[] = [
  // Why & When
  {
    section: 'Why & When',
    signature: 'Dynamic imports vs static imports',
    description: 'Static imports (import x): compile-time, fast, analyzable. Dynamic imports (importlib): runtime, flexible, plugins. Use static 99% of the time.',
    complexity: 'Concept',
    example: `# STATIC - compile-time, normal usage
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
        return importlib.import_module('json')`,
  },
  {
    section: 'Why & When',
    signature: 'reload() - development only',
    description: 'reload() for interactive development (REPL, Jupyter). NEVER in production—partial updates cause inconsistency.',
    complexity: 'Concept',
    example: `from importlib import reload
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
# Development: use reload() in REPL/Jupyter only`,
  },
  {
    section: 'Why & When',
    signature: 'When to create packages vs modules',
    description: 'Single file (<500 lines) → module. Multiple files, shared theme → package. Packages group related modules.',
    complexity: 'Concept',
    example: `# SINGLE MODULE - simple, standalone
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
# - < 500 lines`,
  },
  {
    section: 'Why & When',
    signature: 'from module import * - when to avoid',
    description: 'Avoid "import *" in production: pollutes namespace, hides origins, breaks tools. OK for: interactive REPL, well-designed APIs with __all__.',
    complexity: 'Concept',
    example: `# BAD - production code
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
# 3. You're the typing module`,
  },
  {
    section: 'Why & When',
    signature: 'Package structure best practices',
    description: 'Flat is better than nested. Deep hierarchies (a.b.c.d.e) are hard to navigate. 2-3 levels max for most projects.',
    complexity: 'Concept',
    example: `# BAD - too deep, hard to navigate
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
# - If > 4 levels, rethink structure`,
  },

  // Program Structure
  {
    section: 'Program Structure',
    signature: 'Main script + modules',
    description: 'Programs have one main script (entry point) and library modules providing tools.',
    complexity: 'Concept',
    example: `# project/
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
    main()`,
  },
  {
    section: 'Program Structure',
    signature: 'Naming constraints',
    description: 'Module/package names must follow variable rules because they become variable names in code.',
    complexity: 'Concept',
    example: `# VALID: mymodule.py, my_module.py, module2.py

# INVALID (can't import):
# my-module.py  → import my-module = my MINUS module!
# 2module.py    → starts with digit
# for.py        → reserved word

# Package folders follow same rules
# my-package/ will cause SyntaxError on import`,
  },

  // Namespaces
  {
    section: 'Namespaces',
    signature: 'Module as namespace',
    description: 'A module is a package of variable names. Top-level assignments become module attributes.',
    complexity: 'Concept',
    example: `# mymodule.py
x = 10              # becomes mymodule.x
def func(): pass    # becomes mymodule.func
class MyClass: pass # becomes mymodule.MyClass

# Only top-level names become attributes
# Names inside def/class are local to those

# other.py
import mymodule
print(mymodule.x)       # 10
mymodule.func()         # works
obj = mymodule.MyClass()`,
  },
  {
    section: 'Namespaces',
    signature: 'Encapsulation',
    description: 'Each module is a separate namespace. Same variable names in different modules don\'t conflict.',
    complexity: 'Concept',
    example: `# mod1.py
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
# Qualification keeps them separate`,
  },

  // Import Variants
  {
    section: 'Import Variants',
    signature: 'from module import *',
    description: 'Copies all top-level names from module. Avoid in production—pollutes namespace.',
    complexity: 'O(n)',
    example: `from math import *
print(sqrt(16))  # 4.0
print(pi)        # 3.14159...

# Copies EVERY public name into your namespace
# Problems:
# - Don't know what names you're getting
# - May overwrite existing names
# - Hard to trace where names come from

# OK for interactive exploration
# Bad for production code`,
  },
  {
    section: 'Import Variants',
    signature: '_underscore privacy',
    description: 'Names starting with _ are not copied by "from module import *". Convention for private names.',
    complexity: 'Concept',
    example: `# mymodule.py
public_api = "use this"
_internal = "implementation detail"

def public_func(): pass
def _helper(): pass

# other.py
from mymodule import *
# Gets: public_func, public_api
# Does NOT get: _internal, _helper

# Can still access explicitly:
from mymodule import _internal  # works`,
  },

  // Reloading
  {
    section: 'Reloading',
    signature: 'importlib.reload()',
    description: 'Re-run module code to pick up changes. Requires already-loaded module object.',
    complexity: 'O(n)',
    example: `from importlib import reload
import mymodule

# Edit mymodule.py externally...

reload(mymodule)  # Re-executes module code

# Caveats:
# - Only updates the module object
# - Objects imported with 'from' still reference old!

from mymodule import func  # old func
reload(mymodule)           # module updated
# func still points to old version`,
  },
  {
    section: 'Reloading',
    signature: 'Transitive reloading',
    description: 'reload() only updates one module. For dependencies, must reload recursively with cycle detection.',
    complexity: 'O(n)',
    example: `# Standard reload doesn't reload dependencies
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

    reload(module)`,
  },

  // Dynamic Imports
  {
    section: 'Dynamic Imports',
    signature: 'importlib.import_module()',
    description: 'Import module by name string at runtime. Foundation for plugin architectures.',
    complexity: 'O(n)',
    example: `import importlib

# Import when module name is a string variable
module_name = "json"
mod = importlib.import_module(module_name)
print(mod.dumps({"a": 1}))  # '{"a": 1}'

# Plugin architecture pattern
def load_plugin(name):
    return importlib.import_module(f"plugins.{name}")

plugin = load_plugin("auth")  # loads plugins/auth.py
plugin.initialize()`,
  },
  {
    section: 'Dynamic Imports',
    signature: '__import__() builtin',
    description: 'Low-level import by string. Prefer importlib.import_module() for clarity.',
    complexity: 'O(n)',
    example: `# __import__ is the builtin behind import statement
mod = __import__("json")
print(mod.dumps([1, 2]))  # '[1, 2]'

# For nested modules, use importlib instead
# __import__("pkg.mod") returns pkg, not mod!

import importlib
mod = importlib.import_module("pkg.mod")  # returns mod

# Use case: loading modules from config files
config = {"handler": "handlers.email"}
handler = importlib.import_module(config["handler"])`,
  },
]
