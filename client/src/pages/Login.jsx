import { Link } from 'react-router-dom'
import AuthTopBar from '../components/AuthTopBar'
import { OAuthButton, Field } from '../components/AuthBits'
import { API_BASE_URL } from '../config'

// Screen 03 — Log in
function Login() {
  async function continueAnonymously() {
    await fetch(`${API_BASE_URL}/auth/session`, { method: 'POST', credentials: 'include' })
    window.location.href = '/profile'
  }

  return (
    <>
      <AuthTopBar prompt="New here?" linkLabel="Sign up" linkTo="/signup" />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'var(--space-xl)' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-xs)' }}>
            Welcome back
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>
            6 new matches since you last signed in.
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

            <Field label="Email" placeholder="j.reyes@student.edu" />
            <Field
              label="Password"
              type="password"
              action="Show"
              topRight={
                <Link to="#" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary)' }}>
                  Forgot password?
                </Link>
              }
            />

            <label
              style={{
                display: 'flex',
                gap: 'var(--space-sm)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-muted)',
                margin: 'var(--space-md) 0',
              }}
            >
              <input type="checkbox" />
              Keep me signed in on this device
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
              Log in
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
        </div>
      </main>
    </>
  )
}

export default Login