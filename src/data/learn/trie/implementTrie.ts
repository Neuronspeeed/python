import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const implementTrie: AlgorithmDefinition = {
  id: 'implement-trie',
  name: 'Implement Trie',
  category: 'trie',
  difficulty: 'Medium',
  leetcodeId: 208,
  description: 'Implement a trie with insert, search, and startsWith.',
  timeComplexity: 'O(m) per operation',
  spaceComplexity: 'O(n × m)',
  visualizationType: 'array',

  code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def _traverse(self, prefix: str) -> TrieNode:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node

    def search(self, word: str) -> bool:
        node = self._traverse(word)
        return node is not None and node.is_end

    def startsWith(self, prefix: str) -> bool:
        return self._traverse(prefix) is not None`,

  inputs: [
    {
      name: 'words',
      type: 'string',
      default: 'apple,app,apply',
      label: 'Words to insert',
      placeholder: 'apple,app,apply',
    },
    {
      name: 'search',
      type: 'string',
      default: 'app',
      label: 'Word to search',
      placeholder: 'app',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const wordsStr = input.words as string
    const words = wordsStr.split(',').map(w => w.trim()).filter(w => w.length > 0)
    const searchWord = input.search as string
    const steps: AlgorithmStep[] = []

    // Simulate trie structure as array of paths
    const paths: string[] = []

    steps.push({
      lineNumber: 7,
      description: 'Initialize empty Trie',
      elements: [
        { type: 'array', id: 'trie', values: [] },
      ],
      variables: { root: '{}' },
    })

    // Insert words
    for (const word of words) {
      if (steps.length >= 15) break

      let path = ''
      for (let i = 0; i < word.length && steps.length < 15; i++) {
        path += word[i]
        if (!paths.includes(path)) {
          paths.push(path)
        }
      }

      steps.push({
        lineNumber: 15,
        description: `Insert "${word}" - path: ${word.split('').join(' → ')}`,
        elements: [
          { type: 'array', id: 'paths', values: paths.map(p => p.length) },
        ],
        variables: { word, pathsCount: paths.length },
      })
    }

    // Search
    steps.push({
      lineNumber: 18,
      description: `Search for "${searchWord}"`,
      elements: [
        { type: 'array', id: 'paths', values: paths.map(p => p.length) },
      ],
      variables: { searching: searchWord },
    })

    const found = words.includes(searchWord)
    const isPrefix = words.some(w => w.startsWith(searchWord))

    steps.push({
      lineNumber: 20,
      description: `"${searchWord}" ${found ? 'found as complete word' : isPrefix ? 'is a prefix but not a word' : 'not found'}`,
      elements: [
        { type: 'array', id: 'result', values: [found ? 1 : 0], highlights: [{ index: 0, style: found ? 'found' as const : 'comparing' as const }] },
      ],
      variables: { found, isPrefix },
      isComplete: true,
    })

    return steps
  },
}
