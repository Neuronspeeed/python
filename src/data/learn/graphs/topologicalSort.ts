import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const topologicalSort: AlgorithmDefinition = {
  id: 'course-schedule',
  name: 'Course Schedule',
  category: 'graphs',
  difficulty: 'Medium',
  leetcodeId: 207,
  description: 'Determine if courses can be finished (detect cycle).',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V + E)',
  visualizationType: 'array',

  examples: [
    {
      input: 'numCourses = 2, prerequisites = [[1,0]]',
      output: 'true',
      explanation: 'Take course 0 first, then course 1. No cycle.'
    },
    {
      input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]',
      output: 'false',
      explanation: '0→1 and 1→0 form a cycle. Impossible to finish.'
    },
  ],

  education: {
    tldr: 'Kahn\'s algorithm: BFS starting from nodes with indegree 0. Cycle exists if not all processed.',
    steps: [
      { title: 'Build graph', description: 'Adjacency list + indegree array', code: 'graph[prereq].append(course); indegree[course]++' },
      { title: 'Queue indegree 0', description: 'Start with courses having no prereqs', code: 'queue = [c for c if indegree[c] == 0]' },
      { title: 'Process queue', description: 'Take course, reduce neighbors\' indegree', code: 'indegree[next] -= 1' },
      { title: 'Add newly 0', description: 'When indegree hits 0, add to queue', code: 'if indegree[next] == 0: queue.append(next)' },
    ],
    remember: [
      'Indegree = number of incoming edges (prerequisites)',
      'Start with indegree 0 (no prerequisites)',
      'Cycle = some nodes never reach indegree 0',
      'completed == numCourses means no cycle',
    ],
    understanding: `**Topological Sort** orders nodes so every edge points forward. If a cycle exists, no valid ordering is possible.

**Kahn's Algorithm** (BFS approach):
1. Start with nodes having no dependencies (indegree 0)
2. "Remove" each node by decrementing neighbors' indegrees
3. When a node's indegree hits 0, it's ready to process

**Cycle detection**: If we finish but haven't processed all nodes, those remaining are in a cycle.`,

    whyPatternWorks: `Think of prerequisites as "blocking" relationships. A course with indegree 0 has no blockers—it can be taken now.

After "taking" a course, we remove its blocking effect on dependents. If a dependent's blockers all clear (indegree → 0), it becomes ready.

Cycles never reach indegree 0 because they block each other forever.`,

    keyInsights: [
      'Kahn\'s = BFS topological sort with cycle detection',
      'Alternative: DFS with 3-color marking (white/gray/black)',
      'Course Schedule II: return the actual ordering',
      'Used in build systems, package managers, task scheduling',
    ]
  },

  code: `def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    graph = defaultdict(list)
    indegree = [0] * numCourses

    for course, prereq in prerequisites:
        graph[prereq].append(course)
        indegree[course] += 1

    queue = deque([i for i in range(numCourses) if indegree[i] == 0])
    completed = 0

    while queue:
        course = queue.popleft()
        completed += 1
        for next_course in graph[course]:
            indegree[next_course] -= 1
            if indegree[next_course] == 0:
                queue.append(next_course)

    return completed == numCourses`,

  inputs: [
    {
      name: 'numCourses',
      type: 'number',
      default: 4,
      label: 'Number of Courses',
      placeholder: '4',
    },
    {
      name: 'prerequisites',
      type: 'string',
      default: '1,0|2,0|3,1|3,2',
      label: 'Prerequisites (course,prereq|...)',
      placeholder: '1,0|2,0|3,1|3,2',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const numCourses = input.numCourses as number
    const prereqStr = input.prerequisites as string
    const prerequisites = prereqStr.split('|').map(s => {
      const parts = s.split(',').map(v => parseInt(v.trim()))
      return [parts[0], parts[1]]
    }).filter(p => !isNaN(p[0]) && !isNaN(p[1]))
    const steps: AlgorithmStep[] = []

    // Build graph
    const graph: Map<number, number[]> = new Map()
    const indegree = new Array(numCourses).fill(0)

    for (const [course, prereq] of prerequisites) {
      if (!graph.has(prereq)) graph.set(prereq, [])
      graph.get(prereq)!.push(course)
      indegree[course]++
    }

    steps.push({
      lineNumber: 5,
      description: 'Build graph and calculate indegrees',
      elements: [
        { type: 'array', id: 'indegree', values: indegree },
      ],
      variables: { indegree: [...indegree] },
    })

    // Initialize queue with indegree 0
    const queue: number[] = []
    for (let i = 0; i < numCourses; i++) {
      if (indegree[i] === 0) queue.push(i)
    }

    steps.push({
      lineNumber: 9,
      description: `Start with courses having indegree 0: [${queue.join(',')}]`,
      elements: [
        { type: 'array', id: 'indegree', values: [...indegree], styles: indegree.map(d => d === 0 ? 'found' as const : 'default' as const) },
      ],
      variables: { queue: [...queue] },
    })

    let completed = 0
    const order: number[] = []

    while (queue.length > 0 && steps.length < 20) {
      const course = queue.shift()!
      completed++
      order.push(course)

      steps.push({
        lineNumber: 13,
        description: `Process course ${course}, completed=${completed}`,
        elements: [
          { type: 'array', id: 'order', values: [...order], styles: order.map(() => 'found' as const) },
          { type: 'array', id: 'indegree', values: [...indegree] },
        ],
        variables: { course, completed, order: [...order] },
      })

      for (const next of graph.get(course) || []) {
        indegree[next]--
        if (indegree[next] === 0) {
          queue.push(next)
        }
      }
    }

    steps.push({
      lineNumber: 20,
      description: `Complete! ${completed === numCourses ? 'Can finish all courses' : 'Cycle detected, cannot finish'}`,
      elements: [
        { type: 'array', id: 'order', values: order, styles: order.map(() => 'found' as const) },
      ],
      variables: { completed, numCourses, canFinish: completed === numCourses },
      isComplete: true,
    })

    return steps
  },
}
