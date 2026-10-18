export function OAuthButton({ label }) {
  return (
    <button
      type="button"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-sm)',
        backgroundColor: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '10px var(--space-md)',
        marginBottom: 'var(--space-sm)',
        cursor: 'pointer',
        fontSize: 'var(--font-size-sm)',
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          backgroundColor: 'var(--color-bg-subtle)',
          border: '1px solid var(--color-border)',
        }}
      />
      {label}
    </button>
  )
}

export function Field({ label, type = 'text', placeholder, value, onChange, action, topRight }) {
  return (
    <div style={{ marginBottom: 'var(--space-md)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <label style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{label}</label>
        {topRight}
      </div>
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            fontSize: 'var(--font-size-base)',
          }}
        />
        {action && (
          <span
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-primary)',
              cursor: 'pointer',
            }}
          >
            {action}
          </span>
        )}
      </div>
    </div>
  )
}

export function PasswordStrength({ password }) {
  const pct = Math.min(password.length / 10, 1) * 100
  const label = password.length === 0 ? '' : password.length < 6 ? 'weak' : password.length < 10 ? 'okay' : 'strong'
  return (
    <div style={{ marginBottom: 'var(--space-sm)' }}>
      <div style={{ height: 4, backgroundColor: 'var(--color-border)', borderRadius: 2 }}>
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            backgroundColor: 'var(--color-primary)',
            borderRadius: 2,
            transition: 'width 0.2s',
          }}
        />
      </div>
      {label && (
        <div style={{ textAlign: 'right', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 2 }}>
          {label} &middot; 8+ chars
        </div>
      )}
    </div>
  )
}