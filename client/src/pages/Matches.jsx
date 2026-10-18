import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { mockMatches } from '../data/mockMatches'

// Screen 05 — Matches
function Matches() {
  return (
    <>
      <Navbar authed />
      <main style={{ padding: 'var(--space-xl)', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-xl)', margin: 0 }}>
              28 matches for your skills
            </h1>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Ranked by semantic similarity to Javascript, React, HTML and CSS. 6 are new since Monday.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <FilterPill label="Location: any" />
            <FilterPill label="Match \u2265 60%" />
            <FilterPill label="Sort: relevance" />
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-lg)', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)' }}>
          {mockMatches.map((job, i) => (
            <div
              key={job.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--space-lg)',
                flexWrap: 'wrap',
                gap: 'var(--space-md)',
                borderBottom: i < mockMatches.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <strong>{job.title}</strong>
                  {job.isNew && (
                    <span
                      style={{
                        backgroundColor: 'var(--color-primary-bg)',
                        color: 'var(--color-primary)',
                        fontSize: 'var(--font-size-xs)',
                        padding: '2px 8px',
                        borderRadius: 999,
                        fontWeight: 600,
                      }}
                    >
                      NEW
                    </span>
                  )}
                </div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  {job.company} &middot; {job.location} &middot; {job.pay}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                {job.tags.map((tag) => (
                  <SkillTag key={tag.label} {...tag} />
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', width: 140 }}>
                <div style={{ flex: 1, height: 6, backgroundColor: 'var(--color-border)', borderRadius: 3 }}>
                  <div style={{ width: `${job.score}%`, height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: 3 }} />
                </div>
                <strong>{job.score}</strong>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-md)', fontSize: 'var(--font-size-sm)' }}>
                <span style={{ color: 'var(--color-primary)', cursor: 'pointer' }}>Save</span>
                <Link to={`/matches/${job.id}`} style={{ color: 'var(--color-text)', fontWeight: 600 }}>
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-md)' }}>
          <span className="label-mono">Showing 1-{mockMatches.length} of 28</span>
          <button
            disabled
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text-muted)',
              cursor: 'not-allowed',
            }}
          >
            Load more
          </button>
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

function SkillTag({ label, type }) {
  const styles = {
    exact: { color: 'var(--color-text)', borderColor: 'var(--color-border)' },
    near: { color: 'var(--color-primary)', borderColor: 'var(--color-primary)' },
    missing: { color: 'var(--color-text-faint)', borderColor: 'var(--color-border)' },
  }[type]
  const symbol = { exact: '', near: ' \u2248', missing: ' \u2715' }[type]
  return (
    <span
      style={{
        padding: '2px 10px',
        borderRadius: 999,
        border: `1px solid ${styles.borderColor}`,
        color: styles.color,
        fontSize: 'var(--font-size-xs)',
        textDecoration: type === 'missing' ? 'line-through' : 'none',
      }}
    >
      {label}
      {symbol}
    </span>
  )
}

export default Matches