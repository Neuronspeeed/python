export const modulesIntroPart2 = `

CIRCULAR IMPORTS: The classic gotcha.

Circular imports happen when module A imports B, and B imports A. This often causes \`AttributeError\` or \`ImportError\`.

\`\`\`python
# a.py
from b import foo  # Import from b
def bar():
    return "bar"

# b.py
from a import bar  # Import from a - CIRCULAR!
def foo():
    return "foo"

# main.py
import a  # ImportError: cannot import name 'bar' from partially initialized module 'a'
\`\`\`python

Why It Fails:
1. main.py imports a
2. a.py tries to import from b
3. b.py tries to import from a (but a isn't finished initializing!)
4. Error!

Solutions:

1. **Restructure** (best): Move shared code to a third module
\`\`\`python
# shared.py
def bar():
    return "bar"

# a.py
from shared import bar

# b.py
from shared import bar
\`\`\`python

2. **Import inside function** (defer import until needed):
\`\`\`python
# a.py
def bar():
    from b import foo  # Import when function is CALLED, not at module load
    return foo()
\`\`\`python

3. **Import at bottom** (after definitions):
\`\`\`python
# a.py
def bar():
    return "bar"

from b import foo  # Import AFTER defining bar
\`\`\`python

MODULE RELOADING: For interactive development.

By default, modules are cached in sys.modules. Changes to source files don't take effect until you restart Python. For interactive development, use \`importlib.reload()\`:

\`\`\`python
import mymodule
mymodule.some_function()

# Edit mymodule.py in your editor, save changes...

# Regular import won't see changes:
import mymodule  # Uses cached version!

# Reload to see changes:
import importlib
importlib.reload(mymodule)  # Re-executes mymodule.py
mymodule.some_function()    # Now uses new code
\`\`\`python

Reload Gotchas:
- Objects created from OLD module still use old code
- \`from module import name\` doesn't see reloaded changes (still references old object)
- Reload is for development only—production code should restart

THE __name__ == "__main__" PATTERN: Script vs module mode.

Every module has a \`__name__\` attribute:
- When imported: \`__name__\` is the module name
- When run as script: \`__name__\` is \`"__main__"\`

\`\`\`python
# mymodule.py
def greet(name):
    return f"Hello, {name}"

# This only runs when script is executed directly:
if __name__ == "__main__":
    # Test code, CLI interface, demos
    print(greet("World"))
    import doctest
    doctest.testmod()

# When imported, __name__ is "mymodule", so this block is skipped
\`\`\`python

Use Cases:
- Self-testing code
- CLI interfaces
- Example usage demonstrations
- Running benchmarks

PRIVACY CONVENTIONS: Marking internal implementation.

Python has no true private members, but conventions signal "this is internal, don't use":

\`\`\`python
# mymodule.py
PUBLIC_CONSTANT = 42
_internal_helper = "not for export"

def public_function():
    return _internal_helper()

def _internal_function():
    return "internal"

# from mymodule import * will NOT import:
# - _internal_helper
# - _internal_function
# But they're still accessible via mymodule._internal_function
\`\`\`python

Control \`from module import *\` with \`__all__\`:

\`\`\`python
# mymodule.py
__all__ = ['public_function', 'PUBLIC_CONSTANT']

PUBLIC_CONSTANT = 42
ANOTHER_CONSTANT = 99  # Not in __all__

def public_function():
    pass

def another_function():  # Not in __all__
    pass

# from mymodule import * will ONLY import:
# - public_function
# - PUBLIC_CONSTANT
\`\`\`python

NAMESPACE PACKAGES (PEP 420): Packages without __init__.py.

Python 3.3+ allows packages without \`__init__.py\`. Useful for splitting a package across multiple directories:

\`\`\`python
site-packages/
    mynamespace/
        plugin1.py
    another-location/
        mynamespace/
            plugin2.py

# Both directories contribute to 'mynamespace' package
import mynamespace.plugin1
import mynamespace.plugin2
\`\`\`python

Use for: Plugin systems, splitting packages across repos.

BEST PRACTICES SUMMARY:

- Use absolute imports for clarity (\`from myproject.utils import helper\`)
- Prefer \`import module\` over \`from module import *\`
- NEVER shadow stdlib module names (random.py, string.py, etc.)
- Use \`if __name__ == "__main__":\` for script code
- Mark internal implementation with leading underscore
- Define \`__all__\` to control \`from module import *\`
- Avoid circular imports by refactoring shared code
- Use packages (__init__.py) to organize related modules
- Keep sys.path manipulation to a minimum
- Document dependencies (requirements.txt, setup.py)

COMMON GOTCHAS:

1. **Shadowing stdlib**: Local \`random.py\` shadows stdlib \`random\`
2. **Circular imports**: A imports B, B imports A
3. **Mutable default arguments persist across imports**: Module-level \`cache = []\` is shared!
4. **\`from...import\` doesn't see reloads**: Reload doesn't update already-imported names
5. **Relative imports in scripts**: Relative imports only work inside packages
6. **Case sensitivity**: \`MyModule.py\` vs \`mymodule.py\` can cause issues on case-insensitive filesystems
7. **Module executed twice**: Running a package module as script breaks relative imports

REAL-WORLD PATTERN: Structured project.

\`\`\`python
myproject/
    __init__.py           # Empty or exports main API
    __main__.py           # python -m myproject runs this
    cli.py                # Command-line interface
    core/
        __init__.py       # Expose core.api
        api.py            # Public API
        _internal.py      # Private implementation
    utils/
        __init__.py
        helpers.py
    tests/
        __init__.py
        test_api.py
    setup.py              # Package metadata
    README.md
    requirements.txt
\`\`\`python

\`\`\`python
# myproject/__init__.py
from .core.api import main_function
from .utils.helpers import helper

__all__ = ['main_function', 'helper']
__version__ = '1.0.0'

# Users can do:
from myproject import main_function
\`\`\`\``
