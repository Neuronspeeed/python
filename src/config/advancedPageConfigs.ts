/**
 * Configuration for Advanced topic pages.
 * Each config contains metadata and intro content for a single page.
 */

import {
  documentationIntro,
  modulesIntro,
  exceptionsIntro,
  loggingIntro,
  concurrencyIntro,
  fileioIntro
} from './advancedIntros'

export interface AdvancedPageConfig {
  type: string
  badge: string
  color: string
  description: string
  intro: string
}

export const advancedPageConfigs: Record<string, AdvancedPageConfig> = {
  documentation: {
    type: 'Documentation',
    badge: 'doc',
    color: 'var(--accent-logging)',
    description: 'Tools for documenting Python code: comments, docstrings, dir(), help(), and external tools.',
    intro: documentationIntro
  },
  modules: {
    type: 'Modules',
    badge: 'import',
    color: 'var(--accent-concurrency)',
    description: 'Import mechanics, bytecode, packages, and program architecture.',
    intro: modulesIntro
  },
  exceptions: {
    type: 'Exceptions',
    badge: 'try',
    color: 'var(--accent-exceptions)',
    description: 'Exception handling in Python. Try/except for graceful error handling, raise for signaling errors.',
    intro: exceptionsIntro
  },
  logging: {
    type: 'Logging & Debug',
    badge: 'log',
    color: 'var(--accent-logging)',
    description: 'Logging, debugging, and profiling in Python. Better than print for production code.',
    intro: loggingIntro
  },
  concurrency: {
    type: 'Concurrency',
    badge: 'async',
    color: 'var(--accent-concurrency)',
    description: 'Concurrent and parallel programming in Python. Threading, multiprocessing, and async/await.',
    intro: concurrencyIntro
  },
  fileio: {
    type: 'File I/O',
    badge: 'file',
    color: 'var(--accent-fileio)',
    description: 'Reading and writing files. Cross-platform path handling with pathlib.',
    intro: fileioIntro
  }
}
