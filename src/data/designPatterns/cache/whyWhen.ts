import type { Method } from '../../../types'

export const whyWhenMethods: Method[] = [
  { signature: 'Why caching?', description: 'Trade memory for speed. Cache eviction policies: LRU (recency), LFU (frequency), TTL (time). Choose based on access patterns.', complexity: 'Concept', section: 'Why & When', example: `# CACHING = Store frequently accessed data for O(1) retrieval
# Eviction policies: LRU, LFU, TTL, FIFO, Random

# WHY CACHE?
# - Avoid expensive recomputation (database, API, calculations)
# - Reduce latency for frequent requests
# - Limit memory usage with eviction policy

# LRU (Least Recently Used):
# - Evict item that hasn't been accessed in longest time
# - Good for: general-purpose caching, recency matters
# - Implementation: HashMap + Doubly Linked List OR OrderedDict
# - Use when: recent items likely to be accessed again

# LFU (Least Frequently Used):
# - Evict item with lowest access count
# - Good for: frequency matters more than recency
# - Implementation: HashMap + nested structure (freq → items)
# - Use when: popular items should stay cached

# TTL (Time To Live):
# - Evict items after expiration time
# - Good for: data that becomes stale, rate limiting
# - Implementation: HashMap + timestamps
# - Use when: data has natural expiration

# INTERVIEW PATTERNS:
# - "Design LRU Cache" → OrderedDict or HashMap + DLL
# - "Design LFU Cache" → Nested structure
# - "Rate limiter" → TTL cache
# - "URL shortener" → Cache with TTL

# WHEN TO USE WHICH:
# Recent >> Frequent? → LRU
# Frequent >> Recent? → LFU
# Data expires? → TTL
# Don't care? → FIFO/Random` },

  { signature: 'LRU vs LFU trade-offs', description: 'LRU optimizes for recency, LFU for frequency. Different access patterns need different policies.', complexity: 'Concept', section: 'Why & When', example: `# LRU vs LFU - choosing the right policy

# ACCESS PATTERN 1: Browsing history
# User views: A, B, C, D, E (capacity=3)
# Cache state (LRU): [C, D, E] - most recent
# User revisits: A
# LRU evicts C (least recently used)
# Cache: [D, E, A] - Good! Recency matters

# ACCESS PATTERN 2: Hot items
# Requests: A, A, A, B, C, D (capacity=3)
# Cache state (LRU): [B, C, D]
# A is evicted despite being most frequent!
# LFU cache: [A, B, C] - Better! A is very frequent

# COMPARISON:
# Metric          LRU              LFU
# ─────────────────────────────────────────
# Optimizes for   Recency          Frequency
# Complexity      O(1) get/put     O(1) get/put
# Implementation  OrderedDict      Nested maps
# Space           O(capacity)      O(capacity + freqs)
# Code length     ~20 lines        ~50 lines
# Hit rate        Good general     Good for hot items

# USE LRU WHEN:
# - Recent items likely accessed again (web browser)
# - Time-based locality (recent files)
# - Simple implementation preferred
# - Access patterns change over time

# USE LFU WHEN:
# - Popular items accessed repeatedly (trending)
# - Frequency >> recency (music streaming)
# - Long-term popularity matters
# - Access patterns stable

# HYBRID: LRU-K
# Track last K accesses, evict by Kth-recent
# Balances recency and frequency` },
]
