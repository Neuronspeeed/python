import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const longestValidParentheses: AlgorithmDefinition = {
  id: 'longest-valid-parentheses',
  name: 'Longest Valid Parentheses',
  category: 'stack',
  difficulty: 'Hard',
  leetcodeId: 32,
  description: 'Find the length of the longest valid (well-formed) parentheses substring.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  visualizationType: 'stack',

  examples: [
    {
      input: 's = "(()"',
      output: '2',
      explanation: 'Longest valid is "()" at the end.'
    },
    {
      input: 's = ")()())"',
      output: '4',
      explanation: 'Longest valid is "()()" in the middle.'
    },
    {
      input: 's = ""',
      output: '0',
      explanation: 'Empty string has no valid parentheses.'
    },
    {
      input: 's = "()(())"',
      output: '6',
      explanation: 'Entire string is valid!'
    },
  ],

  education: {
    tldr: 'Stack stores indices. Push -1 as base. On match, pop and calculate length from new top.',
    steps: [
      { title: 'Initialize stack with -1', description: 'Base index for calculating length', code: 'stack = [-1]' },
      { title: 'See (', description: 'Push its index', code: 'stack.append(i)' },
      { title: 'See )', description: 'Pop, then calculate length', code: 'stack.pop(); length = i - stack[-1]' },
      { title: 'Stack empty after pop', description: 'Push current index as new base', code: 'if not stack: stack.append(i)' },
    ],
    remember: [
      'Start with -1 (not empty!)',
      'Push index for (',
      'Pop then peek for )',
      'Empty after pop → push new base',
    ],
    understanding: `This is a clever twist on the valid parentheses problem. Instead of checking validity, we track LENGTH.

**Key insight:** After popping a match, the stack top tells us where the valid substring STARTS.

**Why start with -1?** When the first character is '(' and second is ')', after the pop, we need something to calculate length against. \`i - (-1) = 2\` gives correct length.

**What happens with invalid ')'?** When we pop and the stack becomes empty, this ')' can't be matched. We push its index as a new "base" for future calculations.`,

    whyPatternWorks: `The stack maintains boundaries:

1. Each '(' index is pushed—it might be matched later
2. Each ')' pops—if there's a match, calculate length
3. If stack is empty after pop, this ')' is unmatched—it becomes a new boundary

**Example:** ")()())"
- i=0: ')' → pop -1, empty! Push 0 as new base
- i=1: '(' → push 1
- i=2: ')' → pop 1, length = 2 - 0 = 2
- i=3: '(' → push 3
- i=4: ')' → pop 3, length = 4 - 0 = 4
- i=5: ')' → pop 0, empty! Push 5 as new base

Max = 4`,

    keyInsights: [
      'Stack stores indices, not characters',
      'Initialize with -1 as boundary',
      'Pop then peek for length calculation',
      'Empty stack = new boundary needed',
      'Alternative: DP approach exists',
      'Alternative: Two-pass counter approach (O(1) space)'
    ]
  },

  code: `def longestValidParentheses(s: str) -> int:
    stack = [-1]  # Base index
    max_length = 0

    for i, char in enumerate(s):
        if char == '(':
            stack.append(i)
        else:
            stack.pop()
            if not stack:
                stack.append(i)  # New base
            else:
                max_length = max(max_length, i - stack[-1])

    return max_length`,

  inputs: [
    {
      name: 's',
      type: 'string',
      default: ')()())',
      label: 'String',
      placeholder: ')()())',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const s = input.s as string
    const steps: AlgorithmStep[] = []
    const stack: number[] = [-1]
    let maxLength = 0

    steps.push({
      lineNumber: 2,
      description: 'Initialize stack with -1 as base index',
      elements: [
        { type: 'stack', id: 'stack', items: ['-1'] },
      ],
      variables: { max_length: 0 },
    })

    for (let i = 0; i < s.length && steps.length < 25; i++) {
      const char = s[i]

      if (char === '(') {
        stack.push(i)
        steps.push({
          lineNumber: 6,
          description: `'(' at index ${i}: Push ${i} to stack`,
          elements: [
            { type: 'stack', id: 'stack', items: stack.map(String), highlights: [{ index: 0, style: 'active' }] },
          ],
          variables: { i, char, stackTop: stack[stack.length - 1] },
        })
      } else {
        stack.pop()
        if (stack.length === 0) {
          stack.push(i)
          steps.push({
            lineNumber: 10,
            description: `')' at index ${i}: Pop, stack empty! Push ${i} as new base`,
            elements: [
              { type: 'stack', id: 'stack', items: stack.map(String), highlights: [{ index: 0, style: 'comparing' }] },
            ],
            variables: { i, char, newBase: i },
          })
        } else {
          const length = i - stack[stack.length - 1]
          maxLength = Math.max(maxLength, length)
          steps.push({
            lineNumber: 12,
            description: `')' at index ${i}: Pop, length = ${i} - ${stack[stack.length - 1]} = ${length}${length > maxLength - length ? ' (new max!)' : ''}`,
            elements: [
              { type: 'stack', id: 'stack', items: stack.map(String) },
            ],
            variables: { i, char, length, max_length: maxLength },
          })
        }
      }
    }

    steps.push({
      lineNumber: 14,
      description: `Complete! Longest valid parentheses: ${maxLength}`,
      elements: [
        { type: 'stack', id: 'stack', items: stack.map(String) },
      ],
      variables: { result: maxLength },
      isComplete: true,
    })

    return steps
  },
}
