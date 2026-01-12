import type { Method } from '../../../types'

export const dp2dStringMethods: Method[] = [
  { signature: 'Longest Palindromic Substring', description: 'Find longest palindrome in string. Expand around center or DP.', complexity: 'O(n²)', section: 'String DP', example: `# Expand around center (cleaner)
def longest_palindrome(s):
    def expand(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return s[left + 1:right]

    result = ""
    for i in range(len(s)):
        # Odd length
        odd = expand(i, i)
        if len(odd) > len(result):
            result = odd
        # Even length
        even = expand(i, i + 1)
        if len(even) > len(result):
            result = even

    return result

# DP approach
def longest_palindrome_dp(s):
    n = len(s)
    if n < 2:
        return s

    # dp[i][j] = is s[i:j+1] palindrome?
    dp = [[False] * n for _ in range(n)]
    start, max_len = 0, 1

    # All single chars are palindromes
    for i in range(n):
        dp[i][i] = True

    # Check substrings of length 2 to n
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                if length == 2 or dp[i+1][j-1]:
                    dp[i][j] = True
                    if length > max_len:
                        start, max_len = i, length

    return s[start:start + max_len]

# Example: "babad" -> "bab" or "aba"` },
  { signature: 'Palindrome Substrings Count', description: 'Count all palindromic substrings.', complexity: 'O(n²)', section: 'String DP', example: `def count_substrings(s):
    count = 0

    def expand(left, right):
        nonlocal count
        while left >= 0 and right < len(s) and s[left] == s[right]:
            count += 1
            left -= 1
            right += 1

    for i in range(len(s)):
        expand(i, i)      # Odd length
        expand(i, i + 1)  # Even length

    return count

# Example: "abc" -> 3 (a, b, c)
# Example: "aaa" -> 6 (a, a, a, aa, aa, aaa)` },
]
