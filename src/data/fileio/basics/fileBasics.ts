import type { Method } from '../../../types'

export const fileBasicsMethods: Method[] = [
  {
    section: 'File Basics',
    signature: 'What is a file?',
    description: 'A file is a sequence of bytes (integers 0-255). Must be decoded/encoded to interpret contents. Python handles encoding/decoding for you.',
    complexity: 'Concept',
    example: `# Files are sequences of bytes
# Bytes must be decoded into meaningful data

# Text files: bytes → characters (with encoding)
# Binary files: raw bytes (images, audio, etc.)

# Python handles decoding for text files
# You just specify the encoding (utf-8, ascii, etc.)`,
  },
  {
    section: 'File Basics',
    signature: 'Character encoding',
    description: 'Determines how bytes map to characters. UTF-8 is most common. ASCII limited to English. Encoding/decoding must match!',
    complexity: 'Concept',
    example: `# Common encodings:
# - ASCII: English only, can't encode n or u
# - UTF-8: Universal, backwards compatible with ASCII
# - UTF-16: Used by Windows for .txt files
# - UTF-32: 4 bytes per character

# CRITICAL: Use same encoding to decode as was used to encode!
# UTF-8 text decoded as UTF-16 = gibberish

# Default: UTF-8 on Mac/Linux, UTF-16 on Windows`,
  },
  {
    section: 'File Basics',
    signature: 'Line endings',
    description: 'Lines end with \\n (Unix/Mac) or \\r\\n (Windows). Python handles conversion automatically in text mode.',
    complexity: 'Concept',
    example: `# Line ending characters:
# \\n = line feed (Unix/Mac)
# \\r = carriage return
# \\r\\n = both (Windows)

# Windows file opened on Unix might show extra blank lines
# Python handles this automatically in text mode

# Rarely a problem in practice!`,
  },
]
