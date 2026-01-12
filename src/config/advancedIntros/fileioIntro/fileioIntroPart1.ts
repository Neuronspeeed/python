export const fileioIntroPart1 = `File I/O is essential for persisting data, reading configuration, processing logs, and working with external data sources. Every file operation involves encoding (converting Python strings to bytes) and decoding (bytes back to strings). Understanding file modes, encoding, and the \`with\` statement is critical for reliable file handling. Misunderstanding encoding is the #1 cause of file I/O bugs.

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
`
