import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const medianFinder: AlgorithmDefinition = {
  id: 'find-median-stream',
  name: 'Find Median from Data Stream',
  category: 'heap',
  difficulty: 'Hard',
  leetcodeId: 295,
  description: 'Find running median using two heaps.',
  timeComplexity: 'O(log n) per add',
  spaceComplexity: 'O(n)',
  visualizationType: 'array',

  examples: [
    {
      input: 'addNum(1), addNum(2), findMedian(), addNum(3), findMedian()',
      output: '1.5, 2.0',
      explanation: 'After [1,2]: median = 1.5. After [1,2,3]: median = 2.'
    },
  ],

  education: {
    tldr: 'Two heaps: max-heap for smaller half, min-heap for larger half. Median at the tops.',
    steps: [
      { title: 'Setup two heaps', description: 'small=max-heap, large=min-heap', code: 'small, large = [], []' },
      { title: 'Add to small', description: 'Push negative for max-heap', code: 'heappush(small, -num)' },
      { title: 'Balance', description: 'Move max(small) to large', code: 'heappush(large, -heappop(small))' },
      { title: 'Rebalance if needed', description: 'Keep sizes equal or small+1', code: 'if len(large) > len(small): move back' },
    ],
    remember: [
      'Two heaps partition the stream in half',
      'small = max-heap (use negation in Python)',
      'large = min-heap',
      'Sizes differ by at most 1',
    ],
    understanding: `The median divides data into two halves. Use two heaps to maintain this partition:
- **small**: max-heap holding the smaller half (largest of the small at top)
- **large**: min-heap holding the larger half (smallest of the large at top)

**Key Insight**: Median is either top of small (odd count) or average of both tops (even count).

**Why this works?** The tops of both heaps are adjacent in sorted order—exactly where the median lives.`,

    whyPatternWorks: `Invariants:
1. All elements in small ≤ all elements in large
2. Sizes differ by at most 1

Adding a number:
1. Add to small (might break invariant 1)
2. Move max(small) to large (fixes invariant 1)
3. If large got too big, move min(large) back

Median access: O(1) from heap tops. Add: O(log n) for heap operations.`,

    keyInsights: [
      'Classic two-heap pattern for streaming median',
      'Python: negate values for max-heap behavior',
      'Can extend to find any percentile (adjust size ratio)',
      'Alternative: balanced BST (same complexity, more complex)',
    ]
  },

  code: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap (negated)
        self.large = []  # min-heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))

        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2`,

  inputs: [
    {
      name: 'nums',
      type: 'string',
      default: '2,3,4,1,5',
      label: 'Numbers (added in order)',
      placeholder: '2,3,4,1,5',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const numsStr = input.nums as string
    const nums = numsStr.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    const steps: AlgorithmStep[] = []

    steps.push({
      lineNumber: 5,
      description: 'Initialize two heaps: small (max-heap) and large (min-heap)',
      elements: [
        { type: 'array', id: 'small', values: [] },
        { type: 'array', id: 'large', values: [] },
      ],
      variables: { concept: 'small holds smaller half, large holds larger half' },
    })

    const small: number[] = [] // Will store negated for max-heap simulation
    const large: number[] = []

    const pushSmall = (val: number) => { small.push(val); small.sort((a, b) => b - a) }
    const pushLarge = (val: number) => { large.push(val); large.sort((a, b) => a - b) }
    const popSmall = () => small.shift()!
    const popLarge = () => large.shift()!

    for (let i = 0; i < nums.length && steps.length < 25; i++) {
      const num = nums[i]

      // Add to small (max-heap)
      pushSmall(num)

      steps.push({
        lineNumber: 9,
        description: `Add ${num} to small heap`,
        elements: [
          { type: 'array', id: 'input', values: nums, pointers: [{ index: i, label: 'i', color: '#3B82F6' }] },
          { type: 'array', id: 'small', values: [...small], styles: small.map(() => 'found' as const) },
          { type: 'array', id: 'large', values: [...large] },
        ],
        variables: { num, smallSize: small.length, largeSize: large.length },
      })

      // Move max from small to large
      const maxFromSmall = popSmall()
      pushLarge(maxFromSmall)

      steps.push({
        lineNumber: 10,
        description: `Move max(${maxFromSmall}) from small to large`,
        elements: [
          { type: 'array', id: 'small', values: [...small] },
          { type: 'array', id: 'large', values: [...large], styles: large.map(() => 'found' as const) },
        ],
        variables: { moved: maxFromSmall },
      })

      // Balance if needed
      if (large.length > small.length) {
        const minFromLarge = popLarge()
        pushSmall(minFromLarge)

        steps.push({
          lineNumber: 13,
          description: `Balance: move min(${minFromLarge}) from large to small`,
          elements: [
            { type: 'array', id: 'small', values: [...small], styles: small.map(() => 'found' as const) },
            { type: 'array', id: 'large', values: [...large] },
          ],
          variables: { moved: minFromLarge },
        })
      }

      // Calculate median
      let median: number
      if (small.length > large.length) {
        median = small[0]
      } else {
        median = (small[0] + large[0]) / 2
      }

      steps.push({
        lineNumber: 16,
        description: `Current median: ${median}`,
        elements: [
          { type: 'array', id: 'small', values: [...small] },
          { type: 'array', id: 'large', values: [...large] },
        ],
        variables: { median, smallTop: small[0], largeTop: large[0] },
      })
    }

    const finalMedian = small.length > large.length ? small[0] : (small[0] + large[0]) / 2

    steps.push({
      lineNumber: 18,
      description: `Complete! Final median: ${finalMedian}`,
      elements: [
        { type: 'array', id: 'small', values: [...small], styles: small.map((_, i) => i === 0 ? 'found' as const : 'default' as const) },
        { type: 'array', id: 'large', values: [...large], styles: large.map((_, i) => i === 0 ? 'found' as const : 'default' as const) },
      ],
      variables: { result: finalMedian },
      isComplete: true,
    })

    return steps
  },
}
