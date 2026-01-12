export const linkedListIntro = `When Linked Lists Beat Arrays
O(1) insertion/deletion at known positions (just pointer updates) vs arrays O(n) shifts. Use when implementing queue/deque, LRU cache (doubly linked list + hash map), or frequent middle insertions. Trade-off: O(n) access time and poor cache performance (nodes scattered in memory). Arrays win for random access and iteration.

\`\`\`python
# LINKED LIST STRUCTURE
class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

# O(1) INSERTION at known position (just pointer update)
new_node.next = node.next
node.next = new_node
# vs ARRAY O(n): arr.insert(i, val) - must shift elements

# O(n) ACCESS (must traverse)
node = head
for _ in range(index):
    node = node.next
# vs ARRAY O(1): arr[index] - direct memory calculation

# WHEN TO USE:
# - Queue/Deque - O(1) at both ends with doubly linked
# - LRU Cache - doubly linked list + hash map
# - Frequent middle insertions if you maintain node references
# - Unknown/wildly varying size

# WHEN TO AVOID:
# - Random access needed - arrays win O(1) vs O(n)
# - Iteration dominates - cache misses hurt performance
# - Memory overhead matters - each node has pointer overhead
\`\`\`
---
Master These Patterns: Fast/Slow Pointers and Dummy Head
Two pointers moving at different speeds solve cycle detection, finding middle, nth from end. Dummy head eliminates special cases for head operations. These two techniques solve most linked list interview problems.

\`\`\`python
# FAST/SLOW POINTER: Find middle
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next      # Move 1 step
        fast = fast.next.next # Move 2 steps
    return slow  # When fast reaches end, slow is at middle

# FAST/SLOW POINTER: Cycle detection (Floyd's algorithm)
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:  # Fast caught up - cycle exists
            return True
    return False

# FAST/SLOW POINTER: Find nth from end
def nth_from_end(head, n):
    fast = slow = head
    # Give fast n-step lead
    for _ in range(n):
        fast = fast.next
    # Move both until fast reaches end
    while fast:
        slow = slow.next
        fast = fast.next
    return slow  # Slow is now n steps from end

# DUMMY HEAD: Simplifies head operations
def remove_elements(head, val):
    dummy = Node(0, head)  # Dummy before head
    prev = dummy
    curr = head
    while curr:
        if curr.val == val:
            prev.next = curr.next  # Remove node
        else:
            prev = curr
        curr = curr.next
    return dummy.next  # New head (might have changed)
# No special case for removing head - treated like any node
\`\`\`
---
Singly vs Doubly Linked Lists
Singly linked has one pointer (next) - memory efficient, one-directional. Doubly linked adds prev pointer - bidirectional traversal, O(1) deletion with node reference (no need to find predecessor). Python collections.deque uses doubly linked for O(1) operations at both ends.

\`\`\`python
# SINGLY LINKED LIST
class SinglyNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

# Deletion requires finding predecessor - O(n)
def delete_node_singly(head, target):
    if head.val == target:
        return head.next
    prev = head
    while prev.next and prev.next.val != target:
        prev = prev.next
    if prev.next:
        prev.next = prev.next.next
    return head

# DOUBLY LINKED LIST
class DoublyNode:
    def __init__(self, val, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

# Deletion with node reference - O(1)
def delete_node_doubly(node):
    if node.prev:
        node.prev.next = node.next
    if node.next:
        node.next.prev = node.prev
# No traversal needed - direct pointer updates

# PYTHON DEQUE: Doubly linked list
from collections import deque
dq = deque([1, 2, 3])
dq.appendleft(0)  # O(1) - add to front
dq.append(4)      # O(1) - add to back
dq.popleft()      # O(1) - remove from front
dq.pop()          # O(1) - remove from back

# WHEN TO USE EACH:
# Singly: Memory efficient, forward-only traversal sufficient
# Doubly: Need backward traversal, O(1) deletion at arbitrary positions
\`\`\``
