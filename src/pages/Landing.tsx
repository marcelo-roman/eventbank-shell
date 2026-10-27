import { useAuth } from '../auth/AuthContext';
import { useLocale } from '../i18n/LocaleContext';

export function Landing() {
  const { signIn, signUp } = useAuth();
  const { t } = useLocale();

  return (
    <div className="page landing">
      <section className="landing-hero">
        <h1>{t.landing.title}</h1>
        <p className="lede">{t.landing.lede}</p>
        <div className="landing-actions">
          <button type="button" className="button primary" onClick={() => void signUp()}>
            {t.landing.openAccount}
          </button>
          <button type="button" className="button" onClick={() => void signIn('/')}>
            {t.session.signIn}
          </button>
        </div>
      </section>
      <section className="landing-steps" aria-labelledby="steps-title">
        <h2 id="steps-title">{t.landing.stepsTitle}</h2>
        <ol>
          {t.landing.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
