import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import AccountMenu from './AccountMenu'

// Full navbar used by the Welcome page (logged out) and by every page once
// the user is signed in. The Sign up and Log in pages do NOT use this —
// they use AuthTopBar instead, which matches the mockup's slimmer header
// for those two screens.
function Navbar({ authed = false }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--space-md) var(--space-xl)',
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
        position: 'relative',
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

      {authed ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/matches">Matches</NavLink>
          <NavLink to="/saved">Saved</NavLink>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Account menu"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            JR
          </button>
          {menuOpen && <AccountMenu onClose={() => setMenuOpen(false)} />}
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
          <Link to="/login" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>
            Log in
          </Link>
          <Link to="/signup">
            <button
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Sign up
            </button>
          </Link>
        </div>
      )}
    </nav>
  )
}

function NavLink({ to, children }) {
  const { pathname } = useLocation()
  const active = pathname === to || pathname.startsWith(to + '/')
  return (
    <Link
      to={to}
      style={{
        color: 'var(--color-text)',
        textDecoration: active ? 'underline' : 'none',
        fontWeight: active ? 600 : 400,
        fontSize: 'var(--font-size-sm)',
      }}
    >
      {children}
    </Link>
  )
}

export default Navbar