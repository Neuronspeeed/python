import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const removeNthFromEnd: AlgorithmDefinition = {
  id: 'remove-nth-from-end',
  name: 'Remove Nth From End',
  category: 'linkedList',
  difficulty: 'Medium',
  leetcodeId: 19,
  description: 'Remove the nth node from the end of the list.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'linkedList',

  examples: [
    {
      input: 'head = [1,2,3,4,5], n = 2',
      output: '[1,2,3,5]',
      explanation: 'Remove 4 (2nd from end). Result: 1→2→3→5.'
    },
    {
      input: 'head = [1], n = 1',
      output: '[]',
      explanation: 'Remove only node, list becomes empty.'
    },
    {
      input: 'head = [1,2], n = 1',
      output: '[1]',
      explanation: 'Remove last node (1st from end).'
    },
  ],

  education: {
    tldr: 'Two pointers n+1 apart. When fast hits end, slow is just before target.',
    steps: [
      { title: 'Add dummy node', description: 'Handles edge case of removing head', code: 'dummy = ListNode(0, head)' },
      { title: 'Move fast n+1 ahead', description: 'Create gap of n+1 nodes', code: 'for _ in range(n+1): fast = fast.next' },
      { title: 'Move both to end', description: 'Maintain the gap', code: 'while fast: both move' },
      { title: 'Remove target', description: 'Skip the node after slow', code: 'slow.next = slow.next.next' },
    ],
    remember: [
      'Dummy node before head',
      'Fast moves n+1 ahead (not n)',
      'Slow ends at node BEFORE target',
    ],
    understanding: `This is a one-pass solution using the "two pointers with fixed gap" pattern.

**Why n+1?** We want slow to stop at the node BEFORE the one to delete. The gap of n+1 ensures this.

**Why dummy node?** If we're deleting the head (n = length), slow needs to be at dummy to set dummy.next = head.next.

**Key insight:** When fast reaches null, slow is exactly n+1 nodes behind—right before the target.`,

    whyPatternWorks: `The gap maintains the distance:

\`\`\`
[D] → [1] → [2] → [3] → [4] → [5] → null
 ↑                             ↑
slow                          fast (after n+1=3 moves for n=2)

Move both until fast = null:
[D] → [1] → [2] → [3] → [4] → [5] → null
                   ↑                  ↑
                  slow               fast

Now slow.next = [4] = target. Delete it!
\`\`\``,

    keyInsights: [
      'One pass with two pointers',
      'Gap of n+1 positions slow before target',
      'Dummy node handles head removal',
      'slow.next = slow.next.next removes target',
      'O(1) space, O(n) time'
    ]
  },

  code: `def removeNthFromEnd(head: ListNode, n: int) -> ListNode:
    dummy = ListNode(0, head)
    slow = fast = dummy

    # Move fast n+1 steps ahead
    for _ in range(n + 1):
        fast = fast.next

    # Move both until fast reaches end
    while fast:
        slow = slow.next
        fast = fast.next

    # Remove the node
    slow.next = slow.next.next
    return dummy.next`,

  inputs: [
    {
      name: 'values',
      type: 'string',
      default: '1,2,3,4,5',
      label: 'List Values',
      placeholder: '1,2,3,4,5',
    },
    {
      name: 'n',
      type: 'number',
      default: 2,
      label: 'N (from end)',
      placeholder: '2',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const valuesStr = input.values as string
    const values = valuesStr.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    const n = input.n as number
    const steps: AlgorithmStep[] = []

    if (values.length === 0 || n > values.length) {
      steps.push({
        lineNumber: 1,
        description: 'Invalid input',
        elements: [],
        variables: { error: 'n is larger than list length' },
        isComplete: true,
      })
      return steps
    }

    // Add dummy at index -1 conceptually, but we'll show it as part of array
    const withDummy = [0, ...values]

    steps.push({
      lineNumber: 2,
      description: 'Create dummy node, initialize slow and fast at dummy',
      elements: [
        { type: 'array', id: 'list', values: withDummy, pointers: [
          { index: 0, label: 'slow', color: '#3B82F6' },
          { index: 0, label: 'fast', color: '#EF4444' },
        ] },
      ],
      variables: { n, slow: 'dummy', fast: 'dummy' },
    })

    // Move fast n+1 steps ahead
    let fast = 0
    for (let i = 0; i <= n && fast < withDummy.length; i++) {
      fast++
      const pointers: { index: number; label: string; color: string }[] = [
        { index: 0, label: 'slow', color: '#3B82F6' },
      ]
      if (fast < withDummy.length) {
        pointers.push({ index: fast, label: 'fast', color: '#EF4444' })
      }
      steps.push({
        lineNumber: 6,
        description: `Move fast ahead: step ${i + 1}/${n + 1}`,
        elements: [
          { type: 'array', id: 'list', values: withDummy, pointers },
        ],
        variables: { fast_pos: fast, steps_moved: i + 1 },
      })
    }

    // Move both until fast reaches end
    let slow = 0
    while (fast < withDummy.length && steps.length < 20) {
      slow++
      fast++
      const pointers: { index: number; label: string; color: string }[] = []
      if (slow < withDummy.length) {
        pointers.push({ index: slow, label: 'slow', color: '#3B82F6' })
      }
      if (fast < withDummy.length) {
        pointers.push({ index: fast, label: 'fast', color: '#EF4444' })
      }
      steps.push({
        lineNumber: 10,
        description: `Move both: slow to ${slow}, fast to ${fast}`,
        elements: [
          { type: 'array', id: 'list', values: withDummy, pointers },
        ],
        variables: { slow_pos: slow, fast_pos: fast },
      })
    }

    // Remove the node
    const nodeToRemove = slow + 1
    const result = withDummy.filter((_, i) => i !== nodeToRemove)

    const removePointers: { index: number; label: string; color: string }[] = []
    if (slow < withDummy.length) {
      removePointers.push({ index: slow, label: 'slow', color: '#3B82F6' })
    }
    steps.push({
      lineNumber: 14,
      description: `Remove node at index ${nodeToRemove} (value: ${withDummy[nodeToRemove]})`,
      elements: [
        { type: 'array', id: 'list', values: withDummy, pointers: removePointers, highlights: [{ index: nodeToRemove, style: 'comparing' }] },
      ],
      variables: { removed: withDummy[nodeToRemove] },
    })

    const resultValues = result.slice(1)
    steps.push({
      lineNumber: 15,
      description: `Complete! Result: ${resultValues.join(' → ')}`,
      elements: [
        { type: 'array', id: 'result', values: resultValues, highlights: resultValues.map((_, i) => ({ index: i, style: 'found' as const })) },
      ],
      variables: { result: resultValues },
      isComplete: true,
    })

    return steps
  },
}
