import { systemPatternsWhyWhenMethods } from './systemPatternsWhyWhen'
import { systemPatternsKeyValueMethods } from './systemPatternsKeyValue'
import { systemPatternsCachingMethods } from './systemPatternsCaching'
import { systemPatternsRateLimitingMethods } from './systemPatternsRateLimiting'
import { systemPatternsFileOpsMethods } from './systemPatternsFileOps'

export const stdlibSystemPatternsMethods = [
  ...systemPatternsWhyWhenMethods,
  ...systemPatternsKeyValueMethods,
  ...systemPatternsCachingMethods,
  ...systemPatternsRateLimitingMethods,
  ...systemPatternsFileOpsMethods,
]

export {
  systemPatternsWhyWhenMethods,
  systemPatternsKeyValueMethods,
  systemPatternsCachingMethods,
  systemPatternsRateLimitingMethods,
  systemPatternsFileOpsMethods,
}
