import type { Method } from '../../../types'

export const meetingRoomsMethods: Method[] = [
  { signature: 'Meeting Rooms II', description: 'Minimum conference rooms needed. Track overlapping meetings with heap or sweep line.', complexity: 'O(n log n)', section: 'Meeting Rooms', example: `def min_meeting_rooms(intervals):
    """
    intervals[i] = [start, end] of meeting i
    Return minimum meeting rooms required.
    """
    import heapq

    if not intervals:
        return 0

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    # Min-heap of end times (rooms in use)
    rooms = []
    heapq.heappush(rooms, intervals[0][1])

    for start, end in intervals[1:]:
        # If earliest ending room is free, reuse it
        if start >= rooms[0]:
            heapq.heappop(rooms)
        heapq.heappush(rooms, end)

    return len(rooms)

# Alternative: Sweep line approach
def min_meeting_rooms_sweep(intervals):
    events = []
    for start, end in intervals:
        events.append((start, 1))   # Meeting starts
        events.append((end, -1))    # Meeting ends

    events.sort()

    rooms = 0
    max_rooms = 0
    for time, delta in events:
        rooms += delta
        max_rooms = max(max_rooms, rooms)

    return max_rooms` },
]
