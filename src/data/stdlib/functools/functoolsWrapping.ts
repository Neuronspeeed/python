import type { Method } from '../../../types'

export const functoolsWrappingMethods: Method[] = [
  { signature: '@wraps()', description: 'Preserve function metadata when wrapping with decorator. Essential for debugging.', complexity: 'O(1)', section: 'Wrapping', example: `from functools import wraps
import time

# WITHOUT @wraps - loses original function info
def timer_bad(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Took {time.time() - start:.3f}s")
        return result
    return wrapper

# WITH @wraps - preserves function info
def timer_good(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Took {time.time() - start:.3f}s")
        return result
    return wrapper

@timer_good
def slow_function():
    """This is a slow function."""
    time.sleep(0.1)

print(slow_function.__name__)  # "slow_function" (not "wrapper")
print(slow_function.__doc__)   # "This is a slow function."

# Generic decorator template
def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Before
        result = func(*args, **kwargs)
        # After
        return result
    return wrapper` },

  { signature: 'singledispatch', description: 'Single-dispatch generic function. Method overloading based on first argument type.', complexity: 'O(1)', section: 'Wrapping', example: `from functools import singledispatch

@singledispatch
def process(data):
    """Default handler for unknown types."""
    raise NotImplementedError(f"Cannot process {type(data)}")

@process.register(int)
def _(data):
    return f"Integer: {data * 2}"

@process.register(str)
def _(data):
    return f"String: {data.upper()}"

@process.register(list)
def _(data):
    return f"List with {len(data)} items"

print(process(42))        # "Integer: 84"
print(process("hello"))   # "String: HELLO"
print(process([1, 2, 3])) # "List with 3 items"

# Type hints work too (Python 3.7+)
@process.register
def _(data: dict):
    return f"Dict with keys: {list(data.keys())}"

print(process({"a": 1}))  # "Dict with keys: ['a']"

# Check registered types
print(process.registry.keys())
# dict_keys([object, int, str, list, dict])` },
]
