import type { Method } from '../../types'

// Basic Exception Handling, Raising Exceptions, Custom Exceptions, Built-in Exceptions
export const exceptionsBasicsMethods: Method[] = [
  // Why & When
  { signature: 'Exceptions vs return codes', description: 'Exceptions: abnormal conditions, can\'t be ignored. Return codes/None: expected alternatives, can be ignored. Use exceptions when caller shouldn\'t continue.', complexity: 'Concept', section: 'Why & When', example: `# RETURN CODES - expected cases
def find_user(user_id):
    user = db.get(user_id)
    return user  # None if not found (OK)

user = find_user(123)
if user:
    print(user.name)

# EXCEPTIONS - abnormal conditions
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# Caller MUST handle this
try:
    result = divide(10, 0)
except ValueError:
    result = float('inf')

# Rule: Return None for "not found"
#       Raise exception for "invalid input"` },
  { signature: 'EAFP vs LYBYL', description: 'EAFP (Easier to Ask Forgiveness): try first, handle exceptions. LYBYL (Look Before You Leap): check first. Python prefers EAFP.', complexity: 'Concept', section: 'Why & When', example: `# LYBYL - check before action
if key in my_dict:
    value = my_dict[key]
else:
    value = default
# Problem: race condition in threading, 2 lookups

# EAFP - just try it
try:
    value = my_dict[key]
except KeyError:
    value = default
# Better: atomic, one lookup, catches all edge cases

# EAFP is Pythonic for:
# - File operations (don't check exists, just open)
# - Attribute access (hasattr → getattr with default)
# - Type checking (try operation, not isinstance)
# LYBYL is better for:
# - Expensive operations where failure is common
# - User input validation (fail fast)` },
  { signature: 'Exception performance cost', description: 'try: ~0 cost. Raising exception: ~1-5μs (microseconds). Use for exceptional cases, not control flow.', complexity: 'O(1)', section: 'Why & When', example: `# GOOD - exceptions for errors
def get_user(user_id):
    user = db.query(user_id)
    if not user:
        raise ValueError(f"User {user_id} not found")
    return user
# Exception raised rarely

# BAD - exceptions for control flow
def first_even(numbers):
    for num in numbers:
        try:
            if num % 2 == 0:
                raise StopIteration(num)  # DON'T DO THIS
        except StopIteration as e:
            return e.value
# Exception raised every call! Slow!

# GOOD - normal control flow
def first_even(numbers):
    for num in numbers:
        if num % 2 == 0:
            return num
    return None

# Benchmark: 1 million iterations
# Exception: ~5 seconds
# If/else:   ~0.2 seconds (25x faster)` },
  { signature: 'When to catch vs propagate', description: 'Catch when: you can handle it, have meaningful recovery, at API boundaries. Propagate when: can\'t fix, need more context, want caller to decide.', complexity: 'Concept', section: 'Why & When', example: `# CATCH - can handle locally
def read_config(path):
    try:
        with open(path) as f:
            return json.load(f)
    except FileNotFoundError:
        return {}  # Use defaults
    except json.JSONDecodeError:
        return {}  # Invalid JSON → defaults

# PROPAGATE - need caller context
def fetch_user(user_id):
    response = requests.get(f"/api/users/{user_id}")
    response.raise_for_status()  # Let caller handle 404/500
    return response.json()

# CATCH AT BOUNDARY
def main():
    try:
        user = fetch_user(123)
        config = read_config("config.json")
        app.run(user, config)
    except requests.HTTPError as e:
        print(f"API error: {e}")
    except Exception as e:
        log.error(f"Unexpected: {e}")
        raise  # Re-raise after logging

# Rule: Handle at the level with enough context` },
  { signature: 'When to create custom exceptions', description: 'Create custom exceptions when: need domain-specific error types, want to attach extra data, have exception hierarchy, building library/API.', complexity: 'Concept', section: 'Why & When', example: `# DON'T - built-in is enough
class InvalidNumber(ValueError):
    pass
# Just use ValueError!

# DO - need extra data
class ValidationError(Exception):
    def __init__(self, field, value, reason):
        self.field = field
        self.value = value
        self.reason = reason
        super().__init__(f"{field}: {reason} (got {value})")

try:
    raise ValidationError("age", -5, "must be positive")
except ValidationError as e:
    print(f"Field: {e.field}")   # age
    print(f"Reason: {e.reason}") # must be positive

# DO - exception hierarchy for library
class DatabaseError(Exception):
    """Base for all DB errors"""
    pass

class ConnectionError(DatabaseError):
    pass

class QueryError(DatabaseError):
    pass

# Users can catch specific or all DB errors
try:
    db.query(sql)
except ConnectionError:
    retry()
except DatabaseError:
    log_error()` },

  // Basic Exception Handling
  { signature: 'try: ... except:', description: 'Basic exception handling. Catches all exceptions if no type specified.', complexity: 'O(1)', section: 'Basic Handling', example: `try:
    x = 1 / 0
except:
    print("An error occurred")

# Better: specify exception type
try:
    x = 1 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")` },
  { signature: 'try: ... except ExceptionType:', description: 'Catch specific exception type. Multiple except blocks possible.', complexity: 'O(1)', section: 'Basic Handling', example: `try:
    num = int(input("Enter number: "))
    result = 10 / num
except ValueError:
    print("Invalid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catch multiple types
try:
    # risky code
    pass
except (TypeError, ValueError):
    print("Type or Value error")` },
  { signature: 'except ExceptionType as e:', description: 'Capture exception object for details.', complexity: 'O(1)', section: 'Basic Handling', example: `try:
    x = 1 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")           # division by zero
    print(f"Type: {type(e)}")      # <class 'ZeroDivisionError'>
    print(f"Args: {e.args}")       # ('division by zero',)

try:
    open("missing.txt")
except FileNotFoundError as e:
    print(f"File: {e.filename}")   # missing.txt
    print(f"Error: {e.strerror}")  # No such file or directory` },
  { signature: 'try: ... else:', description: 'else block runs if no exception occurred.', complexity: 'O(1)', section: 'Basic Handling', example: `try:
    num = int("42")
except ValueError:
    print("Invalid!")
else:
    print(f"Success: {num}")  # Success: 42

# Useful pattern
def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        return None
    else:
        print("Division successful")
        return result` },
  { signature: 'try: ... finally:', description: 'finally block always executes, even if exception raised.', complexity: 'O(1)', section: 'Basic Handling', example: `try:
    f = open("file.txt", "w")
    f.write("Hello")
except IOError:
    print("Error writing file")
finally:
    f.close()  # Always runs
    print("File closed")

# Even with return
def test():
    try:
        return 1
    finally:
        print("Finally runs!")  # Still prints!

test()  # Prints "Finally runs!" then returns 1` },

  // Raising Exceptions
  { signature: 'raise ExceptionType', description: 'Raise an exception to signal an error.', complexity: 'O(1)', section: 'Raising Exceptions', example: `def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age seems unrealistic")
    return True

try:
    validate_age(-5)
except ValueError as e:
    print(e)  # Age cannot be negative` },
  { signature: 'raise ExceptionType(message)', description: 'Raise with custom error message.', complexity: 'O(1)', section: 'Raising Exceptions', example: `def withdraw(balance, amount):
    if amount > balance:
        raise ValueError(f"Insufficient funds: need {amount}, have {balance}")
    return balance - amount

try:
    withdraw(100, 150)
except ValueError as e:
    print(e)  # Insufficient funds: need 150, have 100` },
  { signature: 'raise', description: 'Re-raise current exception. Preserves original traceback.', complexity: 'O(1)', section: 'Raising Exceptions', example: `try:
    try:
        x = 1 / 0
    except ZeroDivisionError:
        print("Logging error...")
        raise  # Re-raise the same exception
except ZeroDivisionError:
    print("Caught re-raised exception")` },
  { signature: 'raise ... from ...', description: 'Chain exceptions. Shows cause in traceback.', complexity: 'O(1)', section: 'Raising Exceptions', example: `def load_config(filename):
    try:
        with open(filename) as f:
            return f.read()
    except FileNotFoundError as e:
        raise RuntimeError(f"Config failed: {filename}") from e

try:
    load_config("missing.yaml")
except RuntimeError as e:
    print(e)                 # Config failed: missing.yaml
    print(e.__cause__)       # Original FileNotFoundError` },

  // Custom Exceptions
  { signature: 'class CustomError(Exception):', description: 'Create custom exception by inheriting from Exception.', complexity: 'O(1)', section: 'Custom Exceptions', example: `class ValidationError(Exception):
    """Raised when validation fails"""
    pass

class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"Need {amount}, have {balance}")

try:
    raise InsufficientFundsError(100, 150)
except InsufficientFundsError as e:
    print(f"Balance: {e.balance}")  # 100
    print(f"Amount: {e.amount}")    # 150` },
  { signature: 'Exception hierarchy', description: 'Create exception hierarchies for related errors.', complexity: 'O(1)', section: 'Custom Exceptions', example: `class APIError(Exception):
    """Base class for API errors"""
    pass

class AuthenticationError(APIError):
    """Failed to authenticate"""
    pass

class RateLimitError(APIError):
    """Too many requests"""
    def __init__(self, retry_after):
        self.retry_after = retry_after
        super().__init__(f"Rate limited, retry in {retry_after}s")

# Catch all API errors
try:
    raise RateLimitError(60)
except APIError as e:
    print(f"API Error: {e}")` },

  // Built-in Exceptions
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
