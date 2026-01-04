import type { Method } from '../../types'

// Why & When + Basic Implementation
export const trieBasicsMethods: Method[] = [
  // Why & When
  { section: 'Why & When', signature: 'Why use Trie?', description: 'Prefix tree for efficient string operations. O(L) search/insert where L = word length. Use for: autocomplete, spell check, word games.', complexity: 'Concept', example: `# TRIE = Prefix Tree
# Tree where each node represents a character
# Path from root = prefix of words

#           root
#          /    \\
#         a      b
#        /      / \\
#       p      a   e
#      / \\     |   |
#     p   t   t   e*
#    /         |
#   l          *
#   |
#   e*

# Words: apple, apt, bat, bee
# * = end of word marker

# USE CASES:
# - Autocomplete / Type-ahead
# - Spell checker
# - IP routing (longest prefix match)
# - Word games (Boggle, Scrabble)
# - Search engines
# - Storing dictionaries

# COMPLEXITY:
# Insert: O(L) where L = word length
# Search: O(L)
# Prefix search: O(P) where P = prefix length
# Space: O(N * L * alphabet_size) worst case` },
  { section: 'Why & When', signature: 'Trie vs Hash Table', description: 'Trie for prefix operations, hash for exact match. Different trade-offs.', complexity: 'Concept', example: `# TRIE vs HASH TABLE

# Operation           Trie          HashMap
# ────────────────────────────────────────────
# Insert             O(L)          O(L) avg
# Search exact       O(L)          O(L) avg
# Search prefix      O(P)          O(N*L)
# Autocomplete       O(P+K)        O(N*L)
# Space              O(N*L*26)     O(N*L)
# Sorted iteration   Yes           No

# USE TRIE WHEN:
# - Need prefix matching
# - Autocomplete features
# - Many common prefixes (saves space)
# - Need sorted traversal

# USE HASH TABLE WHEN:
# - Only exact matching
# - Random access by key
# - Space is critical
# - Simple implementation needed

# COMMON TRIE OPTIMIZATIONS:
# - Compressed trie (radix tree): merge single-child nodes
# - Array vs HashMap for children
# - Use bit manipulation for alphabet` },

  // Basic Implementation
  { section: 'Basic Implementation', signature: 'Trie Node Structure', description: 'Each node has children map and end-of-word flag.', complexity: 'O(1)', example: `class TrieNode:
    def __init__(self):
        self.children = {}  # char -> TrieNode
        self.is_end = False

# Alternative: Array-based (faster but more memory)
class TrieNodeArray:
    def __init__(self):
        self.children = [None] * 26  # a-z only
        self.is_end = False

    def get_child(self, char):
        return self.children[ord(char) - ord('a')]

    def set_child(self, char, node):
        self.children[ord(char) - ord('a')] = node

# With additional data
class TrieNodeWithCount:
    def __init__(self):
        self.children = {}
        self.is_end = False
        self.count = 0       # Words passing through
        self.word_count = 0  # Words ending here` },
  { section: 'Basic Implementation', signature: 'Basic Trie Operations', description: 'Insert, search, and startsWith. Core trie operations.', complexity: 'O(L)', example: `class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):
        node = self._traverse(word)
        return node is not None and node.is_end

    def startsWith(self, prefix):
        return self._traverse(prefix) is not None

    def _traverse(self, s):
        node = self.root
        for char in s:
            if char not in node.children:
                return None
            node = node.children[char]
        return node

# Usage
trie = Trie()
trie.insert("apple")
trie.insert("app")
print(trie.search("apple"))    # True
print(trie.search("app"))      # True
print(trie.search("ap"))       # False
print(trie.startsWith("ap"))   # True` },
  { section: 'Basic Implementation', signature: 'Delete from Trie', description: 'Remove word while keeping shared prefixes.', complexity: 'O(L)', example: `class Trie:
    def __init__(self):
        self.root = TrieNode()

    def delete(self, word):
        self._delete(self.root, word, 0)

    def _delete(self, node, word, index):
        if index == len(word):
            if not node.is_end:
                return False  # Word doesn't exist
            node.is_end = False
            return len(node.children) == 0  # Can delete if no children

        char = word[index]
        if char not in node.children:
            return False

        child = node.children[char]
        should_delete = self._delete(child, word, index + 1)

        if should_delete:
            del node.children[char]
            return len(node.children) == 0 and not node.is_end

        return False

# Example:
# Trie has: ["apple", "app"]
# delete("apple") -> "app" remains
# delete("app") -> trie empty if no other words` },
]
