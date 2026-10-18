import { Link } from 'react-router-dom'

// Slim header used only on the Sign up and Log in screens. The mockup shows
// these two screens with just the wordmark and a single contextual link
// ("Already registered? Log in" / "New here? Sign up") instead of the full
// logged-out navbar with both buttons — repeating a "Sign up" button on the
// sign-up form itself would be redundant.
function AuthTopBar({ prompt, linkLabel, linkTo }) {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--space-md) var(--space-xl)',
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', textDecoration: 'none' }}>
        <span
          style={{
            width: 20,
            height: 20,
            borderRadius: 5,
            backgroundColor: 'var(--color-primary)',
            display: 'inline-block',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            color: 'var(--color-text)',
            fontSize: 'var(--font-size-lg)',
          }}
        >
          SkillMesh
        </span>
      </Link>
      <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
        {prompt}{' '}
        <Link to={linkTo} style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
          {linkLabel}
        </Link>
      </span>
    </nav>
  )
}

export default AuthTopBar
