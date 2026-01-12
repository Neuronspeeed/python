import type { Method } from '../../types'

export const stringUnicodeBytes: Method[] = [
  { section: 'Unicode & Bytes', signature: 'bytes / bytearray', description: 'bytes: immutable raw binary. bytearray: mutable. Cannot mix with str—convert with encode/decode.', complexity: 'O(1)', example: `# bytes - immutable binary
b = b"hello"           # bytes literal
b = bytes([104, 101])  # from int sequence

# bytearray - mutable binary
ba = bytearray(b"hello")
ba[0] = 72             # modify in place
print(ba)              # bytearray(b'Hello')

# Cannot mix str and bytes
# "hi" + b"there"  # TypeError!
"hi".encode() + b"there"  # OK: b'hithere'` },
  { section: 'Unicode & Bytes', signature: 'str.encode() / bytes.decode()', description: 'Convert between str and bytes. Specify encoding for non-ASCII.', complexity: 'O(n)', example: `# String to bytes
text = "café"
b = text.encode("utf-8")      # b'caf\\xc3\\xa9'
b = text.encode("latin-1")    # b'caf\\xe9'

# Bytes to string
b = b'caf\\xc3\\xa9'
s = b.decode("utf-8")         # "café"

# Error handling
b"\\xff".decode("utf-8", errors="replace")  # "�"
b"\\xff".decode("utf-8", errors="ignore")   # ""` },
  { section: 'Unicode & Bytes', signature: 'File I/O modes', description: "Text mode auto-decodes; binary mode reads raw bytes. Use encoding= for text files.", complexity: 'O(n)', example: `# Text mode - auto decode/encode
with open("file.txt", "r", encoding="utf-8") as f:
    text = f.read()  # returns str

# Binary mode - raw bytes, no translation
with open("image.png", "rb") as f:
    data = f.read()  # returns bytes

# Write binary
with open("out.bin", "wb") as f:
    f.write(b"\\x00\\x01\\x02")` },
  { section: 'Unicode & Bytes', signature: 'BOM handling (utf-8-sig)', description: "Byte Order Mark identifies encoding. Use 'utf-8-sig' to handle automatically.", complexity: 'O(n)', example: `# Read file with BOM
with open("file.txt", encoding="utf-8-sig") as f:
    text = f.read()  # BOM stripped automatically

# Write file with BOM
with open("file.txt", "w", encoding="utf-8-sig") as f:
    f.write("hello")  # BOM added at start

# Manual BOM check
data = open("file.txt", "rb").read()
if data.startswith(b'\\xef\\xbb\\xbf'):  # UTF-8 BOM
    text = data[3:].decode("utf-8")` },
  { section: 'Unicode & Bytes', signature: 'unicodedata.normalize()', description: "Normalize Unicode for consistent comparisons. NFC (composed) or NFD (decomposed).", complexity: 'O(n)', example: `import unicodedata

# Same visual character, different representations
s1 = "café"           # 'é' as single char (U+00E9)
s2 = "cafe\\u0301"     # 'e' + combining accent

print(s1 == s2)       # False - different bytes!

# Normalize to compare
n1 = unicodedata.normalize("NFC", s1)
n2 = unicodedata.normalize("NFC", s2)
print(n1 == n2)       # True

# NFC: composed (Linux/Web)
# NFD: decomposed (macOS filenames)` },
]
