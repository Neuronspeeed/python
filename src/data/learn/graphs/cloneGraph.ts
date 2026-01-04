import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const cloneGraph: AlgorithmDefinition = {
  id: 'clone-graph',
  name: 'Clone Graph',
  category: 'graphs',
  difficulty: 'Medium',
  leetcodeId: 133,
  description: 'Deep copy a connected undirected graph.',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V)',
  visualizationType: 'array',

  examples: [
    {
      input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]',
      output: 'Deep copy of the 4-node graph',
      explanation: 'Each node cloned with same neighbors pointing to cloned nodes.'
    },
    {
      input: 'adjList = [[]]',
      output: 'Single node with no neighbors',
      explanation: 'Clone of a single isolated node.'
    },
  ],

  education: {
    tldr: 'DFS/BFS with hashmap: visited[original] = clone. Return clone from map if already visited.',
    steps: [
      { title: 'Check visited', description: 'If node already cloned, return its clone', code: 'if node in visited: return visited[node]' },
      { title: 'Create clone', description: 'Make new node with same value', code: 'clone = Node(node.val)' },
      { title: 'Map original→clone', description: 'Store before recursing (prevents cycles)', code: 'visited[node] = clone' },
      { title: 'Clone neighbors', description: 'Recursively clone and connect', code: 'clone.neighbors.append(dfs(neighbor))' },
    ],
    remember: [
      'HashMap: original node → cloned node',
      'Store in map BEFORE recursing (cycle protection)',
      'Return from map if already visited',
      'Works with DFS or BFS',
    ],
    understanding: `**The challenge**: Graphs can have cycles. Naive recursion would loop forever.

**Solution**: Use a hashmap to track original→clone mapping. Before recursing:
1. Check if we've already cloned this node → return existing clone
2. If not, create clone and store in map IMMEDIATELY
3. Then recurse on neighbors

**Why store before recursing?** When we encounter the same node through a cycle, it's already in the map.`,

    whyPatternWorks: `The hashmap serves two purposes:
1. **Cycle detection**: Already-visited nodes return their clone immediately
2. **Reference consistency**: All references to the same original node point to the same clone

The key insight: store clone in map BEFORE processing neighbors. This ensures cycles find their clone ready.`,

    keyInsights: [
      'Pattern: visited map stores original→clone mapping',
      'Add to map before recursing (not after)',
      'BFS alternative: queue + same map technique',
      'Similar: deep copy linked list with random pointers',
    ]
  },

  code: `def cloneGraph(node: 'Node') -> 'Node':
    if not node:
        return None

    visited = {}

    def dfs(node):
        if node in visited:
            return visited[node]

        clone = Node(node.val)
        visited[node] = clone

        for neighbor in node.neighbors:
            clone.neighbors.append(dfs(neighbor))

        return clone

    return dfs(node)`,

  inputs: [
    {
      name: 'adjList',
      type: 'string',
      default: '2,4|1,3|2,4|1,3',
      label: 'Adjacency list (neighbors of each node)',
      placeholder: '2,4|1,3|2,4|1,3',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const adjStr = input.adjList as string
    const adjList = adjStr.split('|').map(s =>
      s.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    )
    const steps: AlgorithmStep[] = []

    steps.push({
      lineNumber: 5,
      description: 'Start DFS clone from node 1',
      elements: [
        { type: 'array', id: 'nodes', values: adjList.map((_, i) => i + 1) },
      ],
      variables: { startNode: 1, visited: {} },
    })

    const visited = new Set<number>()
    const cloned = new Map<number, number>()
    const order: number[] = []

    const dfs = (nodeIdx: number) => {
      if (visited.has(nodeIdx) || steps.length >= 20) return

      visited.add(nodeIdx)
      cloned.set(nodeIdx, nodeIdx)
      order.push(nodeIdx)

      steps.push({
        lineNumber: 11,
        description: `Clone node ${nodeIdx + 1}`,
        elements: [
          { type: 'array', id: 'nodes', values: adjList.map((_, i) => i + 1), styles: adjList.map((_, i) => visited.has(i) ? 'found' as const : 'default' as const) },
          { type: 'array', id: 'cloned', values: [...order].map(i => i + 1), styles: order.map(() => 'found' as const) },
        ],
        variables: { node: nodeIdx + 1, clonedCount: cloned.size },
      })

      for (const neighbor of adjList[nodeIdx]) {
        if (!visited.has(neighbor - 1)) {
          steps.push({
            lineNumber: 14,
            description: `Visit neighbor ${neighbor} from node ${nodeIdx + 1}`,
            elements: [
              { type: 'array', id: 'nodes', values: adjList.map((_, i) => i + 1), pointers: [{ index: neighbor - 1, label: 'next', color: '#3B82F6' }] },
            ],
            variables: { from: nodeIdx + 1, to: neighbor },
          })
          dfs(neighbor - 1)
        }
      }
    }

    if (adjList.length > 0) {
      dfs(0)
    }

    steps.push({
      lineNumber: 18,
      description: `Complete! Cloned ${cloned.size} nodes`,
      elements: [
        { type: 'array', id: 'cloned', values: [...order].map(i => i + 1), styles: order.map(() => 'found' as const) },
      ],
      variables: { clonedNodes: cloned.size },
      isComplete: true,
    })

    return steps
  },
}
