import type { Method } from '../../../types'

export const minArrowsMethods: Method[] = [
  { signature: 'Minimum Arrows to Burst Balloons', description: 'Find minimum points to hit all intervals. Track rightmost left boundary.', complexity: 'O(n log n)', section: 'Min Arrows', example: `def find_min_arrow_shots(points):
    """
    points[i] = [start, end] of balloon i
    Arrow at x bursts all balloons where start <= x <= end
    Return minimum arrows to burst all.
    """
    if not points:
        return 0

    # Sort by end position
    points.sort(key=lambda x: x[1])

    arrows = 1
    arrow_pos = points[0][1]  # Shoot at end of first balloon

    for start, end in points[1:]:
        if start > arrow_pos:  # Arrow can't reach this balloon
            arrows += 1
            arrow_pos = end

    return arrows

# Example: points = [[10,16],[2,8],[1,6],[7,12]]
# Sorted by end: [[1,6],[2,8],[7,12],[10,16]]
# Arrow 1 at 6: bursts [1,6] and [2,8]
# Arrow 2 at 12: bursts [7,12] and [10,16]
# Total: 2 arrows

# WHY SORT BY END?
# Shooting at the rightmost point of earliest-ending balloon
# maximizes chance of hitting other balloons` },
]
