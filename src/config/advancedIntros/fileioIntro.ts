export const fileioIntro = `File I/O is essential for persisting data, reading configuration, processing logs, and working with external data sources. Every file operation involves encoding (converting Python strings to bytes) and decoding (bytes back to strings). Understanding file modes, encoding, and the \`with\` statement is critical for reliable file handling. Misunderstanding encoding is the #1 cause of file I/O bugs.

TEXT VS BINARY MODES: The fundamental distinction.

Files are ALWAYS bytes on disk. The difference is whether Python decodes/encodes for you:

**Text mode** (default): Python automatically converts bytes <-> strings using an encoding (UTF-8 by default). You work with strings. Lines are split on newline characters.

**Binary mode** ('b'): You work directly with bytes. No encoding/decoding. Use for: images, audio, video, executables, or when you need exact byte control.

\`\`\`python
# TEXT MODE (default): Work with strings
with open('data.txt', 'r') as f:
    content = f.read()  # Returns str
    print(type(content))  # <class 'str'>

# BINARY MODE: Work with bytes
with open('image.png', 'rb') as f:
    content = f.read()  # Returns bytes
    print(type(content))  # <class 'bytes'>
\`\`\`python

FILE MODES: Reading, writing, appending.

\`\`\`python
# READ (r) - Default, file must exist
with open('data.txt', 'r') as f:
    content = f.read()

# WRITE (w) - Creates file or OVERWRITES if exists! DESTRUCTIVE!
with open('output.txt', 'w') as f:
    f.write("New content")  # OLD CONTENT DESTROYED!

# APPEND (a) - Creates file or adds to end
with open('log.txt', 'a') as f:
    f.write("New log entry\\n")  # Preserves old content

# READ+WRITE (r+) - File must exist, can read and write
with open('data.txt', 'r+') as f:
    content = f.read()
    f.write("More data")

# WRITE+READ (w+) - Creates/overwrites, can read and write
with open('data.txt', 'w+') as f:
    f.write("Data")
    f.seek(0)  # Go back to start
    content = f.read()
\`\`\`python

Common Mode Combinations:
- \`'r'\`: Read text (default)
- \`'w'\`: Write text (OVERWRITES!)
- \`'a'\`: Append text
- \`'rb'\`: Read binary
- \`'wb'\`: Write binary (OVERWRITES!)
- \`'r+'\`: Read+write text (file must exist)
- \`'w+'\`: Write+read text (creates/overwrites)

THE WITH STATEMENT: Always use it for files!

\`with\` ensures files are closed even if exceptions occur. Without it, files might stay open, causing resource leaks and locking issues.

\`\`\`python
# BAD: Manual close (fragile!)
f = open('data.txt')
try:
    data = f.read()
finally:
    f.close()  # Easy to forget!

# GOOD: with statement (automatic cleanup)
with open('data.txt') as f:
    data = f.read()
# File automatically closed here, even if exception!

# GREAT: Multiple files
with open('input.txt') as infile, open('output.txt', 'w') as outfile:
    outfile.write(infile.read())
# Both files closed automatically
\`\`\`python

ENCODING: The #1 source of file I/O bugs.

Every text file is bytes on disk. Python must know HOW to decode bytes -> strings. Use the SAME encoding for reading that was used for writing, or you get garbage or exceptions!

\`\`\`python
# WRITE with UTF-8
with open('data.txt', 'w', encoding='utf-8') as f:
    f.write("Hello World")  # Unicode characters

# READ with UTF-8 (CORRECT)
with open('data.txt', 'r', encoding='utf-8') as f:
    print(f.read())  # Hello World

# READ with ASCII (WRONG!)
with open('data.txt', 'r', encoding='ascii') as f:
    print(f.read())  # UnicodeDecodeError!
\`\`\`python

Common Encodings:
- **UTF-8**: Universal standard, handles all Unicode (RECOMMENDED!)
- **ASCII**: English only (a-z, A-Z, 0-9, basic punctuation)
- **Latin-1** (ISO-8859-1): Western European languages
- **UTF-16**: Windows default for some .txt files
- **CP1252**: Windows legacy encoding

Best Practice: **ALWAYS specify \`encoding='utf-8'\`** unless you have a specific reason not to!

\`\`\`python
# ALWAYS DO THIS:
with open('data.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# NOT THIS (relies on platform default):
with open('data.txt', 'r') as f:  # encoding=None -> platform default
    content = f.read()
\`\`\`python

READING STRATEGIES: read(), readline(), readlines(), iteration.

\`\`\`python
# READ ENTIRE FILE (small files only!)
with open('data.txt') as f:
    content = f.read()  # Returns entire file as single string

# READ LINE BY LINE (memory efficient for huge files)
with open('huge.log') as f:
    for line in f:  # Lazy iteration, one line at a time
        process(line)

# READ ALL LINES INTO LIST (moderate files)
with open('data.txt') as f:
    lines = f.readlines()  # ['line1\\n', 'line2\\n', ...]

# READ ONE LINE AT A TIME (manual iteration)
with open('data.txt') as f:
    line = f.readline()  # First line
    while line:
        process(line)
        line = f.readline()
\`\`\`python

Performance Comparison (1 GB file):
- \`f.read()\`: Loads entire 1 GB into memory -> 1 GB RAM used
- \`for line in f:\`: Loads one line at a time -> ~4 KB RAM used
- \`f.readlines()\`: Loads all lines into list -> 1 GB+ RAM used

Best Practice: **Prefer iteration** (\`for line in f:\`) for large files.

WRITING STRATEGIES: write(), writelines().

\`\`\`python
# WRITE STRING
with open('output.txt', 'w') as f:
    f.write("First line\\n")
    f.write("Second line\\n")

# WRITE MULTIPLE LINES (no automatic newlines!)
with open('output.txt', 'w') as f:
    lines = ["First line\\n", "Second line\\n", "Third line\\n"]
    f.writelines(lines)  # Must include \\n yourself!

# WRITE WITH PRINT (adds newline automatically)
with open('output.txt', 'w') as f:
    print("First line", file=f)
    print("Second line", file=f)
\`\`\`python

GOTCHA: writelines() does NOT add newlines!

\`\`\`python
# WRONG: Lines run together
lines = ["First", "Second", "Third"]
with open('output.txt', 'w') as f:
    f.writelines(lines)
# Output: FirstSecondThird

# RIGHT: Add newlines yourself
with open('output.txt', 'w') as f:
    f.writelines(line + '\\n' for line in lines)
# Output: First\\nSecond\\nThird
\`\`\`python

PATHLIB: Modern, cross-platform path handling.

The \`pathlib\` module (Python 3.4+) is the modern way to work with file paths. It's object-oriented, cross-platform, and more readable than \`os.path\`.

\`\`\`python
from pathlib import Path

# CREATE PATH OBJECTS
p = Path('data/file.txt')
home = Path.home()           # User's home directory
cwd = Path.cwd()             # Current working directory

# JOIN PATHS (use / operator!)
config_file = home / '.config' / 'app' / 'settings.json'
# Works on Windows (\\\\) and Unix (/)

# PATH PROPERTIES
print(p.name)        # 'file.txt'
print(p.stem)        # 'file' (name without extension)
print(p.suffix)      # '.txt'
print(p.parent)      # Path('data')
print(p.absolute())  # Absolute path

# CHECK EXISTENCE
if p.exists():
    if p.is_file():
        print("It's a file")
    elif p.is_dir():
        print("It's a directory")

# CREATE/DELETE
p.touch()           # Create empty file
p.mkdir()           # Create directory
p.mkdir(parents=True, exist_ok=True)  # Like mkdir -p
p.unlink()          # Delete file
p.rmdir()           # Delete empty directory
\`\`\`python

Reading/Writing with Path:

\`\`\`python
from pathlib import Path

p = Path('data.txt')

# READ ENTIRE FILE
content = p.read_text(encoding='utf-8')

# WRITE ENTIRE FILE
p.write_text("New content", encoding='utf-8')

# READ BYTES
data = p.read_bytes()

# WRITE BYTES
p.write_bytes(b'\\x89PNG...')

# OPEN FILE (with statement still works)
with p.open('r', encoding='utf-8') as f:
    content = f.read()
\`\`\`python

GLOB PATTERNS: Find files matching patterns.

\`\`\`python
from pathlib import Path

# FIND ALL .txt FILES IN DIRECTORY
for txt_file in Path('.').glob('*.txt'):
    print(txt_file)

# FIND ALL .py FILES RECURSIVELY
for py_file in Path('.').rglob('*.py'):
    print(py_file)

# FIND FILES MATCHING PATTERN
for log in Path('/var/log').glob('app-*.log'):
    process(log)
\`\`\`python

ERROR HANDLING: Common file I/O exceptions.

\`\`\`python
from pathlib import Path

try:
    with open('missing.txt', 'r') as f:
        content = f.read()
except FileNotFoundError:
    print("File doesn't exist")
except PermissionError:
    print("No permission to read file")
except IsADirectoryError:
    print("Path is a directory, not a file")
except UnicodeDecodeError:
    print("Wrong encoding - file not UTF-8")

# CHECK BEFORE OPENING (TOCTTOU race condition!)
# DON'T DO THIS:
if Path('file.txt').exists():
    with open('file.txt') as f:  # File might be deleted between check and open!
        content = f.read()

# DO THIS (EAFP: Easier to Ask Forgiveness than Permission):
try:
    with open('file.txt') as f:
        content = f.read()
except FileNotFoundError:
    handle_missing_file()
\`\`\`python

CSV FILES: Working with tabular data.

\`\`\`python
import csv

# WRITE CSV
with open('data.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Name', 'Age', 'City'])
    writer.writerow(['Alice', 30, 'NYC'])
    writer.writerow(['Bob', 25, 'LA'])

# READ CSV
with open('data.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    header = next(reader)  # Skip header
    for row in reader:
        name, age, city = row
        print(f"{name} is {age} from {city}")

# DICTREADER (more convenient)
with open('data.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row['Name'], row['Age'], row['City'])
\`\`\`python

JSON FILES: Serializing Python objects.

\`\`\`python
import json

# WRITE JSON
data = {'name': 'Alice', 'age': 30, 'hobbies': ['reading', 'coding']}
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

# READ JSON
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    print(data['name'])  # Alice

# PRETTY PRINT JSON
print(json.dumps(data, indent=2))
\`\`\`python

PERFORMANCE TIPS:

1. **Buffer size**: Large reads/writes are faster than many small ones
\`\`\`python
# SLOW: Write one line at a time (many system calls)
with open('huge.txt', 'w') as f:
    for line in lines:
        f.write(line + '\\n')

# FAST: Batch writes (fewer system calls)
with open('huge.txt', 'w') as f:
    f.write('\\n'.join(lines))
\`\`\`python

2. **Iterate don't load**: For huge files, iterate line-by-line
\`\`\`python
# SLOW: Load entire 1GB file
with open('huge.log') as f:
    lines = f.readlines()  # 1GB in memory!
    for line in lines:
        process(line)

# FAST: Iterate lazily
with open('huge.log') as f:
    for line in f:  # ~4KB in memory
        process(line)
\`\`\`python

3. **Binary mode is faster**: No encoding overhead
\`\`\`python
# For large data, binary mode faster
with open('data.bin', 'wb') as f:
    f.write(bytes_data)
\`\`\`python

COMMON GOTCHAS:

1. **Forgetting newlines in writelines()**: writelines() doesn't add \\n
2. **Write mode destroys files**: 'w' OVERWRITES! Use 'a' to append
3. **Mixing modes**: Can't write() to file opened in 'r' mode
4. **Wrong encoding**: Must decode with same encoding used to encode
5. **Forgetting to close**: Use \`with\` statement always!
6. **Binary mode requires bytes**: Can't write str to binary file
7. **Not specifying encoding**: Platform default varies, always use encoding='utf-8'

BEST PRACTICES SUMMARY:

- ALWAYS use \`with\` statement for automatic cleanup
- ALWAYS specify \`encoding='utf-8'\` for text files
- Use pathlib.Path for cross-platform path handling
- Prefer iteration (\`for line in f:\`) over \`read()\` for large files
- Use 'a' (append) mode when you want to preserve existing content
- Handle FileNotFoundError and PermissionError
- Use csv module for CSV, json module for JSON
- Never rely on platform default encoding
- Test file I/O with non-ASCII characters (World, en, Globe)
- Use 'rb'/'wb' for binary data (images, audio, executables)`
