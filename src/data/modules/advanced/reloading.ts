import type { Method } from '../../../types'

export const reloadingMethods: Method[] = [
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
]
