import './frame.css';
import { type ReactNode, useCallback, useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { LocaleSwitch } from '../i18n/LocaleSwitch';
import { useLocale } from '../i18n/LocaleContext';
import { ThemeToggle } from '../theme/ThemeSwitch';
import { Brand } from './Brand';
import { MenuIcon } from './icons';
import { Sidebar } from './Sidebar';
import { UserMenu } from './UserMenu';

const sidebarKey = 'eventbank.sidebar';
const drawerQuery = '(max-width: 960px)';

function readCollapsed(): boolean {
  try {
    return window.localStorage.getItem(sidebarKey) === 'collapsed';
  } catch {
    return false;
  }
}

function storeCollapsed(collapsed: boolean): void {
  try {
    window.localStorage.setItem(sidebarKey, collapsed ? 'collapsed' : 'expanded');
  } catch {
    return;
  }
}

function SkipLink() {
  const { t } = useLocale();
  return (
    <a className="skip" href="#main">
      {t.skipToContent}
    </a>
  );
}

function AppFrame({ children }: { children: ReactNode }) {
  const { t } = useLocale();
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    if (window.matchMedia(drawerQuery).matches) {
      setMenuOpen(!menuOpen);
      return;
    }
    storeCollapsed(!collapsed);
    setCollapsed(!collapsed);
  };

  return (
    <div className={collapsed ? 'app sidebar-collapsed' : 'app'}>
      <SkipLink />
      <Sidebar open={menuOpen} collapsed={collapsed} onNavigate={closeMenu} />
      {menuOpen && <div className="menu-backdrop" onClick={closeMenu} aria-hidden />}
      <div className="main">
        <header className="topbar">
          <button
            type="button"
            className="top-icon"
            aria-label={t.menu}
            aria-expanded={menuOpen}
            aria-controls="app-menu"
            onClick={toggleMenu}
          >
            <MenuIcon />
          </button>
          <span className="topbar-brand">
            <Brand />
          </span>
          <span className="topbar-end">
            <LocaleSwitch />
            <ThemeToggle />
            <UserMenu />
          </span>
        </header>
        <main id="main">{children}</main>
      </div>
    </div>
  );
}

function PublicFrame({ children }: { children: ReactNode }) {
  const { signIn } = useAuth();
  const { t } = useLocale();

  return (
    <div className="public">
      <SkipLink />
      <header className="topbar public-bar">
        <Brand />
        <span className="topbar-end">
          <LocaleSwitch />
          <ThemeToggle />
          <button type="button" className="button small" onClick={() => void signIn('/')}>
            {t.session.signIn}
          </button>
        </span>
      </header>
      <main id="main">{children}</main>
    </div>
  );
}

export function Frame({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (!user) {
    return <PublicFrame>{children}</PublicFrame>;
  }
  return <AppFrame>{children}</AppFrame>;
}
