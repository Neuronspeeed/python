import { Link } from 'react-router-dom'
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
import { Footer } from '../components/Footer'

function HomeSection({ title, items, description }: { title: string; items: NavItem[]; description: string }) {
  return (
    <>
      <h2 className="home-section-title">{title}</h2>
      <section className="home-grid">
        {items.map(item => (
          <Link to={item.path} key={item.path} className="home-card">
            <div className="home-card-header">
              <span className="home-card-icon" style={{ background: item.color }} />
              <span className="home-card-badge">{item.badge}</span>
            </div>
            <h3 className="home-card-title">{item.label}</h3>
            <p className="home-card-desc">{description}</p>
          </Link>
        ))}
      </section>
    </>
  )
}

export function HomePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Python Guide</h1>
        <p className="page-description">
          Methods, complexity, and examples.
        </p>
      </header>

      <HomeSection
        title="Python Core"
        items={pythonCoreItems}
        description="Fundamentals, statements, and control flow."
      />

      <HomeSection
        title="Data Types"
        items={dataTypeItems}
        description="Methods with complexity and examples."
      />

      <HomeSection
        title="Functions & OOP"
        items={functionsOopItems}
        description="Abstraction mechanisms and patterns."
      />

      <HomeSection
        title="Modules & Errors"
        items={modulesErrorsItems}
        description="Program structure and exception handling."
      />

      <HomeSection
        title="Tooling"
        items={toolingItems}
        description="Documentation, logging, and concurrency."
      />

      <HomeSection
        title="Algorithms"
        items={algorithmItems}
        description="Patterns with complexity."
      />

      <HomeSection
        title="Data Structures"
        items={dataStructureItems}
        description="Operations and patterns."
      />

      <HomeSection
        title="More"
        items={interviewPrepItems}
        description="Patterns and utilities."
      />

      <Footer />
    </>
  )
}
