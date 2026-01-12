import type { Method } from '../../types'

export const stringReplaceTransform: Method[] = [
  { section: 'Replace & Transform', signature: 'str.replace(old, new[, count])', description: 'Returns copy with occurrences of old replaced by new.', complexity: 'O(n)', example: `s = "hello"\nprint(s.replace("l", "L"))  # "heLLo"` },
  { section: 'Replace & Transform', signature: 'str.removeprefix(prefix) [3.9+]', description: 'Returns string with prefix removed if present. (Python 3.9+)', complexity: 'O(n)', example: `s = "test_function"
print(s.removeprefix("test_"))  # "function"
print(s.removeprefix("foo_"))   # "test_function" (unchanged)

# Before 3.9, you'd do:
# s[len(prefix):] if s.startswith(prefix) else s` },
  { section: 'Replace & Transform', signature: 'str.removesuffix(suffix) [3.9+]', description: 'Returns string with suffix removed if present. (Python 3.9+)', complexity: 'O(n)', example: `s = "file.txt"
print(s.removesuffix(".txt"))  # "file"
print(s.removesuffix(".py"))   # "file.txt" (unchanged)

# Before 3.9, you'd do:
# s[:-len(suffix)] if s.endswith(suffix) else s` },
  { section: 'Replace & Transform', signature: 'str.expandtabs(tabsize=8)', description: 'Returns copy with tabs replaced by spaces.', complexity: 'O(n)', example: `s = "a\\tb\\tc"
print(s.expandtabs())    # "a       b       c" (8 spaces)
print(s.expandtabs(4))   # "a   b   c" (4 spaces)` },
  { section: 'Replace & Transform', signature: 'str.maketrans(x[, y[, z]])', description: 'Returns translation table for use with translate().', complexity: 'O(n)', example: `# Single dict argument
table = str.maketrans({"a": "1", "b": "2"})

# Two strings (map chars from x to y)
table = str.maketrans("abc", "123")
print("abcdef".translate(table))  # "123def"

# Three args: x->y mapping, z chars deleted
table = str.maketrans("ae", "12", "lo")
print("hello".translate(table))  # "h12"` },
  { section: 'Replace & Transform', signature: 'str.translate(table)', description: 'Returns copy with characters mapped through translation table.', complexity: 'O(n)', example: `# Remove vowels
vowels = str.maketrans("", "", "aeiou")
print("hello world".translate(vowels))  # "hll wrld"

# ROT13 cipher
import codecs
codecs.encode("hello", "rot13")  # "uryyb"` },
]
