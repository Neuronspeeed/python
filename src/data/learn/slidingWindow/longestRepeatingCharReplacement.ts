import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const longestRepeatingCharReplacement: AlgorithmDefinition = {
  id: 'longest-repeating-char-replacement',
  name: 'Longest Repeating Character Replacement',
  category: 'slidingWindow',
  difficulty: 'Medium',
  leetcodeId: 424,
  description: 'Find the length of longest substring with same letter after replacing at most k characters.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  examples: [
    {
      input: 's = "ABAB", k = 2',
      output: '4',
      explanation: 'Replace 2 As with Bs (or vice versa) to get "AAAA" or "BBBB".'
    },
    {
      input: 's = "AABABBA", k = 1',
      output: '4',
      explanation: 'Replace one B in "AABA" to get "AAAA".'
    },
  ],

  education: {
    tldr: 'Window is valid if (length - max_freq) <= k. Expand right, shrink left when invalid.',
    steps: [
      { title: 'Expand right', description: 'Add char, update frequency', code: 'count[char]++' },
      { title: 'Track max freq', description: 'Most common char in window', code: 'max_freq = max(counts)' },
      { title: 'Check validity', description: 'Replacements needed = length - max_freq', code: 'if len - max_freq > k: shrink' },
      { title: 'Update result', description: 'Track longest valid window', code: 'result = max(result, right - left + 1)' },
    ],
    remember: [
      'Replacements needed = window_len - max_freq',
      'Keep most frequent char, replace others',
      'Shrink when replacements > k',
    ],
    understanding: `For any window, the minimum replacements needed equals: window_length - count of most frequent char.

**Why?** We keep the most common character and replace all others. If this number exceeds k, the window is invalid.

**Key insight:** We don't actually replace anything. We just check IF we could make all chars the same with ≤ k replacements.

**Optimization:** We don't need to track exact max_freq. If it never increases, shrinking doesn't help—we only care about finding longer valid windows.`,

    whyPatternWorks: `This is variable-size sliding window with a validity condition:

**Valid window:** replacements_needed ≤ k
**replacements_needed:** window_length - max_char_frequency

When invalid (too many replacements needed), we shrink from left. When valid, we try to expand right.`,

    keyInsights: [
      'replacements = len - max_freq_in_window',
      'Shrink when replacements > k',
      'max_freq only needs to track the historical max (optimization)',
      'O(26) = O(1) space for letter frequencies',
      'Each char added/removed at most once = O(n)'
    ]
  },

  code: `def characterReplacement(s: str, k: int) -> int:
    count = {}
    max_freq = 0
    left = 0
    result = 0

    for right in range(len(s)):
        count[s[right]] = count.get(s[right], 0) + 1
        max_freq = max(max_freq, count[s[right]])

        # Window is invalid if we need more than k replacements
        while (right - left + 1) - max_freq > k:
            count[s[left]] -= 1
            left += 1

        result = max(result, right - left + 1)

    return result`,

  inputs: [
    {
      name: 's',
      type: 'string',
      default: 'AABABBA',
      label: 'String',
      placeholder: 'AABABBA',
    },
    {
      name: 'k',
      type: 'number',
      default: 1,
      label: 'Max Replacements (k)',
      placeholder: '1',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const s = input.s as string
    const k = input.k as number
    const steps: AlgorithmStep[] = []
    const chars = s.split('').map(c => c.charCodeAt(0))

    const count: Record<string, number> = {}
    let maxFreq = 0
    let left = 0
    let result = 0

    steps.push({
      lineNumber: 2,
      description: `Initialize: k = ${k} replacements allowed`,
      elements: [
        { type: 'array', id: 'chars', values: chars },
      ],
      variables: { k, max_freq: 0, result: 0 },
    })

    for (let right = 0; right < s.length; right++) {
      const char = s[right]
      count[char] = (count[char] || 0) + 1
      maxFreq = Math.max(maxFreq, count[char])
      const windowLen = right - left + 1
      const replacements = windowLen - maxFreq

      steps.push({
        lineNumber: 9,
        description: `Add '${char}': window [${left}..${right}], max_freq=${maxFreq}, need ${replacements} replacements`,
        elements: [
          { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
          { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
          { type: 'array', id: 'chars', values: chars, highlights: [
            { index: right, style: 'active' },
          ]},
        ],
        variables: { window_len: windowLen, max_freq: maxFreq, replacements, k },
      })

      while ((right - left + 1) - maxFreq > k) {
        steps.push({
          lineNumber: 12,
          description: `Invalid! ${right - left + 1} - ${maxFreq} = ${(right - left + 1) - maxFreq} > ${k}. Shrink left.`,
          elements: [
            { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
            { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'chars', values: chars, highlights: [
              { index: left, style: 'comparing' },
            ]},
          ],
          variables: { shrinking: true },
        })

        count[s[left]]--
        left++
      }

      result = Math.max(result, right - left + 1)

      steps.push({
        lineNumber: 16,
        description: `Valid window [${left}..${right}], length = ${right - left + 1}. Result = ${result}`,
        elements: [
          { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
          { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
          { type: 'array', id: 'chars', values: chars, highlights:
            Array.from({ length: right - left + 1 }, (_, i) => ({ index: left + i, style: 'found' as const }))
          },
        ],
        variables: { result, window_len: right - left + 1 },
      })

      if (steps.length > 30) break
    }

    steps.push({
      lineNumber: 18,
      description: `Complete! Longest = ${result}`,
      elements: [
        { type: 'array', id: 'chars', values: chars },
      ],
      variables: { result },
      isComplete: true,
    })

    return steps
  },
}
