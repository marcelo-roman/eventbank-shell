import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';

export function Callback() {
  const { completeSignIn } = useAuth();
  const navigate = useNavigate();
  const started = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (started.current) {
      return;
    }
    started.current = true;
    completeSignIn()
      .then((returnTo) => navigate(returnTo, { replace: true }))
      .catch((failure: unknown) => {
        setError(failure instanceof Error ? failure.message : 'Sign-in failed.');
      });
  }, [completeSignIn, navigate]);

  if (error) {
    return (
      <p className="page error" role="alert">
        {error}
      </p>
    );
  }
  return <p className="page muted">Signing you in…</p>;
}
