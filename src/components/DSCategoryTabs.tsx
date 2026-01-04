import { Link, useLocation } from 'react-router-dom'

interface DSCategoryTabsProps {
  basePath: string // e.g., '/linked-list'
  problemCount: number
}

// Clean, minimal SVG icons in Anthropic's design style
function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 2.5C2 2.5 3.5 2 5.5 2C7.5 2 8 3 8 3V13.5C8 13.5 7 13 5.5 13C4 13 2 13.5 2 13.5V2.5Z" />
      <path d="M14 2.5C14 2.5 12.5 2 10.5 2C8.5 2 8 3 8 3V13.5C8 13.5 9 13 10.5 13C12 13 14 13.5 14 13.5V2.5Z" />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4.5L1.5 8L5 11.5" />
      <path d="M11 4.5L14.5 8L11 11.5" />
      <path d="M9.5 2.5L6.5 13.5" />
    </svg>
  )
}

export function DSCategoryTabs({ basePath, problemCount }: DSCategoryTabsProps) {
  const location = useLocation()
  const isProblemsTab = location.pathname.includes('/problems')

  return (
    <div className="ds-tabs">
      <Link
        to={basePath}
        className={`ds-tab ${!isProblemsTab ? 'active' : ''}`}
      >
        <span className="ds-tab-icon"><BookIcon /></span>
        <span className="ds-tab-name">Reference</span>
      </Link>
      <Link
        to={`${basePath}/problems`}
        className={`ds-tab ${isProblemsTab ? 'active' : ''}`}
      >
        <span className="ds-tab-icon"><CodeIcon /></span>
        <span className="ds-tab-name">Problems</span>
        <span className="ds-tab-count">{problemCount}</span>
      </Link>
    </div>
  )
}
