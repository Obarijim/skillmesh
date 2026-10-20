import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { uploadResume } from '../api'

const SKILL_SUGGESTIONS = [
  { name: 'Typescript', note: 'typed superset of Javascript' },
  { name: 'Type hinting (Python)', note: 'different ecosystem' },
]
const QUICK_ADD = ['Git', 'Tailwind CSS', 'Next.js']
const RESUME_SKILLS = [
  { name: 'Javascript', level: 'strong', pct: 90 },
  { name: 'React', level: 'working', pct: 60 },
  { name: 'HTML', level: 'advanced', pct: 80 },
  { name: 'CSS', level: 'advanced', pct: 80 },
]

// Screen 04 — Profile, skills
function ProfileSkills() {
  const [query, setQuery] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState(null)
  const fileInputRef = useRef(null)

  const suggestions =
    query.trim().length > 0
      ? SKILL_SUGGESTIONS.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
      : []

  function handleReplaceClick() {
    fileInputRef.current?.click()
  }

  async function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return

    setResumeFile(file)
    setUploadStatus('uploading')

    try {
      const result = await uploadResume(file)
      setUploadStatus({ ok: true, characters: result.characters_extracted })
    } catch (err) {
      setUploadStatus({ ok: false, error: err.message })
    }
  }

  const displayName = resumeFile ? resumeFile.name : 'reyes_juan_cv.pdf'
  const displaySize = resumeFile ? `${Math.max(1, Math.round(resumeFile.size / 1024))} KB` : '184 KB'

  return (
    <>
      <Navbar authed />
      <main style={{ padding: 'var(--space-xl)', maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-xs)' }}>
          What can you build?
        </h1>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: 600, marginBottom: 'var(--space-lg)' }}>
          Upload a resume and we read the skills out of it, or type them in. You don't need to list every variant
          of a technology — related tools are recognised for you.
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
          <section
            style={{
              flex: '1 1 480px',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              padding: 'var(--space-lg)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-sm)' }}>
              <strong>Resume</strong>
              <span className="label-mono">Parsed &middot; 4 skills</span>
            </div>
            <div
              style={{
                border: '1px dashed var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--space-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-md)',
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{displayName}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{displaySize}</div>
              </div>
              <span onClick={handleReplaceClick} style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-sm)', cursor: 'pointer' }}>
                {resumeFile ? 'Replace' : 'Upload'}
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>

            {uploadStatus === 'uploading' && (
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
                Uploading and extracting text…
              </p>
            )}
            {uploadStatus && uploadStatus.ok === true && (
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-primary)', marginBottom: 'var(--space-md)' }}>
                Resume processed — {uploadStatus.characters} characters of text extracted and stored. (Skill
                extraction from this text arrives in Week 4 — the panel on the right is still example data.)
              </p>
            )}
            {uploadStatus && uploadStatus.ok === false && (
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-danger)', marginBottom: 'var(--space-md)' }}>
                Couldn't process that file: {uploadStatus.error}
              </p>
            )}

            <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: 6 }}>
              Add a skill
            </label>
            <div style={{ position: 'relative' }}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Start typing a technology..."
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-primary)',
                  fontSize: 'var(--font-size-base)',
                }}
              />
              {suggestions.length > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    zIndex: 5,
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  {suggestions.map((s) => (
                    <div key={s.name} style={{ padding: '10px 12px', fontSize: 'var(--font-size-sm)', cursor: 'pointer' }}>
                      <strong>{s.name}</strong> <span style={{ color: 'var(--color-text-muted)' }}>{s.note}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-md)', flexWrap: 'wrap', alignItems: 'center' }}>
              {QUICK_ADD.map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 999,
                    border: '1px solid var(--color-border)',
                    fontSize: 'var(--font-size-sm)',
                    cursor: 'pointer',
                  }}
                >
                  + {skill}
                </span>
              ))}
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>near your existing skills</span>
            </div>
          </section>

          <aside style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <div
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                padding: 'var(--space-lg)',
              }}
            >
              <strong>Skills read from your resume</strong>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 2 }}>
                Adjust any level we got wrong.
              </p>
              {RESUME_SKILLS.map((s) => (
                <div key={s.name} style={{ margin: '10px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)', marginBottom: 4 }}>
                    <span style={{ fontWeight: 600 }}>{s.name}</span>
                    <span className="label-mono" style={{ color: 'var(--color-text-muted)' }}>{s.level}</span>
                  </div>
                  <div style={{ height: 6, backgroundColor: 'var(--color-border)', borderRadius: 3 }}>
                    <div style={{ width: `${s.pct}%`, height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: 3 }} />
                  </div>
                </div>
              ))}
              <div
                style={{
                  marginTop: 'var(--space-md)',
                  padding: 'var(--space-md)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-muted)',
                }}
              >
                Four skills is enough to match on. We expand each one to the technologies it implies, so you'll
                still surface for roles that name Typescript or Vue.
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                padding: 'var(--space-lg)',
              }}
            >
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Target role</label>
              <select
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  marginBottom: 'var(--space-md)',
                }}
              >
                <option>Intern Frontend Developer</option>
                <option>Junior Web Developer</option>
                <option>QA Engineer</option>
              </select>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                <Link to="/matches">
                  <button
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'white',
                      border: 'none',
                      padding: '10px 18px',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Find matches
                  </button>
                </Link>
                <span className="label-mono" style={{ color: 'var(--color-text-muted)' }}>1,284 IT postings indexed</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  )
}

export default ProfileSkills