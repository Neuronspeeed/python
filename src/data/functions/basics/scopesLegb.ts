import type { Method } from '../../../types'

export const scopesLegbMethods: Method[] = [
  { section: 'Scopes & LEGB', signature: 'LEGB Rule', description: 'Name lookup order: Local → Enclosing → Global → Built-in. First match wins.', complexity: 'Concept', example: `x = "global"          # Global scope

def outer():
    x = "enclosing"    # Enclosing scope
    def inner():
        x = "local"    # Local scope
        print(x)       # "local"
    inner()

outer()
print(x)  # "global" (outer scopes unchanged)

# Built-in example
print(len([1,2,3]))  # 3 (len from built-in scope)` },
  { section: 'Scopes & LEGB', signature: 'Shadowing built-ins', description: 'Built-in names can be reassigned (not reserved). Avoid—causes confusion.', complexity: 'Concept', example: `# DON'T DO THIS (but it works)
len = 99
# print(len([1,2,3]))  # TypeError: int not callable

# Restore by deleting local binding
del len
print(len([1,2,3]))  # 3 (built-in works again)

# Common accidental shadows
# list = [1, 2, 3]     # shadows list()
# str = "hello"        # shadows str()
# id = 123             # shadows id()` },
  { section: 'Scopes & LEGB', signature: 'Local scope lifetime', description: 'Local names exist only while function executes. Created on call, destroyed on return.', complexity: 'Concept', example: `def func():
    x = 10  # created when func() called
    return x
# x destroyed when func returns

# Each call gets fresh locals
def counter():
    count = 0      # reset each call
    count += 1
    return count

print(counter())  # 1
print(counter())  # 1 (not 2—count reset)

# Use closure or global to persist state` },
]
