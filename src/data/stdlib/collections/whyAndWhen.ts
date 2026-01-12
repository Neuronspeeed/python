import type { Method } from '../../../types'

export const collectionsWhyAndWhenMethods: Method[] = [
  { signature: 'Why collections?', description: 'Specialized containers beyond list/dict/set. Use when: frequency counting, default values, ordered dicts, double-ended queues.', complexity: 'Concept', section: 'Why & When', example: `# COLLECTIONS = Specialized container datatypes
# Core: Counter, defaultdict, deque, OrderedDict, ChainMap

# USE CASES:
# 1. Counter - frequency counting, top-k problems, anagrams
# 2. defaultdict - eliminate KeyError, group by key
# 3. deque - O(1) operations at both ends (queue, sliding window)
# 4. OrderedDict - maintain insertion order + LRU cache
# 5. ChainMap - chain multiple dicts, scope management

# WHY COUNTER BEATS MANUAL DICT:
# Manual approach (verbose, error-prone)
freq = {}
for item in arr:
    if item in freq:
        freq[item] += 1
    else:
        freq[item] = 1

# Counter approach (one line, clean)
from collections import Counter
freq = Counter(arr)

# INTERVIEW PATTERNS:
# - Top K Frequent: Counter(arr).most_common(k)
# - Anagram check: Counter(s1) == Counter(s2)
# - Character frequency: Counter(string)
# - Find majority element: Counter(arr).most_common(1)[0][0]

# WHY defaultdict ELIMINATES KeyError:
# Manual checking
groups = {}
for item in items:
    key = get_key(item)
    if key not in groups:
        groups[key] = []
    groups[key].append(item)

# defaultdict (cleaner)
from collections import defaultdict
groups = defaultdict(list)
for item in items:
    groups[get_key(item)].append(item)

# WHY deque BEATS list FOR QUEUES:
# list.pop(0) is O(n) - shifts all elements!
# deque.popleft() is O(1) - designed for this

# WHEN TO USE:
# - Counter: frequency analysis, top-k, anagrams
# - defaultdict: grouping, graphs (adjacency lists)
# - deque: BFS, sliding window, queue operations
# - OrderedDict: LRU cache, ordered iterations` },

  { signature: 'collections vs dict/list', description: 'Specialized collections offer cleaner code and better performance for specific use cases.', complexity: 'Concept', section: 'Why & When', example: `# COMPARISON: collections vs manual

# 1. COUNTING - Counter vs dict
# Manual dict:
freq = {}
for c in "hello":
    freq[c] = freq.get(c, 0) + 1

# Counter (cleaner):
from collections import Counter
freq = Counter("hello")

# 2. GROUPING - defaultdict vs dict
# Manual dict:
groups = {}
for word in words:
    key = len(word)
    if key not in groups:
        groups[key] = []
    groups[key].append(word)

# defaultdict (cleaner):
from collections import defaultdict
groups = defaultdict(list)
for word in words:
    groups[len(word)].append(word)

# 3. QUEUE - deque vs list
# list (SLOW - O(n) popleft):
queue = [1, 2, 3]
queue.pop(0)  # Shifts all elements!

# deque (FAST - O(1) popleft):
from collections import deque
queue = deque([1, 2, 3])
queue.popleft()  # Instant!

# PERFORMANCE COMPARISON:
# Operation       list      deque
# append          O(1)      O(1)
# pop             O(1)      O(1)
# appendleft      O(n)      O(1)   <- deque wins
# popleft         O(n)      O(1)   <- deque wins

# INTERVIEW TIP:
# ALWAYS use deque for BFS, never list!
# One wrong pop(0) costs you O(n) per iteration` },
]
