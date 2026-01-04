import { TypePageContent, IntroBox } from '../components/TypePage'
import { computeSections } from '../types'
import { Footer, PageHeader } from '../components'
import { bigOMethods } from '../data/bigO'
import { InteractiveChart } from './bigO/BigOChart'
import {
  dataStructureOps,
  sortingAlgorithms,
  getComplexityClass
} from './bigO/bigOData'

function ComplexityCell({ value }: { value: string }) {
  const level = getComplexityClass(value)
  return (
    <td className={`complexity-cell complexity-${level}`}>
      <span className="complexity-value">{value}</span>
    </td>
  )
}

function DataStructureTable() {
  return (
    <div className="complexity-table-container">
      <h3 className="complexity-table-title">Data Structure Operations</h3>
      <div className="complexity-table-wrapper">
        <table className="complexity-table">
          <thead>
            <tr>
              <th rowSpan={2} className="th-structure">Data Structure</th>
              <th colSpan={4} className="th-group">Time Complexity — Average</th>
              <th colSpan={4} className="th-group">Time Complexity — Worst</th>
              <th rowSpan={2} className="th-space">Space</th>
            </tr>
            <tr>
              <th>Access</th>
              <th>Search</th>
              <th>Insertion</th>
              <th>Deletion</th>
              <th>Access</th>
              <th>Search</th>
              <th>Insertion</th>
              <th>Deletion</th>
            </tr>
          </thead>
          <tbody>
            {dataStructureOps.map((ds) => (
              <tr key={ds.name}>
                <td className="td-structure">{ds.name}</td>
                <ComplexityCell value={ds.avgAccess} />
                <ComplexityCell value={ds.avgSearch} />
                <ComplexityCell value={ds.avgInsert} />
                <ComplexityCell value={ds.avgDelete} />
                <ComplexityCell value={ds.worstAccess} />
                <ComplexityCell value={ds.worstSearch} />
                <ComplexityCell value={ds.worstInsert} />
                <ComplexityCell value={ds.worstDelete} />
                <ComplexityCell value={ds.space} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SortingTable() {
  return (
    <div className="complexity-table-container">
      <h3 className="complexity-table-title">Array Sorting Algorithms</h3>
      <div className="complexity-table-wrapper">
        <table className="complexity-table sorting-table">
          <thead>
            <tr>
              <th className="th-structure">Algorithm</th>
              <th colSpan={3} className="th-group">Time Complexity</th>
              <th className="th-space">Space</th>
            </tr>
            <tr>
              <th></th>
              <th>Best</th>
              <th>Average</th>
              <th>Worst</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortingAlgorithms.map((algo) => (
              <tr key={algo.name}>
                <td className="td-structure">{algo.name}</td>
                <ComplexityCell value={algo.best} />
                <ComplexityCell value={algo.avg} />
                <ComplexityCell value={algo.worst} />
                <ComplexityCell value={algo.space} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ComplexityLegend() {
  return (
    <div className="complexity-legend">
      <div className="complexity-legend-item">
        <span className="complexity-legend-dot complexity-excellent"></span>
        <span>O(1) — Excellent</span>
      </div>
      <div className="complexity-legend-item">
        <span className="complexity-legend-dot complexity-good"></span>
        <span>O(log n) — Good</span>
      </div>
      <div className="complexity-legend-item">
        <span className="complexity-legend-dot complexity-fair"></span>
        <span>O(n) — Fair</span>
      </div>
      <div className="complexity-legend-item">
        <span className="complexity-legend-dot complexity-bad"></span>
        <span>O(n log n) — Bad</span>
      </div>
      <div className="complexity-legend-item">
        <span className="complexity-legend-dot complexity-horrible"></span>
        <span>O(n²), O(2ⁿ) — Horrible</span>
      </div>
    </div>
  )
}

const bigOIntro = `Big O notation describes how an algorithm's runtime or space requirements grow as input size increases. It focuses on the worst-case growth rate, ignoring constants and lower-order terms.

Why It Matters: An O(n²) algorithm might be fast for 100 items but crawl with 10,000. Understanding complexity helps you choose the right algorithm and predict performance at scale.

Key Rules: Drop constants (O(2n) = O(n)). Keep only dominant term (O(n² + n) = O(n²)). Nested loops multiply (two O(n) loops nested = O(n²)).

Common Complexities: O(1) constant (hash lookup), O(log n) logarithmic (binary search), O(n) linear (single loop), O(n log n) linearithmic (efficient sorting), O(n²) quadratic (nested loops), O(2ⁿ) exponential (subsets).

Space Complexity: Memory matters too. Recursion uses O(depth) stack space. Creating new arrays costs O(n). In-place algorithms use O(1) extra space.`

export function BigOPage() {
  return (
    <>
      <PageHeader
        badge="O(n)"
        badgeColor="var(--accent-bigo)"
        title="Big O Complexity"
        description="Time and space complexity analysis. Master Big O to evaluate algorithm efficiency and optimize your code for large datasets."
      />

      <IntroBox intro={bigOIntro} />

      <InteractiveChart />

      <ComplexityLegend />
      <DataStructureTable />
      <SortingTable />

      <TypePageContent
        methods={bigOMethods}
        sections={computeSections(bigOMethods)}
      />

      <Footer />
    </>
  )
}
