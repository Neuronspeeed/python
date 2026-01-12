import{c as e,r as t}from"./index-BvioVRON.js";const n={string:{type:`String`,badge:`str`,color:`var(--accent-str)`,description:`Immutable text sequences. Every operation returns a NEW string. Use join() for building, f-strings for formatting.`,intro:`String Building Performance: Choose the Right Tool
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
\`\`\``,tip:`Building string in loop? "".join(parts) not s += - O(n) vs O(n²), CRITICAL for large strings!
Anagram check? sorted(s1) == sorted(s2) or Counter(s1) == Counter(s2) - Counter allows early exit
Palindrome? s == s[::-1] in one line - or two pointers: left/right converging (O(n), interview favorite)
Reverse words? " ".join(s.split()[::-1]) - split, reverse list, join (handles multiple spaces)
Two pointers for substrings? Classic pattern: left/right expand/contract for windows, palindromes, valid strings`},int:{type:`Integer`,badge:`int`,color:`var(--accent-int)`,description:`Integers are whole numbers with arbitrary precision. Python handles big integers natively—no overflow!`,intro:`No Integer Overflow
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
# -7 == (-4) * 2 + 1 = -8 + 1 = -7
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
# 8 = 1000, 7 = 0111, 8 & 7 = 0000\`\`\``,tip:`Need infinity for comparisons? float('inf') and float('-inf') - works with min/max
Reverse integer digits? int(str(abs(n))[::-1]) * (1 if n >= 0 else -1) - handle negatives!
Quotient + remainder together? divmod(a, b) returns (a//b, a%b) - one operation
Bit manipulation? Use &, |, ^, ~, <<, >> - O(1) operations, fast for flags/masks
Floor division with negatives? -7 // 2 = -4 (NOT -3!) - rounds toward -∞, not zero`},float:{type:`Float`,badge:`float`,color:`var(--accent-float)`,description:`Floats are double-precision (64-bit) floating point numbers. Use math.isclose() for comparisons!`,intro:`Use math.isclose() for Comparisons
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
\`\`\``,tip:`NEVER use == for floats! Use math.isclose(a, b, rel_tol=1e-9) - handles relative tolerance automatically
Binary search on floats? while right - left > epsilon (NOT left < right!) - finite precision needs epsilon
Money/finance calculations? Use Decimal('0.1') not float(0.1) - pass STRINGS to Decimal for exactness!
Float precision? ~15-17 significant digits only - 0.1 + 0.2 ≠ 0.3 due to binary representation!
NaN comparisons? NEVER use ==, always math.isnan(x) - nan != nan (even to itself!)`},bool:{type:`Boolean`,badge:`bool`,color:`var(--accent-bool)`,description:`Booleans represent True/False values. Bool is a subclass of int—True is 1, False is 0.`,intro:`bool is Subclass of int
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
\`\`\``,tip:`Count True values? sum(bool_list) or sum(x > 0 for x in data) - True=1, False=0 (bool subclasses int!)
Short-circuit defaults? name = name or "Guest" - GOTCHA: fails if name="" is valid! Use "is None" instead
All elements pass test? all(x > 0 for x in nums) - short-circuits on first False, returns True for empty!
Any element pass test? any(x > 0 for x in nums) - short-circuits on first True, returns False for empty!
Falsy values MEMORIZE? False, None, 0, 0.0, 0j, "", [], {}, () - EVERYTHING else is truthy (including "False"!)`},list:{type:`List`,badge:`list`,color:`var(--accent-list)`,description:`Python's go-to ordered collection. Mutable, dynamic sizing. O(1) append/pop end, O(n) insert/remove elsewhere.`,intro:`Use Lists When...
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
\`\`\``,tip:`Last element? arr[-1], second to last arr[-2] - negative indexing from end (O(1))
Copy shallow? arr[:] or arr.copy() - deep copy nested? import copy; copy.deepcopy(arr)
Insert/pop at FRONT O(n)? Use collections.deque for O(1) appendleft/popleft - critical optimization!
Sort in place? arr.sort() returns None (modifies arr) - sorted copy? sorted(arr) returns new list
Mutable default BUG? NEVER def f(arr=[]) - use arr=None, check if arr is None: arr = []`},tuple:{type:`Tuple`,badge:`tuple`,color:`var(--accent-tuple)`,description:`Immutable sequences. Hashable, memory-efficient. Only 2 methods. Use for fixed data, dict keys, function returns.`,intro:`Use Tuples for Immutable Sequences
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
\`\`\``,tip:`Need hashable dict key? Use tuple (x, y) for coordinates - lists aren't hashable! GOTCHA: tuple([1, 2]) is hashable, tuple([1, [2]]) is NOT
Swap values elegantly? a, b = b, a - no temp variable needed (tuple unpacking)
Return multiple values? return a, b, c - automatically creates tuple, unpack with x, y, z = func()
Single-item tuple? (x,) with trailing comma - (x) is just parenthesized expression, NOT tuple!
Immutability is SHALLOW? t = ([1, 2], [3]) - can't reassign t[0], but CAN modify t[0].append(99)!`},dict:{type:`Dictionary`,badge:`dict`,color:`var(--accent-dict)`,description:`Hash table with O(1) key-value lookups. Keys must be hashable. Ordered since Python 3.7.`,intro:`Use Dicts When You Need O(1) Lookups
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
\`\`\``,tip:`Two Sum pattern? seen = {}; if (target - num) in seen: return - O(1) lookup beats O(n²) loops, MOST COMMON optimization!
Count frequency? Counter(arr).most_common(k) fastest - or manual: freq={}; freq[x]=freq.get(x,0)+1
Group by key? defaultdict(list) auto-creates lists - or d.setdefault(key, []).append(val) for regular dict
Avoid KeyError? d.get(key, default) returns default if missing - or check "if key in d:" before access (O(1))
Keys must be HASHABLE? Strings/ints/tuples OK, lists/dicts/sets NOT - use tuple(list) to freeze for key`},set:{type:`Set`,badge:`set`,color:`var(--accent-set)`,description:`Unordered collection with O(1) membership testing. Automatic deduplication. Elements must be hashable.`,intro:`Use Sets for O(1) Membership Testing
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
\`\`\``,tip:`"Have we seen X?" pattern? seen = set(); if x in seen: ... - O(1) membership test, MUCH faster than list!
Remove duplicates? list(set(arr)) but LOSES order - Preserve order? list(dict.fromkeys(arr)) (3.7+)
Common elements? a & b (intersection) - Unique to a? a - b (difference) - All? a | b (union) - XOR? a ^ b
Empty set? MUST use set() NOT {} - {} creates empty DICT!
Elements must be HASHABLE? Can add ints/strings/tuples, CANNOT add lists/dicts/sets - use frozenset for hashable set`}},r=[{section:`Fundamentals`,signature:`String Literals`,description:`Strings are sequences of characters. Create with single or double quotes. Use triple quotes for multiline strings.`,complexity:`Concept`,example:`# Single or double quotes
string1 = 'Hello, world'
string2 = "1234"

# Mix quotes to include quotes
string3 = "We're #1!"
string4 = 'I said, "Put it over by the llama."'

# Triple quotes for multiline (preserves whitespace)
paragraph = """This is
a multiline
string."""

# Backslash for long lines (no whitespace preserved)
long = "This is a very long \\
string on multiple lines"`},{section:`Fundamentals`,signature:`len(string)`,description:`Returns the number of characters in a string, including spaces.`,complexity:`O(1)`,example:`# Length of strings
print(len("abc"))          # 3
print(len("Don't Panic"))  # 11
print(len(""))             # 0

# Use with variables
letters = "abc"
num_letters = len(letters)
print(num_letters)         # 3`},{section:`Fundamentals`,signature:`String Indexing`,description:`Access individual characters by position. Indices start at 0. Negative indices count from the end (-1 is last).`,complexity:`O(1)`,example:`flavor = "apple pie"

# Positive indices (0-based)
print(flavor[0])   # 'a' - first character
print(flavor[1])   # 'p'
print(flavor[6])   # 'p'

# Negative indices (from end)
print(flavor[-1])  # 'e' - last character
print(flavor[-2])  # 'i'
print(flavor[-9])  # 'a' - first character

# IndexError if out of bounds
# flavor[9]   # IndexError!
# flavor[-10] # IndexError!`},{section:`Fundamentals`,signature:`String Slicing [start:end:step]`,description:`Extract substring using [start:end]. Start is inclusive, end is exclusive. Omit values to slice from start/to end.`,complexity:`O(k)`,example:`s = "apple pie"

# Basic slicing [start:end]
print(s[0:3])    # "app" - chars 0,1,2
print(s[6:9])    # "pie"

# Omit start (defaults to 0)
print(s[:5])     # "apple" - first 5 chars
print(s[:3])     # "app"

# Omit end (defaults to len)
print(s[6:])     # "pie" - from 6 to end
print(s[0:])     # "apple pie" - entire string

# Negative indices
print(s[-3:])    # "pie" - last 3 chars
print(s[:-4])    # "apple" - all but last 4

# Out of bounds = no error
print(s[:100])   # "apple pie" - goes to end
print(s[50:60])  # "" - empty string

# Step (every nth character)
print(s[::2])    # "apeepi" - every 2nd char
print(s[::-1])   # "eip elppa" - reverse!`},{section:`Fundamentals`,signature:`String Concatenation (+)`,description:`Combine strings using + operator. Strings are immutable - creates new string each time.`,complexity:`O(n+m)`,example:`# Basic concatenation
string1 = "abra"
string2 = "cadabra"
magic = string1 + string2
print(magic)  # "abracadabra"

# Add space between
first = "Arthur"
last = "Dent"
full = first + " " + last
print(full)  # "Arthur Dent"

# Multiple concatenations
greeting = "Hello" + " " + "world" + "!"

# Concatenation in loop (SLOW - O(n²))
# DON'T DO THIS:
result = ""
for i in range(1000):
    result += str(i)  # Creates new string each time!

# USE join() instead (O(n))
result = "".join(str(i) for i in range(1000))`},{section:`Fundamentals`,signature:`String Immutability`,description:`Strings cannot be modified after creation. Must create new string to make changes.`,complexity:`Concept`,example:`# Cannot modify individual characters
word = "goal"
# word[0] = "f"  # TypeError!

# Create new string instead
word = "f" + word[1:]  # "foal"

# Methods return NEW strings
name = "Picard"
upper = name.upper()   # Creates "PICARD"
print(name)            # Still "Picard"
print(upper)           # "PICARD"

# Reassign to change
name = name.upper()    # Now name is "PICARD"`}],ee=[{section:`Why & When`,signature:`Why use Strings?`,description:`Strings store text data. They are IMMUTABLE - every operation creates a new string. Use for text processing, user input, file paths, API responses.`,complexity:`Concept`,example:`# Strings are IMMUTABLE sequences of characters
name = "Alice"
name[0] = "B"  # ERROR! Can't modify

# Every method returns a NEW string
upper = name.upper()  # Creates new string
print(name)   # Still "Alice"
print(upper)  # "ALICE"

# Use strings for:
# - Text data (names, messages, content)
# - File paths and URLs
# - Configuration values
# - API request/response data`},{section:`Why & When`,signature:`String vs other types`,description:`String vs bytes: text vs binary. String vs list: immutable vs mutable. Use f-strings for formatting, join() for building.`,complexity:`Concept`,example:`# STRING vs BYTES
text = "hello"      # str - Unicode text
data = b"hello"     # bytes - raw binary

# STRING vs LIST of chars
s = "hello"         # Immutable, less memory
lst = list("hello") # Mutable, can modify

# BUILDING STRINGS
# BAD - O(n²) due to immutability
result = ""
for i in range(1000):
    result += str(i)  # Creates new string each time!

# GOOD - O(n) using join
parts = [str(i) for i in range(1000)]
result = "".join(parts)

# FORMATTING - use f-strings (Python 3.6+)
name, age = "Alice", 30
print(f"{name} is {age}")  # Best way!`},{section:`Why & When`,signature:`Performance tips`,description:`join() is O(n), += in loop is O(n²). Use in operator for substring check. f-strings are fastest for formatting.`,complexity:`O(varies)`,example:`# FAST operations
s[0]           # O(1) - index access
len(s)         # O(1) - length stored
"x" in s       # O(n) - but optimized

# SLOW operations
s1 + s2        # O(n) - creates new string
s += "x"       # O(n) each time!

# String building comparison:
# "+=" in loop:  O(n²) - DON'T DO THIS
# "".join(lst):  O(n)  - USE THIS

# Formatting speed (fastest to slowest):
f"{x}"         # f-string (fastest)
"%s" % x       # %-formatting
"{}".format(x) # .format()`}],i=[{section:`Case Methods`,signature:`str.upper()`,description:`Returns a copy with all characters converted to uppercase.`,complexity:`O(n)`,example:`s = "hello"
print(s.upper())  # "HELLO"`},{section:`Case Methods`,signature:`str.lower()`,description:`Returns a copy with all characters converted to lowercase.`,complexity:`O(n)`,example:`s = "HELLO"
print(s.lower())  # "hello"`},{section:`Case Methods`,signature:`str.capitalize()`,description:`Returns a copy with first character capitalized, rest lowercased.`,complexity:`O(n)`,example:`s = "hello WORLD"
print(s.capitalize())  # "Hello world"`},{section:`Case Methods`,signature:`str.title()`,description:`Returns titlecased version where words start with uppercase.`,complexity:`O(n)`,example:`s = "hello world"
print(s.title())  # "Hello World"`},{section:`Case Methods`,signature:`str.swapcase()`,description:`Returns copy with uppercase converted to lowercase and vice versa.`,complexity:`O(n)`,example:`s = "Hello World"
print(s.swapcase())  # "hELLO wORLD"`},{section:`Case Methods`,signature:`str.casefold()`,description:`Returns casefolded copy for caseless matching. More aggressive than lower().`,complexity:`O(n)`,example:`print("ß".casefold())  # "ss"`}],a=[{section:`Checking Methods`,signature:`str.islower()`,description:`Returns True if all cased characters are lowercase.`,complexity:`O(n)`,example:`print("hello".islower())  # True
print("Hello".islower())  # False
print("123".islower())    # False (no cased chars)`},{section:`Checking Methods`,signature:`str.isupper()`,description:`Returns True if all cased characters are uppercase.`,complexity:`O(n)`,example:`print("HELLO".isupper())  # True
print("Hello".isupper())  # False`},{section:`Checking Methods`,signature:`str.istitle()`,description:`Returns True if string is titlecased (words start with uppercase).`,complexity:`O(n)`,example:`print("Hello World".istitle())  # True
print("Hello world".istitle())  # False`},{section:`Checking Methods`,signature:`str.isascii()`,description:`Returns True if all characters are ASCII (0-127). Empty string returns True.`,complexity:`O(n)`,example:`print("hello".isascii())  # True
print("héllo".isascii())  # False
print("".isascii())       # True`},{section:`Checking Methods`,signature:`str.isdecimal()`,description:`Returns True if all characters are decimal digits (0-9 only).`,complexity:`O(n)`,example:`print("123".isdecimal())   # True
print("①②③".isdecimal())  # False (unicode digits)
print("1.5".isdecimal())   # False`},{section:`Checking Methods`,signature:`str.isnumeric()`,description:`Returns True if all characters are numeric (includes fractions, subscripts).`,complexity:`O(n)`,example:`print("123".isnumeric())   # True
print("½".isnumeric())     # True (fraction)
print("²".isnumeric())     # True (superscript)`},{section:`Checking Methods`,signature:`str.isidentifier()`,description:`Returns True if string is a valid Python identifier.`,complexity:`O(n)`,example:`print("my_var".isidentifier())  # True
print("2fast".isidentifier())   # False (starts with digit)
print("class".isidentifier())   # True (but is keyword!)
import keyword
keyword.iskeyword("class")      # True`},{section:`Checking Methods`,signature:`str.isprintable()`,description:`Returns True if all characters are printable or string is empty.`,complexity:`O(n)`,example:`print("hello".isprintable())  # True
print("hello\\n".isprintable()) # False (newline)
print("".isprintable())        # True`},{section:`Checking Methods`,signature:`str.isalpha()`,description:`Returns True if all characters are alphabetic.`,complexity:`O(n)`,example:`print("hello".isalpha())  # True
print("hello1".isalpha())  # False`},{section:`Checking Methods`,signature:`str.isdigit()`,description:`Returns True if all characters are digits.`,complexity:`O(n)`,example:`print("123".isdigit())  # True`},{section:`Checking Methods`,signature:`str.isalnum()`,description:`Returns True if all characters are alphanumeric.`,complexity:`O(n)`,example:`print("hello123".isalnum())  # True`},{section:`Checking Methods`,signature:`str.isspace()`,description:`Returns True if all characters are whitespace.`,complexity:`O(n)`,example:`print("   ".isspace())  # True`}],o=[{section:`Search Methods`,signature:`str.find(sub[, start[, end]])`,description:`Returns lowest index of substring. Returns -1 if not found.`,complexity:`O(n*m)`,example:`s = "hello world"
print(s.find("world"))  # 6
print(s.find("xyz"))  # -1`},{section:`Search Methods`,signature:`str.rfind(sub[, start[, end]])`,description:`Returns highest index of substring. Returns -1 if not found.`,complexity:`O(n*m)`,example:`s = "hello world"
print(s.rfind("o"))  # 7`},{section:`Search Methods`,signature:`str.index(sub[, start[, end]])`,description:`Like find() but raises ValueError if not found.`,complexity:`O(n*m)`,example:`s = "hello"
print(s.index("l"))  # 2`},{section:`Search Methods`,signature:`str.rindex(sub[, start[, end]])`,description:`Like rfind() but raises ValueError if not found.`,complexity:`O(n*m)`,example:`s = "hello"
print(s.rindex("l"))  # 3 (last 'l')
# s.rindex("z")       # ValueError`},{section:`Search Methods`,signature:`str.count(sub[, start[, end]])`,description:`Returns number of non-overlapping occurrences of substring.`,complexity:`O(n*m)`,example:`s = "hello"
print(s.count("l"))  # 2`},{section:`Search Methods`,signature:`str.startswith(prefix[, start[, end]])`,description:`Returns True if string starts with prefix.`,complexity:`O(k)`,example:`s = "hello"
print(s.startswith("he"))  # True`},{section:`Search Methods`,signature:`str.endswith(suffix[, start[, end]])`,description:`Returns True if string ends with suffix.`,complexity:`O(k)`,example:`s = "hello.py"
print(s.endswith(".py"))  # True`}],s=[{section:`Strip Methods`,signature:`str.strip([chars])`,description:`Returns copy with leading/trailing characters removed.`,complexity:`O(n)`,example:`s = "  hello  "
print(s.strip())  # "hello"`},{section:`Strip Methods`,signature:`str.lstrip([chars])`,description:`Returns copy with leading characters removed.`,complexity:`O(n)`,example:`s = "  hello"
print(s.lstrip())  # "hello"`},{section:`Strip Methods`,signature:`str.rstrip([chars])`,description:`Returns copy with trailing characters removed.`,complexity:`O(n)`,example:`s = "hello  "
print(s.rstrip())  # "hello"`}],c=[{section:`Split & Join`,signature:`str.split(sep=None, maxsplit=-1)`,description:`Returns list of words using sep as delimiter.`,complexity:`O(n)`,example:`s = "a,b,c"
print(s.split(","))  # ['a', 'b', 'c']`},{section:`Split & Join`,signature:`str.rsplit(sep=None, maxsplit=-1)`,description:`Like split() but splits from the right.`,complexity:`O(n)`,example:`s = "a/b/c"
print(s.rsplit("/", 1))  # ['a/b', 'c']`},{section:`Split & Join`,signature:`str.splitlines([keepends])`,description:`Returns list of lines. Splits on various line boundaries.`,complexity:`O(n)`,example:`s = "line1\\nline2\\nline3"
print(s.splitlines())       # ['line1', 'line2', 'line3']
print(s.splitlines(True))   # ['line1\\n', 'line2\\n', 'line3']

# Handles different line endings
"a\\rb\\nc\\r\\nd".splitlines()  # ['a', 'b', 'c', 'd']`},{section:`Split & Join`,signature:`str.partition(sep)`,description:`Splits at first occurrence of sep. Returns 3-tuple: (before, sep, after).`,complexity:`O(n)`,example:`s = "hello=world=!"
print(s.partition("="))  # ('hello', '=', 'world=!')

# If sep not found, returns (str, '', '')
print("hello".partition("="))  # ('hello', '', '')`},{section:`Split & Join`,signature:`str.rpartition(sep)`,description:`Like partition() but searches from the right.`,complexity:`O(n)`,example:`s = "hello=world=!"
print(s.rpartition("="))  # ('hello=world', '=', '!')

# Useful for file extensions
path = "archive.tar.gz"
print(path.rpartition("."))  # ('archive.tar', '.', 'gz')`},{section:`Split & Join`,signature:`str.join(iterable)`,description:`Concatenates strings with str as separator.`,complexity:`O(n)`,example:`print(",".join(["a", "b", "c"]))  # "a,b,c"`}],l=[{section:`Replace & Transform`,signature:`str.replace(old, new[, count])`,description:`Returns copy with occurrences of old replaced by new.`,complexity:`O(n)`,example:`s = "hello"
print(s.replace("l", "L"))  # "heLLo"`},{section:`Replace & Transform`,signature:`str.removeprefix(prefix) [3.9+]`,description:`Returns string with prefix removed if present. (Python 3.9+)`,complexity:`O(n)`,example:`s = "test_function"
print(s.removeprefix("test_"))  # "function"
print(s.removeprefix("foo_"))   # "test_function" (unchanged)

# Before 3.9, you'd do:
# s[len(prefix):] if s.startswith(prefix) else s`},{section:`Replace & Transform`,signature:`str.removesuffix(suffix) [3.9+]`,description:`Returns string with suffix removed if present. (Python 3.9+)`,complexity:`O(n)`,example:`s = "file.txt"
print(s.removesuffix(".txt"))  # "file"
print(s.removesuffix(".py"))   # "file.txt" (unchanged)

# Before 3.9, you'd do:
# s[:-len(suffix)] if s.endswith(suffix) else s`},{section:`Replace & Transform`,signature:`str.expandtabs(tabsize=8)`,description:`Returns copy with tabs replaced by spaces.`,complexity:`O(n)`,example:`s = "a\\tb\\tc"
print(s.expandtabs())    # "a       b       c" (8 spaces)
print(s.expandtabs(4))   # "a   b   c" (4 spaces)`},{section:`Replace & Transform`,signature:`str.maketrans(x[, y[, z]])`,description:`Returns translation table for use with translate().`,complexity:`O(n)`,example:`# Single dict argument
table = str.maketrans({"a": "1", "b": "2"})

# Two strings (map chars from x to y)
table = str.maketrans("abc", "123")
print("abcdef".translate(table))  # "123def"

# Three args: x->y mapping, z chars deleted
table = str.maketrans("ae", "12", "lo")
print("hello".translate(table))  # "h12"`},{section:`Replace & Transform`,signature:`str.translate(table)`,description:`Returns copy with characters mapped through translation table.`,complexity:`O(n)`,example:`# Remove vowels
vowels = str.maketrans("", "", "aeiou")
print("hello world".translate(vowels))  # "hll wrld"

# ROT13 cipher
import codecs
codecs.encode("hello", "rot13")  # "uryyb"`}],u=[{section:`Padding & Alignment`,signature:`str.center(width[, fillchar])`,description:`Returns centered string of given width.`,complexity:`O(n)`,example:`print("hi".center(10, "-"))  # "----hi----"`},{section:`Padding & Alignment`,signature:`str.ljust(width[, fillchar])`,description:`Returns left-justified string of given width.`,complexity:`O(n)`,example:`print("hi".ljust(5))  # "hi   "`},{section:`Padding & Alignment`,signature:`str.rjust(width[, fillchar])`,description:`Returns right-justified string of given width.`,complexity:`O(n)`,example:`print("42".rjust(5, "0"))  # "00042"`},{section:`Padding & Alignment`,signature:`str.zfill(width)`,description:`Returns string padded with zeros on the left.`,complexity:`O(n)`,example:`print("42".zfill(5))  # "00042"`}],d=[{section:`User Input`,signature:`input([prompt])`,description:`Reads a line from user input and returns it as a string. Optional prompt is displayed to user.`,complexity:`O(n)`,example:`# Basic input
user_input = input()      # Waits for user to type

# With prompt
name = input("Enter your name: ")
print("Hello,", name)

# Process input
response = input("What should I shout? ")
shouted = response.upper()
print("Well, if you insist...", shouted)

# Input is always a string!
num = input("Enter a number: ")  # Returns string!
# num + 5  # TypeError - can't add str and int
num_int = int(num)  # Convert to int first
print(num_int + 5)  # OK now`}],f=[{section:`Number Formatting`,signature:`f-string number format`,description:`Format numbers in f-strings using {value:format}. Use .Nf for decimals, , for thousands, % for percentages.`,complexity:`O(n)`,example:`# Fixed-point notation (N decimal places)
n = 7.125
result = f"$\\{n:.2f}"          # "7.12" (2 decimals, rounds ties to even)
result = f"$\\{n:.3f}"          # "7.125"
result = f"$\\{1:.2f}"          # "1.00" (always shows N decimals)

# Thousands separator
x = 1234567890
result = f"$\\{x:,}"            # "1,234,567,890"
result = f"$\\{x:,.2f}"         # "1,234,567,890.00"

# Currency formatting
balance = 2000.0
spent = 256.35
remaining = balance - spent
message = f"Remaining: $$\\{remaining:,.2f}"  # "$1,743.65"

# Percentages (multiplies by 100, adds %)
ratio = 0.9
result = f"$\\{ratio:.1%}"      # "90.0%"
result = f"$\\{ratio:.2%}"      # "90.00%"
result = f"$\\{0.12345:.0%}"    # "12%"`}],p=[{section:`Encoding & Formatting`,signature:`str.encode(encoding="utf-8")`,description:`Encodes string using specified encoding. Returns bytes.`,complexity:`O(n)`,example:`print("hello".encode())  # b'hello'`},{section:`Encoding & Formatting`,signature:`str.format(*args, **kwargs)`,description:`Performs string formatting with replacement fields.`,complexity:`O(n)`,example:`print("{} {}".format("hello", "world"))`},{section:`Encoding & Formatting`,signature:`str.format_map(mapping)`,description:`Like format() but takes a single mapping directly.`,complexity:`O(n)`,example:`data = {"name": "Alice", "age": 30}
print("{name} is {age}".format_map(data))  # "Alice is 30"

# Useful with defaultdict for missing keys
from collections import defaultdict
d = defaultdict(lambda: "N/A", {"name": "Bob"})
print("{name}: {age}".format_map(d))  # "Bob: N/A"`}],m=[{section:`Unicode & Bytes`,signature:`bytes / bytearray`,description:`bytes: immutable raw binary. bytearray: mutable. Cannot mix with str—convert with encode/decode.`,complexity:`O(1)`,example:`# bytes - immutable binary
b = b"hello"           # bytes literal
b = bytes([104, 101])  # from int sequence

# bytearray - mutable binary
ba = bytearray(b"hello")
ba[0] = 72             # modify in place
print(ba)              # bytearray(b'Hello')

# Cannot mix str and bytes
# "hi" + b"there"  # TypeError!
"hi".encode() + b"there"  # OK: b'hithere'`},{section:`Unicode & Bytes`,signature:`str.encode() / bytes.decode()`,description:`Convert between str and bytes. Specify encoding for non-ASCII.`,complexity:`O(n)`,example:`# String to bytes
text = "café"
b = text.encode("utf-8")      # b'caf\\xc3\\xa9'
b = text.encode("latin-1")    # b'caf\\xe9'

# Bytes to string
b = b'caf\\xc3\\xa9'
s = b.decode("utf-8")         # "café"

# Error handling
b"\\xff".decode("utf-8", errors="replace")  # "�"
b"\\xff".decode("utf-8", errors="ignore")   # ""`},{section:`Unicode & Bytes`,signature:`File I/O modes`,description:`Text mode auto-decodes; binary mode reads raw bytes. Use encoding= for text files.`,complexity:`O(n)`,example:`# Text mode - auto decode/encode
with open("file.txt", "r", encoding="utf-8") as f:
    text = f.read()  # returns str

# Binary mode - raw bytes, no translation
with open("image.png", "rb") as f:
    data = f.read()  # returns bytes

# Write binary
with open("out.bin", "wb") as f:
    f.write(b"\\x00\\x01\\x02")`},{section:`Unicode & Bytes`,signature:`BOM handling (utf-8-sig)`,description:`Byte Order Mark identifies encoding. Use 'utf-8-sig' to handle automatically.`,complexity:`O(n)`,example:`# Read file with BOM
with open("file.txt", encoding="utf-8-sig") as f:
    text = f.read()  # BOM stripped automatically

# Write file with BOM
with open("file.txt", "w", encoding="utf-8-sig") as f:
    f.write("hello")  # BOM added at start

# Manual BOM check
data = open("file.txt", "rb").read()
if data.startswith(b'\\xef\\xbb\\xbf'):  # UTF-8 BOM
    text = data[3:].decode("utf-8")`},{section:`Unicode & Bytes`,signature:`unicodedata.normalize()`,description:`Normalize Unicode for consistent comparisons. NFC (composed) or NFD (decomposed).`,complexity:`O(n)`,example:`import unicodedata

# Same visual character, different representations
s1 = "café"           # 'é' as single char (U+00E9)
s2 = "cafe\\u0301"     # 'e' + combining accent

print(s1 == s2)       # False - different bytes!

# Normalize to compare
n1 = unicodedata.normalize("NFC", s1)
n2 = unicodedata.normalize("NFC", s2)
print(n1 == n2)       # True

# NFC: composed (Linux/Web)
# NFD: decomposed (macOS filenames)`}],h=[...r,...ee,...i,...a,...o,...s,...c,...l,...u,...d,...f,...p,...m],g=[{section:`Fundamentals`,signature:`Integer Basics`,description:`Integers are whole numbers. Python has UNLIMITED size (arbitrary precision). Use underscores for readability.`,complexity:`Concept`,example:`# Integer literals
x = 1
y = 1000000         # Hard to read
z = 1_000_000       # Use underscores for readability (Python 3.6+)

# Check type
print(type(42))     # <class 'int'>

# NO SIZE LIMIT - arbitrary precision!
huge = 99999999999999999999999999999999999999
print(huge)         # Works fine! No overflow.
print(huge + 1)     # Still works!

# Compare to other languages:
# Java int:  -2³¹ to 2³¹-1 (4 bytes, overflow possible)
# C int:     -2³¹ to 2³¹-1 (4 bytes, overflow possible)
# Python:    unlimited size!

# Negative integers
neg = -42
print(type(neg))    # <class 'int'>`},{section:`Fundamentals`,signature:`int(x=0)`,description:`Converts number or string to integer. Truncates floats toward zero. Optional base for string parsing.`,complexity:`O(n)`,example:`# From floats (truncates toward zero)
print(int(3.7))      # 3 (drops .7)
print(int(-3.7))     # -3 (toward zero, not floor!)
print(int(3.99))     # 3

# From strings (base 10 default)
print(int("42"))     # 42
print(int("  25 "))  # 25 (strips whitespace)

# From strings with different bases
print(int("1010", 2))   # 10 (binary)
print(int("ff", 16))    # 255 (hexadecimal)
print(int("77", 8))     # 63 (octal)
print(int("z", 36))     # 35 (base 36)

# From booleans
print(int(True))     # 1
print(int(False))    # 0`},{section:`Fundamentals`,signature:`Number Bases`,description:`Python supports binary (0b), octal (0o), hex (0x) literals. Use bin(), oct(), hex() for conversion.`,complexity:`Concept`,example:`# Integer literals in different bases
binary = 0b1010      # 10 in decimal
octal = 0o12         # 10 in decimal
hexadecimal = 0xa    # 10 in decimal
print(binary == octal == hexadecimal)  # True

# Convert TO different bases (returns string)
n = 42
print(bin(n))        # '0b101010' (binary)
print(oct(n))        # '0o52' (octal)
print(hex(n))        # '0x2a' (hexadecimal)

# Convert FROM different bases (use int with base)
print(int('101010', 2))  # 42 (from binary string)
print(int('52', 8))      # 42 (from octal string)
print(int('2a', 16))     # 42 (from hex string)`},{section:`Why & When`,signature:`Why use Integers?`,description:`Use integers for counting, indexing, exact calculations. Unlimited precision - no overflow. Faster than float for whole numbers.`,complexity:`Concept`,example:`# GOOD uses for int:
# - Counting and iteration
for i in range(10):  # Indices are always ints
    count += 1

# - Array/list indices
items = [10, 20, 30]
print(items[0])  # Index must be int

# - Exact calculations (no rounding errors)
total = 100 + 200 + 300  # 600 (exact)

# - Large numbers (no overflow!)
factorial_100 = 1
for i in range(1, 101):
    factorial_100 *= i
# Result: 93326215443944152681699238856266700490715968264...
# Would overflow in C/Java!

# - Bit manipulation
flags = 0b1010
print(flags & 0b0011)  # Bitwise operations

# BAD uses for int:
# - Measurements with decimals
# height = 1  # Should be 1.75 (float)
# - Money (use Decimal for precision)
# - Ratios/percentages (use float)`},{section:`Why & When`,signature:`Int vs Float vs Decimal`,description:`Int: exact whole numbers, unlimited size. Float: approximate decimals, fast. Decimal: exact decimals, slow.`,complexity:`Concept`,example:`# INT - exact whole numbers, unlimited
x = 123456789012345678901234567890  # No overflow!
print(x + 1)  # Exact

# FLOAT - approximate, limited precision
y = 0.1 + 0.2
print(y)  # 0.30000000000000004 (WRONG!)
print(y == 0.3)  # False

# DECIMAL - exact decimals, slower
from decimal import Decimal
z = Decimal('0.1') + Decimal('0.2')
print(z)  # 0.3 (CORRECT!)

# Performance comparison:
# int:     FAST for whole numbers, slower for huge values
# float:   FASTEST for decimals (hardware support)
# Decimal: SLOWEST (software implementation)

# Use cases:
# int:     counting, indices, large exact values
# float:   scientific computing, measurements
# Decimal: money, financial calculations`},{section:`Why & When`,signature:`Common Integer Patterns`,description:`Modulo for cyclic patterns. Floor division for chunking. Bit operations for flags/optimization.`,complexity:`Concept`,example:`# MODULO - cyclic patterns
# Alternating rows (even/odd)
for i in range(10):
    if i % 2 == 0:
        print(f"Row {i}: even")
    else:
        print(f"Row {i}: odd")

# Circular indexing
items = ['A', 'B', 'C']
for i in range(10):
    print(items[i % 3])  # Cycles: A, B, C, A, B, C...

# FLOOR DIVISION - chunking/pagination
total_items = 47
page_size = 10
num_pages = (total_items + page_size - 1) // page_size  # 5 (round up)

# DIVMOD - get quotient and remainder together
minutes = 125
hours, mins = divmod(minutes, 60)  # (2, 5) = 2h 5m

# POWER OF 2 CHECK - bit trick
def is_power_of_2(n):
    return n > 0 and (n & (n - 1)) == 0

print(is_power_of_2(16))  # True
print(is_power_of_2(15))  # False`},{section:`Number Base Conversion`,signature:`int(x, base)`,description:`Converts string in given base (2-36) to integer. Case-insensitive for letters.`,complexity:`O(n)`,example:`# Binary to int
print(int("1010", 2))   # 10
print(int("11111111", 2))  # 255

# Hexadecimal to int (0-9, a-f)
print(int("ff", 16))    # 255
print(int("FF", 16))    # 255 (case-insensitive)
print(int("a5", 16))    # 165

# Octal to int
print(int("77", 8))     # 63
print(int("100", 8))    # 64

# Base 36 (0-9, a-z)
print(int("z", 36))     # 35
print(int("10", 36))    # 36

# Remove prefix if parsing user input
hex_str = "0xff"
print(int(hex_str, 16))  # 255 (0x prefix allowed)`},{signature:`int.bit_length()`,description:`Returns the number of bits necessary to represent the integer in binary, excluding sign and leading zeros.`,complexity:`O(1)`,example:`print((37).bit_length())   # 6 (100101)
print((-37).bit_length())  # 6
print((0).bit_length())    # 0`},{signature:`int.bit_count() [3.10+]`,description:`Returns the number of ones in the binary representation. Also known as population count. Requires Python 3.10+.`,complexity:`O(1)`,example:`# Python 3.10+ required
print((13).bit_count())  # 3 (1101 has three 1s)
print((255).bit_count()) # 8`},{signature:`int.to_bytes(length, byteorder, *, signed=False)`,description:`Returns an array of bytes representing the integer.`,complexity:`O(n)`,example:`n = 1024
print(n.to_bytes(2, "big"))     # b'\\x04\\x00'
print(n.to_bytes(2, "little"))  # b'\\x00\\x04'
print((-1).to_bytes(1, "big", signed=True))  # b'\\xff'`},{signature:`int.from_bytes(bytes, byteorder, *, signed=False)`,description:`Class method that returns the integer represented by the given array of bytes.`,complexity:`O(n)`,example:`print(int.from_bytes(b'\\x04\\x00', "big"))    # 1024
print(int.from_bytes(b'\\xff', "big", signed=True))  # -1`},{signature:`int.as_integer_ratio()`,description:`Returns a pair of integers whose ratio equals the integer and denominator is 1.`,complexity:`O(1)`,example:`print((10).as_integer_ratio())  # (10, 1)
print((-3).as_integer_ratio())  # (-3, 1)`},{signature:`int.real`,description:`Property that returns the real part (the integer itself).`,complexity:`O(1)`,example:`n = 42
print(n.real)  # 42`},{signature:`int.imag`,description:`Property that returns the imaginary part (always 0 for integers).`,complexity:`O(1)`,example:`n = 42
print(n.imag)  # 0`},{signature:`int.numerator`,description:`Property that returns the numerator (the integer itself for integers).`,complexity:`O(1)`,example:`n = 42
print(n.numerator)  # 42`},{signature:`int.denominator`,description:`Property that returns the denominator (always 1 for integers).`,complexity:`O(1)`,example:`n = 42
print(n.denominator)  # 1`},{signature:`int.conjugate()`,description:`Returns the complex conjugate (the integer itself for real numbers).`,complexity:`O(1)`,example:`n = 42
print(n.conjugate())  # 42`},{signature:`x + y`,description:`Addition. Returns the sum of two numbers.`,complexity:`O(1)`,example:`print(5 + 3)   # 8
print(-5 + 3)  # -2`},{signature:`x - y`,description:`Subtraction. Returns the difference of two numbers.`,complexity:`O(1)`,example:`print(5 - 3)   # 2
print(3 - 5)   # -2`},{signature:`x * y`,description:`Multiplication. Returns the product of two numbers.`,complexity:`O(1)`,example:`print(5 * 3)   # 15
print(-5 * 3)  # -15`},{signature:`x / y`,description:`True division. Always returns a float.`,complexity:`O(1)`,example:`print(7 / 2)   # 3.5
print(6 / 2)   # 3.0 (still float!)`},{signature:`x // y`,description:`Floor division. Returns the largest integer less than or equal to the quotient.`,complexity:`O(1)`,example:`print(7 // 2)   # 3
print(-7 // 2)  # -4 (floors toward negative infinity)`},{signature:`x % y`,description:`Modulo. Returns the remainder of the division.`,complexity:`O(1)`,example:`print(7 % 3)   # 1
print(-7 % 3)  # 2 (Python: result has same sign as divisor)`},{signature:`x ** y`,description:`Exponentiation. Returns x raised to the power y.`,complexity:`O(log y)`,example:`print(2 ** 10)  # 1024
print((-2) ** 3) # -8
print(2 ** -1)  # 0.5 (returns float)`},{signature:`-x`,description:`Unary negation. Returns the negation of x.`,complexity:`O(1)`,example:`x = 5
print(-x)   # -5
print(-(-x)) # 5`},{signature:`+x`,description:`Unary plus. Returns x unchanged.`,complexity:`O(1)`,example:`x = -5
print(+x)  # -5 (no change)`},{signature:`abs(x)`,description:`Returns the absolute value of x.`,complexity:`O(1)`,example:`print(abs(-5))  # 5
print(abs(5))   # 5`},{signature:`divmod(x, y)`,description:`Returns tuple (x // y, x % y).`,complexity:`O(1)`,example:`print(divmod(7, 3))   # (2, 1)
print(divmod(-7, 3))  # (-3, 2)`},{signature:`pow(x, y[, z])`,description:`Returns x**y or (x**y) % z if z is provided. More efficient for modular exponentiation.`,complexity:`O(log y)`,example:`print(pow(2, 10))      # 1024
print(pow(2, 10, 100)) # 24 (modular exponentiation)`},{signature:`x & y`,description:`Bitwise AND. Returns 1 for each bit position where both bits are 1.`,complexity:`O(1)`,example:`print(5 & 3)   # 1 (0101 & 0011 = 0001)
print(12 & 10) # 8 (1100 & 1010 = 1000)`},{signature:`x | y`,description:`Bitwise OR. Returns 1 for each bit position where at least one bit is 1.`,complexity:`O(1)`,example:`print(5 | 3)   # 7 (0101 | 0011 = 0111)
print(12 | 10) # 14`},{signature:`x ^ y`,description:`Bitwise XOR. Returns 1 for each bit position where exactly one bit is 1.`,complexity:`O(1)`,example:`print(5 ^ 3)   # 6 (0101 ^ 0011 = 0110)
print(12 ^ 10) # 6`},{signature:`~x`,description:`Bitwise NOT. Returns the complement of x. Equivalent to -(x+1).`,complexity:`O(1)`,example:`print(~5)   # -6
print(~0)   # -1
print(~-1)  # 0`},{signature:`x << n`,description:`Left shift. Shifts bits left by n positions. Equivalent to x * (2**n).`,complexity:`O(1)`,example:`print(1 << 4)   # 16 (0001 -> 10000)
print(5 << 2)   # 20`},{signature:`x >> n`,description:`Right shift. Shifts bits right by n positions. Equivalent to x // (2**n).`,complexity:`O(1)`,example:`print(16 >> 2)  # 4 (10000 -> 100)
print(-16 >> 2) # -4 (arithmetic shift)`},{signature:`x == y`,description:`Equality. Returns True if x equals y.`,complexity:`O(1)`,example:`print(5 == 5)    # True
print(5 == 5.0)  # True (cross-type comparison)`},{signature:`x != y`,description:`Inequality. Returns True if x does not equal y.`,complexity:`O(1)`,example:`print(5 != 3)  # True
print(5 != 5)  # False`},{signature:`x < y`,description:`Less than. Returns True if x is strictly less than y.`,complexity:`O(1)`,example:`print(3 < 5)  # True
print(5 < 5)  # False`},{signature:`x <= y`,description:`Less than or equal. Returns True if x is less than or equal to y.`,complexity:`O(1)`,example:`print(3 <= 5)  # True
print(5 <= 5)  # True`},{signature:`x > y`,description:`Greater than. Returns True if x is strictly greater than y.`,complexity:`O(1)`,example:`print(5 > 3)  # True
print(5 > 5)  # False`},{signature:`x >= y`,description:`Greater than or equal. Returns True if x is greater than or equal to y.`,complexity:`O(1)`,example:`print(5 >= 3)  # True
print(5 >= 5)  # True`},{signature:`bin(x)`,description:`Converts integer to binary string prefixed with "0b".`,complexity:`O(log n)`,example:`print(bin(10))   # '0b1010'
print(bin(-10))  # '-0b1010'`},{signature:`oct(x)`,description:`Converts integer to octal string prefixed with "0o".`,complexity:`O(log n)`,example:`print(oct(8))   # '0o10'
print(oct(64))  # '0o100'`},{signature:`hex(x)`,description:`Converts integer to hexadecimal string prefixed with "0x".`,complexity:`O(log n)`,example:`print(hex(255))  # '0xff'
print(hex(16))   # '0x10'`},{signature:`round(x[, ndigits])`,description:`Rounds to nearest integer (or ndigits decimal places). Uses banker's rounding.`,complexity:`O(1)`,example:`print(round(2.5))   # 2 (banker's rounding)
print(round(3.5))   # 4
print(round(2.675, 2))  # 2.67 (float precision!)`}],_=[{section:`Fundamentals`,signature:`Float Basics`,description:`Floating-point numbers represent real numbers with decimals. IEEE 754 standard. Use E-notation for very large/small values.`,complexity:`Concept`,example:`# Float literals
x = 1.0
y = 1.25
z = -2.75

# E-notation for large/small numbers
big = 1e6           # 1000000.0 (1 × 10⁶)
small = 1e-4        # 0.0001 (1 × 10⁻⁴)
print(2e17)         # 2e+17 (Python displays large floats in E-notation)

# Underscores for readability (Python 3.6+)
readable = 1_000_000.0
tax_rate = 0.07_5   # 0.075

# Check type
print(type(1.0))    # <class 'float'>
print(type(1))      # <class 'int'>

# Special values
print(2e400)        # inf (overflow)
print(-2e400)       # -inf
print(float('nan')) # nan (not a number)`},{section:`Fundamentals`,signature:`Floating-Point Precision`,description:`Floats are APPROXIMATIONS in binary. Decimals like 0.1 cannot be represented exactly. Use Decimal for financial calculations.`,complexity:`Concept`,example:`# THE PROBLEM: 0.1 + 0.2 ≠ 0.3
print(0.1 + 0.2)              # 0.30000000000000004 (WRONG!)
print(0.1 + 0.2 == 0.3)       # False

# Why? Binary cannot represent 0.1 exactly
# 0.1 in binary is infinite: 0.00011001100110011...
# Stored as approximation: 0.1000000000000000055511...

# Python displays shortest decimal that rounds to stored value
print(0.1)                    # 0.1 (not the full approximation)

# SOLUTION 1: Decimal module (exact decimal arithmetic)
from decimal import Decimal
print(Decimal('0.1') + Decimal('0.2'))  # 0.3 (CORRECT!)

# SOLUTION 2: math.isclose() for comparisons
import math
print(math.isclose(0.1 + 0.2, 0.3))     # True

# SOLUTION 3: Round for display/comparison
print(round(0.1 + 0.2, 10) == round(0.3, 10))  # True`},{section:`Fundamentals`,signature:`float(x=0.0)`,description:`Converts number or string to float. Returns 0.0 if no argument.`,complexity:`O(n)`,example:`# From integers
print(float(3))        # 3.0
print(float(0))        # 0.0
print(float(-5))       # -5.0

# From strings
print(float("3.14"))   # 3.14
print(float("1.25"))   # 1.25
print(float("  42 "))  # 42.0 (strips whitespace)

# Special string values
print(float("inf"))    # inf
print(float("-inf"))   # -inf
print(float("nan"))    # nan

# From booleans
print(float(True))     # 1.0
print(float(False))    # 0.0`},{section:`Fundamentals`,signature:`round(number[, ndigits])`,description:`Rounds to nearest integer or ndigits decimals. Uses banker's rounding (ties to even).`,complexity:`O(1)`,example:`# Round to nearest integer
print(round(2.3))        # 2
print(round(2.7))        # 3
print(round(-2.7))       # -3

# Round to decimal places
print(round(3.14159, 2)) # 3.14
print(round(2.71828, 3)) # 2.718

# BANKER'S ROUNDING: ties (0.5) round to EVEN
print(round(2.5))        # 2 (rounds down to even)
print(round(3.5))        # 4 (rounds up to even)
print(round(4.5))        # 4 (rounds down to even)
print(round(5.5))        # 6 (rounds up to even)

# WARNING: Precision issues
print(round(2.675, 2))   # 2.67 (not 2.68 due to binary storage!)`}],v=[{section:`Why & When`,signature:`Why use Floats?`,description:`Use floats for scientific calculations, measurements, continuous values. NOT for money (use Decimal). Understand precision limits.`,complexity:`Concept`,example:`# GOOD uses for float:
# - Scientific calculations
speed = 299_792_458.0  # m/s
distance = speed * 3600  # meters in 1 hour

# - Measurements and ratios
height = 1.75  # meters
weight = 68.5  # kg
bmi = weight / (height ** 2)

# - Statistical analysis
import statistics
temps = [72.5, 73.1, 71.8, 74.2]
avg = statistics.mean(temps)

# BAD uses for float:
# - Money (use Decimal instead!)
# price = 19.99  # WRONG - precision errors!
from decimal import Decimal
price = Decimal('19.99')  # CORRECT

# - Counting (use int instead!)
# count = 5.0  # WRONG - should be int
count = 5  # CORRECT`},{section:`Why & When`,signature:`Float vs Decimal vs Fraction`,description:`Float: fast approximations. Decimal: exact decimals (finance). Fraction: exact ratios. Choose based on needs.`,complexity:`Concept`,example:`# FLOAT - fast but approximate (scientific computing)
x = 0.1
y = 0.2
print(x + y)  # 0.30000000000000004 (WRONG but FAST)

# DECIMAL - exact decimals but slower (finance, money)
from decimal import Decimal
price1 = Decimal('19.99')
price2 = Decimal('5.01')
total = price1 + price2  # Decimal('25.00') (CORRECT & SLOW)

# FRACTION - exact ratios (math, music)
from fractions import Fraction
f1 = Fraction(1, 3)  # 1/3
f2 = Fraction(2, 3)  # 2/3
print(f1 + f2)  # 1 (EXACT)

# Performance comparison:
# float:    O(1) - hardware support
# Decimal:  O(n) - software implementation
# Fraction: O(n) - GCD calculations`},{section:`Why & When`,signature:`Float Comparison Pitfalls`,description:`NEVER use == for floats. Use math.isclose() or round(). Accumulation errors grow with operations.`,complexity:`Concept`,example:`import math

# WRONG - direct comparison
print(0.1 + 0.2 == 0.3)  # False! (precision error)

# CORRECT - use math.isclose()
print(math.isclose(0.1 + 0.2, 0.3))  # True

# CORRECT - round for comparison
print(round(0.1 + 0.2, 10) == round(0.3, 10))  # True

# ACCUMULATION ERRORS - grow with many operations
total = 0.0
for i in range(10):
    total += 0.1
print(total)  # 0.9999999999999999 (not 1.0!)
print(math.isclose(total, 1.0))  # True

# SOLUTION: Minimize operations or use Decimal
from decimal import Decimal
total = Decimal('0')
for i in range(10):
    total += Decimal('0.1')
print(total)  # 1.0 (exact!)`}],y=[{section:`Float Methods`,signature:`float.is_integer()`,description:`Returns True if the float is finite with integral value (no decimal part).`,complexity:`O(1)`,example:`print((3.0).is_integer())   # True
print((3.5).is_integer())   # False
print((-0.0).is_integer())  # True
print((1e10).is_integer())  # True

# Useful for validation
x = 4.0
if x.is_integer():
    print("Whole number")`},{section:`Float Methods`,signature:`float.as_integer_ratio()`,description:`Returns pair of integers (numerator, denominator) whose ratio exactly equals the float.`,complexity:`O(1)`,example:`# Simple ratios
print((0.5).as_integer_ratio())   # (1, 2) - 1/2
print((1.5).as_integer_ratio())   # (3, 2) - 3/2
print((0.75).as_integer_ratio())  # (3, 4) - 3/4

# Shows precision issues!
print((0.1).as_integer_ratio())
# (3602879701896397, 36028797018963968) - binary approximation!

# Convert back to Fraction
from fractions import Fraction
f = Fraction(*((0.1).as_integer_ratio()))
print(f)  # 3602879701896397/36028797018963968`},{section:`Float Methods`,signature:`float.hex()`,description:`Returns hexadecimal string representation showing exact binary value. Useful for exact float serialization.`,complexity:`O(1)`,example:`print((255.0).hex())    # '0x1.fe00000000000p+7'
print((-0.5).hex())     # '-0x1.0000000000000p-1'
print((0.0).hex())      # '0x0.0p+0'

# Round-trip conversion (preserves exact value)
x = 0.1
hex_str = x.hex()
y = float.fromhex(hex_str)
print(x == y)  # True (exact match!)`},{section:`Float Methods`,signature:`float.fromhex(s)`,description:`Class method creating float from hexadecimal string. Guarantees exact value preservation.`,complexity:`O(n)`,example:`print(float.fromhex('0x1.ffffp10'))  # 2047.984375
print(float.fromhex('0x1.0p-1'))     # 0.5
print(float.fromhex('0x0.0p+0'))     # 0.0

# Perfect for exact float serialization
original = 0.1
stored = original.hex()  # Save to file/database
restored = float.fromhex(stored)  # Load back
print(original == restored)  # True (bit-for-bit match!)`},{section:`Float Methods`,signature:`float.conjugate()`,description:`Returns complex conjugate. For floats, returns the float itself (compatibility with complex).`,complexity:`O(1)`,example:`x = 3.14
print(x.conjugate())  # 3.14 (same as x)

# Mainly for complex number compatibility
c = 3 + 4j
print(c.conjugate())  # (3-4j)`}],b=[{section:`Float Properties`,signature:`float.real`,description:`Read-only property returning the real part (the float itself). Compatibility with complex.`,complexity:`O(1)`,example:`x = 3.14
print(x.real)  # 3.14

# Complex compatibility
c = 3 + 4j
print(c.real)  # 3.0`},{section:`Float Properties`,signature:`float.imag`,description:`Read-only property returning imaginary part (always 0.0 for floats). Compatibility with complex.`,complexity:`O(1)`,example:`x = 3.14
print(x.imag)  # 0.0

# Complex compatibility
c = 3 + 4j
print(c.imag)  # 4.0`}],x=[{section:`Arithmetic Operations`,signature:`x + y`,description:`Addition. Returns float if either operand is float. Watch for precision errors.`,complexity:`O(1)`,example:`print(3.5 + 2.5)   # 6.0
print(3.5 + 2)     # 5.5 (int promoted to float)
print(0.1 + 0.2)   # 0.30000000000000004 (precision!)`},{section:`Arithmetic Operations`,signature:`x - y`,description:`Subtraction. Returns float if either operand is float.`,complexity:`O(1)`,example:`print(5.5 - 3.0)   # 2.5
print(5.5 - 3)     # 2.5
print(3 - 2.5)     # 0.5`},{section:`Arithmetic Operations`,signature:`x * y`,description:`Multiplication. Returns float if either operand is float.`,complexity:`O(1)`,example:`print(2.5 * 4.0)   # 10.0
print(2.5 * 4)     # 10.0
print(0.1 * 3)     # 0.30000000000000004 (precision!)`},{section:`Arithmetic Operations`,signature:`x / y`,description:`True division. ALWAYS returns float, even with two ints.`,complexity:`O(1)`,example:`print(7.0 / 2.0)   # 3.5
print(7.0 / 2)     # 3.5
print(7 / 2)       # 3.5 (both ints → float result!)
print(1 / 3)       # 0.3333333333333333`},{section:`Arithmetic Operations`,signature:`x // y`,description:`Floor division. With floats, returns float (not int!). Rounds toward negative infinity.`,complexity:`O(1)`,example:`print(7.5 // 2.0)  # 3.0 (not 3!)
print(-7.5 // 2.0) # -4.0 (rounds toward -∞)
print(7 // 2.0)    # 3.0
print(7.5 // 2)    # 3.0`},{section:`Arithmetic Operations`,signature:`x % y`,description:`Modulo. Returns float remainder if either operand is float.`,complexity:`O(1)`,example:`print(7.5 % 2.0)   # 1.5
print(7.5 % 2.5)   # 0.0
print(7.5 % 2)     # 1.5
print(-7.5 % 2.0)  # 0.5 (Python modulo has sign of divisor)`},{section:`Arithmetic Operations`,signature:`x ** y`,description:`Exponentiation. Can produce complex results for negative bases with fractional exponents.`,complexity:`O(1)`,example:`print(2.0 ** 0.5)    # 1.4142135623730951 (√2)
print(4.0 ** 0.5)    # 2.0
print(2.0 ** -1)     # 0.5 (negative exponent)
print((-1.0) ** 0.5) # (6.123233995736766e-17+1j) (complex!)`}],S=[{section:`Built-in Functions`,signature:`abs(x)`,description:`Returns absolute value (distance from zero).`,complexity:`O(1)`,example:`print(abs(-3.14))  # 3.14
print(abs(3.14))   # 3.14
print(abs(0.0))    # 0.0
print(abs(-0.0))   # 0.0`},{section:`Built-in Functions`,signature:`int(x)`,description:`Truncates float toward zero to integer. Drops decimal part.`,complexity:`O(1)`,example:`print(int(3.9))   # 3 (drops .9)
print(int(-3.9))  # -3 (toward zero, not floor!)
print(int(3.1))   # 3
print(int(-3.1))  # -3

# Compare to floor (rounds toward -∞)
import math
print(math.floor(3.9))   # 3
print(math.floor(-3.9))  # -4 (different!)`},{section:`Built-in Functions`,signature:`divmod(x, y)`,description:`Returns tuple (quotient, remainder) where quotient = x // y and remainder = x % y.`,complexity:`O(1)`,example:`print(divmod(7.5, 2.0))  # (3.0, 1.5)
print(divmod(10.5, 3.0)) # (3.0, 1.5)

# Equivalent to:
q, r = 7.5 // 2.0, 7.5 % 2.0
print(q, r)  # 3.0 1.5`}],C=[{section:`Math Module - Rounding`,signature:`math.floor(x)`,description:`Returns largest integer <= x (rounds toward -∞). Returns int in Python 3.`,complexity:`O(1)`,example:`import math
print(math.floor(3.7))   # 3
print(math.floor(-3.7))  # -4 (toward -∞)
print(math.floor(3.0))   # 3

# Compare to int() (truncates toward zero)
print(int(-3.7))         # -3 (different!)`},{section:`Math Module - Rounding`,signature:`math.ceil(x)`,description:`Returns smallest integer >= x (rounds toward +∞). Returns int in Python 3.`,complexity:`O(1)`,example:`import math
print(math.ceil(3.2))   # 4
print(math.ceil(-3.2))  # -3 (toward +∞)
print(math.ceil(3.0))   # 3

# Useful for "round up" scenarios
items_per_page = 10
total_items = 47
pages = math.ceil(total_items / items_per_page)  # 5`},{section:`Math Module - Rounding`,signature:`math.trunc(x)`,description:`Truncates x toward zero (drops decimal). Same as int(x) for numbers.`,complexity:`O(1)`,example:`import math
print(math.trunc(3.7))   # 3 (drops .7)
print(math.trunc(-3.7))  # -3 (toward zero)

# Equivalent to int() for numbers
print(int(3.7))   # 3
print(int(-3.7))  # -3`}],w=[{section:`Math Module - Power & Logarithm`,signature:`math.sqrt(x)`,description:`Returns square root of x. Raises ValueError for negative x.`,complexity:`O(1)`,example:`import math
print(math.sqrt(16))    # 4.0
print(math.sqrt(2))     # 1.4142135623730951
print(math.sqrt(0))     # 0.0

# For negative, use complex
# math.sqrt(-1)  # ValueError!
print((-1) ** 0.5)  # (6.123233995736766e-17+1j)`},{section:`Math Module - Power & Logarithm`,signature:`math.pow(x, y)`,description:`Returns x ** y as float. Unlike **, always returns float and handles special cases.`,complexity:`O(1)`,example:`import math
print(math.pow(2, 10))  # 1024.0 (always float)
print(math.pow(2, 0.5)) # 1.4142135623730951
print(2 ** 10)          # 1024 (int if both ints)`},{section:`Math Module - Power & Logarithm`,signature:`math.exp(x)`,description:`Returns e^x (e raised to power x).`,complexity:`O(1)`,example:`import math
print(math.exp(1))    # 2.718281828459045 (e)
print(math.exp(0))    # 1.0
print(math.exp(2))    # 7.38905609893065

# Natural exponential function
# Inverse of math.log()`},{section:`Math Module - Power & Logarithm`,signature:`math.log(x[, base])`,description:`Returns logarithm of x. Natural log (base e) by default, or specified base.`,complexity:`O(1)`,example:`import math
# Natural logarithm (base e)
print(math.log(math.e))    # 1.0
print(math.log(1))         # 0.0

# Custom base
print(math.log(100, 10))   # 2.0 (log₁₀ 100)
print(math.log(8, 2))      # 3.0 (log₂ 8)`},{section:`Math Module - Power & Logarithm`,signature:`math.log10(x)`,description:`Returns base-10 logarithm of x. Common for scientific notation.`,complexity:`O(1)`,example:`import math
print(math.log10(1000))  # 3.0 (10³ = 1000)
print(math.log10(1))     # 0.0
print(math.log10(100))   # 2.0

# How many digits?
n = 12345
digits = int(math.log10(n)) + 1  # 5`},{section:`Math Module - Power & Logarithm`,signature:`math.log2(x)`,description:`Returns base-2 logarithm of x. Useful for binary operations.`,complexity:`O(1)`,example:`import math
print(math.log2(8))    # 3.0 (2³ = 8)
print(math.log2(1024)) # 10.0 (2¹⁰ = 1024)

# Check if power of 2
def is_power_of_2(n):
    return n > 0 and math.log2(n).is_integer()`}],T=[{section:`Math Module - Special Values`,signature:`math.isnan(x)`,description:`Returns True if x is NaN (Not a Number). NaN != NaN, so use this function.`,complexity:`O(1)`,example:`import math
nan = float("nan")
print(math.isnan(nan))   # True
print(math.isnan(3.14))  # False

# NaN != NaN!
print(nan == nan)        # False (always!)
print(math.isnan(nan))   # True (correct way)`},{section:`Math Module - Special Values`,signature:`math.isinf(x)`,description:`Returns True if x is positive or negative infinity.`,complexity:`O(1)`,example:`import math
print(math.isinf(float("inf")))  # True
print(math.isinf(float("-inf"))) # True
print(math.isinf(3.14))          # False

# Infinity from overflow
print(math.isinf(1e308 * 10))  # True`},{section:`Math Module - Special Values`,signature:`math.isfinite(x)`,description:`Returns True if x is neither infinity nor NaN. Opposite of isinf() or isnan().`,complexity:`O(1)`,example:`import math
print(math.isfinite(3.14))           # True
print(math.isfinite(1e308))          # True
print(math.isfinite(float("inf")))   # False
print(math.isfinite(float("nan")))   # False

# Safe for calculations
if math.isfinite(result):
    print(f"Valid: {result}")`},{section:`Math Module - Special Values`,signature:`math.isclose(a, b, *, rel_tol=1e-9, abs_tol=0.0)`,description:`Returns True if a and b are close. ESSENTIAL for float comparison. Use instead of ==.`,complexity:`O(1)`,example:`import math

# WRONG - direct comparison
print(0.1 + 0.2 == 0.3)  # False!

# CORRECT - use isclose
print(math.isclose(0.1 + 0.2, 0.3))  # True

# Custom tolerance
print(math.isclose(1.0, 1.001, rel_tol=0.01))  # True (1% tolerance)
print(math.isclose(1.0, 1.001, rel_tol=0.0001))  # False

# Absolute tolerance for values near zero
print(math.isclose(0.0, 1e-10, abs_tol=1e-9))  # True`}],E=[{section:`Math Module - Trigonometry`,signature:`math.sin(x)`,description:`Returns sine of x (in radians). Returns value in [-1, 1].`,complexity:`O(1)`,example:`import math
print(math.sin(0))              # 0.0
print(math.sin(math.pi / 2))    # 1.0
print(math.sin(math.pi))        # 1.2246467991473532e-16 (≈0)

# Degrees to radians
angle_deg = 90
angle_rad = math.radians(angle_deg)
print(math.sin(angle_rad))  # 1.0`},{section:`Math Module - Trigonometry`,signature:`math.cos(x)`,description:`Returns cosine of x (in radians). Returns value in [-1, 1].`,complexity:`O(1)`,example:`import math
print(math.cos(0))           # 1.0
print(math.cos(math.pi))     # -1.0
print(math.cos(math.pi / 2)) # 6.123233995736766e-17 (≈0)

# Degrees to radians
print(math.cos(math.radians(180)))  # -1.0`},{section:`Math Module - Trigonometry`,signature:`math.tan(x)`,description:`Returns tangent of x (in radians). Undefined at π/2, 3π/2, etc.`,complexity:`O(1)`,example:`import math
print(math.tan(0))              # 0.0
print(math.tan(math.pi / 4))    # 0.9999999999999999 (≈1)
print(math.tan(math.pi))        # -1.2246467991473532e-16 (≈0)

# tan(90°) is undefined (division by zero)
# print(math.tan(math.pi / 2))  # 1.633123935319537e+16 (huge!)`}],D=[..._,...v,...y,...b,...x,...S,...C,...w,...T,...E],O=[{section:`Fundamentals`,signature:`Boolean Basics`,description:`Bool type has only TWO values: True and False (capitalized!). Result of all comparisons and logical operations. Foundation of conditional logic.`,complexity:`Concept`,example:`# Boolean type has only 2 values
print(type(True))   # <class 'bool'>
print(type(False))  # <class 'bool'>

# MUST capitalize: True and False (not true/false!)
# true   # NameError!
# false  # NameError!

# Comparisons return booleans
result = 1 == 1     # True
result = 3 > 5      # False
result = "a" < "b"  # True (lexicographic order)

# Use in conditions
if result:
    print("This runs if True")`},{section:`Fundamentals`,signature:`bool(x)`,description:`Converts x to a Boolean. Returns False for falsy values, True otherwise.`,complexity:`O(1)`,example:`print(bool(0))       # False
print(bool(1))       # True
print(bool(""))      # False
print(bool("hello")) # True
print(bool([]))      # False
print(bool([1, 2]))  # True`},{section:`Fundamentals`,signature:`Falsy Values`,description:`Values that evaluate to False: None, False, 0, 0.0, 0j, "", [], (), {}, set(), range(0). Everything else is truthy.`,complexity:`Concept`,example:`# All of these are FALSY
print(bool(None))     # False - null value
print(bool(False))    # False - boolean
print(bool(0))        # False - zero integer
print(bool(0.0))      # False - zero float
print(bool(0j))       # False - zero complex
print(bool(""))       # False - empty string
print(bool([]))       # False - empty list
print(bool(()))       # False - empty tuple
print(bool({}))       # False - empty dict
print(bool(set()))    # False - empty set
print(bool(range(0))) # False - empty range

# BEWARE: These are TRUTHY!
print(bool("0"))      # True - non-empty string!
print(bool([0]))      # True - non-empty list!
print(bool({0: 0}))   # True - non-empty dict!`},{section:`Fundamentals`,signature:`Truthy Values`,description:`Any value not explicitly falsy is truthy. Non-zero numbers, non-empty sequences, all objects by default.`,complexity:`Concept`,example:`# All of these are TRUTHY
print(bool(1))        # True - non-zero
print(bool(-1))       # True - any non-zero
print(bool(0.1))      # True
print(bool("0"))      # True - non-empty string!
print(bool([0]))      # True - non-empty list!
print(bool({0}))      # True - non-empty set!
print(bool(" "))      # True - whitespace is non-empty!

# Custom objects are truthy by default
class MyClass:
    pass
print(bool(MyClass()))  # True`}],k=[{section:`Why & When`,signature:`Why use Booleans?`,description:`Booleans control program flow. Use for conditions, flags, validation, filtering. Leverage truthiness for cleaner code.`,complexity:`Concept`,example:`# Control flow - if/while/for conditions
is_valid = True
if is_valid:  # Direct boolean check
    print("Proceed")

# Flags - track state
is_done = False
has_error = False
is_authenticated = True

# Validation - check conditions
age = 20
can_vote = age >= 18  # Boolean result

# Filtering - select items
numbers = [1, 2, 3, 4, 5]
evens = [n for n in numbers if n % 2 == 0]

# Truthiness - cleaner code
items = []
if items:  # Pythonic - uses truthiness
    print("has items")
# NOT: if len(items) > 0  # Less pythonic`},{section:`Why & When`,signature:`Boolean vs other types`,description:`Boolean is a subclass of int. True=1, False=0. Use truthiness in conditions. Avoid explicit bool() calls.`,complexity:`Concept`,example:`# Boolean IS-A int subclass
print(isinstance(True, int))   # True
print(True + True)             # 2
print(False + 5)               # 5
print(sum([True, True, False]))  # 2 (count Trues!)

# Truthiness vs explicit bool()
lst = [1, 2, 3]
if lst:  # GOOD - uses truthiness
    print("has items")

if bool(lst):  # REDUNDANT - unnecessary bool()
    print("has items")

if len(lst) > 0:  # VERBOSE - not pythonic
    print("has items")

# Boolean in math - count True values
answers = [True, False, True, True, False]
score = sum(answers)  # 3 correct
percentage = sum(answers) / len(answers)  # 0.6`},{section:`Why & When`,signature:`Performance & Best Practices`,description:`Use truthiness for cleaner code. Short-circuit evaluation saves computation. all()/any() are optimized. Avoid unnecessary bool() conversions.`,complexity:`O(varies)`,example:`# Short-circuit evaluation - stops early
# "and" stops at first False
result = expensive_check() and another_check()  # Skips 2nd if 1st is False

# "or" stops at first True
result = cheap_check() or expensive_check()  # Skips 2nd if 1st is True

# all() - stops at first False (O(n) worst, O(1) best)
all([True, True, False, True])  # Stops at 3rd element

# any() - stops at first True (O(n) worst, O(1) best)
any([False, False, True, False])  # Stops at 3rd element

# FAST - direct comparison
if x:  # O(1) - checks truthiness
    pass

# SLOW - unnecessary conversion
if bool(x):  # O(1) but adds function call overhead
    pass

# Performance tip: put cheap checks first
if cheap_condition and expensive_condition:
    pass  # Evaluate cheap first to short-circuit`}],A=[{section:`Comparison Operators`,signature:`== != < > <= >=`,description:`Compare values: == (equal), != (not equal), < > <= >= (ordering). Returns True or False. Common mistake: = vs ==`,complexity:`O(1)`,example:`# Equality
print(1 == 1)       # True
print(1 != 2)       # True
print("a" == "a")   # True
print("a" == "A")   # False (case-sensitive!)

# Ordering (works with numbers and strings)
print(3 > 5)        # False
print(3 <= 3)       # True
print("apple" < "banana")  # True (lexicographic)

# COMMON MISTAKE: = vs ==
x = 5        # Assignment (sets value)
x == 5       # Comparison (returns True/False)
# if x = 5:  # SyntaxError! Use == not =`},{section:`Comparison Operators`,signature:`Chained comparisons`,description:`Python allows chained comparisons like a < b < c, equivalent to (a < b) and (b < c). More readable and efficient.`,complexity:`O(1)`,example:`x = 5
print(1 < x < 10)     # True - cleaner than (1 < x) and (x < 10)
print(1 < x < 3)      # False
print(1 < x <= 5)     # True

# Multiple chains
a, b, c = 1, 2, 3
print(a < b < c)      # True
print(a < b == 2 < c)  # True

# More readable than:
print((1 < x) and (x < 10))  # Same but verbose`}],j=[{section:`Logical Operators`,signature:`and`,description:`Logical AND. Returns x if x is falsy, otherwise returns y. Short-circuits (stops if x is False).`,complexity:`O(1)`,example:`# Boolean results
print(True and True)    # True
print(True and False)   # False
print(False and True)   # False (short-circuits, doesn't evaluate right)

# Returns actual values (not always bool!)
print(5 and 3)          # 3 (both truthy, returns last)
print(0 and 3)          # 0 (first falsy, returns it)
print([] and [1])       # [] (first falsy)
print([1] and [2])      # [2] (both truthy, returns last)

# Combine comparisons
x = 5
print(x > 0 and x < 10)  # True`},{section:`Logical Operators`,signature:`or`,description:`Logical OR. Returns x if x is truthy, otherwise returns y. Short-circuits (stops if x is True).`,complexity:`O(1)`,example:`# Boolean results
print(True or False)    # True (short-circuits)
print(False or True)    # True
print(False or False)   # False

# Returns actual values (not always bool!)
print(5 or 3)           # 5 (first truthy, returns it)
print(0 or 3)           # 3 (first falsy, tries second)
print([] or [1])        # [1] (first falsy, returns second)
print("" or "default")  # "default" (common default pattern)

# Default values pattern
name = user_input or "Anonymous"  # Use input or default`},{section:`Logical Operators`,signature:`not`,description:`Logical NOT. Returns True if x is falsy, False if truthy. Always returns a boolean.`,complexity:`O(1)`,example:`# Always returns True or False (not original value)
print(not True)    # False
print(not False)   # True
print(not 0)       # True
print(not 1)       # False
print(not "")      # True
print(not "hello") # False
print(not [])      # True
print(not [1])     # False

# Double negative returns bool (not original)
print(not not 5)   # True (not False)
print(not not [])  # False (not True)`}],M=[{section:`Identity & Equality`,signature:`x == y`,description:`Equality comparison. Returns True if x equals y. Compares VALUES.`,complexity:`O(1)`,example:`print(True == True)   # True
print(True == 1)      # True (bool is subclass of int)
print(False == 0)     # True
print(True == 2)      # False

# Value equality, not identity
a = [1, 2]
b = [1, 2]
print(a == b)  # True (same values)
print(a is b)  # False (different objects)`},{section:`Identity & Equality`,signature:`x != y`,description:`Inequality comparison. Returns True if x does not equal y.`,complexity:`O(1)`,example:`print(True != False)  # True
print(True != 1)      # False
print(5 != "5")       # True (different types)`},{section:`Identity & Equality`,signature:`x is y`,description:`Identity comparison. Returns True if x and y are the SAME object in memory. Use for None, True, False.`,complexity:`O(1)`,example:`# Use "is" for singletons (None, True, False)
print(True is True)    # True
print(False is False)  # True
x = None
print(x is None)       # True - CORRECT way

# DON'T use "is" for values
a = 1000
b = 1000
print(a is b)   # False (different objects)
print(a == b)   # True (same value) - CORRECT

# Use "==" for value comparison, "is" for identity
print(x == None)  # Works but not idiomatic
print(x is None)  # Pythonic way`}],N=[{section:`Boolean Arithmetic`,signature:`Boolean as Integer`,description:`Boolean is a subclass of int. True=1, False=0. Use sum() to count True values.`,complexity:`O(1)`,example:`# Arithmetic operations
print(True + True)    # 2
print(True * 10)      # 10
print(False + 5)      # 5
print(True - 1)       # 0

# Count True values
answers = [True, False, True, True, False]
print(sum(answers))  # 3 (count of True)

# Calculate percentage
total = len(answers)
correct = sum(answers)
percentage = (correct / total) * 100  # 60.0%

# Works in indexes (but not recommended)
options = ["No", "Yes"]
choice = True
print(options[choice])  # "Yes" (index 1)`}],P=[{section:`Short-circuit Patterns`,signature:`Short-circuit evaluation`,description:`and/or stop evaluating as soon as result is determined. Prevents errors and improves performance.`,complexity:`O(1)`,example:`# Safe dictionary access (prevents KeyError)
d = {}
result = d and d["key"]  # {} (doesn't access d["key"])

# Safe list access (prevents IndexError)
lst = []
result = lst and lst[0]  # [] (doesn't access lst[0])

# Default values
name = user_input or "Anonymous"  # Use input or default
count = user_count or 0

# Guard conditions - expensive_check only if first passes
if cheap_check() and expensive_check():
    pass

# Lazy evaluation - second function not called if first succeeds
result = try_fast() or try_slow() or default_value`}],F=[{section:`Aggregate Functions`,signature:`all(iterable)`,description:`Returns True if ALL elements are truthy (or iterable is empty). Short-circuits at first False.`,complexity:`O(n)`,example:`# Basic usage
print(all([True, True, True]))   # True
print(all([True, False, True]))  # False (stops at False)
print(all([]))                   # True (empty = vacuous truth)

# Validation - check all conditions
ages = [18, 21, 25, 30]
print(all(age >= 18 for age in ages))  # True

# All non-zero
numbers = [1, 2, 3, 4]
print(all(numbers))  # True
numbers = [1, 0, 3]
print(all(numbers))  # False

# Check all strings non-empty
names = ["Alice", "Bob", ""]
print(all(names))  # False`},{section:`Aggregate Functions`,signature:`any(iterable)`,description:`Returns True if ANY element is truthy. Short-circuits at first True. Returns False for empty.`,complexity:`O(n)`,example:`# Basic usage
print(any([False, False, True]))  # True (stops at first True)
print(any([False, False]))        # False
print(any([]))                    # False (empty)

# Check if any condition met
ages = [15, 16, 21, 17]
print(any(age >= 18 for age in ages))  # True

# Any errors?
errors = [None, None, "Error!", None]
print(any(errors))  # True

# At least one match
numbers = [2, 4, 6, 7, 8]
print(any(n % 2 == 1 for n in numbers))  # True (7 is odd)`}],I=[{section:`Control Flow`,signature:`if/while truthiness`,description:`Control statements use truthiness. Pythonic code checks truthiness directly, not explicit comparisons.`,complexity:`O(1)`,example:`# PYTHONIC - check truthiness directly
lst = [1, 2, 3]
if lst:  # GOOD
    print("list has items")

# VERBOSE - explicit comparison
if len(lst) > 0:  # WORKS but not idiomatic
    print("list has items")

# Check empty string
text = ""
if not text:  # GOOD
    print("empty")

# NOT: if text == ""  # VERBOSE

# While loop with truthiness
items = [1, 2, 3]
while items:  # loop until empty
    print(items.pop())

# Nested checks
data = {"key": [1, 2, 3]}
if data and "key" in data and data["key"]:
    print("Has key with non-empty value")`},{section:`Control Flow`,signature:`Ternary operator`,description:`x if condition else y - inline conditional expression. More concise than if/else block.`,complexity:`O(1)`,example:`# Basic ternary
age = 20
status = "adult" if age >= 18 else "minor"
print(status)  # "adult"

# Use in expressions
max_val = a if a > b else b  # Max of two values

# Can chain (but avoid deep nesting!)
x = 5
result = "small" if x < 3 else "medium" if x < 7 else "large"
print(result)  # "medium"

# Better: use if/elif for readability if chaining
if x < 3:
    result = "small"
elif x < 7:
    result = "medium"
else:
    result = "large"`}],L=[{section:`Advanced Patterns`,signature:`__bool__(self)`,description:`Define custom truthiness for classes. Called by bool() and if statements. Falls back to __len__() if not defined.`,complexity:`O(1)`,example:`# Custom __bool__ method
class Account:
    def __init__(self, balance):
        self.balance = balance
    def __bool__(self):
        return self.balance > 0

account = Account(100)
if account:  # Calls __bool__
    print("Account has funds")  # This runs

broke = Account(0)
if not broke:  # False because balance <= 0
    print("Account is empty")  # This runs

# Falls back to __len__ if __bool__ not defined
class MyList:
    def __init__(self, items):
        self.items = items
    def __len__(self):
        return len(self.items)

ml = MyList([1, 2, 3])
print(bool(ml))  # True (len > 0)`},{section:`Advanced Patterns`,signature:`Filter by truthiness`,description:`Use filter(None, ...) or comprehension to remove falsy values from collections.`,complexity:`O(n)`,example:`# Remove falsy values
values = [0, 1, "", "hello", None, [], [1], False, True]

# Method 1: filter with None
truthy = list(filter(None, values))
print(truthy)  # [1, 'hello', [1], True]

# Method 2: comprehension (more explicit)
truthy = [v for v in values if v]
print(truthy)  # [1, 'hello', [1], True]

# Remove empty strings
words = ["hello", "", "world", "", "!"]
non_empty = [w for w in words if w]
print(non_empty)  # ['hello', 'world', '!']

# Remove None values
data = [1, None, 2, None, 3]
clean = [x for x in data if x is not None]  # Keep 0!
print(clean)  # [1, 2, 3]`}],R=[...O,...k,...A,...j,...M,...N,...P,...F,...I,...L],te=[{signature:`List Basics`,description:`Lists are MUTABLE ordered sequences. Create with brackets []. Can modify elements. Use for dynamic collections that need to change.`,complexity:`Concept`,example:`# Create lists with square brackets []
colors = ["red", "yellow", "green", "blue"]
print(type(colors))  # <class 'list'>

# Mixed types allowed (but typically use same type)
mixed = ["one", 2, 3.0]  # Valid but not typical

# From other sequences
list((1, 2, 3))      # [1, 2, 3] from tuple
list("Python")       # ['P', 'y', 't', 'h', 'o', 'n']

# From string with split()
groceries = "eggs, milk, cheese"
grocery_list = groceries.split(", ")  # ['eggs', 'milk', 'cheese']

# Empty list
empty = []`},{signature:`List Mutability`,description:`Lists CAN be changed! Modify elements, add new ones, remove existing. This is the KEY difference from tuples.`,complexity:`Concept`,example:`# Lists are MUTABLE - can change after creation!
colors = ["red", "yellow", "green", "blue"]

# Change single element
colors[0] = "burgundy"
print(colors)  # ['burgundy', 'yellow', 'green', 'blue']

# Change multiple with slice assignment
colors[1:3] = ["orange", "magenta"]
print(colors)  # ['burgundy', 'orange', 'magenta', 'blue']

# Slice assignment can change length!
colors[1:3] = ["yellow"]  # Shrinks list
print(colors)  # ['burgundy', 'yellow', 'blue']

# In-place modification methods
colors.append("green")   # Modifies list
colors.insert(1, "pink") # Modifies list
colors.pop()             # Modifies list`},{signature:`Why use List?`,description:`Lists are Python's go-to ordered collection. Mutable, dynamic sizing, mixed types allowed. Best for sequences where order matters and you need to modify elements.`,complexity:`Concept`,example:`# Lists are MUTABLE ordered sequences
# Use when you need:
# - Ordered data
# - Ability to modify (add/remove/change)
# - Dynamic sizing (grows as needed)
# - Index-based access

shopping = ["milk", "eggs", "bread"]
shopping.append("butter")  # Can modify
shopping[0] = "almond milk"  # Can update

# Lists allow mixed types (but avoid when possible)
mixed = [1, "hello", 3.14, [4, 5]]

# Lists preserve insertion order
# Lists allow duplicates`},{signature:`List vs other collections`,description:`List vs Tuple: mutable vs immutable. List vs Set: ordered+duplicates vs unordered+unique. List vs Dict: index access vs key access.`,complexity:`Concept`,example:`# LIST vs TUPLE
# - List: mutable, use for data that changes
# - Tuple: immutable, use for fixed data, dict keys
lst = [1, 2, 3]  # Can modify
tpl = (1, 2, 3)  # Cannot modify, hashable

# LIST vs SET
# - List: ordered, allows duplicates, O(n) lookup
# - Set: unordered, unique only, O(1) lookup
lst = [1, 2, 2, 3]  # [1, 2, 2, 3]
st = {1, 2, 2, 3}   # {1, 2, 3}

# LIST vs DICT
# - List: access by index (0, 1, 2...)
# - Dict: access by key (any hashable)
lst[0]        # First item
dct["name"]   # Named access

# RULE: Need lookup speed? Use set/dict
# RULE: Need order + duplicates? Use list`},{signature:`Performance characteristics`,description:`Know these for efficient code: O(1) append/pop end, O(n) insert/remove elsewhere, O(n) search, O(1) index access.`,complexity:`O(varies)`,example:`# FAST - O(1)
lst.append(x)     # Add to end
lst.pop()         # Remove from end
lst[i]            # Access by index
len(lst)          # Get length

# SLOW - O(n)
lst.insert(0, x)  # Insert at beginning
lst.pop(0)        # Remove from beginning
lst.remove(x)     # Remove by value
x in lst          # Search (use set for O(1))
lst.index(x)      # Find index

# Need fast operations on both ends?
from collections import deque
dq = deque([1, 2, 3])
dq.appendleft(0)  # O(1)
dq.popleft()      # O(1)`},{signature:`list()`,description:`Creates an empty list or converts an iterable to a list.`,complexity:`O(n)`,example:`print(list())           # []
print(list("hello"))    # ['h', 'e', 'l', 'l', 'o']
print(list(range(5)))   # [0, 1, 2, 3, 4]
print(list((1, 2, 3)))  # [1, 2, 3]`},{signature:`[x, y, z]`,description:`List literal syntax. Creates a list with the given elements.`,complexity:`O(n)`,example:`nums = [1, 2, 3]
mixed = [1, "hello", 3.14, [4, 5]]
empty = []`},{signature:`[expr for x in iterable]`,description:`List comprehension. Creates a list by applying expression to each item. Preferred for simple transforms.`,complexity:`O(n)`,example:`squares = [x**2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]

# Nested comprehension (flatten)
matrix = [[1, 2], [3, 4]]
flat = [x for row in matrix for x in row]
print(flat)  # [1, 2, 3, 4]`},{signature:`list.append(x)`,description:`Adds x to the end of the list. O(1) amortized. Returns None. Most common way to grow a list.`,complexity:`O(1)`,example:`lst = [1, 2, 3]
lst.append(4)
print(lst)  # [1, 2, 3, 4]

# append adds single element
lst.append([5, 6])  # Appends as single element
print(lst)  # [1, 2, 3, 4, [5, 6]]

# Building list in loop - O(n) total
result = []
for i in range(5):
    result.append(i)  # O(1) each`},{signature:`list.extend(iterable)`,description:`Extends list by appending all elements from the iterable. Faster than multiple appends.`,complexity:`O(k)`,example:`lst = [1, 2, 3]
lst.extend([4, 5])
print(lst)  # [1, 2, 3, 4, 5]

lst.extend("ab")  # Strings are iterable
print(lst)  # [1, 2, 3, 4, 5, 'a', 'b']

# extend vs append
lst1 = [1, 2]
lst1.append([3, 4])   # [[3, 4]] as element
lst2 = [1, 2]
lst2.extend([3, 4])   # 3, 4 as separate elements`},{signature:`list.insert(i, x)`,description:`Inserts x at index i. O(n) because all elements after i shift. Avoid in loops if possible.`,complexity:`O(n)`,example:`lst = [1, 2, 3]
lst.insert(0, 0)    # Insert at beginning - SLOW O(n)
print(lst)  # [0, 1, 2, 3]

lst.insert(2, 1.5)  # Insert at index 2
print(lst)  # [0, 1, 1.5, 2, 3]

# For frequent inserts at beginning, use deque:
from collections import deque
dq = deque([1, 2, 3])
dq.appendleft(0)  # O(1)!`},{signature:`list.remove(x)`,description:`Removes the first occurrence of x. Raises ValueError if not found. O(n) search + shift.`,complexity:`O(n)`,example:`lst = [1, 2, 3, 2, 1]
lst.remove(2)
print(lst)  # [1, 3, 2, 1] (first 2 removed)

# Check before removing to avoid ValueError
if 99 in lst:
    lst.remove(99)

# Or use try/except
try:
    lst.remove(99)
except ValueError:
    pass  # Not found, ignore`},{signature:`list.pop([i])`,description:`Removes and RETURNS item at index i (default: last). pop() is O(1), pop(0) is O(n).`,complexity:`O(1) last, O(n) other`,example:`lst = [1, 2, 3, 4]
print(lst.pop())     # 4 (returns removed item)
print(lst)           # [1, 2, 3]

print(lst.pop(0))    # 1 - SLOW O(n)
print(lst)           # [2, 3]

# Use pop() for stack (LIFO)
stack = []
stack.append(1)
stack.append(2)
stack.pop()  # 2 - last in, first out`},{signature:`list.clear()`,description:`Removes all items from the list. Equivalent to del lst[:].`,complexity:`O(n)`,example:`lst = [1, 2, 3]
lst.clear()
print(lst)  # []

# Alternatives
lst = [1, 2, 3]
lst[:] = []  # Also clears
# lst = []  # Creates NEW list (doesn't clear original)`},{signature:`del list[i]`,description:`Deletes item at index i or slice. Statement, not method. No return value.`,complexity:`O(n)`,example:`lst = [0, 1, 2, 3, 4]
del lst[0]      # Delete first - O(n)
print(lst)  # [1, 2, 3, 4]

del lst[1:3]    # Delete slice
print(lst)  # [1, 4]

del lst[:]      # Clear all
print(lst)  # []`},{signature:`list.index(x[, start[, end]])`,description:`Returns index of first occurrence of x. Raises ValueError if not found. O(n) search.`,complexity:`O(n)`,example:`lst = ['a', 'b', 'c', 'b', 'd']
print(lst.index('b'))      # 1
print(lst.index('b', 2))   # 3 (search from index 2)

# Check existence first to avoid ValueError
if 'z' in lst:
    idx = lst.index('z')
else:
    idx = -1  # Not found`},{signature:`list.count(x)`,description:`Returns the number of times x appears in the list.`,complexity:`O(n)`,example:`lst = [1, 2, 2, 3, 2, 4]
print(lst.count(2))  # 3
print(lst.count(5))  # 0

# For frequent counts, use Counter
from collections import Counter
counts = Counter(lst)
print(counts[2])  # 3 - O(1) after initial O(n)`},{signature:`x in list`,description:`Returns True if x is in the list. O(n) - for O(1) lookup, use a set.`,complexity:`O(n)`,example:`lst = [1, 2, 3]
print(2 in lst)      # True
print(5 in lst)      # False
print(5 not in lst)  # True

# For many lookups, convert to set first
lookup = set(lst)    # O(n) once
5 in lookup          # O(1) each lookup`}],z=[{section:`Ordering`,signature:`list.sort(*, key=None, reverse=False)`,description:`Sorts list IN PLACE. Returns None (not the list!). Stable sort (equal elements keep order).`,complexity:`O(n log n)`,example:`lst = [3, 1, 4, 1, 5]
lst.sort()
print(lst)  # [1, 1, 3, 4, 5]

lst.sort(reverse=True)
print(lst)  # [5, 4, 3, 1, 1]

# Sort by key function
words = ["banana", "apple", "Cherry"]
words.sort(key=str.lower)  # Case-insensitive
print(words)  # ['apple', 'banana', 'Cherry']

words.sort(key=len)  # By length
print(words)  # ['apple', 'Cherry', 'banana']`},{section:`Ordering`,signature:`list.reverse()`,description:`Reverses the list IN PLACE. Returns None.`,complexity:`O(n)`,example:`lst = [1, 2, 3, 4]
lst.reverse()
print(lst)  # [4, 3, 2, 1]

# Alternative: slice
lst = lst[::-1]  # Creates new list`},{section:`Ordering`,signature:`sorted(iterable, *, key=None, reverse=False)`,description:`Returns a NEW sorted list. Does not modify original. Works on any iterable.`,complexity:`O(n log n)`,example:`lst = [3, 1, 4, 1, 5]
new_lst = sorted(lst)
print(new_lst)  # [1, 1, 3, 4, 5]
print(lst)      # [3, 1, 4, 1, 5] (unchanged)

# Sort by length
words = ["aa", "b", "ccc"]
print(sorted(words, key=len))  # ['b', 'aa', 'ccc']

# Sort dicts by value
data = [{"name": "Bob", "age": 25}, {"name": "Alice", "age": 30}]
print(sorted(data, key=lambda x: x["age"]))`},{section:`Ordering`,signature:`reversed(list)`,description:`Returns a reverse ITERATOR over the list. O(1) to create, lazy evaluation.`,complexity:`O(1)`,example:`lst = [1, 2, 3]
for x in reversed(lst):
    print(x)  # 3, 2, 1

print(lst)  # [1, 2, 3] (unchanged)
print(list(reversed(lst)))  # [3, 2, 1]

# reversed is memory efficient - doesn't copy`},{section:`Copying`,signature:`list.copy()`,description:`Returns a SHALLOW copy of the list. Nested objects are still shared!`,complexity:`O(n)`,example:`lst = [1, 2, [3, 4]]
copy = lst.copy()
copy[0] = 99
print(lst)   # [1, 2, [3, 4]] (unchanged)
copy[2][0] = 99
print(lst)   # [1, 2, [99, 4]] (nested list shared!)

# Shallow copy methods:
# lst.copy(), lst[:], list(lst)`},{section:`Copying`,signature:`list[:]`,description:`Slice copy. Returns a shallow copy of the list.`,complexity:`O(n)`,example:`lst = [1, 2, 3]
copy = lst[:]
copy[0] = 99
print(lst)   # [1, 2, 3]
print(copy)  # [99, 2, 3]`},{section:`Copying`,signature:`copy.deepcopy(list)`,description:`Creates a DEEP copy. Nested objects are also copied. Use when you have nested mutable objects.`,complexity:`O(n)`,example:`import copy
lst = [1, [2, 3]]
deep = copy.deepcopy(lst)
deep[1][0] = 99
print(lst)   # [1, [2, 3]] (unchanged!)
print(deep)  # [1, [99, 3]]

# When to use:
# Shallow copy: Simple lists, no nested mutables
# Deep copy: Nested lists/dicts that you need independent`},{section:`Slicing`,signature:`list[start:stop:step]`,description:`Returns a new list from start to stop-1 with step. Powerful and Pythonic. All params optional.`,complexity:`O(k)`,example:`lst = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(lst[2:5])     # [2, 3, 4] - index 2,3,4
print(lst[:3])      # [0, 1, 2] - first 3
print(lst[7:])      # [7, 8, 9] - from index 7
print(lst[::2])     # [0, 2, 4, 6, 8] - every 2nd
print(lst[::-1])    # [9, 8, 7...] - reversed
print(lst[-3:])     # [7, 8, 9] - last 3
print(lst[:-3])     # [0, 1, 2, 3, 4, 5, 6] - all but last 3`},{section:`Slicing`,signature:`list[i:j] = iterable`,description:`Slice assignment. Replaces elements from i to j-1 with iterable. Can change list size.`,complexity:`O(n)`,example:`lst = [0, 1, 2, 3, 4]
lst[1:3] = [10, 20, 30]  # Can be different length
print(lst)  # [0, 10, 20, 30, 3, 4]

lst[1:4] = []  # Delete elements
print(lst)  # [0, 3, 4]

# Insert without replacing
lst[1:1] = [1, 2]  # Insert at index 1
print(lst)  # [0, 1, 2, 3, 4]`},{section:`Operators`,signature:`list1 + list2`,description:`Concatenation. Returns a NEW list with all elements. Creates copy - use extend() for in-place.`,complexity:`O(n+m)`,example:`a = [1, 2]
b = [3, 4]
print(a + b)  # [1, 2, 3, 4]
print(a)      # [1, 2] (unchanged)

# For building strings, use join not +
# For building lists, use extend or comprehension`},{section:`Operators`,signature:`list * n`,description:`Repetition. Returns a new list with elements repeated n times. BEWARE with nested lists!`,complexity:`O(n*k)`,example:`lst = [1, 2]
print(lst * 3)  # [1, 2, 1, 2, 1, 2]
print([0] * 5)  # [0, 0, 0, 0, 0]

# WARNING: nested lists share reference!
matrix = [[0] * 3] * 3  # BAD!
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0], [1, 0, 0], [1, 0, 0]]

# CORRECT way:
matrix = [[0] * 3 for _ in range(3)]
matrix[0][0] = 1
print(matrix)  # [[1, 0, 0], [0, 0, 0], [0, 0, 0]]`},{section:`Operators`,signature:`list += iterable`,description:`In-place extend. Equivalent to list.extend(iterable). Modifies original list.`,complexity:`O(k)`,example:`lst = [1, 2]
lst += [3, 4]
print(lst)  # [1, 2, 3, 4]

lst += "ab"  # Strings are iterable
print(lst)  # [1, 2, 3, 4, 'a', 'b']`},{section:`Built-in Functions`,signature:`len(list)`,description:`Returns the number of elements in the list. O(1) - Python stores length.`,complexity:`O(1)`,example:`print(len([1, 2, 3]))  # 3
print(len([]))         # 0

# Empty check
if lst:        # Truthy check (preferred)
    print("not empty")
if len(lst) > 0:  # Works but verbose
    print("not empty")`},{section:`Built-in Functions`,signature:`min(list)`,description:`Returns the smallest element. Elements must be comparable. O(n) - scans all.`,complexity:`O(n)`,example:`print(min([3, 1, 4]))  # 1
print(min(["b", "a", "c"]))  # 'a'
print(min([3, 1, 4], key=lambda x: -x))  # 4

# With key function for complex objects
people = [{"name": "Bob", "age": 25}, {"name": "Alice", "age": 30}]
youngest = min(people, key=lambda p: p["age"])`},{section:`Built-in Functions`,signature:`max(list)`,description:`Returns the largest element. Elements must be comparable.`,complexity:`O(n)`,example:`print(max([3, 1, 4]))  # 4
print(max([3, 1, 4], key=lambda x: -x))  # 1

# Find second largest
lst = [3, 1, 4, 1, 5, 9, 2]
sorted_lst = sorted(set(lst), reverse=True)
second = sorted_lst[1] if len(sorted_lst) > 1 else None`},{section:`Built-in Functions`,signature:`sum(list[, start])`,description:`Returns sum of elements plus start (default 0). Works with numbers.`,complexity:`O(n)`,example:`print(sum([1, 2, 3]))      # 6
print(sum([1, 2, 3], 10))  # 16

# Flatten list of lists
print(sum([[1], [2], [3]], []))  # [1, 2, 3]
# But list comprehension is clearer:
# [x for sublist in lists for x in sublist]`},{section:`Iteration`,signature:`enumerate(list, start=0)`,description:`Returns iterator of (index, element) tuples. The Pythonic way to get index AND value.`,complexity:`O(1)`,example:`lst = ['a', 'b', 'c']
for i, val in enumerate(lst):
    print(i, val)  # 0 a, 1 b, 2 c

# Start from 1 (useful for 1-based counting)
for i, val in enumerate(lst, 1):
    print(i, val)  # 1 a, 2 b, 3 c

# DON'T do this:
for i in range(len(lst)):  # Anti-pattern
    print(i, lst[i])`},{section:`Iteration`,signature:`zip(*lists)`,description:`Pairs elements from multiple iterables. Stops at shortest. Essential for parallel iteration.`,complexity:`O(1)`,example:`names = ["Alice", "Bob"]
ages = [25, 30]
for name, age in zip(names, ages):
    print(f"{name}: {age}")

# Create dict from two lists
dict(zip(names, ages))  # {'Alice': 25, 'Bob': 30}

# Unzip (transpose)
pairs = [(1, 'a'), (2, 'b')]
nums, letters = zip(*pairs)`},{section:`Iteration`,signature:`map(func, list)`,description:`Applies function to each element. Returns iterator. Often list comprehension is clearer.`,complexity:`O(1)`,example:`lst = [1, 2, 3]
squared = list(map(lambda x: x**2, lst))
print(squared)  # [1, 4, 9]

# List comprehension often clearer:
squared = [x**2 for x in lst]

# map with multiple lists
list(map(lambda x, y: x+y, [1,2], [3,4]))  # [4, 6]`},{section:`Iteration`,signature:`filter(func, list)`,description:`Returns iterator of elements where func returns True. List comprehension often clearer.`,complexity:`O(1)`,example:`lst = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, lst))
print(evens)  # [2, 4, 6]

# List comprehension often clearer:
evens = [x for x in lst if x % 2 == 0]

# None removes falsy values
print(list(filter(None, [0, 1, "", "hi", []])))  # [1, 'hi']`},{section:`Common Patterns`,signature:`Flatten nested list`,description:`Convert nested list to flat list using comprehension or itertools.`,complexity:`O(n)`,example:`nested = [[1, 2], [3, 4], [5]]
flat = [x for sublist in nested for x in sublist]
print(flat)  # [1, 2, 3, 4, 5]

# Or with itertools (more efficient for large/deep)
from itertools import chain
flat = list(chain.from_iterable(nested))

# Deep flatten (recursive)
def deep_flatten(lst):
    for item in lst:
        if isinstance(item, list):
            yield from deep_flatten(item)
        else:
            yield item`},{section:`Common Patterns`,signature:`Remove duplicates`,description:`Remove duplicates while optionally preserving order.`,complexity:`O(n)`,example:`lst = [1, 2, 2, 3, 1, 4, 2]

# Preserve order (Python 3.7+)
unique = list(dict.fromkeys(lst))
print(unique)  # [1, 2, 3, 4]

# Order doesn't matter
unique = list(set(lst))  # Order not guaranteed

# Remove consecutive duplicates only
from itertools import groupby
lst = [1, 1, 2, 2, 2, 3, 1, 1]
result = [k for k, _ in groupby(lst)]  # [1, 2, 3, 1]`},{section:`Common Patterns`,signature:`Chunk list`,description:`Split list into chunks of size n.`,complexity:`O(n)`,example:`def chunks(lst, n):
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

lst = [1, 2, 3, 4, 5, 6, 7]
print(list(chunks(lst, 3)))  # [[1,2,3], [4,5,6], [7]]

# One-liner
n = 3
[lst[i:i+n] for i in range(0, len(lst), n)]`}],B=[...te,...z],V=[{section:`Fundamentals`,signature:`Tuple Basics`,description:`Tuples are IMMUTABLE ordered sequences. Create with parentheses (). Can contain any types. Remember: tuples CANNOT be modified after creation.`,complexity:`Concept`,example:`# Create tuples with parentheses
my_tuple = (1, 2, 3)
mixed = (1, 2.0, "three")  # Different types OK
print(type(my_tuple))      # <class 'tuple'>

# Empty tuple
empty = ()

# Single element tuple - MUST have comma!
single = (1,)     # tuple - correct!
not_tuple = (1)   # int - just parentheses, no tuple!

# Tuple from other sequences
tuple("abc")      # ('a', 'b', 'c')
tuple([1, 2, 3])  # (1, 2, 3)`},{section:`Fundamentals`,signature:`Tuple Packing & Unpacking`,description:`Pack: create tuple without parentheses. Unpack: extract values into variables. Number of variables must match tuple length.`,complexity:`O(1)`,example:`# PACKING - create tuple without ()
coordinates = 4.21, 9.29     # Packs into tuple
print(type(coordinates))     # <class 'tuple'>

# UNPACKING - extract values
x, y = coordinates
print(x)  # 4.21
print(y)  # 9.29

# Multiple assignment in one line
name, age, job = "David", 34, "programmer"

# Must match length!
# a, b = 1, 2, 3  # ValueError: too many values
# a, b, c = 1, 2  # ValueError: not enough values

# Unpacking function returns
def get_user():
    return "Alice", 30, "admin"

name, age, role = get_user()`},{section:`Fundamentals`,signature:`Tuple Immutability`,description:`Tuples CANNOT be changed after creation. No item assignment, no append, no remove. Must create new tuple to "change" values.`,complexity:`Concept`,example:`# Cannot modify tuples!
values = (1, 2, 3)
# values[0] = 99      # TypeError: tuple doesn't support item assignment
# values.append(4)    # AttributeError: no append method

# To "change", create NEW tuple
values = (99, 2, 3)  # Reassign to new tuple - OK

# Slicing creates new tuple
new_values = values[1:]  # (2, 3) - new tuple

# Concatenation creates new tuple
combined = values + (4, 5)  # (99, 2, 3, 4, 5)`},{section:`Why & When`,signature:`Why use Tuple?`,description:`Tuples are immutable sequences. Use for fixed data, dict keys, function returns, and when you want to guarantee data won't change.`,complexity:`Concept`,example:`# Tuple = IMMUTABLE sequence
# Use when: data shouldn't change, dict keys, returning multiple values

# 1. DICT KEYS (lists can't be keys!)
locations = {
    (40.7, -74.0): "New York",  # tuple key - OK
    (51.5, -0.1): "London",
}
# {[40.7, -74.0]: "NYC"}  # ERROR: list not hashable

# 2. MULTIPLE RETURN VALUES
def get_user():
    return "Alice", 30, "admin"  # Returns tuple

name, age, role = get_user()  # Unpacking

# 3. FIXED/CONSTANT DATA
RGB_RED = (255, 0, 0)     # Color constant
ORIGIN = (0, 0)           # Point constant
CONFIG = ('localhost', 8080)  # Shouldn't change

# 4. MEMORY EFFICIENCY (sizes vary by platform)
import sys
sys.getsizeof([1,2,3])   # ~88-120 bytes (list)
sys.getsizeof((1,2,3))   # ~64-72 bytes (tuple)`},{section:`Why & When`,signature:`Tuple vs List`,description:`Tuple: immutable, hashable, less memory. List: mutable, more methods. Use tuple for heterogeneous fixed data, list for homogeneous collections.`,complexity:`Concept`,example:`# TUPLE vs LIST
# Tuple: immutable, hashable, lightweight
# List: mutable, more methods, dynamic

# IMMUTABILITY
t = (1, 2, 3)
# t[0] = 99  # ERROR: can't modify!
# t.append(4)  # ERROR: no append!

lst = [1, 2, 3]
lst[0] = 99  # OK
lst.append(4)  # OK

# HASHABLE (can use as dict key/set element)
valid_key = {(1, 2): "value"}  # tuple - OK
# invalid = {[1, 2]: "value"}  # list - ERROR

# CONVENTION:
# Tuple = heterogeneous data (different types)
person = ("Alice", 30, True)  # name, age, active

# List = homogeneous data (same type)
names = ["Alice", "Bob", "Charlie"]
scores = [95, 87, 92]

# GOTCHA: tuple with ONE element needs comma!
single = (1,)   # This is a tuple
not_tuple = (1) # This is just int 1!`},{section:`Why & When`,signature:`Performance tips`,description:`Tuples are faster to create and use less memory than lists. Use namedtuple for self-documenting tuples.`,complexity:`O(varies)`,example:`# PERFORMANCE: tuple vs list
import sys

# Memory (tuple wins) - sizes are approximate and platform-dependent
sys.getsizeof((1,2,3,4,5))  # ~64-80 bytes
sys.getsizeof([1,2,3,4,5])  # ~96-120 bytes

# Creation time (tuple wins)
# tuple() is ~2x faster than list()

# BUT tuples have only 2 methods:
t = (1, 2, 2, 3)
t.count(2)   # 2
t.index(2)   # 1
# That's it! No append, remove, sort, etc.

# NAMEDTUPLE for readable tuples
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)  # 3 4  (better than p[0], p[1])

# UNPACKING is powerful
x, y, z = (1, 2, 3)
first, *rest = (1, 2, 3, 4, 5)  # first=1, rest=[2,3,4,5]
a, _, b = (1, 2, 3)  # ignore middle value`},{section:`Creation`,signature:`tuple()`,description:`Creates an empty tuple or converts an iterable to a tuple.`,complexity:`O(n)`,example:`print(tuple())           # ()
print(tuple([1, 2, 3]))  # (1, 2, 3)
print(tuple("hello"))    # ('h', 'e', 'l', 'l', 'o')
print(tuple(range(5)))   # (0, 1, 2, 3, 4)`},{section:`Creation`,signature:`(x, y, z)`,description:`Tuple literal with parentheses. Parentheses optional except for empty tuple.`,complexity:`O(n)`,example:`t = (1, 2, 3)
t = 1, 2, 3      # Parentheses optional
t = (1,)         # Single element needs comma!
t = 1,           # Also valid single element
t = ()           # Empty tuple needs parentheses`},{section:`Creation`,signature:`x,`,description:`Single element tuple. The comma makes it a tuple, not parentheses.`,complexity:`O(1)`,example:`single = (1,)    # Tuple with one element
print(type(single))  # <class 'tuple'>

not_tuple = (1)  # This is just an int!
print(type(not_tuple))  # <class 'int'>`},{section:`Methods`,signature:`tuple.count(x)`,description:`Returns the number of times x appears in the tuple.`,complexity:`O(n)`,example:`t = (1, 2, 2, 3, 2, 4)
print(t.count(2))  # 3
print(t.count(5))  # 0`},{section:`Methods`,signature:`tuple.index(x[, start[, end]])`,description:`Returns index of first occurrence of x. Raises ValueError if not found.`,complexity:`O(n)`,example:`t = ('a', 'b', 'c', 'b', 'd')
print(t.index('b'))      # 1
print(t.index('b', 2))   # 3 (search from index 2)
# t.index('z')  # ValueError`},{section:`Immutability`,signature:`Immutability`,description:`Tuples cannot be modified after creation. No append, remove, or item assignment.`,complexity:`O(1)`,example:`t = (1, 2, 3)
# t[0] = 99     # TypeError: 'tuple' object does not support item assignment
# t.append(4)   # AttributeError: 'tuple' object has no attribute 'append'

# But mutable objects inside can change!
t = ([1, 2], [3, 4])
t[0].append(99)
print(t)  # ([1, 2, 99], [3, 4])`},{section:`Membership & Indexing`,signature:`x in tuple`,description:`Returns True if x is in the tuple.`,complexity:`O(n)`,example:`t = (1, 2, 3)
print(2 in t)      # True
print(5 in t)      # False
print(5 not in t)  # True`},{section:`Membership & Indexing`,signature:`tuple[i]`,description:`Access element at index i. Negative indices count from end.`,complexity:`O(1)`,example:`t = ('a', 'b', 'c', 'd')
print(t[0])   # 'a'
print(t[-1])  # 'd'
print(t[-2])  # 'c'`},{section:`Slicing`,signature:`tuple[start:stop:step]`,description:`Returns a new tuple from start to stop-1 with step.`,complexity:`O(k)`,example:`t = (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
print(t[2:5])     # (2, 3, 4)
print(t[:3])      # (0, 1, 2)
print(t[7:])      # (7, 8, 9)
print(t[::2])     # (0, 2, 4, 6, 8)
print(t[::-1])    # (9, 8, 7, 6, 5, 4, 3, 2, 1, 0)`},{section:`Unpacking`,signature:`a, b, c = tuple`,description:`Tuple unpacking. Assigns elements to variables.`,complexity:`O(n)`,example:`t = (1, 2, 3)
a, b, c = t
print(a, b, c)  # 1 2 3

# Swap values
x, y = 1, 2
x, y = y, x
print(x, y)  # 2 1`},{section:`Unpacking`,signature:`*rest unpacking`,description:`Extended unpacking. Captures remaining elements in a list.`,complexity:`O(n)`,example:`t = (1, 2, 3, 4, 5)
first, *rest = t
print(first, rest)  # 1 [2, 3, 4, 5]

*rest, last = t
print(rest, last)   # [1, 2, 3, 4] 5

first, *middle, last = t
print(first, middle, last)  # 1 [2, 3, 4] 5`},{section:`Unpacking`,signature:`_ placeholder`,description:`Use underscore to ignore values during unpacking.`,complexity:`O(1)`,example:`t = (1, 2, 3)
a, _, c = t
print(a, c)  # 1 3

# Ignore multiple
first, *_, last = (1, 2, 3, 4, 5)
print(first, last)  # 1 5`},{section:`Operators`,signature:`tuple1 + tuple2`,description:`Concatenation. Returns a new tuple.`,complexity:`O(n+m)`,example:`t1 = (1, 2)
t2 = (3, 4)
print(t1 + t2)  # (1, 2, 3, 4)`},{section:`Operators`,signature:`tuple * n`,description:`Repetition. Returns a new tuple with elements repeated.`,complexity:`O(n*k)`,example:`t = (1, 2)
print(t * 3)  # (1, 2, 1, 2, 1, 2)
print((0,) * 5)  # (0, 0, 0, 0, 0)`},{section:`Built-in Functions`,signature:`len(tuple)`,description:`Returns the number of elements.`,complexity:`O(1)`,example:`print(len((1, 2, 3)))  # 3
print(len(()))         # 0`},{section:`Built-in Functions`,signature:`min(tuple)`,description:`Returns the smallest element.`,complexity:`O(n)`,example:`print(min((3, 1, 4)))  # 1`},{section:`Built-in Functions`,signature:`max(tuple)`,description:`Returns the largest element.`,complexity:`O(n)`,example:`print(max((3, 1, 4)))  # 4`},{section:`Built-in Functions`,signature:`sum(tuple)`,description:`Returns sum of numeric elements.`,complexity:`O(n)`,example:`print(sum((1, 2, 3)))  # 6`},{section:`Built-in Functions`,signature:`sorted(tuple)`,description:`Returns a sorted list (not tuple).`,complexity:`O(n log n)`,example:`t = (3, 1, 4, 1, 5)
print(sorted(t))       # [1, 1, 3, 4, 5] (list!)
print(tuple(sorted(t))) # (1, 1, 3, 4, 5)`},{section:`Named Tuples`,signature:`namedtuple(name, fields)`,description:`Creates a tuple subclass with named fields. More readable than indices.`,complexity:`O(1)`,example:`from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)  # 3 4
print(p[0])      # 3 (still indexable)
print(p)         # Point(x=3, y=4)`},{section:`Named Tuples`,signature:`namedtuple._make(iterable)`,description:`Creates a namedtuple from an iterable.`,complexity:`O(n)`,example:`from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])

data = [3, 4]
p = Point._make(data)
print(p)  # Point(x=3, y=4)`},{section:`Named Tuples`,signature:`namedtuple._asdict()`,description:`Returns an OrderedDict representation.`,complexity:`O(n)`,example:`from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p._asdict())  # {'x': 3, 'y': 4}`},{section:`Named Tuples`,signature:`namedtuple._replace(**kwargs)`,description:`Returns a new namedtuple with specified fields replaced.`,complexity:`O(n)`,example:`from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
p2 = p._replace(x=10)
print(p2)  # Point(x=10, y=4)
print(p)   # Point(x=3, y=4) (unchanged)`},{section:`When to Use`,signature:`When to use tuple`,description:`Use tuples for heterogeneous data, dict keys, and when immutability is needed.`,complexity:`O(1)`,example:`# Tuple as dict key (list cannot be key)
locations = {
    (40.7128, -74.0060): "New York",
    (51.5074, -0.1278): "London",
}

# Return multiple values
def get_dimensions():
    return 1920, 1080  # Returns tuple

width, height = get_dimensions()

# Heterogeneous data
person = ("Alice", 30, "Engineer")  # name, age, job`},{section:`Comparison & Hash`,signature:`tuple1 == tuple2`,description:`Equality comparison. Compares element by element.`,complexity:`O(n)`,example:`print((1, 2, 3) == (1, 2, 3))  # True
print((1, 2) == (1, 2, 3))     # False`},{section:`Comparison & Hash`,signature:`tuple1 < tuple2`,description:`Lexicographic comparison. Compares element by element.`,complexity:`O(n)`,example:`print((1, 2) < (1, 3))     # True
print((1, 2) < (2, 0))     # True (first element decides)
print((1, 2, 3) < (1, 2))  # False (longer is greater)`},{section:`Comparison & Hash`,signature:`hash(tuple)`,description:`Returns hash value. Works only if all elements are hashable.`,complexity:`O(n)`,example:`t = (1, 2, 3)
print(hash(t))  # Some integer

# Can use as dict key or set element
d = {(1, 2): "value"}
s = {(1, 2), (3, 4)}

# Tuple with mutable element cannot be hashed
# hash(([1, 2],))  # TypeError: unhashable type: 'list'`}],H=[{section:`Fundamentals`,signature:`Dictionary Basics`,description:`Dictionaries store KEY-VALUE pairs. Create with {}. Keys must be hashable (immutable). Values can be anything. Order preserved since Python 3.7.`,complexity:`Concept`,example:`# Create dict with curly braces {}
capitals = {
    "California": "Sacramento",
    "New York": "Albany",
    "Texas": "Austin",
}

# Or from tuples with dict()
pairs = (("CA", "Sacramento"), ("NY", "Albany"))
capitals = dict(pairs)

# Empty dict
empty = {}  # or dict()

# Key-value pair structure
# Key: unique identifier (must be hashable: str, int, tuple)
# Value: any Python object

# Mixed types OK (but typically use same types)
data = {
    "name": "Alice",    # str key, str value
    1: [1, 2, 3],       # int key, list value
    (0, 0): "origin",   # tuple key, str value
}`},{section:`Fundamentals`,signature:`Dictionary Access`,description:`Access values with [key]. Raises KeyError if key missing. Use .get() for safe access with default value.`,complexity:`O(1)`,example:`capitals = {"Texas": "Austin", "California": "Sacramento"}

# Access with []
print(capitals["Texas"])  # "Austin"

# KeyError if missing!
# capitals["Arizona"]  # KeyError: 'Arizona'

# Check before accessing
if "Arizona" in capitals:
    print(capitals["Arizona"])

# Safe access with .get()
print(capitals.get("Arizona"))  # None (no error!)
print(capitals.get("Arizona", "Unknown"))  # "Unknown"

# Note: 'in' only checks KEYS, not values
print("Austin" in capitals)  # False! (it's a value, not a key)
print("Texas" in capitals)   # True (it's a key)`},{section:`Fundamentals`,signature:`Dictionary Mutability`,description:`Dicts are MUTABLE. Can add, modify, and delete items. Keys unique - assigning to existing key OVERWRITES value.`,complexity:`O(1)`,example:`capitals = {"Texas": "Austin"}

# Add new key-value pair
capitals["Colorado"] = "Denver"
print(capitals)  # {'Texas': 'Austin', 'Colorado': 'Denver'}

# Modify existing (overwrites!)
capitals["Texas"] = "Houston"
print(capitals)  # {'Texas': 'Houston', ...}

# Delete with del
del capitals["Texas"]
print(capitals)  # {'Colorado': 'Denver'}

# Each key can only map to ONE value
# If you assign to same key again, old value is lost!
d = {"key": "first"}
d["key"] = "second"  # "first" is gone!
print(d)  # {'key': 'second'}`},{section:`Fundamentals`,signature:`Iterating Over Dicts`,description:`for loop iterates over KEYS by default. Use .items() for key-value pairs, .values() for just values.`,complexity:`O(n)`,example:`capitals = {
    "California": "Sacramento",
    "New York": "Albany",
    "Texas": "Austin",
}

# Loop over keys (default)
for state in capitals:
    print(state)  # California, New York, Texas

# Loop and access values
for state in capitals:
    print(f"{state}: {capitals[state]}")

# Better: Loop over key-value pairs with .items()
for state, capital in capitals.items():
    print(f"The capital of {state} is {capital}")

# .items() returns list-like of tuples
print(capitals.items())
# dict_items([('California', 'Sacramento'), ...])`}],U=[{section:`Why & When`,signature:`Why use Dictionary?`,description:`Dicts provide O(1) average key-value lookups. Use when you need fast access by key, counting, caching, or mapping relationships.`,complexity:`Concept`,example:`# Dictionary = Hash Table = O(1) lookup
# Use for: key-value mappings, fast lookups, caching

# FAST operations (O(1) average):
d['key']           # Access by key
d['key'] = value   # Set value
'key' in d         # Membership test
del d['key']       # Delete

# Common use cases:
# 1. Configuration/settings
config = {'debug': True, 'port': 8080}

# 2. Counting occurrences
from collections import Counter
counts = Counter(['a', 'b', 'a', 'c', 'a'])

# 3. Caching/memoization
cache = {}
def expensive(n):
    if n not in cache:
        cache[n] = n ** 2  # Compute once
    return cache[n]`},{section:`Why & When`,signature:`Dict vs other types`,description:`Dict vs list: O(1) vs O(n) lookup. Dict keys must be hashable (immutable). Ordered since Python 3.7.`,complexity:`Concept`,example:`# DICT vs LIST for lookups
users_list = [('alice', 1), ('bob', 2)]  # O(n) search
users_dict = {'alice': 1, 'bob': 2}      # O(1) lookup

# Key requirements: must be HASHABLE
valid_keys = {
    'string': 1,        # str - hashable
    42: 2,              # int - hashable
    (1, 2): 3,          # tuple - hashable
}
# invalid: {[1, 2]: 1}  # list - NOT hashable
# invalid: {{}: 1}      # dict - NOT hashable

# ORDERED since Python 3.7
d = {}
d['first'] = 1
d['second'] = 2
list(d.keys())  # ['first', 'second'] - guaranteed!

# Use defaultdict for grouping
from collections import defaultdict
groups = defaultdict(list)
groups['a'].append(1)  # No KeyError!`},{section:`Why & When`,signature:`Performance tips`,description:`Use .get() to avoid KeyError. defaultdict for grouping. Counter for counting. Keys lookup is O(1).`,complexity:`O(varies)`,example:`# AVOID KeyError
d = {'a': 1}
# BAD: d['missing']  # KeyError!
# GOOD:
d.get('missing', 0)      # Returns 0
d.setdefault('b', [])    # Creates if missing

# EFFICIENT patterns
# Counting - use Counter
from collections import Counter
counts = Counter(items)  # vs manual loop

# Grouping - use defaultdict
from collections import defaultdict
groups = defaultdict(list)

# Merging (Python 3.9+)
merged = d1 | d2  # New dict
d1 |= d2          # Update in place

# Memory: dict overhead ~232 bytes empty
# For small fixed keys, consider namedtuple`}],W=[{section:`Creation`,signature:`dict()`,description:`Creates an empty dictionary or converts mappings/iterables to dict.`,complexity:`O(n)`,example:`print(dict())                    # {}
print(dict(a=1, b=2))            # {'a': 1, 'b': 2}
print(dict([('a', 1), ('b', 2)])) # {'a': 1, 'b': 2}
print(dict(zip(['a','b'], [1,2]))) # {'a': 1, 'b': 2}`},{section:`Creation`,signature:`{key: value}`,description:`Dictionary literal syntax. Keys must be hashable.`,complexity:`O(n)`,example:`d = {'name': 'Alice', 'age': 30}
d = {1: 'one', 2: 'two'}
d = {}  # Empty dict`},{section:`Creation`,signature:`{k: v for ...}`,description:`Dictionary comprehension. Creates dict from expression.`,complexity:`O(n)`,example:`squares = {x: x**2 for x in range(5)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# With condition
even_sq = {x: x**2 for x in range(10) if x % 2 == 0}
print(even_sq)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}`},{section:`Creation`,signature:`dict.fromkeys(keys[, value])`,description:`Creates dict with keys from iterable, all set to value (default None).`,complexity:`O(n)`,example:`keys = ['a', 'b', 'c']
d = dict.fromkeys(keys)
print(d)  # {'a': None, 'b': None, 'c': None}

d = dict.fromkeys(keys, 0)
print(d)  # {'a': 0, 'b': 0, 'c': 0}

# Warning: mutable default is shared!
d = dict.fromkeys(keys, [])
d['a'].append(1)
print(d)  # {'a': [1], 'b': [1], 'c': [1]} (all same list!)`}],G=[{section:`Access`,signature:`dict[key]`,description:`Returns value for key. Raises KeyError if key not found.`,complexity:`O(1) avg`,example:`d = {'name': 'Alice', 'age': 30}
print(d['name'])  # 'Alice'
# print(d['job'])  # KeyError: 'job'`},{section:`Access`,signature:`dict.get(key[, default])`,description:`Returns value for key, or default (None) if not found. Never raises KeyError.`,complexity:`O(1) avg`,example:`d = {'name': 'Alice', 'age': 30}
print(d.get('name'))       # 'Alice'
print(d.get('job'))        # None
print(d.get('job', 'N/A')) # 'N/A'`},{section:`Access`,signature:`dict.setdefault(key[, default])`,description:`Returns value if key exists; otherwise inserts key with default and returns it.`,complexity:`O(1) avg`,example:`d = {'a': 1}
print(d.setdefault('a', 99))  # 1 (existing)
print(d.setdefault('b', 2))   # 2 (inserted)
print(d)  # {'a': 1, 'b': 2}

# Useful for grouping
groups = {}
for item in ['apple', 'banana', 'apricot']:
    groups.setdefault(item[0], []).append(item)
print(groups)  # {'a': ['apple', 'apricot'], 'b': ['banana']}`}],K=[{section:`Modification`,signature:`dict[key] = value`,description:`Sets value for key. Adds key if not present.`,complexity:`O(1) avg`,example:`d = {'a': 1}
d['a'] = 99    # Update existing
d['b'] = 2     # Add new
print(d)  # {'a': 99, 'b': 2}`},{section:`Modification`,signature:`dict.update([other])`,description:`Updates dict with key-value pairs from other dict or iterable.`,complexity:`O(n)`,example:`d = {'a': 1, 'b': 2}
d.update({'b': 99, 'c': 3})
print(d)  # {'a': 1, 'b': 99, 'c': 3}

d.update(d=4, e=5)  # Keyword args
print(d)  # {'a': 1, 'b': 99, 'c': 3, 'd': 4, 'e': 5}

d.update([('f', 6)])  # From iterable of pairs
print(d)`},{section:`Modification`,signature:`dict | other (Python 3.9+)`,description:`Merge operator. Returns new dict with combined items.`,complexity:`O(n+m)`,example:`d1 = {'a': 1, 'b': 2}
d2 = {'b': 99, 'c': 3}
merged = d1 | d2
print(merged)  # {'a': 1, 'b': 99, 'c': 3}
print(d1)      # {'a': 1, 'b': 2} (unchanged)`},{section:`Modification`,signature:`dict |= other (Python 3.9+)`,description:`Update operator. Updates dict in place.`,complexity:`O(n)`,example:`d = {'a': 1, 'b': 2}
d |= {'b': 99, 'c': 3}
print(d)  # {'a': 1, 'b': 99, 'c': 3}`}],q=[{section:`Removal`,signature:`dict.pop(key[, default])`,description:`Removes key and returns its value. Returns default if not found (or raises KeyError).`,complexity:`O(1) avg`,example:`d = {'a': 1, 'b': 2, 'c': 3}
print(d.pop('b'))      # 2
print(d)               # {'a': 1, 'c': 3}
print(d.pop('z', 99))  # 99 (default)
# d.pop('z')  # KeyError`},{section:`Removal`,signature:`dict.popitem()`,description:`Removes and returns an arbitrary (last inserted in 3.7+) key-value pair. Raises KeyError if empty.`,complexity:`O(1)`,example:`d = {'a': 1, 'b': 2, 'c': 3}
print(d.popitem())  # ('c', 3) in Python 3.7+
print(d)            # {'a': 1, 'b': 2}`},{section:`Removal`,signature:`del dict[key]`,description:`Deletes key-value pair. Raises KeyError if key not found.`,complexity:`O(1) avg`,example:`d = {'a': 1, 'b': 2}
del d['a']
print(d)  # {'b': 2}
# del d['z']  # KeyError`},{section:`Removal`,signature:`dict.clear()`,description:`Removes all items from the dictionary.`,complexity:`O(n)`,example:`d = {'a': 1, 'b': 2}
d.clear()
print(d)  # {}`}],J=[{section:`Views`,signature:`dict.keys()`,description:`Returns a view of the dictionary's keys.`,complexity:`O(1)`,example:`d = {'a': 1, 'b': 2, 'c': 3}
keys = d.keys()
print(keys)        # dict_keys(['a', 'b', 'c'])
print(list(keys))  # ['a', 'b', 'c']
print('a' in keys) # True (O(1) membership)

# View is dynamic
d['d'] = 4
print(keys)  # dict_keys(['a', 'b', 'c', 'd'])`},{section:`Views`,signature:`dict.values()`,description:`Returns a view of the dictionary's values.`,complexity:`O(1)`,example:`d = {'a': 1, 'b': 2, 'c': 3}
values = d.values()
print(values)        # dict_values([1, 2, 3])
print(list(values))  # [1, 2, 3]`},{section:`Views`,signature:`dict.items()`,description:`Returns a view of key-value pairs as tuples.`,complexity:`O(1)`,example:`d = {'a': 1, 'b': 2}
items = d.items()
print(items)       # dict_items([('a', 1), ('b', 2)])
print(list(items)) # [('a', 1), ('b', 2)]

# Iteration
for key, value in d.items():
    print(f"{key}: {value}")`}],Y=[{section:`Membership & Length`,signature:`key in dict`,description:`Returns True if key is in the dictionary.`,complexity:`O(1) avg`,example:`d = {'a': 1, 'b': 2}
print('a' in d)      # True
print('z' in d)      # False
print('z' not in d)  # True`},{section:`Membership & Length`,signature:`len(dict)`,description:`Returns the number of key-value pairs.`,complexity:`O(1)`,example:`d = {'a': 1, 'b': 2, 'c': 3}
print(len(d))  # 3`}],X=[{section:`Copying`,signature:`dict.copy()`,description:`Returns a shallow copy of the dictionary.`,complexity:`O(n)`,example:`d = {'a': 1, 'b': [2, 3]}
copy = d.copy()
copy['a'] = 99
print(d)     # {'a': 1, 'b': [2, 3]} (unchanged)

copy['b'].append(4)  # Nested object shared!
print(d)     # {'a': 1, 'b': [2, 3, 4]}`},{section:`Copying`,signature:`copy.deepcopy(dict)`,description:`Creates a deep copy. Nested objects are also copied.`,complexity:`O(n)`,example:`import copy
d = {'a': 1, 'b': [2, 3]}
deep = copy.deepcopy(d)
deep['b'].append(4)
print(d)     # {'a': 1, 'b': [2, 3]} (unchanged!)
print(deep)  # {'a': 1, 'b': [2, 3, 4]}`}],Z=[{section:`Iteration`,signature:`for key in dict`,description:`Iterates over keys (default iteration).`,complexity:`O(n)`,example:`d = {'a': 1, 'b': 2}
for key in d:
    print(key, d[key])  # a 1, b 2`},{section:`Iteration`,signature:`for k, v in dict.items()`,description:`Iterates over key-value pairs. Most common pattern.`,complexity:`O(n)`,example:`d = {'a': 1, 'b': 2}
for key, value in d.items():
    print(f"{key} = {value}")`}],Q=[{section:`Specialized Dicts`,signature:`defaultdict(default_factory)`,description:`Dict subclass that provides default values for missing keys.`,complexity:`O(1)`,example:`from collections import defaultdict

# Default to 0
counts = defaultdict(int)
for char in "hello":
    counts[char] += 1
print(dict(counts))  # {'h': 1, 'e': 1, 'l': 2, 'o': 1}

# Default to empty list
groups = defaultdict(list)
groups['a'].append(1)  # No KeyError!
print(dict(groups))  # {'a': [1]}`},{section:`Specialized Dicts`,signature:`Counter(iterable)`,description:`Dict subclass for counting hashable objects.`,complexity:`O(n)`,example:`from collections import Counter

c = Counter("abracadabra")
print(c)  # Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})
print(c['a'])           # 5
print(c['z'])           # 0 (not KeyError!)
print(c.most_common(2)) # [('a', 5), ('b', 2)]`},{section:`Specialized Dicts`,signature:`OrderedDict()`,description:`Dict that remembers insertion order. (Regular dicts preserve order since 3.7)`,complexity:`O(1)`,example:`from collections import OrderedDict

od = OrderedDict()
od['a'] = 1
od['b'] = 2
od.move_to_end('a')  # Move 'a' to end
print(list(od.keys()))  # ['b', 'a']

# popitem(last=False) pops first item
print(od.popitem(last=False))  # ('b', 2)`}],ne=[{section:`Common Patterns`,signature:`Invert dictionary`,description:`Swap keys and values. Values must be hashable.`,complexity:`O(n)`,example:`d = {'a': 1, 'b': 2, 'c': 3}
inverted = {v: k for k, v in d.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}`},{section:`Common Patterns`,signature:`Merge with defaults`,description:`Use ChainMap or unpacking to provide default values.`,complexity:`O(n)`,example:`defaults = {'color': 'red', 'size': 'medium'}
user_prefs = {'color': 'blue'}

# Method 1: Unpacking (Python 3.5+)
config = {**defaults, **user_prefs}
print(config)  # {'color': 'blue', 'size': 'medium'}

# Method 2: ChainMap (looks up in order)
from collections import ChainMap
config = ChainMap(user_prefs, defaults)
print(config['color'])  # 'blue'
print(config['size'])   # 'medium'`},{section:`Common Patterns`,signature:`Group by key`,description:`Group items by a computed key.`,complexity:`O(n)`,example:`from collections import defaultdict

words = ['apple', 'banana', 'apricot', 'blueberry']
by_first_letter = defaultdict(list)
for word in words:
    by_first_letter[word[0]].append(word)
print(dict(by_first_letter))
# {'a': ['apple', 'apricot'], 'b': ['banana', 'blueberry']}`}],re=[...H,...U,...W,...G,...K,...q,...J,...Y,...X,...Z,...Q,...ne],ie=[{section:`Why & When`,signature:`Why use Set?`,description:`Sets provide O(1) membership testing and automatic deduplication. Use when you need unique elements or fast "is X in collection" checks.`,complexity:`Concept`,example:`# Set = Hash Table for unique values
# Use for: O(1) membership, deduplication, set math

# MEMBERSHIP TEST: O(1) vs O(n) for list!
allowed = {'admin', 'user', 'moderator'}
if role in allowed:  # O(1) - FAST!
    grant_access()

# vs list membership (SLOW)
if role in ['admin', 'user', 'moderator']:  # O(n)
    grant_access()

# DEDUPLICATION
items = [1, 2, 2, 3, 1, 4]
unique = set(items)  # {1, 2, 3, 4}

# SET MATH - find differences
old_users = {'alice', 'bob', 'charlie'}
new_users = {'bob', 'charlie', 'diana'}
added = new_users - old_users    # {'diana'}
removed = old_users - new_users  # {'alice'}`},{section:`Why & When`,signature:`Set vs other types`,description:`Set vs list: O(1) vs O(n) membership. Sets are unordered and require hashable elements. Use frozenset for immutable sets.`,complexity:`Concept`,example:`# SET vs LIST
# Use SET when: membership testing, uniqueness needed
# Use LIST when: order matters, duplicates allowed

# HASHABILITY requirement (like dict keys)
valid = {1, 'string', (1, 2)}     # OK
# invalid = {[1, 2]}  # ERROR: list not hashable
# invalid = {{1: 2}}  # ERROR: dict not hashable

# UNORDERED - no indexing!
s = {3, 1, 4}
# s[0]  # TypeError: 'set' object is not subscriptable

# FROZENSET - immutable set
fs = frozenset([1, 2, 3])
# fs.add(4)  # ERROR: no add method
# Can use as dict key or in another set
valid_dict = {frozenset([1, 2]): 'value'}

# Note: {} is empty DICT, not set!
empty_set = set()  # Correct
empty_dict = {}    # This is a dict!`},{section:`Why & When`,signature:`Performance tips`,description:`Convert list to set for repeated membership tests. Use set operations for finding differences. Frozenset for hashable sets.`,complexity:`O(varies)`,example:`# WHEN TO CONVERT TO SET
items = [1, 2, 3, 4, 5]

# BAD: checking membership many times in list
for x in range(1000):
    if x in items:  # O(n) each time = O(n*k) total
        pass

# GOOD: convert to set first
items_set = set(items)  # O(n) once
for x in range(1000):
    if x in items_set:  # O(1) each = O(k) total
        pass

# SET OPERATIONS vs manual loops
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# GOOD - use set operations
common = a & b         # {3, 4}
only_in_a = a - b      # {1, 2}
all_items = a | b      # {1, 2, 3, 4, 5, 6}

# Memory: ~224 bytes empty + ~32 bytes per item`},{section:`Creation`,signature:`set()`,description:`Creates an empty set or converts an iterable to a set.`,complexity:`O(n)`,example:`print(set())            # set()
print(set([1, 2, 2, 3])) # {1, 2, 3} (duplicates removed)
print(set("hello"))      # {'h', 'e', 'l', 'o'}
print(set(range(5)))     # {0, 1, 2, 3, 4}`},{section:`Creation`,signature:`{x, y, z}`,description:`Set literal syntax. Elements must be hashable. Cannot use {} for empty set.`,complexity:`O(n)`,example:`s = {1, 2, 3}
s = {1, 2, 2, 3}  # {1, 2, 3} (duplicates removed)
# s = {}  # This creates empty DICT, not set!
s = set()  # Empty set`},{section:`Creation`,signature:`{expr for x in iterable}`,description:`Set comprehension. Creates set from expression.`,complexity:`O(n)`,example:`squares = {x**2 for x in range(5)}
print(squares)  # {0, 1, 4, 9, 16}

# With condition
evens = {x for x in range(10) if x % 2 == 0}
print(evens)  # {0, 2, 4, 6, 8}`},{section:`Creation`,signature:`frozenset(iterable)`,description:`Immutable set. Can be used as dict key or in another set.`,complexity:`O(n)`,example:`fs = frozenset([1, 2, 3])
# fs.add(4)  # AttributeError: no add method

# Can use as dict key
d = {frozenset([1, 2]): "value"}

# Can add to set
s = {frozenset([1, 2]), frozenset([3, 4])}`},{section:`Adding Elements`,signature:`set.add(elem)`,description:`Adds element to the set. No effect if element already present.`,complexity:`O(1) avg`,example:`s = {1, 2}
s.add(3)
print(s)  # {1, 2, 3}

s.add(2)  # No effect
print(s)  # {1, 2, 3}`},{section:`Adding Elements`,signature:`set.update(*others)`,description:`Updates set with elements from all iterables.`,complexity:`O(n)`,example:`s = {1, 2}
s.update([3, 4], {5, 6})
print(s)  # {1, 2, 3, 4, 5, 6}

s.update("ab")
print(s)  # {1, 2, 3, 4, 5, 6, 'a', 'b'}`},{section:`Removing Elements`,signature:`set.remove(elem)`,description:`Removes element from set. Raises KeyError if not present.`,complexity:`O(1) avg`,example:`s = {1, 2, 3}
s.remove(2)
print(s)  # {1, 3}

# s.remove(99)  # KeyError: 99`},{section:`Removing Elements`,signature:`set.discard(elem)`,description:`Removes element if present. No error if not present.`,complexity:`O(1) avg`,example:`s = {1, 2, 3}
s.discard(2)
print(s)  # {1, 3}

s.discard(99)  # No error
print(s)  # {1, 3}`},{section:`Removing Elements`,signature:`set.pop()`,description:`Removes and returns an arbitrary element. Raises KeyError if empty.`,complexity:`O(1)`,example:`s = {1, 2, 3}
elem = s.pop()
print(elem)  # Some element (arbitrary)
print(s)     # Remaining elements

# set().pop()  # KeyError: 'pop from an empty set'`},{section:`Removing Elements`,signature:`set.clear()`,description:`Removes all elements from the set.`,complexity:`O(n)`,example:`s = {1, 2, 3}
s.clear()
print(s)  # set()`},{section:`Set Operations`,signature:`set.union(*others) or set | other`,description:`Returns new set with elements from set and all others.`,complexity:`O(n+m)`,example:`a = {1, 2, 3}
b = {3, 4, 5}
print(a.union(b))     # {1, 2, 3, 4, 5}
print(a | b)          # {1, 2, 3, 4, 5}
print(a | b | {6})    # {1, 2, 3, 4, 5, 6}`},{section:`Set Operations`,signature:`set.intersection(*others) or set & other`,description:`Returns new set with elements common to set and all others.`,complexity:`O(min(n,m))`,example:`a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a.intersection(b))  # {3, 4}
print(a & b)              # {3, 4}
print(a & b & {3, 7})     # {3}`},{section:`Set Operations`,signature:`set.difference(*others) or set - other`,description:`Returns new set with elements in set but not in others.`,complexity:`O(n)`,example:`a = {1, 2, 3, 4}
b = {3, 4, 5}
print(a.difference(b))  # {1, 2}
print(a - b)            # {1, 2}
print(a - b - {1})      # {2}`},{section:`Set Operations`,signature:`set.symmetric_difference(other) or set ^ other`,description:`Returns new set with elements in either set but not both.`,complexity:`O(n+m)`,example:`a = {1, 2, 3}
b = {2, 3, 4}
print(a.symmetric_difference(b))  # {1, 4}
print(a ^ b)                      # {1, 4}`},{section:`In-place Operations`,signature:`set.update(*others) or set |= other`,description:`Updates set with union. Adds elements from others.`,complexity:`O(n)`,example:`s = {1, 2}
s.update([3, 4])
print(s)  # {1, 2, 3, 4}

s |= {5, 6}
print(s)  # {1, 2, 3, 4, 5, 6}`},{section:`In-place Operations`,signature:`set.intersection_update(*others) or set &= other`,description:`Updates set with intersection. Keeps only common elements.`,complexity:`O(n)`,example:`s = {1, 2, 3, 4}
s.intersection_update({2, 3, 5})
print(s)  # {2, 3}

s &= {2, 6}
print(s)  # {2}`},{section:`In-place Operations`,signature:`set.difference_update(*others) or set -= other`,description:`Updates set with difference. Removes elements found in others.`,complexity:`O(n)`,example:`s = {1, 2, 3, 4}
s.difference_update({2, 3})
print(s)  # {1, 4}

s -= {1}
print(s)  # {4}`},{section:`In-place Operations`,signature:`set.symmetric_difference_update(other) or set ^= other`,description:`Updates set with symmetric difference.`,complexity:`O(n)`,example:`s = {1, 2, 3}
s.symmetric_difference_update({2, 3, 4})
print(s)  # {1, 4}

s ^= {1, 5}
print(s)  # {4, 5}`},{section:`Comparison`,signature:`set.issubset(other) or set <= other`,description:`Returns True if every element of set is in other.`,complexity:`O(n)`,example:`a = {1, 2}
b = {1, 2, 3, 4}
print(a.issubset(b))  # True
print(a <= b)         # True
print(a <= a)         # True (equal sets are subsets)`},{section:`Comparison`,signature:`set < other`,description:`Returns True if set is a proper subset (subset but not equal).`,complexity:`O(n)`,example:`a = {1, 2}
b = {1, 2, 3}
print(a < b)  # True
print(a < a)  # False (not proper subset of itself)`},{section:`Comparison`,signature:`set.issuperset(other) or set >= other`,description:`Returns True if every element of other is in set.`,complexity:`O(n)`,example:`a = {1, 2, 3, 4}
b = {1, 2}
print(a.issuperset(b))  # True
print(a >= b)           # True`},{section:`Comparison`,signature:`set > other`,description:`Returns True if set is a proper superset (superset but not equal).`,complexity:`O(n)`,example:`a = {1, 2, 3}
b = {1, 2}
print(a > b)  # True
print(a > a)  # False`},{section:`Comparison`,signature:`set.isdisjoint(other)`,description:`Returns True if sets have no elements in common.`,complexity:`O(min(n,m))`,example:`a = {1, 2}
b = {3, 4}
c = {2, 3}
print(a.isdisjoint(b))  # True
print(a.isdisjoint(c))  # False (share 2)`},{section:`Membership & Basics`,signature:`elem in set`,description:`Returns True if element is in the set.`,complexity:`O(1) avg`,example:`s = {1, 2, 3}
print(2 in s)      # True
print(5 in s)      # False
print(5 not in s)  # True`},{section:`Membership & Basics`,signature:`len(set)`,description:`Returns the number of elements in the set.`,complexity:`O(1)`,example:`s = {1, 2, 3}
print(len(s))  # 3
print(len(set()))  # 0`},{section:`Membership & Basics`,signature:`set.copy()`,description:`Returns a shallow copy of the set.`,complexity:`O(n)`,example:`s = {1, 2, 3}
copy = s.copy()
copy.add(4)
print(s)     # {1, 2, 3}
print(copy)  # {1, 2, 3, 4}`},{section:`Iteration & Functions`,signature:`for elem in set`,description:`Iterates over set elements. Order is arbitrary.`,complexity:`O(n)`,example:`s = {3, 1, 4, 1, 5}
for elem in s:
    print(elem)  # Order not guaranteed`},{section:`Iteration & Functions`,signature:`min(set)`,description:`Returns the smallest element.`,complexity:`O(n)`,example:`s = {3, 1, 4, 1, 5}
print(min(s))  # 1`},{section:`Iteration & Functions`,signature:`max(set)`,description:`Returns the largest element.`,complexity:`O(n)`,example:`s = {3, 1, 4, 1, 5}
print(max(s))  # 5`},{section:`Iteration & Functions`,signature:`sum(set)`,description:`Returns sum of numeric elements.`,complexity:`O(n)`,example:`s = {1, 2, 3, 4}
print(sum(s))  # 10`},{section:`Iteration & Functions`,signature:`sorted(set)`,description:`Returns a sorted list of set elements.`,complexity:`O(n log n)`,example:`s = {3, 1, 4, 1, 5}
print(sorted(s))  # [1, 3, 4, 5]`},{section:`Common Patterns`,signature:`Remove duplicates`,description:`Convert to set and back to list to remove duplicates.`,complexity:`O(n)`,example:`lst = [1, 2, 2, 3, 1, 4, 2]
unique = list(set(lst))  # Order not preserved!
print(unique)  # [1, 2, 3, 4] (order may vary)

# Preserve order (Python 3.7+)
unique = list(dict.fromkeys(lst))
print(unique)  # [1, 2, 3, 4] (order preserved)`},{section:`Common Patterns`,signature:`Find common elements`,description:`Use intersection to find elements in multiple collections.`,complexity:`O(n)`,example:`list1 = [1, 2, 3, 4]
list2 = [3, 4, 5, 6]
common = set(list1) & set(list2)
print(common)  # {3, 4}`},{section:`Common Patterns`,signature:`Find differences`,description:`Use set operations to find what changed.`,complexity:`O(n)`,example:`old_data = {1, 2, 3, 4}
new_data = {3, 4, 5, 6}

added = new_data - old_data
removed = old_data - new_data
unchanged = old_data & new_data

print(f"Added: {added}")      # {5, 6}
print(f"Removed: {removed}")  # {1, 2}
print(f"Unchanged: {unchanged}")  # {3, 4}`},{section:`Common Patterns`,signature:`Check for any/all in set`,description:`Fast membership testing with sets.`,complexity:`O(1) per check`,example:`allowed = {'admin', 'user', 'moderator'}
roles = ['guest', 'user']

# Check if any role is allowed
has_access = any(role in allowed for role in roles)
print(has_access)  # True

# Check if all roles are allowed
all_valid = all(role in allowed for role in roles)
print(all_valid)  # False ('guest' not allowed)`}];var ae=e();function $(e,n){return function(){return(0,ae.jsx)(t,{type:e.type,badge:e.badge,color:e.color,description:e.description,intro:e.intro,tip:e.tip,methods:n})}}const oe=$(n.string,h),se=$(n.int,g),ce=$(n.float,D),le=$(n.bool,R),ue=$(n.list,B),de=$(n.tuple,V),fe=$(n.dict,re),pe=$(n.set,ie);export{le as BoolPage,fe as DictPage,ce as FloatPage,se as IntPage,ue as ListPage,pe as SetPage,oe as StringPage,de as TuplePage};