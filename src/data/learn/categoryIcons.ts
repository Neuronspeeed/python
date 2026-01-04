// Category Icons - SVG paths for each algorithm category
// These icons are designed to visually represent each pattern

export const categoryIcons: Record<string, string> = {
  // Two Pointers: Two arrows pointing toward center
  twoPointers: 'M17 8l4 4m0 0l-4 4m4-4H3m4-4L3 12m0 0l4 4',

  // Binary Search: Magnifying glass with divide line
  binarySearch: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6',

  // Stack: Stacked layers
  stack: 'M4 7h16M4 12h16M4 17h10',

  // Sliding Window: Window frame moving right
  slidingWindow: 'M4 5h4v14H4zM10 5h4v14h-4zM16 9l4 3-4 3',

  // Linked List: Chain links
  linkedList: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',

  // DFS: Depth-first tree traversal
  dfs: 'M12 4v4m0 0l-4 4m4-4l4 4m-8 0v4m8-4v4',

  // BFS: Breadth-first wave
  bfs: 'M3 8h18M6 12h12M9 16h6',

  // Heap: Priority tree structure
  heap: 'M12 4l-8 8h4v8h8v-8h4l-8-8z',

  // Backtracking: Return arrow with path
  backtracking: 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6',

  // Graphs: Connected nodes
  graphs: 'M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m14 0h2M3 15h2m14 0h2M5 5l2 2m10-2l-2 2m2 10l-2-2m-10 2l2-2',

  // Dynamic Programming: Table/grid with arrow
  dynamicProgramming: 'M4 5h16v14H4zM4 9h16M9 5v14M14 9l2 3-2 3',

  // Greedy: Lightning bolt (fast choice)
  greedy: 'M13 10V3L4 14h7v7l9-11h-7z',

  // Trie: Tree branching for prefix
  trie: 'M12 3v6m0 0l-4 4m4-4l4 4m-8 0l-2 4m10-4l2 4',

  // Prefix Sum: Sigma/summation
  prefixSum: 'M5 5h6l-3 7 3 7H5M15 5v14',

  // Matrices: Grid pattern
  matrices: 'M4 5h5v5H4zM15 5h5v5h-5zM4 14h5v5H4zM15 14h5v5h-5z',

  // Intervals: Timeline with overlapping bars
  intervals: 'M3 12h4m2 0h4m2 0h6M5 8v8M11 6v12M19 10v4',
}

// Icon for the Algorithm Lab brand - Terminal/console with cursor
export const algorithmLabIcon = 'M4 17l6-6-6-6M12 19h8'

export default categoryIcons
