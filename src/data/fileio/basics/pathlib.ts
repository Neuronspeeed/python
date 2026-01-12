import type { Method } from '../../../types'

export const pathlibMethods: Method[] = [
  {
    section: 'pathlib',
    signature: 'Path(string)',
    description: 'Creates Path object from string. Cross-platform file path handling. Use / operator to join paths.',
    complexity: 'O(1)',
    example: `from pathlib import Path

# Create Path from string
path = Path("/Users/david/data.txt")

# Windows paths: use forward slash or raw string
path = Path("C:/Users/david/data.txt")
path = Path(r"C:\\Users\\david\\data.txt")

# Join paths with / operator
base = Path("/Users/david")
file_path = base / "documents" / "data.txt"
# Result: /Users/david/documents/data.txt`,
  },
  {
    section: 'pathlib',
    signature: 'Path.home(), Path.cwd()',
    description: 'Get home directory or current working directory. Cross-platform.',
    complexity: 'O(1)',
    example: `from pathlib import Path

# Home directory (cross-platform!)
home = Path.home()
# Mac/Linux: /Users/username
# Windows: C:\\Users\\username

# Current working directory
cwd = Path.cwd()
print(cwd)

# Build path from home
config_path = Path.home() / ".config" / "app.conf"`,
  },
  {
    section: 'pathlib',
    signature: 'path.open(mode, encoding)',
    description: 'Opens file from Path object. Same as open() but uses existing Path.',
    complexity: 'O(1)',
    example: `from pathlib import Path

path = Path.home() / "data.txt"

# Open using Path.open()
with path.open(mode="r", encoding="utf-8") as file:
    content = file.read()

# Equivalent to:
with open(path, mode="r", encoding="utf-8") as file:
    content = file.read()

# Useful when you already have Path object`,
  },
  {
    section: 'pathlib',
    signature: 'path.exists(), path.is_file(), path.is_dir()',
    description: 'Check if path exists and what type it is.',
    complexity: 'O(1)',
    example: `from pathlib import Path

path = Path("data.txt")

# Check existence
if path.exists():
    print("Path exists!")

# Check if file
if path.is_file():
    print("It's a file!")

# Check if directory
if path.is_dir():
    print("It's a directory!")

# Safe file reading
if path.exists() and path.is_file():
    with open(path) as file:
        content = file.read()`,
  },
  {
    section: 'pathlib',
    signature: 'path.touch(), path.mkdir()',
    description: 'Create empty file or directory.',
    complexity: 'O(1)',
    example: `from pathlib import Path

# Create empty file (like Unix touch)
path = Path("newfile.txt")
path.touch()

# Create directory
dir_path = Path("new_folder")
dir_path.mkdir()

# Create parent directories too
deep_path = Path("a/b/c")
deep_path.mkdir(parents=True)

# Don't error if already exists
dir_path.mkdir(exist_ok=True)`,
  },
]
