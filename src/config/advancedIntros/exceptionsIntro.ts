export const exceptionsIntro = `Exception handling is Python's structured approach to dealing with runtime errors and exceptional conditions. Unlike error codes or sentinel values, exceptions provide a clean separation between error detection and error handling, enabling robust, readable code that gracefully handles failures without cluttering business logic with endless if checks.

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

THE FINALLY CLAUSE: ALWAYS executes—even if exception propagates, even if return/break in try/except.

\`\`\`python
def read_file(filename):
    f = open(filename)
    try:
        return f.read()  # Returns here...
    except Exception as e:
        log_error(e)
        return None      # ...or here...
    finally:
        f.close()        # ...but this ALWAYS runs first!

# Common use: cleanup resources
lock.acquire()
try:
    critical_section()
finally:
    lock.release()  # Guaranteed to release, even if exception
\`\`\`python

CONTEXT MANAGERS: The \`with\` statement is syntactic sugar for try/finally cleanup.

\`\`\`python
# Manual cleanup with try/finally
f = open("file.txt")
try:
    data = f.read()
finally:
    f.close()

# Automatic cleanup with context manager
with open("file.txt") as f:
    data = f.read()
# File automatically closed, even if exception!

# Multiple context managers
with open("input.txt") as infile, open("output.txt", "w") as outfile:
    outfile.write(infile.read())

# Custom context manager using __enter__ and __exit__
class Timer:
    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.time() - self.start
        print(f"Elapsed: {self.elapsed:.2f}s")
        return False  # Don't suppress exceptions

with Timer() as t:
    slow_operation()
# Prints elapsed time automatically
\`\`\`python

ASSERTION: Use \`assert\` for debugging and development checks, NOT production validation.

\`\`\`python
def calculate_average(numbers):
    assert len(numbers) > 0, "List cannot be empty"  # Debug check
    return sum(numbers) / len(numbers)

# Assertions can be DISABLED with python -O
# Never use for security checks or input validation!

# WRONG: using assert for validation
def withdraw(amount):
    assert amount > 0  # Can be disabled!

# RIGHT: using raise for validation
def withdraw(amount):
    if amount <= 0:
        raise ValueError("Amount must be positive")
\`\`\`python

PERFORMANCE IMPACT: Exceptions are expensive when raised but free when not raised.

\`\`\`python
# Exceptions are slow when raised (microseconds vs nanoseconds)
# Use for exceptional conditions, not control flow in hot loops

# SLOW: Exception in tight loop
total = 0
for i in range(1000000):
    try:
        total += 1 / i  # Raises ZeroDivisionError once
    except ZeroDivisionError:
        pass

# FAST: Check prevents exception
total = 0
for i in range(1000000):
    if i != 0:
        total += 1 / i

# But for rare exceptions, try/except is fine
try:
    with open(filename) as f:  # Fast path: file usually exists
        return f.read()
except FileNotFoundError:  # Rare: file missing is exceptional
    return default_content()
\`\`\`python

Cost breakdown:
- Setting up try block: nearly free (no overhead)
- Exception NOT raised: free (no cost)
- Exception raised: expensive (stack unwinding, traceback creation)

Rule: Use exceptions for exceptional conditions. For common cases, use if checks.

EXCEPTION HANDLING PATTERNS: Practical patterns for robust code.

**Pattern 1: Specific to General**
\`\`\`python
try:
    data = json.loads(text)
except json.JSONDecodeError:
    # Handle JSON-specific errors
    data = parse_fallback(text)
except ValueError:
    # Handle other value errors
    data = None
except Exception as e:
    # Catch-all for unexpected errors
    log_unexpected(e)
    raise
\`\`\`python

**Pattern 2: Multi-Exception Handler**
\`\`\`python
try:
    result = risky_operation()
except (KeyError, IndexError, TypeError) as e:
    # Handle any of these similarly
    result = default_value
\`\`\`python

**Pattern 3: Cleanup in Finally**
\`\`\`python
connection = create_connection()
try:
    perform_operations(connection)
except OperationError:
    connection.rollback()
    raise
else:
    connection.commit()
finally:
    connection.close()  # Always cleanup
\`\`\`python

**Pattern 4: Suppress Specific Errors**
\`\`\`python
try:
    os.remove(temp_file)  # Delete if exists
except FileNotFoundError:
    pass  # Already deleted, that's fine
\`\`\`python

**Pattern 5: Retry with Backoff**
\`\`\`python
import time

for attempt in range(3):
    try:
        response = api_call()
        break
    except ConnectionError:
        if attempt == 2:  # Last attempt
            raise
        time.sleep(2 ** attempt)  # Exponential backoff
\`\`\`python

EXCEPTION ANTI-PATTERNS: Common mistakes to avoid.

\`\`\`python
# ANTI-PATTERN 1: Bare except (catches Ctrl+C and sys.exit!)
try:
    do_something()
except:  # NEVER DO THIS
    pass

# FIX: Catch Exception, not everything
try:
    do_something()
except Exception:
    pass

# ANTI-PATTERN 2: Too broad try block
try:
    data = load_data()
    validate(data)
    process(data)
    save_results(data)
except Exception:
    # Which operation failed? We don't know!
    pass

# FIX: Narrow try blocks
data = load_data()
validate(data)

try:
    process(data)
except ProcessError:
    handle_process_error()

try:
    save_results(data)
except IOError:
    handle_save_error()

# ANTI-PATTERN 3: Silently swallowing errors
try:
    important_operation()
except Exception:
    pass  # Error disappears, impossible to debug!

# FIX: Log the error
try:
    important_operation()
except Exception as e:
    logger.error(f"Operation failed: {e}", exc_info=True)
    raise

# ANTI-PATTERN 4: Using exceptions for control flow
try:
    while True:
        item = next(iterator)
        process(item)
except StopIteration:
    pass  # Reached end

# FIX: Use for loop (Pythonic iteration)
for item in iterator:
    process(item)
\`\`\`python

BEST PRACTICES SUMMARY:

1. **Prefer EAFP over LBYL**: Try and catch exceptions instead of checking conditions first
2. **Catch specific exceptions**: \`except ValueError:\` not \`except Exception:\`
3. **Never use bare except**: Always \`except Exception:\` minimum
4. **Use else clause**: Separate success logic from error handling
5. **Always cleanup with finally**: Or use \`with\` statement for context managers
6. **Raise exceptions for errors**: Don't return error codes or None for failures
7. **Chain exceptions**: Use \`raise NewError from original\` to preserve context
8. **Custom exceptions**: Create domain-specific exception classes
9. **Log before re-raising**: Intercept, log with context, then \`raise\`
10. **Don't use assert for validation**: It can be disabled! Use \`raise\` instead`
