import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const rightSideView: AlgorithmDefinition = {
  id: 'right-side-view',
  name: 'Binary Tree Right Side View',
  category: 'bfs',
  difficulty: 'Medium',
  leetcodeId: 199,
  description: 'Return values of nodes visible from the right side of tree.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  visualizationType: 'tree',

  examples: [
    {
      input: 'root = [1,2,3,null,5,null,4]',
      output: '[1,3,4]',
      explanation: 'Looking from right: see 1 (root), 3 (level 1 rightmost), 4 (level 2 rightmost).'
    },
    {
      input: 'root = [1,2,3,4]',
      output: '[1,3,4]',
      explanation: 'Node 4 is visible from right even though it\'s on the left subtree—it\'s the only node at level 2.'
    },
  ],

  education: {
    tldr: 'BFS level by level, keep only the LAST node of each level.',
    steps: [
      { title: 'Level-order BFS', description: 'Use standard level traversal', code: 'for i in range(level_size)' },
      { title: 'Track position', description: 'Check if node is last in level', code: 'if i == level_size - 1' },
      { title: 'Add rightmost', description: 'Only add when position is last', code: 'result.append(node.val)' },
    ],
    remember: [
      'Last node in each level = visible from right',
      'Alternative: DFS with depth tracking, prefer right child first',
      'Left Side View = same logic, but i == 0',
    ],
    understanding: `The right side view shows what you'd see standing to the right of the tree. At each level, only the rightmost node is visible—all others are hidden behind it.

**Key Insight**: Process level by level (BFS), and the last node processed in each level is the rightmost one.

**Alternative DFS Approach**: Visit right child first, track depth. First node seen at each depth is the rightmost.`,

    whyPatternWorks: `BFS naturally groups nodes by level. By tracking our position within each level (using the level_size snapshot), we know exactly when we've reached the rightmost node.

The check \`i == level_size - 1\` identifies the last node in the current level—which is always the rightmost one visible from that angle.`,

    keyInsights: [
      'This is level order with a filter: keep only last node per level',
      'Left side view: change condition to i == 0',
      'Zigzag view: alternate which end you keep',
      'DFS alternative: visit right first, track first-seen-at-depth',
    ]
  },

  code: `def rightSideView(root: TreeNode) -> list[int]:
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)

        for i in range(level_size):
            node = queue.popleft()

            # Last node in this level
            if i == level_size - 1:
                result.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return result`,

  inputs: [
    {
      name: 'tree',
      type: 'string',
      default: '1,2,3,null,5,null,4',
      label: 'Tree (level order)',
      placeholder: '1,2,3,null,5,null,4',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const treeStr = input.tree as string
    const treeArr = treeStr.split(',').map(s => s.trim() === 'null' ? null : parseInt(s.trim()))
    const steps: AlgorithmStep[] = []
    const result: number[] = []

    const validIndices: number[] = []
    treeArr.forEach((val, i) => {
      if (val !== null) validIndices.push(i)
    })

    const queue: number[] = [0]
    let level = 0

    steps.push({
      lineNumber: 6,
      description: 'Initialize queue with root',
      elements: [
        { type: 'array', id: 'tree', values: treeArr.filter(x => x !== null) as number[] },
      ],
      variables: { queue: `[${treeArr[0]}]` },
    })

    while (queue.length > 0 && level < 5) {
      const levelSize = queue.length

      for (let i = 0; i < levelSize; i++) {
        const nodeIdx = queue.shift()!
        const nodeVal = treeArr[nodeIdx]

        if (nodeVal !== null) {
          const isLast = i === levelSize - 1

          if (isLast) {
            result.push(nodeVal)
            steps.push({
              lineNumber: 15,
              description: `Level ${level}: ${nodeVal} is rightmost - add to result`,
              elements: [
                { type: 'array', id: 'tree', values: treeArr.filter(x => x !== null) as number[], highlights: [{ index: validIndices.indexOf(nodeIdx), style: 'found' }] },
              ],
              variables: { node: nodeVal, level, result: result.join(', ') },
            })
          } else {
            steps.push({
              lineNumber: 12,
              description: `Level ${level}: ${nodeVal} is not rightmost, skip`,
              elements: [
                { type: 'array', id: 'tree', values: treeArr.filter(x => x !== null) as number[], highlights: [{ index: validIndices.indexOf(nodeIdx), style: 'comparing' }] },
              ],
              variables: { node: nodeVal, position: i + 1, levelSize },
            })
          }

          const leftIdx = 2 * nodeIdx + 1
          const rightIdx = 2 * nodeIdx + 2

          if (leftIdx < treeArr.length && treeArr[leftIdx] !== null) {
            queue.push(leftIdx)
          }
          if (rightIdx < treeArr.length && treeArr[rightIdx] !== null) {
            queue.push(rightIdx)
          }
        }

        if (steps.length > 25) break
      }

      level++
      if (steps.length > 25) break
    }

    steps.push({
      lineNumber: 22,
      description: `Complete! Right side view: [${result.join(', ')}]`,
      elements: [
        { type: 'array', id: 'result', values: result },
      ],
      variables: { result: result.join(', ') },
      isComplete: true,
    })

    return steps
  },
}
