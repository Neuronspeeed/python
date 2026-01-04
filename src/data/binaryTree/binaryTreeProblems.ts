import type { Method } from '../../types'

// Common Binary Tree Problems (index 10-17)
export const binaryTreeProblemsMethods: Method[] = [
  { section: 'Common Problems', signature: 'Same Tree', description: 'Check if two trees are identical.', complexity: 'O(n)', example: `def is_same_tree(p, q):
    if not p and not q:
        return True
    if not p or not q:
        return False
    return (p.val == q.val and
            is_same_tree(p.left, q.left) and
            is_same_tree(p.right, q.right))

# Iterative with stack
def is_same_tree_iter(p, q):
    stack = [(p, q)]
    while stack:
        n1, n2 = stack.pop()
        if not n1 and not n2:
            continue
        if not n1 or not n2:
            return False
        if n1.val != n2.val:
            return False
        stack.append((n1.left, n2.left))
        stack.append((n1.right, n2.right))
    return True` },
  { section: 'Common Problems', signature: 'Symmetric Tree', description: 'Check if tree is mirror of itself.', complexity: 'O(n)', example: `def is_symmetric(root):
    def is_mirror(t1, t2):
        if not t1 and not t2:
            return True
        if not t1 or not t2:
            return False
        return (t1.val == t2.val and
                is_mirror(t1.left, t2.right) and
                is_mirror(t1.right, t2.left))

    return is_mirror(root, root)

# Iterative with queue
def is_symmetric_iter(root):
    from collections import deque
    queue = deque([(root, root)])
    while queue:
        t1, t2 = queue.popleft()
        if not t1 and not t2:
            continue
        if not t1 or not t2:
            return False
        if t1.val != t2.val:
            return False
        queue.append((t1.left, t2.right))
        queue.append((t1.right, t2.left))
    return True` },
  { section: 'Common Problems', signature: 'Invert Binary Tree', description: 'Swap left and right children recursively.', complexity: 'O(n)', example: `def invert_tree(root):
    if not root:
        return None

    # Swap children
    root.left, root.right = root.right, root.left

    # Recurse
    invert_tree(root.left)
    invert_tree(root.right)

    return root

# Iterative BFS
def invert_tree_bfs(root):
    if not root:
        return None
    from collections import deque
    queue = deque([root])
    while queue:
        node = queue.popleft()
        node.left, node.right = node.right, node.left
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return root` },
  { section: 'Common Problems', signature: 'Path Sum', description: 'Check if path from root to leaf sums to target.', complexity: 'O(n)', example: `def has_path_sum(root, target_sum):
    if not root:
        return False

    # Is leaf with correct sum?
    if not root.left and not root.right:
        return root.val == target_sum

    # Check children with remaining sum
    remaining = target_sum - root.val
    return (has_path_sum(root.left, remaining) or
            has_path_sum(root.right, remaining))

# All paths that sum to target
def path_sum_all(root, target_sum):
    result = []

    def dfs(node, path, remaining):
        if not node:
            return
        path.append(node.val)
        if not node.left and not node.right and remaining == node.val:
            result.append(path[:])
        dfs(node.left, path, remaining - node.val)
        dfs(node.right, path, remaining - node.val)
        path.pop()

    dfs(root, [], target_sum)
    return result` },
  { section: 'Common Problems', signature: 'Lowest Common Ancestor', description: 'Find deepest node that is ancestor of both p and q.', complexity: 'O(n)', example: `def lowest_common_ancestor(root, p, q):
    if not root:
        return None

    # Found one of the nodes
    if root == p or root == q:
        return root

    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)

    # Both found in different subtrees -> root is LCA
    if left and right:
        return root

    # Both found in same subtree
    return left if left else right

# For BST (use values to guide search)
def lca_bst(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root` },
  { section: 'Common Problems', signature: 'Validate BST', description: 'Check if tree is valid Binary Search Tree. Track valid range.', complexity: 'O(n)', example: `def is_valid_bst(root):
    def validate(node, min_val, max_val):
        if not node:
            return True
        if node.val <= min_val or node.val >= max_val:
            return False
        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))

    return validate(root, float('-inf'), float('inf'))

# Inorder traversal (should be sorted)
def is_valid_bst_inorder(root):
    prev = float('-inf')
    stack = []
    curr = root

    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        if curr.val <= prev:
            return False
        prev = curr.val
        curr = curr.right

    return True` },
  { section: 'Common Problems', signature: 'Serialize and Deserialize', description: 'Convert tree to string and back. Use preorder with null markers.', complexity: 'O(n)', example: `class Codec:
    def serialize(self, root):
        result = []

        def preorder(node):
            if not node:
                result.append("N")
                return
            result.append(str(node.val))
            preorder(node.left)
            preorder(node.right)

        preorder(root)
        return ",".join(result)

    def deserialize(self, data):
        values = data.split(",")
        self.idx = 0

        def build():
            if values[self.idx] == "N":
                self.idx += 1
                return None
            node = TreeNode(int(values[self.idx]))
            self.idx += 1
            node.left = build()
            node.right = build()
            return node

        return build()

# Example: "1,2,N,N,3,4,N,N,5,N,N"` },
  { section: 'Common Problems', signature: 'Diameter of Binary Tree', description: 'Longest path between any two nodes. May not pass through root.', complexity: 'O(n)', example: `def diameter_of_binary_tree(root):
    diameter = 0

    def height(node):
        nonlocal diameter
        if not node:
            return 0

        left = height(node.left)
        right = height(node.right)

        # Diameter through this node
        diameter = max(diameter, left + right)

        return 1 + max(left, right)

    height(root)
    return diameter

# The diameter is the number of EDGES
# If you want number of nodes: diameter + 1` },
]
