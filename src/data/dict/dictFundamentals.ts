import type { Method } from '../../types'

export const dictFundamentalsMethods: Method[] = [
  { section: 'Fundamentals', signature: 'Dictionary Basics', description: 'Dictionaries store KEY-VALUE pairs. Create with {}. Keys must be hashable (immutable). Values can be anything. Order preserved since Python 3.7.', complexity: 'Concept', example: `# Create dict with curly braces {}
capitals = {
    "California": "Sacramento",
    "New York": "Albany",
    "Texas": "Austin",
}

# Or from tuples with dict()
pairs = (("CA", "Sacramento"), ("NY", "Albany"))
capitals = dict(pairs)

# Empty dict
empty = {}  # or dict()

# Key-value pair structure
# Key: unique identifier (must be hashable: str, int, tuple)
# Value: any Python object

# Mixed types OK (but typically use same types)
data = {
    "name": "Alice",    # str key, str value
    1: [1, 2, 3],       # int key, list value
    (0, 0): "origin",   # tuple key, str value
}` },
  { section: 'Fundamentals', signature: 'Dictionary Access', description: 'Access values with [key]. Raises KeyError if key missing. Use .get() for safe access with default value.', complexity: 'O(1)', example: `capitals = {"Texas": "Austin", "California": "Sacramento"}

# Access with []
print(capitals["Texas"])  # "Austin"

# KeyError if missing!
# capitals["Arizona"]  # KeyError: 'Arizona'

# Check before accessing
if "Arizona" in capitals:
    print(capitals["Arizona"])

# Safe access with .get()
print(capitals.get("Arizona"))  # None (no error!)
print(capitals.get("Arizona", "Unknown"))  # "Unknown"

# Note: 'in' only checks KEYS, not values
print("Austin" in capitals)  # False! (it's a value, not a key)
print("Texas" in capitals)   # True (it's a key)` },
  { section: 'Fundamentals', signature: 'Dictionary Mutability', description: 'Dicts are MUTABLE. Can add, modify, and delete items. Keys unique - assigning to existing key OVERWRITES value.', complexity: 'O(1)', example: `capitals = {"Texas": "Austin"}

# Add new key-value pair
capitals["Colorado"] = "Denver"
print(capitals)  # {'Texas': 'Austin', 'Colorado': 'Denver'}

# Modify existing (overwrites!)
capitals["Texas"] = "Houston"
print(capitals)  # {'Texas': 'Houston', ...}

# Delete with del
del capitals["Texas"]
print(capitals)  # {'Colorado': 'Denver'}

# Each key can only map to ONE value
# If you assign to same key again, old value is lost!
d = {"key": "first"}
d["key"] = "second"  # "first" is gone!
print(d)  # {'key': 'second'}` },
  { section: 'Fundamentals', signature: 'Iterating Over Dicts', description: 'for loop iterates over KEYS by default. Use .items() for key-value pairs, .values() for just values.', complexity: 'O(n)', example: `capitals = {
    "California": "Sacramento",
    "New York": "Albany",
    "Texas": "Austin",
}

# Loop over keys (default)
for state in capitals:
    print(state)  # California, New York, Texas

# Loop and access values
for state in capitals:
    print(f"{state}: {capitals[state]}")

# Better: Loop over key-value pairs with .items()
for state, capital in capitals.items():
    print(f"The capital of {state} is {capital}")

# .items() returns list-like of tuples
print(capitals.items())
# dict_items([('California', 'Sacramento'), ...])` },
]
