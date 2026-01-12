import type { Method } from '../../../types'

export const importVariantsMethods: Method[] = [
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
]
