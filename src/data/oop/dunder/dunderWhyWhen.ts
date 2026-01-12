import type { Method } from '../../../types'

// Dunder Methods - Why & When
export const dunderWhyWhenMethods: Method[] = [
  { signature: 'When to implement __str__ vs __repr__', description: '__repr__: always implement for debugging (eval-able). __str__: only if you need user-friendly output. Rule: __repr__ is for devs, __str__ is for users.', complexity: 'Concept', section: 'Why & When', example: `# ALWAYS implement __repr__
class User:
    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __repr__(self):
        return f"User(id={self.id}, name={self.name!r})"
# In debugger: User(id=1, name='Alice')

# Add __str__ ONLY if end-users see it
class User:
    def __repr__(self):
        return f"User(id={self.id}, name={self.name!r})"

    def __str__(self):
        return f"{self.name} (#{self.id})"
# print(user) → "Alice (#1)"
# [user] → "User(id=1, name='Alice')"

# If no __str__, Python uses __repr__ for both
# Priority: Always __repr__, optionally __str__` },
  { signature: 'When objects need __eq__ and __hash__', description: 'Implement __eq__ for value objects. Add __hash__ if using in sets/dicts. Objects with __eq__ lose default hash—must implement __hash__ or set to None.', complexity: 'Concept', section: 'Why & When', example: `# VALUE OBJECT - needs __eq__
class Money:
    def __init__(self, amount, currency):
        self.amount = amount
        self.currency = currency

    def __eq__(self, other):
        return (self.amount == other.amount and
                self.currency == other.currency)

# Problem: Can't use in set now!
# m = Money(10, 'USD')
# {m}  # TypeError: unhashable

# IMMUTABLE value - add __hash__
class Money:
    def __init__(self, amount, currency):
        self.amount = amount
        self.currency = currency

    def __eq__(self, other):
        return (self.amount, self.currency) == \\
               (other.amount, other.currency)

    def __hash__(self):
        return hash((self.amount, self.currency))

# MUTABLE object - explicitly disable hash
class Account:
    __hash__ = None  # Unhashable, even if __eq__ defined

    def __eq__(self, other):
        return self.id == other.id

# Rule: immutable + __eq__ → add __hash__
#       mutable → __hash__ = None` },
  { signature: 'Making classes Pythonic with dunder methods', description: 'Implement dunder methods to make classes feel native. Use __len__, __getitem__ for sequences. Use __enter__/__exit__ for resources. Use __call__ for function-like objects.', complexity: 'Concept', section: 'Why & When', example: `# WITHOUT dunder - feels foreign
class Batch:
    def get_size(self):
        return len(self.items)

    def get_item(self, idx):
        return self.items[idx]

b = Batch()
print(b.get_size())    # Verbose, not Pythonic

# WITH dunder - feels native
class Batch:
    def __len__(self):
        return len(self.items)

    def __getitem__(self, idx):
        return self.items[idx]

b = Batch()
print(len(b))          # Pythonic!
print(b[0])            # Like a list
for item in b:         # Works with for loop

# Implement when your class IS a:
# - Container → __len__, __getitem__, __contains__
# - Number → __add__, __mul__, __eq__
# - Resource → __enter__, __exit__
# - Callable → __call__` },
  { signature: 'Performance with dunder methods', description: '__getattr__ and __getattribute__ have overhead. __hash__ should be O(1). Comparison operators may be called frequently in sorting.', complexity: 'Concept', section: 'Why & When', example: `# EXPENSIVE __hash__ - BAD
class BigObject:
    def __init__(self, data):
        self.data = data  # Large list

    def __hash__(self):
        return hash(tuple(self.data))  # O(n) - slow!

# GOOD - cache hash value
class BigObject:
    def __init__(self, data):
        self.data = tuple(data)  # Immutable
        self._hash = None

    def __hash__(self):
        if self._hash is None:
            self._hash = hash(self.data)
        return self._hash  # O(1) after first call

# COMPARISON called often in sorting
items = [obj1, obj2, obj3]
sorted(items)  # Calls __lt__ N*log(N) times

# Make comparison cheap
class Item:
    def __lt__(self, other):
        return self.key < other.key  # O(1)

# Avoid expensive comparisons in __lt__
# Pre-compute sort key if possible` },
  { signature: 'When to use __call__ vs regular methods', description: '__call__ when object IS the operation (single main action). Regular method when object HAS operations (multiple actions).', complexity: 'Concept', section: 'Why & When', example: `# USE __call__ - object IS a function
class Validator:
    def __init__(self, min_val, max_val):
        self.min_val = min_val
        self.max_val = max_val

    def __call__(self, value):
        return self.min_val <= value <= self.max_val

is_valid_age = Validator(0, 120)
print(is_valid_age(25))   # True - used like function

# USE METHOD - object HAS operations
class BankAccount:
    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        self.balance -= amount

account = BankAccount()
account.deposit(100)      # Clear action name

# __call__ benefits:
# - Can pass to map(), filter()
# - Looks like a function
# - Good for single-purpose objects
# Use when: "this object is callable"
# Avoid when: "this object does many things"` },

  { signature: '__new__ vs __init__', description: '__new__ CREATES instance (returns object). __init__ INITIALIZES instance (modifies self). __new__ called first, then __init__. Override __new__ for immutables, singletons, metaclasses.', complexity: 'Concept', section: 'Why & When', example: `# NORMAL: Just use __init__
class User:
    def __init__(self, name):
        self.name = name

# USE __new__ for immutables (str, int, tuple subclasses)
class UpperStr(str):
    def __new__(cls, value):
        return super().__new__(cls, value.upper())

print(UpperStr("hello"))  # HELLO

# USE __new__ for singleton pattern
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

# USE __new__ for instance caching
class CachedInt:
    _cache = {}

    def __new__(cls, value):
        if value not in cls._cache:
            cls._cache[value] = super().__new__(cls)
        return cls._cache[value]

# WHEN TO USE:
# __init__ (99% of cases): Normal class setup
# __new__: Immutables, singletons, metaclasses, caching` },
]
