import type { CategoryOverview } from './categoryMappings'

// Category overviews with educational content
export const categoryOverviews: Record<string, CategoryOverview> = {
  twoPointers: {
    description: 'The Two Pointers technique uses two pointers to traverse an array or string, typically from opposite ends or at different speeds. This reduces time complexity from O(n²) to O(n) for many problems.',
    whyUseIt: {
      title: 'Why Two Pointers?',
      explanation: 'The naive approach to problems involving pairs or subarrays often requires nested loops—checking every possible combination in O(n²) time. Two Pointers eliminates redundant comparisons by leveraging structure in the data (usually sorted order) to make intelligent decisions about which elements to skip. By moving pointers based on comparison results, we eliminate large portions of the search space in each step.',
      keyPoint: 'Two Pointers turns O(n²) brute force into O(n) by using data structure properties to eliminate impossible solutions without checking them.',
    },
    whenToUse: [
      'Finding pairs in a sorted array that satisfy a condition',
      'Comparing elements from both ends of an array',
      'Partitioning arrays in-place (like Dutch National Flag)',
      'Finding subarrays with specific properties',
      'Merging sorted arrays or linked lists',
    ],
    keyPatterns: [
      { name: 'Opposite Direction', description: 'Start at both ends, move toward center', complexity: 'O(n)' },
      { name: 'Same Direction (Fast/Slow)', description: 'Both move forward at different speeds', complexity: 'O(n)' },
      { name: 'Sliding Window Variant', description: 'Maintain a dynamic window between pointers', complexity: 'O(n)' },
    ],
    commonMistakes: [
      'Forgetting to handle duplicates in sorted arrays',
      'Off-by-one errors in loop conditions',
      'Not handling empty array edge cases',
      'Moving the wrong pointer after comparison',
    ],
  },
  binarySearch: {
    description: 'Binary Search is a divide-and-conquer algorithm that finds elements in O(log n) time by repeatedly halving the search space. It requires sorted data or a monotonic condition.',
    whenToUse: [
      'Searching in sorted arrays',
      'Finding boundaries (first/last occurrence)',
      'Optimization problems with monotonic conditions',
      'Search space reduction problems',
    ],
    keyPatterns: [
      { name: 'Standard Binary Search', description: 'Find exact element in sorted array', complexity: 'O(log n)' },
      { name: 'Lower/Upper Bound', description: 'Find first/last position of element', complexity: 'O(log n)' },
      { name: 'Binary Search on Answer', description: 'Search for optimal value in range', complexity: 'O(log n × check)' },
    ],
    commonMistakes: [
      'Integer overflow with (left + right) / 2',
      'Infinite loops from wrong mid calculation',
      'Off-by-one errors in boundary conditions',
      'Not identifying the monotonic property',
    ],
  },
  stack: {
    description: 'Stack is a LIFO (Last In, First Out) data structure. It excels at problems involving matching pairs, nested structures, and maintaining state during traversal.',
    whenToUse: [
      'Matching parentheses or brackets',
      'Parsing expressions',
      'Backtracking and undo operations',
      'Monotonic stack for next greater/smaller element',
      'DFS implementation',
    ],
    keyPatterns: [
      { name: 'Matching Pairs', description: 'Push opening, pop and match closing', complexity: 'O(n)' },
      { name: 'Monotonic Stack', description: 'Maintain increasing/decreasing order', complexity: 'O(n)' },
      { name: 'Expression Evaluation', description: 'Operator precedence with two stacks', complexity: 'O(n)' },
    ],
    commonMistakes: [
      'Popping from empty stack',
      'Not checking stack empty before peek',
      'Wrong order of operations in expression parsing',
      'Forgetting to process remaining stack elements',
    ],
  },
  slidingWindow: {
    description: 'Sliding Window uses a moving window to process contiguous subarrays or substrings. It converts O(n²) brute force into O(n) by reusing computations from the previous window.',
    whenToUse: [
      'Finding subarrays/substrings with constraints',
      'Maximum/minimum sum of fixed-size subarrays',
      'Longest/shortest substring problems',
      'Problems with contiguous elements',
      'Frequency counting within a range',
    ],
    keyPatterns: [
      { name: 'Fixed Window', description: 'Window size stays constant, slide by one', complexity: 'O(n)' },
      { name: 'Variable Window', description: 'Expand right, shrink left based on condition', complexity: 'O(n)' },
      { name: 'Frequency Map', description: 'Track character/element counts in window', complexity: 'O(n)' },
    ],
    commonMistakes: [
      'Not properly updating window state on shrink',
      'Off-by-one errors in window boundaries',
      'Forgetting to initialize first window correctly',
      'Using nested loops instead of sliding approach',
    ],
  },
  dfs: {
    description: 'Depth-First Search explores as far as possible along each branch before backtracking. It uses recursion or an explicit stack to traverse trees and graphs.',
    whenToUse: [
      'Tree traversal (preorder, inorder, postorder)',
      'Path finding in trees/graphs',
      'Detecting cycles in graphs',
      'Topological sorting',
      'Finding connected components',
    ],
    keyPatterns: [
      { name: 'Recursive DFS', description: 'Use call stack for implicit backtracking', complexity: 'O(V + E)' },
      { name: 'Iterative DFS', description: 'Use explicit stack for traversal', complexity: 'O(V + E)' },
      { name: 'Backtracking', description: 'Explore, then undo and try alternatives', complexity: 'O(V + E)' },
    ],
    commonMistakes: [
      'Not marking nodes as visited (infinite loops)',
      'Stack overflow on deep recursion',
      'Forgetting base cases in recursive DFS',
      'Not handling disconnected components',
    ],
  },
  bfs: {
    description: 'Breadth-First Search explores all neighbors at the current depth before moving to nodes at the next depth level. Uses a queue for level-order traversal.',
    whenToUse: [
      'Finding shortest path in unweighted graphs',
      'Level-order tree traversal',
      'Multi-source shortest path',
      'Finding minimum moves/steps',
      'Exploring neighbors layer by layer',
    ],
    keyPatterns: [
      { name: 'Level-Order Traversal', description: 'Process all nodes at each level', complexity: 'O(V + E)' },
      { name: 'Shortest Path', description: 'First path found is shortest in unweighted graph', complexity: 'O(V + E)' },
      { name: 'Multi-Source BFS', description: 'Start from multiple sources simultaneously', complexity: 'O(V + E)' },
    ],
    commonMistakes: [
      'Using DFS when shortest path is needed',
      'Not tracking visited nodes correctly',
      'Not processing level by level when needed',
      'Forgetting to add to visited before enqueueing',
    ],
  },
  dynamicProgramming: {
    description: 'Dynamic Programming solves complex problems by breaking them into overlapping subproblems. It stores results of subproblems to avoid redundant computation.',
    whenToUse: [
      'Optimization problems (min/max)',
      'Counting problems (number of ways)',
      'Problems with optimal substructure',
      'Problems with overlapping subproblems',
      'Decision making with constraints',
    ],
    keyPatterns: [
      { name: 'Top-Down (Memoization)', description: 'Recursive with cache to store results', complexity: 'Varies' },
      { name: 'Bottom-Up (Tabulation)', description: 'Iterative, build solution from base cases', complexity: 'Varies' },
      { name: 'State Compression', description: 'Reduce space by only keeping needed states', complexity: 'O(1) to O(n)' },
    ],
    commonMistakes: [
      'Not identifying overlapping subproblems',
      'Wrong base case initialization',
      'Off-by-one errors in loop bounds',
      'Not considering all state transitions',
    ],
  },
  linkedList: {
    description: 'Linked List problems test pointer manipulation skills. Common techniques include two-pointer (fast/slow), dummy nodes, and in-place reversal.',
    whenToUse: [
      'Detecting cycles in sequences',
      'Finding middle elements',
      'Merging sorted sequences',
      'Reversing or reordering elements',
    ],
    keyPatterns: [
      { name: 'Fast/Slow Pointers', description: 'Detect cycles, find middle', complexity: 'O(n)' },
      { name: 'Dummy Node', description: 'Simplify edge cases at head', complexity: 'O(1)' },
      { name: 'In-place Reversal', description: 'Reverse without extra space', complexity: 'O(n)' },
    ],
    commonMistakes: [
      'Losing reference to head node',
      'Not handling null/empty lists',
      'Off-by-one in nth from end',
    ],
  },
  heap: {
    description: 'Heaps (Priority Queues) efficiently find min/max elements. Use for streaming data, top-k problems, and scheduling.',
    whenToUse: [
      'Finding k largest/smallest elements',
      'Merging k sorted sequences',
      'Streaming median',
      'Task scheduling with priorities',
    ],
    keyPatterns: [
      { name: 'Min-Heap for K Largest', description: 'Keep k elements, pop smallest', complexity: 'O(n log k)' },
      { name: 'Two Heaps', description: 'Median with max-heap + min-heap', complexity: 'O(log n)' },
      { name: 'K-way Merge', description: 'Merge sorted lists with heap', complexity: 'O(N log k)' },
    ],
    commonMistakes: [
      'Using wrong heap type (min vs max)',
      'Not balancing two-heap solutions',
      'Forgetting to heapify after updates',
    ],
  },
  backtracking: {
    description: 'Backtracking explores all possible solutions by building candidates incrementally and abandoning invalid paths early.',
    whenToUse: [
      'Generating all combinations/permutations',
      'Constraint satisfaction problems',
      'Puzzle solving (N-Queens, Sudoku)',
      'Finding all valid configurations',
    ],
    keyPatterns: [
      { name: 'Choice → Explore → Unchoice', description: 'Make choice, recurse, undo', complexity: 'O(n!)' },
      { name: 'Pruning', description: 'Skip invalid branches early', complexity: 'Varies' },
      { name: 'State Tracking', description: 'Track visited/used elements', complexity: 'O(n)' },
    ],
    commonMistakes: [
      'Forgetting to backtrack (undo choice)',
      'Not pruning invalid branches',
      'Modifying shared state incorrectly',
    ],
  },
  intervals: {
    description: 'Interval problems involve ranges with start/end points. Key insight: sort by start time, then process sequentially.',
    whenToUse: [
      'Merging overlapping ranges',
      'Finding conflicts/overlaps',
      'Scheduling and resource allocation',
      'Coverage problems',
    ],
    keyPatterns: [
      { name: 'Sort + Sweep', description: 'Sort by start, track max end', complexity: 'O(n log n)' },
      { name: 'Start/End Arrays', description: 'Separate and sort endpoints', complexity: 'O(n log n)' },
      { name: 'Line Sweep', description: 'Process events chronologically', complexity: 'O(n log n)' },
    ],
    commonMistakes: [
      'Not handling edge overlaps correctly',
      'Forgetting to sort first',
      'Wrong comparison for containment',
    ],
  },
  greedy: {
    description: 'Greedy algorithms make locally optimal choices hoping to find global optimum. Works when problem has greedy-choice property.',
    whenToUse: [
      'Activity selection/scheduling',
      'Huffman coding',
      'Minimum spanning trees',
      'Problems with optimal substructure',
    ],
    keyPatterns: [
      { name: 'Sort + Greedy', description: 'Sort by criteria, pick greedily', complexity: 'O(n log n)' },
      { name: 'Local Maximum', description: 'Always pick best available', complexity: 'O(n)' },
    ],
    commonMistakes: [
      'Using greedy when DP is needed',
      'Wrong greedy criteria',
      'Not proving greedy-choice property',
    ],
  },
  graphs: {
    description: 'Graph algorithms handle networks of nodes and edges. Key techniques: BFS/DFS traversal, topological sort, union-find.',
    whenToUse: [
      'Detecting cycles',
      'Topological ordering',
      'Finding connected components',
      'Shortest paths',
    ],
    keyPatterns: [
      { name: 'Topological Sort', description: 'Order with dependencies', complexity: 'O(V + E)' },
      { name: 'Union-Find', description: 'Track connected components', complexity: 'O(α(n))' },
    ],
    commonMistakes: [
      'Not detecting cycles in directed graphs',
      'Wrong visited state management',
      'Not handling disconnected components',
    ],
  },
  trie: {
    description: 'Trie (prefix tree) efficiently stores and searches strings by character. Enables O(m) operations where m is key length.',
    whenToUse: [
      'Autocomplete/prefix matching',
      'Spell checking',
      'IP routing (longest prefix)',
      'Word search in grids',
    ],
    keyPatterns: [
      { name: 'Standard Trie', description: 'Insert/search by characters', complexity: 'O(m)' },
      { name: 'Word Termination', description: 'Mark end of valid words', complexity: 'O(1)' },
    ],
    commonMistakes: [
      'Not marking word endings',
      'Confusing prefix match with word match',
      'Memory overhead for sparse tries',
    ],
  },
  prefixSum: {
    description: 'Prefix Sum precomputes cumulative sums for O(1) range queries. Essential for subarray sum problems.',
    whenToUse: [
      'Range sum queries',
      'Finding subarrays with target sum',
      '2D range queries',
      'Difference arrays',
    ],
    keyPatterns: [
      { name: 'Prefix Array', description: 'prefix[i] = sum of 0..i-1', complexity: 'O(n) build, O(1) query' },
      { name: 'Prefix + HashMap', description: 'Track seen prefix sums', complexity: 'O(n)' },
    ],
    commonMistakes: [
      'Off-by-one in range calculation',
      'Not initializing prefix[0] = 0',
      'Integer overflow for large sums',
    ],
  },
  matrices: {
    description: 'Matrix problems involve 2D array traversal and manipulation. Common patterns: spiral traversal, rotation, and in-place modifications.',
    whenToUse: [
      'Image rotation/transformation',
      'Spiral/diagonal traversal',
      'Setting rows/columns based on conditions',
      'Search in sorted matrices',
    ],
    keyPatterns: [
      { name: 'Boundary Pointers', description: 'Track top/bottom/left/right', complexity: 'O(m×n)' },
      { name: 'Transpose + Reverse', description: '90° rotation in-place', complexity: 'O(m×n)' },
      { name: 'Use First Row/Col', description: 'Store flags without extra space', complexity: 'O(1) space' },
    ],
    commonMistakes: [
      'Confusing row/column indices',
      'Not handling non-square matrices',
      'Overwriting needed values',
    ],
  },
}
