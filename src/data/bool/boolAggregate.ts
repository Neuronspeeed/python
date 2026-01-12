import type { Method } from '../../types'

export const boolAggregate: Method[] = [
  { section: 'Aggregate Functions', signature: 'all(iterable)', description: 'Returns True if ALL elements are truthy (or iterable is empty). Short-circuits at first False.', complexity: 'O(n)', example: `# Basic usage
print(all([True, True, True]))   # True
print(all([True, False, True]))  # False (stops at False)
print(all([]))                   # True (empty = vacuous truth)

# Validation - check all conditions
ages = [18, 21, 25, 30]
print(all(age >= 18 for age in ages))  # True

# All non-zero
numbers = [1, 2, 3, 4]
print(all(numbers))  # True
numbers = [1, 0, 3]
print(all(numbers))  # False

# Check all strings non-empty
names = ["Alice", "Bob", ""]
print(all(names))  # False` },
  { section: 'Aggregate Functions', signature: 'any(iterable)', description: 'Returns True if ANY element is truthy. Short-circuits at first True. Returns False for empty.', complexity: 'O(n)', example: `# Basic usage
print(any([False, False, True]))  # True (stops at first True)
print(any([False, False]))        # False
print(any([]))                    # False (empty)

# Check if any condition met
ages = [15, 16, 21, 17]
print(any(age >= 18 for age in ages))  # True

# Any errors?
errors = [None, None, "Error!", None]
print(any(errors))  # True

# At least one match
numbers = [2, 4, 6, 7, 8]
print(any(n % 2 == 1 for n in numbers))  # True (7 is odd)` },
]
