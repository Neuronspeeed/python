import type { Method } from '../../../types'

export const iteratorMethods: Method[] = [
  { signature: 'Flatten Nested List Iterator', description: 'Iterate over nested structure. Use stack for lazy traversal.', complexity: 'O(1) amortized next', section: 'Iterator', example: `class NestedIterator:
    """
    Flatten nested list: [[1,1],2,[1,1]] -> 1,1,2,1,1
    Stack-based lazy evaluation.
    """
    def __init__(self, nestedList):
        self.stack = list(reversed(nestedList))

    def next(self) -> int:
        self._flatten_top()
        return self.stack.pop().getInteger()

    def hasNext(self) -> bool:
        self._flatten_top()
        return len(self.stack) > 0

    def _flatten_top(self):
        # Keep flattening until top is integer
        while self.stack and not self.stack[-1].isInteger():
            nested = self.stack.pop().getList()
            self.stack.extend(reversed(nested))

# Alternative: Pre-flatten (simpler but O(n) space)
class NestedIteratorPreFlatten:
    def __init__(self, nestedList):
        self.flat = []
        self._flatten(nestedList)
        self.index = 0

    def _flatten(self, lst):
        for item in lst:
            if item.isInteger():
                self.flat.append(item.getInteger())
            else:
                self._flatten(item.getList())

    def next(self) -> int:
        result = self.flat[self.index]
        self.index += 1
        return result

    def hasNext(self) -> bool:
        return self.index < len(self.flat)` },

  { signature: 'Peeking Iterator', description: 'Iterator with peek() that shows next without consuming. Wrapper pattern.', complexity: 'O(1)', section: 'Iterator', example: `class PeekingIterator:
    """
    Wrapper that adds peek() to any iterator.
    Cache one element ahead.
    """
    def __init__(self, iterator):
        self.iterator = iterator
        self.peeked = None
        self.has_peeked = False

    def peek(self) -> int:
        if not self.has_peeked:
            self.peeked = next(self.iterator)
            self.has_peeked = True
        return self.peeked

    def next(self) -> int:
        if self.has_peeked:
            self.has_peeked = False
            return self.peeked
        return next(self.iterator)

    def hasNext(self) -> bool:
        if self.has_peeked:
            return True
        try:
            self.peeked = next(self.iterator)
            self.has_peeked = True
            return True
        except StopIteration:
            return False

# Zigzag Iterator
class ZigzagIterator:
    """
    Alternate between multiple lists.
    [1,2], [3,4,5,6] -> 1,3,2,4,5,6
    """
    def __init__(self, v1: list, v2: list):
        from collections import deque
        self.queue = deque()
        for v in [v1, v2]:
            if v:
                self.queue.append(iter(v))

    def next(self) -> int:
        it = self.queue.popleft()
        result = next(it)
        try:
            next(it)  # Check if more elements
            self.queue.append(it)
        except StopIteration:
            pass
        return result

    def hasNext(self) -> bool:
        return len(self.queue) > 0` },
]
