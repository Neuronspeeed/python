import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const permutationInString: AlgorithmDefinition = {
  id: 'permutation-in-string',
  name: 'Permutation in String',
  category: 'slidingWindow',
  difficulty: 'Medium',
  leetcodeId: 567,
  description: 'Check if s2 contains a permutation of s1.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  examples: [
    {
      input: 's1 = "ab", s2 = "eidbaooo"',
      output: 'true',
      explanation: 's2 contains "ba" which is a permutation of "ab".'
    },
    {
      input: 's1 = "ab", s2 = "eidboaoo"',
      output: 'false',
      explanation: 'No substring of s2 is a permutation of "ab".'
    },
  ],

  education: {
    tldr: 'Fixed window of size len(s1). Slide and compare char frequencies. Match = permutation found.',
    steps: [
      { title: 'Window = pattern size', description: 'Fixed window of len(s1)', code: 'window_size = len(s1)' },
      { title: 'Count pattern', description: 'Frequency map of s1', code: 's1_count = Counter(s1)' },
      { title: 'Slide window', description: 'Add incoming, remove outgoing', code: 'add right, remove left' },
      { title: 'Compare counts', description: 'If frequencies match, found it', code: 'if s1_count == window_count: return True' },
    ],
    remember: [
      'Fixed window = pattern length',
      'Permutation = same chars, same counts',
      'Track matches count for O(1) comparison',
    ],
    understanding: `A permutation has the exact same characters with the exact same frequencies. So we slide a fixed window of size len(s1) and compare frequencies.

**Optimization:** Instead of comparing all 26 letters each time, we track "matches" - how many letters have equal counts. When matches == 26, frequencies are identical.

**Why fixed window?** A permutation has exactly the same length as the original. So we don't grow or shrink—we slide.

**Why O(1) space?** We use fixed-size arrays of 26 (for lowercase letters), not dynamic structures.`,

    whyPatternWorks: `This is fixed-size sliding window with frequency comparison:

1. **Fixed size:** Window is always len(s1)
2. **Frequency tracking:** Instead of sorting, compare counts
3. **Match counter:** O(1) validity check per slide

The matches optimization is key: each slide only affects 2 character counts, so we update matches incrementally.`,

    keyInsights: [
      'Permutation = same frequency distribution',
      'Fixed window size = pattern length',
      'Track matches for O(1) comparison',
      'Each slide affects at most 2 match counts',
      'O(26) = O(1) space for letter frequencies'
    ]
  },

  code: `def checkInclusion(s1: str, s2: str) -> bool:
    if len(s1) > len(s2):
        return False

    s1_count = [0] * 26
    s2_count = [0] * 26

    for i in range(len(s1)):
        s1_count[ord(s1[i]) - ord('a')] += 1
        s2_count[ord(s2[i]) - ord('a')] += 1

    matches = sum(1 for i in range(26) if s1_count[i] == s2_count[i])

    for i in range(len(s1), len(s2)):
        if matches == 26:
            return True

        # Add right character
        idx = ord(s2[i]) - ord('a')
        s2_count[idx] += 1
        if s2_count[idx] == s1_count[idx]:
            matches += 1
        elif s2_count[idx] == s1_count[idx] + 1:
            matches -= 1

        # Remove left character
        left_idx = ord(s2[i - len(s1)]) - ord('a')
        s2_count[left_idx] -= 1
        if s2_count[left_idx] == s1_count[left_idx]:
            matches += 1
        elif s2_count[left_idx] == s1_count[left_idx] - 1:
            matches -= 1

    return matches == 26`,

  inputs: [
    {
      name: 's1',
      type: 'string',
      default: 'ab',
      label: 'Pattern (s1)',
      placeholder: 'ab',
    },
    {
      name: 's2',
      type: 'string',
      default: 'eidbaooo',
      label: 'String (s2)',
      placeholder: 'eidbaooo',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const s1 = input.s1 as string
    const s2 = input.s2 as string
    const steps: AlgorithmStep[] = []
    const chars = s2.split('').map(c => c.charCodeAt(0))

    if (s1.length > s2.length) {
      steps.push({
        lineNumber: 3,
        description: `s1 longer than s2, return false`,
        elements: [],
        variables: { result: false },
        isComplete: true,
      })
      return steps
    }

    const s1Count: Record<string, number> = {}
    const s2Count: Record<string, number> = {}

    for (const c of s1) s1Count[c] = (s1Count[c] || 0) + 1
    for (let i = 0; i < s1.length; i++) {
      s2Count[s2[i]] = (s2Count[s2[i]] || 0) + 1
    }

    const countMatches = () => {
      let m = 0
      const allChars = new Set([...Object.keys(s1Count), ...Object.keys(s2Count)])
      for (const c of allChars) {
        if ((s1Count[c] || 0) === (s2Count[c] || 0)) m++
      }
      return m
    }

    const matches = countMatches()
    const totalChars = new Set([...Object.keys(s1Count)]).size

    steps.push({
      lineNumber: 12,
      description: `Initial window [0..${s1.length - 1}]: s1=${JSON.stringify(s1Count)}, window=${JSON.stringify(s2Count)}`,
      elements: [
        { type: 'array', id: 'chars', values: chars, highlights:
          Array.from({ length: s1.length }, (_, i) => ({ index: i, style: 'active' as const }))
        },
      ],
      variables: { matches, totalChars, s1: s1, window: s2.slice(0, s1.length) },
    })

    for (let i = s1.length; i < s2.length; i++) {
      if (Object.keys(s1Count).every(c => s1Count[c] === (s2Count[c] || 0))) {
        steps.push({
          lineNumber: 15,
          description: `Found permutation at [${i - s1.length}..${i - 1}]!`,
          elements: [
            { type: 'array', id: 'chars', values: chars, highlights:
              Array.from({ length: s1.length }, (_, j) => ({ index: i - s1.length + j, style: 'found' as const }))
            },
          ],
          variables: { result: true, window: s2.slice(i - s1.length, i) },
          isComplete: true,
        })
        return steps
      }

      const addChar = s2[i]
      const removeChar = s2[i - s1.length]
      s2Count[addChar] = (s2Count[addChar] || 0) + 1
      s2Count[removeChar] = (s2Count[removeChar] || 0) - 1
      if (s2Count[removeChar] === 0) delete s2Count[removeChar]

      steps.push({
        lineNumber: 19,
        description: `Slide: add '${addChar}', remove '${removeChar}'`,
        elements: [
          { type: 'pointer', id: 'left', index: i - s1.length + 1, label: 'L', color: '#16A34A' },
          { type: 'pointer', id: 'right', index: i, label: 'R', color: '#3B82F6' },
          { type: 'array', id: 'chars', values: chars, highlights: [
            { index: i - s1.length, style: 'comparing' },
            { index: i, style: 'active' },
          ]},
        ],
        variables: { add: addChar, remove: removeChar, window: JSON.stringify(s2Count) },
      })

      if (steps.length > 30) break
    }

    const isMatch = Object.keys(s1Count).every(c => s1Count[c] === (s2Count[c] || 0))
    steps.push({
      lineNumber: 33,
      description: isMatch ? 'Permutation found!' : 'No permutation found',
      elements: [
        { type: 'array', id: 'chars', values: chars },
      ],
      variables: { result: isMatch },
      isComplete: true,
    })

    return steps
  },
}
