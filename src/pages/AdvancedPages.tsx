import { TypePage } from '../components/TypePage'
import { documentationMethods } from '../data/documentationMethods'
import { modulesMethods } from '../data/modules'
import { exceptionsMethods } from '../data/exceptions'
import { loggingMethods } from '../data/logging'
import { concurrencyMethods } from '../data/concurrency'

const documentationIntro = `Documentation in Python ranges from simple comments to rich external tools. While technically optional, good documentation is essential for maintainable code.

Comments (#): The most basic form—Python ignores text after the hash mark. Best for small-scale implementation notes explaining "why" rather than "what." Current best practice limits these to internal notes rather than broad functional descriptions.

dir() Function: A "memory jogger" that lists all attribute names available on an object but provides no descriptions. Call it on modules, types (str, list), or instances. Results include dunder methods (__add__, __len__) which can be filtered with list comprehensions.

Docstrings (__doc__): String literals at the top of modules or after def/class headers. Python saves these in the __doc__ attribute for runtime inspection. Triple-quoted blocks are standard for multiline text. In Python 3.12+, use raw strings (r'''...''') to avoid backslash escape warnings.

help() and Pydoc: The help() built-in provides a programmer-friendly interface to Python's documentation system. It extracts docstrings and renders them as readable text. Pydoc can also generate HTML reports or run a local documentation server.

External Tools: For larger projects, Sphinx is the standard for generating rich documentation from reStructuredText or Markdown. Type hints also serve as inline documentation, validated by tools like mypy.`

export function DocumentationPage() {
  return (
    <TypePage
      type="Documentation" badge="doc" color="var(--accent-logging)"
      description="Tools for documenting Python code: comments, docstrings, dir(), help(), and external tools."
      intro={documentationIntro}
      tip={`List methods? dir(obj)
Get detailed help? help(obj.method)
Access docstring? obj.__doc__`}
      methods={documentationMethods}
    />
  )
}

const modulesIntro = `Modules are Python's highest layer of program architecture. Every .py file is automatically a module—no special syntax required. Think of a module as a "Physical File-to-Logical Namespace mapping": wrapping code in a .py file creates a protected environment for your variables.

Namespaces & Encapsulation: A module is a package of variable names. All top-level assignments (outside def/class) become module attributes. Each module is a separate namespace, so a variable \`x\` in one module doesn't conflict with \`x\` in another. This automatic encapsulation is a core strength of Python's module system.

Import vs From: The \`import\` statement loads a module as an object—access contents via dot syntax (\`module.name\`), preserving the namespace. The \`from\` statement copies specific names into your scope, collapsing the namespace. Use \`from module import *\` sparingly—it pollutes your namespace and makes code harder to trace.

Import Mechanics: Import is a three-step process on first load: (1) find the file on sys.path, (2) compile to bytecode, (3) execute top-to-bottom to create attributes. Subsequent imports reuse the cached module object. Use \`importlib.reload()\` to re-run module code—but note that objects already imported with \`from\` still reference old versions.

Module Search Path: Python searches sys.path in order: script directory, PYTHONPATH, standard library, site-packages. First match wins. A local file named "math.py" shadows the stdlib math module!

Packages: Directories containing __init__.py become packages. The __init__.py runs on import and can expose submodule contents. Use relative imports (from . import x) within packages to avoid name conflicts.

Privacy Convention: Names starting with underscore (_internal) are not copied by \`from module import *\`. This is Python's convention for marking implementation details as private.`

export function ModulesPage() {
  return (
    <TypePage
      type="Modules" badge="import" color="var(--accent-concurrency)"
      description="Import mechanics, bytecode, packages, and program architecture."
      intro={modulesIntro}
      tip={`Script or imported? if __name__ == "__main__"
Where's the module? module.__file__
Add import path? sys.path.append()`}
      methods={modulesMethods}
    />
  )
}

const exceptionsIntro = `EXCEPTION CONCEPT: Exceptions are a high-level control flow device—a structured "go-to" that lets a program jump immediately from the point of an error to a handler, abandoning all active functions in between. They're triggered automatically by Python on runtime errors (like dividing by zero) but can also be raised manually by your code.

ROLES OF EXCEPTIONS: (1) Error Handling—wrap risky code in try blocks instead of cluttering with endless if checks. (2) Event Notification—signal conditions like "search failed" across library boundaries without passing result flags. (3) Termination Actions—try/finally guarantees cleanup regardless of errors. (4) Control Flow—jump out of multiple nested loops instantly.

TRY STATEMENT STRUCTURE: A single try can combine all clauses. Order must be: \`try\` → \`except\` → \`else\` → \`finally\`. You need at least one except or a finally. Catch specific exceptions (\`except IndexError:\`), multiple (\`except (IndexError, TypeError):\`), or all (\`except Exception:\`—use with caution). Access the instance with \`as\` (\`except IndexError as e:\`).

ELSE CLAUSE: Runs only if no exception occurred in try. Better than putting success code inside try because it prevents the except handler from accidentally catching an exception raised by the success logic itself. Logically separates "guarding against errors" from "processing the result."

FINALLY CLAUSE: Always executes on the way out—whether an exception was raised, handled, or not raised at all. Standard idiom for cleanup: closing files, releasing connections, ensuring resources are freed even if code crashes.

RAISE STATEMENT: \`raise IndexError('message')\` triggers manually. Bare \`raise\` inside except re-raises the active exception (intercept, log, then pass up). Exception chaining: \`raise NewError from original\` preserves context of original error.

ASSERT STATEMENT: \`assert test, message\` raises AssertionError if test is false. Development/debugging tool for internal self-checks. Can be disabled with \`python -O\` (optimize flag)—don't use for production validation!

WITH STATEMENT: Alternative to try/finally for context managers. Automatically calls \`__enter__\` on entry and \`__exit__\` on exit (even if exception occurs). \`with open('file') as f:\` closes file automatically—no explicit finally needed.

EXCEPTIONS ARE CLASS INSTANCES: All exceptions are class instance objects. User-defined exceptions must inherit from Exception (or BaseException). Because they're classes, you can define \`__init__\` to store extra state (error codes, filenames) and methods for exception-specific behavior.

EXCEPTION HIERARCHIES: Organize exceptions into inheritance trees—superclass represents general category, subclasses represent specific errors. \`except GeneralError:\` catches that class AND all subclasses. Add new specific errors without changing existing handlers.

NESTING & PROPAGATION: try statements stack at runtime (physically nested or via function calls). When raised, Python searches newest-to-oldest for matching except. If no match, exception propagates up to caller—continues until handled or default handler stops the program. All finally blocks execute during unwinding.

EXCEPTION IDIOMS: Break nested loops instantly (raise exception instead of flag variables). Signal conditions like "search failed" across function boundaries without return codes. Default traceback is often the primary debugging tool.

DESIGN TIPS: Wrap only the code that might raise the specific exception. Avoid bare \`except:\`—catches system exits and Ctrl+C. Use \`except Exception:\` for standard errors. Balance granularity: not every line in try, not entire program in one try.`

export function ExceptionsPage() {
  return (
    <TypePage
      type="Exceptions" badge="try" color="var(--accent-exceptions)"
      description="Exception handling in Python. Try/except for graceful error handling, raise for signaling errors."
      intro={exceptionsIntro}
      tip={`Key might be missing? try/except KeyError
Catch all errors? Never bare except:
Cleanup always needed? finally block`}
      methods={exceptionsMethods}
    />
  )
}

const loggingIntro = `Logging: The \`logging\` module provides leveled output (DEBUG, INFO, WARNING, ERROR, CRITICAL) that can be configured to write to files, include timestamps, and be disabled in production. Unlike \`print()\`, logging is configurable per-module and designed for long-running applications.

Debugging: Python's built-in debugger \`pdb\` lets you step through code, inspect variables, and set breakpoints. Use \`breakpoint()\` (Python 3.7+) to drop into the debugger at any point. Post-mortem debugging with \`pdb.pm()\` lets you inspect state after an exception.

Performance Profiling: The \`timeit\` module measures code execution time accurately. Use \`timeit.repeat()\` to run multiple trials and take the minimum (most reliable). The \`cProfile\` module shows where your code spends time.

Benchmarking Insights: Results depend on Python version and hardware—never assume, always measure. Key findings: comprehensions run ~2x faster than manual loops (iterations at C speed), file iterators beat \`readlines()\` which beats \`while\` loops, and \`math.sqrt()\` outperforms \`** 0.5\` and \`pow()\`.

Memory Profiling: \`sys.getsizeof()\` shows object size in bytes (but not referenced objects). \`tracemalloc\` traces memory allocations to find leaks and high-consumption code.`

export function LoggingPage() {
  return (
    <TypePage
      type="Logging & Debug" badge="log" color="var(--accent-logging)"
      description="Logging, debugging, and profiling in Python. Better than print for production code."
      intro={loggingIntro}
      tip={`Quick debug print? print(f"{var=}")
Step through code? breakpoint()
Prove O(n) vs O(n²)? timeit.timeit()`}
      methods={loggingMethods}
    />
  )
}

const concurrencyIntro = `Python offers three main concurrency models, each suited to different workloads. The GIL (Global Interpreter Lock) is the key constraint to understand.

The GIL: CPython's GIL allows only one thread to execute Python bytecode at a time. This means threads don't speed up CPU-bound code—but they DO help I/O-bound code because the GIL is released during I/O waits.

Threading: Best for I/O-bound tasks (network requests, file operations). Threads share memory, making communication easy but requiring locks for shared state. Use \`threading.Thread\` or \`concurrent.futures.ThreadPoolExecutor\`.

Multiprocessing: Best for CPU-bound tasks (computation, data processing). Each process has its own Python interpreter and memory space, bypassing the GIL. Use \`multiprocessing.Pool\` or \`ProcessPoolExecutor\`.

Async/Await: Best for many concurrent I/O operations (web servers, API calls). Single-threaded but non-blocking—uses cooperative multitasking. Requires \`async def\` functions and \`await\` for I/O operations.

Choosing: I/O-bound with few tasks → threading. I/O-bound with many tasks → async. CPU-bound → multiprocessing.`

export function ConcurrencyPage() {
  return (
    <TypePage
      type="Concurrency" badge="async" color="var(--accent-concurrency)"
      description="Concurrent and parallel programming in Python. Threading, multiprocessing, and async/await."
      intro={concurrencyIntro}
      tip={`I/O-bound (network, files)? Threading
CPU-bound (computation)? Multiprocessing
Many concurrent I/O ops? async/await`}
      methods={concurrencyMethods}
    />
  )
}
