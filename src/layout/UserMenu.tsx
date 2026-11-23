import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useLocale } from '../i18n/LocaleContext';
import { ThemeSwitch } from '../theme/ThemeSwitch';

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return (first + last).toUpperCase() || '?';
}

export function UserMenu() {
  const { user, signOut, manageAccount } = useAuth();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const closeOutside = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  if (!user) {
    return null;
  }

  const role = user.roles.includes('operator') ? t.roles.operator : t.roles.customer;

  return (
    <div className="user-menu" ref={ref}>
      <button
        type="button"
        className="user-button"
        aria-expanded={open}
        aria-haspopup="true"
        title={user.email}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span className="avatar" aria-hidden>
          {initials(user.name)}
        </span>
        <span className="user-name">{user.name.split(' ')[0]}</span>
      </button>
      {open && (
        <div className="user-panel">
          <div className="user-panel-head">
            <strong className="ellipsis">{user.name}</strong>
            <span className="muted small ellipsis">{user.email}</span>
            <span className="user-role">{role}</span>
          </div>
          <div className="user-panel-theme">
            <span className="muted small">{t.theme.label}</span>
            <ThemeSwitch />
          </div>
          <button type="button" className="menu-item" onClick={() => void manageAccount()}>
            {t.account}
          </button>
          <button type="button" className="menu-item danger" onClick={() => void signOut()}>
            {t.session.signOut}
          </button>
        </div>
      )}
    </div>
  );
}
