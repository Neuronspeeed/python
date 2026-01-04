import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const reorderList: AlgorithmDefinition = {
  id: 'reorder-list',
  name: 'Reorder List',
  category: 'linkedList',
  difficulty: 'Medium',
  leetcodeId: 143,
  description: 'Reorder list: L0→Ln→L1→Ln-1→L2→Ln-2→...',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'linkedList',

  examples: [
    {
      input: 'head = [1,2,3,4]',
      output: '[1,4,2,3]',
      explanation: 'Interleave from ends: 1→4→2→3.'
    },
    {
      input: 'head = [1,2,3,4,5]',
      output: '[1,5,2,4,3]',
      explanation: 'Odd length: 1→5→2→4→3 (middle stays in place).'
    },
  ],

  education: {
    tldr: 'Find middle, reverse second half, merge alternating.',
    steps: [
      { title: 'Find middle', description: 'Slow/fast pointers', code: 'while fast.next and fast.next.next: move' },
      { title: 'Split', description: 'Disconnect at middle', code: 'second = slow.next; slow.next = None' },
      { title: 'Reverse second', description: 'Standard reverse', code: 'while curr: reverse' },
      { title: 'Merge alternating', description: 'Interleave nodes', code: 'first.next = second; second.next = first_next' },
    ],
    remember: [
      'Three classic operations combined',
      'Find middle, reverse, merge',
      'In-place with O(1) space',
    ],
    understanding: `This problem combines three fundamental linked list operations:

**Step 1: Find middle** using slow/fast pointers. For [1,2,3,4,5], middle is 3.

**Step 2: Reverse second half.** [4,5] becomes [5,4].

**Step 3: Merge alternating.** First half [1,2,3] + reversed [5,4] = [1,5,2,4,3].

**Why this works:** We're essentially folding the list in half and interleaving.`,

    whyPatternWorks: `The pattern works because reordering is equivalent to:

\`\`\`
Original: 1 → 2 → 3 → 4 → 5
                 ↓
First:  [1, 2, 3]
Second: [5, 4] (reversed)
                 ↓
Merge:  1 → 5 → 2 → 4 → 3
\`\`\`

Each operation is O(n) and O(1) space. Combined: O(n) time, O(1) space.`,

    keyInsights: [
      'Combine three classic operations',
      'Find middle (slow/fast)',
      'Reverse second half',
      'Merge two lists alternating',
      'O(n) time, O(1) space'
    ]
  },

  code: `def reorderList(head: ListNode) -> None:
    # Find middle
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next

    # Reverse second half
    prev, curr = None, slow.next
    slow.next = None
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp

    # Merge two halves
    first, second = head, prev
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second
        second.next = tmp1
        first, second = tmp1, tmp2`,

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

    if (values.length <= 2) {
      steps.push({
        lineNumber: 1,
        description: `List too short to reorder: ${values.join(' → ')}`,
        elements: [{ type: 'array', id: 'list', values: [...values] }],
        variables: { result: values },
        isComplete: true,
      })
      return steps
    }

    steps.push({
      lineNumber: 2,
      description: 'Find middle using slow/fast pointers',
      elements: [
        { type: 'array', id: 'list', values: [...values], pointers: [
          { index: 0, label: 'slow', color: '#3B82F6' },
          { index: 0, label: 'fast', color: '#EF4444' },
        ] },
      ],
      variables: { phase: 'finding middle' },
    })

    // Find middle
    const mid = Math.floor(values.length / 2)

    steps.push({
      lineNumber: 5,
      description: `Middle found at index ${mid}`,
      elements: [
        { type: 'array', id: 'list', values: [...values], pointers: [
          { index: mid, label: 'mid', color: '#3B82F6' },
        ] },
      ],
      variables: { midIndex: mid, midValue: values[mid] },
    })

    // Split and show second half
    const firstHalf = values.slice(0, mid + 1)
    const secondHalf = values.slice(mid + 1)

    steps.push({
      lineNumber: 8,
      description: 'Split into two halves',
      elements: [
        { type: 'array', id: 'first', values: firstHalf },
        { type: 'array', id: 'second', values: secondHalf },
      ],
      variables: { first: firstHalf, second: secondHalf },
    })

    // Reverse second half
    const reversedSecond = [...secondHalf].reverse()

    steps.push({
      lineNumber: 13,
      description: `Reverse second half: ${reversedSecond.join(' → ')}`,
      elements: [
        { type: 'array', id: 'first', values: firstHalf },
        { type: 'array', id: 'second', values: reversedSecond, styles: reversedSecond.map(() => 'found' as const) },
      ],
      variables: { reversedSecond },
    })

    // Merge
    const result: number[] = []
    let i = 0, j = 0
    while (i < firstHalf.length || j < reversedSecond.length) {
      if (i < firstHalf.length) result.push(firstHalf[i++])
      if (j < reversedSecond.length) result.push(reversedSecond[j++])
    }

    steps.push({
      lineNumber: 17,
      description: 'Interleave the two halves',
      elements: [
        { type: 'array', id: 'result', values: result, styles: result.map(() => 'found' as const) },
      ],
      variables: { merging: true },
    })

    steps.push({
      lineNumber: 21,
      description: `Complete! Reordered: ${result.join(' → ')}`,
      elements: [
        { type: 'array', id: 'result', values: result, styles: result.map(() => 'found' as const) },
      ],
      variables: { result },
      isComplete: true,
    })

    return steps
  },
}
