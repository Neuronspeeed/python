import type { Method } from '../../types'

// Context Managers, Best Practices, warnings, sys.exc_info
export const exceptionsAdvancedMethods: Method[] = [
  // Context Managers
  { signature: 'with statement', description: 'Automatic resource management. Ensures cleanup.', complexity: 'O(1)', section: 'Context Managers', example: `# File automatically closed
with open("file.txt") as f:
    content = f.read()
# f is closed here, even if exception occurred

# Multiple contexts
with open("in.txt") as f_in, open("out.txt", "w") as f_out:
    f_out.write(f_in.read())

# Equivalent to:
# f = open("file.txt")
# try:
#     content = f.read()
# finally:
#     f.close()` },
  { signature: '@contextmanager', description: 'Create context manager from generator function.', complexity: 'O(1)', section: 'Context Managers', example: `from contextlib import contextmanager

@contextmanager
def timer(label):
    import time
    start = time.time()
    try:
        yield  # Code in 'with' block runs here
    finally:
        end = time.time()
        print(f"{label}: {end - start:.2f}s")

with timer("Processing"):
    sum(range(1000000))
# Prints: Processing: 0.03s` },
  { signature: 'Custom context manager class', description: 'Implement __enter__ and __exit__ methods.', complexity: 'O(1)', section: 'Context Managers', example: `class DatabaseConnection:
    def __init__(self, host):
        self.host = host

    def __enter__(self):
        print(f"Connecting to {self.host}")
        self.conn = f"Connection to {self.host}"
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing connection")
        if exc_type is not None:
            print(f"Error occurred: {exc_val}")
        return False  # Don't suppress exceptions

with DatabaseConnection("localhost") as conn:
    print(f"Using {conn}")
# Connecting to localhost
# Using Connection to localhost
# Closing connection` },
  { signature: 'contextlib.suppress', description: 'Suppress specified exceptions silently.', complexity: 'O(1)', section: 'Context Managers', example: `from contextlib import suppress

# Instead of try/except/pass
with suppress(FileNotFoundError):
    os.remove("maybe_missing.txt")

# Equivalent to:
# try:
#     os.remove("maybe_missing.txt")
# except FileNotFoundError:
#     pass

# Multiple exceptions
with suppress(KeyError, IndexError):
    x = d["missing"]
    y = lst[100]` },
  { signature: 'contextlib.redirect_stdout', description: 'Temporarily redirect stdout to file or buffer.', complexity: 'O(1)', section: 'Context Managers', example: `from contextlib import redirect_stdout
from io import StringIO

# Capture output
buffer = StringIO()
with redirect_stdout(buffer):
    print("This goes to buffer")
    print("So does this")

captured = buffer.getvalue()
print(f"Captured: {captured}")

# Redirect to file
with open("output.txt", "w") as f:
    with redirect_stdout(f):
        print("Goes to file")` },

  // Exception Best Practices
  { signature: 'EAFP vs LBYL', description: 'EAFP: Easier to Ask Forgiveness than Permission (Pythonic).', complexity: 'O(1)', section: 'Best Practices', example: `# LBYL (Look Before You Leap) - not Pythonic
if key in dictionary:
    value = dictionary[key]
else:
    value = default

# EAFP (Easier to Ask Forgiveness) - Pythonic
try:
    value = dictionary[key]
except KeyError:
    value = default

# EAFP is often faster for common success case
# and handles race conditions better` },
  { signature: 'Specific exceptions', description: 'Always catch specific exceptions, not bare except.', complexity: 'O(1)', section: 'Best Practices', example: `# Bad - catches everything including KeyboardInterrupt
try:
    risky_operation()
except:
    pass

# Bad - too broad
try:
    risky_operation()
except Exception:
    pass

# Good - specific
try:
    risky_operation()
except (ValueError, TypeError) as e:
    handle_error(e)` },
  { signature: 'Exception in logging', description: 'Log exceptions with traceback for debugging.', complexity: 'O(1)', section: 'Best Practices', example: `import logging
import traceback

try:
    x = 1 / 0
except ZeroDivisionError:
    # Log with traceback
    logging.exception("Error occurred")
    # Or manually
    logging.error(traceback.format_exc())

# Get traceback as string
try:
    raise ValueError("test")
except ValueError:
    tb = traceback.format_exc()
    print(tb)` },

  // Exception Nesting & Idioms
  { signature: 'Nested try/finally (propagation)', description: 'Exceptions bubble up through nested handlers. All finally blocks execute during unwinding.', complexity: 'O(1)', section: 'Nesting & Idioms', example: `def inner():
    try:
        raise ValueError("Oops")
    finally:
        print("inner finally")  # Always runs

def outer():
    try:
        inner()
    finally:
        print("outer finally")  # Also runs

try:
    outer()
except ValueError as e:
    print(f"Caught: {e}")
# inner finally
# outer finally
# Caught: Oops` },
  { signature: 'Break nested loops', description: 'Use exception to jump out of deeply nested loops instantly. Cleaner than flag variables.', complexity: 'O(1)', section: 'Nesting & Idioms', example: `class Found(Exception):
    pass

matrix = [[1, 2], [3, 4], [5, 6]]
target = 4

try:
    for row in matrix:
        for val in row:
            if val == target:
                raise Found()
except Found:
    print(f"Found {target}!")

# vs messy flag approach:
# found = False
# for row in matrix:
#     for val in row:
#         if val == target:
#             found = True
#             break
#     if found: break` },
  { signature: 'Exception with state/methods', description: 'Attach data via __init__, add methods for exception-specific behavior.', complexity: 'O(1)', section: 'Nesting & Idioms', example: `class DatabaseError(Exception):
    def __init__(self, message, code, query=None):
        super().__init__(message)
        self.code = code
        self.query = query

    def log(self):
        return f"[DB-{self.code}] {self} | Query: {self.query}"

try:
    raise DatabaseError("Connection failed", 503, "SELECT *")
except DatabaseError as e:
    print(e.code)       # 503
    print(e.query)      # SELECT *
    print(e.log())      # [DB-503] Connection failed | Query: SELECT *` },

  // warnings Module
  { signature: 'warnings.warn()', description: 'Issue a warning without stopping execution.', complexity: 'O(1)', section: 'Warnings & Info', example: `import warnings

def deprecated_function():
    warnings.warn(
        "deprecated_function is deprecated, use new_function",
        DeprecationWarning,
        stacklevel=2
    )
    return "old behavior"

# Control warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("error", category=UserWarning)  # Treat as error` },

  // sys.exc_info
  { signature: 'sys.exc_info()', description: 'Get current exception info tuple (type, value, traceback).', complexity: 'O(1)', section: 'Warnings & Info', example: `import sys

try:
    x = 1 / 0
except:
    exc_type, exc_value, exc_tb = sys.exc_info()
    print(f"Type: {exc_type}")     # <class 'ZeroDivisionError'>
    print(f"Value: {exc_value}")   # division by zero
    print(f"Line: {exc_tb.tb_lineno}")` },
]
