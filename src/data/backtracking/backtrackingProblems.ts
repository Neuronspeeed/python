import type { Method } from '../../types'

// Classic Backtracking Problems
export const backtrackingProblemsMethods: Method[] = [
  // Why & When
  { signature: 'When to use backtracking', description: 'Pattern: explore all possibilities with constraints. Recognize by: "all combinations", "all permutations", "solve puzzle". Complexity often exponential.', complexity: 'Concept', section: 'Why & When', example: `# BACKTRACKING SIGNALS:
# 1. "Find all solutions/combinations/permutations"
# 2. Constraint satisfaction (Sudoku, N-Queens)
# 3. Exhaustive search with pruning
# 4. Build solution incrementally, backtrack on failure

# USE BACKTRACKING:
# ✓ Generate all subsets/combinations
# ✓ N-Queens, Sudoku puzzles
# ✓ Word search in grid
# ✓ Generate valid parentheses
# ✓ Permutations with constraints

# DON'T USE (other techniques better):
# ✗ Shortest path → BFS/Dijkstra
# ✗ Optimization with overlapping subproblems → DP
# ✗ Single valid solution exists → Greedy might work
# ✗ n > 20-25 → Too slow (exponential)

# COMPLEXITY WARNING:
# Backtracking is SLOW (exponential)
# n = 10: ~millions operations
# n = 20: ~trillions operations
# n = 30: won't finish!

# Use when:
# - n is small (<20)
# - Need ALL solutions
# - Pruning reduces search space significantly
# - No better alternative exists`,
  },
  { signature: 'Backtracking template and pruning', description: 'Core pattern: choose → explore → unchoose. Pruning is critical - prune early, prune often. Without pruning, exponential explodes.', complexity: 'Concept', section: 'Why & When', example: `# BACKTRACKING TEMPLATE
def backtrack(state, choices, result):
    # Base case: solution found
    if is_solution(state):
        result.append(state.copy())
        return

    for choice in choices:
        # PRUNE: Skip invalid choices early
        if not is_valid(choice, state):
            continue

        # Choose
        state.add(choice)

        # Explore
        backtrack(state, choices, result)

        # Unchoose (backtrack)
        state.remove(choice)

# PRUNING EXAMPLES:

# Bad: Check validity after building
def generate_permutations_slow(nums):
    def backtrack(perm):
        if len(perm) == len(nums):
            if is_valid(perm):  # Too late!
                result.append(perm[:])
            return
        for num in nums:
            if num not in perm:
                perm.append(num)
                backtrack(perm)
                perm.pop()

# Good: Prune early
def generate_permutations_fast(nums):
    def backtrack(perm):
        if len(perm) == len(nums):
            result.append(perm[:])  # Already valid
            return
        for num in nums:
            if num in perm:  # PRUNE early!
                continue
            perm.append(num)
            backtrack(perm)
            perm.pop()

# PRUNING IMPACT:
# N-Queens without pruning: O(n^n)
# N-Queens with pruning: O(n!)
# For n=8: 16M vs 40k solutions checked!

# Pruning strategies:
# 1. Check constraints before recursion
# 2. Use sets for O(1) conflict detection
# 3. Sort choices (try promising first)
# 4. Memoize impossible states (DP hybrid)`,
  },
  { signature: 'Backtracking vs DP - when to choose which', description: 'Backtracking: need all solutions, no overlapping subproblems. DP: optimal solution, overlapping subproblems. Sometimes both work.', complexity: 'Concept', section: 'Why & When', example: `# BACKTRACKING PROBLEMS:
# - Generate all permutations
# - N-Queens (all solutions)
# - Sudoku solver
# - Word search in grid
# Common: Need ALL solutions

# DP PROBLEMS:
# - Longest increasing subsequence
# - Coin change (min coins)
# - Edit distance
# Common: ONE optimal solution, overlapping subproblems

# HYBRID (both can work):

# Problem: Count ways to partition string into palindromes
# Backtracking: Generate all, count
def count_partitions_bt(s):
    count = 0
    def backtrack(start, path):
        nonlocal count
        if start == len(s):
            count += 1
            return
        for end in range(start + 1, len(s) + 1):
            if is_palindrome(s[start:end]):
                backtrack(end, path + [s[start:end]])
    backtrack(0, [])
    return count
# O(2^n) - explores all partitions

# DP: Count without generating
def count_partitions_dp(s):
    n = len(s)
    dp = [0] * (n + 1)
    dp[0] = 1
    for i in range(1, n + 1):
        for j in range(i):
            if is_palindrome(s[j:i]):
                dp[i] += dp[j]
    return dp[n]
# O(n²) - much faster!

# DECISION:
# Need ALL solutions → Backtracking
# Need COUNT only → DP (if overlapping)
# Need ONE optimal → DP
# Small input (<20) → Backtracking ok
# Large input → DP if possible

# Example confusion:
# "Generate all subsets" → Backtracking (need all)
# "Find longest subset with property" → DP (one optimal)`,
  },

  // Classic Problems
  { signature: 'N-Queens', description: 'Place N queens on NxN board so none attack each other.', complexity: 'O(n!)', section: 'Classic Problems', example: `def solve_n_queens(n):
    result = []
    board = [['.'] * n for _ in range(n)]

    def is_safe(row, col):
        # Check column
        for i in range(row):
            if board[i][col] == 'Q':
                return False
        # Check upper-left diagonal
        i, j = row - 1, col - 1
        while i >= 0 and j >= 0:
            if board[i][j] == 'Q':
                return False
            i -= 1
            j -= 1
        # Check upper-right diagonal
        i, j = row - 1, col + 1
        while i >= 0 and j < n:
            if board[i][j] == 'Q':
                return False
            i -= 1
            j += 1
        return True

    def backtrack(row):
        if row == n:
            result.append([''.join(r) for r in board])
            return

        for col in range(n):
            if is_safe(row, col):
                board[row][col] = 'Q'
                backtrack(row + 1)
                board[row][col] = '.'

    backtrack(0)
    return result

# Optimized with sets for O(1) conflict check
def solve_n_queens_opt(n):
    result = []
    cols = set()
    diag1 = set()  # row - col
    diag2 = set()  # row + col
    board = [['.'] * n for _ in range(n)]

    def backtrack(row):
        if row == n:
            result.append([''.join(r) for r in board])
            return

        for col in range(n):
            if col in cols or row - col in diag1 or row + col in diag2:
                continue

            cols.add(col)
            diag1.add(row - col)
            diag2.add(row + col)
            board[row][col] = 'Q'

            backtrack(row + 1)

            cols.remove(col)
            diag1.remove(row - col)
            diag2.remove(row + col)
            board[row][col] = '.'

    backtrack(0)
    return result` },
  { signature: 'Sudoku Solver', description: 'Fill 9x9 grid so each row, column, and 3x3 box has digits 1-9.', complexity: 'O(9^(empty cells))', section: 'Classic Problems', example: `def solve_sudoku(board):
    def is_valid(row, col, num):
        # Check row
        if num in board[row]:
            return False
        # Check column
        if num in [board[i][col] for i in range(9)]:
            return False
        # Check 3x3 box
        box_row, box_col = 3 * (row // 3), 3 * (col // 3)
        for i in range(box_row, box_row + 3):
            for j in range(box_col, box_col + 3):
                if board[i][j] == num:
                    return False
        return True

    def solve():
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    for num in '123456789':
                        if is_valid(i, j, num):
                            board[i][j] = num
                            if solve():
                                return True
                            board[i][j] = '.'
                    return False  # No valid number
        return True  # All cells filled

    solve()

# Optimized with sets
def solve_sudoku_opt(board):
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    empty = []

    for i in range(9):
        for j in range(9):
            if board[i][j] != '.':
                num = board[i][j]
                rows[i].add(num)
                cols[j].add(num)
                boxes[(i // 3) * 3 + j // 3].add(num)
            else:
                empty.append((i, j))

    def backtrack(idx):
        if idx == len(empty):
            return True
        i, j = empty[idx]
        box_idx = (i // 3) * 3 + j // 3

        for num in '123456789':
            if num not in rows[i] and num not in cols[j] and num not in boxes[box_idx]:
                board[i][j] = num
                rows[i].add(num)
                cols[j].add(num)
                boxes[box_idx].add(num)

                if backtrack(idx + 1):
                    return True

                board[i][j] = '.'
                rows[i].remove(num)
                cols[j].remove(num)
                boxes[box_idx].remove(num)

        return False

    backtrack(0)` },
  { signature: 'Word Search', description: 'Find if word exists in grid by moving adjacent cells.', complexity: 'O(m*n*4^L)', section: 'Classic Problems', example: `def exist(board, word):
    m, n = len(board), len(board[0])

    def backtrack(i, j, k):
        if k == len(word):
            return True

        if i < 0 or i >= m or j < 0 or j >= n:
            return False
        if board[i][j] != word[k]:
            return False

        # Mark as visited
        temp = board[i][j]
        board[i][j] = '#'

        # Explore all 4 directions
        found = (backtrack(i + 1, j, k + 1) or
                 backtrack(i - 1, j, k + 1) or
                 backtrack(i, j + 1, k + 1) or
                 backtrack(i, j - 1, k + 1))

        # Restore
        board[i][j] = temp
        return found

    for i in range(m):
        for j in range(n):
            if backtrack(i, j, 0):
                return True
    return False

# Example:
# board = [["A","B","C","E"],
#          ["S","F","C","S"],
#          ["A","D","E","E"]]
# word = "ABCCED" -> True
# word = "SEE" -> True
# word = "ABCB" -> False` },
  { signature: 'Palindrome Partitioning', description: 'Partition string into all possible palindrome substrings.', complexity: 'O(n * 2^n)', section: 'Classic Problems', example: `def partition(s):
    result = []

    def is_palindrome(sub):
        return sub == sub[::-1]

    def backtrack(start, path):
        if start == len(s):
            result.append(path[:])
            return

        for end in range(start + 1, len(s) + 1):
            substring = s[start:end]
            if is_palindrome(substring):
                path.append(substring)
                backtrack(end, path)
                path.pop()

    backtrack(0, [])
    return result

# Example: "aab"
# Output: [["a","a","b"], ["aa","b"]]

# Optimized with DP for palindrome check
def partition_opt(s):
    n = len(s)
    # Precompute palindrome DP
    is_pal = [[False] * n for _ in range(n)]
    for i in range(n - 1, -1, -1):
        for j in range(i, n):
            if s[i] == s[j] and (j - i <= 2 or is_pal[i + 1][j - 1]):
                is_pal[i][j] = True

    result = []

    def backtrack(start, path):
        if start == n:
            result.append(path[:])
            return
        for end in range(start, n):
            if is_pal[start][end]:
                path.append(s[start:end + 1])
                backtrack(end + 1, path)
                path.pop()

    backtrack(0, [])
    return result` },
  { signature: 'Generate Parentheses', description: 'Generate all valid combinations of n pairs of parentheses.', complexity: 'O(4^n / sqrt(n))', section: 'Classic Problems', example: `def generate_parenthesis(n):
    result = []

    def backtrack(path, open_count, close_count):
        if len(path) == 2 * n:
            result.append(''.join(path))
            return

        # Can add open if we haven't used all
        if open_count < n:
            path.append('(')
            backtrack(path, open_count + 1, close_count)
            path.pop()

        # Can add close if it won't exceed open
        if close_count < open_count:
            path.append(')')
            backtrack(path, open_count, close_count + 1)
            path.pop()

    backtrack([], 0, 0)
    return result

# Example: n = 3
# Output: ["((()))","(()())","(())()","()(())","()()()"]

# String version (slightly cleaner)
def generate_parenthesis_str(n):
    result = []

    def backtrack(s, open_count, close_count):
        if len(s) == 2 * n:
            result.append(s)
            return
        if open_count < n:
            backtrack(s + '(', open_count + 1, close_count)
        if close_count < open_count:
            backtrack(s + ')', open_count, close_count + 1)

    backtrack('', 0, 0)
    return result` },
  { signature: 'Letter Combinations of Phone', description: 'Generate all letter combinations from phone digits.', complexity: 'O(4^n)', section: 'Classic Problems', example: `def letter_combinations(digits):
    if not digits:
        return []

    phone = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    }

    result = []

    def backtrack(index, path):
        if index == len(digits):
            result.append(''.join(path))
            return

        for letter in phone[digits[index]]:
            path.append(letter)
            backtrack(index + 1, path)
            path.pop()

    backtrack(0, [])
    return result

# Example: "23"
# Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

# Iterative BFS-style
def letter_combinations_iter(digits):
    if not digits:
        return []

    phone = {'2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
             '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'}

    result = ['']
    for digit in digits:
        result = [prefix + letter
                  for prefix in result
                  for letter in phone[digit]]
    return result` },
]
