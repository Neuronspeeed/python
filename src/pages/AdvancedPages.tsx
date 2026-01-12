import { TypePage } from '../components/TypePage'
import { advancedPageConfigs, type AdvancedPageConfig } from '../config/advancedPageConfigs'
import { documentationMethods } from '../data/documentation'
import { modulesMethods } from '../data/modules'
import { exceptionsMethods } from '../data/exceptions'
import { loggingMethods } from '../data/logging'
import { concurrencyMethods } from '../data/concurrency'
import { fileioMethods } from '../data/fileio'
import type { Method } from '../types'

function createPage(config: AdvancedPageConfig, methods: Method[]) {
  return function Page() {
    return (
      <TypePage
        type={config.type}
        badge={config.badge}
        color={config.color}
        description={config.description}
        intro={config.intro}
        methods={methods}
      />
    )
  }
}

export const DocumentationPage = createPage(advancedPageConfigs.documentation, documentationMethods)
export const ModulesPage = createPage(advancedPageConfigs.modules, modulesMethods)
export const ExceptionsPage = createPage(advancedPageConfigs.exceptions, exceptionsMethods)
export const LoggingPage = createPage(advancedPageConfigs.logging, loggingMethods)
export const ConcurrencyPage = createPage(advancedPageConfigs.concurrency, concurrencyMethods)
export const FileIOPage = createPage(advancedPageConfigs.fileio, fileioMethods)
