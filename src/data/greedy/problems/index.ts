import { whyWhenMethods } from './whyWhen'
import { gasStationMethods } from './gasStation'
import { taskSchedulerMethods } from './taskScheduler'
import { partitionLabelsMethods } from './partitionLabels'
import { candyMethods } from './candy'
import { boatsMethods } from './boats'
import { queueMethods } from './queue'
import { assignMethods } from './assign'
import { nonOverlappingMethods } from './nonOverlapping'
import { minArrowsMethods } from './minArrows'
import { meetingRoomsMethods } from './meetingRooms'
import { stockMethods } from './stock'
import { straightsMethods } from './straights'

// Combined Greedy Problems methods - maintains original order
export const greedyProblemsMethods = [
  ...whyWhenMethods,
  ...gasStationMethods,
  ...taskSchedulerMethods,
  ...partitionLabelsMethods,
  ...candyMethods,
  ...boatsMethods,
  ...queueMethods,
  ...assignMethods,
  ...nonOverlappingMethods,
  ...minArrowsMethods,
  ...meetingRoomsMethods,
  ...stockMethods,
  ...straightsMethods,
]

// Re-export individual modules for granular imports
export { whyWhenMethods } from './whyWhen'
export { gasStationMethods } from './gasStation'
export { taskSchedulerMethods } from './taskScheduler'
export { partitionLabelsMethods } from './partitionLabels'
export { candyMethods } from './candy'
export { boatsMethods } from './boats'
export { queueMethods } from './queue'
export { assignMethods } from './assign'
export { nonOverlappingMethods } from './nonOverlapping'
export { minArrowsMethods } from './minArrows'
export { meetingRoomsMethods } from './meetingRooms'
export { stockMethods } from './stock'
export { straightsMethods } from './straights'
