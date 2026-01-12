import type { Method } from '../../types'

// Enum - Type-Safe Enumerations
export const oopEnumMethods: Method[] = [
  { section: 'Enum Basics', signature: 'Enum', description: 'Type-safe enumerations. Members are unique, comparable only to same enum type.', complexity: 'O(1)', example: `from enum import Enum, auto

class Status(Enum):
    PENDING = auto()    # 1
    ACTIVE = auto()     # 2
    COMPLETED = auto()  # 3

# Type-safe comparisons
print(Status.PENDING == 1)  # False (not equal to int!)
print(Status.PENDING == Status.PENDING)  # True
print(Status.PENDING.value)  # 1
print(Status.PENDING.name)   # 'PENDING'

# Iteration over all members
for status in Status:
    print(f"{status.name}: {status.value}")

# Access by name or value
print(Status['ACTIVE'])  # Status.ACTIVE
print(Status(2))         # Status.ACTIVE` },

  { section: 'Enum Basics', signature: 'IntEnum', description: 'Enum that also behaves as int. Use when int compatibility needed.', complexity: 'O(1)', example: `from enum import IntEnum

class Priority(IntEnum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3

# Can compare with integers
print(Priority.LOW < 2)  # True
print(Priority.HIGH == 3)  # True

# Can use in math
print(Priority.LOW + Priority.MEDIUM)  # 3

# CAUTION: Loses type safety
# Regular Enum is usually better` },

  { section: 'Enum Variants', signature: 'Flag', description: 'Enum for bitwise operations. Combine multiple values with | operator.', complexity: 'O(1)', example: `from enum import Flag, auto

class Permission(Flag):
    READ = auto()     # 1
    WRITE = auto()    # 2
    EXECUTE = auto()  # 4

# Combine permissions
user_perms = Permission.READ | Permission.WRITE
print(user_perms)  # Permission.READ|WRITE

# Check permissions
print(Permission.READ in user_perms)  # True
print(Permission.EXECUTE in user_perms)  # False

# All or none
all_perms = Permission.READ | Permission.WRITE | Permission.EXECUTE
no_perms = Permission(0)` },

  { section: 'When to Use', signature: 'Enum vs Constants', description: 'Use Enum for fixed set of related values. Better than module constants for type safety and grouping.', complexity: 'Concept', example: `# BAD: Module constants
STATUS_PENDING = 1
STATUS_ACTIVE = 2
STATUS_DONE = 3

def process(status: int):  # No type safety
    if status == 1: ...     # Magic number

# GOOD: Enum
class Status(Enum):
    PENDING = auto()
    ACTIVE = auto()
    DONE = auto()

def process(status: Status):  # Type checked
    if status == Status.PENDING: ...  # Self-documenting

# WHEN TO USE ENUM:
# - Fixed set of related choices
# - Need type safety
# - Want IDE autocomplete
# - Config/state machines` },
]
