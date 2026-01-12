import type { Method } from '../../../types'

export const taskSchedulerMethods: Method[] = [
  { signature: 'Task Scheduler', description: 'Schedule tasks with cooldown. Greedy: schedule most frequent tasks first.', complexity: 'O(n)', section: 'Task Scheduler', example: `def least_interval(tasks, n):
    """
    tasks: list of task labels (e.g., ['A','A','A','B','B'])
    n: cooldown between same tasks
    Return minimum time to finish all tasks
    """
    from collections import Counter

    freq = Counter(tasks)
    max_freq = max(freq.values())
    # Count tasks with maximum frequency
    max_count = sum(1 for f in freq.values() if f == max_freq)

    # Formula: (max_freq - 1) * (n + 1) + max_count
    # Explanation:
    # - (max_freq - 1) full cycles of length (n + 1)
    # - Plus final partial cycle with max_count tasks

    # But we need at least len(tasks) slots
    return max(len(tasks), (max_freq - 1) * (n + 1) + max_count)

# Example: tasks = ['A','A','A','B','B','B'], n = 2
# max_freq = 3 (both A and B), max_count = 2
# (3-1) * (2+1) + 2 = 2 * 3 + 2 = 8
# Schedule: A B _ A B _ A B
#           ^   ^ ^   ^ ^   (8 time units)

# Example: tasks = ['A','A','A','B','B','B'], n = 0
# max(6, 0 + 2) = 6
# Schedule: A B A B A B (no idle needed)` },
]
