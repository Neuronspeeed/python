import {
  stringIntro,
  intIntro,
  floatIntro,
  boolIntro,
  listIntro,
  tupleIntro,
  dictIntro,
  setIntro,
} from './dataTypeIntros'

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
    intro: stringIntro,
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
    intro: intIntro,
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
    intro: floatIntro,
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
    intro: boolIntro,
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
    intro: listIntro,
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
    intro: tupleIntro,
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
    intro: dictIntro,
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
    intro: setIntro,
    tip: `"Have we seen X?" pattern? seen = set(); if x in seen: ... - O(1) membership test, MUCH faster than list!
Remove duplicates? list(set(arr)) but LOSES order - Preserve order? list(dict.fromkeys(arr)) (3.7+)
Common elements? a & b (intersection) - Unique to a? a - b (difference) - All? a | b (union) - XOR? a ^ b
Empty set? MUST use set() NOT {} - {} creates empty DICT!
Elements must be HASHABLE? Can add ints/strings/tuples, CANNOT add lists/dicts/sets - use frozenset for hashable set`,
  },
}
