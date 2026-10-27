import { Navigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { useCustomerStatus } from '../auth/useCustomerStatus';
import { useLocale } from '../i18n/LocaleContext';
import { Landing } from './Landing';

export function Home() {
  const { ready, user } = useAuth();
  const status = useCustomerStatus();
  const { t } = useLocale();

  if (!ready) {
    return <p className="page muted">{t.loading}</p>;
  }
  if (!user) {
    return <Landing />;
  }
  if (user.roles.includes('operator')) {
    return <Navigate to="/backoffice" replace />;
  }
  if (status === 'loading') {
    return <p className="page muted">{t.loadingProfile}</p>;
  }
  return <Navigate to={status === 'Approved' ? '/accounts' : '/onboarding'} replace />;
}
