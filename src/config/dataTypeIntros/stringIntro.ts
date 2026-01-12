export const stringIntro = `String Building Performance: Choose the Right Tool
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
\`\`\``
