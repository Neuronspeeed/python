import type { Method } from '../../../types'

export const contextManagersMethods: Method[] = [
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
]
