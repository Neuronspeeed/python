import { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Layout } from './components'
import { routeConfigs } from './config/routes'
import { ErrorBoundary } from './components/ErrorBoundary'
import { PyodideProvider } from './contexts/PyodideContext'
import './styles/index.css'

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="loader-spinner" />
    </div>
  )
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

// Wrapper to conditionally apply Layout based on route
function AppContent() {
  const location = useLocation()
  const isLearnPage = location.pathname.startsWith('/learn')

  return (
    <Suspense fallback={<PageLoader />}>
      {isLearnPage ? (
        // Learn pages have their own layout (LearnLayout)
        <Routes>
          {routeConfigs
            .filter(({ path }) => path.startsWith('/learn'))
            .map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
        </Routes>
      ) : (
        // All other pages use the main Layout
        <Layout>
          <Routes>
            {routeConfigs
              .filter(({ path }) => !path.startsWith('/learn'))
              .map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
          </Routes>
        </Layout>
      )}
    </Suspense>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <PyodideProvider>
        <BrowserRouter basename="/python">
          <ScrollToTop />
          <AppContent />
        </BrowserRouter>
      </PyodideProvider>
    </ErrorBoundary>
  )
}

export default App
