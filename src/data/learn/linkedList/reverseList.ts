import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const reverseList: AlgorithmDefinition = {
  id: 'reverse-linked-list',
  name: 'Reverse Linked List',
  category: 'linkedList',
  difficulty: 'Easy',
  leetcodeId: 206,
  description: 'Reverse a singly linked list iteratively.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'linkedList',

  examples: [
    {
      input: 'head = [1,2,3,4,5]',
      output: '[5,4,3,2,1]',
      explanation: 'Reverse all pointers: 5→4→3→2→1.'
    },
    {
      input: 'head = [1,2]',
      output: '[2,1]',
      explanation: 'Simple swap: 2→1.'
    },
    {
      input: 'head = []',
      output: '[]',
      explanation: 'Empty list stays empty.'
    },
  ],

  education: {
    tldr: 'Three pointers: prev, curr, next. Flip curr.next to prev, advance all three.',
    steps: [
      { title: 'Initialize', description: 'prev = None, curr = head', code: 'prev, curr = None, head' },
      { title: 'Save next', description: 'Before we break the link', code: 'next_temp = curr.next' },
      { title: 'Reverse pointer', description: 'Point curr back to prev', code: 'curr.next = prev' },
      { title: 'Advance', description: 'Move prev and curr forward', code: 'prev, curr = curr, next_temp' },
    ],
    remember: [
      'prev, curr, next_temp—three pointers',
      'Save next BEFORE reversing',
      'Return prev (new head)',
    ],
    understanding: `Reversal is about flipping each pointer direction.

**The challenge:** When we flip curr.next to prev, we lose access to the rest of the list! Solution: save next_temp first.

**Three pointers track:**
- prev: the reversed portion (grows)
- curr: current node being processed
- next_temp: saved reference to continue forward

**End state:** curr becomes null, prev is the new head.`,

    whyPatternWorks: `Each iteration does one reversal:

\`\`\`
Before: None ← [1] → [2] → [3]
             prev  curr

Step: save next_temp = [2]
      curr.next = prev (flip!)
      prev = curr, curr = next_temp

After:  None ← [1] ← [2] → [3]
                    prev  curr
\`\`\`

We "zip" through the list, flipping each arrow.`,

    keyInsights: [
      'Save next before breaking link',
      'Three pointers: prev, curr, next_temp',
      'O(1) space—in-place reversal',
      'Alternative: recursive approach',
      'Return prev, not curr (curr is null at end)'
    ]
  },

  code: `def reverseList(head: ListNode) -> ListNode:
    prev = None
    curr = head

    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp

    return prev`,

  inputs: [
    {
      name: 'values',
      type: 'string',
      default: '1,2,3,4,5',
      label: 'List Values',
      placeholder: '1,2,3,4,5',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const valuesStr = input.values as string
    const values = valuesStr.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    const steps: AlgorithmStep[] = []

    if (values.length === 0) {
      steps.push({
        lineNumber: 2,
        description: 'Empty list, return None',
        elements: [],
        variables: { prev: null, curr: null },
        isComplete: true,
      })
      return steps
    }

    steps.push({
      lineNumber: 2,
      description: 'Initialize prev = None, curr = head',
      elements: [
        { type: 'array', id: 'list', values: [...values], pointers: [{ index: 0, label: 'curr', color: '#3B82F6' }] },
      ],
      variables: { prev: 'None', curr: values[0] },
    })

    const reversed: number[] = []
    for (let i = 0; i < values.length && steps.length < 20; i++) {
      const curr = values[i]
      const next = i + 1 < values.length ? values[i + 1] : null

      steps.push({
        lineNumber: 5,
        description: `Save next_temp = ${next ?? 'None'}`,
        elements: [
          { type: 'array', id: 'list', values: [...values], pointers: [{ index: i, label: 'curr', color: '#3B82F6' }] },
          { type: 'array', id: 'reversed', values: [...reversed], styles: reversed.map(() => 'found' as const) },
        ],
        variables: { prev: reversed.length > 0 ? reversed[0] : 'None', curr, next_temp: next ?? 'None' },
      })

      reversed.unshift(curr)

      steps.push({
        lineNumber: 7,
        description: `Move curr.next to prev, advance: prev=${curr}, curr=${next ?? 'None'}`,
        elements: [
          { type: 'array', id: 'list', values: [...values], pointers: next !== null ? [{ index: i + 1, label: 'curr', color: '#3B82F6' }] : [] },
          { type: 'array', id: 'reversed', values: [...reversed], styles: reversed.map(() => 'found' as const) },
        ],
        variables: { prev: curr, curr: next ?? 'None' },
      })
    }

    steps.push({
      lineNumber: 10,
      description: `Complete! Reversed list: ${reversed.join(' → ')}`,
      elements: [
        { type: 'array', id: 'reversed', values: [...reversed], styles: reversed.map(() => 'found' as const) },
      ],
      variables: { result: reversed },
      isComplete: true,
    })

    return steps
  },
}
