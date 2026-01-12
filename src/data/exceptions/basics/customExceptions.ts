import type { Method } from '../../../types'

export const customExceptionsMethods: Method[] = [
  { signature: 'class CustomError(Exception):', description: 'Create custom exception by inheriting from Exception.', complexity: 'O(1)', section: 'Custom Exceptions', example: `class ValidationError(Exception):
    """Raised when validation fails"""
    pass

class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"Need {amount}, have {balance}")

try:
    raise InsufficientFundsError(100, 150)
except InsufficientFundsError as e:
    print(f"Balance: {e.balance}")  # 100
    print(f"Amount: {e.amount}")    # 150` },
  { signature: 'Exception hierarchy', description: 'Create exception hierarchies for related errors.', complexity: 'O(1)', section: 'Custom Exceptions', example: `class APIError(Exception):
    """Base class for API errors"""
    pass

class AuthenticationError(APIError):
    """Failed to authenticate"""
    pass

class RateLimitError(APIError):
    """Too many requests"""
    def __init__(self, retry_after):
        self.retry_after = retry_after
        super().__init__(f"Rate limited, retry in {retry_after}s")

# Catch all API errors
try:
    raise RateLimitError(60)
except APIError as e:
    print(f"API Error: {e}")` },
]
