import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const wordSearch: AlgorithmDefinition = {
  id: 'word-search-ii',
  name: 'Word Search II',
  category: 'trie',
  difficulty: 'Hard',
  leetcodeId: 212,
  description: 'Find all words from dictionary that exist in the board.',
  timeComplexity: 'O(m × n × 4^L)',
  spaceComplexity: 'O(W × L)',
  visualizationType: 'matrix',

  code: `def findWords(board: list[list[str]], words: list[str]) -> list[str]:
    # Build Trie from words
    trie = {}
    for word in words:
        node = trie
        for char in word:
            node = node.setdefault(char, {})
        node['$'] = word

    # DFS from each cell
    result = set()
    m, n = len(board), len(board[0])

    def dfs(i, j, node):
        char = board[i][j]
        if char not in node:
            return
        next_node = node[char]
        if '$' in next_node:
            result.add(next_node['$'])

        board[i][j] = '#'
        for di, dj in [(0,1),(0,-1),(1,0),(-1,0)]:
            ni, nj = i + di, j + dj
            if 0 <= ni < m and 0 <= nj < n and board[ni][nj] != '#':
                dfs(ni, nj, next_node)
        board[i][j] = char

    for i in range(m):
        for j in range(n):
            dfs(i, j, trie)

    return list(result)`,

  inputs: [
    {
      name: 'board',
      type: 'string',
      default: 'oaan|etae|ihkr|iflv',
      label: 'Board (rows separated by |)',
      placeholder: 'oaan|etae|ihkr|iflv',
    },
    {
      name: 'words',
      type: 'string',
      default: 'oath,eat,hike',
      label: 'Words to find',
      placeholder: 'oath,eat,hike',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const boardStr = input.board as string
    const board = boardStr.split('|').map(row => row.split(''))
    const wordsStr = input.words as string
    const words = wordsStr.split(',').map(w => w.trim())
    const steps: AlgorithmStep[] = []

    const m = board.length
    const n = board[0]?.length || 0
    const flatBoard = board.flat()

    steps.push({
      lineNumber: 3,
      description: `Build Trie from words: [${words.join(', ')}]`,
      elements: [
        { type: 'array', id: 'board', values: flatBoard },
      ],
      variables: { words, boardSize: `${m}×${n}` },
    })

    // DFS to find word in board
    const findWord = (word: string): number[] | null => {
      const visited = new Set<string>()

      const dfs = (i: number, j: number, idx: number, path: number[]): number[] | null => {
        if (idx === word.length) return path
        if (i < 0 || i >= m || j < 0 || j >= n) return null
        const key = `${i},${j}`
        if (visited.has(key) || board[i][j] !== word[idx]) return null

        visited.add(key)
        path.push(i * n + j)

        const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]]
        for (const [di, dj] of dirs) {
          const result = dfs(i + di, j + dj, idx + 1, path)
          if (result) return result
        }

        visited.delete(key)
        path.pop()
        return null
      }

      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          const result = dfs(i, j, 0, [])
          if (result) return result
        }
      }
      return null
    }

    const found: string[] = []

    for (const word of words) {
      if (steps.length >= 12) break

      const path = findWord(word)
      if (path) {
        const highlights = path.map(idx => ({ index: idx, style: 'found' as const }))
        found.push(word)
        steps.push({
          lineNumber: 18,
          description: `Found "${word}" via DFS path`,
          elements: [
            { type: 'array', id: 'board', values: flatBoard, highlights },
          ],
          variables: { word, pathLength: path.length },
        })
      } else {
        steps.push({
          lineNumber: 20,
          description: `"${word}" not found - no valid path`,
          elements: [
            { type: 'array', id: 'board', values: flatBoard },
          ],
          variables: { word, found: false },
        })
      }
    }

    steps.push({
      lineNumber: 30,
      description: `Complete! Found ${found.length} words: [${found.join(', ') || 'none'}]`,
      elements: [
        { type: 'array', id: 'result', values: found.length > 0 ? found.map((_, i) => i + 1) : [0], highlights: found.map((_, i) => ({ index: i, style: 'found' as const })) },
      ],
      variables: { result: found },
      isComplete: true,
    })

    return steps
  },
}
