import{a as e,b as t,c as n,i as r,n as i,o as a,s as o}from"./index-Dfa-XKD4.js";const s=[{signature:`What is Big O?`,description:`Big O is a method to categorize algorithms based on their time complexity or memory performance as input grows.`,complexity:`Concept`,section:`Why & When`,example:`# BIG O NOTATION
# A way to describe algorithm efficiency as input scales

# THREE KEY CONCEPTS:

# 1. GROWTH WITH RESPECT TO INPUT
#    How does performance change as n increases?
def linear(arr):      # O(n) - grows linearly
    for x in arr:
        print(x)

def quadratic(arr):   # O(n²) - grows quadratically
    for x in arr:
        for y in arr:
            print(x, y)

# 2. CONSTANTS ARE DROPPED
#    O(2n) → O(n)
#    O(n/2) → O(n)
#    O(500) → O(1)
#    We care about growth rate, not exact count

# 3. WORST-CASE SCENARIO
#    Big O typically describes the worst case
#    Linear search: O(n) even though item might be first

# HOW TO QUICKLY DETERMINE BIG O:
# Look for loops iterating over input!
# - 1 loop over n elements → O(n)
# - 2 nested loops → O(n²)
# - Loop halving input → O(log n)
# - No loops, just math → O(1)`},{signature:`Why understand Big O?`,description:`Big O describes how runtime/space grows with input size. Essential for writing efficient code and acing technical interviews.`,complexity:`Concept`,section:`Why & When`,example:`# Big O = How does performance scale?
# O(1)     - Constant: same time regardless of input
# O(log n) - Logarithmic: halving input each step
# O(n)     - Linear: visit each element once
# O(n log n) - Linearithmic: efficient sorting
# O(n²)    - Quadratic: nested loops
# O(2^n)   - Exponential: doubles each step
# O(n!)    - Factorial: all permutations

# WHY IT MATTERS:
# n = 1,000,000
# O(n)   = 1,000,000 operations     (~1ms)
# O(n²)  = 1,000,000,000,000 ops    (~11 days!)
# O(log n) = 20 operations          (instant)`},{signature:`Time vs Space Complexity`,description:`Time = operations performed. Space = memory used. Often trade one for the other. Know both for each algorithm.`,complexity:`Concept`,section:`Why & When`,example:`# TIME COMPLEXITY: How many operations?
def find_sum(arr):        # O(n) time
    total = 0             # O(1) per iteration
    for x in arr:         # n iterations
        total += x
    return total

# SPACE COMPLEXITY: How much memory?
def double_all(arr):      # O(n) space
    result = []           # New array created
    for x in arr:         # Storing n elements
        result.append(x * 2)
    return result

def double_in_place(arr): # O(1) space
    for i in range(len(arr)):
        arr[i] *= 2       # Modifies existing array
    return arr

# TRADE-OFF EXAMPLE: Memoization
# Without: O(2^n) time, O(n) space (call stack)
# With:    O(n) time, O(n) space (cache)`},{signature:`Common Complexities Ranked`,description:`From best to worst: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n) < O(n!). Memorize these!`,complexity:`Reference`,section:`Why & When`,example:`# COMPLEXITY RANKING (best to worst)
#
# O(1)       Constant     Hash lookup, array access
# O(log n)   Logarithmic  Binary search
# O(n)       Linear       Single loop, linear search
# O(n log n) Linearithmic Merge sort, heap sort
# O(n²)      Quadratic    Nested loops, bubble sort
# O(n³)      Cubic        Triple nested loops
# O(2^n)     Exponential  Recursive fibonacci, subsets
# O(n!)      Factorial    Permutations

# PRACTICAL LIMITS (1 second):
# O(n)       n ≤ 10^8
# O(n log n) n ≤ 10^6
# O(n²)      n ≤ 10^4
# O(n³)      n ≤ 500
# O(2^n)     n ≤ 20
# O(n!)      n ≤ 10`},{signature:`Array/List Operations`,description:`Access O(1), Search O(n), Insert/Delete at end O(1), Insert/Delete elsewhere O(n).`,complexity:`Reference`,section:`Data Structure Operations`,example:`# PYTHON LIST (Dynamic Array)
#
# Access by index    O(1)    arr[i]
# Search             O(n)    x in arr
# Append (end)       O(1)*   arr.append(x)  *amortized
# Pop (end)          O(1)    arr.pop()
# Insert (middle)    O(n)    arr.insert(i, x)
# Delete (middle)    O(n)    arr.pop(i), del arr[i]
# Slice              O(k)    arr[i:j]

# WHEN TO USE:
# - Need index access: YES
# - Frequent insertions at start: NO (use deque)
# - Frequent lookups: NO (use set/dict)

# Example: Why insert at start is slow
arr = [1, 2, 3, 4, 5]
arr.insert(0, 0)  # Shifts ALL elements right - O(n)`},{signature:`Hash Table Operations`,description:`Dict/Set: Average O(1) for get/set/delete/contains. Worst case O(n) with many collisions.`,complexity:`Reference`,section:`Data Structure Operations`,example:`# PYTHON DICT / SET (Hash Table)
#
# Get/Set/Delete     O(1) avg    d[key], d[key]=val
# Contains (in)      O(1) avg    key in d
# Iteration          O(n)        for k in d
# Keys/Values/Items  O(1)        d.keys() - view object

# WHY O(1)? Hash function maps key to index
# WHEN O(n)? Many hash collisions (rare)

# DICT vs SET
d = {'a': 1, 'b': 2}    # Key-value pairs
s = {'a', 'b', 'c'}     # Just keys (unique values)

# WHEN TO USE:
# - Fast lookups by key: dict
# - Check membership: set
# - Count occurrences: Counter

from collections import Counter
counts = Counter([1, 2, 2, 3, 3, 3])
# Counter({3: 3, 2: 2, 1: 1}) - O(n) to build, O(1) to query`},{signature:`Stack & Queue Operations`,description:`Stack (LIFO): push/pop O(1). Queue (FIFO): enqueue/dequeue O(1) with deque.`,complexity:`Reference`,section:`Data Structure Operations`,example:`# STACK (Last In, First Out)
# Use Python list as stack
stack = []
stack.append(1)   # Push - O(1)
stack.append(2)
stack.pop()       # Pop - O(1) returns 2
stack[-1]         # Peek - O(1)

# QUEUE (First In, First Out)
# DON'T use list (pop(0) is O(n))
# USE collections.deque

from collections import deque
queue = deque()
queue.append(1)      # Enqueue right - O(1)
queue.append(2)
queue.popleft()      # Dequeue left - O(1) returns 1

# DEQUE OPERATIONS (all O(1))
# appendleft(), append()
# popleft(), pop()
# [0], [-1] for peek`},{signature:`Heap Operations`,description:`Insert O(log n), Extract min/max O(log n), Peek O(1), Heapify O(n).`,complexity:`Reference`,section:`Data Structure Operations`,example:`# PYTHON HEAP (heapq - min heap)
import heapq

# Build heap from list - O(n)
arr = [3, 1, 4, 1, 5]
heapq.heapify(arr)     # [1, 1, 4, 3, 5]

# Push - O(log n)
heapq.heappush(arr, 2)

# Pop min - O(log n)
smallest = heapq.heappop(arr)

# Peek min - O(1)
smallest = arr[0]

# Push and pop - O(log n)
heapq.heappushpop(arr, 6)

# MAX HEAP trick: negate values
max_heap = []
heapq.heappush(max_heap, -5)
heapq.heappush(max_heap, -3)
largest = -heapq.heappop(max_heap)  # 5

# nlargest/nsmallest - O(n log k)
heapq.nlargest(3, arr)
heapq.nsmallest(3, arr)`},{signature:`Binary Search Tree Operations`,description:`Search/Insert/Delete: O(log n) average, O(n) worst (unbalanced). BST keeps elements sorted.`,complexity:`Reference`,section:`Data Structure Operations`,example:`# BINARY SEARCH TREE
# Average case (balanced): O(log n)
# Worst case (skewed):     O(n)
#
# Search     O(log n) avg
# Insert     O(log n) avg
# Delete     O(log n) avg
# Min/Max    O(log n)
# In-order   O(n)

# Python doesn't have built-in BST
# Use: sortedcontainers.SortedList

# WHY BST?
# - Sorted iteration
# - Range queries
# - Floor/ceiling operations

# Self-balancing BSTs (always O(log n)):
# - Red-Black Tree
# - AVL Tree
# - B-Tree

# In competitive programming, often use:
from bisect import bisect_left, bisect_right, insort
arr = [1, 3, 5, 7]
insort(arr, 4)        # [1, 3, 4, 5, 7] - O(n) insert
bisect_left(arr, 4)   # 2 - O(log n) search`},{signature:`Linked List Operations`,description:`Access O(n), Insert/Delete at known position O(1), Search O(n). Good for frequent insert/delete.`,complexity:`Reference`,section:`Data Structure Operations`,example:`# LINKED LIST (singly linked)
#
# Access by index    O(n)    must traverse
# Search             O(n)    must traverse
# Insert at head     O(1)    change one pointer
# Insert at tail     O(1)*   *if we track tail
# Insert at middle   O(1)*   *if we have the node
# Delete             O(1)*   *if we have prev node

# Finding the node is O(n), but actual insert is O(1)

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Insert after node - O(1)
def insert_after(node, val):
    new_node = ListNode(val)
    new_node.next = node.next
    node.next = new_node

# WHEN TO USE:
# - Frequent insert/delete (not by index)
# - Don't need random access
# - Memory-efficient for sparse data

# collections.deque is doubly-linked in Python`}],c=[{signature:`When Big O matters - real-world thresholds`,description:`n < 100: don't care. n < 10,000: O(n²) ok. n < 1M: need O(n log n). n > 1M: need O(n). Hidden constants matter more than you think.`,complexity:`Concept`,section:`Why & When`,example:`# BIG O IN PRACTICE - Real performance impact
import time

# SMALL INPUT (n < 100) - Algorithm doesn't matter
arr = list(range(100))
# O(n²) bubble sort: 0.001 seconds
# O(n log n) merge sort: 0.0005 seconds
# Difference: negligible! Use simpler code.

# MEDIUM INPUT (n = 10,000) - O(n²) becomes painful
arr = list(range(10000))
# O(n²): 5 seconds (100M operations)
# O(n log n): 0.01 seconds (130K operations)
# 500x difference! Use efficient algorithm.

# LARGE INPUT (n = 1,000,000) - Need O(n) or O(n log n)
arr = list(range(1000000))
# O(n²): days (won't finish!)
# O(n log n): 1 second
# O(n): 0.1 second

# REAL-WORLD THRESHOLDS:
# n < 10: Any algorithm works
# n < 100: O(n²) acceptable (insertion sort often fastest!)
# n < 10,000: O(n²) tolerable (<1 sec)
# n < 1,000,000: Need O(n log n) minimum
# n > 1,000,000: Prefer O(n), avoid O(n log n) if possible
# n > 100,000,000: Must be O(n) or better

# HIDDEN CONSTANTS MATTER:
# Fast O(n²): 500 * n²
# Slow O(n log n): 10000 * n log n
# At n = 100:
# O(n²): 500 * 10,000 = 5M ops
# O(n log n): 10000 * 664 = 6.6M ops
# O(n²) wins! (Better constant)

# When Big O doesn't matter:
# - Prototype/POC code
# - Known small input
# - One-time scripts
# - Clarity > performance

# When Big O critical:
# - Production code
# - User-facing features
# - Growing datasets
# - Real-time systems

# Rule: Optimize when:
# 1. Performance is measured problem
# 2. Input size is known large
# 3. Code runs frequently
# Otherwise, write clear code first!`},{signature:`Choosing between complexities - decision framework`,description:`O(1) impossible? Try O(log n) with sorting/BST. O(n) too slow? Try O(n) with hash table. O(n²) unavoidable? Limit input size.`,complexity:`Concept`,section:`Why & When`,example:`# ALGORITHM DECISION TREE

# GOAL: Find if pair sums to target
arr = [2, 7, 11, 15]
target = 9

# APPROACH 1: O(n²) - Brute force
def two_sum_n2(arr, target):
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] + arr[j] == target:
                return [i, j]
# When: n < 1000, simplest to understand

# APPROACH 2: O(n log n) - Sort + two pointers
def two_sum_nlogn(arr, target):
    sorted_arr = sorted(enumerate(arr), key=lambda x: x[1])
    left, right = 0, len(arr) - 1
    while left < right:
        s = sorted_arr[left][1] + sorted_arr[right][1]
        if s == target:
            return [sorted_arr[left][0], sorted_arr[right][0]]
        elif s < target:
            left += 1
        else:
            right -= 1
# When: Input already sorted, or sorting has other benefits

# APPROACH 3: O(n) - Hash table (BEST!)
def two_sum_n(arr, target):
    seen = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
# When: n > 1000, space available

# COMPLEXITY UPGRADE PATH:
# 1. Start with O(n²) brute force (working code!)
# 2. Profile - is it actually slow?
# 3. If yes, optimize to O(n log n) with sorting
# 4. Still slow? Try O(n) with hash table
# 5. Still slow? Problem may be O(n) optimal

# COMMON OPTIMIZATIONS:
# O(n²) → O(n log n): Sort first
# O(n²) → O(n): Use hash table
# O(n log n) → O(n): Use counting/bucket sort
# O(n) → O(1): Precompute or use math

# Decision factors:
# 1. Input size (n)
# 2. Memory available
# 3. Code complexity budget
# 4. Performance requirements
# 5. Maintainability

# Example: Checking duplicates
# Small n (<1000): any works, pick simplest
# Medium n (<100k): sorted() then scan O(n log n)
# Large n (>100k): set() O(n) - 10x faster!

# Golden rule:
# Make it work → Make it right → Make it fast`},{signature:`Space vs Time tradeoffs - when to sacrifice what`,description:`Trading space for time: hash tables, memoization. Trading time for space: streaming, in-place. Modern bias: space is cheap, time is not.`,complexity:`Concept`,section:`Why & When`,example:`# SPACE VS TIME TRADEOFFS

# PROBLEM: Find all duplicates in array
arr = [1, 2, 3, 2, 4, 3, 5]

# APPROACH 1: O(n²) time, O(1) space - Time is expensive
def find_dups_slow(arr):
    dups = []
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] == arr[j] and arr[i] not in dups:
                dups.append(arr[i])
    return dups
# Use when: VERY limited memory, n is small

# APPROACH 2: O(n) time, O(n) space - Space for speed
def find_dups_fast(arr):
    seen = set()
    dups = set()
    for x in arr:
        if x in seen:
            dups.add(x)
        seen.add(x)
    return list(dups)
# Use when: Modern systems (space cheap!)

# REAL TRADEOFFS:

# 1. MEMOIZATION - Space for time
def fib_slow(n):  # O(2^n) time, O(n) space (call stack)
    if n <= 1: return n
    return fib_slow(n-1) + fib_slow(n-2)

def fib_fast(n, memo={}):  # O(n) time, O(n) space
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib_fast(n-1, memo) + fib_fast(n-2, memo)
    return memo[n]
# Space cost: ~8 bytes × n
# Time saved: Exponential → Linear!

# 2. STREAMING - Time for space
def sum_file_memory(path):  # O(n) time, O(n) space
    return sum(int(line) for line in open(path).readlines())

def sum_file_stream(path):  # O(n) time, O(1) space
    total = 0
    with open(path) as f:
        for line in f:
            total += int(line)
    return total
# Use streaming when: File > RAM

# 3. IN-PLACE ALGORITHMS - Time for space
def reverse_copy(arr):  # O(n) time, O(n) space
    return arr[::-1]

def reverse_inplace(arr):  # O(n) time, O(1) space
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
# Use in-place when: Memory constrained

# DECISION MATRIX:
# Desktop/server: Use space! (cheap)
# Mobile/embedded: Minimize space
# Real-time: Minimize time
# Batch processing: Either works

# Modern bias: SPACE IS CHEAP
# - 16GB RAM is standard
# - Disk is huge
# - User time is expensive
# → Optimize for time!

# When to save space:
# - Embedded systems (limited RAM)
# - Mobile apps (battery)
# - Processing > RAM data
# - Memory is bottleneck

# When to save time:
# - User-facing features
# - Real-time systems
# - Server costs (CPU > RAM)
# - Development speed

# Golden rule:
# Space cheap, time expensive → use space!`},{signature:`Hidden constants - why O(n) can lose to O(n log n)`,description:`Big O ignores constants. Merge sort (10n log n) beats linear scan (1000n) at n < 1000. Real performance = constant × complexity.`,complexity:`Concept`,section:`Why & When`,example:`import time

# HIDDEN CONSTANTS IN ACTION

# EXAMPLE 1: "Fast" O(n²) vs "Slow" O(n log n)
# Insertion sort: 0.5 * n²
# Timsort: 100 * n log n

n = 100
# Insertion: 0.5 * 10000 = 5000 ops
# Timsort: 100 * 664 = 66400 ops
# Winner: Insertion sort! (13x faster)

n = 10000
# Insertion: 0.5 * 100M = 50M ops
# Timsort: 100 * 132877 = 13M ops
# Winner: Timsort (4x faster)

# CROSSOVER POINT: ~1000 elements
# That's why Python's sorted() uses insertion sort for small arrays!

# EXAMPLE 2: List vs Set membership
arr = list(range(1000))
s = set(arr)

# List search: O(n) with constant ~1
1000 in arr  # 1000 comparisons

# Set search: O(1) with constant ~10
1000 in s    # ~10 hash operations

# At n = 10:
# List: 10 ops, Set: 10 ops → Tie!
# At n = 100:
# List: 100 ops, Set: 10 ops → Set wins
# At n = 1M:
# List: 1M ops, Set: 10 ops → Set wins massively

# REAL CONSTANT FACTORS:

# HASH TABLE OPERATIONS: ~5-10 ops
# - Hash computation: 2-3 ops
# - Collision handling: 1-5 ops
# - Memory access: 1-2 ops

# BINARY SEARCH: ~log n comparisons
# But each comparison might be:
# - String compare: 10-100 ops per char
# - Custom object: arbitrary cost!

# SORTING:
# Quick sort: 1.5 * n log n (good constants)
# Merge sort: 2 * n log n (worse constants)
# Heap sort: 3 * n log n (worst constants)
# All O(n log n), but quick sort wins!

# MEASURING CONSTANTS:
def measure_constant():
    import timeit

    # O(n) list scan
    setup = "arr = list(range(1000))"
    time_n = timeit.timeit("999 in arr", setup=setup, number=10000)
    # time_n ≈ constant * 1000

    # Estimate constant
    constant = time_n / (1000 * 10000)
    print(f"List search constant: {constant * 1e9:.2f} ns/op")

# When constants matter:
# 1. Small input (n < 1000)
# 2. Performance-critical code
# 3. Real-time systems
# 4. Choosing between same complexity

# When to ignore constants:
# 1. Large input (n > 10000)
# 2. Prototyping
# 3. Different complexity classes
# 4. Readability matters

# Rule of thumb:
# Same Big O? Measure with real data.
# Different Big O? Big O wins (usually).`},{signature:`Recognizing complexity patterns - cheat sheet`,description:`Halving → log n. One loop → n. Nested loops → n². Recursion → tree depth. Master pattern recognition for instant analysis.`,complexity:`Concept`,section:`Why & When`,example:`# PATTERN RECOGNITION CHEAT SHEET

# PATTERN 1: HALVING → O(log n)
def pattern_logn(n):
    while n > 1:
        n = n // 2  # Halving!
    # Iterations: log₂ n

# Variants:
# - Binary search
# - Binary tree height
# - Divide and conquer (one half)

# PATTERN 2: ONE LOOP → O(n)
def pattern_n(arr):
    for x in arr:  # n iterations
        process(x)

# Variants:
# - Two pointers (still O(n)!)
# - Multiple passes (O(2n) = O(n))
# - While loop visiting each element once

# PATTERN 3: NESTED LOOPS → O(n²)
def pattern_n2(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):  # n × n
            process(arr[i], arr[j])

# Variants:
# - All pairs: i, j in range(n)
# - Triangle: j in range(i+1, n) → still O(n²)!
# - 3 nested loops → O(n³)

# PATTERN 4: DIVIDE + CONQUER → O(n log n)
def pattern_nlogn(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = pattern_nlogn(arr[:mid])   # log n levels
    right = pattern_nlogn(arr[mid:])
    return merge(left, right)         # O(n) work per level
# Total: O(n) × log n levels = O(n log n)

# Examples: merge sort, quick sort, heap construction

# PATTERN 5: RECURSION TREE
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)
# Tree depth: n
# Branching factor: 2
# Complexity: O(2ⁿ)

# PATTERN 6: NESTED LOOPS (DIFFERENT SIZES)
def pattern_mn(arr1, arr2):
    for x in arr1:       # m iterations
        for y in arr2:   # n iterations
            process(x, y)
# Complexity: O(m × n)

# PATTERN 7: SORTING FIRST
def pattern_sort_scan(arr):
    arr.sort()           # O(n log n)
    for x in arr:        # O(n)
        process(x)
# Total: O(n log n) + O(n) = O(n log n)
# Dominant term wins!

# COMMON MISTAKES:

# MISTAKE 1: Counting loops wrong
def tricky(n):
    for i in range(n):
        for j in range(i):  # Not O(n²)? YES IT IS!
            pass
# j goes: 0, 0-1, 0-2, ..., 0-(n-1)
# Total: 0+1+2+...+(n-1) = n(n-1)/2 = O(n²)

# MISTAKE 2: Hidden recursion
result = sorted(arr)  # O(n log n) hidden!

# MISTAKE 3: String operations
s = ""
for i in range(n):
    s += str(i)  # O(n) per concatenation!
# Total: O(n²) (string copy each time)

# QUICK REFERENCE:
# Halving: O(log n)
# One pass: O(n)
# Nested (same): O(n²)
# Sort + scan: O(n log n)
# Recursion: O(branches^depth)
# Hash lookup: O(1)
# All pairs: O(n²)

# Practice: Look at code, identify pattern!`},{signature:`Sorting Algorithm Comparison`,description:`Quick/Merge/Heap sort: O(n log n). Python sorted() uses Timsort - O(n log n) adaptive.`,complexity:`Reference`,section:`Sorting Algorithms`,example:`# SORTING ALGORITHMS COMPARISON
#
# Algorithm      Time (avg)   Time (worst)  Space   Stable
# ─────────────────────────────────────────────────────────
# Bubble Sort    O(n²)        O(n²)         O(1)    Yes
# Selection Sort O(n²)        O(n²)         O(1)    No
# Insertion Sort O(n²)        O(n²)         O(1)    Yes
# Merge Sort     O(n log n)   O(n log n)    O(n)    Yes
# Quick Sort     O(n log n)   O(n²)         O(log n) No
# Heap Sort      O(n log n)   O(n log n)    O(1)    No
# Counting Sort  O(n + k)     O(n + k)      O(k)    Yes
# Radix Sort     O(nk)        O(nk)         O(n+k)  Yes
# Timsort        O(n log n)   O(n log n)    O(n)    Yes

# PYTHON'S sorted() uses TIMSORT
# - Hybrid of merge sort and insertion sort
# - O(n) for nearly sorted data
# - Always use built-in unless you need custom

arr = [3, 1, 4, 1, 5]
sorted(arr)           # Returns new list
arr.sort()            # Sorts in place`},{signature:`When to Use Which Sort`,description:`Small n or nearly sorted: Insertion. General purpose: Timsort (built-in). Integer range: Counting/Radix.`,complexity:`Reference`,section:`Sorting Algorithms`,example:`# CHOOSING A SORTING ALGORITHM
#
# USE BUILT-IN sorted() FOR:
# - General purpose sorting
# - Custom key functions
# - Stability requirements

# INSERTION SORT (O(n²)) WHEN:
# - Very small arrays (n < 20)
# - Nearly sorted data (O(n) best case)
# - Online sorting (streaming data)

# COUNTING SORT (O(n + k)) WHEN:
# - Integers in small range [0, k]
# - k is not much larger than n
def counting_sort(arr, k):
    count = [0] * (k + 1)
    for x in arr:
        count[x] += 1
    result = []
    for i, c in enumerate(count):
        result.extend([i] * c)
    return result

# BUCKET SORT WHEN:
# - Uniformly distributed data
# - Can use O(n) extra space

# HEAP SORT WHEN:
# - Need guaranteed O(n log n)
# - Limited extra space (O(1))
# - Don't need stability`},{signature:`Graph Algorithm Complexities`,description:`BFS/DFS: O(V+E). Dijkstra: O((V+E) log V). Floyd-Warshall: O(V³).`,complexity:`Reference`,section:`Graph Algorithms`,example:`# GRAPH ALGORITHM COMPLEXITIES
# V = vertices, E = edges
#
# Algorithm           Time            Space
# ─────────────────────────────────────────────
# BFS                 O(V + E)        O(V)
# DFS                 O(V + E)        O(V)
# Dijkstra (heap)     O((V+E) log V)  O(V)
# Bellman-Ford        O(V * E)        O(V)
# Floyd-Warshall      O(V³)           O(V²)
# Topological Sort    O(V + E)        O(V)
# Kruskal (MST)       O(E log E)      O(V)
# Prim (MST)          O((V+E) log V)  O(V)
# Tarjan (SCC)        O(V + E)        O(V)

# WHEN TO USE:
# Shortest path (unweighted): BFS
# Shortest path (positive):   Dijkstra
# Shortest path (negative):   Bellman-Ford
# All pairs shortest:         Floyd-Warshall
# Minimum spanning tree:      Kruskal or Prim
# Cycle detection:            DFS
# Topological order:          Kahn's or DFS`},{signature:`Recognize O(1)`,description:`Hash lookups, array access by index, push/pop stack, arithmetic operations.`,complexity:`O(1)`,section:`Recognize Patterns`,example:`# O(1) CONSTANT TIME OPERATIONS
# Same time regardless of input size

arr = [1, 2, 3, 4, 5]
d = {'a': 1, 'b': 2}
stack = [1, 2, 3]

# Array/list operations
arr[2]              # Index access
arr[-1]             # Last element
len(arr)            # Length (stored)

# Dict operations
d['a']              # Key lookup
d['c'] = 3          # Key insert
'a' in d            # Key check

# Stack operations
stack.append(4)     # Push
stack.pop()         # Pop

# Arithmetic
x = 5 + 3 * 2       # Math operations

# Comparison
x < y               # Compare`},{signature:`Recognize O(log n)`,description:`Binary search, balanced tree operations, repeatedly halving input.`,complexity:`O(log n)`,section:`Recognize Patterns`,example:`# O(log n) LOGARITHMIC TIME
# Halving the problem each step

# BINARY SEARCH
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:        # log n iterations
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# IDENTIFY O(log n):
# - Dividing by 2 each iteration
# - Binary search pattern
# - Balanced tree traversal
# - Exponentiation by squaring

# Examples:
# - bisect.bisect_left()
# - Finding power: x^n in O(log n)
# - Binary tree height in balanced tree`},{signature:`Recognize O(n)`,description:`Single loop through input, linear search, building result array.`,complexity:`O(n)`,section:`Recognize Patterns`,example:`# O(n) LINEAR TIME
# Visit each element once

# Single loop
def sum_array(arr):
    total = 0
    for x in arr:       # n iterations
        total += x
    return total

# Two pointers (still O(n))
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:  # At most n iterations total
        s = arr[left] + arr[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1
        else:
            right -= 1
    return []

# IDENTIFY O(n):
# - Single for loop
# - While loop that visits each element once
# - Two pointers moving toward each other
# - Building a result of size n`},{signature:`Recognize O(n²)`,description:`Nested loops over input, comparing all pairs, bubble/selection/insertion sort.`,complexity:`O(n²)`,section:`Recognize Patterns`,example:`# O(n²) QUADRATIC TIME
# Nested loops, all pairs

# Nested loops
def has_duplicate(arr):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):  # n*(n-1)/2
            if arr[i] == arr[j]:
                return True
    return False

# Better approach: O(n) with set
def has_duplicate_better(arr):
    return len(arr) != len(set(arr))

# IDENTIFY O(n²):
# - Nested for loops over same data
# - Bubble sort, selection sort, insertion sort
# - Comparing all pairs
# - Building n x n matrix

# WARNING: n = 10,000 -> 100,000,000 operations
# At n > 10,000, O(n²) becomes too slow`},{signature:`Amortized Analysis`,description:`Average cost over sequence of operations. List append is O(1) amortized despite occasional O(n) resizes.`,complexity:`Concept`,section:`Recognize Patterns`,example:`# AMORTIZED ANALYSIS
# Average cost per operation over many operations

# LIST APPEND - O(1) AMORTIZED
# Python list doubles capacity when full
# Occasional O(n) resize, but rare

arr = []
for i in range(1000):
    arr.append(i)  # Usually O(1), sometimes O(n)
# Total: O(n), so O(1) per append on average

# WHY IT WORKS:
# Append 1: O(1)
# Append 2: O(1)
# Append 3: O(2) resize to 4
# Append 4: O(1)
# Append 5: O(4) resize to 8
# ...
# Total work: n + n/2 + n/4 + ... ≈ 2n = O(n)
# Per operation: O(n) / n = O(1) amortized

# OTHER AMORTIZED O(1):
# - Dynamic array append
# - Hash table operations (resizing)
# - Union-Find with path compression`}],l=[...s,...c];var u=t();const d=[{notation:`O(1)`,name:`Constant`,rating:`Excellent`,color:`#16A34A`,calc:()=>1},{notation:`O(log n)`,name:`Logarithmic`,rating:`Good`,color:`#78716C`,calc:e=>Math.log2(e)},{notation:`O(n)`,name:`Linear`,rating:`Fair`,color:`#CA8A04`,calc:e=>e},{notation:`O(n log n)`,name:`Linearithmic`,rating:`Bad`,color:`#EA580C`,calc:e=>e*Math.log2(e)},{notation:`O(n²)`,name:`Quadratic`,rating:`Horrible`,color:`#DC2626`,calc:e=>e*e},{notation:`O(2ⁿ)`,name:`Exponential`,rating:`Horrible`,color:`#9333EA`,calc:e=>2**Math.min(e,20)}],f=[{name:`Array`,avgAccess:`Θ(1)`,avgSearch:`Θ(n)`,avgInsert:`Θ(n)`,avgDelete:`Θ(n)`,worstAccess:`O(1)`,worstSearch:`O(n)`,worstInsert:`O(n)`,worstDelete:`O(n)`,space:`O(n)`},{name:`Stack`,avgAccess:`Θ(n)`,avgSearch:`Θ(n)`,avgInsert:`Θ(1)`,avgDelete:`Θ(1)`,worstAccess:`O(n)`,worstSearch:`O(n)`,worstInsert:`O(1)`,worstDelete:`O(1)`,space:`O(n)`},{name:`Queue`,avgAccess:`Θ(n)`,avgSearch:`Θ(n)`,avgInsert:`Θ(1)`,avgDelete:`Θ(1)`,worstAccess:`O(n)`,worstSearch:`O(n)`,worstInsert:`O(1)`,worstDelete:`O(1)`,space:`O(n)`},{name:`Singly-Linked List`,avgAccess:`Θ(n)`,avgSearch:`Θ(n)`,avgInsert:`Θ(1)`,avgDelete:`Θ(1)`,worstAccess:`O(n)`,worstSearch:`O(n)`,worstInsert:`O(1)`,worstDelete:`O(1)`,space:`O(n)`},{name:`Doubly-Linked List`,avgAccess:`Θ(n)`,avgSearch:`Θ(n)`,avgInsert:`Θ(1)`,avgDelete:`Θ(1)`,worstAccess:`O(n)`,worstSearch:`O(n)`,worstInsert:`O(1)`,worstDelete:`O(1)`,space:`O(n)`},{name:`Skip List`,avgAccess:`Θ(log n)`,avgSearch:`Θ(log n)`,avgInsert:`Θ(log n)`,avgDelete:`Θ(log n)`,worstAccess:`O(n)`,worstSearch:`O(n)`,worstInsert:`O(n)`,worstDelete:`O(n)`,space:`O(n log n)`},{name:`Hash Table`,avgAccess:`N/A`,avgSearch:`Θ(1)`,avgInsert:`Θ(1)`,avgDelete:`Θ(1)`,worstAccess:`N/A`,worstSearch:`O(n)`,worstInsert:`O(n)`,worstDelete:`O(n)`,space:`O(n)`},{name:`Binary Search Tree`,avgAccess:`Θ(log n)`,avgSearch:`Θ(log n)`,avgInsert:`Θ(log n)`,avgDelete:`Θ(log n)`,worstAccess:`O(n)`,worstSearch:`O(n)`,worstInsert:`O(n)`,worstDelete:`O(n)`,space:`O(n)`},{name:`B-Tree`,avgAccess:`Θ(log n)`,avgSearch:`Θ(log n)`,avgInsert:`Θ(log n)`,avgDelete:`Θ(log n)`,worstAccess:`O(log n)`,worstSearch:`O(log n)`,worstInsert:`O(log n)`,worstDelete:`O(log n)`,space:`O(n)`},{name:`Red-Black Tree`,avgAccess:`Θ(log n)`,avgSearch:`Θ(log n)`,avgInsert:`Θ(log n)`,avgDelete:`Θ(log n)`,worstAccess:`O(log n)`,worstSearch:`O(log n)`,worstInsert:`O(log n)`,worstDelete:`O(log n)`,space:`O(n)`},{name:`AVL Tree`,avgAccess:`Θ(log n)`,avgSearch:`Θ(log n)`,avgInsert:`Θ(log n)`,avgDelete:`Θ(log n)`,worstAccess:`O(log n)`,worstSearch:`O(log n)`,worstInsert:`O(log n)`,worstDelete:`O(log n)`,space:`O(n)`}],p=[{name:`Quicksort`,best:`Ω(n log n)`,avg:`Θ(n log n)`,worst:`O(n²)`,space:`O(log n)`},{name:`Mergesort`,best:`Ω(n log n)`,avg:`Θ(n log n)`,worst:`O(n log n)`,space:`O(n)`},{name:`Timsort`,best:`Ω(n)`,avg:`Θ(n log n)`,worst:`O(n log n)`,space:`O(n)`},{name:`Heapsort`,best:`Ω(n log n)`,avg:`Θ(n log n)`,worst:`O(n log n)`,space:`O(1)`},{name:`Bubble Sort`,best:`Ω(n)`,avg:`Θ(n²)`,worst:`O(n²)`,space:`O(1)`},{name:`Insertion Sort`,best:`Ω(n)`,avg:`Θ(n²)`,worst:`O(n²)`,space:`O(1)`},{name:`Selection Sort`,best:`Ω(n²)`,avg:`Θ(n²)`,worst:`O(n²)`,space:`O(1)`},{name:`Tree Sort`,best:`Ω(n log n)`,avg:`Θ(n log n)`,worst:`O(n²)`,space:`O(n)`},{name:`Shell Sort`,best:`Ω(n log n)`,avg:`Θ(n(log n)²)`,worst:`O(n(log n)²)`,space:`O(1)`},{name:`Bucket Sort`,best:`Ω(n+k)`,avg:`Θ(n+k)`,worst:`O(n²)`,space:`O(n)`},{name:`Radix Sort`,best:`Ω(nk)`,avg:`Θ(nk)`,worst:`O(nk)`,space:`O(n+k)`},{name:`Counting Sort`,best:`Ω(n+k)`,avg:`Θ(n+k)`,worst:`O(n+k)`,space:`O(k)`}];function m(e){return e>=1e9?`${(e/1e9).toFixed(1)}B`:e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}K`:Math.round(e).toString()}function h(e){let t=e.toLowerCase().replace(/\s/g,``);return t===`n/a`||t===`-`?`na`:t.includes(`1)`)&&!t.includes(`n`)?`excellent`:t.includes(`logn)`)&&!t.includes(`nlog`)?`good`:t.includes(`n)`)&&!t.includes(`n²`)&&!t.includes(`n^2`)&&!t.includes(`nlog`)&&!t.includes(`nk`)&&!t.includes(`n+k`)?`fair`:t.includes(`nlogn)`)||t.includes(`n+k)`)||t.includes(`nk)`)?`bad`:t.includes(`n²`)||t.includes(`n^2`)||t.includes(`(n(log`)?`horrible`:`fair`}var g=n();function _(){let e=(0,u.useRef)(null),t=(0,u.useRef)(null),n=(0,u.useRef)(null),r=(0,u.useRef)(null),[i,a]=(0,u.useState)(25),[o,s]=(0,u.useState)(new Set(d.map(e=>e.notation))),[c,l]=(0,u.useState)(null),[f,p]=(0,u.useState)({visible:!1,x:0,y:0,content:[],n:0}),[h,_]=(0,u.useState)(!1),[v,y]=(0,u.useState)(null),b=(0,u.useCallback)(()=>{let t=e.current;if(!t)return;let n=t.getContext(`2d`);if(!n)return;let r=window.devicePixelRatio||1,a=t.getBoundingClientRect();t.width=a.width*r,t.height=a.height*r,n.scale(r,r);let s=a.width,l=a.height,u={top:30,right:70,bottom:40,left:55},f=s-u.left-u.right,p=l-u.top-u.bottom;n.fillStyle=`var(--bg-card)`,n.fillRect(0,0,s,l);let h=getComputedStyle(document.documentElement),g=h.getPropertyValue(`--bg-card`).trim()||`#EFEBE4`,_=h.getPropertyValue(`--border-color`).trim()||`rgba(0,0,0,0.08)`,v=h.getPropertyValue(`--text-muted`).trim()||`#7a7a7a`;n.fillStyle=g,n.fillRect(0,0,s,l);let y=0,b=d.filter(e=>o.has(e.notation));b.forEach(e=>{for(let t=1;t<=i;t++){let n=e.calc(t);n>y&&n<1/0&&(y=n)}}),y=Math.min(y*1.15,1e10),n.strokeStyle=_,n.lineWidth=1;for(let e=0;e<=5;e++){let t=u.top+p/5*e;n.beginPath(),n.moveTo(u.left,t),n.lineTo(s-u.right,t),n.stroke(),n.fillStyle=v,n.font=`11px JetBrains Mono, monospace`,n.textAlign=`right`,n.fillText(m(y*(1-e/5)),u.left-8,t+4)}let x=Math.min(i,10);for(let e=0;e<=x;e++){let t=u.left+f/x*e;n.beginPath(),n.moveTo(t,u.top),n.lineTo(t,l-u.bottom),n.stroke(),n.textAlign=`center`,n.fillText(Math.round(i/x*e).toString(),t,l-u.bottom+18)}n.fillStyle=v,n.font=`12px Inter, sans-serif`,n.textAlign=`center`,n.fillText(`Input Size (n)`,s/2,l-8),n.save(),n.translate(14,l/2),n.rotate(-Math.PI/2),n.fillText(`Operations`,0,0),n.restore(),b.forEach(e=>{let t=c===null||c===e.notation;n.beginPath(),n.strokeStyle=e.color,n.lineWidth=t?2.5:1.5,n.globalAlpha=t?1:.25;for(let t=1;t<=i;t++){let r=u.left+t/i*f,a=Math.min(e.calc(t),y),o=u.top+p-a/y*p;t===1?n.moveTo(r,o):n.lineTo(r,o)}if(n.stroke(),t){let t=Math.min(e.calc(i),y),r=u.top+p-t/y*p;n.fillStyle=e.color,n.font=`600 11px JetBrains Mono, monospace`,n.textAlign=`left`,n.fillText(e.notation,s-u.right+6,r+4)}n.globalAlpha=1})},[i,o,c]);(0,u.useEffect)(()=>(b(),window.addEventListener(`resize`,b),()=>window.removeEventListener(`resize`,b)),[b]),(0,u.useEffect)(()=>{if(!h){r.current&&=(clearTimeout(r.current),null);return}let e=0,t=()=>{e=e>=50?0:e+.5,a(Math.round(e)),r.current=window.setTimeout(t,50)};return r.current=window.setTimeout(t,0),()=>{r.current&&=(clearTimeout(r.current),null)}},[h]);let x=()=>_(e=>!e),S=t=>{let n=e.current;if(!n)return;let r=n.getBoundingClientRect(),a=t.clientX-r.left,s={left:55,right:70},c=r.width-s.left-s.right;if(a>=s.left&&a<=r.width-s.right){y(a);let e=Math.round((a-s.left)/c*i);if(e>=1){let n=d.filter(e=>o.has(e.notation)).map(t=>({notation:t.notation,color:t.color,value:m(t.calc(e))}));p({visible:!0,x:t.clientX+12,y:t.clientY-8,content:n,n:e})}}else y(null),p(e=>({...e,visible:!1}))},C=()=>{y(null),p(e=>({...e,visible:!1}))},w=e=>{s(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})};return(0,g.jsxs)(`div`,{className:`interactive-chart-section`,children:[(0,g.jsxs)(`div`,{className:`chart-layout`,children:[(0,g.jsxs)(`div`,{className:`chart-card-container`,children:[(0,g.jsxs)(`div`,{className:`chart-card-header`,children:[(0,g.jsx)(`span`,{className:`chart-card-title`,children:`Growth Rate Comparison`}),(0,g.jsxs)(`div`,{className:`chart-controls`,children:[(0,g.jsxs)(`div`,{className:`chart-slider-group`,children:[(0,g.jsx)(`label`,{children:`n =`}),(0,g.jsx)(`input`,{type:`range`,min:1,max:50,value:i,onChange:e=>a(parseInt(e.target.value)),className:`chart-slider`}),(0,g.jsx)(`span`,{className:`chart-slider-value`,children:i})]}),(0,g.jsxs)(`button`,{className:`chart-play-btn ${h?`playing`:``}`,onClick:x,children:[h?(0,g.jsxs)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`currentColor`,children:[(0,g.jsx)(`rect`,{x:`6`,y:`4`,width:`4`,height:`16`}),(0,g.jsx)(`rect`,{x:`14`,y:`4`,width:`4`,height:`16`})]}):(0,g.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`currentColor`,children:(0,g.jsx)(`polygon`,{points:`5 3 19 12 5 21 5 3`})}),(0,g.jsx)(`span`,{children:h?`Pause`:`Animate`})]})]})]}),(0,g.jsx)(`div`,{className:`chart-body`,children:(0,g.jsxs)(`div`,{className:`chart-wrapper`,ref:t,children:[(0,g.jsx)(`canvas`,{ref:e,onMouseMove:S,onMouseLeave:C}),v!==null&&(0,g.jsx)(`div`,{ref:n,className:`chart-crosshair`,style:{left:v}})]})}),(0,g.jsx)(`div`,{className:`chart-legend`,children:d.map(e=>(0,g.jsxs)(`button`,{className:`chart-legend-item ${o.has(e.notation)?``:`hidden`}`,onClick:()=>w(e.notation),children:[(0,g.jsx)(`span`,{className:`chart-legend-dot`,style:{background:e.color}}),e.notation]},e.notation))})]}),(0,g.jsx)(`div`,{className:`complexity-cards-sidebar`,children:d.map((e,t)=>(0,g.jsxs)(`button`,{className:`sidebar-complexity-card ${c===e.notation?`active`:``}`,style:{"--card-color":e.color,"--delay":`${t*.05}s`},onClick:()=>l(c===e.notation?null:e.notation),children:[(0,g.jsxs)(`div`,{className:`sidebar-card-row`,children:[(0,g.jsx)(`span`,{className:`sidebar-card-notation`,children:e.notation}),(0,g.jsx)(`span`,{className:`sidebar-card-badge sidebar-badge-${e.rating.toLowerCase()}`,children:e.rating})]}),(0,g.jsx)(`div`,{className:`sidebar-card-name`,children:e.name}),(0,g.jsxs)(`div`,{className:`sidebar-card-stats`,children:[(0,g.jsxs)(`span`,{children:[`n = `,i]}),(0,g.jsxs)(`span`,{className:`sidebar-card-ops`,children:[m(e.calc(i)),` ops`]})]})]},e.notation))})]}),f.visible&&(0,g.jsxs)(`div`,{className:`chart-tooltip`,style:{left:f.x,top:f.y},children:[(0,g.jsxs)(`strong`,{children:[`n = `,f.n]}),f.content.map(e=>(0,g.jsxs)(`div`,{style:{color:e.color},children:[e.notation,`: `,e.value]},e.notation))]})]})}function v({value:e}){return(0,g.jsx)(`td`,{className:`complexity-cell complexity-${h(e)}`,children:(0,g.jsx)(`span`,{className:`complexity-value`,children:e})})}function y(){return(0,g.jsxs)(`div`,{className:`complexity-table-container`,children:[(0,g.jsx)(`h3`,{className:`complexity-table-title`,children:`Data Structure Operations`}),(0,g.jsx)(`div`,{className:`complexity-table-wrapper`,children:(0,g.jsxs)(`table`,{className:`complexity-table`,children:[(0,g.jsxs)(`thead`,{children:[(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`th`,{rowSpan:2,className:`th-structure`,children:`Data Structure`}),(0,g.jsx)(`th`,{colSpan:4,className:`th-group`,children:`Time Complexity — Average`}),(0,g.jsx)(`th`,{colSpan:4,className:`th-group`,children:`Time Complexity — Worst`}),(0,g.jsx)(`th`,{rowSpan:2,className:`th-space`,children:`Space`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`th`,{children:`Access`}),(0,g.jsx)(`th`,{children:`Search`}),(0,g.jsx)(`th`,{children:`Insertion`}),(0,g.jsx)(`th`,{children:`Deletion`}),(0,g.jsx)(`th`,{children:`Access`}),(0,g.jsx)(`th`,{children:`Search`}),(0,g.jsx)(`th`,{children:`Insertion`}),(0,g.jsx)(`th`,{children:`Deletion`})]})]}),(0,g.jsx)(`tbody`,{children:f.map(e=>(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`td-structure`,children:e.name}),(0,g.jsx)(v,{value:e.avgAccess}),(0,g.jsx)(v,{value:e.avgSearch}),(0,g.jsx)(v,{value:e.avgInsert}),(0,g.jsx)(v,{value:e.avgDelete}),(0,g.jsx)(v,{value:e.worstAccess}),(0,g.jsx)(v,{value:e.worstSearch}),(0,g.jsx)(v,{value:e.worstInsert}),(0,g.jsx)(v,{value:e.worstDelete}),(0,g.jsx)(v,{value:e.space})]},e.name))})]})})]})}function b(){return(0,g.jsxs)(`div`,{className:`complexity-table-container`,children:[(0,g.jsx)(`h3`,{className:`complexity-table-title`,children:`Array Sorting Algorithms`}),(0,g.jsx)(`div`,{className:`complexity-table-wrapper`,children:(0,g.jsxs)(`table`,{className:`complexity-table sorting-table`,children:[(0,g.jsxs)(`thead`,{children:[(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`th`,{className:`th-structure`,children:`Algorithm`}),(0,g.jsx)(`th`,{colSpan:3,className:`th-group`,children:`Time Complexity`}),(0,g.jsx)(`th`,{className:`th-space`,children:`Space`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`th`,{}),(0,g.jsx)(`th`,{children:`Best`}),(0,g.jsx)(`th`,{children:`Average`}),(0,g.jsx)(`th`,{children:`Worst`}),(0,g.jsx)(`th`,{})]})]}),(0,g.jsx)(`tbody`,{children:p.map(e=>(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`td-structure`,children:e.name}),(0,g.jsx)(v,{value:e.best}),(0,g.jsx)(v,{value:e.avg}),(0,g.jsx)(v,{value:e.worst}),(0,g.jsx)(v,{value:e.space})]},e.name))})]})})]})}function x(){return(0,g.jsxs)(`div`,{className:`complexity-legend`,children:[(0,g.jsxs)(`div`,{className:`complexity-legend-item`,children:[(0,g.jsx)(`span`,{className:`complexity-legend-dot complexity-excellent`}),(0,g.jsx)(`span`,{children:`O(1) — Excellent`})]}),(0,g.jsxs)(`div`,{className:`complexity-legend-item`,children:[(0,g.jsx)(`span`,{className:`complexity-legend-dot complexity-good`}),(0,g.jsx)(`span`,{children:`O(log n) — Good`})]}),(0,g.jsxs)(`div`,{className:`complexity-legend-item`,children:[(0,g.jsx)(`span`,{className:`complexity-legend-dot complexity-fair`}),(0,g.jsx)(`span`,{children:`O(n) — Fair`})]}),(0,g.jsxs)(`div`,{className:`complexity-legend-item`,children:[(0,g.jsx)(`span`,{className:`complexity-legend-dot complexity-bad`}),(0,g.jsx)(`span`,{children:`O(n log n) — Bad`})]}),(0,g.jsxs)(`div`,{className:`complexity-legend-item`,children:[(0,g.jsx)(`span`,{className:`complexity-legend-dot complexity-horrible`}),(0,g.jsx)(`span`,{children:`O(n²), O(2ⁿ) — Horrible`})]})]})}var S=`Big O notation describes how an algorithm's runtime or space requirements grow as input size increases. It focuses on the worst-case growth rate, ignoring constants and lower-order terms.

Why It Matters: An O(n²) algorithm might be fast for 100 items but crawl with 10,000. Understanding complexity helps you choose the right algorithm and predict performance at scale.

Key Rules: Drop constants (O(2n) = O(n)). Keep only dominant term (O(n² + n) = O(n²)). Nested loops multiply (two O(n) loops nested = O(n²)).

Common Complexities: O(1) constant (hash lookup), O(log n) logarithmic (binary search), O(n) linear (single loop), O(n log n) linearithmic (efficient sorting), O(n²) quadratic (nested loops), O(2ⁿ) exponential (subsets).

Space Complexity: Memory matters too. Recursion uses O(depth) stack space. Creating new arrays costs O(n). In-place algorithms use O(1) extra space.`;function C(){return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(e,{badge:`O(n)`,badgeColor:`var(--accent-bigo)`,title:`Big O Complexity`,description:`Time and space complexity analysis. Master Big O to evaluate algorithm efficiency and optimize your code for large datasets.`}),(0,g.jsx)(i,{intro:S}),(0,g.jsx)(_,{}),(0,g.jsx)(x,{}),(0,g.jsx)(y,{}),(0,g.jsx)(b,{}),(0,g.jsx)(r,{methods:l,sections:o(l)}),(0,g.jsx)(a,{})]})}export{C as BigOPage};