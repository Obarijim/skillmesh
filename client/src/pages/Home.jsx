import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

// Screen 01 — Welcome
function Home() {
  return (
    <>
      <Navbar authed={false} />
      <main style={{ padding: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-xl)', flexWrap: 'wrap', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ flex: '1 1 480px' }}>
            <div className="label-mono">Semantic job matching for IT roles</div>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-2xl)',
                lineHeight: 1.15,
                margin: 'var(--space-sm) 0 var(--space-md)',
              }}
            >
              Matched on what your skills mean, not on words they happen to share
            </h1>
            <p style={{ maxWidth: 480, lineHeight: 1.6 }}>
              List the technologies you actually know. We read IT job postings for meaning, so your React work
              still surfaces a role written for Typescript, and every match tells you exactly why it matched.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-md)', margin: 'var(--space-lg) 0' }}>
              <Link to="/signup">
                <button
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Create an account
                </button>
              </Link>
              <Link to="/login">
                <button
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                    padding: '12px 20px',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  I already have one
                </button>
              </Link>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-xl)' }}>
              <Stat value="1,284" label="IT postings indexed" />
              <Stat value="642" label="skills in the vocabulary" />
              <Stat value="free" label="for students" />
            </div>
          </div>

          <div
            style={{
              flex: '1 1 360px',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              padding: 'var(--space-lg)',
              height: 'fit-content',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div className="label-mono" style={{ marginBottom: 'var(--space-md)' }}>
              How a match is explained
            </div>

            <MatchRow left="Your React" right="Their Typescript" sim="0.88" />
            <MatchRow left="Your projects" right="Their Git" sim="0.69" />

            <div
              style={{
                display: 'flex',
                gap: 'var(--space-lg)',
                marginTop: 'var(--space-lg)',
                paddingTop: 'var(--space-md)',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-xl)',
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                  }}
                >
                  84<span style={{ fontSize: 'var(--font-size-sm)' }}>%</span>
                </div>
                <div className="label-mono">Semantic</div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--font-size-xl)',
                    color: 'var(--color-text-faint)',
                    fontWeight: 700,
                  }}
                >
                  57<span style={{ fontSize: 'var(--font-size-sm)' }}>%</span>
                </div>
                <div className="label-mono" style={{ color: 'var(--color-text-faint)' }}>
                  Keyword only
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <div style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)' }}>{value}</div>
      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{label}</div>
    </div>
  )
}

function MatchRow({ left, right, sim }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: '1px solid var(--color-border)',
        fontSize: 'var(--font-size-sm)',
      }}
    >
      <span style={{ fontWeight: 600 }}>{left}</span>
      <span style={{ color: 'var(--color-primary)' }}>&asymp;</span>
      <span>{right}</span>
      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)', fontWeight: 600 }}>{sim}</span>
    </div>
  )
}

export default Home