import { NavLink } from 'react-router';
import { useAuth } from './auth/AuthContext';
import { useCustomerStatus } from './auth/useCustomerStatus';

function CustomerLinks() {
  const status = useCustomerStatus();
  if (status !== 'Approved') {
    return <NavLink to="/onboarding">Your application</NavLink>;
  }
  return (
    <>
      <NavLink to="/accounts">Accounts</NavLink>
      <NavLink to="/pix">PIX</NavLink>
      <NavLink to="/cards">Cards</NavLink>
    </>
  );
}

function OperatorLinks() {
  return (
    <>
      <NavLink to="/backoffice">Back office</NavLink>
      <NavLink to="/projections">Projections</NavLink>
    </>
  );
}

export function TopBar() {
  const { user, signIn, signOut } = useAuth();
  const isOperator = user?.roles.includes('operator') ?? false;

  return (
    <header className="topbar">
      <NavLink to="/" className="wordmark">
        EventBank
      </NavLink>
      <nav aria-label="Main">{user && (isOperator ? <OperatorLinks /> : <CustomerLinks />)}</nav>
      {user ? (
        <div className="session">
          <span className="session-name">{user.name}</span>
          <button type="button" className="button quiet small" onClick={() => void signOut()}>
            Sign out
          </button>
        </div>
      ) : (
        <button type="button" className="button quiet small" onClick={() => void signIn('/')}>
          Sign in
        </button>
      )}
    </header>
  );
}
