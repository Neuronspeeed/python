export const statementsIntro = `Assignment Creates References, Not Copies
When you write \`a = b\`, Python creates a new reference to the same object, not a copy. For immutable objects (int, str, tuple), this doesn't matter—you can't modify them. For mutable objects (list, dict, set), this is CRITICAL—changes through one reference affect ALL references. The key insight: Python passes references everywhere, making it fast but requiring careful handling of mutable objects.

\`\`\`python
# REFERENCE SEMANTICS
a = [1, 2, 3]        # a references a list
b = a                # b references SAME list
b.append(4)
print(a)             # [1, 2, 3, 4] — a sees the change!

# CREATE A COPY
a = [1, 2, 3]
b = a[:]             # b is a NEW list (copy)
b.append(4)
print(a)             # [1, 2, 3] — unchanged

# IMMUTABLE OBJECTS - References don't matter
x = 5
y = x                # y references same int
y += 1               # Creates NEW int, rebinds y
print(x)             # 5 — unchanged (ints are immutable)

# MULTIPLE REFERENCES TO MUTABLE
def bad_default(L=[]):
    L.append(1)
    return L

bad_default()  # [1]
bad_default()  # [1, 1] — Same list!

def good_default(L=None):
    if L is None:
        L = []       # New list each call
    L.append(1)
    return L
\`\`\`
---
Assignment Forms and Evaluation Order
Python's assignment evaluates the right side first, then binds names on the left. Multiple assignment \`a = b = c = []\` creates ONE object with three references. Sequence unpacking \`x, y = 1, 2\` evaluates right, then unpacks to left. Augmented assignment \`x += 1\` modifies in-place for mutables, creates new for immutables. Walrus operator \`:=\` assigns within expressions.

\`\`\`python
# BASIC ASSIGNMENT - Right side first
x = y = z = []       # ONE list, THREE names
x.append(1)
print(z)             # [1] — all names reference same list

# SEQUENCE UNPACKING
x, y = 1, 2          # Unpack tuple
a, b = [10, 20]      # Unpack list
first, *rest = [1, 2, 3, 4]  # first=1, rest=[2,3,4]

# SWAP - Classic Python idiom
a, b = b, a          # Right side evaluates first: (b, a) tuple
                     # Then unpacks to a, b

# AUGMENTED ASSIGNMENT
nums = [1, 2]
nums += [3, 4]       # Modifies in-place (mutables)
print(nums)          # [1, 2, 3, 4]

x = 5
x += 1               # Creates NEW int (immutables)

# WALRUS OPERATOR := (Python 3.8+)
if (n := len(data)) > 10:  # Assign AND use in one expression
    print(f"Large dataset: {n} items")

# Useful in while loops
while (line := file.readline()):
    process(line)
\`\`\`
---
Expression Statements and Print
Expression statements evaluate expressions but discard results—useful for function calls with side effects. Print sends output to stdout with automatic newline. Use \`sep\` to change separator, \`end\` to change line ending, \`file\` to redirect output. Print is a function in Python 3, not a statement like Python 2.

\`\`\`python
# EXPRESSION STATEMENTS - Call functions for side effects
mylist.append(1)     # Returns None, but modifies list
mydict.update(x=1)   # Returns None, but modifies dict
print("Hello")       # Returns None, but prints

# PRINT FUNCTION
print("Hello", "World")  # Hello World (space separator)
print("A", "B", sep="-") # A-B (custom separator)
print("Hello", end="")   # No newline
print("World")           # HelloWorld (on same line)

# PRINT TO FILE
with open("log.txt", "w") as f:
    print("Log entry", file=f)  # Redirect to file

# FORMATTED PRINTING
name, age = "Alice", 30
print(f"{name} is {age} years old")  # F-strings (Python 3.6+)
print("{} is {} years old".format(name, age))  # .format()
print("%s is %d years old" % (name, age))  # Old %-formatting

# DEBUGGING TRICK - Print with value labels
x = 42
print(f"{x=}")       # x=42 (Python 3.8+)
\`\`\``
