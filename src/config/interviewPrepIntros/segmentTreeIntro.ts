export const segmentTreeIntro = `Segment Trees and Binary Indexed Trees (BIT/Fenwick Trees) efficiently handle range queries and updates. The key insight: precompute answers for segments of the array so range queries don't require scanning all elements. Both achieve O(log n) query and update time—turning O(nq) brute force into O(q log n) for q queries.

WHY SEGMENT TREES AND BIT MATTER: When you have an array that changes and need to answer range queries efficiently, you hit a fundamental trade-off. Brute force: O(1) update, O(n) query. Prefix sums: O(n) update, O(1) query. Segment Trees/BIT: O(log n) for both! This makes them essential for problems with many queries and updates on dynamic data.

**The efficiency breakthrough:**
- Brute force: scan range for every query -> O(nq) total
- Prefix sums: rebuild prefix array for every update -> O(nq) total
- Segment Tree/BIT: logarithmic for both -> O((n+q) log n) total
- For n=10^5, q=10^5: brute force 10^10 ops, Segment Tree 3M ops (3000x faster!)

WHEN TO USE EACH APPROACH: DECISION TREE

**Prefix Sum Array** (build O(n), query O(1), update O(n)):
- **Use when**: Static array with NO updates
- **Perfect for**: "Given fixed array, answer Q range sum queries"
- **Code**: \`prefix[i] = sum(arr[0:i])\`, \`range_sum(l, r) = prefix[r+1] - prefix[l]\`

**Binary Indexed Tree / Fenwick Tree** (all operations O(log n)):
- **Use when**: Range SUM queries with point updates
- **Perfect for**: "Update arr[i], query sum(arr[l:r+1]), repeat Q times"
- **Advantage**: Simple implementation (~20 lines), low constants
- **Limitation**: ONLY supports prefix sums (can't do min/max/GCD directly)

**Segment Tree** (all operations O(log n)):
- **Use when**: Range queries for ANY associative operation (sum, min, max, GCD, XOR) with updates
- **Perfect for**: "Find min in range [l, r], update arr[i], find max in range [a, b]"
- **Advantage**: Supports any associative operation, range updates with lazy propagation
- **Limitation**: More complex implementation (~100 lines)

**When ALL are overkill:**
- Small arrays (n < 1000): just scan O(n) - simpler and faster in practice
- Few queries (< 10): building tree costs O(n), not worth it
- Rare updates: sometimes just recalculating is simpler

BINARY INDEXED TREE (BIT / FENWICK TREE): THE SIMPLE SOLUTION

**How BIT works:** Uses bit manipulation magic! Each index i stores sum of elements in range determined by i's binary representation. Index 12 (binary 1100) stores sum of 1 element (last set bit = 4 = 2^2). This creates overlapping ranges that combine to give any prefix sum in O(log n) steps.

**Key insight:** \`i & (-i)\` extracts the last set bit. For update: add last bit to climb tree. For query: subtract last bit to descend.

\`\`\`python
class BIT:
    def __init__(self, n):
        """
        Create BIT for array of size n.
        Time: O(n), Space: O(n)
        """
        self.n = n
        self.tree = [0] * (n + 1)  # 1-indexed (tree[0] unused)

    def update(self, i, delta):
        """
        Add delta to arr[i].
        Time: O(log n)
        """
        i += 1  # Convert to 1-indexed
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)  # Add last set bit (go to parent)

    def query(self, i):
        """
        Compute prefix sum arr[0..i].
        Time: O(log n)
        """
        i += 1  # Convert to 1-indexed
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)  # Remove last set bit (go to child)
        return s

    def range_query(self, l, r):
        """
        Compute sum arr[l..r].
        Time: O(log n)
        """
        return self.query(r) - (self.query(l - 1) if l > 0 else 0)

# Usage:
bit = BIT(5)
bit.update(0, 1)  # arr = [1, 0, 0, 0, 0]
bit.update(2, 3)  # arr = [1, 0, 3, 0, 0]
print(bit.range_query(0, 2))  # 4 = 1 + 0 + 3
\`\`\`python

SEGMENT TREE: THE VERSATILE SOLUTION

**How it works:** Binary tree where leaves are array elements, and each internal node stores aggregated result of its children. For sum: each node stores sum of its range. For min: each node stores min of its range.

\`\`\`python
class SegmentTree:
    def __init__(self, arr):
        """
        Build segment tree from array.
        Time: O(n), Space: O(n)
        """
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)  # 4n is safe upper bound
        self._build(arr, 1, 0, self.n - 1)

    def _build(self, arr, node, start, end):
        """Build tree recursively."""
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self._build(arr, 2 * node, start, mid)
            self._build(arr, 2 * node + 1, mid + 1, end)
            self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def update(self, idx, val):
        """
        Set arr[idx] = val.
        Time: O(log n)
        """
        self._update(1, 0, self.n - 1, idx, val)

    def _update(self, node, start, end, idx, val):
        """Update tree recursively."""
        if start == end:
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            if idx <= mid:
                self._update(2 * node, start, mid, idx, val)
            else:
                self._update(2 * node + 1, mid + 1, end, idx, val)
            self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def query(self, l, r):
        """
        Query sum of arr[l..r].
        Time: O(log n)
        """
        return self._query(1, 0, self.n - 1, l, r)

    def _query(self, node, start, end, l, r):
        """Query tree recursively."""
        if r < start or l > end:  # No overlap
            return 0
        if l <= start and end <= r:  # Complete overlap
            return self.tree[node]
        # Partial overlap
        mid = (start + end) // 2
        left_sum = self._query(2 * node, start, mid, l, r)
        right_sum = self._query(2 * node + 1, mid + 1, end, l, r)
        return left_sum + right_sum

# Usage:
arr = [1, 3, 5, 7, 9, 11]
st = SegmentTree(arr)
print(st.query(1, 4))  # 24 = 3 + 5 + 7 + 9
st.update(2, 10)       # arr = [1, 3, 10, 7, 9, 11]
print(st.query(1, 4))  # 29 = 3 + 10 + 7 + 9
\`\`\`python

SEGMENT TREE FOR MIN/MAX QUERIES

Change only the merge operation:

\`\`\`python
class MinSegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [float('inf')] * (4 * self.n)
        self._build(arr, 1, 0, self.n - 1)

    def _build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self._build(arr, 2 * node, start, mid)
            self._build(arr, 2 * node + 1, mid + 1, end)
            # MIN instead of SUM
            self.tree[node] = min(self.tree[2 * node], self.tree[2 * node + 1])

    def _query(self, node, start, end, l, r):
        if r < start or l > end:
            return float('inf')  # Identity for min
        if l <= start and end <= r:
            return self.tree[node]
        mid = (start + end) // 2
        left_min = self._query(2 * node, start, mid, l, r)
        right_min = self._query(2 * node + 1, mid + 1, end, l, r)
        return min(left_min, right_min)  # MIN instead of SUM
\`\`\`python

COMMON INTERVIEW PATTERNS:

**1. Count inversions:**
\`\`\`python
# For each element, count elements to its right that are smaller
# Use BIT: process right-to-left, query count of smaller elements seen
def count_inversions(arr):
    # Coordinate compression (map values to 0..n-1)
    sorted_arr = sorted(set(arr))
    rank = {v: i for i, v in enumerate(sorted_arr)}

    bit = BIT(len(sorted_arr))
    inversions = 0

    for num in reversed(arr):
        r = rank[num]
        inversions += bit.query(r - 1) if r > 0 else 0  # Count smaller
        bit.update(r, 1)

    return inversions
\`\`\`python

**2. Range sum with updates:**
\`\`\`python
# Classic BIT/Segment Tree problem
# Build tree, update(i, delta), query(l, r)
\`\`\`python

**3. Range minimum query:**
\`\`\`python
# Use Segment Tree (not BIT)
# BIT only works for prefix queries with associative, invertible operations
\`\`\`python

BEST PRACTICES:

1. **Choose the right tool:**
   - Static array, sum queries: prefix sums
   - Dynamic, sum queries: BIT
   - Dynamic, min/max/GCD queries: Segment Tree

2. **Watch for 0-indexing vs 1-indexing:**
   - BIT traditionally 1-indexed
   - Segment Tree can be either

3. **Memory considerations:**
   - BIT: O(n)
   - Segment Tree: O(4n) for safe implementation

4. **Don't forget to build:**
   - Segment Tree requires O(n) build step
   - BIT: either O(n log n) individual updates or O(n) clever build

5. **Complexity analysis:**
   - Build: O(n)
   - Query: O(log n)
   - Update: O(log n)
   - Total for Q operations: O(n + Q log n)

6. **Interview communication:**
   - Explain why you need O(log n) (brute force too slow)
   - Mention tradeoff: O(n) preprocessing for O(log n) queries
   - If stuck on implementation, explain concept and ask if pseudocode is ok

7. **When interviewer asks "optimize":**
   - Brute force O(nq) -> "We can use Segment Tree for O(q log n)"
   - Show you know the tool exists even if implementation is complex

WHEN SEGMENT TREE APPEARS IN REAL INTERVIEWS

**Signals in problem statement:**
- "Answer Q queries on array" (large Q -> likely need tree structure)
- "Support both queries and updates" (dynamic -> not just prefix sums)
- "Find min/max/sum in range" (range query -> possible tree)

**Red herrings (DON'T need Segment Tree):**
- "Given fixed array, answer range sum queries" -> prefix sums
- "Find max in sliding window" -> deque, not Segment Tree
- "Count elements in range" -> binary search on sorted array

**True Segment Tree problems:**
- LeetCode 307: Range Sum Query - Mutable (BIT or Segment Tree)
- LeetCode 315: Count of Smaller Numbers After Self (BIT with coordinate compression)
- "Range minimum query with updates" (Segment Tree)
- "Count inversions in array" (BIT)

The key: Segment Trees are powerful but complex. In interviews, knowing when to use them and explaining the tradeoff matters more than perfect implementation. If you identify the need for O(log n) range queries with updates, you've shown the right intuition—even if you can't code it perfectly in 45 minutes.`
