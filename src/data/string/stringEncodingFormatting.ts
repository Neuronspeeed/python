import type { Method } from '../../types'

export const stringEncodingFormatting: Method[] = [
  { section: 'Encoding & Formatting', signature: 'str.encode(encoding="utf-8")', description: 'Encodes string using specified encoding. Returns bytes.', complexity: 'O(n)', example: `print("hello".encode())  # b'hello'` },
  { section: 'Encoding & Formatting', signature: 'str.format(*args, **kwargs)', description: 'Performs string formatting with replacement fields.', complexity: 'O(n)', example: `print("{} {}".format("hello", "world"))` },
  { section: 'Encoding & Formatting', signature: 'str.format_map(mapping)', description: 'Like format() but takes a single mapping directly.', complexity: 'O(n)', example: `data = {"name": "Alice", "age": 30}
print("{name} is {age}".format_map(data))  # "Alice is 30"

# Useful with defaultdict for missing keys
from collections import defaultdict
d = defaultdict(lambda: "N/A", {"name": "Bob"})
print("{name}: {age}".format_map(d))  # "Bob: N/A"` },
]
