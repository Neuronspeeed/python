import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const kthLargest: AlgorithmDefinition = {
  id: 'kth-largest-element',
  name: 'Kth Largest Element',
  category: 'heap',
  difficulty: 'Medium',
  leetcodeId: 215,
  description: 'Find the kth largest element using a min-heap of size k.',
  timeComplexity: 'O(n log k)',
  spaceComplexity: 'O(k)',
  visualizationType: 'array',

  examples: [
    {
      input: 'nums = [3,2,1,5,6,4], k = 2',
      output: '5',
      explanation: 'Sorted: [1,2,3,4,5,6]. 2nd largest = 5.'
    },
    {
      input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4',
      output: '4',
      explanation: 'Sorted: [1,2,2,3,3,4,5,5,6]. 4th largest = 4.'
    },
  ],

  education: {
    tldr: 'Keep min-heap of size k. After processing all, heap[0] = kth largest.',
    steps: [
      { title: 'Use MIN-heap', description: 'Counterintuitive but key', code: 'heap = []  # min-heap' },
      { title: 'Push element', description: 'Add each number to heap', code: 'heappush(heap, num)' },
      { title: 'Maintain size k', description: 'If size > k, pop minimum', code: 'if len(heap) > k: heappop(heap)' },
      { title: 'Result', description: 'Root is kth largest', code: 'return heap[0]' },
    ],
    remember: [
      'MIN-heap, not max-heap!',
      'Heap always has exactly k elements (the k largest)',
      'Pop removes smallest of the k largest',
      'Root = smallest of k largest = kth largest overall',
    ],
    understanding: `**Why min-heap?** We want to keep the k largest elements. A min-heap efficiently tells us the smallest among them. If a new element is larger than the heap minimum, it deserves to be in the top k.

**Key Insight**: After processing, the heap contains exactly the k largest elements. The minimum of those (heap root) is the kth largest overall.

**Why not max-heap?** A max-heap would give us the largest, not the kth largest.`,

    whyPatternWorks: `Invariant: The heap always contains the k largest elements seen so far.
- If heap has < k elements, just add
- If heap has k elements, only add if num > heap minimum
- Pop minimum to make room for larger element

Result: heap[0] = smallest of k largest = kth largest.`,

    keyInsights: [
      'Min-heap for "k largest", max-heap for "k smallest"',
      'O(n log k) is better than O(n log n) sorting when k << n',
      'Alternative: QuickSelect gives O(n) average time',
      'Space O(k) is optimal for streaming data',
    ]
  },

  code: `import heapq

def findKthLargest(nums: list[int], k: int) -> int:
    heap = []

    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)

    return heap[0]`,

  inputs: [
    {
      name: 'nums',
      type: 'string',
      default: '3,2,1,5,6,4',
      label: 'Array',
      placeholder: '3,2,1,5,6,4',
    },
    {
      name: 'k',
      type: 'number',
      default: 2,
      label: 'K',
      placeholder: '2',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const numsStr = input.nums as string
    const nums = numsStr.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    const k = input.k as number
    const steps: AlgorithmStep[] = []

    steps.push({
      lineNumber: 4,
      description: `Initialize empty min-heap, k=${k}`,
      elements: [
        { type: 'array', id: 'nums', values: nums },
        { type: 'array', id: 'heap', values: [] },
      ],
      variables: { k, heapSize: 0 },
    })

    const heap: number[] = []
    const heapPush = (arr: number[], val: number) => {
      arr.push(val)
      arr.sort((a, b) => a - b)
    }
    const heapPop = (arr: number[]) => arr.shift()

    for (let i = 0; i < nums.length && steps.length < 25; i++) {
      const num = nums[i]
      heapPush(heap, num)

      steps.push({
        lineNumber: 7,
        description: `Push ${num} to heap`,
        elements: [
          { type: 'array', id: 'nums', values: nums, pointers: [{ index: i, label: 'i', color: '#3B82F6' }] },
          { type: 'array', id: 'heap', values: [...heap], styles: heap.map(() => 'found' as const) },
        ],
        variables: { num, heapSize: heap.length },
      })

      if (heap.length > k) {
        const popped = heapPop(heap)
        steps.push({
          lineNumber: 9,
          description: `Heap size > k, pop minimum (${popped})`,
          elements: [
            { type: 'array', id: 'nums', values: nums, pointers: [{ index: i, label: 'i', color: '#3B82F6' }] },
            { type: 'array', id: 'heap', values: [...heap], styles: heap.map(() => 'found' as const) },
          ],
          variables: { popped, heapSize: heap.length },
        })
      }
    }

    steps.push({
      lineNumber: 11,
      description: `Complete! ${k}th largest = ${heap[0]} (heap minimum)`,
      elements: [
        { type: 'array', id: 'heap', values: [...heap], styles: heap.map((_, i) => i === 0 ? 'found' as const : 'default' as const) },
      ],
      variables: { result: heap[0] },
      isComplete: true,
    })

    return steps
  },
}
