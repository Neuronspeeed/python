import type { Method } from '../../../types'

export const dynamicImportsMethods: Method[] = [
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
