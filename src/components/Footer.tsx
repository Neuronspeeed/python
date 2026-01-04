import { GITHUB_URL } from '../constants'

export function Footer() {
  return (
    <footer className="footer">
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
    </footer>
  )
}
