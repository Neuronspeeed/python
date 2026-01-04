import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const swapNodesInPairs: AlgorithmDefinition = {
  id: 'swap-nodes-in-pairs',
  name: 'Swap Nodes in Pairs',
  category: 'linkedList',
  difficulty: 'Medium',
  leetcodeId: 24,
  description: 'Swap every two adjacent nodes in a linked list.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'linkedList',

  examples: [
    {
      input: 'head = [1,2,3,4]',
      output: '[2,1,4,3]',
      explanation: 'Swap pairs: (1,2)→(2,1) and (3,4)→(4,3).'
    },
    {
      input: 'head = []',
      output: '[]',
      explanation: 'Empty list stays empty.'
    },
    {
      input: 'head = [1]',
      output: '[1]',
      explanation: 'Single node has no pair to swap with.'
    },
    {
      input: 'head = [1,2,3]',
      output: '[2,1,3]',
      explanation: 'Odd length: swap first pair, last node stays.'
    },
  ],

  education: {
    tldr: 'Use dummy node. For each pair: rewire prev→second→first→next.',
    steps: [
      { title: 'Create dummy', description: 'Points to head, handles edge cases', code: 'dummy = ListNode(0, head)' },
      { title: 'Get pair', description: 'first = prev.next, second = first.next', code: 'first, second = prev.next, prev.next.next' },
      { title: 'Rewire', description: 'prev→second, second→first, first→rest', code: 'prev.next = second; first.next = second.next; second.next = first' },
      { title: 'Advance', description: 'Move prev to first (now second in swapped order)', code: 'prev = first' },
    ],
    remember: [
      'Dummy node simplifies first swap',
      'Need prev pointer for rewiring',
      'Three pointer updates per swap',
    ],
    understanding: `The trick is tracking the right pointers. For each pair (A→B), we need to make (B→A).

**But there's a catch:** We also need to update the previous node's pointer. That's why we track \`prev\`.

**The rewiring:**
\`\`\`
Before: prev → A → B → C
After:  prev → B → A → C
\`\`\`

**Three steps:**
1. prev.next = B (skip A)
2. A.next = C (skip B)
3. B.next = A (insert A after B)`,

    whyPatternWorks: `Using a dummy node means we don't special-case the head:

\`\`\`
dummy → 1 → 2 → 3 → 4
  ↓
prev = dummy
first = 1, second = 2

After swap:
dummy → 2 → 1 → 3 → 4

Move prev to 1, repeat for (3,4)
\`\`\`

The dummy node becomes the new "head" container—return dummy.next.`,

    keyInsights: [
      'Dummy node handles head swap',
      'prev pointer required for rewiring',
      'Three pointer reassignments per pair',
      'Odd nodes: last one stays in place',
      'Can also solve recursively'
    ]
  },

  code: `def swapPairs(head: ListNode) -> ListNode:
    dummy = ListNode(0, head)
    prev = dummy

    while prev.next and prev.next.next:
        first = prev.next
        second = first.next

        # Swap
        prev.next = second
        first.next = second.next
        second.next = first

        # Move to next pair
        prev = first

    return dummy.next`,

  inputs: [
    {
      name: 'values',
      type: 'string',
      default: '1,2,3,4',
      label: 'List Values',
      placeholder: '1,2,3,4',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const valuesStr = input.values as string
    const values = valuesStr.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    const steps: AlgorithmStep[] = []

    if (values.length < 2) {
      steps.push({
        lineNumber: 1,
        description: values.length === 0 ? 'Empty list' : 'Single node, no swap needed',
        elements: [{ type: 'array', id: 'list', values: [...values] }],
        variables: { result: values },
        isComplete: true,
      })
      return steps
    }

    const arr = [0, ...values] // Include dummy

    steps.push({
      lineNumber: 2,
      description: 'Create dummy node, prev points to dummy',
      elements: [
        { type: 'array', id: 'list', values: [...arr], pointers: [{ index: 0, label: 'prev', color: '#3B82F6' }] },
      ],
      variables: { dummy: 'D', prev: 0 },
    })

    let prev = 0
    while (prev + 2 < arr.length && steps.length < 20) {
      const first = prev + 1
      const second = prev + 2

      steps.push({
        lineNumber: 5,
        description: `Pair found: first=${arr[first]}, second=${arr[second]}`,
        elements: [
          { type: 'array', id: 'list', values: [...arr], pointers: [
            { index: prev, label: 'prev', color: '#3B82F6' },
            { index: first, label: 'first', color: '#EF4444' },
            { index: second, label: 'second', color: '#10B981' },
          ]},
        ],
        variables: { first: arr[first], second: arr[second] },
      })

      // Perform swap in array
      const temp = arr[first]
      arr[first] = arr[second]
      arr[second] = temp

      steps.push({
        lineNumber: 9,
        description: `Swapped: ${arr[first]} ↔ ${arr[second]}`,
        elements: [
          { type: 'array', id: 'list', values: [...arr], styles: arr.map((_, i) =>
            i === first || i === second ? 'found' as const : 'default' as const
          )},
        ],
        variables: { swapped: [arr[first], arr[second]] },
      })

      prev = second // Move to next pair
    }

    steps.push({
      lineNumber: 14,
      description: `Complete! Result: ${arr.slice(1).join(' → ')}`,
      elements: [
        { type: 'array', id: 'result', values: arr.slice(1), styles: arr.slice(1).map(() => 'found' as const) },
      ],
      variables: { result: arr.slice(1) },
      isComplete: true,
    })

    return steps
  },
}
