import type { Method } from '../../types'

export const boolAdvanced: Method[] = [
  { section: 'Advanced Patterns', signature: '__bool__(self)', description: 'Define custom truthiness for classes. Called by bool() and if statements. Falls back to __len__() if not defined.', complexity: 'O(1)', example: `# Custom __bool__ method
class Account:
    def __init__(self, balance):
        self.balance = balance
    def __bool__(self):
        return self.balance > 0

account = Account(100)
if account:  # Calls __bool__
    print("Account has funds")  # This runs

broke = Account(0)
if not broke:  # False because balance <= 0
    print("Account is empty")  # This runs

# Falls back to __len__ if __bool__ not defined
class MyList:
    def __init__(self, items):
        self.items = items
    def __len__(self):
        return len(self.items)

ml = MyList([1, 2, 3])
print(bool(ml))  # True (len > 0)` },
  { section: 'Advanced Patterns', signature: 'Filter by truthiness', description: 'Use filter(None, ...) or comprehension to remove falsy values from collections.', complexity: 'O(n)', example: `# Remove falsy values
values = [0, 1, "", "hello", None, [], [1], False, True]

# Method 1: filter with None
truthy = list(filter(None, values))
print(truthy)  # [1, 'hello', [1], True]

# Method 2: comprehension (more explicit)
truthy = [v for v in values if v]
print(truthy)  # [1, 'hello', [1], True]

# Remove empty strings
words = ["hello", "", "world", "", "!"]
non_empty = [w for w in words if w]
print(non_empty)  # ['hello', 'world', '!']

# Remove None values
data = [1, None, 2, None, 3]
clean = [x for x in data if x is not None]  # Keep 0!
print(clean)  # [1, 2, 3]` },
]
