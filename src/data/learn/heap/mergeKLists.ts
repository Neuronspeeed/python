import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const mergeKLists: AlgorithmDefinition = {
  id: 'merge-k-sorted-lists',
  name: 'Merge K Sorted Lists',
  category: 'heap',
  difficulty: 'Hard',
  leetcodeId: 23,
  description: 'Merge k sorted linked lists using a min-heap.',
  timeComplexity: 'O(N log k)',
  spaceComplexity: 'O(k)',
  visualizationType: 'array',

  examples: [
    {
      input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
      output: '[1,1,2,3,4,4,5,6]',
      explanation: 'Merge by always taking the smallest head among all lists.'
    },
    {
      input: 'lists = []',
      output: '[]',
      explanation: 'Empty input returns empty list.'
    },
  ],

  education: {
    tldr: 'Heap holds k heads (one per list). Pop min, push its next, repeat.',
    steps: [
      { title: 'Init heap', description: 'Push head of each list', code: 'heappush(heap, (node.val, i, node))' },
      { title: 'Pop minimum', description: 'Smallest head goes to result', code: 'val, i, node = heappop(heap)' },
      { title: 'Advance list', description: 'Push next node from same list', code: 'if node.next: heappush(heap, ...)' },
      { title: 'Repeat', description: 'Until heap is empty', code: 'while heap: ...' },
    ],
    remember: [
      'Heap size = k (one head per list)',
      'Store (value, list_index, node) to handle ties',
      'Always push next from the SAME list we just popped',
      'Use dummy node to simplify list building',
    ],
    understanding: `Think of k pointers, one at the head of each list. We always want the smallest current head. A min-heap finds this in O(log k).

**Key Insight**: The heap maintains "current position" for each list. By tracking which list a node came from, we know where to advance next.

**Why include list index?** Ties need a tiebreaker. Python can't compare ListNodes, so index acts as secondary sort key.`,

    whyPatternWorks: `At any moment:
- Heap has at most k elements (one per non-empty list)
- Pop gives globally smallest current element
- Push maintains the invariant: each list has exactly one representative

Result: Elements emerge in sorted order. O(N log k) because each of N elements enters/exits heap once.`,

    keyInsights: [
      'O(N log k) is optimal for this problem',
      'Alternative: divide and conquer merge pairs (also O(N log k))',
      'Heap size never exceeds k—very memory efficient',
      'Same pattern: merge k sorted arrays, external sort',
    ]
  },

  code: `import heapq

def mergeKLists(lists: list[ListNode]) -> ListNode:
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))

    dummy = ListNode(0)
    curr = dummy

    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return dummy.next`,

  inputs: [
    {
      name: 'lists',
      type: 'string',
      default: '1,4,5|1,3,4|2,6',
      label: 'Lists (pipe-separated)',
      placeholder: '1,4,5|1,3,4|2,6',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const listsStr = input.lists as string
    const lists = listsStr.split('|').map(s =>
      s.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    )
    const steps: AlgorithmStep[] = []

    steps.push({
      lineNumber: 4,
      description: `Initialize heap with first element of each list`,
      elements: lists.map((lst, i) => ({
        type: 'array' as const,
        id: `list${i}`,
        values: lst,
        pointers: lst.length > 0 ? [{ index: 0, label: `L${i}`, color: ['#3B82F6', '#F59E0B', '#10B981'][i % 3] }] : [],
      })),
      variables: { k: lists.length },
    })

    // Simulate merge
    const pointers = lists.map(() => 0)
    const heap: Array<[number, number]> = [] // [value, listIndex]

    // Initialize heap
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].length > 0) {
        heap.push([lists[i][0], i])
      }
    }
    heap.sort((a, b) => a[0] - b[0])

    const merged: number[] = []

    while (heap.length > 0 && steps.length < 20) {
      heap.sort((a, b) => a[0] - b[0])
      const [val, listIdx] = heap.shift()!
      merged.push(val)
      pointers[listIdx]++

      steps.push({
        lineNumber: 12,
        description: `Pop min (${val}) from list ${listIdx}`,
        elements: [
          ...lists.map((lst, i) => ({
            type: 'array' as const,
            id: `list${i}`,
            values: lst,
            pointers: pointers[i] < lst.length ? [{ index: pointers[i], label: `L${i}`, color: ['#3B82F6', '#F59E0B', '#10B981'][i % 3] }] : [],
            styles: lst.map((_, j) => j < pointers[i] ? 'found' as const : 'default' as const),
          })),
          { type: 'array' as const, id: 'merged', values: [...merged], styles: merged.map(() => 'found' as const) },
        ],
        variables: { val, fromList: listIdx, heapSize: heap.length },
      })

      // Push next from same list
      if (pointers[listIdx] < lists[listIdx].length) {
        heap.push([lists[listIdx][pointers[listIdx]], listIdx])
      }
    }

    // Complete remaining
    while (heap.length > 0) {
      heap.sort((a, b) => a[0] - b[0])
      const [val] = heap.shift()!
      merged.push(val)
    }

    steps.push({
      lineNumber: 18,
      description: `Complete! Merged: ${merged.join(' → ')}`,
      elements: [
        { type: 'array', id: 'merged', values: merged, styles: merged.map(() => 'found' as const) },
      ],
      variables: { result: merged },
      isComplete: true,
    })

    return steps
  },
}
