import { NavLink, Outlet } from 'react-router-dom'
import './DashboardLayout.css'

const navItems = [
  { label: 'Dashboard', to: '/studentdashboard', end: true },
  { label: 'Students', to: '/studentdashboard/students' },
  { label: 'About', to: '/studentdashboard/about' },
]

export default function DashboardLayout() {
  return (
    <div className="layout">
      <header className="topnav">
        <div className="topnav-brand">
          <span className="brand-icon">🎓</span>
          <span className="brand-name">Student MS</span>
        </div>
        <nav className="topnav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                'nav-link' + (isActive ? ' nav-link--active' : '')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  )
}
