import type { Method } from '../../types'

export const variableNaming: Method[] = [
  {
    section: 'Variable Naming',
    signature: 'Naming Rules',
    description: 'Names must start with letter or underscore, followed by letters, digits, or underscores. Case-sensitive.',
    complexity: 'Concept',
    example: `# Valid names
count = 1
_private = 2
myVar2 = 3
CamelCase = 4

# Invalid names
2var = 1      # SyntaxError: can't start with digit
my-var = 1    # SyntaxError: hyphen not allowed
my var = 1    # SyntaxError: spaces not allowed`,
  },
  {
    section: 'Variable Naming',
    signature: 'Reserved Words',
    description: 'Cannot use Python keywords as variable names. 35 reserved words in Python 3.',
    complexity: 'Concept',
    example: `# Reserved words (cannot use as names)
# False, None, True, and, as, assert, async,
# await, break, class, continue, def, del,
# elif, else, except, finally, for, from,
# global, if, import, in, is, lambda,
# nonlocal, not, or, pass, raise, return,
# try, while, with, yield

import keyword
print(keyword.kwlist)  # list all keywords`,
  },
  {
    section: 'Variable Naming',
    signature: 'Naming Conventions',
    description: 'Underscore conventions signal intent: _private, __mangled, __dunder__. Not enforced but widely followed.',
    complexity: 'Concept',
    example: `_internal = 1      # "private" by convention
__mangled = 2      # name mangling in classes
__init__ = 3       # system-defined "dunder"

# In classes
class MyClass:
    def __init__(self):
        self._protected = 1   # internal use
        self.__private = 2    # becomes _MyClass__private

# Single underscore for unused
for _ in range(3):  # don't need loop variable
    print("hi")`,
  },
]
