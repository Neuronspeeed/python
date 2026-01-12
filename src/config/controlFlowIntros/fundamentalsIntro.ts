export const fundamentalsIntro = `Python's Object Model Foundation
Python's object model is the foundation for understanding EVERYTHING in the language. All data in Python is represented as objects—from simple integers to complex classes. The key insight: understanding Python's dynamic typing model, reference semantics, and garbage collection is critical for avoiding 90% of bugs and writing efficient code.

\`\`\`python
# DYNAMIC: No type declarations
x = 1        # x is int
x = "hello"  # x is now str — perfectly legal!

# STRONG: No silent type coercion
x = "1"
y = 1
z = x + y    # TypeError! No automatic conversion

# vs JavaScript (weak typing):
# "1" + 1 = "11" (silent coercion to string)
\`\`\`
---
Dynamic Typing with Strong Type Checking
Python tracks types at RUNTIME (dynamic)—no declarations needed. But operations ONLY work on compatible types (strong)—no silent coercion like JavaScript. \`"1" + 1\` raises TypeError, not \`"11"\`. This combination gives flexibility (any variable can hold any type) with safety (type errors caught immediately).

\`\`\`python
# THREE COMPONENTS OF PYTHON'S MODEL:

# 1. VARIABLES = Names in namespace (no type stored)
x = 42        # Variable 'x' created, references int(42)
x = "hello"   # 'x' now references str, perfectly legal

# 2. OBJECTS = Allocated memory with identity, type, value
# - Type NEVER changes after creation
# - Immutable: int, str, tuple, frozenset
# - Mutable: list, dict, set

# 3. REFERENCES = Automatic pointers
a = [1, 2, 3]
b = a         # b references SAME list (not a copy!)
b.append(4)
print(a)      # [1, 2, 3, 4] — same object!

# CHECK TYPE AT RUNTIME
type(42)        # <class 'int'>
isinstance(42, int)  # True
\`\`\`
---
Reference Semantics and Common Pitfalls
Assignment creates references, NOT copies. Multiple names can reference same object. Use \`is\` for identity (same object), \`==\` for equality (same value). Mutable default arguments are shared across calls—use None instead.

\`\`\`python
# IS vs == - Identity vs Equality
a = [1, 2, 3]
b = [1, 2, 3]
a == b        # True (same value)
a is b        # False (different objects)

c = a
c is a        # True (same object)

# MUTABLE DEFAULT ARGUMENT GOTCHA
def bad(L=[]):      # BUG! [] created ONCE
    L.append(1)
    return L

bad()  # [1]
bad()  # [1, 1] — Same list!

def good(L=None):   # CORRECT
    if L is None:
        L = []
    L.append(1)
    return L

good()  # [1]
good()  # [1] — New list each time

# SHALLOW VS DEEP COPY
import copy
original = [[1, 2], [3, 4]]
shallow = original.copy()     # Copies outer list only
deep = copy.deepcopy(original)  # Copies everything

shallow[0].append(99)
print(original)  # [[1, 2, 99], [3, 4]] — nested lists shared!

deep[0].append(99)
print(original)  # [[1, 2], [3, 4]] — independent
\`\`\``
