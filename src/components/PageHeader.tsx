interface PageHeaderProps {
  badge: string
  badgeColor: string
  title: string
  description: string
}

export function PageHeader({ badge, badgeColor, title, description }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="page-badge">
        <span className="page-badge-dot" style={{ background: badgeColor }} />
        {badge}
      </div>
      <h1 className="page-title">{title}</h1>
      <p className="page-description">{description}</p>
    </header>
  )
}
