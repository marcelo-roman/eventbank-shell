import { useAuth } from '../auth/AuthContext';

const steps = [
  'Create your login with an e-mail and a password.',
  'Tell us who you are: full name, CPF, birth date and phone.',
  'Our team reviews your application.',
  'Your checking account opens, ready for PIX and a virtual card.',
];

export function Landing() {
  const { signIn, signUp } = useAuth();

  return (
    <div className="page landing">
      <section className="landing-hero">
        <h1>Banking built on events.</h1>
        <p className="lede">
          Open an account, send PIX, pay with a virtual card. Every balance you see is the sum of the facts recorded
          about your money, and you can replay any of them.
        </p>
        <div className="landing-actions">
          <button type="button" className="button primary" onClick={() => void signUp()}>
            Open your account
          </button>
          <button type="button" className="button" onClick={() => void signIn('/')}>
            Sign in
          </button>
        </div>
      </section>
      <section className="landing-steps" aria-labelledby="steps-title">
        <h2 id="steps-title">How opening an account works</h2>
        <ol>
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
