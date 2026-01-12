import type { Method } from '../../../types'

export const whyAndWhenMethods: Method[] = [
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
]
