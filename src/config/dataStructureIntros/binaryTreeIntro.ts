export const binaryTreeIntro = `Use Binary Trees When...
You need hierarchical organization with O(log n) operations when balanced. Binary Search Trees (BST) give O(log n) search, insert, delete with the property left.val < node.val < right.val. Recursion is natural for trees—most operations follow "process node, recurse left, recurse right". Choose BST when you need sorted data with dynamic insertions, or regular trees for hierarchical modeling.

\`\`\`python
# BST OPERATIONS - O(log n) when balanced
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def search_bst(root, target):
    if not root or root.val == target:
        return root
    if target < root.val:
        return search_bst(root.left, target)
    return search_bst(root.right, target)

# DEGENERATE CASE - O(n) when unbalanced
# Tree: 1 -> 2 -> 3 -> 4 (essentially linked list)
# Balanced: AVL, Red-Black trees maintain O(log n)
\`\`\`
---
Master Tree Traversals
The traversal order determines what you can accomplish. Preorder (root, left, right) for copying or serialization. Inorder (left, root, right) gives sorted order in BST—this is THE way to extract sorted elements. Postorder (left, right, root) when children must process before parent (deletion, calculating height). Level-order (BFS) for shortest path or level-by-level processing.

\`\`\`python
# INORDER - Sorted output for BST
def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

# LEVEL-ORDER - BFS with queue
from collections import deque

def level_order(root):
    if not root:
        return []
    result, queue = [], deque([root])
    while queue:
        node = queue.popleft()
        result.append(node.val)
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return result

# POSTORDER - Process children first (calculate height)
def height(root):
    if not root:
        return 0
    return 1 + max(height(root.left), height(root.right))
\`\`\`
---
DFS vs BFS Trade-offs
DFS (recursion or stack) goes deep before backtracking—use for finding paths, checking subtree properties, less memory (recursion stack < explicit queue). BFS (queue) processes level by level—use for shortest path in unweighted trees, level-order operations, finding nodes closest to root.

\`\`\`python
# DFS - Find path to target (memory efficient)
def find_path(root, target, path=[]):
    if not root:
        return False
    path.append(root.val)
    if root.val == target:
        return True
    if find_path(root.left, target, path) or find_path(root.right, target, path):
        return True
    path.pop()
    return False

# BFS - Shortest path to target (level by level)
def shortest_path_bfs(root, target):
    if not root:
        return -1
    queue = deque([(root, 0)])
    while queue:
        node, depth = queue.popleft()
        if node.val == target:
            return depth
        if node.left:
            queue.append((node.left, depth + 1))
        if node.right:
            queue.append((node.right, depth + 1))
    return -1
\`\`\``
