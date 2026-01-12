export const backtrackingIntro = `Backtracking for Combinatorial Search
Build candidates incrementally, backtrack from invalid branches early. O(2ⁿ) or O(n!) but prunes dead ends. Use for permutations, combinations, subsets, N-Queens, Sudoku.

\`\`\`python
def backtrack(path, choices):
    if is_valid_solution(path):
        result.append(path[:])
        return
    for choice in choices:
        if is_valid(choice):
            path.append(choice)
            backtrack(path, next_choices())
            path.pop()  # Undo choice

def subsets(nums):
    result = []
    def bt(start, path):
        result.append(path[:])
        for i in range(start, len(nums)):
            bt(i + 1, path + [nums[i]])
    bt(0, [])
    return result
\`\`\`python
---
N-Queens Pattern
Place N queens row by row, check column/diagonal conflicts, backtrack on invalid placement.

\`\`\`python
def solve_n_queens(n):
    result, cols, d1, d2 = [], set(), set(), set()
    board = [['.'] * n for _ in range(n)]

    def bt(row):
        if row == n:
            result.append([''.join(r) for r in board])
            return
        for col in range(n):
            if col in cols or (row-col) in d1 or (row+col) in d2:
                continue
            board[row][col] = 'Q'
            cols.add(col)
            d1.add(row - col)
            d2.add(row + col)
            bt(row + 1)
            board[row][col] = '.'
            cols.remove(col)
            d1.remove(row - col)
            d2.remove(row + col)
    bt(0)
    return result
\`\`\`python
---
Combination Sum Pattern
Backtrack with running sum, prune when exceeds target. Can reuse or not based on problem.

\`\`\`python
def combination_sum(candidates, target):
    result = []
    def bt(start, path, total):
        if total == target:
            result.append(path[:])
            return
        if total > target: return
        for i in range(start, len(candidates)):
            bt(i, path + [candidates[i]], total + candidates[i])  # Can reuse
    bt(0, [], 0)
    return result

def combination_sum2(candidates, target):  # No reuse
    candidates.sort()
    result = []
    def bt(start, path, total):
        if total == target:
            result.append(path[:])
            return
        if total > target: return
        for i in range(start, len(candidates)):
            if i > start and candidates[i] == candidates[i-1]: continue
            bt(i + 1, path + [candidates[i]], total + candidates[i])
    bt(0, [], 0)
    return result
\`\`\`python
`
