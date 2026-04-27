import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { MdDashboard, MdAnalytics } from 'react-icons/md'
import { FaUserInjured } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { useAuthStore } from '../../stores/useAuthStore'

const navigation = [
  { to: '/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
  { to: '/analytics', label: 'Analytics', icon: <MdAnalytics /> },
  { to: '/patients', label: 'Patient Details', icon: <FaUserInjured /> },
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
              {item.icon}
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
            <FiLogOut style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
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
