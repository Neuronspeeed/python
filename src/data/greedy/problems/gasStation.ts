import type { Method } from '../../../types'

export const gasStationMethods: Method[] = [
  { signature: 'Gas Station', description: 'Find starting station to complete circuit. Track total gas and current tank.', complexity: 'O(n)', section: 'Gas Station', example: `def can_complete_circuit(gas, cost):
    """
    gas[i] = gas at station i
    cost[i] = cost to travel from i to i+1
    Return starting station index, or -1 if impossible
    """
    total_tank = 0
    current_tank = 0
    start = 0

    for i in range(len(gas)):
        total_tank += gas[i] - cost[i]
        current_tank += gas[i] - cost[i]

        # Can't reach next station from current start
        if current_tank < 0:
            start = i + 1  # Try starting from next station
            current_tank = 0

    # If total gas >= total cost, solution exists
    return start if total_tank >= 0 else -1

# Example:
# gas  = [1, 2, 3, 4, 5]
# cost = [3, 4, 5, 1, 2]
# Start at index 3:
# Station 3: tank = 4-1 = 3
# Station 4: tank = 3+5-2 = 6
# Station 0: tank = 6+1-3 = 4
# Station 1: tank = 4+2-4 = 2
# Station 2: tank = 2+3-5 = 0 (just made it!)

# WHY IT WORKS:
# If total gas >= total cost, solution exists.
# If we can't reach station j from i, we also can't
# reach j from any station between i and j.` },
]
