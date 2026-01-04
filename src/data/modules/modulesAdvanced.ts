import type { Method } from '../../types'

export const modulesAdvancedMethods: Method[] = [
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
