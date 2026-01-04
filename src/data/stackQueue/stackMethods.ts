import type { Method } from '../../types'

// Why & When + Stack Operations + Monotonic Stack
export const stackMethods: Method[] = [
  // Why & When
  { signature: 'Why use Stack?', description: 'LIFO (Last In First Out). Use for: undo operations, expression parsing, DFS, backtracking, matching brackets.', complexity: 'Concept', section: 'Why & When', example: `# STACK = LIFO (Last In, First Out)
# Think: stack of plates - take from top

# USE CASES:
# - Undo/Redo operations
# - Browser back button
# - Expression evaluation (postfix, infix)
# - Matching parentheses/brackets
# - DFS traversal
# - Backtracking algorithms
# - Function call stack

# PYTHON: Use list as stack
stack = []
stack.append(1)   # Push - O(1)
stack.append(2)
stack.pop()       # Pop - O(1) returns 2
stack[-1]         # Peek top - O(1)
len(stack)        # Size - O(1)
not stack         # Is empty? - O(1)` },
  { signature: 'Why use Queue?', description: 'FIFO (First In First Out). Use for: BFS, task scheduling, buffering, level-order traversal.', complexity: 'Concept', section: 'Why & When', example: `# QUEUE = FIFO (First In, First Out)
# Think: line at a store - first in line served first

# USE CASES:
# - BFS traversal
# - Task scheduling
# - Print queue
# - Message queues
# - Level-order tree traversal
# - Buffering (streaming)

# PYTHON: Use collections.deque (NOT list!)
from collections import deque

queue = deque()
queue.append(1)     # Enqueue right - O(1)
queue.append(2)
queue.popleft()     # Dequeue left - O(1) returns 1
queue[0]            # Peek front - O(1)

# WHY NOT list?
# list.pop(0) is O(n) - shifts all elements
# deque.popleft() is O(1)` },

  // Basic Stack Operations
  { signature: 'Stack Operations', description: 'push(), pop(), peek(), isEmpty(). All O(1) using Python list.', complexity: 'O(1)', section: 'Stack Operations', example: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        raise IndexError("pop from empty stack")

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        raise IndexError("peek from empty stack")

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

# Usage
stack = Stack()
stack.push(1)
stack.push(2)
print(stack.peek())  # 2
print(stack.pop())   # 2
print(stack.pop())   # 1` },
  { signature: 'Valid Parentheses', description: 'Classic stack problem. Push opening, pop and match closing brackets.', complexity: 'O(n)', section: 'Stack Operations', example: `def is_valid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in pairs:
            # Closing bracket
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()
        else:
            # Opening bracket
            stack.append(char)

    return len(stack) == 0

# Examples:
# "()"     -> True
# "()[]{}" -> True
# "(]"     -> False
# "([)]"   -> False
# "{[]}"   -> True` },
  { signature: 'Min Stack', description: 'Stack that supports getMin() in O(1). Store (value, current_min) pairs.', complexity: 'O(1) all operations', section: 'Stack Operations', example: `class MinStack:
    def __init__(self):
        self.stack = []  # (value, min_so_far)

    def push(self, val):
        if not self.stack:
            self.stack.append((val, val))
        else:
            current_min = min(val, self.stack[-1][1])
            self.stack.append((val, current_min))

    def pop(self):
        self.stack.pop()

    def top(self):
        return self.stack[-1][0]

    def getMin(self):
        return self.stack[-1][1]

# Alternative: Two stacks
# One for values, one for minimums` },

  // Monotonic Stack
  { signature: 'Monotonic Stack Pattern', description: 'Stack that maintains increasing or decreasing order. Find next greater/smaller element in O(n).', complexity: 'O(n)', section: 'Monotonic Stack', example: `# MONOTONIC INCREASING STACK
# Elements increase from bottom to top
# Use for: Next Smaller Element

def monotonic_increasing(arr):
    stack = []
    for i, num in enumerate(arr):
        while stack and arr[stack[-1]] > num:
            # stack[-1] is greater than current
            # Process popped element
            idx = stack.pop()
            # Current element is next smaller for idx
        stack.append(i)
    return stack

# MONOTONIC DECREASING STACK
# Elements decrease from bottom to top
# Use for: Next Greater Element

def monotonic_decreasing(arr):
    stack = []
    for i, num in enumerate(arr):
        while stack and arr[stack[-1]] < num:
            # stack[-1] is smaller than current
            # Process popped element
            idx = stack.pop()
            # Current element is next greater for idx
        stack.append(i)
    return stack` },
  { signature: 'Next Greater Element', description: 'For each element, find next greater element to its right.', complexity: 'O(n)', section: 'Monotonic Stack', example: `def next_greater_element(nums):
    n = len(nums)
    result = [-1] * n
    stack = []  # Monotonic decreasing (indices)

    for i in range(n):
        while stack and nums[stack[-1]] < nums[i]:
            idx = stack.pop()
            result[idx] = nums[i]
        stack.append(i)

    return result

# Example: [2, 1, 2, 4, 3]
# Output:  [4, 2, 4, -1, -1]
#
# For 2: next greater is 4
# For 1: next greater is 2
# For 2: next greater is 4
# For 4: no next greater -> -1
# For 3: no next greater -> -1

# Circular array version
def next_greater_circular(nums):
    n = len(nums)
    result = [-1] * n
    stack = []

    for i in range(2 * n):
        while stack and nums[stack[-1]] < nums[i % n]:
            result[stack.pop()] = nums[i % n]
        if i < n:
            stack.append(i)

    return result` },
  { signature: 'Daily Temperatures', description: 'Find how many days until warmer temperature. Classic monotonic stack.', complexity: 'O(n)', section: 'Monotonic Stack', example: `def daily_temperatures(temperatures):
    n = len(temperatures)
    result = [0] * n
    stack = []  # Indices of temperatures waiting for warmer

    for i in range(n):
        while stack and temperatures[stack[-1]] < temperatures[i]:
            prev_idx = stack.pop()
            result[prev_idx] = i - prev_idx
        stack.append(i)

    return result

# Example: [73, 74, 75, 71, 69, 72, 76, 73]
# Output:  [1,  1,  4,  2,  1,  1,  0,  0]
#
# Day 0 (73): 1 day until 74
# Day 1 (74): 1 day until 75
# Day 2 (75): 4 days until 76
# ...` },
  { signature: 'Largest Rectangle in Histogram', description: 'Find largest rectangular area. Use monotonic increasing stack.', complexity: 'O(n)', section: 'Monotonic Stack', example: `def largest_rectangle_area(heights):
    stack = []  # Indices
    max_area = 0
    heights.append(0)  # Sentinel to flush stack

    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            # Width extends from after previous bar to current
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)

    heights.pop()  # Remove sentinel
    return max_area

# Example: heights = [2, 1, 5, 6, 2, 3]
# Largest rectangle has area 10 (heights 5,6 with width 2)

# The stack maintains increasing heights
# When we find smaller height, we calculate areas
# for all bars that can't extend further right` },
  { signature: 'Trapping Rain Water', description: 'Calculate water trapped between bars. Use monotonic stack or two pointers.', complexity: 'O(n)', section: 'Monotonic Stack', example: `# Monotonic Stack Solution
def trap(height):
    stack = []  # Indices
    water = 0

    for i, h in enumerate(height):
        while stack and height[stack[-1]] < h:
            bottom = stack.pop()
            if not stack:
                break
            left = stack[-1]
            width = i - left - 1
            bounded_height = min(h, height[left]) - height[bottom]
            water += width * bounded_height
        stack.append(i)

    return water

# Two Pointer Solution (simpler)
def trap_two_pointer(height):
    if not height:
        return 0

    left, right = 0, len(height) - 1
    left_max = right_max = 0
    water = 0

    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1

    return water` },
]
