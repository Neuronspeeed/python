import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const kokoEatingBananas: AlgorithmDefinition = {
  id: 'koko-eating-bananas',
  name: 'Koko Eating Bananas',
  category: 'binarySearch',
  difficulty: 'Medium',
  leetcodeId: 875,
  description: 'Find the minimum eating speed k to finish all bananas within h hours.',
  timeComplexity: 'O(n log m)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  examples: [
    {
      input: 'piles = [3,6,7,11], h = 8',
      output: '4',
      explanation: 'At speed 4: ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 hours. Perfect!'
    },
    {
      input: 'piles = [30,11,23,4,20], h = 5',
      output: '30',
      explanation: 'Only 5 hours for 5 piles—must eat one pile per hour. Need speed = max pile.'
    },
    {
      input: 'piles = [30,11,23,4,20], h = 6',
      output: '23',
      explanation: 'One extra hour allows splitting the 30-pile across 2 hours.'
    },
  ],

  education: {
    tldr: 'Binary search on the answer. Search speed k from 1 to max(piles).',
    steps: [
      { title: 'Define search space', description: 'Speed k can be 1 to max(piles)', code: 'left, right = 1, max(piles)' },
      { title: 'Try middle speed', description: 'Calculate hours needed at speed mid', code: 'hours = sum(ceil(p/mid) for p in piles)' },
      { title: 'Can finish?', description: 'If hours <= h, try smaller k', code: 'if hours <= h: right = mid' },
      { title: 'Too slow', description: 'If hours > h, need faster speed', code: 'else: left = mid + 1' },
    ],
    remember: [
      'Binary search on speed, not array',
      'Speed range: 1 to max(piles)',
      'Leftmost valid k = minimum speed',
    ],
    understanding: `This is "binary search on the answer" pattern. Instead of searching in an array, we search for the optimal value of k.

**Key insight:** The answer is monotonic! If speed k works, any speed > k also works. If k doesn't work, any speed < k also fails.

**Search space:**
- Minimum: k=1 (slowest possible)
- Maximum: k=max(piles) (finish any pile in 1 hour)

**Binary search:** Find the smallest k where we can finish in time.`,

    whyPatternWorks: `"Binary search on answer" works when:

1. **Monotonic property:** If k=4 works, k=5,6,7... all work
2. **Verifiable:** Given k, we can check if it works in O(n)
3. **Bounded:** We know min and max possible answers

**Hours calculation:** For each pile p, we need ceil(p/k) hours. Sum all piles.

**Why right = mid (not mid - 1)?** We want the MINIMUM valid k. When we find a valid k, it might be the answer, so we keep it in the range.`,

    keyInsights: [
      'Binary search on the answer, not on array indices',
      'Monotonic: larger k → always valid if smaller k was valid',
      'Search for leftmost valid answer',
      'Ceiling division: (p + k - 1) // k',
      'O(n log m) where m = max(piles)'
    ]
  },

  code: `def minEatingSpeed(piles: list[int], h: int) -> int:
    def canFinish(k: int) -> bool:
        hours = sum((p + k - 1) // k for p in piles)
        return hours <= h

    left, right = 1, max(piles)

    while left < right:
        mid = (left + right) // 2
        if canFinish(mid):
            right = mid
        else:
            left = mid + 1

    return left`,

  inputs: [
    {
      name: 'piles',
      type: 'array',
      default: [3, 6, 7, 11],
      label: 'Banana Piles',
      placeholder: '3, 6, 7, 11',
    },
    {
      name: 'h',
      type: 'number',
      default: 8,
      label: 'Hours Available',
      placeholder: '8',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const piles = input.piles as number[]
    const h = input.h as number
    const steps: AlgorithmStep[] = []

    const canFinish = (k: number): number => {
      return piles.reduce((sum, p) => sum + Math.ceil(p / k), 0)
    }

    let left = 1
    let right = Math.max(...piles)

    steps.push({
      lineNumber: 6,
      description: `Search range: k ∈ [${left}, ${right}], need to finish in ${h} hours`,
      elements: [
        { type: 'array', id: 'piles', values: piles },
      ],
      variables: { left, right, h },
    })

    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      const hours = canFinish(mid)
      const canDo = hours <= h

      steps.push({
        lineNumber: 9,
        description: `Try k = ${mid}: ${piles.map(p => `⌈${p}/${mid}⌉`).join(' + ')} = ${hours} hours`,
        elements: [
          { type: 'array', id: 'piles', values: piles },
          { type: 'bracket', id: 'range', left: 0, right: piles.length - 1, value: `k = ${mid}` },
        ],
        variables: { left, right, mid, hours, canFinish: canDo },
      })

      if (canDo) {
        steps.push({
          lineNumber: 11,
          description: `${hours} ≤ ${h}: Can finish! Try smaller k, right = ${mid}`,
          elements: [
            { type: 'array', id: 'piles', values: piles, highlights: [{ index: 0, style: 'found' }] },
          ],
          variables: { action: 'right = mid', newRight: mid },
        })
        right = mid
      } else {
        steps.push({
          lineNumber: 13,
          description: `${hours} > ${h}: Too slow! Need faster, left = ${mid + 1}`,
          elements: [
            { type: 'array', id: 'piles', values: piles, highlights: [{ index: 0, style: 'comparing' }] },
          ],
          variables: { action: 'left = mid + 1', newLeft: mid + 1 },
        })
        left = mid + 1
      }

      if (steps.length > 30) break
    }

    steps.push({
      lineNumber: 15,
      description: `Complete! Minimum eating speed k = ${left}`,
      elements: [
        { type: 'array', id: 'piles', values: piles },
      ],
      variables: { result: left, hoursNeeded: canFinish(left) },
      isComplete: true,
    })

    return steps
  },
}
