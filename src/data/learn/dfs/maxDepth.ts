import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const maxDepth: AlgorithmDefinition = {
  id: 'max-depth-binary-tree',
  name: 'Maximum Depth of Binary Tree',
  category: 'dfs',
  difficulty: 'Easy',
  leetcodeId: 104,
  description: 'Find the maximum depth (height) of a binary tree using DFS.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h)',
  visualizationType: 'tree',

  examples: [
    {
      input: 'root = [3,9,20,null,null,15,7]',
      output: '3',
      explanation: 'Root (depth 1) → 20 (depth 2) → 15 or 7 (depth 3). Max depth = 3.'
    },
    {
      input: 'root = [1,null,2]',
      output: '2',
      explanation: 'Skewed tree: 1 → 2. Two levels deep.'
    },
  ],

  education: {
    tldr: 'Return 1 + max(left_depth, right_depth). Base case: null → 0.',
    steps: [
      { title: 'Base case', description: 'Empty node has depth 0', code: 'if not root: return 0' },
      { title: 'Recurse left', description: 'Get left subtree depth', code: 'left = maxDepth(root.left)' },
      { title: 'Recurse right', description: 'Get right subtree depth', code: 'right = maxDepth(root.right)' },
      { title: 'Combine', description: 'Add 1 for current node', code: 'return 1 + max(left, right)' },
    ],
    remember: [
      'Depth = edges from root (or nodes, depending on definition)',
      'Base case: null → 0',
      'Each node adds 1 to the max of its children',
      'Post-order: children first, then combine',
    ],
    understanding: `This is the simplest DFS pattern: compute something for children, then combine with current node.

**Post-order traversal**: We need children's depths before computing our own. So we recurse first (left, right), then combine (1 + max).

**Base case**: An empty subtree contributes 0 depth. This anchors our recursion.`,

    whyPatternWorks: `The depth of a node is 1 (itself) plus the maximum depth of its subtrees. By recursively computing children's depths and taking the max, we propagate the deepest path back up to the root.

This is a **return value DFS**: each call returns useful information (depth) to its parent.`,

    keyInsights: [
      'Simplest DFS pattern—great for learning recursion',
      'Post-order: process children before parent',
      'Similar problems: min depth, balanced tree check',
      'Iterative version uses stack with (node, depth) pairs',
    ]
  },

  code: `def maxDepth(root: TreeNode) -> int:
    if not root:
        return 0

    left_depth = maxDepth(root.left)
    right_depth = maxDepth(root.right)

    return 1 + max(left_depth, right_depth)`,

  inputs: [
    {
      name: 'tree',
      type: 'string',
      default: '3,9,20,null,null,15,7',
      label: 'Tree (level order, null for empty)',
      placeholder: '3,9,20,null,null,15,7',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const treeStr = input.tree as string
    const treeArr = treeStr.split(',').map(s => s.trim() === 'null' ? null : parseInt(s.trim()))
    const steps: AlgorithmStep[] = []

    // Create tree nodes for visualization
    const createTreeNodes = (highlight?: { index: number; style: 'active' | 'found' | 'visited' }) => {
      return treeArr.map((val, idx) => {
        if (val === null) return null
        return {
          value: val,
          style: highlight?.index === idx ? highlight.style : 'default' as const
        }
      })
    }

    // DFS to calculate depth with visualization steps
    const dfs = (i: number, depth: number): number => {
      if (i >= treeArr.length || treeArr[i] === null) {
        return 0
      }

      const nodeVal = treeArr[i]

      steps.push({
        lineNumber: 5,
        description: `Visit node ${nodeVal} at depth ${depth}, explore left subtree`,
        elements: [
          { type: 'tree', id: 'tree', nodes: createTreeNodes({ index: i, style: 'active' }) },
        ],
        variables: { node: nodeVal, depth },
      })

      const leftDepth = dfs(2 * i + 1, depth + 1)

      steps.push({
        lineNumber: 6,
        description: `Node ${nodeVal}: left depth = ${leftDepth}, explore right`,
        elements: [
          { type: 'tree', id: 'tree', nodes: createTreeNodes({ index: i, style: 'found' }) },
        ],
        variables: { node: nodeVal, left_depth: leftDepth },
      })

      const rightDepth = dfs(2 * i + 2, depth + 1)

      const maxD = 1 + Math.max(leftDepth, rightDepth)

      steps.push({
        lineNumber: 8,
        description: `Node ${nodeVal}: 1 + max(${leftDepth}, ${rightDepth}) = ${maxD}`,
        elements: [
          { type: 'tree', id: 'tree', nodes: createTreeNodes({ index: i, style: 'found' }) },
        ],
        variables: { node: nodeVal, left_depth: leftDepth, right_depth: rightDepth, maxDepth: maxD },
      })

      if (steps.length > 30) return maxD
      return maxD
    }

    const result = dfs(0, 1)

    steps.push({
      lineNumber: 8,
      description: `Complete! Maximum depth = ${result}`,
      elements: [
        { type: 'tree', id: 'tree', nodes: createTreeNodes() },
      ],
      variables: { result },
      isComplete: true,
    })

    return steps
  },
}
