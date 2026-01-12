import type { Method } from '../../../types'
import { concurrencyWhyWhenMethods } from './concurrencyWhyWhen'
import { concurrencyThreadingMethods } from './concurrencyThreading'
import { concurrencyMultiprocessingMethods } from './concurrencyMultiprocessing'
import { concurrencyAsyncioMethods } from './concurrencyAsyncio'
import { concurrencyPatternsMethods } from './concurrencyPatterns'

export const stdlibConcurrencyMethods: Method[] = [
  ...concurrencyWhyWhenMethods,
  ...concurrencyThreadingMethods,
  ...concurrencyMultiprocessingMethods,
  ...concurrencyAsyncioMethods,
  ...concurrencyPatternsMethods,
]

export {
  concurrencyWhyWhenMethods,
  concurrencyThreadingMethods,
  concurrencyMultiprocessingMethods,
  concurrencyAsyncioMethods,
  concurrencyPatternsMethods,
}
