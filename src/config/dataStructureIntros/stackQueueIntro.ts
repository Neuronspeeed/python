export const stackQueueIntro = `Stack vs Queue: LIFO vs FIFO
Stack is LIFO (Last In First Out) - Python list works perfectly. Queue is FIFO (First In First Out) - NEVER use list, always use \`collections.deque\`. Stack for DFS/backtracking/undo. Queue for BFS/level-order/scheduling.

\`\`\`python
# STACK: Use Python list (O(1) at end)
stack = []
stack.append(1)    # Push - O(1)
stack.append(2)
top = stack[-1]    # Peek - O(1)
val = stack.pop()  # Pop - O(1)

# QUEUE: Use deque (NOT list!)
from collections import deque
queue = deque()
queue.append(1)    # Enqueue right - O(1)
queue.append(2)
front = queue[0]   # Peek - O(1)
val = queue.popleft()  # Dequeue left - O(1)

# NEVER DO THIS:
# queue = []
# queue.pop(0)  # O(n)! Shifts all elements

# STACK for DFS (depth-first)
def dfs(node):
    stack = [node]
    while stack:
        curr = stack.pop()
        for child in curr.children:
            stack.append(child)  # Go deep first

# QUEUE for BFS (breadth-first)
def bfs(node):
    queue = deque([node])
    while queue:
        curr = queue.popleft()
        for child in curr.children:
            queue.append(child)  # Process level by level
\`\`\`
---
Monotonic Stack Pattern
Stack maintaining elements in sorted order. When new element violates order, pop until restored. Solves "next greater element" in O(n). Classic interview pattern.

\`\`\`python
# NEXT GREATER ELEMENT to the right
def next_greater(nums):
    result = [-1] * len(nums)
    stack = []  # Monotonic decreasing stack (indices)

    for i, num in enumerate(nums):
        # Pop smaller elements - num is their "next greater"
        while stack and nums[stack[-1]] < num:
            idx = stack.pop()
            result[idx] = num
        stack.append(i)

    return result
# [4,2,6,3] -> [6,6,-1,-1]
# O(n) - each element pushed/popped once

# MONOTONIC STACK VARIANTS:
# - Increasing stack: pop larger elements
# - Decreasing stack: pop smaller elements
# - Next smaller: use increasing stack
# - Previous greater: iterate right-to-left

# TEMPERATURE PROBLEM: Days until warmer
def daily_temps(temps):
    result = [0] * len(temps)
    stack = []

    for i, temp in enumerate(temps):
        while stack and temps[stack[-1]] < temp:
            prev_i = stack.pop()
            result[prev_i] = i - prev_i  # Days to wait
        stack.append(i)

    return result
\`\`\`
---
Stack for Matching and Undo
Stacks natural for matching pairs (parentheses), reversing order, and undo operations. LIFO property makes last-added element first-processed.

\`\`\`python
# VALID PARENTHESES
def is_valid(s):
    stack = []
    pairs = {'(': ')', '[': ']', '{': '}'}

    for char in s:
        if char in pairs:
            stack.append(char)  # Opening bracket
        elif not stack or pairs[stack.pop()] != char:
            return False  # No match or wrong closing

    return len(stack) == 0  # All matched

# UNDO SYSTEM
class Editor:
    def __init__(self):
        self.text = ""
        self.undo_stack = []

    def append(self, char):
        self.undo_stack.append(self.text)  # Save state
        self.text += char

    def undo(self):
        if self.undo_stack:
            self.text = self.undo_stack.pop()  # Restore

# REVERSE STRING with stack
def reverse(s):
    stack = list(s)
    result = []
    while stack:
        result.append(stack.pop())  # LIFO reverses
    return ''.join(result)
# Or just: s[::-1]
\`\`\``
