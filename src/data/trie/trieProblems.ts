import type { Method } from '../../types'

// Advanced Operations + Problems
export const trieProblemsMethods: Method[] = [
  // Advanced Operations
  { section: 'Advanced Operations', signature: 'Autocomplete', description: 'Find all words with given prefix. DFS from prefix node.', complexity: 'O(P + N)', example: `class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def autocomplete(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return []
            node = node.children[char]

        # DFS to find all words from this node
        result = []
        self._dfs(node, prefix, result)
        return result

    def _dfs(self, node, prefix, result):
        if node.is_end:
            result.append(prefix)
        for char, child in node.children.items():
            self._dfs(child, prefix + char, result)

# Usage
trie = Trie()
for word in ["apple", "application", "apply", "apt", "bat"]:
    trie.insert(word)

print(trie.autocomplete("app"))
# Output: ["apple", "application", "apply"]

# Top K autocomplete (with frequency)
# Store frequency in node, use heap for top K` },
  { section: 'Advanced Operations', signature: 'Count Words with Prefix', description: 'Count words starting with prefix. Store count in nodes.', complexity: 'O(P)', example: `class TrieWithCount:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
            node.count = getattr(node, 'count', 0) + 1
        node.is_end = True

    def count_prefix(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return 0
            node = node.children[char]
        return node.count

    def count_exact(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return 0
            node = node.children[char]
        return 1 if node.is_end else 0

# Usage
trie = TrieWithCount()
trie.insert("apple")
trie.insert("application")
trie.insert("apply")

print(trie.count_prefix("app"))  # 3
print(trie.count_prefix("appl")) # 2` },
  { section: 'Advanced Operations', signature: 'Longest Common Prefix', description: 'Find longest prefix common to all words.', complexity: 'O(S)', example: `def longest_common_prefix(words):
    if not words:
        return ""

    # Build trie
    root = TrieNode()
    for word in words:
        node = root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    # Traverse until branch or end
    prefix = []
    node = root
    while len(node.children) == 1 and not node.is_end:
        char = next(iter(node.children))
        prefix.append(char)
        node = node.children[char]

    return ''.join(prefix)

# Alternative: horizontal scanning
def longest_common_prefix_scan(words):
    if not words:
        return ""

    prefix = words[0]
    for word in words[1:]:
        while not word.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                return ""
    return prefix

# Example: ["flower", "flow", "flight"]
# Output: "fl"` },

  // Problems
  { section: 'Problems', signature: 'Word Search II (Boggle)', description: 'Find all words from dictionary in a board. Trie + DFS.', complexity: 'O(M*N*4^L)', example: `def find_words(board, words):
    # Build trie from words
    root = TrieNode()
    for word in words:
        node = root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.word = word  # Store word at end

    m, n = len(board), len(board[0])
    result = set()

    def dfs(i, j, node):
        char = board[i][j]
        if char not in node.children:
            return

        child = node.children[char]
        if hasattr(child, 'word'):
            result.add(child.word)
            del child.word  # Avoid duplicates

        # Mark as visited
        board[i][j] = '#'

        # Explore neighbors
        for di, dj in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ni, nj = i + di, j + dj
            if 0 <= ni < m and 0 <= nj < n and board[ni][nj] != '#':
                dfs(ni, nj, child)

        # Restore
        board[i][j] = char

        # Prune empty branches
        if not child.children:
            del node.children[char]

    for i in range(m):
        for j in range(n):
            dfs(i, j, root)

    return list(result)

# Example:
# board = [["o","a","a","n"],
#          ["e","t","a","e"],
#          ["i","h","k","r"],
#          ["i","f","l","v"]]
# words = ["oath","pea","eat","rain"]
# Output: ["oath","eat"]` },
  { section: 'Problems', signature: 'Add and Search Word', description: 'Support wildcard search (.) in trie.', complexity: 'O(26^M) worst', example: `class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):
        return self._search(word, 0, self.root)

    def _search(self, word, index, node):
        if index == len(word):
            return node.is_end

        char = word[index]

        if char == '.':
            # Try all children
            for child in node.children.values():
                if self._search(word, index + 1, child):
                    return True
            return False
        else:
            if char not in node.children:
                return False
            return self._search(word, index + 1, node.children[char])

# Usage
wd = WordDictionary()
wd.addWord("bad")
wd.addWord("dad")
wd.addWord("mad")

print(wd.search("pad"))  # False
print(wd.search("bad"))  # True
print(wd.search(".ad"))  # True
print(wd.search("b.."))  # True` },
  { section: 'Problems', signature: 'Replace Words (Root Dictionary)', description: 'Replace words with their shortest root prefix.', complexity: 'O(S)', example: `def replace_words(dictionary, sentence):
    # Build trie from dictionary
    root = TrieNode()
    for word in dictionary:
        node = root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def find_root(word):
        node = root
        for i, char in enumerate(word):
            if char not in node.children:
                return word  # No root found
            node = node.children[char]
            if node.is_end:
                return word[:i+1]  # Return shortest root
        return word

    words = sentence.split()
    return ' '.join(find_root(word) for word in words)

# Example:
# dictionary = ["cat", "bat", "rat"]
# sentence = "the cattle was rattled by the battery"
# Output: "the cat was rat by the bat"

# Example:
# dictionary = ["a", "b", "c"]
# sentence = "aadsfasf absbs bbab cadsfabd"
# Output: "a]'a b c"` },
  { section: 'Problems', signature: 'Map Sum Pairs', description: 'Sum values of all keys with given prefix.', complexity: 'O(P + K)', example: `class MapSum:
    def __init__(self):
        self.root = TrieNode()
        self.map = {}  # Store previous values

    def insert(self, key, val):
        # Calculate delta if key exists
        delta = val - self.map.get(key, 0)
        self.map[key] = val

        # Update all prefix sums
        node = self.root
        node.sum = getattr(node, 'sum', 0) + delta
        for char in key:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
            node.sum = getattr(node, 'sum', 0) + delta

    def sum_prefix(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return 0
            node = node.children[char]
        return node.sum

# Usage
ms = MapSum()
ms.insert("apple", 3)
print(ms.sum_prefix("ap"))  # 3
ms.insert("app", 2)
print(ms.sum_prefix("ap"))  # 5
ms.insert("apple", 5)       # Update apple
print(ms.sum_prefix("ap"))  # 7 (5 + 2)` },
  { section: 'Problems', signature: 'Palindrome Pairs', description: 'Find all pairs where concatenation is palindrome.', complexity: 'O(N * L²)', example: `def palindrome_pairs(words):
    def is_palindrome(s):
        return s == s[::-1]

    # Build trie of reversed words
    root = TrieNode()
    for i, word in enumerate(words):
        node = root
        for char in reversed(word):
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.index = i

    result = []

    for i, word in enumerate(words):
        node = root
        for j, char in enumerate(word):
            # Check if remaining suffix is palindrome
            if hasattr(node, 'index') and node.index != i:
                if is_palindrome(word[j:]):
                    result.append([i, node.index])

            if char not in node.children:
                break
            node = node.children[char]
        else:
            # Finished traversing word, find remaining palindrome suffixes
            def dfs(node, path):
                if hasattr(node, 'index') and node.index != i:
                    if is_palindrome(path):
                        result.append([i, node.index])
                for c, child in node.children.items():
                    dfs(child, path + c)

            dfs(node, '')

    return result

# Example: ["abcd", "dcba", "lls", "s", "sssll"]
# Output: [[0,1], [1,0], [3,2], [2,4]]
# "abcd" + "dcba" = "abcddcba"
# "lls" + "s" = "llss" (not palindrome)
# "s" + "lls" = "slls" (palindrome)` },
]
