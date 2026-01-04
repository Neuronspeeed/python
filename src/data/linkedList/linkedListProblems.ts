import type { Method } from '../../types'

// Common Operations
export const linkedListProblemsMethods: Method[] = [
  // Common Operations
  { signature: 'Merge Two Sorted Lists', description: 'Classic merge using dummy head. Essential for merge sort on lists.', complexity: 'O(n+m)', section: 'Fast & Slow Pointers', example: `def merge_two_lists(l1, l2):
    dummy = ListNode()
    tail = dummy

    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next

    # Attach remaining nodes
    tail.next = l1 or l2

    return dummy.next

# DUMMY HEAD PATTERN:
# - Avoids special cases for empty head
# - Clean code for building new list
# - Return dummy.next at end` },
  { signature: 'Add Two Numbers', description: 'Numbers stored as linked lists (reverse order). Add digit by digit with carry.', complexity: 'O(max(n,m))', section: 'Fast & Slow Pointers', example: `def add_two_numbers(l1, l2):
    dummy = ListNode()
    curr = dummy
    carry = 0

    while l1 or l2 or carry:
        val1 = l1.val if l1 else 0
        val2 = l2.val if l2 else 0

        total = val1 + val2 + carry
        carry = total // 10
        curr.next = ListNode(total % 10)
        curr = curr.next

        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None

    return dummy.next

# Example: 342 + 465 = 807
# l1: 2 -> 4 -> 3  (342 reversed)
# l2: 5 -> 6 -> 4  (465 reversed)
# Result: 7 -> 0 -> 8  (807 reversed)` },
  { signature: 'Remove Duplicates from Sorted List', description: 'Keep only distinct values. Compare adjacent nodes.', complexity: 'O(n)', section: 'Reverse Patterns', example: `# Keep one of each value
def delete_duplicates(head):
    curr = head
    while curr and curr.next:
        if curr.val == curr.next.val:
            curr.next = curr.next.next
        else:
            curr = curr.next
    return head

# Remove ALL duplicates (keep only unique)
def delete_all_duplicates(head):
    dummy = ListNode(0, head)
    prev = dummy

    while head:
        if head.next and head.val == head.next.val:
            # Skip all duplicates
            while head.next and head.val == head.next.val:
                head = head.next
            prev.next = head.next
        else:
            prev = prev.next
        head = head.next

    return dummy.next` },
  { signature: 'Palindrome Linked List', description: 'Find middle, reverse second half, compare both halves.', complexity: 'O(n) time, O(1) space', section: 'Reverse Patterns', example: `def is_palindrome(head):
    if not head or not head.next:
        return True

    # Find middle
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next

    # Reverse second half
    second = reverse(slow.next)
    slow.next = None  # Cut the list

    # Compare both halves
    first = head
    while second:
        if first.val != second.val:
            return False
        first = first.next
        second = second.next

    return True

def reverse(head):
    prev = None
    while head:
        next_temp = head.next
        head.next = prev
        prev = head
        head = next_temp
    return prev` },
  { signature: 'Intersection of Two Lists', description: 'Find node where two lists converge. Use length difference or two-pointer trick.', complexity: 'O(n+m)', section: 'Reverse Patterns', example: `def get_intersection_node(headA, headB):
    if not headA or not headB:
        return None

    pA, pB = headA, headB

    # When pA reaches end, redirect to headB
    # When pB reaches end, redirect to headA
    # They will meet at intersection or both be None
    while pA != pB:
        pA = pA.next if pA else headB
        pB = pB.next if pB else headA

    return pA

# WHY THIS WORKS:
# If lists have lengths a and b:
# pA travels: a + c + (b - c) = a + b
# pB travels: b + c + (a - c) = a + b
# They travel same distance, meeting at intersection
# (c = shared part, if no intersection both end at None)` },
  { signature: 'Copy List with Random Pointer', description: 'Deep copy list where nodes have random pointers. Use hash map or interleaving.', complexity: 'O(n)', section: 'Merge & Sort', example: `# Using Hash Map (simple)
def copy_random_list(head):
    if not head:
        return None

    # Map old nodes to new nodes
    old_to_new = {}
    curr = head
    while curr:
        old_to_new[curr] = Node(curr.val)
        curr = curr.next

    # Set next and random pointers
    curr = head
    while curr:
        if curr.next:
            old_to_new[curr].next = old_to_new[curr.next]
        if curr.random:
            old_to_new[curr].random = old_to_new[curr.random]
        curr = curr.next

    return old_to_new[head]

# O(1) space: Interleave original and copy
# 1. Create copy nodes interleaved
# 2. Set random pointers using interleaved structure
# 3. Separate the two lists` },
]
