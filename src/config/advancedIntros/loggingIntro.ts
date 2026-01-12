export const loggingIntro = `Logging, debugging, and profiling are essential tools for building production-ready applications and optimizing performance. The \`logging\` module provides structured, leveled output that's configurable and persistent—far superior to \`print()\` for anything beyond simple scripts. Understanding how to properly log, debug, and profile your code is critical for maintainability, troubleshooting, and performance optimization.

LOGGING VS PRINT(): Why \`print()\` fails in production and why \`logging\` is the professional choice.

\`print()\` writes to stdout with no levels, no configuration, and no filtering—it's all-or-nothing output. Once your code is running in production, you can't easily disable prints without editing code. \`logging\` solves this with five severity levels (DEBUG, INFO, WARNING, ERROR, CRITICAL) that can be configured per-module, written to multiple destinations, formatted with timestamps/metadata, and toggled on/off without code changes.

\`\`\`python
# PRINT: All-or-nothing, no context, clutters output
print("User logged in")
print("Processing data...")
print("Error occurred!")  # How severe? What timestamp?

# LOGGING: Leveled, configurable, structured
import logging

logging.info("User logged in")          # Level: INFO
logging.debug("Processing data...")     # Level: DEBUG (hidden in prod)
logging.error("Error occurred!")        # Level: ERROR (always shown)

# Output includes timestamp, level, module:
# 2024-01-15 14:23:45 INFO User logged in
# 2024-01-15 14:23:46 ERROR Error occurred!
\`\`\`python

THE FIVE LOG LEVELS: Understanding when to use each level is critical for effective logging.

1. **DEBUG**: Detailed diagnostic information for developers. Use during development to trace execution flow, variable values, loop iterations. NEVER leave expensive debug logging in hot paths—it slows production! Typically disabled in production.

2. **INFO**: Confirmational messages that the system is working as expected. Use for: user actions (login, logout), business events (order placed, payment processed), system state changes (server started, connection established). Safe to leave in production—helps track normal operations.

3. **WARNING**: Something unexpected happened, but the program can continue. Use for: deprecated feature usage, recoverable errors (retry succeeded), configuration issues (using default values), resource concerns (disk 80% full). Investigate warnings—they often precede failures!

4. **ERROR**: A serious problem prevented a specific operation from completing. Use for: exceptions caught and handled, failed operations (couldn't save file, API call failed), data validation failures. Requires attention but system continues running.

5. **CRITICAL**: System failure or severe error requiring immediate action. Use for: application crash imminent, database connection lost, critical resource exhausted. Typically triggers alerts to on-call engineers.

\`\`\`python
# Real-world example: API request handler
def handle_api_request(user_id, data):
    logging.info(f"API request from user {user_id}")

    if not validate_data(data):
        logging.warning(f"Invalid data from user {user_id}, using defaults")
        data = get_defaults()

    try:
        result = process_data(data)
        logging.debug(f"Processed data: {result}")  # Verbose, disabled in prod
        return result
    except Exception as e:
        logging.error(f"Processing failed for user {user_id}: {e}", exc_info=True)
        return error_response()
\`\`\`python

BASIC LOGGING CONFIGURATION: Set up logging with \`basicConfig()\` for simple cases, or use \`logging.config\` for complex setups.

\`\`\`python
import logging

# Simple setup: console output with level and format
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Now all logging calls work:
logging.info("Application started")
logging.error("Something went wrong")

# Output:
# 2024-01-15 14:30:15,123 - root - INFO - Application started
# 2024-01-15 14:30:16,456 - root - ERROR - Something went wrong
\`\`\`python

Format String Keys (Common):
- \`%(asctime)s\`: Timestamp (2024-01-15 14:30:15)
- \`%(name)s\`: Logger name (usually module name)
- \`%(levelname)s\`: Level (INFO, ERROR, etc.)
- \`%(message)s\`: Your log message
- \`%(filename)s\`: Source file
- \`%(lineno)d\`: Line number
- \`%(funcName)s\`: Function name

HANDLERS: Where logs go (console, file, network, etc.).

Handlers determine log destinations. One logger can have multiple handlers (e.g., console + file). Each handler can have its own level and format.

\`\`\`python
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)  # Logger level: minimum to consider

# Handler 1: Console (only WARNING+)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.WARNING)
console_handler.setFormatter(logging.Formatter('%(levelname)s: %(message)s'))

# Handler 2: File (DEBUG+, everything)
file_handler = logging.FileHandler('app.log')
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
))

logger.addHandler(console_handler)
logger.addHandler(file_handler)

# Now logs go to both destinations:
logger.debug("Debug message")   # → File only (below WARNING)
logger.info("Info message")     # → File only
logger.warning("Warning!")      # → Console + File (WARNING+)
\`\`\`python

Common Handler Types:
- \`StreamHandler()\`: Console output (stdout/stderr)
- \`FileHandler(filename)\`: Write to file
- \`RotatingFileHandler(filename, maxBytes, backupCount)\`: Auto-rotate when file reaches size limit
- \`TimedRotatingFileHandler(filename, when='midnight')\`: Rotate daily/hourly/etc.
- \`SMTPHandler\`: Email logs (for CRITICAL alerts)
- \`HTTPHandler\`: Send logs to web server

LOGGERS: Per-module loggers for better organization.

\`\`\`python
# In module1.py:
import logging
logger = logging.getLogger(__name__)  # Logger named "module1"

def func():
    logger.info("Called func in module1")

# In module2.py:
import logging
logger = logging.getLogger(__name__)  # Logger named "module2"

def func():
    logger.info("Called func in module2")

# Configure separately:
logging.getLogger("module1").setLevel(logging.DEBUG)  # Verbose
logging.getLogger("module2").setLevel(logging.WARNING)  # Quiet
\`\`\`python

Logger Hierarchy: Loggers form a tree based on names. \`app.db.query\` is a child of \`app.db\` which is a child of \`app\`. Child loggers inherit configuration from parents unless overridden.

STRUCTURED LOGGING: Modern approach using key-value pairs instead of formatted strings.

\`\`\`python
import logging

# OLD: String formatting (hard to parse)
logging.info(f"User {user_id} placed order {order_id} for \\$99.99")

# BETTER: Lazy % formatting (parameters not evaluated if log filtered)
logging.info("User %s placed order %s for $%s", user_id, order_id, amount)

# BEST: Structured logging (machine-readable, searchable)
import structlog
logger = structlog.get_logger()
logger.info("order_placed", user_id=user_id, order_id=order_id, amount=amount)

# Output: JSON for log aggregation tools (Elasticsearch, Splunk)
# {"event": "order_placed", "user_id": 123, "order_id": 456, "amount": 99.99, "timestamp": "2024-01-15T14:30:15"}
\`\`\`python

DEBUGGING WITH PDB: Python's built-in debugger for interactive code inspection.

\`breakpoint()\` (Python 3.7+) is the modern way to drop into the debugger:

\`\`\`python
def buggy_function(data):
    result = process_data(data)
    breakpoint()  # Execution pauses here!
    return result

# When breakpoint() hits, you get interactive prompt:
# (Pdb) print(data)
# (Pdb) print(result)
# (Pdb) n  # Next line
# (Pdb) s  # Step into function
# (Pdb) c  # Continue execution
\`\`\`python

Common PDB Commands:
- \`n\` (next): Execute next line
- \`s\` (step): Step into function call
- \`c\` (continue): Continue until next breakpoint
- \`l\` (list): Show current code location
- \`p var\` (print): Print variable value
- \`pp var\`: Pretty-print variable
- \`w\` (where): Show stack trace
- \`u\`/\`d\`: Navigate up/down stack frames
- \`q\` (quit): Exit debugger

Post-Mortem Debugging: Debug after an exception crashes your program:

\`\`\`python
import pdb

try:
    buggy_function()
except:
    pdb.post_mortem()  # Drop into debugger at exception point
\`\`\`python

PERFORMANCE PROFILING WITH TIMEIT: Accurate micro-benchmarking for comparing implementations.

\`timeit\` runs code millions of times and reports execution time—essential for proving O(n) vs O(n²) performance:

\`\`\`python
import timeit

# Compare list vs generator comprehension
setup = "data = range(1000)"

list_time = timeit.timeit("[x**2 for x in data]", setup=setup, number=10000)
gen_time = timeit.timeit("list(x**2 for x in data)", setup=setup, number=10000)

print(f"List comp: {list_time:.4f}s")  # ~0.45s
print(f"Generator: {gen_time:.4f}s")   # ~0.52s
# List comp slightly faster for small data (pre-sized allocation)

# For one-liners, use -m timeit from command line:
# python -m timeit "[x**2 for x in range(1000)]"
\`\`\`python

Best Practices:
- Use \`number=\` parameter to control iterations (default: 1 million)
- Use \`repeat=\` to run multiple trials, take minimum (most stable)
- Run on same machine, close other programs
- Warm up code first (JIT compilation)
- Measure multiple input sizes to confirm complexity

PROFILING WITH CPROFILE: Find performance bottlenecks in real programs.

\`cProfile\` shows where your program spends time—which functions are slow and how often they're called:

\`\`\`python
import cProfile
import pstats

# Profile a function
cProfile.run('my_function()', 'profile_stats')

# Analyze results
stats = pstats.Stats('profile_stats')
stats.strip_dirs()
stats.sort_stats('cumulative')  # Sort by cumulative time
stats.print_stats(10)  # Top 10 slowest functions

# Output shows:
# - ncalls: how many times called
# - tottime: time in function (excluding subcalls)
# - cumtime: total time (including subcalls)
# - filename:lineno(function): where defined
\`\`\`python

MEMORY PROFILING: Track memory usage and find leaks.

\`\`\`python
import sys

# Quick size check:
x = list(range(1000000))
print(f"Size: {sys.getsizeof(x) / 1024:.2f} KB")  # Size of list object
# NOTE: Doesn't count referenced integers! Use tracemalloc for full picture.

# Detailed memory tracing:
import tracemalloc

tracemalloc.start()
# ... code to profile ...
snapshot = tracemalloc.take_snapshot()
top_stats = snapshot.statistics('lineno')

print("Top 10 memory allocations:")
for stat in top_stats[:10]:
    print(stat)
# Shows: filename:line, size, count of allocations
\`\`\`python

WHEN TO USE WHAT:

Use **logging** for:
- Production applications tracking events
- Long-running services (web servers, daemons)
- Libraries (let users configure logging)
- Debugging in production (can't use \`print()\`)

Use **\`print()\`** for:
- Quick debugging during development
- Simple scripts run once
- Output that IS the program's purpose (CLI tools)

Use **pdb/breakpoint()** for:
- Understanding complex control flow
- Inspecting state at specific point
- Stepping through unfamiliar code
- When print debugging isn't enough

Use **timeit** for:
- Comparing two implementations (which is faster?)
- Micro-benchmarks (sub-millisecond timing)
- Proving algorithmic complexity (O(n) vs O(n²))

Use **cProfile** for:
- Finding slow functions in real programs
- Understanding overall performance profile
- Before optimization (measure first!)

Use **tracemalloc** for:
- Finding memory leaks
- Understanding memory usage patterns
- Optimizing memory-intensive code

COMMON GOTCHAS:

1. **Forgetting to configure logging**: Without \`basicConfig()\`, default level is WARNING—you won't see INFO/DEBUG logs!

2. **Expensive logging in hot paths**: \`logging.debug(f"Value: {expensive_call()}")\` evaluates \`expensive_call()\` even if DEBUG is disabled! Use lazy formatting: \`logging.debug("Value: %s", expensive_call())\`

3. **Leaving debug logging in production**: Debug logs in tight loops (million iterations/sec) can slow code 10-100x. Disable or remove.

4. **Not using \`exc_info=True\`**: When logging exceptions, \`logging.error("Error occurred", exc_info=True)\` includes full stack trace—essential for debugging!

5. **timeit gotchas**: Results vary wildly between runs (GC, OS scheduling). Always use \`repeat=\` and take minimum, not average!

BEST PRACTICES SUMMARY:

- Use \`logging\` for all production code, never \`print()\`
- Configure logging once at application entry point
- Use appropriate log levels: DEBUG for trace, INFO for events, WARNING for unexpected, ERROR for failures
- Include context: user IDs, request IDs, transaction IDs
- Use lazy formatting for performance: \`logger.info("User %s", user_id)\`
- Add \`exc_info=True\` when logging exceptions
- Rotate log files to prevent filling disk
- Use structured logging (JSON) for log aggregation tools
- Profile before optimizing—measure, don't guess!
- Use \`timeit\` for micro-benchmarks, \`cProfile\` for whole-program profiling`
