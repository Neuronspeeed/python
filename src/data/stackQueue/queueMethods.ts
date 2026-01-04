import type { Method } from '../../types'

// Queue Operations + Monotonic Queue + Expression Evaluation
export const queueMethods: Method[] = [
  // Queue Operations
  { signature: 'Queue with Deque', description: 'Use collections.deque for O(1) operations on both ends.', complexity: 'O(1)', section: 'Queue Operations', example: `from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()
        raise IndexError("dequeue from empty queue")

    def front(self):
        if not self.is_empty():
            return self.items[0]
        raise IndexError("front from empty queue")

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

# DEQUE OPERATIONS (all O(1))
dq = deque()
dq.append(x)      # Add to right
dq.appendleft(x)  # Add to left
dq.pop()          # Remove from right
dq.popleft()      # Remove from left
dq[0]             # Peek left
dq[-1]            # Peek right` },
  { signature: 'Implement Queue using Stacks', description: 'Use two stacks. Push to one, pop by transferring to other.', complexity: 'O(1) amortized', section: 'Queue Operations', example: `class MyQueue:
    def __init__(self):
        self.s1 = []  # For push
        self.s2 = []  # For pop

    def push(self, x):
        self.s1.append(x)

    def pop(self):
        self.peek()
        return self.s2.pop()

    def peek(self):
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())
        return self.s2[-1]

    def empty(self):
        return not self.s1 and not self.s2

# Amortized O(1) because each element is
# pushed and popped at most twice total` },
  { signature: 'Implement Stack using Queues', description: 'Use one or two queues. Rotate elements to simulate LIFO.', complexity: 'O(n) push or pop', section: 'Queue Operations', example: `from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()

    def push(self, x):
        self.q.append(x)
        # Rotate to make x the front
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.popleft())

    def pop(self):
        return self.q.popleft()

    def top(self):
        return self.q[0]

    def empty(self):
        return len(self.q) == 0

# After push(1), push(2), push(3):
# Queue state: [3, 2, 1]
# pop() returns 3 (LIFO behavior)` },
  { signature: 'Circular Queue', description: 'Fixed size queue using array with head/tail pointers.', complexity: 'O(1)', section: 'Queue Operations', example: `class MyCircularQueue:
    def __init__(self, k):
        self.data = [None] * k
        self.head = 0
        self.tail = 0
        self.size = 0
        self.capacity = k

    def enQueue(self, value):
        if self.isFull():
            return False
        self.data[self.tail] = value
        self.tail = (self.tail + 1) % self.capacity
        self.size += 1
        return True

    def deQueue(self):
        if self.isEmpty():
            return False
        self.head = (self.head + 1) % self.capacity
        self.size -= 1
        return True

    def Front(self):
        return -1 if self.isEmpty() else self.data[self.head]

    def Rear(self):
        return -1 if self.isEmpty() else self.data[(self.tail - 1) % self.capacity]

    def isEmpty(self):
        return self.size == 0

    def isFull(self):
        return self.size == self.capacity` },

  // Monotonic Queue
  { signature: 'Sliding Window Maximum', description: 'Find max in each window of size k. Use monotonic decreasing deque.', complexity: 'O(n)', section: 'Monotonic Queue', example: `from collections import deque

def max_sliding_window(nums, k):
    result = []
    dq = deque()  # Indices of potential maximums

    for i, num in enumerate(nums):
        # Remove indices outside window
        while dq and dq[0] <= i - k:
            dq.popleft()

        # Remove smaller elements (they can't be max)
        while dq and nums[dq[-1]] < num:
            dq.pop()

        dq.append(i)

        # Window is complete
        if i >= k - 1:
            result.append(nums[dq[0]])

    return result

# Example: nums = [1,3,-1,-3,5,3,6,7], k = 3
# Windows:
# [1,3,-1] max=3
# [3,-1,-3] max=3
# [-1,-3,5] max=5
# [-3,5,3] max=5
# [5,3,6] max=6
# [3,6,7] max=7
# Output: [3,3,5,5,6,7]` },

  // Expression Evaluation
  { signature: 'Evaluate Reverse Polish Notation', description: 'Postfix expression evaluation. Push numbers, pop and compute on operators.', complexity: 'O(n)', section: 'Expression Evaluation', example: `def eval_rpn(tokens):
    stack = []

    for token in tokens:
        if token in "+-*/":
            b = stack.pop()
            a = stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            else:  # Division truncates toward zero
                stack.append(int(a / b))
        else:
            stack.append(int(token))

    return stack[0]

# Example: ["2","1","+","3","*"]
# = ((2 + 1) * 3) = 9
#
# ["4","13","5","/","+"]
# = (4 + (13 / 5)) = 4 + 2 = 6` },
  { signature: 'Basic Calculator', description: 'Evaluate expression with +, -, parentheses. Use stack for nested expressions.', complexity: 'O(n)', section: 'Expression Evaluation', example: `def calculate(s):
    stack = []
    num = 0
    sign = 1
    result = 0

    for char in s:
        if char.isdigit():
            num = num * 10 + int(char)
        elif char in "+-":
            result += sign * num
            num = 0
            sign = 1 if char == '+' else -1
        elif char == '(':
            # Save current result and sign
            stack.append(result)
            stack.append(sign)
            result = 0
            sign = 1
        elif char == ')':
            result += sign * num
            num = 0
            result *= stack.pop()  # Sign before (
            result += stack.pop()  # Result before (

    result += sign * num
    return result

# Example: "(1+(4+5+2)-3)+(6+8)"
# = (1 + 11 - 3) + 14 = 9 + 14 = 23` },
  { signature: 'Decode String', description: 'Decode k[encoded_string] patterns. Use stack for nested brackets.', complexity: 'O(n)', section: 'Expression Evaluation', example: `def decode_string(s):
    stack = []
    curr_num = 0
    curr_str = ""

    for char in s:
        if char.isdigit():
            curr_num = curr_num * 10 + int(char)
        elif char == '[':
            stack.append((curr_str, curr_num))
            curr_str = ""
            curr_num = 0
        elif char == ']':
            prev_str, num = stack.pop()
            curr_str = prev_str + curr_str * num
        else:
            curr_str += char

    return curr_str

# Examples:
# "3[a]2[bc]" -> "aaabcbc"
# "3[a2[c]]"  -> "accaccacc"
# "2[abc]3[cd]ef" -> "abcabccdcdcdef"` },
]
