import type { CategoryInfo } from '../../data/learn/types'

interface CategoryTabsProps {
  categories: CategoryInfo[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="learn-category-tabs">
      {categories.map(category => (
        <button
          key={category.id}
          className={`learn-tab ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
          style={{ '--tab-color': category.color } as React.CSSProperties}
        >
          <span className="learn-tab-name">{category.name}</span>
          <span className="learn-tab-count">{category.algorithms.length}</span>
        </button>
      ))}
    </div>
  )
}
