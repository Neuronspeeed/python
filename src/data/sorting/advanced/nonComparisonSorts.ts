import type { Method } from '../../../types'

export const nonComparisonSortsMethods: Method[] = [
  { signature: 'Counting Sort', description: 'Count occurrences, calculate positions. O(n+k) for range k.', complexity: 'O(n + k)', section: 'Non-Comparison Sorts', example: `def counting_sort(arr):
    if not arr:
        return arr

    min_val, max_val = min(arr), max(arr)
    range_size = max_val - min_val + 1

    # Count occurrences
    count = [0] * range_size
    for num in arr:
        count[num - min_val] += 1

    # Build sorted array
    result = []
    for i, c in enumerate(count):
        result.extend([i + min_val] * c)

    return result

# Stable counting sort (preserves order of equal elements)
def counting_sort_stable(arr, key=lambda x: x):
    if not arr:
        return arr

    min_val = min(key(x) for x in arr)
    max_val = max(key(x) for x in arr)
    range_size = max_val - min_val + 1

    # Count occurrences
    count = [0] * range_size
    for item in arr:
        count[key(item) - min_val] += 1

    # Calculate positions (cumulative sum)
    for i in range(1, range_size):
        count[i] += count[i - 1]

    # Build output (traverse backwards for stability)
    output = [None] * len(arr)
    for item in reversed(arr):
        idx = key(item) - min_val
        count[idx] -= 1
        output[count[idx]] = item

    return output

# When to use:
# - Small integer range (k << n²)
# - Need stable sort
# - Used as subroutine in radix sort` },
  { signature: 'Radix Sort', description: 'Sort by each digit using counting sort. O(nk) for k digits.', complexity: 'O(n * k)', section: 'Non-Comparison Sorts', example: `def radix_sort(arr):
    if not arr:
        return arr

    # Find max to know number of digits
    max_val = max(arr)

    # Sort by each digit (LSD - Least Significant Digit)
    exp = 1
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10

    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    # Count occurrences of digit
    for num in arr:
        digit = (num // exp) % 10
        count[digit] += 1

    # Cumulative count
    for i in range(1, 10):
        count[i] += count[i - 1]

    # Build output (backwards for stability)
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        count[digit] -= 1
        output[count[digit]] = arr[i]

    # Copy back
    for i in range(n):
        arr[i] = output[i]

# Handle negative numbers
def radix_sort_with_negatives(arr):
    negatives = [-x for x in arr if x < 0]
    positives = [x for x in arr if x >= 0]

    if negatives:
        radix_sort(negatives)
        negatives = [-x for x in reversed(negatives)]

    if positives:
        radix_sort(positives)

    return negatives + positives

# When to use:
# - Fixed-length integers or strings
# - Large n with small digit range
# - Need stable O(n) sort` },
  { signature: 'Bucket Sort', description: 'Distribute into buckets, sort each bucket. O(n) for uniform distribution.', complexity: 'O(n) avg', section: 'Non-Comparison Sorts', example: `def bucket_sort(arr, num_buckets=10):
    if not arr:
        return arr

    min_val, max_val = min(arr), max(arr)
    if min_val == max_val:
        return arr

    # Create buckets
    bucket_range = (max_val - min_val) / num_buckets
    buckets = [[] for _ in range(num_buckets)]

    # Distribute into buckets
    for num in arr:
        idx = int((num - min_val) / bucket_range)
        idx = min(idx, num_buckets - 1)  # Handle max value
        buckets[idx].append(num)

    # Sort each bucket and concatenate
    result = []
    for bucket in buckets:
        bucket.sort()  # Use any sort for small buckets
        result.extend(bucket)

    return result

# For floating point [0, 1)
def bucket_sort_float(arr):
    n = len(arr)
    buckets = [[] for _ in range(n)]

    for num in arr:
        idx = int(n * num)
        idx = min(idx, n - 1)
        buckets[idx].append(num)

    result = []
    for bucket in buckets:
        bucket.sort()  # Insertion sort for small buckets
        result.extend(bucket)

    return result

# When to use:
# - Uniformly distributed data
# - Floating point in known range
# - When data fits in memory` },
]
