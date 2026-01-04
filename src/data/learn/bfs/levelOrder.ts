import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const levelOrder: AlgorithmDefinition = {
  id: 'level-order-traversal',
  name: 'Binary Tree Level Order Traversal',
  category: 'bfs',
  difficulty: 'Medium',
  leetcodeId: 102,
  description: 'Traverse binary tree level by level, returning values grouped by level.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  visualizationType: 'tree',

  examples: [
    {
      input: 'root = [3,9,20,null,null,15,7]',
      output: '[[3],[9,20],[15,7]]',
      explanation: 'Level 0: root (3). Level 1: children (9,20). Level 2: grandchildren (15,7).'
    },
    {
      input: 'root = [1]',
      output: '[[1]]',
      explanation: 'Single node tree has one level with one element.'
    },
  ],

  education: {
    tldr: 'Use queue + level_size trick: snapshot queue size before processing each level.',
    steps: [
      { title: 'Initialize queue', description: 'Start with root in queue', code: 'queue = deque([root])' },
      { title: 'Snapshot level size', description: 'BEFORE loop, save queue.size()', code: 'level_size = len(queue)' },
      { title: 'Process level', description: 'Pop exactly level_size nodes', code: 'for _ in range(level_size)' },
      { title: 'Add children', description: 'Enqueue left and right children', code: 'queue.append(node.left)' },
    ],
    remember: [
      'Queue = FIFO = perfect for BFS',
      'Snapshot size BEFORE the loop',
      'Process exactly level_size nodes per level',
      'Children added during loop appear in NEXT level',
    ],
    understanding: `BFS explores nodes level by level, like ripples in water. The queue ensures we visit nodes in the order they were discovered.

**The Level Size Trick**: Before processing a level, snapshot the queue size. This tells you how many nodes belong to the current level. Nodes added during processing belong to the next level.

**Why Queue?** FIFO (First In, First Out) guarantees nodes discovered first are processed first—exactly what we need for level-by-level traversal.`,

    whyPatternWorks: `The queue naturally separates levels because:
1. All nodes at level N are in the queue before we start processing level N
2. We only dequeue level_size nodes (the snapshot)
3. Children (level N+1) are added to the END of the queue
4. After processing, only level N+1 nodes remain

This creates a perfect "wave" effect—each level completes before the next begins.`,

    keyInsights: [
      'level_size snapshot is the key insight—memorize this pattern',
      'BFS = Queue, DFS = Stack (or recursion)',
      'O(n) time because we visit each node exactly once',
      'O(n) space in worst case (last level can have n/2 nodes)',
    ]
  },

  code: `def levelOrder(root: TreeNode) -> list[list[int]]:
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

    return result`,

  inputs: [
    {
      name: 'tree',
      type: 'string',
      default: '3,9,20,null,null,15,7',
      label: 'Tree (level order)',
      placeholder: '3,9,20,null,null,15,7',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const treeStr = input.tree as string
    const treeArr = treeStr.split(',').map(s => s.trim() === 'null' ? null : parseInt(s.trim()))
    const steps: AlgorithmStep[] = []
    const result: number[][] = []

    // Build tree indices for non-null nodes
    const validIndices: number[] = []
    treeArr.forEach((val, i) => {
      if (val !== null) validIndices.push(i)
    })

    const queue: number[] = [0]
    let level = 0

    steps.push({
      lineNumber: 6,
      description: 'Initialize queue with root node',
      elements: [
        { type: 'array', id: 'tree', values: treeArr.filter(x => x !== null) as number[], highlights: [{ index: 0, style: 'active' }] },
      ],
      variables: { queue: `[${treeArr[0]}]`, level: 0 },
    })

    while (queue.length > 0 && level < 5) {
      const levelSize = queue.length
      const levelVals: number[] = []

      steps.push({
        lineNumber: 9,
        description: `Level ${level}: ${levelSize} node(s) to process`,
        elements: [
          { type: 'array', id: 'tree', values: treeArr.filter(x => x !== null) as number[] },
        ],
        variables: { level, levelSize },
      })

      for (let i = 0; i < levelSize; i++) {
        const nodeIdx = queue.shift()!
        const nodeVal = treeArr[nodeIdx]

        if (nodeVal !== null) {
          levelVals.push(nodeVal)

          steps.push({
            lineNumber: 13,
            description: `Dequeue ${nodeVal}, add to level ${level}`,
            elements: [
              { type: 'array', id: 'tree', values: treeArr.filter(x => x !== null) as number[], highlights: [{ index: validIndices.indexOf(nodeIdx), style: 'found' }] },
            ],
            variables: { node: nodeVal, levelValues: levelVals },
          })

          // Add children
          const leftIdx = 2 * nodeIdx + 1
          const rightIdx = 2 * nodeIdx + 2

          if (leftIdx < treeArr.length && treeArr[leftIdx] !== null) {
            queue.push(leftIdx)
          }
          if (rightIdx < treeArr.length && treeArr[rightIdx] !== null) {
            queue.push(rightIdx)
          }
        }

        if (steps.length > 30) break
      }

      result.push(levelVals)

      steps.push({
        lineNumber: 20,
        description: `Level ${level} complete: [${levelVals.join(', ')}]`,
        elements: [
          { type: 'array', id: 'level', values: levelVals },
        ],
        variables: { level, levelValues: levelVals, queueSize: queue.length },
      })

      level++
      if (steps.length > 30) break
    }

    steps.push({
      lineNumber: 22,
      description: `Complete! ${result.length} levels`,
      elements: [
        { type: 'array', id: 'tree', values: treeArr.filter(x => x !== null) as number[] },
      ],
      variables: { result: result.map(l => `[${l.join(',')}]`).join(', ') },
      isComplete: true,
    })

    return steps
  },
}
