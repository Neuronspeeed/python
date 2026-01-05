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
    intro: `Strings are ordered collections of characters used to store and represent text-based information. As the first representative of Python's sequence category, strings share operations with lists and tuples—indexing, slicing, concatenation. Strings are immutable: you cannot change them in place after creation, only create new ones.

Literals & Escapes: Single \`'..'\` and double \`".."\` quotes are interchangeable—use one to embed the other without escapes. Escape sequences use backslash: \`\\n\` newline, \`\\t\` tab, \`\\\\\` literal backslash. Python 3.12+ warns on unrecognized escapes (future errors). Raw strings \`r".."\` suppress escape interpretation—ideal for Windows paths and regex (but can't end in odd number of backslashes). Triple quotes \`'''..'''\` or \`"""..."""\` span multiple lines for docstrings, HTML, JSON.

Indexing & Slicing: Fetch character by offset \`S[i]\` (negative counts from end: \`S[-1]\` is last). Extract section with \`S[i:j]\` (j not included). Extended slicing \`S[i:j:k]\` adds step/stride—\`S[::2]\` every other char, \`S[::-1]\` reverses entire string. Slicing never raises IndexError; out-of-bounds silently truncates.

Operations: Concatenate with \`+\`, repeat with \`*\` (\`"ab" * 3\` → \`"ababab"\`). Length with \`len()\`. Membership with \`in\` (\`"x" in s\`). Iteration with \`for c in s\`.

Conversions: \`int("42")\` and \`float("3.14")\` parse strings to numbers. \`str(42)\` converts number to string. \`ord('A')\` → 65 (Unicode code point). \`chr(65)\` → 'A'. \`repr()\` gives code-like string, \`str()\` gives user-friendly string.

Methods: \`find(sub)\` returns offset of substring (-1 if not found), \`index(sub)\` same but raises ValueError. \`replace(old, new)\` does global substitution. \`split(sep)\` chops string into list, \`join(list)\` implodes list into string with delimiter. \`strip()\`/\`lstrip()\`/\`rstrip()\` remove whitespace. \`upper()\`/\`lower()\`/\`title()\`/\`capitalize()\` change case. \`startswith()\`/\`endswith()\` test prefixes/suffixes. \`isdigit()\`/\`isalpha()\`/\`isalnum()\`/\`isspace()\` test content.

Formatting: Three redundant tools for string formatting (multiple substitutions in one step). Expression \`%\`: C-style with type codes—\`"%s is %d" % (name, age)\`. Method \`.format()\`: curly braces with positional/keyword args—\`"{} is {}".format(name, age)\` or \`"{n} is {a}".format(n=name, a=age)\`. F-strings (3.6+): inline expression interpolation—\`f"{name} is {age}"\`. F-strings are fastest, most readable, and recommended. Format specs work in all three: \`{x:.2f}\` for 2 decimal places, \`{x:>10}\` right-align in 10 chars.

UNICODE MODEL: Python 3 strictly separates text from binary. \`str\` stores Unicode text (decoded characters). \`bytes\` stores raw binary (8-bit values). \`bytearray\` is mutable bytes. Cannot mix them—convert explicitly with \`.encode()\` and \`.decode()\`. "Unicode sandwich": decode bytes on input, process as text, encode on output.

FILE I/O: Text mode (\`'r'\`, \`'w'\`) auto-decodes/encodes and translates newlines. Binary mode (\`'rb'\`, \`'wb'\`) reads/writes raw bytes unchanged—essential for images, audio, protocols. Specify encoding: \`open(f, encoding='utf-8')\`.

UNICODE ESCAPES: Non-ASCII via escapes: \`\\xNN\` (hex byte), \`\\uNNNN\` (16-bit), \`\\U0000NNNN\` (32-bit). BOM (Byte Order Mark) identifies encoding—use \`'utf-8-sig'\` to handle. Normalization: same char can have multiple representations—use \`unicodedata.normalize('NFC', s)\` for consistent comparisons.`,
    tip: `Building string in loop? "".join(list) - NEVER s += (O(n²) vs O(n))
Anagram check? sorted(s1) == sorted(s2) - or Counter(s1) == Counter(s2) for early exit
Palindrome? s == s[::-1] - reverse and compare in one line
Substring search? "sub" in s is O(n), s.find() returns index, s.count() counts occurrences`,
  },
  int: {
    type: 'Integer',
    badge: 'int',
    color: 'var(--accent-int)',
    description: 'Integers are whole numbers with arbitrary precision. Python handles big integers natively—no overflow!',
    intro: `Integers represent whole numbers—positive, negative, or zero. Python 3 unifies integers into a single \`int\` type with unlimited precision: no overflow, no size limits. Numbers grow as large as memory allows.

Literals: Decimal \`42\`, binary \`0b1010\` (10), octal \`0o52\` (42), hex \`0x2A\` (42). Underscores improve readability: \`1_000_000\`. No trailing type markers needed.

Operations: Standard arithmetic \`+\`, \`-\`, \`*\`. Division \`/\` always returns float (\`5/2\` → \`2.5\`). Floor division \`//\` truncates toward negative infinity (\`5//2\` → \`2\`, \`-5//2\` → \`-3\`). Modulo \`%\` gives remainder. Power \`**\` (\`2**10\` → \`1024\`). \`divmod(a, b)\` returns both quotient and remainder.

Bit Operations: \`&\` AND, \`|\` OR, \`^\` XOR, \`~\` complement, \`<<\` left shift, \`>>\` right shift. Useful for flags, masks, and low-level algorithms. \`bin()\`, \`oct()\`, \`hex()\` convert to string representations. \`int.bit_length()\` counts bits needed.

Conversions: \`int("42")\` parses string. \`int("2A", 16)\` parses with base. \`int(3.9)\` truncates float toward zero. \`round(3.5)\` rounds to nearest even (banker's rounding).

Bool Relationship: \`bool\` is a subclass of \`int\`—\`True\` equals \`1\`, \`False\` equals \`0\`. You can do arithmetic on booleans: \`sum([True, True, False])\` → \`2\`.`,
    tip: `Need infinity for comparisons? float('inf') and float('-inf') - works with min/max
Reverse integer digits? int(str(abs(n))[::-1]) * (1 if n >= 0 else -1) - handle negatives!
Quotient + remainder together? divmod(a, b) returns (a//b, a%b) - one operation
Bit manipulation? Use &, |, ^, ~, <<, >> - O(1) operations, fast for flags/masks`,
  },
  float: {
    type: 'Float',
    badge: 'float',
    color: 'var(--accent-float)',
    description: 'Floats are double-precision (64-bit) floating point numbers. Use math.isclose() for comparisons!',
    intro: `Floats represent real numbers with fractional parts using 64-bit double-precision IEEE 754 format. They have finite precision (~15-17 significant digits) and limited range (±1.8×10³⁰⁸).

Literals: Decimal point \`3.14\`, scientific notation \`1.5e10\` (1.5×10¹⁰), negative exponent \`2.5e-4\` (0.00025). Leading/trailing zeros optional: \`.5\` same as \`0.5\`.

Precision Pitfalls: Binary representation causes surprises: \`0.1 + 0.2\` → \`0.30000000000000004\`. Never compare floats with \`==\`! Use \`abs(a - b) < epsilon\` or \`math.isclose(a, b)\`. For exact decimals (money), use \`decimal.Decimal\`.

Special Values: \`float('inf')\` positive infinity, \`float('-inf')\` negative infinity, \`float('nan')\` not-a-number. \`math.isinf()\` and \`math.isnan()\` test these. NaN is not equal to anything, including itself.

Operations: All arithmetic operators work. \`//\` floor division returns float (\`5.0 // 2\` → \`2.0\`). \`%\` modulo works on floats. \`**\` for powers including fractional exponents (\`4**0.5\` → \`2.0\`).

Math Module: \`math.floor()\` rounds down, \`math.ceil()\` rounds up, \`math.trunc()\` toward zero. \`math.sqrt()\`, \`math.log()\`, \`math.sin()\`, etc. for mathematical functions. \`round(x, n)\` rounds to n decimal places.

Conversions: \`float("3.14")\` parses string. \`float(42)\` from int. \`int(3.9)\` truncates to \`3\`. Format with \`f"{x:.2f}"\` for 2 decimal places.`,
    tip: `NEVER use == for floats! abs(a - b) < 1e-9 or math.isclose(a, b)
Binary search on floats? while right - left > 1e-9 (not left < right!)
Need exact decimals (money)? Use decimal.Decimal, not float
Float precision? ~15-17 digits - 0.1 + 0.2 ≠ 0.3 due to binary representation`,
  },
  bool: {
    type: 'Boolean',
    badge: 'bool',
    color: 'var(--accent-bool)',
    description: 'Booleans represent True/False values. Bool is a subclass of int—True is 1, False is 0.',
    intro: `Booleans represent truth values with exactly two constants: \`True\` and \`False\`. Technically, \`bool\` is a subclass of \`int\`—\`True\` equals \`1\`, \`False\` equals \`0\`. This enables arithmetic on booleans.

Truth Testing: Python has a broad notion of true/false. Any object can be tested for truth. Falsy values: \`False\`, \`None\`, zero (\`0\`, \`0.0\`), empty sequences (\`""\`, \`[]\`, \`()\`, \`{}\`, \`set()\`). Everything else is truthy—including \`"False"\` (non-empty string).

Boolean Operators: \`and\`, \`or\`, \`not\`. Short-circuit evaluation: \`and\` returns first falsy or last value; \`or\` returns first truthy or last value. \`x and y\` → \`y\` if \`x\` is truthy, else \`x\`. \`x or y\` → \`x\` if \`x\` is truthy, else \`y\`. This enables patterns like \`value = x or default\`.

Comparison Operators: \`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\` return booleans. Can be chained: \`1 < x < 10\` is same as \`1 < x and x < 10\`. \`is\` tests identity (same object), \`==\` tests equality (same value).

Built-in Functions: \`bool(x)\` converts to boolean. \`all(iter)\` returns \`True\` if all elements are truthy. \`any(iter)\` returns \`True\` if any element is truthy. Both short-circuit.

Arithmetic: Since \`True == 1\` and \`False == 0\`: \`sum([True, True, False])\` → \`2\` (counts True values). \`True + True\` → \`2\`. Useful for counting conditions.

Ternary Expression: \`x if condition else y\`—evaluates and returns \`x\` if condition is truthy, else \`y\`. Single expression, not statement.`,
    tip: `Count True values? sum(bool_list) - True is 1, False is 0 (bool subclasses int)
Any element True? any(iterable) - short-circuits on first True
All elements True? all(iterable) - short-circuits on first False
Falsy values to remember? 0, 0.0, "", [], {}, (), set(), None, False - everything else is truthy!`,
  },
  list: {
    type: 'List',
    badge: 'list',
    color: 'var(--accent-list)',
    description: "Python's go-to ordered collection. Mutable, dynamic sizing. O(1) append/pop end, O(n) insert/remove elsewhere.",
    intro: `Lists are ordered collections of arbitrary objects accessed by positional offset. As mutable sequences, they support all sequence operations (indexing, slicing, concatenation) plus in-place modification. Lists can grow or shrink on demand, be changed in place, and nest arbitrarily deep.

Core Properties: Lists are arrays of object references—very fast to index O(1). They're heterogeneous: a single list can contain numbers, strings, other lists, any mix of types. Like a row of lockers at a gym: everything has a number (offset) and you need that number to access it.

Basic Operations: Concatenate with \`+\` (creates new list), repeat with \`*\`. Indexing \`L[i]\` returns object at offset, slicing \`L[i:j]\` returns new list. Negative indices count from end: \`L[-1]\` is last item. \`len(L)\`, \`in\` membership, iteration all work as expected.

Modifying In Place: Assign to index \`L[i] = X\` or slice \`L[i:j] = [X, Y]\`. Slice assignment can replace, expand, or shrink—it deletes the section and inserts new items. \`del L[i]\` removes by index, \`del L[i:j]\` removes slice.

Methods: \`append(x)\` adds one item to end. \`extend(iter)\` adds multiple items from any iterable. \`insert(i, x)\` adds at specific offset. \`pop()\` removes and returns last item, \`pop(i)\` removes at index. \`remove(x)\` removes first occurrence by value. \`clear()\` empties list. \`reverse()\` reverses in place. \`copy()\` returns shallow copy.

Sorting: \`L.sort()\` orders in place (returns None). Accepts \`reverse=True\` and \`key=func\` (e.g., \`key=str.lower\`, \`key=len\`). \`sorted(L)\` is non-in-place alternative that returns new list. Both are stable sorts (equal elements keep original order).

Comprehensions: \`[expr for x in iter]\` builds lists concisely and often faster than manual loops. Add conditions: \`[x for x in L if x > 0]\`. Nested: \`[x for row in matrix for x in row]\`. The \`*\` unpacking syntax in literals: \`[*L1, *L2]\` concatenates.`,
    tip: `Last element? arr[-1] - Second to last? arr[-2] - Negative indexing from end
Copy list shallow? arr[:] or arr.copy() - Deep copy? import copy; copy.deepcopy(arr)
Insert/pop at front O(n)? Use collections.deque for O(1) appendleft/popleft
Sort in place? arr.sort() returns None - Get sorted copy? sorted(arr) returns new list`,
  },
  tuple: {
    type: 'Tuple',
    badge: 'tuple',
    color: 'var(--accent-tuple)',
    description: 'Immutable sequences. Hashable, memory-efficient. Only 2 methods. Use for fixed data, dict keys, function returns.',
    intro: `Tuples are simple groups of objects that work like lists, but with the critical distinction that they are immutable sequences. Once created, they cannot be changed in place.

Core Properties: Ordered collections that can be heterogeneous (hold different types) and arbitrarily nested. Because they're immutable, tuples are hashable and can be used as dictionary keys or set elements—lists cannot.

Syntax and Literals: Tuples are typically written in parentheses \`(1, 2, 3)\`, though parentheses are often optional unless context makes commas ambiguous. A one-item tuple requires a trailing comma \`(0,)\` to distinguish it from a parenthesized expression—\`(0)\` is just the integer 0. Empty tuple is \`()\`.

Operations: Support standard sequence operations—indexing \`T[i]\`, slicing \`T[i:j]\`, concatenation \`+\`, repetition \`*\`, length \`len()\`, membership \`in\`, iteration. However, tuples have only two type-specific methods: \`index(x)\` finds position of value, \`count(x)\` counts occurrences.

Integrity: Their primary purpose is providing an integrity constraint—ensuring a collection remains constant throughout a program. Use tuples for fixed collections that shouldn't change: coordinates, database records, function return values.

Named Tuples: The \`collections.namedtuple\` extension allows components to be accessed by both position and mnemonic attribute name. \`Point = namedtuple('Point', ['x', 'y'])\` creates a class where \`p.x\` and \`p[0]\` both work. Acts as a lightweight class or hybrid between tuple and dictionary.

Unpacking: Tuples support sequence unpacking: \`a, b, c = (1, 2, 3)\` assigns each element. Extended unpacking with \`*\`: \`first, *rest = (1, 2, 3, 4)\` gives \`first=1\`, \`rest=[2,3,4]\`. Swap values elegantly: \`a, b = b, a\`.`,
    tip: `Need hashable dict key? Use tuple (x, y) for coordinates - lists aren't hashable!
Swap values elegantly? a, b = b, a - no temp variable needed (tuple unpacking)
Return multiple values? return a, b, c - automatically creates tuple
Single-item tuple? (x,) with trailing comma - (x) is just a parenthesized expression!`,
  },
  dict: {
    type: 'Dictionary',
    badge: 'dict',
    color: 'var(--accent-dict)',
    description: 'Hash table with O(1) key-value lookups. Keys must be hashable. Ordered since Python 3.7.',
    intro: `Dictionaries are unordered (pre-3.7) or insertion-ordered (3.7+) collections of arbitrary objects accessed by key rather than offset. As mutable mappings, they can be changed in place but don't support sequence operations like slicing or concatenation. Ideal for labeled data and fast lookups.

Core Properties: Implemented as hash tables for O(1) retrieval. Keys must be hashable (immutable): strings, numbers, tuples of immutables. Values can be any type. Since Python 3.7, dicts maintain insertion order—keys appear left-to-right based on when added. Like a check-in desk with labeled cubbies: you look for the one with your name (key), not a number.

Basic Operations: Fetch with \`D[key]\` (raises KeyError if missing). Store with \`D[key] = value\`. Delete with \`del D[key]\`. Length with \`len(D)\`. Key existence with \`key in D\` (O(1) check). Iteration \`for k in D\` yields keys.

Construction: Literals \`{key: value, ...}\`. Constructor \`dict(name='Pat', age=30)\` or \`dict(zip(keys, vals))\`. From keys \`dict.fromkeys(['a','b'], 0)\`. Unpacking \`{**d1, **d2}\` merges. Comprehensions \`{k: v for k, v in pairs}\`.

Methods: \`get(key, default)\` returns default if key missing (avoids KeyError). \`setdefault(key, default)\` returns value if exists, else sets and returns default. \`pop(key)\` removes and returns value. \`popitem()\` removes and returns last item (LIFO since 3.7). \`update(other)\` merges another dict or key-value pairs. \`clear()\` empties dict.

Views: \`keys()\`, \`values()\`, \`items()\` return view objects—iterables that dynamically reflect dict changes. Views from \`keys()\` and \`items()\` support set operations: \`d1.keys() & d2.keys()\` for common keys, \`d1.keys() | d2.keys()\` for all keys.

Merge Operators: Python 3.9+ adds \`d1 | d2\` (creates new merged dict) and \`d1 |= d2\` (updates d1 in place). Right-hand dict wins on key conflicts.

Usage Patterns: Labeled records (field names as keys), sparse data (most positions empty), memoization caches, counting with \`Counter\`, grouping with \`defaultdict(list)\`.`,
    tip: `Two Sum pattern? seen = {}; check if (target - num) in seen - O(1) lookup beats O(n²) nested loops
Count frequency? Counter(arr).most_common(k) - or manual: freq = {}; freq[x] = freq.get(x, 0) + 1
Group by key? defaultdict(list) auto-creates empty list - or dict.setdefault(key, []).append(val)
Avoid KeyError? dict.get(key, default) or use defaultdict - d[key] raises if missing`,
  },
  set: {
    type: 'Set',
    badge: 'set',
    color: 'var(--accent-set)',
    description: 'Unordered collection with O(1) membership testing. Automatic deduplication. Elements must be hashable.',
    intro: `Sets are unordered collections of unique, hashable objects. Implemented as hash tables, they provide O(1) membership testing—the killer feature. Sets automatically remove duplicates: \`{1, 2, 2, 3}\` → \`{1, 2, 3}\`.

Core Properties: Unordered (no indexing or slicing), mutable (can add/remove), elements must be hashable (immutable: strings, numbers, tuples). Like the mathematical concept—unique elements, set operations. Think of a bag of marbles where duplicates are impossible.

Literals & Construction: Curly braces \`{1, 2, 3}\` (not \`{}\`—that's an empty dict!). Empty set: \`set()\`. From iterable: \`set([1, 2, 2, 3])\` or \`set("hello")\` → \`{'h', 'e', 'l', 'o'}\`. Comprehensions: \`{x**2 for x in range(5)}\`.

Set Operations: Union \`a | b\` or \`a.union(b)\`. Intersection \`a & b\` or \`a.intersection(b)\`. Difference \`a - b\` (in a but not b). Symmetric difference \`a ^ b\` (in either but not both). Subset \`a <= b\`, proper subset \`a < b\`, superset \`a >= b\`.

Methods: \`add(x)\` adds single element. \`update(iter)\` adds multiple. \`remove(x)\` removes (raises KeyError if missing). \`discard(x)\` removes (no error if missing). \`pop()\` removes and returns arbitrary element. \`clear()\` empties set.

Frozen Sets: \`frozenset\` is immutable version—hashable, can be dict key or set element. Created with \`frozenset([1, 2, 3])\`. Supports all operations except modification.

Common Patterns: Deduplication \`list(set(arr))\` (loses order—use \`dict.fromkeys(arr)\` to preserve). Membership testing \`x in seen\`. Finding common/unique elements between collections.`,
    tip: `"Have we seen X?" Use set for O(1) lookup - seen = set(); if x in seen: ...
Remove duplicates? list(set(arr)) but LOSES order - Preserve order? list(dict.fromkeys(arr))
Common elements? a & b (intersection) - Unique to a? a - b (difference) - All elements? a | b (union)
Empty set gotcha? set() NOT {} - {} creates empty dict!`,
  },
}
