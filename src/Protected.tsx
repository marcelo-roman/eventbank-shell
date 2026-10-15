import { type ComponentType, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router';
import { useAuth } from './auth/AuthContext';
import { type RemoteProps, type Role } from './auth/session';

interface ProtectedProps {
  roles: Role[];
  app: ComponentType<RemoteProps>;
}

export function Protected({ roles, app: App }: ProtectedProps) {
  const { ready, signingOut, user, signIn, getAccessToken } = useAuth();
  const location = useLocation();
  const auth = useMemo(() => (user ? { user, getAccessToken } : null), [user, getAccessToken]);

  useEffect(() => {
    if (ready && !user && !signingOut) {
      void signIn(location.pathname);
    }
  }, [ready, user, signingOut, signIn, location.pathname]);

  if (signingOut) {
    return <p className="page muted">Signing you out…</p>;
  }
  if (!ready || !auth) {
    return <p className="page muted">Taking you to sign in…</p>;
  }
  if (!roles.some((role) => auth.user.roles.includes(role))) {
    return (
      <p className="page error" role="alert">
        This area is not available for your profile.
      </p>
    );
  }
  return <App auth={auth} />;
}
