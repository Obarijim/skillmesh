import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { mockMatches } from '../data/mockMatches'
import { mockSkillMatchRows } from '../data/mockSkillMatch'

// Screen 06 — Job detail, "why this matched you"
function JobDetail() {
  const { id } = useParams()
  const job = mockMatches.find((j) => j.id === Number(id)) || mockMatches[0]

  return (
    <>
      <Navbar authed />
      <main style={{ padding: 'var(--space-xl)', maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
        <aside style={{ flex: '0 0 280px', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', height: 'fit-content' }}>
          <div style={{ padding: 'var(--space-md)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between' }}>
            <span className="label-mono">28 matches</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>by relevance</span>
          </div>
          {mockMatches.map((m) => (
            <Link
              key={m.id}
              to={`/matches/${m.id}`}
              style={{
                display: 'block',
                padding: 'var(--space-md)',
                textDecoration: 'none',
                color: 'var(--color-text)',
                borderLeft: m.id === job.id ? '3px solid var(--color-primary)' : '3px solid transparent',
                backgroundColor: m.id === job.id ? 'var(--color-bg-subtle)' : 'transparent',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: 'var(--font-size-sm)' }}>{m.title}</strong>
                <strong style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-sm)' }}>{m.score}</strong>
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                {m.company} &middot; {m.location.split(',')[0]}
              </div>
            </Link>
          ))}
        </aside>

        <section style={{ flex: '1 1 500px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-xl)', marginBottom: 4 }}>{job.title}</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
            {job.company} &middot; {job.location} &middot; {job.pay} stipend
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
            <Pill text="Internship &middot; 6 months" />
            <Pill text="Students welcome" />
            <Pill text="Posted 3 days ago" />
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              padding: 'var(--space-lg)',
              display: 'flex',
              gap: 'var(--space-xl)',
              marginBottom: 'var(--space-lg)',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-xl)', color: 'var(--color-primary)', fontWeight: 700 }}>
                {job.score}
                <span style={{ fontSize: 'var(--font-size-sm)' }}>%</span>
              </div>
              <div className="label-mono">Semantic</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-xl)', color: 'var(--color-text-faint)', fontWeight: 700 }}>
                57<span style={{ fontSize: 'var(--font-size-sm)' }}>%</span>
              </div>
              <div className="label-mono" style={{ color: 'var(--color-text-faint)' }}>
                Keyword
              </div>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', margin: 0, alignSelf: 'center' }}>
              Keyword matching finds 4 of 7 terms verbatim. Reading meaning adds Typescript and Git.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', padding: 'var(--space-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <strong>Why this matched you</strong>
              <span className="label-mono" style={{ color: 'var(--color-text-muted)' }}>cosine similarity &middot; sentence embeddings</span>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
              Six of the seven requirements are covered by things you already know, though only four are named
              the same way on your resume. Your Javascript and React work carries the Typescript requirement, and
              building React apps implies the version control they ask for.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 80px',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                padding: '8px 0',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <span className="label-mono">Your skill</span>
              <span className="label-mono">Required</span>
              <span className="label-mono" style={{ textAlign: 'right' }}>Sim.</span>
            </div>

            {mockSkillMatchRows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 80px',
                  padding: '12px 0',
                  borderBottom: i < mockSkillMatchRows.length - 1 ? '1px solid var(--color-border)' : 'none',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: row.type === 'missing' ? 400 : 600, color: row.type === 'missing' ? 'var(--color-text-faint)' : 'var(--color-text)' }}>
                    {row.yourSkill}
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{row.yourNote}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{row.required}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{row.requiredNote}</div>
                </div>
                <div
                  style={{
                    textAlign: 'right',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    color: row.type === 'missing' ? 'var(--color-text-faint)' : 'var(--color-primary)',
                  }}
                >
                  {row.sim}
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-lg)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                <button
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Apply
                </button>
                <button
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
              </div>
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                QA knowledge is the only requirement you can't claim.
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function Pill({ text }) {
  return (
    <span style={{ padding: '6px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: 'var(--font-size-sm)' }}>
      {text}
    </span>
  )
}

export default JobDetail