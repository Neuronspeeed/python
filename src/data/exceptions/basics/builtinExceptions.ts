import type { Method } from '../../../types'

export const builtinExceptionsMethods: Method[] = [
  { signature: 'ValueError', description: 'Raised when function receives correct type but invalid value.', complexity: 'O(1)', section: 'Built-in Exceptions', example: `int("abc")      # ValueError: invalid literal
int("3.14")     # ValueError
list().remove(5) # ValueError: 5 not in list

# Common validation pattern
def parse_positive(s):
    num = int(s)
    if num <= 0:
        raise ValueError("Must be positive")
    return num` },
  { signature: 'TypeError', description: 'Raised when operation applied to wrong type.', complexity: 'O(1)', section: 'Built-in Exceptions', example: `"hello" + 5        # TypeError: can only concatenate str
len(42)            # TypeError: object has no len()
sum("abc")         # TypeError: unsupported operand type

# Check types
def add_numbers(a, b):
    if not isinstance(a, (int, float)):
        raise TypeError(f"Expected number, got {type(a)}")
    return a + b` },
  { signature: 'KeyError', description: 'Raised when dictionary key not found.', complexity: 'O(1)', section: 'Built-in Exceptions', example: `d = {"a": 1}
d["b"]            # KeyError: 'b'

# Avoid with .get()
value = d.get("b", "default")

# Or try/except
try:
    value = d["b"]
except KeyError:
    value = "default"` },
  { signature: 'IndexError', description: 'Raised when sequence index out of range.', complexity: 'O(1)', section: 'Built-in Exceptions', example: `lst = [1, 2, 3]
lst[10]           # IndexError: list index out of range

# Safe access
def safe_get(lst, idx, default=None):
    try:
        return lst[idx]
    except IndexError:
        return default

print(safe_get([1, 2, 3], 10, "N/A"))  # N/A` },
  { signature: 'AttributeError', description: 'Raised when attribute access or assignment fails.', complexity: 'O(1)', section: 'Built-in Exceptions', example: `"hello".foo()     # AttributeError: no attribute 'foo'
None.something    # AttributeError

# Check with hasattr
obj = "hello"
if hasattr(obj, 'upper'):
    print(obj.upper())

# Or try/except
try:
    result = obj.foo()
except AttributeError:
    result = None` },
  { signature: 'FileNotFoundError', description: 'Raised when file or directory not found.', complexity: 'O(1)', section: 'Built-in Exceptions', example: `open("missing.txt")  # FileNotFoundError

# Handle missing files
def read_file(path):
    try:
        with open(path) as f:
            return f.read()
    except FileNotFoundError:
        return None  # Or create file, etc.` },
  { signature: 'ImportError / ModuleNotFoundError', description: 'Raised when import fails.', complexity: 'O(1)', section: 'Built-in Exceptions', example: `# import nonexistent  # ModuleNotFoundError

# Optional dependency pattern
try:
    import numpy as np
    HAS_NUMPY = True
except ImportError:
    HAS_NUMPY = False

def calculate(data):
    if HAS_NUMPY:
        return np.mean(data)
    return sum(data) / len(data)` },
  { signature: 'StopIteration', description: 'Raised by next() when iterator exhausted.', complexity: 'O(1)', section: 'Built-in Exceptions', example: `it = iter([1, 2])
print(next(it))  # 1
print(next(it))  # 2
# next(it)       # StopIteration

# With default
print(next(it, "done"))  # "done" (no exception)

# In generator
def gen():
    yield 1
    yield 2
    # StopIteration raised automatically at end` },
  { signature: 'AssertionError', description: 'Raised when assert statement fails.', complexity: 'O(1)', section: 'Built-in Exceptions', example: `assert 1 == 1      # OK
# assert 1 == 2    # AssertionError

# With message
x = -5
assert x > 0, f"x must be positive, got {x}"
# AssertionError: x must be positive, got -5

# Note: assertions can be disabled with -O flag
# Don't use for data validation in production!` },
]
