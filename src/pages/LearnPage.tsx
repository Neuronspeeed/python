import { useState, useMemo } from 'react'
import { Footer } from '../components/Footer'
import { categories, getAlgorithmById } from '../data/learn'
import { AlgorithmVisualizer, CategoryTabs, AlgorithmSelector } from './learn'

export function LearnPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0]?.id || '')
  const [activeAlgorithmId, setActiveAlgorithmId] = useState(
    categories[0]?.algorithms[0]?.id || ''
  )

  const activeCategory = useMemo(
    () => categories.find(c => c.id === activeCategoryId) || categories[0],
    [activeCategoryId]
  )

  const activeAlgorithm = useMemo(
    () => getAlgorithmById(activeAlgorithmId) || activeCategory?.algorithms[0] || null,
    [activeAlgorithmId, activeCategory]
  )

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategoryId(categoryId)
    const category = categories.find(c => c.id === categoryId)
    if (category?.algorithms[0]) {
      setActiveAlgorithmId(category.algorithms[0].id)
    }
  }

  const handleAlgorithmChange = (algorithmId: string) => {
    setActiveAlgorithmId(algorithmId)
  }

  return (
    <>
      <header className="page-header">
        <div className="page-badge">
          <span className="page-badge-dot" style={{ background: '#D97757' }} />
          Lab
        </div>
        <h1 className="page-title">Algorithm Lab</h1>
        <p className="page-description">
          Interactive step-through visualizations of common algorithm patterns.
          Watch code execute line-by-line with animated data structures.
        </p>
      </header>

      <div className="tip-box">
        <div className="tip-box-title">Keyboard Shortcuts</div>
        <div className="tip-box-content">
          <kbd>Space</kbd> Play/Pause &nbsp;
          <kbd>←</kbd> <kbd>→</kbd> Step &nbsp;
          <kbd>R</kbd> Reset
        </div>
      </div>

      <div className="learn-hub">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategoryId}
          onCategoryChange={handleCategoryChange}
        />

        <div className="learn-main-layout">
          <aside className="learn-sidebar">
            <AlgorithmSelector
              algorithms={activeCategory?.algorithms || []}
              activeAlgorithm={activeAlgorithmId}
              onAlgorithmChange={handleAlgorithmChange}
            />
          </aside>

          <main className="learn-content">
            {activeAlgorithm ? (
              <AlgorithmVisualizer
                key={activeAlgorithm.id}
                algorithm={activeAlgorithm}
              />
            ) : (
              <div className="learn-empty">
                Select an algorithm to begin
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </>
  )
}
