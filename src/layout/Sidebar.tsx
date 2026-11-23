import { NavLink } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { useCustomerStatus } from '../auth/useCustomerStatus';
import { useLocale } from '../i18n/LocaleContext';
import { Brand } from './Brand';

interface NavItem {
  to: string;
  icon: string;
  label: string;
}

interface SidebarProps {
  open: boolean;
  collapsed: boolean;
  onNavigate: () => void;
}

function NavItems({ items, onNavigate }: { items: NavItem[]; onNavigate: () => void }) {
  return items.map((item) => (
    <NavLink key={item.to} to={item.to} title={item.label} onClick={onNavigate}>
      <span className="nav-icon" aria-hidden>
        {item.icon}
      </span>
      <span className="nav-label">{item.label}</span>
    </NavLink>
  ));
}

function CustomerNav({ onNavigate }: { onNavigate: () => void }) {
  const status = useCustomerStatus();
  const { t } = useLocale();
  const items: NavItem[] =
    status === 'Approved'
      ? [
          { to: '/accounts', icon: '▦', label: t.nav.accounts },
          { to: '/pix', icon: '⇄', label: t.nav.pix },
          { to: '/cards', icon: '▭', label: t.nav.cards },
        ]
      : [{ to: '/onboarding', icon: '✎', label: t.nav.application }];

  return (
    <>
      <span className="nav-section">
        <span className="nav-label">{t.sections.banking}</span>
      </span>
      <NavItems items={items} onNavigate={onNavigate} />
    </>
  );
}

function OperatorNav({ onNavigate }: { onNavigate: () => void }) {
  const { t } = useLocale();
  const items: NavItem[] = [
    { to: '/backoffice', icon: '◉', label: t.nav.backoffice },
    { to: '/projections', icon: '↻', label: t.nav.projections },
  ];

  return (
    <>
      <span className="nav-section">
        <span className="nav-label">{t.sections.operations}</span>
      </span>
      <NavItems items={items} onNavigate={onNavigate} />
    </>
  );
}

export function Sidebar({ open, collapsed, onNavigate }: SidebarProps) {
  const { user } = useAuth();
  const { t } = useLocale();
  const isOperator = user?.roles.includes('operator') ?? false;
  const classes = ['sidebar', open ? 'open' : '', collapsed ? 'collapsed' : ''].filter(Boolean).join(' ');

  return (
    <aside className={classes} id="app-menu">
      <Brand onNavigate={onNavigate} />
      <nav className="nav" aria-label={t.mainNavigation}>
        {isOperator ? <OperatorNav onNavigate={onNavigate} /> : <CustomerNav onNavigate={onNavigate} />}
      </nav>
    </aside>
  );
}
