export const trieIntro = `Use Tries When...
You need prefix-based operations that hash tables can't handle efficiently. Trie gives O(L) insert/search where L is word length, independent of dictionary size. Perfect for autocomplete (find all words with prefix P in O(P + results)), spell checking, and word games. Choose tries when prefix operations matter more than memory—each node stores character map.

\`\`\`python
class TrieNode:
    def __init__(self):
        self.children = {}     # char -> TrieNode
        self.is_end = False    # Marks word ending

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):    # O(L)
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):    # O(L)
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end
\`\`\`
---
Trie vs Hash Table
Hash table gives O(L) search but can't do prefix operations. Finding all words with prefix P: Trie is O(P + results) by walking to prefix then DFS, hash table is O(N*L) checking every word. Autocomplete with trie walks to prefix in O(P), then collects subtree. Tries use more memory but enable operations impossible with hash tables.

\`\`\`python
# AUTOCOMPLETE - Trie shines
def autocomplete(trie, prefix):
    node = trie.root
    # Walk to prefix - O(P)
    for char in prefix:
        if char not in node.children:
            return []
        node = node.children[char]

    # Collect all words in subtree - O(results)
    results = []
    def dfs(node, path):
        if node.is_end:
            results.append(prefix + path)
        for char, child in node.children.items():
            dfs(child, path + char)

    dfs(node, "")
    return results

# HASH TABLE - Can't do prefix efficiently
word_set = {"apple", "app", "apricot", "banana"}
# To find all starting with "ap": O(N) check every word
prefix_matches = [w for w in word_set if w.startswith("ap")]
\`\`\`
---
Word Search II Pattern
Given grid and dictionary, find all dictionary words in grid. Naive: for each word, DFS grid—O(W * 4^L) for W words. Trie approach: build trie from dictionary, DFS grid while walking trie simultaneously. When grid path doesn't match any trie prefix, prune immediately. Converts checking N words into one DFS guided by trie—O(M*N * 4^L) for MxN grid.

\`\`\`python
def find_words(board, words):
    # Build trie from dictionary
    trie = Trie()
    for word in words:
        trie.insert(word)

    result = set()
    rows, cols = len(board), len(board[0])

    def dfs(r, c, node, path):
        char = board[r][c]
        if char not in node.children:
            return  # Prune: no word has this prefix

        node = node.children[char]
        path += char
        if node.is_end:
            result.add(path)

        # Mark visited
        board[r][c] = '#'
        for dr, dc in [(0,1), (1,0), (0,-1), (-1,0)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != '#':
                dfs(nr, nc, node, path)
        board[r][c] = char  # Restore

    for r in range(rows):
        for c in range(cols):
            dfs(r, c, trie.root, "")

    return list(result)
\`\`\``
