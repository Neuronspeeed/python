import type { Method } from '../../types'

// Why & When, Fast and Slow Pointer, Reverse Linked List
export const linkedListBasicsMethods: Method[] = [
  // Why & When
  { signature: 'Why use Linked List?', description: 'O(1) insertion/deletion at known positions. No contiguous memory needed. Use when frequent insertions matter more than random access.', complexity: 'Concept', section: 'Why & When', example: `# LINKED LIST vs ARRAY
#
# Operation          Array    Linked List
# ───────────────────────────────────────
# Access by index    O(1)     O(n)
# Insert at start    O(n)     O(1)
# Insert at end      O(1)*    O(1)**
# Insert at middle   O(n)     O(1)***
# Delete            O(n)      O(1)***
# Search            O(n)      O(n)
#
# * Amortized for dynamic array
# ** If we maintain tail pointer
# *** If we have reference to node

# USE LINKED LIST WHEN:
# - Frequent insertions/deletions
# - Don't need random access
# - Unknown size, frequent resizing
# - Implementing stacks/queues

# USE ARRAY WHEN:
# - Need random access
# - Cache locality matters
# - Size is relatively fixed` },
  { signature: 'ListNode Structure', description: 'Basic building block: value + next pointer. For doubly linked: add prev pointer.', complexity: 'Concept', section: 'Why & When', example: `# SINGLY LINKED LIST NODE
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# DOUBLY LINKED LIST NODE
class DoublyListNode:
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

# Creating a linked list: 1 -> 2 -> 3
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)

# Traversal
curr = head
while curr:
    print(curr.val)
    curr = curr.next` },

  // Fast and Slow Pointer
  { signature: 'Fast and Slow Pointer', description: 'Two pointers at different speeds. Detect cycles, find middle, find nth from end.', complexity: 'O(n)', section: 'Node Structure', example: `# TEMPLATE: Fast moves 2x, Slow moves 1x
def fn(head):
    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next        # Move 1 step
        fast = fast.next.next   # Move 2 steps
        # Do logic

    return slow  # Often returns slow (middle)

# WHY IT WORKS:
# - When fast reaches end, slow is at middle
# - If there's a cycle, they will meet
# - Distance relationship gives useful positions` },
  { signature: 'Find Middle of Linked List', description: 'Slow pointer ends up at middle when fast reaches end.', complexity: 'O(n)', section: 'Node Structure', example: `def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # Middle node

# For even length: returns second middle
# 1 -> 2 -> 3 -> 4 -> 5  returns 3
# 1 -> 2 -> 3 -> 4      returns 3

# For first middle in even length:
def find_first_middle(head):
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    return slow` },
  { signature: 'Detect Cycle', description: 'If fast and slow meet, there is a cycle. Floyd\'s cycle detection.', complexity: 'O(n)', section: 'Basic Operations', example: `def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False

# Find cycle START (where cycle begins)
def detect_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            # Found cycle, now find start
            slow = head
            while slow != fast:
                slow = slow.next
                fast = fast.next
            return slow  # Cycle start node
    return None

# WHY THIS WORKS (Math):
# When they meet in cycle:
# slow traveled: x + y
# fast traveled: x + y + n*c (n cycles)
# fast = 2 * slow -> x + y + nc = 2(x + y)
# -> x = nc - y = (n-1)c + (c-y)
# So distance from head to cycle start (x)
# equals distance from meeting point to start` },
  { signature: 'Find Nth Node from End', description: 'Two pointers with n gap. When fast reaches end, slow is at target.', complexity: 'O(n)', section: 'Basic Operations', example: `def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    slow = fast = dummy

    # Move fast n+1 steps ahead
    for _ in range(n + 1):
        fast = fast.next

    # Move both until fast reaches end
    while fast:
        slow = slow.next
        fast = fast.next

    # slow is now at (n+1)th from end
    # so slow.next is nth from end
    slow.next = slow.next.next
    return dummy.next

# Get nth from end (without removal)
def get_nth_from_end(head, n):
    slow = fast = head
    for _ in range(n):
        fast = fast.next
    while fast:
        slow = slow.next
        fast = fast.next
    return slow` },

  // Reverse Linked List
  { signature: 'Reverse Linked List', description: 'Core operation. Iterative: O(1) space. Recursive: O(n) space for call stack.', complexity: 'O(n)', section: 'Basic Operations', example: `# ITERATIVE (Preferred - O(1) space)
def reverse_list(head):
    prev = None
    curr = head

    while curr:
        next_temp = curr.next  # Save next
        curr.next = prev       # Reverse pointer
        prev = curr            # Move prev forward
        curr = next_temp       # Move curr forward

    return prev  # New head

# RECURSIVE (O(n) space for call stack)
def reverse_list_recursive(head):
    if not head or not head.next:
        return head

    new_head = reverse_list_recursive(head.next)
    head.next.next = head  # Reverse pointer
    head.next = None       # Prevent cycle

    return new_head

# Visualization:
# 1 -> 2 -> 3 -> None
# Step 1: prev=None, curr=1
# Step 2: prev=1, curr=2, list: None <- 1  2 -> 3
# Step 3: prev=2, curr=3, list: None <- 1 <- 2  3
# Step 4: prev=3, curr=None
# Result: None <- 1 <- 2 <- 3` },
  { signature: 'Reverse Linked List II (Partial)', description: 'Reverse only portion from position left to right.', complexity: 'O(n)', section: 'Fast & Slow Pointers', example: `def reverse_between(head, left, right):
    if not head or left == right:
        return head

    dummy = ListNode(0, head)
    prev = dummy

    # Move to node before left
    for _ in range(left - 1):
        prev = prev.next

    # Start reversing
    curr = prev.next
    for _ in range(right - left):
        next_node = curr.next
        curr.next = next_node.next
        next_node.next = prev.next
        prev.next = next_node

    return dummy.next

# Example: 1 -> 2 -> 3 -> 4 -> 5, left=2, right=4
# Result:  1 -> 4 -> 3 -> 2 -> 5` },
  { signature: 'Reverse in K-Groups', description: 'Reverse every k nodes. If remaining < k, keep as is.', complexity: 'O(n)', section: 'Fast & Slow Pointers', example: `def reverse_k_group(head, k):
    # Count total nodes
    count = 0
    curr = head
    while curr:
        count += 1
        curr = curr.next

    dummy = ListNode(0, head)
    prev_group = dummy

    while count >= k:
        curr = prev_group.next
        next_node = curr.next

        # Reverse k nodes
        for _ in range(k - 1):
            curr.next = next_node.next
            next_node.next = prev_group.next
            prev_group.next = next_node
            next_node = curr.next

        prev_group = curr
        count -= k

    return dummy.next

# Example: 1->2->3->4->5, k=2
# Result:  2->1->4->3->5` },
]
