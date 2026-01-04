import type { Method } from '../../types'

// Basic Logging, Handlers, Formatters, Structured Logging
export const loggingBasicsMethods: Method[] = [
  // Why & When
  { signature: 'Logging vs print() - when to use each', description: 'print(): development/debugging. logging: production. Logging provides levels, timestamps, file output, filtering. Never use print in production.', complexity: 'Concept', section: 'Why & When', example: `# PRINT - development only
def process_data(data):
    print(f"Processing {len(data)} items")  # OK for quick debugging
    print(f"Result: {result}")

# LOGGING - production code
import logging
logger = logging.getLogger(__name__)

def process_data(data):
    logger.debug(f"Processing {len(data)} items")  # Filterable
    logger.info(f"Result: {result}")  # With timestamps

# Why logging wins:
# - Levels (debug, info, warning, error)
# - Timestamps automatic
# - Output to file/syslog/remote
# - Can disable without code changes
# - Structured data (JSON)
# - Production monitoring integration

# Use print when:
# - Quick one-off debugging
# - Interactive scripts (CLI tools)
# - Learning Python

# Use logging when:
# - Production code
# - Long-running services
# - Error tracking needed
# - Multiple output destinations
# - Team collaboration (others need to debug)`,
  },
  { signature: 'Log levels - when to use which', description: 'DEBUG: development details. INFO: major events. WARNING: unexpected but handled. ERROR: functionality broken. CRITICAL: system down.', complexity: 'Concept', section: 'Why & When', example: `import logging

# DEBUG - detailed diagnostic info (disabled in production)
logger.debug(f"Cache hit for key={key}, value={value}")
logger.debug("Entering retry loop, attempt 3/5")
# Use: algorithm internals, state tracking

# INFO - major milestones (keep in production)
logger.info("Application started")
logger.info("Processing batch 42/100")
logger.info("User alice logged in from IP 1.2.3.4")
# Use: important events, audit trail

# WARNING - unexpected but handled
logger.warning("API rate limit approaching (90%)")
logger.warning("Config file missing, using defaults")
logger.warning("Deprecated function called")
# Use: degraded mode, fallbacks, deprecations

# ERROR - functionality failed
logger.error("Failed to send email to user@example.com")
logger.error("Database connection lost, retrying...")
# Use: operation failed but app continues

# CRITICAL - system failure
logger.critical("Out of memory, shutting down")
logger.critical("Database corrupted, cannot start")
# Use: unrecoverable errors, system down

# Production level config:
# Development → DEBUG (see everything)
# Staging → INFO (important events)
# Production → WARNING (problems only)`,
  },
  { signature: 'Handlers - console vs file vs rotating', description: 'Console: development. File: production audit. Rotating: long-running services. Use multiple handlers for different audiences.', complexity: 'Concept', section: 'Why & When', example: `import logging
from logging.handlers import RotatingFileHandler

logger = logging.getLogger('myapp')
logger.setLevel(logging.DEBUG)

# CONSOLE - development, real-time monitoring
console = logging.StreamHandler()
console.setLevel(logging.INFO)  # Less noise
console.setFormatter(logging.Formatter('%(levelname)s: %(message)s'))
logger.addHandler(console)

# FILE - production audit trail
file_handler = logging.FileHandler('app.log')
file_handler.setLevel(logging.DEBUG)  # Everything to file
file_handler.setFormatter(
    logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
)
logger.addHandler(file_handler)

# ROTATING - long-running services (prevents disk fill)
rotating = RotatingFileHandler(
    'app.log',
    maxBytes=10*1024*1024,  # 10 MB per file
    backupCount=5           # Keep 5 files = 50 MB max
)
logger.addHandler(rotating)

# Common patterns:
# Development: console only (INFO+)
# Production: file (DEBUG+) + console (ERROR+)
# Long-running: rotating file + remote syslog
# Containerized: console only (Docker captures)`,
  },
  { signature: 'Structured/JSON logging - when it matters', description: 'Plain text: humans. JSON: machines, log aggregators. Use JSON when: centralized logging, complex queries, production systems at scale.', complexity: 'Concept', section: 'Why & When', example: `# PLAIN TEXT - good for humans
logging.basicConfig(format='%(asctime)s - %(message)s')
logger.info("User alice purchased item for $42.50")
# 2024-01-15 10:30:45 - User alice purchased item for $42.50

# JSON - good for machines
import json

class JsonFormatter(logging.Formatter):
    def format(self, record):
        return json.dumps({
            'timestamp': self.formatTime(record),
            'level': record.levelname,
            'event': record.getMessage(),
            'user': getattr(record, 'user', None),
            'amount': getattr(record, 'amount', None)
        })

logger.info("Purchase completed", extra={'user': 'alice', 'amount': 42.50})
# {"timestamp": "2024-01-15 10:30:45", "event": "Purchase completed", "user": "alice", "amount": 42.50}

# Use JSON when:
# - Centralized logging (ELK, Splunk, Datadog)
# - Need to query/filter logs
# - Microservices architecture
# - Production systems (>100 req/sec)
# - Compliance/audit requirements

# Use plain text when:
# - Small projects
# - Debugging locally
# - Reading logs directly (tail -f)
# - Simple applications`,
  },
  { signature: 'Logging performance - when it matters', description: 'Logging is fast (~1-10μs per call) but adds up. Use lazy evaluation, conditional logging. Matters for hot paths (>1000 calls/sec).', complexity: 'O(1)', section: 'Why & When', example: `import logging
logger = logging.getLogger(__name__)

# BAD - always formats, even if not logged
logger.debug("Processing user: " + str(user))  # String concat happens even if DEBUG disabled!

# GOOD - lazy evaluation with %
logger.debug("Processing user: %s", user)  # Only formats if DEBUG enabled

# GOOD - lazy with f-string (Python 3.8+)
if logger.isEnabledFor(logging.DEBUG):
    logger.debug(f"Processing {expensive_computation()}")

# Performance impact:
# - Disabled log: ~10 nanoseconds (level check only)
# - Enabled log to console: ~1 microsecond
# - Enabled log to file: ~5-10 microseconds
# - JSON formatting: ~20 microseconds

# When logging matters:
# Hot path (called 1000s times/sec):
for item in millions_of_items:
    logger.debug(f"Item: {item}")  # BAD! Huge overhead

    # Instead, sample or aggregate:
    if item_count % 1000 == 0:
        logger.info(f"Processed {item_count} items")

# Rule of thumb:
# <100 calls/sec → don't worry about it
# 100-1000 calls/sec → use lazy evaluation
# >1000 calls/sec → conditional logging, sampling`,
  },

  // Basic Logging
  { signature: 'import logging', description: 'Built-in logging module. Better than print for production.', complexity: 'O(1)', section: 'Basic Logging', example: `import logging

# Quick start - root logger
logging.warning("This is a warning")    # Shown
logging.info("This is info")            # Not shown (default level is WARNING)

# Configure root logger
logging.basicConfig(level=logging.DEBUG)
logging.debug("Now this shows")
logging.info("And this too")` },
  { signature: 'Logging levels', description: 'DEBUG < INFO < WARNING < ERROR < CRITICAL', complexity: 'O(1)', section: 'Basic Logging', example: `import logging
logging.basicConfig(level=logging.DEBUG)

logging.debug("Detailed info for debugging")
logging.info("General information")
logging.warning("Something unexpected")
logging.error("Something went wrong")
logging.critical("System is down!")

# Numeric values
# DEBUG: 10, INFO: 20, WARNING: 30, ERROR: 40, CRITICAL: 50` },
  { signature: 'logging.basicConfig()', description: 'Configure root logger format, file, level.', complexity: 'O(1)', section: 'Basic Logging', example: `import logging

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
    filename='app.log',  # Log to file
    filemode='w'         # Overwrite (default is 'a' append)
)

logging.info("Application started")
# 2024-01-15 10:30:45 - root - INFO - Application started` },
  { signature: 'logging.getLogger(name)', description: 'Create/get named logger. Use __name__ for module logger.', complexity: 'O(1)', section: 'Basic Logging', example: `import logging

# Get logger for current module
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Add handler
handler = logging.StreamHandler()
handler.setFormatter(logging.Formatter('%(name)s - %(message)s'))
logger.addHandler(handler)

logger.info("Module initialized")
# __main__ - Module initialized` },

  // Handlers
  { signature: 'StreamHandler', description: 'Output logs to stream (stdout/stderr).', complexity: 'O(1)', section: 'Handlers', example: `import logging

logger = logging.getLogger('myapp')
logger.setLevel(logging.DEBUG)

# Console handler
console = logging.StreamHandler()
console.setLevel(logging.INFO)
console.setFormatter(logging.Formatter('%(levelname)s: %(message)s'))

logger.addHandler(console)
logger.info("To console")` },
  { signature: 'FileHandler', description: 'Output logs to file.', complexity: 'O(1)', section: 'Handlers', example: `import logging

logger = logging.getLogger('myapp')

# File handler
file_handler = logging.FileHandler('app.log')
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(
    logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
)

logger.addHandler(file_handler)
logger.info("To file")` },
  { signature: 'RotatingFileHandler', description: 'Auto-rotate log files by size.', complexity: 'O(1)', section: 'Handlers', example: `from logging.handlers import RotatingFileHandler

handler = RotatingFileHandler(
    'app.log',
    maxBytes=5*1024*1024,  # 5 MB
    backupCount=3          # Keep 3 backup files
)

# Creates: app.log, app.log.1, app.log.2, app.log.3` },
  { signature: 'TimedRotatingFileHandler', description: 'Auto-rotate log files by time.', complexity: 'O(1)', section: 'Handlers', example: `from logging.handlers import TimedRotatingFileHandler

handler = TimedRotatingFileHandler(
    'app.log',
    when='midnight',     # Rotate at midnight
    interval=1,          # Every 1 day
    backupCount=7        # Keep 7 days
)

# when options: 'S', 'M', 'H', 'D', 'midnight', 'W0'-'W6'` },

  // Formatters
  { signature: 'Format attributes', description: 'Common format attributes for log messages.', complexity: 'O(1)', section: 'Formatters', example: `import logging

# Available attributes:
# %(name)s       - Logger name
# %(levelname)s  - Level (DEBUG, INFO, etc.)
# %(message)s    - Log message
# %(asctime)s    - Timestamp
# %(filename)s   - Source filename
# %(lineno)d     - Line number
# %(funcName)s   - Function name
# %(pathname)s   - Full path

fmt = '%(asctime)s | %(levelname)-8s | %(filename)s:%(lineno)d | %(message)s'
logging.basicConfig(format=fmt)` },

  // Structured Logging
  { signature: 'Extra fields', description: 'Add custom fields to log records.', complexity: 'O(1)', section: 'Structured Logging', example: `import logging

logging.basicConfig(
    format='%(asctime)s - %(user)s - %(message)s'
)

# Pass extra data
logging.info("User logged in", extra={'user': 'alice'})
# 2024-01-15 10:30:45 - alice - User logged in

# Or use LoggerAdapter
class CustomAdapter(logging.LoggerAdapter):
    def process(self, msg, kwargs):
        return f"[{self.extra['user']}] {msg}", kwargs

logger = CustomAdapter(logging.getLogger(), {'user': 'bob'})
logger.info("Action performed")` },
  { signature: 'JSON logging', description: 'Output logs as JSON for parsing.', complexity: 'O(1)', section: 'Structured Logging', example: `import logging
import json

class JsonFormatter(logging.Formatter):
    def format(self, record):
        return json.dumps({
            'timestamp': self.formatTime(record),
            'level': record.levelname,
            'message': record.getMessage(),
            'module': record.module,
            'line': record.lineno
        })

handler = logging.StreamHandler()
handler.setFormatter(JsonFormatter())
logger = logging.getLogger()
logger.addHandler(handler)

logger.info("Structured log")
# {"timestamp": "2024-01-15 10:30:45", "level": "INFO", ...}` },
]
