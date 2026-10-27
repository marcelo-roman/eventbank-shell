import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { useLocale } from '../i18n/LocaleContext';

export function Callback() {
  const { completeSignIn } = useAuth();
  const { t } = useLocale();
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
        setError(failure instanceof Error ? failure.message : t.session.signInFailed);
      });
  }, [completeSignIn, navigate, t]);

  if (error) {
    return (
      <p className="page error" role="alert">
        {error}
      </p>
    );
  }
  return <p className="page muted">{t.session.signingIn}</p>;
}
