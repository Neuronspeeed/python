import type { Method } from '../../../types'

export const assignMethods: Method[] = [
  { signature: 'Assign Cookies', description: 'Match greedy children with smallest sufficient cookies. Sort both arrays.', complexity: 'O(n log n)', section: 'Assign', example: `def find_content_children(g, s):
    """
    g[i] = greed factor of child i
    s[j] = size of cookie j
    Return max number of content children.
    """
    g.sort()  # Children by greed
    s.sort()  # Cookies by size

    child = 0
    cookie = 0

    while child < len(g) and cookie < len(s):
        if s[cookie] >= g[child]:
            # Cookie satisfies child
            child += 1
        cookie += 1  # Try next cookie

    return child

# Example: g = [1, 2, 3], s = [1, 1]
# Sorted g: [1, 2, 3], s: [1, 1]
# cookie[0]=1 >= g[0]=1: satisfied, child=1
# cookie[1]=1 < g[1]=2: not satisfied, try next cookie
# No more cookies, return 1

# GREEDY INSIGHT: Give smallest sufficient cookie to each child
# This saves larger cookies for greedier children` },
]
