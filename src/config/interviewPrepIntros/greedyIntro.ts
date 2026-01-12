export const greedyIntro = `Greedy algorithms make locally optimal choices at each step, hoping to find a global optimum. The key insight: if you can prove that local optimality leads to global optimality, greedy is dramatically simpler and faster than dynamic programming—but the challenge is proving correctness. When greedy works, it's elegant. When it fails, it fails catastrophically.

WHY GREEDY IS POWERFUL (AND DANGEROUS): Greedy algorithms are seductive: they're intuitive, easy to code, and often O(n log n) instead of O(n^2) or exponential. But they're also dangerous—most problems where greedy seems obvious actually require DP or backtracking. The real skill is knowing when greedy works and being able to prove it. In interviews, if you claim a greedy solution, you MUST explain why it's correct.

**The greedy paradox:**
- When it works: O(n log n) with 10 lines of code
- When it fails: Wrong answer with no warning
- The hard part: Proving which category your problem is in

THE TWO REQUIREMENTS FOR GREEDY:

**1. Greedy Choice Property**
Making the locally optimal choice at each step leads to a globally optimal solution. You can make a choice that looks best right now without considering future consequences.

Example (Activity Selection): Choosing the activity that ends earliest is always safe—it leaves maximum room for future activities. Proof: If optimal solution chose different activity, swapping it with earliest-ending doesn't make solution worse.

Counter-example (0/1 Knapsack): Choosing item with highest value/weight ratio locally doesn't guarantee global optimum. You might need to skip high-ratio items to fit others.

**2. Optimal Substructure**
An optimal solution contains optimal solutions to subproblems. After making a greedy choice, the remaining problem is smaller and has the same structure.

Example (Activity Selection): After choosing earliest-ending activity, the remaining problem is "select maximum activities from remaining time" - same structure, smaller input.

**Both properties required:** Optimal substructure alone isn't enough (DP has it too). Greedy choice property is what makes greedy work.

PROOF TECHNIQUES: HOW TO VERIFY GREEDY CORRECTNESS

**Technique 1: Exchange Argument** (Most Common)

Assume an optimal solution exists that differs from greedy. Show you can "exchange" elements to match greedy's choice without making it worse. If you can always do this, greedy must be optimal.

\`\`\`python
Proof pattern:
1. Assume optimal solution O differs from greedy solution G at some point
2. Take first difference: O chose x, G chose y
3. Show: exchanging x for y in O produces O' that is:
   - Still valid (satisfies constraints)
   - Still optimal (same or better objective value)
4. Repeat exchange until O becomes G
5. Therefore: G is optimal
\`\`\`python

**Example: Activity Selection**
- Greedy: Always pick activity ending earliest
- Proof: If optimal picks activity ending at time t2, and greedy picks one ending at t1 < t2, swap them. Still have same number of activities, but more time left for future choices. Therefore greedy is at least as good.

**Technique 2: Stays-Ahead Argument**

Show that after each step, greedy maintains a solution at least as good as any other algorithm.

\`\`\`python
Proof pattern:
1. Define what "better partial solution" means
2. Prove: after each greedy choice, greedy's partial solution >= any other algorithm's
3. Therefore: at the end, greedy has the best solution
\`\`\`python

**Example: Fractional Knapsack**
- Greedy: Take items in order of value/weight ratio
- Proof: At any point, greedy has packed highest total value for given weight. Any other choice would have lower value for same weight.

**Technique 3: Cut-and-Paste Argument**

Show that any optimal solution can be modified to match greedy's structure without losing optimality.

**Without proof, greedy is just a heuristic** — it might work on test cases but fail on edge cases. In interviews, always explain WHY your greedy approach works.

CLASSIC GREEDY PATTERNS:

**Pattern 1: Activity/Interval Selection**

Given intervals with start/end times, select maximum number without overlap.

\`\`\`python
def activity_selection(activities):
    """
    Select maximum non-overlapping activities.
    GREEDY: Sort by END time, pick earliest-ending.
    WHY: Earliest ending leaves most room for more activities.
    """
    activities.sort(key=lambda x: x[1])  # Sort by end time
    selected = [activities[0]]

    for start, end in activities[1:]:
        if start >= selected[-1][1]:  # No overlap with last selected
            selected.append((start, end))

    return selected

# Example: [(1,3), (2,4), (3,5), (0,6)]
# Sorted by end: [(1,3), (2,4), (3,5), (0,6)]
# Pick (1,3), skip (2,4) overlaps, pick (3,5), skip (0,6)
# Result: [(1,3), (3,5)] - maximum 2 activities
\`\`\`python

**Pattern 2: Fractional Knapsack**

Take items (divisible) to maximize value within weight capacity.

\`\`\`python
def fractional_knapsack(items, capacity):
    """
    items: [(value, weight), ...]
    GREEDY: Sort by value/weight ratio, take highest ratios first.
    WHY: Each unit of weight carries maximum value.
    NOTE: Only works for FRACTIONAL knapsack (items divisible).
          Does NOT work for 0/1 knapsack!
    """
    items.sort(key=lambda x: x[0]/x[1], reverse=True)
    total_value = 0

    for value, weight in items:
        if capacity >= weight:
            total_value += value
            capacity -= weight
        else:
            total_value += (capacity / weight) * value  # Take fraction
            break

    return total_value
\`\`\`python

**Pattern 3: Huffman Coding**

Build optimal prefix-free encoding tree.

\`\`\`python
import heapq

def huffman(freq):
    """
    freq: {char: frequency}
    GREEDY: Always merge two lowest-frequency nodes.
    WHY: Rare chars get longer codes, common chars get shorter.
    """
    heap = [[f, [c, ""]] for c, f in freq.items()]
    heapq.heapify(heap)

    while len(heap) > 1:
        lo = heapq.heappop(heap)
        hi = heapq.heappop(heap)
        for pair in lo[1:]:
            pair[1] = '0' + pair[1]
        for pair in hi[1:]:
            pair[1] = '1' + pair[1]
        heapq.heappush(heap, [lo[0] + hi[0]] + lo[1:] + hi[1:])

    return sorted(heap[0][1:], key=lambda x: len(x[1]))
\`\`\`python

WHEN GREEDY FAILS (AND WHY):

**0/1 Knapsack** - Can't divide items

\`\`\`python
# Items: [(value=60, weight=10), (value=100, weight=20), (value=120, weight=30)]
# Capacity: 50
# Greedy (by value/weight): Take item 1 (ratio 6), item 2 (ratio 5) = 160
# Optimal: Take item 2 + item 3 = 220
# WHY GREEDY FAILS: Greedy choice blocks better combination
\`\`\`python

**Coin Change** - With arbitrary denominations

\`\`\`python
# Coins: [1, 3, 4], Target: 6
# Greedy: 4 + 1 + 1 = 3 coins
# Optimal: 3 + 3 = 2 coins
# WHY: Greedy (largest first) misses better combination
# NOTE: Greedy DOES work for standard US coins (1, 5, 10, 25)
\`\`\`python

**Longest Path in DAG** - Greedy doesn't see future

\`\`\`python
# Taking locally longest edge doesn't guarantee globally longest path
# WHY: Future edges might make shorter current choice better overall
\`\`\`python

GREEDY INTERVIEW PATTERNS:

\`\`\`python
# PATTERN: Sort first, then greedy scan
intervals.sort(key=lambda x: x[1])  # By end for selection
intervals.sort(key=lambda x: x[0])  # By start for merging
items.sort(key=lambda x: x[0]/x[1], reverse=True)  # By ratio
\`\`\`python

BEST PRACTICES:

1. **Always explain WHY greedy works**: Don't just say "greedy", explain the greedy choice property

2. **Test counter-examples**: Before committing, try to break your greedy approach

3. **Know the failures**: 0/1 Knapsack, arbitrary coin change, longest path

4. **Sort carefully**: Wrong sort key ruins greedy (END time for intervals, not START)

5. **Use proof templates**: Exchange argument is your friend

6. **When in doubt, DP**: Greedy is great when correct, but DP is safer

7. **Complexity check**: Greedy is usually O(n log n), DP is O(n^2)—if your greedy is O(n^2), something's wrong

8. **Document the greedy choice**: Code comments should explain the strategy`
