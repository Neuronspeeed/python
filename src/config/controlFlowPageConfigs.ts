/**
 * Configuration for Control Flow topic pages.
 * Each config contains metadata and intro content for a single page.
 */

import {
  fundamentalsIntro,
  statementsIntro,
  conditionalsIntro,
  conditionalPatternsIntro,
  matchIntro,
  loopsIntro,
  comprehensionsIntro,
  functionsIntro,
  oopIntro
} from './controlFlowIntros'

export interface ControlFlowPageConfig {
  type: string
  badge: string
  color: string
  description: string
  intro: string
  tip?: string
}

export const controlFlowPageConfigs: Record<string, ControlFlowPageConfig> = {
  fundamentals: {
    type: 'Python Fundamentals',
    badge: 'py',
    color: 'var(--accent-functions)',
    description: 'Core concepts: dynamic typing, strong typing, polymorphism. Understanding Python\'s object model and type categories.',
    intro: fundamentalsIntro,
  },
  statements: {
    type: 'Statements',
    badge: '=',
    color: 'var(--accent-statements)',
    description: 'Assignment forms, variable naming, expression statements, and print operations. The building blocks of Python programs.',
    intro: statementsIntro,
  },
  conditionals: {
    type: 'Conditionals',
    badge: 'if',
    color: 'var(--accent-none)',
    description: 'Selection and branching with if, ternary expressions, and boolean logic. Dictionary dispatch for cleaner multi-way branching.',
    intro: conditionalsIntro,
  },
  conditionalPatterns: {
    type: 'Selection Patterns',
    badge: 'O(1)',
    color: 'var(--accent-none)',
    description: 'Performance comparisons and best practices: if-elif vs dict vs match, short-circuit evaluation, when to use ternary.',
    intro: conditionalPatternsIntro,
  },
  match: {
    type: 'Match Statement',
    badge: 'match',
    color: 'var(--accent-none)',
    description: 'Structural pattern matching (Python 3.10+). Destructure sequences, match types, bind variables, use guards. More powerful than switch.',
    intro: matchIntro,
  },
  loops: {
    type: 'Loops',
    badge: 'for',
    color: 'var(--accent-none)',
    description: 'Python loops: for iterates over sequences, while repeats until condition is false. Includes iteration tools and loop control.',
    intro: loopsIntro,
  },
  comprehensions: {
    type: 'Comprehensions',
    badge: '[]',
    color: 'var(--accent-none)',
    description: 'Concise syntax for creating collections: list, dict, set, generator. Transform and filter iterables in one readable expression.',
    intro: comprehensionsIntro,
  },
  functions: {
    type: 'Functions',
    badge: 'def',
    color: 'var(--accent-functions)',
    description: 'Functions are first-class objects in Python. Use def for named functions, lambda for anonymous functions.',
    intro: functionsIntro,
  },
  oop: {
    type: 'OOP',
    badge: 'class',
    color: 'var(--accent-oop)',
    description: 'Object-Oriented Programming in Python. Classes bundle data + behavior. Use when you have state + multiple operations on that state.',
    intro: oopIntro,
  },
}
