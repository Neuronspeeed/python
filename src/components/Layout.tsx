import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import {
  pythonCoreItems,
  dataTypeItems,
  functionsOopItems,
  modulesErrorsItems,
  toolingItems,
  algorithmItems,
  dataStructureItems,
  interviewPrepItems,
  type NavItem
} from '../config/navigationItems'

function NavSection({ title, items, onClose }: { title: string; items: NavItem[]; onClose: () => void }) {
  return (
    <nav className="sidebar-section">
      <h2 className="sidebar-title">{title}</h2>
      <ul className="nav-list">
        {items.map(item => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="nav-icon" style={{ background: item.color }} />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function SnakeLogo() {
  return (
    <svg className="logo-icon-svg" width="28" height="28" viewBox="0 0 32 32" fill="none">
      {/* Head */}
      <rect x="4" y="4" width="4" height="4" fill="#22C55E" />
      <rect x="8" y="4" width="4" height="4" fill="#16A34A" />
      {/* Eyes */}
      <rect x="5" y="5" width="2" height="2" fill="#000" />
      <rect x="9" y="5" width="2" height="2" fill="#000" />
      {/* Tongue */}
      <rect x="2" y="6" width="2" height="1" fill="#EF4444" />
      <rect x="0" y="5" width="2" height="1" fill="#EF4444" />
      <rect x="0" y="7" width="2" height="1" fill="#EF4444" />
      {/* Body - S curve */}
      <rect x="12" y="4" width="4" height="4" fill="#22C55E" />
      <rect x="16" y="4" width="4" height="4" fill="#16A34A" />
      <rect x="20" y="4" width="4" height="4" fill="#22C55E" />
      <rect x="20" y="8" width="4" height="4" fill="#16A34A" />
      <rect x="20" y="12" width="4" height="4" fill="#22C55E" />
      <rect x="16" y="12" width="4" height="4" fill="#16A34A" />
      <rect x="12" y="12" width="4" height="4" fill="#22C55E" />
      <rect x="8" y="12" width="4" height="4" fill="#16A34A" />
      <rect x="8" y="16" width="4" height="4" fill="#22C55E" />
      <rect x="8" y="20" width="4" height="4" fill="#16A34A" />
      <rect x="12" y="20" width="4" height="4" fill="#22C55E" />
      <rect x="16" y="20" width="4" height="4" fill="#16A34A" />
      <rect x="20" y="20" width="4" height="4" fill="#22C55E" />
      {/* Tail */}
      <rect x="24" y="20" width="4" height="4" fill="#16A34A" />
      <rect x="26" y="24" width="3" height="3" fill="#22C55E" />
    </svg>
  )
}

function ClaudeLogo() {
  return (
    <img
      src="/python/logo.png"
      alt="Claude Code"
      className="claude-logo"
      width="16"
      height="16"
    />
  )
}

function ThemeToggle({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <button className="theme-toggle" onClick={onToggle} title="Toggle theme">
      {theme === 'light' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )}
    </button>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="app">
      <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={closeSidebar} />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <Link to="/" className="logo" onClick={closeSidebar}>
              <SnakeLogo />
              <span>Pythoneala</span>
            </Link>
            <Link to="/" className="logo-subtitle" onClick={closeSidebar}>
              built with <ClaudeLogo /> Claude Code
            </Link>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <NavSection title="Python Core" items={pythonCoreItems} onClose={closeSidebar} />
        <NavSection title="Data Types" items={dataTypeItems} onClose={closeSidebar} />
        <NavSection title="Functions & OOP" items={functionsOopItems} onClose={closeSidebar} />
        <NavSection title="Modules & Errors" items={modulesErrorsItems} onClose={closeSidebar} />
        <NavSection title="Tooling" items={toolingItems} onClose={closeSidebar} />
        <NavSection title="Algorithms" items={algorithmItems} onClose={closeSidebar} />
        <NavSection title="Data Structures" items={dataStructureItems} onClose={closeSidebar} />
        <NavSection title="More" items={interviewPrepItems} onClose={closeSidebar} />

        <nav className="sidebar-section">
          <h2 className="sidebar-title">Resources</h2>
          <ul className="nav-list">
            <li>
              <a href="https://docs.python.org/3/" target="_blank" rel="noopener noreferrer" className="nav-link">
                <span className="nav-icon" style={{ background: 'var(--text-muted)' }} />
                Python Docs
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  )
}
