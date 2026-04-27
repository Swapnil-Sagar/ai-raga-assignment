import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { PatientDetailsPage } from './pages/PatientDetailsPage'
import { useAuthStore } from './stores/useAuthStore'

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
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
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
  )
}

export default App
