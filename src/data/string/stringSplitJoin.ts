import type { Method } from '../../types'

export const stringSplitJoin: Method[] = [
  { section: 'Split & Join', signature: 'str.split(sep=None, maxsplit=-1)', description: 'Returns list of words using sep as delimiter.', complexity: 'O(n)', example: `s = "a,b,c"\nprint(s.split(","))  # ['a', 'b', 'c']` },
  { section: 'Split & Join', signature: 'str.rsplit(sep=None, maxsplit=-1)', description: 'Like split() but splits from the right.', complexity: 'O(n)', example: `s = "a/b/c"\nprint(s.rsplit("/", 1))  # ['a/b', 'c']` },
  { section: 'Split & Join', signature: 'str.splitlines([keepends])', description: 'Returns list of lines. Splits on various line boundaries.', complexity: 'O(n)', example: `s = "line1\\nline2\\nline3"
print(s.splitlines())       # ['line1', 'line2', 'line3']
print(s.splitlines(True))   # ['line1\\n', 'line2\\n', 'line3']

# Handles different line endings
"a\\rb\\nc\\r\\nd".splitlines()  # ['a', 'b', 'c', 'd']` },
  { section: 'Split & Join', signature: 'str.partition(sep)', description: 'Splits at first occurrence of sep. Returns 3-tuple: (before, sep, after).', complexity: 'O(n)', example: `s = "hello=world=!"
print(s.partition("="))  # ('hello', '=', 'world=!')

# If sep not found, returns (str, '', '')
print("hello".partition("="))  # ('hello', '', '')` },
  { section: 'Split & Join', signature: 'str.rpartition(sep)', description: 'Like partition() but searches from the right.', complexity: 'O(n)', example: `s = "hello=world=!"
print(s.rpartition("="))  # ('hello=world', '=', '!')

# Useful for file extensions
path = "archive.tar.gz"
print(path.rpartition("."))  # ('archive.tar', '.', 'gz')` },
  { section: 'Split & Join', signature: 'str.join(iterable)', description: 'Concatenates strings with str as separator.', complexity: 'O(n)', example: `print(",".join(["a", "b", "c"]))  # "a,b,c"` },
]
