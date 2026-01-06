export interface DataTypePageConfig {
  type: string
  badge: string
  color: string
  description: string
  intro?: string
  tip: string
}

export const dataTypePageConfigs: Record<string, DataTypePageConfig> = {
  string: {
    type: 'String',
    badge: 'str',
    color: 'var(--accent-str)',
    description: 'Immutable text sequences. Every operation returns a NEW string. Use join() for building, f-strings for formatting.',
    intro: `String Building Performance: Choose the Right Tool
Building strings efficiently is critical—the wrong approach costs you O(n²) time. Use \`join()\` for loops (O(n)), \`f-strings\` for formatting (fastest, cleanest), and avoid \`+=\` in loops (O(n²) due to repeated copying). Each concatenation with \`+=\` creates a NEW string and copies all existing characters.

\`\`\`python
# BAD: O(n²) - Each += creates new string, copies everything
s = ""
for i in range(1000):
    s += str(i)  # 1st iteration: copy 1 char, 2nd: 2 chars, 3rd: 3 chars...
# Total: 1+2+3+...+1000 = 500,500 character copies!

# GOOD: O(n) - Build list (O(1) append), join once
parts = []
for i in range(1000):
    parts.append(str(i))  # Each append is O(1)
s = "".join(parts)  # Single O(n) concatenation

# BEST: O(n) - List comprehension + join (most Pythonic)
s = "".join(str(i) for i in range(1000))

# F-STRINGS: Best for formatting (not building in loops)
name, age = "Alice", 30
s = f"{name} is {age}"  # Fast, readable, expression support
s = f"{name.upper()} is {age * 2}"  # Can call methods, do math
s = f"{x:.2f}"  # Format specs for numbers

# When to use each:
# • join() → Building from many parts (loops, lists)
# • f-strings → Formatting values into template
# • += → NEVER in loops, OK for 2-3 one-time concatenations
\`\`\`python
---
Immutability: Every Operation Returns a NEW String
Strings cannot be modified in place—every operation creates a new string. This matters for performance and correctness. You cannot change a character like \`s[0] = 'X'\`. If you need character-level modification, convert to list first, modify, then join back.

\`\`\`python
# IMMUTABILITY DEMONSTRATED
s = "hello"
s[0] = "H"  # TypeError: 'str' object does not support item assignment
s.upper()   # Returns "HELLO" (new string)
print(s)    # Still "hello" - original unchanged!

# EVERY OPERATION CREATES NEW STRING
s = "hello"
s2 = s.upper()       # New string: "HELLO"
s3 = s.replace("l", "L")  # New string: "heLLo"
s4 = s + " world"    # New string: "hello world"
s5 = s[::-1]         # New string: "olleh"
# Original s is still "hello"

# WHY IMMUTABILITY MATTERS FOR PERFORMANCE
# Bad: Repeated string modification in loop
s = "hello"
for char in "world":
    s = s + char  # Creates new string each time (O(n²))

# Good: Build list, join once
s = "hello"
chars = list(s)
for char in "world":
    chars.append(char)  # Modify list in place (O(1))
result = "".join(chars)  # O(n) final join

# CHARACTER MODIFICATION PATTERN
s = "hello"
chars = list(s)  # Convert to mutable list
chars[0] = 'H'   # Modify in place (OK on list)
chars[4] = '!'   # Modify in place
result = "".join(chars)  # → "Hell!"

# When immutability helps:
# • Dictionary keys (must be immutable/hashable)
# • Function arguments (won't be modified accidentally)
# • Caching (same string always has same hash)
\`\`\`python
---
Master These Patterns: Two Pointers, Sliding Window, Frequency Maps
Three patterns solve most string interview problems. **Two Pointers** for palindromes and reversals (O(n)). **Sliding Window** for substrings with constraints (O(n)). **Character Frequency** with \`Counter\` for anagrams and character counting (O(n)).

\`\`\`python
# PATTERN 1: Two Pointers - Palindrome check
def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True
# Or one-liner: s == s[::-1]

# PATTERN 2: Sliding Window - Longest substring without repeating chars
def longest_unique_substring(s):
    seen = {}
    start = max_len = 0
    for end, char in enumerate(s):
        # If char seen and in current window, shrink window
        if char in seen and seen[char] >= start:
            start = seen[char] + 1
        seen[char] = end  # Track latest position
        max_len = max(max_len, end - start + 1)
    return max_len
# "abcabcbb" → 3 (abc)

# PATTERN 3: Character Frequency - Anagram detection
from collections import Counter
def are_anagrams(s1, s2):
    return Counter(s1) == Counter(s2)
# Or: sorted(s1) == sorted(s2) (simpler but O(n log n))

# Frequency map for character counting
def first_unique_char(s):
    freq = Counter(s)
    for i, char in enumerate(s):
        if freq[char] == 1:
            return i
    return -1  # No unique character

# PATTERN 4: Reverse words (split/join combo)
def reverse_words(s):
    return " ".join(s.split()[::-1])
# "hello world" → "world hello"

# PATTERN 5: Valid parentheses (stack pattern for strings)
def is_valid_parens(s):
    stack = []
    pairs = {'(': ')', '[': ']', '{': '}'}
    for char in s:
        if char in pairs:
            stack.append(char)
        elif not stack or pairs[stack.pop()] != char:
            return False
    return len(stack) == 0
\`\`\``,
    tip: `Building string in loop? "".join(parts) not s += - O(n) vs O(n²), CRITICAL for large strings!
Anagram check? sorted(s1) == sorted(s2) or Counter(s1) == Counter(s2) - Counter allows early exit
Palindrome? s == s[::-1] in one line - or two pointers: left/right converging (O(n), interview favorite)
Reverse words? " ".join(s.split()[::-1]) - split, reverse list, join (handles multiple spaces)
Two pointers for substrings? Classic pattern: left/right expand/contract for windows, palindromes, valid strings`,
  },
  int: {
    type: 'Integer',
    badge: 'int',
    color: 'var(--accent-int)',
    description: 'Integers are whole numbers with arbitrary precision. Python handles big integers natively—no overflow!',
    intro: `No Integer Overflow
Python integers have UNLIMITED precision—unlike C/Java where integers wrap at 2³¹-1, Python integers grow as large as memory allows. You can compute factorial(1000) or 2**10000 without errors. This eliminates overflow bugs but means operations are O(n) in digit count for huge numbers. No need for overflow checks in interviews.

\`\`\`python
# NO OVERFLOW - Arbitrarily large integers
factorial_100 = 1
for i in range(1, 101):
    factorial_100 *= i
# Result: 93326215443944152681699238856266700490715968264381621468...
# 158 digits! Compare to C/Java max: 2,147,483,647

print(2**100)  # 1267650600228229401496703205376
print(2**1000) # Works! (302 digits)

# Operations are O(n) in digit count for huge numbers
\`\`\`python
---
Division Types and Modulo
Python has THREE division operators. / always returns float. // is floor division rounding toward -∞ (NOT toward zero like C/Java). % is modulo with result having same sign as divisor. CRITICAL: -7 // 2 = -4 and -7 % 2 = 1 in Python (different from C/Java).

\`\`\`python
# TRUE DIVISION / - Always float
5 / 2      # 2.5 (not 2!)
10 / 3     # 3.3333...

# FLOOR DIVISION // - Rounds toward -∞
5 // 2     # 2 (floor of 2.5)
-7 // 2    # -4 (floor of -3.5, NOT -3!)
# CRITICAL: Rounds DOWN, not toward zero

# MODULO % - Same sign as divisor
5 % 2      # 1
-7 % 2     # 1 (NOT -1 like C/Java!)
7 % -2     # -1 (same sign as divisor)

# INVARIANT: a == (a // b) * b + (a % b)
# -7 == (-4) * 2 + 1 = -8 + 1 = -7 ✓

# DIVMOD - Get both at once
divmod(10, 3)  # (3, 1) = (10 // 3, 10 % 3)
divmod(-7, 2)  # (-4, 1)

# CIRCULAR INDEXING - Python's modulo shines
arr = [1, 2, 3, 4, 5]
arr[-2 % len(arr)]  # arr[3] = 4 (always valid!)
# -2 % 5 = 3 (wraps around)
\`\`\`python
---
Common Integer Patterns
Digit extraction with % 10 and // 10. XOR for finding unique elements (a ^ a = 0). Bit manipulation for flags and masks. Count True values with sum(). Use float('inf') for min/max initialization.

\`\`\`python
# DIGIT EXTRACTION - Right to left
n = 12345
while n:
    digit = n % 10  # Extract last digit
    n //= 10        # Remove last digit
# Simpler: [int(d) for d in str(12345)]

# REVERSE INTEGER
def reverse_int(n):
    sign = -1 if n < 0 else 1
    result = 0
    n = abs(n)
    while n:
        result = result * 10 + n % 10
        n //= 10
    return sign * result

# XOR TRICK - Find single non-duplicate
def single_number(nums):
    result = 0
    for n in nums:
        result ^= n  # a ^ a = 0, a ^ 0 = a
    return result
# [4, 1, 2, 1, 2] -> 4

# COUNT TRUE VALUES
bools = [True, False, True, True]
sum(bools)  # 3 (True = 1, False = 0)
sum(n % 2 == 0 for n in [1,2,3,4,5,6])  # 3 evens

# INFINITY FOR INITIALIZATION
min_val = float('inf')
for num in nums:
    min_val = min(min_val, num)

# POWER OF TWO CHECK
def is_power_of_2(n):
    return n > 0 and (n & (n - 1)) == 0
# 8 = 1000, 7 = 0111, 8 & 7 = 0000 ✓
\`\`\``,
    tip: `Need infinity for comparisons? float('inf') and float('-inf') - works with min/max
Reverse integer digits? int(str(abs(n))[::-1]) * (1 if n >= 0 else -1) - handle negatives!
Quotient + remainder together? divmod(a, b) returns (a//b, a%b) - one operation
Bit manipulation? Use &, |, ^, ~, <<, >> - O(1) operations, fast for flags/masks
Floor division with negatives? -7 // 2 = -4 (NOT -3!) - rounds toward -∞, not zero`,
  },
  float: {
    type: 'Float',
    badge: 'float',
    color: 'var(--accent-float)',
    description: 'Floats are double-precision (64-bit) floating point numbers. Use math.isclose() for comparisons!',
intro: `Use math.isclose() for Comparisons
Floats are 64-bit IEEE 754 double-precision with FINITE PRECISION (~15-17 digits). Many decimals like 0.1, 0.2, 0.3 cannot be exactly represented in binary—0.1 + 0.2 = 0.30000000000000004 (not 0.3!). NEVER use == for float comparisons—use math.isclose() instead. For exact decimal arithmetic (finance), use decimal.Decimal.

\`\`\`python
# PRECISION ISSUE - NEVER use ==
0.1 + 0.2 == 0.3  # False (!)
0.1 + 0.2         # 0.30000000000000004

# CORRECT - Use math.isclose()
import math
math.isclose(0.1 + 0.2, 0.3)  # True
math.isclose(1.000001, 1.0, rel_tol=1e-5)  # True

# Cumulative errors
sum_val = 0.0
for _ in range(10):
    sum_val += 0.1
sum_val == 1.0  # False! (0.9999999999999999)
math.isclose(sum_val, 1.0)  # True
\`\`\`python
---
Float vs Decimal
Use float for scientific computation (fast, hardware-supported). Use Decimal for exact decimal arithmetic where precision matters (finance, money). Decimal is slower but has configurable precision and no binary representation issues.

\`\`\`python
# FLOAT - Fast but imprecise decimals
price = 0.1 + 0.2  # 0.30000000000000004
total = price * 3  # 0.9000000000000001 (wrong!)

# DECIMAL - Exact decimal arithmetic
from decimal import Decimal
price = Decimal('0.1') + Decimal('0.2')  # Decimal('0.3')
total = price * 3  # Decimal('0.9') (exact!)

# Always use string constructor
Decimal(0.1)    # Decimal('0.1000000000000000055...') (bad!)
Decimal('0.1')  # Decimal('0.1') (exact!)

# Configure precision
from decimal import getcontext
getcontext().prec = 50  # 50 decimal places
\`\`\`python
---
Infinity and NaN
Use float('inf') and float('-inf') for unbounded values in comparisons. Use math.isnan() to check for NaN—NEVER use == since nan != nan (even to itself). Use math.isinf() for infinity checks.

\`\`\`python
# INFINITY - Larger than any finite number
inf = float('inf')
print(inf > 1000000)  # True
print(min(5, 10, inf))  # 5

# Initialize min/max
min_val = float('inf')
max_val = float('-inf')
for num in nums:
    min_val = min(min_val, num)
    max_val = max(max_val, num)

# NaN - Not a Number
nan = float('nan')
nan == nan  # False (!)
math.isnan(nan)  # True (correct way)

# Division by zero
float('inf') / float('inf')  # nan
1.0 / 0.0  # ZeroDivisionError
\`\`\``,
    tip: `NEVER use == for floats! Use math.isclose(a, b, rel_tol=1e-9) - handles relative tolerance automatically
Binary search on floats? while right - left > epsilon (NOT left < right!) - finite precision needs epsilon
Money/finance calculations? Use Decimal('0.1') not float(0.1) - pass STRINGS to Decimal for exactness!
Float precision? ~15-17 significant digits only - 0.1 + 0.2 ≠ 0.3 due to binary representation!
NaN comparisons? NEVER use ==, always math.isnan(x) - nan != nan (even to itself!)`,
  },
  bool: {
    type: 'Boolean',
    badge: 'bool',
    color: 'var(--accent-bool)',
    description: 'Booleans represent True/False values. Bool is a subclass of int—True is 1, False is 0.',
intro: `bool is Subclass of int
True is literally 1, False is 0—you can do arithmetic with booleans. This enables elegant patterns like sum(condition for x in items) to count matches. All objects have truthiness: 0, [], "", None, False are falsy; everything else is truthy. Use sum() to count True values, any() for OR, all() for AND.

\`\`\`python
# BOOL ARITHMETIC - True=1, False=0
True + True   # 2
True * 10     # 10
False * 10    # 0

# COUNT TRUE VALUES
bools = [True, False, True, True, False]
sum(bools)  # 3 (counts True)

# COUNT CONDITIONS
nums = [1, 2, 3, 4, 5, 6]
count_even = sum(n % 2 == 0 for n in nums)  # 3
count_positive = sum(n > 0 for n in nums)   # 6
count_large = sum(n > 3 for n in nums)      # 3
\`\`\`
---
Truthiness and Falsy Values
Empty containers ([], {}, "", set()), zero (0, 0.0), and None are falsy. Everything else is truthy. Use if container: instead of if len(container) > 0:. Use bool() to convert to True/False explicitly.

\`\`\`python
# FALSY VALUES - These are False in boolean context
bool([])        # False (empty list)
bool({})        # False (empty dict)
bool("")        # False (empty string)
bool(0)         # False (zero)
bool(0.0)       # False (zero float)
bool(None)      # False
bool(False)     # False

# TRUTHY - Everything else
bool([1])       # True (non-empty list)
bool("text")    # True (non-empty string)
bool(42)        # True (non-zero number)
bool(" ")       # True (whitespace is not empty!)

# IDIOMATIC CHECKS
if items:  # Better than if len(items) > 0:
    process(items)

if not result:  # Better than if result == []:
    handle_empty()
\`\`\`
---
Boolean Operations
any() returns True if ANY element is truthy (short-circuits on first True). all() returns True if ALL elements are truthy (short-circuits on first False). Use these for elegant condition checking instead of loops.

\`\`\`python
# ANY - At least one True
any([False, False, True])  # True
any([False, False])        # False
any([])                    # False (empty is False)

# Check if any element > 10
any(x > 10 for x in [1, 5, 15, 3])  # True

# ALL - Every element True
all([True, True, True])  # True
all([True, False])       # False
all([])                  # True (vacuous truth!)

# Check if all even
all(x % 2 == 0 for x in [2, 4, 6, 8])  # True

# SHORT-CIRCUIT
def expensive_check(x):
    print(f"Checking {x}")
    return x > 5

# Only checks until first True
any(expensive_check(x) for x in [1, 2, 10, 20])
# Prints: Checking 1, Checking 2, Checking 10
# Stops at 10 (first True)
\`\`\``,
    tip: `Count True values? sum(bool_list) or sum(x > 0 for x in data) - True=1, False=0 (bool subclasses int!)
Short-circuit defaults? name = name or "Guest" - GOTCHA: fails if name="" is valid! Use "is None" instead
All elements pass test? all(x > 0 for x in nums) - short-circuits on first False, returns True for empty!
Any element pass test? any(x > 0 for x in nums) - short-circuits on first True, returns False for empty!
Falsy values MEMORIZE? False, None, 0, 0.0, 0j, "", [], {}, () - EVERYTHING else is truthy (including "False"!)`,
  },
  list: {
    type: 'List',
    badge: 'list',
    color: 'var(--accent-list)',
    description: "Python's go-to ordered collection. Mutable, dynamic sizing. O(1) append/pop end, O(n) insert/remove elsewhere.",
intro: `Use Lists When...
Lists are mutable, ordered, dynamic arrays with O(1) append/pop at END, but O(n) insert/delete in MIDDLE (elements must shift). Appending is O(1) amortized with occasional resizes. For frequent front operations, use collections.deque with O(1) appendleft/popleft. Lists are the default choice for ordered collections.

\`\`\`python
# FAST OPERATIONS - O(1)
arr = [1, 2, 3]
arr.append(4)      # O(1) - add to end
arr.pop()          # O(1) - remove from end  
arr[-1]            # O(1) - access by index
len(arr)           # O(1) - cached length

# SLOW OPERATIONS - O(n)
arr.insert(0, 99)  # O(n) - shift all elements right
arr.pop(0)         # O(n) - shift all elements left
99 in arr          # O(n) - linear search
arr.remove(99)     # O(n) - find then shift

# Use deque for O(1) front operations
from collections import deque
dq = deque([1, 2, 3])
dq.appendleft(0)   # O(1)
dq.popleft()       # O(1)
\`\`\`python
---
Mutable Default Argument Gotcha
NEVER use mutable defaults like def f(arr=[]). Python evaluates defaults ONCE at function definition—all calls share the SAME list object! This causes mysterious bugs where data persists across calls. Use arr=None and create new list inside function.

\`\`\`python
# WRONG - Mutable default (shared across calls!)
def append_wrong(item, arr=[]):
    arr.append(item)
    return arr

append_wrong(1)  # [1]
append_wrong(2)  # [1, 2] (!)  Same list!
append_wrong(3)  # [1, 2, 3] (!!!)

# CORRECT - Use None default
def append_right(item, arr=None):
    if arr is None:
        arr = []
    arr.append(item)
    return arr

append_right(1)  # [1]
append_right(2)  # [2]  New list each time
append_right(3)  # [3]

# WHY: Default evaluated ONCE
def show_id(arr=[]):
    print(id(arr))  # Same object every call!
    return arr

show_id()  # 140234567890
show_id()  # 140234567890 (same!)
\`\`\`python
---
Two Pointers and In-Place Modification
Use two pointers for array problems: left/right converging for palindrome, fast/slow for cycle detection. For in-place modifications, write index tracks where to write, read index scans ahead. Avoid creating new lists when you can modify in place.

\`\`\`python
# TWO POINTERS - Reverse in place
def reverse(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1

# REMOVE DUPLICATES - In place
def remove_duplicates(arr):
    if not arr:
        return 0
    write = 1  # Where to write next unique
    for read in range(1, len(arr)):
        if arr[read] != arr[read - 1]:
            arr[write] = arr[read]
            write += 1
    return write  # New length

# PARTITION - Move all < pivot to left
def partition(arr, pivot):
    write = 0
    for read in range(len(arr)):
        if arr[read] < pivot:
            arr[write], arr[read] = arr[read], arr[write]
            write += 1
    return write
\`\`\``,
    tip: `Last element? arr[-1], second to last arr[-2] - negative indexing from end (O(1))
Copy shallow? arr[:] or arr.copy() - deep copy nested? import copy; copy.deepcopy(arr)
Insert/pop at FRONT O(n)? Use collections.deque for O(1) appendleft/popleft - critical optimization!
Sort in place? arr.sort() returns None (modifies arr) - sorted copy? sorted(arr) returns new list
Mutable default BUG? NEVER def f(arr=[]) - use arr=None, check if arr is None: arr = []`,
  },
  tuple: {
    type: 'Tuple',
    badge: 'tuple',
    color: 'var(--accent-tuple)',
    description: 'Immutable sequences. Hashable, memory-efficient. Only 2 methods. Use for fixed data, dict keys, function returns.',
intro: `Use Tuples for Immutable Sequences
Tuples are immutable—cannot be modified after creation. Immutability enables hashability, making tuples usable as dict keys and set elements (lists can't be hashed). CRITICAL: immutability is SHALLOW—tuple([1, 2], [3, 4]) can't be reassigned, but inner lists CAN be modified. Use tuples for fixed data (coordinates, function returns), dict keys, and performance (faster than lists).

\`\`\`python
# IMMUTABLE - Can't modify
t = (1, 2, 3)
# t[0] = 99  # TypeError!
# t.append(4)  # AttributeError!

# HASHABLE - Can be dict key
coords = {}
coords[(0, 0)] = "origin"
coords[(1, 2)] = "point"
# coords[[1, 2]] = "bad"  # TypeError! Lists not hashable

# SHALLOW IMMUTABILITY - Inner objects can change
t = ([1, 2], [3, 4])
# t[0] = [99]  # TypeError! Can't reassign
t[0].append(99)  # OK! Inner list is mutable
print(t)  # ([1, 2, 99], [3, 4])

# PERFORMANCE - Tuples are faster
import sys
sys.getsizeof((1, 2, 3))  # 64 bytes
sys.getsizeof([1, 2, 3])  # 88 bytes (larger!)
\`\`\`python
---
Tuple Unpacking and Multiple Return Values
Tuple unpacking assigns multiple variables in one line. Functions return multiple values as tuples. Swap variables with a, b = b, a. Use _ for values you don't need.

\`\`\`python
# BASIC UNPACKING
t = (1, 2, 3)
a, b, c = t  # a=1, b=2, c=3

# SWAP WITHOUT TEMP
x, y = 5, 10
x, y = y, x  # x=10, y=5 (elegant!)

# MULTIPLE RETURN VALUES
def min_max(arr):
    return min(arr), max(arr)

lo, hi = min_max([1, 5, 3, 9, 2])  # lo=1, hi=9

# IGNORE VALUES WITH _
first, _, third = (1, 2, 3)  # first=1, third=3

# STAR UNPACKING - Collect rest
first, *rest = (1, 2, 3, 4, 5)
# first=1, rest=[2, 3, 4, 5]

*head, last = (1, 2, 3, 4, 5)
# head=[1, 2, 3, 4], last=5

first, *middle, last = (1, 2, 3, 4, 5)
# first=1, middle=[2, 3, 4], last=5
\`\`\`python
---
Tuples vs Lists
Use tuples for heterogeneous data (different types, fixed structure like coordinates). Use lists for homogeneous data (same type, variable length like numbers). Tuples are immutable and hashable. Lists are mutable and faster for append/extend.

\`\`\`python
# TUPLE - Heterogeneous, fixed structure
person = ("Alice", 30, "Engineer")  # Name, age, job
# Different types, fixed meaning for each position

# LIST - Homogeneous, variable length
numbers = [1, 2, 3, 4, 5]  # All ints, can grow
numbers.append(6)  # OK
numbers.extend([7, 8, 9])  # OK

# TUPLE FOR DICT KEYS
positions = {}
positions[(0, 0)] = "start"
positions[(10, 5)] = "checkpoint"
# Lists can't be keys!

# SINGLE ELEMENT TUPLE - Need trailing comma
t = (42,)  # Tuple with one element
not_tuple = (42)  # Just 42 (int), not a tuple!
type((42,))  # <class 'tuple'>
type((42))   # <class 'int'>

# EMPTY TUPLE
empty = ()
empty = tuple()
\`\`\``,
    tip: `Need hashable dict key? Use tuple (x, y) for coordinates - lists aren't hashable! GOTCHA: tuple([1, 2]) is hashable, tuple([1, [2]]) is NOT
Swap values elegantly? a, b = b, a - no temp variable needed (tuple unpacking)
Return multiple values? return a, b, c - automatically creates tuple, unpack with x, y, z = func()
Single-item tuple? (x,) with trailing comma - (x) is just parenthesized expression, NOT tuple!
Immutability is SHALLOW? t = ([1, 2], [3]) - can't reassign t[0], but CAN modify t[0].append(99)!`,
  },
  dict: {
    type: 'Dictionary',
    badge: 'dict',
    color: 'var(--accent-dict)',
    description: 'Hash table with O(1) key-value lookups. Keys must be hashable. Ordered since Python 3.7.',
    intro: `Use Dicts When You Need O(1) Lookups
Hash tables provide instant O(1) key-value lookups. The classic interview optimization: convert nested O(n²) loops to single O(n) pass with a dict. Checking \`if key in dict\` is O(1) vs \`if x in list\` which is O(n). Keys must be hashable (strings, numbers, tuples OK; lists, dicts, sets NOT allowed). Ordered since Python 3.7 (insertion order maintained).

\`\`\`python
# TWO SUM: Classic O(n²) to O(n) optimization
# BAD: Nested loops check all pairs
def two_sum_slow(nums, target):
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]  # O(n²)

# GOOD: Dict tracks what we've seen
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        if target - num in seen:  # O(1) lookup
            return [seen[target - num], i]
        seen[num] = i  # O(1) insert
# O(n) total - single pass

# HASHABLE KEYS RULE:
d = {1: "int", "key": "str", (1, 2): "tuple"}  # OK
d = {[1, 2]: "list"}  # TypeError - lists are mutable
\`\`\`python
---
Dict vs DefaultDict vs Counter
Regular dict for general key-value storage. DefaultDict when missing keys should auto-create with default value. Counter for frequency counting with built-in operations. Each solves common patterns more elegantly.

\`\`\`python
# REGULAR DICT:
freq = {}
for x in [1, 2, 2, 3]:
    freq[x] = freq.get(x, 0) + 1

# DEFAULTDICT:
from collections import defaultdict
freq = defaultdict(int)
for x in [1, 2, 2, 3]:
    freq[x] += 1  # Auto-creates 0

# COUNTER:
from collections import Counter
freq = Counter([1, 2, 2, 3])
freq.most_common(2)  # → [(2, 2), (3, 1)]

# GROUPING with defaultdict:
groups = defaultdict(list)
for word in ["cat", "dog", "car"]:
    groups[word[0]].append(word)
# → {'c': ['cat', 'car'], 'd': ['dog']}
\`\`\`python
---
Master These Patterns
Two Sum with "seen" dict. Frequency counting with Counter. Grouping with defaultdict(list). Memoization caches results. These four patterns solve most dict interview problems.

\`\`\`python
# PATTERN 1: Two Sum
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        if target - num in seen:
            return [seen[target - num], i]
        seen[num] = i

# PATTERN 2: Frequency
from collections import Counter
def first_unique(s):
    freq = Counter(s)
    for i, char in enumerate(s):
        if freq[char] == 1:
            return i
    return -1

# PATTERN 3: Grouping - Anagrams
from collections import defaultdict
def group_anagrams(words):
    groups = defaultdict(list)
    for word in words:
        key = "".join(sorted(word))
        groups[key].append(word)
    return list(groups.values())

# PATTERN 4: Memoization
memo = {}
def fib(n):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]
\`\`\``,
    tip: `Two Sum pattern? seen = {}; if (target - num) in seen: return - O(1) lookup beats O(n²) loops, MOST COMMON optimization!
Count frequency? Counter(arr).most_common(k) fastest - or manual: freq={}; freq[x]=freq.get(x,0)+1
Group by key? defaultdict(list) auto-creates lists - or d.setdefault(key, []).append(val) for regular dict
Avoid KeyError? d.get(key, default) returns default if missing - or check "if key in d:" before access (O(1))
Keys must be HASHABLE? Strings/ints/tuples OK, lists/dicts/sets NOT - use tuple(list) to freeze for key`,
  },
  set: {
    type: 'Set',
    badge: 'set',
    color: 'var(--accent-set)',
    description: 'Unordered collection with O(1) membership testing. Automatic deduplication. Elements must be hashable.',
intro: `Use Sets for O(1) Membership Testing
Sets are unordered collections of unique, hashable elements with O(1) membership testing. "if x in my_list" is O(n), but "if x in my_set" is O(1)—constant time regardless of size. This is the most common interview optimization: convert list to set. Automatic deduplication makes sets perfect for uniqueness. Elements must be hashable (ints, strings, tuples OK; lists, dicts NOT OK).

\`\`\`python
# O(1) MEMBERSHIP - Much faster than list
seen = set()
if 42 in seen:  # O(1) - constant time
    print("Found!")

# Compare to list (O(n) - linear time)
seen_list = []
if 42 in seen_list:  # O(n) - scans every element!
    print("Slow!")

# REMOVE DUPLICATES AUTOMATICALLY
nums = [1, 2, 2, 3, 3, 3, 4]
unique = set(nums)  # {1, 2, 3, 4}
# Back to list: list(unique) but LOSES order!

# HASHABLE ELEMENTS ONLY
s = {1, "text", (1, 2)}  # OK
# s = {1, [2, 3]}  # TypeError! Lists not hashable
# s = {1, {2: 3}}  # TypeError! Dicts not hashable

# EMPTY SET - MUST use set()
empty = set()  # Correct
# empty = {}  # WRONG! This is empty DICT!
\`\`\`python
---
Set Operations for Common Patterns
Use & for intersection (common elements), | for union (all elements), - for difference (in A not B), ^ for symmetric difference (in either but not both). These operations are O(min(len(a), len(b))) and much clearer than loops.

\`\`\`python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# INTERSECTION & - Elements in both
a & b  # {3, 4}
a.intersection(b)  # Same thing

# UNION | - All elements
a | b  # {1, 2, 3, 4, 5, 6}
a.union(b)  # Same thing

# DIFFERENCE - - In a but not b
a - b  # {1, 2}
a.difference(b)  # Same thing

# SYMMETRIC DIFFERENCE ^ - In either but not both
a ^ b  # {1, 2, 5, 6}
a.symmetric_difference(b)  # Same thing

# SUBSET / SUPERSET
{1, 2} <= {1, 2, 3}  # True (subset)
{1, 2, 3} >= {1, 2}  # True (superset)

# INTERVIEW PATTERN - Find common elements
def common_elements(arr1, arr2):
    return list(set(arr1) & set(arr2))
\`\`\`python
---
"Have We Seen X?" Pattern
Use seen = set() for duplicate detection. Add elements to seen as you process. Check membership with if x in seen: for O(1) lookups. This pattern is fundamental for two-sum, finding duplicates, detecting cycles.

\`\`\`python
# FIND FIRST DUPLICATE
def first_duplicate(arr):
    seen = set()
    for x in arr:
        if x in seen:
            return x  # Found duplicate!
        seen.add(x)
    return None

# TWO SUM with set
def two_sum(arr, target):
    seen = set()
    for num in arr:
        complement = target - num
        if complement in seen:
            return True
        seen.add(num)
    return False

# LINKED LIST CYCLE - Fast/slow + set
def has_cycle(head):
    seen = set()
    while head:
        if head in seen:
            return True  # Cycle detected!
        seen.add(head)
        head = head.next
    return False

# REMOVE DUPLICATES (preserve order)
def remove_dups_ordered(arr):
    seen = set()
    result = []
    for x in arr:
        if x not in seen:
            seen.add(x)
            result.append(x)
    return result

# Python 3.7+: dict.fromkeys() preserves order
def remove_dups_ordered_short(arr):
    return list(dict.fromkeys(arr))
\`\`\``,
    tip: `"Have we seen X?" pattern? seen = set(); if x in seen: ... - O(1) membership test, MUCH faster than list!
Remove duplicates? list(set(arr)) but LOSES order - Preserve order? list(dict.fromkeys(arr)) (3.7+)
Common elements? a & b (intersection) - Unique to a? a - b (difference) - All? a | b (union) - XOR? a ^ b
Empty set? MUST use set() NOT {} - {} creates empty DICT!
Elements must be HASHABLE? Can add ints/strings/tuples, CANNOT add lists/dicts/sets - use frozenset for hashable set`,
  },
}
