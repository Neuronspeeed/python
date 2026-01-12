export const exceptionsIntroPart1 = `Exception handling is Python's structured approach to dealing with runtime errors and exceptional conditions. Unlike error codes or sentinel values, exceptions provide a clean separation between error detection and error handling, enabling robust, readable code that gracefully handles failures without cluttering business logic with endless if checks.

EXCEPTION PHILOSOPHY: Python follows the EAFP principle—"Easier to Ask for Forgiveness than Permission." Instead of checking if an operation is safe before attempting it (LBYL: Look Before You Leap), Python encourages trying the operation and catching exceptions if it fails. This approach is more Pythonic, faster (one try/except vs multiple checks), and handles race conditions better.

\`\`\`python
# LBYL: Look Before You Leap (defensive, verbose)
if key in dictionary:
    value = dictionary[key]
else:
    value = default

if os.path.exists(filename):
    with open(filename) as f:
        data = f.read()

# EAFP: Easier to Ask for Forgiveness than Permission (Pythonic!)
try:
    value = dictionary[key]
except KeyError:
    value = default

try:
    with open(filename) as f:
        data = f.read()
except FileNotFoundError:
    handle_missing_file()
\`\`\`python

Why EAFP wins: (1) Atomic—no race condition between check and use. (2) Faster—one operation instead of check + operation. (3) More readable—exception handling is separate from main logic. (4) Handles unexpected errors—what if file exists but lacks read permission?

TRY/EXCEPT/ELSE/FINALLY STRUCTURE: The complete try statement has four clauses with strict ordering.

\`\`\`python
try:
    # Code that might raise exceptions
    result = risky_operation()
except SpecificError as e:
    # Handle specific exception type
    handle_error(e)
except (TypeError, ValueError) as e:
    # Handle multiple exception types
    handle_type_or_value_error(e)
except Exception as e:
    # Catch-all for unexpected errors (use sparingly!)
    log_unexpected_error(e)
else:
    # Runs ONLY if NO exception occurred in try block
    # Don't put this code in try—keeps except handlers focused
    process_success(result)
finally:
    # ALWAYS runs—even if exception, even if return/break
    # Cleanup: close files, release locks, restore state
    cleanup_resources()
\`\`\`python

Key Rules:
- Order must be: try → except(s) → else → finally
- Must have at least one except OR a finally
- Else runs only if try completes with NO exception
- Finally ALWAYS runs (even if exception propagates up)
- Catch specific exceptions first, general exceptions last

THE EXCEPTION HIERARCHY: Python's built-in exceptions form an inheritance tree. Catching a parent class catches ALL its subclasses.

\`\`\`python
BaseException                    # Don't catch this! System exits inherit from it
├── SystemExit                   # sys.exit() raises this
├── KeyboardInterrupt            # Ctrl+C raises this
├── GeneratorExit               # generator.close() raises this
└── Exception                    # Catch this for "normal" errors
    ├── StopIteration           # Iteration complete
    ├── ArithmeticError
    │   ├── ZeroDivisionError   # Division by zero
    │   ├── OverflowError       # Result too large
    │   └── FloatingPointError
    ├── LookupError
    │   ├── IndexError          # Index out of range
    │   └── KeyError            # Dict key not found
    ├── ValueError              # Right type, wrong value
    ├── TypeError               # Wrong type
    ├── AttributeError          # Attribute doesn't exist
    ├── NameError               # Variable not defined
    ├── OSError                 # Operating system error
    │   ├── FileNotFoundError   # File doesn't exist
    │   ├── PermissionError     # Insufficient permissions
    │   └── IOError             # I/O operation failed
    └── RuntimeError            # Generic runtime error
\`\`\`python

CRITICAL: NEVER use bare \`except:\` or \`except BaseException:\`—this catches SystemExit (sys.exit()) and KeyboardInterrupt (Ctrl+C), making your program impossible to stop! Use \`except Exception:\` for catch-all handlers.

\`\`\`python
# WRONG: Catches EVERYTHING including Ctrl+C and sys.exit()
try:
    do_something()
except:  # or except BaseException:
    pass  # User can't stop program with Ctrl+C!

# CORRECT: Catch only "normal" errors
try:
    do_something()
except Exception as e:
    handle_error(e)  # Ctrl+C and sys.exit() still work
\`\`\`python

COMMON EXCEPTION TYPES: Understanding when each exception is raised helps you write targeted handlers.

**KeyError**: Accessing missing dictionary key
\`\`\`python
data = {"name": "Alice"}
try:
    age = data["age"]  # Raises KeyError
except KeyError:
    age = None  # Or use data.get("age")
\`\`\`python

**IndexError**: List/tuple index out of range
\`\`\`python
items = [1, 2, 3]
try:
    item = items[10]  # Raises IndexError
except IndexError:
    item = None
\`\`\`python

**ValueError**: Correct type but invalid value
\`\`\`python
try:
    number = int("not a number")  # Raises ValueError
except ValueError:
    number = 0
\`\`\`python

**TypeError**: Wrong type for operation
\`\`\`python
try:
    result = "5" + 5  # Raises TypeError (can't add str + int)
except TypeError:
    result = "5" + str(5)
\`\`\`python

**FileNotFoundError**: File doesn't exist
\`\`\`python
try:
    with open("missing.txt") as f:
        data = f.read()
except FileNotFoundError:
    data = ""
\`\`\`python

**AttributeError**: Object lacks attribute
\`\`\`python
try:
    length = obj.length  # obj has no 'length' attribute
except AttributeError:
    length = len(obj)  # Try len() instead
\`\`\`python

RAISING EXCEPTIONS: Use \`raise\` to signal errors in your own code.

\`\`\`python
def withdraw(balance, amount):
    if amount > balance:
        raise ValueError(f"Insufficient funds: {balance} < {amount}")
    return balance - amount

# Re-raise current exception (intercept, log, pass up)
try:
    risky_operation()
except Exception as e:
    log_error(e)
    raise  # Re-raise same exception (preserves traceback)

# Raise new exception
try:
    process_data()
except ValueError as e:
    raise RuntimeError("Processing failed") from e  # Chain exceptions
\`\`\`python

EXCEPTION CHAINING: Use \`raise ... from ...\` to preserve context when wrapping exceptions.

\`\`\`python
# WITHOUT chaining: loses context
try:
    data = json.loads(text)
except json.JSONDecodeError:
    raise ValueError("Invalid data")  # Original error is lost!

# WITH chaining: preserves context
try:
    data = json.loads(text)
except json.JSONDecodeError as e:
    raise ValueError("Invalid data") from e
# Traceback shows BOTH errors:
#   JSONDecodeError: ... (original)
#   ValueError: Invalid data (wrapper)

# Suppress context with "from None"
try:
    data = json.loads(text)
except json.JSONDecodeError:
    raise ValueError("Invalid data") from None  # Hide original error
\`\`\`python

CUSTOM EXCEPTIONS: Create domain-specific exceptions for your application.

\`\`\`python
# Simple custom exception
class ValidationError(Exception):
    """Raised when data validation fails"""
    pass

# Exception with extra state
class HTTPError(Exception):
    def __init__(self, status_code, message):
        self.status_code = status_code
        self.message = message
        super().__init__(f"{status_code}: {message}")

# Exception hierarchy for fine-grained handling
class DatabaseError(Exception):
    """Base class for database errors"""
    pass

class ConnectionError(DatabaseError):
    """Cannot connect to database"""
    pass

class QueryError(DatabaseError):
    """SQL query failed"""
    pass

# Usage
try:
    execute_query(sql)
except ConnectionError:
    reconnect()
except QueryError as e:
    log_invalid_query(e)
except DatabaseError:  # Catches both subclasses
    alert_admin()
\`\`\`python

THE ELSE CLAUSE: Runs only if try completes with NO exception. Keeps success logic separate from error handling.

\`\`\`python
# WITHOUT else: success code mixed with risky code
try:
    data = load_data()
    process(data)  # If this raises, except catches it (confusing!)
except IOError:
    handle_load_error()

# WITH else: clean separation
try:
    data = load_data()
except IOError:
    handle_load_error()
else:
    process(data)  # Only runs if load succeeded
    # If process() raises, it propagates up (clearer!)
\`\`\`python
`
