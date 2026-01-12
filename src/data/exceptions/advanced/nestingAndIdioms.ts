import type { Method } from '../../../types'

export const nestingAndIdiomsMethods: Method[] = [
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
]
