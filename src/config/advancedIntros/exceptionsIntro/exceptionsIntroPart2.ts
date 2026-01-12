export const exceptionsIntroPart2 = `

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
