import type { Method } from '../../types'

// Why & When + DFS Recursive + DFS Iterative + BFS Level Order
export const binaryTreeTraversalMethods: Method[] = [
  // Why & When (index 0-1)
  { section: 'Why & When', signature: 'Why use Binary Tree?', description: 'Hierarchical data structure. BST gives O(log n) operations. Use for: sorted data, hierarchies, expression trees.', complexity: 'Concept', example: `# BINARY TREE = Node with at most 2 children
#        1        <- Root
#       / \\
#      2   3      <- Children
#     / \\
#    4   5        <- Leaves

# USE CASES:
# - Binary Search Tree (sorted data)
# - Expression parsing
# - File system representation
# - DOM tree
# - Decision trees (ML)
# - Heaps (priority queue)

# Node structure
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# TERMINOLOGY:
# - Root: top node (no parent)
# - Leaf: node with no children
# - Height: longest path from node to leaf
# - Depth: distance from root to node
# - Level: all nodes at same depth` },
  { section: 'Why & When', signature: 'Tree Traversal Orders', description: 'Preorder (root-left-right), Inorder (left-root-right), Postorder (left-right-root), Level order (BFS).', complexity: 'O(n)', example: `#        1
#       / \\
#      2   3
#     / \\
#    4   5

# PREORDER:  1, 2, 4, 5, 3  (Root first)
# INORDER:   4, 2, 5, 1, 3  (Left, Root, Right)
# POSTORDER: 4, 5, 2, 3, 1  (Root last)
# LEVEL:     1, 2, 3, 4, 5  (Top to bottom)

# WHEN TO USE:
# - Preorder: Copy tree, serialize
# - Inorder: BST gives sorted order
# - Postorder: Delete tree, calculate size
# - Level order: Print by level, shortest path` },

  // DFS Recursive (index 2-5)
  { section: 'DFS Recursive', signature: 'DFS Recursive Template', description: 'Process node, recurse left, recurse right. Simple and elegant. O(h) space for call stack.', complexity: 'O(n) time, O(h) space', example: `def dfs(node):
    if not node:
        return

    # PREORDER: process here
    print(node.val)

    dfs(node.left)

    # INORDER: process here
    # print(node.val)

    dfs(node.right)

    # POSTORDER: process here
    # print(node.val)

# Return value pattern
def dfs_with_return(node):
    if not node:
        return 0  # Base case

    left = dfs_with_return(node.left)
    right = dfs_with_return(node.right)

    # Combine results
    return 1 + max(left, right)  # Example: height` },
  { section: 'DFS Recursive', signature: 'Preorder Traversal', description: 'Visit root before children. Use for: copying tree, prefix expression.', complexity: 'O(n)', example: `# Recursive
def preorder_recursive(root):
    result = []
    def dfs(node):
        if not node:
            return
        result.append(node.val)  # Process root
        dfs(node.left)
        dfs(node.right)
    dfs(root)
    return result

# Iterative (with stack)
def preorder_iterative(root):
    if not root:
        return []
    result = []
    stack = [root]

    while stack:
        node = stack.pop()
        result.append(node.val)
        # Push right first so left is processed first
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)

    return result` },
  { section: 'DFS Recursive', signature: 'Inorder Traversal', description: 'Visit left, root, right. BST inorder gives sorted sequence.', complexity: 'O(n)', example: `# Recursive
def inorder_recursive(root):
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)
        result.append(node.val)  # Process root
        dfs(node.right)
    dfs(root)
    return result

# Iterative (with stack)
def inorder_iterative(root):
    result = []
    stack = []
    curr = root

    while curr or stack:
        # Go all the way left
        while curr:
            stack.append(curr)
            curr = curr.left

        # Process node
        curr = stack.pop()
        result.append(curr.val)

        # Move to right subtree
        curr = curr.right

    return result` },
  { section: 'DFS Recursive', signature: 'Postorder Traversal', description: 'Visit children before root. Use for: deleting tree, postfix expression.', complexity: 'O(n)', example: `# Recursive
def postorder_recursive(root):
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)
        dfs(node.right)
        result.append(node.val)  # Process root
    dfs(root)
    return result

# Iterative (modified preorder + reverse)
def postorder_iterative(root):
    if not root:
        return []
    result = []
    stack = [root]

    while stack:
        node = stack.pop()
        result.append(node.val)
        # Push left first (opposite of preorder)
        if node.left:
            stack.append(node.left)
        if node.right:
            stack.append(node.right)

    return result[::-1]  # Reverse` },

  // DFS Iterative (index 6)
  { section: 'DFS Iterative', signature: 'DFS Iterative Template', description: 'Use explicit stack instead of recursion. Better for deep trees (no stack overflow).', complexity: 'O(n) time, O(h) space', example: `def dfs_iterative(root):
    if not root:
        return []

    result = []
    stack = [root]

    while stack:
        node = stack.pop()
        result.append(node.val)

        # Add children to stack
        # Right first if you want left processed first
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)

    return result

# With state tracking
def dfs_with_state(root):
    if not root:
        return 0

    stack = [(root, False)]
    result = 0

    while stack:
        node, visited = stack.pop()

        if visited:
            # Process after children (postorder)
            result += node.val
        else:
            # Add children and mark as visited
            stack.append((node, True))
            if node.right:
                stack.append((node.right, False))
            if node.left:
                stack.append((node.left, False))

    return result` },

  // BFS (index 7-9)
  { section: 'BFS Level Order', signature: 'BFS Level Order Template', description: 'Process level by level using queue. Find shortest path, level-wise operations.', complexity: 'O(n) time, O(w) space', example: `from collections import deque

def bfs(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level = []

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)

    return result

# Example output for tree:
#        3
#       / \\
#      9  20
#         / \\
#        15  7
# [[3], [9, 20], [15, 7]]` },
  { section: 'BFS Level Order', signature: 'Level Order Traversal', description: 'Classic BFS. Returns list of lists, one per level.', complexity: 'O(n)', example: `from collections import deque

def level_order(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)

    return result

# Zigzag level order
def zigzag_level_order(root):
    if not root:
        return []

    result = []
    queue = deque([root])
    left_to_right = True

    while queue:
        level = deque()
        for _ in range(len(queue)):
            node = queue.popleft()
            if left_to_right:
                level.append(node.val)
            else:
                level.appendleft(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(list(level))
        left_to_right = not left_to_right

    return result` },
  { section: 'BFS Level Order', signature: 'Maximum Depth', description: 'DFS returns max depth. BFS counts levels.', complexity: 'O(n)', example: `# DFS Recursive
def max_depth_dfs(root):
    if not root:
        return 0
    return 1 + max(max_depth_dfs(root.left),
                   max_depth_dfs(root.right))

# BFS
def max_depth_bfs(root):
    if not root:
        return 0

    from collections import deque
    queue = deque([root])
    depth = 0

    while queue:
        depth += 1
        for _ in range(len(queue)):
            node = queue.popleft()
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return depth

# Minimum depth (first leaf)
def min_depth(root):
    if not root:
        return 0
    from collections import deque
    queue = deque([(root, 1)])
    while queue:
        node, depth = queue.popleft()
        if not node.left and not node.right:
            return depth  # First leaf found
        if node.left:
            queue.append((node.left, depth + 1))
        if node.right:
            queue.append((node.right, depth + 1))` },
]
