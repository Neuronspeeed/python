import type { Method } from '../../../types'

export const whyAndWhenMethods: Method[] = [
  { signature: 'Context managers vs try/finally', description: 'Context managers (with): for resources needing cleanup (files, locks). try/finally: for one-off cleanup. Prefer with for reusable patterns.', complexity: 'Concept', section: 'Why & When', example: `# ONE-OFF CLEANUP - try/finally
lock.acquire()
try:
    critical_section()
finally:
    lock.release()  # One-time cleanup

# REUSABLE RESOURCE - context manager
with open("file.txt") as f:
    process(f)
# File auto-closed

# Create context manager for reusable patterns
from contextlib import contextmanager

@contextmanager
def acquired(lock):
    lock.acquire()
    try:
        yield
    finally:
        lock.release()

# Now reusable!
with acquired(my_lock):
    critical_section()

# Use context manager when:
# - Resource needs cleanup (file, connection, lock)
# - Pattern repeats across codebase
# - Want to guarantee cleanup on error

# Use try/finally when:
# - One-off cleanup
# - Simple case, not worth extracting`, },
  { signature: 'Custom exceptions vs built-ins', description: 'Use built-ins when: error fits standard type (ValueError, TypeError). Custom when: need domain context, extra data, or exception hierarchy.', complexity: 'Concept', section: 'Why & When', example: `# USE BUILT-IN - error is standard
def parse_age(s):
    age = int(s)  # Raises ValueError
    if age < 0:
        raise ValueError("Age must be positive")
    return age

# USE CUSTOM - need domain context
class PaymentError(Exception):
    """Base for payment errors"""
    pass

class InsufficientFundsError(PaymentError):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"Need {amount}, have {balance}")

class PaymentProcessingError(PaymentError):
    def __init__(self, transaction_id, reason):
        self.transaction_id = transaction_id
        super().__init__(f"Transaction {transaction_id}: {reason}")

# Custom exceptions when:
# - Need to attach extra data (balance, transaction_id)
# - Need exception hierarchy (catch all PaymentError)
# - Building library/API (domain-specific errors)
# - Want type safety (isinstance checks)

# Built-in exceptions when:
# - Error is generic (invalid value, wrong type)
# - No extra context needed
# - Internal code (not public API)`, },
  { signature: 'contextlib.suppress - when to use', description: 'Use suppress when: error is expected and should be ignored, no logging needed. Avoid when: error indicates real problem.', complexity: 'Concept', section: 'Why & When', example: `from contextlib import suppress

# GOOD - expected, safe to ignore
with suppress(FileNotFoundError):
    os.remove("temp_file.txt")  # OK if missing

with suppress(KeyError):
    del cache["maybe_there"]  # OK if not in cache

# GOOD - cleanup, failure OK
with suppress(OSError):
    shutil.rmtree("temp_dir")  # Best effort cleanup

# BAD - error indicates real problem
with suppress(ValueError):
    user_id = int(request.data['id'])  # Invalid data!
# Should handle, not suppress

# BAD - lose debugging info
with suppress(Exception):  # Too broad!
    process_payment()
# Can't debug what went wrong

# Use suppress when:
# - Error is expected (file might not exist)
# - Silence is correct behavior
# - Best-effort cleanup (temp files)
# - No logging/handling needed

# Don't suppress when:
# - Error indicates bug or data issue
# - Need to log/report error
# - Catching too broad (Exception)`, },
  { signature: 'warnings vs exceptions', description: 'Warnings: deprecations, future behavior changes, non-fatal issues. Exceptions: errors that prevent continuation.', complexity: 'Concept', section: 'Why & When', example: `import warnings

# USE WARNING - deprecation
def old_api():
    warnings.warn(
        "old_api deprecated, use new_api",
        DeprecationWarning,
        stacklevel=2
    )
    return new_api()  # Still works

# USE WARNING - non-fatal issues
def save_config(path):
    if not path.endswith('.json'):
        warnings.warn("Config should be .json", UserWarning)
    # Continue anyway
    with open(path, 'w') as f:
        json.dump(config, f)

# USE EXCEPTION - fatal error
def load_config(path):
    if not os.path.exists(path):
        raise FileNotFoundError(f"Config not found: {path}")
    # Can't continue without config

# Warnings for:
# - Deprecation notices (old_api -> new_api)
# - Future behavior changes
# - Non-critical issues (code still works)
# - Development/debugging hints

# Exceptions for:
# - Errors preventing continuation
# - Invalid input that must be fixed
# - Resource failures (missing file, network down)
# - Contract violations (preconditions failed)

# Users can control warnings:
# warnings.filterwarnings("ignore")  # Silence
# warnings.filterwarnings("error")   # Convert to exception`, },
  { signature: 'Exception chaining - when to use "from"', description: 'Use "raise ... from ..." when: wrapping low-level errors in high-level context, maintaining error history. Shows cause in traceback.', complexity: 'Concept', section: 'Why & When', example: `# WITHOUT CHAINING - lose context
def load_user(user_id):
    try:
        data = db.query(f"SELECT * FROM users WHERE id={user_id}")
    except DatabaseError:
        raise ValueError(f"User {user_id} not found")
# Lost original DB error!

# WITH CHAINING - preserve context
def load_user(user_id):
    try:
        data = db.query(f"SELECT * FROM users WHERE id={user_id}")
    except DatabaseError as e:
        raise ValueError(f"User {user_id} not found") from e
# Shows: ValueError caused by DatabaseError

# IMPLICIT CHAINING - exception during handling
try:
    value = data['key']
except KeyError:
    print(value)  # NameError!
# Shows both KeyError and NameError

# SUPPRESS CHAINING - intentional replacement
try:
    old_operation()
except OldError:
    raise NewError() from None  # Hide old error

# Use "from" when:
# - Wrapping implementation errors (DB -> domain error)
# - Adding context while preserving history
# - Debugging needs full error chain

# Use "from None" when:
# - Replacing implementation details
# - Old error is noise (not helpful)

# Traceback shows:
# - Direct cause: raise X from Y
# - During handling: exception while handling exception
# - Suppressed: raise X from None`, },
]
