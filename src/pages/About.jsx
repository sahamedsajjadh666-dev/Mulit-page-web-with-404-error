import './About.css'

const features = [
  {
    icon: '📋',
    title: 'Student Registry',
    desc: 'Add, search, filter, and remove student records with instant feedback and form validation.',
  },
  {
    icon: '📊',
    title: 'Live Analytics',
    desc: 'Dashboard metrics (GPA, attendance, department counts) computed in real time from stored data.',
  },
  {
    icon: '💾',
    title: 'localStorage Persistence',
    desc: "All data lives in your browser's localStorage — no backend, no server required.",
  },
  {
    icon: '🔗',
    title: 'Client-side Routing',
    desc: 'Full React Router v6 navigation with nested routes, active-link highlighting, and 404 handling.',
  },
  {
    icon: '🔍',
    title: 'Smart Search & Filter',
    desc: 'Instantly filter students by name, roll number, email, or department with live results.',
  },
  {
    icon: '📱',
    title: 'Responsive Design',
    desc: 'Adapts cleanly to desktop, tablet, and mobile screens.',
  },
]

const techStack = [
  { name: 'React 18', role: 'UI library (hooks, components)' },
  { name: 'Vite 6', role: 'Build tool & dev server' },
  { name: 'React Router v6', role: 'Client-side routing & nested layouts' },
  { name: 'localStorage', role: 'Browser-native persistence layer' },
  { name: 'CSS Custom Properties', role: 'Theming & design tokens' },
]

export default function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="hero-icon">🎓</div>
        <h1 className="hero-title">Student Management System</h1>
        <p className="hero-desc">
          A lightweight, fully client-side web application for managing student
          records — built with React, Vite, and React Router. No server or
          database required; everything is stored right in your browser.
        </p>
      </div>

      <section className="about-section">
        <h2 className="section-title">Key Capabilities</h2>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="section-title">Frontend Architecture</h2>
        <div className="arch-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Technology</th>
                <th>Role in this App</th>
              </tr>
            </thead>
            <tbody>
              {techStack.map((t) => (
                <tr key={t.name}>
                  <td>
                    <strong>{t.name}</strong>
                  </td>
                  <td>{t.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="about-section">
        <h2 className="section-title">Route Structure</h2>
        <div className="route-tree card">
          <pre className="route-code">{`/ ──────────────────────► redirect to /studentdashboard
/studentdashboard ──────► Dashboard (index)
  /students ─────────────► Students list & form
  /about ─────────────────► This page
  /* ─────────────────────► 404 (nested)
/* ─────────────────────────► 404 (root)`}</pre>
        </div>
      </section>
    </div>
  )
}
