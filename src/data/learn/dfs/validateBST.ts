import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const validateBST: AlgorithmDefinition = {
  id: 'validate-bst',
  name: 'Validate Binary Search Tree',
  category: 'dfs',
  difficulty: 'Medium',
  leetcodeId: 98,
  description: 'Determine if a binary tree is a valid BST.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h)',
  visualizationType: 'tree',

  examples: [
    {
      input: 'root = [2,1,3]',
      output: 'true',
      explanation: '1 < 2 < 3. Left child smaller, right child larger. Valid BST.'
    },
    {
      input: 'root = [5,1,4,null,null,3,6]',
      output: 'false',
      explanation: 'Node 3 is in right subtree of 5 but 3 < 5. Invalid!'
    },
  ],

  education: {
    tldr: 'Pass valid range (min, max) down. Each node must be within its range.',
    steps: [
      { title: 'Init range', description: 'Root can be anything', code: 'validate(root, -inf, +inf)' },
      { title: 'Check range', description: 'Node must be in (min, max)', code: 'if val <= min or val >= max: return False' },
      { title: 'Narrow for left', description: 'Left child max becomes current val', code: 'validate(left, min, node.val)' },
      { title: 'Narrow for right', description: 'Right child min becomes current val', code: 'validate(right, node.val, max)' },
    ],
    remember: [
      'Pass RANGE, not just parent value',
      'Left child: update MAX to parent value',
      'Right child: update MIN to parent value',
      'Use strict inequality: val < max, not val <= max',
    ],
    understanding: `The trap: comparing only with direct parent. A node in the right subtree must be greater than ALL ancestors on its path, not just its parent.

**Key Insight**: Pass a valid range (min, max) down the tree. Each node narrows the range for its children:
- Left child's range: (current min, parent value)
- Right child's range: (parent value, current max)

**Why range?** The range accumulates constraints from all ancestors.`,

    whyPatternWorks: `Each node acts as a "constraint" on its subtrees:
- All left descendants must be < this node
- All right descendants must be > this node

By passing ranges, we propagate these constraints down. If any node violates its range, the tree is invalid.

Alternative: In-order traversal should produce sorted sequence.`,

    keyInsights: [
      'Classic trap: checking only direct parent',
      'Range approach: pass (min, max) constraints down',
      'Alternative: in-order traversal gives sorted output for valid BST',
      'Edge case: duplicates—use strict inequality',
    ]
  },

  code: `def isValidBST(root: TreeNode) -> bool:
    def validate(node, min_val, max_val):
        if not node:
            return True

        if node.val <= min_val or node.val >= max_val:
            return False

        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))

    return validate(root, float('-inf'), float('inf'))`,

  inputs: [
    {
      name: 'tree',
      type: 'string',
      default: '5,1,7,null,null,6,8',
      label: 'Tree (level order)',
      placeholder: '5,1,7,null,null,6,8',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const treeStr = input.tree as string
    const treeArr = treeStr.split(',').map(s => s.trim() === 'null' ? null : parseInt(s.trim()))
    const steps: AlgorithmStep[] = []

    const validate = (i: number, minVal: number, maxVal: number): boolean => {
      if (i >= treeArr.length || treeArr[i] === null) {
        return true
      }

      const nodeVal = treeArr[i] as number

      steps.push({
        lineNumber: 6,
        description: `Check node ${nodeVal}: must be in (${minVal === -Infinity ? '-∞' : minVal}, ${maxVal === Infinity ? '∞' : maxVal})`,
        elements: [
          { type: 'array', id: 'tree', values: treeArr.filter(x => x !== null) as number[], highlights: [{ index: treeArr.slice(0, i + 1).filter(x => x !== null).length - 1, style: 'active' }] },
        ],
        variables: { node: nodeVal, min: minVal === -Infinity ? '-∞' : minVal, max: maxVal === Infinity ? '∞' : maxVal },
      })

      if (nodeVal <= minVal || nodeVal >= maxVal) {
        steps.push({
          lineNumber: 7,
          description: `INVALID! ${nodeVal} is not in range (${minVal === -Infinity ? '-∞' : minVal}, ${maxVal === Infinity ? '∞' : maxVal})`,
          elements: [
            { type: 'array', id: 'tree', values: treeArr.filter(x => x !== null) as number[], highlights: [{ index: treeArr.slice(0, i + 1).filter(x => x !== null).length - 1, style: 'comparing' }] },
          ],
          variables: { node: nodeVal, valid: false },
        })
        return false
      }

      steps.push({
        lineNumber: 9,
        description: `${nodeVal} is valid, check left subtree (min=${minVal === -Infinity ? '-∞' : minVal}, max=${nodeVal})`,
        elements: [
          { type: 'array', id: 'tree', values: treeArr.filter(x => x !== null) as number[], highlights: [{ index: treeArr.slice(0, i + 1).filter(x => x !== null).length - 1, style: 'found' }] },
        ],
        variables: { node: nodeVal, checking: 'left' },
      })

      if (steps.length > 30) return true

      const leftValid = validate(2 * i + 1, minVal, nodeVal)
      if (!leftValid) return false

      steps.push({
        lineNumber: 10,
        description: `Left subtree of ${nodeVal} valid, check right (min=${nodeVal}, max=${maxVal === Infinity ? '∞' : maxVal})`,
        elements: [
          { type: 'array', id: 'tree', values: treeArr.filter(x => x !== null) as number[], highlights: [{ index: treeArr.slice(0, i + 1).filter(x => x !== null).length - 1, style: 'found' }] },
        ],
        variables: { node: nodeVal, checking: 'right' },
      })

      return validate(2 * i + 2, nodeVal, maxVal)
    }

    const result = validate(0, -Infinity, Infinity)

    steps.push({
      lineNumber: 12,
      description: result ? 'Valid BST!' : 'Not a valid BST',
      elements: [
        { type: 'array', id: 'tree', values: treeArr.filter(x => x !== null) as number[] },
      ],
      variables: { result },
      isComplete: true,
    })

    return steps
  },
}
