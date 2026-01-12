import type { Method } from '../../../types'

export const partitionLabelsMethods: Method[] = [
  { signature: 'Partition Labels', description: 'Split string so each letter appears in at most one part. Track last occurrence of each char.', complexity: 'O(n)', section: 'Partition Labels', example: `def partition_labels(s):
    """
    Return list of partition sizes where each letter
    appears in at most one partition.
    """
    # Find last occurrence of each character
    last = {c: i for i, c in enumerate(s)}

    result = []
    start = 0
    end = 0

    for i, c in enumerate(s):
        # Extend partition to include last occurrence of c
        end = max(end, last[c])

        # If we've reached the end of current partition
        if i == end:
            result.append(end - start + 1)
            start = i + 1

    return result

# Example: s = "ababcbacadefegdehijhklij"
# last = {a:8, b:5, c:7, d:14, e:15, f:11, g:13, h:19, ...}
# i=0 (a): end = 8
# i=1 (b): end = max(8, 5) = 8
# ... continue until i=8, partition size = 9
# Result: [9, 7, 8]` },
]
