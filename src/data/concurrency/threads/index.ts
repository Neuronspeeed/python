import { whyAndWhenMethods } from './whyAndWhen'
import { threadingBasicsMethods } from './threadingBasics'
import { threadPoolExecutorMethods } from './threadPoolExecutor'
import { multiprocessingMethods } from './multiprocessing'

// Combined threads methods - maintains original order
export const concurrencyThreadsMethods = [
  ...whyAndWhenMethods,
  ...threadingBasicsMethods,
  ...threadPoolExecutorMethods,
  ...multiprocessingMethods,
]

// Re-export individual modules for granular imports
export { whyAndWhenMethods } from './whyAndWhen'
export { threadingBasicsMethods } from './threadingBasics'
export { threadPoolExecutorMethods } from './threadPoolExecutor'
export { multiprocessingMethods } from './multiprocessing'
