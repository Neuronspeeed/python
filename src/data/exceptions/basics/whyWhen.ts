import type { Method } from '../../../types'

export const whyWhenMethods: Method[] = [
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
]
