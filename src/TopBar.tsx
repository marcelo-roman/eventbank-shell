import { NavLink } from 'react-router';
import { useAuth } from './auth/AuthContext';
import { useCustomerStatus } from './auth/useCustomerStatus';
import { useLocale } from './i18n/LocaleContext';
import { LocaleSwitch } from './i18n/LocaleSwitch';

function CustomerLinks() {
  const status = useCustomerStatus();
  const { t } = useLocale();
  if (status !== 'Approved') {
    return <NavLink to="/onboarding">{t.nav.application}</NavLink>;
  }
  return (
    <>
      <NavLink to="/accounts">{t.nav.accounts}</NavLink>
      <NavLink to="/pix">{t.nav.pix}</NavLink>
      <NavLink to="/cards">{t.nav.cards}</NavLink>
    </>
  );
}

function OperatorLinks() {
  const { t } = useLocale();
  return (
    <>
      <NavLink to="/backoffice">{t.nav.backoffice}</NavLink>
      <NavLink to="/projections">{t.nav.projections}</NavLink>
    </>
  );
}

export function TopBar() {
  const { user, signIn, signOut } = useAuth();
  const { t } = useLocale();
  const isOperator = user?.roles.includes('operator') ?? false;

  return (
    <header className="topbar">
      <NavLink to="/" className="wordmark">
        EventBank
      </NavLink>
      <nav aria-label={t.mainNavigation}>{user && (isOperator ? <OperatorLinks /> : <CustomerLinks />)}</nav>
      <div className="session">
        <LocaleSwitch />
        {user ? (
          <>
            <span className="session-name">{user.name}</span>
            <button type="button" className="button quiet small" onClick={() => void signOut()}>
              {t.session.signOut}
            </button>
          </>
        ) : (
          <button type="button" className="button quiet small" onClick={() => void signIn('/')}>
            {t.session.signIn}
          </button>
        )}
      </div>
    </header>
  );
}
