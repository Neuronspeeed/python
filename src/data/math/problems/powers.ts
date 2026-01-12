import type { Method } from '../../../types'

export const powersMethods: Method[] = [
  { signature: 'Power of Two/Three/Four', description: 'Check if number is power of base. Use bit manipulation or log.', complexity: 'O(1)', section: 'Powers', example: `import math

# Power of 2: only one bit set
def is_power_of_2(n):
    return n > 0 and (n & (n - 1)) == 0

# Power of 3: largest power of 3 divisible by n
def is_power_of_3(n):
    # 3^19 = 1162261467 is largest 32-bit power of 3
    return n > 0 and 1162261467 % n == 0

# Power of 4: power of 2 AND bits at even positions
def is_power_of_4(n):
    # 0x55555555 = 0101...0101 (bits at even positions)
    return n > 0 and (n & (n - 1)) == 0 and (n & 0x55555555) != 0

# Generic power check
def is_power_of(n, base):
    if n <= 0:
        return False
    while n % base == 0:
        n //= base
    return n == 1

# Using logarithm
def is_power_of_log(n, base):
    if n <= 0:
        return False
    log_val = math.log(n) / math.log(base)
    return abs(log_val - round(log_val)) < 1e-10

print(is_power_of_2(16))  # True
print(is_power_of_3(27))  # True
print(is_power_of_4(64))  # True` },

  { signature: 'Sqrt & Power Functions', description: 'Compute square root and power without built-ins. Binary search or Newton\'s method.', complexity: 'O(log n)', section: 'Powers', example: `# Square root with binary search
def my_sqrt(x):
    """Integer square root (floor)."""
    if x < 2:
        return x

    left, right = 1, x // 2

    while left <= right:
        mid = (left + right) // 2
        if mid * mid == x:
            return mid
        elif mid * mid < x:
            left = mid + 1
        else:
            right = mid - 1

    return right

# Newton's method (faster convergence)
def sqrt_newton(x, precision=1e-10):
    if x < 0:
        raise ValueError("Negative input")
    if x == 0:
        return 0

    guess = x
    while abs(guess * guess - x) > precision:
        guess = (guess + x / guess) / 2

    return guess

# Power function (x^n)
def my_pow(x, n):
    """Compute x^n using binary exponentiation."""
    if n < 0:
        x = 1 / x
        n = -n

    result = 1
    while n > 0:
        if n % 2 == 1:
            result *= x
        x *= x
        n //= 2

    return result

print(my_sqrt(8))       # 2
print(my_pow(2, 10))    # 1024
print(my_pow(2, -2))    # 0.25` },
]
