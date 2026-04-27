import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { PageLoader } from './components/common/PageLoader'
import { useAuthStore } from './stores/useAuthStore'

const LoginPage = lazy(() =>
  import('./pages/LoginPage').then((module) => ({ default: module.LoginPage })),
)
const SignUpPage = lazy(() =>
  import('./pages/SignUpPage').then((module) => ({ default: module.SignUpPage })),
)
const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((module) => ({ default: module.DashboardPage })),
)
const AnalyticsPage = lazy(() =>
  import('./pages/AnalyticsPage').then((module) => ({ default: module.AnalyticsPage })),
)
const PatientDetailsPage = lazy(() =>
  import('./pages/PatientDetailsPage').then((module) => ({
    default: module.PatientDetailsPage,
  })),
)

function App() {
  const { isAuthenticated, isSessionReady } = useAuthStore()

  if (!isSessionReady) {
    return (
      <div className="screen-loader" role="status" aria-live="polite">
        <div className="screen-loader__spinner" />
        <p>Restoring your secure session...</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<PageLoader message="Preparing module..." />}>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUpPage />}
        />
        <Route
          element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />}
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/patients" element={<PatientDetailsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
