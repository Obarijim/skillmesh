import { Link } from 'react-router-dom'

// Screen 08 from the mockup. This is an overlay triggered from the avatar
// circle in the navbar, not a routed page — the mockup itself shows it open
// on top of the Matches screen, confirming it's a dropdown, not a destination.
function AccountMenu({ onClose }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        right: 0,
        marginTop: 8,
        width: 280,
        backgroundColor: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-card)',
        zIndex: 10,
        padding: 'var(--space-md)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          paddingBottom: 'var(--space-md)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 600,
          }}
        >
          JR
        </span>
        <div>
          <div style={{ fontWeight: 600 }}>Juan Reyes</div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>j.reyes@student.edu</div>
        </div>
      </div>

      <MenuItem to="/profile" onClick={onClose}>
        Edit skills &amp; resume
      </MenuItem>
      <MenuItem onClick={onClose}>Account settings</MenuItem>
      <MenuRow label="Email alerts" value="Weekly" onClick={onClose} />
      <MenuItem onClick={onClose}>Download my data</MenuItem>

      <div style={{ borderTop: '1px solid var(--color-border)', margin: 'var(--space-sm) 0' }} />

      <MenuItem onClick={onClose}>Log out</MenuItem>
      <MenuItem onClick={onClose} danger>
        Delete account
      </MenuItem>
    </div>
  )
}

function MenuItem({ to, children, onClick, danger }) {
  const style = {
    display: 'block',
    padding: '8px 4px',
    fontSize: 'var(--font-size-sm)',
    color: danger ? 'var(--color-danger)' : 'var(--color-text)',
    textDecoration: 'none',
    cursor: 'pointer',
  }
  return to ? (
    <Link to={to} style={style} onClick={onClick}>
      {children}
    </Link>
  ) : (
    <div style={style} onClick={onClick}>
      {children}
    </div>
  )
}

function MenuRow({ label, value, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 4px',
        fontSize: 'var(--font-size-sm)',
        cursor: 'pointer',
      }}
    >
      <span>{label}</span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
        }}
      >
        {value}
      </span>
    </div>
  )
}

export default AccountMenu