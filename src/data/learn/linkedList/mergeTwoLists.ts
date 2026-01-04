import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const mergeTwoLists: AlgorithmDefinition = {
  id: 'merge-two-sorted-lists',
  name: 'Merge Two Sorted Lists',
  category: 'linkedList',
  difficulty: 'Easy',
  leetcodeId: 21,
  description: 'Merge two sorted linked lists into one sorted list.',
  timeComplexity: 'O(n + m)',
  spaceComplexity: 'O(1)',
  visualizationType: 'linkedList',

  examples: [
    {
      input: 'l1 = [1,2,4], l2 = [1,3,4]',
      output: '[1,1,2,3,4,4]',
      explanation: 'Interleave maintaining sorted order.'
    },
    {
      input: 'l1 = [], l2 = []',
      output: '[]',
      explanation: 'Both empty, result is empty.'
    },
    {
      input: 'l1 = [], l2 = [0]',
      output: '[0]',
      explanation: 'One empty, result is the other.'
    },
  ],

  education: {
    tldr: 'Dummy node + compare heads. Take smaller, advance that pointer.',
    steps: [
      { title: 'Create dummy', description: 'Simplifies edge cases', code: 'dummy = ListNode(0); curr = dummy' },
      { title: 'Compare heads', description: 'Take the smaller value', code: 'if l1.val <= l2.val: take l1' },
      { title: 'Link and advance', description: 'Add to result, move pointer', code: 'curr.next = l1; l1 = l1.next' },
      { title: 'Append remainder', description: 'One list exhausted, append other', code: 'curr.next = l1 or l2' },
    ],
    remember: [
      'Dummy node avoids null checks',
      'Compare, take smaller, advance',
      'Append leftover at end',
    ],
    understanding: `This is the merge step from merge sort applied to linked lists.

**Dummy node trick:** Instead of handling "what if result is empty?" we start with a dummy. Return dummy.next.

**The algorithm:**
1. Compare heads of both lists
2. Take smaller value, link it
3. Advance that list's pointer
4. Repeat until one exhausts
5. Append remainder (already sorted!)`,

    whyPatternWorks: `Since both lists are sorted:

- The smallest overall element is at one of the heads
- After taking it, the next smallest is again at a head
- We never need to look back

**O(1) space:** We're rewiring existing nodes, not creating new ones (except dummy).`,

    keyInsights: [
      'Merge sort merge step',
      'Dummy node simplifies code',
      'O(n + m) time, O(1) space',
      'Leftover appended directly (sorted)',
      'Foundation for merge k lists'
    ]
  },

  code: `def mergeTwoLists(l1: ListNode, l2: ListNode) -> ListNode:
    dummy = ListNode(0)
    curr = dummy

    while l1 and l2:
        if l1.val <= l2.val:
            curr.next = l1
            l1 = l1.next
        else:
            curr.next = l2
            l2 = l2.next
        curr = curr.next

    curr.next = l1 or l2
    return dummy.next`,

  inputs: [
    {
      name: 'list1',
      type: 'string',
      default: '1,2,4',
      label: 'List 1',
      placeholder: '1,2,4',
    },
    {
      name: 'list2',
      type: 'string',
      default: '1,3,4',
      label: 'List 2',
      placeholder: '1,3,4',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const l1Str = input.list1 as string
    const l2Str = input.list2 as string
    const l1 = l1Str.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    const l2 = l2Str.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    const steps: AlgorithmStep[] = []

    steps.push({
      lineNumber: 2,
      description: 'Create dummy node and curr pointer',
      elements: [
        { type: 'array', id: 'l1', values: [...l1], pointers: l1.length > 0 ? [{ index: 0, label: 'l1', color: '#3B82F6' }] : [] },
        { type: 'array', id: 'l2', values: [...l2], pointers: l2.length > 0 ? [{ index: 0, label: 'l2', color: '#F59E0B' }] : [] },
      ],
      variables: { dummy: 0, merged: [] },
    })

    const merged: number[] = []
    let i = 0, j = 0

    while (i < l1.length && j < l2.length && steps.length < 20) {
      if (l1[i] <= l2[j]) {
        steps.push({
          lineNumber: 6,
          description: `l1.val (${l1[i]}) <= l2.val (${l2[j]}), take from l1`,
          elements: [
            { type: 'array', id: 'l1', values: [...l1], pointers: [{ index: i, label: 'l1', color: '#3B82F6' }], styles: l1.map((_, idx) => idx < i ? 'found' as const : 'default' as const) },
            { type: 'array', id: 'l2', values: [...l2], pointers: [{ index: j, label: 'l2', color: '#F59E0B' }], styles: l2.map((_, idx) => idx < j ? 'found' as const : 'default' as const) },
            { type: 'array', id: 'merged', values: [...merged, l1[i]], styles: [...merged, l1[i]].map(() => 'found' as const) },
          ],
          variables: { l1_val: l1[i], l2_val: l2[j], taking: 'l1' },
        })
        merged.push(l1[i])
        i++
      } else {
        steps.push({
          lineNumber: 9,
          description: `l1.val (${l1[i]}) > l2.val (${l2[j]}), take from l2`,
          elements: [
            { type: 'array', id: 'l1', values: [...l1], pointers: [{ index: i, label: 'l1', color: '#3B82F6' }], styles: l1.map((_, idx) => idx < i ? 'found' as const : 'default' as const) },
            { type: 'array', id: 'l2', values: [...l2], pointers: [{ index: j, label: 'l2', color: '#F59E0B' }], styles: l2.map((_, idx) => idx < j ? 'found' as const : 'default' as const) },
            { type: 'array', id: 'merged', values: [...merged, l2[j]], styles: [...merged, l2[j]].map(() => 'found' as const) },
          ],
          variables: { l1_val: l1[i], l2_val: l2[j], taking: 'l2' },
        })
        merged.push(l2[j])
        j++
      }
    }

    // Add remaining elements
    while (i < l1.length) {
      merged.push(l1[i])
      i++
    }
    while (j < l2.length) {
      merged.push(l2[j])
      j++
    }

    steps.push({
      lineNumber: 14,
      description: `Complete! Merged list: ${merged.join(' → ')}`,
      elements: [
        { type: 'array', id: 'merged', values: merged, styles: merged.map(() => 'found' as const) },
      ],
      variables: { result: merged },
      isComplete: true,
    })

    return steps
  },
}
