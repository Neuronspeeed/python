import { whyAndWhenMethods } from './whyAndWhen'
import { fileBasicsMethods } from './fileBasics'
import { openingFilesMethods } from './openingFiles'
import { readingFilesMethods } from './readingFiles'
import { writingFilesMethods } from './writingFiles'
import { pathlibMethods } from './pathlib'

// Combined fileio basics methods
export const fileioBasicsMethods = [
  ...whyAndWhenMethods,
  ...fileBasicsMethods,
  ...openingFilesMethods,
  ...readingFilesMethods,
  ...writingFilesMethods,
  ...pathlibMethods,
]

// Re-export individual modules for granular imports
export { whyAndWhenMethods } from './whyAndWhen'
export { fileBasicsMethods } from './fileBasics'
export { openingFilesMethods } from './openingFiles'
export { readingFilesMethods } from './readingFiles'
export { writingFilesMethods } from './writingFiles'
export { pathlibMethods } from './pathlib'
