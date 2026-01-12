import type { Method } from '../../../types'

export const classicProblemsMethods: Method[] = [
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
