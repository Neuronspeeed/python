import type { Method } from '../../../types'

export const systemPatternsWhyWhenMethods: Method[] = [
  {
    signature: 'Why know system patterns?',
    description: 'Common building blocks for system design interviews. Anthropic CodeSignal explicitly tests in-memory databases, caches, and rate limiters.',
    complexity: 'Concept',
    section: 'Why & When',
    example: `# SYSTEM BUILDING PATTERNS - INTERVIEW ESSENTIALS

# Anthropic CodeSignal Assessment (90 min, 4 levels):
# - Level 1: Basic key-value store (SET, GET, DELETE)
# - Level 2: SCAN, SCAN_BY_PREFIX operations
# - Level 3: TTL (time-to-live) with timestamps
# - Level 4: File compression with capacity management

# KEY PATTERNS TO KNOW:
# 1. Key-Value Store - Foundation for most systems
# 2. LRU Cache - Eviction when capacity exceeded
# 3. Rate Limiter - Control request frequency
# 4. TTL (Time-To-Live) - Auto-expire entries

# WHY THESE MATTER:
# - Tests practical coding speed, not algorithms
# - Requires modular, extensible code
# - Each level adds requirements to existing code

# INTERVIEW TIPS:
# - Start with clean class structure
# - Use descriptive method names
# - Handle edge cases upfront
# - Design for extensibility (levels build on each other)`
  },
]
