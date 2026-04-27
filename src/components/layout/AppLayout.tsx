import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/useAuthStore'

const navigation = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/patients', label: 'Patient Details' },
]

export const AppLayout = () => {
  const navigate = useNavigate()
  const { user, signOutUser, isLoading } = useAuthStore()

  const handleLogout = async () => {
    await signOutUser()
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <aside className="sidebar">
        <h1 className="brand">Raga HealthOps</h1>
        <p className="brand__sub">Care intelligence platform</p>
        <nav className="sidebar__nav">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="content-shell">
        <header className="topbar">
          <div>
            <p className="topbar__meta">Signed in as</p>
            <p className="topbar__user">{user?.email ?? 'Unknown user'}</p>
          </div>
          <button type="button" onClick={handleLogout} disabled={isLoading}>
            {isLoading ? 'Signing out...' : 'Logout'}
          </button>
        </header>
        <main id="main-content" className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
