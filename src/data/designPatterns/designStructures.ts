import type { Method } from '../../types'

// Min Stack, Max Stack, Queue using Stacks, Stack using Queues, Circular Queue
export const designStructuresMethods: Method[] = [
  // Why & When
  { signature: 'Why custom data structures?', description: 'Design structures optimized for specific constraints. Use when stdlib doesn\'t meet O() requirements.', complexity: 'Concept', section: 'Why & When', example: `# DESIGN PATTERNS = Custom data structures for interviews
# Common: Min Stack, Queue using Stacks, Circular Queue

# WHY CUSTOM STRUCTURES?
# - Meet specific O() requirements (O(1) getMin)
# - Combine operations (stack + min tracking)
# - Implement missing features (queue using stacks)
# - Optimize for constraints (circular queue)

# MIN STACK PATTERN:
# Problem: Stack that supports push, pop, top, getMin in O(1)
# Challenge: How to track minimum efficiently?
# Solution: Store min alongside each element

# WHY NOT JUST min(stack)?
# - min(stack) is O(n) - too slow!
# - Need O(1) getMin

# APPROACHES:
# 1. Tuple Stack: store (val, current_min) pairs
# 2. Two Stacks: main stack + min stack
# Both are O(1) space per element

# INTERVIEW SIGNALS:
# "Design X with O(1) Y" → Custom structure
# "Implement queue using stacks" → Algorithmic thinking
# "Circular buffer" → Array + wraparound indexing

# WHEN TO DESIGN CUSTOM:
# - Specific O() constraint
# - Combine multiple operations
# - Simulate one structure with another
# - Memory/space optimization needed

# WHEN TO USE STDLIB:
# - Standard operations sufficient
# - No special constraints
# - Readability matters more
# - Not in interview context` },

  { signature: 'Design patterns decision tree', description: 'Choose structure based on operations needed and constraints given.', complexity: 'Concept', section: 'Why & When', example: `# DECISION TREE FOR DESIGN PROBLEMS

# Need O(1) min/max on stack?
# → Min Stack / Max Stack
# Store (value, current_min/max) tuples

# Implement queue using stacks?
# → Two stacks: input + output
# Amortized O(1) operations

# Implement stack using queues?
# → Two queues or one queue + rotation
# O(1) pop OR push (not both)

# Fixed-size circular buffer?
# → Array + head/tail pointers
# Wrap around with modulo

# Need O(1) insert/delete/getRandom?
# → HashMap + Array
# Map for O(1) lookup, array for O(1) random

# Track running median?
# → Two heaps (max-heap + min-heap)
# Balance sizes for O(1) median

# LRU Cache?
# → OrderedDict or HashMap + DLL
# O(1) get/put operations

# IMPLEMENTATION COMPLEXITY:
# Min Stack: ~15 lines
# Queue using 2 Stacks: ~30 lines
# Circular Queue: ~40 lines
# Insert/Delete/GetRandom: ~50 lines
# LRU Cache: ~20 (OrderedDict) or ~80 (DLL)

# INTERVIEW STRATEGY:
# 1. Clarify requirements (what operations, what O()?)
# 2. Identify data structures needed
# 3. Sketch approach before coding
# 4. Code cleanly with edge cases
# 5. Test with examples` },

  // Min Stack
  { signature: 'Min Stack', description: 'Stack with O(1) getMin. Store min alongside each element or use auxiliary stack.', complexity: 'O(1) all ops', section: 'Min Stack', example: `class MinStack:
    """
    Stack with O(1) push, pop, top, and getMin.
    Store (value, current_min) pairs.
    """
    def __init__(self):
        self.stack = []  # (value, min_so_far)

    def push(self, val: int) -> None:
        if not self.stack:
            self.stack.append((val, val))
        else:
            current_min = min(val, self.stack[-1][1])
            self.stack.append((val, current_min))

    def pop(self) -> None:
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1][0]

    def getMin(self) -> int:
        return self.stack[-1][1]

# Alternative: Two stacks
class MinStackTwoStacks:
    def __init__(self):
        self.stack = []
        self.min_stack = []  # Only push when new min

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        if self.stack.pop() == self.min_stack[-1]:
            self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]` },

  { signature: 'Max Stack', description: 'Stack with O(1) peekMax and O(log n) popMax. Use heap + lazy deletion.', complexity: 'O(log n) popMax', section: 'Min Stack', example: `import heapq

class MaxStack:
    """
    Stack with popMax(). Uses heap + lazy deletion.
    """
    def __init__(self):
        self.stack = []       # (value, id)
        self.heap = []        # (-value, -id) for max heap
        self.removed = set()  # Removed ids
        self.counter = 0

    def push(self, x: int) -> None:
        self.stack.append((x, self.counter))
        heapq.heappush(self.heap, (-x, -self.counter))
        self.counter += 1

    def pop(self) -> int:
        self._clean_stack()
        val, idx = self.stack.pop()
        self.removed.add(idx)
        return val

    def top(self) -> int:
        self._clean_stack()
        return self.stack[-1][0]

    def peekMax(self) -> int:
        self._clean_heap()
        return -self.heap[0][0]

    def popMax(self) -> int:
        self._clean_heap()
        val, idx = heapq.heappop(self.heap)
        self.removed.add(-idx)
        return -val

    def _clean_stack(self):
        while self.stack and self.stack[-1][1] in self.removed:
            self.stack.pop()

    def _clean_heap(self):
        while self.heap and -self.heap[0][1] in self.removed:
            heapq.heappop(self.heap)` },

  { signature: 'Queue using Stacks', description: 'Implement FIFO queue with two LIFO stacks. Amortized O(1) operations.', complexity: 'O(1) amortized', section: 'Queue Stack', example: `class MyQueue:
    """
    Queue using two stacks.
    Amortized O(1) per operation.
    """
    def __init__(self):
        self.in_stack = []   # For push
        self.out_stack = []  # For pop/peek

    def push(self, x: int) -> None:
        self.in_stack.append(x)

    def pop(self) -> int:
        self._transfer()
        return self.out_stack.pop()

    def peek(self) -> int:
        self._transfer()
        return self.out_stack[-1]

    def empty(self) -> bool:
        return not self.in_stack and not self.out_stack

    def _transfer(self):
        # Only transfer when out_stack is empty
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())

# Push: O(1)
# Pop: Amortized O(1) - each element transferred at most once
# Peek: Amortized O(1)` },

  { signature: 'Stack using Queues', description: 'Implement LIFO stack with one or two FIFO queues. Less practical, interview classic.', complexity: 'O(n) push or pop', section: 'Queue Stack', example: `from collections import deque

class MyStack:
    """
    Stack using single queue.
    O(n) push, O(1) pop.
    """
    def __init__(self):
        self.queue = deque()

    def push(self, x: int) -> None:
        self.queue.append(x)
        # Rotate so new element is at front
        for _ in range(len(self.queue) - 1):
            self.queue.append(self.queue.popleft())

    def pop(self) -> int:
        return self.queue.popleft()

    def top(self) -> int:
        return self.queue[0]

    def empty(self) -> bool:
        return len(self.queue) == 0

# Alternative: O(1) push, O(n) pop
class MyStackAlt:
    def __init__(self):
        self.q1 = deque()
        self.q2 = deque()

    def push(self, x: int) -> None:
        self.q1.append(x)

    def pop(self) -> int:
        # Move all but last to q2
        while len(self.q1) > 1:
            self.q2.append(self.q1.popleft())
        result = self.q1.popleft()
        self.q1, self.q2 = self.q2, self.q1
        return result` },

  // Circular Queue
  { signature: 'Circular Queue', description: 'Fixed-size queue with wrap-around. Uses modulo arithmetic for indices.', complexity: 'O(1) all ops', section: 'Circular Queue', example: `class MyCircularQueue:
    """
    Fixed-size circular queue.
    Wrap around using modulo.
    """
    def __init__(self, k: int):
        self.queue = [None] * k
        self.capacity = k
        self.head = 0
        self.count = 0

    def enQueue(self, value: int) -> bool:
        if self.isFull():
            return False
        tail = (self.head + self.count) % self.capacity
        self.queue[tail] = value
        self.count += 1
        return True

    def deQueue(self) -> bool:
        if self.isEmpty():
            return False
        self.head = (self.head + 1) % self.capacity
        self.count -= 1
        return True

    def Front(self) -> int:
        if self.isEmpty():
            return -1
        return self.queue[self.head]

    def Rear(self) -> int:
        if self.isEmpty():
            return -1
        tail = (self.head + self.count - 1) % self.capacity
        return self.queue[tail]

    def isEmpty(self) -> bool:
        return self.count == 0

    def isFull(self) -> bool:
        return self.count == self.capacity

# Example:
# q = MyCircularQueue(3)
# q.enQueue(1)  # [1, _, _], head=0
# q.enQueue(2)  # [1, 2, _], head=0
# q.enQueue(3)  # [1, 2, 3], head=0
# q.enQueue(4)  # False (full)
# q.deQueue()   # [_, 2, 3], head=1
# q.enQueue(4)  # [4, 2, 3], head=1 (wrapped!)` },
]
