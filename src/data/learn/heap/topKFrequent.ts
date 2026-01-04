import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const topKFrequent: AlgorithmDefinition = {
  id: 'top-k-frequent',
  name: 'Top K Frequent Elements',
  category: 'heap',
  difficulty: 'Medium',
  leetcodeId: 347,
  description: 'Find the k most frequent elements using a heap.',
  timeComplexity: 'O(n log k)',
  spaceComplexity: 'O(n)',
  visualizationType: 'array',

  examples: [
    {
      input: 'nums = [1,1,1,2,2,3], k = 2',
      output: '[1, 2]',
      explanation: '1 appears 3 times, 2 appears 2 times. Top 2 frequent: [1, 2].'
    },
    {
      input: 'nums = [1], k = 1',
      output: '[1]',
      explanation: 'Only one unique element.'
    },
  ],

  education: {
    tldr: 'Count frequencies, then use min-heap of size k on (freq, num) pairs.',
    steps: [
      { title: 'Count frequencies', description: 'Use Counter/hashmap', code: 'count = Counter(nums)' },
      { title: 'Build min-heap', description: 'Push (freq, num) pairs', code: 'heappush(heap, (freq, num))' },
      { title: 'Maintain size k', description: 'Pop lowest freq if size > k', code: 'if len(heap) > k: heappop(heap)' },
      { title: 'Extract numbers', description: 'Get nums from remaining pairs', code: 'return [num for freq, num in heap]' },
    ],
    remember: [
      'Two-step: count frequencies, then heap',
      'Heap stores (frequency, number) tuples',
      'Min-heap on frequency keeps k MOST frequent',
      'Alternative: bucket sort for O(n) solution',
    ],
    understanding: `This is "kth largest" applied to frequencies. First, count how often each number appears. Then use a min-heap to keep the k elements with highest frequencies.

**Key Insight**: Heap keyed by frequency. Pop removes lowest-frequency element, keeping the k most frequent.

**Why (freq, num) tuple?** Python's heapq compares by first element (frequency). The num is just along for the ride.`,

    whyPatternWorks: `Same logic as kth largest:
1. Min-heap of size k holds k most frequent
2. If new element's freq > heap minimum's freq, swap them
3. Final heap contains exactly k most frequent elements

Alternative: Bucket sort where index = frequency. O(n) but uses O(n) space.`,

    keyInsights: [
      'Combines two patterns: frequency counting + top-k heap',
      'Bucket sort alternative: buckets[freq].append(num)',
      'Order in output usually doesn\'t matter',
      'Similar: top k hot keywords, most common words',
    ]
  },

  code: `import heapq
from collections import Counter

def topKFrequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)

    # Use min-heap of size k
    heap = []
    for num, freq in count.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)

    return [num for freq, num in heap]`,

  inputs: [
    {
      name: 'nums',
      type: 'string',
      default: '1,1,1,2,2,3',
      label: 'Array',
      placeholder: '1,1,1,2,2,3',
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

    // Count frequencies
    const count = new Map<number, number>()
    for (const num of nums) {
      count.set(num, (count.get(num) || 0) + 1)
    }

    const countArr = Array.from(count.entries())
    const countDisplay = countArr.map(([num, freq]) => `${num}:${freq}`)

    steps.push({
      lineNumber: 5,
      description: `Count frequencies: {${countDisplay.join(', ')}}`,
      elements: [
        { type: 'array', id: 'nums', values: nums },
      ],
      variables: { k },
    })

    // Build heap
    const heap: Array<[number, number]> = [] // [freq, num]
    const heapPush = (arr: Array<[number, number]>, val: [number, number]) => {
      arr.push(val)
      arr.sort((a, b) => a[0] - b[0])
    }
    const heapPop = (arr: Array<[number, number]>) => arr.shift()

    for (const [num, freq] of countArr) {
      heapPush(heap, [freq, num])

      steps.push({
        lineNumber: 10,
        description: `Push (freq=${freq}, num=${num}) to heap`,
        elements: [
          { type: 'array', id: 'heap', values: heap.map(entry => entry[1]), styles: heap.map(() => 'found' as const) },
        ],
        variables: { num, freq, heapSize: heap.length },
      })

      if (heap.length > k) {
        const popped = heapPop(heap)
        steps.push({
          lineNumber: 12,
          description: `Heap size > k, pop lowest freq (num=${popped?.[1]}, freq=${popped?.[0]})`,
          elements: [
            { type: 'array', id: 'heap', values: heap.map(entry => entry[1]), styles: heap.map(() => 'found' as const) },
          ],
          variables: { popped: popped?.[1], heapSize: heap.length },
        })
      }

      if (steps.length >= 20) break
    }

    const result = heap.map(entry => entry[1])

    steps.push({
      lineNumber: 14,
      description: `Complete! Top ${k} frequent: [${result.join(', ')}]`,
      elements: [
        { type: 'array', id: 'result', values: result, styles: result.map(() => 'found' as const) },
      ],
      variables: { result },
      isComplete: true,
    })

    return steps
  },
}
