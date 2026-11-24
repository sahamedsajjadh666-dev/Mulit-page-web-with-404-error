import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { loadStudents } from '../data/students'
import './Dashboard.css'

function MetricCard({ icon, label, value, sub }) {
  return (
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <div className="metric-body">
        <div className="metric-value">{value}</div>
        <div className="metric-label">{label}</div>
        {sub && <div className="metric-sub">{sub}</div>}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const students = useMemo(() => loadStudents(), [])

  const totalStudents = students.length

  const departments = useMemo(
    () => [...new Set(students.map((s) => s.department))],
    [students],
  )

  const avgGpa = useMemo(() => {
    if (!students.length) return '—'
    const avg = students.reduce((sum, s) => sum + (s.gpa || 0), 0) / students.length
    return avg.toFixed(2)
  }, [students])

  const avgAttendance = useMemo(() => {
    if (!students.length) return '—'
    const avg =
      students.reduce((sum, s) => sum + (s.attendance || 0), 0) / students.length
    return avg.toFixed(1) + '%'
  }, [students])

  const recent = useMemo(
    () =>
      [...students]
        .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
        .slice(0, 5),
    [students],
  )

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-sub">Overview of your student data at a glance.</p>
      </div>

      <section className="metrics-grid">
        <MetricCard
          icon="👥"
          label="Total Students"
          value={totalStudents}
          sub="enrolled"
        />
        <MetricCard
          icon="🏛️"
          label="Departments"
          value={departments.length}
          sub={departments.slice(0, 2).join(', ') + (departments.length > 2 ? '…' : '')}
        />
        <MetricCard
          icon="📊"
          label="Average GPA"
          value={avgGpa}
          sub="out of 4.0"
        />
        <MetricCard
          icon="📅"
          label="Avg Attendance"
          value={avgAttendance}
          sub="this semester"
        />
      </section>

      <section className="recent-section">
        <div className="section-header">
          <h2 className="section-title">Recently Added Students</h2>
          <Link to="/studentdashboard/students" className="see-all-link">
            See all →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="empty-state">No students found. Add some!</div>
        ) : (
          <div className="recent-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No.</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>GPA</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <span className="student-avatar">
                        {s.name.charAt(0)}
                      </span>
                      {s.name}
                    </td>
                    <td>
                      <code className="mono">{s.roll}</code>
                    </td>
                    <td>
                      <span className="dept-badge">{s.department}</span>
                    </td>
                    <td>Year {s.year}</td>
                    <td>
                      <span
                        className={
                          'gpa-badge ' +
                          (s.gpa >= 3.7
                            ? 'gpa-high'
                            : s.gpa >= 3.0
                            ? 'gpa-mid'
                            : 'gpa-low')
                        }
                      >
                        {s.gpa}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
