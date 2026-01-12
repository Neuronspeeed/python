export const twoPointersIntro = `Two Pointers for Linear Scans
Use two pointers converging from ends for sorted arrays, or fast/slow for linked lists. Reduces O(n²) brute force to O(n).

\`\`\`python
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target: return [left, right]
        elif s < target: left += 1
        else: right -= 1

def has_cycle(head):  # Fast/slow pointers
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow == fast: return True
    return False
\`\`\`python
---
Container With Most Water
Move pointer with smaller height inward. O(n) vs O(n²) checking all pairs.

\`\`\`python
def max_area(height):
    left, right, max_water = 0, len(height) - 1, 0
    while left < right:
        width = right - left
        area = width * min(height[left], height[right])
        max_water = max(max_water, area)
        if height[left] < height[right]: left += 1
        else: right -= 1
    return max_water
\`\`\`python
---
In-Place with Write/Read Pointers
Write tracks where to place next valid element, read scans ahead. O(1) space.

\`\`\`python
def remove_duplicates(nums):
    if not nums: return 0
    write = 1
    for read in range(1, len(nums)):
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1
    return write

def remove_element(nums, val):
    write = 0
    for read in range(len(nums)):
        if nums[read] != val:
            nums[write] = nums[read]
            write += 1
    return write
\`\`\`python
`
