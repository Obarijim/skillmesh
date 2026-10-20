import { useState } from 'react'
import AuthTopBar from '../components/AuthTopBar'
import { OAuthButton, Field, PasswordStrength } from '../components/AuthBits'
import { API_BASE_URL } from '../config'
import { startAnonymousSession } from '../api'

// Screen 02 — Sign up
function SignUp() {
  const [password, setPassword] = useState('')

async function continueAnonymously() {
  await startAnonymousSession()
  window.location.href = '/profile'
}

  return (
    <>
      <AuthTopBar prompt="Already registered?" linkLabel="Log in" linkTo="/login" />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'var(--space-xl)' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-xs)' }}>
            Create your account
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>
            Two minutes, then you add your skills.
          </p>

          <div
            style={{
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              padding: 'var(--space-lg)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <OAuthButton label="Continue with Google" href={`${API_BASE_URL}/auth/google/login`} />
            <OAuthButton label="Continue with GitHub" />

            <div
              className="label-mono"
              style={{ textAlign: 'center', margin: 'var(--space-md) 0', color: 'var(--color-text-faint)' }}
            >
              or with email
            </div>

            <Field label="Full name" placeholder="Juan Reyes" />
            <Field label="Email" placeholder="j.reyes@student.edu" />
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              action="Show"
            />
            <PasswordStrength password={password} />

            <label
              style={{
                display: 'flex',
                gap: 'var(--space-sm)',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                margin: 'var(--space-md) 0',
              }}
            >
              <input type="checkbox" style={{ marginTop: 3 }} />
              I'm a student or professional looking for IT roles, and I accept the terms of use.
            </label>

            <button
              style={{
                width: '100%',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Create account
            </button>

            <button
              type="button"
              onClick={continueAnonymously}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                color: 'var(--color-text-muted)',
                border: 'none',
                padding: '10px',
                marginTop: 'var(--space-sm)',
                fontSize: 'var(--font-size-xs)',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Continue without signing in
            </button>
          </div>

          <p style={{ textAlign: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--space-md)' }}>
            Next: add your skills, then see matches.
          </p>
        </div>
      </main>
    </>
  )
}

export default SignUp