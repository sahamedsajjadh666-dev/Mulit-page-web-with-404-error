import { Link, useLocation } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  const { pathname } = useLocation()

  return (
    <div className="notfound-wrap">
      <div className="notfound-card">
        <div className="notfound-code">404</div>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-path">
          No route matches <code>{pathname}</code>
        </p>
        <p className="notfound-hint">
          The page you're looking for doesn't exist or was moved.
        </p>
        <Link to="/studentdashboard" className="btn-home">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
