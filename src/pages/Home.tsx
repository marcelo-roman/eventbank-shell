import { Navigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { useCustomerStatus } from '../auth/useCustomerStatus';
import { Landing } from './Landing';

export function Home() {
  const { ready, user } = useAuth();
  const status = useCustomerStatus();

  if (!ready) {
    return <p className="page muted">Loading…</p>;
  }
  if (!user) {
    return <Landing />;
  }
  if (user.roles.includes('operator')) {
    return <Navigate to="/backoffice" replace />;
  }
  if (status === 'loading') {
    return <p className="page muted">Loading your profile…</p>;
  }
  return <Navigate to={status === 'Approved' ? '/accounts' : '/onboarding'} replace />;
}
