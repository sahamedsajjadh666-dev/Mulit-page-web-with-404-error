import { useState, useMemo } from 'react'
import { loadStudents, saveStudents } from '../data/students'
import './Students.css'

const DEPARTMENTS = [
  'All',
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Business Administration',
  'Civil Engineering',
  'Mathematics',
]

const YEARS = ['1', '2', '3', '4', '5']

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

const EMPTY_FORM = {
  name: '',
  roll: '',
  department: 'Computer Science',
  year: '1',
  email: '',
}

export default function Students() {
  const [students, setStudents] = useState(() => loadStudents())
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')
  const [toast, setToast] = useState(null)

  // ---- Live filtered list ----
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return students.filter((s) => {
      const matchDept = deptFilter === 'All' || s.department === deptFilter
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.roll.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
      return matchDept && matchSearch
    })
  }, [students, search, deptFilter])

  // ---- Validation ----
  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.roll.trim()) e.roll = 'Roll number is required'
    else if (students.some((s) => s.roll === form.roll.trim()))
      e.roll = 'Roll number already exists'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email'
    return e
  }

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 2800)
  }

  // ---- Handlers ----
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    const newStudent = {
      id: genId(),
      name: form.name.trim(),
      roll: form.roll.trim().toUpperCase(),
      department: form.department,
      year: form.year,
      email: form.email.trim(),
      gpa: parseFloat((2.5 + Math.random() * 1.5).toFixed(1)),
      attendance: Math.round(75 + Math.random() * 25),
      addedAt: new Date().toISOString(),
    }
    const updated = [newStudent, ...students]
    setStudents(updated)
    saveStudents(updated)
    setForm(EMPTY_FORM)
    showToast(`${newStudent.name} added successfully!`)
  }

  function handleDelete(id) {
    const updated = students.filter((s) => s.id !== id)
    setStudents(updated)
    saveStudents(updated)
    showToast('Student removed.', 'info')
  }

  return (
    <div className="students-page">
      {toast && (
        <div className={`toast toast--${toast.type}`}>{toast.msg}</div>
      )}

      {/* ---- Add Student Form ---- */}
      <section className="card form-section">
        <h2 className="section-title">Add New Student</h2>
        <form className="student-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Jane Doe"
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="roll">Roll Number</label>
              <input
                id="roll"
                name="roll"
                value={form.roll}
                onChange={handleChange}
                placeholder="e.g. CS2501"
                className={errors.roll ? 'input-error' : ''}
              />
              {errors.roll && <span className="error-msg">{errors.roll}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                name="department"
                value={form.department}
                onChange={handleChange}
              >
                {DEPARTMENTS.filter((d) => d !== 'All').map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <select
                id="year"
                name="year"
                value={form.year}
                onChange={handleChange}
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    Year {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="student@university.edu"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            + Add Student
          </button>
        </form>
      </section>

      {/* ---- Filter Bar ---- */}
      <section className="filter-bar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search by name, roll, or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="dept-filters">
          {DEPARTMENTS.map((d) => (
            <button
              key={d}
              className={
                'filter-chip' + (deptFilter === d ? ' filter-chip--active' : '')
              }
              onClick={() => setDeptFilter(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      {/* ---- Students Table ---- */}
      <section className="card table-section">
        <div className="table-header">
          <span className="result-count">
            Showing <strong>{filtered.length}</strong> of{' '}
            <strong>{students.length}</strong> students
          </span>
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state">No students match your filters.</div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Roll No.</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Email</th>
                  <th>GPA</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, idx) => (
                  <tr key={s.id}>
                    <td className="row-num">{idx + 1}</td>
                    <td>
                      <span className="student-avatar">{s.name.charAt(0)}</span>
                      {s.name}
                    </td>
                    <td>
                      <code className="mono">{s.roll}</code>
                    </td>
                    <td>
                      <span className="dept-badge">{s.department}</span>
                    </td>
                    <td>Year {s.year}</td>
                    <td className="email-cell">{s.email}</td>
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
                    <td>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(s.id)}
                        title="Delete student"
                      >
                        🗑
                      </button>
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
