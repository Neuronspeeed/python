import type { Method } from '../../../types'

export const queueMethods: Method[] = [
  { signature: 'Queue Reconstruction by Height', description: 'People have height h and count k of taller people in front. Sort and insert.', complexity: 'O(n^2)', section: 'Queue', example: `def reconstruct_queue(people):
    """
    people[i] = [h, k] where h is height and k is
    number of people in front who are taller or equal.
    Return reconstructed queue.
    """
    # Sort by height (descending), then by k (ascending)
    people.sort(key=lambda x: (-x[0], x[1]))

    result = []
    for person in people:
        # Insert at index k (k taller people in front)
        result.insert(person[1], person)

    return result

# Example: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
# Sorted: [[7,0],[7,1],[6,1],[5,0],[5,2],[4,4]]
# Insert [7,0] at index 0: [[7,0]]
# Insert [7,1] at index 1: [[7,0],[7,1]]
# Insert [6,1] at index 1: [[7,0],[6,1],[7,1]]
# Insert [5,0] at index 0: [[5,0],[7,0],[6,1],[7,1]]
# Insert [5,2] at index 2: [[5,0],[7,0],[5,2],[6,1],[7,1]]
# Insert [4,4] at index 4: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]

# WHY IT WORKS: Process tallest first, they don't care
# about shorter people. Shorter people insert without
# disrupting taller people's k values.` },
]
