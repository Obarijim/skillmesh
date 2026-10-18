import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { mockSaved } from '../data/mockSaved'

const STATUS_STYLES = {
  applied: { bg: 'var(--color-primary-bg)', color: 'var(--color-primary)' },
  not_applied: { bg: 'var(--color-bg-subtle)', color: 'var(--color-text-muted)' },
  closing: { bg: 'var(--color-warning-bg)', color: 'var(--color-warning-text)' },
}

// Screen 07 — Saved jobs
function SavedJobs() {
  return (
    <>
      <Navbar authed />
      <main style={{ padding: 'var(--space-xl)', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-xl)', margin: 0 }}>Saved jobs</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>Three saved. We re-score them whenever you change your skills.</p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <FilterPill label="All statuses" />
            <FilterPill label="Sort: date saved" />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-lg)', marginTop: 'var(--space-lg)', flexWrap: 'wrap' }}>
          {mockSaved.map((job) => {
            const style = STATUS_STYLES[job.status]
            return (
              <div
                key={job.id}
                style={{
                  flex: '1 1 300px',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)',
                  padding: 'var(--space-lg)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{job.title}</strong>
                  <strong style={{ color: 'var(--color-primary)' }}>{job.score}</strong>
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', margin: '4px 0 var(--space-md)' }}>
                  {job.company} &middot; {job.location}
                </p>

                <span
                  className="label-mono"
                  style={{ backgroundColor: style.bg, color: style.color, padding: '4px 10px', borderRadius: 'var(--radius-sm)', display: 'inline-block' }}
                >
                  {job.statusLabel}
                </span>

                <p style={{ fontSize: 'var(--font-size-sm)', margin: 'var(--space-md) 0', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-md)' }}>
                  {job.note}
                </p>

                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  <Link to={`/matches/${job.id}`}>
                    <button
                      style={{
                        backgroundColor: 'var(--color-text)',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                      }}
                    >
                      View
                    </button>
                  </Link>
                  <button
                    style={{
                      backgroundColor: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}

function FilterPill({ label }) {
  return (
    <span
      style={{
        padding: '6px 14px',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)',
        fontSize: 'var(--font-size-sm)',
        color: 'var(--color-text-muted)',
      }}
    >
      {label} &#9662;
    </span>
  )
}

export default SavedJobs