export const fileioIntroPart2 = `

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
