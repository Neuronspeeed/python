import type { Method } from '../../types'

// Basic Logging, Handlers, Formatters, Structured Logging
export const loggingBasicsMethods: Method[] = [
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
