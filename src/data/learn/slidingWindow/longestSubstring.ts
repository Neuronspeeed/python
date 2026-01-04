import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const longestSubstring: AlgorithmDefinition = {
  id: 'longest-substring-without-repeating',
  name: 'Longest Substring Without Repeating',
  category: 'slidingWindow',
  difficulty: 'Medium',
  leetcodeId: 3,
  description: 'Find the length of the longest substring without repeating characters.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(min(n, m))',
  visualizationType: 'array',

  examples: [
    {
      input: 's = "abcabcbb"',
      output: '3',
      explanation: 'Longest is "abc" with length 3.'
    },
    {
      input: 's = "bbbbb"',
      output: '1',
      explanation: 'Longest is "b" with length 1.'
    },
    {
      input: 's = "pwwkew"',
      output: '3',
      explanation: 'Longest is "wke" with length 3. Note: "pwke" is a subsequence, not substring.'
    },
  ],

  education: {
    tldr: 'Expand right until duplicate found. Shrink left until duplicate removed. Track max length.',
    steps: [
      { title: 'Expand right', description: 'Add character to window', code: 'char_set.add(s[right])' },
      { title: 'Duplicate?', description: 'Check if char already in set', code: 'if s[right] in char_set' },
      { title: 'Shrink left', description: 'Remove chars until duplicate gone', code: 'while duplicate: remove(s[left]), left++' },
      { title: 'Track length', description: 'Update max window size', code: 'max_len = max(max_len, right - left + 1)' },
    ],
    remember: [
      'Variable window: expand right, shrink left',
      'Set tracks what\'s in current window',
      'Shrink until constraint satisfied',
    ],
    understanding: `This is a **variable-size** sliding window. The window grows and shrinks based on a constraint (no duplicates).

**Right pointer:** Always moves right, expanding the window
**Left pointer:** Moves right when we need to shrink (constraint violated)

**The invariant:** At each step, the window [left, right] contains no duplicates. When we add a duplicate at right, we shrink from left until it's valid again.

**Why a set?** The set gives O(1) duplicate checking. We could use a hash map for O(1) jump-ahead (know exactly where to move left).`,

    whyPatternWorks: `Variable-size sliding window is perfect when:

1. **Contiguous elements:** We need a substring (not subsequence)
2. **Constraint can be violated and restored:** Duplicates can be removed by shrinking
3. **Optimal window may vary in size:** We're finding the longest/shortest

The two-pointer approach ensures each character is added and removed at most once: O(n) total.`,

    keyInsights: [
      'Variable window: size changes based on constraint',
      'Right expands, left shrinks when needed',
      'Set provides O(1) membership testing',
      'Each char added/removed at most once = O(n)',
      'Could optimize with hashmap to jump left pointer directly'
    ]
  },

  code: `def lengthOfLongestSubstring(s: str) -> int:
    char_set = set()
    left = 0
    max_len = 0

    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)

    return max_len`,

  inputs: [
    {
      name: 's',
      type: 'string',
      default: 'abcabcbb',
      label: 'String',
      placeholder: 'abcabcbb',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const s = input.s as string
    const steps: AlgorithmStep[] = []
    const charSet = new Set<string>()
    let left = 0
    let maxLen = 0
    const chars = s.split('').map(c => c.charCodeAt(0))

    steps.push({
      lineNumber: 2,
      description: 'Initialize empty set, left = 0, max_len = 0',
      elements: [
        { type: 'array', id: 'chars', values: chars },
      ],
      variables: { char_set: '{}', left: 0, max_len: 0 },
    })

    for (let right = 0; right < s.length; right++) {
      const char = s[right]

      steps.push({
        lineNumber: 6,
        description: `right = ${right}, char = '${char}'`,
        elements: [
          { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
          { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
          { type: 'array', id: 'chars', values: chars, highlights: [{ index: right, style: 'active' }] },
        ],
        variables: { char, char_set: `{${[...charSet].join(', ')}}`, inSet: charSet.has(char) },
      })

      while (charSet.has(char)) {
        charSet.delete(s[left])
        steps.push({
          lineNumber: 8,
          description: `'${char}' in set! Remove '${s[left]}', left = ${left + 1}`,
          elements: [
            { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
            { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'chars', values: chars, highlights: [
              { index: left, style: 'comparing' },
              { index: right, style: 'active' },
            ]},
          ],
          variables: { removed: s[left], char_set: `{${[...charSet].join(', ')}}` },
        })
        left++
      }

      charSet.add(char)
      const windowLen = right - left + 1
      maxLen = Math.max(maxLen, windowLen)

      steps.push({
        lineNumber: 11,
        description: `Add '${char}', window [${left}..${right}] length = ${windowLen}, max = ${maxLen}`,
        elements: [
          { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
          { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
          { type: 'array', id: 'chars', values: chars, highlights:
            Array.from({ length: right - left + 1 }, (_, i) => ({ index: left + i, style: 'found' as const }))
          },
        ],
        variables: { window_len: windowLen, max_len: maxLen, char_set: `{${[...charSet].join(', ')}}` },
      })

      if (steps.length > 35) break
    }

    steps.push({
      lineNumber: 13,
      description: `Complete! Longest substring length = ${maxLen}`,
      elements: [
        { type: 'array', id: 'chars', values: chars },
      ],
      variables: { max_len: maxLen },
      isComplete: true,
    })

    return steps
  },
}
