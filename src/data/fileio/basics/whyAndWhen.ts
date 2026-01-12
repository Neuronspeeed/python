import type { Method } from '../../../types'

export const whyAndWhenMethods: Method[] = [
  {
    section: 'Why & When',
    signature: 'Text mode vs Binary mode - when to use each',
    description: 'Text mode: human-readable files (.txt, .csv, .json). Binary mode: everything else (.jpg, .mp3, .pdf). Wrong mode = corruption.',
    complexity: 'Concept',
    example: `# TEXT MODE - human-readable content
with open("data.txt", "r", encoding="utf-8") as f:
    # Handles encoding, line endings automatically
    # Returns str objects
    content = f.read()  # str

# Use text mode for:
# - .txt, .csv, .json, .xml, .html files
# - Configuration files
# - Log files
# - Any file you'd open in text editor

# BINARY MODE - raw bytes
with open("image.jpg", "rb") as f:
    # No encoding, raw bytes
    # Returns bytes objects
    data = f.read()  # bytes

# Use binary mode for:
# - Images (.jpg, .png, .gif)
# - Audio/video (.mp3, .mp4, .wav)
# - PDFs, Word docs (.pdf, .docx)
# - Executables, zip files
# - ANY file you can't read as text

# CRITICAL: Wrong mode = file corruption!
# Bad: open image in text mode
with open("photo.jpg", "r") as f:  # WRONG!
    content = f.read()
    # May work on read, but...
with open("copy.jpg", "w") as f:  # WRONG!
    f.write(content)  # Corrupted! Line endings changed

# Good: use binary mode
with open("photo.jpg", "rb") as f:
    data = f.read()
with open("copy.jpg", "wb") as f:
    f.write(data)  # Perfect copy

# Rule: If you don't know → use binary mode (safer)`,
  },
  {
    section: 'Why & When',
    signature: 'read() vs readlines() vs iteration - memory tradeoffs',
    description: 'read(): simple, fast, memory hog. readlines(): list access, still loads all. Iteration: memory efficient, preferred for large files.',
    complexity: 'Concept',
    example: `# SMALL FILE (<100MB) - read() is fine
with open("config.txt", "r") as f:
    content = f.read()  # Load entire file
    # Memory: file size
    # Speed: ~100 MB/sec

# MEDIUM FILE (100MB-1GB) - readlines() if need list
with open("data.csv", "r") as f:
    lines = f.readlines()  # List of lines
    # Memory: ~2x file size (list overhead)
    # Can index: lines[42]
    # Can slice: lines[10:20]

# LARGE FILE (>1GB) - ITERATE!
with open("huge.log", "r") as f:
    for line in f:  # One line at a time
        process(line)
    # Memory: constant (~4KB buffer)
    # Speed: same as read()
    # No random access

# Real example: process 10GB log file
# Bad - OOM (out of memory)
with open("10gb.log", "r") as f:
    content = f.read()  # Tries to allocate 10GB!

# Good - constant memory
with open("10gb.log", "r") as f:
    for line in f:
        if "ERROR" in line:
            print(line.strip())
# Memory: ~4KB (tiny!)

# Pattern: count lines efficiently
# Bad
with open("big.txt", "r") as f:
    lines = f.readlines()
    count = len(lines)  # Loads all into memory

# Good
with open("big.txt", "r") as f:
    count = sum(1 for line in f)  # Memory efficient

# Performance comparison (100 MB file):
# read(): 1.0 seconds, 100 MB memory
# readlines(): 1.2 seconds, 200 MB memory
# iteration: 1.0 seconds, 4 KB memory

# Decision matrix:
# Need entire file as string → read()
# Need random line access → readlines()
# Process line by line → iteration (always!)
# File > 100MB → iteration (always!)`,
  },
  {
    section: 'Why & When',
    signature: 'pathlib vs os.path - modern Python best practices',
    description: 'pathlib: modern, object-oriented, chainable. os.path: old, functional, verbose. Always use pathlib for new code.',
    complexity: 'Concept',
    example: `from pathlib import Path
import os

# PATHLIB - modern, clean
path = Path.home() / "documents" / "data.txt"
if path.exists():
    content = path.read_text()
parent = path.parent
name = path.name
stem = path.stem  # filename without extension

# OS.PATH - old, verbose
import os.path
path = os.path.join(os.path.expanduser("~"), "documents", "data.txt")
if os.path.exists(path):
    with open(path, "r") as f:
        content = f.read()
parent = os.path.dirname(path)
name = os.path.basename(path)
stem = os.path.splitext(name)[0]

# Why pathlib wins:
# 1. Object-oriented (paths are objects)
# 2. Chainable (path / "sub" / "file.txt")
# 3. Built-in methods (.read_text(), .write_text())
# 4. Cross-platform (handles Windows/Unix differences)
# 5. More readable

# Common operations comparison:
# Join paths
p = Path("a") / "b" / "c.txt"          # pathlib
p = os.path.join("a", "b", "c.txt")    # os.path

# Read file
Path("f.txt").read_text()              # pathlib
open("f.txt").read()                   # os.path

# Get extension
Path("f.txt").suffix                   # pathlib
os.path.splitext("f.txt")[1]           # os.path

# List directory
list(Path(".").glob("*.txt"))          # pathlib
[f for f in os.listdir(".") if f.endswith(".txt")]  # os.path

# When to use os.path:
# - Legacy code (already uses it)
# - Python < 3.4 (pathlib added in 3.4)
# - Interop with old libraries expecting strings

# When to use pathlib:
# - ALL new code
# - Python >= 3.4
# - Cleaner, more maintainable code

# Migration tip: Path works with open()
path = Path("data.txt")
with open(path, "r") as f:  # Works!
    content = f.read()`,
  },
  {
    section: 'Why & When',
    signature: 'File encoding - when it matters and how to handle it',
    description: 'UTF-8 is default and correct 99% of the time. Windows files may be UTF-16. Legacy systems use Latin-1. Wrong encoding = gibberish.',
    complexity: 'Concept',
    example: `# UTF-8 - ALWAYS use this for new files
with open("data.txt", "w", encoding="utf-8") as f:
    f.write("Hello 世界 🌍")  # Handles all Unicode

# UTF-8 handles:
# - English (ASCII compatible)
# - Accents (cafe, naive)
# - Non-Latin (日本語, العربية, Русский)
# - Emojis (🎉, 👍)

# WHEN ENCODING MATTERS
# Problem 1: Reading file with unknown encoding
try:
    with open("mystery.txt", "r", encoding="utf-8") as f:
        content = f.read()
except UnicodeDecodeError:
    # Try Latin-1 (common for old European files)
    with open("mystery.txt", "r", encoding="latin-1") as f:
        content = f.read()

# Problem 2: Windows text files
# Windows Notepad defaults to UTF-16!
with open("windows.txt", "r", encoding="utf-16") as f:
    content = f.read()

# Problem 3: CSV from Excel
# Excel exports as Windows-1252 (not UTF-8!)
with open("excel.csv", "r", encoding="windows-1252") as f:
    content = f.read()

# DETECTING ENCODING
# Option 1: chardet library
import chardet
with open("mystery.txt", "rb") as f:
    raw = f.read()
    result = chardet.detect(raw)
    encoding = result["encoding"]  # "utf-8", "latin-1", etc.

with open("mystery.txt", "r", encoding=encoding) as f:
    content = f.read()

# Option 2: Try common encodings
def read_with_fallback(path):
    encodings = ["utf-8", "latin-1", "windows-1252", "utf-16"]
    for enc in encodings:
        try:
            with open(path, "r", encoding=enc) as f:
                return f.read()
        except UnicodeDecodeError:
            continue
    raise ValueError("Could not decode file")

# SYMPTOMS of wrong encoding:
# � (replacement character)
# n becomes A±
# " becomes a€œ
# Mojibake (文字化け)

# Best practices:
# 1. Always specify encoding explicitly
# 2. UTF-8 for all new files
# 3. Test with non-ASCII chars (cafe, 日本語)
# 4. Windows files: check for UTF-16
# 5. Excel CSVs: probably windows-1252`,
  },
  {
    section: 'Why & When',
    signature: 'Common file I/O pitfalls - avoid these mistakes',
    description: 'Forgetting with statement, using wrong mode, encoding errors, platform-specific paths. Learn patterns that prevent bugs.',
    complexity: 'Concept',
    example: `# PITFALL 1: Not using with statement
# Bad - file left open if exception
f = open("data.txt", "r")
content = f.read()
process(content)  # If this crashes...
f.close()         # ...this never runs!

# Good - always closed
with open("data.txt", "r") as f:
    content = f.read()
    process(content)  # Exception or not, file closes

# PITFALL 2: Write mode destroys data
data = load_from_database()
with open("backup.txt", "w") as f:  # Overwrites immediately!
    # Even if this crashes, file is already empty
    f.write(data)

# Good - write to temp file, then rename
import os
with open("backup.tmp", "w") as f:
    f.write(data)
os.replace("backup.tmp", "backup.txt")  # Atomic on Unix

# PITFALL 3: Forgetting to strip newlines
with open("names.txt", "r") as f:
    names = f.readlines()
    # names = ["Alice\\n", "Bob\\n", "Carol\\n"]

if "Alice" in names:  # FALSE! It's "Alice\\n"
    print("Found Alice")

# Good - strip whitespace
names = [line.strip() for line in f.readlines()]

# PITFALL 4: Platform-specific paths
# Bad - breaks on Windows
path = "/home/user/data.txt"  # Unix only!

# Bad - breaks on Unix
path = "C:\\\\Users\\\\user\\\\data.txt"  # Windows only!

# Good - use pathlib
from pathlib import Path
path = Path.home() / "data.txt"  # Cross-platform!

# PITFALL 5: Reading binary as text
with open("image.jpg", "r") as f:  # WRONG!
    data = f.read()
# UnicodeDecodeError or corrupted data

# Good - use binary mode
with open("image.jpg", "rb") as f:
    data = f.read()

# PITFALL 6: Assuming file exists
content = open("config.txt").read()  # Crashes if missing!

# Good - check first
from pathlib import Path
path = Path("config.txt")
if path.exists():
    content = path.read_text()
else:
    content = "default config"

# Or use try/except
try:
    content = open("config.txt").read()
except FileNotFoundError:
    content = "default config"

# PITFALL 7: Modifying file while reading
# Bad - undefined behavior!
with open("data.txt", "r+") as f:
    for line in f:
        f.write(line.upper())  # Reading + writing same file!

# Good - read all, then write
with open("data.txt", "r") as f:
    lines = f.readlines()
with open("data.txt", "w") as f:
    for line in lines:
        f.write(line.upper())

# Safety checklist:
# - Use with statement
# - Specify encoding
# - Check mode (r/w/a)
# - Use pathlib for paths
# - Binary mode for non-text
# - Handle FileNotFoundError
# - Read before write (same file)`,
  },
]
