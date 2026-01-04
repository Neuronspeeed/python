import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const pathSum: AlgorithmDefinition = {
  id: 'path-sum',
  name: 'Path Sum',
  category: 'dfs',
  difficulty: 'Easy',
  leetcodeId: 112,
  description: 'Determine if tree has a root-to-leaf path with given sum.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h)',
  visualizationType: 'tree',

  examples: [
    {
      input: 'root = [5,4,8,11,null,13,4,7,2], targetSum = 22',
      output: 'true',
      explanation: 'Path 5→4→11→2 sums to 22.'
    },
    {
      input: 'root = [1,2,3], targetSum = 5',
      output: 'false',
      explanation: 'No root-to-leaf path sums to 5. Path 1→2=3, Path 1→3=4.'
    },
  ],

  education: {
    tldr: 'Subtract current value from target, check if leaf with remaining=0.',
    steps: [
      { title: 'Base case (null)', description: 'Empty node → false', code: 'if not root: return False' },
      { title: 'Leaf check', description: 'Is this a leaf with exact remaining?', code: 'if leaf and val == target: return True' },
      { title: 'Subtract & recurse', description: 'Try left and right with reduced target', code: 'return dfs(left, target-val) or dfs(right, target-val)' },
    ],
    remember: [
      'Must be ROOT-TO-LEAF (not just any path)',
      'Subtract as you go, check target=val at leaf',
      'Use OR: if either child works, return true',
      'Leaf = no left AND no right child',
    ],
    understanding: `This is a **pass-down DFS**: we pass information (remaining sum) from parent to child.

**Key Insight**: Instead of tracking running sum, subtract from target. At a leaf, check if remaining equals the leaf value.

**Why check leaf?** The path must end at a leaf. An internal node matching the sum doesn't count—we must reach the bottom.`,

    whyPatternWorks: `By subtracting each node's value from the target:
1. We reduce the problem size at each step
2. At a leaf, the check becomes simple: does this value equal what's left?
3. The OR short-circuits: if left subtree finds a path, we don't check right

This "subtract as you go" pattern avoids tracking the path explicitly.`,

    keyInsights: [
      'Pass-down pattern: carry info from root toward leaves',
      'Subtract instead of sum—simpler leaf check',
      'Path Sum II: collect all paths (use backtracking)',
      'Path Sum III: any path (use prefix sum)',
    ]
  },

  code: `def hasPathSum(root: TreeNode, targetSum: int) -> bool:
    if not root:
        return False

    # Check if leaf node
    if not root.left and not root.right:
        return root.val == targetSum

    # Recurse with remaining sum
    remaining = targetSum - root.val
    return (hasPathSum(root.left, remaining) or
            hasPathSum(root.right, remaining))`,

  inputs: [
    {
      name: 'tree',
      type: 'string',
      default: '5,4,8,11,null,13,4,7,2,null,null,null,1',
      label: 'Tree (level order)',
      placeholder: '5,4,8,11,null,13,4,7,2',
    },
    {
      name: 'targetSum',
      type: 'number',
      default: 22,
      label: 'Target Sum',
      placeholder: '22',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const treeStr = input.tree as string
    const treeArr = treeStr.split(',').map(s => s.trim() === 'null' ? null : parseInt(s.trim()))
    const targetSum = input.targetSum as number
    const steps: AlgorithmStep[] = []

    const dfs = (i: number, currentSum: number, path: number[]): boolean => {
      if (i >= treeArr.length || treeArr[i] === null) {
        return false
      }

      const nodeVal = treeArr[i] as number
      const newSum = currentSum + nodeVal
      const newPath = [...path, nodeVal]

      const leftIdx = 2 * i + 1
      const rightIdx = 2 * i + 2
      const isLeaf = (leftIdx >= treeArr.length || treeArr[leftIdx] === null) &&
                     (rightIdx >= treeArr.length || treeArr[rightIdx] === null)

      steps.push({
        lineNumber: 5,
        description: `Visit ${nodeVal}, current sum = ${newSum}${isLeaf ? ' (leaf)' : ''}`,
        elements: [
          { type: 'array', id: 'path', values: newPath },
        ],
        variables: { node: nodeVal, currentSum: newSum, remaining: targetSum - newSum, isLeaf },
      })

      if (isLeaf) {
        if (newSum === targetSum) {
          steps.push({
            lineNumber: 7,
            description: `Leaf node ${nodeVal}: sum ${newSum} == target ${targetSum}! Found path!`,
            elements: [
              { type: 'array', id: 'path', values: newPath, highlights: newPath.map((_, j) => ({ index: j, style: 'found' as const })) },
            ],
            variables: { path: newPath, sum: newSum, result: true },
          })
          return true
        }
        steps.push({
          lineNumber: 7,
          description: `Leaf node ${nodeVal}: sum ${newSum} != target ${targetSum}, backtrack`,
          elements: [
            { type: 'array', id: 'path', values: newPath, highlights: [{ index: newPath.length - 1, style: 'comparing' }] },
          ],
          variables: { path: newPath, sum: newSum, result: false },
        })
        return false
      }

      if (steps.length > 35) return false

      const leftResult = dfs(leftIdx, newSum, newPath)
      if (leftResult) return true

      return dfs(rightIdx, newSum, newPath)
    }

    const result = dfs(0, 0, [])

    steps.push({
      lineNumber: 11,
      description: result ? `Found path with sum ${targetSum}!` : `No path found with sum ${targetSum}`,
      elements: [
        { type: 'array', id: 'tree', values: treeArr.filter(x => x !== null) as number[] },
      ],
      variables: { result, targetSum },
      isComplete: true,
    })

    return steps
  },
}
